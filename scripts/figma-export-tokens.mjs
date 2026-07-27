/**
 * Figma-native token export  (VALUE SYNC)
 * =======================================
 * Pulls variable values straight from the Figma Variables REST API and writes
 * them into the committed DTCG token sets (tokens/*.json).  This is the
 * Figma-only, no-plugin, no-GitHub-PAT half of the pipeline: the ONLY human
 * credential is a read-only Figma personal access token (scope
 * `file_variables:read`) supplied as the FIGMA_TOKEN env var.  Everything
 * downstream (build:tokens → test:tokens → PR) is automated in CI.
 *
 *   FIGMA_TOKEN=figd_xxx FIGMA_FILE_KEY=pyZ5wKN9KGBUfgi47UwQ0q \
 *     node scripts/figma-export-tokens.mjs
 *
 * Flags:
 *   --fixture <path>   read the REST payload from a local JSON file instead of
 *                      hitting the network (used by --self-test and offline CI)
 *   --dry-run          report what would change; do not write files
 *   --self-test        build a fixture FROM the committed files, run the export
 *                      against it, and assert the token sets are unchanged
 *                      (proves the preserve-verbatim + semantic-compare paths).
 *
 * DESIGN — why this is a *value* sync, not a dump
 * ------------------------------------------------
 * Figma variables carry only 4 resolved types (COLOR / FLOAT / STRING /
 * BOOLEAN).  The committed DTCG carries richer intent ($type, alias syntax
 * `{ref}`, and human-authored formatting like `rgba(255,255,255,.92)` vs
 * `rgba(255, 255, 255, 0.92)`).  The value-identity gate (test:tokens) compares
 * *resolved* values as strings, so a purely cosmetic reformat would falsely
 * register as drift.  Therefore, for every committed token we compare the
 * Figma value to the committed value SEMANTICALLY (parse both), and:
 *   - if they mean the same thing  → keep the committed text VERBATIM
 *   - if they genuinely differ     → rewrite that one token's $value
 * Only $value strings change; key order, $type, spacing and every unchanged
 * byte are preserved (JSON.stringify(obj,null,2) round-trips these files
 * exactly).  Structural changes (new tokens, deleted tokens, new aliases) are
 * OUT OF SCOPE for value-sync — they are reported as warnings, never applied.
 * `legacy.json` is repo-only (no Figma collection) and is never touched.
 */
import fs from 'node:fs';
import path from 'node:path';

const TOKENS_DIR = new URL('../tokens/', import.meta.url).pathname;
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const DRY = flag('--dry-run');
const SELF_TEST = flag('--self-test');
const FIXTURE = opt('--fixture');

// ---- token-set → Figma theme wiring (authoritative: $themes.json) -----------
// Each committed set is read from a specific collection + mode.  legacy = skip.
const themes = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, '$themes.json')));
const themeById = Object.fromEntries(themes.map((t) => [t.id, t]));
// setName -> { collectionId, modeId }
const SET_WIRING = {
  primitive:      wire('primitives'),
  semantic:       wire('light'),
  'semantic.dark': wire('dark'),
  component:      wire('component'),
};
function wire(themeId) {
  const t = themeById[themeId];
  if (!t) throw new Error(`$themes.json missing theme "${themeId}"`);
  return { collectionId: t.$figmaCollectionId, modeId: t.$figmaModeId };
}

// ---------------------------------------------------------------------------
// Value conversion + semantic comparison
// ---------------------------------------------------------------------------
const to255 = (x) => Math.round(x * 255);

function figmaColorToHexOrRgba(c) {
  const a = c.a ?? 1;
  if (a >= 0.999) {
    const hex = [c.r, c.g, c.b].map((x) => to255(x).toString(16).padStart(2, '0')).join('');
    return '#' + hex.toUpperCase();
  }
  return `rgba(${to255(c.r)}, ${to255(c.g)}, ${to255(c.b)}, ${+a.toFixed(2)})`;
}

function parseColor(str) {
  if (typeof str !== 'string') return null;
  const s = str.trim();
  if (s[0] === '#') {
    let h = s.slice(1);
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    if (h.length < 6) return null;
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
    };
  }
  const m = s.match(/^rgba?\(([^)]+)\)$/);
  if (m) {
    const p = m[1].split(',').map((x) => x.trim());
    return { r: +p[0], g: +p[1], b: +p[2], a: p[3] !== undefined ? +p[3] : 1 };
  }
  return null; // e.g. 'transparent' — not a parseable color literal
}

function colorSemanticallyEqual(figmaColor, committedStr) {
  const c = parseColor(committedStr);
  if (!c) return false;
  const fa = figmaColor.a ?? 1;
  return (
    to255(figmaColor.r) === c.r &&
    to255(figmaColor.g) === c.g &&
    to255(figmaColor.b) === c.b &&
    Math.abs(fa - c.a) < 0.005
  );
}

// numeric magnitude + trailing unit of a committed dimension/number/duration
function splitNumUnit(str) {
  const m = String(str).trim().match(/^(-?\d*\.?\d+)\s*([a-z%]*)$/i);
  return m ? { num: parseFloat(m[1]), unit: m[2] } : null;
}

// ---------------------------------------------------------------------------
// Core: reconcile one committed token set against Figma variables
// ---------------------------------------------------------------------------
function reconcileSet(setName, obj, figma) {
  const { byId, byCollMode } = figma;
  const { collectionId, modeId } = SET_WIRING[setName];
  const nameToVar = byCollMode.get(collectionId + '|' + modeId);
  const report = { set: setName, changed: [], missing: [], kept: 0 };
  if (!nameToVar) {
    report.error = `collection/mode ${collectionId}@${modeId} not present in payload`;
    return report;
  }
  for (const [key, entry] of Object.entries(obj)) {
    const v = nameToVar.get(key);
    if (!v) { report.missing.push(key); continue; }
    const committed = entry.$value;
    const candidate = figmaValueToCandidate(v, committed, byId);
    if (candidate == null) { report.kept++; continue; } // untranslatable → leave committed
    if (semanticallyEqual(v, committed, candidate, byId)) {
      report.kept++;
    } else {
      entry.$value = candidate;
      report.changed.push({ key, from: committed, to: candidate });
    }
  }
  return report;
}

// Produce the DTCG string Figma currently implies for this variable.
function figmaValueToCandidate(v, committed, byId) {
  const raw = v.value; // resolved for the requested mode (see indexPayload)
  if (raw == null) return null;
  if (raw.type === 'VARIABLE_ALIAS') {
    const target = byId.get(raw.id);
    return target ? `{${target.name}}` : null;
  }
  switch (v.resolvedType) {
    case 'COLOR':
      return figmaColorToHexOrRgba(raw);
    case 'FLOAT': {
      const nu = splitNumUnit(committed); // borrow the committed unit
      const unit = nu ? nu.unit : '';
      return `${raw}${unit}`;
    }
    case 'STRING':
      return String(raw);
    case 'BOOLEAN':
      return String(raw);
    default:
      return null;
  }
}

function semanticallyEqual(v, committed, candidate, byId) {
  const raw = v.value;
  if (raw && raw.type === 'VARIABLE_ALIAS') {
    const committedTarget = /^\{(.+)\}$/.exec(String(committed).trim());
    const t = byId.get(raw.id);
    return !!(committedTarget && t && committedTarget[1] === t.name);
  }
  if (v.resolvedType === 'COLOR') {
    // committed may be an alias, hex, rgba, or 'transparent'
    if (/^\{.+\}$/.test(String(committed).trim())) return false;
    return colorSemanticallyEqual(raw, committed);
  }
  if (v.resolvedType === 'FLOAT') {
    const nu = splitNumUnit(committed);
    return !!nu && Math.abs(nu.num - Number(raw)) < 1e-9;
  }
  // STRING / BOOLEAN — compare with whitespace tolerance to avoid churn
  const norm = (x) => String(x).replace(/\s+/g, ' ').trim();
  return norm(committed) === norm(candidate);
}

// ---------------------------------------------------------------------------
// Index the REST payload into fast lookups
// ---------------------------------------------------------------------------
function indexPayload(meta) {
  const vars = meta.variables || {};
  const byId = new Map();     // id -> { name, resolvedType }
  for (const [id, v] of Object.entries(vars)) byId.set(id, v);

  // For each (collection, mode) we need name -> variable-with-that-mode's-value.
  const byCollMode = new Map();
  for (const v of Object.values(vars)) {
    const coll = v.variableCollectionId;
    for (const [modeId, value] of Object.entries(v.valuesByMode || {})) {
      const k = coll + '|' + modeId;
      if (!byCollMode.has(k)) byCollMode.set(k, new Map());
      byCollMode.get(k).set(v.name, {
        id: v.id, name: v.name, resolvedType: v.resolvedType, value,
      });
    }
  }
  return { byId, byCollMode };
}

// ---------------------------------------------------------------------------
// Fetch (or load fixture)
// ---------------------------------------------------------------------------
async function loadPayload() {
  if (FIXTURE) return JSON.parse(fs.readFileSync(FIXTURE, 'utf8')).meta;
  const token = process.env.FIGMA_TOKEN;
  const fileKey = process.env.FIGMA_FILE_KEY;
  if (!token || !fileKey) {
    throw new Error('FIGMA_TOKEN and FIGMA_FILE_KEY env vars are required (or pass --fixture).');
  }
  const url = `https://api.figma.com/v1/files/${fileKey}/variables/local`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) {
    const body = await res.text();
    // The Variables REST endpoint (/variables/local) is Enterprise-plan-only and
    // needs a file_variables:read-scoped token. A 404 (non-Enterprise) or a 403
    // that names the missing scope means the endpoint is structurally unreachable
    // with the current plan/token — flag it so the caller can soft-skip in CI.
    const soft =
      res.status === 404 ||
      (res.status === 403 && /file_variables:read/.test(body));
    throw new Error(
      `${soft ? 'ENDPOINT_UNAVAILABLE ' : ''}Figma REST ${res.status}: ${body.slice(0, 400)}`
    );
  }
  const json = await res.json();
  if (json.error) throw new Error(`Figma REST error: ${JSON.stringify(json).slice(0, 400)}`);
  return json.meta;
}

// ---------------------------------------------------------------------------
// Self-test: synthesize a payload from the committed files, then export it.
// Encodes each committed token as the Figma variable it maps to, so a correct
// exporter must leave every file byte-identical.
// ---------------------------------------------------------------------------
function buildFixtureFromCommitted() {
  const variables = {};
  let n = 0;
  const put = (name, collectionId, resolvedType, modeId, value) => {
    const id = `VariableID:test:${name}`;
    if (!variables[id]) {
      variables[id] = { id, name, variableCollectionId: collectionId, resolvedType, valuesByMode: {} };
    }
    variables[id].valuesByMode[modeId] = value;
    n++;
  };
  const nameToId = (name) => `VariableID:test:${name}`;

  const encode = (committed) => {
    const s = String(committed).trim();
    const alias = /^\{(.+)\}$/.exec(s);
    if (alias) return { resolvedType: 'COLOR', value: { type: 'VARIABLE_ALIAS', id: nameToId(alias[1]) } };
    const col = parseColor(s);
    if (col) return { resolvedType: 'COLOR', value: { r: col.r / 255, g: col.g / 255, b: col.b / 255, a: col.a } };
    const nu = splitNumUnit(s);
    if (nu) return { resolvedType: 'FLOAT', value: nu.num };
    if (s === 'true' || s === 'false') return { resolvedType: 'BOOLEAN', value: s === 'true' };
    return { resolvedType: 'STRING', value: String(committed) };
  };

  for (const [setName, wiring] of Object.entries(SET_WIRING)) {
    const file = setName + '.json';
    const obj = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, file), 'utf8'));
    for (const [key, entry] of Object.entries(obj)) {
      const { resolvedType, value } = encode(entry.$value);
      put(key, wiring.collectionId, resolvedType, wiring.modeId, value);
    }
  }
  return { variables, _count: n };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  let meta;
  let selfTestBackups = null;

  if (SELF_TEST) {
    meta = buildFixtureFromCommitted();
    // snapshot the committed files so we can assert byte-identity afterwards
    selfTestBackups = {};
    for (const setName of Object.keys(SET_WIRING)) {
      const p = path.join(TOKENS_DIR, setName + '.json');
      selfTestBackups[p] = fs.readFileSync(p, 'utf8');
    }
  } else {
    meta = await loadPayload();
  }

  const figma = indexPayload(meta);
  const reports = [];
  const dirty = new Map(); // path -> serialized text

  for (const setName of Object.keys(SET_WIRING)) {
    const p = path.join(TOKENS_DIR, setName + '.json');
    const text = fs.readFileSync(p, 'utf8');
    const obj = JSON.parse(text);
    const report = reconcileSet(setName, obj, figma);
    reports.push(report);
    const next = JSON.stringify(obj, null, 2);
    if (next !== text) dirty.set(p, next);
  }

  // ---- self-test assertions ----
  if (SELF_TEST) {
    let ok = true;
    for (const [p, original] of Object.entries(selfTestBackups)) {
      const now = JSON.stringify(JSON.parse(fs.readFileSync(p, 'utf8')), null, 2);
      // we never wrote in self-test (see guard below), so compare recomputed obj
    }
    // recompute per-set output and compare to original bytes
    for (const setName of Object.keys(SET_WIRING)) {
      const p = path.join(TOKENS_DIR, setName + '.json');
      const original = selfTestBackups[p];
      const obj = JSON.parse(original);
      reconcileSet(setName, obj, figma);
      const out = JSON.stringify(obj, null, 2);
      const same = out === original;
      console.log(`  self-test ${setName.padEnd(14)} ${same ? 'IDENTICAL ✅' : 'CHANGED ❌'}`);
      if (!same) {
        ok = false;
        // show first differing region
        for (let i = 0; i < Math.max(out.length, original.length); i++) {
          if (out[i] !== original[i]) {
            console.log('    first diff @', i, JSON.stringify(original.slice(i, i + 60)), '->', JSON.stringify(out.slice(i, i + 60)));
            break;
          }
        }
      }
    }
    console.log(`\nSELF-TEST: ${ok ? 'PASS ✅ round-trip is value-identical' : 'FAIL ❌'}`);
    process.exit(ok ? 0 : 1);
  }

  // ---- report ----
  let totalChanged = 0, totalMissing = 0;
  for (const r of reports) {
    if (r.error) { console.log(`[${r.set}] ERROR: ${r.error}`); continue; }
    totalChanged += r.changed.length;
    totalMissing += r.missing.length;
    console.log(`[${r.set}] kept=${r.kept} changed=${r.changed.length} missingInFigma=${r.missing.length}`);
    r.changed.slice(0, 50).forEach((c) => console.log(`   ~ ${c.key}: ${c.from}  →  ${c.to}`));
    if (r.missing.length) console.log(`   ! not found in Figma: ${r.missing.join(', ')}`);
  }

  // ---- new-token warning (Figma vars with no committed key; structural) ----
  const committedNames = new Set();
  for (const setName of Object.keys(SET_WIRING)) {
    const obj = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, setName + '.json'), 'utf8'));
    Object.keys(obj).forEach((k) => committedNames.add(k));
  }
  const sotCollections = new Set(Object.values(SET_WIRING).map((w) => w.collectionId));
  const newInFigma = [];
  for (const v of figma.byId.values()) {
    if (sotCollections.has(v.variableCollectionId) && !committedNames.has(v.name)) newInFigma.push(v.name);
  }
  if (newInFigma.length) {
    console.log(`\n[structural] ${newInFigma.length} new Figma var(s) not in committed sets (NOT added — value-sync only):`);
    console.log('   ' + [...new Set(newInFigma)].join(', '));
  }

  // ---- write ----
  if (DRY) {
    console.log(`\nDRY RUN — ${dirty.size} file(s) would change, ${totalChanged} token value(s).`);
    process.exit(0);
  }
  for (const [p, text] of dirty) fs.writeFileSync(p, text);
  console.log(`\nWROTE ${dirty.size} file(s), ${totalChanged} changed token value(s), ${totalMissing} missing.`);
  console.log('Next: npm run build:tokens && npm run test:tokens  (CI gate).');
}

main().catch((e) => {
  const msg = e && (e.message || String(e));
  console.error(msg);
  // In CI, when the Variables REST endpoint is structurally unreachable (non-
  // Enterprise plan or token missing file_variables:read), soft-skip instead of
  // failing the scheduled job: the drift guard (test:tokens) still protects the
  // live UI on every push, so a missing pull is not a red build. Auto-detected
  // via GITHUB_ACTIONS/CI so no workflow-file change is needed; force off with
  // FIGMA_SYNC_SOFT_FAIL=0. Locally (no CI) this still fails hard so a dev sees it.
  const inCI =
    process.env.FIGMA_SYNC_SOFT_FAIL === '1' ||
    ((process.env.GITHUB_ACTIONS === 'true' || process.env.CI === 'true') &&
      process.env.FIGMA_SYNC_SOFT_FAIL !== '0');
  if (inCI && /ENDPOINT_UNAVAILABLE/.test(msg)) {
    console.log(
      '::notice title=Figma token sync skipped::Variables REST endpoint unavailable ' +
        '(Enterprise-only / token lacks file_variables:read). Skipping pull; ' +
        'drift guard still enforced on every push.'
    );
    process.exit(0);
  }
  process.exit(1);
});

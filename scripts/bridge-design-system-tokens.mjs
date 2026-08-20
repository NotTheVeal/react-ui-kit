#!/usr/bin/env node
// scripts/bridge-design-system-tokens.mjs
//
// Bridge "extra" token sets from the design-system repo (Tokens Studio format)
// into react-ui-kit DTCG format under tokens/, so a Tokens Studio push to
// design-system flows into this repo automatically via a PR.
//
// Scope & safety:
//  - Only touches sets that are NOT primitive/*, semantic/*, component/* — those are
//    curated in react-ui-kit's own naming scheme (ps-prim-*/ps-sem-*/ps-cmp-*) and
//    must never be overwritten from here.
//  - A set is written only if it is self-contained: no token references another
//    namespaced set (e.g. {primitive.color...}). Cross-referencing sets are FLAGGED
//    for manual review and left untouched.
//  - Composite tokens (border, boxShadow, typography, composition) and unresolved
//    runtime placeholders ({name}, {phone}, ...) are dropped — matching the shape the
//    curated tokens/*.json files already use.
//  - Idempotent: a file is written only when its content actually changes.
//
// Usage:
//   node scripts/bridge-design-system-tokens.mjs          # apply changes
//   node scripts/bridge-design-system-tokens.mjs --check  # report only, exit 1 on drift
//
// Env:
//   DS_TOKENS_URL   override source URL (default: design-system raw tokens.json)
//   DS_TOKENS_FILE  read source from a local file instead of the network (testing)

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOKENS_DIR = join(ROOT, 'tokens');
const META_PATH = join(TOKENS_DIR, '$metadata.json');

const DS_TOKENS_URL =
  process.env.DS_TOKENS_URL ||
  'https://raw.githubusercontent.com/NotTheVeal/design-system/main/tokens/tokens.json';
const DS_TOKENS_FILE = process.env.DS_TOKENS_FILE || '';
const CHECK_ONLY = process.argv.includes('--check');

// Sets curated elsewhere in react-ui-kit's own scheme — never bridge these.
const RESERVED_PREFIXES = ['primitive/', 'semantic/', 'component/'];
const RESERVED_EXACT = new Set(['primitive', 'semantic', 'component', 'legacy']);

// Tokens Studio type -> DTCG $type
const TYPE_MAP = {
  color: 'color',
  fontFamilies: 'fontFamily',
  fontWeights: 'fontWeight',
  fontSizes: 'dimension',
  lineHeights: 'dimension',
  letterSpacing: 'dimension',
  paragraphSpacing: 'dimension',
  borderWidth: 'dimension',
  borderRadius: 'dimension',
  dimension: 'dimension',
  sizing: 'dimension',
  spacing: 'dimension',
  opacity: 'number',
  number: 'number',
  textCase: 'other',
  textDecoration: 'other',
  text: 'other',
  asset: 'other',
};

// TS types whose bare-number values receive a 'px' unit (nonzero only).
const DIMENSION_TYPES = new Set([
  'fontSizes', 'lineHeights', 'letterSpacing', 'paragraphSpacing',
  'borderWidth', 'borderRadius', 'dimension', 'sizing', 'spacing',
]);

const FONT_WEIGHT_NAMES = {
  thin: 100, extralight: 200, light: 300, regular: 400, normal: 400,
  medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900,
};

const REF_RE = /\{([^}]+)\}/g;
const refsIn = (v) => (typeof v === 'string' ? [...v.matchAll(REF_RE)].map((m) => m[1]) : []);

function toCamel(name) {
  const parts = name.trim().split(/[^A-Za-z0-9]+/).filter(Boolean);
  return parts
    .map((p, i) => (i === 0 ? p[0].toLowerCase() + p.slice(1) : p[0].toUpperCase() + p.slice(1)))
    .join('');
}

function normalizeValue(tsType, rawValue) {
  if (tsType === 'fontWeights') {
    const key = String(rawValue).toLowerCase().replace(/\s+/g, '');
    if (key in FONT_WEIGHT_NAMES) return FONT_WEIGHT_NAMES[key];
    const n = Number(rawValue);
    return Number.isFinite(n) ? n : rawValue;
  }
  if (DIMENSION_TYPES.has(tsType)) {
    const s = String(rawValue).trim();
    if (s === '0') return '0';
    if (/^-?\d+(\.\d+)?$/.test(s)) return `${s}px`;
    return s;
  }
  return rawValue;
}

// Recursively collect leaf tokens in source order. A leaf has value+type (TS) or
// $value+$type (DTCG). Keys starting with '$' are skipped. ps-* leaf names are used
// verbatim; otherwise the name is the dash-joined path.
function collectLeaves(node, path, out) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue;
    if (!v || typeof v !== 'object' || Array.isArray(v)) continue;
    const isToken = ('value' in v && 'type' in v) || ('$value' in v && '$type' in v);
    if (isToken) {
      const rawValue = 'value' in v ? v.value : v.$value;
      const tsType = 'type' in v ? v.type : v.$type;
      const name = k.startsWith('ps-') ? k : [...path, k].join('-');
      out.push({ name, tsType, rawValue });
    } else {
      collectLeaves(v, [...path, k], out);
    }
  }
  return out;
}

// Convert one design-system set. Returns:
//   { camel, dtcg, keptCount, droppedComposites, droppedPlaceholders, crossRefs }
// crossRefs is non-empty when the set references another namespaced set — in that
// case the set is FLAGGED and dtcg is null (nothing should be written).
function convertSet(setName, setObj) {
  const leaves = collectLeaves(setObj, [], []);
  const scalar = leaves.filter((l) => !(l.rawValue && typeof l.rawValue === 'object'));
  const droppedComposites = leaves.length - scalar.length;
  const names = new Set(scalar.map((l) => l.name));

  const crossRefs = [];
  const droppedPlaceholders = [];
  const kept = [];

  for (const l of scalar) {
    const external = refsIn(l.rawValue).filter((r) => !names.has(r));
    const dotted = external.filter((r) => r.includes('.'));
    if (dotted.length) {
      crossRefs.push({ name: l.name, refs: dotted });
      continue;
    }
    if (external.length) {
      // non-namespaced, non-resolving -> runtime template placeholder, drop it
      droppedPlaceholders.push({ name: l.name, refs: external });
      continue;
    }
    kept.push(l);
  }

  if (crossRefs.length) {
    return { camel: toCamel(setName), dtcg: null, keptCount: 0,
             droppedComposites, droppedPlaceholders, crossRefs };
  }

  const dtcg = {};
  for (const l of kept) {
    dtcg[l.name] = { $value: normalizeValue(l.tsType, l.rawValue), $type: TYPE_MAP[l.tsType] || 'other' };
  }
  return { camel: toCamel(setName), dtcg, keptCount: kept.length,
           droppedComposites, droppedPlaceholders, crossRefs };
}

async function loadSource() {
  if (DS_TOKENS_FILE) return JSON.parse(readFileSync(DS_TOKENS_FILE, 'utf8'));
  const res = await fetch(DS_TOKENS_URL);
  if (!res.ok) throw new Error(`Fetch ${DS_TOKENS_URL} -> HTTP ${res.status}`);
  return res.json();
}

function isReserved(setName) {
  if (RESERVED_EXACT.has(setName)) return true;
  return RESERVED_PREFIXES.some((p) => setName.startsWith(p));
}

async function main() {
  const src = await loadSource();
  const extraSets = Object.keys(src).filter((k) => !k.startsWith('$') && !isReserved(k));

  const meta = JSON.parse(readFileSync(META_PATH, 'utf8'));
  const order = meta.tokenSetOrder || (meta.tokenSetOrder = []);

  const changes = [];   // files whose content differs
  const flagged = [];   // sets needing manual review
  const unchanged = [];

  for (const setName of extraSets) {
    const r = convertSet(setName, src[setName]);
    if (r.dtcg === null) {
      flagged.push({ set: setName, reason: 'references other namespaced sets', crossRefs: r.crossRefs });
      continue;
    }
    if (r.keptCount === 0) {
      flagged.push({ set: setName, reason: 'no self-contained scalar tokens after conversion' });
      continue;
    }
    const filePath = join(TOKENS_DIR, `${r.camel}.json`);
    const next = JSON.stringify(r.dtcg, null, 2); // match repo convention (no trailing newline)
    const prev = existsSync(filePath) ? readFileSync(filePath, 'utf8') : null;
    const inOrder = order.includes(r.camel);
    if (prev === next && inOrder) {
      unchanged.push(r.camel);
      continue;
    }
    changes.push({ set: setName, camel: r.camel, filePath, next, isNew: prev === null,
                   addToOrder: !inOrder, keptCount: r.keptCount,
                   droppedComposites: r.droppedComposites,
                   droppedPlaceholders: r.droppedPlaceholders.map((d) => d.name) });
  }
  return { extraSets, changes, flagged, unchanged, meta, order };
}

main()
  .then(({ extraSets, changes, flagged, unchanged, meta, order }) => {
    console.log(`\nDesign-system token bridge`);
    console.log(`  source: ${DS_TOKENS_FILE || DS_TOKENS_URL}`);
    console.log(`  extra sets found: ${extraSets.length} -> ${extraSets.join(', ') || '(none)'}`);
    console.log(`  unchanged: ${unchanged.length ? unchanged.join(', ') : '(none)'}`);

    if (flagged.length) {
      console.log(`\n  FLAGGED for manual review (not written):`);
      for (const f of flagged) {
        console.log(`    - ${f.set}: ${f.reason}`);
        if (f.crossRefs) {
          for (const c of f.crossRefs.slice(0, 3)) {
            console.log(`        ${c.name} -> ${c.refs.join(', ')}`);
          }
          if (f.crossRefs.length > 3) console.log(`        ...(${f.crossRefs.length} total)`);
        }
      }
    }

    if (!changes.length) {
      console.log(`\n  No changes. tokens/ already matches the bridgeable design-system sets.`);
      process.exit(0);
    }

    console.log(`\n  ${CHECK_ONLY ? 'DRIFT (would change)' : 'Applying changes'}:`);
    for (const c of changes) {
      const tag = c.isNew ? 'new set' : 'updated';
      console.log(`    - ${c.camel}.json (${tag}) — ${c.keptCount} tokens, ` +
        `dropped ${c.droppedComposites} composite(s)` +
        (c.droppedPlaceholders.length ? `, ${c.droppedPlaceholders.length} placeholder(s)` : ''));
    }

    if (CHECK_ONLY) {
      console.log(`\n  --check: drift detected. Run without --check to apply.`);
      process.exit(1);
    }

    for (const c of changes) {
      writeFileSync(c.filePath, c.next);
      if (c.addToOrder && !order.includes(c.camel)) order.push(c.camel);
    }
    writeFileSync(META_PATH, JSON.stringify(meta, null, 2));
    console.log(`\n  Wrote ${changes.length} file(s) + updated $metadata.json. ` +
      `Run 'npm run build:tokens' next.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(`bridge failed: ${err.message}`);
    process.exit(2);
  });

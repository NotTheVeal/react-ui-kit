/**
 * UI-safety gate. Resolves every CSS custom property (following var() chains) in
 * two files, for both light (:root) and dark ([data-theme="dark"]) contexts, and
 * asserts the resolved value maps are identical.  Empty diff => UI cannot change.
 *
 *   node scripts/token-gate.mjs <fileA> <fileB>
 *
 * Default (no args) runs the DRIFT GUARD: builds the source to a temp file and
 * compares it against the committed tokens.css — fails if the committed file is
 * stale or was hand-edited.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

function blocks(file) {
  const css = fs.readFileSync(file, 'utf8');
  const out = { root: {}, dark: {} };
  const re = /(:root|\[data-theme="dark"\])\s*\{/g; let m;
  while ((m = re.exec(css))) {
    let i = re.lastIndex, depth = 1, j = i;
    while (depth) { const c = css[j++]; if (c==='{') depth++; else if (c==='}') depth--; }
    const body = css.slice(i, j-1);
    const key = m[1].startsWith('[') ? 'dark' : 'root';
    const d = /(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/g; let n;
    while ((n = d.exec(body))) out[key][n[1]] = n[2].trim(); // last wins (CSS cascade)
  }
  return out;
}
const VAR = /var\(\s*(--[A-Za-z0-9-]+)\s*(?:,[^)]*)?\)/g;
function resolve(name, table, seen = new Set()) {
  if (seen.has(name)) return `<cycle:${name}>`;
  const s = new Set(seen); s.add(name);
  const v = table[name];
  if (v === undefined) return `<undef:${name}>`;
  return v.replace(VAR, (_, ref) => resolve(ref, table, s));
}
function resolvedMaps(file) {
  const b = blocks(file);
  const light = { ...b.root };
  const dark = { ...light, ...b.dark };
  const norm = (x) => x.replace(/\s+/g, ' ').trim();
  const mk = (tbl) => Object.fromEntries(Object.keys(light).map((k)=>[k, norm(resolve(k, tbl))]));
  return { light: mk(light), dark: mk(dark) };
}
function diff(x, y, label) {
  const keys = new Set([...Object.keys(x), ...Object.keys(y)]);
  const d = [...keys].filter((k)=>x[k]!==y[k]).sort();
  console.log(`[${label}] A vars=${Object.keys(x).length} B vars=${Object.keys(y).length} diffs=${d.length}`);
  d.slice(0,40).forEach((k)=>console.log(`   ${k}\n     A: ${x[k]}\n     B: ${y[k]}`));
  return d.length;
}

let A = process.argv[2], B = process.argv[3];
if (!A || !B) {
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(),'gate-')),'generated.css');
  execFileSync('node', [new URL('./build-tokens.mjs', import.meta.url).pathname, tmp], { stdio: 'inherit' });
  A = 'tokens.css'; B = tmp;
  console.log('DRIFT GUARD: committed tokens.css  vs  freshly built source\n');
}
const a = resolvedMaps(A), b = resolvedMaps(B);
const n = diff(a.light, b.light, 'LIGHT / :root') + diff(a.dark, b.dark, 'DARK / [data-theme=dark]');
console.log('\nGATE:', n===0 ? 'PASS ✅ value-identical, UI cannot change' : `FAIL ❌ ${n} differing custom properties`);
process.exit(n===0 ? 0 : 1);

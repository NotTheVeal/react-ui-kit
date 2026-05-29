#!/usr/bin/env node
/**
 * sync-to-browser.mjs
 *
 * Generates the browser-side .tsx files from the canonical ES-module
 * sources under src/. The browser Showcase (UI Kit/index.html) loads
 * .tsx files via the in-browser Babel transformer — it can't handle
 * `import` / `export`, so each module needs a sibling file that uses
 * the global-React + `window.X` pattern.
 *
 * Run this whenever you edit anything under src/ so the live Showcase
 * stays in sync:
 *
 *   npm run sync:browser
 *
 * It's also wired as a `prebuild` step so the Showcase never drifts.
 *
 * Source of truth: UI Kit/src/<Component>.tsx
 * Generated:       UI Kit/<Component>.tsx  ← do NOT hand-edit
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = resolve(__dirname, '..', 'src');
const OUT_DIR = resolve(__dirname, '..');

if (!existsSync(SRC_DIR)) {
  console.error(`sync-to-browser: source directory not found: ${SRC_DIR}`);
  process.exit(1);
}

const files = readdirSync(SRC_DIR)
  .filter((f) => f.endsWith('.tsx'))
  .sort();

const BANNER =
  `// ════════════════════════════════════════════════════════════════\n` +
  `// AUTO-GENERATED FROM src/ — do NOT hand-edit.\n` +
  `// Source: UI Kit/src/{filename}.tsx · run \`npm run sync:browser\`.\n` +
  `// ════════════════════════════════════════════════════════════════\n`;

let total = 0;
for (const file of files) {
  const srcPath = join(SRC_DIR, file);
  const outPath = join(OUT_DIR, file);

  let src = readFileSync(srcPath, 'utf8');

  // 1. Strip the React import — UMD-loaded global already exposes `React`.
  src = src.replace(/^import\s+\*\s+as\s+React\s+from\s+['"]react['"];?\s*\n/m, '');
  src = src.replace(/^import\s+React(\s*,\s*\{[^}]*\})?\s+from\s+['"]react['"];?\s*\n/m, '');

  // 2. Find the trailing `export { ... };` statement and capture names.
  const exportMatch = src.match(/^(\/\/\s*Exports?\s*\n)?export\s*\{([^}]+)\}\s*;\s*$/m);
  if (!exportMatch) {
    console.warn(`sync-to-browser: ${file} has no \`export { ... }\` — copying verbatim.`);
    writeFileSync(outPath, BANNER.replace('{filename}', file.replace(/\.tsx$/, '')) + src);
    total++;
    continue;
  }

  // Split exports: handle `Internal as Public` rename syntax.
  const entries = exportMatch[2]
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      const m = entry.match(/^(\w+)(?:\s+as\s+(\w+))?$/);
      if (!m) throw new Error(`Bad export entry in ${file}: "${entry}"`);
      const internalName = m[1];
      const publicName = m[2] ?? m[1];
      return { internalName, publicName };
    });

  // Build the browser-style window block.
  const typeLines = entries.map((e) => `  ${e.publicName}?: typeof ${e.internalName};`).join('\n');
  const assignList = entries
    .map((e) => (e.internalName === e.publicName ? e.publicName : `${e.publicName}: ${e.internalName}`))
    .join(', ');

  const winBlock =
    `// ── Window export so other Babel-loaded scripts can read these ───\n` +
    `declare const window: Window & {\n${typeLines}\n};\n` +
    `if (typeof window !== "undefined") {\n` +
    `  Object.assign(window, { ${assignList} });\n` +
    `}\n`;

  src = src.replace(exportMatch[0], winBlock);

  // 3. Prepend banner.
  const out = BANNER.replace('{filename}', file.replace(/\.tsx$/, '')) + src;
  writeFileSync(outPath, out);
  total++;
}

console.log(`sync-to-browser: synced ${total} file${total === 1 ? '' : 's'} to ${OUT_DIR}`);

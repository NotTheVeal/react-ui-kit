# Contributing to the PartsSource React UI Kit

## The one rule that matters

**Colors come from tokens. Always.** A raw hex code (`#005BA6`, `bg-[#FF9505]`)
will fail `npm run lint` and block your PR. If you need a color that doesn't
exist yet, add a primitive to `tokens.css` first — that makes it part of the
design system instead of one-off drift.

```bash
# ❌ fails CI
<div className="bg-[#005BA6]" />

# ✅ passes
<div className="bg-[var(--ps-prim-blue-500)]" />
```

## Workflow

1. **Edit source under `src/`.** Never hand-edit the root `*.tsx` files —
   they're auto-generated mirrors for the in-browser showcase.
2. **Run `npm run sync:browser`** (or just `npm run dev` / `npm run build`,
   which run it for you) to regenerate the browser copies.
3. **Add or update a story** in `src/<Component>.stories.tsx`.
4. **Run the gate locally before pushing:**
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```
5. **Open a PR.** CI runs the same chain. Green = mergeable.

## What CI enforces

| Check | Catches |
|-------|---------|
| `npm run lint` | Raw hex colors, unused vars, React mistakes |
| `npm run typecheck` | Type errors across `src/` |
| `npm run build` | Anything that breaks the publishable bundle |
| `npm run build-storybook` | Broken stories |

## Adding a component

1. Create `src/<Name>.tsx` — proper ES module, `export { … }` at the bottom.
2. Reference only token vars for color.
3. Create `src/<Name>.stories.tsx`.
4. Add it to `src/index.ts` (the barrel export).
5. Wire it into `Showcase.tsx` if you want it in the in-browser showcase.
6. `npm run build` → green → PR.

## Source of truth

- **Components that have a `preview/*.html` page** → that page is canonical.
- **Components without one** → check the Figma file (`fig_*` references in
  commit history) and match exact values.

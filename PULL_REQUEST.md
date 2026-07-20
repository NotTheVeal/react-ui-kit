# PR: Component library — test harness, missing components, stories, Code Connect

**Branch:** `component-library-tests` → `main`
**Status:** additive; all gates green locally. Not merged.

## Summary

Rounds out the React UI kit so every canonical Figma component has a code
counterpart, a test, a story, and a Figma Code Connect mapping. Also stands up
the test harness the repo was missing and clears the outstanding a11y and lint
gaps. No runtime/token behavior changes — the token drift gate stays
value-identical.

## What changed

- **Test harness.** Vitest 2 + Testing Library + jest-axe on jsdom
  (`vitest.config.ts`, `vitest.setup.ts`). 235 tests across 45 files.
- **7 new components** built from the Figma library: Divider, Table, Slider,
  Carousel, FileUpload, Popover, PageShell. 23 component modules total in `src/`.
- **Stories.** Added Filter and Navigation stories; 22 story files total.
- **Accessibility.** Fixed real WCAG 2.1 AA gaps in Selections, Drawer, and
  Tabs (accessible names via `aria-label`/`aria-labelledby`, correct roles),
  then removed the axe rule suppressions rather than papering over them.
- **Figma Code Connect.** `@figma/code-connect` wired via `figma.config.json`
  plus 16 co-located `*.figma.tsx` files → 21 component connections against
  file `pyZ5wKN9KGBUfgi47UwQ0q`. Variant props mapped where the Figma variant
  maps cleanly (Alert severity, Tooltip placement, Badge list type, FileUpload
  state); the rest connect the real component with an accurate example.
- **Lint.** Replaced a raw `#fff` in `Slider.tsx` with `--ps-prim-gray-0`.

## Verification (local)

| Gate | Result |
|---|---|
| `vitest run` | 235 passed / 45 files |
| `tsc --noEmit` | clean |
| `npm run lint` | 0 errors (3 pre-existing unused-var warnings) |
| `npm run build` | dist ESM + CJS + d.ts emitted |
| `build-storybook` | built |
| `test:tokens` (drift guard) | PASS — value-identical, UI cannot change |
| `figma connect parse` | EXIT 0 — 21 connections |

## Follow-ups (not blocking)

- **Publish Code Connect.** `figma connect publish` needs a write-scoped Figma
  PAT — a maintainer-side step. Parse is green; publish is the only remaining
  action to make the mappings visible in Dev Mode.
- **Code Connect coverage gaps.** Components with no confidently-sourced Figma
  node ID were intentionally not mapped (guessing node IDs is unsafe): Modal,
  TopNav/LeftNav, Input, the CMS blocks, the base Card variants (Event/Status/
  Alert), Filter, Pagination, and several Feedback exports (Avatar, Skeleton,
  Spinner, EmptyState, ErrorPage). A designer can supply node IDs from Dev Mode
  to finish these.
- **`.github/workflows` edits** (if any are added later) must be pushed via
  GitHub Desktop — the terminal PAT lacks the `workflow` scope.

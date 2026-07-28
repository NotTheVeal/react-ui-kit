# react-ui-kit — Claude working agreement

`@partssource/react-kit` is the single source of truth for PartsSource UI. This file is the
contract Claude follows when generating or changing components **and their tests**. It exists so
that automated test generation is consistent, meaningful, and actually runs in CI.

## House style (match existing code — do not "modernize")

- Every component is a `React.FC` (generic components like `Table` are plain generic functions).
  **No** `forwardRef`, **no** `displayName`, **no** default exports, **no** `any`.
- Named exports only, one barrel is not used — components export from their own file.
- className merging uses a local `cx*` helper: `parts.filter(Boolean).join(' ')`. Never string
  concatenation, never a third-party `clsx`.
- Colors, spacing, radii, and shadows come from CSS custom properties (`var(--ps-prim-*)` /
  `var(--ps-sem-*)`). No raw hex in class names or inline styles.
- Semantic HTML: `<button>`, `<input>`, `<nav>`, `<table>` — never a `<div>` with a click handler.

## Test-generation contract

Every component file `X.tsx` ships with **two** test files:

| File | Runner | Purpose |
|---|---|---|
| `X.test.tsx` | Vitest + Testing Library | Behaviour, rendering, and **keyboard interaction** |
| `X.a11y.test.tsx` | Vitest + jest-axe | Zero axe violations in every meaningful state |

Test imports are always:

```ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
```

### Rules

1. **Query by accessible role/name**, never by class name or test id. `getByRole('button', { name: /add to cart/i })`, `getByRole('slider')`, `getByRole('tab')`, `getByLabelText(...)`.
2. **No placeholder tests.** Every `it()` asserts observable behaviour. No `expect(true).toBe(true)`, no empty bodies, no snapshot-only files.
3. **Cover every interactive path** the component exposes: each variant, each callback (fired *and* not-fired-when-disabled), controlled vs. uncontrolled state, and empty/error/loading states where they exist.
4. **Keyboard interaction is required** for any component a keyboard user operates (see coverage table). Assert the real mechanism: roving focus + arrow keys for `role="tablist"`, `role`/focusability for native controls, activation handlers where custom `onKeyDown` exists.
5. **a11y test per meaningful state**, not just the default render (e.g. disabled, error, open).

### Coverage by component type

| Component type | Required tests |
|---|---|
| Buttons / links (`Button`, `ButtonInline`/`InlineButton`, `ChipButton`, `SegmentedButton`, `IconButton`) | renders label; fires `onClick`; does **not** fire when `disabled`/`loading`; `aria-disabled`/`aria-busy`; axe clean default + disabled. `Button` variants: `primary \| outline \| secondary \| tertiary \| danger \| pill \| arrow` (`ghost` accepted as an alias → `outline`). No standalone `ArrowButton`: the back-arrow affordance is `Button variant="arrow"` + `BackArrowIcon`. |
| Inputs (`Input`, `Checkbox`, `Slider`, `Filter`) | value renders; `onChange` fires with typed value; error/hint shown; disabled blocks input; native role present + focusable; axe clean default + error |
| Tabs (`FolderTabs` and friends) | `role="tab"`/`aria-selected`; click selects + fires `onChange`; disabled tab inert; **ArrowLeft/ArrowRight/Home/End roving navigation**; controlled `activeId` respected |
| Tables (`Table`) | rows render; sort asc→desc via header **button**; row click; select-all + row selection; empty state; sort control is a real focusable `<button>` |
| Overlays (`Modal`, `Drawer`, `Popover`) | opens/renders as `role="dialog"`; close via × and action buttons; focusable controls; axe clean open |
| Media / navigation (`Carousel`, `FileUpload`, `Navigation`) | controls exposed as buttons with accessible names; edge disabling; drop/upload path; labelled scroll/region |

## Running tests

```bash
npm run test          # vitest run (unit + a11y), the CI gate
npm run test:tokens   # value-identity gate for tokens.css (separate concern)
```

Prefix local shell with `NODE_ENV=development`. CI runs `npm run test` on every push/PR — a red
suite blocks merge. Do not mark a task done on a red or partial suite.

## What NOT to do

- ❌ Add `forwardRef`/`displayName`/default exports to match some other repo's convention.
- ❌ Assert on class names, inline styles, or internal state.
- ❌ Leave a component without its `.test.tsx` **and** `.a11y.test.tsx`.
- ❌ Commit the generated repo-root `*.tsx` browser mirror (`npm run build` regenerates it).

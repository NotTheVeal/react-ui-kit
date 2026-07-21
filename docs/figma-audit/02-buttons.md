# Figma ↔ Code Audit — Page 02: Buttons

**Figma page:** Buttons (`115:66`) · file `pyZ5wKN9KGBUfgi47UwQ0q`
**Code source of truth:** `src/Button.tsx` (`Button`, `ButtonInline`, `BackArrowIcon`)
**Date:** 2026-07-20
**Method:** enumerated all COMPONENT_SET / COMPONENT nodes on the Figma page (129 nodes) and grouped into button families, then compared to the actual exported variants in `Button.tsx`.

> Note: the repo's real Button implementation is a **single consolidated `Button.tsx`** (flat `src/`), not the multi-file `Button/` folder described in `CLAUDE.md`. The audit compares against what actually ships.

---

## 1. Family coverage

| Figma family | States/variants in Figma | Code counterpart | Status |
|---|---|---|---|
| Button/Primary | Normal, Hover, Pressed, Disabled (4) | `variant="primary"` | ✅ present (code adds Focused) |
| Button/Secondary LG + SM | 5–6 states; SM has an **Icon** variant | `variant="secondary"` | ⚠ present; no icon-only SM variant |
| Button/Tertiary/LG | 5 states (LG only) | `variant="tertiary"` | ✅ present |
| Button/Pill/Desktop | Normal, Focussed, Hover, Pressed, Disabled (5) | `variant="pill"` | ✅ present (marked legacy/ADA-deprecated in code) |
| Arrow | Default, Hover, On Click (3) | `variant="arrow"` + `BackArrowIcon` | ✅ present |
| Button/Inline (+ Director/InlineUn/InlineBl/InlineGr) | Director, InlineUn, Edit | `ButtonInline` kinds `link \| link-blue \| tall \| dir` | ⚠ naming divergence |
| **Button/Destructive** | Normal, Hover, Pressed, Disabled, Focused (5) | `variant="danger"` | ✅ added 2026-07-21 (red-400/500/600 ramp, 5 states) |
| **Button/SquareLG + SquareSM** | 5 states each (legacy orange icon button) | `IconButton` (lg/sm) | ✅ added 2026-07-21 (legacy orange; current-only — no WIP redesign exists) |
| **Button/Chip (Large/Small) + ChipSM/ChipLG** | sizes Large, Small | `ChipButton` (sm/lg, `pill`) | ✅ added 2026-07-21 (current rounded + future full-pill) |
| **Button/Segmented (Asset + Event, Left/Right)** | 6 states × 2 sides | `SegmentedButton` (`variant`) | ✅ added 2026-07-21 (current + future) |

---

## 2. Gaps — Figma button families with no code component

1. ~~**Destructive / danger button**~~ — ✅ **RESOLVED 2026-07-21.** Added `variant="danger"` to `Button.tsx` (5 states, red-400/500/600 ramp), with stories + unit/a11y tests. Full pipeline green (token gate PASS, vitest 246/246, Storybook build ✅, typecheck ✅).
2. **Square / Icon button** (`Button/SquareLG`, `Button/SquareSM`) — legacy orange icon button, 5 states each. No code equivalent (`CLAUDE.md` calls for a deprecated `IconButton.tsx`; not present). **HELD** — behind the §4 WIP flag; legacy orange direction is ADA-deprecated. Confirm canonicity before building.
3. **Chip button** (`Button/Chip` Large/Small, plus `ChipSM`/`ChipLG`) — no `ChipButton` component in code. **HELD** — behind the §4 WIP flag; confirm canonicity.
4. **Segmented button** (`Button/Segmented/Asset`, `.../Event`, Left/Right, 6 states) — no segmented-control component anywhere in code. **HELD** — behind the §4 WIP flag; confirm canonicity.

> **Why danger shipped but the other three held:** `danger`/`destructive` is a stable family explicitly specced as canonical in `CLAUDE.md`, so adding it is additive and non-controversial. Square/Chip/Segmented all sit behind the "WIP — NEW — UPDATE BUTTON LIBRARY" redesign (§4) and/or the legacy-orange deprecation — building them now risks shipping soon-to-be-obsolete APIs. They need a canonicity call from the design owner first.

---

## 3. Divergences (present both sides, but don't line up)

- **Inline button naming.** Figma: `Director`, `InlineUn`, `Edit`, plus loose `InlineBl` / `InlineGr`. Code `ButtonInline`: `link | link-blue | tall | dir`. Only `dir` ↔ `Director` is an obvious match; the rest need an explicit mapping table.
- **Secondary SM "Icon" variant.** Figma has an icon-only small secondary; code exposes `leftIcon`/`rightIcon` props but no dedicated icon-only affordance.
- **Focused state.** Figma `Primary` has no Focused variant; code implements `focus-visible` rings for all variants (code is more complete — no action needed, just noting the asymmetry).
- **`CLAUDE.md` spec vs reality.** The doc describes 5 separate files (`Button`, `InlineButton`, `ChipButton`, `ArrowButton`, `IconButton`) with `danger`/`ghost` variants. The repo ships one `Button.tsx` with `pill`/`inline`/`arrow` folded in and no `danger`/`ghost`/`chip`/`icon`. The doc and the code disagree — worth reconciling.

---

## 4. Context flag

The Figma page contains a large **"WIP — NEW — UPDATE BUTTON LIBRARY"** section — the button system is mid-redesign in Figma. Some of the divergences above may be intentional (old vs new). Confirm which button set is canonical before building the four missing families.

---

## 5. Recommended actions

1. Confirm canonical button set (current vs the WIP redesign) before adding components.
2. Add **danger/destructive** variant to `Button.tsx` (5 states) — highest priority; it's specced and shipped-missing.
3. Decide whether **Chip**, **Segmented**, and **Square/Icon** buttons belong in the React library; if yes, build them.
4. Write an explicit Inline-button name map (Figma ↔ `ButtonInline.kind`).
5. Reconcile `CLAUDE.md`'s button spec with the actual `Button.tsx` API so future generation doesn't fight the real code.

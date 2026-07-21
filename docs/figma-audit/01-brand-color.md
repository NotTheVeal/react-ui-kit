# Figma ↔ Code Audit — Page 01: Brand Color

**Figma page:** Brand Color (`1:206`) · file `pyZ5wKN9KGBUfgi47UwQ0q`
**Code source of truth:** `tokens.css` (`--ps-prim-*`)
**Date:** 2026-07-20
**Method:** extracted the *actual* swatch fills from Figma (the on-canvas "HEX #…" captions are unreliable — see §3), then matched each against the primitive palette in `tokens.css`.

---

## 1. Summary

| Section | Swatches | In code (value-identical) | Not in code |
|---|---|---|---|
| Main | 23 | 20 | 3 |
| Data | 9 | 7 | 2 |
| Formulary | 5 | 0 | 5 |
| Plus | 2 | 0 | 2 |
| **Total** | **39** | **27** | **12** |

27 of 39 brand swatches map cleanly to a `--ps-prim-*` token. 12 do not exist in the code token system at all.

---

## 2. Gaps — Figma colors with no code token

| Section | Swatch | Figma fill | Closest code token | Note |
|---|---|---|---|---|
| Main | Orange 5 | `#FFE4C0` | — | no match; palette skips from orange-100 `#FFCA82` to orange-50 `#FFF4E5` |
| Main | Green 2 | `#8BD5BC` | green-100 `#B8E6D5` | different light green |
| Main | Red | `#FF0000` | red-700 `#E00000` | **pure red vs code's `#E00000`** |
| Data | Negative Expression | `#FF0000` | red-700 `#E00000` | same pure-red mismatch |
| Data | Active Expression | `#ACACAC` | gray-400 `#CCCCCC` / gray-500 `#949494` | no match |
| Main | Light Red | `#FACBCB` | red-50 `#FFEBEB` | no match |
| Formulary | Best | `#29A10F` | — | formulary greens absent |
| Formulary | Very Good | `#03C700` | — | absent |
| Formulary | Moderate | `#E9E022` | — | absent (no yellow primitive) |
| Formulary | Fair | `#F58B00` | — | absent |
| Formulary | Poor | `#DE3700` | — | absent |
| Plus | Plus Teal | `#00CBB7` | teal-400 `#03D0BF` | close, not identical |
| Plus | Plus Blue | `#005499` | blue-500 `#005BA6` | close, not identical |

The **Formulary Score** palette (5 colors) and **Plus+ Rewards** palette (2 colors) are entirely missing from the code tokens. These are product-specific semantic scales (formulary rating, rewards tier) — likely deserve their own semantic token group rather than raw primitives.

The **pure-red `#FF0000`** appears twice in Figma (Main "Red", Data "Negative Expression") but the code deliberately uses `#E00000` (red-700). Worth confirming which is canonical before adding a token.

---

## 3. Data-quality issue in the Figma file (not a code problem)

The on-canvas **"HEX #…" caption text is stale/wrong on many swatches** — the caption does not match the actual fill. Examples where the *fill* is correct but the *label* lies:

| Swatch | Caption says | Actual fill |
|---|---|---|
| Orange 3 | `#005BA6` | `#D27200` |
| Light Blue | `#17AB78` | `#D0EDFC` |
| Blue 3 | `#FF0000` | `#003763` |
| Grey 2 | `#17AB78` | `#777777` |
| White | `#FF0000` | `#FFFFFF` |
| Active Expression | `#FFCA82` | `#ACACAC` |
| Comparison Light 02 | `#004A84` | `#DCDCDC` |
| Best | `#000000` | `#29A10F` |
| Very Good | `#005BA6` | `#03C700` |
| Moderate | `#009CF4` | `#E9E022` |
| Fair | `#17AB78` | `#F58B00` |

Recommendation: regenerate these caption text nodes from the swatch fill (or bind them) so the reference page stops lying. This is a Figma-side fix, independent of the token gaps above.

---

## 4. Recommended actions

1. Decide canonical **Red**: pure `#FF0000` (Figma) vs `#E00000` (code). Align both sides.
2. Add a **Formulary Score** semantic group (best/very-good/moderate/fair/poor) — 5 tokens.
3. Add a **Plus+ Rewards** group (teal, blue) — 2 tokens; confirm `#00CBB7`/`#005499` vs existing teal/blue primitives.
4. Add or intentionally drop the orphan lights: Orange 5 `#FFE4C0`, Green 2 `#8BD5BC`, Light Red `#FACBCB`, Active Expression `#ACACAC`.
5. Fix the stale HEX captions in the Figma page (§3).

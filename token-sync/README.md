# Brücke → DTCG token pipeline

Native Figma Variables (a Tokens-Brücke / Plugin-API dump) → the repo's 5-set
DTCG → `tokens.css`, with a value-identity gate proving the live UI cannot
change. This is the **native-variables** path; it complements the REST
value-sync in `figma-token-sync.yml`.

## The one-command chain

```bash
npm install
npm run tokens:sync            # baseline → reconcile → adapt → build → additive gate
# or, to prove the chain without mutating the committed source:
bash sync.sh --restore
```

`sync.sh` runs, in the only safe order:

1. **Baseline** — build `tokens.css` from the *currently-committed* `src/tokens`
   → `build/tokens.css.baseline` (the "UI cannot change" anchor).
2. **Reconcile** — prove the Figma dump converts value-identical to the
   committed tokens in **both** light and dark, for all three tiers. These read
   on-disk committed JSON, so they must run *before* the adapter rewrites it.
3. **Adapt** — `bruecke_to_canonical.py` merges `fixtures/` → `src/tokens`.
   The merge is **additive and non-destructive**: existing tokens keep their
   hand-authored node, only net-new tokens are added (see below).
4. **Build** — Style Dictionary v4 → `build/tokens.css`.
5. **Gate** — `gate.py --additive`: every baseline custom property must resolve
   value-identical in light **and** dark; new tokens are permitted. Empty
   disqualifying diff ⇒ the live UI cannot change.

Exits non-zero if the gate rejects the result, so CI fails before any PR.

## Why the merge must be additive (the embedded-ref trap)

The repo authors composite tokens with **embedded refs**, e.g.
`ps-cmp-accordion-border-open = "2px solid {ps-sem-fg-brand}"`.
`{ps-sem-fg-brand}` has a dark override, so Style Dictionary emits
`2px solid var(--ps-sem-fg-brand)` and dark mode cascades correctly.

A Figma **STRING** variable cannot hold a ref, so the dump carries the baked
*light* literal `"2px solid #005BA6"` with no dark variant. Emitting that
literal would silently break dark mode (it would stay light-blue). Because
reconcile has already proven every existing token value-identical, the adapter
**preserves the repo's authored node** for any token that already exists and
only adds net-new tokens. Three composite tokens depend on this
(`accordion-border-open`, `accordion-focus-ring`, `date-picker-field-border-focus`).

## Current run result

- Reconcile: PASS — primitive 178/178, semantic 119/119 (both modes),
  component 581/581 (resolved).
- Additive merge: +19 primitives, +35 components (0 existing tokens mutated).
- Gate: **PASS** in light and dark — 0 changed, 0 removed, 54 new additive
  custom properties permitted.

## Files

| File | Role |
|---|---|
| `bruecke_to_canonical.py` | Figma Variables dump → 5-set DTCG (additive merge in `main()`) |
| `reconcile_{primitive,semantic,component}.py` | prove value-identity per tier before rewrite |
| `gate.py` | resolve `var()` chains in light+dark; `--additive` permits new tokens |
| `build.mjs` | Style Dictionary v4 → `build/tokens.css` |
| `sync.sh` | the ordered chain (add `--restore` to keep committed source pristine) |
| `.github/workflows/figma-token-adapt.yml` | CI: run the chain on a dump change, open a PR |
| `fixtures/` | committed Figma dumps (`_primitive_in`, `_component_in`, `semantic_live`) |
| `src/tokens/` | the committed DTCG source of truth (react-ui-kit) |

## Pushing the workflow

`.github/workflows/figma-token-adapt.yml` must be pushed with a token that has
the `workflow` scope. The terminal PAT does not — push it via **GitHub Desktop**
(as with the other workflow files).

> NOTE: the CI workflow that runs this adapter lives in `_workflow-to-install/figma-token-adapt.yml.txt`.
> It is NOT active here. To activate the Brücke path, move it to the repo root `.github/workflows/figma-token-adapt.yml`
> via GitHub Desktop (terminal PAT lacks `workflow` scope) — this is the live-integration step and an architecture decision.

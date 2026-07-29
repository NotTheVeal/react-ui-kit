#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# sync.sh — Figma-Variables -> repo-tokens sync driver (additive & reversible)
#
# Runs the full Bruecke pipeline in the ONE order that is safe:
#
#   1. BASELINE   build tokens.css from the CURRENTLY-COMMITTED src/tokens
#                 -> build/tokens.css.baseline  (the "UI cannot change" anchor)
#   2. RECONCILE  prove the live Figma dump converts value-identical to the
#                 committed src/tokens, in BOTH modes, for all 3 tiers.
#                 These read the ON-DISK committed JSON, so they MUST run
#                 BEFORE the adapter overwrites it.
#   3. ADAPT      bruecke_to_canonical.py regenerates src/tokens from fixtures/
#                 (adds net-new additive tokens; never mutates existing values).
#   4. BUILD      Style Dictionary v4 -> build/tokens.css
#   5. GATE       gate.py --additive baseline vs generated: every baseline
#                 custom property must resolve value-identical in light+dark;
#                 new additive properties are permitted. Empty disqualifying
#                 diff => the live UI cannot change.
#
# Exit non-zero on any failure. Safe to run locally: pass --restore to snapshot
# src/tokens before ADAPT and put it back afterwards (keeps the committed SoT
# pristine while still proving the end-to-end chain).
# ---------------------------------------------------------------------------
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE"

RESTORE=0
[[ "${1:-}" == "--restore" ]] && RESTORE=1

say() { printf '\n\033[1m== %s ==\033[0m\n' "$*"; }

# ---- 1. BASELINE -----------------------------------------------------------
say "1/5 BASELINE build (from committed src/tokens)"
node build.mjs
cp build/tokens.css build/tokens.css.baseline
echo "  -> build/tokens.css.baseline"

# ---- 2. RECONCILE (against on-disk committed src/tokens) --------------------
say "2/5 RECONCILE live Figma dump vs committed tokens (all tiers, both modes)"
python3 reconcile_primitive.py
python3 reconcile_semantic.py
python3 reconcile_component.py

# ---- 3. ADAPT --------------------------------------------------------------
if [[ $RESTORE -eq 1 ]]; then
  SNAP="$(mktemp -d)"
  cp -R src/tokens/. "$SNAP/"
  echo "  (snapshot of src/tokens taken for --restore)"
fi
say "3/5 ADAPT fixtures -> src/tokens (additive regenerate)"
python3 bruecke_to_canonical.py

# ---- 4. BUILD --------------------------------------------------------------
say "4/5 BUILD src/tokens -> build/tokens.css"
node build.mjs

# ---- 5. GATE ---------------------------------------------------------------
say "5/5 GATE (additive): baseline properties must be value-identical"
set +e
python3 gate.py --additive build/tokens.css.baseline build/tokens.css
GATE_RC=$?
set -e

if [[ $RESTORE -eq 1 ]]; then
  # Overwrite in place (truncate-write) rather than rm+recreate — some mounts
  # forbid unlink but permit open("w"). cp over the existing files does exactly that.
  cp -R "$SNAP/." src/tokens/
  rm -rf "$SNAP" 2>/dev/null || true
  echo "  (src/tokens restored to committed SoT)"
fi

if [[ $GATE_RC -ne 0 ]]; then
  echo ""
  echo "SYNC FAILED: gate rejected the generated tokens (UI would change). No PR."
  exit $GATE_RC
fi

say "SYNC OK — tokens are additive & value-identical; safe to open a PR"

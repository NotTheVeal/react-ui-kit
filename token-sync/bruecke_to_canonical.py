#!/usr/bin/env python3
"""
bruecke_to_canonical.py  —  Figma native Variables -> repo's 5-set DTCG.

The conversion layer between what a Figma-Variables export produces (Tokens Bruecke,
or an equivalent Plugin-API dump) and what the react-ui-kit pipeline consumes.

INPUT  : one JSON per SoT collection, shape (as produced by tools/dump_variables.js):
   { "collection": "<name>", "modes": ["Mode 1", ...],
     "vars": { "<flat-name>": { "type": "COLOR|FLOAT|STRING",
                                "<mode>": "<alias-or-literal>", ... } } }
OUTPUT : primitive.json, semantic.json, semantic.dark.json, component.json
   (legacy.json is repo-owned back-compat and is never touched.)

Bar for correctness = VALUE identity against the build, enforced by gate.py and the
reconcile_*.py scripts.

--- THE CONVERSION SURFACE ---
Figma Variables carry only 4 resolvedTypes: COLOR / FLOAT / STRING / BOOLEAN. The repo
DTCG carries richer W3C $types (dimension, duration, number, fontFamily, cubicBezier)
plus units (px, ms). Figma cannot store units, so every FLOAT arrives unitless and every
non-color STRING arrives as a bare string. This module re-attaches $type + unit purely
from the flat token NAME family (and, for a few strings, the value shape) so the emitted
JSON is byte-shaped like the checked-in repo tokens. It also rounds float32 export noise
(e.g. 0.20000000298 -> 0.2). Proven value-identical against the live file by
reconcile_primitive.py / reconcile_semantic.py / reconcile_component.py.
"""
import json, re, os, sys

# --- collection name -> (set-name, kind) -------------------------------------
COLLECTIONS = {
    "PS · Primitives (SoT)": ("primitive", "resolved"),   # emit hex/number + $type
    "PS · Semantic (SoT)":   ("semantic",  "aliased"),    # keep {refs}; split modes
    "PS · Component (SoT)":  ("component", "aliased"),
}
# stale collections that would pollute any raw export — dropped by omission above:
#   "Variable collection", "Properties", "Palette"

TYPE_MAP = {"COLOR": "color", "FLOAT": "number", "STRING": "string"}

ALIAS = re.compile(r"\{([^}]+)\}")

# ---------- name-family classifiers (unitless FLOATs -> typed DTCG) -----------
# A FLOAT whose name matches one of these is a unitless NUMBER (ratio/weight/count/
# opacity/z-index), NOT a px dimension.
# NB: "-count-" is deliberately absent — count badges carry px dimensions
# (e.g. ps-cmp-tab-count-height=18px), so the name family is decided by the
# dimensional suffix (height/width/...), not the "count" segment.
NUMBER_NAME = re.compile(
    r"(-weight-|-lh-|-opacity(-|$)|-z-\d|-tracking-none$"
    r"|-line-clamp(-|$)|-flex(-|$)|-scale(-|$)|-ratio(-|$))"
)
DURATION_NAME = re.compile(r"(-duration(-|$)|-motion-ms(-|$))")

def leaf(ref: str) -> str:
    """Normalise an alias ref to the flat leaf token name.
    Bruecke may emit {Collection.group.ps-prim-blue-500}; repo wants {ps-prim-blue-500}."""
    inner = ref.strip("{}")
    inner = inner.split(".")[-1].split("/")[-1].strip()
    return inner

def is_alias(v) -> bool:
    return isinstance(v, str) and v.startswith("{") and v.endswith("}")

def _round32(x):
    """Strip float32 export noise. 0.20000000298 -> 0.2 ; 300.0 -> 300."""
    r = round(float(x), 4)
    return int(r) if r == int(r) else r

def fmt_num(x):
    """Format a rounded number the way the repo does: ints as '300', floats as '1.35'."""
    r = _round32(x)
    return str(r)

# single-color string: #hex or a lone rgb()/rgba()
_COLOR_STR = re.compile(r"^(#[0-9A-Fa-f]{3,8}|rgba?\([^)]*\))$")

def _round_rgba(s: str) -> str:
    """Round float32 noise inside an rgba()/rgb() literal's alpha/channels."""
    def fix(m):
        n = float(m.group(0))
        r = round(n, 4)
        return str(int(r)) if r == int(r) else str(r)
    return re.sub(r"\d+\.\d+", fix, s)

def infer(name, raw, figma_type):
    """One resolved literal -> a DTCG node with the repo's $type + unit."""
    # ---- COLOR ----
    if figma_type == "COLOR":
        return {"$value": _round_rgba(raw) if isinstance(raw, str) else raw, "$type": "color"}

    # ---- STRING ----
    if isinstance(raw, str):
        s = raw.strip()
        if _COLOR_STR.match(s):
            return {"$value": _round_rgba(s), "$type": "color"}
        if s.startswith("cubic-bezier"):
            return {"$value": s, "$type": "cubicBezier"}
        # a bare time literal that carries its own unit (e.g. "2s") but whose name
        # says duration — Figma stored it as STRING because of the unit char.
        if DURATION_NAME.search(name) and re.match(r"^\d+(\.\d+)?m?s$", s):
            return {"$value": s, "$type": "duration"}
        if "-font-" in name or "font-family" in name:
            return {"$value": raw, "$type": "fontFamily"}
        # shadows, borders ("2px solid #hex"), padding shorthands, transitions,
        # transform, transparent, none, top, 100%, etc. -> untyped string
        return {"$value": _round_rgba(raw)}

    # ---- FLOAT (unitless number from Figma) ----
    if DURATION_NAME.search(name):
        return {"$value": f"{fmt_num(raw)}ms", "$type": "duration"}
    if NUMBER_NAME.search(name):
        return {"$value": fmt_num(raw), "$type": "number"}
    # zero in a dimension family is stored unitless in the repo (e.g. space-0 -> "0")
    if _round32(raw) == 0:
        return {"$value": "0", "$type": "number"}
    # everything else numeric is a px dimension (size/space/radius/border/bp/icon/
    # container/height/width/padding/gap/tracking/stroke/...)
    return {"$value": f"{fmt_num(raw)}px", "$type": "dimension"}

def to_dtcg(name, raw, kind, figma_type):
    """One variable value -> a DTCG node ({$value} or {$value,$type})."""
    if is_alias(raw):
        return {"$value": "{" + leaf(raw) + "}"}          # alias: no $type
    return infer(name, raw, figma_type)

def _norm(s):
    if not isinstance(s, str):
        return str(s)
    return re.sub(r"\s+", " ", s.strip())

def convert(dumps: dict) -> dict:
    """dumps: {collection_name: dump}. Returns {set_name: dtcg_dict (+ .dark)}."""
    out = {}
    for cname, dump in dumps.items():
        if cname not in COLLECTIONS:
            continue                                       # drop stale collections
        set_name, _ = COLLECTIONS[cname]
        modes = dump["modes"]
        base_mode = modes[0]                               # "Mode 1" is the base
        base = {}
        for name, rec in dump["vars"].items():
            base[name] = to_dtcg(name, rec[base_mode], set_name, rec.get("type", "STRING"))
        out[set_name] = base

        # additional modes -> strict-diff overlay files (e.g. semantic.dark.json)
        for m in modes[1:]:
            overlay = {}
            for name, rec in dump["vars"].items():
                if _norm(rec[m]) != _norm(rec[base_mode]):
                    overlay[name] = to_dtcg(name, rec[m], set_name, rec.get("type", "STRING"))
            out[f"{set_name}.{m.lower()}"] = overlay
    return out

def main():
    src = sys.argv[1] if len(sys.argv) > 1 else "fixtures"
    dst = sys.argv[2] if len(sys.argv) > 2 else "src/tokens"
    here = os.path.dirname(os.path.abspath(__file__))
    src, dst = os.path.join(here, src), os.path.join(here, dst)

    dumps = {}
    for fn in sorted(os.listdir(src)):
        if fn.endswith(".json"):
            d = json.load(open(os.path.join(src, fn)))
            if "collection" in d and "vars" in d:
                dumps[d["collection"]] = d

    result = convert(dumps)
    # map internal set keys -> repo filenames ("semantic.dark" -> semantic.dark.json)
    for set_key, data in result.items():
        fname = set_key.replace(" ", "") + ".json"
        dst_path = os.path.join(dst, fname)

        # --- ADDITIVE, NON-DESTRUCTIVE MERGE -------------------------------
        # For any token that ALREADY exists in the repo, keep the repo's
        # hand-authored node and DO NOT overwrite it with the Figma-derived
        # value. reconcile_*.py has already proven every overlapping token is
        # value-identical, so preserving the authored form changes nothing that
        # renders — but it retains composite strings that embed token refs
        # (e.g. "2px solid {ps-sem-fg-brand}"). A Figma STRING variable cannot
        # hold a ref, so the live dump bakes the resolved LIGHT literal
        # ("2px solid #005BA6"); emitting that literal would silently break dark
        # mode (the ref would no longer follow the semantic dark override).
        # Net-new tokens from Figma are ADDED. This makes the sync purely
        # additive and fully reversible.
        if os.path.exists(dst_path):
            existing = json.load(open(dst_path))
            merged = {**data, **existing}      # authored repo node wins on overlap; new keys added
            added = len(merged) - len(existing)
        else:
            merged, added = data, len(data)

        with open(dst_path, "w") as f:
            json.dump(merged, f, indent=2)
        print(f"wrote {fname}: {len(merged)} tokens (+{added} additive)")
    print("NOTE: legacy.json left untouched (repo-owned back-compat aliases).")

if __name__ == "__main__":
    main()

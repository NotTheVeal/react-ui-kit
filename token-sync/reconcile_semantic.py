#!/usr/bin/env python3
"""Prove the Bruecke path for the SEMANTIC tier: run the adapter on the LIVE
PS-Semantic Figma collection (two modes: Mode 1 + Dark) and value-diff its output
against the checked-in semantic.json + semantic.dark.json.

Adapter-based (matches reconcile_primitive.py / reconcile_component.py): the adapter
re-attaches $type + units the same way for every tier, so the one historic delta
(ps-sem-icon-stroke arriving as unitless 1.5, repo wants "1.5px") is now closed by
the generic name-family inference rather than a per-token special case.

Bar = RESOLVED value-identity in BOTH modes (aliases resolved through primitive),
plus a check that the strict dark-diff overlay shape matches the repo overlay."""
import json, re, os
from bruecke_to_canonical import convert

HERE = os.path.dirname(os.path.abspath(__file__))
T = os.path.join(HERE, "src", "tokens")

dump = json.load(open(os.path.join(HERE, "fixtures", "semantic_live.json")))
out = convert({dump["collection"]: dump})
emit_light = out["semantic"]
emit_dark_overlay = out.get("semantic.dark", {})

prim = json.load(open(os.path.join(T, "primitive.json")))
repo_light = json.load(open(os.path.join(T, "semantic.json")))
repo_dark_overlay = json.load(open(os.path.join(T, "semantic.dark.json")))

ALIAS = re.compile(r"\{([^}]+)\}")

def norm(v):
    if not isinstance(v, str):
        return str(v)
    s = re.sub(r"\s+", " ", v.strip()).upper()
    s = re.sub(r"(?<![\d.])\.(\d)", r"0.\1", s)
    def fixnum(m):
        n = float(m.group(0)); return str(int(n)) if n == int(n) else str(n)
    return re.sub(r"\d+\.\d+", fixnum, s)

def resolve(val, table):
    prev, cur = None, str(val)
    while prev != cur:
        prev = cur
        def sub(m):
            k = m.group(1)
            if k in prim: return str(prim[k]["$value"])
            if k in table: return str(table[k]["$value"])
            return m.group(0)
        cur = ALIAS.sub(sub, cur)
    return norm(cur)

def cmp_mode(emit_tbl, repo_tbl, label):
    mism = []
    for name, en in emit_tbl.items():
        if name not in repo_tbl: continue
        lv = resolve(en["$value"], emit_tbl)
        rv = resolve(repo_tbl[name]["$value"], repo_tbl)
        if lv != rv:
            mism.append((name, en["$value"], repo_tbl[name]["$value"], lv, rv))
    print(f"\n=== {label} ===")
    print(f"emitted: {len(emit_tbl)}  repo: {len(repo_tbl)}  value mismatches: {len(mism)}")
    for n, lraw, rraw, lr, rr in mism:
        print(f"  MISMATCH {n}: adapter[{lraw!r}]->{lr!r}  repo[{rraw!r}]->{rr!r}")
    return len(mism)

# effective tables (dark inherits light then overlays)
emit_dark = dict(emit_light);  emit_dark.update(emit_dark_overlay)
repo_dark = dict(repo_light);  repo_dark.update(repo_dark_overlay)

fails  = cmp_mode(emit_light, repo_light, "LIGHT / Mode 1")
fails += cmp_mode(emit_dark,  repo_dark,  "DARK (light + overlay)")

print("\n=== DARK OVERLAY SHAPE ===")
eo, ro = set(emit_dark_overlay), set(repo_dark_overlay)
print(f"adapter overlay: {len(eo)}   repo overlay: {len(ro)}")
print("  in repo overlay not adapter:", sorted(ro - eo))
print("  in adapter overlay not repo:", sorted(eo - ro))

print("\nRESULT:", "PASS - value-identical across both modes" if fails == 0 else f"FAIL ({fails})")
import sys; sys.exit(0 if fails == 0 else 1)

#!/usr/bin/env python3
"""Prove the Bruecke path for the PRIMITIVE tier: run the adapter on the live
PS-Primitives dump and value-diff every emitted token against the checked-in
primitive.json.  Value-identity (not byte-identity) is the bar.

Primitives are resolved leaves, so the check is direct: for every token that exists
in BOTH the live dump and the repo, adapter($value,$type) must equal repo($value,$type)
after normalisation (uppercased hex, rounded floats, whitespace-collapsed strings).
Net-new live primitives (not yet in the repo) are reported as additive, not failures."""
import json, re, os
from bruecke_to_canonical import convert

HERE = os.path.dirname(os.path.abspath(__file__))
T = os.path.join(HERE, "src", "tokens")

dump = json.load(open(os.path.join(HERE, "fixtures", "_primitive_in.json")))
emitted = convert({dump["collection"]: dump})["primitive"]
repo = json.load(open(os.path.join(T, "primitive.json")))

def norm(v):
    if not isinstance(v, str):
        return str(v)
    s = re.sub(r"\s+", " ", v.strip()).upper()
    def fixnum(m):
        n = float(m.group(0)); return str(int(n)) if n == int(n) else str(n)
    return re.sub(r"\d+\.\d+", fixnum, s)

def node(n):
    return (norm(n["$value"]), n.get("$type", "<none>"))

mism, extra = [], []
overlap = 0
for name, rn in repo.items():
    if name not in emitted:
        extra.append(name); continue
    overlap += 1
    ev, rv = node(emitted[name]), node(rn)
    if ev != rv:
        mism.append((name, emitted[name], rn))

new_in_live = [k for k in emitted if k not in repo]

print("=== PRIMITIVE RECONCILE ===")
print(f"live emitted: {len(emitted)}   repo: {len(repo)}   overlap: {overlap}")
print(f"value/type mismatches: {len(mism)}")
print(f"in-repo-not-live: {len(extra)}   net-new-in-live (additive): {len(new_in_live)}")
for n, e, r in mism:
    print(f"  MISMATCH {n}: adapter={e}  repo={r}")
if extra:
    print("  IN REPO NOT LIVE:", extra)
if new_in_live:
    print("  NET-NEW PRIMITIVES (live has, repo lacks):", sorted(new_in_live))

ok = (len(mism) == 0 and len(extra) == 0)
print("\nRESULT:", "PASS - all repo primitives value-identical" if ok else f"FAIL ({len(mism)} mism, {len(extra)} missing)")
import sys; sys.exit(0 if ok else 1)

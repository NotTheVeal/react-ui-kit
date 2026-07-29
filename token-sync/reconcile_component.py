#!/usr/bin/env python3
"""Prove the Bruecke path for the COMPONENT tier: run the adapter on the live
PS-Component dump and value-diff every emitted token against the checked-in
component.json.

Components are mostly ALIASES ({ps-sem-*}/{ps-prim-*}/{ps-cmp-*}) plus resolved
literals (heights, focus-rings, scrims, opacities, and composite strings such as
"2px solid {ps-prim-gray-150}").

The bar is RESOLVED value-identity. Two wrinkles the naive string compare must handle:
  1. The repo authors composite strings with EMBEDDED token refs
     ("1px solid {ps-prim-gray-200}"). A Figma STRING variable cannot hold a ref
     inside a string, so the live dump carries the fully-resolved literal
     ("1px solid #E6E6E6"). We therefore RESOLVE every {ref} (prim+sem+cmp,
     recursively) on both sides before comparing.
  2. rgba()/hex spacing + leading-zero differ cosmetically ("rgba(255,255,255,.92)"
     vs "rgba(255, 255, 255, 0.92)"). Normalised away.

$type-only differences on composite shorthands (the repo stamps $type:cubicBezier /
dimension on a few transition/padding shorthands, inconsistently with its own peers)
are reported separately as COSMETIC and do not fail the run — the resolved values
are identical. Net-new live tokens are reported as additive."""
import json, re, os
from bruecke_to_canonical import convert

HERE = os.path.dirname(os.path.abspath(__file__))
T = os.path.join(HERE, "src", "tokens")

dump = json.load(open(os.path.join(HERE, "fixtures", "_component_in.json")))
emitted = convert({dump["collection"]: dump})["component"]
repo = json.load(open(os.path.join(T, "component.json")))

prim = json.load(open(os.path.join(T, "primitive.json")))
sem  = json.load(open(os.path.join(T, "semantic.json")))
# resolution table: prim + sem + repo component (for cross {ps-cmp-*} refs)
TABLE = {}
for src in (prim, sem, repo):
    for k, v in src.items():
        TABLE[k] = v["$value"]

ALIAS = re.compile(r"\{([^}]+)\}")

def resolve(val):
    if not isinstance(val, str):
        return str(val)
    prev, cur = None, val
    while prev != cur:
        prev = cur
        cur = ALIAS.sub(lambda m: str(TABLE.get(m.group(1), m.group(0))), cur)
    return cur

def norm(v):
    s = resolve(v)
    s = s.upper()
    # kill all whitespace inside rgb/rgba, then normalise leading-zero decimals
    s = re.sub(r"RGBA?\([^)]*\)", lambda m: re.sub(r"\s+", "", m.group(0)), s)
    s = re.sub(r"(?<![\d.])\.(\d)", r"0.\1", s)          # .92 -> 0.92
    s = re.sub(r"\s+", " ", s.strip())
    def fixnum(m):
        n = float(m.group(0)); return str(int(n)) if n == int(n) else str(n)
    return re.sub(r"\d+\.\d+", fixnum, s)

val_mism, type_only, extra = [], [], []
overlap = 0
for name, rn in repo.items():
    if name not in emitted:
        extra.append(name); continue
    overlap += 1
    en = emitted[name]
    if norm(en["$value"]) != norm(rn["$value"]):
        val_mism.append((name, en, rn))
    elif en.get("$type", "<none>") != rn.get("$type", "<none>"):
        type_only.append((name, en.get("$type", "<none>"), rn.get("$type", "<none>")))

new_in_live = [k for k in emitted if k not in repo]

print("=== COMPONENT RECONCILE (resolved value-identity) ===")
print(f"live emitted: {len(emitted)}   repo: {len(repo)}   overlap: {overlap}")
print(f"VALUE mismatches: {len(val_mism)}")
print(f"cosmetic $type-only diffs: {len(type_only)}")
print(f"in-repo-not-live: {len(extra)}   net-new-in-live (additive): {len(new_in_live)}")
for n, e, r in val_mism:
    print(f"  VALUE MISMATCH {n}: adapter={e}  repo={r}")
for n, et, rt in type_only:
    print(f"  cosmetic $type {n}: adapter[{et}] repo[{rt}] (resolved value identical)")
if extra:
    print("  IN REPO NOT LIVE:", extra)
if new_in_live:
    print(f"  NET-NEW COMPONENT TOKENS ({len(new_in_live)}): {sorted(new_in_live)}")

ok = (len(val_mism) == 0 and len(extra) == 0)
print("\nRESULT:", "PASS - all repo component tokens resolved-value-identical"
      if ok else f"FAIL ({len(val_mism)} value mism, {len(extra)} missing)")
import sys; sys.exit(0 if ok else 1)

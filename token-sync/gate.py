#!/usr/bin/env python3
"""UI-safety gate: prove the SD-generated tokens.css resolves every custom
property to the SAME value as the committed hand file, in BOTH light and dark
contexts. Empty diff => the UI cannot change.

Usage:
  gate.py <committed.css> <generated.css>              # strict: exact property-set match
  gate.py --additive <baseline.css> <generated.css>    # additive: every baseline
        property must be value-identical in generated; generated-only properties
        (new additive tokens) are permitted. Removed/changed properties still FAIL.
        This is the merge gate for the Figma->tokens sync: the UI cannot change,
        but new tokens may be added."""
import re, sys

def blocks(path):
    css = open(path).read()
    out = {'root': {}, 'dark': {}}
    order = {'root': [], 'dark': []}
    for m in re.finditer(r'(:root|\[data-theme="dark"\])\s*\{', css):
        sel = m.group(1); i = m.end(); depth=1; j=i
        while depth:
            if css[j]=='{':depth+=1
            elif css[j]=='}':depth-=1
            j+=1
        body = css[i:j-1]
        key = 'dark' if sel.startswith('[') else 'root'
        for n,v in re.findall(r'(--[A-Za-z0-9-]+)\s*:\s*([^;]+);', body):
            if n not in out[key]: order[key].append(n)
            out[key][n]=v.strip()   # later :root merges; last wins like CSS cascade
    return out, order

VARRE = re.compile(r'var\(\s*(--[A-Za-z0-9-]+)\s*(?:,[^)]*)?\)')
def resolve(name, table, seen=None):
    seen = seen or set()
    if name in seen: return f'<cycle:{name}>'
    seen = seen | {name}
    v = table.get(name)
    if v is None: return f'<undef:{name}>'
    return VARRE.sub(lambda m: resolve(m.group(1), table, seen), v)

def cnorm(s):
    """Semantic-preserving normalisation so cosmetically-different-but-value-
    identical literals compare equal (same rule the reconcile scripts use):
      - collapse all whitespace, uppercase (hex case-insensitive)
      - strip whitespace INSIDE rgb()/rgba()  ("rgba(0, 47, 72, 0.2)" == "rgba(0,47,72,.2)")
      - leading-zero decimals  (".92" -> "0.92")
      - trailing-zero decimals ("0.20" -> "0.2", "0.10" -> "0.1")
    CSS treats 0.20 and 0.2 as the same colour, so a diff here is NOT a UI change."""
    s = re.sub(r'\s+', ' ', s).strip().upper()
    s = re.sub(r'RGBA?\([^)]*\)', lambda m: re.sub(r'\s+', '', m.group(0)), s)
    s = re.sub(r'(?<![\d.])\.(\d)', r'0.\1', s)          # .92 -> 0.92
    def fixnum(m):
        n = float(m.group(0)); return str(int(n)) if n == int(n) else str(n)
    return re.sub(r'\d+\.\d+', fixnum, s)                # 0.20 -> 0.2

def resolved_map(path):
    b,_ = blocks(path)
    light_tbl = dict(b['root'])                 # main :root + legacy :root merged
    dark_tbl  = {**light_tbl, **b['dark']}      # dark overrides on top
    light = {n: cnorm(resolve(n,light_tbl)) for n in light_tbl}
    dark  = {n: cnorm(resolve(n,dark_tbl))  for n in light_tbl}
    return light, dark

args = sys.argv[1:]
ADDITIVE = False
if args and args[0] == "--additive":
    ADDITIVE = True
    args = args[1:]
A, B = args[0], args[1]
al, ad = resolved_map(A)
bl, bd = resolved_map(B)

def diff(x,y,label):
    # x = committed/baseline, y = generated
    keys = set(x)|set(y)
    changed, removed, added = [], [], []
    for k in sorted(keys):
        if k not in y:
            removed.append((k, x[k]))
        elif k not in x:
            added.append((k, y[k]))
        elif x[k] != y[k]:
            changed.append((k, x[k], y[k]))
    # in additive mode, generated-only (added) properties are allowed
    fail = changed + removed + ([] if ADDITIVE else added)
    print(f"[{label}] baseline vars={len(x)} generated vars={len(y)} "
          f"changed={len(changed)} removed={len(removed)} added={len(added)}"
          f"{' (added allowed)' if ADDITIVE else ''}")
    for k,xv,yv in changed[:40]:
        print(f"   CHANGED {k}\n     baseline : {xv}\n     generated: {yv}")
    for k,xv in removed[:40]:
        print(f"   REMOVED {k}  (baseline: {xv})")
    if not ADDITIVE:
        for k,yv in added[:40]:
            print(f"   ADDED {k}  (generated: {yv})")
    elif added:
        print(f"   + {len(added)} new additive properties (permitted)")
    return len(fail)

mode = "ADDITIVE (baseline properties must not change; new tokens allowed)" if ADDITIVE else "STRICT (exact property-set)"
print(f"A ({'baseline' if ADDITIVE else 'committed'}) = {A}\nB (generated) = {B}\nMODE = {mode}\n")
n1=diff(al,bl,"LIGHT / :root")
n2=diff(ad,bd,"DARK / [data-theme=dark]")
print("\nGATE:", "PASS ✅ value-identical, UI cannot change" if n1==0 and n2==0 else f"FAIL ❌ {n1+n2} disqualifying custom properties")
sys.exit(0 if n1==0 and n2==0 else 1)

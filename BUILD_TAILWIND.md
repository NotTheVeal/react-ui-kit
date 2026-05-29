# Build a True Offline `tailwind.css` for the React + TS Kit

The components in this folder use Tailwind's JIT engine for ~250+ arbitrary-value
classes (`bg-[#005BA6]`, `h-[760px]`, `shadow-[0_0_10px_5px_rgba(0,91,166,0.5)]`, etc.).
To bundle a real offline standalone HTML, Tailwind needs to scan the source and
emit those classes as static CSS — that requires the Tailwind CLI, which has to
run on your machine.

## One-time setup (≈ 2 minutes)

From this folder (`UI Kit/`):

```bash
# 1. Install Tailwind (one time per machine, or use --no-save for a throwaway run)
npm install -D tailwindcss@3.4.16

# 2. Build the CSS
npx tailwindcss \
  -c tailwind.config.js \
  -i tailwind-input.css \
  -o tailwind.css \
  --minify
```

That writes `tailwind.css` next to `index.html` (typically ~40–80 KB minified —
much smaller than the 400 KB Play CDN runtime).

## After it's built

Tell me "tailwind.css is ready" and I'll:

1. Swap the `<script src="https://cdn.tailwindcss.com">` in `index.html` for
   `<link rel="stylesheet" href="tailwind.css">`.
2. Re-run the bundler to inline `tailwind.css` into a single standalone HTML.

You'll get one file that opens offline with zero CDN dependencies.

## Optional: ship the config too

`tailwind.config.js` and `tailwind-input.css` are committed alongside this README
so anyone re-running the build gets identical output.

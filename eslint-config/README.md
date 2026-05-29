# @partssource/eslint-config

Shared ESLint config that enforces PartsSource design-system standards **inside
consuming apps** — chiefly: no raw hex colors. Drift fails the app's build, the
same way it does in the kit.

## Install (in a product app)

```bash
npm install -D @partssource/eslint-config
```

(Requires the `@partssource:registry=https://npm.pkg.github.com` line in the
app's `.npmrc` — see the kit's `CONSUMING.md`.)

## Use

In the app's `.eslintrc.cjs`:

```js
module.exports = {
  extends: ['@partssource'],
  // …your app's other config
};
```

That's it. Now this passes lint:

```tsx
<div className="bg-[var(--ps-prim-blue-500)]" />
```

…and this fails it:

```tsx
<div className="bg-[#005BA6]" />
// error: Raw hex color codes are not allowed. Use a PartsSource token…
```

## Why

A component kit alone can't stop an app developer from hardcoding `#005BA6` in
their own screens. This config closes that gap: the no-rogue-color rule travels
into every app that extends it, so the whole product surface stays on-system —
not just the shared components.

Stories and tests are exempt (they often need literal colors for illustration).

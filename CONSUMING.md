# Using the PartsSource React Kit in a product app

This is the **only** sanctioned way to use PartsSource components. Don't copy
component code or hardcode brand colors — install the package and import from
it. That guarantees you're on the real components + tokens, and you get fixes
automatically.

---

## 1. One-time setup (per app + per developer)

The kit is published to **GitHub Packages** under the `@partssource` scope.
Tell npm where to find that scope by adding a `.npmrc` to the app repo root:

```
@partssource:registry=https://npm.pkg.github.com
```

Each developer authenticates once with a GitHub Personal Access Token that has
the **`read:packages`** scope:

```bash
npm login --scope=@partssource --auth-type=legacy --registry=https://npm.pkg.github.com
# Username: <your GitHub username>
# Password: <a PAT with read:packages>
```

(In CI, set `NODE_AUTH_TOKEN` to a token with `read:packages` and add the same
`.npmrc`.)

---

## 2. Install

```bash
npm install @partssource/react-kit
```

React 18 is a peer dependency — your app already has it.

---

## 3. Load the tokens once, at your app root

The components reference CSS custom properties (`--ps-prim-*`). Import the
token stylesheet **one time** at the top of your app (e.g. `main.tsx` or
`_app.tsx`):

```ts
import '@partssource/react-kit/tokens.css';
import '@partssource/react-kit/colors.css';
```

Without this, components render without their brand colors.

---

## 4. Use components

```tsx
import { Button, Badge, Card, Tooltip } from '@partssource/react-kit';

export function QuoteRow() {
  return (
    <Card variant="event" /* … */>
      <Badge tone="warning">Urgent</Badge>
      <Button variant="primary">Buy Now</Button>
    </Card>
  );
}
```

Full API + every variant lives in Storybook — run `npm run storybook` in the
kit repo, or view the published Storybook site.

---

## 5. Staying on standard (don't go rogue)

Two rules keep an app on-system:

1. **Never hardcode a brand color.** Use the token vars, never a raw hex:
   ```tsx
   <div className="bg-[var(--ps-prim-blue-500)]" />   // ✅
   <div className="bg-[#005BA6]" />                    // ❌
   ```
2. **Never rebuild a component the kit already ships.** If the kit has a
   `Button`, use it. If it's missing a variant you need, open an issue / PR on
   the kit repo — don't fork it into your app.

To enforce rule 1 automatically in your app, extend the kit's shared ESLint
config (see `eslint-config/README.md` in the kit repo) — it fails the build on
any raw hex, exactly like the kit itself.

---

## 6. Getting updates

```bash
npm update @partssource/react-kit
```

The kit follows semver. Pin a version in `package.json`; review the changelog
before bumping a major.

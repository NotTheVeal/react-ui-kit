/* eslint-env node */
/**
 * PartsSource UI Kit — ESLint configuration
 *
 * Primary purpose: prevent raw color drift. Every color in src/*.tsx must
 * come through a token (`var(--ps-prim-...)`, `var(--ps-sem-...)`,
 * `var(--ps-cmp-...)`, or a Tailwind keyword like `white` / `black` /
 * `transparent`). The lint rule below blocks any new raw hex code from
 * landing in a string literal or template element.
 *
 * To intentionally allow a raw hex (e.g. a one-off marketing asset),
 * use:
 *   // eslint-disable-next-line no-restricted-syntax
 *   className="bg-[#abc123]"
 *
 * Run: npm run lint
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  settings: { react: { version: '18.3' } },
  ignorePatterns: [
    'dist/',
    'storybook-static/',
    'node_modules/',
    'tailwind.css',
    // Auto-generated browser copies — they mirror src/*.tsx and need not
    // be linted independently.
    '/*.tsx',
    '!/src/**/*.tsx',
  ],
  rules: {
    // ──────────────────────────────────────────────────────────────
    // THE design-system guardrail
    // ──────────────────────────────────────────────────────────────
    'no-restricted-syntax': [
      'error',
      {
        selector: "Literal[value=/^#?[0-9a-fA-F]{3,8}$/], Literal[value=/[^a-zA-Z0-9_]#[0-9a-fA-F]{3,8}\\b/]",
        message:
          'Raw hex color codes are not allowed in src/*.tsx. Use a token: var(--ps-prim-*), var(--ps-sem-*), or var(--ps-cmp-*). If you need a new color, add a primitive to tokens.css first.',
      },
      {
        selector: "JSXAttribute[name.name=/^(fill|stroke|color)$/] > Literal[value=/#[0-9a-fA-F]{3,8}/]",
        message:
          'Raw hex color codes in JSX attributes are not allowed. Use a token (var(--ps-prim-*)) or a Tailwind className.',
      },
      {
        selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b/]",
        message:
          'Raw hex color codes in template literals are not allowed. Reference a token instead.',
      },
    ],

    // React 18 / TS niceties
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      // Stories, tests, and Code Connect examples can reference raw
      // colors and hex-shaped literals (card last4, order numbers) for
      // illustration. A 4-digit last4 or "#48213" work-order number is
      // structurally indistinguishable from a hex color to the regex.
      files: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/**/*.figma.tsx'],
      rules: { 'no-restricted-syntax': 'off' },
    },
    {
      // Payment-network brand marks must render each network's exact
      // brand color per that network's brand guidelines. This is the
      // one sanctioned raw-color exception in the kit (see file header).
      files: ['src/CardBrandIcon.tsx'],
      rules: { 'no-restricted-syntax': 'off' },
    },
  ],
};

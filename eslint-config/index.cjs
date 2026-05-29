/* eslint-env node */
/**
 * @partssource/eslint-config
 *
 * Drop-in ESLint config for any app that consumes the PartsSource React Kit.
 * Its job: make design-system drift fail the build in the CONSUMING app, the
 * same way it does inside the kit itself.
 *
 * The core rule bans raw hex color codes — app developers must use token
 * variables (`var(--ps-prim-*)`, `var(--ps-sem-*)`) instead of inventing
 * colors. If a needed color doesn't exist, the fix is a PR to the kit's
 * tokens.css, not a one-off hex in an app.
 *
 * Usage in a consuming app's .eslintrc.cjs:
 *
 *   module.exports = {
 *     extends: ['@partssource'],
 *   };
 */
module.exports = {
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
        message:
          'Raw hex color codes are not allowed. Use a PartsSource token: var(--ps-prim-*), var(--ps-sem-*), or var(--ps-cmp-*). Need a new color? Add it to the kit\u2019s tokens.css and release a new version \u2014 don\u2019t inline a hex.',
      },
      {
        selector:
          "JSXAttribute[name.name=/^(fill|stroke|color)$/] > Literal[value=/#[0-9a-fA-F]{3,8}/]",
        message:
          'Raw hex in a JSX color attribute is not allowed. Reference a PartsSource token instead.',
      },
      {
        selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b/]",
        message:
          'Raw hex in a template literal is not allowed. Reference a PartsSource token instead.',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.stories.*', '**/*.test.*'],
      rules: { 'no-restricted-syntax': 'off' },
    },
  ],
};

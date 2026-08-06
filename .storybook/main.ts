import type { StorybookConfig } from '@storybook/react-vite';

/**
 * PartsSource React Kit — Storybook config.
 *
 * One `.stories.tsx` per component family lives next to the source
 * under `src/`. Storybook auto-discovers them via the glob below.
 *
 * Run with:
 *   npm run storybook        # dev server (port 6006)
 *   npm run build-storybook  # static export to storybook-static/
 */
const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|tsx|mdx)'],
  // Files under public/ are copied verbatim into the static export, so the
  // standalone Pipeline Tracker (public/tracker/index.html) ships with the
  // Storybook deploy and is served at
  // https://nottheveal.github.io/react-ui-kit/tracker/.
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  // GitHub Pages serves this repo from a project subpath
  // (https://nottheveal.github.io/react-ui-kit/). Without a matching Vite
  // `base`, the static build requests /assets/* from the domain root and the
  // page renders blank. Set the subpath for the production export only; the
  // local dev server (npm run storybook) keeps the default root base.
  async viteFinal(config, { configType }) {
    if (configType === 'PRODUCTION') {
      config.base = '/react-ui-kit/';
    }
    return config;
  },
};

export default config;

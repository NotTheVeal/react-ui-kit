import type { Preview } from '@storybook/react';
// Design-token definitions MUST load before the Tailwind utilities that reference them.
// tokens.css defines every --ps-prim/sem/cmp custom property; colors_and_type.css adds
// the Source Sans Pro @font-face rules + legacy --ps-gray/space/radius/shadow scheme.
import '../colors_and_type.css';
import '../tokens.css';
import '../tailwind.css'; // Pre-built Tailwind output — run `npm run build:css`
import { withTailwindCode } from './withTailwindCode';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'surface',
      values: [
        { name: 'surface', value: '#FFFFFF' },
        { name: 'canvas', value: '#FAFAFA' },
        { name: 'muted', value: '#F1F1F1' },
        { name: 'midnight', value: '#002F48' },
      ],
    },
    layout: 'centered',
    // Show the story JSX in the autodocs Source block, expanded by default.
    docs: { source: { state: 'open' } },
  },
  // Global decorator: every story also renders a copy-paste block of its
  // live Tailwind markup (element tree + className strings).
  decorators: [withTailwindCode],
  tags: ['autodocs'],
};

export default preview;

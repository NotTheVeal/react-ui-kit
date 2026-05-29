import type { Preview } from '@storybook/react';
import '../tailwind.css'; // Pre-built Tailwind output — run `npm run build:css`

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
  },
  tags: ['autodocs'],
};

export default preview;

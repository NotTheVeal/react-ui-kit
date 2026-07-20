import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Component test harness — kept separate from vite.config.ts (library build).
// jsdom provides a DOM for @testing-library/react; jest-axe covers ARIA/role
// checks (color-contrast rules can't run in jsdom — no CSS layout/paint).
export default defineConfig({
  plugins: [react()],
  test: {
    globals: false,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.stories.{ts,tsx}'],
    },
  },
});

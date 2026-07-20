import '@testing-library/jest-dom/vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

// jest-axe matcher for a11y assertions.
expect.extend(toHaveNoViolations);

// Unmount React trees between tests so the DOM starts clean each time.
afterEach(() => {
  cleanup();
});

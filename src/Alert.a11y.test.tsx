import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Alert, Toast } from './Alert';

describe('Alert accessibility', () => {
  it('has no violations — info', async () => {
    const { container } = render(<Alert severity="info">Info message</Alert>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — fail with dismiss', async () => {
    const { container } = render(
      <Alert severity="fail" onDismiss={() => {}}>Error message</Alert>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — toast', async () => {
    const { container } = render(<Toast onDismiss={() => {}}>Saved</Toast>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

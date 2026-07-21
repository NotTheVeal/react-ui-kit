import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from './Button';

// jsdom can't run color-contrast (no CSS paint), so these focus on
// ARIA/role/label correctness.
describe('Button accessibility', () => {
  it('has no violations — default', async () => {
    const { container } = render(<Button>Add to Cart</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — disabled', async () => {
    const { container } = render(<Button disabled>Unavailable</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — loading', async () => {
    const { container } = render(<Button loading>Processing</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — danger', async () => {
    const { container } = render(<Button variant="danger">Delete Item</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — icon-only arrow with aria-label', async () => {
    const { container } = render(
      <Button variant="arrow" aria-label="Go back" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

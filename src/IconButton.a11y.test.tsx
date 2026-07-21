import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IconButton } from './IconButton';

// jsdom can't run color-contrast (no CSS paint), so these focus on
// ARIA/role/label correctness. NOTE: this is a legacy orange CTA that
// is known to fail WCAG AA color contrast in real rendering.
describe('IconButton accessibility', () => {
  it('has no violations — labelled', async () => {
    const { container } = render(<IconButton>Add to List</IconButton>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — disabled', async () => {
    const { container } = render(<IconButton disabled>Unavailable</IconButton>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — icon-only with aria-label', async () => {
    const { container } = render(<IconButton icon={<span />} aria-label="Add to list" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

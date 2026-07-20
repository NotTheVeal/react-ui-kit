import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { StatusBadge, ListTypeBadge } from './Badge';

describe('Badge accessibility', () => {
  it('has no violations — status badge', async () => {
    const { container } = render(<StatusBadge tone="success">In Stock</StatusBadge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — list type badge', async () => {
    const { container } = render(<ListTypeBadge tone="shopping">Shopping List</ListTypeBadge>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

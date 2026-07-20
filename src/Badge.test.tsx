import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge, ListTypeBadge } from './Badge';

describe('StatusBadge', () => {
  it('renders its children', () => {
    render(<StatusBadge>In Stock</StatusBadge>);
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it.each(['neutral', 'info', 'success', 'warning', 'critical', 'items'] as const)(
    'renders the %s tone',
    (tone) => {
      render(<StatusBadge tone={tone}>{tone}</StatusBadge>);
      expect(screen.getByText(tone)).toBeInTheDocument();
    },
  );

  it('applies a passed className', () => {
    render(<StatusBadge className="extra">Tagged</StatusBadge>);
    expect(screen.getByText('Tagged')).toHaveClass('extra');
  });
});

describe('ListTypeBadge', () => {
  it('renders its children', () => {
    render(<ListTypeBadge>Shopping List</ListTypeBadge>);
    expect(screen.getByText('Shopping List')).toBeInTheDocument();
  });

  it.each(['shopping', 'preventative', 'restocking'] as const)(
    'renders the %s tone',
    (tone) => {
      render(<ListTypeBadge tone={tone}>{tone}</ListTypeBadge>);
      expect(screen.getByText(tone)).toBeInTheDocument();
    },
  );
});

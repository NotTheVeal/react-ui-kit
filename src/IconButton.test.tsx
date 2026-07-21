import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from './IconButton';

describe('IconButton (legacy Square)', () => {
  it('renders children in a semantic button', () => {
    render(<IconButton>Add to List</IconButton>);
    const btn = screen.getByRole('button', { name: /add to list/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<IconButton onClick={onClick}>Add</IconButton>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<IconButton onClick={onClick} disabled>Add</IconButton>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('marks itself busy and disabled while loading, hiding the label', () => {
    render(<IconButton loading>Add</IconButton>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();
    expect(screen.queryByText('Add')).not.toBeInTheDocument();
  });

  it('renders a leading icon alongside the label', () => {
    render(<IconButton icon={<span data-testid="ico" />}>Add</IconButton>);
    expect(screen.getByTestId('ico')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it.each(['sm', 'lg'] as const)('renders the %s size', (size) => {
    render(<IconButton size={size}>{size}</IconButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('supports icon-only usage with an accessible name', () => {
    render(<IconButton icon={<span />} aria-label="Add to list" />);
    expect(screen.getByRole('button', { name: 'Add to list' })).toBeInTheDocument();
  });
});

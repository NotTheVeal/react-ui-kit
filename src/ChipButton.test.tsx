import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChipButton } from './ChipButton';

describe('ChipButton', () => {
  it('renders its label', () => {
    render(<ChipButton onRemove={() => {}}>Category: Imaging</ChipButton>);
    expect(screen.getByText('Category: Imaging')).toBeInTheDocument();
  });

  it('exposes a remove control with a derived accessible name', () => {
    render(<ChipButton onRemove={() => {}}>In stock</ChipButton>);
    expect(
      screen.getByRole('button', { name: 'Remove In stock' })
    ).toBeInTheDocument();
  });

  it('calls onRemove when the remove control is clicked', async () => {
    const onRemove = vi.fn();
    render(<ChipButton onRemove={onRemove}>Imaging</ChipButton>);
    await userEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('does not call onRemove when disabled', async () => {
    const onRemove = vi.fn();
    render(<ChipButton onRemove={onRemove} disabled>Imaging</ChipButton>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onRemove).not.toHaveBeenCalled();
  });

  it('honors a custom removeLabel', () => {
    render(
      <ChipButton onRemove={() => {}} removeLabel="Clear category filter">
        Imaging
      </ChipButton>
    );
    expect(
      screen.getByRole('button', { name: 'Clear category filter' })
    ).toBeInTheDocument();
  });

  it.each(['sm', 'lg'] as const)('renders the %s size', (size) => {
    render(<ChipButton size={size} onRemove={() => {}}>{size}</ChipButton>);
    expect(screen.getByText(size)).toBeInTheDocument();
  });

  it('is always a full-pill chip (single shape)', () => {
    const { container } = render(<ChipButton onRemove={() => {}}>Pill</ChipButton>);
    const shell = container.querySelector('span');
    expect(shell?.className).toContain('rounded-[var(--ps-cmp-button-chip-radius)]');
  });
});

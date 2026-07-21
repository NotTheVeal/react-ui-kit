import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedButton } from './SegmentedButton';

const OPTIONS = [
  { id: 'asset', label: 'Asset' },
  { id: 'event', label: 'Event' },
];

describe('SegmentedButton', () => {
  it('renders a radiogroup of segments', () => {
    render(
      <SegmentedButton aria-label="View" options={OPTIONS} value="asset" onChange={() => {}} />
    );
    expect(screen.getByRole('radiogroup', { name: 'View' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('marks the selected segment as checked', () => {
    render(<SegmentedButton options={OPTIONS} value="event" onChange={() => {}} />);
    expect(screen.getByRole('radio', { name: /event/i })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: /asset/i })).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange with the clicked segment id', async () => {
    const onChange = vi.fn();
    render(<SegmentedButton options={OPTIONS} value="asset" onChange={onChange} />);
    await userEvent.click(screen.getByRole('radio', { name: /event/i }));
    expect(onChange).toHaveBeenCalledWith('event');
  });

  it('does not call onChange for a disabled group', async () => {
    const onChange = vi.fn();
    render(<SegmentedButton options={OPTIONS} value="asset" onChange={onChange} disabled />);
    await userEvent.click(screen.getByRole('radio', { name: /event/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange for a per-option disabled segment', async () => {
    const onChange = vi.fn();
    render(
      <SegmentedButton
        options={[OPTIONS[0], { ...OPTIONS[1], disabled: true }]}
        value="asset"
        onChange={onChange}
      />
    );
    const evt = screen.getByRole('radio', { name: /event/i });
    expect(evt).toBeDisabled();
    await userEvent.click(evt);
    expect(onChange).not.toHaveBeenCalled();
  });

  it.each(['current', 'future'] as const)('renders the %s variant', (variant) => {
    render(<SegmentedButton options={OPTIONS} value="asset" onChange={() => {}} variant={variant} />);
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });
});

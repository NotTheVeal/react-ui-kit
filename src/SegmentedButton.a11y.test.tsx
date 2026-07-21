import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { SegmentedButton } from './SegmentedButton';

const OPTIONS = [
  { id: 'asset', label: 'Asset' },
  { id: 'event', label: 'Event' },
];

// jsdom can't run color-contrast (no CSS paint), so these focus on
// ARIA/role/label correctness.
describe('SegmentedButton accessibility', () => {
  it('has no violations — current', async () => {
    const { container } = render(
      <SegmentedButton aria-label="View mode" options={OPTIONS} value="asset" onChange={() => {}} />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — future', async () => {
    const { container } = render(
      <SegmentedButton
        aria-label="View mode"
        options={OPTIONS}
        value="event"
        onChange={() => {}}
        variant="future"
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — disabled', async () => {
    const { container } = render(
      <SegmentedButton aria-label="View mode" options={OPTIONS} value="asset" onChange={() => {}} disabled />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

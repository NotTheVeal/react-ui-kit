import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ChipButton } from './ChipButton';

// jsdom can't run color-contrast (no CSS paint), so these focus on
// ARIA/role/label correctness.
describe('ChipButton accessibility', () => {
  it('has no violations — current', async () => {
    const { container } = render(
      <ChipButton onRemove={() => {}}>Category: Imaging</ChipButton>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — small', async () => {
    const { container } = render(
      <ChipButton size="sm" onRemove={() => {}}>Category: Imaging</ChipButton>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — disabled', async () => {
    const { container } = render(
      <ChipButton disabled onRemove={() => {}}>Locked</ChipButton>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

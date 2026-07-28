import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ReturnEligibilityCard } from './ReturnEligibilityCard';

expect.extend(toHaveNoViolations);

describe('ReturnEligibilityCard accessibility', () => {
  it('has no violations — eligible with upload zone', async () => {
    const { container } = render(
      <ReturnEligibilityCard status="Eligible" reason="Item arrived damaged or defective" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — no upload zone', async () => {
    const { container } = render(
      <ReturnEligibilityCard status="Not Eligible" statusTone="danger" reason="Window expired" uploadPrompt={undefined} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

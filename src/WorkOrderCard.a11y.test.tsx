import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { WorkOrderCard } from './WorkOrderCard';

expect.extend(toHaveNoViolations);

describe('WorkOrderCard a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <WorkOrderCard
        orderNumber="WO #48213"
        priority="high"
        asset="Siemens MRI · MR-04, Radiology"
        description="Cooling system fault — coil temperature exceeding threshold."
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

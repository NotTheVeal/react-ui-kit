import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { EventCard, StatusCard, AlertCard } from './Card';

describe('Card accessibility', () => {
  it('has no violations — EventCard', async () => {
    const { container } = render(
      <EventCard
        title="Repair Order"
        subtitle="#12345"
        meta={[{ label: 'Status', value: 'Open' }]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — StatusCard', async () => {
    const { container } = render(<StatusCard title="Pump A" meta="Building 3" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — AlertCard', async () => {
    const { container } = render(
      <AlertCard title="Device offline" subtitle="MRI Suite" severity="error" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

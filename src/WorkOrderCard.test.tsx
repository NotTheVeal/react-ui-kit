import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WorkOrderCard } from './WorkOrderCard';

const base = {
  orderNumber: 'WO #48213',
  asset: 'Siemens MRI · MR-04, Radiology',
  description: 'Cooling system fault — coil temperature exceeding threshold.',
};

describe('WorkOrderCard', () => {
  it('renders order number, asset and description', () => {
    render(<WorkOrderCard {...base} />);
    expect(screen.getByText('WO #48213')).toBeTruthy();
    expect(screen.getByText('Siemens MRI · MR-04, Radiology')).toBeTruthy();
    expect(
      screen.getByText('Cooling system fault — coil temperature exceeding threshold.'),
    ).toBeTruthy();
  });

  it('shows the priority label', () => {
    render(<WorkOrderCard {...base} priority="high" />);
    expect(screen.getByText('High Priority')).toBeTruthy();
  });

  it('renders default meta rows', () => {
    render(<WorkOrderCard {...base} />);
    expect(screen.getByText('Assigned to')).toBeTruthy();
    expect(screen.getByText('T. Rivera')).toBeTruthy();
    expect(screen.getByText('In Progress')).toBeTruthy();
  });

  it('renders custom meta rows', () => {
    render(
      <WorkOrderCard {...base} meta={[{ label: 'Vendor', value: 'Acme Co.' }]} />,
    );
    expect(screen.getByText('Vendor')).toBeTruthy();
    expect(screen.getByText('Acme Co.')).toBeTruthy();
  });
});

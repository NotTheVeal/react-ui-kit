import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WorkOrderCard } from './WorkOrderCard';

const meta: Meta<typeof WorkOrderCard> = {
  title: 'Asset Uptime/WorkOrderCard',
  component: WorkOrderCard,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof WorkOrderCard>;

const base = {
  orderNumber: 'WO #48213',
  asset: 'Siemens MRI · MR-04, Radiology',
  description: 'Cooling system fault — coil temperature exceeding threshold.',
};

export const HighPriority: Story = { args: { ...base, priority: 'high' } };
export const MediumPriority: Story = { args: { ...base, priority: 'medium' } };
export const LowPriority: Story = { args: { ...base, priority: 'low' } };

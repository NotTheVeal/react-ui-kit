import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge, ListTypeBadge } from './Badge';

const meta = {
  title: 'Feedback/Badge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'critical', 'items'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotShipped: Story = { args: { tone: 'neutral', children: 'Not Shipped' } };
export const InTransit: Story = { args: { tone: 'info', children: 'In Transit' } };
export const Delivered: Story = { args: { tone: 'success', children: 'Delivered' } };
export const Urgent: Story = { args: { tone: 'warning', children: 'Urgent' } };
export const Critical: Story = { args: { tone: 'critical', children: 'Critical' } };

export const AllTones: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <StatusBadge tone="neutral">Not Shipped</StatusBadge>
        <StatusBadge tone="info">In Transit</StatusBadge>
        <StatusBadge tone="success">Delivered</StatusBadge>
        <StatusBadge tone="warning">Urgent</StatusBadge>
        <StatusBadge tone="critical">Critical</StatusBadge>
        <StatusBadge tone="success">Approved</StatusBadge>
        <StatusBadge tone="info">Pending</StatusBadge>
      </div>
      <div className="flex flex-wrap gap-3">
        <ListTypeBadge tone="shopping">Shopping</ListTypeBadge>
        <ListTypeBadge tone="preventative">Preventative maintenance</ListTypeBadge>
        <ListTypeBadge tone="restocking">Restocking</ListTypeBadge>
      </div>
    </div>
  ),
};

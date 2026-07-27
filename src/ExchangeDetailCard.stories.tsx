import type { Meta, StoryObj } from '@storybook/react';
import { ExchangeDetailCard } from './ExchangeDetailCard';

const meta: Meta<typeof ExchangeDetailCard> = {
  title: 'Components/ExchangeDetailCard',
  component: ExchangeDetailCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    status: { control: 'text' },
    note: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ExchangeDetailCard>;

const items = [
  { label: 'Returning', name: 'X-RAY TUBE, 40/80 KW', meta: '$225.34 · Qty 1' },
  { label: 'Replacement', name: 'X-RAY TUBE, 40/80 KW (New)', meta: '$225.34 · Qty 1' },
];

export const InProgress: Story = {
  args: {
    title: 'Exchange Details',
    status: 'In Progress',
    items,
    note: 'Return the core within 30 days to avoid a core charge.',
  },
};

export const NoStatus: Story = {
  args: { title: 'Exchange Details', items, note: 'Return the core within 30 days to avoid a core charge.' },
};

export const NoNote: Story = {
  args: { title: 'Exchange Details', status: 'In Progress', items },
};

export const SingleItem: Story = {
  args: {
    title: 'Exchange Details',
    status: 'Pending',
    items: [{ label: 'Returning', name: 'INFUSION PUMP MODULE', meta: '$1,120.00 · Qty 1' }],
  },
};

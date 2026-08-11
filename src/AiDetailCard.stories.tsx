import type { Meta, StoryObj } from '@storybook/react';
import { AiDetailCard } from './AiDetailCard';

const meta: Meta<typeof AiDetailCard> = {
  title: 'Components/AiDetailCard',
  component: AiDetailCard,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['full', 'drawer'] },
    aiSummary: { control: 'text' },
    orderNumber: { control: 'text' },
    status: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AiDetailCard>;

const base = {
  orderNumber: '4821',
  status: 'Processing',
  aiSummary:
    'This order is in processing at the Cleveland DC and is on track to ship today. No action needed.',
  product: {
    name: 'X-RAY TUBE, 40/80 KW',
    price: '$225.34',
    quantity: 1,
    detailsHref: '#',
  },
  facility: 'Mercy General — Cleveland',
  reference: 'REF-9021',
  po: 'PO-55231',
  deliveryStatus: { date: 'Arriving Thu, Aug 14' },
  feedback: { sourcesHref: '#', timestamp: '12:33 PM' },
};

export const Full: Story = { args: { variant: 'full', ...base } };

export const Drawer: Story = { args: { variant: 'drawer', ...base } };

export const AllDetailRows: Story = {
  args: {
    variant: 'full',
    ...base,
    requester: 'Dana Ellison',
    condition: 'New',
    vendor: 'GE Healthcare',
    carrier: 'FedEx',
    tracking: '7727 5501 2233',
    created: 'Aug 11, 2026',
    shipTo: 'Loading Dock B',
    showRequester: true,
    showCondition: true,
    showVendor: true,
    showCarrier: true,
    showTracking: true,
    showCreated: true,
    showShipTo: true,
  },
};

export const NoAiSummary: Story = {
  args: { variant: 'full', ...base, showAiSummary: false },
};

export const NoFeedback: Story = {
  args: { variant: 'full', ...base, showFeedbackRow: false },
};

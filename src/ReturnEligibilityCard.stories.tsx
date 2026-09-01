import type { Meta, StoryObj } from '@storybook/react';
import { ReturnEligibilityCard } from './ReturnEligibilityCard';

const meta: Meta<typeof ReturnEligibilityCard> = {
  title: 'Cards/ReturnEligibilityCard',
  component: ReturnEligibilityCard,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'text' },
    statusTone: { control: 'select', options: ['success', 'info', 'warning', 'danger'] },
    reason: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ReturnEligibilityCard>;

export const Eligible: Story = {
  args: {
    title: 'Return Eligibility',
    status: 'Eligible',
    statusTone: 'success',
    reason: 'Item arrived damaged or defective',
  },
};

export const NotEligible: Story = {
  args: {
    title: 'Return Eligibility',
    status: 'Not Eligible',
    statusTone: 'danger',
    reasonLabel: 'Why it’s not eligible',
    reason: 'Return window has expired',
    showUpload: false,
  },
};

export const PendingReview: Story = {
  args: {
    title: 'Return Eligibility',
    status: 'Under Review',
    statusTone: 'warning',
    reason: 'Item arrived damaged or defective',
  },
};

export const NoUploadZone: Story = {
  args: {
    title: 'Return Eligibility',
    status: 'Eligible',
    reason: 'Ordered in error',
    showUpload: false,
  },
};

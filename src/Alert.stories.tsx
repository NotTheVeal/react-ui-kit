import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Toast } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    severity: { control: 'select', options: ['success', 'info', 'warning', 'fail'] },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    severity: 'success',
    children: 'Requester has been nudged for Part Order #: 64434335',
  },
};

export const Info: Story = {
  args: { severity: 'info', children: 'You have a new PM for Asset 343433.' },
};

export const Warning: Story = {
  args: { severity: 'warning', children: 'Your session will expire in 5 minutes. Save your work.' },
};

export const Fail: Story = {
  args: { severity: 'fail', children: 'Part Order #: 64434335 has been rejected.' },
};

export const Dismissable: Story = {
  args: {
    severity: 'info',
    children: 'New features are now available. Check out the latest updates.',
    onDismiss: () => {},
  },
};

export const ToastSuccess: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <Toast severity="success" onDismiss={() => {}}>
      Item added to cart
    </Toast>
  ),
};

export const AllSeverities: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3 w-[640px]">
      <Alert severity="success">Requester has been nudged for Part Order #: <strong>64434335</strong></Alert>
      <Alert severity="info">You have a new PM for Asset <strong>343433</strong>.</Alert>
      <Alert severity="warning">Your session will expire in <strong>5 minutes</strong>.</Alert>
      <Alert severity="fail">Part Order #: <strong>64434335</strong> has been rejected.</Alert>
    </div>
  ),
};

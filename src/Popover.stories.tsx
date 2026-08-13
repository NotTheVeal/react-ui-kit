import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';

const meta = {
  title: 'Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'cta', 'textOnly'] },
    confirmTone: { control: 'inline-radio', options: ['brand', 'danger'] },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Popover Title',
    onClose: () => {},
    children: 'Supporting text goes here to explain this element or action.',
  },
};

export const Cta: Story = {
  args: {
    variant: 'cta',
    title: 'Delete Item',
    onClose: () => {},
    confirmTone: 'danger',
    children: 'This will permanently remove the item from your list.',
    secondaryAction: { label: 'Cancel', onClick: () => {} },
    primaryAction: { label: 'Delete', onClick: () => {} },
  },
};

export const TextOnly: Story = {
  args: {
    variant: 'textOnly',
    children: 'A short, title-less hint that floats next to whatever triggered it.',
  },
};

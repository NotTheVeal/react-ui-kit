import type { Meta, StoryObj } from '@storybook/react';
import { ChipButton } from './ChipButton';

const meta = {
  title: 'Buttons/ChipButton',
  component: ChipButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { onRemove: () => {} },
} satisfies Meta<typeof ChipButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = { args: { size: 'lg', children: 'Category: Imaging' } };
export const Small: Story = { args: { size: 'sm', children: 'In stock' } };
export const Disabled: Story = { args: { size: 'lg', disabled: true, children: 'Locked filter' } };

export const BothSizes: Story = {
  args: { children: 'Chip' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <ChipButton size="sm" onRemove={() => {}}>In stock</ChipButton>
      <ChipButton size="lg" onRemove={() => {}}>Category: Imaging</ChipButton>
    </div>
  ),
};

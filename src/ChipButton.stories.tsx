import type { Meta, StoryObj } from '@storybook/react';
import { ChipButton } from './ChipButton';

const meta = {
  title: 'Components/ChipButton',
  component: ChipButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    pill: { control: 'boolean', description: 'Full-pill redesign (Future Button Set)' },
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

export const FuturePill: Story = {
  args: { size: 'lg', pill: true, children: 'Category: Imaging' },
  parameters: {
    docs: { description: { story: 'Future Button Set — full-pill radius (redesign in Figma).' } },
  },
};

export const CurrentVsFuture: Story = {
  args: { children: 'Chip' },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <ChipButton size="sm" onRemove={() => {}}>Current SM</ChipButton>
        <ChipButton size="lg" onRemove={() => {}}>Current LG</ChipButton>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ChipButton size="sm" pill onRemove={() => {}}>Future SM</ChipButton>
        <ChipButton size="lg" pill onRemove={() => {}}>Future LG</ChipButton>
      </div>
    </div>
  ),
};

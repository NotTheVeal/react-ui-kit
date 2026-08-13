import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Buttons/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '⚠ Deprecated — legacy orange "Square" CTA. Orange fills fail WCAG AA. Use Button (primary) for new work.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = { args: { size: 'lg', children: 'Add to List' } };
export const Small: Story = { args: { size: 'sm', children: 'Add' } };
export const Disabled: Story = { args: { size: 'lg', disabled: true, children: 'Add to List' } };
export const Loading: Story = { args: { size: 'lg', loading: true, children: 'Add to List' } };

export const AllSizes: Story = {
  args: { children: 'Add' },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <IconButton size="lg">Add to List</IconButton>
      <IconButton size="sm">Add</IconButton>
      <IconButton size="lg" disabled>Disabled</IconButton>
      <IconButton size="lg" loading>Loading</IconButton>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedButton } from './SegmentedButton';

const meta = {
  title: 'Buttons/SegmentedButton',
  component: SegmentedButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['current', 'future'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SegmentedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { id: 'asset', label: 'Asset' },
  { id: 'event', label: 'Event' },
];

const Interactive = ({ variant, disabled }: { variant?: 'current' | 'future'; disabled?: boolean }) => {
  const [value, setValue] = useState('asset');
  return (
    <SegmentedButton
      aria-label="View mode"
      options={OPTIONS}
      value={value}
      onChange={setValue}
      variant={variant}
      disabled={disabled}
    />
  );
};

export const Current: Story = {
  args: { options: OPTIONS, value: 'asset', onChange: () => {} },
  render: () => <Interactive variant="current" />,
};

export const Future: Story = {
  args: { options: OPTIONS, value: 'asset', onChange: () => {} },
  render: () => <Interactive variant="future" />,
  parameters: {
    docs: {
      description: {
        story: 'Future Button Set — darker hover on the selected segment + 4px outer corners.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { options: OPTIONS, value: 'asset', onChange: () => {} },
  render: () => <Interactive variant="current" disabled />,
};

export const CurrentVsFuture: Story = {
  args: { options: OPTIONS, value: 'asset', onChange: () => {} },
  render: () => (
    <div className="flex flex-col gap-4">
      <Interactive variant="current" />
      <Interactive variant="future" />
    </div>
  ),
};

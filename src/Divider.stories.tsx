import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    weight: { control: 'select', options: ['subtle', 'default', 'strong'] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    spacing: { control: 'number' },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { weight: 'default' },
  render: (args) => (
    <div style={{ width: 320 }}>
      <p style={{ margin: 0 }}>Above</p>
      <Divider {...args} spacing={12} />
      <p style={{ margin: 0 }}>Below</p>
    </div>
  ),
};

export const Weights: StoryObj = {
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Divider weight="subtle" />
      <Divider weight="default" />
      <Divider weight="strong" />
    </div>
  ),
};

export const Vertical: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
      <span>Left</span>
      <Divider orientation="vertical" spacing={12} />
      <span>Middle</span>
      <Divider orientation="vertical" spacing={12} weight="strong" />
      <span>Right</span>
    </div>
  ),
};

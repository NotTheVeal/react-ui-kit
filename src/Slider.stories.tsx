import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: StoryObj = {
  render: () => {
    const [v, setV] = useState(40);
    return <Slider label="Quantity" value={v} onChange={setV} />;
  },
};

export const Currency: StoryObj = {
  render: () => {
    const [v, setV] = useState(2500);
    return (
      <Slider
        label="Budget"
        min={0}
        max={5000}
        step={100}
        value={v}
        onChange={setV}
        formatValue={(n) => `$${n.toLocaleString()}`}
      />
    );
  },
};

export const Range: StoryObj = {
  render: () => {
    const [v, setV] = useState<[number, number]>([20, 70]);
    return <Slider type="range" label="Price range" value={v} onChange={setV} formatValue={(n) => `$${n}`} />;
  },
};

export const Disabled: Story = {
  args: { label: 'Locked', value: 60, disabled: true },
};

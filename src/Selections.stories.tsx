import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Radio, Toggle } from './Selections';

const meta = {
  title: 'Components/Selections',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxStates: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Include compatible parts" />
      <Checkbox label="Include compatible parts" defaultChecked />
      <Checkbox label="Include compatible parts" state="focus" />
      <Checkbox label="Include compatible parts" disabled />
      <Checkbox label="Include compatible parts" defaultChecked disabled />
    </div>
  ),
};

export const RadioStates: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio label="Standard shipping" />
      <Radio label="Standard shipping" defaultChecked />
      <Radio label="Standard shipping" state="focus" />
      <Radio label="Standard shipping" disabled />
    </div>
  ),
};

export const ToggleStates: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      <Toggle label="Auto-approve quotes" />
      <Toggle label="Auto-approve quotes" defaultChecked />
      <Toggle label="Auto-approve quotes" disabled />
    </div>
  ),
};

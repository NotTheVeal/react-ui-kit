import type { Meta, StoryObj } from '@storybook/react';
import { Input, Dropdown } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'lg'] },
    state: { control: 'select', options: [undefined, 'default', 'hover', 'focus', 'withValue', 'disabled', 'error'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = { args: { label: 'Label' } };
export const Focused: Story = { args: { label: 'Label', state: 'focus' } };
export const WithValue: Story = { args: { label: 'Label', defaultValue: 'Input Text', state: 'withValue' } };
export const Large: Story = { args: { label: 'Label', size: 'lg' } };
export const Error: Story = { args: { label: 'Email', defaultValue: 'invalid@', error: 'Please enter a valid email address' } };
export const Disabled: Story = { args: { label: 'Label', disabled: true } };

export const WithDropdown: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Dropdown
      label="Choose facility"
      options={[
        { label: "Chatham Memorial Hospital", value: 'chatham' },
        { label: "St. Luke's Medical Center", value: 'stlukes' },
        { label: 'Mercy General Hospital', value: 'mercy' },
      ]}
    />
  ),
};

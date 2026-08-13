import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './Controls';

const meta = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DatePicker>;

export default meta;

export const DateRangePicker: StoryObj = {
  render: () => <DatePicker title="Preferred Window" />,
};

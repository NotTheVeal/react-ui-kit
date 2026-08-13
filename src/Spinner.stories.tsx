import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Feedback';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Spinner>;

export default meta;

export const Spinners: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner />
      <Spinner size={40} />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Feedback';

const meta = {
  title: 'Feedback/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Avatar>;

export default meta;

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" name="Earl Grey" />
      <Avatar size="sm" name="Earl Grey" />
      <Avatar size="md" name="Earl Grey" />
      <Avatar size="lg" name="Earl Grey" />
      <Avatar size="xl" name="Earl Grey" />
    </div>
  ),
};

export const Tones: StoryObj = {
  render: () => (
    <div className="flex gap-3">
      <Avatar size="lg" name="Earl Grey" tone="blue" />
      <Avatar size="lg" name="Casey Tran" tone="green" />
      <Avatar size="lg" name="Jordan Lee" tone="orange" />
      <Avatar size="lg" name="Sam Patel" tone="purple" />
      <Avatar size="lg" name="Mae Kim" tone="red" />
      <Avatar size="lg" initials="PS" tone="brand" />
    </div>
  ),
};

export const Group: StoryObj = {
  render: () => (
    <AvatarGroup overflow={5}>
      <Avatar name="Earl Grey" tone="blue" />
      <Avatar name="Casey Tran" tone="green" />
      <Avatar name="Jordan Lee" tone="orange" />
      <Avatar name="Sam Patel" tone="purple" />
    </AvatarGroup>
  ),
};

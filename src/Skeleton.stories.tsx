import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonKeyframes } from './Feedback';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Skeleton>;

export default meta;

export const Skeletons: StoryObj = {
  render: () => (
    <>
      <SkeletonKeyframes />
      <div className="grid grid-cols-2 gap-6 max-w-[640px]">
        <Skeleton shape="text" />
        <Skeleton shape="title" />
        <Skeleton shape="button" />
        <Skeleton shape="input" />
        <Skeleton shape="circle" width={48} height={48} />
        <Skeleton shape="block" />
      </div>
    </>
  ),
};

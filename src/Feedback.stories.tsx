import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  AvatarGroup,
  Tooltip,
  TooltipRich,
  Skeleton,
  SkeletonKeyframes,
  Spinner,
  EmptyState,
  ErrorPage,
} from './Feedback';

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

export const TooltipPlacements: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-12 py-12">
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} label={`Placement: ${p}`} placement={p}>
          <button className="h-9 px-3.5 rounded border border-[var(--ps-prim-gray-300)] bg-white text-[13px] font-semibold cursor-pointer hover:border-[var(--ps-prim-blue-500)] hover:text-[var(--ps-prim-blue-500)]">
            {p}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Rich: StoryObj = {
  render: () => (
    <div className="bg-[var(--ps-prim-gray-900)] p-8 rounded-md inline-flex">
      <TooltipRich
        title="Detailed Context"
        body="Rich tooltips can provide much more data without cluttering the UI."
        cta={{ label: 'Learn More' }}
      />
    </div>
  ),
};

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

export const Spinners: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner />
      <Spinner size={40} />
    </div>
  ),
};

export const EmptyNoResults: StoryObj = {
  render: () => (
    <EmptyState
      tone="neutral"
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      }
      title='No parts match "DS-100A"'
      body="Try removing a filter or searching by manufacturer or item number."
      primaryAction={{ label: 'Clear filters' }}
      secondaryAction={{ label: 'Search all categories' }}
    />
  ),
};

export const Error404: StoryObj = {
  render: () => (
    <ErrorPage
      code="404"
      title="We couldn't find that page"
      body="It may have moved or been deleted. Try going back to your dashboard."
      primaryAction={{ label: 'Go to Dashboard' }}
      secondaryAction={{ label: 'Search Parts' }}
    />
  ),
};

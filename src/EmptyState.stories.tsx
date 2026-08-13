import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './Feedback';

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof EmptyState>;

export default meta;

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

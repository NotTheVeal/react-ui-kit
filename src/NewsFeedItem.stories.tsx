import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NewsFeedItem } from './NewsFeedItem';

const meta: Meta<typeof NewsFeedItem> = {
  title: 'Cards/NewsFeedItem',
  component: NewsFeedItem,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof NewsFeedItem>;

const base = {
  category: 'Product Update',
  headline: 'New asset uptime heatmap now available in the dashboard',
  date: 'Jul 20, 2026',
  readTime: '2 min read',
};

export const Default: Story = { args: base };
export const Clickable: Story = { args: { ...base, onClick: () => {} } };

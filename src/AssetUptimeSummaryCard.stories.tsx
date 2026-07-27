import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AssetUptimeSummaryCard } from './AssetUptimeSummaryCard';

const meta: Meta<typeof AssetUptimeSummaryCard> = {
  title: 'Asset Uptime/AssetUptimeSummaryCard',
  component: AssetUptimeSummaryCard,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof AssetUptimeSummaryCard>;

export const Default: Story = {
  args: { metric: '98.6%', trendValue: '1.2%', trendDirection: 'up' },
};

export const Declining: Story = {
  args: { metric: '94.1%', trendValue: '0.8%', trendDirection: 'down' },
};

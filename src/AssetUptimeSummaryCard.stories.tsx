import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AssetUptimeSummaryCard } from './AssetUptimeSummaryCard';

const meta: Meta<typeof AssetUptimeSummaryCard> = {
  title: 'Cards/AssetUptimeSummaryCard',
  component: AssetUptimeSummaryCard,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof AssetUptimeSummaryCard>;

export const Default: Story = {
  args: { metric: '98.6%', trendValue: '1.2%', trendDirection: 'up' },
};

export const Declining: Story = {
  args: {
    metric: '94.1%',
    trendValue: '0.8%',
    trendDirection: 'down',
    legend: [
      { label: 'Operational', count: 160, color: 'var(--ps-sem-success-solid)' },
      { label: 'Down', count: 10, color: 'var(--ps-sem-danger-solid)' },
    ],
  },
};

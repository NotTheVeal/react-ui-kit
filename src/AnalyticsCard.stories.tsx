import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnalyticsCard } from './CardExtras';

const meta: Meta<typeof AnalyticsCard> = {
  title: 'Cards/AnalyticsCard',
  component: AnalyticsCard,
  parameters: { layout: 'centered' },
};
export default meta;

type AnalyticsStory = StoryObj<typeof AnalyticsCard>;

export const AnalyticsSquare: AnalyticsStory = {
  render: (args) => <AnalyticsCard {...args} />,
  args: {
    layout: 'square',
    title: 'Open Work Orders',
    value: '42',
    label: 'active',
    sub: '8 due this week',
  },
};

export const AnalyticsWide: AnalyticsStory = {
  render: (args) => <AnalyticsCard {...args} />,
  args: {
    layout: 'wide',
    title: 'Parts Spend',
    value: '$1.2M',
    delta: { value: '5.3%', direction: 'down' },
    deltaSuffix: 'vs last year',
    benchmark: '15% below peer benchmark',
  },
};

export const AnalyticsHighlighted: AnalyticsStory = {
  render: (args) => <AnalyticsCard {...args} />,
  args: {
    layout: 'square',
    title: 'Uptime',
    value: '98.6%',
    label: 'fleet',
    sub: '↑ 1.2% vs last month',
    highlight: true,
  },
};

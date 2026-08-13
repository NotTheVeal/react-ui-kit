import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NotificationCard } from './NotificationCard';

const meta: Meta<typeof NotificationCard> = {
  title: 'Cards/NotificationCard',
  component: NotificationCard,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof NotificationCard>;

const base = {
  title: 'Asset offline: CT-02',
  message: 'Radiology CT scanner reported a connectivity loss 4 minutes ago.',
  timestamp: '4 min ago',
};

export const Unread: Story = { args: { ...base, unread: true, tone: 'critical' } };
export const Read: Story = { args: { ...base, unread: false, tone: 'info' } };

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModuleCard } from './ModuleCard';

const meta: Meta<typeof ModuleCard> = {
  title: 'Cards/ModuleCard',
  component: ModuleCard,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof ModuleCard>;

const base = {
  title: 'Ultrasound Fundamentals',
  description:
    'Interactive XR training module covering probe handling, imaging planes, and safety protocols.',
  duration: '45 min',
  level: 'Intermediate',
};

export const Installed: Story = { args: { ...base, status: 'installed' } };
export const Available: Story = { args: { ...base, status: 'available' } };
export const InProgress: Story = { args: { ...base, status: 'in-progress' } };

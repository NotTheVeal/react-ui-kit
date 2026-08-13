import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModuleDetailDrawer } from './ModuleDetailDrawer';

const meta: Meta<typeof ModuleDetailDrawer> = {
  title: 'Overlays/ModuleDetailDrawer',
  component: ModuleDetailDrawer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof ModuleDetailDrawer>;

const lessons = [
  { id: '1', label: 'Probe handling basics', duration: '8 min', complete: true },
  { id: '2', label: 'Imaging planes', duration: '12 min' },
  { id: '3', label: 'Safety protocols', duration: '10 min' },
  { id: '4', label: 'Assessment', duration: '15 min' },
];

const base = {
  open: true,
  onClose: () => {},
  title: 'Ultrasound Fundamentals',
  subtitle: 'XR Training · 45 min',
  overview:
    'Interactive XR training module covering probe handling, imaging planes, and safety protocols.',
  lessons,
};

export const Overview: Story = { args: { ...base, state: 'overview' } };
export const Curriculum: Story = { args: { ...base, state: 'curriculum' } };

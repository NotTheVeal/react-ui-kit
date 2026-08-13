import type { Meta, StoryObj } from '@storybook/react';
import { FolderTabs, SegmentedTabs, PillTabs } from './Tabs';

const meta = {
  title: 'Navigation/Tabs',
  component: FolderTabs,
  tags: ['autodocs'],
} satisfies Meta<typeof FolderTabs>;

export default meta;

export const Folder: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <FolderTabs
      defaultActiveId="initiated"
      items={[
        { id: 'initiated', label: 'Initiated', count: 0 },
        { id: 'quoted', label: 'Quoted', count: 0 },
        { id: 'open', label: 'Open Service Event', count: 0 },
        { id: 'done', label: 'Work Completed', count: 1 },
        { id: 'archived', label: 'Archived', disabled: true },
      ]}
    />
  ),
};

export const Pills: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <PillTabs
      defaultActiveId="all"
      items={[
        { id: 'all', label: 'All', count: 124 },
        { id: 'imaging', label: 'Imaging', count: 32 },
        { id: 'monitoring', label: 'Monitoring', count: 18 },
        { id: 'ventilation', label: 'Ventilation', count: 9 },
      ]}
    />
  ),
};

export const Segmented: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <SegmentedTabs
      defaultActiveId="grid"
      items={[
        { id: 'grid', label: 'Grid' },
        { id: 'list', label: 'List' },
        { id: 'map', label: 'Map' },
      ]}
    />
  ),
};

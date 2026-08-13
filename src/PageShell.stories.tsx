import type { Meta, StoryObj } from '@storybook/react';
import { PageShell } from './PageShell';

const meta = {
  title: 'Navigation/PageShell',
  component: PageShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof PageShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '32px 0' }}>
        <h1 style={{ fontWeight: 300, color: 'var(--ps-prim-blue-700)' }}>Request Depot</h1>
        <div style={{ height: 400, borderRadius: 4, background: 'var(--ps-prim-gray-100)' }} />
      </div>
    ),
  },
};

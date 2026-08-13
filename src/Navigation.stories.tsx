import type { Meta, StoryObj } from '@storybook/react';
import { TopNav, LeftNav } from './Navigation';

const icon = (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const leftNavItems = [
  { id: 'home', label: 'Home', icon, active: true },
  { id: 'orders', label: 'Orders', icon },
  { id: 'quotes', label: 'Quotes', icon, hasChevron: true },
  { id: 'assets', label: 'Assets', icon },
  { id: 'reports', label: 'Reports', icon },
];

const meta = {
  title: 'Navigation/Navigation',
  component: TopNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    heroTitle: 'Marketplace',
    cartCount: 0,
  },
};

export const TopWithCart: Story = {
  args: {
    heroTitle: 'Marketplace',
    cartCount: 3,
  },
};

export const LeftExpanded: StoryObj = {
  render: () => (
    <div style={{ height: 480 }} className="flex">
      <LeftNav items={leftNavItems} userInitials="EG" userName="Earl G." onLogout={() => {}} onToggleCollapse={() => {}} />
    </div>
  ),
};

export const LeftCollapsed: StoryObj = {
  render: () => (
    <div style={{ height: 480 }} className="flex">
      <LeftNav items={leftNavItems} collapsed userInitials="EG" userName="Earl G." onLogout={() => {}} onToggleCollapse={() => {}} />
    </div>
  ),
};

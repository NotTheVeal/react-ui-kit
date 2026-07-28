import type { Meta, StoryObj } from '@storybook/react';
import { InlineSearch, HiddenSearch } from './Search';

const meta = {
  title: 'Components/Search',
  component: InlineSearch,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: [undefined, 'default', 'focus', 'disabled'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof InlineSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── InlineSearch ──────────────────────────────────────────────
export const Inline: Story = { args: { placeholder: 'Search' } };
export const InlineFocused: Story = { args: { placeholder: 'Search', state: 'focus' } };
export const InlineWithValue: Story = { args: { placeholder: 'Search', defaultValue: 'Infusion pump' } };
export const InlineDisabled: Story = { args: { placeholder: 'Search', disabled: true } };

// ── HiddenSearch ──────────────────────────────────────────────
export const HiddenCollapsed: StoryObj<typeof HiddenSearch> = {
  render: () => <HiddenSearch />,
};

export const HiddenExpanded: StoryObj<typeof HiddenSearch> = {
  render: () => <HiddenSearch open defaultValue="" placeholder="Search this list" />,
};

export const HiddenExpandedWithValue: StoryObj<typeof HiddenSearch> = {
  render: () => <HiddenSearch open defaultValue="Ventilator filter" />,
};

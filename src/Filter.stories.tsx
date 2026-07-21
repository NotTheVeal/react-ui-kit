import type { Meta, StoryObj } from '@storybook/react';
import { FilterChip, FilterShell } from './Filter';

const meta = {
  title: 'Components/Filter',
  component: FilterChip,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    removable: { control: 'boolean' },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chip: Story = {
  args: { label: 'Manufacturer: GE', removable: true },
};

export const ChipNonRemovable: Story = {
  args: { label: 'In stock', removable: false },
};

export const ChipRow: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <FilterChip label="Manufacturer: GE" />
      <FilterChip label="Category: Imaging" />
      <FilterChip label="In stock" />
      <FilterChip label="Refurbished" removable={false} />
    </div>
  ),
};

export const Shell: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <FilterShell
      onAddClick={() => {}}
      chips={
        <>
          <FilterChip label="Manufacturer: GE" />
          <FilterChip label="Category: Imaging" />
          <FilterChip label="In stock" />
        </>
      }
    />
  ),
};

export const ShellEmpty: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => <FilterShell onAddClick={() => {}} addLabel="Add filter" />,
};

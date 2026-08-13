import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Table } from './Table';

interface Part {
  id: number;
  sku: string;
  name: string;
  manufacturer: string;
  price: number;
}

const rows: Part[] = [
  { id: 1, sku: 'GE-2004980', name: 'Battery, 12V', manufacturer: 'GE', price: 149.0 },
  { id: 2, sku: 'PH-451261', name: 'Sensor, SpO2', manufacturer: 'Philips', price: 312.5 },
  { id: 3, sku: 'DR-88120', name: 'Cable Assembly', manufacturer: 'Dräger', price: 87.99 },
  { id: 4, sku: 'MQ-10022', name: 'Filter, HEPA', manufacturer: 'Medtronic', price: 42.0 },
];

const columns = [
  { key: 'sku' as const, header: 'SKU', sortable: true },
  { key: 'name' as const, header: 'Part Name', sortable: true },
  { key: 'manufacturer' as const, header: 'Manufacturer', sortable: true },
  {
    key: 'price' as const,
    header: 'Price',
    align: 'right' as const,
    sortable: true,
    render: (r: Part) => `$${r.price.toFixed(2)}`,
  },
];

const meta = {
  title: 'Navigation/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table<Part>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { columns, data: rows },
};

export const Striped: Story = {
  args: { columns, data: rows, striped: true },
};

export const Selectable: StoryObj = {
  render: () => {
    const [ids, setIds] = useState<Array<string | number>>([2]);
    return <Table columns={columns} data={rows} selectedIds={ids} onSelectionChange={setIds} />;
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyState: <div style={{ padding: 40, textAlign: 'center' }}>No parts found.</div>,
  },
};

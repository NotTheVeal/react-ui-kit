import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Table } from './Table';

interface Row {
  id: number;
  name: string;
  qty: number;
}

const data: Row[] = [
  { id: 1, name: 'Alpha', qty: 2 },
  { id: 2, name: 'Bravo', qty: 5 },
];

const columns = [
  { key: 'name' as const, header: 'Name', sortable: true },
  { key: 'qty' as const, header: 'Qty', align: 'right' as const },
];

describe('Table accessibility', () => {
  it('has no violations — default', async () => {
    const { container } = render(<Table columns={columns} data={data} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — selectable', async () => {
    const { container } = render(
      <Table columns={columns} data={data} selectedIds={[1]} onSelectionChange={() => {}} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

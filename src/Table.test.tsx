import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Table } from './Table';

interface Row {
  id: number;
  name: string;
  qty: number;
}

const data: Row[] = [
  { id: 1, name: 'Bravo', qty: 2 },
  { id: 2, name: 'Alpha', qty: 5 },
  { id: 3, name: 'Charlie', qty: 1 },
];

const columns = [
  { key: 'name' as const, header: 'Name', sortable: true },
  { key: 'qty' as const, header: 'Qty', sortable: true },
];

describe('Table', () => {
  it('renders all rows', () => {
    render(<Table columns={columns} data={data} />);
    expect(screen.getByText('Bravo')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('sorts ascending then descending on header click', () => {
    render(<Table columns={columns} data={data} />);
    const nameHeader = screen.getByRole('button', { name: /name/i });

    fireEvent.click(nameHeader); // asc
    let cells = screen.getAllByRole('row').slice(1).map((r) => within(r).getAllByRole('cell')[0].textContent);
    expect(cells).toEqual(['Alpha', 'Bravo', 'Charlie']);

    fireEvent.click(nameHeader); // desc
    cells = screen.getAllByRole('row').slice(1).map((r) => within(r).getAllByRole('cell')[0].textContent);
    expect(cells).toEqual(['Charlie', 'Bravo', 'Alpha']);
  });

  it('fires onRowClick', () => {
    const onRowClick = vi.fn();
    render(<Table columns={columns} data={data} onRowClick={onRowClick} />);
    fireEvent.click(screen.getByText('Bravo'));
    expect(onRowClick).toHaveBeenCalledWith(data[0]);
  });

  it('supports controlled selection with a select-all header', () => {
    const onSelectionChange = vi.fn();
    render(<Table columns={columns} data={data} selectedIds={[]} onSelectionChange={onSelectionChange} />);
    fireEvent.click(screen.getByLabelText('Select all rows'));
    expect(onSelectionChange).toHaveBeenCalledWith([1, 2, 3]);
  });

  it('renders the empty state when there is no data', () => {
    render(<Table columns={columns} data={[]} emptyState={<div>Nothing here</div>} />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('exposes sort as a focusable native button (keyboard-operable) and marks sort direction', () => {
    render(<Table columns={columns} data={data} />);
    const nameHeader = screen.getByRole('button', { name: /name/i });
    expect(nameHeader.tagName).toBe('BUTTON');
    nameHeader.focus();
    expect(nameHeader).toHaveFocus();

    // aria-sort on the column header reflects the active sort for assistive tech.
    const nameColumn = screen.getByRole('columnheader', { name: /name/i });
    expect(nameColumn).toHaveAttribute('aria-sort', 'none');
    fireEvent.click(nameHeader);
    expect(nameColumn).toHaveAttribute('aria-sort', 'ascending');
  });
});

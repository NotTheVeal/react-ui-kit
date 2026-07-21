import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Table.tsx — PartsSource Design System
//
// Data table with sort, row selection, row click, and an empty state.
// 13px Source Sans Pro, 11px uppercase column headers. Striped rows
// optional via the `striped` prop.
//
// Pulled from preview/tables.html + Figma /Table (node 4099:6874).
// ──────────────────────────────────────────────────────────────────

interface Column<T> {
  key: keyof T & string;
  header: React.ReactNode;
  width?: string | number;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowId?: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  selectedIds?: Array<string | number>;
  onSelectionChange?: (ids: Array<string | number>) => void;
  striped?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
}

const cxTable = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

function Table<T extends Record<string, unknown>>({
  columns,
  data,
  getRowId = (row) => row.id as string | number,
  onRowClick,
  selectedIds,
  onSelectionChange,
  striped = false,
  emptyState,
  className = '',
}: TableProps<T>) {
  const [sort, setSort] = React.useState<{ key: string; dir: 'asc' | 'desc' } | null>(null);

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    return [...data].sort((a, b) => {
      const av = a[sort.key] as unknown as number | string;
      const bv = b[sort.key] as unknown as number | string;
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sort.dir === 'asc' ? cmp : -cmp;
    });
  }, [data, sort]);

  const isControlledSelection = selectedIds !== undefined;
  const [internalSelected, setInternalSelected] = React.useState<Array<string | number>>([]);
  const selected = isControlledSelection ? selectedIds! : internalSelected;
  const setSelected = (next: Array<string | number>) => {
    if (!isControlledSelection) setInternalSelected(next);
    onSelectionChange?.(next);
  };

  const toggleRow = (id: string | number) => {
    setSelected(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  const allSelected = data.length > 0 && data.every((r) => selected.includes(getRowId(r)));
  const someSelected = !allSelected && data.some((r) => selected.includes(getRowId(r)));

  const toggleAll = () => {
    setSelected(allSelected ? [] : data.map(getRowId));
  };

  const onSortClick = (key: string) => {
    setSort((cur) => {
      if (!cur || cur.key !== key) return { key, dir: 'asc' };
      if (cur.dir === 'asc') return { key, dir: 'desc' };
      return null;
    });
  };

  if (data.length === 0 && emptyState) {
    return (
      <div
        className={cxTable(
          'border border-[var(--ps-prim-gray-225)] rounded-md overflow-hidden bg-white',
          className,
        )}
      >
        {emptyState}
      </div>
    );
  }

  return (
    <div
      className={cxTable(
        "border border-[var(--ps-prim-gray-225)] rounded-md overflow-hidden bg-white font-['Source_Sans_Pro',sans-serif]",
        className,
      )}
    >
      <table className="w-full border-collapse text-[13px] text-[var(--ps-prim-gray-800)]">
        <thead>
          <tr className="bg-[var(--ps-prim-gray-50)] text-left">
            {onSelectionChange && (
              <th className="w-10 p-3 border-b border-[var(--ps-prim-gray-225)]">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={toggleAll}
                  className="accent-[var(--ps-prim-blue-500)] w-4 h-4 cursor-pointer"
                />
              </th>
            )}
            {columns.map((col) => {
              const isSorted = sort?.key === col.key;
              return (
                <th
                  key={col.key}
                  aria-sort={
                    col.sortable
                      ? isSorted
                        ? sort!.dir === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                      : undefined
                  }
                  className={cxTable(
                    'p-3 text-[11px] font-bold tracking-[0.5px] uppercase text-[var(--ps-prim-gray-600)] border-b border-[var(--ps-prim-gray-225)]',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                  )}
                  style={{ width: col.width }}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={() => onSortClick(col.key)}
                      className="inline-flex items-center gap-1 bg-transparent border-0 p-0 m-0 font-bold uppercase tracking-[0.5px] text-[11px] text-inherit cursor-pointer hover:text-[var(--ps-prim-blue-500)] select-none"
                    >
                      {col.header}
                      <svg width={10} height={10} viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path
                          d="M2.5 4L5 1.5 7.5 4"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          opacity={isSorted && sort!.dir === 'asc' ? 1 : 0.35}
                        />
                        <path
                          d="M2.5 6L5 8.5 7.5 6"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          opacity={isSorted && sort!.dir === 'desc' ? 1 : 0.35}
                        />
                      </svg>
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => {
            const id = getRowId(row);
            const isSelected = selected.includes(id);
            return (
              <tr
                key={id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cxTable(
                  'border-b border-[var(--ps-prim-gray-150)] last:border-b-0',
                  onRowClick && 'cursor-pointer',
                  striped && i % 2 === 1 && 'bg-[var(--ps-prim-gray-25)]',
                  isSelected ? 'bg-[var(--ps-prim-blue-25)]' : 'hover:bg-[var(--ps-prim-blue-25)]',
                )}
              >
                {onSelectionChange && (
                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      aria-label="Select row"
                      checked={isSelected}
                      onChange={() => toggleRow(id)}
                      className="accent-[var(--ps-prim-blue-500)] w-4 h-4 cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cxTable(
                      'p-3 text-[var(--ps-prim-gray-800)]',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                    )}
                  >
                    {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
export type { TableProps, Column };

// ──────────────────────────────────────────────────────────────────
// Table.tsx — PartsSource Design System
//
// Data table with sort, row selection, row click, and an empty state.
// 13px Source Sans Pro, 12px uppercase column headers. Striped rows
// optional via the `striped` prop.
//
// Pulled from preview/tables.html.
// ──────────────────────────────────────────────────────────────────

interface Column<T> {
  key: keyof T & string;
  header: React.ReactNode;
  width?: string | number;
  align?: "left" | "right" | "center";
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
  parts.filter(Boolean).join(" ");

function Table<T extends Record<string, any>>({
  columns,
  data,
  getRowId = (row) => row.id,
  onRowClick,
  selectedIds,
  onSelectionChange,
  striped = false,
  emptyState,
  className = "",
}: TableProps<T>) {
  const [sort, setSort] = React.useState<{ key: string; dir: "asc" | "desc" } | null>(null);

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    return [...data].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sort.dir === "asc" ? cmp : -cmp;
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
      if (!cur || cur.key !== key) return { key, dir: "asc" };
      if (cur.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  if (data.length === 0 && emptyState) {
    return (
      <div className={cxTable("border border-[#E5E7EB] rounded-md overflow-hidden bg-white", className)}>
        {emptyState}
      </div>
    );
  }

  return (
    <div
      className={cxTable(
        "border border-[#E5E7EB] rounded-md overflow-hidden bg-white font-['Source_Sans_Pro',sans-serif]",
        className,
      )}
    >
      <table className="w-full border-collapse text-[13px] text-[#1F2937]">
        <thead>
          <tr className="bg-[#F4F6F8] text-left">
            {onSelectionChange && (
              <th className="w-10 p-3 border-b border-[#E5E7EB]">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected; }}
                  onChange={toggleAll}
                  className="accent-[#005BA6] w-4 h-4 cursor-pointer"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={col.sortable ? () => onSortClick(col.key) : undefined}
                className={cxTable(
                  "p-3 text-[11px] font-bold tracking-[0.5px] uppercase text-[#5C5C5C] border-b border-[#E5E7EB]",
                  col.sortable && "cursor-pointer hover:text-[#005BA6] select-none",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                )}
                style={{ width: col.width }}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <svg width={10} height={10} viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path
                        d="M2.5 4L5 1.5 7.5 4"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        opacity={sort?.key === col.key && sort.dir === "asc" ? 1 : 0.35}
                      />
                      <path
                        d="M2.5 6L5 8.5 7.5 6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        opacity={sort?.key === col.key && sort.dir === "desc" ? 1 : 0.35}
                      />
                    </svg>
                  )}
                </span>
              </th>
            ))}
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
                  "border-b border-[#F1F1F1] last:border-b-0",
                  onRowClick && "cursor-pointer",
                  striped && i % 2 === 1 && "bg-[#FAFBFC]",
                  isSelected ? "bg-[#E5F4FF]" : "hover:bg-[#F4F8FB]",
                )}
              >
                {onSelectionChange && (
                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(id)}
                      className="accent-[#005BA6] w-4 h-4 cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cxTable(
                      "p-3 text-[#1F2937]",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
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

declare const window: Window & { Table?: typeof Table };
if (typeof window !== "undefined") {
  Object.assign(window, { Table });
}

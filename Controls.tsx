// ════════════════════════════════════════════════════════════════
// AUTO-GENERATED FROM src/ — do NOT hand-edit.
// Source: UI Kit/src/Controls.tsx · run `npm run sync:browser`.
// ════════════════════════════════════════════════════════════════
// ──────────────────────────────────────────────────────────────────
// Controls.tsx — PartsSource Design System
//
// Pagination — page picker with prev/next/ellipsis + page-size
// DatePicker — Start/End range field with single-month calendar popover
//
// Sourced from preview/pagination.html + preview/date-picker.html.
// ──────────────────────────────────────────────────────────────────

const cxC = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// ══════════════════════════════════════════════════════════════════
// Pagination — emits a windowed page list with ellipses
// ══════════════════════════════════════════════════════════════════

interface PaginationProps {
  page: number;
  totalPages: number;
  total?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  compact?: boolean;
  className?: string;
}

/**
 * Build a windowed page list: [1, …, 12, 13, 14, …, 24].
 * Always shows first + last; otherwise siblings of the active page.
 */
const buildPageWindow = (page: number, totalPages: number): Array<number | "…"> => {
  const siblings = 1;
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const leftSibling = Math.max(2, page - siblings);
  const rightSibling = Math.min(totalPages - 1, page + siblings);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;
  const out: Array<number | "…"> = [1];
  if (!showLeftDots) {
    for (let i = 2; i <= Math.min(5, totalPages - 1); i++) out.push(i);
  } else {
    out.push("…");
    for (let i = leftSibling; i <= rightSibling; i++) out.push(i);
  }
  if (showRightDots) {
    if (!out.includes("…")) out.push("…");
    else if (out[out.length - 1] !== "…") out.push("…");
  } else if (!showLeftDots) {
    // window starts from beginning — already pushed up to 5
  }
  if (out[out.length - 1] !== totalPages) out.push(totalPages);
  return out;
};

const ChevronIcon: React.FC<{ direction: "left" | "right" }> = ({ direction }) => (
  <svg viewBox="0 0 11 11" fill="none" aria-hidden="true" className="w-[11px] h-[11px]">
    <path
      d={direction === "left" ? "M7 1L2.5 5.5 7 10" : "M4 1l4.5 4.5L4 10"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  total,
  pageSize,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  compact = false,
  className = "",
}) => {
  const pages = buildPageWindow(page, totalPages);
  const start = pageSize ? (page - 1) * pageSize + 1 : undefined;
  const end = pageSize && total !== undefined ? Math.min(total, page * pageSize) : undefined;

  const btnBase =
    "min-w-8 h-8 px-2 inline-flex items-center justify-center bg-transparent text-[var(--ps-prim-gray-800)] border-0 rounded-[5px] " +
    "text-[14px] font-normal cursor-pointer transition-colors font-['Source_Sans_Pro',sans-serif]";

  return (
    <div
      className={cxC(
        "flex items-center justify-between gap-4 flex-wrap",
        "bg-white border border-[var(--ps-prim-gray-150)] rounded-md font-['Source_Sans_Pro',sans-serif] text-[14px] text-[var(--ps-prim-gray-800)]",
        compact ? "px-3 py-2" : "px-[18px] py-4",
        className,
      )}
    >
      {!compact && total !== undefined && pageSize !== undefined && (
        <span className={compact ? "text-[13px] text-[var(--ps-prim-gray-600)]" : ""}>
          <b className="font-bold">{start}–{end}</b> of <b className="font-bold">{total}</b> results
        </span>
      )}

      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={cxC(btnBase, "border border-[var(--ps-prim-gray-200)] bg-white hover:enabled:bg-[var(--ps-prim-gray-150)] disabled:opacity-40 disabled:cursor-not-allowed")}
        >
          <ChevronIcon direction="left" />
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`dots-${i}`} className="px-1 text-[var(--ps-prim-gray-500)]">…</span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={p === page ? "page" : undefined}
              onClick={() => onPageChange(p)}
              className={cxC(
                btnBase,
                p === page
                  ? "bg-[var(--ps-prim-blue-500)] text-white font-bold hover:bg-[var(--ps-prim-blue-500)]"
                  : "hover:bg-[var(--ps-prim-gray-150)]",
              )}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={cxC(btnBase, "border border-[var(--ps-prim-gray-200)] bg-white hover:enabled:bg-[var(--ps-prim-gray-150)] disabled:opacity-40 disabled:cursor-not-allowed")}
        >
          <ChevronIcon direction="right" />
        </button>
      </nav>

      {!compact && onPageSizeChange && pageSize !== undefined && (
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <select
            aria-label="Items per page"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 border border-[var(--ps-prim-gray-400)] rounded px-2.5 text-[14px] text-[var(--ps-prim-gray-800)] bg-white cursor-pointer outline-none focus:border-[var(--ps-prim-blue-500)] focus:shadow-[0_0_0_3px_rgba(0,91,166,0.15)] font-['Source_Sans_Pro',sans-serif]"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════
// DatePicker — Start/End range fields + month calendar
// ══════════════════════════════════════════════════════════════════

interface DatePickerProps {
  title?: React.ReactNode;
  startDate?: Date;
  endDate?: Date;
  onChange?: (range: { start?: Date; end?: Date }) => void;
  disabled?: boolean;
  error?: string;
  /** Allow a single-field picker rather than start/end range */
  range?: boolean;
  className?: string;
}

const fmt = (d?: Date) =>
  d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

const CalendarIcon: React.FC = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const sameDay = (a?: Date, b?: Date) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const isBetween = (d: Date, a?: Date, b?: Date) => {
  if (!a || !b) return false;
  const t = d.getTime();
  const ta = a.getTime();
  const tb = b.getTime();
  return t >= Math.min(ta, tb) && t <= Math.max(ta, tb);
};

interface CalendarPopoverProps {
  month: Date;
  onMonthChange: (d: Date) => void;
  start?: Date;
  end?: Date;
  onSelect: (d: Date) => void;
  onCancel?: () => void;
  onApply?: () => void;
}

const CalendarPopover: React.FC<CalendarPopoverProps> = ({
  month,
  onMonthChange,
  start,
  end,
  onSelect,
  onCancel,
  onApply,
}) => {
  const year = month.getFullYear();
  const m = month.getMonth();
  const firstOfMonth = new Date(year, m, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 = Sun
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const today = new Date();

  const cells: Array<{ d: Date; other: boolean }> = [];
  // Previous month tail
  const prevMonthDays = new Date(year, m, 0).getDate();
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ d: new Date(year, m - 1, prevMonthDays - i), other: true });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ d: new Date(year, m, day), other: false });
  }
  // Pad to 6 rows
  while (cells.length < 42) {
    const last = cells[cells.length - 1].d;
    const next = new Date(last);
    next.setDate(next.getDate() + 1);
    cells.push({ d: next, other: true });
  }

  return (
    <div className="w-[300px] bg-white border border-[var(--ps-prim-gray-200)] rounded-md shadow-[0_6px_20px_rgba(0,47,72,0.12)] p-4 font-['Source_Sans_Pro',sans-serif] text-[14px] leading-[1.4]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[16px] font-bold text-[var(--ps-prim-blue-800)]">
          {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => onMonthChange(new Date(year, m - 1, 1))}
            className="w-7 h-7 inline-flex items-center justify-center border-0 bg-transparent cursor-pointer text-[var(--ps-prim-gray-700)] rounded hover:bg-[var(--ps-prim-gray-150)] hover:text-[var(--ps-prim-blue-500)]"
          >
            <svg width={14} height={14} viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M7 1L2.5 5.5 7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => onMonthChange(new Date(year, m + 1, 1))}
            className="w-7 h-7 inline-flex items-center justify-center border-0 bg-transparent cursor-pointer text-[var(--ps-prim-gray-700)] rounded hover:bg-[var(--ps-prim-gray-150)] hover:text-[var(--ps-prim-blue-500)]"
          >
            <svg width={14} height={14} viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M4 1l4.5 4.5L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={i}
            className="h-7 text-[11px] font-bold uppercase tracking-[0.5px] text-[var(--ps-prim-gray-500)] inline-flex items-center justify-center"
          >
            {d}
          </div>
        ))}
        {cells.map(({ d, other }, i) => {
          const selected = sameDay(d, start) || sameDay(d, end);
          const inRange = !selected && isBetween(d, start, end);
          const isToday = sameDay(d, today);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(d)}
              className={cxC(
                "w-9 h-9 inline-flex items-center justify-center border-0 cursor-pointer text-[14px]",
                "rounded-md",
                selected
                  ? "bg-[var(--ps-prim-blue-500)] text-white font-bold"
                  : inRange
                    ? "bg-[var(--ps-prim-blue-50)] text-[var(--ps-prim-blue-500)] rounded-none"
                    : other
                      ? "bg-transparent text-[var(--ps-prim-gray-400)]"
                      : isToday
                        ? "bg-transparent text-[var(--ps-prim-blue-500)] font-bold"
                        : "bg-transparent text-[var(--ps-prim-gray-800)] hover:bg-[var(--ps-prim-blue-50)] hover:text-[var(--ps-prim-blue-500)]",
                sameDay(d, start) && "rounded-l-md rounded-r-none",
                sameDay(d, end) && start && !sameDay(d, start) && "rounded-r-md rounded-l-none",
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      {(onCancel || onApply) && (
        <div className="mt-3.5 pt-3 border-t border-[var(--ps-prim-gray-150)] flex justify-between gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="h-8 px-3 border border-[var(--ps-prim-gray-300)] bg-white rounded text-[13px] font-semibold text-[var(--ps-prim-gray-700)] cursor-pointer hover:border-[var(--ps-prim-blue-500)] hover:text-[var(--ps-prim-blue-500)]"
            >
              Cancel
            </button>
          )}
          {onApply && (
            <button
              type="button"
              onClick={onApply}
              className="h-8 px-3 border border-[var(--ps-prim-blue-500)] bg-[var(--ps-prim-blue-500)] text-white rounded text-[13px] font-semibold cursor-pointer hover:bg-[var(--ps-prim-blue-600)] hover:border-[var(--ps-prim-blue-600)]"
            >
              Apply
            </button>
          )}
        </div>
      )}
    </div>
  );
};

interface DateFieldProps {
  label: string;
  value?: Date;
  disabled?: boolean;
  error?: boolean;
  onTrigger?: () => void;
}

const DateField: React.FC<DateFieldProps> = ({ label, value, disabled, error, onTrigger }) => (
  <div
    className={cxC(
      "relative w-[230px] h-12 bg-white border rounded-[3px] overflow-hidden transition-all duration-100",
      disabled
        ? "border-[var(--ps-prim-gray-300)] cursor-not-allowed bg-[var(--ps-prim-gray-50)]"
        : error
          ? "border-[var(--ps-prim-red-600)]"
          : "border-[var(--ps-prim-gray-500)] hover:border-black focus-within:border-[var(--ps-prim-blue-500)] focus-within:shadow-[0_0_10px_0_rgba(0,91,166,0.5)]",
    )}
    onClick={!disabled ? onTrigger : undefined}
  >
    <input
      type="text"
      readOnly
      aria-label={label}
      placeholder={label}
      value={value ? fmt(value) : ""}
      disabled={disabled}
      className={cxC(
        "w-full h-full border-0 outline-none px-3 pr-14 bg-transparent text-[16px]",
        "font-['Source_Sans_Pro',sans-serif] leading-none cursor-pointer",
        disabled ? "text-[var(--ps-prim-gray-500)] cursor-not-allowed" : error ? "text-[var(--ps-prim-red-600)]" : value ? "text-black" : "text-[var(--ps-prim-gray-700)]",
      )}
    />
    <button
      type="button"
      aria-label="Open calendar"
      disabled={disabled}
      className={cxC(
        "absolute top-0 right-0 h-full w-12 inline-flex items-center justify-center border-0 cursor-pointer text-white transition-colors",
        disabled
          ? "bg-[var(--ps-prim-orange-100)] cursor-not-allowed"
          : "bg-[var(--ps-prim-orange-400)] hover:bg-[var(--ps-prim-orange-500)] focus-visible:outline-2 focus-visible:outline-[var(--ps-prim-blue-800)] focus-visible:-outline-offset-[3px]",
      )}
    >
      <CalendarIcon />
    </button>
  </div>
);

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  startDate,
  endDate,
  onChange,
  disabled = false,
  error,
  range = true,
  className = "",
}) => {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(startDate ?? new Date());
  const [draftStart, setDraftStart] = React.useState<Date | undefined>(startDate);
  const [draftEnd, setDraftEnd] = React.useState<Date | undefined>(endDate);
  const wrap = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const selectDay = (d: Date) => {
    if (!range) {
      setDraftStart(d);
      setDraftEnd(undefined);
      return;
    }
    // Range selection — first click sets start; second click closes range
    if (!draftStart || (draftStart && draftEnd)) {
      setDraftStart(d);
      setDraftEnd(undefined);
    } else if (d.getTime() < draftStart.getTime()) {
      setDraftStart(d);
    } else {
      setDraftEnd(d);
    }
  };

  return (
    <div
      ref={wrap}
      className={cxC(
        "relative inline-flex flex-col gap-4 font-['Source_Sans_Pro','Source_Sans_3',sans-serif]",
        className,
      )}
    >
      {title && <h3 className="m-0 text-[20px] leading-none text-black font-normal">{title}</h3>}
      <div className="flex gap-[30px]">
        <DateField
          label={range ? "Start Date" : "Select Date"}
          value={draftStart}
          disabled={disabled}
          error={Boolean(error)}
          onTrigger={() => setOpen((o) => !o)}
        />
        {range && (
          <DateField
            label="End Date"
            value={draftEnd}
            disabled={disabled}
            error={Boolean(error)}
            onTrigger={() => setOpen((o) => !o)}
          />
        )}
      </div>
      {error && <div className="text-[12px] text-[var(--ps-prim-red-600)]">{error}</div>}
      {open && !disabled && (
        <div className="absolute top-[calc(100%+8px)] left-0 z-10">
          <CalendarPopover
            month={month}
            onMonthChange={setMonth}
            start={draftStart}
            end={draftEnd}
            onSelect={selectDay}
            onCancel={() => {
              setDraftStart(startDate);
              setDraftEnd(endDate);
              setOpen(false);
            }}
            onApply={() => {
              onChange?.({ start: draftStart, end: draftEnd });
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

// ── Window export so other Babel-loaded scripts can read these ───
declare const window: Window & {
  Pagination?: typeof Pagination;
  DatePicker?: typeof DatePicker;
};
if (typeof window !== "undefined") {
  Object.assign(window, { Pagination, DatePicker });
}

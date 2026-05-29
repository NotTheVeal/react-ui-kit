import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Filter.tsx — PartsSource Design System
//
// FilterChip: removable chip with an X — used in filter strips and
//             active-filter rows. Brand-blue with rounded corners.
// FilterShell: light-grey container (FAFAFA, 8px radius, 68px tall)
//             that holds a filter icon, chip row and an "Add filter"
//             trigger. Matches the Figma /Filter spec.
//
// Pulled from preview/filter.html.
// ──────────────────────────────────────────────────────────────────

interface FilterChipProps {
  label: React.ReactNode;
  onRemove?: () => void;
  removable?: boolean;
  className?: string;
}

interface FilterShellProps {
  chips?: React.ReactNode;
  onAddClick?: () => void;
  addLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

const cxFilter = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  onRemove,
  removable = true,
  className = "",
}) => (
  <span
    className={cxFilter(
      "inline-flex items-center gap-1.5 h-7 pl-3 pr-2 rounded-md text-[13px] font-semibold",
      "bg-[var(--ps-prim-blue-25)] text-[var(--ps-prim-blue-500)] border border-[var(--ps-prim-blue-200)]",
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    {label}
    {removable && (
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove filter"
        className="w-5 h-5 inline-flex items-center justify-center rounded-sm hover:bg-[var(--ps-prim-blue-100)] text-[var(--ps-prim-blue-500)] cursor-pointer bg-transparent border-0"
      >
        <svg width={10} height={10} viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    )}
  </span>
);

const FilterShell: React.FC<FilterShellProps> = ({
  chips,
  onAddClick,
  addLabel = "Add filter",
  children,
  className = "",
}) => (
  <div
    className={cxFilter(
      "w-full max-w-[960px] bg-[var(--ps-prim-gray-50)] rounded-lg p-4 flex flex-col gap-3",
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    <div className="flex items-center gap-3 flex-wrap">
      <span className="inline-flex items-center justify-center w-6 h-6 text-[var(--ps-prim-blue-500)] flex-shrink-0" aria-hidden="true">
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5h14M5 10h10M8 15h4" />
        </svg>
      </span>
      <div className="flex items-center gap-2 flex-wrap flex-1">{chips}</div>
      {onAddClick && (
        <button
          type="button"
          onClick={onAddClick}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded border border-dashed border-[var(--ps-prim-blue-500)] text-[var(--ps-prim-blue-500)] text-[13px] font-semibold bg-transparent cursor-pointer hover:bg-[var(--ps-prim-blue-50)]"
        >
          <svg width={12} height={12} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
            <path d="M6 1v10M1 6h10" />
          </svg>
          {addLabel}
        </button>
      )}
    </div>
    {children}
  </div>
);

export { FilterChip, FilterShell };

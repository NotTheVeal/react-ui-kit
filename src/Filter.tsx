import * as React from 'react';
import { Button } from './Button';

// ──────────────────────────────────────────────────────────────────
// Filter.tsx — PartsSource Design System
//
// A multi-faceted filter pattern (Figma /Filter, preview/filter.html).
// Built around a 69px-tall bar with a filter-icon cell, an "Add a
// Filter" dropdown trigger, and a dynamic input area on the right whose
// control changes to match the selected facet (free-form text, search
// w/ suggestions, multi-select). Applied filters render as Brand-Light
// (#D0EDFC) pill chips on the row below, alongside "Clear all" and
// "Save Filter Set" actions.
//
// Exports:
//   Filter              — the full stateful filter bar + chip row
//   FilterChip          — a single removable Brand-Light pill chip
//   SaveFilterSetButton — white→PS-Blue pill button
//   SavedFilterCard     — a named, reusable saved filter set card
//   SaveFilterModal     — "Save Filter Selection" dialog
//
// All colors are token-bound (var(--ps-…)). No raw hex.
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

const SANS = "font-['Source_Sans_Pro',sans-serif]";

// ── Icons ─────────────────────────────────────────────────────────
const FilterIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M3 5h6M14 5h3M3 10h2M10 10h7M3 15h10M16 15h1"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <circle cx={11} cy={5} r={1.8} fill="var(--ps-prim-gray-0)" stroke="currentColor" strokeWidth={1.6} />
    <circle cx={7} cy={10} r={1.8} fill="var(--ps-prim-gray-0)" stroke="currentColor" strokeWidth={1.6} />
    <circle cx={14} cy={15} r={1.8} fill="var(--ps-prim-gray-0)" stroke="currentColor" strokeWidth={1.6} />
  </svg>
);

const Chevron: React.FC = () => (
  <svg width={12} height={8} viewBox="0 0 12 8" fill="none" aria-hidden="true">
    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RemoveGlyph: React.FC = () => (
  <svg width={9} height={9} viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <circle cx={5} cy={5} r={4.5} stroke="currentColor" strokeWidth={1} />
    <path d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────
export type FilterFacetType = 'text' | 'search' | 'multiselect';

export interface FilterFacet {
  id: string;
  label: string;
  type?: FilterFacetType;
  /** Options for `search` / `multiselect` facets. */
  options?: string[];
}

export interface AppliedFilter {
  /** Unique per-chip id. */
  id: string;
  facetId: string;
  facetLabel: string;
  value: string;
}

// ── FilterChip ────────────────────────────────────────────────────
export interface FilterChipProps {
  /** Bold key rendered before the value, e.g. "Facility". Omit the trailing colon. */
  filterKey?: React.ReactNode;
  /** Regular-weight value, e.g. "Hospital A". */
  value?: React.ReactNode;
  /** Fallback single-string label when key/value aren't split. */
  label?: React.ReactNode;
  onRemove?: () => void;
  removable?: boolean;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  filterKey,
  value,
  label,
  onRemove,
  removable = true,
  className = '',
}) => (
  <span
    className={cx(
      'inline-flex items-center gap-1.5 h-[23px] px-[11px] rounded-full',
      'bg-[var(--ps-prim-blue-100)] text-[var(--ps-prim-gray-800)] text-[15px] leading-none whitespace-nowrap',
      SANS,
      className,
    )}
  >
    {filterKey != null ? (
      <>
        <span className="font-bold">{filterKey}:</span>
        <span className="font-normal">{value}</span>
      </>
    ) : (
      <span className="font-normal">{label}</span>
    )}
    {removable && (
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${typeof filterKey === 'string' ? filterKey : typeof label === 'string' ? label : ''} filter`.replace(/\s+/g, ' ').trim()}
        className="ml-0.5 inline-flex items-center justify-center w-3.5 h-3.5 p-0 bg-transparent border-0 cursor-pointer text-[var(--ps-sem-fg-secondary)] hover:text-[var(--ps-sem-fg-brand)]"
      >
        <RemoveGlyph />
      </button>
    )}
  </span>
);

// ── SaveFilterSetButton (white → PS-Blue pill) ────────────────────
export interface SaveFilterSetButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const SaveFilterSetButton: React.FC<SaveFilterSetButtonProps> = ({
  children = 'Save Filter Set',
  className = '',
  ...rest
}) => (
  <button
    type="button"
    className={cx(
      'inline-flex items-center justify-center h-9 px-[18px] rounded-full',
      'border border-[var(--ps-sem-border-default)] bg-[var(--ps-sem-bg-surface)]',
      'text-sm font-semibold text-[var(--ps-sem-fg-primary)] cursor-pointer',
      'transition-colors duration-150 ease-in-out',
      'hover:bg-[var(--ps-sem-action-default)] hover:border-[var(--ps-sem-fg-brand)] hover:text-[var(--ps-sem-fg-inverse)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-sem-border-focus)]',
      SANS,
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

// ── Text action ("Clear all", "Save Filter Set" link) ─────────────
const TextAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = '',
  children,
  ...rest
}) => (
  <button
    type="button"
    className={cx(
      'bg-transparent border-0 cursor-pointer text-[15px] font-normal leading-none',
      'text-[var(--ps-sem-fg-primary)] px-3.5 py-1.5 rounded-full',
      'transition-colors duration-100 hover:bg-[var(--ps-sem-bg-muted)]',
      SANS,
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

// ── Filter (main bar + chip row) ──────────────────────────────────
export interface FilterProps {
  /** Facets available in the "Add a Filter" dropdown. */
  facets?: FilterFacet[];
  /** Initial applied chips (uncontrolled). */
  defaultApplied?: AppliedFilter[];
  /** Fired whenever the applied set changes. */
  onChange?: (applied: AppliedFilter[]) => void;
  /** Fired when the user clicks "Save Filter Set". */
  onSaveSet?: (applied: AppliedFilter[]) => void;
  emptyText?: string;
  /** Bar max width in px (dynamic up to 960 per spec). */
  maxWidth?: number;
  className?: string;
}

const DEFAULT_FACETS: FilterFacet[] = [
  { id: 'account', label: 'Account', type: 'text' },
  { id: 'assetId', label: 'Asset ID', type: 'text' },
  { id: 'costCenter', label: 'Cost Center', type: 'text' },
  { id: 'facility', label: 'Facility', type: 'text' },
  { id: 'po', label: 'PO #', type: 'text' },
  { id: 'order', label: 'Order #', type: 'text' },
  { id: 'tracking', label: 'Tracking #', type: 'text' },
  { id: 'timeframe', label: 'Timeframe', type: 'search', options: ['Last 7 days', 'Last 14 days', 'Last 30 days', 'Last 90 days', 'Last 6 months'] },
  { id: 'orderType', label: 'Order Type', type: 'multiselect', options: ['Part', 'Repair', 'Loaner', 'Service'] },
  { id: 'status', label: 'Status', type: 'multiselect', options: ['Ordered', 'Backordered', 'Shipped', 'Delivered'] },
];

let chipSeq = 0;
const nextChipId = () => `flt-${Date.now().toString(36)}-${(chipSeq++).toString(36)}`;

export const Filter: React.FC<FilterProps> = ({
  facets = DEFAULT_FACETS,
  defaultApplied = [],
  onChange,
  onSaveSet,
  emptyText = 'No Filters applied',
  maxWidth = 960,
  className = '',
}) => {
  const [applied, setApplied] = React.useState<AppliedFilter[]>(defaultApplied);
  const [touched, setTouched] = React.useState(defaultApplied.length > 0);
  const [facetMenuOpen, setFacetMenuOpen] = React.useState(false);
  const [selectedFacetId, setSelectedFacetId] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [suggestOpen, setSuggestOpen] = React.useState(false);
  const [pendingMulti, setPendingMulti] = React.useState<string[]>([]);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const selectedFacet = facets.find((f) => f.id === selectedFacetId) ?? null;

  // Close menus on outside click.
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setFacetMenuOpen(false);
        setSuggestOpen(false);
        commitMulti();
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [pendingMulti, selectedFacetId]);

  const emit = (next: AppliedFilter[]) => {
    setApplied(next);
    onChange?.(next);
  };

  const addChip = (facet: FilterFacet, value: string) => {
    const v = value.trim();
    if (!v) return;
    emit([...applied, { id: nextChipId(), facetId: facet.id, facetLabel: facet.label, value: v }]);
  };

  const commitText = () => {
    if (!selectedFacet) return;
    // Comma-separated values → one chip each. Build all additions and emit
    // once so we don't stomp state across a forEach of stale closures.
    const additions = inputValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((v) => ({
        id: nextChipId(),
        facetId: selectedFacet.id,
        facetLabel: selectedFacet.label,
        value: v,
      }));
    if (additions.length) emit([...applied, ...additions]);
    setInputValue('');
  };

  const commitMulti = () => {
    if (!selectedFacet || pendingMulti.length === 0) return;
    const additions = pendingMulti.map((v) => ({
      id: nextChipId(),
      facetId: selectedFacet.id,
      facetLabel: selectedFacet.label,
      value: v,
    }));
    emit([...applied, ...additions]);
    setPendingMulti([]);
  };

  const selectFacet = (facet: FilterFacet) => {
    setSelectedFacetId(facet.id);
    setFacetMenuOpen(false);
    setInputValue('');
    setPendingMulti([]);
    setTouched(true);
    setSuggestOpen(facet.type === 'search' || facet.type === 'multiselect');
  };

  const removeChip = (id: string) => emit(applied.filter((c) => c.id !== id));
  const clearAll = () => emit([]);

  const triggerOpen = selectedFacet != null;
  const facetType = selectedFacet?.type ?? 'text';
  const placeholder =
    facetType === 'search' || facetType === 'multiselect'
      ? `Search ${selectedFacet?.label ?? ''}...`
      : `Enter ${selectedFacet?.label ?? ''}...`;

  return (
    <div ref={rootRef} className={cx('w-full', SANS, className)} style={{ maxWidth }}>
      {/* Shell */}
      <div
        className="w-full bg-[var(--ps-sem-bg-canvas)] border border-[var(--ps-sem-border-default)] rounded-lg px-2.5 py-3.5 relative"
      >
        <div className="flex items-center w-full h-10">
          {/* Icon cell */}
          <button
            type="button"
            aria-label="Filter"
            onClick={() => setFacetMenuOpen((o) => !o)}
            className={cx(
              'flex-shrink-0 w-[42px] h-10 flex items-center justify-center cursor-pointer',
              'bg-[var(--ps-sem-bg-surface)] border border-[var(--ps-sem-border-strong)] rounded-l-[5px]',
              'transition-colors duration-150',
              facetMenuOpen || triggerOpen
                ? 'text-[var(--ps-sem-fg-brand)] border-[var(--ps-sem-fg-brand)]'
                : 'text-[var(--ps-sem-fg-secondary)]',
            )}
          >
            <FilterIcon />
          </button>

          {/* Trigger */}
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={facetMenuOpen}
            onClick={() => setFacetMenuOpen((o) => !o)}
            className={cx(
              'flex-shrink-0 w-[212px] h-10 flex items-center text-left cursor-pointer px-[15px] relative',
              'bg-[var(--ps-sem-bg-surface)] border border-l-0 border-[var(--ps-sem-border-strong)]',
              triggerOpen && 'border border-[var(--ps-sem-fg-brand)]',
            )}
          >
            <span className="flex-1 flex flex-col leading-none min-w-0">
              {triggerOpen ? (
                <>
                  <span className="text-[11px] font-semibold text-[var(--ps-sem-fg-brand)] tracking-[0.2px] mb-[3px]">
                    Add a Filter
                  </span>
                  <span className="text-base font-normal text-[var(--ps-sem-fg-brand)] tracking-[-0.16px] truncate">
                    {selectedFacet?.label}
                  </span>
                </>
              ) : (
                <span className="text-base font-normal text-[var(--ps-prim-gray-650)] tracking-[-0.16px]">
                  Add a Filter
                </span>
              )}
            </span>
            <span
              className={cx(
                'flex items-center justify-center w-5 h-5 ml-2 flex-shrink-0',
                triggerOpen ? 'text-[var(--ps-sem-fg-brand)]' : 'text-[var(--ps-prim-gray-650)]',
              )}
            >
              <Chevron />
            </span>

            {/* Facet list dropdown */}
            {facetMenuOpen && (
              <div
                role="listbox"
                aria-label="Available filters"
                className="absolute top-[calc(100%+4px)] left-0 w-[266px] max-h-[520px] overflow-auto z-20 py-2 rounded bg-[var(--ps-sem-bg-surface)] shadow-[0_2px_10px_0_rgba(0,47,72,0.30)]"
              >
                {facets.map((f) => (
                  <div
                    key={f.id}
                    role="option"
                    aria-selected={f.id === selectedFacetId}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectFacet(f);
                    }}
                    className={cx(
                      'px-4 py-2 text-[15px] cursor-pointer transition-colors duration-100',
                      f.id === selectedFacetId
                        ? 'bg-[var(--ps-prim-blue-100)] text-[var(--ps-sem-fg-primary)]'
                        : 'text-[var(--ps-sem-fg-primary)] hover:bg-[var(--ps-prim-gray-100)]',
                    )}
                  >
                    {f.label}
                  </div>
                ))}
              </div>
            )}
          </button>

          {/* Dynamic input area */}
          <div
            className={cx(
              'flex-1 h-10 bg-[var(--ps-sem-bg-surface)] border border-l-0 border-[var(--ps-sem-border-strong)] rounded-r-[5px]',
              triggerOpen && 'flex items-center px-[18px]',
            )}
          >
            {triggerOpen && (
              <input
                type="text"
                aria-label={selectedFacet?.label}
                value={inputValue}
                placeholder={placeholder}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => (facetType === 'search' || facetType === 'multiselect') && setSuggestOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && facetType === 'text') {
                    e.preventDefault();
                    commitText();
                  }
                }}
                className="flex-1 border-0 outline-none bg-transparent text-base text-[var(--ps-sem-fg-primary)] placeholder:text-[var(--ps-sem-fg-tertiary)]"
              />
            )}
          </div>
        </div>

        {/* Suggestion / multi-select menu — flush under input area */}
        {triggerOpen && suggestOpen && facetType !== 'text' && (
          <div
            className="absolute top-[54px] left-[264px] right-2.5 z-10 mt-1 rounded bg-[var(--ps-sem-bg-surface)] border border-t-0 border-[var(--ps-sem-border-default)] shadow-[0_4px_12px_rgba(0,47,72,0.06)]"
            role={facetType === 'multiselect' ? 'group' : 'listbox'}
          >
            {facetType === 'search' &&
              (selectedFacet?.options ?? [])
                .filter((o) => o.toLowerCase().includes(inputValue.toLowerCase()))
                .map((opt, i, arr) => (
                  <div
                    key={opt}
                    role="option"
                    aria-selected={false}
                    onClick={() => {
                      addChip(selectedFacet!, opt);
                      setInputValue('');
                      setSuggestOpen(false);
                    }}
                    className={cx(
                      'px-[22px] py-3.5 text-base text-[var(--ps-sem-fg-primary)] cursor-pointer hover:bg-[var(--ps-prim-gray-100)]',
                      i < arr.length - 1 && 'border-b border-[var(--ps-sem-border-subtle)]',
                    )}
                  >
                    {opt}
                  </div>
                ))}

            {facetType === 'multiselect' &&
              (selectedFacet?.options ?? [])
                .filter((o) => o.toLowerCase().includes(inputValue.toLowerCase()))
                .map((opt, i, arr) => {
                  const checked = pendingMulti.includes(opt);
                  return (
                    <label
                      key={opt}
                      className={cx(
                        'flex items-center gap-3.5 px-[22px] py-3.5 text-base text-[var(--ps-sem-fg-primary)] cursor-pointer',
                        i < arr.length - 1 && 'border-b border-[var(--ps-sem-border-subtle)]',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          setPendingMulti((prev) =>
                            prev.includes(opt) ? prev.filter((v) => v !== opt) : [...prev, opt],
                          )
                        }
                        className="w-4 h-4 accent-[var(--ps-sem-fg-brand)]"
                      />
                      {opt}
                    </label>
                  );
                })}
          </div>
        )}
      </div>

      {/* Chip row / empty state */}
      {applied.length > 0 ? (
        <div className="flex items-center gap-5 flex-wrap w-full pl-6 mt-4">
          {applied.map((chip) => (
            <FilterChip
              key={chip.id}
              filterKey={chip.facetLabel}
              value={chip.value}
              onRemove={() => removeChip(chip.id)}
            />
          ))}
          <TextAction onClick={clearAll}>Clear all</TextAction>
          <TextAction onClick={() => onSaveSet?.(applied)}>Save Filter Set</TextAction>
        </div>
      ) : (
        touched && (
          <div className="pl-6 mt-4 text-[15px] italic leading-none text-[var(--ps-sem-fg-disabled)]">
            {emptyText}
          </div>
        )
      )}
    </div>
  );
};

// ── SavedFilterCard ───────────────────────────────────────────────
export interface SavedFilterCardProps {
  name: string;
  chips: AppliedFilter[];
  isDefault?: boolean;
  editing?: boolean;
  onRename?: (name: string) => void;
  onEditToggle?: () => void;
  onSetDefault?: () => void;
  onApply?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  onRemoveChip?: (id: string) => void;
  className?: string;
}

const StarIcon: React.FC<{ filled?: boolean }> = ({ filled }) => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill={filled ? 'currentColor' : 'none'}
    stroke={filled ? undefined : 'currentColor'}
    strokeWidth={filled ? undefined : 1.2}
    aria-hidden="true"
  >
    <path d="M7 1L8.8 5L13 5.5L9.8 8.5L10.7 13L7 10.8L3.3 13L4.2 8.5L1 5.5L5.2 5Z" strokeLinejoin="round" />
  </svg>
);

const PencilIcon: React.FC = () => (
  <svg width={13} height={13} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9.5 2L12 4.5L4.5 12L1.5 12L1.5 9L9.5 2Z" stroke="currentColor" strokeWidth={1.3} strokeLinejoin="round" />
  </svg>
);

export const SavedFilterCard: React.FC<SavedFilterCardProps> = ({
  name,
  chips,
  isDefault = false,
  editing = false,
  onRename,
  onEditToggle,
  onSetDefault,
  onApply,
  onSave,
  onDelete,
  onRemoveChip,
  className = '',
}) => (
  <div
    className={cx(
      'w-[420px] bg-[var(--ps-sem-bg-surface)] border border-[var(--ps-sem-border-default)] rounded-md px-5 pt-[18px] pb-4',
      SANS,
      className,
    )}
  >
    <div className="flex items-center justify-between mb-3.5">
      <span className="inline-flex items-center gap-2 text-base font-semibold text-[var(--ps-sem-fg-primary)]">
        {editing ? (
          <input
            type="text"
            defaultValue={name}
            aria-label="Filter set name"
            maxLength={13}
            onChange={(e) => onRename?.(e.target.value)}
            className="font-inherit text-base font-semibold text-[var(--ps-sem-fg-primary)] border-0 border-b border-[var(--ps-prim-gray-800)] outline-none bg-transparent py-0.5 min-w-[140px]"
          />
        ) : (
          <span className="truncate max-w-[220px]">{name}</span>
        )}
        <button
          type="button"
          aria-label="Edit name"
          onClick={onEditToggle}
          className="p-0 bg-transparent border-0 cursor-pointer text-[var(--ps-sem-fg-tertiary)] hover:text-[var(--ps-sem-fg-brand)]"
        >
          <PencilIcon />
        </button>
      </span>
      {isDefault ? (
        <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--ps-sem-fg-brand)]">
          <StarIcon filled />
          Default
        </span>
      ) : (
        <button
          type="button"
          onClick={onSetDefault}
          className="inline-flex items-center gap-1.5 text-[13px] font-normal cursor-pointer bg-transparent border-0 text-[var(--ps-sem-fg-tertiary)] hover:text-[var(--ps-sem-fg-brand)]"
        >
          <StarIcon />
          Set as Default
        </button>
      )}
    </div>

    <div className="flex flex-wrap gap-2 mb-[18px]">
      {chips.map((chip) => (
        <FilterChip
          key={chip.id}
          filterKey={chip.facetLabel}
          value={chip.value}
          onRemove={() => onRemoveChip?.(chip.id)}
        />
      ))}
    </div>

    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onDelete}
        className="text-[13px] cursor-pointer bg-transparent border-0 p-0 text-[var(--ps-sem-fg-primary)] hover:text-[var(--ps-sem-fg-brand)] hover:underline"
      >
        Delete
      </button>
      <button
        type="button"
        onClick={editing ? onSave : onApply}
        className={cx(
          'inline-flex items-center justify-center h-8 px-4 rounded-full text-[13px] font-semibold cursor-pointer',
          'bg-[var(--ps-sem-bg-surface)] border border-[var(--ps-sem-border-default)] text-[var(--ps-sem-fg-primary)]',
          'transition-colors duration-150 hover:bg-[var(--ps-sem-action-default)] hover:border-[var(--ps-sem-fg-brand)] hover:text-[var(--ps-sem-fg-inverse)]',
        )}
      >
        {editing ? 'Save' : 'Apply Filter'}
      </button>
    </div>
  </div>
);

// ── SaveFilterModal ───────────────────────────────────────────────
export interface SaveFilterModalProps {
  open: boolean;
  chips: AppliedFilter[];
  defaultName?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onSave?: (name: string) => void;
  onRemoveChip?: (id: string) => void;
}

export const SaveFilterModal: React.FC<SaveFilterModalProps> = ({
  open,
  chips,
  defaultName = '',
  onClose,
  onCancel,
  onSave,
  onRemoveChip,
}) => {
  const [name, setName] = React.useState(defaultName);
  const titleId = React.useId();
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cx(
        'w-[520px] bg-[var(--ps-sem-bg-surface)] rounded-md px-7 pt-7 pb-6',
        'shadow-[0_8px_32px_rgba(0,47,72,0.20)]',
        SANS,
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 id={titleId} className="m-0 text-[22px] font-semibold text-[var(--ps-sem-fg-primary)] tracking-[-0.1px]">
          Save Filter Selection
        </h3>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="p-1 bg-transparent border-0 cursor-pointer text-[var(--ps-sem-fg-secondary)] hover:text-[var(--ps-sem-fg-brand)]"
        >
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="mb-5">
        <input
          type="text"
          value={name}
          placeholder="Name Filter"
          aria-label="Filter name"
          onChange={(e) => setName(e.target.value)}
          className={cx(
            'w-full h-[42px] px-3.5 rounded border border-[var(--ps-sem-border-default)] outline-none',
            'text-sm text-[var(--ps-sem-fg-primary)] placeholder:text-[var(--ps-sem-fg-tertiary)]',
            'focus:border-[var(--ps-sem-fg-brand)] focus:ring-2 focus:ring-[var(--ps-prim-blue-100)]',
          )}
        />
      </div>

      <div className="min-h-[120px] p-3.5 mb-6 rounded border border-[var(--ps-sem-border-subtle)] flex flex-wrap gap-2 content-start">
        {chips.map((chip) => (
          <FilterChip
            key={chip.id}
            filterKey={chip.facetLabel}
            value={chip.value}
            onRemove={() => onRemoveChip?.(chip.id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-[18px]">
        <button
          type="button"
          onClick={onCancel ?? onClose}
          className="bg-transparent border-0 p-0 cursor-pointer text-[13px] font-bold tracking-[0.6px] uppercase text-[var(--ps-sem-fg-secondary)]"
        >
          Cancel
        </button>
        <Button variant="pill" onClick={() => onSave?.(name)}>
          Save Preset
        </Button>
      </div>
    </div>
  );
};

export default Filter;

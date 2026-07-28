import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Search.tsx — PartsSource Design System
//
// InlineSearch — always-visible search field (Figma "Search / Inline",
//   node 4962:6299). White field, border, "Search" placeholder, magnifier.
//
// HiddenSearch — collapsible search (Figma "Search / Hidden",
//   node 4962:6313). Collapsed = 36×36 magnifier button; when activated
//   it expands to a 280×40 filled field ("Search Selected" state).
//
// Both match the token-driven, floating-free conventions used in
// Input.tsx (CSS-var Tailwind arbitraries, controlled/uncontrolled).
// ──────────────────────────────────────────────────────────────────

const cxSearch = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

// Shared magnifier glyph — inlined SVG (repo convention, see Dropdown
// chevron). Colour inherits from the `color` set by the caller.
const MagnifierIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className,
}) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle
      cx="11"
      cy="11"
      r="7"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M21 21L16.65 16.65"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// ── InlineSearch ─────────────────────────────────────────────────
type InlineSearchState = 'default' | 'focus' | 'disabled';

interface InlineSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** Placeholder text. Defaults to "Search". */
  placeholder?: string;
  /** Called on every keystroke with the current value. */
  onChange?: (value: string) => void;
  /** Called when the user submits (Enter or magnifier click). */
  onSearch?: (value: string) => void;
  /** Force a visual state for docs/screenshots. */
  state?: InlineSearchState;
  className?: string;
}

const InlineSearch: React.FC<InlineSearchProps> = ({
  placeholder = 'Search',
  onChange,
  onSearch,
  state,
  value,
  defaultValue,
  disabled,
  className = '',
  id,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const reactId = React.useId();
  const inputId = id ?? `ps-search-${reactId}`;
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? ''),
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value ?? '') : internalValue;
  const [isFocused, setIsFocused] = React.useState(false);

  const forced = state;
  const isDisabled = disabled || forced === 'disabled';
  const isFocusVisible = forced === 'focus' || (forced === undefined && isFocused);

  const borderColor = isDisabled
    ? 'border-[var(--ps-prim-gray-300)]'
    : isFocusVisible
      ? 'border-[var(--ps-prim-blue-500)]'
      : 'border-[var(--ps-prim-gray-500)]';

  const focusShadow = isFocusVisible && !isDisabled
    ? 'shadow-[0_0_10px_0_rgba(0,91,166,0.5)]'
    : '';

  const hoverBorder =
    forced || isFocusVisible || isDisabled
      ? ''
      : 'hover:border-[var(--ps-prim-gray-900)]';

  return (
    <div
      role="search"
      className={cxSearch('relative w-[335px] h-12', className)}
    >
      <input
        id={inputId}
        type="search"
        role="searchbox"
        aria-label={ariaLabel ?? placeholder}
        disabled={isDisabled}
        placeholder={placeholder}
        value={isControlled ? currentValue : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch?.(currentValue);
        }}
        {...rest}
        className={cxSearch(
          'w-full h-12 pl-2.5 pr-11 bg-white border rounded-[3px] outline-none transition-all duration-150',
          "font-['Source_Sans_Pro',sans-serif] text-[16px] leading-none",
          'text-[var(--ps-prim-gray-900)] placeholder:text-[var(--ps-prim-gray-600)]',
          borderColor,
          hoverBorder,
          focusShadow,
          isDisabled && 'cursor-not-allowed',
          // strip the native search clear affordance for a clean, on-brand field
          '[&::-webkit-search-cancel-button]:appearance-none',
        )}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-label="Submit search"
        disabled={isDisabled}
        onClick={() => onSearch?.(currentValue)}
        className={cxSearch(
          'absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center',
          'text-[var(--ps-prim-gray-600)]',
          isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:text-[var(--ps-prim-blue-500)]',
        )}
      >
        <MagnifierIcon size={20} />
      </button>
    </div>
  );
};

// ── HiddenSearch ─────────────────────────────────────────────────
interface HiddenSearchProps {
  /** Placeholder shown in the expanded field. Default "Search this list". */
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called when the user submits (Enter or magnifier click). */
  onSearch?: (value: string) => void;
  /** Called whenever the expanded/collapsed state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Render expanded on mount (the "Search Selected" state). */
  defaultOpen?: boolean;
  /** Force the expanded state open (controlled docs/screenshots). */
  open?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const HiddenSearch: React.FC<HiddenSearchProps> = ({
  placeholder = 'Search this list',
  value,
  defaultValue,
  onChange,
  onSearch,
  onOpenChange,
  defaultOpen = false,
  open,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const reactId = React.useId();
  const inputId = `ps-hidden-search-${reactId}`;
  const isOpenControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isOpenControlled ? open : internalOpen;

  const isValueControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? ''),
  );
  const currentValue = isValueControlled ? String(value ?? '') : internalValue;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isOpenControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isOpenControlled, onOpenChange],
  );

  // Focus the field the moment it expands.
  React.useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Collapsed — icon-only trigger (Figma "Default", 36×36).
  if (!isOpen) {
    return (
      <button
        type="button"
        aria-label={ariaLabel ?? 'Open search'}
        aria-expanded={false}
        disabled={disabled}
        onClick={() => !disabled && setOpen(true)}
        className={cxSearch(
          'flex items-center justify-center size-9 rounded-[var(--ps-prim-radius-4)]',
          'text-[var(--ps-prim-gray-600)] bg-transparent transition-colors duration-150',
          disabled
            ? 'cursor-not-allowed opacity-60'
            : 'cursor-pointer hover:bg-[var(--ps-prim-gray-100)] hover:text-[var(--ps-prim-blue-500)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-prim-blue-500)]',
          className,
        )}
      >
        <MagnifierIcon size={20} />
      </button>
    );
  }

  // Expanded — filled field (Figma "Search Selected", 280×40).
  return (
    <div
      role="search"
      className={cxSearch(
        'relative w-[280px] h-10 rounded-[var(--ps-prim-radius-4)]',
        'bg-[var(--ps-prim-gray-100)] border border-[var(--ps-prim-gray-500)]',
        className,
      )}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="search"
        role="searchbox"
        aria-label={ariaLabel ?? placeholder}
        placeholder={placeholder}
        disabled={disabled}
        value={isValueControlled ? currentValue : undefined}
        defaultValue={!isValueControlled ? defaultValue : undefined}
        onChange={(e) => {
          if (!isValueControlled) setInternalValue(e.target.value);
          onChange?.(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch?.(currentValue);
          if (e.key === 'Escape') setOpen(false);
        }}
        onBlur={() => {
          // Auto-collapse when the user leaves an empty field.
          if (currentValue.length === 0) setOpen(false);
        }}
        className={cxSearch(
          'w-full h-full pl-3 pr-11 bg-transparent border-0 outline-none',
          "font-['Source_Sans_Pro',sans-serif] text-[15px] leading-none",
          'text-[var(--ps-prim-gray-900)] placeholder:text-[var(--ps-prim-gray-600)]',
          '[&::-webkit-search-cancel-button]:appearance-none',
        )}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-label="Submit search"
        onClick={() => onSearch?.(currentValue)}
        className={cxSearch(
          'absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center',
          'text-[var(--ps-prim-gray-600)] cursor-pointer hover:text-[var(--ps-prim-blue-500)]',
        )}
      >
        <MagnifierIcon size={18} />
      </button>
    </div>
  );
};

export { InlineSearch, HiddenSearch };
export type { InlineSearchProps, HiddenSearchProps };

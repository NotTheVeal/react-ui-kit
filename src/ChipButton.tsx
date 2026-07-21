import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// ChipButton.tsx — PartsSource Design System
//
// Light-blue removable chip (active filter / selection token).
// Built from the Figma Buttons page "Chip" family, both the CURRENT
// symbols and the "Future Button Sets" redesign.
//
// Sizes:  sm · lg
// Shape:  pill=false → current (softly rounded)   ← default
//         pill=true  → future redesign (full pill, radius 100)
//
// The ONLY difference current → future is the corner radius; fills,
// text, gap and the trailing remove-icon are identical.
//
// Figma specs:
//   Current  ChipSM h24 · ChipLG h31   (radius ≈ 10 / 14px)
//   Future   Small  h26 · Large  h33   (radius 100 = full pill)
//   fill: #D0EDFC (blue-100) · text: #000 (gray-900)
//   remove icon: #09121F (near-black) → rendered with currentColor
// ──────────────────────────────────────────────────────────────────

type ChipSize = 'sm' | 'lg';

interface ChipButtonProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  size?: ChipSize;
  /** Full-pill redesign (Future Button Set). Default false = current. */
  pill?: boolean;
  /** Required — a chip is always dismissable. */
  onRemove: () => void;
  disabled?: boolean;
  /** Accessible label for the remove control; defaults to `Remove {children}`. */
  removeLabel?: string;
  children: React.ReactNode;
}

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const shell =
  "inline-flex items-center " +
  "font-['Source_Sans_Pro',sans-serif] font-normal " +
  "bg-[var(--ps-prim-blue-100)] text-[var(--ps-prim-gray-900)] " +
  "border-0 select-none max-w-full";

// Current radii come straight from the legacy Figma symbols (≈10 / 14px).
const sizes: Record<ChipSize, { current: string; future: string }> = {
  sm: {
    current: 'h-6 gap-1.5 pl-[9px] pr-[7px] text-[12px] rounded-[10px]',
    future:  'h-[26px] gap-1.5 pl-[9px] pr-[7px] text-[14px] rounded-full',
  },
  lg: {
    current: 'h-[31px] gap-2 pl-[13px] pr-[10px] text-[16px] rounded-[14px]',
    future:  'h-[33px] gap-2 pl-[13px] pr-[10px] text-[16px] rounded-full',
  },
};

const iconSize: Record<ChipSize, number> = { sm: 10, lg: 11 };

const RemoveGlyph: React.FC<{ px: number }> = ({ px }) => (
  <svg width={px} height={px} viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path
      d="M1 1L9 9M9 1L1 9"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const ChipButton: React.FC<ChipButtonProps> = ({
  size = 'lg',
  pill = false,
  onRemove,
  disabled = false,
  removeLabel,
  className = '',
  children,
  ...rest
}) => {
  const sz = sizes[size][pill ? 'future' : 'current'];
  const label =
    removeLabel ?? (typeof children === 'string' ? `Remove ${children}` : 'Remove');

  return (
    <span
      className={cx(shell, sz, disabled && 'opacity-40', className)}
      {...rest}
    >
      <span className="truncate leading-none">{children}</span>
      <button
        type="button"
        onClick={disabled ? undefined : onRemove}
        disabled={disabled}
        aria-label={label}
        className={cx(
          'inline-flex items-center justify-center shrink-0 rounded-full outline-none',
          'text-[var(--ps-prim-gray-900)]',
          'hover:text-[var(--ps-prim-blue-600)]',
          'focus-visible:shadow-[0_0_0_2px_var(--ps-prim-blue-500)]',
          'disabled:cursor-not-allowed'
        )}
      >
        <RemoveGlyph px={iconSize[size]} />
      </button>
    </span>
  );
};

export { ChipButton };
export type { ChipButtonProps };

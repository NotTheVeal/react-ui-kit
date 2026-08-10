import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// ChipButton.tsx — PartsSource Design System
//
// Light-blue removable chip (active filter / selection tag).
// 1:1 with Figma "Button/Chip" (node 3500:212):
//   Small (3500:223) · Large (3500:213) — BOTH are full-pill.
//
// Spec (Figma):
//   fill      #D0EDFC  → --ps-cmp-button-chip-bg  (blue-100)
//   text      near-black → --ps-cmp-button-chip-fg (fg-primary)
//   radius    100 (full pill) → --ps-cmp-button-chip-radius
//   sm  h26 · text 14/18 · gap 6px  · px 9px
//   lg  h33 · text 16/22 · gap 8.5px · px 12.75px
//   remove    lucide `CircleX` glyph (circled ✕), currentColor
//
// The remove glyph is the lucide CircleX icon, inlined verbatim to
// keep this kit dependency-free (no lucide-react in the bundle);
// geometry/viewBox/stroke match lucide 1:1.
// ──────────────────────────────────────────────────────────────────

type ChipSize = 'sm' | 'lg';

interface ChipButtonProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  size?: ChipSize;
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
  "inline-flex items-center justify-center overflow-hidden " +
  "font-['Source_Sans_Pro',sans-serif] font-normal leading-none " +
  'bg-[var(--ps-cmp-button-chip-bg)] text-[var(--ps-cmp-button-chip-fg)] ' +
  'rounded-[var(--ps-cmp-button-chip-radius)] border-0 select-none max-w-full';

const sizes: Record<ChipSize, string> = {
  sm: 'h-[var(--ps-cmp-button-chip-sm-height)] gap-[6px] px-[9px] text-[var(--ps-cmp-button-chip-sm-text-size)]',
  lg: 'h-[var(--ps-cmp-button-chip-lg-height)] gap-[8.5px] px-[12.75px] text-[var(--ps-cmp-button-chip-lg-text-size)]',
};

const iconSize: Record<ChipSize, number> = { sm: 14, lg: 16 };

// lucide `CircleX` — inlined (viewBox 24, stroke 2, round caps/joins).
const CircleX: React.FC<{ px: number }> = ({ px }) => (
  <svg
    width={px}
    height={px}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx={12} cy={12} r={10} />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

const ChipButton: React.FC<ChipButtonProps> = ({
  size = 'lg',
  onRemove,
  disabled = false,
  removeLabel,
  className = '',
  children,
  ...rest
}) => {
  const label =
    removeLabel ?? (typeof children === 'string' ? `Remove ${children}` : 'Remove');

  return (
    <span
      className={cx(shell, sizes[size], disabled && 'opacity-40', className)}
      {...rest}
    >
      <span className="truncate">{children}</span>
      <button
        type="button"
        onClick={disabled ? undefined : onRemove}
        disabled={disabled}
        aria-label={label}
        className={cx(
          'inline-flex items-center justify-center shrink-0 rounded-full outline-none',
          'text-[var(--ps-cmp-button-chip-icon)]',
          'hover:text-[var(--ps-cmp-button-chip-icon-hover)]',
          'focus-visible:shadow-[0_0_0_2px_var(--ps-sem-action-default)]',
          'disabled:cursor-not-allowed'
        )}
      >
        <CircleX px={iconSize[size]} />
      </button>
    </span>
  );
};

export { ChipButton };
export type { ChipButtonProps };

import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// IconButton.tsx — PartsSource Design System  ⚠ LEGACY
//
// The "Square" button family from the Figma Buttons page: a filled
// orange rounded-rectangle action button (label or icon), sizes lg/sm.
//
// ⚠ DEPRECATED — legacy orange CTA. Orange fills fail WCAG AA contrast
// against white text; use <Button variant="primary"> for new work.
// Kept only to mirror the existing Figma symbol until it is phased out.
//
// There is NO "future" redesign of this family in Figma — current only.
//
// Figma specs (Square/LG · Square/SM):
//   LG h48 · SM h32 · radius 3px (treated as drift → 4px, per Button.tsx)
//   text: white, Source Sans Pro Bold 14px, UPPERCASE
//   fills: Normal/Focussed #FF9505 (orange-400) · Hover #EC8000 (orange-500)
//          Pressed #D27200 (orange-600) · Disabled #FFCA82 (orange-100)
// ──────────────────────────────────────────────────────────────────

type IconButtonSize = 'sm' | 'lg';

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** @deprecated legacy orange square — 'lg' (48px) or 'sm' (32px) */
  size?: IconButtonSize;
  loading?: boolean;
  /** Icon or glyph rendered before the (optional) label. */
  icon?: React.ReactNode;
}

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const base =
  "inline-flex items-center justify-center gap-1.5 " +
  "font-['Source_Sans_Pro',sans-serif] font-bold uppercase tracking-[0.5px] " +
  "text-white rounded border-0 outline-none select-none " +
  "transition-colors duration-150 ease-in-out disabled:cursor-not-allowed";

// Orange ramp — legacy. Darken on hover/press; lighten (orange-100) disabled.
const interactive =
  "bg-[var(--ps-prim-orange-400)] " +
  "hover:bg-[var(--ps-prim-orange-500)] " +
  "active:bg-[var(--ps-prim-orange-600)] " +
  "focus-visible:shadow-[0_0_0_3px_rgba(255,149,5,0.3)] " +
  "disabled:bg-[var(--ps-prim-orange-100)]";

const sizes: Record<IconButtonSize, string> = {
  lg: 'h-12 min-w-[48px] px-4 text-[14px]',
  sm: 'h-8 min-w-[32px] px-3 text-[14px]',
};

/** @deprecated LEGACY orange CTA — do not use in new work. */
const IconButton: React.FC<IconButtonProps> = ({
  size = 'lg',
  loading = false,
  icon,
  className = '',
  disabled,
  children,
  ...rest
}) => (
  <button
    type="button"
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    className={cx(base, sizes[size], interactive, className)}
    {...rest}
  >
    {loading ? (
      <>
        <span className="sr-only">Loading</span>
        <svg
          className="animate-spin"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
          <path d="M12 2 A10 10 0 0 1 22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </>
    ) : (
      <>
        {icon && <span className="inline-flex items-center" aria-hidden="true">{icon}</span>}
        {children != null && <span>{children}</span>}
      </>
    )}
  </button>
);

export { IconButton };
export type { IconButtonProps };

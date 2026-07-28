import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Button.tsx — PartsSource Design System
//
// Variants:  primary | outline | secondary | tertiary | danger | pill | arrow | inline
// Sizes:     lg (50px) · sm (32px) · pill (48px) · arrow (28px) · tert-lg (40px)
// States:    default | hover | focus | pressed | disabled | loading
//
// Pulled from preview/buttons.html + Figma Buttons page.
// ──────────────────────────────────────────────────────────────────

type Variant =
  | "primary"           // filled PS Blue, white text — Figma Button/Primary (Code Connect canonical)
  | "outline"           // blue-outline → fills on hover (former primary; brand experiment, preserved)
  | "secondary"         // 32px white + grey border, blue fill on hover
  | "tertiary"          // 40px grey pill, secondary affordance
  | "danger"            // red destructive action, filled
  | "pill"              // 48px orange pill (legacy — deprecated for ADA)
  | "arrow";            // 28px square icon-only back button

type Size = "sm" | "lg";

type ForcedState = "default" | "hover" | "focus" | "pressed";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  variant?: Variant;
  size?: Size;
  /** Force a visual state regardless of pointer/keyboard. Useful for docs. */
  state?: ForcedState;
  loading?: boolean;
  /** Optional leading or trailing icon as a React node. */
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  fullWidth?: boolean;
}

// ── Base shell shared by every variant ───────────────────────────
const base =
  "inline-flex items-center justify-center font-['Source_Sans_Pro',sans-serif] " +
  "transition-colors duration-150 ease-in-out outline-none select-none " +
  "disabled:cursor-not-allowed";

// ── Size shells ──────────────────────────────────────────────────
// Canonical PartsSource button radius is 4px (per HTML preview + brand
// checklist). Figma node 115:631 shows 3px on this specific symbol but
// we treat that as Figma drift — 4px is the source of truth.
const sizeShells: Record<Size, string> = {
  sm: "h-8 min-w-[87px] px-2 text-[10px] font-medium rounded border",
  lg: "h-[50px] min-w-[325px] px-[15px] text-[15px] font-normal rounded border-2",
};

// ── Variant × state matrices ─────────────────────────────────────
// Hover / pressed / focus are also exposed as `state` overrides so docs
// can render every state without faking interactions.
const variants = {
  primary: {
    // Figma Button/Primary — filled PS Blue, white text, darken-on-interact.
    // Code Connect maps Figma Primary to this variant, so it must be the filled fill.
    default: "bg-[var(--ps-prim-blue-500)] text-white border-transparent",
    hover:   "bg-[var(--ps-prim-blue-600)] text-white border-transparent",
    pressed: "bg-[var(--ps-prim-blue-600)] text-white border-transparent shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
    focus:   "bg-[var(--ps-prim-blue-500)] text-white border-transparent shadow-[0_0_0_3px_rgba(176,198,211,0.91)]",
    disabled:"bg-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-600)] border-transparent",
    hoverInteractive:
      "hover:bg-[var(--ps-prim-blue-600)] active:bg-[var(--ps-prim-blue-600)] " +
      "active:shadow-[0_4px_4px_rgba(0,0,0,0.25)] " +
      "focus-visible:shadow-[0_0_0_3px_rgba(176,198,211,0.91)] " +
      "disabled:bg-[var(--ps-prim-gray-300)] disabled:text-[var(--ps-prim-gray-600)]",
  },
  outline: {
    // Former "primary" — blue outline that fills on hover. Preserved as a distinct
    // variant so the brand-experiment treatment isn't lost.
    default: "bg-white text-[var(--ps-prim-blue-500)] border-[var(--ps-prim-blue-500)]",
    hover:   "bg-[var(--ps-prim-blue-500)] text-white border-[var(--ps-prim-blue-400)]",
    pressed: "bg-[var(--ps-prim-blue-600)] text-white border-[var(--ps-prim-blue-600)] shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
    focus:   "bg-white text-[var(--ps-prim-blue-500)] border-[var(--ps-prim-blue-500)] shadow-[0_0_0_3px_rgba(176,198,211,0.91)]",
    disabled:"bg-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-600)] border-[var(--ps-prim-gray-600)]",
    hoverInteractive:
      "hover:bg-[var(--ps-prim-blue-500)] hover:text-white hover:border-[var(--ps-prim-blue-400)] " +
      "active:bg-[var(--ps-prim-blue-600)] active:shadow-[0_4px_4px_rgba(0,0,0,0.25)] " +
      "focus-visible:shadow-[0_0_0_3px_rgba(176,198,211,0.91)] " +
      "disabled:bg-[var(--ps-prim-gray-300)] disabled:text-[var(--ps-prim-gray-600)] disabled:border-[var(--ps-prim-gray-600)]",
  },
  secondary: {
    default: "bg-white text-[var(--ps-prim-gray-700)] border-[var(--ps-prim-gray-300)]",
    hover:   "bg-[var(--ps-prim-blue-500)] text-white border-[var(--ps-prim-blue-500)]",
    pressed: "bg-[var(--ps-prim-blue-600)] text-white border-[var(--ps-prim-blue-600)]",
    focus:   "bg-white text-[var(--ps-prim-gray-700)] border-[var(--ps-prim-blue-500)] shadow-[0_0_0_3px_var(--ps-prim-blue-50)]",
    disabled:"bg-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-500)] border-[var(--ps-prim-gray-500)]",
    hoverInteractive:
      "hover:bg-[var(--ps-prim-blue-500)] hover:text-white hover:border-[var(--ps-prim-blue-500)] " +
      "active:bg-[var(--ps-prim-blue-600)] active:border-[var(--ps-prim-blue-600)] " +
      "focus-visible:border-[var(--ps-prim-blue-500)] focus-visible:shadow-[0_0_0_3px_var(--ps-prim-blue-50)] " +
      "disabled:bg-[var(--ps-prim-gray-300)] disabled:text-[var(--ps-prim-gray-500)] disabled:border-[var(--ps-prim-gray-500)]",
  },
  tertiary: {
    // 40px pill — never sm. Override sizes below.
    default: "bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-800)] border-transparent",
    hover:   "bg-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-800)] border-transparent",
    pressed: "bg-[var(--ps-prim-gray-400)] text-[var(--ps-prim-gray-800)] border-transparent shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
    focus:   "bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-800)] border-[var(--ps-prim-blue-500)] shadow-[0_0_0_3px_var(--ps-prim-blue-50)]",
    disabled:"bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-500)] border-transparent",
    hoverInteractive:
      "hover:bg-[var(--ps-prim-gray-300)] " +
      "active:bg-[var(--ps-prim-gray-400)] active:shadow-[0_4px_4px_rgba(0,0,0,0.25)] " +
      "focus-visible:border-[var(--ps-prim-blue-500)] focus-visible:shadow-[0_0_0_3px_var(--ps-prim-blue-50)] " +
      "disabled:text-[var(--ps-prim-gray-500)]",
  },
  danger: {
    // Red destructive action — filled. Mirrors primary's darken-on-interact,
    // using the red-400/500/600 ramp. Specced in CLAUDE.md as canonical.
    default: "bg-[var(--ps-prim-red-500)] text-white border-transparent",
    hover:   "bg-[var(--ps-prim-red-600)] text-white border-transparent",
    pressed: "bg-[var(--ps-prim-red-600)] text-white border-transparent shadow-[0_4px_4px_rgba(0,0,0,0.25)]",
    focus:   "bg-[var(--ps-prim-red-500)] text-white border-transparent shadow-[0_0_0_3px_rgba(184,53,53,0.3)]",
    disabled:"bg-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-600)] border-transparent",
    hoverInteractive:
      "hover:bg-[var(--ps-prim-red-600)] active:bg-[var(--ps-prim-red-600)] " +
      "active:shadow-[0_4px_4px_rgba(0,0,0,0.25)] " +
      "focus-visible:shadow-[0_0_0_3px_rgba(184,53,53,0.3)] " +
      "disabled:bg-[var(--ps-prim-gray-300)] disabled:text-[var(--ps-prim-gray-600)]",
  },
  pill: {
    // Orange — 48px, legacy. Marked deprecated in docs.
    default: "bg-[var(--ps-prim-orange-400)] text-white border-transparent",
    hover:   "bg-[var(--ps-prim-orange-500)] text-white border-transparent",
    pressed: "bg-[var(--ps-prim-orange-600)] text-white border-transparent",
    focus:   "bg-[var(--ps-prim-orange-400)] text-white border-transparent shadow-[0_0_0_3px_rgba(255,149,5,0.3)]",
    disabled:"bg-[var(--ps-prim-orange-100)] text-white border-transparent",
    hoverInteractive:
      "hover:bg-[var(--ps-prim-orange-500)] active:bg-[var(--ps-prim-orange-600)] " +
      "focus-visible:shadow-[0_0_0_3px_rgba(255,149,5,0.3)] " +
      "disabled:bg-[var(--ps-prim-orange-100)]",
  },
  arrow: {
    default: "bg-transparent text-[var(--ps-prim-gray-700)] border-transparent",
    hover:   "bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-700)] border-transparent",
    pressed: "bg-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-700)] border-transparent",
    focus:   "bg-transparent text-[var(--ps-prim-gray-700)] border-[var(--ps-prim-blue-500)] shadow-[0_0_0_3px_var(--ps-prim-blue-50)]",
    disabled:"bg-transparent text-[var(--ps-prim-gray-700)] border-transparent opacity-50",
    hoverInteractive:
      "hover:bg-[var(--ps-prim-gray-150)] active:bg-[var(--ps-prim-gray-300)] " +
      "focus-visible:border-[var(--ps-prim-blue-500)] focus-visible:shadow-[0_0_0_3px_var(--ps-prim-blue-50)] " +
      "disabled:opacity-50",
  },
} as const;

// ── Per-variant size overrides ───────────────────────────────────
const overrideSize = (variant: Variant, size: Size): string => {
  if (variant === "pill") {
    return "h-12 px-8 text-[14px] font-bold uppercase tracking-[0.5px] rounded-[100px] border-2";
  }
  if (variant === "tertiary") {
    return "h-10 min-w-[175px] px-6 text-[14px] font-normal rounded-full border";
  }
  if (variant === "arrow") {
    return "h-7 w-7 min-w-0 p-0 rounded border";
  }
  // primary / secondary use shared size shells
  return sizeShells[size];
};

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// ── Loading spinner ──────────────────────────────────────────────
const ButtonSpinner: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    className={`animate-spin ${className}`}
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
    <path
      d="M12 2 A10 10 0 0 1 22 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// ── Button ───────────────────────────────────────────────────────
const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "lg",
  state,
  loading = false,
  iconStart,
  iconEnd,
  fullWidth,
  className = "",
  disabled,
  children,
  ...rest
}) => {
  const v = variants[variant];
  const sizeClasses = overrideSize(variant, size);

  // Static state overrides win over hover/focus interactives.
  let stateClasses: string;
  if (disabled || loading) {
    stateClasses = v.disabled;
  } else if (state) {
    stateClasses = v[state];
  } else {
    stateClasses = `${v.default} ${v.hoverInteractive}`;
  }

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type="button"
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(base, sizeClasses, stateClasses, widthClass, className)}
      {...rest}
    >
      {loading ? (
        <>
          <span className="sr-only">Loading</span>
          <ButtonSpinner />
        </>
      ) : (
        <>
          {iconStart && <span className="mr-1.5 inline-flex items-center">{iconStart}</span>}
          <span>{children}</span>
          {iconEnd && <span className="ml-1.5 inline-flex items-center">{iconEnd}</span>}
        </>
      )}
    </button>
  );
};

// ── Inline button variants (text-styled, not boxed) ──────────────
type InlineKind = "link" | "link-blue" | "tall" | "dir";

interface ButtonInlineProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  kind?: InlineKind;
}

const inlineStyles: Record<InlineKind, string> = {
  link:
    "inline-flex items-center gap-1.5 text-[14px] leading-5 text-[var(--ps-prim-gray-600)] " +
    "underline decoration-1 underline-offset-[4px] decoration-[var(--ps-prim-gray-600)] " +
    "hover:text-[var(--ps-prim-blue-500)] hover:decoration-[var(--ps-prim-blue-500)] " +
    "font-['Source_Sans_Pro',sans-serif]",
  "link-blue":
    "inline-flex items-center gap-1.5 text-[16px] font-bold leading-[1.3] " +
    "text-[var(--ps-prim-blue-500)] no-underline hover:underline " +
    "font-['Source_Sans_Pro',sans-serif]",
  tall:
    "inline-flex items-center gap-1.5 h-12 px-1 text-[14px] font-semibold " +
    "uppercase tracking-[0.3px] text-[var(--ps-prim-gray-600)] no-underline " +
    "hover:text-[var(--ps-prim-blue-500)] font-['Source_Sans_Pro',sans-serif]",
  dir:
    "inline-flex items-center gap-1.5 text-[14px] leading-5 text-[var(--ps-prim-gray-600)] " +
    "no-underline group hover:text-[var(--ps-prim-blue-500)] " +
    "font-['Source_Sans_Pro',sans-serif]",
};

const ButtonInline: React.FC<ButtonInlineProps> = ({
  kind = "link",
  className = "",
  children,
  ...rest
}) => (
  <a className={cx(inlineStyles[kind], className)} {...rest}>
    {children}
    {kind === "dir" && (
      <svg
        width={8}
        height={11}
        viewBox="0 0 8 11"
        fill="none"
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-0.5"
      >
        {/* preview/buttons.html: stroke="var(--ps-prim-gray-500)" (Grey 3) — does not inherit */}
        <path
          d="M1.2 1 6 5.5 1.2 10"
          stroke="var(--ps-prim-gray-500)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </a>
);

// ── Back-arrow glyph for the `arrow` variant ─────────────────────
const BackArrowIcon: React.FC = () => (
  <svg width={18} height={18} viewBox="0 0 27 28" fill="none" aria-hidden="true">
    <path
      d="M13.314 5.24818C13.69 4.87245 14.2993 4.87245 14.6753 5.24818C15.0517 5.62429 15.0517 6.23436 14.6753 6.61046L7.28059 14L14.6753 21.3895C15.0517 21.7657 15.0517 22.3757 14.6753 22.7518C14.2993 23.1276 13.69 23.1276 13.314 22.7518L4.55603 14L13.314 5.24818Z"
      fill="currentColor"
    />
    <path
      d="M22.4441 14.0015C22.4441 14.5385 22.0087 14.9739 21.4717 14.9739L5.90217 14.9739L5.90217 13.0291L21.4717 13.0291C22.0087 13.0291 22.4441 13.4645 22.4441 14.0015Z"
      fill="currentColor"
    />
  </svg>
);

// Exports
export { Button, ButtonInline, BackArrowIcon };

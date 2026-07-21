import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Popover.tsx — PartsSource Design System
//
// A small white floating panel with a Midnight title, optional close
// (×), a hairline divider, body text, and an optional CTA footer.
// Matches the Figma /Popover component (280px wide):
//   default   — title + × + supporting text                (node 4603:59)
//   cta       — title + × + text + Cancel/confirm buttons   (node 4962:6122)
//   textOnly  — supporting text, no title row               (node 4962:6126)
//
// This renders the panel itself (presentational). Positioning/anchoring
// is left to the caller so it can wrap it in whatever trigger it likes.
// ──────────────────────────────────────────────────────────────────

interface PopoverAction {
  label: string;
  onClick: () => void;
}

interface PopoverProps {
  variant?: 'default' | 'cta' | 'textOnly';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  /** Confirm button (right). Its styling follows `confirmTone`. */
  primaryAction?: PopoverAction;
  /** Cancel / dismiss button (left, outlined). */
  secondaryAction?: PopoverAction;
  /** `danger` renders the confirm button in red (e.g. destructive delete). */
  confirmTone?: 'brand' | 'danger';
  width?: number;
  className?: string;
  'aria-label'?: string;
}

const cxPopover = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const CloseIcon: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const Popover: React.FC<PopoverProps> = ({
  variant = 'default',
  title,
  children,
  onClose,
  primaryAction,
  secondaryAction,
  confirmTone = 'brand',
  width = 280,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const showHeader = variant !== 'textOnly' && (title || onClose);
  const showFooter = variant === 'cta' && (primaryAction || secondaryAction);

  const confirmClasses =
    confirmTone === 'danger'
      ? 'bg-[var(--ps-prim-red-700)] hover:bg-[var(--ps-prim-red-600)]'
      : 'bg-[var(--ps-prim-blue-500)] hover:bg-[var(--ps-prim-blue-600)]';

  return (
    <div
      role="dialog"
      aria-label={ariaLabel || title}
      className={cxPopover(
        "bg-white rounded-md border border-[var(--ps-prim-gray-225)] shadow-[0_4px_16px_rgba(0,47,72,0.16)] font-['Source_Sans_Pro',sans-serif] overflow-hidden",
        className,
      )}
      style={{ width }}
    >
      {showHeader && (
        <div className="flex items-start justify-between gap-3 px-4 pt-4">
          {title ? (
            <h3 className="text-[16px] font-bold text-[var(--ps-prim-blue-700)] m-0">{title}</h3>
          ) : (
            <span />
          )}
          {onClose && (
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="shrink-0 -mt-1 -mr-1 p-1 bg-transparent border-0 text-[var(--ps-prim-gray-600)] cursor-pointer rounded hover:text-[var(--ps-prim-gray-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-prim-blue-500)]"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      )}

      {showHeader && <div className="mx-4 mt-3 h-px bg-[var(--ps-prim-gray-150)]" aria-hidden="true" />}

      <div className="px-4 py-3 text-[14px] leading-relaxed text-[var(--ps-prim-gray-700)]">
        {children}
      </div>

      {showFooter && (
        <>
          <div className="mx-4 h-px bg-[var(--ps-prim-gray-150)]" aria-hidden="true" />
          <div className="flex items-center justify-end gap-2 px-4 py-3">
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="h-9 px-4 rounded bg-white border border-[var(--ps-prim-gray-300)] text-[14px] font-bold text-[var(--ps-prim-gray-800)] cursor-pointer hover:bg-[var(--ps-prim-gray-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-prim-blue-500)]"
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                type="button"
                onClick={primaryAction.onClick}
                className={cxPopover(
                  'h-9 px-4 rounded text-[14px] font-bold text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[var(--ps-prim-blue-500)]',
                  confirmClasses,
                )}
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export { Popover };
export type { PopoverProps, PopoverAction };

import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Drawer.tsx — PartsSource Design System
//
// Right-side overlay panel. Max width 500px, full viewport height,
// slides in from the right via translate-x. Scrim is a sibling
// fixed element with rgba(0,0,0,0.5) and click-to-dismiss.
//
// Pulled from preview/drawer.html.
// ──────────────────────────────────────────────────────────────────

interface DrawerProps {
  open: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  className?: string;
  /** Accessible name when no visible `title` is provided. */
  'aria-label'?: string;
}

const cxDrawer = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

const Drawer: React.FC<DrawerProps> = ({
  open,
  title,
  subtitle,
  onClose,
  children,
  footer,
  width = 480,
  className = "",
  'aria-label': ariaLabel,
}) => {
  const titleId = React.useId();
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cxDrawer(
          // Figma node 4445:1443 — scrim is 32% black, not 50%.
          "fixed inset-0 z-[90] bg-black/30 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        style={{ width: typeof width === "number" ? `${width}px` : width }}
        className={cxDrawer(
          "fixed top-0 right-0 z-[100] h-screen max-w-[100vw] bg-white",
          "shadow-[-12px_0_24px_rgba(0,0,0,0.08)] transition-transform duration-250",
          "flex flex-col font-['Source_Sans_Pro',sans-serif]",
          open ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        {(title || subtitle) && (
          <header className="flex items-start justify-between px-6 pt-6 pb-4 mb-2 border-b border-[var(--ps-prim-gray-150)]">
            <div className="flex-1 min-w-0">
              {title && (
                // Figma node 4445:1443 — 17px / 700 / var(--ps-prim-gray-700), Source Sans 3.
                <h2 id={titleId} className="m-0 text-[17px] font-bold text-[var(--ps-prim-gray-700)] leading-none font-['Source_Sans_3',sans-serif]">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="m-0 mt-1 text-[15px] text-[var(--ps-prim-gray-700)] leading-[1.4]">{subtitle}</p>
              )}
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="bg-transparent border-0 cursor-pointer text-[var(--ps-prim-gray-600)] hover:text-[var(--ps-prim-gray-900)] p-1 -mr-1 -mt-1"
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>
        )}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        {footer && (
          <footer className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--ps-prim-gray-150)]">
            {footer}
          </footer>
        )}
      </div>
    </>
  );
};

export { Drawer };

import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Modal.tsx — PartsSource Design System
//
// Modal: centered overlay with white card (5px radius, 24×32 padding,
//        light 30px title). Supports body content and an action footer.
// ConfirmDialog: thin wrapper that pre-fills the body + footer with a
//        title, message, and Cancel/Confirm buttons.
//
// Pulled from preview/modals.html.
// ──────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  title?: React.ReactNode;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  className?: string;
  'aria-label'?: string;
}

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const cxModal = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  children,
  footer,
  width = 540,
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

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : ariaLabel}
      className="fixed inset-0 z-[100] flex items-center justify-center font-['Source_Sans_Pro',sans-serif]"
    >
      <div
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />
      <div
        className={cxModal(
          "relative bg-white rounded-[5px] shadow-[0_18px_50px_rgba(0,0,0,0.25)] flex flex-col max-h-[90vh]",
          className,
        )}
        style={{ width: typeof width === "number" ? `${width}px` : width }}
      >
        {title && (
          <header className="flex items-start justify-between px-8 pt-6 pb-4">
            {/* preview/modals.html: 30px / 300 / lh 34px / gray-770 (=#373F41) */}
            <h2 id={titleId} className="m-0 text-[30px] font-light text-[var(--ps-prim-gray-770)] leading-[34px] tracking-[0]">
              {title}
            </h2>
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="bg-transparent border-0 cursor-pointer text-[var(--ps-prim-gray-600)] hover:text-[var(--ps-prim-gray-900)] p-1 -mr-1"
            >
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </header>
        )}
        <div className="flex-1 overflow-y-auto px-8 py-2">{children}</div>
        {footer && (
          <footer className="flex items-center justify-end gap-3 px-8 pt-4 pb-6">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive,
  onConfirm,
  onCancel,
}) => (
  <Modal
    open={open}
    onClose={onCancel}
    title={title}
    width={460}
    footer={
      <>
        <button
          type="button"
          onClick={onCancel}
          className="h-10 min-w-[88px] px-4 rounded border border-[var(--ps-prim-gray-300)] bg-white text-[var(--ps-prim-gray-800)] text-[14px] font-semibold hover:bg-[var(--ps-prim-gray-100)]"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={cxModal(
            "h-10 min-w-[88px] px-4 rounded text-white text-[14px] font-semibold",
            destructive
              ? "bg-[var(--ps-prim-red-700)] hover:bg-[var(--ps-prim-red-500)]"
              : "bg-[var(--ps-prim-blue-500)] hover:bg-[var(--ps-prim-blue-600)]",
          )}
        >
          {confirmLabel}
        </button>
      </>
    }
  >
    <p className="m-0 text-[14px] leading-[1.6] text-[var(--ps-prim-gray-700)]">{message}</p>
  </Modal>
);

export { Modal, ConfirmDialog };

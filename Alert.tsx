// ════════════════════════════════════════════════════════════════
// AUTO-GENERATED FROM src/ — do NOT hand-edit.
// Source: UI Kit/src/Alert.tsx · run `npm run sync:browser`.
// ════════════════════════════════════════════════════════════════
// ──────────────────────────────────────────────────────────────────
// Alert.tsx — PartsSource Design System
//
// Alert: inline notification banner (success / info / warning / fail).
// Toast: transient bottom-right popup with the same severity scheme.
//
// Pulled from preview/alerts.html.
// ──────────────────────────────────────────────────────────────────

type Severity = "success" | "info" | "warning" | "fail";

interface AlertProps {
  severity?: Severity;
  children: React.ReactNode;
  onDismiss?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

interface ToastProps {
  severity?: Severity;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const cxAlert = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// Figma node 456:210 — Core Alerts.
// Success / Fail bg var(--ps-prim-red-100) (we previously had var(--ps-prim-red-150)). Body text is **700 bold**
// in Figma — except Info which is regular weight.
const severityStyles: Record<Severity, { bg: string; fg: string; bold: boolean }> = {
  success: { bg: "bg-[var(--ps-prim-green-150)]", fg: "text-[var(--ps-prim-green-700)]", bold: true  },
  info:    { bg: "bg-[var(--ps-prim-blue-50)]", fg: "text-[var(--ps-prim-blue-500)]", bold: false },
  warning: { bg: "bg-[var(--ps-prim-orange-50)]", fg: "text-[var(--ps-prim-amber-700)]", bold: true  },
  fail:    { bg: "bg-[var(--ps-prim-red-100)]", fg: "text-[var(--ps-prim-red-700)]", bold: true  },
};

const SeverityIcon: React.FC<{ severity: Severity }> = ({ severity }) => {
  switch (severity) {
    case "success":
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21.801 10A10 10 0 1 1 17 3.335" />
          <path d="m9 11 3 3L22 4" />
        </svg>
      );
    case "fail":
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      );
    case "warning":
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    default:
      return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
  }
};

const Alert: React.FC<AlertProps> = ({
  severity = "info",
  children,
  onDismiss,
  actions,
  className = "",
}) => {
  const s = severityStyles[severity];
  return (
    <div
      role={severity === "fail" || severity === "warning" ? "alert" : "status"}
      className={cxAlert(
        "flex items-center gap-[18px] min-h-10 px-[18px] py-3 rounded-[5px] text-[14px] leading-[18px]",
        "font-['Source_Sans_Pro',sans-serif]",
        s.bg,
        s.fg,
        className,
      )}
    >
      <SeverityIcon severity={severity} />
      <span className={cxAlert("flex-1", s.bold && "font-bold")}>{children}</span>
      {actions && <div className="flex gap-2">{actions}</div>}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="flex-shrink-0 w-6 h-6 bg-transparent border-0 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

const Toast: React.FC<ToastProps> = ({
  severity = "info",
  children,
  onDismiss,
  className = "",
}) => {
  const s = severityStyles[severity];
  return (
    <div
      role="status"
      className={cxAlert(
        "flex items-center gap-[18px] min-h-14 px-[18px] py-4 rounded-lg text-[14px] leading-[18px]",
        "shadow-[0_4px_12px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.05)]",
        "font-['Source_Sans_Pro',sans-serif]",
        s.bg,
        s.fg,
        className,
      )}
    >
      <SeverityIcon severity={severity} />
      <span className={cxAlert("flex-1", s.bold && "font-bold")}>{children}</span>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="flex-shrink-0 w-6 h-6 bg-transparent border-0 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

// ── Window export so other Babel-loaded scripts can read these ───
declare const window: Window & {
  Alert?: typeof Alert;
  Toast?: typeof Toast;
};
if (typeof window !== "undefined") {
  Object.assign(window, { Alert, Toast });
}

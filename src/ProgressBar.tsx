import React from "react";

const cxPb = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

export interface ProgressBarProps {
  /** Completion percentage, 0–100. */
  value: number;
  /** Status text shown at the left of the header. Defaults from value. */
  label?: string;
  /** Hide the header row (status label + percentage). */
  hideHeader?: boolean;
  className?: string;
  "aria-label"?: string;
}

function defaultLabel(v: number): string {
  if (v <= 0) return "Not started";
  if (v >= 100) return "Complete";
  return "In progress";
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  hideHeader = false,
  className,
  "aria-label": ariaLabel,
}) => {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const statusLabel = label ?? defaultLabel(pct);

  return (
    <div className={cxPb("flex w-full flex-col gap-1.5", className)}>
      {!hideHeader && (
        <div className="flex items-center">
          <span className="flex-1 text-xs text-[var(--ps-prim-gray-650)]">
            {statusLabel}
          </span>
          <span className="text-xs font-semibold text-[var(--ps-prim-gray-650)]">
            {pct}%
          </span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? statusLabel}
        className="h-2 w-full overflow-hidden rounded-[var(--ps-prim-radius-4)] bg-[var(--ps-prim-gray-225)]"
      >
        <div
          className="h-full min-w-[4px] rounded-[var(--ps-prim-radius-4)] bg-[var(--ps-prim-blue-500)] transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export { ProgressBar };
export default ProgressBar;

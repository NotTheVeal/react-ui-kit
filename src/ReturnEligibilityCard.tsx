import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// ReturnEligibilityCard.tsx — PartsSource Design System
//
// 1:1 port of Figma "Return Eligibility Card" (node 5466:48,
// State=Eligible). Order-lifecycle surface that states whether an item
// can be returned, the return reason, and a photo upload drop zone.
//
// Structure (top → bottom):
//   Header      — title + status badge (tone-driven)
//   Divider
//   Reason      — caption label + reason text
//   UploadZone  — dashed drop zone (brand prompt + file-type hint)
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export type EligibilityTone = 'success' | 'info' | 'warning' | 'danger';

const badgeTones: Record<EligibilityTone, string> = {
  success: 'bg-[var(--ps-sem-success-bg)] text-[color:var(--ps-sem-success-fg)]',
  info: 'bg-[var(--ps-sem-info-bg)] text-[color:var(--ps-sem-info-fg)]',
  warning: 'bg-[var(--ps-sem-warning-bg)] text-[color:var(--ps-sem-warning-fg)]',
  danger: 'bg-[var(--ps-sem-danger-bg)] text-[color:var(--ps-sem-danger-fg)]',
};

export interface ReturnEligibilityCardProps {
  /** Card heading. */
  title?: string;
  /** Status badge label, e.g. "Eligible". Omit to hide the badge. */
  status?: string;
  /** Badge color tone. Defaults to "success". */
  statusTone?: EligibilityTone;
  /** Caption above the reason text. */
  reasonLabel?: string;
  /** The return reason. */
  reason: string;
  /** Whether to render the photo upload drop zone. Defaults to true. */
  showUpload?: boolean;
  /** Primary upload prompt. */
  uploadPrompt?: string;
  /** File-type hint shown under the prompt. */
  uploadHint?: string;
  /** Fires when the upload zone is activated (click / Enter / Space). */
  onUpload?: () => void;
  className?: string;
}

const ReturnEligibilityCard: React.FC<ReturnEligibilityCardProps> = ({
  title = 'Return Eligibility',
  status,
  statusTone = 'success',
  reasonLabel = 'Return reason',
  reason,
  showUpload = true,
  uploadPrompt = 'Upload photos of the item',
  uploadHint = 'PNG or JPG, up to 10MB',
  onUpload,
  className = '',
}) => (
  <article
    className={cx(
      'flex w-[354px] flex-col items-start gap-[var(--ps-sem-space-stack-md)] overflow-clip',
      'rounded-[var(--ps-sem-radius-surface)] border border-solid border-[var(--ps-sem-border-subtle)]',
      'bg-[var(--ps-sem-bg-surface)] p-[var(--ps-sem-space-inset-lg)]',
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    <div className="flex w-full items-center justify-between overflow-clip">
      <h3 className="m-0 shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-heading)] font-semibold leading-normal text-[color:var(--ps-sem-fg-primary)]">
        {title}
      </h3>
      {status && (
        <span
          className={cx(
            'flex shrink-0 items-center overflow-clip rounded-[var(--ps-sem-radius-pill)] px-[var(--ps-sem-space-inset-md)] py-[var(--ps-sem-space-stack-xs)]',
            badgeTones[statusTone],
          )}
        >
          <span className="shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-semibold leading-normal">
            {status}
          </span>
        </span>
      )}
    </div>

    <div className="h-px w-full shrink-0 bg-[var(--ps-sem-border-subtle)]" />

    <div className="flex w-full shrink-0 flex-col items-start gap-[var(--ps-sem-space-stack-xs)] overflow-clip leading-normal">
      <p className="shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-semibold text-[color:var(--ps-sem-fg-tertiary)]">
        {reasonLabel}
      </p>
      <p className="min-w-full text-[length:var(--ps-sem-text-body)] font-normal text-[color:var(--ps-sem-fg-secondary)]">
        {reason}
      </p>
    </div>

    {showUpload && (
      <button
        type="button"
        onClick={onUpload}
        className={cx(
          'flex h-[72px] w-full shrink-0 flex-col items-center justify-center gap-1 overflow-clip whitespace-nowrap',
          'rounded-[var(--ps-sem-radius-control)] border border-dashed border-[var(--ps-sem-border-default)]',
          'bg-[var(--ps-sem-bg-subtle)] py-[var(--ps-sem-space-inset-md)] cursor-pointer',
          'transition-colors hover:border-[var(--ps-sem-border-brand)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-sem-focus-ring)] focus-visible:ring-offset-2',
        )}
      >
        <span className="shrink-0 text-[length:var(--ps-sem-text-caption)] font-semibold text-[color:var(--ps-sem-fg-brand)]">
          {uploadPrompt}
        </span>
        <span className="shrink-0 text-[length:var(--ps-sem-text-caption)] font-normal text-[color:var(--ps-sem-fg-tertiary)]">
          {uploadHint}
        </span>
      </button>
    )}
  </article>
);

export { ReturnEligibilityCard };
export default ReturnEligibilityCard;

import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// NotificationCard.tsx — PartsSource Design System
//
// 1:1 port of Figma "Notification Card" (node 5466:56, Unread variant).
// Icon disc · title (+ unread dot) · body · timestamp.
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export type NotificationTone = 'critical' | 'warning' | 'info';

const TONE: Record<NotificationTone, { bg: string; fg: string; glyph: string }> = {
  critical: { bg: 'var(--ps-sem-danger-bg)', fg: 'var(--ps-sem-danger-fg)', glyph: '!' },
  warning: { bg: 'var(--ps-sem-warning-bg)', fg: 'var(--ps-sem-warning-fg)', glyph: '!' },
  info: { bg: 'var(--ps-sem-info-bg)', fg: 'var(--ps-sem-info-fg)', glyph: 'i' },
};

export interface NotificationCardProps {
  title: string;
  message: string;
  /** e.g. "4 min ago" */
  timestamp?: string;
  tone?: NotificationTone;
  unread?: boolean;
  className?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  timestamp,
  tone = 'critical',
  unread = true,
  className = '',
}) => {
  const t = TONE[tone];

  return (
    <article
      className={cx(
        'flex w-[354px] items-start gap-3 overflow-clip',
        'rounded-[var(--ps-sem-radius-surface)] border border-solid border-[var(--ps-sem-border-subtle)]',
        'bg-[var(--ps-sem-bg-surface)] p-[var(--ps-sem-space-inset-lg)]',
        "font-['Source_Sans_Pro',sans-serif]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[length:var(--ps-sem-text-body)] font-bold"
        style={{ backgroundColor: t.bg, color: t.fg }}
      >
        {t.glyph}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-[var(--ps-sem-space-stack-xs)]">
        <div className="flex items-center gap-2">
          <span className="text-[length:var(--ps-sem-text-body)] font-semibold text-[color:var(--ps-sem-fg-primary)]">
            {title}
          </span>
          {unread ? (
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--ps-sem-bg-brand)]"
              aria-label="Unread"
              role="img"
            />
          ) : null}
        </div>
        <p className="m-0 text-[length:var(--ps-sem-text-body)] leading-normal text-[color:var(--ps-sem-fg-secondary)]">
          {message}
        </p>
        {timestamp ? (
          <span className="text-[length:var(--ps-sem-text-caption)] text-[color:var(--ps-sem-fg-tertiary)]">
            {timestamp}
          </span>
        ) : null}
      </div>
    </article>
  );
};

export { NotificationCard };
export default NotificationCard;

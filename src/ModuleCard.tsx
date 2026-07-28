import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// ModuleCard.tsx — PartsSource Design System
//
// 1:1 port of Figma "Module Card" (node 5466:53) — PRO Talent dashboard.
// Thumbnail (with status pill) · title · description · meta · CTA.
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export type ModuleStatus = 'installed' | 'available' | 'in-progress';

const STATUS_LABEL: Record<ModuleStatus, string> = {
  installed: 'Installed',
  available: 'Available',
  'in-progress': 'In Progress',
};

const STATUS_TONE: Record<ModuleStatus, { bg: string; fg: string }> = {
  installed: { bg: 'var(--ps-sem-success-bg)', fg: 'var(--ps-sem-success-fg)' },
  available: { bg: 'var(--ps-sem-info-bg)', fg: 'var(--ps-sem-info-fg)' },
  'in-progress': { bg: 'var(--ps-sem-warning-bg)', fg: 'var(--ps-sem-warning-fg)' },
};

export interface ModuleCardProps {
  title: string;
  description: string;
  /** e.g. "45 min" */
  duration?: string;
  /** e.g. "Intermediate" */
  level?: string;
  status?: ModuleStatus;
  /** Thumbnail image source. When omitted a neutral placeholder is shown. */
  imageSrc?: string;
  ctaLabel?: string;
  onLaunch?: () => void;
  className?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  duration,
  level,
  status = 'available',
  imageSrc,
  ctaLabel = 'Launch Module',
  onLaunch,
  className = '',
}) => {
  const tone = STATUS_TONE[status];
  const meta = [duration, level].filter(Boolean);

  return (
    <article
      className={cx(
        'flex w-[310px] flex-col overflow-clip',
        'rounded-[var(--ps-sem-radius-surface)] border border-solid border-[var(--ps-sem-border-subtle)]',
        'bg-[var(--ps-sem-bg-surface)]',
        "font-['Source_Sans_Pro',sans-serif]",
        className,
      )}
    >
      <div className="relative h-[150px] w-full overflow-clip bg-[var(--ps-sem-bg-subtle)]">
        {imageSrc ? (
          <img src={imageSrc} alt="" className="h-full w-full object-cover" />
        ) : null}
        <span
          className="absolute left-3 top-3 rounded-[var(--ps-sem-radius-pill)] px-[var(--ps-sem-space-inset-md)] py-[var(--ps-sem-space-stack-xs)] text-[length:var(--ps-sem-text-caption)] font-semibold"
          style={{ backgroundColor: tone.bg, color: tone.fg }}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-[var(--ps-sem-space-stack-sm)] p-[var(--ps-sem-space-inset-lg)]">
        <h3 className="m-0 text-[length:var(--ps-sem-text-heading)] font-semibold leading-normal text-[color:var(--ps-sem-fg-primary)]">
          {title}
        </h3>
        <p className="m-0 text-[length:var(--ps-sem-text-body)] leading-normal text-[color:var(--ps-sem-fg-secondary)]">
          {description}
        </p>

        {meta.length > 0 ? (
          <div className="flex items-center gap-2 text-[length:var(--ps-sem-text-caption)] text-[color:var(--ps-sem-fg-tertiary)]">
            {meta.map((m, i) => (
              <React.Fragment key={m}>
                {i > 0 ? <span aria-hidden="true">·</span> : null}
                <span>{m}</span>
              </React.Fragment>
            ))}
          </div>
        ) : null}

        <div className="mt-auto pt-[var(--ps-sem-space-stack-sm)]">
          <button
            type="button"
            onClick={onLaunch}
            className={cx(
              'flex h-[50px] w-full items-center justify-center overflow-clip',
              'rounded-[var(--ps-sem-radius-control)] bg-[var(--ps-sem-bg-brand)]',
              'text-[length:var(--ps-sem-text-body)] font-semibold text-[color:var(--ps-sem-fg-inverse)]',
              'hover:bg-[var(--ps-prim-blue-600)]',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'focus-visible:outline-[var(--ps-sem-border-focus)]',
            )}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </article>
  );
};

export { ModuleCard };
export default ModuleCard;

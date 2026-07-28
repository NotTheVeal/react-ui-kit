import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// WorkOrderCard.tsx — PartsSource Design System
//
// 1:1 port of Figma "Work Order Card" (node 5466:55).
// Header (WO # + priority badge) · asset line · fault description ·
// divider · meta rows (assigned / due / status).
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export type WorkOrderPriority = 'high' | 'medium' | 'low';

const PRIORITY_LABEL: Record<WorkOrderPriority, string> = {
  high: 'High Priority',
  medium: 'Medium Priority',
  low: 'Low Priority',
};

const PRIORITY_TONE: Record<WorkOrderPriority, { bg: string; fg: string }> = {
  high: { bg: 'var(--ps-sem-danger-bg)', fg: 'var(--ps-sem-danger-fg)' },
  medium: { bg: 'var(--ps-sem-warning-bg)', fg: 'var(--ps-sem-warning-fg)' },
  low: { bg: 'var(--ps-sem-info-bg)', fg: 'var(--ps-sem-info-fg)' },
};

export interface WorkOrderMeta {
  label: string;
  value: string;
}

export interface WorkOrderCardProps {
  /** e.g. "WO #48213" */
  orderNumber: string;
  priority?: WorkOrderPriority;
  /** e.g. "Siemens MRI · MR-04, Radiology" */
  asset: string;
  description: string;
  meta?: WorkOrderMeta[];
  className?: string;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({
  orderNumber,
  priority = 'high',
  asset,
  description,
  meta = [
    { label: 'Assigned to', value: 'T. Rivera' },
    { label: 'Due', value: '07/25/26' },
    { label: 'Status', value: 'In Progress' },
  ],
  className = '',
}) => {
  const tone = PRIORITY_TONE[priority];

  return (
    <article
      className={cx(
        'flex w-[354px] flex-col gap-[var(--ps-sem-space-stack-sm)] overflow-clip',
        'rounded-[var(--ps-sem-radius-surface)] border border-solid border-[var(--ps-sem-border-subtle)]',
        'bg-[var(--ps-sem-bg-surface)] p-[var(--ps-sem-space-inset-lg)]',
        "font-['Source_Sans_Pro',sans-serif]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[length:var(--ps-sem-text-heading)] font-semibold text-[color:var(--ps-sem-fg-primary)]">
          {orderNumber}
        </span>
        <span
          className="rounded-[var(--ps-sem-radius-pill)] px-[var(--ps-sem-space-inset-md)] py-[var(--ps-sem-space-stack-xs)] text-[length:var(--ps-sem-text-caption)] font-semibold"
          style={{ backgroundColor: tone.bg, color: tone.fg }}
        >
          {PRIORITY_LABEL[priority]}
        </span>
      </div>

      <p className="m-0 text-[length:var(--ps-sem-text-body)] font-semibold text-[color:var(--ps-sem-fg-secondary)]">
        {asset}
      </p>
      <p className="m-0 text-[length:var(--ps-sem-text-body)] leading-normal text-[color:var(--ps-sem-fg-secondary)]">
        {description}
      </p>

      <hr className="my-1 h-px w-full border-0 bg-[var(--ps-sem-border-subtle)]" />

      <dl className="m-0 flex flex-col gap-[var(--ps-sem-space-stack-xs)]">
        {meta.map((m) => (
          <div key={m.label} className="flex items-center justify-between gap-3">
            <dt className="text-[length:var(--ps-sem-text-caption)] text-[color:var(--ps-sem-fg-tertiary)]">
              {m.label}
            </dt>
            <dd className="m-0 text-[length:var(--ps-sem-text-caption)] font-semibold text-[color:var(--ps-sem-fg-primary)]">
              {m.value}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
};

export { WorkOrderCard };
export default WorkOrderCard;

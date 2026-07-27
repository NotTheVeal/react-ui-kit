import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// ExchangeDetailCard.tsx — PartsSource Design System
//
// 1:1 port of Figma "Exchange Detail Card" (node 5466:49,
// State=In-Progress). Order-lifecycle surface that shows a returning
// item paired with its replacement, plus an optional core note.
//
// Structure (top → bottom):
//   Header      — title + status badge
//   Divider
//   ItemRow[]   — label ("Returning" / "Replacement") + thumb + name + meta
//   Divider
//   CoreNote    — subtle note block
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export interface ExchangeItemRow {
  /** Small caption above the item, e.g. "Returning" or "Replacement". */
  label: string;
  /** Item name, e.g. "X-RAY TUBE, 40/80 KW". */
  name: string;
  /** Meta line, e.g. "$225.34 · Qty 1". */
  meta?: string;
  /** Optional thumbnail image URL. Falls back to a subtle placeholder. */
  imageUrl?: string;
}

export interface ExchangeDetailCardProps {
  /** Card heading. */
  title?: string;
  /** Status badge label. Omit to hide the badge. */
  status?: string;
  /** Paired items (returning + replacement). */
  items: ExchangeItemRow[];
  /** Optional note rendered in a subtle block at the bottom. */
  note?: string;
  className?: string;
}

const Divider: React.FC = () => (
  <div className="h-px w-full shrink-0 bg-[var(--ps-sem-border-subtle)]" />
);

const ItemRow: React.FC<ExchangeItemRow> = ({ label, name, meta, imageUrl }) => (
  <div className="flex w-full shrink-0 flex-col items-start gap-[var(--ps-sem-space-stack-xs)] overflow-clip">
    <p className="shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-semibold leading-normal text-[color:var(--ps-sem-fg-tertiary)]">
      {label}
    </p>
    <div className="flex w-full shrink-0 items-center gap-3 overflow-clip">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="size-12 shrink-0 rounded-[var(--ps-sem-radius-control)] object-cover"
        />
      ) : (
        <div className="size-12 shrink-0 rounded-[var(--ps-sem-radius-control)] bg-[var(--ps-sem-bg-subtle)]" />
      )}
      <div className="flex min-w-px flex-1 flex-col items-start gap-0.5 overflow-clip leading-normal">
        <p className="min-w-full text-[length:var(--ps-sem-text-body)] font-semibold text-[color:var(--ps-sem-fg-primary)]">
          {name}
        </p>
        {meta && (
          <p className="shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-normal text-[color:var(--ps-sem-fg-secondary)]">
            {meta}
          </p>
        )}
      </div>
    </div>
  </div>
);

const ExchangeDetailCard: React.FC<ExchangeDetailCardProps> = ({
  title = 'Exchange Details',
  status,
  items,
  note,
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
        <span className="flex shrink-0 items-center overflow-clip rounded-[var(--ps-sem-radius-pill)] bg-[var(--ps-sem-info-bg)] px-[var(--ps-sem-space-inset-md)] py-[var(--ps-sem-space-stack-xs)]">
          <span className="shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-semibold leading-normal text-[color:var(--ps-sem-info-fg)]">
            {status}
          </span>
        </span>
      )}
    </div>

    <Divider />

    {items.map((item, i) => (
      <ItemRow key={i} {...item} />
    ))}

    {note && (
      <>
        <Divider />
        <div className="flex w-full shrink-0 flex-col items-start overflow-clip rounded-[var(--ps-sem-radius-control)] bg-[var(--ps-sem-bg-subtle)] p-[var(--ps-sem-space-inset-md)]">
          <p className="w-full text-[length:var(--ps-sem-text-caption)] font-normal leading-normal text-[color:var(--ps-sem-fg-secondary)]">
            {note}
          </p>
        </div>
      </>
    )}
  </article>
);

export { ExchangeDetailCard };
export default ExchangeDetailCard;

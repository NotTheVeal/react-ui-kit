import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// AssetUptimeSummaryCard.tsx — PartsSource Design System
//
// 1:1 port of Figma "Asset Uptime Summary Card" (node 5466:54).
// Title · metric + trend · segmented status bar · legend.
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export interface UptimeSegment {
  /** Relative weight of the segment within the bar. */
  value: number;
  color: string;
}

export interface UptimeLegendItem {
  label: string;
  count: number;
  color: string;
}

export interface AssetUptimeSummaryCardProps {
  title?: string;
  /** e.g. "98.6%" */
  metric: string;
  /** e.g. "1.2%" */
  trendValue?: string;
  trendDirection?: 'up' | 'down';
  /**
   * Explicit status-bar segments. When omitted, the bar is derived from
   * `legend` so it always reflects the same counts shown below it — a card
   * headlined "98.6%" then renders a bar that is 98.6% operational.
   */
  segments?: UptimeSegment[];
  legend?: UptimeLegendItem[];
  className?: string;
}

const AssetUptimeSummaryCard: React.FC<AssetUptimeSummaryCardProps> = ({
  title = 'Fleet Uptime (30 days)',
  metric,
  trendValue,
  trendDirection = 'up',
  segments,
  legend = [
    { label: 'Operational', count: 142, color: 'var(--ps-sem-success-solid)' },
    { label: 'Down', count: 2, color: 'var(--ps-sem-danger-solid)' },
  ],
  className = '',
}) => {
  // Derive the bar from the legend when explicit segments aren't supplied, so
  // the bar can never tell a different story than the metric/legend.
  const bars: UptimeSegment[] =
    segments ?? legend.map((l) => ({ value: l.count, color: l.color }));
  const total = bars.reduce((s, seg) => s + seg.value, 0) || 1;
  const up = trendDirection === 'up';

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
      <h3 className="m-0 text-[length:var(--ps-sem-text-caption)] font-semibold uppercase tracking-wide text-[color:var(--ps-sem-fg-secondary)]">
        {title}
      </h3>

      <div className="flex items-baseline gap-2">
        <span className="text-[28px] font-bold leading-none text-[color:var(--ps-sem-fg-primary)]">
          {metric}
        </span>
        {trendValue ? (
          <span
            className={cx(
              'text-[length:var(--ps-sem-text-caption)] font-semibold',
              up
                ? 'text-[color:var(--ps-sem-success-fg)]'
                : 'text-[color:var(--ps-sem-danger-fg)]',
            )}
          >
            <span aria-hidden="true">{up ? '▲' : '▼'}</span> {trendValue}
          </span>
        ) : null}
      </div>

      <div
        className="flex h-[10px] w-full gap-1 overflow-clip rounded-[var(--ps-sem-radius-pill)]"
        role="img"
        aria-label={`Status distribution: ${legend
          .map((l) => `${l.label} ${l.count}`)
          .join(', ')}`}
      >
        {bars.map((seg, i) => (
          <span
            key={i}
            className="h-full rounded-[var(--ps-sem-radius-pill)]"
            style={{ width: `${(seg.value / total) * 100}%`, backgroundColor: seg.color }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {legend.map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: l.color }}
              aria-hidden="true"
            />
            <span className="text-[length:var(--ps-sem-text-caption)] text-[color:var(--ps-sem-fg-secondary)]">
              {l.label} · {l.count}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
};

export { AssetUptimeSummaryCard };
export default AssetUptimeSummaryCard;

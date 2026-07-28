import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// DataViz.tsx — PartsSource Design System
//
// Dependency-free, token-bound, inline-SVG chart primitives.
// No runtime charting dependency (no Recharts / D3) — the kit stays
// zero-dependency and every colour resolves to a --ps-* token.
//
// Sourced 1-for-1 from "Data Visualization (Standalone).html":
//   Series palette · BarChart · LineChart · AreaChart · PieChart ·
//   DonutChart · RadarChart · FunnelChart · WaffleChart · Sparkline · Legend
// ──────────────────────────────────────────────────────────────────

const cxV = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

/** Ordered categorical series palette (Blue scale → semantic). */
export const SERIES_COLORS: string[] = [
  'var(--ps-prim-blue-500)',
  'var(--ps-prim-blue-300)',
  'var(--ps-prim-blue-700)',
  'var(--ps-prim-blue-200)',
  'var(--ps-prim-blue-400)',
  'var(--ps-prim-blue-100)',
  'var(--ps-prim-blue-900)',
  'var(--ps-prim-blue-50)',
];

/** Semantic sentiment colours for trend/status series. */
export const SERIES_SEMANTIC = {
  positive: 'var(--ps-prim-green-600)',
  warning: 'var(--ps-prim-amber-700)',
  negative: 'var(--ps-prim-red-600)',
} as const;

const GRID = 'var(--ps-prim-gray-200)';
const AXIS_TEXT = 'var(--ps-prim-gray-600)';
const TITLE_TEXT = 'var(--ps-prim-gray-900)';
const FONT = "'Source_Sans_Pro','Source Sans 3',sans-serif";

const seriesColor = (i: number, override?: string) =>
  override ?? SERIES_COLORS[i % SERIES_COLORS.length];

// ══════════════════════════════════════════════════════════════════
// Shared chart frame (title, eyebrow, subtitle, legend slot)
// ══════════════════════════════════════════════════════════════════

interface FrameProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const ChartFrame: React.FC<FrameProps> = ({
  eyebrow,
  title,
  subtitle,
  className,
  children,
  footer,
}) => (
  <figure
    className={cxV(
      'm-0 rounded-[var(--ps-sem-radius-surface)] border border-[var(--ps-sem-border-subtle)]',
      'bg-[var(--ps-sem-bg-surface)] p-5',
      className,
    )}
    style={{ fontFamily: FONT }}
  >
    {eyebrow && (
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-[var(--ps-sem-fg-tertiary)]">
        {eyebrow}
      </div>
    )}
    {title && (
      <figcaption className="text-[16px] font-semibold text-[var(--ps-sem-fg-primary)]">
        {title}
      </figcaption>
    )}
    {subtitle && (
      <div className="mb-3 text-[13px] text-[var(--ps-sem-fg-secondary)]">{subtitle}</div>
    )}
    <div className={subtitle ? '' : 'mt-3'}>{children}</div>
    {footer && <div className="mt-3">{footer}</div>}
  </figure>
);

// ══════════════════════════════════════════════════════════════════
// Legend
// ══════════════════════════════════════════════════════════════════

export interface LegendItem {
  label: string;
  color: string;
  value?: string;
}

export interface LegendProps {
  items: LegendItem[];
  className?: string;
}

export const Legend: React.FC<LegendProps> = ({ items, className }) => (
  <ul
    className={cxV('flex flex-wrap gap-x-4 gap-y-1 p-0 m-0 list-none', className)}
    style={{ fontFamily: FONT }}
  >
    {items.map((it) => (
      <li key={it.label} className="flex items-center gap-1.5 text-[13px] text-[var(--ps-sem-fg-secondary)]">
        <span
          aria-hidden="true"
          className="inline-block h-2.5 w-2.5 rounded-[2px]"
          style={{ backgroundColor: it.color }}
        />
        <span>{it.label}</span>
        {it.value && <span className="font-semibold text-[var(--ps-sem-fg-primary)]">{it.value}</span>}
      </li>
    ))}
  </ul>
);

// ══════════════════════════════════════════════════════════════════
// Geometry helpers
// ══════════════════════════════════════════════════════════════════

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
};

const arcPath = (
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startDeg: number,
  endDeg: number,
) => {
  const so = polar(cx, cy, rOuter, endDeg);
  const eo = polar(cx, cy, rOuter, startDeg);
  const si = polar(cx, cy, rInner, startDeg);
  const ei = polar(cx, cy, rInner, endDeg);
  const large = endDeg - startDeg <= 180 ? 0 : 1;
  if (rInner <= 0) {
    return `M ${cx} ${cy} L ${eo.x} ${eo.y} A ${rOuter} ${rOuter} 0 ${large} 0 ${so.x} ${so.y} Z`;
  }
  return [
    `M ${so.x} ${so.y}`,
    `A ${rOuter} ${rOuter} 0 ${large} 0 ${eo.x} ${eo.y}`,
    `L ${si.x} ${si.y}`,
    `A ${rInner} ${rInner} 0 ${large} 1 ${ei.x} ${ei.y}`,
    'Z',
  ].join(' ');
};

const niceMax = (v: number) => {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / mag;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * mag;
};

// ══════════════════════════════════════════════════════════════════
// BarChart (single or grouped)
// ══════════════════════════════════════════════════════════════════

export interface BarSeries {
  name: string;
  color?: string;
  data: number[];
}

export interface BarChartProps {
  categories: string[];
  series: BarSeries[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  categories,
  series,
  eyebrow,
  title,
  subtitle,
  height = 240,
  width = 520,
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 44;
  const padR = 12;
  const padT = 12;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const max = niceMax(Math.max(1, ...series.flatMap((s) => s.data)));
  const groupW = plotW / categories.length;
  const barGap = 4;
  const barW = (groupW * 0.7 - barGap * (series.length - 1)) / series.length;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const y = (v: number) => padT + plotH - (v / max) * plotH;

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        series.length > 1 ? (
          <Legend items={series.map((s, i) => ({ label: s.name, color: seriesColor(i, s.color) }))} />
        ) : undefined
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Bar chart'}
        style={{ fontFamily: FONT }}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={width - padR} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize={11} fill={AXIS_TEXT}>
              {valueFormat(Math.round(t))}
            </text>
          </g>
        ))}
        {categories.map((cat, ci) => {
          const gx = padL + ci * groupW + groupW * 0.15;
          return (
            <g key={cat}>
              {series.map((s, si) => {
                const v = s.data[ci] ?? 0;
                const bx = gx + si * (barW + barGap);
                const bh = (v / max) * plotH;
                return (
                  <rect
                    key={s.name}
                    x={bx}
                    y={padT + plotH - bh}
                    width={Math.max(1, barW)}
                    height={bh}
                    rx={2}
                    style={{ fill: seriesColor(si, s.color) }}
                  >
                    <title>{`${cat} · ${s.name}: ${valueFormat(v)}`}</title>
                  </rect>
                );
              })}
              <text x={gx + (groupW * 0.7) / 2} y={height - 10} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
                {cat}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// LineChart / AreaChart
// ══════════════════════════════════════════════════════════════════

export interface LineSeries {
  name: string;
  color?: string;
  data: number[];
  dashed?: boolean;
}

export interface LineChartProps {
  categories: string[];
  series: LineSeries[];
  area?: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  categories,
  series,
  area = false,
  eyebrow,
  title,
  subtitle,
  height = 240,
  width = 520,
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 44;
  const padR = 12;
  const padT = 12;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const max = niceMax(Math.max(1, ...series.flatMap((s) => s.data)));
  const stepX = categories.length > 1 ? plotW / (categories.length - 1) : 0;
  const px = (i: number) => padL + i * stepX;
  const py = (v: number) => padT + plotH - (v / max) * plotH;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const toLine = (d: number[]) => d.map((v, i) => `${i === 0 ? 'M' : 'L'} ${px(i)} ${py(v)}`).join(' ');
  const toArea = (d: number[]) =>
    `${toLine(d)} L ${px(d.length - 1)} ${padT + plotH} L ${px(0)} ${padT + plotH} Z`;

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        series.length > 1 || series.some((s) => s.dashed) ? (
          <Legend items={series.map((s, i) => ({ label: s.name, color: seriesColor(i, s.color) }))} />
        ) : undefined
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? (area ? 'Area chart' : 'Line chart')}
        style={{ fontFamily: FONT }}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={width - padR} y1={py(t)} y2={py(t)} stroke={GRID} strokeWidth={1} />
            <text x={padL - 8} y={py(t) + 4} textAnchor="end" fontSize={11} fill={AXIS_TEXT}>
              {valueFormat(Math.round(t))}
            </text>
          </g>
        ))}
        {categories.map((cat, i) => (
          <text key={cat} x={px(i)} y={height - 10} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
            {cat}
          </text>
        ))}
        {series.map((s, si) => {
          const color = seriesColor(si, s.color);
          return (
            <g key={s.name}>
              {area && !s.dashed && (
                <path d={toArea(s.data)} style={{ fill: color }} fillOpacity={0.14} stroke="none" />
              )}
              <path
                d={toLine(s.data)}
                fill="none"
                style={{ stroke: color }}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeDasharray={s.dashed ? '5 4' : undefined}
              />
              {s.data.map((v, i) => (
                <circle key={i} cx={px(i)} cy={py(v)} r={2.5} style={{ fill: color }}>
                  <title>{`${s.name} · ${categories[i]}: ${valueFormat(v)}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

export type AreaChartProps = Omit<LineChartProps, 'area'>;
export const AreaChart: React.FC<AreaChartProps> = (props) => <LineChart {...props} area />;

// ══════════════════════════════════════════════════════════════════
// PieChart / DonutChart
// ══════════════════════════════════════════════════════════════════

export interface Slice {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: Slice[];
  donut?: boolean;
  /** Cutout ratio for donut (0–1). Spec default 0.62. */
  cutout?: number;
  centerLabel?: string;
  centerSub?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  size?: number;
  className?: string;
  'aria-label'?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  donut = false,
  cutout = 0.62,
  centerLabel,
  centerSub,
  eyebrow,
  title,
  subtitle,
  size = 200,
  className,
  'aria-label': ariaLabel,
}) => {
  const total = data.reduce((a, s) => a + s.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 2;
  const rInner = donut ? rOuter * cutout : 0;
  let acc = 0;
  const pct = (v: number) => Math.round((v / total) * 100);

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend
          items={data.map((s, i) => ({
            label: s.label,
            color: seriesColor(i, s.color),
            value: `${pct(s.value)}%`,
          }))}
        />
      }
    >
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="img"
          aria-label={ariaLabel ?? title ?? (donut ? 'Donut chart' : 'Pie chart')}
          style={{ fontFamily: FONT }}
        >
          {data.map((s, i) => {
            const start = (acc / total) * 360;
            acc += s.value;
            const end = (acc / total) * 360;
            return (
              <path key={s.label} d={arcPath(cx, cy, rOuter, rInner, start, end)} style={{ fill: seriesColor(i, s.color) }}>
                <title>{`${s.label}: ${pct(s.value)}%`}</title>
              </path>
            );
          })}
          {donut && centerLabel && (
            <text x={cx} y={cy - 2} textAnchor="middle" fontSize={26} fontWeight={700} fill={TITLE_TEXT}>
              {centerLabel}
            </text>
          )}
          {donut && centerSub && (
            <text x={cx} y={cy + 16} textAnchor="middle" fontSize={12} fill={AXIS_TEXT}>
              {centerSub}
            </text>
          )}
        </svg>
      </div>
    </ChartFrame>
  );
};

export type DonutChartProps = Omit<PieChartProps, 'donut'>;
export const DonutChart: React.FC<DonutChartProps> = (props) => <PieChart {...props} donut />;

// ══════════════════════════════════════════════════════════════════
// RadarChart
// ══════════════════════════════════════════════════════════════════

export interface RadarSeries {
  name: string;
  color?: string;
  data: number[];
}

export interface RadarChartProps {
  axes: string[];
  series: RadarSeries[];
  /** Max value per axis (0–max). Default 100. */
  max?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  size?: number;
  className?: string;
  'aria-label'?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  axes,
  series,
  max = 100,
  eyebrow,
  title,
  subtitle,
  size = 240,
  className,
  'aria-label': ariaLabel,
}) => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 28;
  const rings = [0.25, 0.5, 0.75, 1];
  const angle = (i: number) => (360 / axes.length) * i;
  const point = (i: number, v: number) => polar(cx, cy, (v / max) * r, angle(i));
  const polygon = (d: number[]) => d.map((v, i) => { const p = point(i, v); return `${p.x},${p.y}`; }).join(' ');

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={<Legend items={series.map((s, i) => ({ label: s.name, color: seriesColor(i, s.color) }))} />}
    >
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="img"
          aria-label={ariaLabel ?? title ?? 'Radar chart'}
          style={{ fontFamily: FONT }}
        >
          {rings.map((ring) => (
            <polygon
              key={ring}
              points={axes.map((_, i) => { const p = polar(cx, cy, ring * r, angle(i)); return `${p.x},${p.y}`; }).join(' ')}
              fill="none"
              stroke={GRID}
              strokeWidth={1}
            />
          ))}
          {axes.map((ax, i) => {
            const outer = polar(cx, cy, r, angle(i));
            const lbl = polar(cx, cy, r + 14, angle(i));
            return (
              <g key={ax}>
                <line x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke={GRID} strokeWidth={1} />
                <text x={lbl.x} y={lbl.y + 3} textAnchor="middle" fontSize={10} fill={AXIS_TEXT}>
                  {ax}
                </text>
              </g>
            );
          })}
          {series.map((s, si) => {
            const color = seriesColor(si, s.color);
            return (
              <g key={s.name}>
                <polygon points={polygon(s.data)} style={{ fill: color, stroke: color }} fillOpacity={0.15} strokeWidth={2} />
                {s.data.map((v, i) => { const p = point(i, v); return <circle key={i} cx={p.x} cy={p.y} r={2.5} style={{ fill: color }} />; })}
              </g>
            );
          })}
        </svg>
      </div>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// FunnelChart
// ══════════════════════════════════════════════════════════════════

export interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartProps {
  stages: FunnelStage[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({
  stages,
  eyebrow,
  title,
  subtitle,
  height = 240,
  width = 420,
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const max = Math.max(1, ...stages.map((s) => s.value));
  const rowH = height / stages.length;
  const w = (v: number) => (v / max) * (width - 8);

  return (
    <ChartFrame eyebrow={eyebrow} title={title} subtitle={subtitle} className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Funnel chart'}
        style={{ fontFamily: FONT }}
      >
        {stages.map((s, i) => {
          const topW = w(s.value);
          const botW = w(stages[i + 1]?.value ?? s.value);
          const yT = i * rowH;
          const yB = yT + rowH - 4;
          const cxc = width / 2;
          const pts = [
            `${cxc - topW / 2},${yT}`,
            `${cxc + topW / 2},${yT}`,
            `${cxc + botW / 2},${yB}`,
            `${cxc - botW / 2},${yB}`,
          ].join(' ');
          return (
            <g key={s.label}>
              <polygon points={pts} style={{ fill: seriesColor(i, s.color) }}>
                <title>{`${s.label}: ${valueFormat(s.value)}`}</title>
              </polygon>
              <text x={cxc} y={yT + rowH / 2} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--ps-sem-fg-inverse)">
                {`${s.label} · ${valueFormat(s.value)}`}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// WaffleChart (10×10)
// ══════════════════════════════════════════════════════════════════

export interface WaffleChartProps {
  data: Slice[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  size?: number;
  className?: string;
  'aria-label'?: string;
}

export const WaffleChart: React.FC<WaffleChartProps> = ({
  data,
  eyebrow,
  title,
  subtitle,
  size = 200,
  className,
  'aria-label': ariaLabel,
}) => {
  const total = data.reduce((a, s) => a + s.value, 0) || 1;
  const cells: string[] = [];
  data.forEach((s, i) => {
    const n = Math.round((s.value / total) * 100);
    for (let k = 0; k < n && cells.length < 100; k++) cells.push(seriesColor(i, s.color));
  });
  while (cells.length < 100) cells.push('var(--ps-prim-gray-150)');
  const gap = 3;
  const cell = (size - gap * 9) / 10;
  const pct = (v: number) => Math.round((v / total) * 100);

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend items={data.map((s, i) => ({ label: s.label, color: seriesColor(i, s.color), value: `${pct(s.value)}%` }))} />
      }
    >
      <div className="flex justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          role="img"
          aria-label={ariaLabel ?? title ?? 'Waffle chart'}
        >
          {cells.map((c, i) => {
            const row = Math.floor(i / 10);
            const col = i % 10;
            return (
              <rect
                key={i}
                x={col * (cell + gap)}
                y={(9 - row) * (cell + gap)}
                width={cell}
                height={cell}
                rx={2}
                style={{ fill: c }}
              />
            );
          })}
        </svg>
      </div>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// Sparkline (compact inline trend)
// ══════════════════════════════════════════════════════════════════

export interface SparklineProps {
  data: number[];
  color?: string;
  area?: boolean;
  width?: number;
  height?: number;
  className?: string;
  'aria-label'?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = 'var(--ps-prim-blue-500)',
  area = true,
  width = 120,
  height = 32,
  className,
  'aria-label': ariaLabel,
}) => {
  const max = Math.max(1, ...data);
  const min = Math.min(0, ...data);
  const span = max - min || 1;
  const stepX = data.length > 1 ? width / (data.length - 1) : 0;
  const px = (i: number) => i * stepX;
  const py = (v: number) => height - 2 - ((v - min) / span) * (height - 4);
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${px(i)} ${py(v)}`).join(' ');
  const fill = `${line} L ${px(data.length - 1)} ${height} L 0 ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel ?? 'Trend sparkline'}
      className={className}
      preserveAspectRatio="none"
    >
      {area && <path d={fill} style={{ fill: color }} fillOpacity={0.14} stroke="none" />}
      <path d={line} fill="none" style={{ stroke: color }} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

// ══════════════════════════════════════════════════════════════════
// BulletChart (KPI vs qualitative ranges + target marker)
// ══════════════════════════════════════════════════════════════════

/** Poor → Average → Good qualitative band palette (bad = darker grey). */
export const BULLET_RANGE_COLORS: string[] = [
  'var(--ps-prim-gray-200)',
  'var(--ps-prim-gray-150)',
  'var(--ps-prim-blue-100)',
];

export interface BulletRow {
  /** Row label, e.g. "Revenue". */
  label: string;
  /** The measured value (the featured measure bar). */
  measure: number;
  /** Comparative target (rendered as a vertical marker). */
  target: number;
  /** Ascending qualitative thresholds, e.g. [50, 75, 100] → Poor/Average/Good. */
  ranges: number[];
  /** Scale maximum. Defaults to the largest of ranges/measure/target. */
  max?: number;
}

export interface BulletChartProps {
  rows: BulletRow[];
  /** Legend labels for the qualitative bands. */
  rangeLabels?: string[];
  /** Band colours, poor → good. */
  rangeColors?: string[];
  measureColor?: string;
  targetColor?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const BulletChart: React.FC<BulletChartProps> = ({
  rows,
  rangeLabels = ['Poor range', 'Average range', 'Good range'],
  rangeColors = BULLET_RANGE_COLORS,
  measureColor = 'var(--ps-prim-blue-500)',
  targetColor = 'var(--ps-prim-blue-900)',
  eyebrow,
  title,
  subtitle,
  height = 220,
  width = 520,
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const padT = 10;
  const padB = 10;
  const padR = 12;
  const labelW = 68;
  const plotX0 = labelW;
  const plotX1 = width - padR;
  const plotW = plotX1 - plotX0;
  const rowH = (height - padT - padB) / Math.max(1, rows.length);
  const bandPad = rowH * 0.16;
  const bandColor = (i: number) => rangeColors[i % rangeColors.length];

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend
          items={[
            ...rangeLabels.map((label, i) => ({ label, color: bandColor(i) })),
            { label: 'Measure', color: measureColor },
            { label: 'Target marker', color: targetColor },
          ]}
        />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Bullet chart'}
        style={{ fontFamily: FONT }}
      >
        {rows.map((row, ri) => {
          const scaleMax = Math.max(
            1,
            row.max ?? Math.max(row.measure, row.target, ...row.ranges),
          );
          const xOf = (v: number) => plotX0 + (v / scaleMax) * plotW;
          const yTop = padT + ri * rowH + bandPad;
          const bandH = rowH - bandPad * 2;
          const measureH = bandH * 0.42;
          const measureY = yTop + (bandH - measureH) / 2;
          const tx = xOf(row.target);

          return (
            <g key={row.label}>
              {row.ranges.map((r, bi) => {
                const prev = bi === 0 ? 0 : row.ranges[bi - 1];
                const bx = xOf(prev);
                const bw = xOf(r) - bx;
                return (
                  <rect
                    key={bi}
                    x={bx}
                    y={yTop}
                    width={Math.max(0, bw)}
                    height={bandH}
                    style={{ fill: bandColor(bi) }}
                  >
                    <title>{`${row.label} · ${rangeLabels[bi] ?? `Range ${bi + 1}`}: ${valueFormat(prev)}–${valueFormat(r)}`}</title>
                  </rect>
                );
              })}
              <rect
                x={plotX0}
                y={measureY}
                width={Math.max(0, xOf(row.measure) - plotX0)}
                height={measureH}
                rx={1}
                style={{ fill: measureColor }}
              >
                <title>{`${row.label} · Measure: ${valueFormat(row.measure)}`}</title>
              </rect>
              <line
                x1={tx}
                x2={tx}
                y1={yTop - 2}
                y2={yTop + bandH + 2}
                strokeWidth={2}
                style={{ stroke: targetColor }}
              >
                <title>{`${row.label} · Target: ${valueFormat(row.target)}`}</title>
              </line>
              <text
                x={labelW - 8}
                y={yTop + bandH / 2 + 4}
                textAnchor="end"
                fontSize={11}
                fill={AXIS_TEXT}
              >
                {row.label}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// Shared additions for the extended chart set
// ══════════════════════════════════════════════════════════════════

/** White/foreground colour for text drawn over dark fills. */
const ON_DARK = 'var(--ps-sem-fg-inverse)';

/** Sequential Blue ramp for heat/density encodings (light → dark). */
export const HEATMAP_SCALE: string[] = [
  'var(--ps-prim-blue-50)',
  'var(--ps-prim-blue-100)',
  'var(--ps-prim-blue-200)',
  'var(--ps-prim-blue-400)',
  'var(--ps-prim-blue-500)',
  'var(--ps-prim-blue-900)',
];

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Catmull-Rom → cubic-Bézier segment string (no leading move command). */
const smoothSegs = (pts: Array<[number, number]>) => {
  let d = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${r1(c1x)} ${r1(c1y)} ${r1(c2x)} ${r1(c2y)} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return d;
};

const smoothLine = (pts: Array<[number, number]>) =>
  pts.length ? `M ${r1(pts[0][0])} ${r1(pts[0][1])}${smoothSegs(pts)}` : '';

// ══════════════════════════════════════════════════════════════════
// ScatterPlot
// ══════════════════════════════════════════════════════════════════

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
}

export interface ScatterSeries {
  name: string;
  color?: string;
  data: ScatterPoint[];
}

export interface ScatterPlotProps {
  series: ScatterSeries[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  xFormat?: (n: number) => string;
  yFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  series,
  eyebrow,
  title,
  subtitle,
  height = 260,
  width = 520,
  xFormat = (n) => `${n}`,
  yFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 44;
  const padR = 12;
  const padT = 12;
  const padB = 32;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const all = series.flatMap((s) => s.data);
  const xMax = niceMax(Math.max(1, ...all.map((p) => p.x)));
  const yMax = niceMax(Math.max(1, ...all.map((p) => p.y)));
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * xMax);
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * yMax);
  const px = (v: number) => padL + (v / xMax) * plotW;
  const py = (v: number) => padT + plotH - (v / yMax) * plotH;

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        series.length > 1 ? (
          <Legend items={series.map((s, i) => ({ label: s.name, color: seriesColor(i, s.color) }))} />
        ) : undefined
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Scatter plot'}
        style={{ fontFamily: FONT }}
      >
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line x1={padL} x2={width - padR} y1={py(t)} y2={py(t)} stroke={GRID} strokeWidth={1} />
            <text x={padL - 8} y={py(t) + 4} textAnchor="end" fontSize={11} fill={AXIS_TEXT}>
              {yFormat(Math.round(t))}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={`x${t}`} x={px(t)} y={height - 10} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
            {xFormat(Math.round(t))}
          </text>
        ))}
        {series.map((s, si) =>
          s.data.map((p, pi) => (
            <circle
              key={`${si}-${pi}`}
              cx={px(p.x)}
              cy={py(p.y)}
              r={5}
              style={{ fill: seriesColor(si, s.color) }}
              fillOpacity={0.85}
            >
              <title>{`${p.label ?? s.name} · ${xFormat(p.x)}, ${yFormat(p.y)}`}</title>
            </circle>
          )),
        )}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// BubbleChart
// ══════════════════════════════════════════════════════════════════

export interface BubblePoint {
  x: number;
  y: number;
  r: number;
  label?: string;
}

export interface BubbleSeries {
  name: string;
  color?: string;
  data: BubblePoint[];
}

export interface BubbleChartProps {
  series: BubbleSeries[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  maxRadius?: number;
  xFormat?: (n: number) => string;
  yFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const BubbleChart: React.FC<BubbleChartProps> = ({
  series,
  eyebrow,
  title,
  subtitle,
  height = 260,
  width = 520,
  maxRadius = 30,
  xFormat = (n) => `${n}`,
  yFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 44;
  const padR = 12;
  const padT = 16;
  const padB = 32;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const all = series.flatMap((s) => s.data);
  const xMax = niceMax(Math.max(1, ...all.map((p) => p.x)));
  const yMax = niceMax(Math.max(1, ...all.map((p) => p.y)));
  const rMax = Math.max(1, ...all.map((p) => p.r));
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * yMax);
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * xMax);
  const px = (v: number) => padL + (v / xMax) * plotW;
  const py = (v: number) => padT + plotH - (v / yMax) * plotH;
  const pr = (v: number) => Math.max(3, Math.sqrt(v / rMax) * maxRadius);

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        series.length > 1 ? (
          <Legend items={series.map((s, i) => ({ label: s.name, color: seriesColor(i, s.color) }))} />
        ) : undefined
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Bubble chart'}
        style={{ fontFamily: FONT }}
      >
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line x1={padL} x2={width - padR} y1={py(t)} y2={py(t)} stroke={GRID} strokeWidth={1} />
            <text x={padL - 8} y={py(t) + 4} textAnchor="end" fontSize={11} fill={AXIS_TEXT}>
              {yFormat(Math.round(t))}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={`x${t}`} x={px(t)} y={height - 10} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
            {xFormat(Math.round(t))}
          </text>
        ))}
        {series.map((s, si) =>
          s.data.map((p, pi) => (
            <circle
              key={`${si}-${pi}`}
              cx={px(p.x)}
              cy={py(p.y)}
              r={pr(p.r)}
              style={{ fill: seriesColor(si, s.color) }}
              fillOpacity={0.6}
              stroke={seriesColor(si, s.color)}
              strokeOpacity={0.9}
            >
              <title>{`${p.label ?? s.name} · ${xFormat(p.x)}, ${yFormat(p.y)} (${p.r})`}</title>
            </circle>
          )),
        )}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// HeatMap
// ══════════════════════════════════════════════════════════════════

export interface HeatMapProps {
  xLabels: string[];
  yLabels: string[];
  /** Row-major matrix: values[rowIndex (yLabels)][colIndex (xLabels)]. */
  values: number[][];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  scale?: string[];
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const HeatMap: React.FC<HeatMapProps> = ({
  xLabels,
  yLabels,
  values,
  eyebrow,
  title,
  subtitle,
  height = 260,
  width = 520,
  scale = HEATMAP_SCALE,
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const labelW = 60;
  const topH = 22;
  const gap = 2;
  const cols = xLabels.length;
  const rows = yLabels.length;
  const cellW = (width - labelW) / cols;
  const cellH = (height - topH) / rows;
  const maxV = Math.max(1, ...values.flat());
  const bucket = (v: number) => Math.min(scale.length - 1, Math.floor((v / maxV) * scale.length));

  return (
    <ChartFrame eyebrow={eyebrow} title={title} subtitle={subtitle} className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Heat map'}
        style={{ fontFamily: FONT }}
      >
        {xLabels.map((lbl, ci) => (
          <text
            key={lbl}
            x={labelW + ci * cellW + cellW / 2}
            y={topH - 8}
            textAnchor="middle"
            fontSize={11}
            fill={AXIS_TEXT}
          >
            {lbl}
          </text>
        ))}
        {yLabels.map((lbl, ri) => (
          <text
            key={lbl}
            x={labelW - 8}
            y={topH + ri * cellH + cellH / 2 + 4}
            textAnchor="end"
            fontSize={11}
            fill={AXIS_TEXT}
          >
            {lbl}
          </text>
        ))}
        {yLabels.map((ylbl, ri) =>
          xLabels.map((xlbl, ci) => {
            const v = values[ri]?.[ci] ?? 0;
            const idx = bucket(v);
            const onDark = idx >= scale.length - 3;
            return (
              <g key={`${ri}-${ci}`}>
                <rect
                  x={labelW + ci * cellW + gap / 2}
                  y={topH + ri * cellH + gap / 2}
                  width={Math.max(0, cellW - gap)}
                  height={Math.max(0, cellH - gap)}
                  rx={2}
                  style={{ fill: scale[idx] }}
                >
                  <title>{`${ylbl} · ${xlbl}: ${valueFormat(v)}`}</title>
                </rect>
                {cellW >= 28 && cellH >= 18 && (
                  <text
                    x={labelW + ci * cellW + cellW / 2}
                    y={topH + ri * cellH + cellH / 2 + 4}
                    textAnchor="middle"
                    fontSize={10}
                    fill={onDark ? ON_DARK : TITLE_TEXT}
                  >
                    {valueFormat(v)}
                  </text>
                )}
              </g>
            );
          }),
        )}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// TreeMap (squarified)
// ══════════════════════════════════════════════════════════════════

export interface TreeMapNode {
  name: string;
  value: number;
  /** Depth index → colour band. */
  d?: number;
}

export interface TreeMapProps {
  data: TreeMapNode[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  depthColors?: string[];
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

interface TreeCell {
  node: TreeMapNode;
  x: number;
  y: number;
  w: number;
  h: number;
}

const worstRatio = (areas: number[], length: number) => {
  const sum = areas.reduce((a, b) => a + b, 0);
  const max = Math.max(...areas);
  const min = Math.min(...areas);
  const s2 = sum * sum;
  const l2 = length * length;
  return Math.max((l2 * max) / s2, s2 / (l2 * min));
};

const squarify = (
  scaled: Array<{ node: TreeMapNode; area: number }>,
  x0: number,
  y0: number,
  w0: number,
  h0: number,
): TreeCell[] => {
  const cells: TreeCell[] = [];
  let x = x0;
  let y = y0;
  let w = w0;
  let h = h0;
  let items = scaled.slice().sort((a, b) => b.area - a.area);
  let row: Array<{ node: TreeMapNode; area: number }> = [];

  const layoutRow = () => {
    const rowArea = row.reduce((a, b) => a + b.area, 0);
    if (rowArea <= 0) return;
    if (w >= h) {
      const stripW = rowArea / h;
      let cy = y;
      for (const it of row) {
        const cellH = it.area / stripW;
        cells.push({ node: it.node, x, y: cy, w: stripW, h: cellH });
        cy += cellH;
      }
      x += stripW;
      w -= stripW;
    } else {
      const stripH = rowArea / w;
      let cx = x;
      for (const it of row) {
        const cellW = it.area / stripH;
        cells.push({ node: it.node, x: cx, y, w: cellW, h: stripH });
        cx += cellW;
      }
      y += stripH;
      h -= stripH;
    }
  };

  while (items.length) {
    const next = items[0];
    const len = Math.min(w, h);
    const cur = row.map((r) => r.area);
    const withNext = [...cur, next.area];
    if (row.length === 0 || worstRatio(withNext, len) <= worstRatio(cur, len)) {
      row.push(next);
      items = items.slice(1);
    } else {
      layoutRow();
      row = [];
    }
  }
  if (row.length) layoutRow();
  return cells;
};

export const TreeMap: React.FC<TreeMapProps> = ({
  data,
  eyebrow,
  title,
  subtitle,
  height = 280,
  width = 520,
  depthColors = [
    'var(--ps-prim-blue-500)',
    'var(--ps-prim-blue-400)',
    'var(--ps-prim-blue-300)',
    'var(--ps-prim-blue-200)',
    'var(--ps-prim-blue-50)',
  ],
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const total = Math.max(1, data.reduce((s, n) => s + n.value, 0));
  const area = width * height;
  const scaled = data.map((n) => ({ node: n, area: (n.value / total) * area }));
  const cells = squarify(scaled, 0, 0, width, height);
  const gap = 2;

  return (
    <ChartFrame eyebrow={eyebrow} title={title} subtitle={subtitle} className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Tree map'}
        style={{ fontFamily: FONT }}
      >
        {cells.map((c, i) => {
          const depth = c.node.d ?? 0;
          const fill = depthColors[depth % depthColors.length];
          const onDark = depth <= 2;
          const showLabel = c.w >= 54 && c.h >= 30;
          return (
            <g key={`${c.node.name}-${i}`}>
              <rect
                x={c.x + gap / 2}
                y={c.y + gap / 2}
                width={Math.max(0, c.w - gap)}
                height={Math.max(0, c.h - gap)}
                rx={2}
                style={{ fill }}
              >
                <title>{`${c.node.name}: ${valueFormat(c.node.value)}`}</title>
              </rect>
              {showLabel && (
                <>
                  <text
                    x={c.x + 8}
                    y={c.y + 18}
                    fontSize={12}
                    fontWeight={600}
                    fill={onDark ? ON_DARK : TITLE_TEXT}
                  >
                    {c.node.name}
                  </text>
                  <text
                    x={c.x + 8}
                    y={c.y + 34}
                    fontSize={11}
                    fill={onDark ? ON_DARK : AXIS_TEXT}
                    opacity={0.9}
                  >
                    {valueFormat(c.node.value)}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// BumpChart (rank-over-time)
// ══════════════════════════════════════════════════════════════════

export interface BumpSeries {
  name: string;
  color?: string;
  /** Rank at each period (1 = best/top). */
  ranks: number[];
}

export interface BumpChartProps {
  periods: string[];
  series: BumpSeries[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  className?: string;
  'aria-label'?: string;
}

export const BumpChart: React.FC<BumpChartProps> = ({
  periods,
  series,
  eyebrow,
  title,
  subtitle,
  height = 260,
  width = 520,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 44;
  const padR = 44;
  const padT = 16;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const maxRank = Math.max(1, ...series.flatMap((s) => s.ranks));
  const px = (i: number) => padL + (periods.length <= 1 ? 0 : (i / (periods.length - 1)) * plotW);
  const py = (rank: number) => padT + (maxRank <= 1 ? 0 : ((rank - 1) / (maxRank - 1)) * plotH);

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend items={series.map((s, i) => ({ label: s.name, color: seriesColor(i, s.color) }))} />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Bump chart'}
        style={{ fontFamily: FONT }}
      >
        {periods.map((p, i) => (
          <text key={p} x={px(i)} y={height - 10} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
            {p}
          </text>
        ))}
        {series.map((s, si) => {
          const color = seriesColor(si, s.color);
          const pts: Array<[number, number]> = s.ranks.map((rank, i) => [px(i), py(rank)]);
          return (
            <g key={s.name}>
              <path d={smoothLine(pts)} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
              {pts.map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r={9} style={{ fill: color }}>
                    <title>{`${s.name} · ${periods[i]}: #${s.ranks[i]}`}</title>
                  </circle>
                  <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize={10} fontWeight={600} fill={ON_DARK}>
                    {s.ranks[i]}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// StreamChart (centred stacked area / streamgraph)
// ══════════════════════════════════════════════════════════════════

export interface StreamSeries {
  name: string;
  color?: string;
  data: number[];
}

export interface StreamChartProps {
  categories: string[];
  series: StreamSeries[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  className?: string;
  'aria-label'?: string;
}

export const StreamChart: React.FC<StreamChartProps> = ({
  categories,
  series,
  eyebrow,
  title,
  subtitle,
  height = 260,
  width = 520,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 12;
  const padR = 12;
  const padT = 12;
  const padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const n = categories.length;
  const totals = categories.map((_, ci) => series.reduce((s, ser) => s + (ser.data[ci] ?? 0), 0));
  const maxTotal = Math.max(1, ...totals);
  const midY = padT + plotH / 2;
  const px = (i: number) => padL + (n <= 1 ? 0 : (i / (n - 1)) * plotW);
  const scaleY = (plotH * 0.92) / maxTotal;

  // Running baseline per category, offset so each stack is vertically centred.
  const baselines = categories.map((_, ci) => -totals[ci] / 2);

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend items={series.map((s, i) => ({ label: s.name, color: seriesColor(i, s.color) }))} />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Stream chart'}
        style={{ fontFamily: FONT }}
      >
        {(() => {
          const running = baselines.slice();
          return series.map((s, si) => {
            const bottom: Array<[number, number]> = [];
            const top: Array<[number, number]> = [];
            categories.forEach((_, ci) => {
              const v = s.data[ci] ?? 0;
              const b = running[ci];
              const t = b + v;
              bottom.push([px(ci), midY + b * scaleY]);
              top.push([px(ci), midY + t * scaleY]);
              running[ci] = t;
            });
            const revBottom = bottom.slice().reverse();
            const d =
              `M ${r1(top[0][0])} ${r1(top[0][1])}` +
              smoothSegs(top) +
              ` L ${r1(revBottom[0][0])} ${r1(revBottom[0][1])}` +
              smoothSegs(revBottom) +
              ' Z';
            return (
              <path key={s.name} d={d} style={{ fill: seriesColor(si, s.color) }} fillOpacity={0.92}>
                <title>{s.name}</title>
              </path>
            );
          });
        })()}
        {categories.map((c, i) => (
          <text key={c} x={px(i)} y={height - 10} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
            {c}
          </text>
        ))}
      </svg>
    </ChartFrame>
  );
};

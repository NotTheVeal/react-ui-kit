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

// ══════════════════════════════════════════════════════════════════
// BoxPlot (statistical distribution: whiskers · IQR box · median · outliers)
// ══════════════════════════════════════════════════════════════════

export interface BoxPlotDatum {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
}

export interface BoxPlotProps {
  categories: string[];
  data: BoxPlotDatum[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  /** IQR box fill. */
  boxColor?: string;
  /** IQR box border. */
  boxStroke?: string;
  /** Whisker + cap colour. */
  whiskerColor?: string;
  /** Median rule colour. */
  medianColor?: string;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const BoxPlot: React.FC<BoxPlotProps> = ({
  categories,
  data,
  eyebrow,
  title,
  subtitle,
  height = 260,
  width = 520,
  boxColor = 'var(--ps-prim-blue-100)',
  boxStroke = 'var(--ps-prim-blue-300)',
  whiskerColor = 'var(--ps-prim-blue-500)',
  medianColor = 'var(--ps-prim-blue-900)',
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

  const vals = data.flatMap((d) => [d.min, d.max, ...(d.outliers ?? [])]);
  const rawMax = Math.max(1, ...vals);
  const rawMin = Math.min(0, ...vals);
  const range = rawMax - rawMin || 1;
  const lo = rawMin - range * 0.08;
  const hi = rawMax + range * 0.08;
  const y = (v: number) => padT + plotH - ((v - lo) / (hi - lo)) * plotH;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => lo + t * (hi - lo));
  const slotW = plotW / categories.length;
  const boxW = Math.min(48, slotW * 0.5);

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend
          items={[
            { label: 'Median', color: medianColor },
            { label: 'IQR (Q1–Q3)', color: boxColor },
            { label: 'Whiskers (min/max)', color: whiskerColor },
          ]}
        />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Box plot'}
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
          const d = data[ci];
          if (!d) return null;
          const cx = padL + ci * slotW + slotW / 2;
          const bx = cx - boxW / 2;
          const capW = boxW / 4;
          return (
            <g key={cat}>
              <line x1={cx} x2={cx} y1={y(d.max)} y2={y(d.min)} stroke={whiskerColor} strokeWidth={1.5} />
              <line x1={cx - capW} x2={cx + capW} y1={y(d.max)} y2={y(d.max)} stroke={whiskerColor} strokeWidth={1.5} />
              <line x1={cx - capW} x2={cx + capW} y1={y(d.min)} y2={y(d.min)} stroke={whiskerColor} strokeWidth={1.5} />
              <rect
                x={bx}
                y={y(d.q3)}
                width={boxW}
                height={Math.max(1, y(d.q1) - y(d.q3))}
                rx={2}
                strokeWidth={1}
                style={{ fill: boxColor, stroke: boxStroke }}
              >
                <title>
                  {`${cat}: min ${valueFormat(d.min)} · Q1 ${valueFormat(d.q1)} · median ${valueFormat(
                    d.median,
                  )} · Q3 ${valueFormat(d.q3)} · max ${valueFormat(d.max)}`}
                </title>
              </rect>
              <line x1={bx} x2={bx + boxW} y1={y(d.median)} y2={y(d.median)} stroke={medianColor} strokeWidth={2} />
              {(d.outliers ?? []).map((o, oi) => (
                <circle key={oi} cx={cx} cy={y(o)} r={2.5} style={{ fill: whiskerColor }}>
                  <title>{`${cat} outlier: ${valueFormat(o)}`}</title>
                </circle>
              ))}
              <text x={cx} y={height - 10} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
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
// Advanced chart helpers (bucketing + magnitude ramp)
// ══════════════════════════════════════════════════════════════════

/** Sequential magnitude ramp, light (index 0) → dark (index n-1). */
const MAGNITUDE_SCALE: string[] = [
  'var(--ps-prim-blue-50)',
  'var(--ps-prim-blue-200)',
  'var(--ps-prim-blue-400)',
  'var(--ps-prim-blue-700)',
  'var(--ps-prim-blue-900)',
];

/** Three-step activity ramp for calendar / swarm tiers. */
const TIER_SCALE: string[] = [
  'var(--ps-prim-blue-200)',
  'var(--ps-prim-blue-400)',
  'var(--ps-prim-blue-700)',
];

const bucketIndex = (v: number, min: number, max: number, n: number) => {
  if (max <= min) return n - 1;
  const t = (v - min) / (max - min);
  return Math.min(n - 1, Math.max(0, Math.floor(t * n)));
};

// ══════════════════════════════════════════════════════════════════
// SankeyChart — source → flow band → target
// ══════════════════════════════════════════════════════════════════

export interface SankeyNode {
  id: string;
  label: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface SankeyChartProps {
  sources: SankeyNode[];
  targets: SankeyNode[];
  links: SankeyLink[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  sourceColor?: string;
  targetColor?: string;
  flowColor?: string;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const SankeyChart: React.FC<SankeyChartProps> = ({
  sources,
  targets,
  links,
  eyebrow,
  title,
  subtitle,
  height = 300,
  width = 520,
  sourceColor = 'var(--ps-prim-blue-500)',
  targetColor = 'var(--ps-prim-blue-700)',
  flowColor = 'var(--ps-prim-gray-300)',
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const padT = 16;
  const padB = 16;
  const nodeW = 14;
  const plotH = height - padT - padB;
  const leftX = 8;
  const rightX = width - 8 - nodeW;

  const sum = (id: string, key: 'source' | 'target') =>
    links.filter((l) => l[key] === id).reduce((a, l) => a + l.value, 0);

  const srcTotals = sources.map((n) => sum(n.id, 'source'));
  const tgtTotals = targets.map((n) => sum(n.id, 'target'));
  const gap = 12;
  const colMax = Math.max(
    srcTotals.reduce((a, b) => a + b, 0),
    tgtTotals.reduce((a, b) => a + b, 0),
    1,
  );
  const scale = (plotH - gap * (Math.max(sources.length, targets.length) - 1)) / colMax;

  const layout = (nodes: SankeyNode[], totals: number[]) => {
    let cursor = padT;
    return nodes.map((n, i) => {
      const h = Math.max(2, totals[i] * scale);
      const y = cursor;
      cursor += h + gap;
      return { id: n.id, label: n.label, y, h };
    });
  };
  const srcNodes = layout(sources, srcTotals);
  const tgtNodes = layout(targets, tgtTotals);

  const srcOffset: Record<string, number> = {};
  const tgtOffset: Record<string, number> = {};
  srcNodes.forEach((n) => (srcOffset[n.id] = n.y));
  tgtNodes.forEach((n) => (tgtOffset[n.id] = n.y));

  const bands = links.map((l, i) => {
    const s = srcNodes.find((n) => n.id === l.source);
    const t = tgtNodes.find((n) => n.id === l.target);
    if (!s || !t) return null;
    const th = Math.max(1, l.value * scale);
    const y0 = srcOffset[l.source];
    const y1 = tgtOffset[l.target];
    srcOffset[l.source] += th;
    tgtOffset[l.target] += th;
    const x0 = leftX + nodeW;
    const x1 = rightX;
    const xm = (x0 + x1) / 2;
    const d = [
      `M ${x0} ${y0}`,
      `C ${xm} ${y0}, ${xm} ${y1}, ${x1} ${y1}`,
      `L ${x1} ${y1 + th}`,
      `C ${xm} ${y1 + th}, ${xm} ${y0 + th}, ${x0} ${y0 + th}`,
      'Z',
    ].join(' ');
    return { key: `${l.source}-${l.target}-${i}`, d, label: `${s.label} → ${t.label}`, value: l.value };
  });

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend
          items={[
            { label: 'Source nodes', color: sourceColor },
            { label: 'Target nodes', color: targetColor },
            { label: 'Flow bands', color: flowColor },
          ]}
        />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Sankey diagram'}
        style={{ fontFamily: FONT }}
      >
        {bands.map((b) =>
          b ? (
            <path key={b.key} d={b.d} fill={flowColor} fillOpacity={0.55}>
              <title>{`${b.label}: ${valueFormat(b.value)}`}</title>
            </path>
          ) : null,
        )}
        {srcNodes.map((n) => (
          <g key={n.id}>
            <rect x={leftX} y={n.y} width={nodeW} height={n.h} rx={2} style={{ fill: sourceColor }} />
            <text x={leftX + nodeW + 6} y={n.y + n.h / 2 + 4} fontSize={11} fill={TITLE_TEXT}>
              {n.label}
            </text>
          </g>
        ))}
        {tgtNodes.map((n) => (
          <g key={n.id}>
            <rect x={rightX} y={n.y} width={nodeW} height={n.h} rx={2} style={{ fill: targetColor }} />
            <text x={rightX - 6} y={n.y + n.h / 2 + 4} textAnchor="end" fontSize={11} fill={TITLE_TEXT}>
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// ChordChart — circular group arcs + ribbons
// ══════════════════════════════════════════════════════════════════

export interface ChordChartProps {
  labels: string[];
  matrix: number[][];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  colors?: string[];
  className?: string;
  'aria-label'?: string;
}

export const ChordChart: React.FC<ChordChartProps> = ({
  labels,
  matrix,
  eyebrow,
  title,
  subtitle,
  height = 300,
  width = 520,
  colors,
  className,
  'aria-label': ariaLabel,
}) => {
  const cx = width / 2;
  const cy = height / 2;
  const rOuter = Math.min(width, height) / 2 - 20;
  const rInner = rOuter - 14;
  const n = labels.length;
  const color = (i: number) => seriesColor(i, colors?.[i]);

  const rowTotals = matrix.map((row) => row.reduce((a, b) => a + b, 0));
  const total = rowTotals.reduce((a, b) => a + b, 0) || 1;
  const padDeg = 4;
  const availDeg = 360 - n * padDeg;
  const k = availDeg / total;

  // Group arcs + sub-arc angle ranges per (i,j).
  const groups: { start: number; end: number; mid: number }[] = [];
  const sub: { s0: number; s1: number }[][] = [];
  let cursor = 0;
  for (let i = 0; i < n; i++) {
    const start = cursor;
    const span = rowTotals[i] * k;
    groups.push({ start, end: start + span, mid: start + span / 2 });
    const row: { s0: number; s1: number }[] = [];
    let sc = start;
    for (let j = 0; j < n; j++) {
      const sspan = matrix[i][j] * k;
      row.push({ s0: sc, s1: sc + sspan });
      sc += sspan;
    }
    sub.push(row);
    cursor = start + span + padDeg;
  }

  const ribbons: { key: string; d: string; color: string; label: string }[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (matrix[i][j] <= 0 && matrix[j][i] <= 0) continue;
      const a = sub[i][j];
      const b = sub[j][i];
      const pA0 = polar(cx, cy, rInner, a.s0);
      const pA1 = polar(cx, cy, rInner, a.s1);
      const pB0 = polar(cx, cy, rInner, b.s0);
      const pB1 = polar(cx, cy, rInner, b.s1);
      const d = [
        `M ${pA0.x} ${pA0.y}`,
        `A ${rInner} ${rInner} 0 0 1 ${pA1.x} ${pA1.y}`,
        `Q ${cx} ${cy} ${pB0.x} ${pB0.y}`,
        `A ${rInner} ${rInner} 0 0 1 ${pB1.x} ${pB1.y}`,
        `Q ${cx} ${cy} ${pA0.x} ${pA0.y}`,
        'Z',
      ].join(' ');
      ribbons.push({
        key: `${i}-${j}`,
        d,
        color: color(i),
        label: `${labels[i]} ↔ ${labels[j]}`,
      });
    }
  }

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend items={labels.map((l, i) => ({ label: l, color: color(i) }))} />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Chord diagram'}
        style={{ fontFamily: FONT }}
      >
        {ribbons.map((r) => (
          <path key={r.key} d={r.d} fill={r.color} fillOpacity={0.35}>
            <title>{r.label}</title>
          </path>
        ))}
        {groups.map((g, i) => {
          const labelPt = polar(cx, cy, rOuter + 12, g.mid);
          return (
            <g key={labels[i]}>
              <path d={arcPath(cx, cy, rOuter, rInner, g.start, g.end)} style={{ fill: color(i) }} />
              <text
                x={labelPt.x}
                y={labelPt.y + 3}
                textAnchor="middle"
                fontSize={11}
                fill={AXIS_TEXT}
              >
                {labels[i]}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// CalendarHeatmap — daily activity grid
// ══════════════════════════════════════════════════════════════════

export interface CalendarHeatmapProps {
  /** Daily values, chronological. Rendered top-to-bottom, week per column. */
  values: number[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  emptyColor?: string;
  className?: string;
  'aria-label'?: string;
}

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({
  values,
  eyebrow,
  title,
  subtitle,
  height = 200,
  width = 520,
  emptyColor = 'var(--ps-prim-blue-50)',
  className,
  'aria-label': ariaLabel,
}) => {
  const rows = 7;
  const cols = Math.ceil(values.length / rows);
  const padL = 8;
  const padT = 8;
  const gapCell = 3;
  const cell = Math.min(
    (width - padL * 2 - gapCell * (cols - 1)) / cols,
    (height - padT * 2 - 24 - gapCell * (rows - 1)) / rows,
  );
  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend
          items={[
            { label: 'Low activity', color: TIER_SCALE[0] },
            { label: 'Medium activity', color: TIER_SCALE[1] },
            { label: 'High activity', color: TIER_SCALE[2] },
          ]}
        />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Calendar heatmap'}
        style={{ fontFamily: FONT }}
      >
        {values.map((v, idx) => {
          const c = Math.floor(idx / rows);
          const r = idx % rows;
          const x = padL + c * (cell + gapCell);
          const y = padT + r * (cell + gapCell);
          const fill = TIER_SCALE[bucketIndex(v, min, max, TIER_SCALE.length)];
          return (
            <rect key={idx} x={x} y={y} width={cell} height={cell} rx={2} style={{ fill }}>
              <title>{`Day ${idx + 1}: ${v}`}</title>
            </rect>
          );
        })}
        {values.length === 0 && (
          <rect x={padL} y={padT} width={cell} height={cell} rx={2} style={{ fill: emptyColor }} />
        )}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// SwarmPlot — beeswarm distribution along one axis
// ══════════════════════════════════════════════════════════════════

export interface SwarmDatum {
  value: number;
  label?: string;
}

export interface SwarmPlotProps {
  data: SwarmDatum[];
  tierLabels?: [string, string, string];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  dotRadius?: number;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const SwarmPlot: React.FC<SwarmPlotProps> = ({
  data,
  tierLabels = ['Low', 'Mid', 'High'],
  eyebrow,
  title,
  subtitle,
  height = 260,
  width = 520,
  dotRadius = 5,
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 16;
  const padR = 16;
  const padT = 16;
  const padB = 28;
  const plotW = width - padL - padR;
  const midY = padT + (height - padT - padB) / 2;

  const min = Math.min(...data.map((d) => d.value));
  const max = Math.max(...data.map((d) => d.value));
  const xOf = (v: number) => padL + ((v - min) / (max - min || 1)) * plotW;

  // Beeswarm: sort by x, stack into a bin, alternate above/below centerline.
  const sorted = [...data].sort((a, b) => a.value - b.value);
  const binW = dotRadius * 2 + 1;
  const binCount: Record<number, number> = {};
  const dots = sorted.map((d, i) => {
    const x = xOf(d.value);
    const bin = Math.round(x / binW);
    const c = binCount[bin] ?? 0;
    binCount[bin] = c + 1;
    const rank = Math.ceil(c / 2);
    const dir = c % 2 === 0 ? -1 : 1;
    const y = midY + dir * rank * (dotRadius * 2 - 1);
    const tier = bucketIndex(d.value, min, max, 3);
    return { key: i, x, y, fill: TIER_SCALE[tier], label: d.label, value: d.value };
  });

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend
          items={[
            { label: `${tierLabels[0]} tier`, color: TIER_SCALE[0] },
            { label: `${tierLabels[1]} tier`, color: TIER_SCALE[1] },
            { label: `${tierLabels[2]} tier`, color: TIER_SCALE[2] },
          ]}
        />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Swarm plot'}
        style={{ fontFamily: FONT }}
      >
        <line
          x1={padL}
          x2={width - padR}
          y1={midY}
          y2={midY}
          stroke={GRID}
          strokeWidth={1}
          strokeDasharray="4 4"
        />
        {dots.map((d) => (
          <circle key={d.key} cx={d.x} cy={d.y} r={dotRadius} style={{ fill: d.fill }}>
            <title>{`${d.label ? d.label + ': ' : ''}${valueFormat(d.value)}`}</title>
          </circle>
        ))}
        {tierLabels.map((t, i) => (
          <text
            key={t}
            x={padL + (plotW / 2) * i}
            y={height - 8}
            textAnchor={i === 0 ? 'start' : i === 1 ? 'middle' : 'end'}
            fontSize={11}
            fill={AXIS_TEXT}
          >
            {t}
          </text>
        ))}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// Sunburst — hierarchical radial rings
// ══════════════════════════════════════════════════════════════════

export interface SunburstNode {
  name: string;
  value?: number;
  color?: string;
  children?: SunburstNode[];
}

interface SunburstArc {
  key: string;
  r0: number;
  r1: number;
  start: number;
  end: number;
  color: string;
  name: string;
  value: number;
  depth: number;
}

export interface SunburstProps {
  root: SunburstNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  centerLabel?: string;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const Sunburst: React.FC<SunburstProps> = ({
  root,
  eyebrow,
  title,
  subtitle,
  height = 300,
  width = 520,
  centerLabel,
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const cx = width / 2;
  const cy = height / 2;

  const nodeValue = (n: SunburstNode): number =>
    n.children && n.children.length
      ? n.children.reduce((a, c) => a + nodeValue(c), 0)
      : n.value ?? 0;

  const maxDepth = (n: SunburstNode): number =>
    n.children && n.children.length ? 1 + Math.max(...n.children.map(maxDepth)) : 0;

  const depth = maxDepth(root);
  const r0Disk = 34;
  const ringW = (Math.min(width, height) / 2 - 24 - r0Disk) / Math.max(1, depth);

  const arcs: SunburstArc[] = [];
  const walk = (n: SunburstNode, d: number, start: number, end: number, sib: number) => {
    if (d > 0) {
      arcs.push({
        key: `${d}-${n.name}-${start.toFixed(1)}`,
        r0: r0Disk + (d - 1) * ringW,
        r1: r0Disk + d * ringW,
        start,
        end,
        color: n.color ?? SERIES_COLORS[(d + sib) % SERIES_COLORS.length],
        name: n.name,
        value: nodeValue(n),
        depth: d,
      });
    }
    if (n.children && n.children.length) {
      const tot = n.children.reduce((a, c) => a + nodeValue(c), 0) || 1;
      let a = start;
      n.children.forEach((c, i) => {
        const span = (nodeValue(c) / tot) * (end - start);
        walk(c, d + 1, a, a + span, i);
        a += span;
      });
    }
  };
  walk(root, 0, 0, 360, 0);
  const rootTotal = nodeValue(root);

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend
          items={[
            { label: 'Root', color: 'var(--ps-prim-blue-900)' },
            { label: 'Level 2', color: 'var(--ps-prim-blue-500)' },
            { label: 'Level 3', color: 'var(--ps-prim-blue-300)' },
          ]}
        />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Sunburst chart'}
        style={{ fontFamily: FONT }}
      >
        {arcs.map((arc) => (
          <path key={arc.key} d={arcPath(cx, cy, arc.r1, arc.r0, arc.start, arc.end)} style={{ fill: arc.color }}>
            <title>{`${arc.name}: ${valueFormat(arc.value)}`}</title>
          </path>
        ))}
        <circle cx={cx} cy={cy} r={r0Disk} style={{ fill: 'var(--ps-prim-blue-900)' }} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--ps-prim-white)">
          {centerLabel ?? valueFormat(rootTotal)}
        </text>
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// CirclePacking — value-sized bubbles, spiral packed
// ══════════════════════════════════════════════════════════════════

export interface PackCircle {
  label: string;
  value: number;
  color?: string;
}

export interface CirclePackingProps {
  data: PackCircle[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const CirclePacking: React.FC<CirclePackingProps> = ({
  data,
  eyebrow,
  title,
  subtitle,
  height = 300,
  width = 520,
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const cx = width / 2;
  const cy = height / 2;
  const maxV = Math.max(...data.map((d) => d.value), 1);
  const rMax = Math.min(width, height) / 3.2;

  // Deterministic spiral packing: largest first, scan an Archimedean spiral
  // outward for the first collision-free centre.
  const sorted = [...data]
    .map((d, i) => ({ ...d, i, r: Math.max(10, rMax * Math.sqrt(d.value / maxV)) }))
    .sort((a, b) => b.r - a.r);

  const placed: { x: number; y: number; r: number }[] = [];
  const positioned = sorted.map((d) => {
    if (placed.length === 0) {
      const p = { x: cx, y: cy, r: d.r };
      placed.push(p);
      return { ...d, ...p };
    }
    for (let t = 0; t < 4000; t++) {
      const ang = t * 0.5;
      const rad = 4 + t * 0.7;
      const x = cx + rad * Math.cos(ang);
      const y = cy + rad * Math.sin(ang);
      const hit = placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.r + d.r + 2);
      if (!hit) {
        const p = { x, y, r: d.r };
        placed.push(p);
        return { ...d, ...p };
      }
    }
    const p = { x: cx, y: cy, r: d.r };
    placed.push(p);
    return { ...d, ...p };
  });

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend items={data.map((d, i) => ({ label: d.label, color: seriesColor(i, d.color) }))} />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Circle packing'}
        style={{ fontFamily: FONT }}
      >
        {positioned.map((d) => (
          <g key={d.label}>
            <circle cx={d.x} cy={d.y} r={d.r} style={{ fill: seriesColor(d.i, d.color) }}>
              <title>{`${d.label}: ${valueFormat(d.value)}`}</title>
            </circle>
            {d.r > 22 && (
              <text
                x={d.x}
                y={d.y + 4}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill="var(--ps-prim-white)"
              >
                {d.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// ParallelCoordinates — multi-axis entity profiles
// ══════════════════════════════════════════════════════════════════

export interface ParallelSeries {
  name: string;
  values: number[];
  color?: string;
}

export interface ParallelCoordinatesProps {
  axes: string[];
  series: ParallelSeries[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  className?: string;
  'aria-label'?: string;
}

export const ParallelCoordinates: React.FC<ParallelCoordinatesProps> = ({
  axes,
  series,
  eyebrow,
  title,
  subtitle,
  height = 300,
  width = 520,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 20;
  const padR = 20;
  const padT = 16;
  const padB = 32;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const axisX = (i: number) => padL + (plotW / Math.max(1, axes.length - 1)) * i;

  const bounds = axes.map((_, ai) => {
    const col = series.map((s) => s.values[ai]);
    return { min: Math.min(...col), max: Math.max(...col) };
  });
  const yOf = (ai: number, v: number) => {
    const b = bounds[ai];
    return padT + plotH - ((v - b.min) / (b.max - b.min || 1)) * plotH;
  };

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
        aria-label={ariaLabel ?? title ?? 'Parallel coordinates'}
        style={{ fontFamily: FONT }}
      >
        {axes.map((ax, ai) => (
          <g key={ax}>
            <line x1={axisX(ai)} x2={axisX(ai)} y1={padT} y2={padT + plotH} stroke={GRID} strokeWidth={1} />
            <text
              x={axisX(ai)}
              y={height - 12}
              textAnchor={ai === 0 ? 'start' : ai === axes.length - 1 ? 'end' : 'middle'}
              fontSize={11}
              fill={AXIS_TEXT}
            >
              {ax}
            </text>
          </g>
        ))}
        {series.map((s, si) => {
          const pts = s.values.map((v, ai) => `${axisX(ai)},${yOf(ai, v)}`).join(' ');
          return (
            <polyline
              key={s.name}
              points={pts}
              fill="none"
              stroke={seriesColor(si, s.color)}
              strokeWidth={2}
              strokeLinejoin="round"
            >
              <title>{s.name}</title>
            </polyline>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// NetworkGraph — force-directed node-link (positions supplied 0–1)
// ══════════════════════════════════════════════════════════════════

export type NetworkGroup = 'hub' | 'primary' | 'secondary';

export interface NetworkNode {
  id: string;
  label: string;
  x: number;
  y: number;
  group?: NetworkGroup;
}

export interface NetworkEdge {
  source: string;
  target: string;
  weight?: number;
}

export interface NetworkGraphProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  className?: string;
  'aria-label'?: string;
}

const NETWORK_STYLE: Record<NetworkGroup, { color: string; r: number }> = {
  hub: { color: 'var(--ps-prim-blue-900)', r: 18 },
  primary: { color: 'var(--ps-prim-blue-500)', r: 13 },
  secondary: { color: 'var(--ps-prim-blue-300)', r: 10 },
};

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  nodes,
  edges,
  eyebrow,
  title,
  subtitle,
  height = 300,
  width = 520,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 40;
  const padR = 40;
  const padT = 24;
  const padB = 24;
  const px = (x: number) => padL + x * (width - padL - padR);
  const py = (y: number) => padT + y * (height - padT - padB);
  const byId = (id: string) => nodes.find((n) => n.id === id);

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend
          items={[
            { label: 'Hub node', color: NETWORK_STYLE.hub.color },
            { label: 'Primary nodes', color: NETWORK_STYLE.primary.color },
            { label: 'Secondary nodes', color: NETWORK_STYLE.secondary.color },
          ]}
        />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Network graph'}
        style={{ fontFamily: FONT }}
      >
        {edges.map((e, i) => {
          const s = byId(e.source);
          const t = byId(e.target);
          if (!s || !t) return null;
          return (
            <line
              key={`${e.source}-${e.target}-${i}`}
              x1={px(s.x)}
              y1={py(s.y)}
              x2={px(t.x)}
              y2={py(t.y)}
              stroke={GRID}
              strokeWidth={Math.max(1, e.weight ?? 1)}
            />
          );
        })}
        {nodes.map((n) => {
          const style = NETWORK_STYLE[n.group ?? 'secondary'];
          return (
            <g key={n.id}>
              <circle cx={px(n.x)} cy={py(n.y)} r={style.r} style={{ fill: style.color }}>
                <title>{n.label}</title>
              </circle>
              <text
                x={px(n.x)}
                y={py(n.y) + 4}
                textAnchor="middle"
                fontSize={10}
                fontWeight={600}
                fill="var(--ps-prim-white)"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// MarimekkoChart — variable-width stacked columns (2D proportional)
// ══════════════════════════════════════════════════════════════════

export interface MarimekkoSegment {
  key: string;
  value: number;
}

export interface MarimekkoColumn {
  label: string;
  segments: MarimekkoSegment[];
}

export interface MarimekkoSeries {
  key: string;
  name: string;
  color?: string;
}

export interface MarimekkoChartProps {
  columns: MarimekkoColumn[];
  keys: MarimekkoSeries[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  className?: string;
  'aria-label'?: string;
}

export const MarimekkoChart: React.FC<MarimekkoChartProps> = ({
  columns,
  keys,
  eyebrow,
  title,
  subtitle,
  height = 300,
  width = 520,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 8;
  const padR = 8;
  const padT = 8;
  const padB = 24;
  const gap = 4;
  const plotW = width - padL - padR - gap * (columns.length - 1);
  const plotH = height - padT - padB;

  const colTotals = columns.map((c) => c.segments.reduce((a, s) => a + s.value, 0));
  const grand = colTotals.reduce((a, b) => a + b, 0) || 1;
  const colorOf = (key: string, i: number) => {
    const idx = keys.findIndex((k) => k.key === key);
    return seriesColor(idx >= 0 ? idx : i, keys[idx]?.color);
  };

  let xCursor = padL;

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend items={keys.map((k, i) => ({ label: k.name, color: seriesColor(i, k.color) }))} />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Marimekko chart'}
        style={{ fontFamily: FONT }}
      >
        {columns.map((col, ci) => {
          const cw = (colTotals[ci] / grand) * plotW;
          const x = xCursor;
          xCursor += cw + gap;
          const total = colTotals[ci] || 1;
          let yCursor = padT;
          return (
            <g key={col.label}>
              {col.segments.map((seg, si) => {
                const sh = (seg.value / total) * plotH;
                const y = yCursor;
                yCursor += sh;
                const pct = Math.round((seg.value / total) * 100);
                return (
                  <g key={seg.key}>
                    <rect x={x} y={y} width={cw} height={sh} style={{ fill: colorOf(seg.key, si) }}>
                      <title>{`${col.label} · ${seg.key}: ${pct}%`}</title>
                    </rect>
                    {sh > 18 && cw > 24 && (
                      <text
                        x={x + cw / 2}
                        y={y + sh / 2 + 4}
                        textAnchor="middle"
                        fontSize={11}
                        fill="var(--ps-prim-white)"
                      >
                        {pct}%
                      </text>
                    )}
                  </g>
                );
              })}
              <text x={x + cw / 2} y={height - 8} textAnchor="middle" fontSize={11} fill={AXIS_TEXT}>
                {col.label}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// GeoChart — tile-grid regional map / choropleth
// ══════════════════════════════════════════════════════════════════

export interface GeoRegion {
  code: string;
  value: number;
  label?: string;
}

export interface GeoChartProps {
  regions: GeoRegion[];
  columns?: number;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  valueFormat?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

export const GeoChart: React.FC<GeoChartProps> = ({
  regions,
  columns = 3,
  eyebrow,
  title,
  subtitle,
  height = 300,
  width = 520,
  valueFormat = (n) => `${n}`,
  className,
  'aria-label': ariaLabel,
}) => {
  const padL = 8;
  const padT = 8;
  const gap = 10;
  const rows = Math.ceil(regions.length / columns);
  const tileW = (width - padL * 2 - gap * (columns - 1)) / columns;
  const tileH = (height - padT * 2 - gap * (rows - 1)) / rows;
  const min = Math.min(...regions.map((r) => r.value));
  const max = Math.max(...regions.map((r) => r.value));

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend
          items={[
            { label: 'Very High', color: MAGNITUDE_SCALE[4] },
            { label: 'High', color: MAGNITUDE_SCALE[3] },
            { label: 'Medium', color: MAGNITUDE_SCALE[2] },
            { label: 'Low', color: MAGNITUDE_SCALE[1] },
            { label: 'Minimal', color: MAGNITUDE_SCALE[0] },
          ]}
        />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Regional map'}
        style={{ fontFamily: FONT }}
      >
        {regions.map((r, i) => {
          const c = i % columns;
          const row = Math.floor(i / columns);
          const x = padL + c * (tileW + gap);
          const y = padT + row * (tileH + gap);
          const bi = bucketIndex(r.value, min, max, MAGNITUDE_SCALE.length);
          const fill = MAGNITUDE_SCALE[bi];
          const light = bi <= 1;
          const fg = light ? TITLE_TEXT : 'var(--ps-prim-white)';
          return (
            <g key={r.code}>
              <rect x={x} y={y} width={tileW} height={tileH} rx={4} style={{ fill }}>
                <title>{`${r.label ?? r.code}: ${valueFormat(r.value)}`}</title>
              </rect>
              <text x={x + tileW / 2} y={y + tileH / 2 - 2} textAnchor="middle" fontSize={12} fontWeight={600} fill={fg}>
                {r.code}
              </text>
              <text x={x + tileW / 2} y={y + tileH / 2 + 16} textAnchor="middle" fontSize={11} fill={fg}>
                {valueFormat(r.value)}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartFrame>
  );
};

// ══════════════════════════════════════════════════════════════════
// VoronoiDiagram — tessellation of proximity regions (pure renderer)
// ══════════════════════════════════════════════════════════════════

export interface VoronoiCell {
  /** Polygon vertices in viewBox units. */
  points: Array<[number, number]>;
  /** Seed point in viewBox units. */
  seed: [number, number];
  /** Zone index → colour + legend grouping. */
  zone?: number;
  label?: string;
  value?: number;
}

export interface VoronoiDiagramProps {
  cells: VoronoiCell[];
  zoneLabels?: string[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  height?: number;
  width?: number;
  className?: string;
  'aria-label'?: string;
}

const VORONOI_SCALE: string[] = [
  'var(--ps-prim-blue-500)',
  'var(--ps-prim-blue-300)',
  'var(--ps-prim-blue-700)',
  'var(--ps-prim-blue-100)',
];

export const VoronoiDiagram: React.FC<VoronoiDiagramProps> = ({
  cells,
  zoneLabels = ['Zone A', 'Zone B', 'Zone C'],
  eyebrow,
  title,
  subtitle,
  height = 300,
  width = 520,
  className,
  'aria-label': ariaLabel,
}) => {
  const zoneColor = (z: number) => VORONOI_SCALE[z % VORONOI_SCALE.length];

  return (
    <ChartFrame
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      className={className}
      footer={
        <Legend items={zoneLabels.map((l, i) => ({ label: l, color: zoneColor(i) }))} />
      }
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        role="img"
        aria-label={ariaLabel ?? title ?? 'Voronoi diagram'}
        style={{ fontFamily: FONT }}
      >
        {cells.map((cell, i) => {
          const pts = cell.points.map((p) => `${p[0]},${p[1]}`).join(' ');
          const fill = zoneColor(cell.zone ?? 0);
          return (
            <polygon
              key={i}
              points={pts}
              style={{ fill, stroke: 'var(--ps-sem-bg-surface)' }}
              fillOpacity={0.35}
              strokeWidth={2}
            >
              <title>
                {`${cell.label ?? `Cell ${i + 1}`}${cell.value != null ? `: ${cell.value}` : ''}`}
              </title>
            </polygon>
          );
        })}
        {cells.map((cell, i) => (
          <circle key={`s-${i}`} cx={cell.seed[0]} cy={cell.seed[1]} r={3} style={{ fill: 'var(--ps-prim-blue-900)' }} />
        ))}
      </svg>
    </ChartFrame>
  );
};

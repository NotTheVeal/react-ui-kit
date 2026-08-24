import type { Meta, StoryObj } from '@storybook/react';
import {
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  DonutChart,
  RadarChart,
  FunnelChart,
  WaffleChart,
  Sparkline,
  BulletChart,
  ScatterPlot,
  BubbleChart,
  HeatMap,
  TreeMap,
  BumpChart,
  StreamChart,
  BoxPlot,
  Legend,
  SERIES_COLORS,
} from './DataViz';

const meta: Meta = {
  title: 'Data & AI/Charts',
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const usd = (n: number) => `$${n}k`;

export const Bar: Story = {
  render: () => (
    <BarChart
      eyebrow="Parts Spend"
      title="Monthly Revenue"
      subtitle="Revenue"
      categories={months}
      series={[{ name: 'Revenue', data: [42, 55, 48, 63, 58, 71] }]}
      valueFormat={usd}
    />
  ),
};

export const BarGrouped: Story = {
  render: () => (
    <BarChart
      title="Revenue · Cost · Profit"
      categories={months}
      series={[
        { name: 'Revenue', data: [42, 55, 48, 63, 58, 71] },
        { name: 'Cost', data: [28, 34, 30, 38, 35, 41] },
        { name: 'Profit', data: [14, 21, 18, 25, 23, 30] },
      ]}
      valueFormat={usd}
    />
  ),
};

export const Line: Story = {
  render: () => (
    <LineChart
      eyebrow="Uptime Trend"
      title="Multi-Series Line"
      categories={months}
      series={[
        { name: 'Imaging', data: [88, 91, 89, 94, 96, 95] },
        { name: 'Surgical', data: [80, 83, 85, 82, 88, 90] },
      ]}
      valueFormat={(n) => `${n}%`}
    />
  ),
};

export const Area: Story = {
  render: () => (
    <AreaChart
      title="Revenue with forecast · filled area"
      categories={months}
      series={[
        { name: 'Revenue', data: [42, 55, 48, 63, 58, 71] },
        { name: 'Forecast', data: [0, 0, 0, 63, 66, 78], dashed: true },
      ]}
      valueFormat={usd}
    />
  ),
};

export const Pie: Story = {
  render: () => (
    <PieChart
      title="Revenue by Channel"
      subtitle="Pie · YTD share"
      data={[
        { label: 'Direct', value: 38 },
        { label: 'Organic', value: 27 },
        { label: 'Referral', value: 19 },
        { label: 'Social', value: 11 },
        { label: 'Email', value: 5 },
      ]}
    />
  ),
};

export const Donut: Story = {
  render: () => (
    <DonutChart
      title="Revenue by Channel"
      subtitle="Donut · 62% cutout · center label"
      centerLabel="$1.2M"
      centerSub="Total YTD"
      data={[
        { label: 'Direct', value: 38 },
        { label: 'Organic', value: 27 },
        { label: 'Referral', value: 19 },
        { label: 'Social', value: 11 },
        { label: 'Email', value: 5 },
      ]}
    />
  ),
};

export const Radar: Story = {
  render: () => (
    <RadarChart
      title="Supplier Scorecard"
      axes={['Price', 'Quality', 'Lead Time', 'Fill Rate', 'Support']}
      series={[
        { name: 'Supplier A', data: [80, 90, 70, 85, 75] },
        { name: 'Supplier B', data: [60, 70, 90, 65, 80] },
      ]}
    />
  ),
};

export const Funnel: Story = {
  render: () => (
    <FunnelChart
      title="Procurement Funnel"
      subtitle="Approval Pipeline"
      stages={[
        { label: 'Requested', value: 1200 },
        { label: 'Quoted', value: 860 },
        { label: 'Approved', value: 540 },
        { label: 'Ordered', value: 410 },
      ]}
    />
  ),
};

export const Waffle: Story = {
  render: () => (
    <WaffleChart
      title="Contract Status"
      data={[
        { label: 'Active', value: 68 },
        { label: 'Pending', value: 14 },
        { label: 'Expired', value: 12 },
        { label: 'Draft', value: 6 },
      ]}
    />
  ),
};

export const SparklineTrend: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Sparkline data={[12, 18, 15, 22, 20, 28, 34]} />
      <span className="text-[14px] font-semibold text-[var(--ps-prim-green-600)]">+18%</span>
    </div>
  ),
};

export const Bullet: Story = {
  render: () => (
    <BulletChart
      eyebrow="Bullet Chart"
      title="KPI vs Target"
      subtitle="Performance against qualitative ranges"
      rows={[
        { label: 'Revenue', measure: 76, target: 85, ranges: [50, 75, 100] },
        { label: 'Uptime', measure: 92, target: 90, ranges: [60, 80, 100] },
        { label: 'NPS', measure: 48, target: 70, ranges: [40, 70, 100] },
      ]}
    />
  ),
};

export const BulletSingle: Story = {
  render: () => (
    <BulletChart
      title="Revenue attainment"
      height={80}
      rows={[{ label: 'Revenue', measure: 76, target: 85, ranges: [50, 75, 100] }]}
      valueFormat={(n) => `$${n}k`}
    />
  ),
};

export const Scatter: Story = {
  render: () => (
    <ScatterPlot
      eyebrow="Correlation"
      title="Lead Time vs Fill Rate"
      subtitle="Each point is a supplier"
      series={[
        {
          name: 'Imaging',
          data: [
            { x: 12, y: 88, label: 'GE' },
            { x: 18, y: 82, label: 'Philips' },
            { x: 9, y: 94, label: 'Siemens' },
            { x: 22, y: 76, label: 'Canon' },
            { x: 15, y: 85, label: 'Hologic' },
          ],
        },
        {
          name: 'Surgical',
          data: [
            { x: 20, y: 70, label: 'Stryker' },
            { x: 28, y: 64, label: 'Medtronic' },
            { x: 24, y: 68, label: 'Zimmer' },
            { x: 31, y: 60, label: 'Smith+Nephew' },
          ],
        },
      ]}
      xFormat={(n) => `${n}d`}
      yFormat={(n) => `${n}%`}
    />
  ),
};

export const Bubble: Story = {
  render: () => (
    <BubbleChart
      eyebrow="Portfolio"
      title="Category Performance"
      subtitle="x = margin · y = fill rate · size = volume"
      series={[
        {
          name: 'Segments',
          data: [
            { x: 80, y: 92, r: 16, label: 'Imaging' },
            { x: 65, y: 85, r: 20, label: 'Surgical' },
            { x: 45, y: 78, r: 11, label: 'ICU' },
            { x: 30, y: 70, r: 9, label: 'Lab' },
          ],
        },
      ]}
      xFormat={(n) => `${n}%`}
      yFormat={(n) => `${n}%`}
    />
  ),
};

export const Heat: Story = {
  render: () => (
    <HeatMap
      eyebrow="Activity"
      title="Order Volume by Day & Shift"
      xLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      yLabels={['Night', 'Morning', 'Afternoon', 'Evening']}
      values={[
        [1, 0, 1, 2, 1, 0, 0],
        [4, 5, 4, 6, 5, 2, 1],
        [3, 4, 5, 4, 6, 2, 1],
        [2, 3, 2, 3, 4, 1, 0],
      ]}
    />
  ),
};

export const Tree: Story = {
  render: () => (
    <TreeMap
      eyebrow="Spend"
      title="Parts Spend by Category"
      data={[
        { name: 'Sales / Enterprise', value: 180, d: 0 },
        { name: 'Imaging', value: 140, d: 1 },
        { name: 'Surgical', value: 110, d: 1 },
        { name: 'ICU', value: 90, d: 2 },
        { name: 'Lab', value: 70, d: 2 },
        { name: 'Cardiology', value: 60, d: 3 },
        { name: 'Endoscopy', value: 48, d: 3 },
        { name: 'Respiratory', value: 40, d: 4 },
        { name: 'Dental', value: 30, d: 4 },
        { name: 'Other', value: 22, d: 4 },
      ]}
      valueFormat={(n) => `$${n}k`}
    />
  ),
};

export const Bump: Story = {
  render: () => (
    <BumpChart
      eyebrow="Ranking"
      title="Supplier Rank by Quarter"
      periods={["Q1'24", "Q2'24", "Q3'24", "Q4'24", "Q1'25"]}
      series={[
        { name: 'Supplier A', ranks: [1, 2, 1, 3, 2] },
        { name: 'Supplier B', ranks: [3, 1, 2, 1, 1] },
        { name: 'Supplier C', ranks: [2, 3, 3, 2, 3] },
        { name: 'Supplier D', ranks: [4, 4, 4, 4, 4] },
        { name: 'Supplier E', ranks: [5, 5, 5, 5, 5] },
      ]}
    />
  ),
};

export const Stream: Story = {
  render: () => (
    <StreamChart
      eyebrow="Trend"
      title="Category Mix Over Time"
      categories={months}
      series={[
        { name: 'Imaging', data: [20, 24, 22, 28, 30, 34] },
        { name: 'Surgical', data: [16, 18, 20, 19, 22, 24] },
        { name: 'ICU', data: [10, 12, 14, 13, 15, 16] },
        { name: 'Lab', data: [8, 9, 8, 11, 10, 12] },
      ]}
    />
  ),
};

export const Distribution: Story = {
  render: () => (
    <BoxPlot
      eyebrow="Statistics"
      title="Repair Turnaround Distribution"
      subtitle="Days to close, by month"
      categories={['Jan', 'Feb', 'Mar', 'Apr']}
      data={[
        { min: 2, q1: 5, median: 8, q3: 12, max: 16 },
        { min: 3, q1: 7, median: 10, q3: 14, max: 19, outliers: [24] },
        { min: 1, q1: 4, median: 6, q3: 10, max: 15 },
        { min: 4, q1: 9, median: 12, q3: 15, max: 20 },
      ]}
      valueFormat={(n) => `${n}d`}
    />
  ),
};

export const SeriesPalette: Story = {
  render: () => (
    <Legend items={SERIES_COLORS.map((c, i) => ({ label: `Series ${i + 1}`, color: c }))} />
  ),
};

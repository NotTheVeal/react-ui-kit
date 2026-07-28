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
  Legend,
  SERIES_COLORS,
} from './DataViz';

const meta: Meta = {
  title: 'Data Viz/Charts',
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

export const SeriesPalette: Story = {
  render: () => (
    <Legend items={SERIES_COLORS.map((c, i) => ({ label: `Series ${i + 1}`, color: c }))} />
  ),
};

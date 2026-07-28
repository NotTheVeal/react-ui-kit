import figma from '@figma/code-connect'
import {
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  DonutChart,
  WaffleChart,
  FunnelChart,
  RadarChart,
  BulletChart,
} from './DataViz'

const FIG = 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System'

// Vertical Bar
figma.connect(BarChart, `${FIG}?node-id=4749-87`, {
  example: () => (
    <BarChart
      title="Parts Spend by Quarter"
      categories={['Q1', 'Q2', 'Q3', 'Q4']}
      series={[{ name: 'Spend', data: [420, 510, 390, 620] }]}
    />
  ),
})

// Line
figma.connect(LineChart, `${FIG}?node-id=4749-382`, {
  example: () => (
    <LineChart
      title="Uptime Trend"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
      series={[{ name: 'Uptime', data: [92, 94, 91, 96, 98] }]}
    />
  ),
})

// Area
figma.connect(AreaChart, `${FIG}?node-id=4749-545`, {
  example: () => (
    <AreaChart
      title="Order Volume"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
      series={[{ name: 'Orders', data: [120, 180, 150, 240, 300] }]}
    />
  ),
})

// Pie
figma.connect(PieChart, `${FIG}?node-id=4748-312`, {
  example: () => (
    <PieChart
      title="Spend by Category"
      data={[
        { label: 'Imaging', value: 45 },
        { label: 'Lab', value: 30 },
        { label: 'Surgical', value: 25 },
      ]}
    />
  ),
})

// Donut
figma.connect(DonutChart, `${FIG}?node-id=4748-339`, {
  example: () => (
    <DonutChart
      title="Fulfillment"
      centerLabel="98%"
      centerSub="On time"
      data={[
        { label: 'On time', value: 98 },
        { label: 'Late', value: 2 },
      ]}
    />
  ),
})

// Waffle
figma.connect(WaffleChart, `${FIG}?node-id=4748-430`, {
  example: () => (
    <WaffleChart
      title="Coverage"
      data={[
        { label: 'Covered', value: 82 },
        { label: 'Uncovered', value: 18 },
      ]}
    />
  ),
})

// Funnel
figma.connect(FunnelChart, `${FIG}?node-id=4750-663`, {
  example: () => (
    <FunnelChart
      title="Procurement Funnel"
      stages={[
        { label: 'Requests', value: 1000 },
        { label: 'Quoted', value: 720 },
        { label: 'Approved', value: 540 },
        { label: 'Ordered', value: 480 },
      ]}
    />
  ),
})

// Radar
figma.connect(RadarChart, `${FIG}?node-id=4750-205`, {
  example: () => (
    <RadarChart
      title="Supplier Scorecard"
      axes={['Price', 'Speed', 'Quality', 'Support', 'Availability']}
      series={[{ name: 'Supplier A', data: [80, 65, 90, 70, 85] }]}
    />
  ),
})

// Bullet Chart
figma.connect(BulletChart, `${FIG}?node-id=4751-1155`, {
  example: () => (
    <BulletChart
      title="KPI vs Target"
      rows={[
        { label: 'Revenue', measure: 76, target: 85, ranges: [50, 75, 100] },
        { label: 'Uptime', measure: 92, target: 90, ranges: [60, 80, 100] },
        { label: 'NPS', measure: 48, target: 70, ranges: [40, 70, 100] },
      ]}
    />
  ),
})

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
  ScatterPlot,
  BubbleChart,
  HeatMap,
  TreeMap,
  BumpChart,
  StreamChart,
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

// Scatter Plot
figma.connect(ScatterPlot, `${FIG}?node-id=4750-80`, {
  example: () => (
    <ScatterPlot
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
          ],
        },
      ]}
      xFormat={(n) => `${n}d`}
      yFormat={(n) => `${n}%`}
    />
  ),
})

// Bubble Chart
figma.connect(BubbleChart, `${FIG}?node-id=4750-141`, {
  example: () => (
    <BubbleChart
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
})

// Heat Map
figma.connect(HeatMap, `${FIG}?node-id=4750-397`, {
  example: () => (
    <HeatMap
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
})

// Treemap
figma.connect(TreeMap, `${FIG}?node-id=4750-735`, {
  example: () => (
    <TreeMap
      title="Parts Spend by Category"
      data={[
        { name: 'Imaging', value: 140, d: 0 },
        { name: 'Surgical', value: 110, d: 1 },
        { name: 'ICU', value: 90, d: 2 },
        { name: 'Lab', value: 70, d: 3 },
        { name: 'Other', value: 40, d: 4 },
      ]}
      valueFormat={(n) => `$${n}k`}
    />
  ),
})

// Bump Chart
figma.connect(BumpChart, `${FIG}?node-id=4751-103`, {
  example: () => (
    <BumpChart
      title="Supplier Rank by Quarter"
      periods={["Q1'24", "Q2'24", "Q3'24", "Q4'24", "Q1'25"]}
      series={[
        { name: 'Supplier A', ranks: [1, 2, 1, 3, 2] },
        { name: 'Supplier B', ranks: [3, 1, 2, 1, 1] },
        { name: 'Supplier C', ranks: [2, 3, 3, 2, 3] },
      ]}
    />
  ),
})

// Stream Chart
figma.connect(StreamChart, `${FIG}?node-id=4751-178`, {
  example: () => (
    <StreamChart
      title="Category Mix Over Time"
      categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
      series={[
        { name: 'Imaging', data: [20, 24, 22, 28, 30, 34] },
        { name: 'Surgical', data: [16, 18, 20, 19, 22, 24] },
        { name: 'ICU', data: [10, 12, 14, 13, 15, 16] },
        { name: 'Lab', data: [8, 9, 8, 11, 10, 12] },
      ]}
    />
  ),
})

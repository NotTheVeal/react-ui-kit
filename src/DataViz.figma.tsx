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
  BoxPlot,
  SankeyChart,
  ChordChart,
  CalendarHeatmap,
  SwarmPlot,
  Sunburst,
  CirclePacking,
  ParallelCoordinates,
  NetworkGraph,
  MarimekkoChart,
  GeoChart,
  VoronoiDiagram,
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


// Box Plot
figma.connect(BoxPlot, `${FIG}?node-id=4751-975`, {
  example: () => (
    <BoxPlot
      eyebrow="Statistics"
      title="Repair Turnaround Distribution"
      categories={['Jan', 'Feb', 'Mar', 'Apr']}
      data={[
        { min: 2, q1: 5, median: 8, q3: 12, max: 16 },
        { min: 3, q1: 7, median: 10, q3: 14, max: 19, outliers: [24] },
        { min: 1, q1: 4, median: 6, q3: 10, max: 15 },
        { min: 4, q1: 9, median: 12, q3: 15, max: 20 },
      ]}
    />
  ),
})

// Sankey
figma.connect(SankeyChart, `${FIG}?node-id=4645-47`, {
  example: () => (
    <SankeyChart
      title="Order Flow"
      sources={[
        { id: 'orders', label: 'Orders' },
        { id: 'returns', label: 'Returns' },
        { id: 'pending', label: 'Pending' },
      ]}
      targets={[
        { id: 'fulfilled', label: 'Fulfilled' },
        { id: 'processing', label: 'Processing' },
        { id: 'cancelled', label: 'Cancelled' },
      ]}
      links={[
        { source: 'orders', target: 'fulfilled', value: 60 },
        { source: 'orders', target: 'processing', value: 25 },
        { source: 'returns', target: 'processing', value: 15 },
        { source: 'returns', target: 'cancelled', value: 10 },
        { source: 'pending', target: 'processing', value: 12 },
        { source: 'pending', target: 'cancelled', value: 8 },
      ]}
    />
  ),
})

// Chord
figma.connect(ChordChart, `${FIG}?node-id=4645-47`, {
  example: () => (
    <ChordChart
      title="Cross-Category Flow"
      labels={['Group A', 'Group B', 'Group C', 'Group D']}
      matrix={[
        [0, 8, 6, 3],
        [8, 0, 5, 4],
        [6, 5, 0, 7],
        [3, 4, 7, 0],
      ]}
    />
  ),
})

// Calendar Heatmap
figma.connect(CalendarHeatmap, `${FIG}?node-id=4645-48`, {
  example: () => (
    <CalendarHeatmap
      title="Daily Order Volume"
      subtitle="Jan → Mar (daily activity)"
      values={Array.from({ length: 84 }, (_, i) => Math.round(20 + 30 * Math.abs(Math.sin(i / 4))))}
    />
  ),
})

// Swarm Plot
figma.connect(SwarmPlot, `${FIG}?node-id=4645-48`, {
  example: () => (
    <SwarmPlot
      title="Repair Turnaround Spread"
      data={Array.from({ length: 60 }, (_, i) => ({
        value: Math.round(2 + 18 * Math.abs(Math.sin(i * 1.3))),
        label: `WO-${1000 + i}`,
      }))}
      valueFormat={(n) => `${n}d`}
    />
  ),
})

// Sunburst
figma.connect(Sunburst, `${FIG}?node-id=4645-49`, {
  example: () => (
    <Sunburst
      title="Spend Breakdown"
      centerLabel="Total"
      root={{
        name: 'Total',
        children: [
          { name: 'Imaging', children: [{ name: 'MRI', value: 40 }, { name: 'CT', value: 30 }] },
          { name: 'Surgical', children: [{ name: 'Ortho', value: 25 }, { name: 'Neuro', value: 15 }] },
          { name: 'Lab', children: [{ name: 'Chem', value: 20 }, { name: 'Micro', value: 10 }] },
        ],
      }}
      valueFormat={(n) => `$${n}k`}
    />
  ),
})

// Circle Packing
figma.connect(CirclePacking, `${FIG}?node-id=4645-49`, {
  example: () => (
    <CirclePacking
      title="Category Volume"
      data={[
        { label: 'Imaging', value: 180 },
        { label: 'Surgery', value: 120 },
        { label: 'Lab', value: 90 },
        { label: 'Biomedical', value: 50 },
      ]}
      valueFormat={(n) => `$${n}k`}
    />
  ),
})

// Parallel Coordinates
figma.connect(ParallelCoordinates, `${FIG}?node-id=4645-50`, {
  example: () => (
    <ParallelCoordinates
      title="Supplier Profiles"
      axes={['Price', 'Lead Time', 'Quality', 'Coverage', 'Satisfaction']}
      series={[
        { name: 'Supplier A', values: [80, 40, 90, 70, 85] },
        { name: 'Supplier B', values: [60, 75, 70, 85, 65] },
        { name: 'Supplier C', values: [45, 60, 80, 55, 75] },
      ]}
    />
  ),
})

// Network Graph
figma.connect(NetworkGraph, `${FIG}?node-id=4645-50`, {
  example: () => (
    <NetworkGraph
      title="Supplier Network"
      nodes={[
        { id: 'hub', label: 'Hub', x: 0.5, y: 0.5, group: 'hub' },
        { id: 'a', label: 'A', x: 0.35, y: 0.28, group: 'primary' },
        { id: 'b', label: 'B', x: 0.68, y: 0.28, group: 'primary' },
        { id: 'c', label: 'C', x: 0.28, y: 0.78, group: 'secondary' },
        { id: 'd', label: 'D', x: 0.72, y: 0.78, group: 'secondary' },
      ]}
      edges={[
        { source: 'hub', target: 'a', weight: 3 },
        { source: 'hub', target: 'b', weight: 3 },
        { source: 'hub', target: 'c', weight: 2 },
        { source: 'hub', target: 'd', weight: 2 },
        { source: 'c', target: 'd', weight: 1 },
      ]}
    />
  ),
})

// Marimekko
figma.connect(MarimekkoChart, `${FIG}?node-id=4645-51`, {
  example: () => (
    <MarimekkoChart
      title="Quarterly Mix by Volume"
      keys={[
        { key: 'imaging', name: 'Imaging' },
        { key: 'surgery', name: 'Surgery' },
        { key: 'other', name: 'Other' },
      ]}
      columns={[
        { label: 'Q1', segments: [{ key: 'imaging', value: 40 }, { key: 'surgery', value: 30 }, { key: 'other', value: 30 }] },
        { label: 'Q2', segments: [{ key: 'imaging', value: 35 }, { key: 'surgery', value: 32 }, { key: 'other', value: 33 }] },
        { label: 'Q3', segments: [{ key: 'imaging', value: 38 }, { key: 'surgery', value: 28 }, { key: 'other', value: 34 }] },
        { label: 'Q4', segments: [{ key: 'imaging', value: 42 }, { key: 'surgery', value: 30 }, { key: 'other', value: 28 }] },
      ]}
    />
  ),
})

// Geo / Choropleth
figma.connect(GeoChart, `${FIG}?node-id=4728-311`, {
  example: () => (
    <GeoChart
      title="Revenue by US Region"
      regions={[
        { code: 'NW', value: 4.2 },
        { code: 'MW', value: 3.9 },
        { code: 'NE', value: 6.8 },
        { code: 'SW', value: 2.3 },
        { code: 'S', value: 5.1 },
        { code: 'SE', value: 4.7 },
      ]}
      valueFormat={(n) => `$${n}M`}
    />
  ),
})

// Voronoi
figma.connect(VoronoiDiagram, `${FIG}?node-id=4728-629`, {
  example: () => (
    <VoronoiDiagram
      title="Territory Regions"
      cells={[
        { points: [[0, 0], [180, 0], [150, 130], [0, 150]], seed: [70, 60], zone: 1 },
        { points: [[180, 0], [400, 0], [400, 120], [260, 150], [150, 130]], seed: [280, 55], zone: 0 },
        { points: [[0, 150], [150, 130], [180, 300], [0, 300]], seed: [80, 230], zone: 2 },
        { points: [[150, 130], [260, 150], [280, 300], [180, 300]], seed: [215, 230], zone: 1 },
        { points: [[260, 150], [400, 120], [400, 300], [280, 300]], seed: [335, 230], zone: 0 },
      ]}
      width={400}
      height={300}
    />
  ),
})

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
  BULLET_RANGE_COLORS,
  Legend,
  SERIES_COLORS,
} from './DataViz';

const months = ['Jan', 'Feb', 'Mar'];

describe('SERIES_COLORS', () => {
  it('exposes a token-bound categorical palette', () => {
    expect(SERIES_COLORS.length).toBeGreaterThanOrEqual(6);
    expect(SERIES_COLORS.every((c) => c.startsWith('var(--ps-'))).toBe(true);
  });
});

describe('BarChart', () => {
  it('renders as an img with an accessible name', () => {
    render(
      <BarChart title="Spend" categories={months} series={[{ name: 'Revenue', data: [1, 2, 3] }]} />,
    );
    expect(screen.getByRole('img', { name: 'Spend' })).toBeInTheDocument();
  });

  it('renders a bar per category per series', () => {
    const { container } = render(
      <BarChart
        title="Grouped"
        categories={months}
        series={[
          { name: 'A', data: [1, 2, 3] },
          { name: 'B', data: [3, 2, 1] },
        ]}
      />,
    );
    // 3 categories × 2 series = 6 bars
    expect(container.querySelectorAll('rect').length).toBe(6);
  });

  it('shows a legend only for multi-series', () => {
    render(<BarChart title="Single" categories={months} series={[{ name: 'A', data: [1, 2, 3] }]} />);
    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });
});

describe('LineChart / AreaChart', () => {
  it('draws a polyline path per series', () => {
    const { container } = render(
      <LineChart title="Line" categories={months} series={[{ name: 'A', data: [1, 2, 3] }]} />,
    );
    expect(container.querySelectorAll('path').length).toBeGreaterThanOrEqual(1);
    expect(container.querySelectorAll('circle').length).toBe(3);
  });

  it('AreaChart fills an area beneath the line', () => {
    const { container } = render(
      <AreaChart title="Area" categories={months} series={[{ name: 'A', data: [1, 2, 3] }]} />,
    );
    const filled = Array.from(container.querySelectorAll('path')).some(
      (p) => p.getAttribute('fill-opacity') === '0.14',
    );
    expect(filled).toBe(true);
  });
});

describe('PieChart / DonutChart', () => {
  it('renders a slice per datum with percentages in the legend', () => {
    render(
      <PieChart
        title="Share"
        data={[
          { label: 'Direct', value: 60 },
          { label: 'Organic', value: 40 },
        ]}
      />,
    );
    expect(screen.getByText('Direct')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('DonutChart shows the center label', () => {
    render(
      <DonutChart
        title="Total"
        centerLabel="$1.2M"
        data={[
          { label: 'A', value: 1 },
          { label: 'B', value: 1 },
        ]}
      />,
    );
    expect(screen.getByText('$1.2M')).toBeInTheDocument();
  });
});

describe('RadarChart', () => {
  it('renders one axis label per axis', () => {
    render(
      <RadarChart
        title="Scorecard"
        axes={['Price', 'Quality', 'Speed']}
        series={[{ name: 'A', data: [50, 60, 70] }]}
      />,
    );
    ['Price', 'Quality', 'Speed'].forEach((a) => expect(screen.getByText(a)).toBeInTheDocument());
  });
});

describe('FunnelChart', () => {
  it('renders a trapezoid per stage', () => {
    const { container } = render(
      <FunnelChart
        title="Funnel"
        stages={[
          { label: 'Requested', value: 100 },
          { label: 'Approved', value: 50 },
        ]}
      />,
    );
    expect(container.querySelectorAll('polygon').length).toBe(2);
  });
});

describe('WaffleChart', () => {
  it('renders exactly 100 cells', () => {
    const { container } = render(
      <WaffleChart
        title="Status"
        data={[
          { label: 'Active', value: 70 },
          { label: 'Idle', value: 30 },
        ]}
      />,
    );
    expect(container.querySelectorAll('rect').length).toBe(100);
  });
});

describe('BulletChart', () => {
  it('exposes a token-bound qualitative range palette', () => {
    expect(BULLET_RANGE_COLORS.length).toBe(3);
    expect(BULLET_RANGE_COLORS.every((c) => c.startsWith('var(--ps-'))).toBe(true);
  });

  it('renders as an img with an accessible name', () => {
    render(
      <BulletChart
        title="KPI"
        rows={[{ label: 'Revenue', measure: 76, target: 85, ranges: [50, 75, 100] }]}
      />,
    );
    expect(screen.getByRole('img', { name: 'KPI' })).toBeInTheDocument();
  });

  it('renders a band per range, one measure bar and one target marker per row', () => {
    const { container } = render(
      <BulletChart
        title="KPI"
        rows={[
          { label: 'Revenue', measure: 76, target: 85, ranges: [50, 75, 100] },
          { label: 'Uptime', measure: 92, target: 90, ranges: [60, 80, 100] },
        ]}
      />,
    );
    // 2 rows × (3 range bands + 1 measure bar) = 8 rects
    expect(container.querySelectorAll('rect').length).toBe(8);
    // one target marker line per row
    expect(container.querySelectorAll('line').length).toBe(2);
  });

  it('labels each row and lists all series in the legend', () => {
    render(
      <BulletChart
        title="KPI"
        rows={[{ label: 'Revenue', measure: 76, target: 85, ranges: [50, 75, 100] }]}
      />,
    );
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Measure')).toBeInTheDocument();
    expect(screen.getByText('Target marker')).toBeInTheDocument();
  });
});

describe('Sparkline / Legend', () => {
  it('Sparkline renders an accessible trend', () => {
    render(<Sparkline data={[1, 3, 2, 5]} aria-label="Weekly trend" />);
    expect(screen.getByRole('img', { name: 'Weekly trend' })).toBeInTheDocument();
  });

  it('Legend renders swatch labels and values', () => {
    render(<Legend items={[{ label: 'Revenue', color: 'var(--ps-prim-blue-500)', value: '$1M' }]} />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$1M')).toBeInTheDocument();
  });
});

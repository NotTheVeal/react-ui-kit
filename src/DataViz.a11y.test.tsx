import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import {
  BarChart,
  LineChart,
  DonutChart,
  RadarChart,
  FunnelChart,
  WaffleChart,
  Sparkline,
} from './DataViz';

const months = ['Jan', 'Feb', 'Mar'];

describe('DataViz accessibility', () => {
  it('has no violations — BarChart', async () => {
    const { container } = render(
      <BarChart title="Spend" categories={months} series={[{ name: 'Revenue', data: [1, 2, 3] }]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — LineChart', async () => {
    const { container } = render(
      <LineChart
        title="Trend"
        categories={months}
        series={[
          { name: 'A', data: [1, 2, 3] },
          { name: 'B', data: [3, 2, 1] },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — DonutChart', async () => {
    const { container } = render(
      <DonutChart
        title="Share"
        centerLabel="$1M"
        data={[
          { label: 'A', value: 60 },
          { label: 'B', value: 40 },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — RadarChart', async () => {
    const { container } = render(
      <RadarChart title="Score" axes={['Price', 'Quality', 'Speed']} series={[{ name: 'A', data: [50, 60, 70] }]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — FunnelChart', async () => {
    const { container } = render(
      <FunnelChart
        title="Funnel"
        stages={[
          { label: 'Requested', value: 100 },
          { label: 'Approved', value: 50 },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — WaffleChart', async () => {
    const { container } = render(
      <WaffleChart title="Status" data={[{ label: 'Active', value: 100 }]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — Sparkline', async () => {
    const { container } = render(<Sparkline data={[1, 3, 2, 5]} aria-label="Trend" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

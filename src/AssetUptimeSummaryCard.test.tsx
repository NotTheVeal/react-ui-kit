import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AssetUptimeSummaryCard } from './AssetUptimeSummaryCard';

describe('AssetUptimeSummaryCard', () => {
  it('renders the default title and metric', () => {
    render(<AssetUptimeSummaryCard metric="98.6%" />);
    expect(screen.getByText('Fleet Uptime (30 days)')).toBeTruthy();
    expect(screen.getByText('98.6%')).toBeTruthy();
  });

  it('renders the trend value', () => {
    render(<AssetUptimeSummaryCard metric="98.6%" trendValue="1.2%" />);
    expect(screen.getByText('1.2%')).toBeTruthy();
  });

  it('renders legend entries', () => {
    render(<AssetUptimeSummaryCard metric="98.6%" />);
    expect(screen.getByText('Operational · 142')).toBeTruthy();
    expect(screen.getByText('Down · 2')).toBeTruthy();
  });
});

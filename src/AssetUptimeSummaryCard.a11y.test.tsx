import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AssetUptimeSummaryCard } from './AssetUptimeSummaryCard';

expect.extend(toHaveNoViolations);

describe('AssetUptimeSummaryCard a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <AssetUptimeSummaryCard metric="98.6%" trendValue="1.2%" trendDirection="up" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

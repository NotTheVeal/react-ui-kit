import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AiDataCard, ProductCard, AnalyticsCard, ListCard } from './CardExtras';

describe('CardExtras accessibility', () => {
  it('has no violations — AiDataCard', async () => {
    const { container } = render(
      <AiDataCard title="Sensor Board" manufacturer="Acme" cost="$1,200" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — AnalyticsCard', async () => {
    const { container } = render(<AnalyticsCard title="Orders" value="128" sub="this month" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — ListCard product', async () => {
    const { container } = render(
      <ListCard variant="product" title="Widget" price="$9.99" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

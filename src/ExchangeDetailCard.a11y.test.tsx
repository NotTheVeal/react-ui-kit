import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ExchangeDetailCard } from './ExchangeDetailCard';

expect.extend(toHaveNoViolations);

const items = [
  { label: 'Returning', name: 'X-RAY TUBE, 40/80 KW', meta: '$225.34 · Qty 1' },
  { label: 'Replacement', name: 'X-RAY TUBE, 40/80 KW (New)', meta: '$225.34 · Qty 1' },
];

describe('ExchangeDetailCard accessibility', () => {
  it('has no violations — full card', async () => {
    const { container } = render(
      <ExchangeDetailCard status="In Progress" items={items} note="Return the core within 30 days." />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — minimal card', async () => {
    const { container } = render(<ExchangeDetailCard items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

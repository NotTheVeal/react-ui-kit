import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AiDetailCard } from './AiDetailCard';

expect.extend(toHaveNoViolations);

const full = {
  orderNumber: '4821',
  status: 'Processing',
  aiSummary: 'On track to ship today.',
  product: { name: 'X-RAY TUBE, 40/80 KW', price: '$225.34', quantity: 1, detailsHref: '#' },
  facility: 'Mercy General',
  reference: 'REF-9021',
  po: 'PO-55231',
  deliveryStatus: { date: 'Arriving Thu, Aug 14' },
  feedback: { sourcesHref: '#', timestamp: '12:33 PM' },
};

describe('AiDetailCard accessibility', () => {
  it('has no violations — full card', async () => {
    const { container } = render(<AiDetailCard variant="full" {...full} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — drawer card', async () => {
    const { container } = render(<AiDetailCard variant="drawer" {...full} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — minimal card', async () => {
    const { container } = render(<AiDetailCard showAiSummary={false} showFeedbackRow={false} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

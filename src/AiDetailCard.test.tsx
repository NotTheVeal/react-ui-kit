import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AiDetailCard } from './AiDetailCard';

describe('AiDetailCard', () => {
  it('renders the order number in the header', () => {
    render(<AiDetailCard orderNumber="4821" />);
    expect(screen.getByText(/Order #: 4821/)).toBeInTheDocument();
  });

  it('renders the status badge', () => {
    render(<AiDetailCard status="Processing" />);
    expect(screen.getByText('Processing')).toBeInTheDocument();
  });

  it('renders the AI summary by default and hides it when toggled off', () => {
    const { rerender } = render(<AiDetailCard aiSummary="On track to ship today." />);
    expect(screen.getByText('On track to ship today.')).toBeInTheDocument();
    rerender(<AiDetailCard aiSummary="On track to ship today." showAiSummary={false} />);
    expect(screen.queryByText('On track to ship today.')).not.toBeInTheDocument();
  });

  it('renders the product name as a link', () => {
    render(<AiDetailCard product={{ name: 'X-RAY TUBE, 40/80 KW', detailsHref: '/p/1' }} />);
    expect(screen.getByRole('link', { name: 'X-RAY TUBE, 40/80 KW' })).toHaveAttribute(
      'href',
      '/p/1',
    );
  });

  it('renders price and quantity', () => {
    render(<AiDetailCard product={{ name: 'PART', price: '$225.34', quantity: 2 }} />);
    expect(screen.getByText('$225.34')).toBeInTheDocument();
    expect(screen.getByText('Qty 2')).toBeInTheDocument();
  });

  it('only renders detail rows that are both provided and enabled', () => {
    render(
      <AiDetailCard
        facility="Mercy General"
        vendor="GE Healthcare"
        showFacility
        showVendor={false}
      />,
    );
    expect(screen.getByText('Mercy General')).toBeInTheDocument();
    expect(screen.queryByText('GE Healthcare')).not.toBeInTheDocument();
  });

  it('renders the delivery-status date', () => {
    render(<AiDetailCard deliveryStatus={{ date: 'Arriving Thu, Aug 14' }} />);
    expect(screen.getByText('Arriving Thu, Aug 14')).toBeInTheDocument();
  });

  it('renders the feedback controls', () => {
    render(<AiDetailCard feedback={{ sourcesHref: '#', timestamp: '12:33 PM' }} />);
    expect(screen.getByRole('button', { name: 'Helpful' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Not helpful' })).toBeInTheDocument();
    expect(screen.getByText('12:33 PM')).toBeInTheDocument();
  });

  it('applies the drawer width variant', () => {
    const { container } = render(<AiDetailCard variant="drawer" />);
    expect(container.querySelector('.w-\\[354px\\]')).toBeTruthy();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ExchangeDetailCard } from './ExchangeDetailCard';

const items = [
  { label: 'Returning', name: 'X-RAY TUBE, 40/80 KW', meta: '$225.34 · Qty 1' },
  { label: 'Replacement', name: 'X-RAY TUBE, 40/80 KW (New)', meta: '$225.34 · Qty 1' },
];

describe('ExchangeDetailCard', () => {
  it('renders the default title', () => {
    render(<ExchangeDetailCard items={items} />);
    expect(screen.getByRole('heading', { name: /exchange details/i })).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<ExchangeDetailCard title="Swap Details" items={items} />);
    expect(screen.getByRole('heading', { name: /swap details/i })).toBeInTheDocument();
  });

  it('renders the status badge when provided', () => {
    render(<ExchangeDetailCard status="In Progress" items={items} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('does not render a status badge when omitted', () => {
    render(<ExchangeDetailCard items={items} />);
    expect(screen.queryByText('In Progress')).not.toBeInTheDocument();
  });

  it('renders each item row with label, name and meta', () => {
    render(<ExchangeDetailCard items={items} />);
    expect(screen.getByText('Returning')).toBeInTheDocument();
    expect(screen.getByText('Replacement')).toBeInTheDocument();
    expect(screen.getByText('X-RAY TUBE, 40/80 KW')).toBeInTheDocument();
    expect(screen.getByText('X-RAY TUBE, 40/80 KW (New)')).toBeInTheDocument();
    expect(screen.getAllByText('$225.34 · Qty 1')).toHaveLength(2);
  });

  it('renders the note when provided', () => {
    render(<ExchangeDetailCard items={items} note="Return the core within 30 days." />);
    expect(screen.getByText('Return the core within 30 days.')).toBeInTheDocument();
  });

  it('renders an image when imageUrl is given', () => {
    const { container } = render(
      <ExchangeDetailCard
        items={[{ label: 'Returning', name: 'PART', imageUrl: 'https://example.com/p.png' }]}
      />,
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', 'https://example.com/p.png');
  });
});

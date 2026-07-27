import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardBrandIcon } from './CardBrandIcon';

describe('CardBrandIcon', () => {
  it('renders with the brand display name as accessible label', () => {
    render(<CardBrandIcon brand="visa" />);
    expect(screen.getByRole('img', { name: 'Visa' })).toBeInTheDocument();
  });

  it('maps amex to its full network name', () => {
    render(<CardBrandIcon brand="amex" />);
    expect(screen.getByRole('img', { name: 'American Express' })).toBeInTheDocument();
  });

  it('honours a custom title', () => {
    render(<CardBrandIcon brand="mastercard" title="Card ending 4242" />);
    expect(screen.getByRole('img', { name: 'Card ending 4242' })).toBeInTheDocument();
  });

  it('renders every brand without error', () => {
    const { rerender } = render(<CardBrandIcon brand="visa" />);
    for (const brand of ['mastercard', 'amex', 'discover'] as const) {
      rerender(<CardBrandIcon brand={brand} />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    }
  });
});

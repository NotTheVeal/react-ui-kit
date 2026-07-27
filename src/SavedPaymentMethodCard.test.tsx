import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SavedPaymentMethodCard } from './SavedPaymentMethodCard';

describe('SavedPaymentMethodCard', () => {
  it('renders the brand, masked number and expiry', () => {
    render(<SavedPaymentMethodCard brand="mastercard" last4="4242" expires="08/27" />);
    expect(screen.getByText('Mastercard •••• 4242')).toBeInTheDocument();
    expect(screen.getByText('Expires 08/27')).toBeInTheDocument();
  });

  it('shows the Default pill only when isDefault', () => {
    const { rerender } = render(
      <SavedPaymentMethodCard brand="visa" last4="1881" expires="11/26" />,
    );
    expect(screen.queryByText('Default')).not.toBeInTheDocument();
    rerender(<SavedPaymentMethodCard brand="visa" last4="1881" expires="11/26" isDefault />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('fires onEdit and onRemove', () => {
    const onEdit = vi.fn();
    const onRemove = vi.fn();
    render(
      <SavedPaymentMethodCard
        brand="visa" last4="1881" expires="11/26"
        onEdit={onEdit} onRemove={onRemove}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('renders the brand icon with an accessible label', () => {
    render(<SavedPaymentMethodCard brand="visa" last4="1881" expires="11/26" />);
    expect(screen.getByRole('img', { name: 'Visa' })).toBeInTheDocument();
  });
});

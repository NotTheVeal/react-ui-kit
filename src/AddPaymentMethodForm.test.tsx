import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddPaymentMethodForm } from './AddPaymentMethodForm';

describe('AddPaymentMethodForm', () => {
  it('renders the default title and submit label', () => {
    render(<AddPaymentMethodForm />);
    expect(screen.getByText('Add Payment Method')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Save Card' })).toBeTruthy();
  });

  it('renders all four fields', () => {
    render(<AddPaymentMethodForm />);
    expect(screen.getByLabelText('Card number')).toBeTruthy();
    expect(screen.getByLabelText('Expiry')).toBeTruthy();
    expect(screen.getByLabelText('CVC')).toBeTruthy();
    expect(screen.getByLabelText('Name on card')).toBeTruthy();
  });

  it('emits the collected values on submit', () => {
    const onSubmit = vi.fn();
    render(<AddPaymentMethodForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Card number'), {
      target: { value: '4111111111111111' },
    });
    fireEvent.change(screen.getByLabelText('Expiry'), { target: { value: '12/28' } });
    fireEvent.change(screen.getByLabelText('CVC'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Name on card'), {
      target: { value: 'Jane Smith' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save Card' }));
    expect(onSubmit).toHaveBeenCalledWith({
      cardNumber: '4111111111111111',
      expiry: '12/28',
      cvc: '123',
      name: 'Jane Smith',
    });
  });

  it('honors custom title and submit label', () => {
    render(<AddPaymentMethodForm title="New Card" submitLabel="Add Card" />);
    expect(screen.getByText('New Card')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add Card' })).toBeTruthy();
  });
});

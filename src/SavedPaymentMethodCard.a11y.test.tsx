import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SavedPaymentMethodCard } from './SavedPaymentMethodCard';

expect.extend(toHaveNoViolations);

describe('SavedPaymentMethodCard accessibility', () => {
  it('has no violations — default card', async () => {
    const { container } = render(
      <SavedPaymentMethodCard brand="mastercard" last4="4242" expires="08/27" isDefault />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AddPaymentMethodForm } from './AddPaymentMethodForm';

expect.extend(toHaveNoViolations);

describe('AddPaymentMethodForm a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(<AddPaymentMethodForm />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

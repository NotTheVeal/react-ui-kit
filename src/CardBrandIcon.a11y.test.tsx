import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CardBrandIcon } from './CardBrandIcon';

expect.extend(toHaveNoViolations);

describe('CardBrandIcon accessibility', () => {
  it('has no violations across all brands', async () => {
    const { container } = render(
      <div>
        <CardBrandIcon brand="visa" />
        <CardBrandIcon brand="mastercard" />
        <CardBrandIcon brand="amex" />
        <CardBrandIcon brand="discover" />
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

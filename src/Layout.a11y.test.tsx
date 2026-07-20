import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Breadcrumb, Accordion, Stepper } from './Layout';

describe('Layout accessibility', () => {
  it('has no violations — Breadcrumb', async () => {
    const { container } = render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Pumps' },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — Accordion (open)', async () => {
    const { container } = render(
      <Accordion title="Details" open>
        Body content
      </Accordion>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — Stepper', async () => {
    const { container } = render(
      <Stepper
        steps={[
          { label: 'Cart', status: 'complete' },
          { label: 'Shipping', status: 'current' },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

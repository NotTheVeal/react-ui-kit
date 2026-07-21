import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { TopNav, LeftNav } from './Navigation';

describe('Navigation accessibility', () => {
  it('has no violations — TopNav', async () => {
    const { container } = render(<TopNav cartCount={2} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — LeftNav', async () => {
    const { container } = render(
      <LeftNav
        items={[
          { id: 'home', label: 'Home', active: true },
          { id: 'orders', label: 'Orders' },
        ]}
        onLogout={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Input, Dropdown } from './Input';

describe('Input accessibility', () => {
  it('has no violations — labeled input', async () => {
    const { container } = render(<Input label="Email" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — input with error', async () => {
    const { container } = render(<Input label="Email" error="Required" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — dropdown', async () => {
    const { container } = render(
      <Dropdown
        label="Pick one"
        options={[
          { label: 'Alpha', value: 'a' },
          { label: 'Beta', value: 'b' },
        ]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

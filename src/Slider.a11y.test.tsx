import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Slider } from './Slider';

describe('Slider accessibility', () => {
  it('has no violations — single', async () => {
    const { container } = render(<Slider label="Quantity" value={40} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — range', async () => {
    const { container } = render(<Slider type="range" label="Price" value={[20, 70]} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — disabled', async () => {
    const { container } = render(<Slider label="Locked" value={10} disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

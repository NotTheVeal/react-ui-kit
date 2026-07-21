import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Divider } from './Divider';

describe('Divider accessibility', () => {
  it('has no violations — horizontal', async () => {
    const { container } = render(<Divider />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — vertical', async () => {
    const { container } = render(
      <div style={{ display: 'flex' }}>
        <span>a</span>
        <Divider orientation="vertical" />
        <span>b</span>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Carousel } from './Carousel';

describe('Carousel accessibility', () => {
  it('has no violations — with header', async () => {
    const { container } = render(
      <Carousel title="You Left Off Here" linkLabel="View Shopping History">
        <div style={{ flex: '0 0 120px' }}>one</div>
        <div style={{ flex: '0 0 120px' }}>two</div>
      </Carousel>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — no header', async () => {
    const { container } = render(
      <Carousel aria-label="Recently viewed">
        <div style={{ flex: '0 0 120px' }}>one</div>
      </Carousel>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

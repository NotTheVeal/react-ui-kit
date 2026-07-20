import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders a semantic <hr> when horizontal', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('renders a role=separator element when vertical', () => {
    render(<Divider orientation="vertical" />);
    const sep = screen.getByRole('separator');
    expect(sep).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('applies spacing to margins', () => {
    const { container } = render(<Divider spacing={16} />);
    const hr = container.querySelector('hr')!;
    expect(hr.style.marginTop).toBe('16px');
    expect(hr.style.marginBottom).toBe('16px');
  });

  it('merges a custom className', () => {
    const { container } = render(<Divider className="my-rule" />);
    expect(container.querySelector('hr')).toHaveClass('my-rule');
  });
});

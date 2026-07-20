import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from './Slider';

describe('Slider (single)', () => {
  it('renders a labelled range input and value readout', () => {
    render(<Slider label="Quantity" value={40} showValue />);
    expect(screen.getByRole('slider')).toHaveValue('40');
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  it('fires onChange with a number', () => {
    const onChange = vi.fn();
    render(<Slider label="Quantity" value={40} onChange={onChange} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '55' } });
    expect(onChange).toHaveBeenCalledWith(55);
  });

  it('formats the value readout and end labels', () => {
    render(<Slider label="Budget" min={0} max={100} value={50} formatValue={(n) => `$${n}`} />);
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('disables the input when disabled', () => {
    render(<Slider label="Locked" value={10} disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  it('is keyboard-operable — a focusable native range with ARIA bounds', () => {
    render(<Slider label="Quantity" min={0} max={100} value={40} />);
    const slider = screen.getByRole('slider');
    expect(slider.tagName).toBe('INPUT');
    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    slider.focus();
    expect(slider).toHaveFocus();
  });
});

describe('Slider (range)', () => {
  it('renders two thumbs with distinct labels', () => {
    render(<Slider type="range" label="Price" value={[20, 70]} />);
    expect(screen.getByLabelText('Price minimum')).toHaveValue('20');
    expect(screen.getByLabelText('Price maximum')).toHaveValue('70');
  });

  it('keeps thumbs from crossing on change', () => {
    const onChange = vi.fn();
    render(<Slider type="range" label="Price" value={[20, 70]} onChange={onChange} />);
    // Push the low thumb past the high thumb — values should be reordered.
    fireEvent.change(screen.getByLabelText('Price minimum'), { target: { value: '90' } });
    expect(onChange).toHaveBeenCalledWith([70, 90]);
  });
});

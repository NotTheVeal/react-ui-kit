import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox, Radio, Toggle } from './Selections';

describe('Checkbox', () => {
  it('renders with role checkbox and its label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles and fires onChange (uncontrolled)', () => {
    const onChange = vi.fn();
    render(<Checkbox label="X" onChange={onChange} />);
    const box = screen.getByRole('checkbox');
    fireEvent.click(box);
    expect(onChange).toHaveBeenCalledWith(true);
    expect(box).toHaveAttribute('aria-checked', 'true');
  });

  it('reflects a controlled checked value', () => {
    render(<Checkbox label="X" checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
  });

  it('does not fire onChange when disabled', () => {
    const onChange = vi.fn();
    render(<Checkbox label="X" disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('toggles via keyboard', () => {
    const onChange = vi.fn();
    render(<Checkbox label="X" onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('checkbox'), { key: ' ' });
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe('Radio', () => {
  it('renders with role radio and its label', () => {
    render(<Radio label="Option A" value="a" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'false');
  });

  it('selects and fires onChange with the value', () => {
    const onChange = vi.fn();
    render(<Radio label="A" value="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).toHaveBeenCalledWith('a');
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
  });

  it('does not fire onChange when disabled', () => {
    const onChange = vi.fn();
    render(<Radio label="A" value="a" disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('Toggle', () => {
  it('renders as a switch with its label', () => {
    render(<Toggle label="Notifications" />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles and fires onChange', () => {
    const onChange = vi.fn();
    render(<Toggle onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('does not fire onChange when disabled', () => {
    const onChange = vi.fn();
    render(<Toggle disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

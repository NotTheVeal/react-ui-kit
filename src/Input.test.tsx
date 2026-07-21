import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input, Dropdown } from './Input';

describe('Input', () => {
  it('renders a labeled input', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('fires onChange when typed into (uncontrolled)', () => {
    const onChange = vi.fn();
    render(<Input label="Name" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('reflects a controlled value', () => {
    render(<Input label="City" value="Cleveland" onChange={() => {}} />);
    expect(screen.getByLabelText('City')).toHaveValue('Cleveland');
  });

  it('renders an error message', () => {
    render(<Input label="Email" error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('renders helper text when there is no error', () => {
    render(<Input label="Email" helperText="We will not share it" />);
    expect(screen.getByText('We will not share it')).toBeInTheDocument();
  });

  it('disables the input when disabled', () => {
    render(<Input label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });
});

describe('Dropdown', () => {
  const options = [
    { label: 'Alpha', value: 'a' },
    { label: 'Beta', value: 'b' },
  ];

  it('renders the field with its label', () => {
    render(<Dropdown label="Pick one" options={options} />);
    expect(screen.getByLabelText('Pick one')).toBeInTheDocument();
  });

  it('opens the menu on click and shows options', () => {
    render(<Dropdown label="Pick one" options={options} />);
    fireEvent.click(screen.getByLabelText('Pick one'));
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('fires onSelect with the chosen value', () => {
    const onSelect = vi.fn();
    render(<Dropdown label="Pick one" options={options} onSelect={onSelect} />);
    fireEvent.click(screen.getByLabelText('Pick one'));
    fireEvent.click(screen.getByText('Beta'));
    expect(onSelect).toHaveBeenCalledWith('b');
  });
});

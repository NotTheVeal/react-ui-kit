import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InlineSearch, HiddenSearch } from './Search';

describe('InlineSearch', () => {
  it('renders a searchbox with the placeholder as its accessible name', () => {
    render(<InlineSearch placeholder="Search" />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toBeInTheDocument();
  });

  it('fires onChange when typed into (uncontrolled)', () => {
    const onChange = vi.fn();
    render(<InlineSearch onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'pump' } });
    expect(onChange).toHaveBeenCalledWith('pump');
  });

  it('reflects a controlled value', () => {
    render(<InlineSearch value="valve" onChange={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveValue('valve');
  });

  it('fires onSearch on Enter', () => {
    const onSearch = vi.fn();
    render(<InlineSearch defaultValue="filter" onSearch={onSearch} />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter' });
    expect(onSearch).toHaveBeenCalledWith('filter');
  });

  it('fires onSearch when the magnifier button is clicked', () => {
    const onSearch = vi.fn();
    render(<InlineSearch defaultValue="filter" onSearch={onSearch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit search' }));
    expect(onSearch).toHaveBeenCalledWith('filter');
  });

  it('disables the field when disabled', () => {
    render(<InlineSearch disabled />);
    expect(screen.getByRole('searchbox')).toBeDisabled();
  });
});

describe('HiddenSearch', () => {
  it('renders an icon-only trigger when collapsed', () => {
    render(<HiddenSearch />);
    const trigger = screen.getByRole('button', { name: 'Open search' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });

  it('expands to a field when the trigger is clicked', () => {
    render(<HiddenSearch placeholder="Search this list" />);
    fireEvent.click(screen.getByRole('button', { name: 'Open search' }));
    expect(screen.getByRole('searchbox', { name: 'Search this list' })).toBeInTheDocument();
  });

  it('notifies onOpenChange when expanded', () => {
    const onOpenChange = vi.fn();
    render(<HiddenSearch onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open search' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('collapses on blur when the field is empty', () => {
    const onOpenChange = vi.fn();
    render(<HiddenSearch onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open search' }));
    fireEvent.blur(screen.getByRole('searchbox'));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it('stays open on blur when the field has a value', () => {
    render(<HiddenSearch defaultValue="pump" />);
    fireEvent.click(screen.getByRole('button', { name: 'Open search' }));
    fireEvent.blur(screen.getByRole('searchbox'));
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('fires onSearch on Enter', () => {
    const onSearch = vi.fn();
    render(<HiddenSearch open defaultValue="cable" onSearch={onSearch} />);
    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'Enter' });
    expect(onSearch).toHaveBeenCalledWith('cable');
  });
});

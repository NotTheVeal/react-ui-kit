import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterChip, FilterShell } from './Filter';

describe('FilterChip', () => {
  it('renders its label', () => {
    render(<FilterChip label="Brand: Acme" />);
    expect(screen.getByText('Brand: Acme')).toBeInTheDocument();
  });

  it('fires onRemove from the remove button', () => {
    const onRemove = vi.fn();
    render(<FilterChip label="Brand" onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove filter' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('hides the remove button when removable is false', () => {
    render(<FilterChip label="Brand" removable={false} />);
    expect(screen.queryByRole('button', { name: 'Remove filter' })).not.toBeInTheDocument();
  });
});

describe('FilterShell', () => {
  it('renders chips passed in', () => {
    render(<FilterShell chips={<FilterChip label="Status" />} />);
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders the add button with default label and fires onAddClick', () => {
    const onAddClick = vi.fn();
    render(<FilterShell onAddClick={onAddClick} />);
    fireEvent.click(screen.getByRole('button', { name: /add filter/i }));
    expect(onAddClick).toHaveBeenCalledTimes(1);
  });

  it('accepts a custom add label', () => {
    render(<FilterShell onAddClick={() => {}} addLabel="New filter" />);
    expect(screen.getByRole('button', { name: /new filter/i })).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<FilterShell>extra content</FilterShell>);
    expect(screen.getByText('extra content')).toBeInTheDocument();
  });
});

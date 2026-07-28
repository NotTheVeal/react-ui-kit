import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import {
  Filter,
  FilterChip,
  SaveFilterSetButton,
  SavedFilterCard,
  SaveFilterModal,
  type AppliedFilter,
} from './Filter';

const chips: AppliedFilter[] = [
  { id: 'a', facetId: 'facility', facetLabel: 'Facility', value: 'Hospital A' },
  { id: 'b', facetId: 'assetId', facetLabel: 'Asset ID', value: '44335453' },
];

describe('FilterChip', () => {
  it('renders a bold key and regular value', () => {
    render(<FilterChip filterKey="Facility" value="Hospital A" />);
    expect(screen.getByText('Facility:')).toBeInTheDocument();
    expect(screen.getByText('Hospital A')).toBeInTheDocument();
  });

  it('fires onRemove from the remove button', () => {
    const onRemove = vi.fn();
    render(<FilterChip filterKey="Facility" value="Hospital A" onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: /remove facility filter/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('hides the remove button when removable is false', () => {
    render(<FilterChip filterKey="Status" value="Ordered" removable={false} />);
    expect(screen.queryByRole('button', { name: /remove/i })).not.toBeInTheDocument();
  });

  it('supports a single-string label fallback', () => {
    render(<FilterChip label="In stock" />);
    expect(screen.getByText('In stock')).toBeInTheDocument();
  });
});

describe('Filter', () => {
  it('shows "Add a Filter" trigger by default', () => {
    render(<Filter />);
    expect(screen.getByText('Add a Filter')).toBeInTheDocument();
  });

  it('opens the facet dropdown and selecting a facet reveals the input', () => {
    render(<Filter />);
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    const listbox = screen.getByRole('listbox', { name: /available filters/i });
    fireEvent.click(within(listbox).getByText('Cost Center'));
    expect(screen.getByPlaceholderText('Enter Cost Center...')).toBeInTheDocument();
  });

  it('commits a text value on Enter and renders a chip', () => {
    const onChange = vi.fn();
    render(<Filter onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    fireEvent.click(within(screen.getByRole('listbox')).getByText('Cost Center'));
    const input = screen.getByPlaceholderText('Enter Cost Center...');
    fireEvent.change(input, { target: { value: 'CC-100' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByText('CC-100')).toBeInTheDocument();
  });

  it('splits comma-separated values into separate chips', () => {
    render(<Filter />);
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    fireEvent.click(within(screen.getByRole('listbox')).getByText('Facility'));
    const input = screen.getByPlaceholderText('Enter Facility...');
    fireEvent.change(input, { target: { value: 'Hospital A, Hospital B' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(screen.getByText('Hospital A')).toBeInTheDocument();
    expect(screen.getByText('Hospital B')).toBeInTheDocument();
  });

  it('renders applied chips plus Clear all / Save Filter Set actions', () => {
    render(<Filter defaultApplied={chips} />);
    expect(screen.getByText('Hospital A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save filter set/i })).toBeInTheDocument();
  });

  it('clears all chips', () => {
    render(<Filter defaultApplied={chips} />);
    fireEvent.click(screen.getByRole('button', { name: /clear all/i }));
    expect(screen.queryByText('Hospital A')).not.toBeInTheDocument();
  });

  it('fires onSaveSet with the current chips', () => {
    const onSaveSet = vi.fn();
    render(<Filter defaultApplied={chips} onSaveSet={onSaveSet} />);
    fireEvent.click(screen.getByRole('button', { name: /save filter set/i }));
    expect(onSaveSet).toHaveBeenCalledWith(chips);
  });
});

describe('SaveFilterSetButton', () => {
  it('renders a default label and fires onClick', () => {
    const onClick = vi.fn();
    render(<SaveFilterSetButton onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: /save filter set/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('SavedFilterCard', () => {
  it('shows the name, chips, and Apply Filter action', () => {
    render(<SavedFilterCard name="My Set" chips={chips} />);
    expect(screen.getByText('My Set')).toBeInTheDocument();
    expect(screen.getByText('Hospital A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /apply filter/i })).toBeInTheDocument();
  });

  it('renders the default badge when isDefault', () => {
    render(<SavedFilterCard name="My Set" chips={chips} isDefault />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('offers "Set as Default" when not default and fires the callback', () => {
    const onSetDefault = vi.fn();
    render(<SavedFilterCard name="My Set" chips={chips} onSetDefault={onSetDefault} />);
    fireEvent.click(screen.getByRole('button', { name: /set as default/i }));
    expect(onSetDefault).toHaveBeenCalledTimes(1);
  });

  it('swaps Apply for Save in edit mode', () => {
    render(<SavedFilterCard name="My Set" chips={chips} editing />);
    expect(screen.getByLabelText('Filter set name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});

describe('SaveFilterModal', () => {
  it('renders nothing when closed', () => {
    render(<SaveFilterModal open={false} chips={chips} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a labelled dialog with the chip preview when open', () => {
    render(<SaveFilterModal open chips={chips} />);
    const dialog = screen.getByRole('dialog', { name: /save filter selection/i });
    expect(within(dialog).getByText('Hospital A')).toBeInTheDocument();
  });

  it('fires onSave with the entered name', () => {
    const onSave = vi.fn();
    render(<SaveFilterModal open chips={chips} onSave={onSave} />);
    fireEvent.change(screen.getByLabelText('Filter name'), { target: { value: 'Weekly' } });
    fireEvent.click(screen.getByRole('button', { name: /save preset/i }));
    expect(onSave).toHaveBeenCalledWith('Weekly');
  });
});

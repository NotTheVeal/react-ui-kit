import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FolderTabs, SegmentedTabs, PillTabs } from './Tabs';

const items = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two', count: 5 },
  { id: 'three', label: 'Three', disabled: true },
];

describe('FolderTabs', () => {
  it('renders tabs with role tab and selects the first by default', () => {
    render(<FolderTabs items={items} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(screen.getByRole('tab', { name: /one/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders a count badge', () => {
    render(<FolderTabs items={items} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('fires onChange and updates selection when a tab is clicked', () => {
    const onChange = vi.fn();
    render(<FolderTabs items={items} onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: /two/i }));
    expect(onChange).toHaveBeenCalledWith('two');
    expect(screen.getByRole('tab', { name: /two/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('does not fire onChange for a disabled tab', () => {
    const onChange = vi.fn();
    render(<FolderTabs items={items} onChange={onChange} />);
    fireEvent.click(screen.getByRole('tab', { name: /three/i }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('respects a controlled activeId', () => {
    render(<FolderTabs items={items} activeId="two" />);
    expect(screen.getByRole('tab', { name: /two/i })).toHaveAttribute('aria-selected', 'true');
  });
});

describe('SegmentedTabs', () => {
  it('renders all items and fires onChange', () => {
    const onChange = vi.fn();
    render(<SegmentedTabs items={items} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /two/i }));
    expect(onChange).toHaveBeenCalledWith('two');
  });
});

describe('PillTabs', () => {
  it('renders all items and fires onChange', () => {
    const onChange = vi.fn();
    render(<PillTabs items={items} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /two/i }));
    expect(onChange).toHaveBeenCalledWith('two');
  });

  it('does not fire onChange for a disabled item', () => {
    const onChange = vi.fn();
    render(<PillTabs items={items} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /three/i }));
    expect(onChange).not.toHaveBeenCalled();
  });
});

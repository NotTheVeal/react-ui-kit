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

  it('uses roving tabindex — only the active tab is in the tab order', () => {
    render(<FolderTabs items={items} />);
    expect(screen.getByRole('tab', { name: /one/i })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: /two/i })).toHaveAttribute('tabindex', '-1');
  });

  it('moves selection with ArrowRight and skips disabled tabs (wrapping)', () => {
    const onChange = vi.fn();
    render(<FolderTabs items={items} onChange={onChange} />);
    const one = screen.getByRole('tab', { name: /one/i });

    fireEvent.keyDown(one, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenLastCalledWith('two');
    expect(screen.getByRole('tab', { name: /two/i })).toHaveAttribute('aria-selected', 'true');

    // 'three' is disabled, so ArrowRight from 'two' wraps back to 'one'.
    fireEvent.keyDown(screen.getByRole('tab', { name: /two/i }), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenLastCalledWith('one');
  });

  it('ArrowLeft wraps past disabled tabs; Home/End jump to the ends', () => {
    const onChange = vi.fn();
    render(<FolderTabs items={items} onChange={onChange} />);
    const one = screen.getByRole('tab', { name: /one/i });

    fireEvent.keyDown(one, { key: 'ArrowLeft' }); // wraps past disabled 'three' to 'two'
    expect(onChange).toHaveBeenLastCalledWith('two');

    fireEvent.keyDown(screen.getByRole('tab', { name: /two/i }), { key: 'Home' });
    expect(onChange).toHaveBeenLastCalledWith('one');

    fireEvent.keyDown(screen.getByRole('tab', { name: /one/i }), { key: 'End' });
    expect(onChange).toHaveBeenLastCalledWith('two'); // last enabled
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

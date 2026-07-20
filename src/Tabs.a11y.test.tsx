import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FolderTabs, SegmentedTabs, PillTabs } from './Tabs';

const items = [
  { id: 'one', label: 'One' },
  { id: 'two', label: 'Two', count: 5 },
];

describe('Tabs accessibility', () => {
  it('has no violations — FolderTabs', async () => {
    const { container } = render(<FolderTabs items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — SegmentedTabs', async () => {
    const { container } = render(<SegmentedTabs items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — PillTabs', async () => {
    const { container } = render(<PillTabs items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

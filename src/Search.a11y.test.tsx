import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { InlineSearch, HiddenSearch } from './Search';

describe('Search accessibility', () => {
  it('has no violations — inline search', async () => {
    const { container } = render(<InlineSearch placeholder="Search" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — inline search disabled', async () => {
    const { container } = render(<InlineSearch placeholder="Search" disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — hidden search collapsed', async () => {
    const { container } = render(<HiddenSearch />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — hidden search expanded', async () => {
    const { container } = render(<HiddenSearch open placeholder="Search this list" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FilterChip, FilterShell } from './Filter';

describe('Filter accessibility', () => {
  it('has no violations — FilterChip', async () => {
    const { container } = render(<FilterChip label="Brand: Acme" onRemove={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — FilterShell', async () => {
    const { container } = render(
      <FilterShell chips={<FilterChip label="Status" />} onAddClick={() => {}} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

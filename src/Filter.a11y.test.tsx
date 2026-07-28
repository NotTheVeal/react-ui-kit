import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Filter, FilterChip, SavedFilterCard, SaveFilterModal, type AppliedFilter } from './Filter';

const chips: AppliedFilter[] = [
  { id: 'a', facetId: 'facility', facetLabel: 'Facility', value: 'Hospital A' },
  { id: 'b', facetId: 'assetId', facetLabel: 'Asset ID', value: '44335453' },
];

describe('Filter accessibility', () => {
  it('has no violations — FilterChip', async () => {
    const { container } = render(<FilterChip filterKey="Brand" value="Acme" onRemove={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — Filter bar with chips', async () => {
    const { container } = render(<Filter defaultApplied={chips} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — SavedFilterCard', async () => {
    const { container } = render(<SavedFilterCard name="My Set" chips={chips} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — SaveFilterModal', async () => {
    const { container } = render(<SaveFilterModal open chips={chips} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Pagination, DatePicker } from './Controls';

describe('Controls accessibility', () => {
  it('has no violations — Pagination', async () => {
    const { container } = render(
      <Pagination
        page={3}
        totalPages={10}
        total={95}
        pageSize={10}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — DatePicker range', async () => {
    const { container } = render(<DatePicker range />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

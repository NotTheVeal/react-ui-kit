import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination, DatePicker } from './Controls';

describe('Pagination', () => {
  it('renders a results summary when total and pageSize are given', () => {
    render(
      <Pagination page={1} totalPages={10} total={95} pageSize={10} onPageChange={() => {}} />,
    );
    expect(screen.getByText(/of/)).toBeInTheDocument();
    expect(screen.getByText('95')).toBeInTheDocument();
  });

  it('marks the active page with aria-current', () => {
    render(<Pagination page={3} totalPages={10} onPageChange={() => {}} />);
    const current = screen.getByRole('button', { name: '3' });
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('fires onPageChange from the next button', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={10} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables the previous button on the first page', () => {
    render(<Pagination page={1} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  it('fires onPageChange when a numbered page is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: '4' }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('fires onPageSizeChange from the page-size select', () => {
    const onPageSizeChange = vi.fn();
    render(
      <Pagination
        page={1}
        totalPages={10}
        total={95}
        pageSize={10}
        onPageChange={() => {}}
        onPageSizeChange={onPageSizeChange}
      />,
    );
    fireEvent.change(screen.getByLabelText('Items per page'), { target: { value: '25' } });
    expect(onPageSizeChange).toHaveBeenCalledWith(25);
  });
});

describe('DatePicker', () => {
  it('renders start and end fields in range mode', () => {
    render(<DatePicker range />);
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
  });

  it('renders a single field when range is false', () => {
    render(<DatePicker range={false} />);
    expect(screen.getByLabelText('Select Date')).toBeInTheDocument();
    expect(screen.queryByLabelText('End Date')).not.toBeInTheDocument();
  });

  it('opens the calendar when the field is triggered', () => {
    render(<DatePicker range={false} />);
    fireEvent.click(screen.getByLabelText('Select Date'));
    expect(screen.getByRole('button', { name: 'Next month' })).toBeInTheDocument();
  });

  it('shows an error message when error is provided', () => {
    render(<DatePicker error="Invalid range" />);
    expect(screen.getByText('Invalid range')).toBeInTheDocument();
  });
});

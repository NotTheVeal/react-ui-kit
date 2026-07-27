import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReturnEligibilityCard } from './ReturnEligibilityCard';

describe('ReturnEligibilityCard', () => {
  it('renders the default title', () => {
    render(<ReturnEligibilityCard reason="Item arrived damaged" />);
    expect(screen.getByRole('heading', { name: /return eligibility/i })).toBeInTheDocument();
  });

  it('renders the reason label and text', () => {
    render(<ReturnEligibilityCard reason="Item arrived damaged or defective" />);
    expect(screen.getByText('Return reason')).toBeInTheDocument();
    expect(screen.getByText('Item arrived damaged or defective')).toBeInTheDocument();
  });

  it('renders the status badge when provided', () => {
    render(<ReturnEligibilityCard status="Eligible" reason="x" />);
    expect(screen.getByText('Eligible')).toBeInTheDocument();
  });

  it('renders the upload zone as a button by default', () => {
    render(<ReturnEligibilityCard reason="x" />);
    expect(screen.getByRole('button', { name: /upload photos of the item/i })).toBeInTheDocument();
    expect(screen.getByText('PNG or JPG, up to 10MB')).toBeInTheDocument();
  });

  it('fires onUpload when the upload zone is clicked', () => {
    const onUpload = vi.fn();
    render(<ReturnEligibilityCard reason="x" onUpload={onUpload} />);
    fireEvent.click(screen.getByRole('button', { name: /upload photos/i }));
    expect(onUpload).toHaveBeenCalledTimes(1);
  });

  it('hides the upload zone when showUpload is false', () => {
    render(<ReturnEligibilityCard reason="x" showUpload={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies a custom reason label', () => {
    render(<ReturnEligibilityCard reasonLabel="Why returning" reason="x" />);
    expect(screen.getByText('Why returning')).toBeInTheDocument();
  });
});

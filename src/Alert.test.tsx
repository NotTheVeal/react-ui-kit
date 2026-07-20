import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert, Toast } from './Alert';

describe('Alert', () => {
  it('renders its children', () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('uses role="status" for info/success and role="alert" for warning/fail', () => {
    const { rerender } = render(<Alert severity="info">info</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<Alert severity="success">success</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();

    rerender(<Alert severity="warning">warning</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<Alert severity="fail">fail</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders a dismiss button only when onDismiss is provided', () => {
    const { rerender } = render(<Alert>no dismiss</Alert>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();

    const onDismiss = vi.fn();
    rerender(<Alert onDismiss={onDismiss}>dismissable</Alert>);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders provided actions', () => {
    render(<Alert actions={<button>Undo</button>}>with actions</Alert>);
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
  });
});

describe('Toast', () => {
  it('renders its children with role="status"', () => {
    render(<Toast>Saved</Toast>);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
  });

  it('fires onDismiss from the dismiss button', () => {
    const onDismiss = vi.fn();
    render(<Toast onDismiss={onDismiss}>Saved</Toast>);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

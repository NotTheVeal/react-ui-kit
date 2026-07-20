import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('renders the default prompt and hint', () => {
    render(<FileUpload />);
    expect(screen.getByText('Drag & drop files here')).toBeInTheDocument();
    expect(screen.getByText(/Accepted: PDF/)).toBeInTheDocument();
  });

  it('shows a progressbar with the current value while uploading', () => {
    render(<FileUpload state="uploading" progress={60} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '60');
    expect(screen.getByText('Uploading… 60%')).toBeInTheDocument();
  });

  it('clamps out-of-range progress', () => {
    render(<FileUpload state="uploading" progress={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('renders the complete state', () => {
    render(<FileUpload state="complete" />);
    expect(screen.getByText('Upload complete!')).toBeInTheDocument();
  });

  it('renders the error state with a retry button', () => {
    render(<FileUpload state="error" />);
    expect(screen.getByText('Upload failed')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('surfaces dropped files via onFilesSelected', () => {
    const onFilesSelected = vi.fn();
    render(<FileUpload onFilesSelected={onFilesSelected} aria-label="Upload area" />);
    const zone = screen.getByLabelText('Upload area');
    const file = new File(['x'], 'a.pdf', { type: 'application/pdf' });
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFilesSelected).toHaveBeenCalled();
  });
});

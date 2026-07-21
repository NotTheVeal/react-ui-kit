import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FileUpload } from './FileUpload';

describe('FileUpload accessibility', () => {
  it('has no violations — default', async () => {
    const { container } = render(<FileUpload aria-label="Upload area" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — uploading', async () => {
    const { container } = render(<FileUpload state="uploading" progress={60} aria-label="Upload area" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — error', async () => {
    const { container } = render(<FileUpload state="error" aria-label="Upload area" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders as a modal dialog with title and children', () => {
    render(
      <Drawer open title="Filters" onClose={() => {}}>
        Drawer body
      </Drawer>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByRole('heading', { name: 'Filters' })).toBeInTheDocument();
    expect(screen.getByText('Drawer body')).toBeInTheDocument();
  });

  it('renders subtitle and footer content', () => {
    render(
      <Drawer open title="T" subtitle="Refine results" footer={<button>Apply</button>} onClose={() => {}}>
        body
      </Drawer>,
    );
    expect(screen.getByText('Refine results')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
  });

  it('fires onClose from the close button', () => {
    const onClose = vi.fn();
    render(
      <Drawer open title="T" onClose={onClose}>
        body
      </Drawer>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('fires onClose when Escape is pressed while open', () => {
    const onClose = vi.fn();
    render(
      <Drawer open title="T" onClose={onClose}>
        body
      </Drawer>,
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('marks the dialog aria-hidden when closed', () => {
    render(
      <Drawer open={false} title="T" onClose={() => {}}>
        body
      </Drawer>,
    );
    expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('aria-hidden', 'true');
  });
});

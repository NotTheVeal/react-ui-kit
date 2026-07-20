import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popover } from './Popover';

describe('Popover', () => {
  it('renders title and body as a dialog', () => {
    render(
      <Popover title="Popover Title" onClose={() => {}}>
        Supporting text.
      </Popover>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Popover Title' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Supporting text.')).toBeInTheDocument();
  });

  it('fires onClose from the × button', () => {
    const onClose = vi.fn();
    render(
      <Popover title="Title" onClose={onClose}>
        body
      </Popover>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders CTA actions and fires their handlers', () => {
    const primary = vi.fn();
    const secondary = vi.fn();
    render(
      <Popover
        variant="cta"
        title="Delete Item"
        confirmTone="danger"
        primaryAction={{ label: 'Delete', onClick: primary }}
        secondaryAction={{ label: 'Cancel', onClick: secondary }}
      >
        This will permanently remove the item.
      </Popover>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(secondary).toHaveBeenCalledTimes(1);
    expect(primary).toHaveBeenCalledTimes(1);
  });

  it('omits the header in textOnly variant', () => {
    render(<Popover variant="textOnly">Just a hint</Popover>);
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    expect(screen.getByText('Just a hint')).toBeInTheDocument();
  });
});

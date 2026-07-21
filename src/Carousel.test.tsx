import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Carousel } from './Carousel';

describe('Carousel', () => {
  it('renders header title and link', () => {
    render(
      <Carousel title="You Left Off Here" linkLabel="View Shopping History">
        <div>one</div>
      </Carousel>,
    );
    expect(screen.getByText('You Left Off Here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view shopping history/i })).toBeInTheDocument();
  });

  it('fires onLinkClick', () => {
    const onLinkClick = vi.fn();
    render(
      <Carousel title="X" linkLabel="See all" onLinkClick={onLinkClick}>
        <div>one</div>
      </Carousel>,
    );
    fireEvent.click(screen.getByRole('button', { name: /see all/i }));
    expect(onLinkClick).toHaveBeenCalledTimes(1);
  });

  it('exposes prev/next controls and a labelled scroll group', () => {
    render(
      <Carousel aria-label="Recently viewed">
        <div>one</div>
        <div>two</div>
      </Carousel>,
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Recently viewed' })).toBeInTheDocument();
  });

  it('disables the previous control at the start', () => {
    render(
      <Carousel>
        <div>one</div>
      </Carousel>,
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
  });

  it('renders paging controls and the header link as keyboard-operable native buttons', () => {
    render(
      <Carousel title="X" linkLabel="See all" onLinkClick={() => {}}>
        <div>one</div>
        <div>two</div>
      </Carousel>,
    );
    // Arrows are native buttons (keyboard-operable; disabled at the scroll edges).
    expect(screen.getByRole('button', { name: 'Previous' }).tagName).toBe('BUTTON');
    expect(screen.getByRole('button', { name: 'Next' }).tagName).toBe('BUTTON');
    // The header link is always enabled, so it can hold focus for keyboard users.
    const link = screen.getByRole('button', { name: /see all/i });
    link.focus();
    expect(link).toHaveFocus();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewsFeedItem } from './NewsFeedItem';

const base = {
  category: 'Product Update',
  headline: 'New asset uptime heatmap now available in the dashboard',
  date: 'Jul 20, 2026',
  readTime: '2 min read',
};

describe('NewsFeedItem', () => {
  it('renders category, headline and meta', () => {
    render(<NewsFeedItem {...base} />);
    expect(screen.getByText('Product Update')).toBeTruthy();
    expect(
      screen.getByText('New asset uptime heatmap now available in the dashboard'),
    ).toBeTruthy();
    expect(screen.getByText('Jul 20, 2026 · 2 min read')).toBeTruthy();
  });

  it('renders as an article when not interactive', () => {
    const { container } = render(<NewsFeedItem {...base} />);
    expect(container.querySelector('article')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders as a button and fires onClick when interactive', () => {
    const onClick = vi.fn();
    render(<NewsFeedItem {...base} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

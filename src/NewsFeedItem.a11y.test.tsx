import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NewsFeedItem } from './NewsFeedItem';

expect.extend(toHaveNoViolations);

describe('NewsFeedItem a11y', () => {
  it('has no axe violations (static)', async () => {
    const { container } = render(
      <NewsFeedItem
        category="Product Update"
        headline="New asset uptime heatmap now available in the dashboard"
        date="Jul 20, 2026"
        readTime="2 min read"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations (interactive)', async () => {
    const { container } = render(
      <NewsFeedItem
        category="Product Update"
        headline="New asset uptime heatmap now available in the dashboard"
        date="Jul 20, 2026"
        readTime="2 min read"
        onClick={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

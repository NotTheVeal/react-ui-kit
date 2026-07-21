import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageShell } from './PageShell';

describe('PageShell', () => {
  it('renders its children', () => {
    render(
      <PageShell>
        <p>Page content</p>
      </PageShell>,
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('wraps content in the centered inner container', () => {
    const { container } = render(
      <PageShell>
        <span>x</span>
      </PageShell>,
    );
    expect(container.querySelector('.ps-page-shell')).toBeInTheDocument();
    expect(container.querySelector('.ps-page-shell__inner')).toBeInTheDocument();
  });

  it('injects its scoped stylesheet once', () => {
    render(
      <PageShell>
        <span>a</span>
      </PageShell>,
    );
    render(
      <PageShell>
        <span>b</span>
      </PageShell>,
    );
    expect(document.querySelectorAll('#ps-pageshell-styles')).toHaveLength(1);
  });
});

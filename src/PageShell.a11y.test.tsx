import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { PageShell } from './PageShell';

describe('PageShell accessibility', () => {
  it('has no violations', async () => {
    const { container } = render(
      <PageShell>
        <main>
          <h1>Request Depot</h1>
          <p>Content</p>
        </main>
      </PageShell>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

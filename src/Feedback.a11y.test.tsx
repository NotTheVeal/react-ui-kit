import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Avatar, Tooltip, EmptyState, ErrorPage } from './Feedback';

describe('Feedback accessibility', () => {
  it('has no violations — Avatar with image', async () => {
    const { container } = render(<Avatar src="/x.png" name="Jane Doe" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — Tooltip', async () => {
    const { container } = render(
      <Tooltip label="Helpful hint">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — EmptyState', async () => {
    const { container } = render(
      <EmptyState title="No results" body="Try again" primaryAction={{ label: 'Reset' }} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — ErrorPage', async () => {
    const { container } = render(
      <ErrorPage code="404" title="Not found" primaryAction={{ label: 'Home' }} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

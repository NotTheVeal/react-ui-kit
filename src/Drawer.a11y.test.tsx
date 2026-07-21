import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Drawer } from './Drawer';

describe('Drawer accessibility', () => {
  it('has no violations — open with title and footer', async () => {
    const { container } = render(
      <Drawer open title="Filters" subtitle="Refine" footer={<button>Apply</button>} onClose={() => {}}>
        <p>Drawer body content</p>
      </Drawer>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

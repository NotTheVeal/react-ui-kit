import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Popover } from './Popover';

describe('Popover accessibility', () => {
  it('has no violations — default', async () => {
    const { container } = render(
      <Popover title="Popover Title" onClose={() => {}}>
        Supporting text goes here.
      </Popover>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — cta', async () => {
    const { container } = render(
      <Popover
        variant="cta"
        title="Delete Item"
        confirmTone="danger"
        primaryAction={{ label: 'Delete', onClick: () => {} }}
        secondaryAction={{ label: 'Cancel', onClick: () => {} }}
      >
        This will permanently remove the item.
      </Popover>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — textOnly', async () => {
    const { container } = render(<Popover variant="textOnly" aria-label="Hint">Just a hint</Popover>);
    expect(await axe(container)).toHaveNoViolations();
  });
});

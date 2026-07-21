import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Checkbox, Radio, Toggle } from './Selections';

describe('Selections accessibility', () => {
  it('has no violations — Checkbox', async () => {
    const { container } = render(<Checkbox label="Accept terms" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — Radio', async () => {
    const { container } = render(<Radio label="Option A" value="a" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — Toggle', async () => {
    const { container } = render(<Toggle label="Notifications" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

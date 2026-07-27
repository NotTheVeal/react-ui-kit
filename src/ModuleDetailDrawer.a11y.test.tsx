import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ModuleDetailDrawer } from './ModuleDetailDrawer';

expect.extend(toHaveNoViolations);

describe('ModuleDetailDrawer a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <ModuleDetailDrawer
        open
        onClose={() => {}}
        title="Ultrasound Fundamentals"
        overview="Interactive XR training module."
        lessons={[{ id: '1', label: 'Probe handling basics', duration: '8 min' }]}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

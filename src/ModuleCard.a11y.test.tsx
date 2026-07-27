import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ModuleCard } from './ModuleCard';

expect.extend(toHaveNoViolations);

describe('ModuleCard a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <ModuleCard
        title="Ultrasound Fundamentals"
        description="Interactive XR training module."
        duration="45 min"
        level="Intermediate"
        status="installed"
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

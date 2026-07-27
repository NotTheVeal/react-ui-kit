import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NotificationCard } from './NotificationCard';

expect.extend(toHaveNoViolations);

describe('NotificationCard a11y', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <NotificationCard
        title="Asset offline: CT-02"
        message="Radiology CT scanner reported a connectivity loss 4 minutes ago."
        timestamp="4 min ago"
        unread
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

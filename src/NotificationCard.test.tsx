import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotificationCard } from './NotificationCard';

const base = {
  title: 'Asset offline: CT-02',
  message: 'Radiology CT scanner reported a connectivity loss 4 minutes ago.',
  timestamp: '4 min ago',
};

describe('NotificationCard', () => {
  it('renders title, message and timestamp', () => {
    render(<NotificationCard {...base} />);
    expect(screen.getByText('Asset offline: CT-02')).toBeTruthy();
    expect(
      screen.getByText('Radiology CT scanner reported a connectivity loss 4 minutes ago.'),
    ).toBeTruthy();
    expect(screen.getByText('4 min ago')).toBeTruthy();
  });

  it('shows the unread indicator when unread', () => {
    render(<NotificationCard {...base} unread />);
    expect(screen.getByRole('img', { name: 'Unread' })).toBeTruthy();
  });

  it('hides the unread indicator when read', () => {
    render(<NotificationCard {...base} unread={false} />);
    expect(screen.queryByRole('img', { name: 'Unread' })).toBeNull();
  });
});

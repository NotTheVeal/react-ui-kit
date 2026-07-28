import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModuleCard } from './ModuleCard';

const base = {
  title: 'Ultrasound Fundamentals',
  description: 'Interactive XR training module.',
  duration: '45 min',
  level: 'Intermediate',
};

describe('ModuleCard', () => {
  it('renders title, description and meta', () => {
    render(<ModuleCard {...base} />);
    expect(screen.getByText('Ultrasound Fundamentals')).toBeTruthy();
    expect(screen.getByText('Interactive XR training module.')).toBeTruthy();
    expect(screen.getByText('45 min')).toBeTruthy();
    expect(screen.getByText('Intermediate')).toBeTruthy();
  });

  it('shows the status label for the given status', () => {
    render(<ModuleCard {...base} status="installed" />);
    expect(screen.getByText('Installed')).toBeTruthy();
  });

  it('fires onLaunch when the CTA is clicked', () => {
    const onLaunch = vi.fn();
    render(<ModuleCard {...base} onLaunch={onLaunch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Launch Module' }));
    expect(onLaunch).toHaveBeenCalledTimes(1);
  });

  it('honors a custom CTA label', () => {
    render(<ModuleCard {...base} ctaLabel="Resume" />);
    expect(screen.getByRole('button', { name: 'Resume' })).toBeTruthy();
  });
});

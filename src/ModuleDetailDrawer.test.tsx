import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModuleDetailDrawer } from './ModuleDetailDrawer';

const lessons = [
  { id: '1', label: 'Probe handling basics', duration: '8 min', complete: true },
  { id: '2', label: 'Imaging planes', duration: '12 min' },
];

const base = {
  open: true,
  onClose: () => {},
  title: 'Ultrasound Fundamentals',
  overview: 'Interactive XR training module.',
  lessons,
};

describe('ModuleDetailDrawer', () => {
  it('renders the title and both tabs', () => {
    render(<ModuleDetailDrawer {...base} />);
    expect(screen.getByText('Ultrasound Fundamentals')).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Curriculum' })).toBeTruthy();
  });

  it('shows overview copy by default', () => {
    render(<ModuleDetailDrawer {...base} />);
    expect(screen.getByText('Interactive XR training module.')).toBeTruthy();
  });

  it('switches to the curriculum tab on click', () => {
    render(<ModuleDetailDrawer {...base} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Curriculum' }));
    expect(screen.getByText('Probe handling basics')).toBeTruthy();
    expect(screen.getByText('Imaging planes')).toBeTruthy();
  });

  it('fires onLaunch from the footer CTA', () => {
    const onLaunch = vi.fn();
    render(<ModuleDetailDrawer {...base} onLaunch={onLaunch} />);
    fireEvent.click(screen.getByRole('button', { name: 'Launch Module' }));
    expect(onLaunch).toHaveBeenCalledTimes(1);
  });
});

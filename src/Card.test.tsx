import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EventCard, StatusCard, AlertCard } from './Card';

describe('EventCard', () => {
  it('renders title, subtitle, and meta rows', () => {
    render(
      <EventCard
        title="Repair Order"
        subtitle="#12345"
        meta={[
          { label: 'Status', value: 'Open' },
          { label: 'Due', value: 'Tomorrow' },
        ]}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Repair Order' })).toBeInTheDocument();
    expect(screen.getByText('#12345')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('Due:')).toBeInTheDocument();
  });

  it('renders the default CTA label and fires onCtaClick', () => {
    const onCtaClick = vi.fn();
    render(<EventCard title="T" meta={[]} onCtaClick={onCtaClick} />);
    const cta = screen.getByRole('button', { name: /view details/i });
    fireEvent.click(cta);
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it('accepts a custom CTA label', () => {
    render(<EventCard title="T" meta={[]} ctaLabel="Open Ticket" />);
    expect(screen.getByRole('button', { name: /open ticket/i })).toBeInTheDocument();
  });
});

describe('StatusCard', () => {
  it('renders title and meta and fires onClick', () => {
    const onClick = vi.fn();
    render(<StatusCard title="Pump A" meta="Building 3" onClick={onClick} />);
    expect(screen.getByText('Pump A')).toBeInTheDocument();
    expect(screen.getByText('Building 3')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Pump A'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('AlertCard', () => {
  it('renders title and subtitle', () => {
    render(<AlertCard title="Device offline" subtitle="MRI Suite" />);
    expect(screen.getByText('Device offline')).toBeInTheDocument();
    expect(screen.getByText('MRI Suite')).toBeInTheDocument();
  });

  it('renders location and datetime when provided', () => {
    render(<AlertCard title="T" location="Wing B" datetime="10:30 AM" />);
    expect(screen.getByText('Wing B')).toBeInTheDocument();
    expect(screen.getByText('10:30 AM')).toBeInTheDocument();
  });

  it.each(['info', 'warning', 'error', 'success'] as const)(
    'renders the %s severity',
    (severity) => {
      render(<AlertCard title={`sev-${severity}`} severity={severity} />);
      expect(screen.getByText(`sev-${severity}`)).toBeInTheDocument();
    },
  );
});

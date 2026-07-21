import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Breadcrumb, BreadcrumbBack, Accordion, AccordionCount, Stepper } from './Layout';

describe('Breadcrumb', () => {
  it('renders parent links and the current page in a labeled nav', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Catalog', href: '/catalog' },
          { label: 'Pumps' },
        ]}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Catalog' })).toBeInTheDocument();
    expect(screen.getByText('Pumps')).toBeInTheDocument();
  });

  it('renders nothing when items is empty', () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('BreadcrumbBack', () => {
  it('renders a back link with its label and href', () => {
    render(<BreadcrumbBack label="Back to results" href="/results" />);
    expect(screen.getByRole('link', { name: /back to results/i })).toHaveAttribute('href', '/results');
  });
});

describe('Accordion', () => {
  it('renders a collapsed header button by default', () => {
    render(<Accordion title="Details">Hidden body</Accordion>);
    const btn = screen.getByRole('button', { name: /details/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles open on click and fires onToggle', () => {
    const onToggle = vi.fn();
    render(
      <Accordion title="Details" onToggle={onToggle}>
        Body
      </Accordion>,
    );
    const btn = screen.getByRole('button', { name: /details/i });
    fireEvent.click(btn);
    expect(onToggle).toHaveBeenCalledWith(true);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects a controlled open prop', () => {
    render(
      <Accordion title="Details" open>
        Body
      </Accordion>,
    );
    expect(screen.getByRole('button', { name: /details/i })).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('AccordionCount', () => {
  it('renders its children', () => {
    render(<AccordionCount>3</AccordionCount>);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});

describe('Stepper', () => {
  it('renders steps in a labeled ordered list', () => {
    render(
      <Stepper
        ariaLabel="Checkout progress"
        steps={[
          { label: 'Cart', status: 'complete' },
          { label: 'Shipping', status: 'current' },
          { label: 'Payment', status: 'pending' },
        ]}
      />,
    );
    expect(screen.getByRole('list', { name: 'Checkout progress' })).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Shipping')).toBeInTheDocument();
  });

  it('marks the current step with aria-current', () => {
    render(
      <Stepper
        steps={[
          { id: 'a', label: 'A', status: 'complete' },
          { id: 'b', label: 'B', status: 'current' },
        ]}
      />,
    );
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
  });
});

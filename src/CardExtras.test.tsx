import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AiDataCard, ProductCard, AnalyticsCard, ListCard } from './CardExtras';

describe('AiDataCard', () => {
  it('renders title, manufacturer, badges, and cost', () => {
    render(
      <AiDataCard
        title="Sensor Board"
        manufacturer="Acme Medical"
        badges={[
          { tone: 'urgent', label: 'Urgent' },
          { tone: 'pending', label: 'Pending' },
        ]}
        cost="$1,200"
      />,
    );
    expect(screen.getByRole('heading', { name: 'Sensor Board' })).toBeInTheDocument();
    expect(screen.getByText('Acme Medical')).toBeInTheDocument();
    expect(screen.getByText('Urgent')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('$1,200')).toBeInTheDocument();
  });
});

describe('ProductCard', () => {
  it('renders title, info rows, and status', () => {
    render(
      <ProductCard
        title="Infusion Pump"
        info={[{ label: 'SKU', value: 'IP-100' }]}
        statusTitle="Backordered"
        statusBody="Ships in 2 weeks"
      />,
    );
    expect(screen.getByRole('link', { name: 'Infusion Pump' })).toBeInTheDocument();
    expect(screen.getByText('SKU:')).toBeInTheDocument();
    expect(screen.getByText('IP-100')).toBeInTheDocument();
    expect(screen.getByText('Backordered')).toBeInTheDocument();
  });

  it('fires primary and secondary action handlers', () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    render(
      <ProductCard
        title="T"
        info={[]}
        primaryLabel="Add to Cart"
        secondaryLabel="Save"
        onPrimary={onPrimary}
        onSecondary={onSecondary}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add to Cart' }));
    expect(onSecondary).toHaveBeenCalledTimes(1);
    expect(onPrimary).toHaveBeenCalledTimes(1);
  });
});

describe('AnalyticsCard', () => {
  it('renders title and value (square layout)', () => {
    render(<AnalyticsCard title="Orders" value="128" sub="this month" />);
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('this month')).toBeInTheDocument();
  });

  it('renders a delta in wide layout', () => {
    render(
      <AnalyticsCard
        layout="wide"
        title="Revenue"
        value="$50k"
        delta={{ value: '12%', direction: 'up' }}
      />,
    );
    expect(screen.getByText('12%')).toBeInTheDocument();
    expect(screen.getByText('vs last year')).toBeInTheDocument();
  });

  it('fires onLink when the link is provided and clicked', () => {
    const onLink = vi.fn();
    render(
      <AnalyticsCard title="T" value="1" linkLabel="View report" onLink={onLink} />,
    );
    fireEvent.click(screen.getByRole('link', { name: 'View report' }));
    expect(onLink).toHaveBeenCalledTimes(1);
  });
});

describe('ListCard', () => {
  it('renders the list variant title, pill and share count', () => {
    render(
      <ListCard
        title="My Shopping List"
        pill={{ tone: 'shopping', label: 'Shopping' }}
        shareCount={3}
      />,
    );
    expect(screen.getByRole('heading', { name: 'My Shopping List' })).toBeInTheDocument();
    expect(screen.getByText('Shopping')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders the product variant and fires add to cart', () => {
    const onAddToCart = vi.fn();
    render(
      <ListCard variant="product" title="Widget" price="$9.99" onAddToCart={onAddToCart} />,
    );
    expect(screen.getByRole('heading', { name: 'Widget' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('renders the create variant with default copy and fires onCreate', () => {
    const onCreate = vi.fn();
    render(<ListCard variant="create" onCreate={onCreate} />);
    const heading = screen.getByRole('heading', { name: 'Create New List' });
    fireEvent.click(heading);
    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it('renders the standing variant status label', () => {
    render(<ListCard variant="standing" title="Monthly Order" />);
    expect(screen.getByText('Upcoming Order')).toBeInTheDocument();
  });
});

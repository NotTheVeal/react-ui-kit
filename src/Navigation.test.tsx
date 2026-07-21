import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TopNav, LeftNav } from './Navigation';

describe('TopNav', () => {
  it('renders a search form and fires onSearch on submit', () => {
    const onSearch = vi.fn();
    render(<TopNav onSearch={onSearch} />);
    const search = screen.getByRole('search');
    const input = screen.getByPlaceholderText('Search Keyword or Item Number');
    fireEvent.change(input, { target: { value: 'valve' } });
    fireEvent.submit(search);
    expect(onSearch).toHaveBeenCalledWith('valve');
  });

  it('fires onCartClick from the cart control', () => {
    const onCartClick = vi.fn();
    render(<TopNav onCartClick={onCartClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cart' }));
    expect(onCartClick).toHaveBeenCalledTimes(1);
  });

  it('shows the cart count badge when greater than zero', () => {
    render(<TopNav cartCount={4} />);
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders the facility name', () => {
    render(<TopNav facilityName="Acme Hospital" />);
    expect(screen.getByText('Acme Hospital')).toBeInTheDocument();
  });
});

describe('LeftNav', () => {
  const items = [
    { id: 'home', label: 'Home', active: true, onClick: vi.fn() },
    { id: 'orders', label: 'Orders', onClick: vi.fn() },
  ];

  it('renders a labeled nav with its items', () => {
    render(<LeftNav items={items} userName="Earl G." />);
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /orders/i })).toBeInTheDocument();
  });

  it('marks the active item with aria-current', () => {
    render(<LeftNav items={items} />);
    expect(screen.getByRole('button', { name: /home/i })).toHaveAttribute('aria-current', 'page');
  });

  it('fires an item onClick', () => {
    const onClick = vi.fn();
    render(<LeftNav items={[{ id: 'x', label: 'Reports', onClick }]} />);
    fireEvent.click(screen.getByRole('button', { name: /reports/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a logout control and fires onLogout', () => {
    const onLogout = vi.fn();
    render(<LeftNav items={items} onLogout={onLogout} />);
    fireEvent.click(screen.getByRole('button', { name: /log out/i }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('renders a collapse toggle with the correct label', () => {
    const onToggleCollapse = vi.fn();
    render(<LeftNav items={items} onToggleCollapse={onToggleCollapse} />);
    fireEvent.click(screen.getByRole('button', { name: 'Collapse sidebar' }));
    expect(onToggleCollapse).toHaveBeenCalledTimes(1);
  });
});

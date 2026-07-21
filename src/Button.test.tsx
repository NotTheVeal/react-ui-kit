import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, ButtonInline, BackArrowIcon } from './Button';

describe('Button', () => {
  it('renders children in a semantic button', () => {
    render(<Button>Add to Cart</Button>);
    const btn = screen.getByRole('button', { name: /add to cart/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Disabled
      </Button>
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('marks itself busy and disabled while loading, hiding the label', () => {
    render(<Button loading>Processing</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();
    // Loading swaps children for the spinner.
    expect(screen.queryByText('Processing')).not.toBeInTheDocument();
  });

  it('does not set aria-busy when not loading', () => {
    render(<Button>Idle</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('renders leading and trailing icons alongside the label', () => {
    render(
      <Button iconStart={<span data-testid="start" />} iconEnd={<span data-testid="end" />}>
        Label
      </Button>
    );
    expect(screen.getByTestId('start')).toBeInTheDocument();
    expect(screen.getByTestId('end')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('forwards native button attributes', () => {
    render(<Button aria-label="Save changes" name="save" />);
    const btn = screen.getByRole('button', { name: 'Save changes' });
    expect(btn).toHaveAttribute('name', 'save');
  });

  it.each(['primary', 'secondary', 'tertiary', 'danger', 'pill', 'arrow'] as const)(
    'renders the %s variant',
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    }
  );
});

describe('ButtonInline', () => {
  it('renders an anchor with its label', () => {
    render(<ButtonInline href="/details">View details</ButtonInline>);
    const link = screen.getByRole('link', { name: /view details/i });
    expect(link).toHaveAttribute('href', '/details');
  });

  it('appends a chevron glyph for the dir kind', () => {
    const { container } = render(<ButtonInline kind="dir">Next</ButtonInline>);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

describe('BackArrowIcon', () => {
  it('renders a decorative svg', () => {
    const { container } = render(<BackArrowIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Avatar,
  AvatarGroup,
  Tooltip,
  TooltipRich,
  Skeleton,
  Spinner,
  EmptyState,
  ErrorPage,
} from './Feedback';

describe('Avatar', () => {
  it('derives initials from a full name', () => {
    render(<Avatar name="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('uses explicit initials when provided', () => {
    render(<Avatar initials="AB" name="Ignored Name" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('renders an image when src is provided', () => {
    render(<Avatar src="/x.png" name="Jane Doe" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/x.png');
    expect(img).toHaveAttribute('alt', 'Jane Doe');
  });

  it('renders a status indicator with its label', () => {
    render(<Avatar name="Jane Doe" status="online" />);
    expect(screen.getByLabelText('online')).toBeInTheDocument();
  });
});

describe('AvatarGroup', () => {
  it('renders children and an overflow badge', () => {
    render(
      <AvatarGroup overflow={3}>
        <Avatar name="A B" />
        <Avatar name="C D" />
      </AvatarGroup>,
    );
    expect(screen.getByText('+3')).toBeInTheDocument();
  });
});

describe('Tooltip', () => {
  it('renders the label with role="tooltip" and wires aria-describedby', () => {
    render(
      <Tooltip label="Helpful hint">
        <button>Trigger</button>
      </Tooltip>,
    );
    const tip = screen.getByRole('tooltip');
    expect(tip).toHaveTextContent('Helpful hint');
    const trigger = screen.getByRole('button', { name: 'Trigger' });
    expect(trigger).toHaveAttribute('aria-describedby', tip.id);
  });
});

describe('TooltipRich', () => {
  it('renders title, body and a working CTA', () => {
    const onClick = vi.fn();
    render(
      <TooltipRich title="Title" body="Body text" cta={{ label: 'Learn more', onClick }} />,
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Learn more' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Skeleton', () => {
  it('renders a decorative placeholder', () => {
    const { container } = render(<Skeleton shape="title" />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('Spinner', () => {
  it('renders a labeled status role', () => {
    render(<Spinner />);
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('renders title, body and fires action handlers', () => {
    const onPrimary = vi.fn();
    render(
      <EmptyState
        title="No results"
        body="Try a different filter"
        primaryAction={{ label: 'Reset', onClick: onPrimary }}
      />,
    );
    expect(screen.getByRole('heading', { name: 'No results' })).toBeInTheDocument();
    expect(screen.getByText('Try a different filter')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(onPrimary).toHaveBeenCalledTimes(1);
  });
});

describe('ErrorPage', () => {
  it('renders code, title and fires primary action', () => {
    const onClick = vi.fn();
    render(
      <ErrorPage
        code="404"
        title="Page not found"
        primaryAction={{ label: 'Go home', onClick }}
      />,
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Go home' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

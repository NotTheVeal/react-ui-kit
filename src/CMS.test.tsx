import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Banner, ImageBlock, TextBlock, CardGrid } from './CMS';

describe('Banner', () => {
  it('renders title and body', () => {
    render(<Banner title="Big Sale" body="Save now" />);
    expect(screen.getByRole('heading', { name: 'Big Sale' })).toBeInTheDocument();
    expect(screen.getByText('Save now')).toBeInTheDocument();
  });

  it('renders a CTA and fires onCta', () => {
    const onCta = vi.fn();
    render(<Banner title="T" ctaLabel="Shop Now" onCta={onCta} />);
    fireEvent.click(screen.getByRole('button', { name: 'Shop Now' }));
    expect(onCta).toHaveBeenCalledTimes(1);
  });

  it('omits the CTA when no label is given', () => {
    render(<Banner title="T" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('ImageBlock', () => {
  it('renders title, body and image with alt text', () => {
    render(
      <ImageBlock title="Feature" body="Details here" imageUrl="/x.png" imageAlt="A photo" />,
    );
    expect(screen.getByRole('heading', { name: 'Feature' })).toBeInTheDocument();
    expect(screen.getByText('Details here')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'A photo' })).toBeInTheDocument();
  });

  it('fires onCta from the CTA', () => {
    const onCta = vi.fn();
    render(<ImageBlock title="T" ctaLabel="Learn" onCta={onCta} />);
    fireEvent.click(screen.getByRole('button', { name: 'Learn' }));
    expect(onCta).toHaveBeenCalledTimes(1);
  });
});

describe('TextBlock', () => {
  it('renders a title and children', () => {
    render(
      <TextBlock title="About">
        <p>Body content</p>
      </TextBlock>,
    );
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });
});

describe('CardGrid', () => {
  it('renders one article per card with title and text', () => {
    render(
      <CardGrid
        cards={[
          { title: 'Card A', text: 'Text A' },
          { title: 'Card B', text: 'Text B' },
        ]}
      />,
    );
    expect(screen.getByRole('heading', { name: 'Card A' })).toBeInTheDocument();
    expect(screen.getByText('Text A')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Card B' })).toBeInTheDocument();
  });
});

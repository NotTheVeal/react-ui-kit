import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Banner, ImageBlock, CardGrid } from './CMS';

describe('CMS accessibility', () => {
  it('has no violations — Banner', async () => {
    const { container } = render(<Banner title="Big Sale" body="Save now" ctaLabel="Shop" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — ImageBlock', async () => {
    const { container } = render(
      <ImageBlock title="Feature" body="Details" imageUrl="/x.png" imageAlt="A photo" />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — CardGrid', async () => {
    const { container } = render(
      <CardGrid cards={[{ title: 'Card A', text: 'Text A' }]} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

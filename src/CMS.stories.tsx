import type { Meta, StoryObj } from '@storybook/react';
import { Banner, ImageBlock, TextBlock, CardGrid } from './CMS';

const meta = {
  title: 'CMS Blocks/Banner',
  component: Banner,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Banner>;

export default meta;

export const HeroBanner: StoryObj = {
  render: () => (
    <Banner
      title="Mission-critical uptime, on-demand"
      body="Access real-time inventory, transparent pricing, and a guaranteed 4-hour response on every order."
      ctaLabel="Request a Quote"
    />
  ),
};

export const Image: StoryObj = {
  render: () => (
    <div className="p-8">
      <ImageBlock
        title="Connect equipment to outcomes"
        body="Track asset-level performance across your network and identify the most common service drivers in any quarter."
        ctaLabel="Learn more"
      />
    </div>
  ),
};

export const Text: StoryObj = {
  render: () => (
    <div className="p-8">
      <TextBlock title="How we measure impact">
        <p>PartsSource Pro combines a managed-services delivery model with the largest equipment-uptime dataset in the country.</p>
      </TextBlock>
    </div>
  ),
};

export const Grid: StoryObj = {
  render: () => (
    <div className="p-8">
      <CardGrid
        columns={3}
        gap="md"
        cards={[
          { title: 'Vendor Management', text: 'Single procurement workflow across 5,000+ vendors.' },
          { title: 'Compliance Tracking', text: 'Audit-ready logs for every PM, repair and inspection.' },
          { title: 'Technical Specs', text: 'Complete service manuals and OEM documentation.' },
        ]}
      />
    </div>
  ),
};

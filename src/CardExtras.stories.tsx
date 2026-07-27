import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AiDataCard, ProductCard, AnalyticsCard, ListCard } from './CardExtras';

// CardExtras bundles four card families ported from preview/cards.html.
// Each export gets its own Storybook section under "Cards / Extras".

const meta: Meta = {
  title: 'Cards/Extras',
  parameters: { layout: 'centered' },
};
export default meta;

// ── AiDataCard ──────────────────────────────────────────────────
type AiStory = StoryObj<typeof AiDataCard>;

export const AiData: AiStory = {
  render: (args) => <AiDataCard {...args} />,
  args: {
    title: 'Infusion Pump Cassette',
    manufacturer: 'Baxter · REF 2L3416',
    meta: (
      <>
        <span>Order #48213 · placed Jul 22</span>
        <span>Est. delivery Jul 29</span>
      </>
    ),
    badges: [
      { tone: 'urgent', label: 'URGENT' },
      { tone: 'pending', label: 'WAITING FOR APPROVAL' },
      { tone: 'notShipped', label: 'NOT SHIPPED' },
    ],
    cost: '$1,284.00',
  },
};

// ── ProductCard ─────────────────────────────────────────────────
type ProductStory = StoryObj<typeof ProductCard>;

export const Product: ProductStory = {
  render: (args) => <ProductCard {...args} />,
  args: {
    title: 'Philips IntelliVue MX450 Patient Monitor',
    date: 'JUL 22, 2026',
    info: [
      { label: 'Condition', value: 'Refurbished' },
      { label: 'Warranty', value: '1 year' },
      { label: 'Qty available', value: '3' },
    ],
    statusTitle: 'In Stock',
    statusBody: 'Ships within 2 business days from Aurora, OH.',
    primaryLabel: 'Add to Cart',
    secondaryLabel: 'Request Quote',
  },
};

// ── AnalyticsCard ───────────────────────────────────────────────
type AnalyticsStory = StoryObj<typeof AnalyticsCard>;

export const AnalyticsSquare: AnalyticsStory = {
  render: (args) => <AnalyticsCard {...args} />,
  args: {
    layout: 'square',
    title: 'Open Work Orders',
    value: '42',
    label: 'active',
    sub: '8 due this week',
  },
};

export const AnalyticsWide: AnalyticsStory = {
  render: (args) => <AnalyticsCard {...args} />,
  args: {
    layout: 'wide',
    title: 'Parts Spend',
    value: '$1.2M',
    delta: { value: '5.3%', direction: 'down' },
    deltaSuffix: 'vs last year',
    benchmark: '15% below peer benchmark',
  },
};

export const AnalyticsHighlighted: AnalyticsStory = {
  render: (args) => <AnalyticsCard {...args} />,
  args: {
    layout: 'square',
    title: 'Uptime',
    value: '98.6%',
    label: 'fleet',
    sub: '↑ 1.2% vs last month',
    highlight: true,
  },
};

// ── ListCard (4 variants) ───────────────────────────────────────
type ListStory = StoryObj<typeof ListCard>;

export const ListDefault: ListStory = {
  render: () => (
    <ListCard
      variant="list"
      title="Radiology PM Kit"
      pill={{ tone: 'preventative', label: 'PREVENTATIVE' }}
      count="12 items"
      shareCount={4}
    />
  ),
};

export const ListProduct: ListStory = {
  render: () => (
    <ListCard
      variant="product"
      title="GE Logiq E10 Transducer"
      price="$4,410.00"
      condition="Refurbished · 1 yr warranty"
      qty={1}
    />
  ),
};

export const ListCreate: ListStory = {
  render: () => <ListCard variant="create" />,
};

export const ListStanding: ListStory = {
  render: () => (
    <ListCard
      variant="standing"
      title="Monthly Restock — ICU"
      meta={[
        { label: 'Cadence', value: 'Every 30 days' },
        { label: 'Next order', value: 'Aug 15, 2026' },
      ]}
      statusLabel="Upcoming Order"
      statusDate="AUG 15"
      shareCount={2}
    />
  ),
};

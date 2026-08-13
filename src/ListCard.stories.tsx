import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ListCard } from './CardExtras';

const meta: Meta<typeof ListCard> = {
  title: 'Cards/ListCard',
  component: ListCard,
  parameters: { layout: 'centered' },
};
export default meta;

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

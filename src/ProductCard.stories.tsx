import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './CardExtras';

const meta: Meta<typeof ProductCard> = {
  title: 'Cards/ProductCard',
  component: ProductCard,
  parameters: { layout: 'centered' },
};
export default meta;

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

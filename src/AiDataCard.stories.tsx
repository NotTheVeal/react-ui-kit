import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AiDataCard } from './CardExtras';

const meta: Meta<typeof AiDataCard> = {
  title: 'Cards/AiDataCard',
  component: AiDataCard,
  parameters: { layout: 'centered' },
};
export default meta;

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

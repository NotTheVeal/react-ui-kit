import type { Meta, StoryObj } from '@storybook/react';
import { CardBrandIcon } from './CardBrandIcon';

const meta: Meta<typeof CardBrandIcon> = {
  title: 'Components/CardBrandIcon',
  component: CardBrandIcon,
  tags: ['autodocs'],
  argTypes: {
    brand: {
      control: 'select',
      options: ['visa', 'mastercard', 'amex', 'discover'],
    },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CardBrandIcon>;

export const Visa: Story = { args: { brand: 'visa' } };
export const Mastercard: Story = { args: { brand: 'mastercard' } };
export const Amex: Story = { args: { brand: 'amex' } };
export const Discover: Story = { args: { brand: 'discover' } };

export const AllBrands: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6">
      <CardBrandIcon brand="visa" />
      <CardBrandIcon brand="mastercard" />
      <CardBrandIcon brand="amex" />
      <CardBrandIcon brand="discover" />
    </div>
  ),
};

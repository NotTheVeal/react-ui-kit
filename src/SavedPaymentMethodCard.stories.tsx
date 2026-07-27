import type { Meta, StoryObj } from '@storybook/react';
import { SavedPaymentMethodCard } from './SavedPaymentMethodCard';

const meta: Meta<typeof SavedPaymentMethodCard> = {
  title: 'Components/SavedPaymentMethodCard',
  component: SavedPaymentMethodCard,
  tags: ['autodocs'],
  argTypes: {
    brand: {
      control: 'select',
      options: ['visa', 'mastercard', 'amex', 'discover'],
    },
    last4: { control: 'text' },
    expires: { control: 'text' },
    isDefault: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SavedPaymentMethodCard>;

export const Default: Story = {
  args: { brand: 'mastercard', last4: '4242', expires: '08/27', isDefault: true },
};

export const NotDefault: Story = {
  args: { brand: 'visa', last4: '1881', expires: '11/26' },
};

export const Amex: Story = {
  args: { brand: 'amex', last4: '0005', expires: '03/28' },
};

export const List: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-6">
      <SavedPaymentMethodCard brand="mastercard" last4="4242" expires="08/27" isDefault />
      <SavedPaymentMethodCard brand="visa" last4="1881" expires="11/26" />
      <SavedPaymentMethodCard brand="discover" last4="6011" expires="05/29" />
    </div>
  ),
};

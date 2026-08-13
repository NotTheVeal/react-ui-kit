import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AddPaymentMethodForm } from './AddPaymentMethodForm';

const meta: Meta<typeof AddPaymentMethodForm> = {
  title: 'Forms/AddPaymentMethodForm',
  component: AddPaymentMethodForm,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof AddPaymentMethodForm>;

export const Default: Story = {
  args: { onSubmit: (v) => console.log('submit', v) },
};

export const CustomLabels: Story = {
  args: { title: 'New Card', submitLabel: 'Add Card' },
};

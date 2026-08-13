import type { Meta, StoryObj } from "@storybook/react";
import { QuantityStepper } from "./QuantityStepper";

const meta: Meta<typeof QuantityStepper> = {
  title: 'Forms/QuantityStepper',
  component: QuantityStepper,
  tags: ["autodocs"],
  argTypes: {
    colorScheme: { control: "select", options: ["future", "current"] },
    disabled: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof QuantityStepper>;

export const Future: Story = { args: { colorScheme: "future", defaultValue: 1 } };
export const FutureDisabled: Story = {
  args: { colorScheme: "future", disabled: true, defaultValue: 1 },
};
export const Current: Story = { args: { colorScheme: "current", defaultValue: 1 } };
export const CurrentDisabled: Story = {
  args: { colorScheme: "current", disabled: true, defaultValue: 1 },
};
export const WithBounds: Story = {
  args: { colorScheme: "future", defaultValue: 3, min: 1, max: 5 },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <QuantityStepper colorScheme="future" />
      <QuantityStepper colorScheme="future" disabled />
      <QuantityStepper colorScheme="current" />
      <QuantityStepper colorScheme="current" disabled />
    </div>
  ),
};

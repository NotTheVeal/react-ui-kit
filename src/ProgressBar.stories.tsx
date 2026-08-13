import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    hideHeader: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const NotStarted: Story = { args: { value: 0 } };
export const InProgress: Story = { args: { value: 33 } };
export const TwoThirds: Story = { args: { value: 66 } };
export const Complete: Story = { args: { value: 100 } };
export const CustomLabel: Story = { args: { value: 45, label: "Uploading" } };
export const NoHeader: Story = { args: { value: 60, hideHeader: true } };

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 280 }}>
      <ProgressBar value={0} />
      <ProgressBar value={33} />
      <ProgressBar value={66} />
      <ProgressBar value={100} />
    </div>
  ),
};

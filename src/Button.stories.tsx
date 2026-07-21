import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonInline } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'pill', 'arrow'],
    },
    size: { control: 'select', options: ['sm', 'lg'] },
    state: { control: 'select', options: [undefined, 'default', 'hover', 'focus', 'pressed'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary', children: 'Buy Now' } };
export const Secondary: Story = { args: { variant: 'secondary', size: 'sm', children: 'Apply Filter' } };
export const Tertiary: Story = { args: { variant: 'tertiary', children: 'Save for later' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Delete Item' } };
export const PillLegacy: Story = {
  args: { variant: 'pill', children: 'Propose Quote' },
  parameters: { docs: { description: { story: '⚠ Deprecated — orange CTAs fail WCAG AA. Use Primary for new work.' } } },
};
export const Disabled: Story = { args: { variant: 'primary', disabled: true, children: 'Buy Now' } };
export const Loading: Story = { args: { variant: 'primary', loading: true, children: 'Buy Now' } };

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary" size="sm">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="pill">Pill (legacy)</Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" state="hover">Hover</Button>
        <Button variant="primary" state="pressed">Pressed</Button>
        <Button variant="primary" state="focus">Focus</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="primary" loading>Loading</Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <ButtonInline kind="link" href="#">Inline link</ButtonInline>
        <ButtonInline kind="link-blue" href="#">PRODUCT TITLE</ButtonInline>
        <ButtonInline kind="dir" href="#">Directory row</ButtonInline>
      </div>
    </div>
  ),
};

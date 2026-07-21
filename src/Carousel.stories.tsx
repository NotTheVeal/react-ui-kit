import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const Item = ({ n }: { n: number }) => (
  <div style={{ flex: '0 0 200px' }}>
    <div
      style={{
        height: 150,
        borderRadius: 4,
        background: 'var(--ps-prim-gray-150)',
        marginBottom: 8,
      }}
    />
    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--ps-prim-blue-500)' }}>
      ITEM NAME {n} LOREM IPSUM
    </p>
    <p style={{ margin: 0, fontSize: 12, color: 'var(--ps-prim-gray-600)' }}>OEM</p>
  </div>
);

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'You Left Off Here',
    linkLabel: 'View Shopping History',
    children: Array.from({ length: 8 }, (_, i) => <Item key={i} n={i + 1} />),
  },
};

export const NoHeader: Story = {
  args: {
    children: Array.from({ length: 8 }, (_, i) => <Item key={i} n={i + 1} />),
  },
};

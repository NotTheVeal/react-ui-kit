import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipRich } from './Feedback';

const meta = {
  title: 'Feedback/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tooltip>;

export default meta;

export const TooltipPlacements: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-12 py-12">
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} label={`Placement: ${p}`} placement={p}>
          <button className="h-9 px-3.5 rounded border border-[var(--ps-prim-gray-300)] bg-white text-[13px] font-semibold cursor-pointer hover:border-[var(--ps-prim-blue-500)] hover:text-[var(--ps-prim-blue-500)]">
            {p}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Rich: StoryObj = {
  render: () => (
    <div className="bg-[var(--ps-prim-gray-900)] p-8 rounded-md inline-flex">
      <TooltipRich
        title="Detailed Context"
        body="Rich tooltips can provide much more data without cluttering the UI."
        cta={{ label: 'Learn More' }}
      />
    </div>
  ),
};

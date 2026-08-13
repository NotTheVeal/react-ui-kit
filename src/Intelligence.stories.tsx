import type { Meta, StoryObj } from '@storybook/react';
import {
  IntelligencePanel,
  IntelligenceMessage,
  IntelligencePromptBar,
  SuggestedPrompts,
  TypingIndicator,
  IntelligenceSources,
} from './Intelligence';

const meta: Meta = {
  title: 'Data & AI/PS Intelligence',
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj;

const prompts = [
  'What parts are on backorder?',
  'Show me open service events',
  'Draft a quote for the GE MRI coil',
];

export const Panel: Story = {
  render: () => (
    <div className="w-[520px] h-[640px]">
      <IntelligencePanel
        suggestedPrompts={prompts}
        promptBar={<IntelligencePromptBar />}
        className="h-full"
      >
        <IntelligenceMessage role="user" timestamp="9:42 AM">
          Which imaging parts are running low this month?
        </IntelligenceMessage>
        <IntelligenceMessage
          role="assistant"
          timestamp="9:42 AM"
          sources={[
            { label: 'Inventory · Imaging', href: '#', meta: 'updated 2h ago' },
            { label: 'Reorder policy', href: '#' },
          ]}
        >
          Three imaging SKUs are below their reorder point: the Siemens gradient
          coil, a GE detector board, and the Philips power supply. Want me to
          draft POs for all three?
        </IntelligenceMessage>
      </IntelligencePanel>
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div className="w-[520px] h-[560px]">
      <IntelligencePanel
        suggestedPrompts={prompts}
        promptBar={<IntelligencePromptBar />}
        className="h-full"
      >
        <div className="m-auto max-w-[320px] text-center text-[14px] text-[var(--ps-sem-fg-tertiary)]">
          Ask about parts, orders, service events, or contracts to get started.
        </div>
      </IntelligencePanel>
    </div>
  ),
};

export const Thinking: Story = {
  render: () => (
    <div className="w-[520px]">
      <IntelligenceMessage role="assistant" pending />
    </div>
  ),
};

export const UserMessage: Story = {
  render: () => (
    <div className="w-[520px]">
      <IntelligenceMessage role="user" timestamp="10:03 AM">
        Reorder the Siemens gradient coil.
      </IntelligenceMessage>
    </div>
  ),
};

export const AssistantWithSources: Story = {
  render: () => (
    <div className="w-[520px]">
      <IntelligenceMessage
        role="assistant"
        sources={[
          { label: 'PO #48213', href: '#', meta: 'created' },
          { label: 'Supplier: Siemens Healthineers', href: '#' },
        ]}
      >
        Done — I created PO #48213 for one Siemens gradient coil at $12,480,
        routed to your approver.
      </IntelligenceMessage>
    </div>
  ),
};

export const PromptBar: Story = {
  render: () => (
    <div className="w-[520px]">
      <IntelligencePromptBar />
    </div>
  ),
};

export const Prompts: Story = {
  render: () => (
    <div className="w-[520px]">
      <SuggestedPrompts prompts={prompts} />
    </div>
  ),
};

export const Typing: Story = {
  render: () => <TypingIndicator />,
};

export const Sources: Story = {
  render: () => (
    <div className="w-[420px]">
      <IntelligenceSources
        sources={[
          { label: 'Inventory · Imaging', href: '#', meta: 'updated 2h ago' },
          { label: 'Reorder policy', href: '#' },
        ]}
      />
    </div>
  ),
};

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import {
  IntelligencePanel,
  IntelligenceMessage,
  IntelligencePromptBar,
  SuggestedPrompts,
} from './Intelligence';

describe('Intelligence accessibility', () => {
  it('has no violations — full panel', async () => {
    const { container } = render(
      <IntelligencePanel
        suggestedPrompts={['What is on backorder?']}
        promptBar={<IntelligencePromptBar />}
      >
        <IntelligenceMessage role="user" timestamp="9:42 AM">
          Which imaging parts are low?
        </IntelligenceMessage>
        <IntelligenceMessage
          role="assistant"
          timestamp="9:42 AM"
          sources={[{ label: 'Inventory', href: '#' }]}
        >
          Three SKUs are below reorder point.
        </IntelligenceMessage>
      </IntelligencePanel>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — prompt bar', async () => {
    const { container } = render(<IntelligencePromptBar />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — suggested prompts', async () => {
    const { container } = render(<SuggestedPrompts prompts={['A', 'B', 'C']} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — pending assistant message', async () => {
    const { container } = render(<IntelligenceMessage role="assistant" pending />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  TypingIndicator,
  IntelligenceSources,
  IntelligenceMessage,
  SuggestedPrompts,
  IntelligencePromptBar,
  IntelligencePanel,
} from './Intelligence';

describe('TypingIndicator', () => {
  it('exposes a status role with an accessible name', () => {
    render(<TypingIndicator />);
    expect(screen.getByRole('status', { name: /thinking/i })).toBeInTheDocument();
  });
});

describe('IntelligenceSources', () => {
  it('renders a link per source with meta', () => {
    render(
      <IntelligenceSources
        sources={[
          { label: 'Inventory', href: '#a', meta: '2h ago' },
          { label: 'Policy', href: '#b' },
        ]}
      />,
    );
    expect(screen.getByText('Inventory')).toBeInTheDocument();
    expect(screen.getByText('Policy')).toBeInTheDocument();
    expect(screen.getByText(/2h ago/)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('renders sources without href as non-links', () => {
    render(<IntelligenceSources sources={[{ label: 'Local note' }]} />);
    expect(screen.getByText('Local note')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

describe('IntelligenceMessage', () => {
  it('renders assistant content and marks the role', () => {
    const { container } = render(
      <IntelligenceMessage role="assistant">Hello there</IntelligenceMessage>,
    );
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(container.querySelector('[data-role="assistant"]')).toBeInTheDocument();
  });

  it('shows the typing indicator instead of content when pending', () => {
    render(<IntelligenceMessage role="assistant" pending>ignored</IntelligenceMessage>);
    expect(screen.getByRole('status', { name: /thinking/i })).toBeInTheDocument();
    expect(screen.queryByText('ignored')).not.toBeInTheDocument();
  });

  it('renders sources for a completed assistant message', () => {
    render(
      <IntelligenceMessage role="assistant" sources={[{ label: 'PO #1', href: '#' }]}>
        Done
      </IntelligenceMessage>,
    );
    expect(screen.getByText('PO #1')).toBeInTheDocument();
  });

  it('hides sources while pending', () => {
    render(
      <IntelligenceMessage role="assistant" pending sources={[{ label: 'PO #1', href: '#' }]}>
        Done
      </IntelligenceMessage>,
    );
    expect(screen.queryByText('PO #1')).not.toBeInTheDocument();
  });
});

describe('SuggestedPrompts', () => {
  it('fires onSelect with the chosen prompt', () => {
    const onSelect = vi.fn();
    render(<SuggestedPrompts prompts={['A', 'B']} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'B' }));
    expect(onSelect).toHaveBeenCalledWith('B');
  });
});

describe('IntelligencePromptBar', () => {
  it('submits trimmed text and clears when uncontrolled', () => {
    const onSubmit = vi.fn();
    render(<IntelligencePromptBar onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox', { name: /ask ps intelligence/i }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '  hello  ' } });
    fireEvent.submit(input.closest('form')!);
    expect(onSubmit).toHaveBeenCalledWith('hello');
    expect(input.value).toBe('');
  });

  it('disables send when empty', () => {
    render(<IntelligencePromptBar />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('does not submit when disabled', () => {
    const onSubmit = vi.fn();
    render(<IntelligencePromptBar disabled defaultValue="hi" onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox', { name: /ask ps intelligence/i });
    fireEvent.submit(input.closest('form')!);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('respects controlled value', () => {
    const onChange = vi.fn();
    render(<IntelligencePromptBar value="fixed" onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: /ask ps intelligence/i }) as HTMLInputElement;
    expect(input.value).toBe('fixed');
    fireEvent.change(input, { target: { value: 'typed' } });
    expect(onChange).toHaveBeenCalledWith('typed');
    expect(input.value).toBe('fixed');
  });
});

describe('IntelligencePanel', () => {
  it('renders title, children, and suggested prompts', () => {
    render(
      <IntelligencePanel suggestedPrompts={['Try this']}>
        <IntelligenceMessage role="assistant">Body message</IntelligenceMessage>
      </IntelligencePanel>,
    );
    expect(screen.getByRole('heading', { name: 'PS Intelligence' })).toBeInTheDocument();
    expect(screen.getByText('Body message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try this' })).toBeInTheDocument();
  });
});

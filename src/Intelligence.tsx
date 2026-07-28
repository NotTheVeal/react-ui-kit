import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Intelligence.tsx — PartsSource Design System
//
// "PS Intelligence" — the AI assistant / agent surface.
//
// Built to PartsSource brand-token spec (Source Sans, Midnight headings,
// brand-blue, 4px control radius, pill chips, no gradients, no emoji,
// inline SVG icons). No HTML preview source existed and the Figma node
// was not confidently sourceable, so this composes existing kit tokens
// and is intentionally NOT Code-Connected (pending pixel review) —
// consistent with the Modal / CMS / base-Card exemption convention.
// ──────────────────────────────────────────────────────────────────

const cxI = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const FONT = "'Source_Sans_Pro','Source Sans 3',sans-serif";

// ── Inline icons (no emoji, no external icon dep) ──────────────────

const SparkIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" className={className}>
    <path
      d="M12 3l1.9 4.8L18.7 10l-4.8 1.9L12 16.7 10.1 12 5.3 10l4.8-2.2L12 3z"
      fill="currentColor"
    />
    <path d="M19 4l.7 1.8L21.5 6.5 19.7 7.2 19 9l-.7-1.8L16.5 6.5 18.3 5.8 19 4z" fill="currentColor" opacity={0.7} />
  </svg>
);

const SendIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
    <path d="M4 12l16-8-6 8 6 8-16-8z" fill="currentColor" />
  </svg>
);

const LinkIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
    <path
      d="M10 13a5 5 0 007.07 0l2-2A5 5 0 0012 4l-1 1M14 11a5 5 0 00-7.07 0l-2 2A5 5 0 0012 20l1-1"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ══════════════════════════════════════════════════════════════════
// TypingIndicator
// ══════════════════════════════════════════════════════════════════

export const TypingIndicator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cxI('flex items-center gap-1', className)} role="status" aria-label="PS Intelligence is thinking">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-[var(--ps-prim-blue-400)] animate-pulse"
        style={{ animationDelay: `${i * 150}ms` }}
      />
    ))}
  </div>
);

// ══════════════════════════════════════════════════════════════════
// Source citations
// ══════════════════════════════════════════════════════════════════

export interface IntelligenceSource {
  label: string;
  href?: string;
  meta?: string;
}

export interface IntelligenceSourcesProps {
  sources: IntelligenceSource[];
  className?: string;
}

export const IntelligenceSources: React.FC<IntelligenceSourcesProps> = ({ sources, className }) => (
  <div className={cxI('mt-2', className)} style={{ fontFamily: FONT }}>
    <div className="mb-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-[var(--ps-sem-fg-tertiary)]">
      Sources
    </div>
    <ul className="flex flex-col gap-1 p-0 m-0 list-none">
      {sources.map((s, i) => {
        const inner = (
          <>
            <span className="text-[var(--ps-sem-fg-link)]">
              <LinkIcon />
            </span>
            <span className="text-[13px] text-[var(--ps-sem-fg-link)] underline decoration-transparent hover:decoration-inherit">
              {s.label}
            </span>
            {s.meta && <span className="text-[12px] text-[var(--ps-sem-fg-tertiary)]">· {s.meta}</span>}
          </>
        );
        return (
          <li key={i} className="flex items-center gap-1.5">
            {s.href ? (
              <a href={s.href} className="flex items-center gap-1.5 no-underline">
                {inner}
              </a>
            ) : (
              <span className="flex items-center gap-1.5">{inner}</span>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

// ══════════════════════════════════════════════════════════════════
// Message bubble
// ══════════════════════════════════════════════════════════════════

export interface IntelligenceMessageProps {
  role: 'user' | 'assistant';
  children?: React.ReactNode;
  /** Show the animated typing indicator instead of content. */
  pending?: boolean;
  sources?: IntelligenceSource[];
  timestamp?: string;
  className?: string;
}

export const IntelligenceMessage: React.FC<IntelligenceMessageProps> = ({
  role,
  children,
  pending = false,
  sources,
  timestamp,
  className,
}) => {
  const isUser = role === 'user';
  return (
    <div
      className={cxI('flex w-full gap-2.5', isUser ? 'flex-row-reverse' : 'flex-row', className)}
      style={{ fontFamily: FONT }}
      data-role={role}
    >
      <div
        aria-hidden="true"
        className={cxI(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-700)]'
            : 'bg-[var(--ps-sem-bg-brand)] text-[var(--ps-sem-fg-inverse)]',
        )}
      >
        {isUser ? <span className="text-[13px] font-semibold">You</span> : <SparkIcon />}
      </div>
      <div className={cxI('flex max-w-[80%] flex-col', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cxI(
            'rounded-[var(--ps-sem-radius-surface)] px-3.5 py-2.5 text-[14px] leading-relaxed',
            isUser
              ? 'bg-[var(--ps-sem-bg-brand)] text-[var(--ps-sem-fg-inverse)]'
              : 'border border-[var(--ps-sem-border-subtle)] bg-[var(--ps-sem-bg-surface)] text-[var(--ps-sem-fg-primary)]',
          )}
        >
          {pending ? <TypingIndicator /> : children}
        </div>
        {!pending && sources && sources.length > 0 && <IntelligenceSources sources={sources} />}
        {timestamp && (
          <span className="mt-1 text-[11px] text-[var(--ps-sem-fg-tertiary)]">{timestamp}</span>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════
// Suggested prompts
// ══════════════════════════════════════════════════════════════════

export interface SuggestedPromptsProps {
  prompts: string[];
  onSelect?: (prompt: string) => void;
  className?: string;
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts, onSelect, className }) => (
  <div className={cxI('flex flex-wrap gap-2', className)} style={{ fontFamily: FONT }}>
    {prompts.map((p) => (
      <button
        key={p}
        type="button"
        onClick={() => onSelect?.(p)}
        className={cxI(
          'rounded-[var(--ps-sem-radius-pill)] border border-[var(--ps-sem-border-default)] bg-[var(--ps-sem-bg-surface)]',
          'px-3 py-1.5 text-[13px] text-[var(--ps-sem-fg-secondary)]',
          'transition-colors hover:border-[var(--ps-sem-border-brand)] hover:text-[var(--ps-sem-fg-brand)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-sem-border-focus)] focus-visible:ring-offset-1',
        )}
      >
        {p}
      </button>
    ))}
  </div>
);

// ══════════════════════════════════════════════════════════════════
// Prompt bar
// ══════════════════════════════════════════════════════════════════

export interface IntelligencePromptBarProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
}

export const IntelligencePromptBar: React.FC<IntelligencePromptBarProps> = ({
  value,
  defaultValue = '',
  placeholder = 'Ask PS Intelligence anything…',
  disabled = false,
  onChange,
  onSubmit,
  className,
}) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;

  const setValue = (v: string) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = current.trim();
    if (!trimmed || disabled) return;
    onSubmit?.(trimmed);
    if (!isControlled) setInternal('');
  };

  return (
    <form
      onSubmit={submit}
      className={cxI(
        'flex items-center gap-2 rounded-[var(--ps-sem-radius-surface)] border border-[var(--ps-sem-border-default)]',
        'bg-[var(--ps-sem-bg-surface)] px-3 py-2',
        'focus-within:border-[var(--ps-sem-border-brand)] focus-within:ring-2 focus-within:ring-[var(--ps-sem-border-focus)]',
        className,
      )}
      style={{ fontFamily: FONT }}
    >
      <span className="text-[var(--ps-sem-fg-brand)]" aria-hidden="true">
        <SparkIcon size={18} />
      </span>
      <input
        type="text"
        value={current}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Ask PS Intelligence"
        className={cxI(
          'flex-1 border-0 bg-transparent text-[14px] text-[var(--ps-sem-fg-primary)] outline-none',
          'placeholder:text-[var(--ps-sem-fg-tertiary)]',
        )}
      />
      <button
        type="submit"
        disabled={disabled || !current.trim()}
        aria-label="Send message"
        className={cxI(
          'flex h-8 w-8 items-center justify-center rounded-[var(--ps-sem-radius-control)]',
          'bg-[var(--ps-sem-bg-brand)] text-[var(--ps-sem-fg-inverse)]',
          'transition-opacity disabled:opacity-40 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-sem-border-focus)] focus-visible:ring-offset-1',
        )}
      >
        <SendIcon />
      </button>
    </form>
  );
};

// ══════════════════════════════════════════════════════════════════
// Panel (composed surface)
// ══════════════════════════════════════════════════════════════════

export interface IntelligencePanelProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  suggestedPrompts?: string[];
  onSelectPrompt?: (prompt: string) => void;
  promptBar?: React.ReactNode;
  className?: string;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  title = 'PS Intelligence',
  subtitle = 'Your equipment & procurement assistant',
  children,
  suggestedPrompts,
  onSelectPrompt,
  promptBar,
  className,
}) => (
  <section
    className={cxI(
      'flex flex-col overflow-hidden rounded-[var(--ps-sem-radius-modal)] border border-[var(--ps-sem-border-subtle)]',
      'bg-[var(--ps-sem-bg-canvas)]',
      className,
    )}
    style={{ fontFamily: FONT }}
    aria-label={title}
  >
    <header className="flex items-center gap-2.5 bg-[var(--ps-sem-bg-brand)] px-4 py-3 text-[var(--ps-sem-fg-inverse)]">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.15)]">
        <SparkIcon size={18} />
      </span>
      <div className="flex flex-col">
        <h2 className="m-0 text-[15px] font-semibold leading-tight">{title}</h2>
        {subtitle && <span className="text-[12px] opacity-80">{subtitle}</span>}
      </div>
    </header>

    <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">{children}</div>

    {suggestedPrompts && suggestedPrompts.length > 0 && (
      <div className="px-4 pb-2">
        <SuggestedPrompts prompts={suggestedPrompts} onSelect={onSelectPrompt} />
      </div>
    )}

    {promptBar && <div className="border-t border-[var(--ps-sem-border-subtle)] px-4 py-3">{promptBar}</div>}
  </section>
);

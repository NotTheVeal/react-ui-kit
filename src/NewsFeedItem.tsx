import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// NewsFeedItem.tsx — PartsSource Design System
//
// 1:1 port of Figma "News Feed Item" (node 5466:57).
// Thumbnail (64×64) · category pill · headline · meta (date · read time).
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export interface NewsFeedItemProps {
  category?: string;
  headline: string;
  /** e.g. "Jul 20, 2026" */
  date?: string;
  /** e.g. "2 min read" */
  readTime?: string;
  imageSrc?: string;
  onClick?: () => void;
  className?: string;
}

const NewsFeedItem: React.FC<NewsFeedItemProps> = ({
  category,
  headline,
  date,
  readTime,
  imageSrc,
  onClick,
  className = '',
}) => {
  const meta = [date, readTime].filter(Boolean);
  const interactive = typeof onClick === 'function';

  const content = (
    <>
      <div className="h-16 w-16 shrink-0 overflow-clip rounded-[var(--ps-sem-radius-control)] bg-[var(--ps-sem-bg-subtle)]">
        {imageSrc ? (
          <img src={imageSrc} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[var(--ps-sem-space-stack-xs)]">
        {category ? (
          <span className="w-fit rounded-[var(--ps-sem-radius-pill)] bg-[var(--ps-sem-info-bg)] px-[var(--ps-sem-space-inset-md)] py-[var(--ps-sem-space-stack-xs)] text-[length:var(--ps-sem-text-caption)] font-semibold text-[color:var(--ps-sem-info-fg)]">
            {category}
          </span>
        ) : null}
        <span className="text-[length:var(--ps-sem-text-body)] font-semibold leading-normal text-[color:var(--ps-sem-fg-primary)]">
          {headline}
        </span>
        {meta.length > 0 ? (
          <span className="text-[length:var(--ps-sem-text-caption)] text-[color:var(--ps-sem-fg-tertiary)]">
            {meta.join(' · ')}
          </span>
        ) : null}
      </div>
    </>
  );

  const shell = cx(
    'flex w-[354px] items-start gap-3 overflow-clip',
    'rounded-[var(--ps-sem-radius-surface)] border border-solid border-[var(--ps-sem-border-subtle)]',
    'bg-[var(--ps-sem-bg-surface)] p-[var(--ps-sem-space-inset-lg)]',
    "font-['Source_Sans_Pro',sans-serif]",
  );

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cx(
          shell,
          'text-left hover:border-[var(--ps-sem-border-focus)]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-sem-border-focus)]',
          className,
        )}
      >
        {content}
      </button>
    );
  }

  return <article className={cx(shell, className)}>{content}</article>;
};

export { NewsFeedItem };
export default NewsFeedItem;

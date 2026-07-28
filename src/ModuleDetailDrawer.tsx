import * as React from 'react';
import { Drawer } from './Drawer';

// ──────────────────────────────────────────────────────────────────
// ModuleDetailDrawer.tsx — PartsSource Design System
//
// 1:1 port of Figma "Module Detail Drawer" (COMPONENT_SET 5480:116)
// State=Overview (5480:81) / State=Curriculum (5480:82).
// 480px right drawer built on the shared Drawer shell (Header/Body/Footer).
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export type ModuleDetailState = 'overview' | 'curriculum';

export interface CurriculumLesson {
  id: string;
  label: string;
  duration?: string;
  complete?: boolean;
}

export interface ModuleDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  /** Overview body copy. */
  overview?: string;
  /** Lessons shown in the Curriculum tab. */
  lessons?: CurriculumLesson[];
  /** Controlled active state; falls back to internal state when omitted. */
  state?: ModuleDetailState;
  onStateChange?: (state: ModuleDetailState) => void;
  ctaLabel?: string;
  onLaunch?: () => void;
  className?: string;
}

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    role="tab"
    aria-selected={active}
    onClick={onClick}
    className={cx(
      'flex h-[40px] items-center px-[var(--ps-sem-space-inset-md)] text-[length:var(--ps-sem-text-body)] font-semibold',
      'border-b-2 border-solid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ps-sem-border-focus)]',
      active
        ? 'border-[var(--ps-sem-border-focus)] text-[color:var(--ps-sem-fg-brand)]'
        : 'border-transparent text-[color:var(--ps-sem-fg-secondary)] hover:text-[color:var(--ps-sem-fg-primary)]',
    )}
  >
    {children}
  </button>
);

const ModuleDetailDrawer: React.FC<ModuleDetailDrawerProps> = ({
  open,
  onClose,
  title,
  subtitle,
  overview,
  lessons = [],
  state,
  onStateChange,
  ctaLabel = 'Launch Module',
  onLaunch,
  className = '',
}) => {
  const [internal, setInternal] = React.useState<ModuleDetailState>('overview');
  const active = state ?? internal;
  const setActive = (s: ModuleDetailState) => {
    if (state === undefined) setInternal(s);
    onStateChange?.(s);
  };

  const footer = (
    <button
      type="button"
      onClick={onLaunch}
      className={cx(
        'flex h-[50px] w-full items-center justify-center overflow-clip',
        'rounded-[var(--ps-sem-radius-control)] bg-[var(--ps-sem-bg-brand)]',
        'text-[length:var(--ps-sem-text-body)] font-semibold text-[color:var(--ps-sem-fg-inverse)]',
        'hover:bg-[var(--ps-prim-blue-600)]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'focus-visible:outline-[var(--ps-sem-border-focus)]',
      )}
    >
      {ctaLabel}
    </button>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      width={480}
      footer={footer}
      className={className}
    >
      <div
        role="tablist"
        aria-label="Module detail sections"
        className="mb-4 flex gap-2 border-b border-solid border-[var(--ps-sem-border-subtle)]"
      >
        <TabButton active={active === 'overview'} onClick={() => setActive('overview')}>
          Overview
        </TabButton>
        <TabButton
          active={active === 'curriculum'}
          onClick={() => setActive('curriculum')}
        >
          Curriculum
        </TabButton>
      </div>

      {active === 'overview' ? (
        <div role="tabpanel" className="flex flex-col gap-[var(--ps-sem-space-stack-sm)]">
          <p className="m-0 text-[length:var(--ps-sem-text-body)] leading-normal text-[color:var(--ps-sem-fg-secondary)]">
            {overview}
          </p>
        </div>
      ) : (
        <ul role="tabpanel" className="m-0 flex list-none flex-col gap-2 p-0">
          {lessons.map((l) => (
            <li
              key={l.id}
              className="flex items-center justify-between gap-3 rounded-[var(--ps-sem-radius-control)] border border-solid border-[var(--ps-sem-border-subtle)] px-[var(--ps-sem-space-inset-md)] py-[var(--ps-sem-space-stack-sm)]"
            >
              <span
                className={cx(
                  'text-[length:var(--ps-sem-text-body)]',
                  l.complete
                    ? 'text-[color:var(--ps-sem-fg-tertiary)] line-through'
                    : 'text-[color:var(--ps-sem-fg-primary)]',
                )}
              >
                {l.label}
              </span>
              {l.duration ? (
                <span className="text-[length:var(--ps-sem-text-caption)] text-[color:var(--ps-sem-fg-tertiary)]">
                  {l.duration}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
};

export { ModuleDetailDrawer };
export default ModuleDetailDrawer;

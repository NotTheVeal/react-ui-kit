import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Divider.tsx — PartsSource Design System
//
// A 1px rule in three weights (subtle · default · strong), matching the
// Figma /Divider component (node 4532:1092). Renders a semantic <hr> for
// horizontal dividers; a decorative <div> for vertical ones (an <hr>
// cannot be vertical accessibly).
// ──────────────────────────────────────────────────────────────────

type DividerWeight = 'subtle' | 'default' | 'strong';
type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps {
  weight?: DividerWeight;
  orientation?: DividerOrientation;
  /** Space above/below (horizontal) or left/right (vertical), in px. */
  spacing?: number;
  className?: string;
}

// Subtle → gray-150, Default → gray-300, Strong → gray-400.
const weightColor: Record<DividerWeight, string> = {
  subtle: 'var(--ps-prim-gray-150)',
  default: 'var(--ps-prim-gray-300)',
  strong: 'var(--ps-prim-gray-400)',
};

const cxDivider = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const Divider: React.FC<DividerProps> = ({
  weight = 'default',
  orientation = 'horizontal',
  spacing,
  className = '',
}) => {
  const color = weightColor[weight];

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cxDivider('inline-block self-stretch w-px', className)}
        style={{
          backgroundColor: color,
          marginLeft: spacing,
          marginRight: spacing,
        }}
      />
    );
  }

  return (
    <hr
      className={cxDivider('w-full border-0 h-px', className)}
      style={{
        backgroundColor: color,
        marginTop: spacing,
        marginBottom: spacing,
      }}
    />
  );
};

export { Divider };
export type { DividerProps, DividerWeight, DividerOrientation };

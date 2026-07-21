import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// SegmentedButton.tsx — PartsSource Design System
//
// Gray/blue single-select segmented toggle (e.g. Asset ↔ Event).
// Built from the Figma Buttons page "Segmented" family, both the
// CURRENT symbols and the "Future Button Sets" redesign.
//
// variant:  'current' (default)  |  'future'
//   The ONLY differences current → future:
//     • hover on selected segment darkens to blue-600 (current stays blue-500)
//     • outer corners round to 4px (first segment left, last segment right)
//
// Per-segment: w128 h30.
// Figma specs (current):
//   unselected  fill #F1F1F1 (gray-150) · text #4A4A4A (gray-700) Medium 14px
//   selected    fill #005BA6 (blue-500) · white text · white check 18px
//   pressed     fill #004A84 (blue-600)
//   focused     blue-500 + stroke #008CDB 1.25px  → library focus ring used instead
//   disabled    fill gray-150 · text #CCCCCC (gray-400)
//   future hover on selected: #004A84 (blue-600)
// ──────────────────────────────────────────────────────────────────

type SegmentedVariant = 'current' | 'future';

interface SegmentedOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SegmentedButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentedOption[];
  /** Currently-selected option id. */
  value: string;
  onChange: (id: string) => void;
  variant?: SegmentedVariant;
  disabled?: boolean;
  /** Accessible label for the group (radiogroup). */
  'aria-label'?: string;
}

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const CheckIcon: React.FC = () => (
  <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M3.5 9.5L7 13L14.5 5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SegmentedButton: React.FC<SegmentedButtonProps> = ({
  options,
  value,
  onChange,
  variant = 'current',
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  ...rest
}) => {
  const last = options.length - 1;

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cx('inline-flex', className)}
      {...rest}
    >
      {options.map((opt, i) => {
        const selected = opt.id === value;
        const segDisabled = disabled || opt.disabled;

        // Future rounds the outer corners (4px); current is square.
        const corner =
          variant === 'future'
            ? cx(i === 0 && 'rounded-l', i === last && 'rounded-r')
            : '';

        const stateClasses = selected
          ? cx(
              'bg-[var(--ps-prim-blue-500)] text-white',
              !segDisabled &&
                (variant === 'future'
                  ? 'hover:bg-[var(--ps-prim-blue-600)]'
                  : 'hover:bg-[var(--ps-prim-blue-500)]'),
              !segDisabled && 'active:bg-[var(--ps-prim-blue-600)]'
            )
          : cx(
              'bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-700)]',
              !segDisabled && 'hover:bg-[var(--ps-prim-gray-200)]'
            );

        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={segDisabled}
            onClick={segDisabled ? undefined : () => onChange(opt.id)}
            className={cx(
              "inline-flex items-center justify-center gap-1.5 w-32 h-[30px] px-3 border-0",
              "font-['Source_Sans_Pro',sans-serif] font-medium text-[14px] leading-none",
              'outline-none select-none transition-colors duration-150 ease-in-out',
              'focus-visible:relative focus-visible:z-10',
              'focus-visible:shadow-[0_0_0_2px_var(--ps-prim-blue-500)]',
              'disabled:cursor-not-allowed disabled:text-[var(--ps-prim-gray-400)]',
              stateClasses,
              corner
            )}
          >
            {selected && <CheckIcon />}
            {opt.icon && !selected && (
              <span className="inline-flex items-center" aria-hidden="true">{opt.icon}</span>
            )}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export { SegmentedButton };
export type { SegmentedButtonProps, SegmentedOption };

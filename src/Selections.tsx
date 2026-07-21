import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Selections.tsx — PartsSource Design System
//
// Checkbox: 24×24 with 2px corner radius. Orange fill when checked.
// Radio:    24×24 circle with orange dot when selected.
// Toggle:   pill switch with sliding thumb.
//
// All three use a 1.5px stroke, hover/focus/pressed treatments with
// orange + blue-glow per preview/selections.html.
// ──────────────────────────────────────────────────────────────────

type SelectionState = "default" | "hover" | "focus" | "pressed" | "disabled";

interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  state?: SelectionState;
  disabled?: boolean;
  className?: string;
  /** Accessible name when no visible `label` is provided. */
  'aria-label'?: string;
}

interface RadioProps {
  label?: React.ReactNode;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: string) => void;
  state?: SelectionState;
  disabled?: boolean;
  className?: string;
  /** Accessible name when no visible `label` is provided. */
  'aria-label'?: string;
}

interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  className?: string;
  /** Accessible name when no visible `label` is provided. */
  'aria-label'?: string;
}

const cxSel = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// Border + halo classes per state (matches selections preview)
const stateBorder = (state: SelectionState, checked: boolean, disabled: boolean) => {
  if (disabled) return "border-[var(--ps-prim-gray-400)]";
  if (state === "hover") return "border-[var(--ps-prim-orange-500)]";
  if (state === "focus") return "border-[var(--ps-prim-orange-500)] shadow-[0_0_10px_5px_rgba(0,91,166,0.5)]";
  if (state === "pressed") return "border-[var(--ps-prim-orange-600)] shadow-[0_0_0_4px_var(--ps-prim-orange-100)]";
  return checked ? "border-[var(--ps-prim-orange-400)]" : "border-[var(--ps-prim-gray-700)]";
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  defaultChecked,
  onChange,
  state = "default",
  disabled,
  className = "",
  'aria-label': ariaLabel,
}) => {
  const labelId = React.useId();
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const isDisabled = disabled || state === "disabled";

  const toggle = () => {
    if (isDisabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label
      className={cxSel(
        "inline-flex items-center gap-3 select-none",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <span
        onClick={toggle}
        role="checkbox"
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel : undefined}
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            toggle();
          }
        }}
        className={cxSel(
          "inline-flex items-center justify-center w-6 h-6 rounded-[2px] border-[1.5px] transition-all",
          "font-['Source_Sans_Pro',sans-serif]",
          isChecked && !isDisabled ? "bg-[var(--ps-prim-orange-400)]" : "bg-white",
          stateBorder(state, isChecked, isDisabled),
        )}
      >
        {isChecked && (
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M3 7l3 3 5-6"
              stroke={isDisabled ? "var(--ps-prim-gray-500)" : "white"}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label && (
        <span
          id={labelId}
          className={cxSel(
            "text-[13px] font-['Source_Sans_Pro',sans-serif]",
            isDisabled ? "text-[var(--ps-prim-gray-500)]" : "text-[var(--ps-prim-gray-900)]",
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};

const Radio: React.FC<RadioProps> = ({
  label,
  name,
  value,
  checked,
  defaultChecked,
  onChange,
  state = "default",
  disabled,
  className = "",
  'aria-label': ariaLabel,
}) => {
  const labelId = React.useId();
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  const isDisabled = disabled || state === "disabled";

  const select = () => {
    if (isDisabled || isChecked) return;
    if (!isControlled) setInternalChecked(true);
    if (value !== undefined) onChange?.(value);
  };

  return (
    <label
      className={cxSel(
        "inline-flex items-center gap-3 select-none",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <span
        onClick={select}
        role="radio"
        aria-checked={isChecked}
        aria-disabled={isDisabled}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel : undefined}
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            select();
          }
        }}
        className={cxSel(
          // Figma node 4393:45192 — 20×20 (not 24×24).
          "inline-flex items-center justify-center w-5 h-5 rounded-full border-[1.5px] transition-all bg-white",
          stateBorder(state, isChecked, isDisabled),
        )}
      >
        {isChecked && (
          <span
            className={cxSel(
              // 8px inner dot (proportional to 20px ring)
              "w-2 h-2 rounded-full",
              isDisabled ? "bg-[var(--ps-prim-gray-500)]" : "bg-[var(--ps-prim-orange-400)]",
            )}
          />
        )}
      </span>
      {label && (
        <span
          id={labelId}
          className={cxSel(
            "text-[13px] font-['Source_Sans_Pro',sans-serif]",
            isDisabled ? "text-[var(--ps-prim-gray-500)]" : "text-[var(--ps-prim-gray-900)]",
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};

const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked,
  onChange,
  disabled,
  label,
  className = "",
  'aria-label': ariaLabel,
}) => {
  const labelId = React.useId();
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label className={cxSel("inline-flex items-center gap-3 select-none cursor-pointer", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel : undefined}
        disabled={disabled}
        onClick={toggle}
        className={cxSel(
          // Figma node 4393:45399 — 44×24 pill, orange ON, grey OFF.
          "relative w-11 h-6 rounded-full transition-colors duration-150 cursor-pointer",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          isChecked ? "bg-[var(--ps-prim-orange-400)]" : "bg-[var(--ps-prim-gray-300)]",
        )}
      >
        <span
          className={cxSel(
            // 20×20 white thumb with subtle shadow, 2px inset from track edge.
            "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-[0_0.833px_1.667px_rgba(0,0,0,0.2)] transition-all duration-150",
            isChecked ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
      {label && (
        <span id={labelId} className="text-[13px] font-['Source_Sans_Pro',sans-serif] text-[var(--ps-prim-gray-900)]">
          {label}
        </span>
      )}
    </label>
  );
};

export { Checkbox, Radio, Toggle };

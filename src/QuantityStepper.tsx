import React from "react";

const cxQs = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

export interface QuantityStepperProps {
  /** Controlled quantity value. */
  value?: number;
  /** Initial value when uncontrolled. */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Accent color scheme — future = brand blue, current = orange. */
  colorScheme?: "future" | "current";
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
  "aria-label"?: string;
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value: valueProp,
  defaultValue = 1,
  min = 1,
  max = Infinity,
  step = 1,
  colorScheme = "future",
  disabled = false,
  onChange,
  className,
  "aria-label": ariaLabel = "Quantity",
}) => {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const value = isControlled ? (valueProp as number) : internal;

  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const setValue = (next: number) => {
    const c = clamp(next);
    if (!isControlled) setInternal(c);
    if (c !== value) onChange?.(c);
  };

  const atMin = value <= min;
  const atMax = value >= max;

  const accent = disabled
    ? "var(--ps-prim-gray-400)"
    : colorScheme === "current"
    ? "var(--ps-prim-orange-400)"
    : "var(--ps-prim-blue-500)";
  const valueColor = disabled
    ? "var(--ps-prim-gray-400)"
    : "var(--ps-prim-gray-700)";

  const btnBase =
    "flex h-12 items-center justify-center px-3 text-[20px] leading-none " +
    "transition-opacity focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-offset-1 focus-visible:ring-[var(--ps-prim-blue-500)] " +
    "disabled:cursor-not-allowed";

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cxQs(
        "inline-flex items-stretch rounded-[var(--ps-prim-radius-4)] border bg-[var(--ps-prim-gray-0)]",
        className
      )}
      style={{ borderColor: accent }}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className={cxQs(btnBase, atMin && !disabled && "opacity-40")}
        style={{ color: accent }}
        disabled={disabled || atMin}
        aria-disabled={disabled || atMin}
        onClick={() => setValue(value - step)}
      >
        {"−"}
      </button>
      <span
        aria-live="polite"
        className="flex h-12 min-w-[40px] items-center justify-center border-x px-2 text-base font-semibold"
        style={{ color: valueColor, borderColor: accent }}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={cxQs(btnBase, atMax && !disabled && "opacity-40")}
        style={{ color: accent }}
        disabled={disabled || atMax}
        aria-disabled={disabled || atMax}
        onClick={() => setValue(value + step)}
      >
        +
      </button>
    </div>
  );
};

export { QuantityStepper };
export default QuantityStepper;

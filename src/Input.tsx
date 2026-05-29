import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Input.tsx — PartsSource Design System
//
// Variants:  text | dropdown | password | search
// Sizes:     md (48px) · lg (80px)
// States:    idle | hover | focus | with-value | disabled | error
//
// Implements the floating-label pattern from preview/inputs.html
// (matches the Figma "Input Fields" + "Large Input Fields" frames).
// ──────────────────────────────────────────────────────────────────

type Size = "md" | "lg";
type ForcedState = "default" | "hover" | "focus" | "withValue" | "disabled" | "error";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  size?: Size;
  /** Force a visual state for docs/screenshots. */
  state?: ForcedState;
  error?: string;
  helperText?: string;
}

const cxIn = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// Per-size geometry — height, label offsets, padding when label floats.
const sizeMap = {
  md: {
    wrap: "h-12",
    input: "h-12",
    inputFloating: "pt-[22px] pb-1",
    label: "h-12 text-[16px]",
    labelFloating: "top-[5px] h-[22px] items-start text-[12px] font-bold",
  },
  lg: {
    wrap: "h-20",
    input: "h-20",
    inputFloating: "pt-8 pb-2",
    label: "h-20 text-[16px]",
    labelFloating: "top-2 h-8 items-start text-[12px] font-bold",
  },
} as const;

// Border color per state. Box-shadow is applied separately for focus glow.
const borderClass = (state: ForcedState | "active" | undefined, hasError: boolean) => {
  if (hasError) return "border-[var(--ps-prim-red-spec)]";
  switch (state) {
    case "hover":
      return "border-[var(--ps-prim-gray-900)]";
    case "focus":
      return "border-[var(--ps-prim-blue-500)]";
    case "disabled":
      return "border-[var(--ps-prim-gray-300)]";
    default:
      return "border-[var(--ps-prim-gray-500)]";
  }
};

const Input: React.FC<InputProps> = ({
  label,
  size = "md",
  state,
  error,
  helperText,
  value,
  defaultValue,
  disabled,
  className = "",
  id,
  ...rest
}) => {
  const reactId = React.useId();
  const inputId = id ?? `ps-input-${reactId}`;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value ?? "") : String(internalValue);
  const [isFocused, setIsFocused] = React.useState(false);

  // Force-state overrides interactive state.
  const forced = state;
  const hasError = Boolean(error) || forced === "error";
  const isFocusVisible = forced === "focus" || (forced === undefined && isFocused);
  const isFloating =
    forced === "focus" ||
    forced === "withValue" ||
    isFocusVisible ||
    currentValue.length > 0;
  const isDisabled = disabled || forced === "disabled";

  const cfg = sizeMap[size];

  const baseBorder = borderClass(
    forced ?? (isFocusVisible ? "focus" : undefined),
    hasError,
  );

  // Focus glow — uses inline style for the exact preview-doc shadow.
  const focusShadow = isFocusVisible && !hasError
    ? "shadow-[0_0_10px_0_rgba(0,91,166,0.5)]"
    : isFocusVisible && hasError
      ? "shadow-[0_0_10px_0_rgba(211,47,47,0.5)]"
      : "";

  // Hover ring (only when not forced and not focused).
  const hoverBorder =
    forced || isFocusVisible || isDisabled || hasError
      ? ""
      : "hover:border-[var(--ps-prim-gray-900)]";

  const labelColor = hasError
    ? "text-[var(--ps-prim-red-spec)]"
    : isDisabled
      ? "text-[var(--ps-prim-gray-300)]"
      : isFloating
        ? "text-[var(--ps-prim-blue-500)]"
        : "text-[var(--ps-prim-gray-700)]";

  const inputTextColor = hasError
    ? "text-[var(--ps-prim-red-spec)]"
    : isDisabled
      ? "text-[var(--ps-prim-gray-300)]"
      : "text-[var(--ps-prim-gray-900)]";

  return (
    <div className={cxIn("flex flex-col gap-1", className)}>
      <div className={cxIn("relative w-[335px]", cfg.wrap)}>
        <input
          id={inputId}
          disabled={isDisabled}
          value={isControlled ? currentValue : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={(e) => {
            if (!isControlled) setInternalValue(e.target.value);
            rest.onChange?.(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          placeholder=""
          {...rest}
          className={cxIn(
            "peer w-full px-2.5 bg-white border rounded-[3px] outline-none transition-all duration-150",
            "font-['Source_Sans_Pro',sans-serif] text-[16px] leading-none",
            cfg.input,
            isFloating && cfg.inputFloating,
            baseBorder,
            hoverBorder,
            focusShadow,
            inputTextColor,
            isDisabled && "cursor-not-allowed bg-white",
          )}
        />
        <label
          htmlFor={inputId}
          className={cxIn(
            "absolute left-2.5 top-0 flex items-center pointer-events-none transition-all duration-150",
            "font-['Source_Sans_Pro',sans-serif] leading-none",
            cfg.label,
            isFloating && cfg.labelFloating,
            labelColor,
          )}
        >
          {label}
        </label>
      </div>
      {error ? (
        <span className="text-[11px] text-[var(--ps-prim-red-spec)] mt-1">{error}</span>
      ) : helperText ? (
        <span className="text-[11px] text-[var(--ps-prim-gray-600)] mt-1">{helperText}</span>
      ) : null}
    </div>
  );
};

// ── Dropdown — text input + chevron + menu ───────────────────────
// Omit "onSelect" — React's native onSelect signature conflicts with our
// (value: string) => void shape.
interface DropdownProps extends Omit<InputProps, "type" | "onSelect"> {
  options: Array<{ label: string; value: string }>;
  onSelect?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  value: controlledValue,
  defaultValue,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(
    String(defaultValue ?? ""),
  );
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? String(controlledValue) : internalValue;
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selectedLabel =
    options.find((o) => o.value === currentValue)?.label ?? currentValue;

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setOpen((o) => !o)} className="cursor-pointer">
        <Input
          {...rest}
          value={selectedLabel}
          readOnly
          className="pointer-events-none"
        />
      </div>
      <svg
        aria-hidden="true"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="var(--ps-prim-gray-500)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {open && (
        <ul
          className={
            "absolute top-[calc(100%+1px)] left-0 w-[335px] max-h-[297px] " +
            "overflow-y-auto bg-white border border-[var(--ps-prim-gray-150)] rounded-[2px] " +
            "shadow-[0_4px_4px_rgba(0,0,0,0.25)] z-50 m-0 p-0 list-none"
          }
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                if (!isControlled) setInternalValue(opt.value);
                onSelect?.(opt.value);
                setOpen(false);
              }}
              className={cxIn(
                "px-2.5 py-3.5 text-[14px] border-b border-[var(--ps-prim-gray-150)] last:border-b-0",
                "cursor-pointer transition-colors hover:bg-[var(--ps-prim-blue-100)]",
                "font-['Source_Sans_Pro',sans-serif] text-[var(--ps-prim-gray-900)]",
                currentValue === opt.value && "bg-[var(--ps-prim-blue-100)]",
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Input, Dropdown };

// ════════════════════════════════════════════════════════════════
// AUTO-GENERATED FROM src/ — do NOT hand-edit.
// Source: UI Kit/src/Layout.tsx · run `npm run sync:browser`.
// ════════════════════════════════════════════════════════════════
// ──────────────────────────────────────────────────────────────────
// Layout.tsx — PartsSource Design System
//
// Breadcrumb — page-chrome trail (Figma node 3457:8633)
// Accordion  — collapsible card group (Figma node 4390:39583)
// Stepper    — multi-step progress indicator (Figma node 396:1813)
//
// All three are ports of the preview/*.html source pages, themselves
// audited against the .fig source of truth.
// ──────────────────────────────────────────────────────────────────

const cxL = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// ══════════════════════════════════════════════════════════════════
// Breadcrumb — trail-style + back-style
// ══════════════════════════════════════════════════════════════════

interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
}

interface BreadcrumbProps {
  /** Parent links. The last item is rendered as the current page. */
  items: BreadcrumbItem[];
  className?: string;
}

interface BreadcrumbBackProps {
  label: React.ReactNode;
  href?: string;
  className?: string;
}

const Chevron: React.FC<{ direction?: "left" | "right" }> = ({ direction = "right" }) => (
  <svg viewBox="0 0 7 10" fill="none" aria-hidden="true">
    <path
      d={direction === "right" ? "M1 1l4 4-4 4" : "M6 1L2 5l4 4"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => {
  if (items.length === 0) return null;
  const parents = items.slice(0, -1);
  const current = items[items.length - 1];
  return (
    <nav
      aria-label="Breadcrumb"
      className={cxL(
        "inline-flex items-center gap-[9px] flex-wrap",
        "font-['Source_Sans_Pro','Source_Sans_3',sans-serif]",
        "text-[14px] leading-[18px] tracking-[-0.01em]",
        className,
      )}
    >
      {parents.map((it, i) => (
        <React.Fragment key={i}>
          <a
            href={it.href ?? "#"}
            className="text-[var(--ps-prim-blue-500)] no-underline rounded-[2px] hover:text-[var(--ps-prim-blue-600)] hover:underline hover:underline-offset-[3px] hover:decoration-1 focus-visible:outline-2 focus-visible:outline-[var(--ps-prim-blue-500)] focus-visible:outline-offset-2"
          >
            {it.label}
          </a>
          <span className="inline-flex items-center text-[var(--ps-prim-gray-500)] w-[7px] h-[10px] flex-shrink-0">
            <Chevron />
          </span>
        </React.Fragment>
      ))}
      <span className="text-[var(--ps-prim-gray-500)]">{current.label}</span>
    </nav>
  );
};

const BreadcrumbBack: React.FC<BreadcrumbBackProps> = ({
  label,
  href = "#",
  className = "",
}) => (
  <nav aria-label="Breadcrumb" className={cxL("inline-flex", className)}>
    <a
      href={href}
      className={cxL(
        "inline-flex items-center gap-2 text-[var(--ps-prim-blue-500)] no-underline",
        "font-['Source_Sans_Pro','Source_Sans_3',sans-serif] text-[14px] leading-[18px] tracking-[-0.01em]",
        "hover:text-[var(--ps-prim-blue-600)] hover:underline hover:underline-offset-[3px] hover:decoration-1",
      )}
    >
      <span className="inline-flex items-center justify-center w-[7px] h-[10px] flex-shrink-0">
        <Chevron direction="left" />
      </span>
      {label}
    </a>
  </nav>
);

// ══════════════════════════════════════════════════════════════════
// Accordion — single collapsible card
// ══════════════════════════════════════════════════════════════════

interface AccordionProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Optional badge / count rendered next to chevron */
  meta?: React.ReactNode;
  /** Show the leading 6-dot drag handle (default true) */
  showDragHandle?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  variant?: "default" | "row" | "filled";
  children?: React.ReactNode;
  className?: string;
}

const DragDots: React.FC = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path
      d="M6.66675 4.99909L6.67175 4.99909M6.66675 9.99909L6.67175 9.99909M6.66675 14.9991L6.67175 14.9991M13.3284 4.99909L13.3334 4.99909M13.3284 9.99908L13.3334 9.99908M13.3284 14.9991L13.3334 14.9991"
      stroke="currentColor"
      strokeWidth="1.88"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  meta,
  showDragHandle = false,
  open,
  defaultOpen = false,
  onToggle,
  variant = "default",
  children,
  className = "",
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const panelId = React.useId();

  const toggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  };

  const shell =
    variant === "row"
      ? "border-0 border-b border-[var(--ps-prim-gray-150)] rounded-none bg-transparent"
      : variant === "filled"
        ? "border-2 border-[var(--ps-prim-blue-200)] rounded bg-[var(--ps-prim-blue-50)]"
        : "border-2 border-[var(--ps-prim-gray-150)] rounded bg-white";

  const headerBg =
    variant === "filled"
      ? "bg-[var(--ps-prim-blue-50)] hover:bg-[var(--ps-prim-blue-100)]"
      : "bg-transparent hover:bg-[var(--ps-prim-gray-50)]";

  const headerPad = variant === "row" ? "py-3.5 px-0" : "px-[26px] py-4 min-h-[60px]";

  return (
    <div
      data-open={isOpen}
      className={cxL("overflow-hidden font-['Source_Sans_Pro',sans-serif] transition-colors", shell, className)}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        className={cxL(
          "flex items-center justify-between gap-4 w-full border-0 cursor-pointer text-left transition-colors",
          "focus-visible:outline-2 focus-visible:outline-[var(--ps-prim-blue-500)] focus-visible:-outline-offset-2",
          headerPad,
          headerBg,
        )}
      >
        {showDragHandle && (
          <span className="inline-flex items-center justify-center w-5 h-5 flex-shrink-0 text-[var(--ps-prim-gray-700)] cursor-grab">
            <DragDots />
          </span>
        )}
        <span className="flex flex-col gap-1 min-w-0 flex-1">
          <span className="font-light text-[25px] leading-none text-black tracking-[-0.028em]">
            {title}
          </span>
          {subtitle && (
            <span className="text-[14px] leading-[1.4] text-[var(--ps-prim-gray-600)] mt-1.5">{subtitle}</span>
          )}
        </span>
        <span className="flex items-center gap-3.5 flex-shrink-0">
          {meta}
          <svg
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className={cxL(
              "w-3.5 h-3.5 flex-shrink-0 text-[var(--ps-prim-gray-600)] transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          >
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      <div
        id={panelId}
        className={cxL(
          "overflow-hidden transition-[max-height] duration-200 ease-out",
          isOpen ? "max-h-[1200px]" : "max-h-0",
        )}
        style={{ borderTop: isOpen && variant !== "row" ? "1px solid var(--ps-prim-gray-150)" : "1px solid transparent" }}
      >
        <div className="px-6 pt-5 pb-6 text-[14px] leading-[1.6] text-[var(--ps-prim-gray-800)]">{children}</div>
      </div>
    </div>
  );
};

interface AccordionCountProps {
  children: React.ReactNode;
  tone?: "info" | "critical";
}

const AccordionCount: React.FC<AccordionCountProps> = ({ children, tone = "info" }) => (
  <span
    className={cxL(
      "inline-flex items-center px-2.5 py-1 rounded-[30px] text-[13px] font-semibold leading-none",
      tone === "critical"
        ? "bg-[var(--ps-prim-red-150)] text-[var(--ps-prim-red-600)] border border-[var(--ps-prim-red-100)]"
        : "bg-[var(--ps-prim-blue-50)] text-[var(--ps-prim-blue-500)]",
    )}
  >
    {children}
  </span>
);

// ══════════════════════════════════════════════════════════════════
// Stepper — horizontal & vertical
// ══════════════════════════════════════════════════════════════════

type StepStatus = "complete" | "current" | "pending" | "error" | "disabled";

interface Step {
  id?: string;
  label?: React.ReactNode;
  sub?: React.ReactNode;
  status?: StepStatus;
  onClick?: () => void;
}

interface StepperProps {
  steps: Step[];
  orientation?: "horizontal" | "vertical";
  /** Compact dot-only variant */
  compact?: boolean;
  ariaLabel?: string;
  className?: string;
}

const stepCircleClasses = (status: StepStatus): string => {
  switch (status) {
    case "complete":
      return "bg-[var(--ps-prim-blue-500)] border-[var(--ps-prim-blue-500)] text-white";
    case "current":
      return "bg-white border-[var(--ps-prim-blue-500)] text-[var(--ps-prim-blue-500)] shadow-[0_0_0_4px_var(--ps-prim-blue-50)]";
    case "error":
      return "bg-[var(--ps-prim-red-150)] border-[var(--ps-prim-red-700)] text-[var(--ps-prim-red-700)]";
    case "disabled":
      return "bg-[var(--ps-prim-gray-50)] border-[var(--ps-prim-gray-200)] text-[var(--ps-prim-gray-400)]";
    default:
      return "bg-white border-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-600)]";
  }
};

const stepLabelClasses = (status: StepStatus): string => {
  switch (status) {
    case "complete":
      return "text-[var(--ps-prim-blue-500)] font-semibold";
    case "current":
      return "text-[var(--ps-prim-blue-800)] font-bold";
    case "error":
      return "text-[var(--ps-prim-red-700)] font-semibold";
    case "disabled":
      return "text-[var(--ps-prim-gray-400)]";
    default:
      return "text-[var(--ps-prim-gray-700)]";
  }
};

const CheckGlyph: React.FC = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Stepper: React.FC<StepperProps> = ({
  steps,
  orientation = "horizontal",
  compact = false,
  ariaLabel = "Progress",
  className = "",
}) => {
  const isVertical = orientation === "vertical";
  return (
    <ol
      aria-label={ariaLabel}
      className={cxL(
        "list-none m-0 p-0 font-['Source_Sans_Pro','Source_Sans_3',sans-serif]",
        isVertical ? "flex flex-col items-start max-w-[280px]" : "flex items-start w-full max-w-[560px]",
        className,
      )}
    >
      {steps.map((step, i) => {
        const status: StepStatus = step.status ?? "pending";
        const isLast = i === steps.length - 1;
        const number = i + 1;

        const connectorPos = isVertical
          ? `absolute left-[15px] top-[32px] w-0.5 ${isLast ? "hidden" : "block"} h-[calc(100%-32px)]`
          : `absolute top-[15px] left-[calc(50%+22px)] right-[calc(-50%+22px)] h-0.5 ${isLast ? "hidden" : "block"}`;
        const connectorColor = status === "complete" ? "bg-[var(--ps-prim-blue-500)]" : "bg-[var(--ps-prim-gray-300)]";

        const circleDim = compact ? "w-3.5 h-3.5 border-0" : "w-8 h-8 border-2";
        const circleBg = compact
          ? status === "complete" || status === "current"
            ? "bg-[var(--ps-prim-blue-500)]"
            : "bg-[var(--ps-prim-gray-300)]"
          : "";
        const circleClasses = compact ? `${circleDim} ${circleBg}` : `${circleDim} ${stepCircleClasses(status)}`;

        return (
          <li
            key={step.id ?? i}
            aria-current={status === "current" ? "step" : undefined}
            onClick={step.onClick}
            className={cxL(
              "relative text-center",
              isVertical
                ? "flex flex-row items-start text-left gap-3.5 pb-6 w-full flex-none last:pb-0"
                : "flex flex-col items-center flex-1",
              step.onClick && "cursor-pointer",
            )}
          >
            <span className={connectorPos + " " + connectorColor + (compact ? " " + (isVertical ? "h-[calc(100%-14px)] top-[14px]" : "top-[6px] left-[calc(50%+9px)] right-[calc(-50%+9px)]") : "")} />
            <span
              className={cxL(
                "relative z-[1] inline-flex items-center justify-center rounded-full font-bold text-[14px] leading-none transition-all duration-150",
                circleClasses,
              )}
            >
              {compact ? null : status === "complete" ? <CheckGlyph /> : status === "error" ? "!" : number}
            </span>
            {!compact && step.label && (
              <span
                className={cxL(
                  "text-[14px] leading-[1.3]",
                  isVertical ? "mt-1.5" : "mt-2.5 max-w-[140px]",
                  stepLabelClasses(status),
                )}
              >
                {step.label}
                {step.sub && (
                  <span className="block text-[12px] text-[var(--ps-prim-gray-500)] leading-[1.4] mt-0.5 font-normal">{step.sub}</span>
                )}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
};

// ── Window export so other Babel-loaded scripts can read these ───
declare const window: Window & {
  Breadcrumb?: typeof Breadcrumb;
  BreadcrumbBack?: typeof BreadcrumbBack;
  Accordion?: typeof Accordion;
  AccordionCount?: typeof AccordionCount;
  Stepper?: typeof Stepper;
};
if (typeof window !== "undefined") {
  Object.assign(window, { Breadcrumb, BreadcrumbBack, Accordion, AccordionCount, Stepper });
}

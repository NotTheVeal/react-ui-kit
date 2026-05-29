// ════════════════════════════════════════════════════════════════
// AUTO-GENERATED FROM src/ — do NOT hand-edit.
// Source: UI Kit/src/Feedback.tsx · run `npm run sync:browser`.
// ════════════════════════════════════════════════════════════════
// ──────────────────────────────────────────────────────────────────
// Feedback.tsx — PartsSource Design System
//
// Avatar      — circular identity marker (initials / image / brand)
// Tooltip     — soft-dark hover/focus bubble (4 placements + rich)
// Skeleton    — loading shimmer primitive
// EmptyState  — "nothing here yet" panel with icon + CTA
// ErrorPage   — full-page error layout (404 / 500 / 403 / offline)
//
// Sourced 1-for-1 from the preview/*.html pages.
// ──────────────────────────────────────────────────────────────────

const cxF = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// ══════════════════════════════════════════════════════════════════
// Avatar
// ══════════════════════════════════════════════════════════════════

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarTone =
  | "blue"
  | "green"
  | "orange"
  | "purple"
  | "red"
  | "neutral"
  | "brand"
  | "inverse";
type AvatarStatus = "online" | "busy" | "away" | "offline";

interface AvatarProps {
  /** Display name. Initials derived from first letter of first + last words. */
  name?: string;
  /** Override initials directly (1 or 2 chars). */
  initials?: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  tone?: AvatarTone;
  status?: AvatarStatus;
  className?: string;
}

const avatarSize: Record<AvatarSize, { box: string; font: string; px: number }> = {
  xs: { box: "w-6 h-6", font: "text-[10px]", px: 24 },
  sm: { box: "w-8 h-8", font: "text-[12px]", px: 32 },
  md: { box: "w-10 h-10", font: "text-[14px]", px: 40 },
  lg: { box: "w-14 h-14", font: "text-[18px]", px: 56 },
  xl: { box: "w-20 h-20", font: "text-[26px]", px: 80 },
};

const avatarTone: Record<AvatarTone, string> = {
  blue:    "bg-[var(--ps-prim-blue-50)] text-[var(--ps-prim-blue-500)]",
  green:   "bg-[var(--ps-prim-green-50)] text-[var(--ps-prim-green-600)]",
  orange:  "bg-[var(--ps-prim-orange-50)] text-[var(--ps-prim-amber-700)]",
  purple:  "bg-[var(--ps-prim-blue-100)] text-[var(--ps-prim-blue-600)]",
  red:     "bg-[var(--ps-prim-red-150)] text-[var(--ps-prim-red-600)]",
  neutral: "bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-800)]",
  brand:   "bg-[var(--ps-prim-blue-500)] text-white",
  inverse: "bg-white text-[var(--ps-prim-blue-500)] border border-[var(--ps-prim-blue-500)]",
};

const avatarStatusColor: Record<AvatarStatus, string> = {
  online:  "bg-[var(--ps-prim-green-600)]",
  busy:    "bg-[var(--ps-prim-amber-700)]",
  away:    "bg-[var(--ps-prim-gray-500)]",
  offline: "bg-[var(--ps-prim-gray-300)]",
};

const deriveInitials = (name?: string): string => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  name,
  initials,
  src,
  alt,
  size = "md",
  tone = "blue",
  status,
  className = "",
}) => {
  const sz = avatarSize[size];
  const label = initials ?? deriveInitials(name);
  const shouldShowImage = Boolean(src);
  return (
    <span className={cxF("relative inline-flex", className)}>
      <span
        className={cxF(
          "inline-flex items-center justify-center rounded-full overflow-hidden font-bold uppercase select-none align-middle",
          "font-['Source_Sans_Pro',sans-serif]",
          sz.box,
          sz.font,
          shouldShowImage ? "bg-white" : avatarTone[tone],
        )}
      >
        {shouldShowImage ? (
          <img src={src} alt={alt ?? name ?? ""} className="w-full h-full object-cover block" />
        ) : (
          label
        )}
      </span>
      {status && (
        <span
          aria-label={status}
          className={cxF(
            "absolute bottom-0 right-0 rounded-full border-2 border-white",
            avatarStatusColor[status],
          )}
          style={{ width: `${Math.max(8, sz.px * 0.25)}px`, height: `${Math.max(8, sz.px * 0.25)}px` }}
        />
      )}
    </span>
  );
};

// ── AvatarGroup ─────────────────────────────────────────────────
interface AvatarGroupProps {
  children: React.ReactNode;
  overflow?: number;
  size?: AvatarSize;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, overflow, size = "md" }) => {
  const sz = avatarSize[size];
  return (
    <span className="inline-flex">
      {React.Children.map(children, (child, i) => (
        <span
          key={i}
          className="ring-2 ring-white rounded-full"
          style={{ marginLeft: i === 0 ? 0 : -10 }}
        >
          {child}
        </span>
      ))}
      {overflow !== undefined && overflow > 0 && (
        <span className="ring-2 ring-white rounded-full" style={{ marginLeft: -10 }}>
          <span
            className={cxF(
              "inline-flex items-center justify-center rounded-full bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-700)] font-bold",
              "font-['Source_Sans_Pro',sans-serif]",
              sz.box,
              sz.font,
            )}
          >
            +{overflow}
          </span>
        </span>
      )}
    </span>
  );
};

// ══════════════════════════════════════════════════════════════════
// Tooltip — soft-dark bubble with caret. Hover/focus to show.
// ══════════════════════════════════════════════════════════════════

type TooltipPlacement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  label: React.ReactNode;
  placement?: TooltipPlacement;
  /** Max width in px for the bubble. */
  maxWidth?: number;
  children: React.ReactNode;
}

const caretPos = (p: TooltipPlacement) => {
  switch (p) {
    case "top":
      return "top-full left-6 border-t-[var(--ps-prim-gray-750)]";
    case "bottom":
      return "bottom-full left-6 border-b-[var(--ps-prim-gray-750)]";
    case "left":
      return "left-full top-1/2 -translate-y-1/2 border-l-[var(--ps-prim-gray-750)]";
    case "right":
      return "right-full top-1/2 -translate-y-1/2 border-r-[var(--ps-prim-gray-750)]";
  }
};

const bubblePos = (p: TooltipPlacement) => {
  switch (p) {
    case "top":
      return "bottom-[calc(100%+10px)] left-0";
    case "bottom":
      return "top-[calc(100%+10px)] left-0";
    case "left":
      return "right-[calc(100%+10px)] top-1/2 -translate-y-1/2";
    case "right":
      return "left-[calc(100%+10px)] top-1/2 -translate-y-1/2";
  }
};

const Tooltip: React.FC<TooltipProps> = ({
  label,
  placement = "top",
  maxWidth = 280,
  children,
}) => {
  const id = React.useId();
  return (
    <span
      tabIndex={0}
      className="relative inline-flex group focus-within:outline-none"
    >
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement, { "aria-describedby": id })
        : children}
      <span
        id={id}
        role="tooltip"
        style={{ maxWidth: `${maxWidth}px` }}
        className={cxF(
          "absolute z-10 bg-[var(--ps-prim-gray-750)] text-white text-[14px] leading-[1.5] font-normal w-max",
          "px-4 py-2.5 rounded-lg shadow-[0_4px_14px_rgba(0,0,0,0.18)]",
          "font-['Source_Sans_Pro',sans-serif] pointer-events-none",
          "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150",
          bubblePos(placement),
        )}
      >
        {label}
        <span
          aria-hidden="true"
          className={cxF(
            "absolute border-[7px] border-transparent",
            caretPos(placement),
          )}
        />
      </span>
    </span>
  );
};

// ── Rich tooltip — info icon + title + body + optional CTA ──────
interface TooltipRichProps {
  title: React.ReactNode;
  body: React.ReactNode;
  cta?: { label: string; onClick?: () => void };
  className?: string;
}

const TooltipRich: React.FC<TooltipRichProps> = ({ title, body, cta, className = "" }) => (
  <div
    role="tooltip"
    className={cxF(
      "relative bg-[var(--ps-prim-gray-750)] text-white rounded-[10px] shadow-[0_6px_20px_rgba(0,0,0,0.22)]",
      "font-['Source_Sans_Pro',sans-serif] max-w-[380px]",
      "pl-14 pr-6 py-5",
      className,
    )}
  >
    <span className="absolute left-[18px] top-[18px] w-6 h-6 rounded-full bg-white text-[var(--ps-prim-gray-800)] inline-flex items-center justify-center">
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    </span>
    <h3 className="m-0 mb-2 text-[16px] font-bold leading-[1.25]">{title}</h3>
    <p className="m-0 mb-3.5 text-[14px] leading-[1.55] text-white/90">{body}</p>
    {cta && (
      <button
        type="button"
        onClick={cta.onClick}
        className="text-[13px] font-bold uppercase tracking-[0.5px] text-white bg-transparent border-0 cursor-pointer hover:text-[var(--ps-prim-blue-300)]"
      >
        {cta.label}
      </button>
    )}
  </div>
);

// ══════════════════════════════════════════════════════════════════
// Skeleton — shimmering placeholder
// ══════════════════════════════════════════════════════════════════

type SkeletonShape = "text" | "title" | "bar" | "circle" | "block" | "button" | "input";

interface SkeletonProps {
  shape?: SkeletonShape;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const skeletonShape: Record<SkeletonShape, string> = {
  text:   "h-3.5 w-full rounded-[3px]",
  title:  "h-[22px] w-3/5 rounded",
  bar:    "h-[18px]",
  circle: "rounded-full",
  block:  "h-[120px] w-full rounded-md",
  button: "h-10 w-[140px] rounded",
  input:  "h-12 w-full rounded-[3px]",
};

const Skeleton: React.FC<SkeletonProps> = ({
  shape = "text",
  width,
  height,
  className = "",
}) => (
  <span
    aria-hidden="true"
    style={{
      width: width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
      height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
    }}
    className={cxF(
      "inline-block align-middle",
      "bg-[linear-gradient(90deg,var(--ps-prim-gray-150)_0%,var(--ps-prim-gray-200)_50%,var(--ps-prim-gray-150)_100%)]",
      "bg-[length:200%_100%]",
      "animate-[sk_1.4s_ease-in-out_infinite]",
      "motion-reduce:animate-none motion-reduce:bg-[var(--ps-prim-gray-150)]",
      skeletonShape[shape],
      className,
    )}
  />
);

// Keyframes injected once on first mount (Tailwind Play CDN doesn't ship `sk`)
const SkeletonKeyframes: React.FC = () => {
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("__sk-keyframes")) return;
    const s = document.createElement("style");
    s.id = "__sk-keyframes";
    s.textContent = `@keyframes sk{0%{background-position:0% 0}100%{background-position:-200% 0}}`;
    document.head.appendChild(s);
  }, []);
  return null;
};

// ── Spinner ────────────────────────────────────────────────────
const LoadingSpinner: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = "",
}) => (
  <span
    role="status"
    aria-label="Loading"
    style={{ width: size, height: size, borderWidth: size >= 40 ? 3 : 2.5 }}
    className={cxF(
      "inline-block rounded-full border-[var(--ps-prim-gray-200)] border-t-[var(--ps-prim-blue-500)] animate-spin motion-reduce:[animation-duration:2.5s]",
      className,
    )}
  />
);

// ══════════════════════════════════════════════════════════════════
// EmptyState
// ══════════════════════════════════════════════════════════════════

type EmptyTone = "info" | "neutral" | "success" | "warning" | "error";

interface EmptyStateProps {
  title: React.ReactNode;
  body?: React.ReactNode;
  /** Icon node — rendered inside a 64×64 tinted halo (48×48 in inline mode). */
  icon?: React.ReactNode;
  tone?: EmptyTone;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  inline?: boolean;
  className?: string;
}

const emptyToneClasses: Record<EmptyTone, string> = {
  info:    "bg-[var(--ps-prim-blue-50)] text-[var(--ps-prim-blue-500)]",
  neutral: "bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-600)]",
  success: "bg-[var(--ps-prim-green-50)] text-[var(--ps-prim-green-600)]",
  warning: "bg-[var(--ps-prim-orange-50)] text-[var(--ps-prim-amber-700)]",
  error:   "bg-[var(--ps-prim-red-150)] text-[var(--ps-prim-red-600)]",
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  body,
  icon,
  tone = "info",
  primaryAction,
  secondaryAction,
  inline = false,
  className = "",
}) => (
  <div
    className={cxF(
      "bg-white border border-[var(--ps-prim-gray-200)] rounded-lg",
      "flex flex-col items-center justify-center text-center gap-3",
      "font-['Source_Sans_Pro',sans-serif]",
      inline ? "px-5 py-8 min-h-[200px]" : "px-8 py-12 min-h-[280px]",
      className,
    )}
  >
    {icon && (
      <div
        className={cxF(
          "rounded-full inline-flex items-center justify-center mb-1",
          inline ? "w-12 h-12" : "w-16 h-16",
          emptyToneClasses[tone],
        )}
      >
        <span className={inline ? "w-[22px] h-[22px] inline-flex" : "w-7 h-7 inline-flex"}>
          {icon}
        </span>
      </div>
    )}
    <h3 className={cxF("m-0 font-bold text-[var(--ps-prim-blue-800)] leading-[1.25]", inline ? "text-[16px]" : "text-[20px]")}>
      {title}
    </h3>
    {body && (
      <p className={cxF("m-0 leading-[1.55] text-[var(--ps-prim-gray-700)] max-w-[380px]", inline ? "text-[13px]" : "text-[14px]")}>
        {body}
      </p>
    )}
    {(primaryAction || secondaryAction) && (
      <div className="mt-2 flex gap-2.5 flex-wrap justify-center">
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            className="h-10 px-[18px] rounded border-2 border-[var(--ps-prim-blue-500)] bg-[var(--ps-prim-blue-500)] text-white text-[14px] font-semibold cursor-pointer hover:bg-[var(--ps-prim-blue-600)] hover:border-[var(--ps-prim-blue-600)]"
          >
            {primaryAction.label}
          </button>
        )}
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="h-10 px-[18px] rounded border-2 border-[var(--ps-prim-blue-500)] bg-white text-[var(--ps-prim-blue-500)] text-[14px] font-semibold cursor-pointer hover:bg-[var(--ps-prim-blue-50)] hover:border-[var(--ps-prim-blue-600)] hover:text-[var(--ps-prim-blue-600)]"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    )}
  </div>
);

// ══════════════════════════════════════════════════════════════════
// ErrorPage — full-page 404 / 500 / 403 / offline scaffold
// ══════════════════════════════════════════════════════════════════

interface ErrorPageProps {
  /** Big numeric code (e.g. "404"). Mutually exclusive with `icon`. */
  code?: React.ReactNode;
  icon?: React.ReactNode;
  iconTone?: "info" | "warn" | "error";
  title: React.ReactNode;
  body?: React.ReactNode;
  primaryAction?: { label: string; icon?: React.ReactNode; onClick?: () => void };
  secondaryAction?: { label: string; onClick?: () => void };
  className?: string;
}

const errorIconTone: Record<NonNullable<ErrorPageProps["iconTone"]>, string> = {
  info:  "bg-[var(--ps-prim-blue-50)] text-[var(--ps-prim-blue-500)]",
  warn:  "bg-[var(--ps-prim-orange-50)] text-[var(--ps-prim-amber-700)]",
  error: "bg-[var(--ps-prim-red-150)] text-[var(--ps-prim-red-600)]",
};

const ErrorPage: React.FC<ErrorPageProps> = ({
  code,
  icon,
  iconTone = "error",
  title,
  body,
  primaryAction,
  secondaryAction,
  className = "",
}) => (
  <div
    className={cxF(
      "bg-white border border-[var(--ps-prim-gray-200)] rounded-lg",
      "flex flex-col items-center text-center gap-3.5 min-h-[360px]",
      "px-12 py-16 font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    {code && (
      <div className="text-[128px] font-light leading-none text-[var(--ps-prim-blue-500)] tracking-[-0.04em] mb-1.5">
        {code}
      </div>
    )}
    {!code && icon && (
      <div
        className={cxF(
          "w-16 h-16 rounded-full inline-flex items-center justify-center mb-1.5",
          errorIconTone[iconTone],
        )}
      >
        <span className="w-7 h-7 inline-flex">{icon}</span>
      </div>
    )}
    <h2 className="m-0 text-[22px] font-bold text-[var(--ps-prim-blue-800)] leading-[1.25]">{title}</h2>
    {body && (
      <p className="m-0 text-[15px] leading-[1.55] text-[var(--ps-prim-gray-700)] max-w-[420px]">{body}</p>
    )}
    {(primaryAction || secondaryAction) && (
      <div className="mt-2.5 flex gap-2.5 flex-wrap justify-center">
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            className="inline-flex items-center gap-1.5 h-10 px-[18px] rounded bg-[var(--ps-prim-blue-500)] text-white text-[14px] font-semibold cursor-pointer border-0 hover:bg-[var(--ps-prim-blue-600)]"
          >
            {primaryAction.icon}
            {primaryAction.label}
          </button>
        )}
        {secondaryAction && (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            className="h-10 px-[18px] rounded border border-[var(--ps-prim-gray-300)] bg-white text-[var(--ps-prim-gray-700)] text-[14px] font-semibold cursor-pointer hover:bg-[var(--ps-prim-blue-500)] hover:text-white hover:border-[var(--ps-prim-blue-500)]"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    )}
  </div>
);

// ── Window export so other Babel-loaded scripts can read these ───
declare const window: Window & {
  Avatar?: typeof Avatar;
  AvatarGroup?: typeof AvatarGroup;
  Tooltip?: typeof Tooltip;
  TooltipRich?: typeof TooltipRich;
  Skeleton?: typeof Skeleton;
  SkeletonKeyframes?: typeof SkeletonKeyframes;
  Spinner?: typeof LoadingSpinner;
  EmptyState?: typeof EmptyState;
  ErrorPage?: typeof ErrorPage;
};
if (typeof window !== "undefined") {
  Object.assign(window, { Avatar, AvatarGroup, Tooltip, TooltipRich, Skeleton, SkeletonKeyframes, Spinner: LoadingSpinner, EmptyState, ErrorPage });
}

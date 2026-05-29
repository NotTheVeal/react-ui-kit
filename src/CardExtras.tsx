import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// CardExtras.tsx — PartsSource Design System
//
// Four additional card families from preview/cards.html that weren't
// covered by Card.tsx:
//
//   AiDataCard      — 348px AI-generated product+delivery card
//   ProductCard     — 500–620px full product detail card
//   AnalyticsCard   — KPI tile (wide / square / highlighted)
//   ListCard        — 294px list/product/create/standing variants
//
// All four are direct ports of the markup + tokens in
// preview/cards.html — copy is editable, structure is fixed.
// ──────────────────────────────────────────────────────────────────

const cxX = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// ══════════════════════════════════════════════════════════════════
// AiDataCard — Figma "AI Data Cards · 348px"
// ══════════════════════════════════════════════════════════════════

type AiBadgeTone = "notShipped" | "urgent" | "pending";

interface AiBadge {
  tone: AiBadgeTone;
  label: string;
}

interface AiDataCardProps {
  title: string;
  manufacturer?: string;
  meta?: React.ReactNode;
  badges?: AiBadge[];
  cost?: string;
  costLabel?: string;
  className?: string;
}

const aiBadgeTones: Record<AiBadgeTone, string> = {
  notShipped: "bg-[var(--ps-prim-gray-200)] text-[var(--ps-prim-gray-450)]",
  urgent:     "bg-[var(--ps-prim-orange-200)] text-[var(--ps-prim-orange-700)]",
  pending:    "bg-[var(--ps-prim-sky-100)] text-[var(--ps-prim-sky-700)]",
};

const AiDataCard: React.FC<AiDataCardProps> = ({
  title,
  manufacturer,
  meta,
  badges,
  cost,
  costLabel = "Cost:",
  className = "",
}) => (
  <article
    className={cxX(
      "w-[348px] rounded-lg p-4 flex flex-col gap-4 cursor-pointer",
      "bg-[var(--ps-prim-gray-100)] border border-[var(--ps-prim-gray-200)] shadow-[0_4px_12px_rgba(0,0,0,0.04)]",
      "hover:bg-[var(--ps-prim-blue-25)] transition-colors",
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    <div className="flex flex-col gap-1">
      <h3 className="m-0 text-[16px] font-bold leading-none text-[var(--ps-prim-gray-700)]">{title}</h3>
      {manufacturer && (
        <p className="m-0 text-[14px] leading-none text-[var(--ps-prim-gray-600)]">{manufacturer}</p>
      )}
    </div>
    {meta && (
      <div className="flex flex-col gap-1 text-[14px] leading-none text-[var(--ps-prim-gray-600)]">{meta}</div>
    )}
    <div className="w-full h-px bg-[var(--ps-prim-gray-200)]" />
    <div className="flex items-end justify-between gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        {badges?.map((b, i) => (
          <span
            key={i}
            className={cxX(
              "px-1 py-1 rounded text-[12px] font-bold leading-3 whitespace-nowrap",
              aiBadgeTones[b.tone],
            )}
          >
            {b.label}
          </span>
        ))}
      </div>
      {cost && (
        <div className="flex items-end gap-2">
          <span className="text-[14px] leading-none text-[var(--ps-prim-gray-500)]">{costLabel}</span>
          <span className="text-[16px] font-bold leading-none text-[var(--ps-prim-gray-700)]">{cost}</span>
        </div>
      )}
    </div>
  </article>
);

// ══════════════════════════════════════════════════════════════════
// ProductCard — Figma "Product Cards — Dynamic 500PX"
// Header (View Details + date) → title → image + info → status footer → actions
// ══════════════════════════════════════════════════════════════════

interface ProductCardProps {
  title: string;
  href?: string;
  detailsLabel?: string;
  date?: string;
  imageUrl?: string;
  info: Array<{ label: string; value: React.ReactNode }>;
  statusTitle?: string;
  statusBody?: React.ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  width?: number;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  href = "#",
  detailsLabel = "View Details",
  date,
  imageUrl,
  info,
  statusTitle,
  statusBody,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  width = 500,
  className = "",
}) => (
  <article
    className={cxX(
      "bg-white border border-[var(--ps-prim-gray-300)] rounded flex flex-col font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
    style={{ width, padding: "25px 29px 0" }}
  >
    {/* Header */}
    <div className="flex items-center justify-between">
      <a href={href} className="text-[14px] text-[var(--ps-prim-gray-600)] hover:underline no-underline">
        {detailsLabel}
      </a>
      {date && (
        <span className="text-[13px] font-bold text-[var(--ps-prim-gray-900)] uppercase">{date}</span>
      )}
    </div>

    {/* Title */}
    <h3 className="m-0 mt-[15px] mb-8 text-[16px] font-bold leading-[1.3]">
      <a href={href} className="text-[var(--ps-prim-blue-500)] no-underline hover:underline">
        {title}
      </a>
    </h3>

    {/* Body — image + info */}
    <div className="flex gap-8 mb-0">
      <div className="w-[100px] h-[100px] flex-shrink-0">
        {imageUrl ? (
          <img src={imageUrl} alt="" className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-[var(--ps-prim-gray-100)] border border-[var(--ps-prim-gray-200)] rounded" />
        )}
      </div>
      <div className="flex-1 text-[16px] leading-[1.5] text-[var(--ps-prim-gray-900)]">
        {info.map((row, i) => (
          <div key={i}>
            <span className="font-normal">{row.label}:</span>{" "}
            <span className="font-semibold">{row.value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Status footer */}
    {(statusTitle || statusBody) && (
      <div
        className="bg-[var(--ps-prim-gray-150)] py-4 mt-8 mb-5"
        style={{ marginLeft: -29, marginRight: -29 }}
      >
        <div className="px-[29px] text-[16px] leading-[1.5]">
          {statusTitle && (
            <div className="font-bold text-[var(--ps-prim-gray-900)] mb-1">{statusTitle}</div>
          )}
          {statusBody && <div className="text-[var(--ps-prim-gray-900)]">{statusBody}</div>}
        </div>
      </div>
    )}

    {/* Actions */}
    {(primaryLabel || secondaryLabel) && (
      <div
        className="flex items-center justify-end gap-3 bg-white"
        style={{ padding: "16px 20px 20px", marginLeft: -29, marginRight: -29 }}
      >
        {secondaryLabel && (
          <button
            type="button"
            onClick={onSecondary}
            className={cxX(
              "h-[44.5px] px-6 rounded border border-[var(--ps-prim-gray-300)] bg-white text-[var(--ps-prim-gray-700)]",
              "text-[12px] font-bold cursor-pointer transition-colors",
              "hover:bg-[var(--ps-prim-blue-500)] hover:text-white hover:border-[var(--ps-prim-blue-500)]",
              "font-['Source_Sans_Pro',sans-serif]",
            )}
          >
            {secondaryLabel}
          </button>
        )}
        {primaryLabel && (
          <button
            type="button"
            onClick={onPrimary}
            className={cxX(
              "h-[44.5px] px-6 rounded bg-[var(--ps-prim-orange-400)] text-white border-0 cursor-pointer",
              "text-[13px] font-bold uppercase tracking-[0.5px] hover:bg-[var(--ps-prim-orange-500)]",
              "font-['Source_Sans_Pro',sans-serif]",
            )}
          >
            {primaryLabel}
          </button>
        )}
      </div>
    )}
  </article>
);

// ══════════════════════════════════════════════════════════════════
// AnalyticsCard — Figma node 4100:12161
// Wide variant: centered metric + divider + delta + benchmark
// Square variant: left-aligned metric + label + sub
// ══════════════════════════════════════════════════════════════════

type AnalyticsLayout = "wide" | "square";

interface AnalyticsCardProps {
  layout?: AnalyticsLayout;
  icon?: React.ReactNode;
  title: string;
  value: string;
  label?: string;
  delta?: { value: string; direction: "up" | "down" };
  deltaSuffix?: string;
  benchmark?: string;
  sub?: string;
  highlight?: boolean;
  linkLabel?: string;
  onLink?: () => void;
  showMenu?: boolean;
  className?: string;
}

const TrendArrow: React.FC<{ direction: "up" | "down" }> = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={{ width: 12, height: 12 }}
  >
    {direction === "up" ? (
      <>
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </>
    ) : (
      <>
        <path d="M12 5v14" />
        <path d="M5 12l7 7 7-7" />
      </>
    )}
  </svg>
);

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  layout = "square",
  icon,
  title,
  value,
  label,
  delta,
  deltaSuffix = "vs last year",
  benchmark,
  sub,
  highlight = false,
  linkLabel,
  onLink,
  showMenu = false,
  className = "",
}) => {
  const wide = layout === "wide";
  return (
    <article
      className={cxX(
        // Figma node 4100:12161 — width auto/337, radius 5, **2px** var(--ps-prim-gray-150) border,
        // padding 16. Soft shadow is hover-only.
        "rounded-[5px] p-4 flex flex-col gap-1 cursor-pointer",
        "font-['Source_Sans_Pro',sans-serif] transition-all",
        "hover:-translate-y-0.5",
        highlight
          ? "bg-[var(--ps-prim-blue-50)] border-2 border-[var(--ps-prim-blue-400)] hover:shadow-[0_4px_14px_rgba(0,91,166,0.18)]"
          : "bg-white border-2 border-[var(--ps-prim-gray-150)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
        wide ? "max-w-[480px]" : "max-w-[300px]",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[14px] leading-none text-[var(--ps-prim-gray-700)]">
          {icon && <span className="w-4 h-4 text-[var(--ps-prim-gray-700)] inline-flex items-center">{icon}</span>}
          {title}
        </div>
        {linkLabel ? (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLink?.();
            }}
            // Figma: 12px / var(--ps-prim-gray-700) / underlined
            className="text-[12px] text-[var(--ps-prim-gray-700)] underline decoration-1 underline-offset-[3px] hover:text-[var(--ps-prim-blue-500)] hover:decoration-[var(--ps-prim-blue-500)]"
          >
            {linkLabel}
          </a>
        ) : showMenu ? (
          <button
            type="button"
            aria-label="Card options"
            className="w-7 h-7 inline-flex items-center justify-center bg-transparent border-0 rounded cursor-pointer text-[var(--ps-prim-gray-800)] hover:bg-[var(--ps-prim-gray-150)]"
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        ) : null}
      </header>

      {wide ? (
        <>
          <div className="flex items-baseline justify-center gap-3 pt-2 pb-3.5 border-b border-[var(--ps-prim-gray-150)]">
            {/* Figma: 34px / regular weight / var(--ps-prim-gray-700). */}
            <span className="text-[34px] font-normal text-[var(--ps-prim-gray-700)] leading-none">
              {value}
            </span>
            {label && <span className="text-[14px] text-[var(--ps-prim-gray-600)]">{label}</span>}
          </div>
          {delta && (
            <div className="flex items-center justify-center gap-2 pt-1.5 text-[14px] text-[var(--ps-prim-gray-700)]">
              <span
                className={cxX(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-[30px] text-[14px] font-semibold",
                  delta.direction === "up"
                    ? "bg-[var(--ps-prim-green-150)] text-[var(--ps-prim-green-700)]"
                    : "bg-[var(--ps-prim-red-150)] text-[var(--ps-prim-red-700)]",
                )}
              >
                {delta.value}
                <TrendArrow direction={delta.direction} />
              </span>
              {deltaSuffix}
            </div>
          )}
          {benchmark && (
            <div className="text-center text-[14px] text-[var(--ps-prim-gray-600)]">{benchmark}</div>
          )}
        </>
      ) : (
        <>
          <div className="flex items-baseline gap-2 pt-3">
            <span className="text-[34px] font-normal text-[var(--ps-prim-gray-700)] leading-none">
              {value}
            </span>
            {label && <span className="text-[16px] text-[var(--ps-prim-gray-700)]">{label}</span>}
          </div>
          {sub && <div className="text-[14px] text-[var(--ps-prim-gray-700)]">{sub}</div>}
        </>
      )}
    </article>
  );
};

// ══════════════════════════════════════════════════════════════════
// ListCard — Figma node 4100:12056
// Variants: list | product | create | standing
// ══════════════════════════════════════════════════════════════════

type ListPillTone = "shopping" | "preventative" | "restocking";

interface ListPill {
  tone: ListPillTone;
  label: string;
}

const listPillTones: Record<ListPillTone, string> = {
  shopping:     "bg-[var(--ps-prim-purple-50)] text-[var(--ps-prim-purple-700)]",
  preventative: "bg-[var(--ps-prim-sky-50)] text-[var(--ps-prim-sky-500)]",
  restocking:   "bg-[var(--ps-prim-pink-100)] text-[var(--ps-prim-pink-600)]",
};

// ─── ListCard (default — list variant) ─────────────────────────────
interface ListCardListProps {
  variant?: "list";
  title: string;
  pill?: ListPill;
  count?: string;
  shareCount?: number;
  showSort?: boolean;
  onSort?: () => void;
  className?: string;
}

// ─── ListCard (product variant) ────────────────────────────────────
interface ListCardProductProps {
  variant: "product";
  title: string;
  imageUrl?: string;
  price?: string;
  condition?: React.ReactNode;
  qty?: number;
  onQtyChange?: (qty: number) => void;
  onAddToCart?: () => void;
  onRemove?: () => void;
  className?: string;
}

// ─── ListCard (create-new variant) ─────────────────────────────────
interface ListCardCreateProps {
  variant: "create";
  title?: string;
  description?: string;
  onCreate?: () => void;
  className?: string;
}

// ─── ListCard (standing-order variant) ─────────────────────────────
interface ListCardStandingProps {
  variant: "standing";
  title: string;
  meta?: Array<{ label: string; value: React.ReactNode }>;
  statusLabel?: string;
  statusDate?: string;
  shareCount?: number;
  className?: string;
}

type ListCardProps =
  | ListCardListProps
  | ListCardProductProps
  | ListCardCreateProps
  | ListCardStandingProps;

const ShareIcon: React.FC = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const ListCard: React.FC<ListCardProps> = (props) => {
  const base =
    "w-[294px] bg-white border border-[var(--ps-prim-gray-200)] rounded-md shadow-[0_0_4px_rgba(0,0,0,0.10)] " +
    "flex flex-col overflow-hidden font-['Source_Sans_Pro',sans-serif]";

  // ── list variant ──
  if (!props.variant || props.variant === "list") {
    const p = props as ListCardListProps;
    return (
      <article className={cxX(base, p.className)}>
        <div className="p-5 flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="m-0 text-[22px] font-light text-[var(--ps-prim-gray-900)] leading-[1.2] tracking-[-0.005em]">
              {p.title}
            </h3>
            {p.showSort !== false && (
              <button
                type="button"
                aria-label="Sort"
                onClick={p.onSort}
                className="w-4 h-4 text-[var(--ps-prim-gray-600)] bg-transparent border-0 cursor-pointer p-0"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m21 16-4 4-4-4" />
                  <path d="M17 20V4" />
                  <path d="m3 8 4-4 4 4" />
                  <path d="M7 4v16" />
                </svg>
              </button>
            )}
          </div>
          {p.pill && (
            <span
              className={cxX(
                "inline-flex items-center self-start px-3.5 py-1 rounded-[40px]",
                "text-[12px] font-bold uppercase leading-[1.2]",
                listPillTones[p.pill.tone],
              )}
            >
              {p.pill.label}
            </span>
          )}
          {p.count && (
            <div className="text-[14px] font-bold text-[var(--ps-prim-gray-900)]">{p.count}</div>
          )}
        </div>
        <div className="border-t border-[var(--ps-prim-gray-300)] px-5 py-2.5 flex items-center gap-2 text-[14px] text-[var(--ps-prim-gray-600)]">
          <ShareIcon />
          <span>{p.shareCount ?? 0}</span>
        </div>
      </article>
    );
  }

  // ── product variant ──
  if (props.variant === "product") {
    const p = props;
    return (
      <article className={cxX(base, p.className)}>
        <div className="aspect-square bg-[var(--ps-prim-gray-150)] flex items-center justify-center border-b border-[var(--ps-prim-gray-150)] p-[18px]">
          {p.imageUrl ? (
            <img src={p.imageUrl} alt="" className="max-w-full max-h-full object-contain" />
          ) : (
            <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="var(--ps-prim-gray-500)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          )}
        </div>
        <div className="p-5 flex flex-col gap-2 flex-1">
          <h3 className="m-0 text-[16px] font-bold text-[var(--ps-prim-blue-500)] uppercase leading-[1.3]">
            {p.title}
          </h3>
          {p.price && (
            <div className="text-[16px] font-bold text-[var(--ps-prim-gray-900)] mt-1.5">{p.price}</div>
          )}
          {p.condition && (
            <div className="text-[14px] text-[var(--ps-prim-gray-900)] leading-[1.4]">{p.condition}</div>
          )}
          <div className="flex items-center gap-3 mt-[18px]">
            <label className="text-[14px] text-[var(--ps-prim-gray-900)]" htmlFor="lc-qty">
              Qty:
            </label>
            <select
              id="lc-qty"
              value={p.qty ?? 1}
              onChange={(e) => p.onQtyChange?.(Number(e.target.value))}
              className="w-[60px] h-8 border border-[var(--ps-prim-gray-400)] rounded bg-white px-2.5 text-[14px] text-[var(--ps-prim-gray-900)] cursor-pointer"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={p.onAddToCart}
              className="flex-1 h-10 px-4 bg-[var(--ps-prim-orange-400)] text-white border-0 rounded text-[14px] font-bold uppercase tracking-[0.6px] cursor-pointer hover:bg-[var(--ps-prim-orange-500)]"
            >
              Add to Cart
            </button>
          </div>
          {p.onRemove && (
            <button
              type="button"
              onClick={p.onRemove}
              className="mt-4 self-start text-[12px] font-bold text-[var(--ps-prim-gray-600)] uppercase tracking-[0.6px] bg-transparent border-0 p-0 cursor-pointer hover:text-[var(--ps-prim-blue-500)]"
            >
              Remove Item
            </button>
          )}
        </div>
      </article>
    );
  }

  // ── create variant ──
  if (props.variant === "create") {
    const p = props;
    return (
      <article
        onClick={p.onCreate}
        className={cxX(
          base,
          "items-center text-center cursor-pointer hover:bg-[var(--ps-prim-gray-50)]",
          p.className,
        )}
      >
        <div className="px-5 py-7 flex flex-col items-center gap-2">
          <span className="w-10 h-10 rounded-full bg-[var(--ps-prim-green-100)] text-[var(--ps-prim-green-600)] inline-flex items-center justify-center mb-3">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <h3 className="m-0 text-[18px] font-normal text-[var(--ps-prim-gray-900)]">
            {p.title ?? "Create New List"}
          </h3>
          <p className="m-0 text-[14px] text-[var(--ps-prim-gray-900)] leading-[1.45] max-w-[220px]">
            {p.description ??
              "Create shopping lists, repair lists, preventative maintenance lists, or restocking lists"}
          </p>
        </div>
      </article>
    );
  }

  // ── standing-order variant ──
  const p = props as ListCardStandingProps;
  return (
    <article className={cxX(base, p.className)}>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="m-0 text-[22px] font-light text-[var(--ps-prim-gray-900)] leading-[1.2] tracking-[-0.005em]">
          {p.title}
        </h3>
        {p.meta && (
          <div className="flex flex-col gap-1.5 mt-3.5 text-[14px] text-[var(--ps-prim-gray-900)] leading-[1.5]">
            {p.meta.map((row, i) => (
              <div key={i}>
                <b>{row.label}:</b> {row.value}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-[var(--ps-prim-blue-50)] px-5 py-3 flex items-center gap-2 text-[14px] font-bold text-[var(--ps-prim-blue-500)]">
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>{p.statusLabel ?? "Upcoming Order"}</span>
        {p.statusDate && <span className="ml-auto font-bold">{p.statusDate}</span>}
      </div>
      <div className="border-t border-[var(--ps-prim-gray-300)] px-5 py-2.5 flex items-center gap-2 text-[14px] text-[var(--ps-prim-gray-600)]">
        <ShareIcon />
        <span>{p.shareCount ?? 0}</span>
      </div>
    </article>
  );
};

export { AiDataCard, ProductCard, AnalyticsCard, ListCard };

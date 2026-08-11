import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// AiDetailCard.tsx — PartsSource Design System
//
// 1:1 port of Figma "Ai Detail Card" (node 5773:2708).
// An AI-surfaced order detail card: an optional AI-summary bubble
// above a card body that shows the order header, product row,
// configurable detail rows, a delivery-status block, and a feedback
// row (thumbs up/down + sources + timestamp).
//
// property1 "Full" | "Drawer" drives width, radius, padding and the
// Drawer-only border. Every row is toggled by a show* flag whose
// default matches the Figma component.
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

// Inlined lucide glyphs — the kit stays dependency-free (no lucide-react).
// Geometry/viewBox/stroke match lucide 1:1.
interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const Check: React.FC<IconProps> = ({ size = 16, strokeWidth = 2, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ThumbsUp: React.FC<IconProps> = ({ size = 16, strokeWidth = 2, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

const ThumbsDown: React.FC<IconProps> = ({ size = 16, strokeWidth = 2, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M17 14V2" />
    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
  </svg>
);

export interface AiDetailProduct {
  /** Product name — rendered as an underlined brand-blue link. */
  name: string;
  /** Formatted price, e.g. "$225.34". */
  price?: string;
  /** Quantity, e.g. 1. */
  quantity?: number;
  /** Optional "View Details" href. */
  detailsHref?: string;
  /** Optional thumbnail image URL. Falls back to a subtle placeholder. */
  imageUrl?: string;
}

export interface AiDetailCardProps {
  /** Layout — "full" (668px) or "drawer" (354px). */
  variant?: 'full' | 'drawer';
  /** AI-summary text. Rendered in the top bubble when showAiSummary. */
  aiSummary?: string;
  /** Order number shown in the header, e.g. "4821". */
  orderNumber?: string;
  /** Status badge label in the header. */
  status?: string;
  /** Product row content. */
  product?: AiDetailProduct;
  /** Detail-row values. Each renders only when its show* flag is on. */
  facility?: string;
  reference?: string;
  po?: string;
  requester?: string;
  condition?: string;
  vendor?: string;
  carrier?: string;
  tracking?: string;
  created?: string;
  shipTo?: string;
  /** Delivery-status block (green check + date). */
  deliveryStatus?: { date: string };
  /** Feedback row content. */
  feedback?: { sourcesHref?: string; timestamp?: string };

  // Row toggles — defaults mirror the Figma component.
  showAiSummary?: boolean;
  showProductRow?: boolean;
  showStatusSection?: boolean;
  showFeedbackRow?: boolean;
  showFacility?: boolean;
  showRef?: boolean;
  showPo?: boolean;
  showRequester?: boolean;
  showCondition?: boolean;
  showVendor?: boolean;
  showCarrier?: boolean;
  showTracking?: boolean;
  showCreated?: boolean;
  showShipTo?: boolean;
  className?: string;
}

const Divider: React.FC = () => (
  <div className="h-px w-full shrink-0 bg-[var(--ps-sem-border-subtle)]" />
);

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex w-full shrink-0 items-baseline justify-between gap-2 overflow-clip">
    <span className="shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-semibold leading-normal text-[color:var(--ps-sem-fg-tertiary)]">
      {label}
    </span>
    <span className="min-w-px flex-1 truncate text-right text-[length:var(--ps-sem-text-caption)] font-normal leading-normal text-[color:var(--ps-sem-fg-secondary)]">
      {value}
    </span>
  </div>
);

const AiDetailCard: React.FC<AiDetailCardProps> = ({
  variant = 'full',
  aiSummary = 'Summary of this order and its current status, generated from the latest activity.',
  orderNumber,
  status = 'Processing',
  product = {
    name: 'X-RAY TUBE, 40/80 KW',
    price: '$225.34',
    quantity: 1,
    detailsHref: '#',
  },
  facility,
  reference,
  po,
  requester,
  condition,
  vendor,
  carrier,
  tracking,
  created,
  shipTo,
  deliveryStatus = { date: 'Arriving Thu, Aug 14' },
  feedback = { sourcesHref: '#', timestamp: '12:33 PM' },
  showAiSummary = true,
  showProductRow = true,
  showStatusSection = true,
  showFeedbackRow = true,
  showFacility = true,
  showRef = true,
  showPo = true,
  showRequester = false,
  showCondition = false,
  showVendor = false,
  showCarrier = false,
  showTracking = false,
  showCreated = false,
  showShipTo = false,
  className = '',
}) => {
  const isDrawer = variant === 'drawer';

  const rows: Array<{ label: string; value?: string; show: boolean }> = [
    { label: 'Facility', value: facility, show: showFacility },
    { label: 'Reference', value: reference, show: showRef },
    { label: 'PO', value: po, show: showPo },
    { label: 'Requester', value: requester, show: showRequester },
    { label: 'Condition', value: condition, show: showCondition },
    { label: 'Vendor', value: vendor, show: showVendor },
    { label: 'Carrier', value: carrier, show: showCarrier },
    { label: 'Tracking', value: tracking, show: showTracking },
    { label: 'Created', value: created, show: showCreated },
    { label: 'Ship To', value: shipTo, show: showShipTo },
  ];
  const visibleRows = rows.filter((r) => r.show && r.value);

  return (
    <div
      className={cx(
        'flex flex-col items-start gap-[var(--ps-sem-space-stack-sm)]',
        isDrawer ? 'w-[354px]' : 'w-[668px]',
        "font-['Source_Sans_Pro',sans-serif]",
        className,
      )}
    >
      {showAiSummary && aiSummary && (
        <div className="w-full rounded-[var(--ps-sem-radius-surface)] border border-solid border-[var(--ps-sem-border-subtle)] bg-[var(--ps-sem-bg-surface)] px-[var(--ps-sem-space-inset-md)] py-[var(--ps-sem-space-inset-sm)]">
          <p className="m-0 text-[length:var(--ps-sem-text-caption)] font-normal leading-normal text-[color:var(--ps-sem-fg-primary)]">
            {aiSummary}
          </p>
        </div>
      )}

      <article
        className={cx(
          'flex w-full flex-col items-start overflow-clip bg-[var(--ps-sem-bg-surface)]',
          'shadow-[0px_2px_4px_0px_rgba(0,47,72,0.08)]',
          isDrawer
            ? 'gap-[var(--ps-sem-space-stack-md)] rounded-[var(--ps-sem-radius-surface)] border border-solid border-[var(--ps-sem-border-default)] p-[var(--ps-sem-space-inset-lg)]'
            : 'gap-[var(--ps-sem-space-stack-md)] rounded-[var(--ps-sem-radius-control)] p-[var(--ps-sem-space-inset-md)]',
        )}
      >
        {/* Header */}
        <div className="flex w-full items-center justify-between gap-2 overflow-clip">
          <p className="m-0 shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-body)] font-normal leading-normal text-[color:var(--ps-sem-fg-secondary)]">
            Order #: {orderNumber}
          </p>
          {status && (
            <span className="flex shrink-0 items-center overflow-clip rounded-[var(--ps-sem-radius-control)] bg-[var(--ps-sem-bg-subtle)] px-[var(--ps-sem-space-inset-xs)] py-[var(--ps-sem-space-stack-xs)]">
              <span className="whitespace-nowrap text-[length:var(--ps-sem-text-micro)] font-semibold leading-normal text-[color:var(--ps-sem-fg-secondary)]">
                {status}
              </span>
            </span>
          )}
        </div>

        {/* Product row */}
        {showProductRow && product && (
          <div className="flex w-full shrink-0 items-center gap-3 overflow-clip">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt=""
                className="size-14 shrink-0 rounded-[var(--ps-sem-radius-control)] border border-solid border-[var(--ps-sem-border-subtle)] object-cover"
              />
            ) : (
              <div className="size-14 shrink-0 rounded-[var(--ps-sem-radius-control)] border border-solid border-[var(--ps-sem-border-subtle)] bg-[var(--ps-sem-bg-subtle)]" />
            )}
            <div className="flex min-w-px flex-1 flex-col items-start gap-0.5 overflow-clip leading-normal">
              <a
                href={product.detailsHref ?? '#'}
                className="min-w-full truncate text-[length:var(--ps-sem-text-body)] font-bold text-[color:var(--ps-sem-fg-link)] underline"
              >
                {product.name}
              </a>
              <a
                href={product.detailsHref ?? '#'}
                className="text-[length:var(--ps-sem-text-caption)] font-normal text-[color:var(--ps-sem-fg-tertiary)] underline"
              >
                View Details
              </a>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-0.5 leading-normal">
              {product.price && (
                <span className="whitespace-nowrap text-[length:var(--ps-sem-text-body)] font-bold text-[color:var(--ps-sem-fg-primary)]">
                  {product.price}
                </span>
              )}
              {product.quantity != null && (
                <span className="whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-normal text-[color:var(--ps-sem-fg-tertiary)]">
                  Qty {product.quantity}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Detail rows */}
        {visibleRows.length > 0 && (
          <>
            <Divider />
            <div className="flex w-full shrink-0 flex-col items-start gap-[var(--ps-sem-space-stack-xs)]">
              {visibleRows.map((r) => (
                <DetailRow key={r.label} label={r.label} value={r.value as string} />
              ))}
            </div>
          </>
        )}

        {/* Delivery-status section */}
        {showStatusSection && deliveryStatus && (
          <div className="flex w-full shrink-0 items-center gap-2 overflow-clip rounded-[var(--ps-sem-radius-control)] bg-[var(--ps-sem-bg-subtle)] p-[var(--ps-sem-space-inset-md)]">
            <span
              aria-hidden="true"
              className="flex size-3.5 shrink-0 items-center justify-center rounded-[var(--ps-sem-radius-circle)] bg-[var(--ps-sem-success-solid)]"
            >
              <Check size={10} strokeWidth={3} className="text-[color:var(--ps-sem-fg-inverse)]" />
            </span>
            <span className="whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-normal leading-normal text-[color:var(--ps-sem-fg-secondary)]">
              {deliveryStatus.date}
            </span>
          </div>
        )}
      </article>

      {/* Feedback row */}
      {showFeedbackRow && (
        <div className="flex w-full shrink-0 items-center gap-3 overflow-clip">
          <button
            type="button"
            aria-label="Helpful"
            className="flex size-6 shrink-0 items-center justify-center rounded-[var(--ps-sem-radius-control)] text-[color:var(--ps-sem-fg-tertiary)] hover:text-[color:var(--ps-sem-fg-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ps-sem-border-focus)]"
          >
            <ThumbsUp size={16} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Not helpful"
            className="flex size-6 shrink-0 items-center justify-center rounded-[var(--ps-sem-radius-control)] text-[color:var(--ps-sem-fg-tertiary)] hover:text-[color:var(--ps-sem-fg-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--ps-sem-border-focus)]"
          >
            <ThumbsDown size={16} strokeWidth={1.75} />
          </button>
          {feedback?.sourcesHref && (
            <a
              href={feedback.sourcesHref}
              className="text-[length:var(--ps-sem-text-caption)] font-normal text-[color:var(--ps-sem-fg-tertiary)] underline"
            >
              View Sources
            </a>
          )}
          {feedback?.timestamp && (
            <span className="ml-auto whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-normal text-[color:var(--ps-sem-fg-tertiary)]">
              {feedback.timestamp}
            </span>
          )}
        </div>
      )}

    </div>
  );
};

export { AiDetailCard };
export default AiDetailCard;

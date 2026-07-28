import * as React from 'react';
import { CardBrandIcon, type CardBrand } from './CardBrandIcon';

// ──────────────────────────────────────────────────────────────────
// SavedPaymentMethodCard.tsx — PartsSource Design System
//
// 1:1 port of Figma "Saved Payment Method Card" (node 5466:51).
// Horizontal row: brand icon · number + default pill + expiry ·
// Edit / Remove inline actions.
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const BRAND_NAMES: Record<CardBrand, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  discover: 'Discover',
};

export interface SavedPaymentMethodCardProps {
  /** Payment network — drives the brand icon and label. */
  brand: CardBrand;
  /** Last four digits of the card. */
  last4: string;
  /** Expiry string, e.g. "08/27". */
  expires: string;
  /** Marks this card as the account default (shows the pill). */
  isDefault?: boolean;
  onEdit?: () => void;
  onRemove?: () => void;
  className?: string;
}

const InlineAction: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(
      'shrink-0 whitespace-nowrap bg-transparent p-0',
      'text-[length:var(--ps-sem-text-caption)] font-semibold leading-normal',
      'text-[color:var(--ps-sem-fg-brand)] underline-offset-2 hover:underline',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
      'focus-visible:outline-[var(--ps-sem-border-focus)]',
    )}
  >
    {children}
  </button>
);

const SavedPaymentMethodCard: React.FC<SavedPaymentMethodCardProps> = ({
  brand,
  last4,
  expires,
  isDefault = false,
  onEdit,
  onRemove,
  className = '',
}) => (
  <article
    className={cx(
      'flex w-[354px] items-center gap-3 overflow-clip',
      'rounded-[var(--ps-sem-radius-surface)] border border-solid border-[var(--ps-sem-border-subtle)]',
      'bg-[var(--ps-sem-bg-surface)] p-[var(--ps-sem-space-inset-lg)]',
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    <CardBrandIcon brand={brand} />

    <div className="flex min-w-px flex-1 flex-col items-start gap-0.5 overflow-clip leading-normal">
      <div className="flex w-full items-center gap-2 overflow-clip">
        <p className="shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-body)] font-semibold text-[color:var(--ps-sem-fg-primary)]">
          {BRAND_NAMES[brand]} •••• {last4}
        </p>
        {isDefault && (
          <span className="flex shrink-0 items-center overflow-clip rounded-[var(--ps-sem-radius-pill)] bg-[var(--ps-sem-bg-subtle)] px-[var(--ps-sem-space-inset-md)] py-[var(--ps-sem-space-stack-xs)]">
            <span className="shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-semibold leading-normal text-[color:var(--ps-sem-fg-secondary)]">
              Default
            </span>
          </span>
        )}
      </div>
      <p className="shrink-0 whitespace-nowrap text-[length:var(--ps-sem-text-caption)] font-normal text-[color:var(--ps-sem-fg-secondary)]">
        Expires {expires}
      </p>
    </div>

    <div className="flex shrink-0 items-center gap-3 overflow-clip">
      <InlineAction onClick={onEdit}>Edit</InlineAction>
      <InlineAction onClick={onRemove}>Remove</InlineAction>
    </div>
  </article>
);

export { SavedPaymentMethodCard };
export default SavedPaymentMethodCard;

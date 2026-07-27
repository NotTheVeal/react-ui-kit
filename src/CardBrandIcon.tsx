import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// CardBrandIcon.tsx — PartsSource Design System
//
// 1:1 port of Figma "CardBrandIcon" component set (node 5468:58).
// Brands: Visa / Mastercard / Amex / Discover, each a 44×28 mark.
// Brand colours are INTENTIONALLY literal (payment-network brand
// guidelines), not design tokens — this is the one sanctioned raw
// colour exception in the kit.
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover';

export interface CardBrandIconProps {
  /** Which payment network mark to render. */
  brand: CardBrand;
  /** Accessible label. Defaults to the brand's display name. */
  title?: string;
  className?: string;
}

const LABELS: Record<CardBrand, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
};

const Mark: React.FC<{ brand: CardBrand }> = ({ brand }) => {
  switch (brand) {
    case 'visa':
      return (
        <text
          x="22" y="19" textAnchor="middle"
          fontFamily="'Source_Sans_Pro',sans-serif" fontSize="13"
          fontWeight="700" fontStyle="italic" fill="#1A1F71"
          letterSpacing="0.5"
        >
          VISA
        </text>
      );
    case 'mastercard':
      return (
        <g>
          <circle cx="18" cy="14" r="8" fill="#EB001C" />
          <circle cx="26" cy="14" r="8" fill="#F79E1B" fillOpacity="0.9" />
        </g>
      );
    case 'amex':
      return (
        <g>
          <rect x="4" y="6" width="36" height="16" rx="2" fill="#2E77BC" />
          <text
            x="22" y="18" textAnchor="middle"
            fontFamily="'Source_Sans_Pro',sans-serif" fontSize="8"
            fontWeight="700" fill="#FFFFFF" letterSpacing="0.5"
          >
            AMEX
          </text>
        </g>
      );
    case 'discover':
      return (
        <g>
          <text
            x="4" y="19" fontFamily="'Source_Sans_Pro',sans-serif"
            fontSize="8" fontWeight="700" fill="#1A1F36"
          >
            DISC
          </text>
          <circle cx="34" cy="14" r="6" fill="#FF6000" />
        </g>
      );
  }
};

const CardBrandIcon: React.FC<CardBrandIconProps> = ({
  brand,
  title,
  className = '',
}) => (
  <svg
    role="img"
    aria-label={title ?? LABELS[brand]}
    viewBox="0 0 44 28"
    className={cx(
      'block h-7 w-11 shrink-0 rounded-[var(--ps-sem-radius-control)]',
      'border border-solid border-[var(--ps-sem-border-subtle)] bg-white',
      className,
    )}
  >
    <Mark brand={brand} />
  </svg>
);

export { CardBrandIcon };
export default CardBrandIcon;

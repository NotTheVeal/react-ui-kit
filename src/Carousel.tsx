import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Carousel.tsx — PartsSource Design System
//
// Horizontal scrolling row of cards with prev/next chevron controls and
// an optional header (title left, "View …" link right). Matches the
// Figma /Carousel component (node 4552:947 — "You Left Off Here").
//
// The track is a native horizontally-scrollable flex row, so it works
// with the keyboard and touch out of the box; the chevrons page the
// scroll position by one viewport width. Arrows disable at each end.
// ──────────────────────────────────────────────────────────────────

interface CarouselProps {
  /** Section heading shown at the top-left. */
  title?: string;
  /** Optional link shown at the top-right (e.g. "View Shopping History"). */
  linkLabel?: string;
  onLinkClick?: () => void;
  /** Cards / items to scroll through. */
  children: React.ReactNode;
  /** Gap between items, in px. */
  gap?: number;
  /** Accessible label for the scroll region. */
  'aria-label'?: string;
  className?: string;
}

const cxCarousel = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const ChevronIcon: React.FC<{ dir: 'left' | 'right' }> = ({ dir }) => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Carousel: React.FC<CarouselProps> = ({
  title,
  linkLabel,
  onLinkClick,
  children,
  gap = 24,
  'aria-label': ariaLabel,
  className = '',
}) => {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const updateEdges = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= maxScroll - 1);
  }, []);

  React.useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges]);

  const page = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'left' ? -el.clientWidth : el.clientWidth, behavior: 'smooth' });
  };

  const arrowBase =
    'shrink-0 grid place-items-center w-9 h-9 rounded-full bg-white border border-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-700)] transition-colors hover:border-[var(--ps-prim-blue-500)] hover:text-[var(--ps-prim-blue-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-prim-blue-500)] focus-visible:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-[var(--ps-prim-gray-300)] disabled:hover:text-[var(--ps-prim-gray-700)]';

  return (
    <div className={cxCarousel("w-full font-['Source_Sans_Pro',sans-serif]", className)}>
      {(title || linkLabel) && (
        <div className="flex items-baseline gap-3 mb-4">
          {title && (
            <h2 className="text-[22px] font-light text-[var(--ps-prim-gray-800)] m-0">{title}</h2>
          )}
          {linkLabel && (
            <button
              type="button"
              onClick={onLinkClick}
              className="inline-flex items-center gap-1 bg-transparent border-0 p-0 text-[14px] font-bold text-[var(--ps-prim-blue-500)] cursor-pointer hover:underline"
            >
              {linkLabel}
              <ChevronIcon dir="right" />
            </button>
          )}
        </div>
      )}

      <div className="relative flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          className={arrowBase}
          disabled={atStart}
          onClick={() => page('left')}
        >
          <ChevronIcon dir="left" />
        </button>

        <div
          ref={trackRef}
          role="group"
          aria-label={ariaLabel || title || 'Carousel'}
          className="flex-1 flex overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ gap }}
        >
          {children}
        </div>

        <button
          type="button"
          aria-label="Next"
          className={arrowBase}
          disabled={atEnd}
          onClick={() => page('right')}
        >
          <ChevronIcon dir="right" />
        </button>
      </div>
    </div>
  );
};

export { Carousel };
export type { CarouselProps };

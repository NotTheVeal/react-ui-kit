import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// CMS.tsx — PartsSource Design System (Bloomreach blocks)
//
// Banner:    Full-bleed hero with title, body, CTA on a background image.
// ImageBlock: Two-column hero — image on left or right, content on the other.
// TextBlock: Long-form text container with title + rich content.
// CardGrid:  Responsive grid of feature/benefit cards.
//
// Pulled from preview/cms-components.html.
// ──────────────────────────────────────────────────────────────────

interface BannerProps {
  title: React.ReactNode;
  body?: React.ReactNode;
  ctaLabel?: string;
  onCta?: () => void;
  imageUrl?: string;
  overlay?: number;        // 0..1
  className?: string;
}

interface ImageBlockProps {
  title: React.ReactNode;
  body?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

interface TextBlockProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

interface CardGridItem {
  id?: string;
  title: React.ReactNode;
  text: React.ReactNode;
  imageUrl?: string;
}

interface CardGridProps {
  cards: CardGridItem[];
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  cardStyle?: "outlined" | "elevated";
  className?: string;
}

const cxCms = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

const Banner: React.FC<BannerProps> = ({
  title,
  body,
  ctaLabel,
  onCta,
  imageUrl,
  overlay = 0.45,
  className = "",
}) => (
  <section
    className={cxCms(
      "relative overflow-hidden rounded-lg w-full min-h-[320px] flex items-center",
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
    style={{
      backgroundImage: imageUrl
        ? `url(${imageUrl})`
        : "linear-gradient(135deg, var(--ps-prim-blue-700) 0%, var(--ps-prim-blue-500) 100%)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {imageUrl && (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: `rgba(0,47,72,${overlay})` }}
      />
    )}
    <div className="relative z-10 max-w-[640px] px-10 py-12 text-white">
      <h2 className="m-0 text-[40px] font-light leading-[1.15] tracking-[-0.01em]">{title}</h2>
      {body && <p className="m-0 mt-4 text-[18px] leading-[1.55] text-white/90">{body}</p>}
      {ctaLabel && (
        <button
          type="button"
          onClick={onCta}
          className="mt-6 h-12 px-7 rounded-[100px] bg-[var(--ps-prim-orange-400)] text-white text-[14px] font-bold uppercase tracking-[0.5px] border-0 cursor-pointer hover:bg-[var(--ps-prim-orange-500)]"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  </section>
);

const ImageBlock: React.FC<ImageBlockProps> = ({
  title,
  body,
  imageUrl,
  imageAlt = "",
  imagePosition = "right",
  ctaLabel,
  onCta,
  className = "",
}) => (
  <section
    className={cxCms(
      "grid grid-cols-1 md:grid-cols-2 gap-10 items-center font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    <div className={cxCms(imagePosition === "right" ? "md:order-1" : "md:order-2")}>
      <h2 className="m-0 text-[32px] font-light leading-[1.2] text-[var(--ps-prim-blue-800)] tracking-[-0.01em]">
        {title}
      </h2>
      {body && <p className="m-0 mt-4 text-[16px] leading-[1.6] text-[var(--ps-prim-gray-700)]">{body}</p>}
      {ctaLabel && (
        <button
          type="button"
          onClick={onCta}
          className="mt-6 h-12 px-7 rounded border-2 border-[var(--ps-prim-blue-500)] bg-white text-[var(--ps-prim-blue-500)] text-[15px] font-normal cursor-pointer hover:bg-[var(--ps-prim-blue-500)] hover:text-white"
        >
          {ctaLabel}
        </button>
      )}
    </div>
    <div
      className={cxCms(
        "rounded-lg overflow-hidden bg-[var(--ps-prim-gray-150)] aspect-[4/3]",
        imagePosition === "right" ? "md:order-2" : "md:order-1",
      )}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover block" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[var(--ps-prim-gray-500)]">
          <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
      )}
    </div>
  </section>
);

const TextBlock: React.FC<TextBlockProps> = ({ title, children, className = "" }) => (
  <section className={cxCms("max-w-[760px] font-['Source_Sans_Pro',sans-serif]", className)}>
    {title && (
      <h2 className="m-0 mb-4 text-[28px] font-light leading-[1.2] text-[var(--ps-prim-blue-800)]">{title}</h2>
    )}
    <div className="text-[16px] leading-[1.7] text-[var(--ps-prim-gray-700)]">{children}</div>
  </section>
);

const gapMap = { sm: "gap-3", md: "gap-6", lg: "gap-10" };
const colsMap = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

const CardGrid: React.FC<CardGridProps> = ({
  cards,
  columns = 3,
  gap = "md",
  cardStyle = "outlined",
  className = "",
}) => (
  <div
    className={cxCms(
      "grid grid-cols-1",
      colsMap[columns],
      gapMap[gap],
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    {cards.map((card, i) => (
      <article
        key={card.id ?? i}
        className={cxCms(
          "rounded-lg overflow-hidden bg-white",
          cardStyle === "outlined" ? "border border-[var(--ps-prim-gray-200)]" : "shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="aspect-[16/9] bg-[var(--ps-prim-gray-150)]">
          {card.imageUrl ? (
            <img src={card.imageUrl} alt="" className="w-full h-full object-cover" />
          ) : null}
        </div>
        <div className="p-5">
          <h3 className="m-0 text-[18px] font-bold text-[var(--ps-prim-blue-800)] leading-[1.3]">{card.title}</h3>
          <p className="m-0 mt-2 text-[14px] leading-[1.6] text-[var(--ps-prim-gray-700)]">{card.text}</p>
        </div>
      </article>
    ))}
  </div>
);

export { Banner, ImageBlock, TextBlock, CardGrid };

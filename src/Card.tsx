import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Card.tsx — PartsSource Design System
//
// Variants:  event | status | alert | product
//
// EventCard   — 317px wide, icon header + metadata rows + footer link
// StatusCard  — 220×73, compact horizontal image+title+meta
// AlertCard   — 220 medium, image/icon + status badge + meta block
//
// Pulled from preview/cards.html + Figma Cards page.
// ──────────────────────────────────────────────────────────────────

const cxCard = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// ── EventCard ────────────────────────────────────────────────────
interface MetaRow {
  label: string;
  value: React.ReactNode;
}

interface EventCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconFg?: string;
  meta: MetaRow[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  className?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  subtitle,
  icon,
  iconBg = "var(--ps-prim-blue-100)",
  iconFg = "var(--ps-prim-blue-500)",
  meta,
  ctaLabel = "View Details",
  onCtaClick,
  className = "",
}) => (
  <article
    className={cxCard(
      "group w-[317px] bg-white border border-[var(--ps-prim-gray-300)] rounded overflow-hidden",
      "flex flex-col cursor-pointer transition-shadow duration-200",
      "hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)]",
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    <div className="flex-1 flex flex-col px-[21px] pt-[23px] pb-[13px]">
      <header className="flex items-center gap-2.5 h-[46px] mb-[18px]">
        <div
          className="w-[46px] h-[46px] rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ background: iconBg, color: iconFg }}
        >
          {icon}
        </div>
        <div className="flex-1 flex flex-col gap-1 pt-[3px]">
          <h3 className="m-0 text-[19px] font-bold leading-[18px] text-[var(--ps-prim-gray-700)] tracking-[-0.01em]">
            {title}
          </h3>
          {subtitle && (
            <p className="m-0 text-[16px] leading-[18px] text-[var(--ps-prim-gray-600)]">
              {subtitle}
            </p>
          )}
        </div>
      </header>
      <dl className="m-0 flex flex-col text-[16px] leading-[18px] text-[var(--ps-prim-gray-600)]">
        {meta.map((row, i) => (
          <div key={i} className="flex gap-1.5">
            <dt className="font-normal text-[var(--ps-prim-gray-600)]">{row.label}:</dt>
            <dd className="m-0">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
    <footer className="bg-[var(--ps-prim-gray-50)] border-t border-[var(--ps-prim-gray-150)] py-[18px] flex items-center justify-center min-h-[56px]">
      <button
        type="button"
        onClick={onCtaClick}
        className="inline-flex items-center gap-1.5 bg-transparent border-0 cursor-pointer text-[var(--ps-prim-blue-400)] text-[16px] font-semibold no-underline hover:underline"
      >
        {ctaLabel}
        <svg width={14} height={14} viewBox="0 0 14 12" fill="none" aria-hidden="true">
          <path
            d="M8 1L13 6M13 6L8 11M13 6H1"
            stroke="currentColor"
            strokeWidth="1.125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </footer>
  </article>
);

// ── StatusCard ───────────────────────────────────────────────────
interface StatusCardProps {
  title: string;
  meta: string;
  thumbnail?: React.ReactNode;
  thumbnailBg?: string;
  onClick?: () => void;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  meta,
  thumbnail,
  thumbnailBg = "var(--ps-prim-gray-400)",
  onClick,
  className = "",
}) => (
  <article
    onClick={onClick}
    className={cxCard(
      "w-[220px] h-[73px] bg-white border border-[var(--ps-prim-gray-300)] rounded p-3.5",
      "flex items-center gap-3 cursor-pointer transition-shadow duration-200",
      "hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)]",
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    <div
      className="w-11 h-11 rounded-[2px] flex-shrink-0 flex items-center justify-center"
      style={{ background: thumbnailBg }}
    >
      {thumbnail}
    </div>
    <div className="flex-1 min-w-0">
      <p className="m-0 text-[12px] leading-none text-[var(--ps-prim-gray-900)]">{title}</p>
      <p className="m-0 mt-1 text-[10px] leading-[1.48] text-[var(--ps-prim-gray-650)] truncate">
        {meta}
      </p>
    </div>
  </article>
);

// ── AlertCard ────────────────────────────────────────────────────
type AlertSeverity = "info" | "warning" | "error" | "success";

interface AlertCardProps {
  title: string;
  subtitle?: string;
  severity?: AlertSeverity;
  thumbnail?: React.ReactNode;
  thumbnailBg?: string;
  location?: string;
  datetime?: string;
  onClick?: () => void;
  className?: string;
}

const severityRing: Record<AlertSeverity, string> = {
  info:    "bg-[var(--ps-prim-blue-500)]",
  warning: "bg-[var(--ps-prim-orange-400)]",
  error:   "bg-[var(--ps-prim-red-700)]",
  success: "bg-[var(--ps-prim-green-700)]",
};

const AlertCard: React.FC<AlertCardProps> = ({
  title,
  subtitle,
  severity = "info",
  thumbnail,
  thumbnailBg = "var(--ps-prim-gray-400)",
  location,
  datetime,
  onClick,
  className = "",
}) => (
  <article
    onClick={onClick}
    className={cxCard(
      "w-[220px] bg-white border border-[var(--ps-prim-gray-300)] rounded p-3.5",
      "flex flex-col gap-2.5 cursor-pointer transition-shadow duration-200",
      "hover:shadow-[0_5px_8px_rgba(21,21,21,0.12)]",
      "font-['Source_Sans_Pro',sans-serif]",
      className,
    )}
  >
    <div className="flex gap-2.5 items-start">
      <div
        className="w-[44.45px] h-[44.45px] rounded-[2px] flex-shrink-0"
        style={{ background: thumbnailBg }}
      >
        {thumbnail}
      </div>
      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <p
          className={cxCard(
            "m-0 text-[12px] leading-none break-words",
            severity === "error" ? "text-[var(--ps-prim-red-700)]" : "text-[var(--ps-prim-gray-900)]",
          )}
        >
          {title}
        </p>
        {subtitle && (
          <p className="m-0 text-[10px] font-normal leading-[1.48] text-[var(--ps-prim-gray-650)]">
            {subtitle}
          </p>
        )}
      </div>
      <div
        className={cxCard(
          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
          severityRing[severity],
        )}
      >
        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M6 3v3M6 8.5v.01"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
    {(location || datetime) && (
      <>
        <div className="h-[0.823px] bg-black/15 -mx-3.5" />
        <div className="flex flex-col text-[10px] leading-[1.48]">
          {location && <p className="m-0 text-[var(--ps-prim-gray-900)]">{location}</p>}
          {datetime && (
            <p className="m-0 flex items-center gap-1 text-[var(--ps-prim-gray-650)]">
              <span className="w-[3.29px] h-[3.29px] rounded-full bg-black/15 inline-block" />
              {datetime}
            </p>
          )}
        </div>
      </>
    )}
  </article>
);

export { EventCard, StatusCard, AlertCard };

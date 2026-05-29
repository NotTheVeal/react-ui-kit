import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Badge.tsx — PartsSource Design System
//
// StatusBadge: small rectangular badge for order/asset status
//              (e.g. "In Stock", "Urgent", "Pending"). 4px radius,
//              12px Source Sans Pro Bold, 4×8 padding.
//
// ListTypeBadge: rounded pill badge for catalog categories
//              (Shopping List, PM List, Restocking). 40px radius, uppercase.
//
// Pulled from preview/badges.html.
// ──────────────────────────────────────────────────────────────────

type StatusTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "critical"
  | "items";

type ListTone = "shopping" | "preventative" | "restocking";

interface StatusBadgeProps {
  children: React.ReactNode;
  tone?: StatusTone;
  className?: string;
}

interface ListTypeBadgeProps {
  children: React.ReactNode;
  tone?: ListTone;
  className?: string;
}

const cxBadge = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// Status badge — 4px top/bottom, 8px left/right padding
const statusTones: Record<StatusTone, string> = {
  neutral:  "bg-[var(--ps-prim-gray-200)] text-[var(--ps-prim-gray-700)]",
  info:     "bg-[var(--ps-prim-blue-25)] text-[var(--ps-prim-blue-500)]",
  success:  "bg-[var(--ps-prim-green-50)] text-[var(--ps-prim-green-600)]",
  warning:  "bg-[var(--ps-prim-orange-50)] text-[var(--ps-prim-amber-700)]",
  critical: "bg-[var(--ps-prim-red-50)] text-[var(--ps-prim-red-600)]",
  items:    "bg-[var(--ps-prim-blue-25)] text-[var(--ps-prim-blue-500)]",
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  tone = "neutral",
  className = "",
}) => (
  <span
    className={cxBadge(
      "inline-flex items-center justify-center px-2 py-1 rounded-[4px] text-[12px] leading-none font-bold gap-2",
      "font-['Source_Sans_Pro',sans-serif]",
      statusTones[tone],
      className,
    )}
  >
    {children}
  </span>
);

// Figma node 4391:44856 — `Property 1=Purple` (and siblings).
// Authoritative palette pulled straight from the .fig:
//   Purple:  bg var(--ps-prim-blue-100) / text var(--ps-prim-blue-600)
//   Blue:    bg var(--ps-prim-blue-50) / text var(--ps-prim-blue-500) (preventative)
//   Pink:    bg var(--ps-prim-red-50) / text var(--ps-prim-red-600) (restocking)
// Font is **Inter** (not Source Sans Pro), 12px / 700, +0.5px letter-spacing.
const listTones: Record<ListTone, string> = {
  shopping:     "bg-[var(--ps-prim-purple-100)] text-[var(--ps-prim-purple-600)]",
  preventative: "bg-[var(--ps-prim-sky-50)] text-[var(--ps-prim-sky-600)]",
  restocking:   "bg-[var(--ps-prim-pink-50)] text-[var(--ps-prim-pink-700)]",
};

const ListTypeBadge: React.FC<ListTypeBadgeProps> = ({
  children,
  tone = "shopping",
  className = "",
}) => (
  <span
    className={cxBadge(
      "inline-flex items-center px-4 py-1.5 rounded-[40px] text-[12px] font-bold uppercase tracking-[0.5px]",
      "font-['Inter',sans-serif]",
      listTones[tone],
      className,
    )}
  >
    {children}
  </span>
);

export { StatusBadge, ListTypeBadge };

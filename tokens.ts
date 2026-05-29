/* ================================================================
   PartsSource Design System — TypeScript design tokens
   Mirror of tokens.css for component consumption.
   ================================================================ */

// ── Brand Blue ramp ──────────────────────────────────────────────
const psBlue = {
  50:  "#EFF9FE",
  100: "#D0EDFC",
  150: "#DCEAED",
  200: "#B0C6D3",
  300: "#6AC7FC",
  400: "#009CF4",
  500: "#005BA6", // PS Blue — brand anchor
  600: "#004A84",
  700: "#003763",
  800: "#002F48", // Midnight
  900: "#001D2E",
} as const;

// ── Neutral / Gray ramp ──────────────────────────────────────────
const psGray = {
  0:   "#FFFFFF",
  50:  "#FAFAFA",
  100: "#F5F5F5",
  150: "#F1F1F1",
  200: "#E6E6E6",
  300: "#DCDCDC",
  400: "#CCCCCC",
  500: "#949494",
  600: "#777777",
  650: "#5C5C5C",
  700: "#4A4A4A",
  800: "#2B2B2B",
  900: "#000000",
} as const;

// ── Orange (deprecated CTAs only) ────────────────────────────────
const psOrange = {
  50:  "#FFF4E5",
  100: "#FFCA82",
  400: "#FF9505",
  500: "#EC8000",
  600: "#D27200",
} as const;

// ── Status colors ────────────────────────────────────────────────
const psStatus = {
  successFg: "#0E7C55",
  successBg: "#E2F5EE",
  errorFg:   "#E00000",
  errorBg:   "#FEF0F0",
  warningFg: "#B45309",
  warningBg: "#FEF4E5",
  infoFg:    "#005BA6",
  infoBg:    "#EFF9FE",
} as const;

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary" | "tertiary" | "pill" | "ghost";
type State = "default" | "hover" | "focus" | "pressed" | "disabled" | "loading";

// Force-load Tailwind classes used dynamically (safelist hints — referenced for grep).
const _safelist = "";

// Re-export for window scope so Babel-loaded scripts can share.
declare const window: Window & { psTokens?: Record<string, unknown> };
if (typeof window !== "undefined") {
  window.psTokens = { psBlue, psGray, psOrange, psStatus };
}

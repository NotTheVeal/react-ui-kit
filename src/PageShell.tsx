import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// PageShell.tsx — PartsSource Design System
//
// The responsive layout wrapper (Figma /Page Shell, node 4152:56).
// Centers page content, caps it at 1440px, and applies the responsive
// content padding from the pageShell tokens:
//   ≥1920px → 48px · ≥1440px → 32px · tablet → 24px · mobile → 16px
// Background uses the page surface token.
//
// Padding is driven by a scoped stylesheet (one media-query set injected
// once) because Tailwind utilities can't express these exact breakpoints.
// ──────────────────────────────────────────────────────────────────

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

const STYLE_ID = 'ps-pageshell-styles';

const pageShellCss = `
.ps-page-shell{width:100%;background:var(--ps-sem-surface-page,var(--ps-prim-gray-25));min-height:100%;}
.ps-page-shell__inner{max-width:1440px;margin-left:auto;margin-right:auto;padding-left:16px;padding-right:16px;box-sizing:border-box;}
@media (min-width:768px){.ps-page-shell__inner{padding-left:24px;padding-right:24px;}}
@media (min-width:1440px){.ps-page-shell__inner{padding-left:32px;padding-right:32px;}}
@media (min-width:1920px){.ps-page-shell__inner{padding-left:48px;padding-right:48px;}}
`;

const usePageShellStyles = () => {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = pageShellCss;
    document.head.appendChild(el);
  }, []);
};

const cxShell = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const PageShell: React.FC<PageShellProps> = ({ children, className = '' }) => {
  usePageShellStyles();
  return (
    <div className={cxShell("ps-page-shell font-['Source_Sans_Pro',sans-serif]", className)}>
      <div className="ps-page-shell__inner">{children}</div>
    </div>
  );
};

export { PageShell };
export type { PageShellProps };

import React, { useEffect, useRef, useState } from 'react';
import type { Decorator } from '@storybook/react';

/**
 * Global decorator: renders each story, then shows a collapsible, copy-paste
 * block of the LIVE rendered Tailwind markup (element tree + className strings).
 * Applied in .storybook/preview.ts so EVERY story carries its Tailwind code.
 */

function formatHtml(html: string): string {
  const tokens = html.replace(/>\s*</g, '>\n<').split('\n');
  let indent = 0;
  return tokens
    .map((raw) => {
      const line = raw.trim();
      if (!line) return '';
      if (/^<\//.test(line)) indent = Math.max(indent - 1, 0);
      const padded = '  '.repeat(indent) + line;
      const isOpen = /^<[a-zA-Z][^>]*[^/]>$/.test(line);
      const isSelfClose = /\/>$/.test(line);
      const hasInlineClose = /<\/[a-zA-Z]/.test(line.slice(1));
      if (isOpen && !isSelfClose && !hasInlineClose) indent++;
      return padded;
    })
    .filter(Boolean)
    .join('\n');
}

const wrapStyle: React.CSSProperties = {
  marginTop: 16,
  width: '100%',
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace",
};

const summaryStyle: React.CSSProperties = {
  cursor: 'pointer',
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  color: '#002F48',
  padding: '6px 10px',
  border: '1px solid #E2E8ED',
  borderRadius: 4,
  background: '#F1F1F1',
  userSelect: 'none',
  listStyle: 'none',
};

const preStyle: React.CSSProperties = {
  margin: '8px 0 0',
  padding: 12,
  fontSize: 12,
  lineHeight: 1.5,
  color: '#002F48',
  background: '#FAFAFA',
  border: '1px solid #E2E8ED',
  borderRadius: 4,
  overflowX: 'auto',
  whiteSpace: 'pre',
};

const copyBtnStyle: React.CSSProperties = {
  marginTop: 8,
  fontSize: 12,
  fontWeight: 600,
  color: '#FFFFFF',
  background: '#005BA7',
  border: 'none',
  borderRadius: 4,
  padding: '4px 12px',
  cursor: 'pointer',
};

const TailwindCode: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (ref.current) {
      // Read the story's rendered subtree (excludes this decorator's own UI).
      const host = ref.current;
      const html = host.innerHTML;
      setMarkup(formatHtml(html));
    }
  });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markup);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable in some sandboxes */
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div ref={ref}>{children}</div>
      <details style={wrapStyle}>
        <summary style={summaryStyle}>Tailwind markup</summary>
        <pre style={preStyle}>{markup || '(rendering…)'}</pre>
        <button type="button" style={copyBtnStyle} onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </details>
    </div>
  );
};

export const withTailwindCode: Decorator = (Story) => (
  <TailwindCode>
    <Story />
  </TailwindCode>
);

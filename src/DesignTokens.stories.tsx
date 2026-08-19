import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useMemo, useState } from 'react';

/**
 * Foundations / Design Tokens — a LIVE catalog of every `--ps-*` CSS custom
 * property currently shipping in tokens.css.
 *
 * It discovers tokens at runtime by walking document.styleSheets (custom
 * properties are not enumerable via getComputedStyle), then resolves each
 * one's computed value. Because it reads whatever is in tokens.css, ANY new
 * token set that flows through the build (e.g. an "Email Template" set pushed
 * from Tokens Studio) appears here automatically — no story edits required.
 */

interface TokenEntry {
  name: string; // full custom property, incl. leading --
  raw: string; // value as authored on :root (may be a var() alias)
  computed: string; // fully resolved value
}

const PREFIX = '--ps-';

const GROUP_LABELS: Record<string, string> = {
  prim: 'Primitive',
  sem: 'Semantic',
  cmp: 'Component',
};

function groupKey(name: string): string {
  return name.slice(PREFIX.length).split('-')[0] || 'other';
}

function groupLabel(key: string): string {
  return GROUP_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}

function isColor(value: string): boolean {
  const v = value.trim().toLowerCase();
  return (
    /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(v) ||
    v.startsWith('rgb') ||
    v.startsWith('hsl')
  );
}

function collectTokens(): TokenEntry[] {
  const names = new Set<string>();
  const raw = new Map<string, string>();

  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList | null = null;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin sheet — cannot read; skip
    }
    if (!rules) continue;
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue;
      const { style } = rule;
      const onRoot = rule.selectorText.includes(':root');
      for (let i = 0; i < style.length; i++) {
        const prop = style.item(i);
        if (!prop.startsWith(PREFIX)) continue;
        names.add(prop);
        if (onRoot && !raw.has(prop)) {
          raw.set(prop, style.getPropertyValue(prop).trim());
        }
      }
    }
  }

  const rootStyle = getComputedStyle(document.documentElement);
  return Array.from(names)
    .sort((a, b) => a.localeCompare(b))
    .map((name) => {
      const computed = rootStyle.getPropertyValue(name).trim();
      return { name, raw: raw.get(name) ?? computed, computed };
    });
}

const TokenCatalog: React.FC = () => {
  const [tokens, setTokens] = useState<TokenEntry[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setTokens(collectTokens());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tokens;
    return tokens.filter(
      (t) => t.name.toLowerCase().includes(q) || t.computed.toLowerCase().includes(q),
    );
  }, [tokens, query]);

  const groups = useMemo(() => {
    const map = new Map<string, TokenEntry[]>();
    for (const t of filtered) {
      const k = groupKey(t.name);
      const arr = map.get(k) ?? [];
      arr.push(t);
      map.set(k, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const mono =
    "'SFMono-Regular', ui-monospace, Menlo, Consolas, 'Liberation Mono', monospace";

  return (
    <div
      style={{
        fontFamily: 'var(--ps-sem-font-body, system-ui, sans-serif)',
        color: 'var(--ps-sem-fg-primary, #002F48)',
        padding: 24,
        maxWidth: 1100,
      }}
    >
      <h1 style={{ fontWeight: 300, color: 'var(--ps-sem-fg-primary, #002F48)' }}>
        Design Tokens
      </h1>
      <p style={{ maxWidth: 680 }}>
        Every <code style={{ fontFamily: mono }}>--ps-*</code> custom property currently in{' '}
        <code style={{ fontFamily: mono }}>tokens.css</code>, read live from the running
        Storybook. New token sets appear here automatically once they ship through the token
        build.
      </p>

      <label style={{ display: 'block', margin: '16px 0' }}>
        <span style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>
          Filter tokens ({filtered.length} of {tokens.length})
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. button, brand, #005ba7"
          style={{
            width: 320,
            maxWidth: '100%',
            padding: '8px 10px',
            border: '1px solid var(--ps-sem-border-default, #ccc)',
            borderRadius: 4,
            fontSize: 14,
          }}
        />
      </label>

      {groups.map(([key, entries]) => (
        <section key={key} style={{ marginBottom: 32 }}>
          <h2
            style={{
              fontWeight: 300,
              color: 'var(--ps-sem-fg-primary, #002F48)',
              borderBottom: '2px solid var(--ps-sem-border-default, #e5e5e5)',
              paddingBottom: 6,
            }}
          >
            {groupLabel(key)}{' '}
            <span style={{ fontSize: 14, color: 'var(--ps-sem-fg-secondary, #667)' }}>
              ({entries.length})
            </span>
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
              {groupLabel(key)} tokens
            </caption>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th scope="col" style={{ padding: '6px 8px', width: 44 }}>
                  Preview
                </th>
                <th scope="col" style={{ padding: '6px 8px' }}>
                  Token
                </th>
                <th scope="col" style={{ padding: '6px 8px' }}>
                  Value
                </th>
                <th scope="col" style={{ padding: '6px 8px' }}>
                  Resolved
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((t) => (
                <tr
                  key={t.name}
                  style={{ borderTop: '1px solid var(--ps-sem-border-subtle, #f0f0f0)' }}
                >
                  <td style={{ padding: '6px 8px' }}>
                    {isColor(t.computed) ? (
                      <span
                        aria-hidden="true"
                        style={{
                          display: 'inline-block',
                          width: 28,
                          height: 28,
                          borderRadius: 4,
                          background: t.computed,
                          border: '1px solid rgba(0,47,72,0.15)',
                        }}
                      />
                    ) : null}
                  </td>
                  <td style={{ padding: '6px 8px', fontFamily: mono }}>{t.name}</td>
                  <td
                    style={{
                      padding: '6px 8px',
                      fontFamily: mono,
                      color: 'var(--ps-sem-fg-secondary, #667)',
                    }}
                  >
                    {t.raw}
                  </td>
                  <td style={{ padding: '6px 8px', fontFamily: mono }}>{t.computed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
};

const meta: Meta<typeof TokenCatalog> = {
  title: 'Foundations/Design Tokens',
  component: TokenCatalog,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof TokenCatalog>;

export const AllTokens: Story = {};

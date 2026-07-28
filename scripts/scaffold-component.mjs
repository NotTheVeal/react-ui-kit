#!/usr/bin/env node
// ──────────────────────────────────────────────────────────────────
// scaffold-component.mjs — new-component starter for the react-ui-kit.
//
// Stamps out the canonical 5-file set + barrel wiring for a brand-new
// component so the "new component in Figma → Storybook" path is turnkey.
// It writes REAL, compiling, token-safe boilerplate that passes the full
// gate (lint / typecheck / vitest / a11y / build-storybook) on day one —
// you then flesh out the markup from the Figma node.
//
// Usage:
//   node scripts/scaffold-component.mjs <Name> [--node <figma-node-id>]
//   npm run scaffold -- <Name> [--node 1234-5678]
//
// Example:
//   npm run scaffold -- Kbd --node 4820-117
//
// It refuses to overwrite existing files, and appends the barrel export
// to src/index.ts only if it isn't already present. Nothing is hardcoded
// to a colour — the placeholder markup uses --ps-* tokens exclusively.
// ──────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '..', 'src');

const args = process.argv.slice(2);
const nodeIdx = args.indexOf('--node');
const nodeId = nodeIdx !== -1 ? args[nodeIdx + 1] : null;
const rawName = args.find((a, i) => !a.startsWith('--') && i !== nodeIdx + 1);

if (!rawName) {
  console.error('✗ Usage: node scripts/scaffold-component.mjs <Name> [--node <figma-node-id>]');
  process.exit(1);
}

// Normalize to PascalCase component name.
const Name = rawName.replace(/(^\w|[-_ ]\w)/g, (m) => m.replace(/[-_ ]/, '').toUpperCase());
if (!/^[A-Z][A-Za-z0-9]*$/.test(Name)) {
  console.error(`✗ "${rawName}" → "${Name}" is not a valid component name.`);
  process.exit(1);
}

const figmaUrl = nodeId
  ? `https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=${nodeId}`
  : 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=REPLACE-ME';

const files = {
  [`${Name}.tsx`]: `import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// ${Name}.tsx — PartsSource Design System
//
// Scaffolded starter. Replace the placeholder markup below with the 1:1
// build from the Figma node${nodeId ? ` (${nodeId})` : ''}. Bind every colour/size to a
// --ps-* token — raw hex in src/*.tsx is blocked by ESLint.
// ──────────────────────────────────────────────────────────────────

type ${Name}Variant = 'default';

interface ${Name}Props {
  variant?: ${Name}Variant;
  children?: React.ReactNode;
  className?: string;
}

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const ${Name}: React.FC<${Name}Props> = ({ variant = 'default', children, className = '' }) => {
  return (
    <div
      data-variant={variant}
      className={cx(
        "font-['Source_Sans_Pro',sans-serif] text-[var(--ps-sem-fg-primary)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export { ${Name} };
export type { ${Name}Props, ${Name}Variant };
`,

  [`${Name}.stories.tsx`]: `import type { Meta, StoryObj } from '@storybook/react';
import { ${Name} } from './${Name}';

const meta = {
  title: 'Components/${Name}',
  component: ${Name},
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default'] },
  },
} satisfies Meta<typeof ${Name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'default', children: '${Name}' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6">
      <${Name} variant="default">${Name}</${Name}>
    </div>
  ),
};
`,

  [`${Name}.test.tsx`]: `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${Name} } from './${Name}';

describe('${Name}', () => {
  it('renders its children', () => {
    render(<${Name}>Hello</${Name}>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('reflects the variant on the root', () => {
    const { container } = render(<${Name} variant="default">x</${Name}>);
    expect(container.firstChild).toHaveAttribute('data-variant', 'default');
  });

  it('merges a custom className', () => {
    const { container } = render(<${Name} className="test-cls">x</${Name}>);
    expect(container.firstChild).toHaveClass('test-cls');
  });
});
`,

  [`${Name}.a11y.test.tsx`]: `import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ${Name} } from './${Name}';

describe('${Name} accessibility', () => {
  it('has no violations — default', async () => {
    const { container } = render(<${Name}>${Name}</${Name}>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
`,

  [`${Name}.figma.tsx`]: `import figma from '@figma/code-connect'
import { ${Name} } from './${Name}'

// ${Name} — Figma node ${nodeId ?? 'REPLACE-ME'}.
figma.connect(${Name}, '${figmaUrl}', {
  props: {},
  example: () => <${Name}>${Name}</${Name}>,
})
`,
};

let wrote = 0;
for (const [file, contents] of Object.entries(files)) {
  const path = resolve(SRC, file);
  if (existsSync(path)) {
    console.log(`• skip (exists): src/${file}`);
    continue;
  }
  writeFileSync(path, contents, 'utf8');
  console.log(`✓ wrote: src/${file}`);
  wrote++;
}

// Append barrel export if not already present.
const indexPath = resolve(SRC, 'index.ts');
const index = readFileSync(indexPath, 'utf8');
const exportLine = `export { ${Name} } from './${Name}';`;
const typeLine = `export type { ${Name}Props, ${Name}Variant } from './${Name}';`;
if (!index.includes(`from './${Name}'`)) {
  writeFileSync(indexPath, `${index.trimEnd()}\n${exportLine}\n${typeLine}\n`, 'utf8');
  console.log('✓ barrel: appended export to src/index.ts');
} else {
  console.log('• barrel: export already present in src/index.ts');
}

console.log(`\nScaffolded ${Name} (${wrote} file(s)). Next:`);
console.log('  1. Flesh out src/' + Name + '.tsx from the Figma node.');
console.log('  2. NODE_ENV=test npm run lint && npm run typecheck && npm test && npm run build-storybook');
console.log('  3. Branch → PR → CI → merge → auto-deploy to Storybook.');

import figma from '@figma/code-connect'
import { PageShell } from './PageShell'

// The Figma Page Shell (node 4152:56) is a layout wrapper with no variant
// properties; this connects it so designers see the real PageShell in Dev Mode.
figma.connect(PageShell, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4152-56', {
  props: {},
  example: () => <PageShell><div>Page content</div></PageShell>,
})

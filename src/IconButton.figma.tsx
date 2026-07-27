import figma from '@figma/code-connect'
import { IconButton } from './IconButton'

// IconButton (LEGACY orange square) — Figma Button/SquareLG (node 400:98).
// The SquareSM node (400:107) maps to size="sm".
figma.connect(IconButton, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=400-98', {
  props: {},
  example: () => <IconButton size="lg" aria-label="Add to cart" />,
})

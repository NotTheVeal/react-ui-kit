import figma from '@figma/code-connect'
import { ChipButton } from './ChipButton'

// ChipButton — Figma Button/Chip (node 3500:212). Property 1 = Large/Small
// maps to the code `size` prop.
figma.connect(ChipButton, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=3500-212', {
  props: {
    size: figma.enum('Property 1', { Large: 'lg', Small: 'sm' }),
  },
  example: ({ size }) => (
    <ChipButton size={size} onRemove={() => {}}>
      Filter
    </ChipButton>
  ),
})

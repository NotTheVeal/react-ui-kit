import figma from '@figma/code-connect'
import { Divider } from './Divider'

figma.connect(Divider, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4532-1092', {
  props: {
    weight: figma.enum('Property 1', {
      Subtle: 'subtle',
      Default: 'default',
      Strong: 'strong',
    }),
  },
  example: ({ weight }) => <Divider weight={weight} />,
})

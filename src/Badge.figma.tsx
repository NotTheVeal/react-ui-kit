import figma from '@figma/code-connect'
import { ListTypeBadge } from './Badge'

// Node 4391:44856 is the "Purple" ListType pill (Shopping List category).
figma.connect(ListTypeBadge, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4391-44856', {
  props: {
    label: figma.string('SHOPPING'),
    tone: figma.enum('Property 1', {
      Purple: 'shopping',
    }),
  },
  example: ({ label, tone }) => <ListTypeBadge tone={tone}>{label}</ListTypeBadge>,
})

import figma from '@figma/code-connect'
import { Popover } from './Popover'

// Default — title + supporting text.
figma.connect(Popover, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4603-59', {
  variant: { 'Property 1': 'Default' },
  props: {
    title: figma.string('Popover Title'),
    body: figma.string('Supporting text goes here to explain this element or action.'),
  },
  example: ({ title, body }) => (
    <Popover variant="default" title={title}>
      {body}
    </Popover>
  ),
})

// CTA — title + text + Cancel/confirm buttons.
figma.connect(Popover, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4962-6122', {
  variant: { 'Property 1': 'CTA' },
  props: {
    title: figma.string('Delete Item'),
    body: figma.string('This will permanently remove the item from your list.'),
  },
  example: ({ title, body }) => (
    <Popover
      variant="cta"
      title={title}
      confirmTone="danger"
      secondaryAction={{ label: 'Cancel', onClick: () => {} }}
      primaryAction={{ label: 'Delete', onClick: () => {} }}
    >
      {body}
    </Popover>
  ),
})

// Text Only — supporting text, no title row.
figma.connect(Popover, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4962-6126', {
  variant: { 'Property 1': 'Text Only' },
  props: {
    body: figma.string('Last updated 3 minutes ago by Sarah Johnson.'),
  },
  example: ({ body }) => <Popover variant="textOnly">{body}</Popover>,
})

import figma from '@figma/code-connect'
import { Accordion, Stepper } from './Layout'

// Accordion — Collapsed / Expanded map to the `open` boolean.
figma.connect(Accordion, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4390-39583', {
  props: {
    open: figma.enum('Property 1', {
      Collapsed: false,
      Expanded: true,
    }),
  },
  example: ({ open }) => (
    <Accordion title="Accordion Header" open={open}>
      {/* accordion body */}
    </Accordion>
  ),
})

// Stepper — First / Second / Third indicate which step is current.
figma.connect(Stepper, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=396-1813', {
  props: {},
  example: () => (
    <Stepper
      steps={[
        { label: 'First', status: 'complete' },
        { label: 'Second', status: 'current' },
        { label: 'Third', status: 'pending' },
      ]}
    />
  ),
})

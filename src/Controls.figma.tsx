import figma from '@figma/code-connect'
import { DatePicker } from './Controls'

// DatePicker — Figma node 396:281 ("Date Picker"). The Figma "Property 1"
// states (Idle, Start Date Selection, Single Short, Single Short Filled,
// Single Short Focused) describe visual/interaction states that the React
// component derives from its own props rather than a single variant prop,
// so no enum mapping is applied. This connects the real DatePicker.
figma.connect(DatePicker, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=396-281', {
  props: {},
  example: () => <DatePicker title="Delivery date" />,
})

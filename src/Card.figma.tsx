import figma from '@figma/code-connect'
import { EventCard, StatusCard, AlertCard } from './Card'

// EventCard — Figma Event Card (node 3334:8877). Property 1 = Default/Hover
// is a visual state, not a code prop, so it is left unmapped.
figma.connect(EventCard, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=3334-8877', {
  props: {},
  example: () => (
    <EventCard
      title="Compressor Service"
      subtitle="Preventive maintenance"
      meta={[{ label: 'Due', value: 'Aug 14' }]}
    />
  ),
})

// StatusCard — same Figma family; connects the compact status variant.
figma.connect(StatusCard, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=3334-8877', {
  props: {},
  example: () => <StatusCard title="Order 4821" meta="Shipped · arrives Fri" />,
})

// AlertCard — same Figma family; connects the alert/severity variant.
figma.connect(AlertCard, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=3334-8877', {
  props: {},
  example: () => (
    <AlertCard title="Sensor offline" subtitle="ICU-3" severity="error" />
  ),
})

import figma from '@figma/code-connect'
import { Drawer } from './Drawer'

// Node 4445:1443 — "Drawer / Default - 480px" frame. It carries a header
// title but no mappable variant properties.
figma.connect(Drawer, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4445-1443', {
  props: {
    title: figma.string('Create Bundle'),
  },
  example: ({ title }) => (
    <Drawer open title={title} onClose={() => {}}>
      {/* drawer body */}
    </Drawer>
  ),
})

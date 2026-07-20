import figma from '@figma/code-connect'
import { Carousel } from './Carousel'

figma.connect(Carousel, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4552-947', {
  props: {
    title: figma.string('You Left Off Here'),
    linkLabel: figma.string('View Shopping Histor'),
  },
  example: ({ title, linkLabel }) => (
    <Carousel title={title} linkLabel={linkLabel}>
      <div>Carousel item</div>
    </Carousel>
  ),
})

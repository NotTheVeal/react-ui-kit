import figma from '@figma/code-connect'
import { AnalyticsCard, ListCard } from './CardExtras'

// Analytics Card — KPI variants map to the wide layout, Single Data to square.
figma.connect(AnalyticsCard, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4100-12161', {
  props: {
    layout: figma.enum('Property 1', {
      KPI: 'wide',
      'KPI Hover': 'wide',
      'Signle Data': 'square',
      'Signle Data - Selected': 'square',
    }),
    highlight: figma.enum('Property 1', {
      'Signle Data - Selected': true,
    }),
  },
  example: ({ layout, highlight }) => (
    <AnalyticsCard
      layout={layout}
      highlight={highlight}
      title="Parts Spend"
      value="$1.2M"
      delta={{ value: '5.3%', direction: 'down' }}
      deltaSuffix="vs last year"
      benchmark="15% below peer benchmark"
    />
  ),
})

// List Card — one component, four Figma variants via the `variant` prop.
figma.connect(ListCard, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4100-12056', {
  props: {
    variant: figma.enum('Property 1', {
      Detail: 'product',
      'Top Level': 'list',
      'Create New': 'create',
      'Standing Order': 'standing',
    }),
  },
  example: ({ variant }) => {
    if (variant === 'list') return <ListCard variant="list" title="Shopping" count="7 items" />
    if (variant === 'create') return <ListCard variant="create" title="Create New List" />
    if (variant === 'standing') return <ListCard variant="standing" title="My Favorites" />
    return <ListCard variant="product" title="Lorem Ipsum Dolor Si" price="$441.23" />
  },
})

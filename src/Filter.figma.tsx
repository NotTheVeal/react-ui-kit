import figma from '@figma/code-connect'
import { Filter, FilterChip } from './Filter'

// Filter — Figma Filter (node 1570:2732). Format = Desktop/Mobile is a
// responsive variant handled internally, so it is left unmapped.
figma.connect(Filter, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=1570-2732', {
  props: {},
  example: () => (
    <Filter
      defaultApplied={[
        { id: 'a', facetId: 'facility', facetLabel: 'Facility', value: 'Hospital A' },
      ]}
    />
  ),
})

// FilterChip — the removable pill within the filter bar.
figma.connect(FilterChip, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=1570-2732', {
  props: {},
  example: () => <FilterChip filterKey="Manufacturer" value="GE" />,
})

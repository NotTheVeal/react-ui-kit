import figma from '@figma/code-connect'
import { FilterChip, FilterShell } from './Filter'

// FilterShell — Figma Filter (node 1570:2732). Format = Desktop/Mobile is a
// responsive variant handled internally, so it is left unmapped.
figma.connect(FilterShell, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=1570-2732', {
  props: {},
  example: () => (
    <FilterShell chips={<FilterChip label="In Stock" />} addLabel="Add filter" />
  ),
})

// FilterChip — the removable pill within the filter bar.
figma.connect(FilterChip, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=1570-2732', {
  props: {},
  example: () => <FilterChip label="Manufacturer: GE" />,
})

import figma from '@figma/code-connect'
import { FolderTabs, SegmentedTabs, PillTabs } from './Tabs'

const items = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open', count: 4 },
]

// FolderTabs — Figma Tabs (node 4783:5623).
figma.connect(FolderTabs, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4783-5623', {
  props: {},
  example: () => <FolderTabs items={items} activeId="all" onChange={() => {}} />,
})

// SegmentedTabs — same Figma family; segmented style.
figma.connect(SegmentedTabs, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4783-5623', {
  props: {},
  example: () => <SegmentedTabs items={items} activeId="all" onChange={() => {}} />,
})

// PillTabs — same Figma family; pill style.
figma.connect(PillTabs, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4783-5623', {
  props: {},
  example: () => <PillTabs items={items} activeId="all" onChange={() => {}} />,
})

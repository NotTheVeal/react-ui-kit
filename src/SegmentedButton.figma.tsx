import figma from '@figma/code-connect'
import { SegmentedButton } from './SegmentedButton'

// SegmentedButton — Figma Seggmented Button (node 115:327). No mappable
// variant properties are exposed; this connects the real component.
figma.connect(SegmentedButton, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=115-327', {
  props: {},
  example: () => (
    <SegmentedButton
      value="list"
      onChange={() => {}}
      options={[
        { id: 'list', label: 'List' },
        { id: 'grid', label: 'Grid' },
      ]}
    />
  ),
})

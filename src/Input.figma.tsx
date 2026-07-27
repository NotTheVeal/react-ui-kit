import figma from '@figma/code-connect'
import { Input, Dropdown } from './Input'

// Input — Figma Input Fields (node 1581:89).
figma.connect(Input, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=1581-89', {
  props: {},
  example: () => <Input label="Part number" />,
})

// Dropdown — same Figma family; connects the select variant.
figma.connect(Dropdown, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=1581-89', {
  props: {},
  example: () => (
    <Dropdown
      label="Manufacturer"
      options={[
        { label: 'GE', value: 'ge' },
        { label: 'Philips', value: 'philips' },
      ]}
    />
  ),
})

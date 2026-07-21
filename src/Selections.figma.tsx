import figma from '@figma/code-connect'
import { Radio, Toggle } from './Selections'

// Radio — Figma node 4393:45192 (Radio Button states frame). No variant
// properties are exposed to map; this connects the real Radio component.
figma.connect(Radio, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4393-45192', {
  props: {},
  example: () => <Radio label="Include compatible parts" />,
})

// Toggle — Figma node 4393:45399 (Toggle states frame). No variant
// properties are exposed to map; this connects the real Toggle component.
figma.connect(Toggle, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4393-45399', {
  props: {},
  example: () => <Toggle label="Enable notifications" />,
})

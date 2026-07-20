import figma from '@figma/code-connect'
import { Slider } from './Slider'

// The Figma Slider (node 4518:47) exposes no variant/text properties to map;
// this connects the component so designers see the real Slider in Dev Mode.
figma.connect(Slider, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4518-47', {
  props: {},
  example: () => <Slider label="Value" value={50} min={0} max={100} />,
})

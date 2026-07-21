import figma from '@figma/code-connect'
import { Tooltip } from './Feedback'

// Tooltip — Figma node 4388:31119 ("Tool Tip"). The Figma "Property 1"
// variants (Top, Bottom, Left, Right) map to the component's `placement`
// prop; "Default" is the resting Top placement.
figma.connect(Tooltip, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4388-31119', {
  props: {
    placement: figma.enum('Property 1', {
      Top: 'top',
      Bottom: 'bottom',
      Left: 'left',
      Right: 'right',
      Default: 'top',
    }),
  },
  example: (props) => (
    <Tooltip label="More information" placement={props.placement}>
      <button type="button">Hover me</button>
    </Tooltip>
  ),
})

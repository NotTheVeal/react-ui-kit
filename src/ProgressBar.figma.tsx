import figma from '@figma/code-connect'
import { ProgressBar } from './ProgressBar'

// ProgressBar — Figma Progress Indicator / Progress Bar (node 4582:866).
figma.connect(
  ProgressBar,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4582-866',
  {
    props: {},
    example: () => <ProgressBar value={0} label="Not started" />,
  },
)

import figma from '@figma/code-connect'
import { QuantityStepper } from './QuantityStepper'

// QuantityStepper — Figma Controllers / Stepper (set 5072:91).
// Color Scheme = Future (blue) / Current (orange); Disabled = true/false.
figma.connect(
  QuantityStepper,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5072-91',
  {
    props: {
      colorScheme: figma.enum('Color Scheme', {
        Future: 'future',
        Current: 'current',
      }),
      disabled: figma.enum('Disabled', {
        True: true,
        False: false,
      }),
    },
    example: ({ colorScheme, disabled }) => (
      <QuantityStepper colorScheme={colorScheme} disabled={disabled} />
    ),
  },
)

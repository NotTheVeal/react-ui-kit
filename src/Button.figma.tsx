import figma from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=115-631', {
  props: {
    label: figma.string('PRONOUNCE ROUNDED RE'),
    state: figma.enum('Button/Secondary/LG', {
      Default: 'default',
    }),
  },
  example: ({ label, state }) => (
    <Button variant="secondary" size="lg" state={state}>
      {label}
    </Button>
  ),
})

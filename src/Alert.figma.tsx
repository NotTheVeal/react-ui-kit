import figma from '@figma/code-connect'
import { Alert } from './Alert'

figma.connect(Alert, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=456-210', {
  props: {
    severity: figma.enum('Property 1', {
      'Success Alert': 'success',
      'Fail': 'fail',
      'Info': 'info',
      'Warning': 'warning',
    }),
  },
  example: ({ severity }) => <Alert severity={severity}>Alert message</Alert>,
})

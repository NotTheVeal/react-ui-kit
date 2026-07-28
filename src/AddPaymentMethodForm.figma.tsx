import figma from '@figma/code-connect';
import { AddPaymentMethodForm } from './AddPaymentMethodForm';

figma.connect(
  AddPaymentMethodForm,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5466-52',
  {
    props: {},
    example: () => <AddPaymentMethodForm />,
  },
);

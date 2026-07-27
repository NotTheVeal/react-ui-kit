import figma from '@figma/code-connect';
import { SavedPaymentMethodCard } from './SavedPaymentMethodCard';

figma.connect(
  SavedPaymentMethodCard,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5466-51',
  {
    props: {},
    example: () => (
      <SavedPaymentMethodCard
        brand="mastercard"
        last4="4242"
        expires="08/27"
        isDefault
      />
    ),
  },
);

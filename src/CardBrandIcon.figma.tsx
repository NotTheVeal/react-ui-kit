import figma from '@figma/code-connect';
import { CardBrandIcon } from './CardBrandIcon';

figma.connect(
  CardBrandIcon,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5468-58',
  {
    props: {
      brand: figma.enum('Brand', {
        Visa: 'visa',
        Mastercard: 'mastercard',
        Amex: 'amex',
        Discover: 'discover',
      }),
    },
    example: ({ brand }) => <CardBrandIcon brand={brand} />,
  },
);

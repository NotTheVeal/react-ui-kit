import figma from '@figma/code-connect';
import { ExchangeDetailCard } from './ExchangeDetailCard';

figma.connect(
  ExchangeDetailCard,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5466-49',
  {
    props: {
      title: figma.string('Exchange Details'),
    },
    example: () => (
      <ExchangeDetailCard
        title="Exchange Details"
        status="In Progress"
        items={[
          { label: 'Returning', name: 'X-RAY TUBE, 40/80 KW', meta: '$225.34 · Qty 1' },
          { label: 'Replacement', name: 'X-RAY TUBE, 40/80 KW (New)', meta: '$225.34 · Qty 1' },
        ]}
        note="Return the core within 30 days to avoid a core charge."
      />
    ),
  },
);

import figma from '@figma/code-connect';
import { ReturnEligibilityCard } from './ReturnEligibilityCard';

figma.connect(
  ReturnEligibilityCard,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5466-48',
  {
    props: {
      title: figma.string('Return Eligibility'),
    },
    example: () => (
      <ReturnEligibilityCard
        title="Return Eligibility"
        status="Eligible"
        statusTone="success"
        reason="Item arrived damaged or defective"
        uploadPrompt="Upload photos of the item"
        uploadHint="PNG or JPG, up to 10MB"
      />
    ),
  },
);

import figma from '@figma/code-connect';
import { WorkOrderCard } from './WorkOrderCard';

figma.connect(
  WorkOrderCard,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5466-55',
  {
    props: {},
    example: () => (
      <WorkOrderCard
        orderNumber="WO #48213"
        priority="high"
        asset="Siemens MRI · MR-04, Radiology"
        description="Cooling system fault — coil temperature exceeding threshold."
      />
    ),
  },
);

import figma from '@figma/code-connect';
import { ModuleCard } from './ModuleCard';

figma.connect(
  ModuleCard,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5466-53',
  {
    props: {},
    example: () => (
      <ModuleCard
        title="Ultrasound Fundamentals"
        description="Interactive XR training module covering probe handling, imaging planes, and safety protocols."
        duration="45 min"
        level="Intermediate"
        status="installed"
      />
    ),
  },
);

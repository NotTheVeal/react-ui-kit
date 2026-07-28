import figma from '@figma/code-connect';
import { ModuleDetailDrawer } from './ModuleDetailDrawer';

figma.connect(
  ModuleDetailDrawer,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5480-116',
  {
    props: {
      state: figma.enum('State', {
        Overview: 'overview',
        Curriculum: 'curriculum',
      }),
    },
    example: (props) => (
      <ModuleDetailDrawer
        open
        onClose={() => {}}
        title="Ultrasound Fundamentals"
        subtitle="XR Training · 45 min"
        overview="Interactive XR training module covering probe handling, imaging planes, and safety protocols."
        lessons={[
          { id: '1', label: 'Probe handling basics', duration: '8 min', complete: true },
          { id: '2', label: 'Imaging planes', duration: '12 min' },
        ]}
        state={props.state}
      />
    ),
  },
);

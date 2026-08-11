import figma from '@figma/code-connect';
import { AiDetailCard } from './AiDetailCard';

figma.connect(
  AiDetailCard,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/Design-System---Component-library?node-id=5773-2708',
  {
    props: {
      variant: figma.enum('property1', { Full: 'full', Drawer: 'drawer' }),
      showAiSummary: figma.boolean('showAiSummary'),
      showProductRow: figma.boolean('showProductRow'),
      showStatusSection: figma.boolean('showStatusSection'),
      showFeedbackRow: figma.boolean('showFeedbackRow'),
      showFacility: figma.boolean('showFacility'),
      showRef: figma.boolean('showRef'),
      showPo: figma.boolean('showPo'),
    },
    example: (props) => (
      <AiDetailCard
        variant={props.variant}
        orderNumber="4821"
        status="Processing"
        aiSummary="This order is in processing at the Cleveland DC and is on track to ship today."
        product={{
          name: 'X-RAY TUBE, 40/80 KW',
          price: '$225.34',
          quantity: 1,
          detailsHref: '#',
        }}
        facility="Mercy General — Cleveland"
        reference="REF-9021"
        po="PO-55231"
        deliveryStatus={{ date: 'Arriving Thu, Aug 14' }}
        feedback={{ sourcesHref: '#', timestamp: '12:33 PM' }}
        showAiSummary={props.showAiSummary}
        showProductRow={props.showProductRow}
        showStatusSection={props.showStatusSection}
        showFeedbackRow={props.showFeedbackRow}
        showFacility={props.showFacility}
        showRef={props.showRef}
        showPo={props.showPo}
      />
    ),
  },
);

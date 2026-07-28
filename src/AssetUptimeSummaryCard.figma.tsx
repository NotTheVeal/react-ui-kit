import figma from '@figma/code-connect';
import { AssetUptimeSummaryCard } from './AssetUptimeSummaryCard';

figma.connect(
  AssetUptimeSummaryCard,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5466-54',
  {
    props: {},
    example: () => (
      <AssetUptimeSummaryCard metric="98.6%" trendValue="1.2%" trendDirection="up" />
    ),
  },
);

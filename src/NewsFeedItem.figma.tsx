import figma from '@figma/code-connect';
import { NewsFeedItem } from './NewsFeedItem';

figma.connect(
  NewsFeedItem,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5466-57',
  {
    props: {},
    example: () => (
      <NewsFeedItem
        category="Product Update"
        headline="New asset uptime heatmap now available in the dashboard"
        date="Jul 20, 2026"
        readTime="2 min read"
      />
    ),
  },
);

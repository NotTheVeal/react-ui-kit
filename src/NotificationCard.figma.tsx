import figma from '@figma/code-connect';
import { NotificationCard } from './NotificationCard';

figma.connect(
  NotificationCard,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=5466-56',
  {
    props: {},
    example: () => (
      <NotificationCard
        title="Asset offline: CT-02"
        message="Radiology CT scanner reported a connectivity loss 4 minutes ago."
        timestamp="4 min ago"
        tone="critical"
        unread
      />
    ),
  },
);

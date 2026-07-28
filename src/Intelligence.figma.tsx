import figma from '@figma/code-connect'
import { IntelligencePanel } from './Intelligence'

// PS Intelligence — the AI assistant panel (page "Ai Agent").
figma.connect(
  IntelligencePanel,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4508-11881',
  {
    example: () => (
      <IntelligencePanel
        title="PS Intelligence"
        subtitle="Your equipment & procurement assistant"
        suggestedPrompts={[
          'Find a replacement part',
          'Check order status',
          'Compare equipment options',
        ]}
      />
    ),
  },
)

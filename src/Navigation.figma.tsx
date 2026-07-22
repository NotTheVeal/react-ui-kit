import figma from '@figma/code-connect'
import { TopNav, LeftNav } from './Navigation'

// TopNav — Figma Top Nav (node 4113:5974).
figma.connect(TopNav, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4113-5974', {
  props: {},
  example: () => <TopNav cartCount={3} />,
})

// LeftNav — Figma Left Hand Nav (node 4108:5516).
figma.connect(LeftNav, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4108-5516', {
  props: {},
  example: () => (
    <LeftNav items={[{ id: 'home', label: 'Home', href: '#', active: true }]} />
  ),
})

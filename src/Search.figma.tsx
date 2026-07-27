import figma from '@figma/code-connect'
import { InlineSearch, HiddenSearch } from './Search'

// InlineSearch — Figma Search / Inline (node 4962:6298).
figma.connect(
  InlineSearch,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4962-6298',
  {
    props: {},
    example: () => <InlineSearch placeholder="Search" />,
  },
)

// HiddenSearch — Figma Search / Hidden (node 4962:6313).
// property1 "Default" = collapsed icon · "Search Selected" = expanded field.
figma.connect(
  HiddenSearch,
  'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4962-6313',
  {
    props: {
      open: figma.enum('Property 1', {
        Default: false,
        'Search Selected': true,
      }),
    },
    example: ({ open }) => <HiddenSearch open={open} placeholder="Search this list" />,
  },
)

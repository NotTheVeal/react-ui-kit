import figma from '@figma/code-connect'
import { Table } from './Table'

// The Figma Table (node 4099:6874) has no mappable variant properties;
// this connects the component so designers see the real Table in Dev Mode.
figma.connect(Table, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4099-6874', {
  props: {},
  example: () => (
    <Table
      columns={[
        { key: 'name', header: 'Name', sortable: true },
        { key: 'status', header: 'Status' },
      ]}
      data={[{ id: 1, name: 'Part A', status: 'In Stock' }]}
    />
  ),
})

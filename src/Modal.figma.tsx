import figma from '@figma/code-connect'
import { Modal, ConfirmDialog } from './Modal'

// Modal — Figma Data Modal (node 3266:2628). Property 1 = Desktop/Tablet/Mobile
// is a responsive variant handled internally, so it is left unmapped.
figma.connect(Modal, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=3266-2628', {
  props: {},
  example: () => (
    <Modal open title="Order details" onClose={() => {}}>
      Line items and totals go here.
    </Modal>
  ),
})

// ConfirmDialog — the confirm/destructive variant of the modal.
figma.connect(ConfirmDialog, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=3266-2628', {
  props: {},
  example: () => (
    <ConfirmDialog
      open
      title="Delete list?"
      message="This cannot be undone."
      destructive
      onConfirm={() => {}}
      onCancel={() => {}}
    />
  ),
})

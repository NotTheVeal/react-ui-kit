import figma from '@figma/code-connect'
import { FileUpload } from './FileUpload'

figma.connect(FileUpload, 'https://www.figma.com/design/pyZ5wKN9KGBUfgi47UwQ0q/PartsSource-Design-System?node-id=4962-6097', {
  props: {
    state: figma.enum('Property 1', {
      Default: 'default',
      'Drag Over': 'dragOver',
      Uploading: 'uploading',
      Complete: 'complete',
      Error: 'error',
      // FileRow* variants are per-row visual states in Figma; they map to
      // the same top-level component states in code.
      'FileRow Uploading': 'uploading',
      'FileRow Complete': 'complete',
      'FileRow Error': 'error',
    }),
  },
  example: ({ state }) => <FileUpload state={state} />,
})

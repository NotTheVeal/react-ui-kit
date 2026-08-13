import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Filter,
  FilterChip,
  SaveFilterSetButton,
  SavedFilterCard,
  SaveFilterModal,
  type AppliedFilter,
} from './Filter';

const meta = {
  title: 'Forms/Filter',
  component: Filter,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleChips: AppliedFilter[] = [
  { id: 'a', facetId: 'facility', facetLabel: 'Facility', value: 'Hospital A' },
  { id: 'b', facetId: 'assetId', facetLabel: 'Asset ID', value: '44335453' },
  { id: 'c', facetId: 'status', facetLabel: 'Status', value: 'Ordered' },
  { id: 'd', facetId: 'mfr', facetLabel: 'Manufacturer', value: 'GE Healthcare' },
];

// ── Bar ───────────────────────────────────────────────────────────
export const Default: Story = { args: {} };

export const WithChips: Story = {
  args: {
    defaultApplied: [{ id: 'a', facetId: 'facility', facetLabel: 'Facility', value: 'Hospital A' }],
  },
};

export const ManyChips: Story = { args: { defaultApplied: sampleChips } };

// ── Chip ──────────────────────────────────────────────────────────
export const Chip: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-5">
      <FilterChip filterKey="Facility" value="Hospital A" />
      <FilterChip filterKey="Asset ID" value="44335453" />
      <FilterChip filterKey="Status" value="Ordered" removable={false} />
    </div>
  ),
};

// ── Save Filter Set button ────────────────────────────────────────
export const SaveButton: StoryObj = {
  render: () => (
    <div className="flex items-center gap-6">
      <SaveFilterSetButton />
    </div>
  ),
};

// ── Saved Filter Set cards ────────────────────────────────────────
export const SavedCards: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3">
      <SavedFilterCard name="Filter Name A" isDefault chips={sampleChips.slice(0, 3)} />
      <SavedFilterCard name="Filter Name B" chips={sampleChips.slice(1)} />
    </div>
  ),
};

export const SavedCardEditing: StoryObj = {
  render: () => <SavedFilterCard name="Filter Name A" isDefault editing chips={sampleChips.slice(0, 3)} />,
};

// ── Modal ─────────────────────────────────────────────────────────
export const Modal: StoryObj = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div>
        <SaveFilterSetButton onClick={() => setOpen(true)}>Open modal</SaveFilterSetButton>
        <div className="mt-4">
          <SaveFilterModal open={open} chips={sampleChips} onClose={() => setOpen(false)} onCancel={() => setOpen(false)} />
        </div>
      </div>
    );
  },
};

// ── Interactive end-to-end ────────────────────────────────────────
export const Interactive: StoryObj = {
  render: () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [saved, setSaved] = useState<AppliedFilter[]>([]);
    return (
      <div className="flex flex-col gap-6">
        <Filter onSaveSet={(chips) => { setSaved(chips); setModalOpen(true); }} />
        <SaveFilterModal
          open={modalOpen}
          chips={saved}
          onClose={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
          onSave={() => setModalOpen(false)}
        />
      </div>
    );
  },
};

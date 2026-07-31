import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Modal, ConfirmDialog } from './Modal';
import { Button } from './Button';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, height: '720px' } },
  },
} satisfies Meta<typeof Modal>;

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="p-8">
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Nudge requester"
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setOpen(false)}>Send nudge</Button>
            </>
          }
        >
          <p className="text-sm text-[var(--ps-prim-gray-700)] leading-relaxed">
            Your requester will receive an email and a Slack ping asking them to review this part order.
          </p>
        </Modal>
      </div>
    );
  },
};

export const Confirm: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="p-8">
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Open Confirm</Button>
        <ConfirmDialog
          open={open}
          title="Delete this list?"
          message="This action can't be undone. All saved parts in this list will be removed."
          confirmLabel="Delete"
          destructive
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    );
  },
};

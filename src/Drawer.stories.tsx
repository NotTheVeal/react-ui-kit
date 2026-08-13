import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Drawer } from './Drawer';
import { Button } from './Button';
import { Input } from './Input';
import { Checkbox } from './Selections';

const meta = {
  title: 'Overlays/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, height: '860px' } },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="p-8">
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer
          open={open}
          title="Add learners"
          subtitle="Choose teammates to assign this course to."
          onClose={() => setOpen(false)}
          footer={
            <>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={() => setOpen(false)}>Add 3 learners</Button>
            </>
          }
        >
          <div className="flex flex-col gap-3">
            <Input label="Search by name or email" />
            <div className="flex flex-col gap-3 mt-2">
              <Checkbox label="Alex Morgan — Imaging" defaultChecked />
              <Checkbox label="Casey Tran — Biomed" defaultChecked />
              <Checkbox label="Jordan Lee — OR" defaultChecked />
              <Checkbox label="Sam Patel — ICU" />
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

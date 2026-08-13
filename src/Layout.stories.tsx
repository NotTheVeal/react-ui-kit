import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbBack, Accordion, AccordionCount, Stepper } from './Layout';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

export const Trail: StoryObj = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'My Dashboard', href: '#' },
        { label: 'Asset Details' },
      ]}
    />
  ),
};

export const Back: StoryObj = {
  render: () => <BreadcrumbBack label="Back to My Dashboard" />,
};

export const AccordionDefault: StoryObj = {
  render: () => (
    <div className="w-[640px]">
      <Accordion title="Accordion Header Collapsed" />
      <div className="mt-4">
        <Accordion title="Accordion Header Expanded" defaultOpen>
          <p>The expanded panel sits below a 1 px divider.</p>
        </Accordion>
      </div>
    </div>
  ),
};

export const AccordionWithCount: StoryObj = {
  render: () => (
    <div className="w-[640px] flex flex-col gap-4">
      <Accordion title="In-progress activity" meta={<AccordionCount>3</AccordionCount>} />
      <Accordion
        title="Critical events"
        subtitle="Requires immediate attention"
        meta={<AccordionCount tone="critical">2 critical</AccordionCount>}
      />
    </div>
  ),
};

export const StepperHorizontal: StoryObj = {
  render: () => (
    <Stepper
      steps={[
        { label: 'Part selection', status: 'complete' },
        { label: 'Vendor & shipping', status: 'complete' },
        { label: 'Review', status: 'current' },
        { label: 'Submit', status: 'pending' },
      ]}
    />
  ),
};

export const StepperVertical: StoryObj = {
  render: () => (
    <Stepper
      orientation="vertical"
      steps={[
        { label: 'Verify account', sub: 'Email confirmed · 03/12/25', status: 'complete' },
        { label: 'Add facility', sub: 'Tell us where the equipment lives.', status: 'current' },
        { label: 'Invite teammates', sub: 'Optional · skip for now' },
        { label: 'First order', sub: 'Place your first part order.' },
      ]}
    />
  ),
};

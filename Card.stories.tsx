// ════════════════════════════════════════════════════════════════
// AUTO-GENERATED FROM src/ — do NOT hand-edit.
// Source: UI Kit/src/Card.stories.tsx · run `npm run sync:browser`.
// ════════════════════════════════════════════════════════════════
import type { Meta, StoryObj } from '@storybook/react';
import { EventCard, StatusCard, AlertCard } from './Card';
import { AiDataCard, ProductCard, AnalyticsCard, ListCard } from './CardExtras';

const ServiceEventIcon = () => (
  <svg width={23} height={23} viewBox="0 0 23 23" fill="currentColor" aria-hidden="true">
    <path d="M0.420898 19.8526V8.95789C0.420898 8.35867 0.634398 7.84548 1.06141 7.41848C1.48781 6.99209 2.00057 6.77887 2.59979 6.77887H5.86816V4.6C5.86816 4.00078 6.08167 3.48799 6.50868 3.06164C6.93506 2.63461 7.44784 2.4211 8.04705 2.4211H14.584C15.1832 2.4211 15.6964 2.63461 16.1234 3.06164C16.5498 3.48799 16.7629 4.00078 16.7629 4.6V6.77887H20.0313C20.6306 6.77887 21.1437 6.99209 21.5708 7.41848C21.9971 7.84548 22.2103 8.35867 22.2103 8.95789V19.8526H0.420898Z" />
  </svg>
);

const meta = {
  title: 'Components/Card',
  component: EventCard,
  tags: ['autodocs'],
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Event: Story = {
  args: {
    title: 'Service Event',
    subtitle: 'Reference #: 6668550',
    icon: <ServiceEventIcon />,
    meta: [
      { label: 'Service Needed', value: 'PS000011' },
      { label: 'Service Type', value: 'Install' },
      { label: 'Date Created', value: '03/11/2025' },
    ],
  },
};

export const Status: StoryObj = {
  render: () => <StatusCard title="GE Healthcare CARESCAPE" meta="Serial 4521-89A · Operational" />,
};

export const Alert: StoryObj = {
  render: () => (
    <AlertCard
      title="Calibration overdue"
      subtitle="Asset out of tolerance"
      severity="error"
      location="Imaging — Room 314"
      datetime="2 hours ago"
    />
  ),
};

export const AiData: StoryObj = {
  render: () => (
    <AiDataCard
      title="BATTERY RECHARGEABLE, LITHIUM ION, 7.2V, 1.35 AH"
      manufacturer="by Welch Allyn Inc."
      meta={
        <>
          <div>FedEx &nbsp;·&nbsp; <span className="text-[var(--ps-prim-blue-500)] font-semibold">#032523123242</span></div>
          <div>Est. Delivery: Today by 1:00 PM</div>
        </>
      }
      badges={[{ tone: 'notShipped', label: 'Not Shipped' }]}
      cost="$2,400"
    />
  ),
};

export const Analytics: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex gap-6 items-start">
      <AnalyticsCard
        layout="wide"
        title="Parts Spend"
        value="$1.2M"
        label="Parts Spend"
        delta={{ value: '5.3%', direction: 'up' }}
        benchmark="15% below peer benchmark"
        linkLabel="View Details"
      />
      <AnalyticsCard
        layout="square"
        title="Avg Resolution Time"
        value="2.3"
        label="Days"
        sub="Average in selected period"
        showMenu
      />
      <AnalyticsCard
        layout="square"
        title="Critical Rate"
        value="74.2%"
        sub="Resolved in less than 2 days"
        highlight
        showMenu
      />
    </div>
  ),
};

export const ListVariants: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex gap-6 items-start flex-wrap">
      <ListCard
        title="My Favorites"
        pill={{ tone: 'shopping', label: 'Shopping' }}
        count="7 items"
        shareCount={0}
      />
      <ListCard variant="create" />
      <ListCard
        variant="standing"
        title="Maintenance Parts Bundle"
        meta={[
          { label: 'Frequency', value: 'Every 3 Months' },
          { label: 'Creator', value: 'Robert Chen' },
          { label: 'Next Order', value: 'MM/DD/YY' },
        ]}
        statusDate="MM/DD/YY"
      />
    </div>
  ),
};

export const Product: StoryObj = {
  parameters: { layout: 'padded' },
  render: () => (
    <ProductCard
      title="PATIENT CABLE, SPO2 SPOT CHECK, RED LNC-01 SERIES"
      date="CREATED 04/21/2026"
      info={[
        { label: 'Facility', value: 'Chatham Memorial Clinic' },
        { label: 'Ref #', value: '9535566' },
        { label: 'Requester', value: 'PETE ZILKO' },
        { label: 'Qty', value: '1' },
      ]}
      statusTitle="Quote Available"
      statusBody="Item is ready for purchase."
      primaryLabel="SEE BUYING OPTIONS (2)"
    />
  ),
};

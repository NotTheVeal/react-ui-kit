import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { EventCard, StatusCard, AlertCard } from './Card';

const ServiceEventIcon = () => (
  <svg width={23} height={23} viewBox="0 0 23 23" fill="currentColor" aria-hidden="true">
    <path d="M0.420898 19.8526V8.95789C0.420898 8.35867 0.634398 7.84548 1.06141 7.41848C1.48781 6.99209 2.00057 6.77887 2.59979 6.77887H5.86816V4.6C5.86816 4.00078 6.08167 3.48799 6.50868 3.06164C6.93506 2.63461 7.44784 2.4211 8.04705 2.4211H14.584C15.1832 2.4211 15.6964 2.63461 16.1234 3.06164C16.5498 3.48799 16.7629 4.00078 16.7629 4.6V6.77887H20.0313C20.6306 6.77887 21.1437 6.99209 21.5708 7.41848C21.9971 7.84548 22.2103 8.35867 22.2103 8.95789V19.8526H0.420898Z" />
  </svg>
);

const meta = {
  title: 'Cards/Card',
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

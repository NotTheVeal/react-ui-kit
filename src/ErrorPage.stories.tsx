import type { Meta, StoryObj } from '@storybook/react';
import { ErrorPage } from './Feedback';

const meta = {
  title: 'Feedback/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ErrorPage>;

export default meta;

export const Error404: StoryObj = {
  render: () => (
    <ErrorPage
      code="404"
      title="We couldn't find that page"
      body="It may have moved or been deleted. Try going back to your dashboard."
      primaryAction={{ label: 'Go to Dashboard' }}
      secondaryAction={{ label: 'Search Parts' }}
    />
  ),
};

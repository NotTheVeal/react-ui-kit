import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Pagination, DatePicker } from './Controls';

const meta = {
  title: 'Forms/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    return (
      <Pagination
        page={page}
        totalPages={24}
        total={234}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const MiddleOfRange: StoryObj = {
  render: () => {
    const [page, setPage] = React.useState(13);
    return (
      <Pagination
        page={page}
        totalPages={24}
        total={234}
        pageSize={10}
        onPageChange={setPage}
        onPageSizeChange={() => {}}
      />
    );
  },
};

export const Compact: StoryObj = {
  render: () => {
    const [page, setPage] = React.useState(1);
    return <Pagination page={page} totalPages={3} onPageChange={setPage} compact />;
  },
};

export const DateRangePicker: StoryObj = {
  render: () => <DatePicker title="Preferred Window" />,
};

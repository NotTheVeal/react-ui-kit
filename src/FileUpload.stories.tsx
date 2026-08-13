import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    state: { control: 'select', options: ['default', 'dragOver', 'uploading', 'complete', 'error'] },
    progress: { control: { type: 'range', min: 0, max: 100 } },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { state: 'default' } };
export const DragOver: Story = { args: { state: 'dragOver' } };
export const Uploading: Story = { args: { state: 'uploading', progress: 60 } };
export const Complete: Story = { args: { state: 'complete' } };
export const Error: Story = { args: { state: 'error' } };

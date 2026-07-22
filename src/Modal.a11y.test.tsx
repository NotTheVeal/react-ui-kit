import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Modal, ConfirmDialog } from './Modal';

describe('Modal accessibility', () => {
  it('has no violations — open modal with title, body and footer', async () => {
    const { container } = render(
      <Modal open title="Edit Order" footer={<button>Save</button>} onClose={() => {}}>
        Modal body content
      </Modal>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — confirm dialog', async () => {
    const { container } = render(
      <ConfirmDialog
        open
        title="Delete item?"
        message="This cannot be undone."
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no violations — destructive confirm dialog', async () => {
    const { container } = render(
      <ConfirmDialog
        open
        destructive
        title="Remove access?"
        message="The user will lose access immediately."
        confirmLabel="Remove"
        cancelLabel="Keep"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});

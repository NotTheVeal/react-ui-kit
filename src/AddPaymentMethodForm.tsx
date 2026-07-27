import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// AddPaymentMethodForm.tsx — PartsSource Design System
//
// 1:1 port of Figma "Add Payment Method Form" (node 5466:52).
// Title · Card number · [Expiry | CVC] · Name on card · Save Card CTA.
// Presentational + controlled-optional; emits a single onSubmit payload.
// ──────────────────────────────────────────────────────────────────

const cx = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

export interface AddPaymentMethodFormProps {
  title?: string;
  submitLabel?: string;
  /** Called with the field values when the form is submitted. */
  onSubmit?: (values: {
    cardNumber: string;
    expiry: string;
    cvc: string;
    name: string;
  }) => void;
  className?: string;
}

const inputClass = cx(
  'w-full rounded-[var(--ps-sem-radius-control)] border border-solid border-[var(--ps-sem-border-default)]',
  'bg-[var(--ps-sem-bg-surface)] px-[var(--ps-sem-space-inset-md)] py-2',
  'text-[length:var(--ps-sem-text-body)] text-[color:var(--ps-sem-fg-primary)]',
  'placeholder:text-[color:var(--ps-sem-fg-tertiary)]',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0',
  'focus-visible:outline-[var(--ps-sem-border-focus)]',
);

const Field: React.FC<{
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (v: string) => void;
  inputMode?: 'numeric' | 'text';
  autoComplete?: string;
}> = ({ id, label, placeholder, value, onChange, inputMode, autoComplete }) => (
  <div className="flex w-full flex-col items-start gap-[var(--ps-sem-space-stack-xs)]">
    <label
      htmlFor={id}
      className="text-[length:var(--ps-sem-text-caption)] font-semibold leading-normal text-[color:var(--ps-sem-fg-secondary)]"
    >
      {label}
    </label>
    <input
      id={id}
      type="text"
      inputMode={inputMode}
      autoComplete={autoComplete}
      placeholder={placeholder}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className={inputClass}
    />
  </div>
);

const AddPaymentMethodForm: React.FC<AddPaymentMethodFormProps> = ({
  title = 'Add Payment Method',
  submitLabel = 'Save Card',
  onSubmit,
  className = '',
}) => {
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const [name, setName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ cardNumber, expiry, cvc, name });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cx(
        'flex w-[354px] flex-col items-start gap-[var(--ps-sem-space-stack-md)] overflow-clip',
        'rounded-[var(--ps-sem-radius-surface)] border border-solid border-[var(--ps-sem-border-subtle)]',
        'bg-[var(--ps-sem-bg-surface)] p-[var(--ps-sem-space-inset-lg)]',
        "font-['Source_Sans_Pro',sans-serif]",
        className,
      )}
    >
      <h3 className="m-0 text-[length:var(--ps-sem-text-heading)] font-semibold leading-normal text-[color:var(--ps-sem-fg-primary)]">
        {title}
      </h3>

      <Field
        id="apm-card-number" label="Card number"
        placeholder="1234 5678 9012 3456" value={cardNumber}
        onChange={setCardNumber} inputMode="numeric" autoComplete="cc-number"
      />

      <div className="flex w-full items-start gap-4">
        <Field
          id="apm-expiry" label="Expiry" placeholder="MM/YY"
          value={expiry} onChange={setExpiry} inputMode="numeric"
          autoComplete="cc-exp"
        />
        <Field
          id="apm-cvc" label="CVC" placeholder="•••"
          value={cvc} onChange={setCvc} inputMode="numeric" autoComplete="cc-csc"
        />
      </div>

      <Field
        id="apm-name" label="Name on card" placeholder="Jane Smith"
        value={name} onChange={setName} autoComplete="cc-name"
      />

      <button
        type="submit"
        className={cx(
          'mt-1 flex h-[50px] w-full items-center justify-center overflow-clip',
          'rounded-[var(--ps-sem-radius-control)] bg-[var(--ps-sem-bg-brand)]',
          'text-[length:var(--ps-sem-text-body)] font-semibold text-[color:var(--ps-sem-fg-inverse)]',
          'hover:bg-[var(--ps-prim-blue-600)]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          'focus-visible:outline-[var(--ps-sem-border-focus)]',
        )}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export { AddPaymentMethodForm };
export default AddPaymentMethodForm;

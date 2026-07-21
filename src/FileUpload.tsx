import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// FileUpload.tsx — PartsSource Design System
//
// Dashed drop zone with five states, matching the Figma /File Upload
// component (Large frame, node 4962:6097):
//   default   — cloud icon, prompt, browse button, accepted-types hint
//   dragOver  — blue dashed border, filled tint (drag feedback)
//   uploading — blue cloud, progress bar + percent
//   complete  — green dashed border + tint, check icon
//   error     — red dashed border + tint, X icon, retry button
//
// Built on a real <input type="file"> (visually hidden) so the browse
// button and keyboard both open the native picker. Drag events flip the
// component into `dragOver` and surface dropped files via onFilesSelected.
// ──────────────────────────────────────────────────────────────────

type FileUploadState = 'default' | 'dragOver' | 'uploading' | 'complete' | 'error';

interface FileUploadProps {
  state?: FileUploadState;
  /** Comma-separated accept attribute, e.g. ".pdf,.png,.jpg,.docx". */
  accept?: string;
  /** Hint shown beneath the button, e.g. "Accepted: PDF, PNG, JPG, DOCX · Max 10MB". */
  hint?: string;
  /** 0–100, shown by the progress bar in the `uploading` state. */
  progress?: number;
  /** Allow selecting multiple files. */
  multiple?: boolean;
  browseLabel?: string;
  onFilesSelected?: (files: FileList) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const cxUpload = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const CloudIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={44} height={44} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 18a4 4 0 01-.7-7.94A5.5 5.5 0 0117.9 9.2 3.5 3.5 0 0117 18M12 12v6m0-6l-2.5 2.5M12 12l2.5 2.5"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckCircleIcon: React.FC = () => (
  <svg width={44} height={44} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="var(--ps-prim-green-700)" strokeWidth="1.6" />
    <path d="M8.5 12.2l2.3 2.3 4.7-4.7" stroke="var(--ps-prim-green-700)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorCircleIcon: React.FC = () => (
  <svg width={44} height={44} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="var(--ps-prim-red-700)" strokeWidth="1.6" />
    <path d="M9 9l6 6M15 9l-6 6" stroke="var(--ps-prim-red-700)" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Border + fill treatment per state.
const shell: Record<FileUploadState, string> = {
  default: 'border-[var(--ps-prim-gray-400)] bg-white',
  dragOver: 'border-[var(--ps-prim-blue-500)] bg-[var(--ps-prim-blue-25)]',
  uploading: 'border-[var(--ps-prim-gray-400)] bg-white',
  complete: 'border-[var(--ps-prim-green-600)] bg-[var(--ps-prim-green-50)]',
  error: 'border-[var(--ps-prim-red-600)] bg-[var(--ps-prim-red-50)]',
};

const FileUpload: React.FC<FileUploadProps> = ({
  state = 'default',
  accept,
  hint = 'Accepted: PDF, PNG, JPG, DOCX · Max 10MB',
  progress = 0,
  multiple = false,
  browseLabel = 'Primary button',
  onFilesSelected,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = React.useState(false);

  // `dragOver` can be driven externally (prop) or internally (live drag).
  const effectiveState: FileUploadState =
    dragging && state === 'default' ? 'dragOver' : state;

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    if (e.dataTransfer.files?.length) onFilesSelected?.(e.dataTransfer.files);
  };

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div
      className={cxUpload("w-full max-w-[440px] font-['Source_Sans_Pro',sans-serif]", className)}
    >
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled && state === 'default') setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        aria-label={ariaLabel || 'File upload'}
        aria-disabled={disabled || undefined}
        className={cxUpload(
          'flex flex-col items-center text-center rounded-md border-2 border-dashed px-6 py-8 transition-colors',
          shell[effectiveState],
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-label="Choose files to upload"
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) onFilesSelected?.(e.target.files);
          }}
        />

        {effectiveState === 'complete' ? (
          <>
            <CheckCircleIcon />
            <p className="mt-4 mb-1 text-[16px] font-bold text-[var(--ps-prim-green-700)]">Upload complete!</p>
            <p className="text-[14px] text-[var(--ps-prim-gray-600)]">All files uploaded successfully</p>
          </>
        ) : effectiveState === 'error' ? (
          <>
            <ErrorCircleIcon />
            <p className="mt-4 mb-1 text-[16px] font-bold text-[var(--ps-prim-red-700)]">Upload failed</p>
            <p className="text-[14px] text-[var(--ps-prim-gray-600)]">File type not supported or size limit exceeded</p>
            <button
              type="button"
              onClick={openPicker}
              className="mt-4 h-11 px-6 rounded bg-[var(--ps-prim-blue-500)] text-white text-[14px] font-bold uppercase tracking-[0.5px] cursor-pointer hover:bg-[var(--ps-prim-blue-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-prim-blue-500)] focus-visible:ring-offset-2"
            >
              {browseLabel}
            </button>
            <p className="mt-3 text-[12px] text-[var(--ps-prim-gray-500)]">{hint}</p>
          </>
        ) : effectiveState === 'uploading' ? (
          <>
            <CloudIcon color="var(--ps-prim-blue-500)" />
            <p className="mt-4 mb-1 text-[16px] font-bold text-[var(--ps-prim-gray-800)]">Uploading files…</p>
            <p className="text-[14px] text-[var(--ps-prim-gray-500)] mb-3">Please wait</p>
            <div
              className="w-full h-2 rounded-full bg-[var(--ps-prim-gray-300)] overflow-hidden"
              role="progressbar"
              aria-label="Upload progress"
              aria-valuenow={clampedProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-[var(--ps-prim-blue-500)] transition-[width]"
                style={{ width: `${clampedProgress}%` }}
              />
            </div>
            <p className="mt-2 text-[13px] text-[var(--ps-prim-gray-600)]">Uploading… {clampedProgress}%</p>
          </>
        ) : (
          <>
            <CloudIcon color={effectiveState === 'dragOver' ? 'var(--ps-prim-blue-500)' : 'var(--ps-prim-gray-800)'} />
            <p className="mt-4 mb-1 text-[16px] font-bold text-[var(--ps-prim-gray-800)]">Drag &amp; drop files here</p>
            <p className="text-[14px] text-[var(--ps-prim-gray-500)]">or browse to upload</p>
            <button
              type="button"
              onClick={openPicker}
              disabled={disabled}
              className="mt-4 h-11 px-6 rounded bg-[var(--ps-prim-blue-500)] text-white text-[14px] font-bold uppercase tracking-[0.5px] cursor-pointer hover:bg-[var(--ps-prim-blue-600)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ps-prim-blue-500)] focus-visible:ring-offset-2"
            >
              {browseLabel}
            </button>
            <p className="mt-3 text-[12px] text-[var(--ps-prim-gray-500)]">{hint}</p>
          </>
        )}
      </div>
    </div>
  );
};

export { FileUpload };
export type { FileUploadProps, FileUploadState };

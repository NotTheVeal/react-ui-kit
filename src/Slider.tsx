import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Slider.tsx — PartsSource Design System
//
// Single- and range-value sliders, matching the Figma /Slider component
// (node 4518:47). Blue filled track, white thumb with blue border, grey
// unfilled track; optional label row (label left, value right) and
// min/max end labels. Built on native <input type="range"> so keyboard
// interaction and ARIA come for free.
//
// States: default · hover · focus (blue glow) · disabled (all grey).
// ──────────────────────────────────────────────────────────────────

type SliderType = 'single' | 'range';

interface SliderBaseProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Show the current value at the top-right of the label row. */
  showValue?: boolean;
  /** Show the min/max end labels beneath the track. */
  showMinMax?: boolean;
  /** Format a raw number for display (value readout + end labels). */
  formatValue?: (n: number) => string;
  className?: string;
  'aria-label'?: string;
}

interface SingleSliderProps extends SliderBaseProps {
  type?: 'single';
  value: number;
  onChange?: (value: number) => void;
}

interface RangeSliderProps extends SliderBaseProps {
  type: 'range';
  value: [number, number];
  onChange?: (value: [number, number]) => void;
}

type SliderProps = SingleSliderProps | RangeSliderProps;

const STYLE_ID = 'ps-slider-styles';

// Thumb pseudo-elements can't be styled with Tailwind utilities, so the
// component injects one scoped stylesheet the first time it mounts.
const sliderCss = `
.ps-slider-input{-webkit-appearance:none;appearance:none;width:100%;height:20px;background:transparent;margin:0;cursor:pointer;position:relative;}
.ps-slider-input:disabled{cursor:not-allowed;}
.ps-slider-input::-webkit-slider-runnable-track{height:4px;border-radius:9999px;background:transparent;}
.ps-slider-input::-moz-range-track{height:4px;border-radius:9999px;background:transparent;}
.ps-slider-input::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:16px;height:16px;margin-top:-6px;border-radius:9999px;background:var(--ps-prim-gray-0);border:2px solid var(--ps-prim-blue-500);box-shadow:0 1px 2px rgba(0,47,72,.25);transition:box-shadow .12s ease;}
.ps-slider-input::-moz-range-thumb{width:16px;height:16px;border-radius:9999px;background:var(--ps-prim-gray-0);border:2px solid var(--ps-prim-blue-500);box-shadow:0 1px 2px rgba(0,47,72,.25);}
.ps-slider-input:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 6px rgba(0,91,166,.2);}
.ps-slider-input:focus-visible::-moz-range-thumb{box-shadow:0 0 0 6px rgba(0,91,166,.2);}
.ps-slider-input:disabled::-webkit-slider-thumb{border-color:var(--ps-prim-gray-400);background:var(--ps-prim-gray-300);box-shadow:none;}
.ps-slider-input:disabled::-moz-range-thumb{border-color:var(--ps-prim-gray-400);background:var(--ps-prim-gray-300);box-shadow:none;}
.ps-slider-range{pointer-events:none;}
.ps-slider-range::-webkit-slider-thumb{pointer-events:auto;}
.ps-slider-range::-moz-range-thumb{pointer-events:auto;}
`;

const useSliderStyles = () => {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = sliderCss;
    document.head.appendChild(el);
  }, []);
};

const cxSlider = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(' ');

const pct = (n: number, min: number, max: number) =>
  max === min ? 0 : ((n - min) / (max - min)) * 100;

// Track background: grey base with a blue fill between `from`% and `to`%.
const trackFill = (fromPct: number, toPct: number, disabled: boolean) => {
  const fill = disabled ? 'var(--ps-prim-gray-400)' : 'var(--ps-prim-blue-500)';
  const base = 'var(--ps-prim-gray-300)';
  return `linear-gradient(to right, ${base} 0%, ${base} ${fromPct}%, ${fill} ${fromPct}%, ${fill} ${toPct}%, ${base} ${toPct}%, ${base} 100%)`;
};

const Slider: React.FC<SliderProps> = (props) => {
  useSliderStyles();
  const {
    label,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    showValue = true,
    showMinMax = true,
    formatValue = (n) => String(n),
    className = '',
    'aria-label': ariaLabel,
  } = props;

  const isRange = props.type === 'range';

  const valueDisplay = isRange
    ? `${formatValue((props.value as [number, number])[0])} — ${formatValue((props.value as [number, number])[1])}`
    : formatValue(props.value as number);

  return (
    <div
      className={cxSlider(
        "w-full max-w-[440px] font-['Source_Sans_Pro',sans-serif] select-none",
        className,
      )}
    >
      {(label || (showValue && valueDisplay)) && (
        <div className="flex items-center justify-between mb-2">
          {label ? (
            <span className="text-[14px] text-[var(--ps-prim-gray-800)]">{label}</span>
          ) : (
            <span />
          )}
          {showValue && (
            <span
              className={cxSlider(
                'text-[14px] font-bold',
                disabled ? 'text-[var(--ps-prim-gray-500)]' : 'text-[var(--ps-prim-blue-500)]',
              )}
            >
              {valueDisplay}
            </span>
          )}
        </div>
      )}

      {isRange ? (
        <RangeTrack
          value={props.value as [number, number]}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          ariaLabel={ariaLabel || label}
          onChange={(props as RangeSliderProps).onChange}
        />
      ) : (
        <div className="relative h-5 flex items-center">
          <input
            type="range"
            className="ps-slider-input"
            min={min}
            max={max}
            step={step}
            value={props.value as number}
            disabled={disabled}
            aria-label={ariaLabel || label}
            style={{
              background: trackFill(0, pct(props.value as number, min, max), disabled),
              backgroundSize: '100% 4px',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            } as React.CSSProperties}
            onChange={(e) =>
              (props as SingleSliderProps).onChange?.(Number(e.target.value))
            }
          />
        </div>
      )}

      {showMinMax && (
        <div className="flex items-center justify-between mt-1.5 text-[12px] text-[var(--ps-prim-gray-600)]">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}
    </div>
  );
};

// ── Range: two overlaid native inputs ────────────────────────────
interface RangeTrackProps {
  value: [number, number];
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  ariaLabel?: string;
  onChange?: (value: [number, number]) => void;
}

const RangeTrack: React.FC<RangeTrackProps> = ({
  value,
  min,
  max,
  step,
  disabled,
  ariaLabel,
  onChange,
}) => {
  const [lo, hi] = value;
  const loPct = pct(lo, min, max);
  const hiPct = pct(hi, min, max);

  const commit = (nextLo: number, nextHi: number) => {
    // Keep thumbs from crossing.
    const clampedLo = Math.min(nextLo, nextHi);
    const clampedHi = Math.max(nextLo, nextHi);
    onChange?.([clampedLo, clampedHi]);
  };

  const inputBase =
    'ps-slider-input ps-slider-range absolute left-0 top-0 w-full';

  return (
    <div className="relative h-5">
      {/* Shared visual track sits behind both inputs. */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded-full"
        style={{ background: trackFill(loPct, hiPct, disabled) }}
      />
      <input
        type="range"
        className={inputBase}
        style={{ background: 'transparent', pointerEvents: 'none' }}
        min={min}
        max={max}
        step={step}
        value={lo}
        disabled={disabled}
        aria-label={ariaLabel ? `${ariaLabel} minimum` : 'Minimum'}
        onChange={(e) => commit(Number(e.target.value), hi)}
      />
      <input
        type="range"
        className={inputBase}
        style={{ background: 'transparent', pointerEvents: 'none' }}
        min={min}
        max={max}
        step={step}
        value={hi}
        disabled={disabled}
        aria-label={ariaLabel ? `${ariaLabel} maximum` : 'Maximum'}
        onChange={(e) => commit(lo, Number(e.target.value))}
      />
    </div>
  );
};

export { Slider };
export type { SliderProps, SliderType, SingleSliderProps, RangeSliderProps };

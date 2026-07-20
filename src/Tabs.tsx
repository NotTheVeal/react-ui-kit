import * as React from 'react';

// ──────────────────────────────────────────────────────────────────
// Tabs.tsx — PartsSource Design System
//
// FolderTabs:    Page-level sub-nav. Active tab lifts above a divider
//                with a 3px brand-blue top border and 1px gray side
//                borders. Inactive tabs sit borderless on the divider.
// SegmentedTabs: Compact icon-only switcher inside a single rounded
//                container; the active half is white.
// PillTabs:      Multi-select chip row for filtering, fully rounded.
//
// Pulled from preview/tabs.html.
// ──────────────────────────────────────────────────────────────────

interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  activeId?: string;
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

const cxTab = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

const useActive = (defaultId: string | undefined, controlled: string | undefined) => {
  const [internal, setInternal] = React.useState(defaultId ?? "");
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : internal;
  const set = (id: string) => {
    if (!isControlled) setInternal(id);
  };
  return [value, set] as const;
};

// ── FolderTabs ───────────────────────────────────────────────────
const FolderTabs: React.FC<TabsProps> = ({
  items,
  activeId,
  defaultActiveId,
  onChange,
  className = "",
}) => {
  const [active, setActive] = useActive(defaultActiveId ?? items[0]?.id, activeId);

  return (
    <div
      role="tablist"
      className={cxTab(
        "flex items-end font-['Source_Sans_Pro','Source_Sans_3',sans-serif]",
        className,
      )}
      style={{ paddingTop: 6, borderBottom: "1px solid var(--ps-prim-gray-225)" }}
    >
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={item.disabled}
            onClick={() => {
              if (item.disabled) return;
              setActive(item.id);
              onChange?.(item.id);
            }}
            className={cxTab(
              "relative inline-flex items-center gap-2 px-6 text-[16px] cursor-pointer",
              "rounded-t-[2px]",
              isActive ? "text-[var(--ps-prim-gray-900)] font-bold" : "text-[var(--ps-prim-gray-900)] hover:text-[var(--ps-prim-blue-500)] font-normal",
              item.disabled && "text-[var(--ps-prim-gray-400)] cursor-not-allowed hover:text-[var(--ps-prim-gray-400)]",
            )}
            style={
              isActive
                ? {
                    height: 46,
                    background: "white",
                    borderTop: "3px solid var(--ps-prim-blue-500)",
                    borderLeft: "1px solid var(--ps-prim-gray-225)",
                    borderRight: "1px solid var(--ps-prim-gray-225)",
                    borderBottom: 0,
                    marginBottom: -1,
                  }
                : {
                    height: 40,
                    background: "transparent",
                    border: "1px solid transparent",
                    borderBottom: 0,
                    marginBottom: 0,
                  }
            }
          >
            {item.label}
            {item.count !== undefined && (
              <span
                className={cxTab(
                  "inline-flex items-center justify-center text-[12px] font-bold",
                  "bg-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-900)]",
                )}
                style={{ minWidth: 22, height: 20, padding: "0 7px", borderRadius: 30 }}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

// ── SegmentedTabs ────────────────────────────────────────────────
const SegmentedTabs: React.FC<TabsProps> = ({
  items,
  activeId,
  defaultActiveId,
  onChange,
  className = "",
}) => {
  const [active, setActive] = useActive(defaultActiveId ?? items[0]?.id, activeId);

  return (
    <div
      className={cxTab(
        "inline-flex h-9 border border-[var(--ps-prim-gray-225)] rounded-md overflow-hidden bg-white",
        "font-['Source_Sans_Pro',sans-serif]",
        className,
      )}
    >
      {items.map((item, i) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            onClick={() => {
              if (item.disabled) return;
              setActive(item.id);
              onChange?.(item.id);
            }}
            className={cxTab(
              "inline-flex items-center justify-center min-w-[42px] h-full px-2.5 cursor-pointer text-[13px] font-semibold",
              "border-0",
              i > 0 && "border-l border-[var(--ps-prim-gray-225)]",
              isActive
                ? "bg-white text-[var(--ps-prim-gray-900)]"
                : "bg-[var(--ps-prim-gray-150)] text-[var(--ps-prim-gray-800)] hover:bg-[var(--ps-prim-gray-200)]",
              item.disabled && "opacity-40 cursor-not-allowed",
            )}
          >
            {item.icon}
            {item.label && <span className="ml-1.5">{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

// ── PillTabs ─────────────────────────────────────────────────────
const PillTabs: React.FC<TabsProps> = ({
  items,
  activeId,
  defaultActiveId,
  onChange,
  className = "",
}) => {
  const [active, setActive] = useActive(defaultActiveId ?? items[0]?.id, activeId);

  return (
    <div className={cxTab("flex gap-2 flex-wrap font-['Source_Sans_Pro',sans-serif]", className)}>
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            onClick={() => {
              if (item.disabled) return;
              setActive(item.id);
              onChange?.(item.id);
            }}
            className={cxTab(
              "inline-flex items-center gap-1.5 h-[30px] px-3.5 rounded-[30px] border text-[14px] cursor-pointer",
              isActive
                ? "bg-[var(--ps-prim-blue-500)] border-[var(--ps-prim-blue-500)] text-white"
                : "bg-white border-[var(--ps-prim-gray-400)] text-[var(--ps-prim-gray-800)] hover:border-[var(--ps-prim-blue-500)] hover:text-[var(--ps-prim-blue-500)]",
              item.disabled && "opacity-40 cursor-not-allowed",
            )}
          >
            {item.label}
            {item.count !== undefined && (
              <span
                className={cxTab(
                  "min-w-[22px] h-5 px-1.5 rounded-[30px] text-[12px] font-bold inline-flex items-center justify-center",
                  isActive ? "bg-white/25 text-inherit" : "bg-[var(--ps-prim-gray-300)] text-[var(--ps-prim-gray-900)]",
                )}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export { FolderTabs, SegmentedTabs, PillTabs };

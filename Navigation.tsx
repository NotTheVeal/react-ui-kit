// ════════════════════════════════════════════════════════════════
// AUTO-GENERATED FROM src/ — do NOT hand-edit.
// Source: UI Kit/src/Navigation.tsx · run `npm run sync:browser`.
// ════════════════════════════════════════════════════════════════
// ──────────────────────────────────────────────────────────────────
// Navigation.tsx — PartsSource Design System
//
// TopNav: utility row + main row (logo, search, categories, cart,
//         facility selector) + brand-blue page hero with PRO Account.
// LeftNav: 210px (collapsed 67px) dark-blue rail with avatar header,
//         nav items, dividers and log-out.
//
// Pulled from preview/top-navigation.html and preview/left-hand-navigation.html.
// ──────────────────────────────────────────────────────────────────

interface TopNavProps {
  logoSrc?: string;
  searchPlaceholder?: string;
  cartCount?: number;
  facilityLabel?: string;
  facilityName?: string;
  heroTitle?: React.ReactNode;
  proAccountLogo?: string;
  onSearch?: (q: string) => void;
  onCartClick?: () => void;
  onHomeClick?: () => void;
  className?: string;
}

interface LeftNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  href?: string;
  onClick?: () => void;
  hasChevron?: boolean;
}

interface LeftNavProps {
  userInitials?: string;
  userName?: string;
  items: LeftNavItem[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onLogout?: () => void;
  className?: string;
}

const cxNav = (...parts: Array<string | false | undefined>) =>
  parts.filter(Boolean).join(" ");

// ── TopNav ───────────────────────────────────────────────────────
const TopNav: React.FC<TopNavProps> = ({
  logoSrc,
  searchPlaceholder = "Search Keyword or Item Number",
  cartCount = 0,
  facilityLabel = "Selected Facility",
  facilityName = "Chatham Memorial Hospital",
  heroTitle,
  proAccountLogo,
  onSearch,
  onCartClick,
  onHomeClick,
  className = "",
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={cxNav("w-full flex flex-col bg-white text-[var(--ps-prim-gray-800)] font-['Source_Sans_Pro',sans-serif]", className)}>
      {/* Utility */}
      <div className="h-7 border-b border-[var(--ps-prim-gray-225)] px-10 flex justify-end items-center gap-5 text-[14px]">
        <span className="inline-flex items-center gap-1.5 text-[var(--ps-prim-blue-400)]">
          <svg width={10} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--ps-prim-gray-900)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <a href="tel:8774976412" className="text-[var(--ps-prim-blue-400)] no-underline">877-497-6412</a>
        </span>
        <a href="#" className="text-black no-underline hover:text-[var(--ps-prim-blue-500)] hover:underline">Help</a>
        <a href="#" className="text-black no-underline hover:text-[var(--ps-prim-blue-500)] hover:underline">About Us</a>
      </div>
      {/* Main */}
      <div className="h-[60px] border-b border-[var(--ps-prim-gray-225)] px-10 flex items-center gap-[18px]">
        <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick?.(); }} className="w-[200px] flex items-center flex-shrink-0">
          {logoSrc ? (
            <img src={logoSrc} alt="PartsSource" className="w-[200px] h-auto block" />
          ) : (
            <span className="text-[var(--ps-prim-blue-500)] font-bold text-[20px] tracking-tight">PartsSource</span>
          )}
        </a>
        <form
          role="search"
          onSubmit={(e) => { e.preventDefault(); onSearch?.(inputRef.current?.value ?? ""); }}
          className="flex-1 max-w-[800px] h-8 flex items-stretch border border-[var(--ps-prim-gray-400)] rounded-[5px] bg-white overflow-hidden hover:border-[var(--ps-prim-gray-500)] focus-within:border-[var(--ps-prim-blue-500)] focus-within:shadow-[0_0_0_3px_rgba(0,91,166,0.15)]"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder={searchPlaceholder}
            className="flex-1 border-0 outline-none px-4 text-[14px] text-[var(--ps-prim-gray-800)] bg-transparent placeholder:text-[var(--ps-prim-gray-600)]"
          />
          <button type="submit" aria-label="Search" className="w-[34px] flex-shrink-0 border-0 bg-[var(--ps-prim-orange-400)] text-white cursor-pointer flex items-center justify-center hover:bg-[var(--ps-prim-orange-450)]">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M20 20l-4.8-4.8" />
            </svg>
          </button>
        </form>
        <span className="text-[16px] font-semibold text-[var(--ps-prim-gray-900)022] cursor-pointer flex-shrink-0 whitespace-nowrap hover:text-[var(--ps-prim-blue-500)]">
          Categories +
        </span>
        <span
          role="button"
          onClick={onCartClick}
          className="relative w-[34px] h-8 flex-shrink-0 cursor-pointer flex items-center justify-center"
          aria-label="Cart"
        >
          <svg width={30} height={24} viewBox="0 0 30 28" fill="none" stroke="var(--ps-prim-blue-500)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 3h4l2.4 13.2a2 2 0 0 0 2 1.6h11.4a2 2 0 0 0 2-1.6L26 7H7" />
            <circle cx="11" cy="24" r="1.6" fill="var(--ps-prim-blue-500)" />
            <circle cx="22" cy="24" r="1.6" fill="var(--ps-prim-blue-500)" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-[9px] bg-[var(--ps-prim-orange-400)] text-white text-[11px] font-bold inline-flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </span>
        <span className="w-px h-[31px] bg-[var(--ps-prim-gray-400)] flex-shrink-0" aria-hidden="true" />
        <span role="button" className="flex items-center gap-2.5 cursor-pointer flex-shrink-0 px-1 py-0.5 rounded">
          <svg width={14} height={20} viewBox="0 0 14 20" fill="var(--ps-prim-gray-800)" aria-hidden="true">
            <path d="M7 0a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 7 4.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
          <span className="flex flex-col leading-[1.1] gap-0.5">
            <span className="text-[12px] text-[var(--ps-prim-gray-800)]">{facilityLabel}</span>
            <span className="text-[16px] font-bold text-[var(--ps-prim-gray-800)]">{facilityName}</span>
          </span>
        </span>
      </div>
      {/* Hero */}
      <div className="h-[52px] bg-[var(--ps-prim-blue-700)] relative overflow-hidden flex items-center">
        <span className="text-white text-[24px] tracking-[-0.01em] leading-9 px-6 flex-shrink-0">{heroTitle}</span>
        {proAccountLogo && (
          <div
            className="absolute right-0 top-0 w-[504px] h-[52px] bg-[var(--ps-prim-blue-100)] flex items-center gap-3.5 text-[var(--ps-prim-gray-720)]"
            style={{
              clipPath: "polygon(54px 0, 100% 0, 100% 100%, 0 100%)",
              paddingLeft: "120px",
              boxShadow: "inset -4px 4px 10px 0 rgba(0,0,0,.19)",
            }}
          >
            <img src={proAccountLogo} alt="" className="block h-9 w-auto" />
            <span className="w-px h-6 bg-[var(--ps-prim-gray-600)]" aria-hidden="true" />
            <span className="text-[16px] font-bold text-[var(--ps-prim-cyan-400)] tracking-[0.04em]">PRO&nbsp;&nbsp;ACCOUNT</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ── LeftNav ──────────────────────────────────────────────────────
const LeftNav: React.FC<LeftNavProps> = ({
  userInitials = "EG",
  userName = "Earl G.",
  items,
  collapsed = false,
  onToggleCollapse,
  onLogout,
  className = "",
}) => (
  <nav
    aria-label="Primary navigation"
    style={{ width: collapsed ? 67 : 210 }}
    className={cxNav(
      "relative h-full flex flex-col flex-shrink-0 bg-[var(--ps-prim-blue-700)] text-white overflow-hidden",
      "transition-[width] duration-300 ease-in-out",
      "font-['Source_Sans_3','Source_Sans_Pro',sans-serif] text-[14px] leading-[1.4]",
      className,
    )}
  >
    <div
      className={cxNav(
        "flex items-center gap-4 h-[60px] bg-[var(--ps-prim-blue-600)] shadow-[0_1px_2px_rgba(0,0,0,0.1)] flex-shrink-0 transition-[padding] duration-300",
        collapsed ? "px-[21.5px]" : "px-4",
      )}
    >
      <div className="flex items-center justify-center w-6 h-6 rounded-full pt-0.5 bg-white text-[var(--ps-prim-blue-500)] text-[12px] font-bold uppercase flex-shrink-0">
        {userInitials}
      </div>
      {!collapsed && (
        <span className="text-[18px] font-normal text-white whitespace-nowrap overflow-hidden text-ellipsis">
          {userName}
        </span>
      )}
    </div>
    <div className="relative flex-1 overflow-hidden">
      <ul className="h-full overflow-y-auto overflow-x-hidden px-2 py-6 list-none m-0 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id} className="flex">
            <button
              type="button"
              onClick={item.onClick}
              aria-current={item.active ? "page" : undefined}
              className={cxNav(
                "flex items-center gap-2 w-full h-8 px-2 rounded-[5px] bg-transparent text-white text-left cursor-pointer border-0",
                "transition-[padding,background-color] duration-150",
                "hover:bg-[var(--ps-prim-blue-600)]",
                item.active && "bg-[var(--ps-prim-blue-500)]",
                collapsed && "px-[16.5px]",
              )}
            >
              <span className="w-[18px] h-[18px] flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="mt-[3px] whitespace-nowrap overflow-hidden">{item.label}</span>}
              {!collapsed && item.hasChevron && (
                <span className="ml-auto w-3.5 h-3.5 flex-shrink-0 opacity-70 overflow-hidden">
                  <span className="block w-[7px] h-[7px] mt-[3px] ml-0.5 border-r-2 border-t-2 border-white rotate-45" />
                </span>
              )}
            </button>
          </li>
        ))}
        {onLogout && (
          <>
            <li className="h-px bg-[var(--ps-prim-blue-600)] my-1 list-none" />
            <li className="flex list-none">
              <button
                type="button"
                onClick={onLogout}
                className={cxNav(
                  "flex items-center gap-2 w-full h-8 px-2 rounded-[5px] bg-transparent text-white text-left cursor-pointer border-0 hover:bg-[var(--ps-prim-blue-600)] hover:text-[var(--ps-prim-red-100)]",
                  collapsed && "px-[16.5px]",
                )}
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
                {!collapsed && <span className="mt-[3px] whitespace-nowrap overflow-hidden">Log Out</span>}
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
    {onToggleCollapse && (
      <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={onToggleCollapse}
        className={cxNav(
          "absolute bottom-[30px] z-10 flex items-center justify-center w-[30px] h-[30px] rounded-full border-0",
          "bg-[var(--ps-prim-blue-500)] text-white cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.25)]",
          "transition-[left] duration-300 hover:bg-[var(--ps-prim-blue-600)]",
        )}
        style={{ left: collapsed ? 18 : 190 }}
      >
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points={collapsed ? "9 18 15 12 9 6" : "15 18 9 12 15 6"} />
        </svg>
      </button>
    )}
  </nav>
);

// ── Window export so other Babel-loaded scripts can read these ───
declare const window: Window & {
  TopNav?: typeof TopNav;
  LeftNav?: typeof LeftNav;
};
if (typeof window !== "undefined") {
  Object.assign(window, { TopNav, LeftNav });
}

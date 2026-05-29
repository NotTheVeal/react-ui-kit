// ──────────────────────────────────────────────────────────────────
// Showcase.tsx — Renders every component with its variants/states.
// Sections: Button, Input, Card, Badge, Alert, Selections, Tabs,
//           Modal, Drawer, Table, Filter, Navigation, CMS.
// ──────────────────────────────────────────────────────────────────

declare const Button: any;
declare const ButtonInline: any;
declare const BackArrowIcon: any;
declare const Input: any;
declare const Dropdown: any;
declare const EventCard: any;
declare const StatusCard: any;
declare const AlertCard: any;
declare const AiDataCard: any;
declare const ProductCard: any;
declare const AnalyticsCard: any;
declare const ListCard: any;
declare const StatusBadge: any;
declare const ListTypeBadge: any;
declare const Alert: any;
declare const Toast: any;
declare const Checkbox: any;
declare const Radio: any;
declare const Toggle: any;
declare const FolderTabs: any;
declare const SegmentedTabs: any;
declare const PillTabs: any;
declare const Modal: any;
declare const ConfirmDialog: any;
declare const Drawer: any;
declare const Table: any;
declare const FilterChip: any;
declare const FilterShell: any;
declare const TopNav: any;
declare const LeftNav: any;
declare const Banner: any;
declare const ImageBlock: any;
declare const TextBlock: any;
declare const CardGrid: any;
declare const Breadcrumb: any;
declare const BreadcrumbBack: any;
declare const Accordion: any;
declare const AccordionCount: any;
declare const Stepper: any;
declare const Avatar: any;
declare const AvatarGroup: any;
declare const Tooltip: any;
declare const TooltipRich: any;
declare const Skeleton: any;
declare const SkeletonKeyframes: any;
declare const Spinner: any;
declare const EmptyState: any;
declare const ErrorPage: any;
declare const Pagination: any;
declare const DatePicker: any;

// ── Layout primitives ────────────────────────────────────────────
const Section: React.FC<{ id: string; title: string; desc: string; children: React.ReactNode }> = ({
  id, title, desc, children,
}) => (
  <section id={id} className="mb-12 border border-[#E6E6E6] rounded-xl overflow-hidden bg-white">
    <header className="px-6 py-[18px] border-b border-[#E6E6E6] bg-[#FAFAFA]">
      <h2 className="m-0 text-[13px] tracking-[1.5px] uppercase text-[#005BA6] font-bold">{title}</h2>
      <p className="m-0 mt-1 text-[13px] text-[#777] leading-[1.5]">{desc}</p>
    </header>
    <div className="p-6">{children}</div>
  </section>
);

const StateRow: React.FC<{ label: string; note?: string; children: React.ReactNode }> = ({
  label, note, children,
}) => (
  <div className="grid grid-cols-[140px_minmax(0,360px)_minmax(220px,1fr)] gap-8 items-center py-4 border-b border-[#F1F1F1] last:border-b-0">
    <div className="text-[10px] tracking-[1.5px] uppercase text-[#777] font-bold">{label}</div>
    <div className="flex items-center">{children}</div>
    <div className="text-[13px] text-[#777] leading-[1.5]">{note}</div>
  </div>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="m-0 mb-2 mt-6 first:mt-0 text-[12px] tracking-[1px] uppercase text-[#4A4A4A] font-semibold">
    {children}
  </h3>
);

const Sw: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`flex flex-wrap items-center gap-6 py-4 ${className}`}>{children}</div>
);

// ── Demo helpers ─────────────────────────────────────────────────
const ServiceEventIcon: React.FC = () => (
  <svg width={23} height={23} viewBox="0 0 23 23" fill="currentColor" aria-hidden="true">
    <path d="M0.420898 19.8526V8.95789C0.420898 8.35867 0.634398 7.84548 1.06141 7.41848C1.48781 6.99209 2.00057 6.77887 2.59979 6.77887H5.86816V4.6C5.86816 4.00078 6.08167 3.48799 6.50868 3.06164C6.93506 2.63461 7.44784 2.4211 8.04705 2.4211H14.584C15.1832 2.4211 15.6964 2.63461 16.1234 3.06164C16.5498 3.48799 16.7629 4.00078 16.7629 4.6V6.77887H20.0313C20.6306 6.77887 21.1437 6.99209 21.5708 7.41848C21.9971 7.84548 22.2103 8.35867 22.2103 8.95789V19.8526H0.420898ZM2.59979 17.6737H20.0313V14.4053H17.8524V15.4947H15.6735V14.4053H6.95769V15.4947H4.77876V14.4053H2.59979V17.6737ZM2.59979 8.95789V12.2263H4.77876V11.1368H6.95769V12.2263H15.6735V11.1368H17.8524V12.2263H20.0313V8.95789H2.59979ZM8.04705 6.77887H14.584V4.6H8.04705V6.77887Z" />
  </svg>
);

const PinIcon: React.FC = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8 2 5 5 5 9c0 7 7 13 7 13s7-6 7-13c0-4-3-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

// ── Sidebar ──────────────────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { id: "buttons", label: "Button" },
  { id: "inputs", label: "Input" },
  { id: "cards", label: "Card" },
  { id: "badges", label: "Badge" },
  { id: "alerts", label: "Alert · Toast" },
  { id: "selections", label: "Selections" },
  { id: "tabs", label: "Tabs" },
  { id: "modal", label: "Modal" },
  { id: "drawer", label: "Drawer" },
  { id: "table", label: "Table" },
  { id: "filter", label: "Filter" },
  { id: "navigation", label: "Navigation" },
  { id: "cms", label: "CMS Blocks" },
  { id: "breadcrumb", label: "Breadcrumb" },
  { id: "pagination", label: "Pagination" },
  { id: "accordion", label: "Accordion" },
  { id: "tooltip", label: "Tooltip" },
  { id: "stepper", label: "Stepper" },
  { id: "avatar", label: "Avatar" },
  { id: "datepicker", label: "Date Picker" },
  { id: "skeleton", label: "Skeleton" },
  { id: "empty", label: "Empty / Error" },
];

const Sidebar: React.FC<{ active: string; onClick: (id: string) => void }> = ({ active, onClick }) => (
  <aside className="sticky top-8 self-start w-[200px] flex-shrink-0 hidden lg:block">
    <div className="text-[11px] tracking-[1.8px] uppercase text-[#777] font-bold mb-3">Components</div>
    <nav className="flex flex-col gap-0.5">
      {SIDEBAR_ITEMS.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          onClick={(e) => { e.preventDefault(); onClick(it.id); }}
          className={
            "px-3 py-2 rounded text-[14px] no-underline transition-colors " +
            (active === it.id
              ? "bg-[#EFF9FE] text-[#005BA6] font-semibold"
              : "text-[#4A4A4A] hover:bg-[#F5F5F5]")
          }
        >
          {it.label}
        </a>
      ))}
    </nav>
  </aside>
);

// ══════════════════════ SECTION COMPONENTS ══════════════════════

const ButtonSection: React.FC = () => (
  <Section id="buttons" title="Button" desc="All button variants and interaction states.">
    <SubHeading>Primary · Large (50px)</SubHeading>
    <StateRow label="Default" note="White fill with PS Blue border and text."><Button>Buy Now</Button></StateRow>
    <StateRow label="Hover" note="Fill shifts to #005BA6, border to #009CF4."><Button state="hover">Buy Now</Button></StateRow>
    <StateRow label="Pressed" note="Midnight fill #004A84 with a 4px drop shadow."><Button state="pressed">Buy Now</Button></StateRow>
    <StateRow label="Focus" note="Default state plus a 3px Blue-Gray focus ring."><Button state="focus">Buy Now</Button></StateRow>
    <StateRow label="Disabled" note="Grey 4 fill, Grey 2 border and label."><Button disabled>Buy Now</Button></StateRow>
    <StateRow label="Loading" note="Spinner replaces label; button locked while busy."><Button loading>Buy Now</Button></StateRow>

    <SubHeading>Secondary · Small (32px)</SubHeading>
    <StateRow label="Default" note="White, 1px Grey 4 border, Grey 1 label."><Button variant="secondary" size="sm">Apply Filter</Button></StateRow>
    <StateRow label="Hover" note="Fills with PS Blue."><Button variant="secondary" size="sm" state="hover">Apply Filter</Button></StateRow>
    <StateRow label="Pressed" note="Darkens to #004A84."><Button variant="secondary" size="sm" state="pressed">Apply Filter</Button></StateRow>
    <StateRow label="Disabled" note="Grey 4 fill, Grey 3 label."><Button variant="secondary" size="sm" disabled>Apply Filter</Button></StateRow>

    <SubHeading>Tertiary · Large (40px pill)</SubHeading>
    <StateRow label="Default" note="Grey 5 fill, fully-rounded pill."><Button variant="tertiary">Save for later</Button></StateRow>
    <StateRow label="Hover" note="Background deepens to Grey 4."><Button variant="tertiary" state="hover">Save for later</Button></StateRow>
    <StateRow label="Pressed" note="Darkens to #CCCCCC."><Button variant="tertiary" state="pressed">Save for later</Button></StateRow>
    <StateRow label="Disabled" note="Same grey fill, Grey 3 label."><Button variant="tertiary" disabled>Save for later</Button></StateRow>

    <SubHeading>Arrow · Back (28px)</SubHeading>
    <StateRow label="Default" note="Transparent at rest."><Button variant="arrow" aria-label="Back" iconStart={<BackArrowIcon />}>{null}</Button></StateRow>
    <StateRow label="Hover" note="Picks up a Grey 5 background."><Button variant="arrow" state="hover" aria-label="Back" iconStart={<BackArrowIcon />}>{null}</Button></StateRow>

    <SubHeading>Pill · Large (48px) — ⚠ Deprecated</SubHeading>
    <div className="bg-[#FFEAEA] border border-[#FFCDCD] rounded p-3 mb-3 flex gap-2 text-[13px] text-[#FF4242]">
      <strong>Deprecated</strong>
      <span>Orange CTAs fail WCAG AA. Use Primary for new work.</span>
    </div>
    <StateRow label="Default" note="Orange 1 fill."><Button variant="pill">Propose Quote</Button></StateRow>
    <StateRow label="Hover" note="Darkens to Orange 2."><Button variant="pill" state="hover">Propose Quote</Button></StateRow>

    <SubHeading>Inline buttons</SubHeading>
    <StateRow label="Link" note="14px Grey 2 with a 1px underline."><ButtonInline kind="link" href="#">Understand my needs</ButtonInline></StateRow>
    <StateRow label="Link (Blue)" note="16px bold PS Blue product-title style."><ButtonInline kind="link-blue" href="#">ADULT REUSABLE SPO2 SENSOR</ButtonInline></StateRow>
    <StateRow label="Tall" note="48px ghost action."><ButtonInline kind="tall" href="#">ALL CATEGORIES</ButtonInline></StateRow>
    <StateRow label="Directory" note="Drill-down row with right chevron."><ButtonInline kind="dir" href="#">Diagnostic Imaging</ButtonInline></StateRow>
  </Section>
);

const InputSection: React.FC = () => (
  <Section id="inputs" title="Input" desc="Floating-label inputs and dropdowns. 48px default, 80px large.">
    <SubHeading>Text Field · 48px (md)</SubHeading>
    <StateRow label="Idle & Empty" note="Interactive — type to see the label float."><Input label="Label" /></StateRow>
    <StateRow label="Hover" note="Border darkens to black."><Input label="Label" state="hover" /></StateRow>
    <StateRow label="Focused" note="PS Blue border with a 10px blue glow."><Input label="Label" state="focus" /></StateRow>
    <StateRow label="With value" note="Label floats up — 12px bold PS Blue."><Input label="Label" defaultValue="Input Text" state="withValue" /></StateRow>
    <StateRow label="Disabled" note=""><Input label="Label" disabled /></StateRow>
    <StateRow label="Error" note="Red border + glow with an error message."><Input label="Label" defaultValue="Wrong" error="This field is required." /></StateRow>

    <SubHeading>Large Input · 80px (lg)</SubHeading>
    <StateRow label="Idle" note=""><Input label="Label" size="lg" /></StateRow>
    <StateRow label="With value" note=""><Input label="Label" size="lg" defaultValue="Text Input" state="withValue" /></StateRow>

    <SubHeading>Dropdown</SubHeading>
    <StateRow label="Default" note="Click to expand the menu.">
      <Dropdown
        label="Choose facility"
        options={[
          { label: "Chatham Memorial Hospital", value: "chatham" },
          { label: "St. Luke's Medical Center", value: "stlukes" },
          { label: "Mercy General Hospital", value: "mercy" },
        ]}
      />
    </StateRow>
  </Section>
);

const CardSection: React.FC = () => (
  <Section id="cards" title="Card" desc="Service-event, status and alert cards. Fixed widths, flexing height.">
    <SubHeading>EventCard · 317px</SubHeading>
    <Sw>
      <EventCard
        title="Service Event"
        subtitle="Reference #: 6668550"
        icon={<ServiceEventIcon />}
        meta={[
          { label: "Service Needed", value: "PS000011" },
          { label: "Service Type", value: "Install" },
          { label: "Date Created", value: "03/11/2025" },
        ]}
      />
      <EventCard
        title="Service Event"
        subtitle="Reference #: 6668551"
        icon={<ServiceEventIcon />}
        iconBg="#FFE9D5"
        iconFg="#D27200"
        meta={[
          { label: "Service Needed", value: "PS000012" },
          { label: "Service Type", value: "Repair" },
          { label: "Date Created", value: "03/12/2025" },
        ]}
        ctaLabel="Open Event"
      />
    </Sw>

    <SubHeading>StatusCard · 220×73</SubHeading>
    <Sw>
      <StatusCard title="GE Healthcare CARESCAPE" meta="Serial 4521-89A · Operational" />
      <StatusCard title="Philips IntelliVue MX450" meta="Serial 7782-CC1 · Operational" />
      <StatusCard title="Mindray BeneVision N17" meta="Serial 1209-LK · Maintenance due" />
    </Sw>

    <SubHeading>AlertCard · 220px</SubHeading>
    <Sw>
      <AlertCard title="Calibration overdue" subtitle="Asset out of tolerance" severity="error" location="Imaging — Room 314" datetime="2 hours ago" />
      <AlertCard title="PM scheduled" subtitle="Scheduled service window" severity="warning" location="OR — Suite 2" datetime="Tomorrow · 8:00 AM" />
      <AlertCard title="Inspection passed" subtitle="All checks green" severity="success" location="Cath Lab — Room 207" datetime="Yesterday" />
    </Sw>

    <SubHeading>AiDataCard · 348px</SubHeading>
    <Sw>
      <AiDataCard
        title="BATTERY RECHARGEABLE, LITHIUM ION, 7.2V, 1.35 AH"
        manufacturer="by Welch Allyn Inc."
        meta={<>
          <div>FedEx &nbsp;·&nbsp; <span className="text-[#005BA6] font-semibold">#032523123242</span></div>
          <div>Est. Delivery: Today by 1:00 PM</div>
        </>}
        badges={[{ tone: "notShipped", label: "Not Shipped" }]}
        cost="$2,400"
      />
      <AiDataCard
        title="PUMP, INFUSION, PCA EPIDURAL, CADD SOLIS"
        manufacturer="by Smiths Medical"
        meta={<div>ICU &nbsp;·&nbsp; Tech Mike R. &nbsp;·&nbsp; Yesterday at 3:47pm</div>}
        badges={[
          { tone: "urgent", label: "Urgent" },
          { tone: "pending", label: "Waiting for approval" },
        ]}
        cost="$2,400"
      />
    </Sw>

    <SubHeading>AnalyticsCard · KPI tiles</SubHeading>
    <Sw className="items-start">
      <AnalyticsCard
        layout="wide"
        title="Parts Spend"
        icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>}
        value="$1.2M"
        label="Parts Spend"
        delta={{ value: "5.3%", direction: "up" }}
        benchmark="15% below peer benchmark"
        linkLabel="View Details"
      />
      <AnalyticsCard
        layout="square"
        title="Avg Resolution Time"
        icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M16.5 21.7H4.6a1 1 0 0 1-1-1V5.7a1 1 0 0 1 1-1H18a1 1 0 0 1 1 1V10"/><path d="M8 2h8"/><circle cx="16" cy="16" r="6"/></svg>}
        value="2.3"
        label="Days"
        sub="Average in selected period"
        showMenu
      />
      <AnalyticsCard
        layout="square"
        title="Critical Rate"
        icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>}
        value="74.2%"
        sub="Resolved in less than 2 days"
        highlight
        showMenu
      />
    </Sw>

    <SubHeading>ListCard · 294px (4 variants)</SubHeading>
    <Sw className="items-start">
      <ListCard
        variant="product"
        title="Power Adapter Kit Infusion Pumps by Baxter"
        price="$91.69"
        condition={<><b>New OEM Original</b> Outright</>}
        qty={1}
        onRemove={() => {}}
      />
      <ListCard
        title="My Favorites"
        pill={{ tone: "shopping", label: "Shopping" }}
        count="7 items"
        shareCount={0}
      />
      <ListCard variant="create" />
      <ListCard
        variant="standing"
        title="Maintenance Parts Bundle"
        meta={[
          { label: "Frequency", value: "Every 3 Months" },
          { label: "Creator", value: "Robert Chen" },
          { label: "Next Order", value: "MM/DD/YY" },
        ]}
        statusDate="MM/DD/YY"
        shareCount={0}
      />
    </Sw>

    <SubHeading>ProductCard · 500px detail view</SubHeading>
    <Sw className="items-start">
      <ProductCard
        title="PATIENT CABLE, SPO2 SPOT CHECK, RED LNC-01 SERIES, 1FT CABLE LENGTH, 20 NUMBER ORDER"
        date="CREATED 04/21/2026"
        info={[
          { label: "Facility", value: "Chatham Memorial Clinic" },
          { label: "Ref #", value: "9535566" },
          { label: "Requester", value: "PETE ZILKO" },
          { label: "Qty", value: "1" },
        ]}
        statusTitle="Quote Available"
        statusBody="Item is ready for purchase."
        primaryLabel="SEE BUYING OPTIONS (2)"
      />
      <ProductCard
        title="ITEM NAME By Original Equipment Manufacturer"
        date="CREATED MM/DD/YYYY"
        info={[
          { label: "Qty", value: "X" },
          { label: "Item #", value: "XXXXXX-XX" },
          { label: "Condition", value: "Original Outright" },
          { label: "Facility", value: "Erie Medical Hospital" },
          { label: "Requestor", value: "First Last Name" },
          { label: "Reference #", value: "XXXXXXX" },
        ]}
        statusTitle="Tracker Status"
        statusBody="Description. Lorem ipsum dolor"
        primaryLabel="PRIMARY"
        secondaryLabel="SECONDARY"
      />
    </Sw>
  </Section>
);

const BadgeSection: React.FC = () => (
  <Section id="badges" title="Badge" desc="Status tags for order/asset state and pill tags for list categories.">
    <SubHeading>StatusBadge · order &amp; asset state</SubHeading>
    <Sw>
      <StatusBadge tone="neutral">Not Shipped</StatusBadge>
      <StatusBadge tone="info">In Transit</StatusBadge>
      <StatusBadge tone="success">Delivered</StatusBadge>
      <StatusBadge tone="warning">Urgent</StatusBadge>
      <StatusBadge tone="critical">Critical</StatusBadge>
      <StatusBadge tone="success">Approved</StatusBadge>
      <StatusBadge tone="info">Pending</StatusBadge>
      <StatusBadge tone="info">3 Items</StatusBadge>
    </Sw>
    <SubHeading>ListTypeBadge · catalog categories</SubHeading>
    <Sw>
      <ListTypeBadge tone="shopping">Shopping</ListTypeBadge>
      <ListTypeBadge tone="preventative">Preventative</ListTypeBadge>
      <ListTypeBadge tone="restocking">Restocking</ListTypeBadge>
    </Sw>
  </Section>
);

const AlertSection: React.FC = () => {
  const [toasts, setToasts] = React.useState<Array<{ id: number; severity: "success" | "info" | "warning" | "fail" }>>([]);
  const fire = (severity: "success" | "info" | "warning" | "fail") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, severity }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };
  return (
    <Section id="alerts" title="Alert · Toast" desc="Inline banners and transient toasts in four severities.">
      <SubHeading>Inline alerts</SubHeading>
      <div className="flex flex-col gap-3">
        <Alert severity="success" onDismiss={() => {}}>
          Requester has been nudged for Part Order #: <strong>64434335</strong>
        </Alert>
        <Alert severity="info">Quote ready for review — <strong>3 items</strong>.</Alert>
        <Alert severity="warning">Calibration window expires in <strong>72 hours</strong>.</Alert>
        <Alert severity="fail">Part Order #: <strong>64434335</strong> has been rejected.</Alert>
      </div>
      <SubHeading>Toasts</SubHeading>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => fire("success")} className="h-9 px-3 rounded border border-[#DCDCDC] bg-white text-[13px] cursor-pointer hover:bg-[#F5F5F5]">Show success</button>
        <button onClick={() => fire("info")} className="h-9 px-3 rounded border border-[#DCDCDC] bg-white text-[13px] cursor-pointer hover:bg-[#F5F5F5]">Show info</button>
        <button onClick={() => fire("warning")} className="h-9 px-3 rounded border border-[#DCDCDC] bg-white text-[13px] cursor-pointer hover:bg-[#F5F5F5]">Show warning</button>
        <button onClick={() => fire("fail")} className="h-9 px-3 rounded border border-[#DCDCDC] bg-white text-[13px] cursor-pointer hover:bg-[#F5F5F5]">Show fail</button>
      </div>
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 max-w-[420px] z-[9999]">
        {toasts.map((t) => (
          <Toast key={t.id} severity={t.severity} onDismiss={() => setToasts((cur) => cur.filter((x) => x.id !== t.id))}>
            {t.severity === "success" && "Saved successfully."}
            {t.severity === "info" && "FYI: dataset refreshed."}
            {t.severity === "warning" && "Heads up — calibration due soon."}
            {t.severity === "fail" && "Failed to save. Please try again."}
          </Toast>
        ))}
      </div>
    </Section>
  );
};

const SelectionsSection: React.FC = () => (
  <Section id="selections" title="Selections" desc="Checkbox, Radio and Toggle. 24×24 inputs with 1.5px stroke; orange selected state.">
    <SubHeading>Checkbox</SubHeading>
    <StateRow label="Idle" note=""><Checkbox label="Include compatible parts" /></StateRow>
    <StateRow label="Hover" note="Orange 2 stroke."><Checkbox label="Include compatible parts" state="hover" /></StateRow>
    <StateRow label="Focused" note="Orange 2 stroke with blue glow."><Checkbox label="Include compatible parts" state="focus" /></StateRow>
    <StateRow label="Pressed" note=""><Checkbox label="Include compatible parts" state="pressed" /></StateRow>
    <StateRow label="Disabled" note=""><Checkbox label="Include compatible parts" disabled /></StateRow>
    <StateRow label="Selected" note=""><Checkbox label="Include compatible parts" defaultChecked /></StateRow>
    <StateRow label="Selected · Disabled" note=""><Checkbox label="Include compatible parts" defaultChecked disabled /></StateRow>

    <SubHeading>Radio</SubHeading>
    <StateRow label="Idle" note=""><Radio label="Standard shipping" /></StateRow>
    <StateRow label="Selected" note=""><Radio label="Standard shipping" defaultChecked /></StateRow>
    <StateRow label="Focused" note=""><Radio label="Standard shipping" state="focus" /></StateRow>
    <StateRow label="Disabled" note=""><Radio label="Standard shipping" disabled /></StateRow>

    <SubHeading>Toggle</SubHeading>
    <StateRow label="Off" note=""><Toggle label="Auto-approve quotes" /></StateRow>
    <StateRow label="On" note=""><Toggle label="Auto-approve quotes" defaultChecked /></StateRow>
    <StateRow label="Disabled" note=""><Toggle label="Auto-approve quotes" disabled /></StateRow>
  </Section>
);

const TabsSection: React.FC = () => (
  <Section id="tabs" title="Tabs" desc="Folder (page-level), Segmented (compact toggle), and Pill (filter-style).">
    <SubHeading>Folder tabs</SubHeading>
    <FolderTabs
      defaultActiveId="initiated"
      items={[
        { id: "initiated", label: "Initiated", count: 0 },
        { id: "quoted", label: "Quoted", count: 0 },
        { id: "open", label: "Open Service Event", count: 0 },
        { id: "done", label: "Work Completed", count: 1 },
        { id: "archived", label: "Archived", disabled: true },
      ]}
    />
    <div
      className="px-6 py-5 text-[14px] text-[#4A4A4A] bg-white"
      style={{
        borderLeft: "1px solid #E0E0E0",
        borderRight: "1px solid #E0E0E0",
        borderBottom: "1px solid #E0E0E0",
        borderRadius: "0 0 6px 6px",
      }}
    >
      Active panel content sits flush under the active tab.
    </div>

    <SubHeading>Segmented · view toggle</SubHeading>
    <SegmentedTabs
      defaultActiveId="grid"
      items={[
        { id: "grid", label: "", icon: <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6}><rect x="1.5" y="1.5" width="5" height="5" /><rect x="9.5" y="1.5" width="5" height="5" /><rect x="1.5" y="9.5" width="5" height="5" /><rect x="9.5" y="9.5" width="5" height="5" /></svg> },
        { id: "list", label: "", icon: <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M2 4h12M2 8h12M2 12h12" /></svg> },
        { id: "map", label: "", icon: <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M2 4l4-2 4 2 4-2v10l-4 2-4-2-4 2V4z" /></svg> },
      ]}
    />

    <SubHeading>Pill tabs · filter</SubHeading>
    <PillTabs
      defaultActiveId="all"
      items={[
        { id: "all", label: "All", count: 124 },
        { id: "imaging", label: "Imaging", count: 32 },
        { id: "monitoring", label: "Monitoring", count: 18 },
        { id: "ventilation", label: "Ventilation", count: 9 },
      ]}
    />
  </Section>
);

const ModalSection: React.FC = () => {
  const [mOpen, setMOpen] = React.useState(false);
  const [cOpen, setCOpen] = React.useState(false);
  return (
    <Section id="modal" title="Modal" desc="Centered overlay dialog. 5px radius, 24×32 padding, 30px light title.">
      <SubHeading>Standard modal</SubHeading>
      <Sw>
        <Button size="sm" variant="secondary" onClick={() => setMOpen(true)}>Open Modal</Button>
        <Button size="sm" variant="secondary" onClick={() => setCOpen(true)}>Open Confirm Dialog</Button>
      </Sw>
      <Modal
        open={mOpen}
        title="Nudge requester"
        onClose={() => setMOpen(false)}
        footer={
          <>
            <Button size="sm" variant="secondary" onClick={() => setMOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setMOpen(false)}>Send nudge</Button>
          </>
        }
      >
        <p className="m-0 text-[14px] leading-[1.6] text-[#4A4A4A]">Your requester will receive an email and a Slack ping asking them to review this part order.</p>
        <div className="mt-4">
          <Input label="Optional message" defaultValue="" />
        </div>
      </Modal>
      <ConfirmDialog
        open={cOpen}
        title="Delete this list?"
        message="This action can't be undone. All saved parts in this list will be removed."
        confirmLabel="Delete"
        destructive
        onConfirm={() => setCOpen(false)}
        onCancel={() => setCOpen(false)}
      />
    </Section>
  );
};

const DrawerSection: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Section id="drawer" title="Drawer" desc="Right-side overlay panel, 500px wide. Click scrim or press Esc to dismiss.">
      <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer
        open={open}
        title="Add learners"
        subtitle="Choose teammates to assign this course to."
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button size="sm" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setOpen(false)}>Add 3 learners</Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <Input label="Search by name or email" />
          <div className="flex flex-col gap-3 mt-2">
            <Checkbox label="Alex Morgan — Imaging" defaultChecked />
            <Checkbox label="Casey Tran — Biomed" defaultChecked />
            <Checkbox label="Jordan Lee — OR" defaultChecked />
            <Checkbox label="Sam Patel — ICU" />
            <Checkbox label="Riley Chen — Cath Lab" />
          </div>
        </div>
      </Drawer>
    </Section>
  );
};

const TableSection: React.FC = () => (
  <Section id="table" title="Table" desc="Pulled from preview/tables.html — the production Parts Quotes table with 38 px folder tabs, fixed column grid, and pagination footer. Embedded here so the Showcase always matches what's documented.">
    <iframe
      src="../preview/tables.html"
      title="Tables — preview"
      className="w-full h-[760px] border-0 rounded-md bg-white"
      style={{ display: "block" }}
    />
  </Section>
);

const FilterSection: React.FC = () => (
  <Section id="filter" title="Filter" desc="Pulled from preview/filter.html — the FAFAFA shell, 68 px tall bar, filter chips, and empty / many-chip / no-match patterns. Embedded so this never drifts from production.">
    <iframe
      src="../preview/filter.html"
      title="Filter — preview"
      className="w-full h-[760px] border-0 rounded-md bg-white"
      style={{ display: "block" }}
    />
  </Section>
);

const NavigationSection: React.FC = () => (
  <Section id="navigation" title="Navigation" desc="Pulled from the production navigation pages — TopNav (utility row, search, facility selector, PRO Account hero) and LeftNav (210 px expanded / 67 px collapsed dark-blue rail). Embedded so the Showcase always matches the documented spec.">
    <SubHeading>TopNav</SubHeading>
    <iframe
      src="../preview/top-navigation.html"
      title="TopNav — preview"
      className="w-full h-[680px] border-0 rounded-md bg-white"
      style={{ display: "block" }}
    />

    <SubHeading>LeftNav</SubHeading>
    <iframe
      src="../preview/left-hand-navigation.html"
      title="LeftNav — preview"
      className="w-full h-[720px] border-0 rounded-md bg-white"
      style={{ display: "block" }}
    />
  </Section>
);

const CmsSection: React.FC = () => (
  <Section id="cms" title="CMS Blocks" desc="Bloomreach content blocks: Banner, ImageBlock, TextBlock, CardGrid.">
    <SubHeading>Banner</SubHeading>
    <Banner
      title="Mission-critical uptime, on-demand"
      body="Access real-time inventory, transparent pricing, and a guaranteed 4-hour response on every order."
      ctaLabel="Request a Quote"
      onCta={() => {}}
    />

    <SubHeading>ImageBlock — image right</SubHeading>
    <ImageBlock
      title="Connect equipment to outcomes"
      body="Track asset-level performance across your network and identify the most common service drivers in any quarter."
      ctaLabel="Learn more"
    />

    <SubHeading>TextBlock</SubHeading>
    <TextBlock title="How we measure impact">
      <p>PartsSource Pro combines a managed-services delivery model with the largest equipment-uptime dataset in the country. We surface preventable downtime before it becomes a clinical risk and translate every service event into a measurable cost-avoidance line.</p>
    </TextBlock>

    <SubHeading>CardGrid · 3 columns</SubHeading>
    <CardGrid
      columns={3}
      gap="md"
      cards={[
        { title: "Vendor Management", text: "Single procurement workflow across 5,000+ vendors." },
        { title: "Compliance Tracking", text: "Audit-ready logs for every PM, repair and inspection." },
        { title: "Technical Specs", text: "Complete service manuals and OEM documentation." },
      ]}
    />
  </Section>
);

// ── Extras (Layout / Feedback / Controls) sections ───────────────

const BreadcrumbSection: React.FC = () => (
  <Section id="breadcrumb" title="Breadcrumb" desc="Trail-style and back-style. Source Sans Pro 14, PS Blue parents, Grey 3 current.">
    <SubHeading>Back-style — single parent return</SubHeading>
    <Sw><BreadcrumbBack label="Back to My Dashboard" /></Sw>
    <SubHeading>Trail-style</SubHeading>
    <Sw>
      <Breadcrumb items={[{ label: "My Dashboard", href: "#" }, { label: "Asset Details" }]} />
    </Sw>
    <Sw>
      <Breadcrumb items={[
        { label: "Pro", href: "#" },
        { label: "Asset Uptime", href: "#" },
        { label: "Imaging — Room 314" },
      ]} />
    </Sw>
  </Section>
);

const PaginationSection: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  return (
    <Section id="pagination" title="Pagination" desc="Result count, page controls, page-size picker. 32 × 32 buttons, PS Blue active.">
      <SubHeading>Default</SubHeading>
      <Pagination
        page={page}
        totalPages={24}
        total={234}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      <SubHeading>Compact (no result count)</SubHeading>
      <Pagination page={1} totalPages={3} onPageChange={() => {}} compact />
    </Section>
  );
};

const AccordionSection: React.FC = () => (
  <Section id="accordion" title="Accordion" desc="4 px radius card, 2 px #F1F1F1 border, 25 px light title, chevron rotates on open.">
    <Accordion title="Accordion Header Collapsed" />
    <div style={{ marginTop: 16 }}>
      <Accordion title="Accordion Header Expanded" defaultOpen>
        <p>The expanded panel sits below a 1 px divider. Use this for scan-then-drill content like dashboards and service-event lists.</p>
      </Accordion>
    </div>
    <SubHeading>Group with counts</SubHeading>
    <div className="flex flex-col gap-4">
      <Accordion title="In-progress activity" meta={<AccordionCount>3</AccordionCount>} />
      <Accordion
        title="Critical events"
        subtitle="Requires immediate attention"
        meta={<AccordionCount tone="critical">2 critical</AccordionCount>}
      />
      <Accordion title="Your assets" meta={<AccordionCount>42</AccordionCount>} />
    </div>
  </Section>
);

const TooltipSection: React.FC = () => (
  <Section id="tooltip" title="Tooltip" desc="Soft dark bubble (#3A3A3A) with caret. Hover or focus to show. Plus a rich variant with title + CTA.">
    <SubHeading>Placements</SubHeading>
    <div className="flex flex-wrap gap-12 py-12">
      {["top", "bottom", "left", "right"].map((p) => (
        <Tooltip key={p} label={`Placement: ${p}`} placement={p as any}>
          <button className="h-9 px-3.5 rounded border border-[#DCDCDC] bg-white text-[13px] font-semibold cursor-pointer hover:border-[#005BA6] hover:text-[#005BA6]">
            {p}
          </button>
        </Tooltip>
      ))}
    </div>
    <SubHeading>Rich tooltip</SubHeading>
    <div className="bg-[#1F1F1F] p-8 rounded-md inline-flex">
      <TooltipRich
        title="Detailed Context"
        body="Rich tooltips can provide much more data without cluttering the UI. Click ‘Learn More’ to see details."
        cta={{ label: "Learn More" }}
      />
    </div>
  </Section>
);

const StepperSection: React.FC = () => (
  <Section id="stepper" title="Stepper" desc="Multi-step progress. 32 × 32 circles, 2 px PS Blue connector when complete.">
    <SubHeading>Horizontal</SubHeading>
    <Stepper
      steps={[
        { label: "Part selection", status: "complete" },
        { label: "Vendor & shipping", status: "complete" },
        { label: "Review", status: "current" },
        { label: "Submit", status: "pending" },
      ]}
    />
    <SubHeading>Vertical</SubHeading>
    <Stepper
      orientation="vertical"
      steps={[
        { label: "Verify account", sub: "Email confirmed · 03/12/25", status: "complete" },
        { label: "Add facility", sub: "Tell us where the equipment lives.", status: "current" },
        { label: "Invite teammates", sub: "Optional · skip for now" },
        { label: "First order", sub: "Place your first part order." },
      ]}
    />
    <SubHeading>Compact · dots only</SubHeading>
    <div style={{ maxWidth: 260 }}>
      <Stepper
        compact
        steps={[
          { status: "complete" },
          { status: "complete" },
          { status: "current" },
          { status: "pending" },
          { status: "pending" },
        ]}
      />
    </div>
  </Section>
);

const AvatarSection: React.FC = () => (
  <Section id="avatar" title="Avatar" desc="Circular identity marker. Initials, image, or brand mark. 5 sizes, status dot, group stacking.">
    <SubHeading>Sizes</SubHeading>
    <Sw>
      <Avatar size="xs" name="Earl Grey" />
      <Avatar size="sm" name="Earl Grey" />
      <Avatar size="md" name="Earl Grey" />
      <Avatar size="lg" name="Earl Grey" />
      <Avatar size="xl" name="Earl Grey" />
    </Sw>
    <SubHeading>Tones</SubHeading>
    <Sw>
      <Avatar size="lg" name="Earl Grey" tone="blue" />
      <Avatar size="lg" name="Casey Tran" tone="green" />
      <Avatar size="lg" name="Jordan Lee" tone="orange" />
      <Avatar size="lg" name="Sam Patel" tone="purple" />
      <Avatar size="lg" name="Mae Kim" tone="red" />
      <Avatar size="lg" name="Riley Chen" tone="neutral" />
      <Avatar size="lg" initials="PS" tone="brand" />
      <Avatar size="lg" initials="PS" tone="inverse" />
    </Sw>
    <SubHeading>Status</SubHeading>
    <Sw>
      <Avatar name="Earl Grey" tone="blue" status="online" />
      <Avatar name="Casey Tran" tone="green" status="busy" />
      <Avatar name="Jordan Lee" tone="orange" status="away" />
      <Avatar name="Riley Chen" tone="neutral" status="offline" />
    </Sw>
    <SubHeading>Group</SubHeading>
    <Sw>
      <AvatarGroup overflow={5}>
        <Avatar name="Earl Grey" tone="blue" />
        <Avatar name="Casey Tran" tone="green" />
        <Avatar name="Jordan Lee" tone="orange" />
        <Avatar name="Sam Patel" tone="purple" />
      </AvatarGroup>
    </Sw>
  </Section>
);

const DatePickerSection: React.FC = () => (
  <Section id="datepicker" title="Date Picker" desc="Range field with orange calendar trigger and single-month popover. 230 × 48 fields.">
    <DatePicker title="Preferred Window" />
  </Section>
);

const SkeletonSection: React.FC = () => (
  <Section id="skeleton" title="Skeleton · Spinner" desc="Shimmering placeholder primitives + a centered spinner. Both honor prefers-reduced-motion.">
    <SkeletonKeyframes />
    <SubHeading>Primitives</SubHeading>
    <div className="grid grid-cols-2 gap-6 max-w-[640px]">
      <div><Skeleton shape="text" /><div className="text-[11px] text-[#777] mt-2 font-mono">text</div></div>
      <div><Skeleton shape="title" /><div className="text-[11px] text-[#777] mt-2 font-mono">title</div></div>
      <div><Skeleton shape="button" /><div className="text-[11px] text-[#777] mt-2 font-mono">button</div></div>
      <div><Skeleton shape="input" /><div className="text-[11px] text-[#777] mt-2 font-mono">input</div></div>
      <div><Skeleton shape="circle" width={48} height={48} /><div className="text-[11px] text-[#777] mt-2 font-mono">circle</div></div>
      <div><Skeleton shape="block" /><div className="text-[11px] text-[#777] mt-2 font-mono">block</div></div>
    </div>
    <SubHeading>Spinner</SubHeading>
    <Sw>
      <Spinner />
      <Spinner size={40} />
    </Sw>
  </Section>
);

const EmptySection: React.FC = () => (
  <Section id="empty" title="Empty / Error states" desc="Title → body → CTA. Empty for first-run and no-results. ErrorPage for 404/500/403/offline.">
    <SubHeading>EmptyState — First-run</SubHeading>
    <EmptyState
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h6M9 9h2" />
        </svg>
      }
      title="No quotes yet"
      body="When you request a quote from a vendor, it'll show up here. Compare line items, add notes, convert any quote into an order."
      primaryAction={{ label: "Request a quote" }}
      secondaryAction={{ label: "Learn how" }}
    />
    <SubHeading>EmptyState — No results</SubHeading>
    <EmptyState
      tone="neutral"
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" />
        </svg>
      }
      title='No parts match "DS-100A"'
      body="Try removing a filter, checking the spelling, or searching by manufacturer or item number."
      primaryAction={{ label: "Clear filters" }}
      secondaryAction={{ label: "Search all categories" }}
    />
    <SubHeading>ErrorPage — 404</SubHeading>
    <ErrorPage
      code="404"
      title="We couldn't find that page"
      body="It may have moved or been deleted. Try going back to your dashboard, or search for the part or order you were looking for."
      primaryAction={{ label: "Go to Dashboard" }}
      secondaryAction={{ label: "Search Parts" }}
    />
    <SubHeading>ErrorPage — 500</SubHeading>
    <ErrorPage
      icon={
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4M12 17h.01" />
        </svg>
      }
      title="Something broke on our end"
      body="Your data is safe. Our team has been notified. Try refreshing in a few seconds, or contact support if it keeps happening."
      primaryAction={{ label: "Try Again" }}
      secondaryAction={{ label: "Contact Support" }}
    />
  </Section>
);

// ══════════════════════ APP ══════════════════════

const App: React.FC = () => {
  const [active, setActive] = React.useState("buttons");
  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    const onScroll = () => {
      const offsets = SIDEBAR_ITEMS.map((it) => {
        const el = document.getElementById(it.id);
        return el ? { id: it.id, top: el.getBoundingClientRect().top } : null;
      }).filter(Boolean) as Array<{ id: string; top: number }>;
      const current = offsets.reduce((acc, cur) => (cur.top < 120 ? cur : acc), offsets[0]);
      if (current && current.id !== active) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10 font-['Source_Sans_Pro',sans-serif]">
      <nav className="flex items-center gap-2.5 mb-6 text-[14px] text-[#777]">
        <a href="../preview/index.html" className="inline-flex items-center gap-1.5 text-[#005BA6] font-semibold no-underline px-2.5 py-1.5 rounded hover:bg-[#EFF9FE] hover:text-[#004A84] transition-colors">
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
          </svg>
          Design System
        </a>
        <span className="text-[#CCC] font-light">/</span>
        <span className="text-[#2B2B2B] font-semibold">Components (React + TS)</span>
      </nav>

      <header className="mb-10">
        <h1 className="m-0 mb-2 text-[32px] font-light text-[#002F48] tracking-[-0.01em]">Components</h1>
        <p className="m-0 max-w-[760px] text-[16px] text-[#4A4A4A] leading-[1.6]">
          Production-ready React + TypeScript + Tailwind components, rebuilt from the Figma design system.
          Force any state via the <code className="font-mono text-[12px] bg-[#F1F1F1] px-1.5 py-0.5 rounded text-[#2B2B2B]">state</code> prop for screenshots.
        </p>
      </header>

      <div className="flex gap-10">
        <Sidebar active={active} onClick={scrollTo} />
        <div className="flex-1 min-w-0">
          <ButtonSection />
          <InputSection />
          <CardSection />
          <BadgeSection />
          <AlertSection />
          <SelectionsSection />
          <TabsSection />
          <ModalSection />
          <DrawerSection />
          <TableSection />
          <FilterSection />
          <NavigationSection />
          <CmsSection />
          <BreadcrumbSection />
          <PaginationSection />
          <AccordionSection />
          <TooltipSection />
          <StepperSection />
          <AvatarSection />
          <DatePickerSection />
          <SkeletonSection />
          <EmptySection />
          <footer className="text-[12px] text-[#949494] text-center mt-12">
            PartsSource UI Kit · 22 component families · React + TypeScript + Tailwind
          </footer>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

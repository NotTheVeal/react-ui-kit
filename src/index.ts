// ──────────────────────────────────────────────────────────────────
// PartsSource React UI Kit — barrel export
// Re-exports every component so consumers can do:
//   import { Button, Card, Modal } from '@partssource/react-kit';
// ──────────────────────────────────────────────────────────────────

export { Button, ButtonInline, InlineButton, BackArrowIcon } from './Button';
export type { ButtonProps, ButtonInlineProps } from './Button';
export { IconButton } from './IconButton';
export type { IconButtonProps } from './IconButton';
export { ChipButton } from './ChipButton';
export type { ChipButtonProps } from './ChipButton';
export { SegmentedButton } from './SegmentedButton';
export type { SegmentedButtonProps, SegmentedOption } from './SegmentedButton';
export { Input, Dropdown } from './Input';
export { InlineSearch, HiddenSearch } from './Search';
export type { InlineSearchProps, HiddenSearchProps } from './Search';
export { ProgressBar } from './ProgressBar';
export type { ProgressBarProps } from './ProgressBar';
export { QuantityStepper } from './QuantityStepper';
export type { QuantityStepperProps } from './QuantityStepper';
export { ExchangeDetailCard } from './ExchangeDetailCard';
export type { ExchangeDetailCardProps, ExchangeItemRow } from './ExchangeDetailCard';
export { AiDetailCard } from './AiDetailCard';
export type { AiDetailCardProps, AiDetailProduct } from './AiDetailCard';
export { ReturnEligibilityCard } from './ReturnEligibilityCard';
export type { ReturnEligibilityCardProps, EligibilityTone } from './ReturnEligibilityCard';
export { EventCard, StatusCard, AlertCard } from './Card';
export { AiDataCard, ProductCard, AnalyticsCard, ListCard } from './CardExtras';
export { StatusBadge, ListTypeBadge } from './Badge';
export { Alert, Toast } from './Alert';
export { Checkbox, Radio, Toggle } from './Selections';
export { FolderTabs, SegmentedTabs, PillTabs } from './Tabs';
export { Modal, ConfirmDialog } from './Modal';
export { Drawer } from './Drawer';
export { Filter, FilterChip, SaveFilterSetButton, SavedFilterCard, SaveFilterModal } from './Filter';
export type { FilterProps, FilterChipProps, FilterFacet, FilterFacetType, AppliedFilter, SaveFilterSetButtonProps, SavedFilterCardProps, SaveFilterModalProps } from './Filter';
export { TopNav, LeftNav } from './Navigation';
export { Banner, ImageBlock, TextBlock, CardGrid } from './CMS';
export { Breadcrumb, BreadcrumbBack, Accordion, AccordionCount, Stepper } from './Layout';
export { Avatar, AvatarGroup, Tooltip, TooltipRich, Skeleton, SkeletonKeyframes, Spinner, EmptyState, ErrorPage } from './Feedback';
export { Pagination, DatePicker } from './Controls';
export { Divider } from './Divider';
export { Table } from './Table';
export { Slider } from './Slider';
export { Carousel } from './Carousel';
export { FileUpload } from './FileUpload';
export { Popover } from './Popover';
export { PageShell } from './PageShell';
export { CardBrandIcon } from './CardBrandIcon';
export type { CardBrandIconProps, CardBrand } from './CardBrandIcon';
export { SavedPaymentMethodCard } from './SavedPaymentMethodCard';
export type { SavedPaymentMethodCardProps } from './SavedPaymentMethodCard';
export { AddPaymentMethodForm } from './AddPaymentMethodForm';
export type { AddPaymentMethodFormProps } from './AddPaymentMethodForm';
export { ModuleCard } from './ModuleCard';
export type { ModuleCardProps, ModuleStatus } from './ModuleCard';
export { ModuleDetailDrawer } from './ModuleDetailDrawer';
export type { ModuleDetailDrawerProps, ModuleDetailState, CurriculumLesson } from './ModuleDetailDrawer';
export { AssetUptimeSummaryCard } from './AssetUptimeSummaryCard';
export type { AssetUptimeSummaryCardProps, UptimeSegment, UptimeLegendItem } from './AssetUptimeSummaryCard';
export { WorkOrderCard } from './WorkOrderCard';
export type { WorkOrderCardProps, WorkOrderPriority, WorkOrderMeta } from './WorkOrderCard';
export { NotificationCard } from './NotificationCard';
export type { NotificationCardProps, NotificationTone } from './NotificationCard';
export { NewsFeedItem } from './NewsFeedItem';
export type { NewsFeedItemProps } from './NewsFeedItem';
export {
  SERIES_COLORS,
  SERIES_SEMANTIC,
  Legend,
  BarChart,
  LineChart,
  AreaChart,
  PieChart,
  DonutChart,
  RadarChart,
  FunnelChart,
  WaffleChart,
  Sparkline,
  BulletChart,
  BULLET_RANGE_COLORS,
  ScatterPlot,
  BubbleChart,
  HeatMap,
  TreeMap,
  BumpChart,
  StreamChart,
  BoxPlot,
  HEATMAP_SCALE,
} from './DataViz';
export type {
  ScatterPoint,
  ScatterSeries,
  ScatterPlotProps,
  BubblePoint,
  BubbleSeries,
  BubbleChartProps,
  HeatMapProps,
  TreeMapNode,
  TreeMapProps,
  BumpSeries,
  BumpChartProps,
  StreamSeries,
  StreamChartProps,
  BoxPlotDatum,
  BoxPlotProps,
} from './DataViz';
export {
  TypingIndicator,
  IntelligenceSources,
  IntelligenceMessage,
  SuggestedPrompts,
  IntelligencePromptBar,
  IntelligencePanel,
} from './Intelligence';
export type {
  IntelligenceSource,
  IntelligenceSourcesProps,
  IntelligenceMessageProps,
  SuggestedPromptsProps,
  IntelligencePromptBarProps,
  IntelligencePanelProps,
} from './Intelligence';

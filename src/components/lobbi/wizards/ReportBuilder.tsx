/**
 * ReportBuilder - Advanced report and data visualization wizard
 *
 * Features:
 * - Multiple data source connections
 * - Chart type selection with live preview
 * - Dynamic filters and grouping
 * - Custom metrics and calculations
 * - Export to PDF/Excel/CSV
 * - Scheduling and automation
 */

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  LineChart,
  PieChart,
  Table2,
  Database,
  Filter,
  Calendar,
  Download,
  FileSpreadsheet,
  FileText,
  Share2,
  Clock,
  Plus,
  Trash2,
  GripVertical,
  Check,
  Eye,
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  LobbiWizard,
  WizardStepContent,
  WizardCard,
  useWizard,
  type WizardStep,
} from './LobbiWizard';
import { LobbiButton } from '../core/LobbiButton';
import { LobbiInput } from '../core/LobbiInput';

// =============================================================================
// TYPES
// =============================================================================

type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'table';
type AggregationType = 'sum' | 'avg' | 'count' | 'min' | 'max';
type DateRange = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

interface DataSource {
  id: string;
  name: string;
  type: 'members' | 'events' | 'payments' | 'engagement' | 'custom';
  icon: React.ReactNode;
  description: string;
  fields: DataField[];
}

interface DataField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  aggregatable?: boolean;
}

interface ReportMetric {
  id: string;
  fieldId: string;
  aggregation: AggregationType;
  label?: string;
}

interface ReportFilter {
  id: string;
  fieldId: string;
  operator: 'equals' | 'contains' | 'gt' | 'lt' | 'between' | 'in';
  value: unknown;
}

interface ReportConfig {
  id: string;
  name: string;
  description: string;
  dataSourceId: string;
  chartType: ChartType;
  metrics: ReportMetric[];
  groupBy: string[];
  filters: ReportFilter[];
  dateRange: DateRange;
  customDateRange?: { start: string; end: string };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const DATA_SOURCES: DataSource[] = [
  {
    id: 'members',
    name: 'Members',
    type: 'members',
    icon: <Users className="w-5 h-5" />,
    description: 'Member data and demographics',
    fields: [
      { id: 'member_id', name: 'Member ID', type: 'string' },
      { id: 'name', name: 'Name', type: 'string' },
      { id: 'email', name: 'Email', type: 'string' },
      { id: 'membership_type', name: 'Membership Type', type: 'string' },
      { id: 'join_date', name: 'Join Date', type: 'date' },
      { id: 'status', name: 'Status', type: 'string' },
      { id: 'age', name: 'Age', type: 'number', aggregatable: true },
      { id: 'lifetime_value', name: 'Lifetime Value', type: 'number', aggregatable: true },
    ],
  },
  {
    id: 'events',
    name: 'Events',
    type: 'events',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Event attendance and registration',
    fields: [
      { id: 'event_id', name: 'Event ID', type: 'string' },
      { id: 'event_name', name: 'Event Name', type: 'string' },
      { id: 'event_type', name: 'Event Type', type: 'string' },
      { id: 'date', name: 'Date', type: 'date' },
      { id: 'registrations', name: 'Registrations', type: 'number', aggregatable: true },
      { id: 'attendance', name: 'Attendance', type: 'number', aggregatable: true },
      { id: 'capacity', name: 'Capacity', type: 'number', aggregatable: true },
      { id: 'revenue', name: 'Revenue', type: 'number', aggregatable: true },
    ],
  },
  {
    id: 'payments',
    name: 'Payments',
    type: 'payments',
    icon: <DollarSign className="w-5 h-5" />,
    description: 'Financial transactions',
    fields: [
      { id: 'payment_id', name: 'Payment ID', type: 'string' },
      { id: 'member_id', name: 'Member ID', type: 'string' },
      { id: 'amount', name: 'Amount', type: 'number', aggregatable: true },
      { id: 'type', name: 'Type', type: 'string' },
      { id: 'status', name: 'Status', type: 'string' },
      { id: 'date', name: 'Date', type: 'date' },
      { id: 'method', name: 'Payment Method', type: 'string' },
    ],
  },
  {
    id: 'engagement',
    name: 'Engagement',
    type: 'engagement',
    icon: <Activity className="w-5 h-5" />,
    description: 'Member activity and engagement',
    fields: [
      { id: 'member_id', name: 'Member ID', type: 'string' },
      { id: 'logins', name: 'Login Count', type: 'number', aggregatable: true },
      { id: 'events_attended', name: 'Events Attended', type: 'number', aggregatable: true },
      { id: 'emails_opened', name: 'Emails Opened', type: 'number', aggregatable: true },
      { id: 'last_activity', name: 'Last Activity', type: 'date' },
      { id: 'engagement_score', name: 'Engagement Score', type: 'number', aggregatable: true },
    ],
  },
];

const CHART_TYPES = [
  {
    type: 'bar' as ChartType,
    label: 'Bar Chart',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Compare values across categories',
  },
  {
    type: 'line' as ChartType,
    label: 'Line Chart',
    icon: <LineChart className="w-5 h-5" />,
    description: 'Show trends over time',
  },
  {
    type: 'pie' as ChartType,
    label: 'Pie Chart',
    icon: <PieChart className="w-5 h-5" />,
    description: 'Show proportions of a whole',
  },
  {
    type: 'area' as ChartType,
    label: 'Area Chart',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Visualize cumulative totals',
  },
  {
    type: 'table' as ChartType,
    label: 'Data Table',
    icon: <Table2 className="w-5 h-5" />,
    description: 'Detailed tabular view',
  },
];

const AGGREGATION_TYPES: { value: AggregationType; label: string }[] = [
  { value: 'sum', label: 'Sum' },
  { value: 'avg', label: 'Average' },
  { value: 'count', label: 'Count' },
  { value: 'min', label: 'Minimum' },
  { value: 'max', label: 'Maximum' },
];

const DATE_RANGES: { value: DateRange; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'source',
    title: 'Data Source',
    description: 'Select your data',
    icon: <Database className="w-5 h-5" />,
  },
  {
    id: 'metrics',
    title: 'Metrics',
    description: 'Configure measures',
    icon: <Target className="w-5 h-5" />,
  },
  {
    id: 'visualization',
    title: 'Visualization',
    description: 'Choose chart type',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: 'preview',
    title: 'Preview & Export',
    description: 'Review and download',
    icon: <Eye className="w-5 h-5" />,
  },
];

const SAMPLE_DATA = [
  { name: 'Jan', members: 120, revenue: 4500, events: 8 },
  { name: 'Feb', members: 145, revenue: 5200, events: 12 },
  { name: 'Mar', members: 162, revenue: 6100, events: 10 },
  { name: 'Apr', members: 178, revenue: 5800, events: 15 },
  { name: 'May', members: 195, revenue: 7200, events: 11 },
  { name: 'Jun', members: 220, revenue: 8500, events: 14 },
];

const CHART_COLORS = ['#D4AF37', '#B8860B', '#CFB53B', '#DAA520', '#F4C430', '#FFD700'];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export interface ReportBuilderProps {
  onSave?: (config: ReportConfig) => void;
  onExport?: (config: ReportConfig, format: 'pdf' | 'excel' | 'csv') => void;
  className?: string;
}

export function ReportBuilder({
  onSave,
  onExport,
  className,
}: ReportBuilderProps) {
  const [config, setConfig] = useState<ReportConfig>({
    id: crypto.randomUUID(),
    name: 'Untitled Report',
    description: '',
    dataSourceId: '',
    chartType: 'bar',
    metrics: [],
    groupBy: [],
    filters: [],
    dateRange: 'month',
  });

  const handleComplete = useCallback(async () => {
    onSave?.(config);
  }, [config, onSave]);

  return (
    <div className={cn('h-[800px] bg-gray-50 rounded-xl overflow-hidden', className)}>
      <LobbiWizard
        steps={WIZARD_STEPS}
        onComplete={handleComplete}
        allowStepClick
      >
        <ReportBuilderContent
          config={config}
          setConfig={setConfig}
          onExport={onExport}
        />
      </LobbiWizard>
    </div>
  );
}

// =============================================================================
// BUILDER CONTENT
// =============================================================================

interface ReportBuilderContentProps {
  config: ReportConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReportConfig>>;
  onExport?: (config: ReportConfig, format: 'pdf' | 'excel' | 'csv') => void;
}

function ReportBuilderContent({
  config,
  setConfig,
  onExport,
}: ReportBuilderContentProps) {
  return (
    <>
      <WizardStepContent stepId="source">
        <DataSourceStep config={config} setConfig={setConfig} />
      </WizardStepContent>

      <WizardStepContent stepId="metrics">
        <MetricsStep config={config} setConfig={setConfig} />
      </WizardStepContent>

      <WizardStepContent stepId="visualization">
        <VisualizationStep config={config} setConfig={setConfig} />
      </WizardStepContent>

      <WizardStepContent stepId="preview">
        <PreviewStep config={config} setConfig={setConfig} onExport={onExport} />
      </WizardStepContent>
    </>
  );
}

// =============================================================================
// STEP 1: DATA SOURCE
// =============================================================================

function DataSourceStep({
  config,
  setConfig,
}: {
  config: ReportConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReportConfig>>;
}) {
  const { setCanGoNext } = useWizard();

  const handleSelectSource = (sourceId: string) => {
    setConfig((prev) => ({
      ...prev,
      dataSourceId: sourceId,
      metrics: [],
      groupBy: [],
      filters: [],
    }));
    setCanGoNext(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Report Details */}
      <WizardCard title="Report Details">
        <div className="grid gap-4 md:grid-cols-2">
          <LobbiInput
            label="Report Name"
            value={config.name}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="e.g., Monthly Member Report"
          />
          <LobbiInput
            label="Description"
            value={config.description}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Brief description..."
          />
        </div>
      </WizardCard>

      {/* Data Source Selection */}
      <WizardCard
        title="Select Data Source"
        description="Choose the primary data source for your report"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DATA_SOURCES.map((source) => (
            <motion.button
              key={source.id}
              onClick={() => handleSelectSource(source.id)}
              className={cn(
                'relative p-4 rounded-xl border-2 transition-all text-left',
                config.dataSourceId === source.id
                  ? 'border-gold-500 bg-gold-50'
                  : 'border-gray-200 hover:border-gold-300 bg-white'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center mb-3',
                  config.dataSourceId === source.id
                    ? 'bg-gold-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                {source.icon}
              </div>
              <p className="font-medium text-gray-900">{source.name}</p>
              <p className="text-xs text-gray-500 mt-1">{source.description}</p>
              {config.dataSourceId === source.id && (
                <div className="absolute top-3 right-3">
                  <Check className="w-5 h-5 text-gold-500" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </WizardCard>

      {/* Date Range */}
      <WizardCard title="Date Range">
        <div className="flex flex-wrap gap-2">
          {DATE_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() =>
                setConfig((prev) => ({ ...prev, dateRange: range.value }))
              }
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                config.dateRange === range.value
                  ? 'bg-gold-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gold-300'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
        {config.dateRange === 'custom' && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <LobbiInput
              label="Start Date"
              type="date"
              value={config.customDateRange?.start || ''}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  customDateRange: {
                    ...prev.customDateRange,
                    start: e.target.value,
                    end: prev.customDateRange?.end || '',
                  },
                }))
              }
            />
            <LobbiInput
              label="End Date"
              type="date"
              value={config.customDateRange?.end || ''}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  customDateRange: {
                    ...prev.customDateRange,
                    start: prev.customDateRange?.start || '',
                    end: e.target.value,
                  },
                }))
              }
            />
          </div>
        )}
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 2: METRICS
// =============================================================================

function MetricsStep({
  config,
  setConfig,
}: {
  config: ReportConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReportConfig>>;
}) {
  const dataSource = DATA_SOURCES.find((s) => s.id === config.dataSourceId);
  const aggregatableFields = dataSource?.fields.filter((f) => f.aggregatable) || [];
  const dimensionFields = dataSource?.fields.filter((f) => f.type === 'string') || [];

  const addMetric = () => {
    if (aggregatableFields.length === 0) return;
    setConfig((prev) => ({
      ...prev,
      metrics: [
        ...prev.metrics,
        {
          id: crypto.randomUUID(),
          fieldId: aggregatableFields[0].id,
          aggregation: 'sum',
        },
      ],
    }));
  };

  const updateMetric = (metricId: string, updates: Partial<ReportMetric>) => {
    setConfig((prev) => ({
      ...prev,
      metrics: prev.metrics.map((m) =>
        m.id === metricId ? { ...m, ...updates } : m
      ),
    }));
  };

  const removeMetric = (metricId: string) => {
    setConfig((prev) => ({
      ...prev,
      metrics: prev.metrics.filter((m) => m.id !== metricId),
    }));
  };

  const toggleGroupBy = (fieldId: string) => {
    setConfig((prev) => ({
      ...prev,
      groupBy: prev.groupBy.includes(fieldId)
        ? prev.groupBy.filter((g) => g !== fieldId)
        : [...prev.groupBy, fieldId],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Metrics */}
      <WizardCard
        title="Metrics"
        description="Define the measures you want to calculate"
      >
        <div className="space-y-3">
          {config.metrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                <select
                  value={metric.aggregation}
                  onChange={(e) =>
                    updateMetric(metric.id, {
                      aggregation: e.target.value as AggregationType,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {AGGREGATION_TYPES.map((agg) => (
                    <option key={agg.value} value={agg.value}>
                      {agg.label}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">of</span>
                <select
                  value={metric.fieldId}
                  onChange={(e) =>
                    updateMetric(metric.id, { fieldId: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {aggregatableFields.map((field) => (
                    <option key={field.id} value={field.id}>
                      {field.name}
                    </option>
                  ))}
                </select>
                <LobbiInput
                  placeholder="Custom label"
                  value={metric.label || ''}
                  onChange={(e) =>
                    updateMetric(metric.id, { label: e.target.value })
                  }
                  className="w-40"
                />
                <button
                  onClick={() => removeMetric(metric.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
          ))}
          <button
            onClick={addMetric}
            className={cn(
              'w-full p-3 border-2 border-dashed border-gray-300 rounded-lg',
              'text-gray-500 hover:border-gold-400 hover:text-gold-600',
              'transition-colors flex items-center justify-center gap-2'
            )}
          >
            <Plus className="w-4 h-4" />
            Add Metric
          </button>
        </div>
      </WizardCard>

      {/* Group By */}
      <WizardCard
        title="Group By"
        description="Select dimensions to group your data"
      >
        <div className="flex flex-wrap gap-2">
          {dimensionFields.map((field) => (
            <button
              key={field.id}
              onClick={() => toggleGroupBy(field.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                config.groupBy.includes(field.id)
                  ? 'bg-gold-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gold-300'
              )}
            >
              {field.name}
              {config.groupBy.includes(field.id) && (
                <Check className="w-4 h-4 inline ml-2" />
              )}
            </button>
          ))}
        </div>
      </WizardCard>

      {/* Filters */}
      <WizardCard
        title="Filters"
        description="Add conditions to filter your data"
      >
        <div className="space-y-3">
          {config.filters.map((filter) => (
            <div
              key={filter.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <select
                value={filter.fieldId}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    filters: prev.filters.map((f) =>
                      f.id === filter.id ? { ...f, fieldId: e.target.value } : f
                    ),
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {dataSource?.fields.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
              <select
                value={filter.operator}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    filters: prev.filters.map((f) =>
                      f.id === filter.id
                        ? { ...f, operator: e.target.value as ReportFilter['operator'] }
                        : f
                    ),
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="equals">Equals</option>
                <option value="contains">Contains</option>
                <option value="gt">Greater than</option>
                <option value="lt">Less than</option>
              </select>
              <input
                type="text"
                value={String(filter.value || '')}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    filters: prev.filters.map((f) =>
                      f.id === filter.id ? { ...f, value: e.target.value } : f
                    ),
                  }))
                }
                placeholder="Value..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    filters: prev.filters.filter((f) => f.id !== filter.id),
                  }))
                }
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setConfig((prev) => ({
                ...prev,
                filters: [
                  ...prev.filters,
                  {
                    id: crypto.randomUUID(),
                    fieldId: dataSource?.fields[0]?.id || '',
                    operator: 'equals',
                    value: '',
                  },
                ],
              }))
            }
            className={cn(
              'w-full p-3 border-2 border-dashed border-gray-300 rounded-lg',
              'text-gray-500 hover:border-gold-400 hover:text-gold-600',
              'transition-colors flex items-center justify-center gap-2'
            )}
          >
            <Filter className="w-4 h-4" />
            Add Filter
          </button>
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 3: VISUALIZATION
// =============================================================================

function VisualizationStep({
  config,
  setConfig,
}: {
  config: ReportConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReportConfig>>;
}) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Chart Type Selection */}
      <WizardCard
        title="Chart Type"
        description="Choose how to visualize your data"
      >
        <div className="grid grid-cols-5 gap-4">
          {CHART_TYPES.map((chart) => (
            <motion.button
              key={chart.type}
              onClick={() =>
                setConfig((prev) => ({ ...prev, chartType: chart.type }))
              }
              className={cn(
                'relative p-4 rounded-xl border-2 transition-all text-center',
                config.chartType === chart.type
                  ? 'border-gold-500 bg-gold-50'
                  : 'border-gray-200 hover:border-gold-300 bg-white'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={cn(
                  'w-12 h-12 mx-auto rounded-lg flex items-center justify-center mb-2',
                  config.chartType === chart.type
                    ? 'bg-gold-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                {chart.icon}
              </div>
              <p className="font-medium text-gray-900 text-sm">{chart.label}</p>
              <p className="text-xs text-gray-500 mt-1">{chart.description}</p>
            </motion.button>
          ))}
        </div>
      </WizardCard>

      {/* Live Preview */}
      <WizardCard title="Preview">
        <div className="h-80">
          <ChartPreview chartType={config.chartType} />
        </div>
      </WizardCard>

      {/* Additional Options */}
      <WizardCard title="Display Options">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={config.sortBy || ''}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, sortBy: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">Default</option>
              <option value="value">Value</option>
              <option value="name">Name</option>
              <option value="date">Date</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort Order
            </label>
            <select
              value={config.sortOrder || 'asc'}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  sortOrder: e.target.value as 'asc' | 'desc',
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Limit Results
            </label>
            <select
              value={config.limit || ''}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  limit: e.target.value ? parseInt(e.target.value) : undefined,
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="">No limit</option>
              <option value="10">Top 10</option>
              <option value="25">Top 25</option>
              <option value="50">Top 50</option>
              <option value="100">Top 100</option>
            </select>
          </div>
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// CHART PREVIEW
// =============================================================================

function ChartPreview({ chartType }: { chartType: ChartType }) {
  if (chartType === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={SAMPLE_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="members" fill="#D4AF37" radius={[4, 4, 0, 0]} />
          <Bar dataKey="events" fill="#B8860B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={SAMPLE_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="members"
            stroke="#D4AF37"
            strokeWidth={2}
            dot={{ fill: '#D4AF37' }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#B8860B"
            strokeWidth={2}
            dot={{ fill: '#B8860B' }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === 'pie') {
    const pieData = SAMPLE_DATA.map((d) => ({ name: d.name, value: d.members }));
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            dataKey="value"
          >
            {pieData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === 'area') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={SAMPLE_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#D4AF37"
            fill="#D4AF37"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === 'table') {
    return (
      <div className="overflow-auto h-full">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-900">
                Month
              </th>
              <th className="text-right p-3 font-semibold text-gray-900">
                Members
              </th>
              <th className="text-right p-3 font-semibold text-gray-900">
                Revenue
              </th>
              <th className="text-right p-3 font-semibold text-gray-900">
                Events
              </th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_DATA.map((row) => (
              <tr key={row.name} className="border-b border-gray-100">
                <td className="p-3 text-gray-900">{row.name}</td>
                <td className="p-3 text-right text-gray-700">{row.members}</td>
                <td className="p-3 text-right text-gray-700">
                  ${row.revenue.toLocaleString()}
                </td>
                <td className="p-3 text-right text-gray-700">{row.events}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

// =============================================================================
// STEP 4: PREVIEW & EXPORT
// =============================================================================

function PreviewStep({
  config,
  onExport,
}: {
  config: ReportConfig;
  setConfig: React.Dispatch<React.SetStateAction<ReportConfig>>;
  onExport?: (config: ReportConfig, format: 'pdf' | 'excel' | 'csv') => void;
}) {
  const dataSource = DATA_SOURCES.find((s) => s.id === config.dataSourceId);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Report Summary */}
      <WizardCard title="Report Summary">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Report Name
              </label>
              <p className="text-gray-900 font-medium">{config.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Data Source
              </label>
              <p className="text-gray-900">{dataSource?.name || 'Not selected'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Date Range
              </label>
              <p className="text-gray-900 capitalize">{config.dateRange}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Chart Type
              </label>
              <p className="text-gray-900 capitalize">{config.chartType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Metrics
              </label>
              <p className="text-gray-900">
                {config.metrics.length > 0
                  ? `${config.metrics.length} metric(s) configured`
                  : 'None configured'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Filters
              </label>
              <p className="text-gray-900">
                {config.filters.length > 0
                  ? `${config.filters.length} filter(s) active`
                  : 'No filters'}
              </p>
            </div>
          </div>
        </div>
      </WizardCard>

      {/* Final Preview */}
      <WizardCard title="Preview">
        <div className="h-80">
          <ChartPreview chartType={config.chartType} />
        </div>
      </WizardCard>

      {/* Export Options */}
      <WizardCard
        title="Export Options"
        description="Download your report or schedule automated delivery"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <motion.button
            onClick={() => onExport?.(config, 'pdf')}
            className={cn(
              'p-4 rounded-xl border border-gray-200 bg-white',
              'hover:border-gold-300 hover:bg-gold-50 transition-colors',
              'flex flex-col items-center gap-2 text-center'
            )}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-8 h-8 text-red-500" />
            <span className="font-medium text-gray-900">Export PDF</span>
            <span className="text-xs text-gray-500">
              Print-ready document
            </span>
          </motion.button>

          <motion.button
            onClick={() => onExport?.(config, 'excel')}
            className={cn(
              'p-4 rounded-xl border border-gray-200 bg-white',
              'hover:border-gold-300 hover:bg-gold-50 transition-colors',
              'flex flex-col items-center gap-2 text-center'
            )}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileSpreadsheet className="w-8 h-8 text-green-600" />
            <span className="font-medium text-gray-900">Export Excel</span>
            <span className="text-xs text-gray-500">
              Editable spreadsheet
            </span>
          </motion.button>

          <motion.button
            onClick={() => onExport?.(config, 'csv')}
            className={cn(
              'p-4 rounded-xl border border-gray-200 bg-white',
              'hover:border-gold-300 hover:bg-gold-50 transition-colors',
              'flex flex-col items-center gap-2 text-center'
            )}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-8 h-8 text-blue-500" />
            <span className="font-medium text-gray-900">Export CSV</span>
            <span className="text-xs text-gray-500">
              Raw data export
            </span>
          </motion.button>
        </div>
      </WizardCard>

      {/* Schedule */}
      <WizardCard
        title="Schedule Delivery"
        description="Automatically send this report on a schedule"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="">No schedule</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <LobbiInput
            placeholder="Recipients (comma-separated emails)"
            className="flex-1"
          />
          <LobbiButton variant="secondary" leftIcon={<Share2 className="w-4 h-4" />}>
            Set Schedule
          </LobbiButton>
        </div>
      </WizardCard>
    </div>
  );
}

export default ReportBuilder;

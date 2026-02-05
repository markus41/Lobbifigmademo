import { motion } from 'motion/react';
import { DollarSign, FileText, TrendingUp, CreditCard, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Account, Organization } from '../data/themes';

interface BusinessCenterPageProps {
  organization?: Organization;
  account?: Account;
}

export function BusinessCenterPage({ organization, account }: BusinessCenterPageProps) {
  const rgb = organization?.theme.primaryRgb || '212,175,55';
  const primary = organization?.theme.primary || '#D4AF37';

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: '$2,847,392',
      change: '+12.5%',
      trend: 'up' as const,
    },
    {
      icon: FileText,
      label: 'Outstanding Dues',
      value: '$124,850',
      change: '-8.2%',
      trend: 'down' as const,
    },
    {
      icon: CreditCard,
      label: 'Active Invoices',
      value: '156',
      change: '+23',
      trend: 'up' as const,
    },
    {
      icon: BarChart3,
      label: 'Collection Rate',
      value: '96.8%',
      change: '+1.2%',
      trend: 'up' as const,
    },
  ];

  const transactions = [
    { date: 'Feb 3, 2026', description: 'Annual Dues Payment', entity: 'Sarah Johnson', amount: '$2,500.00', status: 'Completed' as const },
    { date: 'Feb 2, 2026', description: 'Event Registration', entity: 'Michael Chen', amount: '$350.00', status: 'Completed' as const },
    { date: 'Feb 2, 2026', description: 'Sponsorship Fee', entity: 'Acme Holdings LLC', amount: '$15,000.00', status: 'Pending' as const },
    { date: 'Feb 1, 2026', description: 'Facility Rental', entity: 'Pacific Events Co.', amount: '$4,200.00', status: 'Completed' as const },
    { date: 'Jan 31, 2026', description: 'Membership Upgrade', entity: 'Emily Rodriguez', amount: '$1,800.00', status: 'Completed' as const },
    { date: 'Jan 30, 2026', description: 'Late Fee Assessment', entity: 'David Kim', amount: '$75.00', status: 'Failed' as const },
    { date: 'Jan 29, 2026', description: 'Quarterly Dues Payment', entity: 'Lisa Anderson', amount: '$625.00', status: 'Pending' as const },
    { date: 'Jan 28, 2026', description: 'Workshop Registration', entity: 'James Park', amount: '$180.00', status: 'Completed' as const },
  ];

  const quickActions = [
    { icon: FileText, label: 'Generate Invoice' },
    { icon: CreditCard, label: 'Process Payment' },
    { icon: BarChart3, label: 'Export Report' },
    { icon: TrendingUp, label: 'Send Reminders' },
  ];

  // SVG chart data points (12 points for a smooth revenue trend line)
  const chartPoints = [
    { x: 40, y: 140 },
    { x: 100, y: 120 },
    { x: 160, y: 130 },
    { x: 220, y: 95 },
    { x: 280, y: 100 },
    { x: 340, y: 70 },
    { x: 400, y: 80 },
    { x: 460, y: 55 },
    { x: 520, y: 60 },
    { x: 580, y: 35 },
    { x: 640, y: 45 },
    { x: 700, y: 20 },
  ];
  const polylinePoints = chartPoints.map(p => `${p.x},${p.y}`).join(' ');
  const areaPoints = `40,160 ${polylinePoints} 700,160`;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const statusStyles: Record<string, string> = {
    Completed: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Failed: 'bg-red-50 text-red-700',
  };

  return (
    <div className="p-8 space-y-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          className="text-3xl font-bold mb-1"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: primary }}
        >
          Business Center
        </h1>
        <p className="text-gray-500 text-sm">Financial overview and operations</p>
      </motion.div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            whileHover={{ y: -4, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)' }}
            className="bg-white rounded-xl p-6 transition-shadow"
            style={{ border: `1px solid rgba(${rgb}, 0.18)` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: `rgba(${rgb}, 0.08)` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: primary }} />
              </div>
              <span
                className={`text-xs font-semibold flex items-center gap-0.5 ${
                  stat.trend === 'up'
                    ? stat.label === 'Outstanding Dues'
                      ? 'text-emerald-600'
                      : 'text-emerald-600'
                    : 'text-emerald-600'
                }`}
                style={
                  stat.label === 'Outstanding Dues'
                    ? { color: '#059669' }
                    : stat.trend === 'up'
                    ? { color: '#059669' }
                    : undefined
                }
              >
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="bg-white rounded-xl p-6"
        style={{ border: `1px solid rgba(${rgb}, 0.18)` }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3
              className="text-lg font-semibold mb-0.5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Revenue Trend
            </h3>
            <p className="text-sm text-gray-500">Monthly revenue over the last 6 months</p>
          </div>
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: `rgba(${rgb}, 0.08)` }}
          >
            <TrendingUp className="w-5 h-5" style={{ color: primary }} />
          </div>
        </div>
        <svg viewBox="0 0 740 180" className="w-full h-48" preserveAspectRatio="none">
          {/* Grid lines */}
          {[40, 80, 120, 160].map((y) => (
            <line
              key={y}
              x1="40"
              y1={y}
              x2="700"
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          ))}
          {/* Area fill */}
          <polygon
            points={areaPoints}
            fill={`rgba(${rgb}, 0.08)`}
          />
          {/* Trend line */}
          <polyline
            points={polylinePoints}
            fill="none"
            stroke={primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data point dots */}
          {chartPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="white"
              stroke={primary}
              strokeWidth="2"
            />
          ))}
          {/* Month labels */}
          {months.map((month, i) => {
            const xPositions = [40, 172, 304, 436, 568, 700];
            return (
              <text
                key={month}
                x={xPositions[i]}
                y="178"
                textAnchor="middle"
                className="text-[10px]"
                fill="#9ca3af"
              >
                {month}
              </text>
            );
          })}
        </svg>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="bg-white rounded-xl overflow-hidden"
        style={{ border: `1px solid rgba(${rgb}, 0.18)` }}
      >
        <div className="p-6 pb-4">
          <h3
            className="text-lg font-semibold mb-0.5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Recent Transactions
          </h3>
          <p className="text-sm text-gray-500">Latest financial activity across all accounts</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              className="border-b"
              style={{ borderColor: `rgba(${rgb}, 0.12)` }}
            >
              <tr style={{ backgroundColor: `rgba(${rgb}, 0.03)` }}>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Member / Entity</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((txn, index) => (
                <motion.tr
                  key={`${txn.date}-${txn.description}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  className="hover:bg-gray-50/60 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{txn.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{txn.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{txn.entity}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right whitespace-nowrap">{txn.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[txn.status]}`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h3
          className="text-lg font-semibold mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.75 + index * 0.06 }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.1)',
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 transition-all cursor-pointer"
              style={{ border: `1px solid rgba(${rgb}, 0.18)` }}
            >
              <div
                className="p-2.5 rounded-lg"
                style={{ backgroundColor: `rgba(${rgb}, 0.08)` }}
              >
                <action.icon className="w-5 h-5" style={{ color: primary }} />
              </div>
              <span className="text-sm font-semibold text-gray-800">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

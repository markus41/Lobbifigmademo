import { motion } from 'motion/react';
import { Users, TrendingUp, DollarSign, Calendar, AlertCircle, Activity } from 'lucide-react';
import type { Account, Organization } from '../data/themes';

interface DashboardProps {
  organization?: Organization;
  account?: Account;
}

export function Dashboard({ organization, account }: DashboardProps) {
  const rgb = organization?.theme.primaryRgb || '212,175,55';
  const primary = organization?.theme.primary || '#D4AF37';
  const greeting = organization?.identity.dashboardGreeting || 'Dashboard';
  const memberLabel = organization?.identity.memberLabel || 'Members';
  const firstName = account?.first || 'User';

  // Org-specific stats vary by org type
  const getOrgStats = () => {
    switch (organization?.id) {
      case 'luxe-haven':
        return [
          { icon: Users, label: 'Total Guests', value: '1,247', change: '+12 this month', trend: 'up' },
          { icon: TrendingUp, label: 'Occupancy Rate', value: '94%', change: '+3% vs last week', trend: 'up' },
          { icon: DollarSign, label: 'Revenue MTD', value: '$248,392', change: '+8% vs last month', trend: 'up' },
          { icon: Calendar, label: 'Reservations', value: '38', change: '12 checking in today', trend: 'neutral' },
        ];
      case 'pacific-club':
        return [
          { icon: Users, label: 'Active Members', value: '892', change: '+5 new this month', trend: 'up' },
          { icon: TrendingUp, label: 'Engagement', value: '97%', change: 'Highest this quarter', trend: 'up' },
          { icon: DollarSign, label: 'Dues Collected', value: '$186,450', change: '98% collection rate', trend: 'up' },
          { icon: Calendar, label: 'Club Events', value: '15', change: '4 this week', trend: 'neutral' },
        ];
      case 'summit-group':
        return [
          { icon: Users, label: 'Properties', value: '24', change: '2 onboarding', trend: 'up' },
          { icon: TrendingUp, label: 'Avg Occupancy', value: '88%', change: '+5% year over year', trend: 'up' },
          { icon: DollarSign, label: 'Portfolio Rev', value: '$1.2M', change: '+12% vs budget', trend: 'up' },
          { icon: Calendar, label: 'Inspections', value: '8', change: '3 this week', trend: 'neutral' },
        ];
      case 'verde-collective':
        return [
          { icon: Users, label: 'Partners', value: '456', change: '+18 this quarter', trend: 'up' },
          { icon: TrendingUp, label: 'Community Score', value: '9.2', change: 'Top 5% nationally', trend: 'up' },
          { icon: DollarSign, label: 'Grant Funding', value: '$92,100', change: '3 grants pending', trend: 'up' },
          { icon: Calendar, label: 'Programs', value: '12', change: '4 active this month', trend: 'neutral' },
        ];
      case 'crown-estates':
        return [
          { icon: Users, label: 'Estates', value: '67', change: '+3 acquisitions', trend: 'up' },
          { icon: TrendingUp, label: 'Portfolio Value', value: '$84M', change: '+6% appreciation', trend: 'up' },
          { icon: DollarSign, label: 'Net Revenue', value: '$2.4M', change: '+15% vs forecast', trend: 'up' },
          { icon: Calendar, label: 'Showings', value: '22', change: '8 this week', trend: 'neutral' },
        ];
      default:
        return [
          { icon: Users, label: `Total ${memberLabel}`, value: '1,247', change: '+12 this month', trend: 'up' },
          { icon: TrendingUp, label: 'Engagement', value: '95%', change: '+3% vs last month', trend: 'up' },
          { icon: DollarSign, label: 'Revenue MTD', value: '$48,392', change: '+8% vs last month', trend: 'up' },
          { icon: Calendar, label: 'Events', value: '12', change: '3 this week', trend: 'neutral' },
        ];
    }
  };

  const stats = getOrgStats();

  return (
    <motion.div
      className="p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-end justify-between">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.2em] mb-2"
                style={{ color: primary, opacity: 0.6, fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
              >
                {greeting}
              </p>
              <h1
                className="text-2xl sm:text-3xl mb-2"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 400, color: '#2C2A25' }}
              >
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {firstName}
              </h1>
              <p className="text-sm" style={{ color: '#8A8578' }}>
                Here&apos;s what&apos;s happening with your {memberLabel.toLowerCase()} today.
              </p>
            </div>
            <div
              className="text-xs px-4 py-2 rounded-full hidden md:block"
              style={{
                background: `rgba(${rgb}, 0.06)`,
                border: `1px solid rgba(${rgb}, 0.1)`,
                color: primary,
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              whileHover={{ y: -4, boxShadow: `0 10px 30px -5px rgba(${rgb}, 0.1)` }}
              className="bg-white rounded-xl border p-6 transition-shadow"
              style={{ borderColor: `rgba(${rgb}, 0.08)` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ background: `rgba(${rgb}, 0.08)` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: primary }} />
                </div>
                {stat.trend === 'up' && (
                  <TrendingUp className="w-4 h-4" style={{ color: '#3D7B5F' }} />
                )}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-xs mt-2" style={{ color: primary, opacity: 0.7 }}>{stat.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl border p-6 lg:col-span-2"
            style={{ borderColor: `rgba(${rgb}, 0.08)` }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}>
                  Recent Activity
                </h3>
                <p className="text-sm text-gray-500">Latest updates from your organization</p>
              </div>
              <Activity className="w-5 h-5" style={{ color: primary, opacity: 0.5 }} />
            </div>

            <div className="space-y-4">
              {[
                { user: 'Sarah Johnson', action: `renewed ${memberLabel.toLowerCase()} status`, time: '2 minutes ago' },
                { user: 'Michael Chen', action: 'registered for upcoming event', time: '15 minutes ago' },
                { user: 'Emily Rodriguez', action: 'completed onboarding', time: '1 hour ago' },
                { user: 'David Kim', action: 'submitted report', time: '2 hours ago' },
                { user: 'Lisa Anderson', action: `joined as new ${memberLabel.toLowerCase().replace(/s$/, '')}`, time: '3 hours ago' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-2 h-2 mt-2 rounded-full flex-shrink-0" style={{ background: primary }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-gray-600">{activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl border p-6"
            style={{ borderColor: `rgba(${rgb}, 0.08)` }}
          >
            <div className="mb-6">
              <h3 className="text-lg mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}>
                Quick Actions
              </h3>
              <p className="text-sm text-gray-500">Common tasks</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, label: `Add ${memberLabel.replace(/ies$/, 'y').replace(/s$/, '')}` },
                { icon: Calendar, label: 'Create Event' },
                { icon: DollarSign, label: 'Send Invoice' },
                { icon: AlertCircle, label: 'View Reports' },
              ].map((action, index) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all group"
                  style={{ borderColor: `rgba(${rgb}, 0.08)` }}
                >
                  <div
                    className="p-3 rounded-lg transition-colors"
                    style={{ background: `rgba(${rgb}, 0.06)` }}
                  >
                    <action.icon className="w-5 h-5" style={{ color: primary }} />
                  </div>
                  <span className="text-sm font-medium text-gray-900 text-center">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

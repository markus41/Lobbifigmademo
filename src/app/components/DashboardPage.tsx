import { motion } from 'motion/react';
import { Users, TrendingUp, DollarSign, Calendar, AlertCircle, Activity } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap, SplitText } from '../../lib/gsap-config';

export function DashboardPage() {
  // GSAP: Section title SplitText animations with ScrollTrigger
  const welcomeTitleRef = useRef<HTMLHeadingElement>(null);
  const renewalTitleRef = useRef<HTMLHeadingElement>(null);
  const activityTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate welcome title
      if (welcomeTitleRef.current) {
        const split = new SplitText(welcomeTitleRef.current, { type: 'words' });
        gsap.fromTo(
          split.words,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: welcomeTitleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      // Animate section titles with word-by-word reveal
      [renewalTitleRef, activityTitleRef].forEach((ref) => {
        if (ref.current) {
          const split = new SplitText(ref.current, { type: 'words' });
          gsap.fromTo(
            split.words,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // GSAP: Staggered widget entrance animations with ScrollTrigger
  const statsGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!statsGridRef.current) return;
    const widgets = statsGridRef.current.querySelectorAll('.stat-widget');
    gsap.fromTo(
      widgets,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: { each: 0.12, from: 'start' },
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: statsGridRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      },
    );
  }, []);
  return (
    <div className="p-8 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 ref={welcomeTitleRef} className="mb-2">Welcome back, John</h1>
        <p style={{ color: 'var(--theme-text-secondary)' }}>Here's what's happening with your community today.</p>
      </motion.div>

      {/* Quick Stats */}
      <div ref={statsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: Users,
            label: 'Total Members',
            value: '1,247',
            change: '+12 this month',
            trend: 'up',
            color: 'primary'
          },
          {
            icon: TrendingUp,
            label: 'Active Members',
            value: '1,186',
            change: '95% engagement',
            trend: 'up',
            color: 'secondary'
          },
          {
            icon: DollarSign,
            label: 'Revenue MTD',
            value: '$48,392',
            change: '+8% vs last month',
            trend: 'up',
            color: 'primary'
          },
          {
            icon: Calendar,
            label: 'Upcoming Events',
            value: '12',
            change: '3 this week',
            trend: 'neutral',
            color: 'accent'
          }
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4, boxShadow: 'var(--theme-shadow-lg, 0 10px 30px -5px rgba(0, 0, 0, 0.1))' }}
            className="stat-widget rounded-xl p-6 transition-shadow"
            style={{
              background: 'var(--theme-bg-card, #ffffff)',
              border: '1px solid var(--theme-border-light, #EDE8DD)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-3 rounded-lg"
                style={{
                  background: stat.color === 'primary'
                    ? 'var(--theme-primary-pale, rgba(var(--theme-primary-rgb), 0.1))'
                    : stat.color === 'secondary'
                    ? 'var(--theme-secondary-light, rgba(var(--theme-secondary-rgb), 0.1))'
                    : 'var(--theme-accent-light, rgba(var(--theme-accent-rgb), 0.1))',
                }}
              >
                <stat.icon
                  className="w-6 h-6"
                  style={{
                    color: stat.color === 'primary'
                      ? 'var(--theme-primary, #D4AF37)'
                      : stat.color === 'secondary'
                      ? 'var(--theme-secondary, #22C55E)'
                      : 'var(--theme-accent, #0EA5E9)',
                  }}
                />
              </div>
              {stat.trend === 'up' && (
                <span className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--theme-secondary, #22C55E)' }}>
                  <TrendingUp className="w-4 h-4" />
                </span>
              )}
            </div>
            <div className="text-3xl font-bold mb-1" style={{ color: 'var(--theme-text-primary)' }}>{stat.value}</div>
            <div className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{stat.label}</div>
            <div className="text-xs mt-2" style={{ color: 'var(--theme-text-muted)' }}>{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Renewal Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-xl p-6 lg:col-span-2"
          style={{
            background: 'var(--theme-bg-card, #ffffff)',
            border: '1px solid var(--theme-border-light, #EDE8DD)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 ref={renewalTitleRef} className="mb-1">Renewal Alerts</h3>
              <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>Members requiring attention</p>
            </div>
            <AlertCircle className="w-5 h-5" style={{ color: 'var(--theme-accent, #F59E0B)' }} />
          </div>

          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', type: 'Gold Member', days: 7, email: 'sarah.j@example.com' },
              { name: 'Michael Chen', type: 'Silver Member', days: 14, email: 'michael.c@example.com' },
              { name: 'Emily Rodriguez', type: 'Gold Member', days: 30, email: 'emily.r@example.com' }
            ].map((member, index) => (
              <motion.div
                key={member.email}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg transition-all group"
                style={{
                  border: '1px solid var(--theme-border-light, #EDE8DD)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `rgba(var(--theme-primary-rgb), 0.3)`;
                  e.currentTarget.style.background = `rgba(var(--theme-primary-rgb), 0.04)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-border-light, #EDE8DD)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--theme-gradient-btn, linear-gradient(135deg, var(--theme-primary-light), var(--theme-primary)))' }}
                  >
                    <span className="text-sm font-semibold" style={{ color: 'var(--theme-text-inverse, #ffffff)' }}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--theme-text-primary)' }}>{member.name}</div>
                    <div className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>{member.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium" style={{ color: 'var(--theme-accent, #F59E0B)' }}>Expires in {member.days} days</div>
                    <div className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>{member.email}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'var(--theme-primary, #D4AF37)',
                      color: 'var(--theme-text-inverse, #ffffff)',
                    }}
                  >
                    Send Reminder
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            className="w-full mt-4 py-3 text-sm font-medium rounded-lg transition-colors"
            style={{ color: 'var(--theme-primary, #D4AF37)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--theme-primary-pale, rgba(var(--theme-primary-rgb), 0.06))'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            View All Renewals
          </button>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl p-6"
          style={{
            background: 'var(--theme-bg-card, #ffffff)',
            border: '1px solid var(--theme-border-light, #EDE8DD)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="mb-1">Upcoming Events</h3>
              <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>Next 7 days</p>
            </div>
            <Calendar className="w-5 h-5" style={{ color: 'var(--theme-primary, #D4AF37)' }} />
          </div>

          <div className="space-y-4">
            {[
              { name: 'Annual Gala', date: 'Feb 2', time: '7:00 PM', attendees: 47 },
              { name: 'Networking Mixer', date: 'Feb 4', time: '6:30 PM', attendees: 23 },
              { name: 'Board Meeting', date: 'Feb 6', time: '2:00 PM', attendees: 12 }
            ].map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-lg transition-all cursor-pointer"
                style={{
                  border: '1px solid var(--theme-border-light, #EDE8DD)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `rgba(var(--theme-primary-rgb), 0.3)`;
                  e.currentTarget.style.background = `rgba(var(--theme-primary-rgb), 0.04)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-border-light, #EDE8DD)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium" style={{ color: 'var(--theme-text-primary)' }}>{event.name}</div>
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: 'var(--theme-bg-muted, #f3f4f6)',
                      color: 'var(--theme-text-muted)',
                    }}
                  >
                    {event.attendees} attending
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
                  <span>{event.date}</span>
                  <span>&#8226;</span>
                  <span>{event.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            className="w-full mt-4 py-3 text-sm font-medium rounded-lg transition-colors"
            style={{ color: 'var(--theme-primary, #D4AF37)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--theme-primary-pale, rgba(var(--theme-primary-rgb), 0.06))'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            View All Events
          </button>
        </motion.div>
      </div>

      {/* Activity Feed & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-xl p-6 lg:col-span-2"
          style={{
            background: 'var(--theme-bg-card, #ffffff)',
            border: '1px solid var(--theme-border-light, #EDE8DD)',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 ref={activityTitleRef} className="mb-1">Recent Activity</h3>
              <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>Latest updates from your community</p>
            </div>
            <Activity className="w-5 h-5" style={{ color: 'var(--theme-primary, #D4AF37)' }} />
          </div>

          <div className="space-y-4">
            {[
              { user: 'Sarah Johnson', action: 'renewed membership', time: '2 minutes ago', type: 'renewal' },
              { user: 'Michael Chen', action: 'registered for Annual Gala', time: '15 minutes ago', type: 'event' },
              { user: 'Emily Rodriguez', action: 'completed CE course', time: '1 hour ago', type: 'learning' },
              { user: 'David Kim', action: 'submitted expense report', time: '2 hours ago', type: 'finance' },
              { user: 'Lisa Anderson', action: 'joined as new member', time: '3 hours ago', type: 'new' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                className="flex items-start gap-4 p-3 rounded-lg transition-colors"
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--theme-bg-muted, #f9fafb)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div
                  className="w-2 h-2 mt-2 rounded-full flex-shrink-0"
                  style={{ background: 'var(--theme-primary, #D4AF37)' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: 'var(--theme-text-primary)' }}>
                    <span className="font-medium">{activity.user}</span>
                    {' '}
                    <span style={{ color: 'var(--theme-text-secondary)' }}>{activity.action}</span>
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>{activity.time}</p>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: activity.type === 'renewal'
                      ? 'var(--theme-primary-pale, rgba(var(--theme-primary-rgb), 0.1))'
                      : activity.type === 'event'
                      ? 'var(--theme-accent-light, rgba(var(--theme-accent-rgb), 0.1))'
                      : activity.type === 'learning'
                      ? 'var(--theme-secondary-light, rgba(var(--theme-secondary-rgb), 0.1))'
                      : activity.type === 'new'
                      ? '#F3E8FF'
                      : 'var(--theme-bg-muted, #f3f4f6)',
                    color: activity.type === 'renewal'
                      ? 'var(--theme-primary, #D4AF37)'
                      : activity.type === 'event'
                      ? 'var(--theme-accent, #0EA5E9)'
                      : activity.type === 'learning'
                      ? 'var(--theme-secondary, #22C55E)'
                      : activity.type === 'new'
                      ? '#9333EA'
                      : 'var(--theme-text-secondary)',
                  }}
                >
                  {activity.type}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="rounded-xl p-6"
          style={{
            background: 'var(--theme-bg-card, #ffffff)',
            border: '1px solid var(--theme-border-light, #EDE8DD)',
          }}
        >
          <div className="mb-6">
            <h3 className="mb-1">Quick Actions</h3>
            <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>Common tasks</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, label: 'Add Member', color: 'primary' },
              { icon: Calendar, label: 'Create Event', color: 'accent' },
              { icon: DollarSign, label: 'Send Invoice', color: 'secondary' },
              { icon: Activity, label: 'Launch Campaign', color: 'purple' }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl transition-all group"
                style={{
                  border: '1px solid var(--theme-border-light, #EDE8DD)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `rgba(var(--theme-primary-rgb), 0.5)`;
                  e.currentTarget.style.background = `rgba(var(--theme-primary-rgb), 0.04)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-border-light, #EDE8DD)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div
                  className="p-3 rounded-lg"
                  style={{
                    background: action.color === 'primary'
                      ? 'var(--theme-primary-pale, rgba(var(--theme-primary-rgb), 0.1))'
                      : action.color === 'accent'
                      ? 'var(--theme-accent-light, rgba(var(--theme-accent-rgb), 0.1))'
                      : action.color === 'secondary'
                      ? 'var(--theme-secondary-light, rgba(var(--theme-secondary-rgb), 0.1))'
                      : '#F3E8FF',
                    color: action.color === 'primary'
                      ? 'var(--theme-primary, #D4AF37)'
                      : action.color === 'accent'
                      ? 'var(--theme-accent, #0EA5E9)'
                      : action.color === 'secondary'
                      ? 'var(--theme-secondary, #22C55E)'
                      : '#9333EA',
                  }}
                >
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-center" style={{ color: 'var(--theme-text-primary)' }}>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

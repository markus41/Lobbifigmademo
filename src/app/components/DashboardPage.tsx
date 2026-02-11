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
        <p className="text-gray-600">Here's what's happening with your community today.</p>
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
            color: 'gold'
          },
          {
            icon: TrendingUp,
            label: 'Active Members',
            value: '1,186',
            change: '95% engagement',
            trend: 'up',
            color: 'success'
          },
          {
            icon: DollarSign,
            label: 'Revenue MTD',
            value: '$48,392',
            change: '+8% vs last month',
            trend: 'up',
            color: 'gold'
          },
          {
            icon: Calendar,
            label: 'Upcoming Events',
            value: '12',
            change: '3 this week',
            trend: 'neutral',
            color: 'info'
          }
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -4, boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)' }}
            className="stat-widget bg-white rounded-xl border border-gray-200 p-6 transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color === 'gold' ? 'gold-50' : stat.color === 'success' ? 'emerald-50' : 'sky-50'}`}>
                <stat.icon className={`w-6 h-6 ${stat.color === 'gold' ? 'text-gold-primary' : stat.color === 'success' ? 'text-success' : 'text-info'}`} />
              </div>
              {stat.trend === 'up' && (
                <span className="text-success text-sm font-medium flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                </span>
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-xs text-gray-500 mt-2">{stat.change}</div>
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
          className="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 ref={renewalTitleRef} className="mb-1">Renewal Alerts</h3>
              <p className="text-sm text-gray-600">Members requiring attention</p>
            </div>
            <AlertCircle className="w-5 h-5 text-warning" />
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
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gold-primary/30 hover:bg-gold-50/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-light to-gold-primary flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-600">{member.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-warning">Expires in {member.days} days</div>
                    <div className="text-xs text-gray-500">{member.email}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gold-primary text-white rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Send Reminder
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 text-sm font-medium text-gold-primary hover:bg-gold-50 rounded-lg transition-colors">
            View All Renewals
          </button>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="mb-1">Upcoming Events</h3>
              <p className="text-sm text-gray-600">Next 7 days</p>
            </div>
            <Calendar className="w-5 h-5 text-gold-primary" />
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
                className="p-4 rounded-lg border border-gray-100 hover:border-gold-primary/30 hover:bg-gold-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-gray-900">{event.name}</div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {event.attendees} attending
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 text-sm font-medium text-gold-primary hover:bg-gold-50 rounded-lg transition-colors">
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
          className="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 ref={activityTitleRef} className="mb-1">Recent Activity</h3>
              <p className="text-sm text-gray-600">Latest updates from your community</p>
            </div>
            <Activity className="w-5 h-5 text-gold-primary" />
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
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-2 h-2 mt-2 rounded-full bg-gold-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {' '}
                    <span className="text-gray-600">{activity.action}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                  activity.type === 'renewal' ? 'bg-gold-50 text-gold-primary' :
                  activity.type === 'event' ? 'bg-sky-50 text-info' :
                  activity.type === 'learning' ? 'bg-emerald-50 text-success' :
                  activity.type === 'new' ? 'bg-purple-50 text-purple-600' :
                  'bg-gray-50 text-gray-600'
                }`}>
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
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="mb-6">
            <h3 className="mb-1">Quick Actions</h3>
            <p className="text-sm text-gray-600">Common tasks</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Users, label: 'Add Member', color: 'gold' },
              { icon: Calendar, label: 'Create Event', color: 'info' },
              { icon: DollarSign, label: 'Send Invoice', color: 'success' },
              { icon: Activity, label: 'Launch Campaign', color: 'purple' }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-gold-primary/50 hover:bg-gold-50/30 transition-all group"
              >
                <div className={`p-3 rounded-lg ${
                  action.color === 'gold' ? 'bg-gold-50 text-gold-primary' :
                  action.color === 'info' ? 'bg-sky-50 text-info' :
                  action.color === 'success' ? 'bg-emerald-50 text-success' :
                  'bg-purple-50 text-purple-600'
                }`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-900 text-center">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Bell, Shield, Palette, Globe, Key, Mail, Smartphone } from 'lucide-react';
import type { Account, Organization } from '../data/themes';

interface SettingsPageProps {
  organization?: Organization;
  account?: Account;
}

type SettingsSection = 'profile' | 'notifications' | 'security' | 'appearance' | 'organization' | 'integrations';

const sidebarItems: { id: SettingsSection; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'organization', label: 'Organization', icon: Globe },
  { id: 'integrations', label: 'Integrations', icon: Key },
];

function ToggleSwitch({ enabled, onToggle, primary, rgb }: { enabled: boolean; onToggle: () => void; primary: string; rgb: string }) {
  return (
    <div
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 flex-shrink-0"
      style={{ background: enabled ? primary : '#D1D5DB' }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{ transform: enabled ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </div>
  );
}

export function SettingsPage({ organization, account }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    eventReminders: true,
    dueDateAlerts: false,
    weeklyDigest: true,
  });
  const [twoFactor, setTwoFactor] = useState(false);

  const rgb = organization?.theme.primaryRgb || '212,175,55';
  const primary = organization?.theme.primary || '#D4AF37';
  const gradient = organization?.theme.avatarBg || 'linear-gradient(135deg, #D4AF37, #8B7330)';
  const firstName = account?.first || 'John';
  const lastName = account?.last || 'Smith';
  const email = account?.email || 'john.smith@example.com';
  const role = account?.role || 'Administrator';
  const initials = account?.initials || 'JS';

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderProfile = () => (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Profile Card */}
      <div
        className="bg-white rounded-xl border p-6"
        style={{ borderColor: `rgba(${rgb}, 0.08)` }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: gradient }}
          >
            <span className="text-white text-2xl font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {initials}
            </span>
          </div>
          <div className="text-center sm:text-left">
            <h3
              className="text-xl mb-1"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
            >
              {firstName} {lastName}
            </h3>
            <p className="text-sm" style={{ color: '#8A8578' }}>{email}</p>
            <div
              className="inline-block mt-2 text-xs px-3 py-1 rounded-full"
              style={{
                background: `rgba(${rgb}, 0.08)`,
                color: primary,
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {role}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div
        className="bg-white rounded-xl border p-6"
        style={{ borderColor: `rgba(${rgb}, 0.08)` }}
      >
        <h4
          className="text-lg mb-5"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
        >
          Personal Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: 'First Name', value: firstName, type: 'text' },
            { label: 'Last Name', value: lastName, type: 'text' },
            { label: 'Email', value: email, type: 'email' },
            { label: 'Phone', value: '+1 (555) 123-4567', type: 'tel' },
            { label: 'Title / Role', value: role, type: 'text' },
          ].map((field) => (
            <div key={field.label}>
              <label
                className="block text-xs font-medium uppercase tracking-wider mb-2"
                style={{ color: '#8A8578', fontFamily: 'DM Sans, sans-serif' }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                defaultValue={field.value}
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: `rgba(${rgb}, 0.15)`,
                  fontFamily: 'DM Sans, sans-serif',
                  color: '#2C2A25',
                }}
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label
              className="block text-xs font-medium uppercase tracking-wider mb-2"
              style={{ color: '#8A8578', fontFamily: 'DM Sans, sans-serif' }}
            >
              Bio
            </label>
            <textarea
              rows={3}
              defaultValue="Experienced administrator passionate about community management and member engagement."
              className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all resize-none"
              style={{
                borderColor: `rgba(${rgb}, 0.15)`,
                fontFamily: 'DM Sans, sans-serif',
                color: '#2C2A25',
              }}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-white rounded-lg text-sm font-medium"
            style={{ background: primary, fontFamily: 'DM Sans, sans-serif' }}
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const renderNotifications = () => (
    <motion.div
      key="notifications"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div
        className="bg-white rounded-xl border p-6"
        style={{ borderColor: `rgba(${rgb}, 0.08)` }}
      >
        <h4
          className="text-lg mb-1"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
        >
          Notification Preferences
        </h4>
        <p className="text-sm mb-6" style={{ color: '#8A8578' }}>
          Choose how you&apos;d like to be notified
        </p>

        <div className="space-y-0 divide-y" style={{ borderColor: `rgba(${rgb}, 0.06)` }}>
          {[
            { key: 'email' as const, label: 'Email Notifications', desc: 'Receive updates via email', icon: Mail },
            { key: 'push' as const, label: 'Push Notifications', desc: 'Browser and mobile push alerts', icon: Smartphone },
            { key: 'eventReminders' as const, label: 'Event Reminders', desc: 'Get reminded before upcoming events', icon: Bell },
            { key: 'dueDateAlerts' as const, label: 'Due Date Alerts', desc: 'Alerts for upcoming deadlines', icon: Bell },
            { key: 'weeklyDigest' as const, label: 'Weekly Digest', desc: 'Summary of activity every Monday', icon: Mail },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: `rgba(${rgb}, 0.06)` }}
                >
                  <item.icon className="w-4 h-4" style={{ color: primary }} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.label}
                  </div>
                  <div className="text-xs" style={{ color: '#8A8578' }}>
                    {item.desc}
                  </div>
                </div>
              </div>
              <ToggleSwitch
                enabled={notifications[item.key]}
                onToggle={() => toggleNotification(item.key)}
                primary={primary}
                rgb={rgb}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderSecurity = () => (
    <motion.div
      key="security"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Change Password */}
      <div
        className="bg-white rounded-xl border p-6"
        style={{ borderColor: `rgba(${rgb}, 0.08)` }}
      >
        <h4
          className="text-lg mb-1"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
        >
          Change Password
        </h4>
        <p className="text-sm mb-6" style={{ color: '#8A8578' }}>
          Update your password to keep your account secure
        </p>
        <div className="space-y-4 max-w-md">
          {[
            { label: 'Current Password', placeholder: 'Enter current password' },
            { label: 'New Password', placeholder: 'Enter new password' },
            { label: 'Confirm New Password', placeholder: 'Confirm new password' },
          ].map((field) => (
            <div key={field.label}>
              <label
                className="block text-xs font-medium uppercase tracking-wider mb-2"
                style={{ color: '#8A8578', fontFamily: 'DM Sans, sans-serif' }}
              >
                {field.label}
              </label>
              <input
                type="password"
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: `rgba(${rgb}, 0.15)`,
                  fontFamily: 'DM Sans, sans-serif',
                }}
              />
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-white rounded-lg text-sm font-medium mt-2"
            style={{ background: primary, fontFamily: 'DM Sans, sans-serif' }}
          >
            Update Password
          </motion.button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div
        className="bg-white rounded-xl border p-6"
        style={{ borderColor: `rgba(${rgb}, 0.08)` }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4
              className="text-lg mb-1"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
            >
              Two-Factor Authentication
            </h4>
            <p className="text-sm" style={{ color: '#8A8578' }}>
              Add an extra layer of security to your account
            </p>
          </div>
          <ToggleSwitch
            enabled={twoFactor}
            onToggle={() => setTwoFactor(!twoFactor)}
            primary={primary}
            rgb={rgb}
          />
        </div>
      </div>

      {/* Active Sessions */}
      <div
        className="bg-white rounded-xl border p-6"
        style={{ borderColor: `rgba(${rgb}, 0.08)` }}
      >
        <h4
          className="text-lg mb-1"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
        >
          Active Sessions
        </h4>
        <p className="text-sm mb-5" style={{ color: '#8A8578' }}>
          Devices currently logged in to your account
        </p>
        <div className="space-y-3">
          {[
            { device: 'Chrome on macOS', location: 'San Francisco, CA', time: 'Active now', current: true },
            { device: 'Safari on iPhone', location: 'San Francisco, CA', time: 'Last active 2 hours ago', current: false },
            { device: 'Firefox on Windows', location: 'New York, NY', time: 'Last active 3 days ago', current: false },
          ].map((session, index) => (
            <motion.div
              key={session.device}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="flex items-center justify-between p-4 rounded-lg border"
              style={{ borderColor: `rgba(${rgb}, 0.08)` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: session.current ? '#3D7B5F' : '#D1D5DB' }}
                />
                <div>
                  <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {session.device}
                    {session.current && (
                      <span
                        className="ml-2 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `rgba(${rgb}, 0.08)`, color: primary }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: '#8A8578' }}>
                    {session.location} &middot; {session.time}
                  </div>
                </div>
              </div>
              {!session.current && (
                <button
                  className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
                  style={{
                    borderColor: `rgba(${rgb}, 0.15)`,
                    color: primary,
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  Revoke
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderPlaceholder = (title: string) => (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl border p-12 text-center"
      style={{ borderColor: `rgba(${rgb}, 0.08)` }}
    >
      <div
        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
        style={{ background: `rgba(${rgb}, 0.08)` }}
      >
        {activeSection === 'appearance' && <Palette className="w-7 h-7" style={{ color: primary }} />}
        {activeSection === 'organization' && <Globe className="w-7 h-7" style={{ color: primary }} />}
        {activeSection === 'integrations' && <Key className="w-7 h-7" style={{ color: primary }} />}
      </div>
      <h4
        className="text-xl mb-2"
        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
      >
        {title}
      </h4>
      <p className="text-sm" style={{ color: '#8A8578' }}>
        This section is coming soon.
      </p>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfile();
      case 'notifications':
        return renderNotifications();
      case 'security':
        return renderSecurity();
      case 'appearance':
        return renderPlaceholder('Appearance');
      case 'organization':
        return renderPlaceholder('Organization');
      case 'integrations':
        return renderPlaceholder('Integrations');
      default:
        return renderProfile();
    }
  };

  return (
    <motion.div
      className="p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.2em] mb-2"
            style={{ color: primary, opacity: 0.6, fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
          >
            Account
          </p>
          <h1
            className="text-2xl sm:text-3xl mb-2"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 400, color: '#2C2A25' }}
          >
            Settings
          </h1>
          <p className="text-sm" style={{ color: '#8A8578' }}>
            Manage your account and preferences
          </p>
        </motion.div>

        {/* Mobile Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:hidden flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide"
        >
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: activeSection === item.id ? `rgba(${rgb}, 0.1)` : 'transparent',
                color: activeSection === item.id ? primary : '#8A8578',
                border: `1px solid ${activeSection === item.id ? `rgba(${rgb}, 0.2)` : 'transparent'}`,
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block w-60 flex-shrink-0"
          >
            <div
              className="bg-white rounded-xl border p-3 sticky top-8"
              style={{ borderColor: `rgba(${rgb}, 0.08)` }}
            >
              <nav className="space-y-1">
                {sidebarItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 + index * 0.04 }}
                    onClick={() => setActiveSection(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
                    style={{
                      background: activeSection === item.id ? `rgba(${rgb}, 0.08)` : 'transparent',
                      color: activeSection === item.id ? primary : '#8A8578',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

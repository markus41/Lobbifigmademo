/**
 * Settings Page
 *
 * Organization and account settings.
 * Note: Org settings are admin-controlled, not guest-accessible.
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { Organization, Account } from '../../data/themes';

interface SettingsPageProps {
  organization: Organization;
  account: Account;
}

// ============================================================================
// ICONS
// ============================================================================

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const LinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);

const PaletteIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="8" r="2" fill="currentColor" />
    <circle cx="8" cy="14" r="2" fill="currentColor" />
    <circle cx="16" cy="14" r="2" fill="currentColor" />
  </svg>
);

const KeyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

// ============================================================================
// SETTING SECTION
// ============================================================================

interface SettingSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  organization: Organization;
}

function SettingSection({ title, description, icon, children, organization }: SettingSectionProps) {
  return (
    <div className="bg-white rounded-xl border p-6" style={{ borderColor: '#EDE8DD' }}>
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `rgba(${organization.theme.primaryRgb}, 0.1)` }}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// ============================================================================
// FORM COMPONENTS
// ============================================================================

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  organization: Organization;
}

function Toggle({ label, description, checked, onChange, organization }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? '' : 'bg-gray-200'
        }`}
        style={{ backgroundColor: checked ? organization.theme.primary : undefined }}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  organization: Organization;
}

function InputField({ label, value, onChange, type = 'text', placeholder, organization }: InputFieldProps) {
  return (
    <div className="py-3">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-gray-50 border rounded-lg text-sm focus:outline-none transition-all"
        style={{ borderColor: '#EDE8DD' }}
        onFocus={(e) => {
          e.target.style.borderColor = organization.theme.primary;
          e.target.style.boxShadow = `0 0 0 3px rgba(${organization.theme.primaryRgb}, 0.1)`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#EDE8DD';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function SettingsPage({ organization, account }: SettingsPageProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    twoFactor: true,
    sessionAlerts: true,
    darkMode: false,
    compactView: false,
  });

  const [profile, setProfile] = useState({
    name: account.name,
    email: account.email,
    phone: '+1 (555) 123-4567',
    timezone: 'America/Los_Angeles',
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-light mb-2"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            color: '#2C2A25',
          }}
        >
          Settings
        </h1>
        <p className="text-gray-500">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <SettingSection
          title="Profile"
          description="Your personal account information"
          icon={<UserIcon className="w-5 h-5" style={{ color: organization.theme.primary }} />}
          organization={organization}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              value={profile.name}
              onChange={(v) => setProfile({ ...profile, name: v })}
              organization={organization}
            />
            <InputField
              label="Email Address"
              value={profile.email}
              onChange={(v) => setProfile({ ...profile, email: v })}
              type="email"
              organization={organization}
            />
            <InputField
              label="Phone Number"
              value={profile.phone}
              onChange={(v) => setProfile({ ...profile, phone: v })}
              type="tel"
              organization={organization}
            />
            <InputField
              label="Timezone"
              value={profile.timezone}
              onChange={(v) => setProfile({ ...profile, timezone: v })}
              organization={organization}
            />
          </div>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: '#EDE8DD' }}>
            <button
              className="px-6 py-2.5 rounded-lg text-white font-medium text-sm"
              style={{ background: organization.theme.gradientBtn }}
            >
              Save Changes
            </button>
          </div>
        </SettingSection>

        {/* Notifications */}
        <SettingSection
          title="Notifications"
          description="Configure how you receive updates"
          icon={<BellIcon className="w-5 h-5" style={{ color: organization.theme.primary }} />}
          organization={organization}
        >
          <div className="divide-y" style={{ borderColor: '#EDE8DD' }}>
            <Toggle
              label="Email Notifications"
              description="Receive updates via email"
              checked={settings.emailNotifications}
              onChange={(v) => setSettings({ ...settings, emailNotifications: v })}
              organization={organization}
            />
            <Toggle
              label="Push Notifications"
              description="Browser and mobile notifications"
              checked={settings.pushNotifications}
              onChange={(v) => setSettings({ ...settings, pushNotifications: v })}
              organization={organization}
            />
            <Toggle
              label="Session Alerts"
              description="Get notified of new login sessions"
              checked={settings.sessionAlerts}
              onChange={(v) => setSettings({ ...settings, sessionAlerts: v })}
              organization={organization}
            />
          </div>
        </SettingSection>

        {/* Security */}
        <SettingSection
          title="Security"
          description="Protect your account"
          icon={<ShieldIcon className="w-5 h-5" style={{ color: organization.theme.primary }} />}
          organization={organization}
        >
          <div className="divide-y" style={{ borderColor: '#EDE8DD' }}>
            <Toggle
              label="Two-Factor Authentication"
              description="Add an extra layer of security"
              checked={settings.twoFactor}
              onChange={(v) => setSettings({ ...settings, twoFactor: v })}
              organization={organization}
            />
          </div>
          <div className="mt-4 pt-4 border-t flex gap-3" style={{ borderColor: '#EDE8DD' }}>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                border: `1px solid rgba(${organization.theme.primaryRgb}, 0.3)`,
                color: organization.theme.primary,
              }}
            >
              <KeyIcon className="w-4 h-4 inline mr-2" />
              Change Password
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                border: `1px solid rgba(${organization.theme.primaryRgb}, 0.3)`,
                color: organization.theme.primary,
              }}
            >
              <GlobeIcon className="w-4 h-4 inline mr-2" />
              Active Sessions
            </button>
          </div>
        </SettingSection>

        {/* Appearance */}
        <SettingSection
          title="Appearance"
          description="Customize your experience"
          icon={<PaletteIcon className="w-5 h-5" style={{ color: organization.theme.primary }} />}
          organization={organization}
        >
          <div className="divide-y" style={{ borderColor: '#EDE8DD' }}>
            <Toggle
              label="Dark Mode"
              description="Use dark color scheme"
              checked={settings.darkMode}
              onChange={(v) => setSettings({ ...settings, darkMode: v })}
              organization={organization}
            />
            <Toggle
              label="Compact View"
              description="Show more content in less space"
              checked={settings.compactView}
              onChange={(v) => setSettings({ ...settings, compactView: v })}
              organization={organization}
            />
          </div>
        </SettingSection>

        {/* Connected Accounts */}
        <SettingSection
          title="Connected Accounts"
          description="Link external services"
          icon={<LinkIcon className="w-5 h-5" style={{ color: organization.theme.primary }} />}
          organization={organization}
        >
          <div className="space-y-3">
            {[
              { name: 'LinkedIn', connected: true, icon: '🔗' },
              { name: 'Google', connected: true, icon: '🔍' },
              { name: 'Microsoft', connected: false, icon: '🪟' },
            ].map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{service.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-500">
                      {service.connected ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                <button
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                    service.connected
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {service.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </SettingSection>

        {/* Billing */}
        <SettingSection
          title="Billing & Subscription"
          description="Manage your membership and payments"
          icon={<CreditCardIcon className="w-5 h-5" style={{ color: organization.theme.primary }} />}
          organization={organization}
        >
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Professional Membership</p>
                <p className="text-sm text-gray-500">$250/year • Renews March 15, 2025</p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: `rgba(${organization.theme.primaryRgb}, 0.1)`,
                  color: organization.theme.primary,
                }}
              >
                Active
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                background: organization.theme.gradientBtn,
                color: 'white',
              }}
            >
              Upgrade Plan
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                border: `1px solid rgba(${organization.theme.primaryRgb}, 0.3)`,
                color: organization.theme.primary,
              }}
            >
              View Invoices
            </button>
          </div>
        </SettingSection>
      </div>
    </div>
  );
}

export default SettingsPage;

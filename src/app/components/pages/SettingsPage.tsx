/**
 * Settings Page
 *
 * Organization and account settings.
 * Note: Org settings are admin-controlled, not guest-accessible.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { toast } from '@/lib/notifications';
import type { Organization, Account } from '../../data/themes';

interface SettingsPageProps {
  organization: Organization;
  account: Account;
  onUpdateOrganizationTheme?: (themePatch: Partial<Organization['theme']>) => void;
}

// ============================================================================
// ICONS
// ============================================================================

type IconProps = { className?: string; style?: React.CSSProperties };

const UserIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const BellIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const ShieldIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CreditCardIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const LinkIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);

const PaletteIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="8" r="2" fill="currentColor" />
    <circle cx="8" cy="14" r="2" fill="currentColor" />
    <circle cx="16" cy="14" r="2" fill="currentColor" />
  </svg>
);

const KeyIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const GlobeIcon = ({ className, style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <div className="bg-white rounded-xl border border-[#EDE8DD] p-6">
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
        className="w-full px-4 py-2.5 bg-gray-50 border border-[#EDE8DD] rounded-lg text-sm focus:outline-none transition-all"
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

function clampByte(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hexToRgbString(hex: string): string | null {
  const normalized = hex.trim().replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null;
  }
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

function mixHexWithWhite(hex: string, whiteRatio: number): string {
  const normalized = hex.trim().replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return hex;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const mixedR = clampByte(r * (1 - whiteRatio) + 255 * whiteRatio);
  const mixedG = clampByte(g * (1 - whiteRatio) + 255 * whiteRatio);
  const mixedB = clampByte(b * (1 - whiteRatio) + 255 * whiteRatio);
  return `#${mixedR.toString(16).padStart(2, '0')}${mixedG.toString(16).padStart(2, '0')}${mixedB.toString(16).padStart(2, '0')}`.toUpperCase();
}

function mixHexWithBlack(hex: string, blackRatio: number): string {
  const normalized = hex.trim().replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return hex;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const mixedR = clampByte(r * (1 - blackRatio));
  const mixedG = clampByte(g * (1 - blackRatio));
  const mixedB = clampByte(b * (1 - blackRatio));
  return `#${mixedR.toString(16).padStart(2, '0')}${mixedG.toString(16).padStart(2, '0')}${mixedB.toString(16).padStart(2, '0')}`.toUpperCase();
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function SettingsPage({ organization, account, onUpdateOrganizationTheme }: SettingsPageProps) {
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
  const [designDraft, setDesignDraft] = useState({
    primary: organization.theme.primary,
    secondary: organization.theme.secondary,
    accent: organization.theme.accent,
    fontDisplay: organization.theme.fontDisplay,
    fontBody: organization.theme.fontBody,
    borderRadius: organization.theme.borderRadius,
    buttonStyle: organization.theme.buttonStyle,
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Apply dark mode to document when toggle changes
  useEffect(() => {
    const mode = settings.darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);

    // Also apply to the body for full coverage
    if (settings.darkMode) {
      document.body.style.colorScheme = 'dark';
      document.body.classList.add('dark');
    } else {
      document.body.style.colorScheme = 'light';
      document.body.classList.remove('dark');
    }
  }, [settings.darkMode]);

  useEffect(() => {
    setDesignDraft({
      primary: organization.theme.primary,
      secondary: organization.theme.secondary,
      accent: organization.theme.accent,
      fontDisplay: organization.theme.fontDisplay,
      fontBody: organization.theme.fontBody,
      borderRadius: organization.theme.borderRadius,
      buttonStyle: organization.theme.buttonStyle,
    });
  }, [organization.id, organization.theme]);

  const handleSaveProfile = () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };

  const handleApplyDesign = () => {
    if (!onUpdateOrganizationTheme) {
      toast.warning('Theme updates are not enabled for this view.');
      return;
    }

    const primaryRgb = hexToRgbString(designDraft.primary);
    const secondaryRgb = hexToRgbString(designDraft.secondary);
    const accentRgb = hexToRgbString(designDraft.accent);

    if (!primaryRgb || !secondaryRgb || !accentRgb) {
      toast.error('Please use valid 6-digit hex colors for all palette fields.');
      return;
    }

    const nextPrimaryLight = mixHexWithWhite(designDraft.primary, 0.2);
    const nextPrimaryPale = mixHexWithWhite(designDraft.primary, 0.78);
    const nextPrimaryDark = mixHexWithBlack(designDraft.primary, 0.28);
    const nextSecondaryLight = mixHexWithWhite(designDraft.secondary, 0.2);
    const nextSecondaryDark = mixHexWithBlack(designDraft.secondary, 0.3);
    const nextAccentLight = mixHexWithWhite(designDraft.accent, 0.24);
    const nextAccentDark = mixHexWithBlack(designDraft.accent, 0.3);

    onUpdateOrganizationTheme({
      primary: designDraft.primary.toUpperCase(),
      primaryLight: nextPrimaryLight,
      primaryPale: nextPrimaryPale,
      primaryDark: nextPrimaryDark,
      primaryRgb,
      secondary: designDraft.secondary.toUpperCase(),
      secondaryLight: nextSecondaryLight,
      secondaryDark: nextSecondaryDark,
      secondaryRgb,
      accent: designDraft.accent.toUpperCase(),
      accentLight: nextAccentLight,
      accentDark: nextAccentDark,
      accentRgb,
      gradientBtn: `linear-gradient(135deg, ${nextPrimaryDark}, ${designDraft.primary.toUpperCase()})`,
      avatarBg: `linear-gradient(135deg, ${designDraft.primary.toUpperCase()}, ${nextPrimaryDark})`,
      borderRadius: designDraft.borderRadius as Organization['theme']['borderRadius'],
      buttonStyle: designDraft.buttonStyle as Organization['theme']['buttonStyle'],
      fontDisplay: designDraft.fontDisplay,
      fontBody: designDraft.fontBody,
    });

    toast.success('Organization UI design updated.');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-light mb-2 text-[#2C2A25]"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
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
          <div className="mt-4 pt-4 border-t border-[#EDE8DD] flex items-center gap-3">
            <button
              className="px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-all disabled:opacity-50"
              style={{ background: organization.theme.gradientBtn }}
              onClick={handleSaveProfile}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
            </button>
            {saveStatus === 'saved' && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm text-green-600 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Changes saved!
              </motion.span>
            )}
          </div>
        </SettingSection>

        {/* Notifications */}
        <SettingSection
          title="Notifications"
          description="Configure how you receive updates"
          icon={<BellIcon className="w-5 h-5" style={{ color: organization.theme.primary }} />}
          organization={organization}
        >
          <div className="divide-y divide-[#EDE8DD]">
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
          <div className="divide-y divide-[#EDE8DD]">
            <Toggle
              label="Two-Factor Authentication"
              description="Add an extra layer of security"
              checked={settings.twoFactor}
              onChange={(v) => setSettings({ ...settings, twoFactor: v })}
              organization={organization}
            />
          </div>
          <div className="mt-4 pt-4 border-t border-[#EDE8DD] flex gap-3">
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
              style={{
                border: `1px solid rgba(${organization.theme.primaryRgb}, 0.3)`,
                color: organization.theme.primary,
              }}
              onClick={() => toast.info('Password change feature coming soon!')}
            >
              <KeyIcon className="w-4 h-4 inline mr-2" />
              Change Password
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-80"
              style={{
                border: `1px solid rgba(${organization.theme.primaryRgb}, 0.3)`,
                color: organization.theme.primary,
              }}
              onClick={() => toast.info('Active sessions: 1 session (this device)')}
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
          <div className="divide-y divide-[#EDE8DD]">
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

        {/* Organization UI Design */}
        <SettingSection
          title="Organization UI Design (Admin)"
          description="Adjust brand colors, typography, and component style for this organization"
          icon={<PaletteIcon className="w-5 h-5" style={{ color: organization.theme.primary }} />}
          organization={organization}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Primary Color"
              value={designDraft.primary}
              onChange={(v) => setDesignDraft({ ...designDraft, primary: v })}
              placeholder="#D4AF37"
              organization={organization}
            />
            <InputField
              label="Secondary Color"
              value={designDraft.secondary}
              onChange={(v) => setDesignDraft({ ...designDraft, secondary: v })}
              placeholder="#1A1A2E"
              organization={organization}
            />
            <InputField
              label="Accent Color"
              value={designDraft.accent}
              onChange={(v) => setDesignDraft({ ...designDraft, accent: v })}
              placeholder="#C9A227"
              organization={organization}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="py-3">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Font</label>
              <select
                value={designDraft.fontDisplay}
                onChange={(e) => setDesignDraft({ ...designDraft, fontDisplay: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#EDE8DD] rounded-lg text-sm"
              >
                <option value='"Playfair Display", Georgia, serif'>Playfair Display</option>
                <option value='"Cormorant Garamond", Georgia, serif'>Cormorant Garamond</option>
                <option value='"Merriweather", Georgia, serif'>Merriweather</option>
                <option value='"DM Serif Display", Georgia, serif'>DM Serif Display</option>
              </select>
            </div>
            <div className="py-3">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Body Font</label>
              <select
                value={designDraft.fontBody}
                onChange={(e) => setDesignDraft({ ...designDraft, fontBody: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#EDE8DD] rounded-lg text-sm"
              >
                <option value='"Inter", system-ui, sans-serif'>Inter</option>
                <option value='"Sora", "DM Sans", system-ui, sans-serif'>Sora</option>
                <option value='"Poppins", system-ui, sans-serif'>Poppins</option>
                <option value='"Open Sans", system-ui, sans-serif'>Open Sans</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="py-3">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Border Radius</label>
              <select
                value={designDraft.borderRadius}
                onChange={(e) => setDesignDraft({ ...designDraft, borderRadius: e.target.value as typeof designDraft.borderRadius })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#EDE8DD] rounded-lg text-sm"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">XL</option>
                <option value="2xl">2XL</option>
                <option value="full">Full</option>
              </select>
            </div>
            <div className="py-3">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Button Shape</label>
              <select
                value={designDraft.buttonStyle}
                onChange={(e) => setDesignDraft({ ...designDraft, buttonStyle: e.target.value as typeof designDraft.buttonStyle })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-[#EDE8DD] rounded-lg text-sm"
              >
                <option value="rounded">Rounded</option>
                <option value="pill">Pill</option>
                <option value="sharp">Sharp</option>
                <option value="soft">Soft</option>
              </select>
            </div>
          </div>

          <div className="mt-2 mb-4">
            <p className="text-xs text-gray-500 mb-2">Preview Palette</p>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-md border border-[#EDE8DD]" style={{ background: designDraft.primary }} />
              <span className="w-8 h-8 rounded-md border border-[#EDE8DD]" style={{ background: designDraft.secondary }} />
              <span className="w-8 h-8 rounded-md border border-[#EDE8DD]" style={{ background: designDraft.accent }} />
            </div>
          </div>

          <div className="pt-4 border-t border-[#EDE8DD] flex items-center gap-3">
            <button
              className="px-6 py-2 rounded-lg text-white font-medium text-sm transition-all"
              style={{ background: organization.theme.gradientBtn }}
              onClick={handleApplyDesign}
            >
              Apply Organization Design
            </button>
            <button
              className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{
                border: `1px solid rgba(${organization.theme.primaryRgb}, 0.3)`,
                color: organization.theme.primary,
              }}
              onClick={() => {
                setDesignDraft({
                  primary: organization.theme.primary,
                  secondary: organization.theme.secondary,
                  accent: organization.theme.accent,
                  fontDisplay: organization.theme.fontDisplay,
                  fontBody: organization.theme.fontBody,
                  borderRadius: organization.theme.borderRadius,
                  buttonStyle: organization.theme.buttonStyle,
                });
                toast.info('Design draft reset to current organization theme.');
              }}
            >
              Reset Draft
            </button>
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
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    service.connected
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (service.connected) {
                      toast.warning(`${service.name} disconnection requires confirmation`);
                    } else {
                      toast.info(`${service.name} connection coming soon!`);
                    }
                  }}
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
              className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-white"
              style={{
                background: organization.theme.gradientBtn,
              }}
              onClick={() => toast.info('Upgrade plans available soon!')}
            >
              Upgrade Plan
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
              style={{
                border: `1px solid rgba(${organization.theme.primaryRgb}, 0.3)`,
                color: organization.theme.primary,
              }}
              onClick={() => toast.info('Invoice history: 2 invoices on file')}
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

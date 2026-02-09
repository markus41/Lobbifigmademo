import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Organization, Account } from '@/app/data/themes';
import {
  getOrgColors,
  getOrgFonts,
  getCardEntranceVariants,
  getCardClasses,
  getButtonClasses,
  getInputClasses,
} from '../utils/themeMapper';

interface OrgLoginProps {
  account: Account;
  organization: Organization;
  onLogin: () => void;
}

type LoginMethod = 'password' | 'magic-link' | 'social';

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
const MicrosoftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#F25022" d="M1 1h10v10H1z"/><path fill="#00A4EF" d="M1 13h10v10H1z"/>
    <path fill="#7FBA00" d="M13 1h10v10H13z"/><path fill="#FFB900" d="M13 13h10v10H13z"/>
  </svg>
);
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const AppleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);
const MagicWandIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/>
    <path d="M17.8 11.8L19 13"/><path d="M15 9h.01"/><path d="M17.8 6.2L19 5"/>
    <path d="M3 21l9-9"/><path d="M12.2 6.2L11 5"/>
  </svg>
);

export function OrgLogin({ account, organization, onLogin }: OrgLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('password');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const theme = organization.theme;
  const colors = useMemo(() => getOrgColors(organization), [organization]);
  const fonts = useMemo(() => getOrgFonts(organization), [organization]);
  const cardEntrance = useMemo(() => getCardEntranceVariants(theme.animationStyle), [theme.animationStyle]);
  const cardClasses = useMemo(() => getCardClasses(theme), [theme]);
  const buttonClasses = useMemo(() => getButtonClasses(theme), [theme]);
  const inputClasses = useMemo(() => getInputClasses(theme), [theme]);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const dur = theme.animationStyle === 'energetic' ? 0.5 : theme.animationStyle === 'elegant' ? 1.1 : 0.8;
  const logoShape = theme.logoShape;

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setIsLoggingIn(true); setTimeout(onLogin, 800); };
  const handleMagicLinkSubmit = (e: React.FormEvent) => { e.preventDefault(); setIsLoggingIn(true); setTimeout(() => { setMagicLinkSent(true); setIsLoggingIn(false); }, 1200); };
  const handleSocialLogin = (_p: string) => { setIsLoggingIn(true); setTimeout(onLogin, 1000); };
  const handleMagicLinkContinue = () => { setIsLoggingIn(true); setTimeout(onLogin, 500); };

  const inputStyle = (rgbVal: string) => ({
    background: `rgba(${rgbVal}, 0.03)`,
    borderColor: `rgba(${rgbVal}, 0.18)`,
    color: colors.textPrimary,
    fontFamily: fonts.body,
  });

  const focusHandlers = (rgbVal: string) => ({
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.borderColor = `rgba(${rgbVal}, 0.5)`;
      e.target.style.boxShadow = `0 0 0 4px rgba(${rgbVal}, 0.08), 0 4px 16px rgba(0,0,0,0.06)`;
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.borderColor = `rgba(${rgbVal}, 0.18)`;
      e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: dur, ease }}
      className="fixed inset-0 z-20 flex items-center justify-center p-6"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${theme.primaryRgb}, 0.1), transparent 70%)` }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Card */}
      <motion.div
        className="w-full max-w-md relative"
        initial={cardEntrance.initial}
        animate={cardEntrance.animate}
        exit={{ y: -20, scale: 0.96, opacity: 0 }}
        transition={{ duration: dur, ease }}
      >
        <div
          className={`relative px-8 sm:px-10 py-10 sm:py-12 rounded-3xl overflow-hidden ${cardClasses}`}
          style={{
            background: `linear-gradient(170deg, rgba(255,255,255,0.97) 0%, rgba(${theme.primaryRgb},0.06) 100%)`,
            backdropFilter: 'blur(40px)',
            border: `1.5px solid rgba(${theme.primaryRgb}, 0.2)`,
            boxShadow: `0 32px 64px -16px rgba(0,0,0,0.12), 0 0 0 1px rgba(${theme.primaryRgb}, 0.08), inset 0 1px 0 rgba(255,255,255,0.9)`,
          }}
        >
          {/* Top accent */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent 10%, ${colors.primary} 50%, transparent 90%)` }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease }}
          />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            {/* Logo */}
            <motion.div
              layoutId="org-logo"
              className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 relative overflow-hidden"
              style={{
                background: theme.gradientBtn,
                borderRadius: logoShape === 'diamond' ? '16px' : logoShape === 'hexagon' ? '12px' : logoShape === 'crown' ? '20px 20px 8px 8px' : '50%',
                transform: logoShape === 'diamond' ? 'rotate(45deg)' : 'none',
                boxShadow: `0 12px 32px -4px rgba(${theme.primaryRgb}, 0.35)`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: logoShape === 'diamond' ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 160, delay: 0.2 }}
            >
              <span className="relative z-10 text-3xl" style={{
                fontFamily: fonts.display, fontWeight: 500, fontStyle: 'italic',
                color: theme.textInverse,
                transform: logoShape === 'diamond' ? 'rotate(-45deg)' : 'none',
              }}>
                {organization.logoLetter}
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
            </motion.div>

            <motion.h2
              className="text-2xl mb-2 tracking-tight"
              style={{ fontFamily: fonts.display, fontWeight: fonts.weightHeading, color: colors.textPrimary }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease }}
            >
              {organization.name}
            </motion.h2>

            <motion.p
              className="text-sm italic opacity-80"
              style={{ fontFamily: fonts.display, color: colors.primary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              {'"'}{organization.motto}{'"'}
            </motion.p>

            <motion.div
              className="w-12 h-px mx-auto mt-5"
              style={{ background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.6, ease }}
            />
          </div>

          {/* Login Method Tabs */}
          <motion.div
            className="flex gap-1 mb-7 p-1 rounded-xl relative z-10"
            style={{ background: `rgba(${theme.primaryRgb}, 0.05)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {([
              { id: 'password', label: 'Password' },
              { id: 'social', label: 'SSO' },
              { id: 'magic-link', label: 'Magic Link' },
            ] as const).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => { setLoginMethod(m.id); setMagicLinkSent(false); }}
                className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: loginMethod === m.id ? theme.gradientBtn : 'transparent',
                  color: loginMethod === m.id ? theme.textInverse : colors.textSecondary,
                  boxShadow: loginMethod === m.id ? `0 2px 8px rgba(${theme.primaryRgb}, 0.25)` : 'none',
                }}
              >
                {m.label}
              </button>
            ))}
          </motion.div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {loginMethod === 'password' && (
              <motion.form
                key="pw"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 relative z-10"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.15 }}
              >
                {/* Email */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] mb-2 font-semibold" style={{ color: `rgba(${theme.primaryRgb}, 0.6)` }}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-35" style={{ color: colors.primary }} />
                    <input
                      type="email" value={account.email} readOnly
                      className={`w-full pl-11 pr-4 py-4 border-[1.5px] text-sm outline-none cursor-not-allowed transition-all rounded-xl shadow-sm ${inputClasses}`}
                      style={inputStyle(theme.primaryRgb)}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.15em] mb-2 font-semibold" style={{ color: `rgba(${theme.primaryRgb}, 0.6)` }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-35" style={{ color: colors.primary }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password" required
                      className={`w-full pl-11 pr-12 py-4 border-[1.5px] text-sm outline-none transition-all rounded-xl shadow-sm ${inputClasses}`}
                      style={inputStyle(theme.primaryRgb)}
                      {...focusHandlers(theme.primaryRgb)}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
                      style={{ color: colors.primary }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember / Forgot */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded accent-current cursor-pointer" style={{ accentColor: colors.primary }} />
                    <span style={{ color: colors.textMuted }}>Remember me</span>
                  </label>
                  <button type="button"
                    onClick={() => toast.success(`Password reset link sent to ${account.email}`)}
                    className="font-medium hover:underline cursor-pointer"
                    style={{ color: colors.primary }}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit" disabled={isLoggingIn || !password}
                  className={`relative w-full py-4 text-sm font-bold tracking-wider uppercase overflow-hidden transition-all disabled:opacity-40 disabled:cursor-not-allowed text-white mt-2 cursor-pointer ${buttonClasses}`}
                  style={{
                    background: theme.gradientBtn,
                    boxShadow: `0 8px 24px rgba(${theme.primaryRgb}, 0.25)`,
                  }}
                  whileHover={!isLoggingIn && password ? { y: -2, boxShadow: `0 14px 36px rgba(${theme.primaryRgb}, 0.35)` } : {}}
                  whileTap={!isLoggingIn && password ? { y: 0, scale: 0.98 } : {}}
                >
                  {isLoggingIn ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                      Entering...
                    </span>
                  ) : 'Enter The Lobbi'}
                  {!isLoggingIn && password && (
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-200%', '200%'] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }} />
                  )}
                </motion.button>
              </motion.form>
            )}

            {loginMethod === 'magic-link' && (
              <motion.div key="ml" className="flex flex-col gap-5 relative z-10"
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }}>
                {!magicLinkSent ? (
                  <form onSubmit={handleMagicLinkSubmit} className="flex flex-col gap-5">
                    <div className="text-center mb-2">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                        style={{ background: `rgba(${theme.primaryRgb}, 0.08)` }}>
                        <MagicWandIcon className="w-8 h-8" style={{ color: colors.primary }} />
                      </div>
                      <p className="text-sm" style={{ color: colors.textSecondary }}>
                        {"We'll send a magic link to your email for passwordless sign in"}
                      </p>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-35" style={{ color: colors.primary }} />
                      <input type="email" value={account.email} readOnly
                        className={`w-full pl-11 pr-4 py-4 border-[1.5px] text-sm outline-none cursor-not-allowed rounded-xl shadow-sm ${inputClasses}`}
                        style={inputStyle(theme.primaryRgb)} />
                    </div>
                    <motion.button type="submit" disabled={isLoggingIn}
                      className={`w-full py-4 text-sm font-bold tracking-wider uppercase text-white disabled:opacity-40 cursor-pointer ${buttonClasses}`}
                      style={{ background: theme.gradientBtn, boxShadow: `0 8px 24px rgba(${theme.primaryRgb}, 0.25)` }}
                      whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                      {isLoggingIn ? 'Sending...' : 'Send Magic Link'}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                    <motion.div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
                      style={{ background: `rgba(${theme.primaryRgb}, 0.08)` }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                      <svg className="w-8 h-8" style={{ color: colors.primary }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: colors.textPrimary }}>Check your email!</h3>
                    <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
                      {"Magic link sent to "}<strong>{account.email}</strong>
                    </p>
                    <motion.button onClick={handleMagicLinkContinue} disabled={isLoggingIn}
                      className={`w-full py-4 text-sm font-bold tracking-wider uppercase text-white disabled:opacity-40 cursor-pointer ${buttonClasses}`}
                      style={{ background: theme.gradientBtn }} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                      {isLoggingIn ? 'Entering...' : 'Demo: Continue Anyway'}
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {loginMethod === 'social' && (
              <motion.div key="sso" className="flex flex-col gap-4 relative z-10"
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }}>
                <p className="text-sm text-center mb-2" style={{ color: colors.textSecondary }}>
                  Sign in with your enterprise SSO provider
                </p>
                {[
                  { id: 'google', name: 'Google', icon: GoogleIcon, bg: '#fff', border: '#E5E7EB', text: '#374151' },
                  { id: 'microsoft', name: 'Microsoft', icon: MicrosoftIcon, bg: '#fff', border: '#E5E7EB', text: '#374151' },
                  { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIcon, bg: '#0A66C2', border: '#0A66C2', text: '#fff' },
                  { id: 'apple', name: 'Apple', icon: AppleIcon, bg: '#000', border: '#000', text: '#fff' },
                ].map((p) => (
                  <motion.button key={p.id} type="button" onClick={() => handleSocialLogin(p.id)} disabled={isLoggingIn}
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-3 border-[1.5px] transition-all disabled:opacity-40 cursor-pointer"
                    style={{ background: p.bg, borderColor: p.border, color: p.text }}
                    whileHover={{ y: -2, boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }} whileTap={{ y: 0 }}>
                    <p.icon className="w-5 h-5" />
                    Continue with {p.name}
                  </motion.button>
                ))}
                <div className="pt-3 border-t mt-2" style={{ borderColor: `rgba(${theme.primaryRgb}, 0.1)` }}>
                  <button type="button" onClick={() => handleSocialLogin('saml')}
                    className="w-full py-3 text-sm font-medium transition-colors cursor-pointer" style={{ color: colors.textSecondary }}>
                    Sign in with SAML / OIDC
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div className="mt-8 pt-5 border-t text-center relative z-10"
            style={{ borderColor: `rgba(${theme.primaryRgb}, 0.08)` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <span className="text-lg italic" style={{
                fontFamily: fonts.display,
                background: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>L</span>
              <span className="text-[9px] uppercase tracking-widest" style={{ color: `rgba(${theme.primaryRgb}, 0.4)` }}>
                Powered by The Lobbi
              </span>
            </div>
            <p className="text-[10px]" style={{ color: colors.textMuted }}>Demo mode: Any password will work</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

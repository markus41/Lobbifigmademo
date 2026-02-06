import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Wand2 } from 'lucide-react';
import { Organization, Account } from '@/app/data/themes';

interface OrgLoginProps {
  account: Account;
  organization: Organization;
  onLogin: () => void;
}

export function OrgLogin({ account, organization, onLogin }: OrgLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginMode, setLoginMode] = useState<'password' | 'magic-link' | 'forgot'>('password');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const rgb = organization.theme.primaryRgb;
  const primary = organization.theme.primary;

  // Dramatically different visual identities per org
  const getOrgVisuals = () => {
    switch (organization.id) {
      case 'luxe-haven':
        return {
          cardBg: 'linear-gradient(165deg, rgba(255,252,240,0.97) 0%, rgba(250,246,233,0.95) 50%, rgba(245,230,163,0.08) 100%)',
          cardRadius: '24px',
          borderStyle: 'double' as const,
          borderWidth: '3px',
          inputRadius: '12px',
          pattern: (
            <>
              {/* Art Deco diamond pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="luxePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                  <circle cx="10" cy="10" r="1" fill="#D4AF37" />
                </pattern>
                <rect width="100" height="100" fill="url(#luxePattern)" />
              </svg>
              {/* Gold corners */}
              <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 rounded-tl-lg" style={{ borderColor: 'rgba(212,175,55,0.2)' }} />
              <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 rounded-tr-lg" style={{ borderColor: 'rgba(212,175,55,0.2)' }} />
              <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 rounded-bl-lg" style={{ borderColor: 'rgba(212,175,55,0.2)' }} />
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 rounded-br-lg" style={{ borderColor: 'rgba(212,175,55,0.2)' }} />
            </>
          ),
          logoShape: 'rounded-xl rotate-45',
          logoInnerRotate: '-rotate-45',
          headerFont: 'Cormorant Garamond, Georgia, serif',
          accentElement: (
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, transparent, ${primary})` }} />
              <div className="w-2 h-2 rotate-45" style={{ background: primary, opacity: 0.4 }} />
              <div className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(90deg, ${primary}, transparent)` }} />
            </div>
          ),
        };
      case 'pacific-club':
        return {
          cardBg: 'linear-gradient(180deg, rgba(240,248,255,0.97) 0%, rgba(255,255,255,0.95) 40%, rgba(168,212,232,0.06) 100%)',
          cardRadius: '16px',
          borderStyle: 'solid' as const,
          borderWidth: '1px',
          inputRadius: '10px',
          pattern: (
            <>
              {/* Wave pattern at top */}
              <svg className="absolute top-0 left-0 right-0 h-32 opacity-[0.06]" viewBox="0 0 400 120" preserveAspectRatio="none">
                <path d="M0,60 Q50,20 100,60 Q150,100 200,60 Q250,20 300,60 Q350,100 400,60 L400,0 L0,0 Z" fill="#2E6B8A" />
                <path d="M0,80 Q50,40 100,80 Q150,120 200,80 Q250,40 300,80 Q350,120 400,80 L400,0 L0,0 Z" fill="#2E6B8A" opacity="0.5" />
              </svg>
              {/* Horizontal lines */}
              <div className="absolute left-8 right-8 top-[140px] h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.08), transparent)` }} />
              <div className="absolute left-12 right-12 top-[144px] h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.05), transparent)` }} />
            </>
          ),
          logoShape: 'rounded-full',
          logoInnerRotate: '',
          headerFont: 'DM Sans, sans-serif',
          accentElement: (
            <div className="flex items-center justify-center gap-2 my-4">
              <div className="w-8 h-px" style={{ background: primary }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: primary, opacity: 0.5 }} />
              <div className="w-8 h-px" style={{ background: primary }} />
            </div>
          ),
        };
      case 'summit-group':
        return {
          cardBg: 'linear-gradient(170deg, rgba(255,253,248,0.97) 0%, rgba(248,244,235,0.95) 50%, rgba(212,196,160,0.06) 100%)',
          cardRadius: '8px',
          borderStyle: 'solid' as const,
          borderWidth: '2px',
          inputRadius: '6px',
          pattern: (
            <>
              {/* Mountain/triangular pattern */}
              <svg className="absolute bottom-0 left-0 right-0 h-40 opacity-[0.04]" viewBox="0 0 400 160" preserveAspectRatio="none">
                <path d="M0,160 L80,40 L160,120 L240,20 L320,100 L400,60 L400,160 Z" fill="none" stroke="#8B6B3E" strokeWidth="1" />
                <path d="M0,160 L100,80 L200,140 L300,60 L400,120 L400,160 Z" fill="#8B6B3E" opacity="0.3" />
              </svg>
              {/* Ridge-style top border */}
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: `linear-gradient(90deg, ${organization.theme.primaryDark}, ${primary}, ${organization.theme.primaryLight}, ${primary}, ${organization.theme.primaryDark})`, opacity: 0.3 }} />
            </>
          ),
          logoShape: '',
          logoInnerRotate: '',
          headerFont: 'DM Sans, sans-serif',
          accentElement: (
            <div className="flex items-center justify-center my-4">
              <svg width="60" height="20" viewBox="0 0 60 20" style={{ opacity: 0.3 }}>
                <path d="M0,20 L15,4 L30,20" fill="none" stroke={primary} strokeWidth="1" />
                <path d="M20,20 L30,8 L40,20" fill="none" stroke={primary} strokeWidth="1" />
                <path d="M30,20 L45,4 L60,20" fill="none" stroke={primary} strokeWidth="1" />
              </svg>
            </div>
          ),
        };
      case 'verde-collective':
        return {
          cardBg: 'linear-gradient(165deg, rgba(248,255,252,0.97) 0%, rgba(255,255,255,0.95) 40%, rgba(168,220,196,0.06) 100%)',
          cardRadius: '28px',
          borderStyle: 'solid' as const,
          borderWidth: '1px',
          inputRadius: '16px',
          pattern: (
            <>
              {/* Organic leaf/vine pattern */}
              <svg className="absolute top-0 right-0 w-48 h-48 opacity-[0.05]" viewBox="0 0 200 200">
                <path d="M180,20 Q140,60 160,100 Q180,140 140,180" fill="none" stroke="#3D7B5F" strokeWidth="2" />
                <path d="M160,20 Q120,50 130,80 Q140,110 100,130" fill="none" stroke="#3D7B5F" strokeWidth="1.5" />
                <circle cx="160" cy="100" r="4" fill="#3D7B5F" opacity="0.5" />
                <circle cx="130" cy="80" r="3" fill="#3D7B5F" opacity="0.3" />
              </svg>
              <svg className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.04] rotate-180" viewBox="0 0 200 200">
                <path d="M180,20 Q140,60 160,100 Q180,140 140,180" fill="none" stroke="#3D7B5F" strokeWidth="2" />
                <path d="M160,20 Q120,50 130,80 Q140,110 100,130" fill="none" stroke="#3D7B5F" strokeWidth="1.5" />
              </svg>
            </>
          ),
          logoShape: 'rounded-[40%]',
          logoInnerRotate: '',
          headerFont: 'Cormorant Garamond, Georgia, serif',
          accentElement: (
            <div className="flex items-center justify-center gap-1.5 my-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="w-1 h-1 rounded-full" style={{ background: primary, opacity: 0.15 + i * 0.1 }} />
              ))}
              {[3, 2, 1, 0].map((i) => (
                <div key={`r-${i}`} className="w-1 h-1 rounded-full" style={{ background: primary, opacity: 0.15 + i * 0.1 }} />
              ))}
            </div>
          ),
        };
      case 'crown-estates':
        return {
          cardBg: 'linear-gradient(165deg, rgba(252,248,255,0.97) 0%, rgba(255,255,255,0.95) 40%, rgba(196,152,212,0.06) 100%)',
          cardRadius: '20px',
          borderStyle: 'solid' as const,
          borderWidth: '2px',
          inputRadius: '12px',
          pattern: (
            <>
              {/* Crown/regal pattern */}
              <svg className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-8 opacity-[0.08]" viewBox="0 0 120 30">
                <path d="M10,28 L10,10 L25,20 L40,5 L55,20 L70,5 L85,20 L100,10 L100,28 Z" fill="none" stroke="#6E3D7B" strokeWidth="1.5" />
                <circle cx="40" cy="5" r="2" fill="#6E3D7B" />
                <circle cx="70" cy="5" r="2" fill="#6E3D7B" />
                <circle cx="55" cy="3" r="2.5" fill="#6E3D7B" />
              </svg>
              {/* Ornate side borders */}
              <div className="absolute top-16 bottom-16 left-0 w-px" style={{ background: `linear-gradient(180deg, transparent, rgba(${rgb},0.12), transparent)` }} />
              <div className="absolute top-16 bottom-16 right-0 w-px" style={{ background: `linear-gradient(180deg, transparent, rgba(${rgb},0.12), transparent)` }} />
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t" style={{ borderColor: `rgba(${rgb},0.2)` }} />
              <div className="absolute top-3 right-3 w-4 h-4 border-r border-t" style={{ borderColor: `rgba(${rgb},0.2)` }} />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b" style={{ borderColor: `rgba(${rgb},0.2)` }} />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b" style={{ borderColor: `rgba(${rgb},0.2)` }} />
            </>
          ),
          logoShape: 'rounded-2xl',
          logoInnerRotate: '',
          headerFont: 'Cormorant Garamond, Georgia, serif',
          accentElement: (
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-10" style={{ background: `linear-gradient(90deg, transparent, ${primary})` }} />
              <svg width="16" height="12" viewBox="0 0 16 12" style={{ opacity: 0.4 }}>
                <path d="M1,11 L1,4 L4,7 L8,2 L12,7 L15,4 L15,11 Z" fill="none" stroke={primary} strokeWidth="1" />
              </svg>
              <div className="h-px w-10" style={{ background: `linear-gradient(90deg, ${primary}, transparent)` }} />
            </div>
          ),
        };
      default:
        return {
          cardBg: 'rgba(255, 255, 255, 0.95)',
          cardRadius: '16px',
          borderStyle: 'solid' as const,
          borderWidth: '1px',
          inputRadius: '12px',
          pattern: null,
          logoShape: 'rounded-full',
          logoInnerRotate: '',
          headerFont: 'DM Sans, sans-serif',
          accentElement: null,
        };
    }
  };

  const visuals = getOrgVisuals();

  // Hexagon clip for Summit
  const isHexagon = organization.id === 'summit-group';
  const hexClipStyle = isHexagon
    ? { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease }}
      className="fixed inset-0 z-20 flex items-center justify-center p-4"
    >
      {/* Org-specific ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, rgba(${rgb}, 0.10), transparent 70%)`,
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1.5 + Math.random() * 2}px`,
              height: `${1.5 + Math.random() * 2}px`,
              background: primary,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 40],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease,
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-[520px] relative"
        initial={{ y: 40, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -30, scale: 0.95 }}
        transition={{ duration: 1, ease }}
      >
        {/* Card */}
        <div
          className="relative overflow-hidden"
          style={{
            background: visuals.cardBg,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderColor: `rgba(${rgb}, 0.2)`,
            borderStyle: visuals.borderStyle,
            borderWidth: visuals.borderWidth,
            borderRadius: visuals.cardRadius,
            boxShadow: `0 30px 70px rgba(0,0,0,0.10), 0 0 0 1px rgba(${rgb}, 0.06), inset 0 2px 0 rgba(255,255,255,0.8)`,
            padding: 'clamp(1.5rem, 5vw, 3rem)',
          }}
        >
          {/* Org-specific pattern overlay */}
          {visuals.pattern}

          {/* Animated top accent bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${primary}, ${organization.theme.primaryLight}, ${primary}, transparent)`,
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease }}
          />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            {/* Org Logo */}
            <motion.div
              className={`inline-flex items-center justify-center w-20 h-20 mx-auto mb-5 ${isHexagon ? '' : visuals.logoShape} relative overflow-hidden`}
              style={{
                background: organization.theme.gradientBtn,
                ...hexClipStyle,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 160 }}
            >
              <div
                className="absolute inset-0"
                style={{ boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.2)', borderRadius: 'inherit' }}
              />
              <span
                className={`relative z-10 text-2xl text-white ${visuals.logoInnerRotate}`}
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                }}
              >
                {organization.logoLetter}
              </span>
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)', borderRadius: 'inherit' }}
              />
            </motion.div>

            <motion.p
              className="text-[10px] uppercase tracking-[0.3em] mb-2"
              style={{
                color: primary,
                opacity: 0.5,
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3 }}
            >
              {organization.identity.industry}
            </motion.p>

            <motion.h2
              className="text-[22px] sm:text-[28px] mb-1"
              style={{
                fontFamily: visuals.headerFont,
                fontWeight: 500,
                color: '#2C2A25',
                letterSpacing: '-0.01em',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {organization.identity.loginHeadline}
            </motion.h2>

            <motion.p
              className="text-[13px] mb-1"
              style={{
                color: '#8A8578',
                fontFamily: 'DM Sans, sans-serif',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {organization.identity.loginSubtext}
            </motion.p>

            {/* Org-specific accent divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {visuals.accentElement}
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                background: `rgba(${rgb}, 0.06)`,
                border: `1px solid rgba(${rgb}, 0.1)`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span
                className="text-[12px]"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontStyle: 'italic',
                  color: primary,
                  opacity: 0.8,
                }}
              >
                {organization.name}
              </span>
            </motion.div>
          </div>

          {/* Form Area */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {loginMode === 'password' && (
                <motion.form
                  key="password-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Email (Read-only) */}
                  <div>
                    <label
                      className="block text-xs uppercase tracking-widest mb-2 font-medium"
                      style={{ color: primary, opacity: 0.6, letterSpacing: '0.2em' }}
                    >
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px]"
                        style={{ color: primary, opacity: 0.35 }}
                      />
                      <input
                        type="email"
                        value={account.email}
                        readOnly
                        className="w-full pl-11 pr-5 py-3.5 border outline-none cursor-not-allowed"
                        style={{
                          background: `rgba(${rgb}, 0.03)`,
                          borderColor: `rgba(${rgb}, 0.12)`,
                          borderRadius: visuals.inputRadius,
                          color: '#2C2A25',
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      className="block text-xs uppercase tracking-widest mb-2 font-medium"
                      style={{ color: primary, opacity: 0.6, letterSpacing: '0.2em' }}
                    >
                      Password
                    </label>
                    <div className="relative group">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px]"
                        style={{ color: primary, opacity: 0.35 }}
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full pl-11 pr-14 py-3.5 bg-white border transition-all outline-none placeholder:text-[rgba(138,133,120,0.35)]"
                        style={{
                          borderColor: `rgba(${rgb}, 0.15)`,
                          borderRadius: visuals.inputRadius,
                          color: '#2C2A25',
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '14px',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = `rgba(${rgb}, 0.5)`;
                          e.target.style.boxShadow = `0 0 0 3px rgba(${rgb}, 0.06), 0 4px 16px rgba(${rgb}, 0.08)`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = `rgba(${rgb}, 0.15)`;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
                        style={{ color: primary, opacity: 0.4 }}
                      >
                        {showPassword ? <EyeOff className="w-[16px] h-[16px]" /> : <Eye className="w-[16px] h-[16px]" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="peer w-4 h-4 cursor-pointer appearance-none border rounded transition-all"
                          style={{ borderColor: `rgba(${rgb}, 0.25)` }}
                        />
                        <svg
                          className="absolute inset-0 w-4 h-4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                          style={{ color: primary }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span style={{ color: '#8A8578' }}>Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setLoginMode('forgot')}
                      className="transition-opacity hover:opacity-100"
                      style={{ color: primary, opacity: 0.6 }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoggingIn || !password}
                    className="relative w-full py-3.5 text-sm font-semibold tracking-wider uppercase overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    style={{
                      background: organization.theme.gradientBtn,
                      color: '#fff',
                      marginTop: '1.5rem',
                      boxShadow: `0 4px 16px rgba(${rgb}, 0.2)`,
                      borderRadius: visuals.inputRadius,
                    }}
                    whileHover={!isLoggingIn && password ? {
                      y: -2,
                      boxShadow: `0 8px 24px rgba(${rgb}, 0.3)`,
                      transition: { duration: 0.3 }
                    } : {}}
                    whileTap={!isLoggingIn && password ? {
                      y: -1,
                      transition: { duration: 0.1 }
                    } : {}}
                  >
                    {isLoggingIn ? (
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        Entering...
                      </div>
                    ) : (
                      'Enter The Lobbi'
                    )}

                    {/* Shimmer effect */}
                    {!isLoggingIn && password && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-200%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
                      />
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="flex-1 h-px" style={{ background: `rgba(${rgb}, 0.1)` }} />
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: '#B8B0A0' }}>or continue with</span>
                    <div className="flex-1 h-px" style={{ background: `rgba(${rgb}, 0.1)` }} />
                  </div>

                  {/* Social Auth */}
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { name: 'Google', svg: <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
                      { name: 'Microsoft', svg: <svg viewBox="0 0 24 24" className="w-4 h-4"><rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="13" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="13" width="10" height="10" fill="#00A4EF"/><rect x="13" y="13" width="10" height="10" fill="#FFB900"/></svg> },
                      { name: 'LinkedIn', svg: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                      { name: 'Facebook', svg: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                    ].map((provider) => (
                      <motion.button
                        key={provider.name}
                        type="button"
                        onClick={() => {
                          setIsLoggingIn(true);
                          setTimeout(onLogin, 1200);
                        }}
                        className="flex items-center justify-center py-2.5 border transition-all hover:shadow-sm"
                        style={{
                          borderColor: `rgba(${rgb}, 0.12)`,
                          borderRadius: visuals.inputRadius,
                          background: 'rgba(255,255,255,0.8)',
                        }}
                        whileHover={{ y: -1, boxShadow: `0 4px 12px rgba(${rgb}, 0.08)` }}
                        whileTap={{ scale: 0.97 }}
                        title={`Sign in with ${provider.name}`}
                      >
                        {provider.svg}
                      </motion.button>
                    ))}
                  </div>

                  {/* Magic Link */}
                  <button
                    type="button"
                    onClick={() => setLoginMode('magic-link')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium transition-all hover:opacity-100"
                    style={{ color: primary, opacity: 0.7 }}
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    Send me a magic link instead
                  </button>
                </motion.form>
              )}

              {loginMode === 'magic-link' && (
                <motion.div
                  key="magic-link-form"
                  className="space-y-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => { setLoginMode('password'); setMagicLinkSent(false); }}
                    className="flex items-center gap-1.5 text-xs mb-4 transition-opacity hover:opacity-100"
                    style={{ color: primary, opacity: 0.6 }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to password
                  </button>

                  {!magicLinkSent ? (
                    <>
                      <div className="text-center mb-4">
                        <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: `rgba(${rgb}, 0.08)` }}>
                          <Wand2 className="w-6 h-6" style={{ color: primary }} />
                        </div>
                        <h3 className="text-lg font-medium mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}>
                          Magic Link
                        </h3>
                        <p className="text-xs" style={{ color: '#8A8578' }}>
                          We&apos;ll send a secure login link to your email
                        </p>
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px]" style={{ color: primary, opacity: 0.35 }} />
                        <input
                          type="email"
                          value={account.email}
                          readOnly
                          className="w-full pl-11 pr-5 py-3.5 border outline-none cursor-not-allowed"
                          style={{
                            background: `rgba(${rgb}, 0.03)`,
                            borderColor: `rgba(${rgb}, 0.12)`,
                            borderRadius: visuals.inputRadius,
                            color: '#2C2A25',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '14px',
                          }}
                        />
                      </div>

                      <motion.button
                        type="button"
                        onClick={() => setMagicLinkSent(true)}
                        className="w-full py-3.5 text-sm font-semibold tracking-wider uppercase"
                        style={{
                          background: organization.theme.gradientBtn,
                          color: '#fff',
                          boxShadow: `0 4px 16px rgba(${rgb}, 0.2)`,
                          borderRadius: visuals.inputRadius,
                        }}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: -1 }}
                      >
                        Send Magic Link
                      </motion.button>
                    </>
                  ) : (
                    <motion.div
                      className="text-center py-4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: `rgba(${rgb}, 0.08)` }}>
                        <Mail className="w-7 h-7" style={{ color: primary }} />
                      </div>
                      <h3 className="text-lg font-medium mb-2" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}>
                        Check Your Email
                      </h3>
                      <p className="text-xs mb-4" style={{ color: '#8A8578' }}>
                        We&apos;ve sent a login link to <strong>{account.email}</strong>
                      </p>
                      <motion.button
                        type="button"
                        onClick={() => {
                          setIsLoggingIn(true);
                          setTimeout(onLogin, 800);
                        }}
                        className="text-xs font-medium underline"
                        style={{ color: primary }}
                      >
                        (Demo: Click here to simulate clicking the link)
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {loginMode === 'forgot' && (
                <motion.div
                  key="forgot-form"
                  className="space-y-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setLoginMode('password')}
                    className="flex items-center gap-1.5 text-xs mb-4 transition-opacity hover:opacity-100"
                    style={{ color: primary, opacity: 0.6 }}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to login
                  </button>

                  <div className="text-center mb-4">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: `rgba(${rgb}, 0.08)` }}>
                      <Lock className="w-6 h-6" style={{ color: primary }} />
                    </div>
                    <h3 className="text-lg font-medium mb-1" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}>
                      Reset Password
                    </h3>
                    <p className="text-xs" style={{ color: '#8A8578' }}>
                      Enter your email and we&apos;ll send reset instructions
                    </p>
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[16px] h-[16px]" style={{ color: primary, opacity: 0.35 }} />
                    <input
                      type="email"
                      value={account.email}
                      readOnly
                      className="w-full pl-11 pr-5 py-3.5 border outline-none cursor-not-allowed"
                      style={{
                        background: `rgba(${rgb}, 0.03)`,
                        borderColor: `rgba(${rgb}, 0.12)`,
                        borderRadius: visuals.inputRadius,
                        color: '#2C2A25',
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                      }}
                    />
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => {
                      setLoginMode('password');
                    }}
                    className="w-full py-3.5 text-sm font-semibold tracking-wider uppercase"
                    style={{
                      background: organization.theme.gradientBtn,
                      color: '#fff',
                      boxShadow: `0 4px 16px rgba(${rgb}, 0.2)`,
                      borderRadius: visuals.inputRadius,
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: -1 }}
                  >
                    Send Reset Link
                  </motion.button>

                  <p className="text-[11px] text-center" style={{ color: '#B8B0A0' }}>
                    Demo mode: This will return you to the login screen
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Powered by The Lobbi */}
          <motion.div
            className="mt-8 pt-6 border-t text-center"
            style={{ borderColor: `rgba(${rgb}, 0.08)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span
                className="text-lg italic"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  background: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                L
              </span>
              <span className="text-[9px] uppercase tracking-widest" style={{ color: 'rgba(212,175,55,0.5)' }}>
                Powered by The Lobbi
              </span>
            </div>
            <p className="text-[10px]" style={{ color: '#B8B0A0' }}>
              Demo mode: Any password will work
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

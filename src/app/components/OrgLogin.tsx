import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Organization, Account } from '@/app/data/themes';
import { GeometricOctagon } from './GeometricOctagon';

interface OrgLoginProps {
  account: Account;
  organization: Organization;
  onLogin: () => void;
}

type LoginMethod = 'password' | 'magic-link' | 'social';

// Social login icons
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
    <path fill="#F25022" d="M1 1h10v10H1z"/>
    <path fill="#00A4EF" d="M1 13h10v10H1z"/>
    <path fill="#7FBA00" d="M13 1h10v10H13z"/>
    <path fill="#FFB900" d="M13 13h10v10H13z"/>
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

const MagicWandIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 4V2" />
    <path d="M15 16v-2" />
    <path d="M8 9h2" />
    <path d="M20 9h2" />
    <path d="M17.8 11.8L19 13" />
    <path d="M15 9h.01" />
    <path d="M17.8 6.2L19 5" />
    <path d="M3 21l9-9" />
    <path d="M12.2 6.2L11 5" />
  </svg>
);

export function OrgLogin({ account, organization, onLogin }: OrgLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('password');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setMagicLinkSent(true);
      setIsLoggingIn(false);
    }, 1200);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoggingIn(true);
    // Simulate social login
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  const handleMagicLinkContinue = () => {
    // In demo mode, just proceed
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin();
    }, 500);
  };

  // Get org-specific styling
  const getOrgStyle = () => {
    switch (organization.id) {
      case 'luxe-haven':
        return {
          cardBg: 'linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(250,246,233,0.92) 100%)',
          borderStyle: 'double',
          borderWidth: '3px',
          accentPattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212,175,55,0.03) 10px, rgba(212,175,55,0.03) 20px)',
          logoShape: 'diamond',
        };
      case 'pacific-club':
        return {
          cardBg: 'linear-gradient(165deg, rgba(250,253,255,0.95) 0%, rgba(240,248,255,0.92) 100%)',
          borderStyle: 'solid',
          borderWidth: '2px',
          accentPattern: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(46,107,138,0.04) 8px, rgba(46,107,138,0.04) 16px)',
          logoShape: 'wave',
        };
      case 'summit-group':
        return {
          cardBg: 'linear-gradient(165deg, rgba(255,253,250,0.95) 0%, rgba(248,244,235,0.92) 100%)',
          borderStyle: 'ridge',
          borderWidth: '2px',
          accentPattern: 'radial-gradient(circle at 20% 50%, rgba(139,107,62,0.03) 0%, transparent 50%)',
          logoShape: 'hexagon',
        };
      case 'verde-collective':
        return {
          cardBg: 'linear-gradient(165deg, rgba(250,255,252,0.95) 0%, rgba(240,250,245,0.92) 100%)',
          borderStyle: 'solid',
          borderWidth: '2px',
          accentPattern: 'repeating-linear-gradient(135deg, transparent, transparent 12px, rgba(61,123,95,0.03) 12px, rgba(61,123,95,0.03) 24px)',
          logoShape: 'leaf',
        };
      case 'crown-estates':
        return {
          cardBg: 'linear-gradient(165deg, rgba(253,250,255,0.95) 0%, rgba(248,245,253,0.92) 100%)',
          borderStyle: 'double',
          borderWidth: '3px',
          accentPattern: 'radial-gradient(circle at 80% 20%, rgba(110,61,123,0.04) 0%, transparent 50%)',
          logoShape: 'crown',
        };
      default:
        return {
          cardBg: 'rgba(255, 255, 255, 0.90)',
          borderStyle: 'solid',
          borderWidth: '2px',
          accentPattern: 'none',
          logoShape: 'circle',
        };
    }
  };

  const orgStyle = getOrgStyle();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-20 flex items-center justify-center p-4"
    >
      {/* Org-specific ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle, rgba(${organization.theme.primaryRgb}, 0.12), transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>

      {/* Floating org-colored particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: organization.theme.primary,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40 - Math.random() * 60],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      <motion.div
        className="w-full max-w-[420px] relative"
        initial={{ y: 40, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -30, scale: 0.95 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ornamental corners - org specific */}
        <div className="absolute -top-4 -left-4 w-12 h-12 border-l border-t rounded-tl-2xl" 
          style={{ 
            borderColor: organization.theme.primary, 
            opacity: 0.3,
            borderStyle: orgStyle.borderStyle as any,
          }} 
        />
        <div className="absolute -top-4 -right-4 w-12 h-12 border-r border-t rounded-tr-2xl" 
          style={{ 
            borderColor: organization.theme.primary, 
            opacity: 0.3,
            borderStyle: orgStyle.borderStyle as any,
          }} 
        />
        <div className="absolute -bottom-4 -left-4 w-12 h-12 border-l border-b rounded-bl-2xl" 
          style={{ 
            borderColor: organization.theme.primary, 
            opacity: 0.3,
            borderStyle: orgStyle.borderStyle as any,
          }} 
        />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-r border-b rounded-br-2xl" 
          style={{ 
            borderColor: organization.theme.primary, 
            opacity: 0.3,
            borderStyle: orgStyle.borderStyle as any,
          }} 
        />

        {/* Card with org-specific styling */}
        <div
          className="relative px-8 py-8 rounded-2xl overflow-hidden"
          style={{
            background: orgStyle.cardBg,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderColor: `rgba(${organization.theme.primaryRgb}, 0.2)`,
            borderStyle: orgStyle.borderStyle as any,
            borderWidth: orgStyle.borderWidth,
            boxShadow: `
              0 30px 70px rgba(0,0,0,0.12), 
              0 0 0 1px rgba(${organization.theme.primaryRgb}, 0.08), 
              inset 0 2px 0 rgba(255,255,255,0.9),
              inset 0 0 120px rgba(${organization.theme.primaryRgb}, 0.03)
            `,
          }}
        >
          {/* Org-specific pattern overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: orgStyle.accentPattern,
              opacity: 1,
            }}
          />

          {/* Animated top accent bar */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: `linear-gradient(90deg, transparent, ${organization.theme.primary}, transparent)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Header */}
          <div className="text-center mb-6 relative z-10">
            {/* Org Logo with unique shape per org */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-xl relative overflow-hidden"
              style={{
                background: organization.theme.gradientBtn,
                borderRadius: orgStyle.logoShape === 'diamond' ? '12px' :
                             orgStyle.logoShape === 'hexagon' ? '8px' :
                             orgStyle.logoShape === 'crown' ? '16px 16px 4px 4px' : '50%',
                transform: orgStyle.logoShape === 'diamond' ? 'rotate(45deg)' : 'none',
              }}
              initial={{ scale: 0, rotate: orgStyle.logoShape === 'diamond' ? -15 : 0 }}
              animate={{ 
                scale: 1, 
                rotate: orgStyle.logoShape === 'diamond' ? 45 : 0 
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                type: 'spring',
                stiffness: 160,
              }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.25)',
                  borderRadius: 'inherit',
                }}
              />
              
              <span
                className="relative z-10 text-2xl"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#fff',
                  transform: orgStyle.logoShape === 'diamond' ? 'rotate(-45deg)' : 'none',
                }}
              >
                {organization.logoLetter}
              </span>
              
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)',
                  borderRadius: 'inherit',
                }}
              />
            </motion.div>

            <motion.h2
              className="text-2xl mb-2"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontWeight: 500,
                color: '#2C2A25',
                letterSpacing: '-0.01em',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {organization.name}
            </motion.h2>

            <motion.p
              className="text-sm italic mb-4"
              style={{ 
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                color: organization.theme.primary,
                opacity: 0.85,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              "{organization.motto}"
            </motion.p>

            <motion.div
              className="w-16 h-px mx-auto mb-3 relative"
              style={{
                background: `linear-gradient(90deg, transparent, ${organization.theme.primary}, transparent)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rotate-45"
                style={{ 
                  background: organization.theme.primary,
                  boxShadow: `0 0 12px ${organization.theme.primary}`,
                }}
              />
            </motion.div>

            <motion.p
              className="text-sm"
              style={{ color: '#8A8578', fontFamily: 'DM Sans, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Sign in to continue
            </motion.p>
          </div>

          {/* Login Method Tabs */}
          <motion.div
            className="flex gap-1 mb-5 p-1 bg-gray-100 rounded-lg relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { id: 'password', label: 'Password' },
              { id: 'magic-link', label: 'Magic Link' },
              { id: 'social', label: 'SSO' },
            ].map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => {
                  setLoginMethod(method.id as LoginMethod);
                  setMagicLinkSent(false);
                }}
                className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                  loginMethod === method.id
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{
                  background: loginMethod === method.id ? organization.theme.gradientBtn : 'transparent',
                }}
              >
                {method.label}
              </button>
            ))}
          </motion.div>

          {/* Password Login Form */}
          <AnimatePresence mode="wait">
            {loginMethod === 'password' && (
              <motion.form
                key="password-form"
                onSubmit={handleSubmit}
                className="space-y-4 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Email (Read-only) */}
                <div>
                  <label
                    className="block text-xs uppercase tracking-widest mb-2 font-medium"
                    style={{
                      color: organization.theme.primary,
                      opacity: 0.7,
                      letterSpacing: '0.15em',
                    }}
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all"
                      style={{
                        color: organization.theme.primary,
                        opacity: 0.4,
                      }}
                    />
                    <input
                      type="email"
                      value={account.email}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm outline-none cursor-not-allowed transition-all"
                      style={{
                        background: `rgba(${organization.theme.primaryRgb}, 0.03)`,
                        borderColor: `rgba(${organization.theme.primaryRgb}, 0.15)`,
                        color: '#2C2A25',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    className="block text-xs uppercase tracking-widest mb-2 font-medium"
                    style={{
                      color: organization.theme.primary,
                      opacity: 0.7,
                      letterSpacing: '0.15em',
                    }}
                  >
                    Password
                  </label>
                  <div className="relative group">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all"
                      style={{
                        color: organization.theme.primary,
                        opacity: 0.4,
                      }}
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full pl-10 pr-12 py-3 bg-white border rounded-lg text-sm transition-all outline-none placeholder:text-gray-300"
                      style={{
                        borderColor: `rgba(${organization.theme.primaryRgb}, 0.2)`,
                        color: '#2C2A25',
                        fontFamily: 'DM Sans, sans-serif',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = `rgba(${organization.theme.primaryRgb}, 0.6)`;
                        e.target.style.boxShadow = `0 0 0 3px rgba(${organization.theme.primaryRgb}, 0.08)`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = `rgba(${organization.theme.primaryRgb}, 0.2)`;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
                      style={{
                        color: organization.theme.primary,
                        opacity: 0.5,
                      }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="peer w-4 h-4 cursor-pointer appearance-none border rounded transition-all"
                        style={{
                          borderColor: `rgba(${organization.theme.primaryRgb}, 0.3)`,
                        }}
                      />
                      <svg
                        className="absolute inset-0 w-4 h-4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                        style={{ color: organization.theme.primary }}
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
                  <a
                    href="#"
                    className="transition-opacity hover:opacity-100"
                    style={{
                      color: organization.theme.primary,
                      opacity: 0.7,
                    }}
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoggingIn || !password}
                  className="relative w-full py-3 rounded-lg text-sm font-semibold tracking-wider uppercase overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-4"
                  style={{
                    background: organization.theme.gradientBtn,
                    color: '#fff',
                    boxShadow: `0 4px 12px rgba(${organization.theme.primaryRgb}, 0.2)`,
                  }}
                  whileHover={!isLoggingIn && password ? {
                    y: -3,
                    boxShadow: `0 8px 32px rgba(${organization.theme.primaryRgb}, 0.35)`,
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
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
                    />
                  )}
                </motion.button>
              </motion.form>
            )}

            {/* Magic Link Form */}
            {loginMethod === 'magic-link' && (
              <motion.div
                key="magic-link-form"
                className="space-y-6 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {!magicLinkSent ? (
                  <form onSubmit={handleMagicLinkSubmit} className="space-y-6">
                    {/* Magic link icon */}
                    <div className="text-center mb-4">
                      <div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                        style={{ background: `rgba(${organization.theme.primaryRgb}, 0.1)` }}
                      >
                        <MagicWandIcon className="w-8 h-8" style={{ color: organization.theme.primary }} />
                      </div>
                      <p className="text-sm text-gray-600">
                        We'll send a magic link to your email for passwordless sign in
                      </p>
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                      <label
                        className="block text-xs uppercase tracking-widest mb-3 font-medium"
                        style={{
                          color: organization.theme.primary,
                          opacity: 0.7,
                          letterSpacing: '0.2em',
                        }}
                      >
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-all"
                          style={{
                            color: organization.theme.primary,
                            opacity: 0.4,
                          }}
                        />
                        <input
                          type="email"
                          value={account.email}
                          readOnly
                          className="w-full pl-12 pr-5 py-4 border-2 rounded-xl text-[15px] outline-none cursor-not-allowed transition-all"
                          style={{
                            background: `rgba(${organization.theme.primaryRgb}, 0.03)`,
                            borderColor: `rgba(${organization.theme.primaryRgb}, 0.15)`,
                            color: '#2C2A25',
                            fontFamily: 'DM Sans, sans-serif',
                          }}
                        />
                      </div>
                    </div>

                    {/* Send Magic Link Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoggingIn}
                      className="relative w-full py-4 rounded-xl text-sm font-semibold tracking-wider uppercase overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: organization.theme.gradientBtn,
                        color: '#fff',
                        boxShadow: `0 4px 16px rgba(${organization.theme.primaryRgb}, 0.25)`,
                      }}
                      whileHover={{ y: -3 }}
                      whileTap={{ y: -1 }}
                    >
                      {isLoggingIn ? (
                        <div className="flex items-center justify-center gap-3">
                          <motion.div
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </div>
                      ) : (
                        'Send Magic Link'
                      )}
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    {/* Success icon */}
                    <motion.div
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                      style={{ background: `rgba(${organization.theme.primaryRgb}, 0.1)` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <svg
                        className="w-10 h-10"
                        style={{ color: organization.theme.primary }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </motion.div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Check your email!</h3>
                    <p className="text-sm text-gray-600 mb-6">
                      We've sent a magic link to <strong>{account.email}</strong>
                    </p>

                    {/* Demo mode: Continue button */}
                    <motion.button
                      type="button"
                      onClick={handleMagicLinkContinue}
                      disabled={isLoggingIn}
                      className="relative w-full py-4 rounded-xl text-sm font-semibold tracking-wider uppercase overflow-hidden transition-all disabled:opacity-50"
                      style={{
                        background: organization.theme.gradientBtn,
                        color: '#fff',
                        boxShadow: `0 4px 16px rgba(${organization.theme.primaryRgb}, 0.25)`,
                      }}
                      whileHover={{ y: -3 }}
                      whileTap={{ y: -1 }}
                    >
                      {isLoggingIn ? 'Entering...' : 'Demo: Continue Anyway'}
                    </motion.button>

                    <p className="text-[10px] text-gray-400 mt-4">
                      Didn't receive the email? Check spam or try again
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Social Login */}
            {loginMethod === 'social' && (
              <motion.div
                key="social-form"
                className="space-y-4 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-gray-600 text-center mb-6">
                  Sign in with your enterprise SSO provider
                </p>

                {/* Social login buttons */}
                <div className="space-y-3">
                  {[
                    { id: 'google', name: 'Google', icon: GoogleIcon, bg: '#fff', border: '#E5E7EB', text: '#374151' },
                    { id: 'microsoft', name: 'Microsoft', icon: MicrosoftIcon, bg: '#fff', border: '#E5E7EB', text: '#374151' },
                    { id: 'linkedin', name: 'LinkedIn', icon: LinkedInIcon, bg: '#0A66C2', border: '#0A66C2', text: '#fff' },
                    { id: 'apple', name: 'Apple', icon: AppleIcon, bg: '#000', border: '#000', text: '#fff' },
                  ].map((provider) => (
                    <motion.button
                      key={provider.id}
                      type="button"
                      onClick={() => handleSocialLogin(provider.id)}
                      disabled={isLoggingIn}
                      className="w-full py-3.5 px-4 rounded-xl text-sm font-medium flex items-center justify-center gap-3 border-2 transition-all disabled:opacity-50"
                      style={{
                        background: provider.bg,
                        borderColor: provider.border,
                        color: provider.text,
                      }}
                      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      whileTap={{ y: 0 }}
                    >
                      <provider.icon className="w-5 h-5" />
                      Continue with {provider.name}
                    </motion.button>
                  ))}
                </div>

                {/* SAML/OIDC option */}
                <div className="pt-4 border-t border-gray-200 mt-6">
                  <button
                    type="button"
                    className="w-full py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => handleSocialLogin('saml')}
                  >
                    Sign in with SAML / OIDC
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Powered by The Lobbi */}
          <motion.div
            className="mt-6 pt-4 border-t text-center"
            style={{
              borderColor: `rgba(${organization.theme.primaryRgb}, 0.1)`,
            }}
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
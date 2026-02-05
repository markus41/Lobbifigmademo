import { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      onLogin();
    }, 800);
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
        className="w-full max-w-[520px] relative"
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
          className="relative p-12 rounded-3xl overflow-hidden"
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
          <div className="text-center mb-10 relative z-10">
            {/* Org Logo with unique shape per org */}
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-2xl relative overflow-hidden"
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
                className="relative z-10 text-3xl"
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
              className="text-3xl mb-3"
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
              className="text-sm italic mb-6"
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
              className="w-20 h-px mx-auto mb-5 relative"
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

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
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

            {/* Password */}
            <div>
              <label 
                className="block text-xs uppercase tracking-widest mb-3 font-medium"
                style={{ 
                  color: organization.theme.primary,
                  opacity: 0.7,
                  letterSpacing: '0.2em',
                }}
              >
                Password
              </label>
              <div className="relative group">
                <Lock 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-all"
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
                  className="w-full pl-12 pr-14 py-4 bg-white border-2 rounded-xl text-[15px] transition-all outline-none placeholder:text-[rgba(138,133,120,0.35)]"
                  style={{
                    borderColor: `rgba(${organization.theme.primaryRgb}, 0.2)`,
                    color: '#2C2A25',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `rgba(${organization.theme.primaryRgb}, 0.6)`;
                    e.target.style.boxShadow = `0 0 0 4px rgba(${organization.theme.primaryRgb}, 0.08), 0 8px 24px rgba(${organization.theme.primaryRgb}, 0.12)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `rgba(${organization.theme.primaryRgb}, 0.2)`;
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
                  style={{ 
                    color: organization.theme.primary,
                    opacity: 0.5,
                  }}
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="peer w-[18px] h-[18px] cursor-pointer appearance-none border-2 rounded transition-all"
                    style={{ 
                      borderColor: `rgba(${organization.theme.primaryRgb}, 0.3)`,
                    }}
                  />
                  <svg 
                    className="absolute inset-0 w-[18px] h-[18px] pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
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
              className="relative w-full py-4 rounded-xl text-sm font-semibold tracking-wider uppercase overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{
                background: organization.theme.gradientBtn,
                color: '#fff',
                marginTop: '2rem',
                boxShadow: `0 4px 16px rgba(${organization.theme.primaryRgb}, 0.25)`,
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

          {/* Powered by The Lobbi */}
          <motion.div
            className="mt-10 pt-8 border-t text-center"
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

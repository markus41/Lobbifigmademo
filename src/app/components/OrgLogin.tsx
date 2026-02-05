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
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Elite: Longer morph transition
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-20 flex items-center justify-center p-4"
    >
      <motion.div
        className="w-full max-w-[480px] relative"
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -20, scale: 0.95 }}
        // Elite: Slower, more deliberate entrance
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Elite: Frosted glass card with ambient shadows - Light mode */}
        <div
          className="relative p-12 rounded-2xl border overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.90)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: `rgba(${organization.theme.primaryRgb}, 0.15)`,
            boxShadow: `
              0 25px 60px rgba(0,0,0,0.08), 
              0 0 0 1px rgba(${organization.theme.primaryRgb}, 0.05), 
              inset 0 1px 0 rgba(255,255,255,0.8),
              inset 0 0 80px rgba(${organization.theme.primaryRgb}, 0.02)
            `,
          }}
        >
          {/* Subtle org-colored top accent */}
          <div 
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${organization.theme.primary}, transparent)`,
              opacity: 0.4,
            }}
          />

          {/* Corner decorative elements */}
          <div 
            className="absolute top-3 right-3 w-20 h-20 opacity-[0.03] pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${organization.theme.primary} 0%, transparent 70%)`,
            }}
          />

          {/* Header */}
          <div className="text-center mb-10 relative z-10">
            {/* Org Logo Badge */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl relative overflow-hidden"
              style={{
                background: organization.theme.gradientBtn,
              }}
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                type: 'spring',
                stiffness: 180,
              }}
            >
              {/* Inner shadow for depth */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
                }}
              />
              
              <span 
                className="relative z-10 text-[28px] font-semibold"
                style={{ 
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  color: organization.id === 'pacific-club' || organization.id === 'crown-estates' ? '#fff' : '#fff',
                }}
              >
                {organization.logoLetter}
              </span>
              
              {/* Shine overlay */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                }}
              />
            </motion.div>

            {/* Org Name */}
            <motion.h2
              className="text-[28px] mb-2"
              style={{ 
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontWeight: 500,
                color: '#2C2A25',
                letterSpacing: '-0.01em',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {organization.name}
            </motion.h2>
            
            {/* Org Motto */}
            <motion.p
              className="text-[13px] italic mb-5"
              style={{ 
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                color: `rgba(${organization.theme.primaryRgb}, 0.7)`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {organization.motto}
            </motion.p>

            {/* Divider */}
            <motion.div 
              className="w-16 h-[1px] mx-auto mb-5"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(${organization.theme.primaryRgb}, 0.4), transparent)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />

            <motion.p
              className="text-sm"
              style={{ color: '#8A8578' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Sign in to continue
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {/* Email (Read-only) - Light mode */}
            <div>
              <label 
                className="block text-[11px] uppercase tracking-[0.2em] mb-3 font-medium"
                style={{ color: `rgba(${organization.theme.primaryRgb}, 0.7)` }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px]"
                  style={{ color: `rgba(${organization.theme.primaryRgb}, 0.4)` }}
                />
                <input
                  type="email"
                  value={account.email}
                  readOnly
                  className="w-full pl-12 pr-5 py-4 bg-[rgba(237,232,221,0.3)] border rounded-xl text-[#2C2A25] text-[15px] outline-none cursor-not-allowed"
                  style={{
                    borderColor: `rgba(${organization.theme.primaryRgb}, 0.12)`,
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                />
              </div>
            </div>

            {/* Password - Light mode */}
            <div>
              <label 
                className="block text-[11px] uppercase tracking-[0.2em] mb-3 font-medium"
                style={{ color: `rgba(${organization.theme.primaryRgb}, 0.7)` }}
              >
                Password
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px]"
                  style={{ color: `rgba(${organization.theme.primaryRgb}, 0.4)` }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-white border rounded-xl text-[#2C2A25] text-[15px] transition-all outline-none placeholder:text-[rgba(138,133,120,0.4)]"
                  style={{
                    borderColor: `rgba(${organization.theme.primaryRgb}, 0.15)`,
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = `rgba(${organization.theme.primaryRgb}, 0.5)`;
                    e.target.style.boxShadow = `0 0 0 3px rgba(${organization.theme.primaryRgb}, 0.08)`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `rgba(${organization.theme.primaryRgb}, 0.15)`;
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-100"
                  style={{ 
                    color: `rgba(${organization.theme.primaryRgb}, 0.5)`,
                    opacity: 0.6,
                  }}
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot - Light mode */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer group">
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

            {/* Submit Button - Elite: Weighted interaction */}
            <motion.button
              type="submit"
              disabled={isLoggingIn || !password}
              className="relative w-full py-4 rounded-xl text-[13px] font-semibold tracking-[0.1em] uppercase overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{
                background: organization.theme.gradientBtn,
                color: organization.id === 'pacific-club' || organization.id === 'crown-estates' ? '#fff' : '#0A0806',
                marginTop: '2rem',
              }}
              whileHover={!isLoggingIn && password ? { 
                y: -3,
                boxShadow: `0 8px 24px rgba(${organization.theme.primaryRgb}, 0.3)`,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              whileTap={!isLoggingIn && password ? { 
                y: -1,
                boxShadow: `0 2px 8px rgba(${organization.theme.primaryRgb}, 0.2)`,
                transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] }
              } : {}}
            >
              {isLoggingIn ? (
                <div className="flex items-center justify-center gap-2.5">
                  <motion.div
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                  />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
              
              {/* Shine effect */}
              {!isLoggingIn && password && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
            </motion.button>
          </motion.form>

          {/* Powered by The Lobbi */}
          <motion.div
            className="mt-10 pt-7 border-t text-center"
            style={{
              borderColor: `rgba(${organization.theme.primaryRgb}, 0.08)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span 
                className="text-base italic leading-none"
                style={{ 
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  background: 'linear-gradient(160deg, #F5E6A3, #D4AF37, #8B7330)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                L
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(212,175,55,0.5)' }}>
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
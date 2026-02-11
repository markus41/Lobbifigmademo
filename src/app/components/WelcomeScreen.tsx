import { motion } from 'motion/react';
import { useEffect } from 'react';
import type { Account, Organization } from '../data/themes';

interface WelcomeScreenProps {
  account: Account;
  organization: Organization;
  onComplete: () => void;
}

export function WelcomeScreen({ account, organization, onComplete }: WelcomeScreenProps) {
  // Auto-advance after 1.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center"
      style={{
        background: `var(--theme-gradient-hero, linear-gradient(180deg, rgba(${organization.theme.primaryRgb}, 0.02) 0%, rgba(${organization.theme.primaryRgb}, 0.06) 100%))`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="text-center px-8 max-w-2xl">
        {/* Welcome Back */}
        <motion.h2
          className="text-[28px] md:text-[32px] mb-4 font-normal"
          style={{
            fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)',
            color: 'var(--theme-text-primary, #2C2A25)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          Welcome back,
        </motion.h2>

        {/* User Name */}
        <motion.h1
          className="text-[clamp(2.2rem,6vw,4rem)] mb-6 font-normal"
          style={{
            fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)',
            color: `var(--theme-primary, ${organization.theme.primary})`,
            textShadow: `0 2px 12px rgba(${organization.theme.primaryRgb}, 0.15)`,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {account.first}
        </motion.h1>

        {/* Organization Badge */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md"
            style={{
              background: organization.theme.gradientBtn,
            }}
          >
            <span
              className="text-[20px] font-semibold text-white"
              style={{
                fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)',
              }}
            >
              {organization.logoLetter}
            </span>
          </div>
          <div className="text-left">
            <div
              className="text-[14px] font-medium"
              style={{ color: organization.theme.primary }}
            >
              {organization.name}
            </div>
            <div className="text-[12px] opacity-70" style={{ color: 'var(--theme-text-secondary, #8A8578)' }}>
              {account.role || 'Member'}
            </div>
          </div>
        </motion.div>

        {/* Motto */}
        <motion.p
          className="text-[15px] italic mb-8"
          style={{
            color: `rgba(${organization.theme.primaryRgb}, 0.8)`,
            fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {organization.motto}
        </motion.p>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: organization.theme.primary }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: organization.theme.primary }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: organization.theme.primary }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

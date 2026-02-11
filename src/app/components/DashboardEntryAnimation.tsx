import { motion } from 'motion/react';
import { useEffect } from 'react';
import type { Account, Organization } from '../data/themes';

interface DashboardEntryAnimationProps {
  onCompleted: () => void;
  organization: Organization;
  account: Account;
}

export function DashboardEntryAnimation({
  onCompleted,
  organization,
  account
}: DashboardEntryAnimationProps) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onCompleted();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onCompleted]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      style={{
        background: `var(--theme-gradient-hero, linear-gradient(180deg, rgba(${organization.theme.primaryRgb}, 0.02) 0%, rgba(${organization.theme.primaryRgb}, 0.06) 100%))`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="text-center px-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <p
            className="text-[16px] mb-3 font-medium"
            style={{
              color: 'var(--theme-text-secondary, #8A8578)',
              fontFamily: 'var(--theme-font-body, DM Sans, sans-serif)',
            }}
          >
            Welcome Back
          </p>
          <h1
            className="text-[clamp(1.8rem,5vw,3rem)] mb-4 font-normal"
            style={{
              fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)',
              color: `var(--theme-primary, ${organization.theme.primary})`,
            }}
          >
            {account.first} {account.last}
          </h1>
        </motion.div>

        <motion.p
          className="text-[14px] font-medium"
          style={{
            color: organization.theme.primary,
            fontFamily: 'var(--theme-font-body, DM Sans, sans-serif)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {organization.name}
        </motion.p>
      </div>
    </motion.div>
  );
}

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
    // Elite: Longer dissolve transition
    const timer = setTimeout(onCompleted, 2400);
    return () => clearTimeout(timer);
  }, [onCompleted]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ 
        duration: 2.4, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3,
      }}
      style={{
        background: '#FAF6E9',
      }}
    >
      {/* Welcome Message */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-sm uppercase tracking-[0.3em] mb-4"
          style={{ 
            color: `rgba(${organization.theme.primaryRgb}, 0.6)`,
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
          }}
        >
          Welcome Back
        </motion.p>
        
        <motion.h1
          className="text-3xl sm:text-5xl mb-3"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontWeight: 400,
            color: '#2C2A25',
          }}
        >
          {account.first} {account.last}
        </motion.h1>
        
        <motion.p
          className="text-sm"
          style={{ color: '#8A8578' }}
        >
          {organization.name}
        </motion.p>
      </motion.div>

      {/* Dissolving octagon geometry hint */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 0.4 }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          <motion.path
            d="M200,60 L270,110 L270,190 L200,240 L130,190 L130,110 Z"
            fill="none"
            stroke={organization.theme.primary}
            strokeWidth="0.5"
            initial={{ pathLength: 1, opacity: 0.2 }}
            animate={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.8, delay: 0.5 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

import { motion } from 'motion/react';
import { useEffect } from 'react';
import { GeometricOctagon } from './GeometricOctagon';
import type { Account, Organization } from '../data/themes';

interface WelcomeScreenProps {
  account: Account;
  organization: Organization;
  onComplete: () => void;
}

export function WelcomeScreen({ account, organization, onComplete }: WelcomeScreenProps) {
  
  // Auto-advance after 4 seconds for a smoother experience
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: '#FAF6E9' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated Octagon Background */}
      <div className="absolute inset-0">
        <GeometricOctagon primaryColor={organization.theme.primary} />
      </div>

      {/* Ambient Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
          style={{
            background: `radial-gradient(circle, rgba(${organization.theme.primaryRgb}, 0.12), transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: organization.theme.primary,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0.6, 0.4, 0],
              scale: [0, 1, 1.5, 1, 0],
              y: [0, -20 - Math.random() * 40, -50 - Math.random() * 50],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: 0.5 + Math.random() * 1.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-2xl">
        {/* Welcome Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="text-xl mb-2"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              color: '#5A5247',
              letterSpacing: '0.05em',
            }}
          >
            Welcome back,
          </h2>
        </motion.div>

        {/* Name with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 
            className="text-6xl mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: 400,
              background: `linear-gradient(135deg, ${organization.theme.primary}, ${organization.theme.primaryLight})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {account.first} {account.last}
          </h1>
        </motion.div>

        {/* Organization Badge */}
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4"
          style={{
            background: `rgba(${organization.theme.primaryRgb}, 0.08)`,
            border: `1px solid rgba(${organization.theme.primaryRgb}, 0.15)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{
              background: organization.theme.gradientBtn,
            }}
          >
            <span 
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              {organization.logoLetter}
            </span>
          </div>
          <span
            className="text-lg"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: 600,
              color: '#1A1815',
            }}
          >
            {organization.name}
          </span>
        </motion.div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-sm mb-3"
            style={{
              color: '#5A5247',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
            }}
          >
            {account.role}
          </p>
        </motion.div>

        {/* Motto */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-base italic mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              color: organization.theme.primary,
              opacity: 0.95,
              fontWeight: 500,
            }}
          >
            "{organization.motto}"
          </p>
        </motion.div>

        {/* Timestamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-xs"
            style={{
              color: '#8A8278',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.05em',
              fontWeight: 500,
            }}
          >
            {new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: organization.theme.primary }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
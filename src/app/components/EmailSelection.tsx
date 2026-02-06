import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ACCOUNTS, ORGANIZATIONS } from '@/app/data/themes';

interface EmailSelectionProps {
  onEmailSelected: (email: string) => void;
}

export function EmailSelection({ onEmailSelected }: EmailSelectionProps) {
  const [selectedEmail, setSelectedEmail] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);

  // Get organization for preview
  const getOrgForEmail = (email: string) => {
    const account = ACCOUNTS.find(a => a.email === email);
    return account ? ORGANIZATIONS[account.orgId] : null;
  };

  const getAccountForEmail = (email: string) => {
    return ACCOUNTS.find(a => a.email === email) || null;
  };

  const previewOrg = getOrgForEmail(selectedEmail);
  const previewAccount = getAccountForEmail(selectedEmail);

  // Auto-advance when user picks an account
  useEffect(() => {
    let recognizeTimer: ReturnType<typeof setTimeout> | null = null;
    let advanceTimer: ReturnType<typeof setTimeout> | null = null;

    if (selectedEmail && previewOrg) {
      setIsRecognizing(true);
      // Brief recognition pulse, then morph transition
      recognizeTimer = setTimeout(() => {
        setIsMorphing(true);
      }, 600);
      advanceTimer = setTimeout(() => {
        onEmailSelected(selectedEmail);
      }, 1400);
    } else {
      // Reset states if selection is cleared or organization is unavailable
      setIsRecognizing(false);
      setIsMorphing(false);
    }

    return () => {
      if (recognizeTimer !== null) {
        clearTimeout(recognizeTimer);
      }
      if (advanceTimer !== null) {
        clearTimeout(advanceTimer);
      }
      // Ensure states are reset when effect is cleaned up
      setIsRecognizing(false);
      setIsMorphing(false);
    };
  }, [selectedEmail, previewOrg, onEmailSelected]);

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-20 flex items-center justify-center p-4"
    >
      <motion.div
        className="w-full max-w-[440px] relative"
        initial={{ y: 30, scale: 0.95 }}
        animate={{
          y: 0,
          scale: isMorphing ? 1.02 : 1,
        }}
        exit={{ y: -20, scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        {/* Main Card */}
        <div
          className="relative p-6 sm:p-12 rounded-2xl border overflow-hidden"
          style={{
            background: isMorphing && previewOrg
              ? `linear-gradient(165deg, rgba(255,255,255,0.95), rgba(${previewOrg.theme.primaryRgb}, 0.08))`
              : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: previewOrg ? `rgba(${previewOrg.theme.primaryRgb}, 0.15)` : 'rgba(212,175,55,0.1)',
            boxShadow: previewOrg && isRecognizing
              ? `0 25px 60px rgba(0,0,0,0.08), 0 0 40px rgba(${previewOrg.theme.primaryRgb}, 0.08)`
              : '0 25px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Recognition shimmer overlay */}
          <AnimatePresence>
            {isRecognizing && previewOrg && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: `radial-gradient(ellipse 80% 50% at 50% 50%, rgba(${previewOrg.theme.primaryRgb}, 0.12), transparent)`,
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 1.2, ease }}
                  style={{
                    background: `linear-gradient(135deg, transparent, rgba(${previewOrg.theme.primaryRgb}, 0.15), transparent)`,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top border accent */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: previewOrg
                ? `linear-gradient(90deg, transparent, ${previewOrg.theme.primary}, transparent)`
                : 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Header */}
          <div className="text-center mb-10">
            {/* Logo Mark */}
            <motion.div
              className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: previewOrg
                  ? previewOrg.theme.gradientBtn
                  : 'linear-gradient(135deg, #D4AF37, #8B7330)',
              }}
              initial={{ scale: 0, rotate: -10 }}
              animate={{
                scale: 1,
                rotate: isMorphing ? 5 : 0,
              }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <span
                className="text-[28px] font-light italic relative z-10 text-white"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                {previewOrg ? previewOrg.logoLetter : 'L'}
              </span>
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)' }}
              />
            </motion.div>

            <motion.h2
              className="text-[24px] sm:text-[32px] mb-3"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontWeight: 400,
                color: '#2C2A25',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isMorphing && previewOrg ? previewOrg.short : 'Welcome to The Lobbi'}
            </motion.h2>

            <motion.p
              className="text-sm"
              style={{ color: '#8A8578' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isMorphing ? 'Preparing your workspace...' : 'Select your account to continue'}
            </motion.p>
          </div>

          {/* Account Dropdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMorphing ? 0.5 : 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div>
              <label
                className="block text-[11px] uppercase tracking-[0.2em] mb-3 font-medium"
                style={{
                  color: previewOrg
                    ? `rgba(${previewOrg.theme.primaryRgb}, 0.7)`
                    : 'rgba(212,175,55,0.7)',
                  transition: 'color 0.5s ease',
                }}
              >
                Choose Account
              </label>
              <div className="relative">
                <select
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  disabled={isRecognizing}
                  className="w-full px-5 py-4 border rounded-xl text-[#2C2A25] text-[15px] appearance-none cursor-pointer transition-all outline-none bg-white disabled:opacity-70"
                  style={{
                    borderColor: previewOrg
                      ? `rgba(${previewOrg.theme.primaryRgb}, 0.15)`
                      : 'rgba(212,175,55,0.12)',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={(e) => {
                    const rgb = previewOrg ? previewOrg.theme.primaryRgb : '212,175,55';
                    e.target.style.borderColor = `rgba(${rgb}, 0.5)`;
                    e.target.style.boxShadow = `0 0 0 3px rgba(${rgb}, 0.1)`;
                  }}
                  onBlur={(e) => {
                    const rgb = previewOrg ? previewOrg.theme.primaryRgb : '212,175,55';
                    e.target.style.borderColor = `rgba(${rgb}, 0.15)`;
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="" className="bg-white text-[#2C2A25]">
                    Select your account
                  </option>
                  {ACCOUNTS.map((account) => {
                    const org = ORGANIZATIONS[account.orgId];
                    return (
                      <option
                        key={account.email}
                        value={account.email}
                        className="bg-white text-[#2C2A25] py-3"
                      >
                        {account.name} - {org.name}
                      </option>
                    );
                  })}
                </select>
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors"
                  style={{
                    color: previewOrg
                      ? `rgba(${previewOrg.theme.primaryRgb}, 0.4)`
                      : 'rgba(212,175,55,0.4)',
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Selected Account Preview - appears when selected, morphs into org identity */}
            <AnimatePresence>
              {selectedEmail && previewOrg && previewAccount && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="overflow-hidden"
                >
                  <div
                    className="flex items-center gap-4 p-4 rounded-xl border"
                    style={{
                      background: `rgba(${previewOrg.theme.primaryRgb}, 0.05)`,
                      borderColor: `rgba(${previewOrg.theme.primaryRgb}, 0.2)`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: previewOrg.theme.gradientBtn }}
                    >
                      <span
                        className="text-[20px] font-semibold text-white"
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                      >
                        {previewOrg.logoLetter}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[13px] uppercase tracking-[0.1em] mb-1"
                        style={{
                          color: `rgba(${previewOrg.theme.primaryRgb}, 0.7)`,
                          fontFamily: 'DM Sans, sans-serif',
                          fontWeight: 600,
                        }}
                      >
                        {previewOrg.name}
                      </div>
                      <div
                        className="text-[11px]"
                        style={{
                          color: `rgba(${previewOrg.theme.primaryRgb}, 0.5)`,
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                      >
                        {previewAccount.name} &middot; {previewAccount.role}
                      </div>
                    </div>

                    {/* Loading indicator during recognition */}
                    {isRecognizing && (
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: previewOrg.theme.primary }}
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <motion.div
            className="mt-8 pt-6 border-t text-center"
            style={{
              borderColor: previewOrg
                ? `rgba(${previewOrg.theme.primaryRgb}, 0.08)`
                : 'rgba(212,175,55,0.08)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs" style={{ color: '#B8B0A0' }}>
              Select an account to automatically continue to your organization
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Building2, User } from 'lucide-react';
import { ACCOUNTS, ORGANIZATIONS, type Account, type Organization } from '@/app/data/themes';

interface EmailSelectionProps {
  onEmailSelected: (email: string) => void;
}

// Custom styled dropdown for account selection
function AccountDropdown({
  value,
  onChange,
  accounts,
  organizations,
  previewOrg,
}: {
  value: string;
  onChange: (email: string) => void;
  accounts: Account[];
  organizations: Record<string, Organization>;
  previewOrg: Organization | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedAccount = accounts.find(a => a.email === value);
  const primaryRgb = previewOrg?.theme.primaryRgb || '212,175,55';

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => Math.min(prev + 1, accounts.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0) {
            onChange(accounts[focusedIndex].email);
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, accounts, onChange]);

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-account-item]');
      items[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 border rounded-xl text-left cursor-pointer transition-all outline-none bg-white group"
        style={{
          borderColor: isOpen
            ? `rgba(${primaryRgb}, 0.5)`
            : `rgba(${primaryRgb}, 0.15)`,
          boxShadow: isOpen
            ? `0 0 0 3px rgba(${primaryRgb}, 0.1), 0 10px 40px -10px rgba(0,0,0,0.1)`
            : 'none',
          fontFamily: 'DM Sans, sans-serif',
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedAccount ? (
          <div className="flex items-center gap-3">
            {/* Organization Avatar */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{
                background: organizations[selectedAccount.orgId]?.theme.gradientBtn,
              }}
            >
              <span
                className="text-[14px] font-semibold text-white"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                {organizations[selectedAccount.orgId]?.logoLetter}
              </span>
            </div>

            {/* Account Details */}
            <div className="flex-1 min-w-0">
              <div
                className="text-[14px] font-medium text-[#2C2A25] truncate"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {selectedAccount.first} {selectedAccount.last}
              </div>
              <div
                className="text-[12px] truncate"
                style={{ color: `rgba(${primaryRgb}, 0.7)` }}
              >
                {organizations[selectedAccount.orgId]?.name}
              </div>
            </div>

            {/* Chevron */}
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              style={{ color: `rgba(${primaryRgb}, 0.5)` }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100"
              >
                <User className="w-4 h-4 text-gray-400" />
              </div>
              <span className="text-[15px] text-gray-400">Select your account</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        )}
      </button>

      {/* Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 mt-2 bg-white rounded-xl border overflow-hidden z-[100]"
            style={{
              borderColor: `rgba(${primaryRgb}, 0.15)`,
              boxShadow: '0 20px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02)',
              maxHeight: 'min(50vh, 400px)',
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b flex items-center gap-2"
              style={{
                borderColor: `rgba(${primaryRgb}, 0.1)`,
                background: `rgba(${primaryRgb}, 0.03)`,
              }}
            >
              <Building2 className="w-4 h-4" style={{ color: `rgba(${primaryRgb}, 0.5)` }} />
              <span
                className="text-[11px] uppercase tracking-[0.15em] font-semibold"
                style={{ color: `rgba(${primaryRgb}, 0.7)` }}
              >
                Available Accounts ({accounts.length})
              </span>
            </div>

            {/* List */}
            <div ref={listRef} className="max-h-[min(50vh,400px)] overflow-y-auto py-1">
              {accounts.map((account, index) => {
                const org = organizations[account.orgId];
                const isSelected = account.email === value;
                const isFocused = index === focusedIndex;

                return (
                  <motion.button
                    key={account.email}
                    type="button"
                    data-account-item
                    onClick={() => {
                      onChange(account.email);
                      setIsOpen(false);
                      setFocusedIndex(-1);
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 transition-all text-left group ${
                      isSelected || isFocused ? 'bg-opacity-100' : 'bg-opacity-0'
                    }`}
                    style={{
                      background: isSelected
                        ? `rgba(${org.theme.primaryRgb}, 0.1)`
                        : isFocused
                          ? `rgba(${org.theme.primaryRgb}, 0.05)`
                          : 'transparent',
                    }}
                    whileHover={{
                      backgroundColor: `rgba(${org.theme.primaryRgb}, 0.08)`,
                    }}
                  >
                    {/* Organization Avatar */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow"
                      style={{
                        background: org.theme.gradientBtn,
                      }}
                    >
                      <span
                        className="text-[15px] font-semibold text-white"
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
                      >
                        {org.logoLetter}
                      </span>
                    </div>

                    {/* Account Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[14px] font-medium text-[#2C2A25]"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          {account.first} {account.last}
                        </span>
                        {account.role && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase"
                            style={{
                              background: `rgba(${org.theme.primaryRgb}, 0.15)`,
                              color: org.theme.primary,
                            }}
                          >
                            {account.role}
                          </span>
                        )}
                      </div>
                      <div
                        className="text-[12px] mt-0.5 truncate"
                        style={{ color: '#8A8578' }}
                      >
                        {account.email}
                      </div>
                      <div
                        className="text-[11px] font-medium mt-1"
                        style={{ color: org.theme.primary }}
                      >
                        {org.name}
                      </div>
                    </div>

                    {/* Selection Check */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: org.theme.primary,
                        }}
                      >
                        <Check className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer */}
            <div
              className="px-4 py-2.5 border-t"
              style={{
                borderColor: `rgba(${primaryRgb}, 0.1)`,
                background: `rgba(${primaryRgb}, 0.02)`,
              }}
            >
              <p
                className="text-[11px] text-center"
                style={{ color: '#B8B0A0' }}
              >
                Use <kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-[10px]">↑</kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-[10px]">↓</kbd> to navigate,{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-[10px]">Enter</kbd> to select
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EmailSelection({ onEmailSelected }: EmailSelectionProps) {
  const [selectedEmail, setSelectedEmail] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmail) {
      // Elite: Recognition phase - environmental response
      setIsRecognizing(true);
      // The system understands where you belong (900ms shimmer)
      setTimeout(() => {
        onEmailSelected(selectedEmail);
      }, 900);
    }
  };

  // Get organization for preview
  const getOrgForEmail = (email: string) => {
    const account = ACCOUNTS.find(a => a.email === email);
    return account ? ORGANIZATIONS[account.orgId] : null;
  };

  const previewOrg = getOrgForEmail(selectedEmail);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-20 flex items-center justify-center p-4"
    >
      <motion.div
        className="w-full max-w-[480px] px-4 relative"
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main Card - Light mode frosted glass */}
        <div
          className="relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl border"
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderColor: previewOrg ? `rgba(${previewOrg.theme.primaryRgb}, 0.2)` : 'rgba(212,175,55,0.15)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
            transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
          }}
        >
          {/* Elite: Recognition shimmer overlay (no spinners) */}
          {isRecognizing && previewOrg && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: `radial-gradient(ellipse 80% 50% at 50% 50%, rgba(${previewOrg.theme.primaryRgb}, 0.15), transparent)`,
              }}
            >
              {/* Slow pulse shimmer */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  background: `linear-gradient(135deg, transparent, rgba(${previewOrg.theme.primaryRgb}, 0.2), transparent)`,
                }}
              />
            </motion.div>
          )}

          {/* Subtle top border accent */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: previewOrg
                ? `linear-gradient(90deg, transparent, ${previewOrg.theme.primary}, transparent)`
                : 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)',
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          {/* Header */}
          <div className="text-center mb-8">
            {/* Logo Mark */}
            <motion.div
              className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center relative shadow-lg"
              style={{
                background: previewOrg
                  ? previewOrg.theme.gradientBtn
                  : 'linear-gradient(135deg, #D4AF37, #8B7330)',
              }}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <span
                className="text-[28px] font-light italic relative z-10 text-white"
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                }}
              >
                {previewOrg ? previewOrg.logoLetter : 'L'}
              </span>
              {/* Shine overlay */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                }}
              />
            </motion.div>

            <motion.h2
              className="text-[28px] md:text-[32px] mb-3"
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontWeight: 400,
                color: '#2C2A25',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to The Lobbi
            </motion.h2>

            <motion.p
              className="text-sm"
              style={{ color: '#8A8578' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Select your account to continue
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Account Dropdown */}
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
              <AccountDropdown
                value={selectedEmail}
                onChange={setSelectedEmail}
                accounts={ACCOUNTS}
                organizations={ORGANIZATIONS}
                previewOrg={previewOrg}
              />
            </div>

            {/* Selected Account Preview */}
            {selectedEmail && previewOrg && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="flex items-center gap-4 p-4 rounded-xl border overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(${previewOrg.theme.primaryRgb}, 0.05), rgba(${previewOrg.theme.primaryRgb}, 0.02))`,
                  borderColor: `rgba(${previewOrg.theme.primaryRgb}, 0.2)`,
                }}
              >
                {/* Organization Badge */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{
                    background: previewOrg.theme.gradientBtn,
                  }}
                >
                  <span
                    className="text-[20px] font-semibold text-white"
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                    }}
                  >
                    {previewOrg.logoLetter}
                  </span>
                </div>

                {/* Account Info */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[13px] uppercase tracking-[0.1em] mb-1 font-semibold"
                    style={{
                      color: previewOrg.theme.primary,
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {previewOrg.name}
                  </div>
                  <div
                    className="text-[12px] italic"
                    style={{
                      color: `rgba(${previewOrg.theme.primaryRgb}, 0.6)`,
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                    }}
                  >
                    {previewOrg.motto}
                  </div>
                </div>

                {/* Checkmark */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: previewOrg.theme.primary }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            )}

            {/* Continue Button */}
            <motion.button
              type="submit"
              disabled={!selectedEmail}
              className="relative w-full py-4 rounded-xl text-[13px] font-semibold tracking-[0.1em] uppercase overflow-hidden transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
              style={{
                background: previewOrg
                  ? previewOrg.theme.gradientBtn
                  : 'linear-gradient(135deg, #8B7330, #D4AF37, #F4D03F)',
                color: '#fff',
                boxShadow: selectedEmail ? `0 10px 30px -10px rgba(${previewOrg?.theme.primaryRgb || '212,175,55'}, 0.5)` : 'none',
              }}
              whileHover={selectedEmail ? { y: -2, boxShadow: `0 15px 40px -10px rgba(${previewOrg?.theme.primaryRgb || '212,175,55'}, 0.6)` } : {}}
              whileTap={selectedEmail ? { y: 0 } : {}}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Continue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>

              {/* Shine effect */}
              {selectedEmail && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full"
                  animate={{ x: ['0%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div
            className="mt-8 pt-6 border-t text-center"
            style={{
              borderColor: previewOrg
                ? `rgba(${previewOrg.theme.primaryRgb}, 0.1)`
                : 'rgba(212,175,55,0.1)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs" style={{ color: '#B8B0A0' }}>
              Demo mode: Each account is connected to a unique organization theme
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

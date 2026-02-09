import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Building2, User } from 'lucide-react';
import { ACCOUNTS, ORGANIZATIONS, type Account, type Organization } from '@/app/data/themes';

interface EmailSelectionProps {
  onEmailSelected: (email: string) => void;
}

function AccountDropdown({
  value, onChange, accounts, organizations, previewOrg,
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
  const rgb = previewOrg?.theme.primaryRgb || '212,175,55';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false); setFocusedIndex(-1);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setFocusedIndex(p => Math.min(p + 1, accounts.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setFocusedIndex(p => Math.max(p - 1, 0)); }
      else if (e.key === 'Enter' && focusedIndex >= 0) { e.preventDefault(); onChange(accounts[focusedIndex].email); setIsOpen(false); }
      else if (e.key === 'Escape') { setIsOpen(false); setFocusedIndex(-1); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, focusedIndex, accounts, onChange]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      listRef.current.querySelectorAll('[data-account-item]')[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button" onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 border rounded-xl text-left cursor-pointer transition-all duration-300 outline-none bg-white/90"
        style={{
          borderColor: isOpen ? `rgba(${rgb}, 0.5)` : `rgba(${rgb}, 0.15)`,
          boxShadow: isOpen ? `0 0 0 3px rgba(${rgb}, 0.08), 0 8px 32px -8px rgba(0,0,0,0.08)` : '0 1px 3px rgba(0,0,0,0.04)',
        }}
        aria-haspopup="listbox" aria-expanded={isOpen}
      >
        {selectedAccount ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: organizations[selectedAccount.orgId]?.theme.gradientBtn }}>
              <span className="text-[14px] font-semibold text-white"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {organizations[selectedAccount.orgId]?.logoLetter}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium text-[#2C2A25] truncate">{selectedAccount.first} {selectedAccount.last}</div>
              <div className="text-[12px] truncate" style={{ color: `rgba(${rgb}, 0.7)` }}>{organizations[selectedAccount.orgId]?.name}</div>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} style={{ color: `rgba(${rgb}, 0.4)` }} />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-50">
                <User className="w-4 h-4 text-gray-300" />
              </div>
              <span className="text-[15px] text-gray-400">Select your account</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 mt-2 bg-white rounded-xl border overflow-hidden z-[100] max-h-[min(50vh,400px)]"
            style={{ borderColor: `rgba(${rgb}, 0.12)`, boxShadow: '0 16px 48px -12px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.02)' }}
          >
            <div className="px-4 py-2.5 border-b flex items-center gap-2"
              style={{ borderColor: `rgba(${rgb}, 0.08)`, background: `rgba(${rgb}, 0.02)` }}>
              <Building2 className="w-3.5 h-3.5" style={{ color: `rgba(${rgb}, 0.4)` }} />
              <span className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{ color: `rgba(${rgb}, 0.5)` }}>
                Accounts ({accounts.length})
              </span>
            </div>

            <div ref={listRef} className="max-h-[min(50vh,400px)] overflow-y-auto py-1">
              {accounts.map((account, index) => {
                const org = organizations[account.orgId];
                const isSelected = account.email === value;
                const isFocused = index === focusedIndex;
                return (
                  <button
                    key={account.email} type="button" data-account-item
                    onClick={() => { onChange(account.email); setIsOpen(false); }}
                    className="w-full px-4 py-3 flex items-center gap-3 transition-colors duration-150 text-left cursor-pointer"
                    style={{
                      background: isSelected ? `rgba(${org.theme.primaryRgb}, 0.08)` : isFocused ? `rgba(${org.theme.primaryRgb}, 0.04)` : 'transparent',
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: org.theme.gradientBtn }}>
                      <span className="text-[15px] font-semibold text-white"
                        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                        {org.logoLetter}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-medium text-[#2C2A25]">{account.first} {account.last}</span>
                        {account.role && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase"
                            style={{ background: `rgba(${org.theme.primaryRgb}, 0.12)`, color: org.theme.primary }}>
                            {account.role}
                          </span>
                        )}
                      </div>
                      <div className="text-[12px] mt-0.5 truncate text-[#8A8578]">{account.email}</div>
                      <div className="text-[11px] font-medium mt-1" style={{ color: org.theme.primary }}>{org.name}</div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: org.theme.primary }}>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="px-4 py-2 border-t" style={{ borderColor: `rgba(${rgb}, 0.08)`, background: `rgba(${rgb}, 0.02)` }}>
              <p className="text-[11px] text-center text-[#B8B0A0]">
                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-[10px]">{'↑'}</kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-[10px]">{'↓'}</kbd> navigate,{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-gray-100 font-mono text-[10px]">Enter</kbd> select
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
      setIsRecognizing(true);
      setTimeout(() => onEmailSelected(selectedEmail), 900);
    }
  };

  const getOrgForEmail = (email: string) => {
    const account = ACCOUNTS.find(a => a.email === email);
    return account ? ORGANIZATIONS[account.orgId] : null;
  };

  const previewOrg = getOrgForEmail(selectedEmail);
  const rgb = previewOrg?.theme.primaryRgb || '212,175,55';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-20 flex items-center justify-center p-4"
    >
      <motion.div
        className="w-full max-w-[480px] relative"
        initial={{ y: 24, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -16, scale: 0.98, opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative p-8 sm:p-10 rounded-2xl border overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(32px)',
            borderColor: `rgba(${rgb}, 0.15)`,
            boxShadow: `0 24px 64px -16px rgba(0,0,0,0.1), 0 0 0 1px rgba(${rgb}, 0.06)`,
          }}
        >
          {/* Recognition overlay */}
          {isRecognizing && previewOrg && (
            <motion.div
              className="absolute inset-0 z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.3] }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: `radial-gradient(ellipse at center, rgba(${previewOrg.theme.primaryRgb}, 0.12), transparent 70%)` }}
            />
          )}

          {/* Top accent */}
          <motion.div
            className="absolute top-0 left-[10%] right-[10%] h-px"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb}, 0.4), transparent)` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: previewOrg ? previewOrg.theme.gradientBtn : 'linear-gradient(135deg, #D4AF37, #8B7330)',
              }}
              initial={{ scale: 0, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.15, type: 'spring', stiffness: 180, damping: 18 }}
            >
              <span className="text-[24px] font-light italic relative z-10 text-white"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                {previewOrg ? previewOrg.logoLetter : 'L'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
            </motion.div>

            <motion.h2
              className="text-[26px] mb-2 font-normal text-[#2C2A25]"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              Welcome to The Lobbi
            </motion.h2>

            <motion.p
              className="text-sm text-[#8A8578]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Select your account to continue
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] mb-3 font-medium transition-colors duration-300"
                style={{ color: previewOrg ? `rgba(${previewOrg.theme.primaryRgb}, 0.6)` : 'rgba(212,175,55,0.6)' }}>
                Choose Account
              </label>
              <AccountDropdown
                value={selectedEmail} onChange={setSelectedEmail}
                accounts={ACCOUNTS} organizations={ORGANIZATIONS} previewOrg={previewOrg}
              />
            </div>

            {/* Preview */}
            {selectedEmail && previewOrg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-xl border overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(${previewOrg.theme.primaryRgb}, 0.04), rgba(${previewOrg.theme.primaryRgb}, 0.02))`,
                  borderColor: `rgba(${previewOrg.theme.primaryRgb}, 0.15)`,
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: previewOrg.theme.gradientBtn }}>
                  <span className="text-[20px] font-semibold text-white"
                    style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                    {previewOrg.logoLetter}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] uppercase tracking-[0.1em] mb-1 font-semibold" style={{ color: previewOrg.theme.primary }}>
                    {previewOrg.name}
                  </div>
                  <div className="text-[12px] italic" style={{ color: `rgba(${previewOrg.theme.primaryRgb}, 0.5)`, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
                    {previewOrg.motto}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: previewOrg.theme.primary }}>
                  <Check className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            )}

            {/* Continue */}
            <motion.button
              type="submit" disabled={!selectedEmail}
              className="relative w-full py-4 rounded-xl text-[13px] font-semibold tracking-[0.1em] uppercase overflow-hidden transition-all disabled:opacity-30 disabled:cursor-not-allowed group text-white cursor-pointer"
              style={{
                background: previewOrg ? previewOrg.theme.gradientBtn : 'linear-gradient(135deg, #8B7330, #D4AF37, #F4D03F)',
                boxShadow: selectedEmail ? `0 8px 24px -6px rgba(${rgb}, 0.35)` : 'none',
              }}
              whileHover={selectedEmail ? { y: -2, boxShadow: `0 12px 32px -6px rgba(${rgb}, 0.4)` } : {}}
              whileTap={selectedEmail ? { y: 0 } : {}}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Continue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              {selectedEmail && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
                />
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div
            className="mt-7 pt-5 border-t text-center"
            style={{ borderColor: `rgba(${rgb}, 0.08)` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-[#B8B0A0]">Demo mode: Each account connects to a unique theme</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

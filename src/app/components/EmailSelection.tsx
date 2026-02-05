import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ACCOUNTS, ORGANIZATIONS } from '@/app/data/themes';

interface EmailSelectionProps {
  onEmailSelected: (email: string) => void;
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
        className="w-full max-w-[440px] relative"
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Main Card - Light mode frosted glass */}
        <div
          className="relative p-12 rounded-2xl border overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: previewOrg ? `rgba(${previewOrg.theme.primaryRgb}, 0.15)` : 'rgba(212,175,55,0.1)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
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
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: previewOrg 
                ? `linear-gradient(90deg, transparent, ${previewOrg.theme.primary}, transparent)`
                : 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          {/* Header */}
          <div className="text-center mb-10">
            {/* Logo Mark */}
            <motion.div
              className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center relative"
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
                className="text-[28px] font-light italic relative z-10"
                style={{ 
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  color: previewOrg && (previewOrg.id === 'pacific-club' || previewOrg.id === 'crown-estates') ? '#fff' : '#fff',
                }}
              >
                {previewOrg ? previewOrg.logoLetter : 'L'}
              </span>
              {/* Shine overlay */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                }}
              />
            </motion.div>

            <motion.h2
              className="text-[32px] mb-3"
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
              <div className="relative">
                <select
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 border rounded-xl text-[#2C2A25] text-[15px] appearance-none cursor-pointer transition-all outline-none bg-white"
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
                        {account.first} {account.last} ({account.email}) - {org.name}
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
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            {/* Selected Account Preview */}
            {selectedEmail && previewOrg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-4 rounded-xl border"
                style={{
                  background: `rgba(${previewOrg.theme.primaryRgb}, 0.05)`,
                  borderColor: `rgba(${previewOrg.theme.primaryRgb}, 0.2)`,
                }}
              >
                {/* Organization Badge */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: previewOrg.theme.gradientBtn,
                  }}
                >
                  <span
                    className="text-[20px] font-semibold"
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      color: previewOrg.id === 'pacific-club' || previewOrg.id === 'crown-estates' ? '#fff' : '#0A0806',
                    }}
                  >
                    {previewOrg.logoLetter}
                  </span>
                </div>
                
                {/* Account Info */}
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
                    className="text-[11px] italic"
                    style={{ 
                      color: `rgba(${previewOrg.theme.primaryRgb}, 0.5)`,
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                    }}
                  >
                    {previewOrg.motto}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Continue Button */}
            <motion.button
              type="submit"
              disabled={!selectedEmail}
              className="relative w-full py-4 rounded-xl text-[13px] font-semibold tracking-[0.1em] uppercase text-[#0A0806] overflow-hidden transition-all disabled:opacity-40 disabled:cursor-not-allowed group"
              style={{
                background: previewOrg 
                  ? previewOrg.theme.gradientBtn
                  : 'linear-gradient(135deg, #8B7330, #D4AF37, #F4D03F)',
                color: previewOrg && (previewOrg.id === 'pacific-club' || previewOrg.id === 'crown-estates') ? '#fff' : '#0A0806',
              }}
              whileHover={selectedEmail ? { y: -2 } : {}}
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
                ? `rgba(${previewOrg.theme.primaryRgb}, 0.08)`
                : 'rgba(212,175,55,0.08)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs" style={{ color: '#B8B0A0' }}>
              Demo mode: Each account is connected to a unique organization
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
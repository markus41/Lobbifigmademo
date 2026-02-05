import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Calendar, CreditCard, BookOpen, FileText, Award, Vote, Globe, ChevronRight, Bell, Settings } from 'lucide-react';
import type { Account, Organization } from '../data/themes';

interface MemberPortalProps {
  isOpen: boolean;
  onClose: () => void;
  organization?: Organization;
  account?: Account;
}

const menuItems = [
  { icon: User, title: 'My Profile', subtitle: 'Update personal info' },
  { icon: Calendar, title: 'Events', subtitle: 'Browse & register' },
  { icon: CreditCard, title: 'Dues & Payments', subtitle: 'Pay dues, view history' },
  { icon: BookOpen, title: 'Education', subtitle: 'CE tracking, courses' },
  { icon: FileText, title: 'Documents', subtitle: 'Access shared files' },
  { icon: Award, title: 'Certifications', subtitle: 'View & renew' },
  { icon: Vote, title: 'Elections', subtitle: 'Vote & run for office' },
  { icon: Globe, title: 'Social', subtitle: 'Connect with members' },
];

export function MemberPortal({ isOpen, onClose, organization, account }: MemberPortalProps) {
  const rgb = organization?.theme.primaryRgb || '212,175,55';
  const primary = organization?.theme.primary || '#D4AF37';
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const orgName = organization?.name || 'The Lobbi';
  const logoLetter = organization?.logoLetter || 'TL';
  const memberName = account?.name || 'Member';
  const memberInitials = account?.initials || 'M';
  const memberRole = account?.role || 'Member';
  const gradient = organization?.theme.avatarBg || `linear-gradient(135deg, ${primary}, #8B7330)`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Phone container */}
          <motion.div
            className="relative w-full max-w-[428px] h-[90vh] max-h-[852px] bg-gray-50 rounded-t-[2.5rem] rounded-b-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Status bar */}
            <div className="bg-gray-900 px-6 pt-3 pb-1 flex items-center justify-between">
              <span className="text-white/70 text-xs font-medium" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                9:41
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-2.5 rounded-sm border border-white/70 relative">
                  <div className="absolute inset-[1px] right-[2px] rounded-[1px] bg-white/70" />
                </div>
              </div>
            </div>

            {/* Header bar */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{
                background: `linear-gradient(135deg, rgba(${rgb}, 0.95), rgba(${rgb}, 0.8))`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: gradient }}
                >
                  <span
                    className="text-white text-xs font-bold tracking-wide"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {logoLetter}
                  </span>
                </div>
                <span
                  className="text-white font-semibold text-sm tracking-wide"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {orgName}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Profile card section */}
              <motion.div
                className="px-5 pt-6 pb-5"
                style={{
                  background: `linear-gradient(180deg, rgba(${rgb}, 0.15) 0%, transparent 100%)`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                    style={{ background: gradient }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
                  >
                    <span
                      className="text-white text-xl font-bold"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {memberInitials}
                    </span>
                  </motion.div>
                  <div className="min-w-0">
                    <h2
                      className="text-gray-900 text-lg font-bold leading-tight truncate"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {memberName}
                    </h2>
                    <p
                      className="text-gray-600 text-sm truncate"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {memberRole}
                    </p>
                    <p
                      className="text-xs truncate mt-0.5"
                      style={{ color: primary, fontFamily: 'DM Sans, sans-serif' }}
                    >
                      {orgName}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                className="px-5 pb-5"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
              >
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'Events', value: '3 upcoming' },
                    { label: 'CE Hours', value: '24/40' },
                    { label: 'Dues', value: 'Current' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                    >
                      <p
                        className="text-xs text-gray-500 mb-0.5"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {stat.label}
                      </p>
                      <p
                        className="text-sm font-bold"
                        style={{ color: primary, fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Menu grid */}
              <div className="px-5 pb-6">
                <div className="grid grid-cols-2 gap-3">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.title}
                        className="bg-white rounded-xl p-4 text-left shadow-sm border border-gray-100 flex flex-col gap-3 relative overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.35 + index * 0.06,
                          duration: 0.4,
                          type: 'spring',
                          damping: 20,
                          stiffness: 200,
                        }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveItem(item.title)}
                      >
                        <div className="flex items-start justify-between w-full">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `rgba(${rgb}, 0.12)` }}
                          >
                            <Icon
                              className="w-5 h-5"
                              style={{ color: primary }}
                            />
                          </div>
                          <ChevronRight
                            className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors mt-1"
                          />
                        </div>
                        <div className="min-w-0">
                          <p
                            className="text-gray-900 font-semibold text-sm leading-tight"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          >
                            {item.title}
                          </p>
                          <p
                            className="text-gray-500 text-xs mt-0.5 leading-snug"
                            style={{ fontFamily: 'DM Sans, sans-serif' }}
                          >
                            {item.subtitle}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <motion.div
              className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center relative"
                style={{ backgroundColor: `rgba(${rgb}, 0.08)` }}
              >
                <Bell className="w-5 h-5" style={{ color: primary }} />
                <span
                  className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-white"
                  style={{ backgroundColor: primary }}
                />
              </motion.button>

              <div
                className="text-xs text-gray-400"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Member Portal
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `rgba(${rgb}, 0.08)` }}
              >
                <Settings className="w-5 h-5" style={{ color: primary }} />
              </motion.button>
            </motion.div>

            {/* Home indicator */}
            <div className="bg-white pb-2 pt-1 flex justify-center">
              <div className="w-32 h-1 rounded-full bg-gray-300" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

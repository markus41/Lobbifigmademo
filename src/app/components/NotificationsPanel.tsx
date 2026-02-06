import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'member' | 'event' | 'payment' | 'document' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  primaryColor: string;
  primaryRgb: string;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'member',
    title: 'New Member Registration',
    message: 'James Wilson joined as Professional Member',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'event',
    title: 'Event Registration',
    message: '15 new registrations for Annual Gala',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    message: '$2,500 membership renewal from Sarah Chen',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'document',
    title: 'Document Uploaded',
    message: 'Q1 Financial Report added to The Vault',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Renewal Reminders Sent',
    message: '12 automated reminder emails delivered',
    time: '5 hours ago',
    read: true,
  },
];

const typeIcons: Record<string, React.ReactNode> = {
  member: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  event: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  payment: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  document: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  system: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

export function NotificationsPanel({ isOpen, onClose, primaryColor, primaryRgb }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(sampleNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[90]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-[100] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    color: '#1A1815',
                  }}
                >
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <p className="text-xs" style={{ color: '#8A8578' }}>
                    {unreadCount} unread
                  </p>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-100 transition-colors"
                  style={{ color: primaryColor }}
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 border-b border-gray-50 cursor-pointer transition-colors hover:bg-gray-50 ${
                    !notification.read ? 'bg-[#FAFAF8]' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `rgba(${primaryRgb}, 0.1)`,
                        color: primaryColor,
                      }}
                    >
                      {typeIcons[notification.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm ${!notification.read ? 'font-medium' : ''}`}
                          style={{ color: '#1A1815' }}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                            style={{ background: primaryColor }}
                          />
                        )}
                      </div>
                      <p
                        className="text-xs mt-0.5 truncate"
                        style={{ color: '#8A8578' }}
                      >
                        {notification.message}
                      </p>
                      <p
                        className="text-[10px] mt-1"
                        style={{ color: '#B8B0A0' }}
                      >
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 bg-[#FAFAF8]">
              <button
                className="w-full py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100"
                style={{ color: primaryColor }}
              >
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { type ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'motion/react';
import { cn } from '@/lib/utils';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Mobile sidebar drawer.
 * Full-height, left-anchored, 280px wide with backdrop blur overlay.
 * Supports swipe-to-close gesture and spring physics animation.
 * Themed via CSS custom properties (var(--theme-*)).
 */
export function MobileDrawer({ isOpen, onClose, children }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // Dismiss if dragged left past threshold or with sufficient velocity
    if (info.offset.x < -80 || info.velocity.x < -300) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200]">
          {/* Backdrop overlay with blur */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            ref={drawerRef}
            className={cn(
              'absolute top-0 left-0 h-full flex flex-col overflow-y-auto overflow-x-hidden'
            )}
            style={{
              width: 280,
              background:
                'linear-gradient(180deg, rgba(var(--theme-primary-rgb, 212,175,55), 0.06) 0%, transparent 40%), var(--theme-bg-card, #FFFFFF)',
              boxShadow: 'var(--theme-shadow-xl, 0 20px 60px -12px rgba(0,0,0,0.25))',
              borderRight: '1px solid var(--theme-border-light, #E4E4E7)',
            }}
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{
              type: 'spring',
              stiffness: 380,
              damping: 32,
              mass: 0.8,
            }}
            drag="x"
            dragConstraints={{ left: -280, right: 0 }}
            dragElastic={0.15}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
          >
            {/* Close button */}
            <div className="flex items-center justify-end p-3">
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
                style={{
                  color: 'var(--theme-text-muted, #A1A1AA)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
                  e.currentTarget.style.color = 'var(--theme-text-primary, #09090B)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--theme-text-muted, #A1A1AA)';
                }}
                aria-label="Close drawer"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Drawer content (pass sidebar children here) */}
            <div className="flex-1 min-h-0">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

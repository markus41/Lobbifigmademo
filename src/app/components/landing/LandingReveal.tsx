import { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface LandingRevealProps extends PropsWithChildren {
  id?: string;
  role?: string;
  'aria-label'?: string;
  className?: string;
  delay?: number;
}

export function LandingReveal({ children, className, delay = 0, id, role, 'aria-label': ariaLabel }: LandingRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      id={id}
      role={role}
      aria-label={ariaLabel}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 30 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.7,
              delay,
              ease: [0.4, 0, 0.2, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}

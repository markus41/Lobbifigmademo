import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface StageCinematicTransitionProps {
  transitionKey: string;
  label: string;
  primaryRgb?: string;
  onMidpoint?: () => void;
  onComplete?: () => void;
}

export function StageCinematicTransition({
  transitionKey,
  label,
  primaryRgb = '212,175,55',
  onMidpoint,
  onComplete,
}: StageCinematicTransitionProps) {
  const firedMidpointRef = useRef(false);
  const firedCompleteRef = useRef(false);

  useEffect(() => {
    firedMidpointRef.current = false;
    firedCompleteRef.current = false;
    const midpointTimer = window.setTimeout(() => {
      firedMidpointRef.current = true;
      onMidpoint?.();
    }, 200);
    const completeTimer = window.setTimeout(() => {
      firedCompleteRef.current = true;
      onComplete?.();
    }, 400);

    return () => {
      window.clearTimeout(midpointTimer);
      window.clearTimeout(completeTimer);
      if (!firedMidpointRef.current) {
        onMidpoint?.();
      }
      if (!firedCompleteRef.current) {
        onComplete?.();
      }
    };
  }, [onMidpoint, onComplete, transitionKey]);

  return (
    <motion.div
      key={transitionKey}
      className="fixed inset-0 z-[75] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(4px)',
        }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />

      <motion.div
        className="relative rounded-2xl border border-white/35 bg-white/75 px-8 py-6 shadow-[0_26px_76px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <span
          className="text-[11px] uppercase tracking-[0.28em]"
          style={{
            color: `rgba(${primaryRgb}, 0.92)`,
            fontFamily: 'var(--theme-font-body, DM Sans, sans-serif)',
            fontWeight: 600,
          }}
        >
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
}

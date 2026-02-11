import { motion } from 'motion/react';
import { LottieIcon } from './lottie/LottieIcon';
import { lottieIcons } from '../lottie';

interface StageCinematicTransitionProps {
  transitionKey: string;
  label: string;
  primaryRgb?: string;
}

export function StageCinematicTransition({
  transitionKey,
  label,
  primaryRgb = '212,175,55',
}: StageCinematicTransitionProps) {
  return (
    <motion.div
      key={transitionKey}
      className="fixed inset-0 z-[75] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 72% 54% at 50% 50%, rgba(${primaryRgb}, 0.26) 0%, rgba(${primaryRgb}, 0.1) 35%, rgba(25, 22, 15, 0.34) 100%)`,
          backdropFilter: 'blur(6px)',
        }}
        animate={{ opacity: [0.1, 0.95, 0.8, 0.05] }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="relative rounded-2xl border border-white/35 bg-white/75 px-7 py-5 shadow-[0_26px_76px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.88, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.88, 1, 1.01, 1], y: [10, 0, 0, -8] }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-4">
          <LottieIcon
            animationData={lottieIcons.routeArrow}
            size={34}
            speed={1.15}
            ariaLabel="Transition route icon"
            glowRgb={primaryRgb}
          />
          <span
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{
              color: `rgba(${primaryRgb}, 0.92)`,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
            }}
          >
            {label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

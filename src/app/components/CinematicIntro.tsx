import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LottieIcon } from './lottie/LottieIcon';
import { lottieIcons } from '../lottie';

interface CinematicIntroProps {
  onComplete: () => void;
  primaryRgb?: string;
}

export function CinematicIntro({ onComplete, primaryRgb = '212,175,55' }: CinematicIntroProps) {
  const [skipVisible, setSkipVisible] = useState(false);
  const completedRef = useRef(false);

  const completeSequence = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    sessionStorage.setItem('lobbi_intro_seen', '1');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const revealSkipTimer = setTimeout(() => setSkipVisible(true), 400);
    const finishTimer = setTimeout(() => completeSequence(), 2000);

    return () => {
      clearTimeout(revealSkipTimer);
      clearTimeout(finishTimer);
    };
  }, [completeSequence]);

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/50 bg-white/65 shadow-[0_24px_72px_rgba(0,0,0,0.14)] backdrop-blur-sm"
        >
          <LottieIcon
            animationData={lottieIcons.portalGate}
            size={72}
            speed={0.9}
            ariaLabel="Portal sequence icon"
            glowRgb={primaryRgb}
          />
        </motion.div>

        <motion.h1
          className="text-[clamp(2.5rem,6vw,5.8rem)] tracking-[0.22em]"
          style={{ fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)', fontWeight: 500, color: 'var(--theme-primary-dark, #9C7F28)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          THE LOBBI
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-[540px] text-[15px] leading-relaxed"
          style={{ color: 'var(--theme-text-secondary, #625D4E)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          Opening a cinematic member experience
        </motion.p>
      </div>

      {skipVisible && (
        <motion.button
          type="button"
          onClick={completeSequence}
          className="absolute right-6 top-6 rounded-full border border-white/40 bg-white/80 px-4 py-2 text-[10px] uppercase tracking-[0.24em] backdrop-blur"
          style={{ color: 'var(--theme-text-secondary, #6C624D)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          Skip intro
        </motion.button>
      )}
    </motion.div>
  );
}

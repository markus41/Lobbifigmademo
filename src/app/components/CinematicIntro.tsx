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
    const revealSkipTimer = setTimeout(() => setSkipVisible(true), 850);
    const finishTimer = setTimeout(() => completeSequence(), 4600);

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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-[74vh] w-[74vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, rgba(${primaryRgb}, 0.26) 0%, transparent 72%)` }}
        animate={{ scale: [0.88, 1.08, 0.94], opacity: [0.45, 0.95, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
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

        <motion.p
          className="mb-3 text-[11px] uppercase tracking-[0.38em]"
          style={{ color: `rgba(${primaryRgb}, 0.74)` }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          The Lobbi Presents
        </motion.p>

        <motion.h1
          className="text-[clamp(2.5rem,6vw,5.8rem)] tracking-[0.22em] text-[#9C7F28]"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 500 }}
          initial={{ opacity: 0, y: 18, letterSpacing: '0.45em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          THE LOBBI
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-[540px] text-[15px] leading-relaxed text-[#625D4E]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Opening a cinematic member experience
        </motion.p>

        <motion.div
          className="mx-auto mt-9 h-[2px] w-[260px] overflow-hidden rounded-full bg-black/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, rgba(${primaryRgb}, 0.45), rgba(${primaryRgb}, 0.95), rgba(${primaryRgb}, 0.45))` }}
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3.7, ease: [0.22, 1, 0.36, 1], repeat: Infinity }}
          />
        </motion.div>
      </div>

      {skipVisible && (
        <motion.button
          type="button"
          onClick={completeSequence}
          className="absolute right-6 top-6 rounded-full border border-white/40 bg-white/80 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-[#6C624D] backdrop-blur"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Skip intro
        </motion.button>
      )}
    </motion.div>
  );
}

import { motion } from 'motion/react';

interface CinematicBackgroundProps {
  primaryRgb?: string;
  stage?: string;
}

export function CinematicBackground({ primaryRgb = '212,175,55', stage = 'logo' }: CinematicBackgroundProps) {
  const boost = (stage === 'email' || stage === 'orgLogin') ? 1.4 : 1;

  return (
    <>
      {/* Base */}
      <div className="fixed inset-0 z-0" style={{
        background: `linear-gradient(180deg, #FDFAF0 0%, #FAF6E9 40%, #F5F0E0 100%)`,
      }} />

      {/* Primary orb - slow breathing */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute"
          style={{
            width: '60vmax', height: '60vmax',
            top: '35%', left: '50%',
            transform: 'translate(-50%,-50%)',
            background: `radial-gradient(ellipse at center, rgba(${primaryRgb}, ${0.1 * boost}) 0%, transparent 65%)`,
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Secondary accent orbs */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      >
        <motion.div
          className="absolute"
          style={{
            width: '35vmax', height: '35vmax',
            top: '25%', left: '20%',
            background: `radial-gradient(circle, rgba(${primaryRgb}, ${0.05 * boost}) 0%, transparent 60%)`,
            filter: 'blur(50px)',
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute"
          style={{
            width: '30vmax', height: '30vmax',
            top: '55%', right: '15%',
            background: `radial-gradient(circle, rgba(${primaryRgb}, ${0.04 * boost}) 0%, transparent 55%)`,
            filter: 'blur(50px)',
          }}
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Subtle vignette */}
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{
        background: 'radial-gradient(ellipse 75% 65% at 50% 50%, transparent 45%, rgba(240,236,224,0.5) 100%)',
      }} />
    </>
  );
}

import { motion } from 'motion/react';
import { ParticlesCanvas } from './ParticlesCanvas';

interface CinematicBackgroundProps {
  primaryRgb?: string;
  stage?: string;
}

export function CinematicBackground({ primaryRgb = '212,175,55', stage = 'logo' }: CinematicBackgroundProps) {
  // Boost intensity for stages without their own background elements
  const isBareStage = stage === 'email' || stage === 'orgLogin';
  const boost = isBareStage ? 1.5 : 1;

  return (
    <>
      {/* Base Light Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#FCF8EF] via-[#F7F1E3] to-[#EFE6D4] z-0" />

      {/* Animated Radial Gradients */}
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.3 }}
      >
        {/* Primary ambient glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${primaryRgb}, ${0.12 * boost}) 0%, transparent 70%)`,
          }}
        />

        {/* Secondary glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 70%, rgba(${primaryRgb}, ${0.07 * boost}) 0%, transparent 50%)`,
          }}
        />

        {/* Tertiary accent */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 30%, rgba(${primaryRgb}, ${0.07 * boost}) 0%, transparent 40%)`,
          }}
        />
      </motion.div>

      {/* Slow aurora sweep for cinematic depth */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `linear-gradient(120deg, rgba(${primaryRgb}, ${0.09 * boost}) 0%, rgba(${primaryRgb}, 0) 45%, rgba(${primaryRgb}, ${0.07 * boost}) 70%, rgba(${primaryRgb}, 0) 100%)`,
          backgroundSize: '200% 200%',
          mixBlendMode: 'multiply',
        }}
        animate={{ backgroundPosition: ['0% 45%', '100% 55%', '0% 45%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Warm center glow for depth */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      >
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full"
          style={{
            background: `radial-gradient(ellipse, rgba(${primaryRgb}, ${0.08 * boost}) 0%, transparent 60%)`,
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(237, 232, 221, 0.4) 80%, rgba(237, 232, 221, 0.6) 100%)',
        }}
      />

      {/* Paper texture */}
      <motion.div
        className="fixed inset-0 z-[3] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px',
          mixBlendMode: 'multiply',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '-2px -2px', '2px 1px', '0px 0px'],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Particles */}
      <ParticlesCanvas color={primaryRgb} intensity={isBareStage ? 0.6 : 0.5} />

      {/* Light Rays */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.05]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 4, delay: 1 }}
        style={{
          background: `conic-gradient(from 0deg at 50% 50%,
            transparent 0deg,
            rgba(${primaryRgb}, 0.12) 45deg,
            transparent 90deg,
            transparent 180deg,
            rgba(${primaryRgb}, 0.12) 225deg,
            transparent 270deg,
            transparent 360deg)`,
        }}
      />
    </>
  );
}

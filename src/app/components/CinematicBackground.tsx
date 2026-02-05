import { motion } from 'motion/react';
import { ParticlesCanvas } from './ParticlesCanvas';

interface CinematicBackgroundProps {
  primaryRgb?: string;
  stage?: string;
}

export function CinematicBackground({ primaryRgb = '212,175,55', stage = 'logo' }: CinematicBackgroundProps) {
  return (
    <>
      {/* Base Light Background - Quiet Money Aesthetic */}
      <div className="fixed inset-0 bg-[#FAF6E9] z-0" />

      {/* Animated Radial Gradients - Subtler for light mode */}
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      >
        {/* Primary ambient glow - very subtle */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${primaryRgb}, 0.04) 0%, transparent 70%)`,
          }}
        />
        
        {/* Secondary softer glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 70%, rgba(${primaryRgb}, 0.02) 0%, transparent 50%)`,
          }}
        />
        
        {/* Tertiary accent */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 30%, rgba(${primaryRgb}, 0.02) 0%, transparent 40%)`,
          }}
        />
      </motion.div>

      {/* Light Vignette - barely perceptible */}
      <div 
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(237, 232, 221, 0.3) 80%, rgba(237, 232, 221, 0.5) 100%)',
        }}
      />

      {/* Paper texture - Enhanced for light mode */}
      <motion.div
        className="fixed inset-0 z-[3] pointer-events-none opacity-[0.015]"
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

      {/* Particles - Lighter color for light mode */}
      <ParticlesCanvas color={primaryRgb} intensity={0.3} />

      {/* Subtle Light Rays - Very faint for light mode */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.015]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.015 }}
        transition={{ duration: 4, delay: 1 }}
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, 
            transparent 0deg, 
            rgba(${primaryRgb}, 0.05) 45deg, 
            transparent 90deg,
            transparent 180deg,
            rgba(${primaryRgb}, 0.05) 225deg,
            transparent 270deg,
            transparent 360deg)`,
        }}
      />
    </>
  );
}
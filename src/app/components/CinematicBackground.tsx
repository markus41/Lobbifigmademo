import { motion } from 'motion/react';
import { ParticlesCanvas } from './ParticlesCanvas';

interface CinematicBackgroundProps {
  primaryRgb?: string;
  stage?: string;
}

export function CinematicBackground({ primaryRgb = '212,175,55', stage = 'logo' }: CinematicBackgroundProps) {
  const isLanding = stage === 'landing';

  return (
    <>
      {/* Base Light Background - Quiet Money Aesthetic */}
      <div className="fixed inset-0 bg-[#FAF6E9] z-0" />

      {/* Animated Radial Gradients - Dynamic movement */}
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      >
        {/* Primary ambient glow - slowly drifting */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse 60% 50% at 48% 43%, rgba(${primaryRgb}, 0.05) 0%, transparent 70%)`,
              `radial-gradient(ellipse 65% 55% at 52% 47%, rgba(${primaryRgb}, 0.06) 0%, transparent 70%)`,
              `radial-gradient(ellipse 60% 50% at 48% 43%, rgba(${primaryRgb}, 0.05) 0%, transparent 70%)`,
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Secondary drifting glow */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 28% 68%, rgba(${primaryRgb}, 0.03) 0%, transparent 50%)`,
              `radial-gradient(circle at 32% 72%, rgba(${primaryRgb}, 0.04) 0%, transparent 55%)`,
              `radial-gradient(circle at 28% 68%, rgba(${primaryRgb}, 0.03) 0%, transparent 50%)`,
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Tertiary drifting accent */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(circle at 72% 28%, rgba(${primaryRgb}, 0.02) 0%, transparent 40%)`,
              `radial-gradient(circle at 68% 32%, rgba(${primaryRgb}, 0.04) 0%, transparent 45%)`,
              `radial-gradient(circle at 72% 28%, rgba(${primaryRgb}, 0.02) 0%, transparent 40%)`,
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
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

      {/* Particles - Higher intensity on landing page */}
      <ParticlesCanvas color={primaryRgb} intensity={isLanding ? 0.5 : 0.3} />

      {/* Subtle Light Rays - Animated rotation for living feel */}
      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.015, rotate: 15 }}
        transition={{
          opacity: { duration: 4, delay: 1 },
          rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
        }}
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

      {/* Extra: Slow-moving horizontal light band on landing */}
      {isLanding && (
        <motion.div
          className="fixed inset-0 z-[1] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
        >
          <motion.div
            className="absolute w-full h-[1px]"
            style={{
              background: `linear-gradient(90deg, transparent 10%, rgba(${primaryRgb}, 0.06) 30%, rgba(${primaryRgb}, 0.08) 50%, rgba(${primaryRgb}, 0.06) 70%, transparent 90%)`,
              top: '50%',
            }}
            animate={{
              top: ['48%', '52%', '48%'],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}
    </>
  );
}

import { motion } from 'motion/react';
import { ParticlesCanvas } from './ParticlesCanvas';

interface CinematicBackgroundProps {
  primaryRgb?: string;
  stage?: string;
}

interface StageMood {
  ambientAlpha: number;
  beamAlpha: number;
  particleIntensity: number;
  centerGlowAlpha: number;
  auraScale: number;
}

const STAGE_MOODS: Record<string, StageMood> = {
  logo: { ambientAlpha: 0.12, beamAlpha: 0.14, particleIntensity: 0.78, centerGlowAlpha: 0.2, auraScale: 1.08 },
  landing: { ambientAlpha: 0.11, beamAlpha: 0.12, particleIntensity: 0.74, centerGlowAlpha: 0.18, auraScale: 1.04 },
  email: { ambientAlpha: 0.135, beamAlpha: 0.14, particleIntensity: 0.98, centerGlowAlpha: 0.23, auraScale: 1.14 },
  orgLogin: { ambientAlpha: 0.15, beamAlpha: 0.15, particleIntensity: 1.05, centerGlowAlpha: 0.24, auraScale: 1.16 },
  welcome: { ambientAlpha: 0.13, beamAlpha: 0.12, particleIntensity: 0.95, centerGlowAlpha: 0.2, auraScale: 1.1 },
  dashboardEntry: { ambientAlpha: 0.165, beamAlpha: 0.18, particleIntensity: 1.2, centerGlowAlpha: 0.28, auraScale: 1.24 },
  memberPortal: { ambientAlpha: 0.1, beamAlpha: 0.11, particleIntensity: 0.72, centerGlowAlpha: 0.16, auraScale: 1.05 },
};

const DEFAULT_MOOD: StageMood = STAGE_MOODS.landing;

export function CinematicBackground({ primaryRgb = '212,175,55', stage = 'landing' }: CinematicBackgroundProps) {
  const mood = STAGE_MOODS[stage] ?? DEFAULT_MOOD;

  return (
    <>
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `radial-gradient(140% 110% at 50% 50%, rgba(255, 252, 243, 0.96) 0%, rgba(249, 244, 231, 0.95) 45%, rgba(238, 229, 208, 0.94) 100%)`,
        }}
      />

      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 40%', '100% 60%', '0% 40%'],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{
            opacity: mood.ambientAlpha,
            backgroundImage: `linear-gradient(120deg, rgba(${primaryRgb}, 0.45) 0%, rgba(${primaryRgb}, 0.06) 36%, rgba(${primaryRgb}, 0.38) 100%)`,
            backgroundSize: '200% 200%',
            mixBlendMode: 'multiply',
          }}
        />

        <motion.div
          className="absolute -left-[18vw] top-[4vh] h-[56vh] w-[56vw] rounded-full blur-[120px]"
          animate={{ x: [0, 28, 0], y: [0, 18, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: `radial-gradient(circle, rgba(${primaryRgb}, ${mood.ambientAlpha * 1.9}) 0%, transparent 72%)` }}
        />

        <motion.div
          className="absolute right-[-22vw] top-[28vh] h-[62vh] w-[64vw] rounded-full blur-[140px]"
          animate={{ x: [0, -26, 0], y: [0, 24, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
          style={{ background: `radial-gradient(circle, rgba(${primaryRgb}, ${mood.ambientAlpha * 1.55}) 0%, transparent 74%)` }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[72vh] w-[66vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]"
          animate={{ scale: [mood.auraScale * 0.92, mood.auraScale, mood.auraScale * 0.94], opacity: [0.72, 1, 0.76] }}
          transition={{ duration: 10.5, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: `radial-gradient(ellipse at center, rgba(${primaryRgb}, ${mood.centerGlowAlpha}) 0%, rgba(${primaryRgb}, ${mood.centerGlowAlpha * 0.35}) 38%, transparent 75%)`,
          }}
        />
      </motion.div>

      <motion.div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(${primaryRgb}, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(${primaryRgb}, 0.05) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(circle at 50% 45%, rgba(0,0,0,0.55) 20%, rgba(0,0,0,0.16) 70%, transparent 100%)',
          opacity: 0.26,
        }}
        animate={{ backgroundPosition: ['0px 0px', '0px 72px', '72px 72px'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />

      {[0, 1, 2].map((index) => (
        <motion.div
          key={`cinematic-beam-${index}`}
          className="fixed left-1/2 top-1/2 z-[1] h-[170vh] w-[34vw] pointer-events-none"
          style={{
            transformOrigin: '50% 50%',
            background: `linear-gradient(to bottom, rgba(${primaryRgb}, ${mood.beamAlpha * (index === 1 ? 1 : 0.7)}) 0%, rgba(${primaryRgb}, 0) 78%)`,
            filter: 'blur(20px)',
            mixBlendMode: 'screen',
          }}
          animate={{
            rotate: index === 0 ? [-33, -18, -33] : index === 1 ? [0, 16, 0] : [28, 18, 28],
            opacity: index === 1 ? [0.18, 0.34, 0.18] : [0.1, 0.22, 0.1],
          }}
          transition={{
            duration: 16 + index * 4.2,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}

      <motion.div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, rgba(${primaryRgb}, 0.16), transparent 18%, rgba(${primaryRgb}, 0.12), transparent 44%, rgba(${primaryRgb}, 0.14), transparent 70%, rgba(${primaryRgb}, 0.18), transparent 100%)`,
          maskImage: 'radial-gradient(circle at center, rgba(0,0,0,0.56), transparent 75%)',
          mixBlendMode: 'overlay',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
      />

      <ParticlesCanvas color={primaryRgb} intensity={mood.particleIntensity} cinematic />

      <motion.div
        className="fixed inset-0 z-[3] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.24' numOctaves='3' seed='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
          opacity: 0.05,
        }}
        animate={{ backgroundPosition: ['0px 0px', '1px 2px', '-1px 1px', '0px 0px'] }}
        transition={{ duration: 1.15, repeat: Infinity, ease: 'linear' }}
      />

      <div
        className="fixed inset-0 z-[4] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 74% 62% at 50% 50%, rgba(250, 245, 234, 0.02) 0%, rgba(245, 237, 220, 0.24) 62%, rgba(235, 226, 206, 0.58) 100%)',
        }}
      />
    </>
  );
}

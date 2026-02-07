import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface LandingPageProps {
  onLoginClick: () => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  const shimmerRef = useRef<HTMLDivElement>(null);
  const shimmerX = useMotionValue(-200);
  const shimmerOpacity = useTransform(shimmerX, [-200, 0, 200, 400], [0, 0.6, 0.6, 0]);

  // Golden light sweep across the title after letters appear
  useEffect(() => {
    const timeout = setTimeout(() => {
      animate(shimmerX, 400, {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      });
    }, 1800);
    return () => clearTimeout(timeout);
  }, [shimmerX]);

  const brandLetters = 'THE LOBBI'.split('');

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0, scale: 1.08 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
      transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient glow pulse behind content */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.25] }}
        transition={{ duration: 4, ease: 'easeOut', times: [0, 0.5, 1] }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.03) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Breathing ambient halo */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.05) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Art Deco Corner Ornaments - Animated entrance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top Left */}
        <motion.svg
          className="absolute top-8 left-8 w-24 h-24"
          viewBox="0 0 100 100"
          style={{ color: '#8B7330' }}
          initial={{ opacity: 0, scale: 0.5, x: -20, y: -20 }}
          animate={{ opacity: 0.08, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M0,0 L40,0 L40,2 L2,2 L2,40 L0,40 Z" fill="currentColor" />
          <path d="M10,10 L30,10 L30,11 L11,11 L11,30 L10,30 Z" fill="currentColor" />
          <path d="M15,15 L20,15 L20,16 L16,16 L16,20 L15,20 Z" fill="currentColor" />
        </motion.svg>

        {/* Top Right */}
        <motion.svg
          className="absolute top-8 right-8 w-24 h-24"
          viewBox="0 0 100 100"
          style={{ color: '#8B7330' }}
          initial={{ opacity: 0, scale: 0.5, x: 20, y: -20 }}
          animate={{ opacity: 0.08, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M100,0 L60,0 L60,2 L98,2 L98,40 L100,40 Z" fill="currentColor" />
          <path d="M90,10 L70,10 L70,11 L89,11 L89,30 L90,30 Z" fill="currentColor" />
          <path d="M85,15 L80,15 L80,16 L84,16 L84,20 L85,20 Z" fill="currentColor" />
        </motion.svg>

        {/* Bottom Left */}
        <motion.svg
          className="absolute bottom-8 left-8 w-24 h-24"
          viewBox="0 0 100 100"
          style={{ color: '#8B7330' }}
          initial={{ opacity: 0, scale: 0.5, x: -20, y: 20 }}
          animate={{ opacity: 0.08, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M0,100 L40,100 L40,98 L2,98 L2,60 L0,60 Z" fill="currentColor" />
          <path d="M10,90 L30,90 L30,89 L11,89 L11,70 L10,70 Z" fill="currentColor" />
          <path d="M15,85 L20,85 L20,84 L16,84 L16,80 L15,80 Z" fill="currentColor" />
        </motion.svg>

        {/* Bottom Right */}
        <motion.svg
          className="absolute bottom-8 right-8 w-24 h-24"
          viewBox="0 0 100 100"
          style={{ color: '#8B7330' }}
          initial={{ opacity: 0, scale: 0.5, x: 20, y: 20 }}
          animate={{ opacity: 0.08, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, delay: 2.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M100,100 L60,100 L60,98 L98,98 L98,60 L100,60 Z" fill="currentColor" />
          <path d="M90,90 L70,90 L70,89 L89,89 L89,70 L90,70 Z" fill="currentColor" />
          <path d="M85,85 L80,85 L80,84 L84,84 L84,80 L85,80 Z" fill="currentColor" />
        </motion.svg>
      </div>

      {/* Geometric Lines - Dramatic reveal with glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Vertical center line */}
        <motion.div
          className="absolute left-1/2 top-0 w-[1px] h-full -translate-x-1/2"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(139,115,48,0.08) 20%, rgba(139,115,48,0.08) 80%, transparent)' }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Horizontal center line */}
        <motion.div
          className="absolute left-0 top-1/2 w-full h-[1px] -translate-y-1/2"
          style={{ background: 'linear-gradient(to right, transparent, rgba(139,115,48,0.06) 30%, rgba(139,115,48,0.06) 70%, transparent)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Additional diagonal accent lines */}
        <motion.div
          className="absolute top-0 left-0 w-[1px] origin-top-left"
          style={{
            height: '150%',
            background: 'linear-gradient(to bottom, rgba(212,175,55,0.04), transparent 60%)',
            transform: 'rotate(35deg)',
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute top-0 right-0 w-[1px] origin-top-right"
          style={{
            height: '150%',
            background: 'linear-gradient(to bottom, rgba(212,175,55,0.04), transparent 60%)',
            transform: 'rotate(-35deg)',
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Brand Name - Cinematic reveal with blur-to-sharp and scale */}
      <motion.div
        className="mb-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1
          className="flex tracking-[0.45em] relative"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '48px',
            fontWeight: 400,
            color: '#1A1815',
            letterSpacing: '0.45em',
          }}
        >
          {brandLetters.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.3,
                filter: 'blur(12px)',
                rotateX: 90,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
                rotateX: 0,
              }}
              transition={{
                duration: 1.0,
                delay: 0.5 + (i * 0.08),
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char === ' ' ? '\u00A0\u00A0' : char}
            </motion.span>
          ))}

          {/* Golden shimmer sweep across title */}
          <motion.div
            ref={shimmerRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              x: shimmerX,
              opacity: shimmerOpacity,
              background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.3) 45%, rgba(255,223,100,0.5) 50%, rgba(212,175,55,0.3) 55%, transparent 100%)',
              width: '200px',
              top: '-10%',
              bottom: '-10%',
            }}
          />
        </h1>
      </motion.div>

      {/* Triple Line Divider - Dramatic expand with glow */}
      <motion.div
        className="mb-6 flex flex-col items-center space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <motion.div
          className="h-[2px] relative"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '140px', opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[#D4AF37]" />
          <motion.div
            className="absolute inset-0"
            style={{
              boxShadow: '0 0 12px 2px rgba(212,175,55,0.4), 0 0 24px 4px rgba(212,175,55,0.15)',
            }}
            animate={{ opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.div
          className="h-[1px] bg-[#D4AF37]/40"
          initial={{ width: 0 }}
          animate={{ width: '90px' }}
          transition={{ duration: 0.8, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="h-[1px] bg-[#D4AF37]/20"
          initial={{ width: 0 }}
          animate={{ width: '50px' }}
          transition={{ duration: 0.8, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Tagline - Dramatic blur-to-sharp reveal */}
      <motion.p
        className="text-[12px] uppercase mb-16"
        style={{
          color: '#6B5A28',
          letterSpacing: '0.35em',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 600,
        }}
        initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        Technology as Devoted as You Are
      </motion.p>

      {/* Description - Word-level stagger */}
      <motion.p
        className="text-[15px] text-center max-w-[520px] mb-14 leading-[1.8]"
        style={{
          color: '#3D3832',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 400,
        }}
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
      >
        Refined member management for associations and nonprofits who understand
        that excellence lies in the details.
      </motion.p>

      {/* CTA Button - Cinematic entrance from below with scale */}
      <motion.button
        onClick={onLoginClick}
        className="relative px-12 py-4 group overflow-hidden"
        initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          y: -3,
          scale: 1.02,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        }}
        whileTap={{
          y: 0,
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
      >
        {/* Animated border frame */}
        <motion.div
          className="absolute inset-0 border"
          style={{ borderColor: 'rgba(180,145,45,0.6)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        />

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Top accent line - draw on hover */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          }}
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          }}
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Shimmer sweep on hover */}
        <div
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.1) 45%, rgba(255,223,100,0.15) 50%, rgba(212,175,55,0.1) 55%, transparent 100%)',
          }}
        />

        {/* Text */}
        <span
          className="relative z-10 flex items-center gap-3 text-[12px] uppercase transition-colors duration-300 group-hover:text-[#8B7330]"
          style={{
            color: '#B4912D',
            letterSpacing: '0.3em',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 600,
          }}
        >
          Enter Your Lobbi
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          >
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={1.5} />
          </motion.span>
        </span>
      </motion.button>

      {/* Footer - Staggered dots with pulse */}
      <motion.div
        className="absolute bottom-12 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated decorative dots */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {[0.3, 0.5, 0.3].map((baseOpacity, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-[#D4AF37]"
              animate={{
                opacity: [baseOpacity, baseOpacity + 0.2, baseOpacity],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        <p
          className="text-[10px] uppercase"
          style={{
            color: '#8A8278',
            letterSpacing: '0.2em',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
          }}
        >
          Trusted by Discerning Organizations
        </p>
      </motion.div>
    </motion.div>
  );
}

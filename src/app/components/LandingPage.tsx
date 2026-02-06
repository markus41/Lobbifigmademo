import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <motion.div 
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // Elite: Longer fade with exponential easing
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Art Deco Corner Ornaments - Softer for light mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.08]">
        {/* Top Left */}
        <svg className="absolute top-8 left-8 w-24 h-24" viewBox="0 0 100 100" style={{ color: '#8B7330' }}>
          <path d="M0,0 L40,0 L40,2 L2,2 L2,40 L0,40 Z" fill="currentColor" />
          <path d="M10,10 L30,10 L30,11 L11,11 L11,30 L10,30 Z" fill="currentColor" />
          <path d="M15,15 L20,15 L20,16 L16,16 L16,20 L15,20 Z" fill="currentColor" />
        </svg>
        
        {/* Top Right */}
        <svg className="absolute top-8 right-8 w-24 h-24" viewBox="0 0 100 100" style={{ color: '#8B7330' }}>
          <path d="M100,0 L60,0 L60,2 L98,2 L98,40 L100,40 Z" fill="currentColor" />
          <path d="M90,10 L70,10 L70,11 L89,11 L89,30 L90,30 Z" fill="currentColor" />
          <path d="M85,15 L80,15 L80,16 L84,16 L84,20 L85,20 Z" fill="currentColor" />
        </svg>
        
        {/* Bottom Left */}
        <svg className="absolute bottom-8 left-8 w-24 h-24" viewBox="0 0 100 100" style={{ color: '#8B7330' }}>
          <path d="M0,100 L40,100 L40,98 L2,98 L2,60 L0,60 Z" fill="currentColor" />
          <path d="M10,90 L30,90 L30,89 L11,89 L11,70 L10,70 Z" fill="currentColor" />
          <path d="M15,85 L20,85 L20,84 L16,84 L16,80 L15,80 Z" fill="currentColor" />
        </svg>
        
        {/* Bottom Right */}
        <svg className="absolute bottom-8 right-8 w-24 h-24" viewBox="0 0 100 100" style={{ color: '#8B7330' }}>
          <path d="M100,100 L60,100 L60,98 L98,98 L98,60 L100,60 Z" fill="currentColor" />
          <path d="M90,90 L70,90 L70,89 L89,89 L89,70 L90,70 Z" fill="currentColor" />
          <path d="M85,85 L80,85 L80,84 L84,84 L84,80 L85,80 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Geometric Lines - Subtler for light mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Vertical center lines */}
        <motion.div
          className="absolute left-1/2 top-0 w-[1px] h-full -translate-x-1/2"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(139,115,48,0.06) 20%, rgba(139,115,48,0.06) 80%, transparent)' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        
        {/* Horizontal subtle lines */}
        <motion.div
          className="absolute left-0 top-1/2 w-full h-[1px] -translate-y-1/2"
          style={{ background: 'linear-gradient(to right, transparent, rgba(139,115,48,0.04) 30%, rgba(139,115,48,0.04) 70%, transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
        />
      </div>

      {/* Brand Name - Spaced Letters */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1
          className="flex tracking-[0.45em]"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '48px',
            fontWeight: 400,
            color: '#1A1815',
            letterSpacing: '0.45em',
          }}
        >
          {'THE LOBBI'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + (i * 0.06),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? '\u00A0\u00A0' : char}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Triple Line Divider */}
      <motion.div
        className="mb-6 space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="h-[1px] bg-[#D4AF37]"
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        <motion.div
          className="h-[1px] mx-auto"
          style={{ background: 'rgba(212,175,55,0.4)' }}
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.8, delay: 1.3 }}
        />
        <motion.div
          className="h-[1px] mx-auto"
          style={{ background: 'rgba(212,175,55,0.2)' }}
          initial={{ width: 0 }}
          animate={{ width: '40px' }}
          transition={{ duration: 0.8, delay: 1.4 }}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-[12px] uppercase mb-16"
        style={{
          color: '#6B5A28',
          letterSpacing: '0.35em',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 600,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        Technology as Devoted as You Are
      </motion.p>

      {/* Refined Description */}
      <motion.p
        className="text-[15px] text-center max-w-[520px] mb-14 leading-[1.8]"
        style={{
          color: '#3D3832',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 400,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        Refined member management for associations and nonprofits who understand 
        that excellence lies in the details.
      </motion.p>

      {/* Minimal Elegant Button - Elite: Weighted interaction */}
      <motion.button
        onClick={onLoginClick}
        className="relative px-12 py-4 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ 
          y: -2,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }}
        whileTap={{ 
          y: 0,
          transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] }
        }}
      >
        {/* Border frame */}
        <div
          className="absolute inset-0 border transition-colors"
          style={{
            borderColor: 'rgba(180,145,45,0.6)',
          }}
        />
        
        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#D4AF37]"
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#D4AF37]"
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Text */}
        <span
          className="relative z-10 flex items-center gap-3 text-[12px] uppercase transition-colors group-hover:text-[#F5E6A3]"
          style={{
            color: '#B4912D',
            letterSpacing: '0.3em',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 600,
          }}
        >
          Enter Your Lobbi
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </span>
      </motion.button>

      {/* Subtle Footer */}
      <motion.div
        className="absolute bottom-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
      >
        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-1 h-1 bg-[#D4AF37] opacity-30" />
          <div className="w-1 h-1 bg-[#D4AF37] opacity-50" />
          <div className="w-1 h-1 bg-[#D4AF37] opacity-30" />
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
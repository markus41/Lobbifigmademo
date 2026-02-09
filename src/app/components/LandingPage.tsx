import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useMemo, useRef, useEffect } from 'react';
import { gsap, SplitText } from '../../lib/gsap-config';
import type { Organization } from '../data/themes';
import { ORGANIZATIONS } from '../data/themes';
import {
  getOrgColors,
  getOrgFonts,
  applyThemeToDocument,
} from '../utils/themeMapper';

interface LandingPageProps {
  onLoginClick: () => void;
  organization?: Organization;
}

const DEFAULT_ORG = ORGANIZATIONS['luxe-haven'];

export function LandingPage({ onLoginClick, organization = DEFAULT_ORG }: LandingPageProps) {
  const colors = useMemo(() => getOrgColors(organization), [organization]);
  const fonts = useMemo(() => getOrgFonts(organization), [organization]);
  const theme = organization.theme;

  useMemo(() => {
    if (typeof document !== 'undefined') applyThemeToDocument(theme);
  }, [theme]);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  // GSAP: tagline words
  const taglineRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!taglineRef.current) return;
    const split = new SplitText(taglineRef.current, { type: 'words' });
    const tw = gsap.fromTo(split.words, { opacity: 0, y: 12 }, {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.08, delay: 1.8, ease: 'power3.out',
    });
    return () => { tw.kill(); split.revert(); };
  }, []);

  // GSAP: description words
  const descRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!descRef.current) return;
    const split = new SplitText(descRef.current, { type: 'words' });
    const tw = gsap.fromTo(split.words, { opacity: 0, y: 8 }, {
      opacity: 1, y: 0, duration: 0.45, stagger: 0.03, delay: 2.2, ease: 'power2.out',
    });
    return () => { tw.kill(); split.revert(); };
  }, []);

  // GSAP: CTA entrance
  const ctaRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!ctaRef.current) return;
    const tl = gsap.timeline({ delay: 2.6 });
    tl.fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
    tl.to(ctaRef.current, {
      boxShadow: `0 0 60px rgba(${colors.primaryRgb}, 0.25), 0 0 120px rgba(${colors.primaryRgb}, 0.08)`,
      duration: 1.2, ease: 'power2.inOut',
    }, '-=0.3');
    tl.to(ctaRef.current, { boxShadow: `0 8px 32px rgba(${colors.primaryRgb}, 0.15)`, duration: 1.5, ease: 'power2.out' });
    return () => { tl.kill(); };
  }, [colors.primaryRgb]);

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: `linear-gradient(175deg, ${colors.bgPrimary} 0%, rgba(${colors.primaryRgb}, 0.04) 60%, ${colors.bgPrimary} 100%)` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease }}
    >
      {/* Subtle radial glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '70vmin', height: '70vmin',
          background: `radial-gradient(circle, rgba(${colors.primaryRgb}, 0.06) 0%, transparent 70%)`,
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fine vertical hairline */}
      <motion.div
        className="absolute left-1/2 top-0 w-px h-full -translate-x-1/2"
        style={{ background: `linear-gradient(to bottom, transparent, rgba(${colors.primaryRgb}, 0.08) 25%, rgba(${colors.primaryRgb}, 0.08) 75%, transparent)` }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, delay: 0.2, ease }}
      />

      {/* Horizontal accent */}
      <motion.div
        className="absolute left-0 top-1/2 w-full h-px -translate-y-1/2"
        style={{ background: `linear-gradient(to right, transparent, rgba(${colors.primaryRgb}, 0.05) 35%, rgba(${colors.primaryRgb}, 0.05) 65%, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease }}
      />

      {/* Brand name */}
      <motion.div className="mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
        <h1
          className="flex text-7xl sm:text-8xl tracking-[0.3em] sm:tracking-[0.4em]"
          style={{
            fontFamily: fonts.display,
            fontWeight: fonts.weightHeading,
            color: colors.textPrimary,
          }}
        >
          {'THE LOBBI'.split('').map((char, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.6 + i * 0.07, ease }}
            >
              {char === ' ' ? '\u00A0\u00A0' : char}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Divider line system */}
      <motion.div
        className="flex flex-col items-center gap-1.5 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <motion.div className="h-px" style={{ background: colors.primary }} initial={{ width: 0 }} animate={{ width: 100 }} transition={{ duration: 0.9, delay: 1.4, ease }} />
        <motion.div className="h-px" style={{ background: `rgba(${colors.primaryRgb},0.35)` }} initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.9, delay: 1.55, ease }} />
      </motion.div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="text-xs uppercase mb-14 tracking-[0.35em] font-semibold"
        style={{ color: colors.primaryDark, fontFamily: fonts.body }}
      >
        Technology as Devoted as You Are
      </p>

      {/* Description */}
      <p
        ref={descRef}
        className="text-base sm:text-lg text-center max-w-xl mb-16 leading-relaxed"
        style={{ color: colors.textSecondary, fontFamily: fonts.body, fontWeight: parseInt(fonts.weightBody) }}
      >
        Refined member management for associations and nonprofits who understand
        that excellence lies in the details.
      </p>

      {/* CTA Button */}
      <motion.button
        ref={ctaRef}
        onClick={onLoginClick}
        className="relative px-16 py-5 group cursor-pointer"
        style={{
          opacity: 0,
          borderRadius: theme.buttonStyle === 'pill' ? '9999px' : theme.buttonStyle === 'sharp' ? '2px' : '12px',
          background: `linear-gradient(135deg, rgba(${colors.primaryRgb}, 0.06) 0%, rgba(${colors.primaryRgb}, 0.02) 100%)`,
          backdropFilter: 'blur(12px)',
          border: `1.5px solid rgba(${colors.primaryRgb}, 0.35)`,
        }}
        whileHover={{ y: -3, boxShadow: `0 16px 48px rgba(${colors.primaryRgb}, 0.25), 0 0 0 1px rgba(${colors.primaryRgb}, 0.2)` }}
        whileTap={{ y: -1, scale: 0.98 }}
        transition={{ duration: 0.25 }}
      >
        {/* Top shimmer on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(180deg, rgba(${colors.primaryRgb}, 0.1) 0%, transparent 50%)`,
            borderRadius: 'inherit',
          }}
        />
        <span
          className="relative z-10 flex items-center gap-5 text-sm uppercase tracking-[0.3em] font-bold"
          style={{ color: colors.primary, fontFamily: fonts.body }}
        >
          Enter Your Lobbi
          <motion.span
            className="inline-block opacity-60 group-hover:opacity-100 transition-opacity"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </motion.span>
        </span>
      </motion.button>

      {/* Footer */}
      <motion.div
        className="absolute bottom-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3 }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-6 h-px" style={{ background: `rgba(${colors.primaryRgb}, 0.2)` }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: `rgba(${colors.primaryRgb}, 0.3)` }} />
          <div className="w-6 h-px" style={{ background: `rgba(${colors.primaryRgb}, 0.2)` }} />
        </div>
        <p className="text-[10px] uppercase tracking-[0.25em] font-medium" style={{ color: colors.textMuted, fontFamily: fonts.body }}>
          Trusted by Discerning Organizations
        </p>
      </motion.div>
    </motion.div>
  );
}

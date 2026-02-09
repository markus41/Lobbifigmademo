import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useMemo, useRef, useEffect } from 'react';
import { gsap, SplitText } from '../../lib/gsap-config';
import type { Organization } from '../data/themes';
import { ORGANIZATIONS } from '../data/themes';
import { getOrgColors, getOrgFonts, applyThemeToDocument } from '../utils/themeMapper';

interface LandingPageProps {
  onLoginClick: () => void;
  organization?: Organization;
}

const DEFAULT_ORG = ORGANIZATIONS['luxe-haven'];

export function LandingPage({ onLoginClick, organization = DEFAULT_ORG }: LandingPageProps) {
  const c = useMemo(() => getOrgColors(organization), [organization]);
  const f = useMemo(() => getOrgFonts(organization), [organization]);
  const t = organization.theme;

  useMemo(() => {
    if (typeof document !== 'undefined') applyThemeToDocument(t);
  }, [t]);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  // GSAP: subtitle words
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!subtitleRef.current) return;
    const split = new SplitText(subtitleRef.current, { type: 'words' });
    gsap.set(split.words, { opacity: 0, y: 14 });
    const tw = gsap.to(split.words, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.04, delay: 2.0, ease: 'power3.out',
    });
    return () => { tw.kill(); split.revert(); };
  }, []);

  // GSAP: description
  const descRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!descRef.current) return;
    const split = new SplitText(descRef.current, { type: 'words' });
    gsap.set(split.words, { opacity: 0, y: 8 });
    const tw = gsap.to(split.words, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.025, delay: 2.5, ease: 'power2.out',
    });
    return () => { tw.kill(); split.revert(); };
  }, []);

  const brandName = 'THE LOBBI';

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: 'transparent' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015, filter: 'blur(8px)' }}
      transition={{ duration: 0.9, ease }}
    >
      {/* Brand name - staggered letter reveal */}
      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <h1
          className="flex items-baseline"
          style={{ fontFamily: f.display, fontWeight: f.weightHeading, color: c.textPrimary }}
        >
          {brandName.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{ fontSize: char === ' ' ? undefined : 'clamp(3.5rem, 8vw, 6rem)', letterSpacing: '0.25em' }}
              initial={{ opacity: 0, y: 50, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              {char === ' ' ? '\u00A0\u00A0' : char}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Accent line */}
      <motion.div className="flex items-center gap-3 mb-8">
        <motion.div
          className="h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${c.primary})` }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 60, opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 1.3, ease }}
        />
        <motion.div
          className="w-1.5 h-1.5 rotate-45"
          style={{ background: c.primary }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.5, delay: 1.6, ease }}
        />
        <motion.div
          className="h-px"
          style={{ background: `linear-gradient(90deg, ${c.primary}, transparent)` }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 60, opacity: 0.6 }}
          transition={{ duration: 1.2, delay: 1.3, ease }}
        />
      </motion.div>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="text-[11px] uppercase mb-10 tracking-[0.4em] font-semibold"
        style={{ color: c.primaryDark, fontFamily: f.body }}
      >
        Where Belonging Meets Brilliance
      </p>

      {/* Description */}
      <p
        ref={descRef}
        className="text-base sm:text-lg text-center max-w-lg mb-14 leading-relaxed"
        style={{ color: c.textSecondary, fontFamily: f.body, fontWeight: parseInt(f.weightBody) }}
      >
        Refined member management for associations and nonprofits who understand
        that excellence lies in the details.
      </p>

      {/* CTA Button */}
      <motion.button
        onClick={onLoginClick}
        className="relative px-14 py-4 group cursor-pointer overflow-hidden"
        style={{
          borderRadius: t.buttonStyle === 'pill' ? '9999px' : t.buttonStyle === 'sharp' ? '4px' : '12px',
          background: t.gradientBtn,
          color: t.textInverse,
          boxShadow: `0 4px 20px rgba(${c.primaryRgb}, 0.2)`,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.8, ease }}
        whileHover={{ y: -3, boxShadow: `0 12px 36px rgba(${c.primaryRgb}, 0.3)` }}
        whileTap={{ y: 0, scale: 0.98 }}
      >
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'linear', delay: 3.5 }}
        />
        <span
          className="relative z-10 flex items-center gap-4 text-sm uppercase tracking-[0.25em] font-bold"
          style={{ fontFamily: f.body }}
        >
          Enter Your Lobbi
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </motion.span>
        </span>
      </motion.button>

      {/* Footer */}
      <motion.p
        className="absolute bottom-10 text-[10px] uppercase tracking-[0.2em] font-medium"
        style={{ color: c.textMuted, fontFamily: f.body }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.2 }}
      >
        Trusted by Discerning Organizations
      </motion.p>
    </motion.div>
  );
}

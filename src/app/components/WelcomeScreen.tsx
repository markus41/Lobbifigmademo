import { motion } from 'motion/react';
import { useEffect, useRef, useMemo } from 'react';
import { gsap, SplitText } from '../../lib/gsap-config';
import type { Account, Organization } from '../data/themes';
import { getOrgColors, getOrgFonts } from '../utils/themeMapper';

interface WelcomeScreenProps {
  account: Account;
  organization: Organization;
  onComplete: () => void;
}

export function WelcomeScreen({ account, organization, onComplete }: WelcomeScreenProps) {
  const t = organization.theme;
  const colors = useMemo(() => getOrgColors(organization), [organization]);
  const fonts = useMemo(() => getOrgFonts(organization), [organization]);

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  useEffect(() => {
    const timer = setTimeout(onComplete, 4200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // GSAP: greeting typewriter
  const greetingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!greetingRef.current) return;
    const split = new SplitText(greetingRef.current, { type: 'chars' });
    gsap.set(split.chars, { opacity: 0 });
    const tw = gsap.to(split.chars, { opacity: 1, duration: 0.03, stagger: 0.05, delay: 0.4, ease: 'none' });
    return () => { tw.kill(); split.revert(); };
  }, []);

  // GSAP: name wave
  const nameRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!nameRef.current) return;
    const split = new SplitText(nameRef.current, { type: 'chars' });
    const tw = gsap.fromTo(split.chars,
      { opacity: 0, y: 24, rotateX: -30 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.035, delay: 0.7, ease: 'back.out(1.4)' },
    );
    return () => { tw.kill(); split.revert(); };
  }, []);

  // GSAP: motto
  const mottoRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!mottoRef.current) return;
    const split = new SplitText(mottoRef.current, { type: 'words' });
    const tw = gsap.fromTo(split.words,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, delay: 1.6, ease: 'power2.out' },
    );
    return () => { tw.kill(); split.revert(); };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: colors.bgPrimary }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease }}
    >
      {/* Soft ambient glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: '50vmax', height: '50vmax',
          top: '45%', left: '50%', transform: 'translate(-50%,-50%)',
          background: `radial-gradient(circle, rgba(${t.primaryRgb}, 0.08) 0%, transparent 65%)`,
          filter: 'blur(40px)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-2xl">
        {/* Greeting */}
        <h2 ref={greetingRef}
          className="text-lg mb-2 font-medium tracking-[0.05em]"
          style={{ fontFamily: fonts.body, color: colors.textSecondary }}>
          Welcome back,
        </h2>

        {/* Name */}
        <h1 ref={nameRef}
          className="text-5xl sm:text-6xl mb-6"
          style={{
            fontFamily: fonts.display,
            fontWeight: parseInt(fonts.weightHeading),
            background: t.hasGradientText
              ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
              : colors.primary,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            perspective: '400px',
          }}>
          {account.first} {account.last}
        </h1>

        {/* Org badge */}
        <motion.div
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-4"
          style={{
            background: `rgba(${t.primaryRgb}, 0.06)`,
            border: `1px solid rgba(${t.primaryRgb}, 0.12)`,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease }}
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm"
            style={{ background: t.gradientBtn }}>
            <span style={{ fontFamily: fonts.display, fontStyle: 'italic', fontWeight: 300 }}>
              {organization.logoLetter}
            </span>
          </div>
          <span className="text-base font-semibold" style={{ fontFamily: fonts.display, color: colors.textPrimary }}>
            {organization.name}
          </span>
        </motion.div>

        {/* Role */}
        <motion.p
          className="text-sm mb-3 font-medium"
          style={{ color: colors.textSecondary, fontFamily: fonts.body }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3, ease }}
        >
          {account.role}
        </motion.p>

        {/* Motto */}
        <p ref={mottoRef}
          className="text-base italic mb-6 opacity-90 font-medium"
          style={{ fontFamily: fonts.display, color: colors.primary }}>
          &ldquo;{organization.motto}&rdquo;
        </p>

        {/* Timestamp */}
        <motion.p
          className="text-xs font-medium tracking-[0.05em]"
          style={{ color: colors.textMuted, fontFamily: fonts.body }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.0 }}
        >
          {new Date().toLocaleString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
          })}
        </motion.p>

        {/* Loading dots */}
        <motion.div className="mt-10 flex items-center justify-center gap-1.5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.2 }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: colors.primary }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15, ease }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

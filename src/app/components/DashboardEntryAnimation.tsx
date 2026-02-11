import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { gsap, SplitText } from '../../lib/gsap-config';
import { LottieIcon } from './lottie/LottieIcon';
import { lottieIcons } from '../lottie';
import type { Account, Organization } from '../data/themes';

interface DashboardEntryAnimationProps {
  onCompleted: () => void;
  organization: Organization;
  account: Account;
}

export function DashboardEntryAnimation({
  onCompleted,
  organization,
  account
}: DashboardEntryAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const orgRef = useRef<HTMLParagraphElement>(null);
  const octagonRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current || !welcomeRef.current || !nameRef.current || !orgRef.current) return;

    const nameSplit = new SplitText(nameRef.current, { type: 'chars' });

    const tl = gsap.timeline({
      onComplete: onCompleted,
    });

    // Phase 1: Welcome text fades in with letter spacing reveal
    tl.fromTo(
      welcomeRef.current,
      { opacity: 0, letterSpacing: '0.6em' },
      { opacity: 1, letterSpacing: '0.3em', duration: 0.8, ease: 'power2.out' },
    );

    // Phase 2: Name characters wave in
    tl.fromTo(
      nameSplit.chars,
      { opacity: 0, y: 20, rotateY: -40 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: 'back.out(1.4)',
      },
      '-=0.3',
    );

    // Phase 3: Org name fades in
    tl.fromTo(
      orgRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2',
    );

    // Phase 4: Octagon path dissolves
    if (octagonRef.current) {
      const path = octagonRef.current.querySelector('path');
      if (path) {
        tl.fromTo(
          path,
          { strokeDashoffset: 0, opacity: 0.2 },
          { strokeDashoffset: 600, opacity: 0, duration: 1.5, ease: 'power2.inOut' },
          '-=0.8',
        );
      }
    }

    // Phase 5: Everything scales up and fades out
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        scale: 1.05,
        duration: 1,
        ease: 'power2.inOut',
      },
      '+=0.3',
    );

    return () => {
      tl.kill();
      nameSplit.revert();
    };
  }, [onCompleted]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF6E9]"
    >
      {/* Welcome Message - GSAP timeline sequence */}
      <div className="text-center" style={{ perspective: '600px' }}>
        <motion.div
          className="mx-auto mb-6 inline-flex items-center justify-center rounded-2xl border border-white/50 bg-white/75 p-2 shadow-[0_16px_48px_rgba(0,0,0,0.16)]"
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <LottieIcon
            animationData={lottieIcons.portalGate}
            size={58}
            speed={0.95}
            glowRgb={organization.theme.primaryRgb}
            ariaLabel="Portal opening icon"
          />
        </motion.div>

        <p
          ref={welcomeRef}
          className="text-sm uppercase tracking-[0.3em] mb-4 font-medium opacity-0"
          style={{
            color: `rgba(${organization.theme.primaryRgb}, 0.6)`,
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Welcome Back
        </p>

        <h1
          ref={nameRef}
          className="text-5xl mb-3 font-normal text-[#2C2A25]"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
          }}
        >
          {account.first} {account.last}
        </h1>

        <p
          ref={orgRef}
          className="text-sm"
          style={{ color: '#8A8578', opacity: 0 }}
        >
          {organization.name}
        </p>
      </div>

      {/* Dissolving octagon geometry hint - GSAP controlled */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg ref={octagonRef} width="400" height="400" viewBox="0 0 400 400" style={{ opacity: 0.15 }}>
          <path
            d="M200,60 L270,110 L270,190 L200,240 L130,190 L130,110 Z"
            fill="none"
            stroke={organization.theme.primary}
            strokeWidth="0.5"
            strokeDasharray="600"
          />
        </svg>
      </div>
    </motion.div>
  );
}

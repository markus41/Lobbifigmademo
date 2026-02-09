import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { gsap, SplitText } from '../../lib/gsap-config';
import type { Account, Organization } from '../data/themes';

interface DashboardEntryAnimationProps {
  onCompleted: () => void;
  organization: Organization;
  account: Account;
}

export function DashboardEntryAnimation({ onCompleted, organization, account }: DashboardEntryAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const orgRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const t = organization.theme;

  useEffect(() => {
    if (!containerRef.current || !welcomeRef.current || !nameRef.current || !orgRef.current) return;

    const nameSplit = new SplitText(nameRef.current, { type: 'chars' });
    const tl = gsap.timeline({ onComplete: onCompleted });

    // Phase 1: Welcome text breathes in
    tl.fromTo(welcomeRef.current,
      { opacity: 0, letterSpacing: '0.5em', y: 8 },
      { opacity: 0.7, letterSpacing: '0.3em', y: 0, duration: 1, ease: 'power3.out' }
    );

    // Phase 2: Accent line expands
    if (lineRef.current) {
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
        '-=0.4'
      );
    }

    // Phase 3: Name characters cascade in with depth
    tl.fromTo(nameSplit.chars,
      { opacity: 0, y: 30, rotateY: -30, scale: 0.9 },
      { opacity: 1, y: 0, rotateY: 0, scale: 1, duration: 0.7, stagger: 0.04, ease: 'back.out(1.2)' },
      '-=0.5'
    );

    // Phase 4: Org name fades up
    tl.fromTo(orgRef.current,
      { opacity: 0, y: 12 },
      { opacity: 0.6, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    );

    // Phase 5: Hold then exit
    tl.to({}, { duration: 0.6 });
    tl.to(containerRef.current, {
      opacity: 0, scale: 1.03, filter: 'blur(6px)',
      duration: 0.8, ease: 'power2.inOut',
    });

    return () => { tl.kill(); nameSplit.revert(); };
  }, [onCompleted, organization, account]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: `var(--theme-bg-primary, ${t.bgPrimary || '#FAF6E9'})` }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '50vmin', height: '50vmin',
          background: `radial-gradient(circle, rgba(${t.primaryRgb}, 0.08) 0%, transparent 70%)`,
          top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        }}
      />

      <div className="text-center relative z-10" style={{ perspective: '600px' }}>
        <p
          ref={welcomeRef}
          className="text-xs uppercase tracking-[0.3em] mb-6 font-medium opacity-0"
          style={{
            color: `rgba(${t.primaryRgb}, 0.5)`,
            fontFamily: `var(--theme-font-body, 'DM Sans', sans-serif)`,
          }}
        >
          Welcome Back
        </p>

        <div
          ref={lineRef}
          className="w-16 h-px mx-auto mb-6 origin-center"
          style={{
            background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)`,
            transform: 'scaleX(0)',
          }}
        />

        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl mb-4 font-normal"
          style={{
            fontFamily: `var(--theme-font-display, 'Playfair Display', Georgia, serif)`,
            color: `var(--theme-text-primary, #1A1A2E)`,
          }}
        >
          {account.first} {account.last}
        </h1>

        <p
          ref={orgRef}
          className="text-sm tracking-wide opacity-0"
          style={{
            color: `var(--theme-text-muted, #7A7A8A)`,
            fontFamily: `var(--theme-font-body, 'DM Sans', sans-serif)`,
          }}
        >
          {organization.name}
        </p>
      </div>
    </motion.div>
  );
}

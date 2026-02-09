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
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const orgRef = useRef<HTMLParagraphElement>(null);

  const t = organization.theme;

  useEffect(() => {
    if (!containerRef.current || !nameRef.current || !orgRef.current) return;

    const nameSplit = new SplitText(nameRef.current, { type: 'chars' });
    const tl = gsap.timeline({ onComplete: onCompleted });

    // Phase 1: Name characters cascade in
    tl.fromTo(nameSplit.chars,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.035, ease: 'back.out(1.2)' },
      0.2
    );

    // Phase 2: Accent line + org name
    if (lineRef.current) {
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }, '-=0.3');
    }
    tl.fromTo(orgRef.current, { opacity: 0, y: 8 }, { opacity: 0.5, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

    // Phase 3: Hold then dissolve
    tl.to({}, { duration: 0.5 });
    tl.to(containerRef.current, { opacity: 0, scale: 1.02, filter: 'blur(8px)', duration: 0.7, ease: 'power2.inOut' });

    return () => { tl.kill(); nameSplit.revert(); };
  }, [onCompleted, organization, account]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: `var(--theme-bg-primary, ${t.bgPrimary || '#FAF6E9'})` }}
    >
      {/* Soft glow */}
      <div className="absolute pointer-events-none" style={{
        width: '45vmin', height: '45vmin',
        background: `radial-gradient(circle, rgba(${t.primaryRgb}, 0.06) 0%, transparent 65%)`,
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        filter: 'blur(30px)',
      }} />

      <div className="text-center relative z-10" style={{ perspective: '600px' }}>
        <h1 ref={nameRef}
          className="text-5xl sm:text-6xl mb-4 font-normal"
          style={{
            fontFamily: `var(--theme-font-display, 'Playfair Display', Georgia, serif)`,
            color: `var(--theme-text-primary, #1A1A2E)`,
          }}>
          {account.first} {account.last}
        </h1>

        <div ref={lineRef}
          className="w-14 h-px mx-auto mb-4 origin-center"
          style={{
            background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)`,
            transform: 'scaleX(0)',
          }} />

        <p ref={orgRef}
          className="text-sm tracking-wide opacity-0"
          style={{
            color: `var(--theme-text-muted, #7A7A8A)`,
            fontFamily: `var(--theme-font-body, 'DM Sans', sans-serif)`,
          }}>
          {organization.name}
        </p>
      </div>
    </motion.div>
  );
}

import { Play, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { SectionLabel } from './ui/SectionLabel';
import { LandingReveal } from './LandingReveal';
import { landingCopy } from '@/app/data/landingCopy';

interface HeroProps {
  onRequestDemo: () => void;
}

export function Hero({ onRequestDemo }: HeroProps) {
  const handleWatchTour = () => {
    const target = document.querySelector('#experience');
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="lobbi-hero-section">
      <div className="lobbi-hero-pattern" aria-hidden="true" />
      <div className="lobbi-hero-content">
        <LandingReveal>
          <SectionLabel>{landingCopy.hero.sectionLabel}</SectionLabel>
        </LandingReveal>

        <LandingReveal delay={0.05}>
          <h1 className="lobbi-hero-headline">{landingCopy.hero.headline}</h1>
        </LandingReveal>

        <LandingReveal delay={0.1}>
          <p className="lobbi-hero-subheadline">{landingCopy.hero.subheadline}</p>
        </LandingReveal>

        <LandingReveal delay={0.15} className="lobbi-hero-cta-row">
          <Button variant="primary" size="lg" onClick={onRequestDemo}>
            {landingCopy.hero.primaryCta}
          </Button>
          <Button variant="ghost" size="lg" onClick={handleWatchTour}>
            <Play size={16} aria-hidden="true" />
            <span>{landingCopy.hero.secondaryCta}</span>
          </Button>
        </LandingReveal>

        <LandingReveal delay={0.2}>
          <p className="lobbi-social-proof">{landingCopy.hero.socialProof}</p>
        </LandingReveal>
      </div>

      <div className="lobbi-scroll-indicator" aria-hidden="true">
        <ChevronDown className="lobbi-scroll-chevron" size={22} />
        <span>{landingCopy.hero.scrollHint}</span>
      </div>
    </section>
  );
}

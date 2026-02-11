import { LandingReveal } from './LandingReveal';
import { Button } from './ui/Button';
import { landingCopy } from '@/app/data/landingCopy';

interface CTASectionProps {
  onRequestDemo: () => void;
}

export default function CTASection({ onRequestDemo }: CTASectionProps) {
  return (
    <section id="cta" className="lobbi-section lobbi-section-cta">
      <div className="lobbi-container lobbi-cta-content">
        <LandingReveal className="lobbi-section-header">
          <h2>{landingCopy.cta.headline}</h2>
          <p>{landingCopy.cta.subheadline}</p>
        </LandingReveal>

        <LandingReveal delay={0.08} className="lobbi-cta-buttons">
          <Button variant="primary" size="lg" onClick={onRequestDemo}>
            {landingCopy.cta.primary}
          </Button>
          <Button variant="ghost" size="lg" onClick={onRequestDemo}>
            {landingCopy.cta.secondary}
          </Button>
        </LandingReveal>

        <LandingReveal delay={0.12}>
          <p className="lobbi-cta-trust">{landingCopy.cta.trustLine}</p>
        </LandingReveal>
      </div>
    </section>
  );
}

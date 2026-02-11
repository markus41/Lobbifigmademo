import { LandingReveal } from './LandingReveal';
import { SectionLabel } from './ui/SectionLabel';
import { landingCopy } from '@/app/data/landingCopy';

export default function HowItWorks() {
  return (
    <section id="experience" className="lobbi-section lobbi-section-white">
      <div className="lobbi-container">
        <LandingReveal className="lobbi-section-header">
          <SectionLabel>{landingCopy.experience.sectionLabel}</SectionLabel>
          <h2>{landingCopy.experience.headline}</h2>
          <p>{landingCopy.experience.body}</p>
        </LandingReveal>

        <div className="lobbi-step-flow">
          <div className="lobbi-step-connector" aria-hidden="true">
            <span className="lobbi-step-dot" />
          </div>
          {landingCopy.experience.steps.map((step, index) => (
            <LandingReveal key={step.number} delay={index * 0.08} className="lobbi-step-card">
              <p className="lobbi-step-number">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </LandingReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

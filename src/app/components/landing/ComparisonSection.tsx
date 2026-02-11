import { CheckCircle2 } from 'lucide-react';
import { LandingReveal } from './LandingReveal';
import { SectionLabel } from './ui/SectionLabel';
import { landingCopy } from '@/app/data/landingCopy';

export default function ComparisonSection() {
  return (
    <section id="comparison" className="lobbi-section lobbi-section-cream">
      <div className="lobbi-container">
        <LandingReveal className="lobbi-section-header">
          <SectionLabel>{landingCopy.comparison.sectionLabel}</SectionLabel>
          <h2>{landingCopy.comparison.headline}</h2>
        </LandingReveal>

        <LandingReveal delay={0.08} className="lobbi-comparison-table" role="table" aria-label="Lobbi comparison table">
          <div className="lobbi-comparison-row lobbi-comparison-head" role="row">
            <p role="columnheader">{landingCopy.comparison.headers.feature}</p>
            <p role="columnheader">{landingCopy.comparison.headers.legacy}</p>
            <p role="columnheader" className="lobbi-column-lobbi">
              {landingCopy.comparison.headers.lobbi}
            </p>
          </div>
          {landingCopy.comparison.rows.map((row, index) => (
            <div
              key={row.feature}
              className={`lobbi-comparison-row ${index % 2 === 0 ? 'lobbi-comparison-even' : 'lobbi-comparison-odd'}`}
              role="row"
            >
              <p role="cell" className="lobbi-comparison-feature">
                {row.feature}
              </p>
              <p role="cell" className="lobbi-column-legacy">
                {row.legacy}
              </p>
              <p role="cell" className="lobbi-column-lobbi">
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>{row.lobbi}</span>
              </p>
            </div>
          ))}
        </LandingReveal>
      </div>
    </section>
  );
}

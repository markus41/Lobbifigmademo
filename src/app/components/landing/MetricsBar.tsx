import { LandingReveal } from './LandingReveal';
import { landingCopy } from '@/app/data/landingCopy';

export default function MetricsBar() {
  return (
    <section id="metrics" className="lobbi-metrics-section">
      <div className="lobbi-container">
        <LandingReveal className="lobbi-section-header">
          <h2>{landingCopy.metrics.headline}</h2>
        </LandingReveal>

        <div className="lobbi-metrics-grid">
          {landingCopy.metrics.items.map((metric, index) => (
            <LandingReveal key={metric.label} delay={index * 0.05} className="lobbi-metric-item">
              <p className="lobbi-metric-value">{metric.value}</p>
              <p className="lobbi-metric-label">{metric.label}</p>
              {index < landingCopy.metrics.items.length - 1 ? (
                <span className="lobbi-metric-separator" aria-hidden="true" />
              ) : null}
            </LandingReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

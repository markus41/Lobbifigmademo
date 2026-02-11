import { Clock3, Files, Grid3X3 } from 'lucide-react';
import { LandingReveal } from './LandingReveal';
import { SectionLabel } from './ui/SectionLabel';
import { StatCard } from './ui/StatCard';
import { landingCopy } from '@/app/data/landingCopy';

const iconMap = {
  grid: <Grid3X3 size={24} />,
  clock: <Clock3 size={24} />,
  files: <Files size={24} />,
} as const;

export default function ProblemSection() {
  return (
    <section id="problem" className="lobbi-section lobbi-section-cream">
      <div className="lobbi-container">
        <LandingReveal className="lobbi-section-header">
          <SectionLabel>{landingCopy.problem.sectionLabel}</SectionLabel>
          <h2>{landingCopy.problem.headline}</h2>
          <p>{landingCopy.problem.body}</p>
        </LandingReveal>

        <div className="lobbi-stat-grid">
          {landingCopy.problem.stats.map((stat, index) => (
            <LandingReveal key={stat.value} delay={index * 0.06}>
              <StatCard value={stat.value} label={stat.label} icon={iconMap[stat.icon]} />
            </LandingReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

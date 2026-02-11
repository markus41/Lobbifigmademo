import {
  BarChart3,
  Calendar,
  DollarSign,
  MessageSquare,
  Shield,
  Users,
} from 'lucide-react';
import { LandingReveal } from './LandingReveal';
import { ArtDecoDivider } from './ui/ArtDecoDivider';
import { FeatureCard } from './ui/FeatureCard';
import { SectionLabel } from './ui/SectionLabel';
import { landingCopy } from '@/app/data/landingCopy';

const iconMap = {
  users: <Users size={24} />,
  message: <MessageSquare size={24} />,
  calendar: <Calendar size={24} />,
  dollar: <DollarSign size={24} />,
  chart: <BarChart3 size={24} />,
  shield: <Shield size={24} />,
} as const;

export default function SolutionSection() {
  return (
    <section id="solution" className="lobbi-section lobbi-section-white">
      <div className="lobbi-container">
        <LandingReveal className="lobbi-section-header">
          <SectionLabel>{landingCopy.solution.sectionLabel}</SectionLabel>
          <h2>{landingCopy.solution.headline}</h2>
          <p>{landingCopy.solution.body}</p>
        </LandingReveal>

        <LandingReveal delay={0.08}>
          <ArtDecoDivider className="mt-8" />
        </LandingReveal>

        <div className="lobbi-feature-grid">
          {landingCopy.solution.features.map((feature, index) => (
            <LandingReveal key={feature.key} delay={index * 0.05}>
              <FeatureCard
                eyebrow={feature.eyebrow}
                title={feature.title}
                description={feature.description}
                icon={iconMap[feature.icon]}
              />
            </LandingReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

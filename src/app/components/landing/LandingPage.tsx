import { Suspense, lazy } from 'react';
import type { Organization } from '../../data/themes';
import { Hero } from './Hero';
import { Navbar } from './Navbar';

interface LandingPageProps {
  onLoginClick: () => void;
  organization?: Organization;
}

const ProblemSection = lazy(() => import('./ProblemSection'));
const SolutionSection = lazy(() => import('./SolutionSection'));
const MetricsBar = lazy(() => import('./MetricsBar'));
const HowItWorks = lazy(() => import('./HowItWorks'));
const ComparisonSection = lazy(() => import('./ComparisonSection'));
const TestimonialSection = lazy(() => import('./TestimonialSection'));
const CTASection = lazy(() => import('./CTASection'));
const FooterSection = lazy(() => import('./Footer').then((module) => ({ default: module.Footer })));

function SectionFallback() {
  return <div className="lobbi-section-skeleton" aria-hidden="true" />;
}

export default function LandingPage({ onLoginClick, organization }: LandingPageProps) {
  return (
    <div className="lobbi-landing" data-org-id={organization?.id ?? 'lobbi-default'}>
      <a href="#main-content" className="lobbi-skip-link">
        Skip to content
      </a>
      <Navbar onRequestDemo={onLoginClick} />
      <main id="main-content">
        <Hero onRequestDemo={onLoginClick} />
        <Suspense fallback={<SectionFallback />}>
          <ProblemSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SolutionSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <MetricsBar />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ComparisonSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CTASection onRequestDemo={onLoginClick} />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <FooterSection />
      </Suspense>
    </div>
  );
}

import type { Organization } from '../data/themes';
import LandingShell from './landing/LandingPage';

interface LandingPageProps {
  onLoginClick: () => void;
  organization?: Organization;
}

export function LandingPage({ onLoginClick, organization }: LandingPageProps) {
  return <LandingShell onLoginClick={onLoginClick} organization={organization} />;
}

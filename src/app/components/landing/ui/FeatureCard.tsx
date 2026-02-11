import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
}

export function FeatureCard({ eyebrow, title, description, icon, className }: FeatureCardProps) {
  return (
    <article className={cn('lobbi-card lobbi-feature-card', className)}>
      <div className="lobbi-feature-icon" aria-hidden="true">
        {icon}
      </div>
      <p className="lobbi-feature-eyebrow">{eyebrow}</p>
      <h3 className="lobbi-feature-title">{title}</h3>
      <p className="lobbi-feature-description">{description}</p>
    </article>
  );
}

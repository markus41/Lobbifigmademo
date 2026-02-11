import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  icon: ReactNode;
  className?: string;
}

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <article className={cn('lobbi-card lobbi-stat-card', className)}>
      <div className="lobbi-stat-icon" aria-hidden="true">
        {icon}
      </div>
      <p className="lobbi-stat-value">{value}</p>
      <p className="lobbi-stat-label">{label}</p>
    </article>
  );
}

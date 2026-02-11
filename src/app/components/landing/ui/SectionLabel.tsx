import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
}

export function SectionLabel({ children, className, ...props }: SectionLabelProps) {
  return (
    <span className={cn('lobbi-section-label', className)} {...props}>
      {children}
    </span>
  );
}

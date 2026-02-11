import { cn } from '@/lib/utils';

interface ArtDecoDividerProps {
  className?: string;
}

export function ArtDecoDivider({ className }: ArtDecoDividerProps) {
  return (
    <div className={cn('lobbi-art-deco-divider', className)} aria-hidden="true">
      <span className="lobbi-art-deco-line" />
      <span className="lobbi-art-deco-diamond" />
      <span className="lobbi-art-deco-line" />
    </div>
  );
}

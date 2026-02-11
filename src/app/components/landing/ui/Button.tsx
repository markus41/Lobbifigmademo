import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'ghost' | 'text';
type ButtonSize = 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'lobbi-btn lobbi-focusable',
        size === 'lg' ? 'lobbi-btn-lg' : 'lobbi-btn-md',
        variant === 'primary' && 'lobbi-btn-primary',
        variant === 'ghost' && 'lobbi-btn-ghost',
        variant === 'text' && 'lobbi-btn-text',
        className
      )}
      {...props}
    />
  );
});

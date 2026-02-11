import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'text-white shadow-[0_14px_30px_-18px_rgba(0,0,0,0.45)] hover:shadow-[0_22px_40px_-22px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
      secondary: 'bg-white/85 border text-gray-800 shadow-[0_8px_18px_-14px_rgba(0,0,0,0.2)] hover:bg-white hover:-translate-y-0.5 active:scale-[0.98]',
      ghost: 'hover:bg-gray-100/80 active:scale-[0.98]'
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        background: 'var(--theme-gradient-btn, var(--theme-primary, #D4AF37))',
      },
      secondary: {
        borderColor: 'var(--theme-border, #e5e7eb)',
      },
      ghost: {
        color: 'var(--theme-text-secondary, #4b5563)',
      },
    };

    return (
      // @ts-expect-error - motion/react onDrag type conflicts with React's onDrag
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={variantStyles[variant]}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.99 }}
        {...props}
      >
        {isLoading ? (
          <>
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Loading...
          </>
        ) : children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

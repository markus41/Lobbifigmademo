import type { CSSProperties } from 'react';

export interface XIconProps {
  className?: string;
  size?: number;
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;
}

export function XIcon({ className = "", size = 24, style, width, height, ...props }: XIconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function SendIcon({ className = "", size = 24, style, width, height, ...props }: XIconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 2L15 22L11 13L2 9L22 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

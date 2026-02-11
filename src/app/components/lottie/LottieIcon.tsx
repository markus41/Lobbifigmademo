import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

interface LottieIconProps {
  animationData: object;
  size?: number;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  glowRgb?: string;
  ariaLabel?: string;
}

export function LottieIcon({
  animationData,
  size = 28,
  className,
  loop = true,
  autoplay = true,
  speed = 1,
  glowRgb,
  ariaLabel = 'Animated icon',
}: LottieIconProps) {
  const reduceMotion = useReducedMotion();
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);

  useEffect(() => {
    if (!lottieRef.current) return;
    lottieRef.current.setSpeed(speed);
  }, [speed]);

  return (
    <span
      className={className}
      role="img"
      aria-label={ariaLabel}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: glowRgb ? `drop-shadow(0 0 10px rgba(${glowRgb}, 0.35))` : undefined,
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={reduceMotion ? false : loop}
        autoplay={reduceMotion ? false : autoplay}
        style={{ width: size, height: size }}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
      />
    </span>
  );
}

import { motion } from 'motion/react';

interface GeometricOctagonProps {
  primaryColor?: string;
}

function octagonPath(centerX: number, centerY: number, radius: number, rotation = 0): string {
  const points: string[] = [];
  for (let index = 0; index < 8; index++) {
    const angle = rotation + (Math.PI * 2 * index) / 8;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  return `M${points[0]} ${points.slice(1).map((point) => `L${point}`).join(' ')} Z`;
}

export function GeometricOctagon({ primaryColor = '#D4AF37' }: GeometricOctagonProps) {
  return (
    <div className="fixed inset-0 z-[2] pointer-events-none flex items-center justify-center">
      <svg className="absolute w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="luxe-octagon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.92" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.26" />
          </linearGradient>
          <filter id="luxe-soft-glow">
            <feGaussianBlur stdDeviation="2.6" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={octagonPath(600, 400, 326, Math.PI / 8)}
          fill="none"
          stroke="url(#luxe-octagon-grad)"
          strokeWidth="1.2"
          filter="url(#luxe-soft-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2.8, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.path
          d={octagonPath(600, 400, 262)}
          fill="none"
          stroke="url(#luxe-octagon-grad)"
          strokeWidth="1.8"
          filter="url(#luxe-soft-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.46 }}
          transition={{ duration: 2.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.path
          d={octagonPath(600, 400, 196, Math.PI / 8)}
          fill="none"
          stroke="url(#luxe-octagon-grad)"
          strokeWidth="2.1"
          filter="url(#luxe-soft-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.58 }}
          transition={{ duration: 2.2, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.g
          style={{ transformOrigin: '600px 400px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 54, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse
            cx="600"
            cy="400"
            rx="150"
            ry="130"
            fill="none"
            stroke={primaryColor}
            strokeWidth="0.8"
            opacity="0.25"
            strokeDasharray="4 8"
          />
        </motion.g>

        <motion.g
          style={{ transformOrigin: '600px 400px' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 72, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse
            cx="600"
            cy="400"
            rx="130"
            ry="152"
            fill="none"
            stroke={primaryColor}
            strokeWidth="0.8"
            opacity="0.2"
            strokeDasharray="4 8"
          />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 0.44, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '600px 400px' }}
        >
          <rect x="556" y="356" width="88" height="88" fill="none" stroke={primaryColor} strokeWidth="1.2" opacity="0.7" />
          <rect x="573" y="373" width="54" height="54" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.7" />
          <rect x="589" y="389" width="22" height="22" fill="none" stroke={primaryColor} strokeWidth="1.1" opacity="0.7" />
        </motion.g>

        <motion.path
          d="M600,342 L600,458 M542,400 L658,400 M558,358 L642,442 M642,358 L558,442"
          fill="none"
          stroke={primaryColor}
          strokeWidth="0.8"
          opacity="0.24"
          strokeDasharray="6 7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.24 }}
          transition={{ duration: 2.1, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        />

        {[0, 1, 2, 3, 4, 5, 6, 7].map((pointIndex) => {
          const angle = Math.PI / 8 + (Math.PI * 2 * pointIndex) / 8;
          const x = 600 + 262 * Math.cos(angle);
          const y = 400 + 262 * Math.sin(angle);
          return (
            <motion.circle
              key={`luxe-vertex-${pointIndex}`}
              cx={x}
              cy={y}
              r="2.8"
              fill={primaryColor}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 1.16, 1], opacity: [0, 0.45, 0.7, 0.45] }}
              transition={{
                duration: 2.2,
                delay: 1.2 + pointIndex * 0.11,
                repeat: Infinity,
                repeatDelay: 4.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

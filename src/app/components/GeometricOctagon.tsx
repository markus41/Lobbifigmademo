import { motion } from 'motion/react';

interface GeometricOctagonProps {
  primaryColor?: string;
}

export function GeometricOctagon({ primaryColor = '#D4AF37' }: GeometricOctagonProps) {
  // Octagon path generator (8 sides)
  const createOctagonPath = (centerX: number, centerY: number, size: number, rotation: number = 0) => {
    const points = [];
    const angleStep = (Math.PI * 2) / 8;

    for (let i = 0; i < 8; i++) {
      const angle = i * angleStep + rotation;
      const x = centerX + size * Math.cos(angle);
      const y = centerY + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    return `M${points[0]} ` + points.slice(1).map(p => `L${p}`).join(' ') + ' Z';
  };

  // Square path generator
  const createSquarePath = (centerX: number, centerY: number, size: number) => {
    const half = size / 2;
    return `M${centerX - half},${centerY - half} L${centerX + half},${centerY - half} L${centerX + half},${centerY + half} L${centerX - half},${centerY + half} Z`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1]">
      {/* Breathing scale animation on the entire composition */}
      <motion.div
        className="absolute w-full h-full"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="octGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0.6" />
            </linearGradient>

            {/* Glow filter for paths */}
            <filter id="octGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Stronger glow for vertex dots */}
            <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* MAIN OCTAGON - Glowing traced animation */}
          <motion.path
            d={createOctagonPath(600, 400, 280, Math.PI / 16)}
            fill="none"
            stroke={primaryColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#octGlow)"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 1, 0.35],
            }}
            transition={{
              pathLength: {
                duration: 2.2,
                ease: [0.16, 1, 0.3, 1],
              },
              opacity: {
                duration: 4,
                times: [0, 0.1, 0.6, 1],
                ease: [0.16, 1, 0.3, 1],
              },
            }}
          />

          {/* SECONDARY OCTAGON - With counter-rotation breathing */}
          <motion.path
            d={createOctagonPath(600, 400, 220, 0)}
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#octGlow)"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 1, 0.3],
            }}
            transition={{
              pathLength: {
                duration: 2.2,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              },
              opacity: {
                duration: 4,
                delay: 0.2,
                times: [0, 0.1, 0.6, 1],
                ease: [0.16, 1, 0.3, 1],
              },
            }}
          />

          {/* TERTIARY OCTAGON - Outer ring */}
          <motion.path
            d={createOctagonPath(600, 400, 340, -Math.PI / 16)}
            fill="none"
            stroke={primaryColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: [0, 0.8, 0.8, 0.2],
            }}
            transition={{
              pathLength: {
                duration: 2.2,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              },
              opacity: {
                duration: 4,
                delay: 0.4,
                times: [0, 0.1, 0.6, 1],
                ease: [0.16, 1, 0.3, 1],
              },
            }}
          />

          {/* GHOST OCTAGON - Extremely faint outermost ring, slow pulse */}
          <motion.path
            d={createOctagonPath(600, 400, 400, Math.PI / 8)}
            fill="none"
            stroke={primaryColor}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 0.12, 0.08],
            }}
            transition={{
              pathLength: { duration: 3, delay: 0.8, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 5, delay: 0.8, times: [0, 0.4, 1] },
            }}
          />

          {/* THREE ROTATING SQUARES - With eased rotation */}

          {/* Square 1: Counterclockwise, largest - smooth ease */}
          <motion.path
            d={createSquarePath(600, 400, 120)}
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{
              rotate: -360,
              opacity: [0, 0.35, 0.35],
            }}
            transition={{
              rotate: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
              opacity: {
                duration: 3,
                delay: 1.5,
                times: [0, 0.3, 1],
              },
            }}
            style={{ transformOrigin: '600px 400px' }}
          />

          {/* Square 2: Clockwise, medium */}
          <motion.path
            d={createSquarePath(600, 400, 80)}
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
            initial={{ rotate: 45, opacity: 0 }}
            animate={{
              rotate: 405,
              opacity: [0, 0.45, 0.45],
            }}
            transition={{
              rotate: {
                duration: 24,
                repeat: Infinity,
                ease: 'linear',
              },
              opacity: {
                duration: 3,
                delay: 1.7,
                times: [0, 0.3, 1],
              },
            }}
            style={{ transformOrigin: '600px 400px' }}
          />

          {/* Square 3: Counterclockwise, smallest */}
          <motion.path
            d={createSquarePath(600, 400, 40)}
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
            initial={{ rotate: 0, opacity: 0 }}
            animate={{
              rotate: -360,
              opacity: [0, 0.55, 0.55],
            }}
            transition={{
              rotate: {
                duration: 18,
                repeat: Infinity,
                ease: 'linear',
              },
              opacity: {
                duration: 3,
                delay: 1.9,
                times: [0, 0.3, 1],
              },
            }}
            style={{ transformOrigin: '600px 400px' }}
          />

          {/* Geometric connection lines - animated with stagger */}
          <motion.line
            x1="520" y1="320" x2="680" y2="480"
            stroke={primaryColor}
            strokeWidth="1"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{
              duration: 1.8,
              delay: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          <motion.line
            x1="680" y1="320" x2="520" y2="480"
            stroke={primaryColor}
            strokeWidth="1"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{
              duration: 1.8,
              delay: 2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Vertical and horizontal lines */}
          <motion.line
            x1="600" y1="280" x2="600" y2="520"
            stroke={primaryColor}
            strokeWidth="1"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{
              duration: 1.8,
              delay: 2.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          <motion.line
            x1="480" y1="400" x2="720" y2="400"
            stroke={primaryColor}
            strokeWidth="1"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{
              duration: 1.8,
              delay: 2.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* Corner geometric markers - Art Deco style with staggered entrance */}
          {[
            { x: 200, y: 150 },
            { x: 1000, y: 150 },
            { x: 200, y: 650 },
            { x: 1000, y: 650 },
          ].map((corner, index) => (
            <motion.g
              key={`corner-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.25, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 3 + (index * 0.15),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Outer diamond */}
              <path
                d={`M${corner.x},${corner.y - 12} L${corner.x + 12},${corner.y} L${corner.x},${corner.y + 12} L${corner.x - 12},${corner.y} Z`}
                fill="none"
                stroke={primaryColor}
                strokeWidth="0.8"
              />
              {/* Inner diamond */}
              <path
                d={`M${corner.x},${corner.y - 6} L${corner.x + 6},${corner.y} L${corner.x},${corner.y + 6} L${corner.x - 6},${corner.y} Z`}
                fill="none"
                stroke={primaryColor}
                strokeWidth="0.5"
              />
            </motion.g>
          ))}

          {/* Octagon vertex dots - Pulsing glow effect */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i * Math.PI * 2) / 8 + Math.PI / 16;
            const x = 600 + 280 * Math.cos(angle);
            const y = 400 + 280 * Math.sin(angle);

            return (
              <motion.circle
                key={`vertex-${i}`}
                cx={x}
                cy={y}
                r="3"
                fill={primaryColor}
                filter="url(#dotGlow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1.3, 1],
                  opacity: [0, 0.5, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  delay: 2.5 + (i * 0.1),
                  ease: [0.22, 1, 0.36, 1],
                  scale: {
                    duration: 4,
                    delay: 2.5 + (i * 0.1),
                    times: [0, 0.2, 0.5, 1],
                  },
                  opacity: {
                    duration: 4,
                    delay: 2.5 + (i * 0.1),
                    times: [0, 0.2, 0.5, 1],
                  },
                }}
              />
            );
          })}

          {/* Secondary vertex dots on inner octagon - smaller, subtler */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i * Math.PI * 2) / 8;
            const x = 600 + 220 * Math.cos(angle);
            const y = 400 + 220 * Math.sin(angle);

            return (
              <motion.circle
                key={`inner-vertex-${i}`}
                cx={x}
                cy={y}
                r="2"
                fill={primaryColor}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: [0, 0.3, 0.15],
                }}
                transition={{
                  duration: 1.5,
                  delay: 3.0 + (i * 0.08),
                  ease: [0.22, 1, 0.36, 1],
                  opacity: {
                    duration: 3,
                    delay: 3.0 + (i * 0.08),
                    times: [0, 0.3, 1],
                  },
                }}
              />
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
}

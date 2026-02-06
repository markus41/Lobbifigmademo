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
        </defs>

        {/* MAIN OCTAGON - Traced animation that fades out */}
        <motion.path
          d={createOctagonPath(600, 400, 280, Math.PI / 16)}
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ 
            pathLength: 0, 
            opacity: 1,
          }}
          animate={{ 
            pathLength: 1, 
            opacity: [1, 1, 0.25],
          }}
          transition={{
            pathLength: {
              duration: 2.5,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 3.5,
              times: [0, 0.7, 1],
              ease: [0.22, 1, 0.36, 1],
            }
          }}
        />

        {/* SECONDARY OCTAGON - Smaller, traced */}
        <motion.path
          d={createOctagonPath(600, 400, 220, 0)}
          fill="none"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ 
            pathLength: 0, 
            opacity: 1,
          }}
          animate={{ 
            pathLength: 1, 
            opacity: [1, 1, 0.2],
          }}
          transition={{
            pathLength: {
              duration: 2.5,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 3.5,
              delay: 0.3,
              times: [0, 0.7, 1],
              ease: [0.22, 1, 0.36, 1],
            }
          }}
        />

        {/* TERTIARY OCTAGON - Even smaller, traced */}
        <motion.path
          d={createOctagonPath(600, 400, 340, -Math.PI / 16)}
          fill="none"
          stroke={primaryColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ 
            pathLength: 0, 
            opacity: 1,
          }}
          animate={{ 
            pathLength: 1, 
            opacity: [1, 1, 0.15],
          }}
          transition={{
            pathLength: {
              duration: 2.5,
              delay: 0.6,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 3.5,
              delay: 0.6,
              times: [0, 0.7, 1],
              ease: [0.22, 1, 0.36, 1],
            }
          }}
        />

        {/* THREE ROTATING SQUARES IN CENTER */}
        
        {/* Square 1: Counterclockwise, largest */}
        <motion.path
          d={createSquarePath(600, 400, 120)}
          fill="none"
          stroke={primaryColor}
          strokeWidth="1.5"
          opacity="0.3"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: '600px 400px' }}
        />

        {/* Square 2: Clockwise, medium */}
        <motion.path
          d={createSquarePath(600, 400, 80)}
          fill="none"
          stroke={primaryColor}
          strokeWidth="1.5"
          opacity="0.4"
          initial={{ rotate: 45 }}
          animate={{ rotate: 405 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: '600px 400px' }}
        />

        {/* Square 3: Counterclockwise, smallest */}
        <motion.path
          d={createSquarePath(600, 400, 40)}
          fill="none"
          stroke={primaryColor}
          strokeWidth="1.5"
          opacity="0.5"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: '600px 400px' }}
        />

        {/* Geometric connection lines - diagonal cross */}
        <motion.line
          x1="520" y1="320" x2="680" y2="480"
          stroke={primaryColor}
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{
            duration: 2,
            delay: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <motion.line
          x1="680" y1="320" x2="520" y2="480"
          stroke={primaryColor}
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{
            duration: 2,
            delay: 2.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Vertical and horizontal lines */}
        <motion.line
          x1="600" y1="280" x2="600" y2="520"
          stroke={primaryColor}
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{
            duration: 2,
            delay: 2.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <motion.line
          x1="480" y1="400" x2="720" y2="400"
          stroke={primaryColor}
          strokeWidth="0.5"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.2 }}
          transition={{
            duration: 2,
            delay: 2.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Corner geometric markers - Art Deco style */}
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
            {/* Diamond shape */}
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

        {/* Octagon vertex dots */}
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
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.4,
              }}
              transition={{
                duration: 0.5,
                delay: 2.5 + (i * 0.1),
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

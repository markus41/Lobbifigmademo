import { motion } from 'motion/react';

export function GeometricOctagon() {
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

  // Create multiple octagons at different scales and rotations
  const octagons = [
    { size: 280, rotation: 0, delay: 0, opacity: 0.15, strokeWidth: 0.8 },
    { size: 220, rotation: Math.PI / 16, delay: 0.3, opacity: 0.2, strokeWidth: 0.8 },
    { size: 160, rotation: Math.PI / 8, delay: 0.6, opacity: 0.25, strokeWidth: 0.7 },
    { size: 340, rotation: -Math.PI / 16, delay: 0.9, opacity: 0.1, strokeWidth: 0.8 },
    { size: 400, rotation: Math.PI / 24, delay: 1.2, opacity: 0.08, strokeWidth: 0.6 },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1]">
      <svg 
        className="absolute w-full h-full" 
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="octagonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F4D03F" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B7330" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Multiple overlapping octagons */}
        {octagons.map((octagon, index) => (
          <motion.path
            key={index}
            d={createOctagonPath(600, 400, octagon.size, octagon.rotation)}
            fill="none"
            stroke="url(#octagonGradient)"
            strokeWidth={octagon.strokeWidth}
            opacity={octagon.opacity}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: octagon.opacity,
            }}
            transition={{
              pathLength: {
                duration: 2.4,
                delay: octagon.delay,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 1.2,
                delay: octagon.delay + 0.3,
                ease: [0.22, 1, 0.36, 1],
              }
            }}
          />
        ))}

        {/* Inner connecting lines - subtle geometric web */}
        {[
          { x1: 600, y1: 280, x2: 600, y2: 520, delay: 1.5 },
          { x1: 480, y1: 400, x2: 720, y2: 400, delay: 1.6 },
          { x1: 520, y1: 310, x2: 680, y2: 490, delay: 1.7 },
          { x1: 680, y1: 310, x2: 520, y2: 490, delay: 1.8 },
        ].map((line, index) => (
          <motion.line
            key={`line-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#octagonGradient)"
            strokeWidth="0.4"
            opacity="0.08"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.08 }}
            transition={{
              duration: 1.5,
              delay: line.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Center octagon with slower rotation */}
        <motion.path
          d={createOctagonPath(600, 400, 120, 0)}
          fill="none"
          stroke="url(#octagonGradient)"
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ pathLength: 0, opacity: 0, rotate: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 0.3,
            rotate: 360,
          }}
          transition={{
            pathLength: {
              duration: 2.4,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            },
            opacity: {
              duration: 1.2,
              delay: 0.7,
            },
            rotate: {
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }
          }}
          style={{ transformOrigin: '600px 400px' }}
        />

        {/* Subtle nodes at octagon vertices */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i * Math.PI * 2) / 8;
          const x = 600 + 220 * Math.cos(angle + Math.PI / 16);
          const y = 400 + 220 * Math.sin(angle + Math.PI / 16);
          
          return (
            <motion.circle
              key={`node-${i}`}
              cx={x}
              cy={y}
              r="2"
              fill="#D4AF37"
              opacity="0.2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 2 + (i * 0.08),
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

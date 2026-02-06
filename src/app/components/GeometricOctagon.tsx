import { motion } from 'motion/react';

interface GeometricOctagonProps {
  primaryColor?: string;
}

export function GeometricOctagon({ primaryColor = '#D4AF37' }: GeometricOctagonProps) {
  const cx = 600;
  const cy = 400;

  // Precise octagon path - perfectly aligned, no random rotations
  const createOctagonPath = (size: number, rotation: number = 0) => {
    const points = [];
    const angleStep = (Math.PI * 2) / 8;
    // Offset so flat edge is at top (rotate -22.5 degrees)
    const baseRotation = -Math.PI / 8 + rotation;

    for (let i = 0; i < 8; i++) {
      const angle = i * angleStep + baseRotation;
      const x = cx + size * Math.cos(angle);
      const y = cy + size * Math.sin(angle);
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    return `M${points[0]} ` + points.slice(1).map(p => `L${p}`).join(' ') + ' Z';
  };

  // Get vertex positions for a given octagon
  const getVertices = (size: number, rotation: number = 0) => {
    const baseRotation = -Math.PI / 8 + rotation;
    return Array.from({ length: 8 }, (_, i) => {
      const angle = i * ((Math.PI * 2) / 8) + baseRotation;
      return {
        x: cx + size * Math.cos(angle),
        y: cy + size * Math.sin(angle),
      };
    });
  };

  // Concentric rings - perfectly ordered, decreasing size
  const rings = [
    { size: 340, opacity: 0.06, strokeWidth: 0.4, delay: 0, duration: 3.0 },
    { size: 280, opacity: 0.10, strokeWidth: 0.5, delay: 0.2, duration: 2.8 },
    { size: 220, opacity: 0.14, strokeWidth: 0.6, delay: 0.4, duration: 2.6 },
    { size: 160, opacity: 0.18, strokeWidth: 0.7, delay: 0.6, duration: 2.4 },
    { size: 100, opacity: 0.22, strokeWidth: 0.8, delay: 0.8, duration: 2.2 },
  ];

  // Cardinal axis lines from center outward
  const axisLines = [0, 45, 90, 135].map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x1: cx + Math.cos(rad) * 60,
      y1: cy + Math.sin(rad) * 60,
      x2: cx + Math.cos(rad) * 340,
      y2: cy + Math.sin(rad) * 340,
      x1b: cx - Math.cos(rad) * 60,
      y1b: cy - Math.sin(rad) * 60,
      x2b: cx - Math.cos(rad) * 340,
      y2b: cy - Math.sin(rad) * 340,
      delay: 1.8 + i * 0.1,
    };
  });

  // Vertex markers on the primary ring (280px)
  const primaryVertices = getVertices(280);

  // Corner tick marks on the outer ring
  const outerVertices = getVertices(340);

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1]">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="octGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="octGradSubtle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="octGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.08" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle center glow */}
        <motion.circle
          cx={cx}
          cy={cy}
          r="300"
          fill="url(#octGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
        />

        {/* Concentric octagon rings - innermost to outermost, perfectly aligned */}
        {rings.map((ring, index) => (
          <motion.path
            key={`ring-${index}`}
            d={createOctagonPath(ring.size)}
            fill="none"
            stroke="url(#octGradPrimary)"
            strokeWidth={ring.strokeWidth}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: ring.opacity,
            }}
            transition={{
              pathLength: {
                duration: ring.duration,
                delay: ring.delay,
                ease,
              },
              opacity: {
                duration: 1.5,
                delay: ring.delay + 0.3,
                ease,
              }
            }}
          />
        ))}

        {/* Rotated inner octagon - 22.5deg offset for interlocking geometry */}
        <motion.path
          d={createOctagonPath(190, Math.PI / 8)}
          fill="none"
          stroke="url(#octGradSubtle)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.08 }}
          transition={{
            pathLength: { duration: 2.8, delay: 1.0, ease },
            opacity: { duration: 1.5, delay: 1.3, ease },
          }}
        />

        {/* Axis lines - clean crosshairs through center */}
        {axisLines.map((line, i) => (
          <g key={`axis-${i}`}>
            <motion.line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={primaryColor}
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.06 }}
              transition={{ duration: 1.8, delay: line.delay, ease }}
            />
            <motion.line
              x1={line.x1b}
              y1={line.y1b}
              x2={line.x2b}
              y2={line.y2b}
              stroke={primaryColor}
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.06 }}
              transition={{ duration: 1.8, delay: line.delay + 0.05, ease }}
            />
          </g>
        ))}

        {/* Vertex markers on primary ring - small precise diamonds */}
        {primaryVertices.map((v, i) => (
          <motion.g
            key={`vertex-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.2 + i * 0.06, ease }}
          >
            <rect
              x={v.x - 2.5}
              y={v.y - 2.5}
              width="5"
              height="5"
              fill={primaryColor}
              opacity="0.25"
              transform={`rotate(45 ${v.x} ${v.y})`}
            />
          </motion.g>
        ))}

        {/* Outer ring tick marks - architectural precision */}
        {outerVertices.map((v, i) => {
          const angle = i * ((Math.PI * 2) / 8) - Math.PI / 8;
          const tickInner = {
            x: cx + 330 * Math.cos(angle),
            y: cy + 330 * Math.sin(angle),
          };
          const tickOuter = {
            x: cx + 350 * Math.cos(angle),
            y: cy + 350 * Math.sin(angle),
          };
          return (
            <motion.line
              key={`tick-${i}`}
              x1={tickInner.x}
              y1={tickInner.y}
              x2={tickOuter.x}
              y2={tickOuter.y}
              stroke={primaryColor}
              strokeWidth="0.8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 0.4, delay: 2.6 + i * 0.05, ease }}
            />
          );
        })}

        {/* Innermost focal point - single slow-rotating octagon */}
        <motion.path
          d={createOctagonPath(40)}
          fill="none"
          stroke={primaryColor}
          strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.3,
            rotate: 360,
          }}
          transition={{
            pathLength: { duration: 2, delay: 1.2, ease },
            opacity: { duration: 1, delay: 1.5 },
            rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Connecting arcs between rings - subtle architectural detail */}
        {[0, 2, 4, 6].map((vertexIndex) => {
          const inner = getVertices(160)[vertexIndex];
          const outer = getVertices(220)[vertexIndex];
          return (
            <motion.line
              key={`connector-${vertexIndex}`}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke={primaryColor}
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.08 }}
              transition={{ duration: 1, delay: 2.0 + vertexIndex * 0.05, ease }}
            />
          );
        })}

        {/* Subtle breathing animation on the middle ring */}
        <motion.path
          d={createOctagonPath(220)}
          fill="none"
          stroke={primaryColor}
          strokeWidth="0.3"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.06, 0.03, 0.06, 0],
            scale: [1, 1.01, 1, 1.01, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 4,
            ease: 'linear',
          }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      </svg>
    </div>
  );
}

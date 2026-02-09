import { motion } from 'motion/react';

interface GeometricOctagonProps {
  primaryColor?: string;
}

export function GeometricOctagon({ primaryColor = '#D4AF37' }: GeometricOctagonProps) {
  const oct = (cx: number, cy: number, r: number, rot = 0) => {
    const pts = Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI * 2) / 8 + rot;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    return `M${pts[0]} ${pts.slice(1).map(p => `L${p}`).join(' ')} Z`;
  };

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[1]">
      <svg className="absolute w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        {/* Outer ring - draws then fades to ghost */}
        <motion.path
          d={oct(600, 400, 300, Math.PI / 16)}
          fill="none" stroke={primaryColor} strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.4, 0.4, 0.12] }}
          transition={{ pathLength: { duration: 2.5, ease }, opacity: { duration: 4, times: [0, 0.3, 0.7, 1] } }}
        />

        {/* Middle ring */}
        <motion.path
          d={oct(600, 400, 230, 0)}
          fill="none" stroke={primaryColor} strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.3, 0.3, 0.1] }}
          transition={{ pathLength: { duration: 2.2, delay: 0.3, ease }, opacity: { duration: 3.8, delay: 0.3, times: [0, 0.3, 0.7, 1] } }}
        />

        {/* Inner ring */}
        <motion.path
          d={oct(600, 400, 160, Math.PI / 16)}
          fill="none" stroke={primaryColor} strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.25, 0.25, 0.08] }}
          transition={{ pathLength: { duration: 2, delay: 0.6, ease }, opacity: { duration: 3.6, delay: 0.6, times: [0, 0.3, 0.7, 1] } }}
        />

        {/* Center crosshair - very subtle */}
        {[
          { x1: 600, y1: 340, x2: 600, y2: 460 },
          { x1: 540, y1: 400, x2: 660, y2: 400 },
        ].map((l, i) => (
          <motion.line key={i} {...l}
            stroke={primaryColor} strokeWidth="0.5" strokeDasharray="4 8"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.12 }}
            transition={{ duration: 1.5, delay: 1.8 + i * 0.2, ease }}
          />
        ))}

        {/* Corner accents */}
        {[
          { x: 180, y: 130 }, { x: 1020, y: 130 },
          { x: 180, y: 670 }, { x: 1020, y: 670 },
        ].map((c, i) => (
          <motion.g key={i}
            initial={{ opacity: 0 }} animate={{ opacity: 0.15 }}
            transition={{ duration: 0.6, delay: 2.5 + i * 0.1 }}
          >
            <path d={`M${c.x},${c.y - 8} L${c.x + 8},${c.y} L${c.x},${c.y + 8} L${c.x - 8},${c.y} Z`}
              fill="none" stroke={primaryColor} strokeWidth="0.5" />
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

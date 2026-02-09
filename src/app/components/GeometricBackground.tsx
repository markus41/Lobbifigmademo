import { motion } from 'motion/react';

interface GeometricBackgroundProps {
  stage: 'logo' | 'landing' | 'email' | 'orgLogin' | 'welcome' | 'dashboardEntry' | 'dashboard';
  primaryRgb?: string;
}

export function GeometricBackground({ stage, primaryRgb: _primaryRgb = '212,175,55' }: GeometricBackgroundProps) {
  const shouldFade = stage === 'landing' || stage === 'email';
  const shouldHide = stage === 'orgLogin' || stage === 'welcome' || stage === 'dashboardEntry' || stage === 'dashboard';

  if (shouldHide) return null;

  // Elite refinement: Persistent ambient system - geometry never "finishes"
  // Slow rotations by 40%, use exponential easing, add continuous micro-motion
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none pt-[15vh] pb-[15vh]"
      style={{}}
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldFade ? 0.12 : 1 }}
      // Elite: Quintic easing instead of cubic
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative w-full h-full max-w-[70vh] max-h-[70vh]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8B7330" stopOpacity="0.7" />
            </linearGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Rotating outer diamonds - continuous */}
          <motion.g
            animate={{ rotate: 360 }}
            // Elite: Slow by 40% (40s → 56s)
            transition={{ duration: 56, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '200px 200px' }}
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.path
                key={`outer-diamond-${i}`}
                d={`M200,80 L220,100 L200,120 L180,100 Z`}
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="0.5"
                filter="url(#glow)"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: [0, 1, 1],
                  pathLength: 1,
                }}
                transition={{ 
                  opacity: { duration: 1, delay: i * 0.1 },
                  pathLength: { duration: 1.5, delay: i * 0.1, ease: "easeInOut" }
                }}
                style={{ 
                  transformOrigin: '200px 200px',
                  transform: `rotate(${angle}deg)`,
                }}
              />
            ))}
          </motion.g>

          {/* Middle rotating ring - continuous */}
          <motion.g
            animate={{ rotate: -360 }}
            // Elite: Slow by 40% (50s → 70s)
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '200px 200px' }}
          >
            <motion.circle
              cx="200"
              cy="200"
              r="100"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="0.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Main Octagon - drawing animation */}
          <motion.path
            d="M200,80 L280,120 L320,200 L280,280 L200,320 L120,280 L80,200 L120,120 Z"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
          />

          {/* Inner rotating diamonds - continuous */}
          <motion.g
            animate={{ rotate: 360 }}
            // Elite: Slow by 40% (30s → 42s)
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '200px 200px' }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.path
                key={`inner-diamond-${i}`}
                d={`M200,140 L215,155 L200,170 L185,155 Z`}
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="0.5"
                filter="url(#glow)"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0.8],
                  pathLength: 1,
                }}
                transition={{ 
                  opacity: { duration: 1, delay: 1.5 + (i * 0.08) },
                  pathLength: { duration: 1.2, delay: 1.5 + (i * 0.08), ease: "easeInOut" }
                }}
                style={{ 
                  transformOrigin: '200px 200px',
                  transform: `rotate(${angle}deg)`,
                }}
              />
            ))}
          </motion.g>

          {/* Central assembling squares - building effect */}
          <motion.g>
            {/* Outer square */}
            <motion.rect
              x="150"
              y="150"
              width="100"
              height="100"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
            />
            
            {/* Mid square */}
            <motion.rect
              x="170"
              y="170"
              width="60"
              height="60"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.2, delay: 2.3, ease: "easeInOut" }}
            />
            
            {/* Inner square */}
            <motion.rect
              x="185"
              y="185"
              width="30"
              height="30"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 1, delay: 2.5, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Framed L - Central Icon (inspired by the image) */}
          <motion.g>
            {/* Corner brackets - top left */}
            <motion.path
              d="M145,145 L145,165 M145,145 L165,145"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeLinecap="square"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.8 }}
            />
            
            {/* Corner brackets - top right */}
            <motion.path
              d="M255,145 L255,165 M255,145 L235,145"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeLinecap="square"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.9 }}
            />
            
            {/* Corner brackets - bottom left */}
            <motion.path
              d="M145,255 L145,235 M145,255 L165,255"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeLinecap="square"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 3.0 }}
            />
            
            {/* Corner brackets - bottom right */}
            <motion.path
              d="M255,255 L255,235 M255,255 L235,255"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeLinecap="square"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 3.1 }}
            />
            
            {/* Decorative corner diamonds */}
            <motion.circle
              cx="145"
              cy="145"
              r="3"
              fill="url(#goldGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 3.2 }}
            />
            <motion.circle
              cx="255"
              cy="145"
              r="3"
              fill="url(#goldGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 3.3 }}
            />
            <motion.circle
              cx="145"
              cy="255"
              r="3"
              fill="url(#goldGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 3.4 }}
            />
            <motion.circle
              cx="255"
              cy="255"
              r="3"
              fill="url(#goldGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 3.5 }}
            />
          </motion.g>

          {/* Connecting lines - assembling from center */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 200 + Math.cos(rad) * 40;
            const y1 = 200 + Math.sin(rad) * 40;
            const x2 = 200 + Math.cos(rad) * 100;
            const y2 = 200 + Math.sin(rad) * 100;
            
            return (
              <motion.line
                key={`connect-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#goldGradient)"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 0.8, delay: 2.7 + (i * 0.05), ease: "easeOut" }}
              />
            );
          })}

          {/* The L - serif style with subtle animation */}
          <motion.text
            x="200"
            y="225"
            textAnchor="middle"
            fontSize="90"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontWeight="500"
            fill="url(#goldGradient)"
            filter="url(#glow)"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ duration: 1, delay: 3.6, ease: [0.22, 1, 0.36, 1] }}
          >
            L
          </motion.text>
          
          {/* Subtle pulse on the framed L - Elite: Micro-motion at 3% amplitude */}
          <motion.rect
            x="145"
            y="145"
            width="110"
            height="110"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="0.5"
            opacity="0.3"
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1.03, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              delay: 4.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{ transformOrigin: '200px 200px' }}
          />

          {/* Outer orbital rings - continuous */}
          <motion.g
            animate={{ rotate: 360 }}
            // Elite: Slow by 40% (60s → 84s)
            transition={{ duration: 84, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '200px 200px' }}
          >
            <motion.ellipse
              cx="200"
              cy="200"
              rx="140"
              ry="120"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="0.3"
              strokeDasharray="2 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2.5, delay: 3.5, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Counter-rotating orbital */}
          <motion.g
            animate={{ rotate: -360 }}
            // Elite: Slow by 40% (55s → 77s)
            transition={{ duration: 77, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '200px 200px' }}
          >
            <motion.ellipse
              cx="200"
              cy="200"
              rx="120"
              ry="140"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="0.3"
              strokeDasharray="2 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2.5, delay: 3.7, ease: "easeInOut" }}
            />
          </motion.g>
        </svg>
      </div>
    </motion.div>
  );
}
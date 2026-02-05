import { motion } from 'motion/react';

interface GeometricBackgroundProps {
  stage: 'logo' | 'landing' | 'email' | 'orgLogin' | 'welcome' | 'dashboardEntry' | 'dashboard';
  primaryRgb?: string;
}

export function GeometricBackground({ stage, primaryRgb = '212,175,55' }: GeometricBackgroundProps) {
  const shouldFade = stage === 'landing' || stage === 'email';
  const shouldHide = stage === 'orgLogin' || stage === 'welcome' || stage === 'dashboardEntry' || stage === 'dashboard';

  if (shouldHide) return null;

  const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{
        paddingTop: '15vh',
        paddingBottom: '15vh',
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: shouldFade ? 0.12 : 1 }}
      transition={{ duration: 2.4, ease }}
    >
      <div className="relative w-full h-full max-w-[70vh] max-h-[70vh]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="bgGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8B7330" stopOpacity="0.5" />
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Single clean outer octagon */}
          <motion.path
            d="M200,60 L296,104 L340,200 L296,296 L200,340 L104,296 L60,200 L104,104 Z"
            fill="none"
            stroke="url(#bgGoldGrad)"
            strokeWidth="0.8"
            filter="url(#softGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 3, delay: 0.8, ease }}
          />

          {/* Inner octagon */}
          <motion.path
            d="M200,110 L263,137 L290,200 L263,263 L200,290 L137,263 L110,200 L137,137 Z"
            fill="none"
            stroke="url(#bgGoldGrad)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 2.5, delay: 1.5, ease }}
          />

          {/* Dashed circle between the two octagons */}
          <motion.circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="url(#bgGoldGrad)"
            strokeWidth="0.4"
            strokeDasharray="3 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.25 }}
            transition={{ duration: 2.5, delay: 1.2, ease }}
          />

          {/* Gentle single rotation group */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '200px 200px' }}
          >
            <motion.circle
              cx="200"
              cy="200"
              r="130"
              fill="none"
              stroke="url(#bgGoldGrad)"
              strokeWidth="0.3"
              strokeDasharray="1 10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 2, delay: 2 }}
            />
          </motion.g>

          {/* Corner brackets */}
          {[
            { d: "M145,145 L145,160 M145,145 L160,145", delay: 2.6 },
            { d: "M255,145 L255,160 M255,145 L240,145", delay: 2.7 },
            { d: "M145,255 L145,240 M145,255 L160,255", delay: 2.8 },
            { d: "M255,255 L255,240 M255,255 L240,255", delay: 2.9 },
          ].map((bracket, i) => (
            <motion.path
              key={`bracket-${i}`}
              d={bracket.d}
              stroke="url(#bgGoldGrad)"
              strokeWidth="1.2"
              strokeLinecap="square"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 0.5, delay: bracket.delay, ease }}
            />
          ))}

          {/* The L - serif style */}
          <motion.text
            x="200"
            y="218"
            textAnchor="middle"
            fontSize="72"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontWeight="400"
            fill="url(#bgGoldGrad)"
            filter="url(#softGlow)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 3.2, ease }}
          >
            L
          </motion.text>

          {/* Subtle pulse on frame */}
          <motion.rect
            x="145"
            y="145"
            width="110"
            height="110"
            fill="none"
            stroke="url(#bgGoldGrad)"
            strokeWidth="0.4"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.2, 0.1, 0.2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 4,
              ease: 'linear',
            }}
            style={{ transformOrigin: '200px 200px' }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

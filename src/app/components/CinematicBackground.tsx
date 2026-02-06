import { motion } from 'motion/react';
import { Box } from '@chakra-ui/react';

interface CinematicBackgroundProps {
  primaryRgb?: string;
  stage?: string;
}

export function CinematicBackground({ primaryRgb = '67,24,255' }: CinematicBackgroundProps) {
  return (
    <>
      <Box position="fixed" inset={0} bg="navy.900" zIndex={0} />
      <motion.div
        style={{
          position: 'fixed', inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(${primaryRgb}, 0.08) 0%, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      />
    </>
  );
}

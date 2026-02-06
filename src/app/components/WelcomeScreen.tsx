import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import type { Account, Organization } from '../data/themes';

interface WelcomeScreenProps {
  account: Account;
  organization: Organization;
  onComplete: () => void;
}

export function WelcomeScreen({ account, organization, onComplete }: WelcomeScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box position="absolute" inset={0} bg="navy.900" />
      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(67,24,255,0.15), transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute', width: '3px', height: '3px', borderRadius: '50%',
              background: i % 2 === 0 ? '#7551FF' : '#C850C0',
              left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0, 1.5, 0], y: [0, -50 - Math.random() * 50] }}
            transition={{ duration: 3 + Math.random() * 2, delay: 0.5 + Math.random() * 1.5 }}
          />
        ))}
      </Box>

      <Flex direction="column" align="center" position="relative" zIndex={1} px={8} maxW="2xl" textAlign="center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Text fontSize="lg" color="#A3AED0" mb={2}>Welcome back,</Text>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.5 }}>
          <Heading fontSize="5xl" fontWeight="700" mb={6} bgGradient="linear(to-r, brand.400, #C850C0, brand.300)" bgClip="text">
            {account.first} {account.last}
          </Heading>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.8 }}>
          <Flex align="center" gap={3} px={6} py={3} borderRadius="full" mb={4} bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100">
            <Flex w="32px" h="32px" borderRadius="full" align="center" justify="center" bgGradient="linear(to-br, brand.400, #C850C0)">
              <Text fontSize="xs" fontWeight="bold" color="white">{organization.logoLetter}</Text>
            </Flex>
            <Text fontSize="md" fontWeight="600" color="white">{organization.name}</Text>
          </Flex>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }}>
          <Text fontSize="sm" color="#A3AED0" mb={3}>{account.role}</Text>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.4 }}>
          <Text fontSize="xs" color="#707EAE">
            {new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </Text>
        </motion.div>
        <Flex mt={12} gap={2}>
          {[0, 1, 2].map((i) => (
            <motion.div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7551FF' }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </Flex>
      </Flex>
    </motion.div>
  );
}

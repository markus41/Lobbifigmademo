import { motion } from 'motion/react';
import { Box, Flex, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background */}
      <Box position="absolute" inset={0} bg="navy.900">
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(67, 24, 255, 0.15), transparent 60%)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 60% 40% at 70% 80%, rgba(200, 80, 192, 0.08), transparent 50%)',
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </Box>

      {/* Grid */}
      <Box
        position="absolute" inset={0} opacity={0.03}
        backgroundImage="linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)"
        backgroundSize="60px 60px"
      />

      {/* Particles */}
      <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              borderRadius: '50%',
              background: i % 3 === 0 ? '#7551FF' : i % 3 === 1 ? '#868CFF' : '#C850C0',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -60 - Math.random() * 80], opacity: [0, 0.6, 0] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
      </Box>

      {/* Content */}
      <Flex direction="column" align="center" position="relative" zIndex={1} px={6} textAlign="center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
        >
          <Flex
            w="80px" h="80px" borderRadius="24px" align="center" justify="center" mb={8}
            bgGradient="linear(to-br, brand.400, #C850C0)"
            boxShadow="0 8px 32px rgba(67, 24, 255, 0.4)"
          >
            <Text fontSize="36px" fontWeight="bold" color="white">AI</Text>
          </Flex>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Heading
            fontSize={{ base: '40px', md: '56px' }} fontWeight="700" color="white"
            mb={4} lineHeight="1.1" letterSpacing="-0.02em"
          >
            The Lobbi{' '}
            <Text as="span" bgGradient="linear(to-r, brand.400, #C850C0)" bgClip="text">AI</Text>
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Text fontSize={{ base: '16px', md: '18px' }} color="#A3AED0" maxW="520px" mb={10} lineHeight="1.8">
            Intelligent member management powered by AI.
            Streamline operations, unlock insights, and elevate
            your organization's experience.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Button
            onClick={onLoginClick}
            size="lg" px={10} py={7} fontSize="md" fontWeight="bold" color="white"
            bgGradient="linear(to-r, brand.400, #C850C0)"
            borderRadius="16px"
            _hover={{ bgGradient: 'linear(to-r, brand.300, #D060D0)', transform: 'translateY(-2px)', boxShadow: '0 12px 40px rgba(67, 24, 255, 0.4)' }}
            _active={{ transform: 'translateY(0)' }}
            boxShadow="0 8px 24px rgba(67, 24, 255, 0.3)"
            transition="all 0.3s"
            rightIcon={<Icon as={ArrowRight} boxSize={5} />}
          >
            Get Started
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <Flex gap={6} mt={16} align="center">
            {['Enterprise Ready', 'AI Powered', 'Secure'].map((badge) => (
              <Flex key={badge} align="center" gap={2}>
                <Box w="6px" h="6px" borderRadius="full" bgGradient="linear(to-r, brand.400, #C850C0)" />
                <Text fontSize="xs" color="#707EAE" letterSpacing="0.05em" textTransform="uppercase">{badge}</Text>
              </Flex>
            ))}
          </Flex>
        </motion.div>
      </Flex>
    </motion.div>
  );
}

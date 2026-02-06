import { useState } from 'react';
import { motion } from 'motion/react';
import { Box, Flex, Heading, Text, Button, Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from '@chakra-ui/react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Organization, Account } from '@/app/data/themes';

interface OrgLoginProps {
  account: Account;
  organization: Organization;
  onLogin: () => void;
}

export function OrgLogin({ account, organization, onLogin }: OrgLoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => onLogin(), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{ position: 'fixed', inset: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      {/* Background */}
      <Box position="absolute" inset={0} bg="navy.900">
        <Box position="absolute" inset={0} background="radial-gradient(ellipse 70% 50% at 50% 20%, rgba(67, 24, 255, 0.12), transparent 60%)" />
        <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
                borderRadius: '50%',
                background: '#7551FF',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -40 - Math.random() * 60], opacity: [0, 0.5, 0] }}
              transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </Box>
      </Box>

      <motion.div
        initial={{ y: 40, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -30, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: '480px', position: 'relative' }}
      >
        <Box
          bg="navy.800" borderRadius="24px" border="1px solid" borderColor="whiteAlpha.100"
          p={12} position="relative" overflow="hidden"
          boxShadow="0 30px 70px rgba(0,0,0,0.5)"
        >
          {/* Top accent */}
          <Box position="absolute" top={0} left={0} right={0} h="2px" bgGradient="linear(to-r, transparent, brand.400, #C850C0, transparent)" />

          {/* Header */}
          <Flex direction="column" align="center" mb={10}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 160 }}
            >
              <Flex
                w="72px" h="72px" borderRadius="22px" align="center" justify="center" mb={6}
                bgGradient="linear(to-br, brand.400, #C850C0)"
                boxShadow="0 8px 24px rgba(67, 24, 255, 0.3)"
              >
                <Text fontSize="24px" fontWeight="bold" color="white">
                  {organization.logoLetter}
                </Text>
              </Flex>
            </motion.div>

            <Heading fontSize="26px" fontWeight="700" color="white" mb={2}>
              {organization.name}
            </Heading>
            <Text fontSize="sm" color="#A3AED0" fontStyle="italic" mb={4}>
              "{organization.motto}"
            </Text>
            <Box w="60px" h="2px" bgGradient="linear(to-r, brand.400, #C850C0)" borderRadius="full" />
          </Flex>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box mb={5}>
              <Text fontSize="xs" fontWeight="600" color="#A3AED0" mb={3} textTransform="uppercase" letterSpacing="0.15em">
                Email Address
              </Text>
              <InputGroup>
                <InputLeftElement h="52px" pointerEvents="none">
                  <Mail size={18} color="#707EAE" />
                </InputLeftElement>
                <Input
                  value={account.email}
                  readOnly
                  bg="navy.700" border="1px solid" borderColor="whiteAlpha.100"
                  borderRadius="14px" h="52px" color="whiteAlpha.600"
                  cursor="not-allowed"
                />
              </InputGroup>
            </Box>

            <Box mb={6}>
              <Text fontSize="xs" fontWeight="600" color="#A3AED0" mb={3} textTransform="uppercase" letterSpacing="0.15em">
                Password
              </Text>
              <InputGroup>
                <InputLeftElement h="52px" pointerEvents="none">
                  <Lock size={18} color="#707EAE" />
                </InputLeftElement>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  bg="navy.700" border="1px solid" borderColor="whiteAlpha.200"
                  borderRadius="14px" h="52px" color="white"
                  _hover={{ borderColor: 'brand.400' }}
                  _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px #4318FF' }}
                  _placeholder={{ color: 'whiteAlpha.300' }}
                />
                <InputRightElement h="52px">
                  <IconButton
                    aria-label="Toggle password"
                    icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    variant="ghost" color="#707EAE" size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    _hover={{ color: 'white' }}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>

            <Flex justify="space-between" align="center" mb={8} fontSize="xs">
              <Text color="#707EAE" cursor="pointer" _hover={{ color: 'brand.400' }}>
                Remember me
              </Text>
              <Text color="brand.400" cursor="pointer" _hover={{ color: 'brand.300' }}>
                Forgot password?
              </Text>
            </Flex>

            <Button
              type="submit"
              w="100%" h="52px"
              bgGradient="linear(to-r, brand.400, #C850C0)"
              color="white" fontWeight="bold" fontSize="sm"
              borderRadius="14px"
              isLoading={isLoggingIn}
              loadingText="Entering..."
              isDisabled={isLoggingIn || !password}
              _hover={{ bgGradient: 'linear(to-r, brand.300, #D060D0)', transform: 'translateY(-2px)', boxShadow: '0 8px 32px rgba(67, 24, 255, 0.35)' }}
              _active={{ transform: 'translateY(0)' }}
              _disabled={{ opacity: 0.5, cursor: 'not-allowed', _hover: {} }}
              transition="all 0.3s"
              boxShadow="0 4px 16px rgba(67, 24, 255, 0.25)"
            >
              Sign In
            </Button>
          </form>

          <Box mt={8} pt={6} borderTop="1px solid" borderColor="whiteAlpha.100" textAlign="center">
            <Text fontSize="xs" color="#707EAE">Demo mode: Any password will work</Text>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
}

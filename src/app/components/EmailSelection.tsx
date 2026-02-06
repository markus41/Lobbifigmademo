import { useState } from 'react';
import { motion } from 'motion/react';
import { Box, Flex, Heading, Text, Button, Select, Icon } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import { ACCOUNTS, ORGANIZATIONS } from '@/app/data/themes';

interface EmailSelectionProps {
  onEmailSelected: (email: string) => void;
}

export function EmailSelection({ onEmailSelected }: EmailSelectionProps) {
  const [selectedEmail, setSelectedEmail] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedEmail) {
      setIsRecognizing(true);
      setTimeout(() => onEmailSelected(selectedEmail), 900);
    }
  };

  const getOrgForEmail = (email: string) => {
    const account = ACCOUNTS.find(a => a.email === email);
    return account ? ORGANIZATIONS[account.orgId] : null;
  };

  const previewOrg = getOrgForEmail(selectedEmail);
  const previewAccount = ACCOUNTS.find(a => a.email === selectedEmail);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ position: 'fixed', inset: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      {/* Background */}
      <Box position="absolute" inset={0} bg="navy.900">
        <Box position="absolute" inset={0} background="radial-gradient(ellipse 80% 50% at 50% 0%, rgba(67, 24, 255, 0.12), transparent 60%)" />
      </Box>

      <motion.div
        initial={{ y: 30, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: -20, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: '460px', position: 'relative' }}
      >
        <Box
          bg="navy.800" borderRadius="24px" border="1px solid" borderColor="whiteAlpha.100"
          p={12} position="relative" overflow="hidden"
          boxShadow="0 25px 60px rgba(0,0,0,0.4)"
        >
          {/* Glow effect */}
          {isRecognizing && (
            <motion.div
              style={{
                position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 50% 50%, rgba(67,24,255,0.15), transparent)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5 }}
            />
          )}

          {/* Top accent */}
          <Box position="absolute" top={0} left={0} right={0} h="2px" bgGradient="linear(to-r, transparent, brand.400, #C850C0, transparent)" />

          {/* Header */}
          <Flex direction="column" align="center" mb={10}>
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Flex
                w="64px" h="64px" borderRadius="20px" align="center" justify="center" mb={6}
                bgGradient="linear(to-br, brand.400, #C850C0)"
                boxShadow="0 8px 24px rgba(67, 24, 255, 0.3)"
              >
                <Text fontSize="28px" fontWeight="bold" color="white">AI</Text>
              </Flex>
            </motion.div>

            <Heading fontSize="28px" fontWeight="700" color="white" mb={3}>
              Welcome Back
            </Heading>
            <Text fontSize="sm" color="#A3AED0">
              Select your account to continue
            </Text>
          </Flex>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Box mb={6}>
              <Text fontSize="xs" fontWeight="600" color="#A3AED0" mb={3} textTransform="uppercase" letterSpacing="0.1em">
                Choose Account
              </Text>
              <Select
                value={selectedEmail}
                onChange={(e) => setSelectedEmail(e.target.value)}
                placeholder="Select your account"
                bg="navy.700"
                border="1px solid"
                borderColor="whiteAlpha.200"
                borderRadius="14px"
                color="white"
                h="52px"
                fontSize="15px"
                _hover={{ borderColor: 'brand.400' }}
                _focus={{ borderColor: 'brand.400', boxShadow: '0 0 0 1px #4318FF' }}
                sx={{ option: { bg: '#1B254B', color: 'white' } }}
              >
                {ACCOUNTS.map((account) => {
                  const org = ORGANIZATIONS[account.orgId];
                  return (
                    <option key={account.email} value={account.email}>
                      {account.name} — {org.short}
                    </option>
                  );
                })}
              </Select>
            </Box>

            {/* Preview */}
            {selectedEmail && previewOrg && previewAccount && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <Flex
                  align="center" gap={4} p={4} mb={6}
                  bg="whiteAlpha.50" borderRadius="16px" border="1px solid" borderColor="whiteAlpha.100"
                >
                  <Flex
                    w="48px" h="48px" borderRadius="14px" align="center" justify="center" flexShrink={0}
                    bgGradient="linear(to-br, brand.400, #C850C0)"
                  >
                    <Text fontSize="18px" fontWeight="bold" color="white">
                      {previewOrg.logoLetter}
                    </Text>
                  </Flex>
                  <Box flex={1} minW={0}>
                    <Text fontSize="sm" fontWeight="600" color="white" noOfLines={1}>
                      {previewOrg.name}
                    </Text>
                    <Text fontSize="xs" color="#707EAE" noOfLines={1}>
                      {previewAccount.role}
                    </Text>
                  </Box>
                </Flex>
              </motion.div>
            )}

            <Button
              type="submit"
              w="100%" h="52px"
              bgGradient="linear(to-r, brand.400, #C850C0)"
              color="white" fontWeight="bold" fontSize="sm" letterSpacing="0.05em"
              borderRadius="14px"
              isDisabled={!selectedEmail}
              _hover={{ bgGradient: 'linear(to-r, brand.300, #D060D0)', transform: 'translateY(-1px)', boxShadow: '0 8px 24px rgba(67, 24, 255, 0.3)' }}
              _active={{ transform: 'translateY(0)' }}
              _disabled={{ opacity: 0.4, cursor: 'not-allowed', _hover: {} }}
              transition="all 0.3s"
              rightIcon={<Icon as={ArrowRight} boxSize={4} />}
            >
              Continue
            </Button>
          </form>

          <Box mt={8} pt={6} borderTop="1px solid" borderColor="whiteAlpha.100" textAlign="center">
            <Text fontSize="xs" color="#707EAE">
              Demo mode: Each account is connected to a unique organization
            </Text>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
}

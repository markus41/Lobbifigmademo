import { motion, AnimatePresence } from 'motion/react';
import { Box, Flex, Heading, Text, Input, IconButton } from '@chakra-ui/react';
import { X, Send, Bot } from 'lucide-react';
import { useState } from 'react';

interface AIBellhopProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIBellhop({ isOpen, onClose }: AIBellhopProps) {
  const [message, setMessage] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            style={{
              position: 'fixed', right: 0, top: 0, height: '100%',
              width: '100%', maxWidth: '420px', zIndex: 101,
              display: 'flex', flexDirection: 'column',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box h="100%" bg="navy.800" display="flex" flexDirection="column" boxShadow="dark-lg">
              {/* Header */}
              <Flex p={6} borderBottom="1px solid" borderColor="whiteAlpha.100" align="center" justify="space-between">
                <Flex align="center" gap={3}>
                  <Flex
                    w="40px" h="40px" borderRadius="12px" align="center" justify="center"
                    bgGradient="linear(to-br, brand.400, #C850C0)"
                  >
                    <Bot size={20} color="white" />
                  </Flex>
                  <Box>
                    <Heading fontSize="lg" fontWeight="700" color="white">AI Concierge</Heading>
                    <Text fontSize="xs" color="#707EAE">Powered by AI</Text>
                  </Box>
                </Flex>
                <IconButton
                  aria-label="Close"
                  icon={<X size={20} />}
                  variant="ghost" color="#A3AED0" size="sm"
                  borderRadius="12px"
                  onClick={onClose}
                  _hover={{ bg: 'whiteAlpha.100', color: 'white' }}
                />
              </Flex>

              {/* Messages */}
              <Box flex={1} overflowY="auto" p={6}>
                <Flex direction="column" gap={4}>
                  <Box bg="navy.700" borderRadius="16px" borderTopLeftRadius="4px" p={5}>
                    <Text fontSize="sm" color="#A3AED0" lineHeight="1.7">
                      Hello! I'm your AI Concierge. I can help you with member management,
                      event planning, data analysis, and more. How can I assist you today?
                    </Text>
                  </Box>

                  <Flex gap={2} flexWrap="wrap">
                    {['Show member stats', 'Upcoming events', 'Generate report'].map((suggestion) => (
                      <Box
                        key={suggestion}
                        px={4} py={2} borderRadius="full" fontSize="xs" fontWeight="500"
                        bg="whiteAlpha.50" color="#A3AED0" cursor="pointer"
                        border="1px solid" borderColor="whiteAlpha.100"
                        _hover={{ bg: 'whiteAlpha.100', color: 'white', borderColor: 'brand.400' }}
                        transition="all 0.2s"
                      >
                        {suggestion}
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              </Box>

              {/* Input */}
              <Box p={4} borderTop="1px solid" borderColor="whiteAlpha.100">
                <Flex gap={2}>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    bg="navy.700" border="1px solid" borderColor="whiteAlpha.200"
                    borderRadius="14px" h="48px" fontSize="sm" color="white"
                    _hover={{ borderColor: 'whiteAlpha.300' }}
                    _focus={{ borderColor: 'brand.400', boxShadow: 'none' }}
                    _placeholder={{ color: '#707EAE' }}
                  />
                  <IconButton
                    aria-label="Send"
                    icon={<Send size={18} />}
                    h="48px" w="48px" minW="48px"
                    borderRadius="14px"
                    bgGradient="linear(to-r, brand.400, #C850C0)"
                    color="white"
                    _hover={{ bgGradient: 'linear(to-r, brand.300, #D060D0)' }}
                  />
                </Flex>
              </Box>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

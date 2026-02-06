import { motion } from 'motion/react';
import { Box, Flex, Text, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Menu, Bell, Search, Bot } from 'lucide-react';
import type { Account, Organization } from '../data/themes';

interface TopNavProps {
  onMenuClick: () => void;
  onBellhopClick: () => void;
  organization: Organization;
  account: Account;
}

export function TopNav({ onMenuClick, onBellhopClick, organization, account }: TopNavProps) {
  return (
    <motion.div
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <Flex
        h="72px" align="center" justify="space-between" px={6}
        bg="navy.800" borderBottom="1px solid" borderColor="whiteAlpha.100"
      >
        {/* Left */}
        <Flex align="center" gap={4} flex={1}>
          <Flex
            as="button" onClick={onMenuClick}
            w="40px" h="40px" align="center" justify="center" borderRadius="12px"
            _hover={{ bg: 'whiteAlpha.100' }} transition="all 0.2s" cursor="pointer"
          >
            <Menu size={20} color="#A3AED0" />
          </Flex>

          <InputGroup maxW="400px">
            <InputLeftElement h="44px" pointerEvents="none">
              <Search size={16} color="#707EAE" />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              bg="navy.700" border="1px solid" borderColor="whiteAlpha.100"
              borderRadius="14px" h="44px" fontSize="sm" color="white"
              _hover={{ borderColor: 'whiteAlpha.200' }}
              _focus={{ borderColor: 'brand.400', boxShadow: 'none' }}
              _placeholder={{ color: '#707EAE' }}
            />
          </InputGroup>
        </Flex>

        {/* Right */}
        <Flex align="center" gap={3}>
          {/* AI Concierge Button */}
          <Flex
            as="button" onClick={onBellhopClick}
            align="center" gap={2} px={4} py={2} borderRadius="12px"
            bgGradient="linear(to-r, brand.400, #C850C0)"
            color="white" fontSize="sm" fontWeight="600"
            cursor="pointer" transition="all 0.3s"
            _hover={{ transform: 'translateY(-1px)', boxShadow: '0 4px 16px rgba(67, 24, 255, 0.3)' }}
          >
            <Bot size={16} />
            <Text display={{ base: 'none', md: 'block' }}>AI Concierge</Text>
          </Flex>

          {/* Notifications */}
          <Flex
            as="button" position="relative"
            w="40px" h="40px" align="center" justify="center" borderRadius="12px"
            _hover={{ bg: 'whiteAlpha.100' }} transition="all 0.2s" cursor="pointer"
          >
            <Bell size={20} color="#A3AED0" />
            <Box
              position="absolute" top="8px" right="8px"
              w="8px" h="8px" borderRadius="full"
              bgGradient="linear(to-r, brand.400, #C850C0)"
            />
          </Flex>

          {/* Avatar */}
          <Flex
            w="40px" h="40px" borderRadius="full" align="center" justify="center"
            bgGradient="linear(to-br, brand.400, #C850C0)" cursor="pointer"
          >
            <Text fontSize="xs" fontWeight="bold" color="white">
              {account?.initials || 'U'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  );
}

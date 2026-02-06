import { motion } from 'motion/react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { LayoutDashboard, Users, CalendarDays, Settings } from 'lucide-react';
import type { Account, Organization } from '../data/themes';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  organization: Organization;
  account: Account;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, isCollapsed, organization, account }: SidebarProps) {
  return (
    <motion.div
      style={{
        position: 'fixed', left: 0, top: 0, height: '100%',
        width: isCollapsed ? '80px' : '280px',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s',
        zIndex: 70,
      }}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box h="100%" bg="navy.800" borderRight="1px solid" borderColor="whiteAlpha.100">
        {/* Logo */}
        <Flex p={6} align="center" gap={3} borderBottom="1px solid" borderColor="whiteAlpha.100">
          <Flex
            w="42px" h="42px" borderRadius="14px" align="center" justify="center" flexShrink={0}
            bgGradient="linear(to-br, brand.400, #C850C0)"
          >
            <Text fontSize="md" fontWeight="bold" color="white">AI</Text>
          </Flex>
          {!isCollapsed && (
            <Box>
              <Text fontSize="md" fontWeight="700" color="white" lineHeight="1.2">The Lobbi</Text>
              <Text fontSize="xs" color="#707EAE">{organization.short}</Text>
            </Box>
          )}
        </Flex>

        {/* Navigation */}
        <Box flex={1} p={4}>
          <Flex direction="column" gap={1}>
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Flex
                  key={item.id}
                  as="button"
                  onClick={() => onNavigate(item.id)}
                  align="center"
                  gap={3}
                  px={4}
                  py={3}
                  borderRadius="14px"
                  cursor="pointer"
                  transition="all 0.2s"
                  bg={isActive ? 'whiteAlpha.100' : 'transparent'}
                  _hover={{ bg: isActive ? 'whiteAlpha.100' : 'whiteAlpha.50' }}
                  w="100%"
                >
                  <Flex
                    w="36px" h="36px" borderRadius="12px" align="center" justify="center"
                    bg={isActive ? 'brand.400' : 'whiteAlpha.50'}
                    transition="all 0.2s"
                  >
                    <IconComp size={18} color={isActive ? 'white' : '#A3AED0'} />
                  </Flex>
                  {!isCollapsed && (
                    <Text fontSize="sm" fontWeight={isActive ? '600' : '400'} color={isActive ? 'white' : '#A3AED0'}>
                      {item.label}
                    </Text>
                  )}
                </Flex>
              );
            })}
          </Flex>
        </Box>

        {/* User Profile */}
        <Box p={4} borderTop="1px solid" borderColor="whiteAlpha.100">
          <Flex align="center" gap={3}>
            <Flex
              w="40px" h="40px" borderRadius="full" align="center" justify="center" flexShrink={0}
              bgGradient="linear(to-br, brand.400, #C850C0)"
            >
              <Text fontSize="xs" fontWeight="bold" color="white">
                {account?.initials || 'U'}
              </Text>
            </Flex>
            {!isCollapsed && (
              <Box flex={1} minW={0}>
                <Text fontSize="sm" fontWeight="600" color="white" noOfLines={1}>
                  {account?.name || 'User'}
                </Text>
                <Text fontSize="xs" color="#707EAE" noOfLines={1}>
                  {account?.role || 'Member'}
                </Text>
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    </motion.div>
  );
}

import { motion } from 'motion/react';
import { Box, Flex, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react';
import { Users, TrendingUp, Calendar, Bot } from 'lucide-react';
import type { Account, Organization } from '../data/themes';

interface DashboardProps {
  organization: Organization | null;
  account: Account | null;
}

const stats = [
  { label: 'Total Members', value: '2,847', change: 12.5, icon: Users, color: '#7551FF' },
  { label: 'Active Today', value: '482', change: 8.2, icon: TrendingUp, color: '#01B574' },
  { label: 'Events This Month', value: '24', change: -3.1, icon: Calendar, color: '#FFB547' },
  { label: 'AI Interactions', value: '1,293', change: 45.8, icon: Bot, color: '#C850C0' },
];

const recentActivity = [
  { name: 'Sarah Chen', action: 'Updated member profile', time: '2 min ago', avatar: 'SC' },
  { name: 'David Martinez', action: 'Created new event', time: '15 min ago', avatar: 'DM' },
  { name: 'Emily Rodriguez', action: 'Sent newsletter', time: '1 hr ago', avatar: 'ER' },
  { name: 'Michael Johnson', action: 'Added 3 new members', time: '2 hrs ago', avatar: 'MJ' },
  { name: 'Kathy Watts', action: 'Generated monthly report', time: '3 hrs ago', avatar: 'KW' },
];

export function Dashboard({ organization, account }: DashboardProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <Box p={8} maxW="7xl" mx="auto">
        {/* Header */}
        <Box mb={8}>
          <Text fontSize="sm" color="#A3AED0" mb={1}>
            Welcome back, {account?.first || 'User'}
          </Text>
          <Heading fontSize="3xl" fontWeight="700" color="white">
            Dashboard
          </Heading>
        </Box>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
          {stats.map((stat) => {
            const IconComp = stat.icon;
            return (
              <Box
                key={stat.label}
                bg="navy.800" borderRadius="20px" p={6}
                border="1px solid" borderColor="whiteAlpha.100"
                transition="all 0.3s"
                _hover={{ borderColor: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
              >
                <Flex justify="space-between" align="flex-start" mb={4}>
                  <Stat>
                    <StatLabel fontSize="xs" color="#A3AED0" fontWeight="500" textTransform="uppercase" letterSpacing="0.05em">
                      {stat.label}
                    </StatLabel>
                    <StatNumber fontSize="2xl" fontWeight="700" color="white" mt={1}>
                      {stat.value}
                    </StatNumber>
                    <StatHelpText fontSize="xs" mb={0} mt={1}>
                      <StatArrow type={stat.change > 0 ? 'increase' : 'decrease'} />
                      <Text as="span" color={stat.change > 0 ? '#01B574' : '#EE5D50'}>
                        {Math.abs(stat.change)}%
                      </Text>
                      <Text as="span" color="#707EAE"> vs last month</Text>
                    </StatHelpText>
                  </Stat>
                  <Flex
                    w="48px" h="48px" borderRadius="14px" align="center" justify="center"
                    bg={`${stat.color}15`}
                  >
                    <IconComp size={22} color={stat.color} />
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>

        {/* Content Grid */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {/* AI Assistant Card */}
          <Box
            bg="navy.800" borderRadius="20px" p={6}
            border="1px solid" borderColor="whiteAlpha.100"
            position="relative" overflow="hidden"
          >
            {/* Gradient accent */}
            <Box
              position="absolute" top={0} left={0} right={0} h="2px"
              bgGradient="linear(to-r, brand.400, #C850C0)"
            />
            <Flex align="center" gap={3} mb={5}>
              <Flex
                w="40px" h="40px" borderRadius="12px" align="center" justify="center"
                bgGradient="linear(to-br, brand.400, #C850C0)"
              >
                <Bot size={20} color="white" />
              </Flex>
              <Box>
                <Text fontSize="md" fontWeight="700" color="white">AI Assistant</Text>
                <Text fontSize="xs" color="#707EAE">Powered by advanced AI</Text>
              </Box>
            </Flex>

            <Box bg="navy.700" borderRadius="16px" p={5} mb={4}>
              <Text fontSize="sm" color="#A3AED0" lineHeight="1.7">
                Good morning, {account?.first || 'there'}! Here's your daily summary:
                You have <Text as="span" color="white" fontWeight="600">3 new member applications</Text> pending review,
                and <Text as="span" color="white" fontWeight="600">2 events</Text> scheduled this week.
                Member engagement is up <Text as="span" color="#01B574" fontWeight="600">12.5%</Text> from last month.
              </Text>
            </Box>

            <Flex gap={2} flexWrap="wrap">
              {['Review applications', 'View events', 'Generate report'].map((action) => (
                <Box
                  key={action}
                  px={4} py={2} borderRadius="full" fontSize="xs" fontWeight="600"
                  bg="whiteAlpha.50" color="#A3AED0" cursor="pointer"
                  border="1px solid" borderColor="whiteAlpha.100"
                  _hover={{ bg: 'whiteAlpha.100', color: 'white', borderColor: 'brand.400' }}
                  transition="all 0.2s"
                >
                  {action}
                </Box>
              ))}
            </Flex>
          </Box>

          {/* Recent Activity */}
          <Box
            bg="navy.800" borderRadius="20px" p={6}
            border="1px solid" borderColor="whiteAlpha.100"
          >
            <Text fontSize="md" fontWeight="700" color="white" mb={5}>
              Recent Activity
            </Text>

            <Flex direction="column" gap={4}>
              {recentActivity.map((activity, i) => (
                <Flex key={i} align="center" gap={3}>
                  <Flex
                    w="40px" h="40px" borderRadius="full" align="center" justify="center" flexShrink={0}
                    bgGradient="linear(to-br, brand.400, #C850C0)"
                  >
                    <Text fontSize="xs" fontWeight="bold" color="white">{activity.avatar}</Text>
                  </Flex>
                  <Box flex={1} minW={0}>
                    <Text fontSize="sm" fontWeight="600" color="white" noOfLines={1}>
                      {activity.name}
                    </Text>
                    <Text fontSize="xs" color="#707EAE" noOfLines={1}>
                      {activity.action}
                    </Text>
                  </Box>
                  <Text fontSize="xs" color="#707EAE" flexShrink={0}>
                    {activity.time}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>
    </motion.div>
  );
}

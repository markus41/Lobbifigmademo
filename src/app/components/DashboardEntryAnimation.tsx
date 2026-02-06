import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import type { Account, Organization } from '../data/themes';

interface DashboardEntryAnimationProps {
  onCompleted: () => void;
  organization: Organization;
  account: Account;
}

export function DashboardEntryAnimation({ onCompleted, organization, account }: DashboardEntryAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(onCompleted, 2400);
    return () => clearTimeout(timer);
  }, [onCompleted]);

  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      <Box position="absolute" inset={0} bg="navy.900" />
      <Flex direction="column" align="center" position="relative" zIndex={1}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Text fontSize="sm" textTransform="uppercase" letterSpacing="0.3em" color="#707EAE" fontWeight="500" mb={4}>
            Welcome Back
          </Text>
          <Heading fontSize="4xl" fontWeight="700" color="white" mb={3} textAlign="center">
            {account.first} {account.last}
          </Heading>
          <Text fontSize="sm" color="#A3AED0" textAlign="center">{organization.name}</Text>
        </motion.div>
      </Flex>
    </motion.div>
  );
}

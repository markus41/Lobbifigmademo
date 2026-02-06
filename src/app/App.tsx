import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Box } from '@chakra-ui/react';
import { LandingPage } from './components/LandingPage';
import { EmailSelection } from './components/EmailSelection';
import { OrgLogin } from './components/OrgLogin';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { DashboardEntryAnimation } from './components/DashboardEntryAnimation';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { AIBellhop } from './components/AIBellhop';
import { ACCOUNTS, ORGANIZATIONS, type Account, type Organization } from './data/themes';

type Stage = 'landing' | 'email' | 'orgLogin' | 'welcome' | 'dashboardEntry' | 'dashboard';

export default function App() {
  const [stage, setStage] = useState<Stage>('landing');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isBellhopOpen, setIsBellhopOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (selectedOrg) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', selectedOrg.theme.primary);
      root.style.setProperty('--theme-primary-rgb', selectedOrg.theme.primaryRgb);
    }
  }, [selectedOrg]);

  const handleLoginClick = () => setStage('email');

  const handleEmailSelected = (email: string) => {
    const account = ACCOUNTS.find(a => a.email === email);
    if (!account) return;
    const org = ORGANIZATIONS[account.orgId];
    setSelectedEmail(email);
    setSelectedAccount(account);
    setSelectedOrg(org);
    setStage('orgLogin');
  };

  const handleOrgLogin = () => setStage('welcome');
  const handleWelcomeComplete = () => setStage('dashboardEntry');
  const handleDashboardEntryComplete = () => {
    setShowDashboard(true);
    setStage('dashboard');
  };

  const renderPage = () => {
    return <Dashboard organization={selectedOrg} account={selectedAccount} />;
  };

  return (
    <Box position="relative" w="100%" h="100vh" overflow="hidden" bg="navy.900">
      <AnimatePresence>
        {stage === 'landing' && <LandingPage onLoginClick={handleLoginClick} />}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'email' && <EmailSelection onEmailSelected={handleEmailSelected} />}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'orgLogin' && selectedAccount && selectedOrg && (
          <OrgLogin account={selectedAccount} organization={selectedOrg} onLogin={handleOrgLogin} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'welcome' && selectedAccount && selectedOrg && (
          <WelcomeScreen onComplete={handleWelcomeComplete} organization={selectedOrg} account={selectedAccount} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'dashboardEntry' && selectedAccount && selectedOrg && (
          <DashboardEntryAnimation onCompleted={handleDashboardEntryComplete} organization={selectedOrg} account={selectedAccount} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'dashboard' && showDashboard && selectedAccount && selectedOrg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex' }}
          >
            <Sidebar
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              organization={selectedOrg}
              account={selectedAccount}
            />
            <Box
              flex="1" display="flex" flexDirection="column" bg="navy.900"
              ml={isSidebarCollapsed ? '80px' : '280px'}
              transition="margin-left 0.3s"
            >
              <TopNav
                onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                onBellhopClick={() => setIsBellhopOpen(true)}
                organization={selectedOrg}
                account={selectedAccount}
              />
              <Box flex="1" overflowY="auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderPage()}
                  </motion.div>
                </AnimatePresence>
              </Box>
            </Box>
            <AIBellhop isOpen={isBellhopOpen} onClose={() => setIsBellhopOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

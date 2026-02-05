import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { EmailSelection } from './components/EmailSelection';
import { OrgLogin } from './components/OrgLogin';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { DashboardEntryAnimation } from './components/DashboardEntryAnimation';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { AIBellhop } from './components/AIBellhop';
import { CinematicBackground } from './components/CinematicBackground';
import { GeometricOctagon } from './components/GeometricOctagon';
import { ACCOUNTS, ORGANIZATIONS, type Account, type Organization } from './data/themes';

type Stage = 'logo' | 'landing' | 'email' | 'orgLogin' | 'welcome' | 'dashboardEntry' | 'dashboard';

export default function App() {
  const [stage, setStage] = useState<Stage>('landing');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isBellhopOpen, setIsBellhopOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Auto-progress from logo to landing
  useEffect(() => {
    if (stage === 'logo') {
      const timer = setTimeout(() => setStage('landing'), 5500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // Apply theme when organization is selected
  useEffect(() => {
    if (selectedOrg) {
      const root = document.documentElement;
      root.style.setProperty('--theme-primary', selectedOrg.theme.primary);
      root.style.setProperty('--theme-primary-light', selectedOrg.theme.primaryLight);
      root.style.setProperty('--theme-primary-pale', selectedOrg.theme.primaryPale);
      root.style.setProperty('--theme-primary-dark', selectedOrg.theme.primaryDark);
      root.style.setProperty('--theme-primary-rgb', selectedOrg.theme.primaryRgb);
    }
  }, [selectedOrg]);

  const handleLoginClick = () => {
    setStage('email');
  };

  const handleEmailSelected = (email: string) => {
    const account = ACCOUNTS.find(a => a.email === email);
    if (!account) return;

    const org = ORGANIZATIONS[account.orgId];
    setSelectedEmail(email);
    setSelectedAccount(account);
    setSelectedOrg(org);
    setStage('orgLogin');
  };

  const handleOrgLogin = () => {
    setStage('welcome');
  };

  const handleWelcomeComplete = () => {
    setStage('dashboardEntry');
  };

  const handleDashboardEntryComplete = () => {
    setShowDashboard(true);
    setStage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  const currentRgb = selectedOrg?.theme.primaryRgb || '212,175,55';

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF6E9]">
      {/* Cinematic Background - Only for non-dashboard stages */}
      {stage !== 'dashboard' && (
        <CinematicBackground primaryRgb={currentRgb} stage={stage} />
      )}

      {/* Geometric Octagon Animation - Landing Page */}
      {stage === 'landing' && <GeometricOctagon />}

      {/* STAGE 2: LANDING PAGE */}
      <AnimatePresence>
        {stage === 'landing' && (
          <LandingPage onLoginClick={handleLoginClick} />
        )}
      </AnimatePresence>

      {/* STAGE 3: EMAIL SELECTION */}
      <AnimatePresence>
        {stage === 'email' && (
          <EmailSelection onEmailSelected={handleEmailSelected} />
        )}
      </AnimatePresence>

      {/* STAGE 4: ORG-SPECIFIC LOGIN */}
      <AnimatePresence>
        {stage === 'orgLogin' && selectedAccount && selectedOrg && (
          <OrgLogin 
            account={selectedAccount}
            organization={selectedOrg}
            onLogin={handleOrgLogin}
          />
        )}
      </AnimatePresence>

      {/* STAGE 5: WELCOME SCREEN */}
      <AnimatePresence>
        {stage === 'welcome' && selectedAccount && selectedOrg && (
          <WelcomeScreen 
            onComplete={handleWelcomeComplete}
            organization={selectedOrg}
            account={selectedAccount}
          />
        )}
      </AnimatePresence>

      {/* STAGE 6: DASHBOARD ENTRY ANIMATION */}
      <AnimatePresence>
        {stage === 'dashboardEntry' && selectedAccount && selectedOrg && (
          <DashboardEntryAnimation 
            onCompleted={handleDashboardEntryComplete}
            organization={selectedOrg}
            account={selectedAccount}
          />
        )}
      </AnimatePresence>

      {/* STAGE 7: DASHBOARD */}
      <AnimatePresence>
        {stage === 'dashboard' && showDashboard && selectedAccount && selectedOrg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-60 flex bg-gray-50"
          >
            <Sidebar 
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              organization={selectedOrg}
              account={selectedAccount}
            />
            
            <div 
              className={`flex-1 flex flex-col transition-all duration-300 ${
                isSidebarCollapsed ? 'ml-[72px]' : 'ml-[240px]'
              }`}
            >
              <TopNav 
                onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                onBellhopClick={() => setIsBellhopOpen(true)}
                organization={selectedOrg}
                account={selectedAccount}
              />
              
              <main className="flex-1 overflow-y-auto bg-gray-50">
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
              </main>
            </div>

            <AIBellhop 
              isOpen={isBellhopOpen}
              onClose={() => setIsBellhopOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
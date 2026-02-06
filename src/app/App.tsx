import { useState, useEffect, useCallback } from 'react';
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
import { ACCOUNTS, ORGANIZATIONS, applyTheme, type Account, type Organization } from './data/themes';

// Page components
import { RegistryPage } from './components/pages/RegistryPage';
import { BusinessCenterPage } from './components/pages/BusinessCenterPage';
import { EventsPavilionPage } from './components/pages/EventsPavilionPage';
import { VaultPage } from './components/pages/VaultPage';
import { SettingsPage } from './components/pages/SettingsPage';

// Demo banner
import { DemoBanner, DemoBannerMinimized } from './components/DemoBanner';

// Member Portal
import { MemberPortal } from './components/MemberPortal';

type Stage = 'logo' | 'landing' | 'email' | 'orgLogin' | 'welcome' | 'dashboardEntry' | 'dashboard' | 'memberPortal';

export default function App() {
  const [stage, setStage] = useState<Stage>('landing');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isBellhopOpen, setIsBellhopOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Demo banner state
  const [showDemoBanner, setShowDemoBanner] = useState(true);

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
      applyTheme(selectedOrg);
    }
  }, [selectedOrg]);

  // Handle organization change from demo banner
  const handleOrganizationChange = useCallback((org: Organization) => {
    // Find an account that belongs to this org, or keep the current account
    const accountForOrg = ACCOUNTS.find(a => a.orgId === org.id);
    if (accountForOrg) {
      setSelectedAccount(accountForOrg);
      setSelectedEmail(accountForOrg.email);
    }
    setSelectedOrg(org);
    applyTheme(org);
  }, []);

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

  const handleMemberPortalClick = () => {
    setStage('memberPortal');
  };

  const handleSwitchToAdmin = () => {
    setStage('dashboard');
  };

  const renderPage = () => {
    if (!selectedOrg || !selectedAccount) return null;

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard organization={selectedOrg} account={selectedAccount} />;
      case 'registry':
        return <RegistryPage organization={selectedOrg} account={selectedAccount} />;
      case 'business':
        return <BusinessCenterPage organization={selectedOrg} account={selectedAccount} />;
      case 'events':
        return <EventsPavilionPage organization={selectedOrg} account={selectedAccount} />;
      case 'vault':
        return <VaultPage organization={selectedOrg} account={selectedAccount} />;
      case 'settings':
        return <SettingsPage organization={selectedOrg} account={selectedAccount} />;
      default:
        return <Dashboard organization={selectedOrg} account={selectedAccount} />;
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
            className="fixed inset-0 z-60 flex flex-col bg-gray-50"
          >
            {/* Demo Banner - Sits above everything */}
            <DemoBanner
              isVisible={showDemoBanner}
              onVisibilityChange={setShowDemoBanner}
              onMemberPortalClick={handleMemberPortalClick}
              onOrganizationChange={handleOrganizationChange}
              currentOrganization={selectedOrg}
            />

            {/* Minimized demo button when banner is hidden */}
            {!showDemoBanner && (
              <DemoBannerMinimized onRestore={() => setShowDemoBanner(true)} />
            )}

            {/* Main Layout */}
            <div className="flex flex-1 min-h-0">
              <Sidebar
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                organization={selectedOrg}
                account={selectedAccount}
              />

              <div className="flex-1 flex flex-col min-w-0">
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
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 8: MEMBER PORTAL (Mobile-First View) */}
      <AnimatePresence>
        {stage === 'memberPortal' && selectedAccount && selectedOrg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-70"
          >
            <MemberPortal
              organization={selectedOrg}
              account={selectedAccount}
              onSwitchToAdmin={handleSwitchToAdmin}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

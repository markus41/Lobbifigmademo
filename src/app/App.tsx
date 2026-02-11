import { useState, useEffect, useRef } from 'react';
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
import { CinematicIntro } from './components/CinematicIntro';
import { StageCinematicTransition } from './components/StageCinematicTransition';
import { ACCOUNTS, ORGANIZATIONS, applyTheme, type Account, type Organization } from './data/themes';

// Page components
import { RegistryPage } from './components/pages/RegistryPage';
import { BusinessCenterPage } from './components/pages/BusinessCenterPage';
import { EventsPavilionPage } from './components/pages/EventsPavilionPage';
import { VaultPage } from './components/pages/VaultPage';
import { SettingsPage } from './components/pages/SettingsPage';

// Chakra v3 Platform Demo Banner with phase routing
import { PlatformDemoBanner } from '../components/demo';

// Member Portal
import { MemberPortal } from './components/MemberPortal';

type Stage = 'logo' | 'landing' | 'email' | 'orgLogin' | 'welcome' | 'dashboardEntry' | 'dashboard' | 'memberPortal';

const STAGE_TRANSITION_LABELS: Record<Stage, string> = {
  logo: 'Initializing cinematic sequence',
  landing: 'Opening the experience',
  email: 'Preparing account recognition',
  orgLogin: 'Securing your entry',
  welcome: 'Welcoming you in',
  dashboardEntry: 'Launching portal transition',
  dashboard: 'Entering your command deck',
  memberPortal: 'Switching to member view',
};

export default function App() {
  const [stage, setStage] = useState<Stage>(() => {
    if (typeof window === 'undefined') return 'landing';
    return sessionStorage.getItem('lobbi_intro_seen') === '1' ? 'landing' : 'logo';
  });
  const [_selectedEmail, setSelectedEmail] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isBellhopOpen, setIsBellhopOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionCue, setTransitionCue] = useState<{ id: number; to: Stage } | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Guarded stage transition to prevent overlapping animations
  const safeSetStage = (nextStage: Stage) => {
    if (isTransitioning || stage === nextStage) return;

    const shouldCue = !(stage === 'logo' && nextStage === 'landing');
    setIsTransitioning(true);
    if (shouldCue) {
      setTransitionCue({ id: Date.now(), to: nextStage });
    }
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    setStage(nextStage);
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setTransitionCue(null);
    }, 620);
  };

  // Cleanup transition timeout
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  // Apply theme when organization is selected
  useEffect(() => {
    if (selectedOrg) {
      applyTheme(selectedOrg);
    }
  }, [selectedOrg]);

  // Bug #2 fix: Set document title based on selected org (prevents "undefined | The Lobbi")
  useEffect(() => {
    if (selectedOrg) {
      document.title = `${selectedOrg.short || selectedOrg.name} | The Lobbi`;
    } else {
      document.title = 'The Lobbi - Premium Member Management Platform';
    }
  }, [selectedOrg]);

  // Bug #6 fix: Hash-based routing for browser navigation
  useEffect(() => {
    const hashMap: Record<Stage, string> = {
      logo: '#intro', landing: '#landing', email: '#login',
      orgLogin: '#login', welcome: '#welcome', dashboardEntry: '#dashboard',
      dashboard: '#dashboard', memberPortal: '#member-portal',
    };
    window.location.hash = hashMap[stage] || '#landing';
  }, [stage]);

  // Bug #6 fix: Persist session to localStorage
  useEffect(() => {
    if (selectedAccount && selectedOrg && (stage === 'dashboard' || stage === 'memberPortal')) {
      localStorage.setItem('lobbi_session', JSON.stringify({
        email: selectedAccount.email, orgId: selectedOrg.id, stage, currentPage,
      }));
    }
  }, [selectedAccount, selectedOrg, stage, currentPage]);

  // Bug #6 fix: Restore session on mount
  useEffect(() => {
    const saved = localStorage.getItem('lobbi_session');
    if (saved) {
      try {
        const session = JSON.parse(saved);
        const account = ACCOUNTS.find((a: Account) => a.email === session.email);
        if (account) {
          const org = ORGANIZATIONS[account.orgId];
          if (org) {
            setSelectedEmail(session.email);
            setSelectedAccount(account);
            setSelectedOrg(org);
            setCurrentPage(session.currentPage || 'dashboard');
            setShowDashboard(true);
            setStage(session.stage === 'memberPortal' ? 'memberPortal' : 'dashboard');
          }
        }
      } catch { localStorage.removeItem('lobbi_session'); }
    }
  }, []);

  const handleLoginClick = () => {
    safeSetStage('email');
  };

  const handleEmailSelected = (email: string) => {
    if (isTransitioning) return;
    const account = ACCOUNTS.find(a => a.email === email);
    if (!account) return;

    const org = ORGANIZATIONS[account.orgId];
    setSelectedEmail(email);
    setSelectedAccount(account);
    setSelectedOrg(org);
    safeSetStage('orgLogin');
  };

  const handleOrgLogin = () => {
    safeSetStage('welcome');
  };

  const handleWelcomeComplete = () => {
    safeSetStage('dashboardEntry');
  };

  const handleDashboardEntryComplete = () => {
    setShowDashboard(true);
    safeSetStage('dashboard');
  };

  const handleSwitchToAdmin = () => {
    safeSetStage('dashboard');
  };

  const renderPage = () => {
    if (!selectedOrg || !selectedAccount) return null;

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard organization={selectedOrg} account={selectedAccount} onNavigate={setCurrentPage} />;
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
        return <Dashboard organization={selectedOrg} account={selectedAccount} onNavigate={setCurrentPage} />;
    }
  };

  const currentRgb = selectedOrg?.theme.primaryRgb || '212,175,55';

  return (
    <PlatformDemoBanner defaultPhase="all" defaultRole="org-admin">
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#FCF8EF] via-[#F6F0E2] to-[#ECE3D3]">
      {/* Cinematic Background - Only for non-dashboard stages */}
      {stage !== 'dashboard' && (
        <CinematicBackground primaryRgb={currentRgb} stage={stage} />
      )}

      {/* Geometric Octagon Animation - Pre-dashboard stages */}
      {(stage === 'landing' || stage === 'email' || stage === 'orgLogin') && (
        <GeometricOctagon primaryColor={selectedOrg?.theme.primary || '#D4AF37'} />
      )}

      {/* Pre-dashboard stages - single AnimatePresence with mode="wait" prevents overlap */}
      <AnimatePresence mode="wait">
        {stage === 'logo' && (
          <CinematicIntro
            key="logo"
            onComplete={() => safeSetStage('landing')}
            primaryRgb={currentRgb}
          />
        )}
        {stage === 'landing' && (
          <LandingPage key="landing" onLoginClick={handleLoginClick} />
        )}
        {stage === 'email' && (
          <EmailSelection key="email" onEmailSelected={handleEmailSelected} />
        )}
        {stage === 'orgLogin' && selectedAccount && selectedOrg && (
          <OrgLogin
            key="orgLogin"
            account={selectedAccount}
            organization={selectedOrg}
            onLogin={handleOrgLogin}
          />
        )}
        {stage === 'welcome' && selectedAccount && selectedOrg && (
          <WelcomeScreen
            key="welcome"
            onComplete={handleWelcomeComplete}
            organization={selectedOrg}
            account={selectedAccount}
          />
        )}
        {stage === 'dashboardEntry' && selectedAccount && selectedOrg && (
          <DashboardEntryAnimation
            key="dashboardEntry"
            onCompleted={handleDashboardEntryComplete}
            organization={selectedOrg}
            account={selectedAccount}
          />
        )}
      </AnimatePresence>

      {/* Cinematic transition bridge between stages */}
      <AnimatePresence mode="wait">
        {transitionCue && (
          <StageCinematicTransition
            transitionKey={`${transitionCue.id}-${transitionCue.to}`}
            label={STAGE_TRANSITION_LABELS[transitionCue.to]}
            primaryRgb={currentRgb}
          />
        )}
      </AnimatePresence>

      {/* STAGE 7: DASHBOARD */}
      <AnimatePresence mode="wait">
        {stage === 'dashboard' && showDashboard && selectedAccount && selectedOrg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-60 flex flex-col bg-[#F8F3E8]"
          >
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
                  onNavigate={setCurrentPage}
                />

                <main className="flex-1 overflow-y-auto bg-transparent">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0, y: 16, scale: 0.98, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, scale: 0.99, filter: 'blur(3px)' }}
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
      <AnimatePresence mode="wait">
        {stage === 'memberPortal' && selectedAccount && selectedOrg && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
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
    </PlatformDemoBanner>
  );
}

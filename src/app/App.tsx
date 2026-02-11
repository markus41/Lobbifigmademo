import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import { CinematicIntro } from './components/CinematicIntro';
import { StageCinematicTransition } from './components/StageCinematicTransition';
import { ACCOUNTS, ORGANIZATIONS, applyTheme, type Account, type Organization } from './data/themes';
import { useOrgTheme } from '../theme/LobbiMantineProvider';
import { cn } from '@/lib/utils';

// Command Palette & Mobile Shell
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { MobileDrawer } from '@/components/lobbi/layout/MobileDrawer';
import { CommandPalette } from '@/components/lobbi/navigation/CommandPalette';
import { DashboardIcon, RegistryIcon, EventsIcon, SettingsIcon } from './components/icons/LobbiIcons';

// Page components
import { RegistryPage } from './components/pages/RegistryPage';
import { BusinessCenterPage } from './components/pages/BusinessCenterPage';
import { EventsPavilionPage } from './components/pages/EventsPavilionPage';
import { VaultPage } from './components/pages/VaultPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { InnovationLabPage } from './components/pages/InnovationLabPage';

// Chakra v3 Platform Demo Banner with phase routing
import { PlatformDemoBanner, type SprintPhase } from '../components/demo';
import {
  canAccessPage,
  getFirstAccessiblePage,
  isAppPage,
  isValidSprintPhase,
} from './navigation/accessPolicy';

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

function mapAccountRoleToDemoRole(role?: string): string {
  const normalizedRole = role?.toLowerCase() ?? '';
  if (normalizedRole.includes('national')) return 'national-admin';
  if (normalizedRole.includes('regional')) return 'regional-admin';
  if (normalizedRole.includes('owner')) return 'org-owner';
  if (normalizedRole.includes('admin')) return 'org-admin';
  if (normalizedRole.includes('manager')) return 'org-manager';
  if (normalizedRole.includes('premium')) return 'premium-member';
  return 'standard-member';
}

function readStoredDemoPhase(): SprintPhase {
  if (typeof window === 'undefined') return 'all';
  const storedPhase = localStorage.getItem('lobbi_demo_phase');
  return storedPhase && isValidSprintPhase(storedPhase) ? storedPhase : 'all';
}

function readStoredDemoRole(): string {
  if (typeof window === 'undefined') return 'org-admin';
  return localStorage.getItem('lobbi_demo_role') || 'org-admin';
}

export default function App() {
  const [stage, setStage] = useState<Stage>(() => {
    if (typeof window === 'undefined') return 'landing';
    return sessionStorage.getItem('lobbi_intro_seen') === '1' ? 'landing' : 'logo';
  });
  const [_selectedEmail, setSelectedEmail] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  // Sync demo banner org dropdown → app state
  const { currentOrg: bannerOrg, setOrg: setBannerOrg } = useOrgTheme();
  const bannerOrgRef = useRef(bannerOrg);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [demoPhase, setDemoPhase] = useState<SprintPhase>(() => readStoredDemoPhase());
  const [demoRole, setDemoRole] = useState(() => readStoredDemoRole());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isBellhopOpen, setIsBellhopOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  const [showDashboard, setShowDashboard] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionCue, setTransitionCue] = useState<{ id: number; to: Stage } | null>(null);
  const [pendingStage, setPendingStage] = useState<Stage | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Guarded stage transition to prevent overlapping animations
  const safeSetStage = (nextStage: Stage) => {
    if (isTransitioning || stage === nextStage) return;

    const shouldCue = !(stage === 'logo' && nextStage === 'landing');
    setIsTransitioning(true);
    setPendingStage(nextStage);
    if (shouldCue) {
      setTransitionCue({ id: Date.now(), to: nextStage });
      return;
    }
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    setStage(nextStage);
    setPendingStage(null);
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setTransitionCue(null);
    }, 300);
  };

  const handleTransitionMidpoint = () => {
    if (!pendingStage) return;
    setStage(pendingStage);
  };

  const handleTransitionComplete = () => {
    setPendingStage(null);
    setIsTransitioning(false);
    setTransitionCue(null);
  };

  const canNavigateToPage = useCallback(
    (page: string) => canAccessPage(page, demoPhase, demoRole),
    [demoPhase, demoRole]
  );

  const navigateToPage = useCallback(
    (page: string) => {
      if (canNavigateToPage(page)) {
        setCurrentPage(page);
        return;
      }
      setCurrentPage(getFirstAccessiblePage(demoPhase, demoRole));
    },
    [canNavigateToPage, demoPhase, demoRole]
  );

  // Ctrl+K / Cmd+K to toggle command palette (only when dashboard is visible)
  useKeyboardShortcut([
    {
      key: 'k',
      ctrl: true,
      handler: () => setIsCommandPaletteOpen((prev) => !prev),
      enabled: stage === 'dashboard' && showDashboard,
    },
  ]);

  // Close mobile drawer when switching to desktop
  useEffect(() => {
    if (!isMobile) setIsMobileDrawerOpen(false);
  }, [isMobile]);

  // Build command palette page list from sidebar nav items
  const commandPalettePages = useMemo(() => {
    const iconClass = 'w-5 h-5';
    return [
      { id: 'dashboard', label: 'The Front Desk', icon: <DashboardIcon className={iconClass} />, group: 'Operations' },
      { id: 'registry', label: 'The Registry', icon: <RegistryIcon className={iconClass} />, group: 'Operations' },
      { id: 'events', label: 'Events Pavilion', icon: <EventsIcon className={iconClass} />, group: 'Services' },
      { id: 'business', label: 'Business Center', icon: <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>, group: 'Finance' },
      { id: 'vault', label: 'The Vault', icon: <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>, group: 'Services' },
      { id: 'innovation', label: 'Innovation Lab', icon: <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 2l2.4 5.6L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.4L12 2z" /></svg>, group: 'Admin' },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon className={iconClass} />, group: 'Admin' },
    ].filter((page) => canNavigateToPage(page.id));
  }, [canNavigateToPage]);

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

  useEffect(() => {
    if (!selectedOrg) return;

    const orgId = selectedOrg.id;
    document.documentElement.setAttribute('data-org-id', orgId);
    document.body.setAttribute('data-org-id', orgId);
    document.documentElement.style.setProperty('--lobbi-org-id', `"${orgId}"`);
  }, [selectedOrg]);

  // When banner org dropdown changes, update app state to match
  useEffect(() => {
    if (bannerOrg !== bannerOrgRef.current) {
      bannerOrgRef.current = bannerOrg;
      const org = ORGANIZATIONS[bannerOrg];
      if (org) {
        setSelectedOrg(org);
        // Also find matching account for this org
        const account = ACCOUNTS.find(a => a.orgId === bannerOrg);
        if (account) {
          setSelectedEmail(account.email);
          setSelectedAccount(account);
          setDemoRole(mapAccountRoleToDemoRole(account.role));
        }
      }
    }
  }, [bannerOrg]);

  // When app selects an org (via login flow), sync back to banner
  useEffect(() => {
    if (selectedOrg && selectedOrg.id !== bannerOrgRef.current) {
      bannerOrgRef.current = selectedOrg.id as typeof bannerOrg;
      setBannerOrg(selectedOrg.id as typeof bannerOrg);
    }
  }, [selectedOrg, setBannerOrg]);

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
    const searchParams = new URLSearchParams(window.location.search);
    const shouldRestoreSession =
      searchParams.get('resume') === '1' ||
      sessionStorage.getItem('lobbi_resume_session') === '1';

    if (!shouldRestoreSession) {
      return;
    }

    const saved = localStorage.getItem('lobbi_session');
    if (saved) {
      try {
        const session = JSON.parse(saved);
        const account = ACCOUNTS.find((a: Account) => a.email === session.email);
        if (account) {
          const org = ORGANIZATIONS[account.orgId];
          if (org) {
            const mappedRole = mapAccountRoleToDemoRole(account.role);
            const restoredPage = isAppPage(session.currentPage) ? session.currentPage : 'dashboard';
            setSelectedEmail(session.email);
            setSelectedAccount(account);
            setSelectedOrg(org);
            setDemoRole(mappedRole);
            setCurrentPage(
              canAccessPage(restoredPage, demoPhase, mappedRole)
                ? restoredPage
                : getFirstAccessiblePage(demoPhase, mappedRole)
            );
            setShowDashboard(true);
            setStage(session.stage === 'memberPortal' ? 'memberPortal' : 'dashboard');
          }
        }
      } catch { localStorage.removeItem('lobbi_session'); }
    }

    sessionStorage.removeItem('lobbi_resume_session');
  }, []);

  useEffect(() => {
    if (canNavigateToPage(currentPage)) return;
    setCurrentPage(getFirstAccessiblePage(demoPhase, demoRole));
  }, [currentPage, canNavigateToPage, demoPhase, demoRole]);

  useEffect(() => {
    const onDemoState = (event: Event) => {
      const customEvent = event as CustomEvent<{
        phase?: SprintPhase;
        role?: string;
      }>;
      const phase = customEvent.detail?.phase;
      const role = customEvent.detail?.role;
      if (phase && isValidSprintPhase(phase)) {
        setDemoPhase(phase);
      }
      if (role) {
        setDemoRole(role);
      }
    };

    window.addEventListener('lobbi:demo-state', onDemoState as EventListener);
    return () => window.removeEventListener('lobbi:demo-state', onDemoState as EventListener);
  }, []);

  const handleLoginClick = () => {
    safeSetStage('email');
  };

  const handleEmailSelected = (email: string) => {
    if (isTransitioning) return;
    const account = ACCOUNTS.find(a => a.email === email);
    if (!account) return;

    const org = ORGANIZATIONS[account.orgId];
    if (!org) return;
    const mappedRole = mapAccountRoleToDemoRole(account.role);
    setSelectedEmail(email);
    setSelectedAccount(account);
    setSelectedOrg(org);
    setDemoRole(mappedRole);
    applyTheme(org);
    window.setTimeout(() => {
      safeSetStage('orgLogin');
    }, 100);
  };

  const handleOrgLogin = () => {
    window.setTimeout(() => {
      safeSetStage('welcome');
    }, 80);
  };

  const handleWelcomeComplete = () => {
    window.setTimeout(() => {
      safeSetStage('dashboardEntry');
    }, 80);
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
        return <Dashboard organization={selectedOrg} account={selectedAccount} onNavigate={navigateToPage} />;
      case 'registry':
        return <RegistryPage organization={selectedOrg} account={selectedAccount} />;
      case 'business':
        return <BusinessCenterPage organization={selectedOrg} account={selectedAccount} />;
      case 'events':
        return <EventsPavilionPage organization={selectedOrg} account={selectedAccount} />;
      case 'vault':
        return <VaultPage organization={selectedOrg} account={selectedAccount} />;
      case 'settings':
        return (
          <SettingsPage
            organization={selectedOrg}
            account={selectedAccount}
            onUpdateOrganizationTheme={(themePatch) => {
              setSelectedOrg((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  theme: {
                    ...prev.theme,
                    ...themePatch,
                  },
                };
              });
            }}
          />
        );
      case 'innovation':
        return <InnovationLabPage organization={selectedOrg} account={selectedAccount} />;
      default:
        return <Dashboard organization={selectedOrg} account={selectedAccount} onNavigate={navigateToPage} />;
    }
  };

  const currentRgb = selectedOrg?.theme.primaryRgb || '212,175,55';
  const isLandingStage = stage === 'landing';

  return (
    <PlatformDemoBanner
      defaultPhase={demoPhase}
      defaultRole={selectedAccount ? mapAccountRoleToDemoRole(selectedAccount.role) : demoRole}
    >
    <div
      className={cn(
        'relative w-full',
        isLandingStage ? 'min-h-screen overflow-x-hidden overflow-y-auto' : 'h-screen overflow-hidden'
      )}
      style={{
        background:
          'var(--theme-gradient-hero, linear-gradient(180deg, var(--theme-bg-secondary, #FCF8EF) 0%, var(--theme-bg-primary, #F6F0E2) 55%, var(--theme-bg-tertiary, #ECE3D3) 100%))',
      }}
    >


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
          <LandingPage key="landing" onLoginClick={handleLoginClick} organization={selectedOrg ?? undefined} />
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
            onMidpoint={handleTransitionMidpoint}
            onComplete={handleTransitionComplete}
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
            className="fixed inset-0 z-60 flex flex-col"
            style={{ background: 'var(--theme-bg-primary, #F8F3E8)' }}
          >
            {/* Main Layout */}
            <div className="flex flex-1 min-h-0">
              {/* Desktop: persistent sidebar */}
              {!isMobile && (
                <Sidebar
                  currentPage={currentPage}
                  onNavigate={navigateToPage}
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  organization={selectedOrg}
                  account={selectedAccount}
                />
              )}

              {/* Mobile: drawer sidebar */}
              {isMobile && (
                <MobileDrawer
                  isOpen={isMobileDrawerOpen}
                  onClose={() => setIsMobileDrawerOpen(false)}
                >
                  <Sidebar
                    currentPage={currentPage}
                    onNavigate={(page) => {
                      navigateToPage(page);
                      setIsMobileDrawerOpen(false);
                    }}
                    isCollapsed={false}
                    onToggleCollapse={() => setIsMobileDrawerOpen(false)}
                    organization={selectedOrg}
                    account={selectedAccount}
                  />
                </MobileDrawer>
              )}

              <div className="flex-1 flex flex-col min-w-0">
                <TopNav
                  onMenuClick={() => {
                    if (isMobile) {
                      setIsMobileDrawerOpen(!isMobileDrawerOpen);
                    } else {
                      setIsSidebarCollapsed(!isSidebarCollapsed);
                    }
                  }}
                  onBellhopClick={() => setIsBellhopOpen(true)}
                  onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)}
                  organization={selectedOrg}
                  account={selectedAccount}
                  onNavigate={navigateToPage}
                  canNavigateToPage={canNavigateToPage}
                />

                <main className="flex-1 overflow-y-auto bg-transparent">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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

            {/* Command Palette overlay */}
            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              onNavigate={(page) => {
                navigateToPage(page);
                setIsCommandPaletteOpen(false);
              }}
              pages={commandPalettePages}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 8: MEMBER PORTAL (Mobile-First View) */}
      <AnimatePresence mode="wait">
        {stage === 'memberPortal' && selectedAccount && selectedOrg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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

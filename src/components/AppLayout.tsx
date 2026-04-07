import { useState, ReactNode, useEffect } from 'react';
import { Home, FileText, Users, Calendar, BookOpen, Menu, X, Search, Bell, Settings, Plus, Command, HelpCircle, Grid3x3, Circle, ChevronDown, ChevronRight, Check, Minus, Pencil, Clock, TrendingUp, Filter, Globe, Database, Shield, Compass, CalendarDays } from 'lucide-react';
import TrueLeapLogo from '../imports/Frame315115';
import { CopilotPanel } from './CopilotPanel';
import { NotificationsPanel } from './NotificationsPanel';
import { SearchModal } from './SearchModal';
import { CopilotProvider, useCopilot } from '../contexts/CopilotContext';
import LeapyLogo from '../imports/Button';
import { UserMenu } from './UserMenu';
import { LeapSpaceSwitcher } from './LeapSpaceSwitcher';
import { UserSwitcher } from './UserSwitcher';

interface AppLayoutProps {
  children: ReactNode;
  currentPage?: 'home' | 'drafts' | 'communities' | 'events' | 'events-explore' | 'events-calendar' | 'courses' | 'settings' | 'my-drive' | 'permissions';
  showBanner?: boolean;
  onNewClick?: () => void;
  onNavClick?: (page: 'home' | 'communities' | 'courses' | 'events' | 'events-explore' | 'events-calendar' | 'settings' | 'my-drive' | 'permissions') => void;
  copilotOpenByDefault?: boolean;
  copilotContext?: 'course' | 'community' | 'general' | 'event';
  currentUser?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  onSignOut?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: (tab?: 'general' | 'integrations' | 'notifications' | 'billing' | 'profile' | 'security') => void;
  onInvitationsClick?: () => void;
  onSignIn?: () => void;
  isGuest?: boolean;
  guestCredits?: number;
  onGuestSignUp?: () => void;
  onNavigate?: (page: 'credits') => void;
}

function AppLayoutInner({ 
  children, 
  currentPage = 'communities', 
  showBanner = true, 
  onNewClick,
  onNavClick,
  copilotOpenByDefault = false,
  copilotContext = 'general',
  currentUser,
  onSignOut,
  onProfileClick,
  onSettingsClick,
  onInvitationsClick,
  onSignIn,
  isGuest,
  guestCredits,
  onGuestSignUp,
  onNavigate
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copilotOpen, setCopilotOpen] = useState(copilotOpenByDefault);
  const { currentFocus, applySuggestion } = useCopilot();
  const [userStatus, setUserStatus] = useState<'automatic' | 'away' | 'dnd'>('automatic');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [rightPanelOpen, setRightPanelOpen] = useState(copilotOpenByDefault);
  const [rightPanelMode, setRightPanelMode] = useState<'copilot' | 'notifications'>(copilotOpenByDefault ? 'copilot' : 'notifications');
  const [copilotPanelWidth, setCopilotPanelWidth] = useState('420px');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Expandable nav sections state — auto-expand when on an events sub-page
  const isEventsSection = currentPage === 'events' || currentPage === 'events-explore' || currentPage === 'events-calendar';
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    isEventsSection ? new Set(['events']) : new Set()
  );

  // Keep expanded state in sync when currentPage changes
  useEffect(() => {
    if (isEventsSection) {
      setExpandedSections(prev => {
        const next = new Set(prev);
        next.add('events');
        return next;
      });
    }
  }, [isEventsSection]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  // LeapSpace Switcher State
  const [showLeapSpaceSwitcher, setShowLeapSpaceSwitcher] = useState(false);
  const [currentLeapSpace, setCurrentLeapSpace] = useState({
    id: '1',
    name: 'My Personal Space',
    type: 'personal' as const,
    coursesCount: 12,
    communitiesCount: 5,
    eventsCount: 8
  });
  const [allLeapSpaces] = useState([
    {
      id: '1',
      name: 'My Personal Space',
      type: 'personal' as const,
      coursesCount: 12,
      communitiesCount: 5,
      eventsCount: 8
    },
    {
      id: '2',
      name: 'Work Projects',
      type: 'work' as const,
      coursesCount: 24,
      communitiesCount: 8,
      eventsCount: 15
    },
    {
      id: '3',
      name: 'University Learning',
      type: 'school' as const,
      coursesCount: 6,
      communitiesCount: 3,
      eventsCount: 4
    },
    {
      id: '4',
      name: 'Side Hustle',
      type: 'custom' as const,
      coursesCount: 8,
      communitiesCount: 2,
      eventsCount: 6
    }
  ]);

  const handleLeapSpaceSwitch = (leapSpaceId: string) => {
    const selectedSpace = allLeapSpaces.find(space => space.id === leapSpaceId);
    if (selectedSpace) {
      setCurrentLeapSpace(selectedSpace);
      // In real app, this would fetch data for the new LeapSpace
      console.log('Switched to LeapSpace:', selectedSpace.name);
    }
  };

  const handleAddNewLeapSpace = () => {
    // In real app, this would open a modal to create new LeapSpace
    console.log('Add new LeapSpace');
  };

  // Country to flag emoji mapping
  const countryFlags: { [key: string]: string } = {
    'us': '🇺🇸',
    'in': '🇮🇳',
    'gb': '🇬🇧',
    'ca': '🇨🇦',
    'au': '🇦🇺',
    'de': '🇩🇪',
    'fr': '🇫🇷',
    'es': '🇪🇸',
    'it': '🇮🇹',
    'br': '🇧🇷',
    'mx': '🇲🇽',
    'jp': '🇯🇵',
    'cn': '🇨🇳',
    'kr': '🇰🇷',
    'sg': '🇸🇬',
    'ae': '🇦🇪',
  };

  const countryNames: { [key: string]: string } = {
    'us': 'United States',
    'in': 'India',
    'gb': 'United Kingdom',
    'ca': 'Canada',
    'au': 'Australia',
    'de': 'Germany',
    'fr': 'France',
    'es': 'Spain',
    'it': 'Italy',
    'br': 'Brazil',
    'mx': 'Mexico',
    'jp': 'Japan',
    'cn': 'China',
    'kr': 'South Korea',
    'sg': 'Singapore',
    'ae': 'United Arab Emirates',
  };

  // Keyboard shortcut for opening search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper functions to manage right panel
  const openCopilot = () => {
    if (rightPanelOpen && rightPanelMode === 'copilot') {
      setRightPanelOpen(false);
    } else {
      setRightPanelMode('copilot');
      setRightPanelOpen(true);
    }
  };

  const openNotifications = () => {
    if (rightPanelOpen && rightPanelMode === 'notifications') {
      setRightPanelOpen(false);
    } else {
      setRightPanelMode('notifications');
      setRightPanelOpen(true);
    }
  };

  const closeRightPanel = () => {
    setRightPanelOpen(false);
  };

  const handlePanelSizeChange = (width: string) => {
    setCopilotPanelWidth(width);
  };

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Home', active: currentPage === 'home' },
    { id: 'my-drive', icon: Database, label: 'My Drive', active: currentPage === 'my-drive' },
    { id: 'permissions', icon: Shield, label: 'Permissions', active: currentPage === 'permissions' },
    { id: 'drafts', icon: FileText, label: 'Drafts', active: currentPage === 'drafts' },
    { id: 'communities', icon: Users, label: 'Communities', active: currentPage === 'communities' },
    { id: 'events', icon: Calendar, label: 'Events', active: isEventsSection, children: [
      { id: 'events-explore' as const, icon: Compass, label: 'Explore', active: currentPage === 'events' || currentPage === 'events-explore' },
      { id: 'events-calendar' as const, icon: CalendarDays, label: 'Calendar', active: currentPage === 'events-calendar' },
    ]},
    { id: 'courses', icon: BookOpen, label: 'Courses', active: currentPage === 'courses' },
  ];

  const draftCommunities = [
    { id: 1, name: 'Design Masters', emoji: '🎨', members: 0, status: 'draft' },
    { id: 2, name: 'Tech Innovators', emoji: '💡', members: 0, status: 'draft' },
    { id: 3, name: 'Marketing Pros', emoji: '📱', members: 0, status: 'draft' },
  ];

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Banner */}
      {showBanner && (
        <div className="bg-primary h-[33px] flex items-center justify-between px-5 relative flex-shrink-0">
          <p className="text-primary-foreground text-sm tracking-tight">
            Leaper V2.1 available, You can now create automations around for events to better organize, manage, train and execute
          </p>
          <button className="text-primary-foreground hover:opacity-80 transition-opacity active:scale-95">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50 flex-shrink-0">
        <div className="h-[73px] px-6 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              <Menu className="size-5 text-foreground" />
            </button>
            <div className="w-[200px] h-[60px]">
              <TrueLeapLogo onClick={() => onNavClick?.('home')} />
            </div>
            
            {/* User Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowStatusMenu(!showStatusMenu)}
                className="px-3 h-9 hover:bg-accent rounded-full transition-colors flex items-center gap-1.5 bg-muted"
                title="Set your status"
              >
                <Circle className="size-3 fill-green-500 text-green-500 flex-shrink-0" />
                <span className="text-sm text-foreground">Active</span>
                <ChevronDown className="size-4 text-muted-foreground flex-shrink-0" />
              </button>
              
              {/* Status Dropdown Menu */}
              {showStatusMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowStatusMenu(false)}
                  />
                  <div 
                    className="absolute right-0 top-full mt-2 w-64 bg-popover rounded-lg border border-border py-1 z-20 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ transformOrigin: 'top right' }}
                  >
                    {/* Automatic */}
                    <button
                      onClick={() => {
                        setUserStatus('automatic');
                        setShowStatusMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-all active:scale-[0.98]"
                    >
                      <Circle className="size-4 fill-green-500 text-green-500 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-sm text-popover-foreground">Automatic</p>
                        <p className="text-xs text-muted-foreground">Based on chat activity</p>
                      </div>
                      {userStatus === 'automatic' && (
                        <Check className="size-4 text-popover-foreground flex-shrink-0" />
                      )}
                    </button>

                    {/* Away */}
                    <button
                      onClick={() => {
                        setUserStatus('away');
                        setShowStatusMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-all active:scale-[0.98]"
                    >
                      <Minus className="size-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-sm text-popover-foreground">Away</p>
                        <p className="text-xs text-muted-foreground">Not at my desk</p>
                      </div>
                      {userStatus === 'away' && (
                        <Check className="size-4 text-popover-foreground flex-shrink-0" />
                      )}
                    </button>

                    {/* Do not disturb */}
                    <button
                      onClick={() => {
                        setUserStatus('dnd');
                        setShowStatusMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-all active:scale-[0.98]"
                    >
                      <Circle className="size-4 fill-red-500 text-red-500 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-sm text-popover-foreground">Do not disturb</p>
                        <p className="text-xs text-muted-foreground">No notifications</p>
                      </div>
                      {userStatus === 'dnd' && (
                        <Check className="size-4 text-popover-foreground flex-shrink-0" />
                      )}
                    </button>

                    {/* Divider */}
                    <div className="my-1 border-t border-border" />

                    {/* Custom Status */}
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-all active:scale-[0.98]">
                      <Pencil className="size-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm text-popover-foreground">Set custom status</p>
                    </button>

                    {/* Clear Status */}
                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-all active:scale-[0.98]">
                      <X className="size-4 text-muted-foreground flex-shrink-0" />
                      <p className="text-sm text-popover-foreground">Clear status</p>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Search, Status, Support, Apps, Notifications, Leapy, Sign-in */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 h-9 pl-9 pr-16 bg-muted border border-border rounded-lg text-sm text-foreground focus:outline-none focus:bg-card focus:border-input transition-all cursor-pointer"
                  onClick={() => setSearchModalOpen(true)}
                  readOnly
                  value=""
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-card border border-border rounded pointer-events-none">
                  <Command className="size-2.5 text-muted-foreground" />
                  <span className="text-xs text-foreground">K</span>
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-accent rounded-md transition-all active:scale-95 border border-border"
                title="Change language and country"
              >
                <span className="text-base">{countryFlags[selectedCountry]}</span>
                <span className="text-sm font-medium text-foreground">{selectedLanguage.toUpperCase()}</span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>
              
              {/* Language Menu */}
              {showLanguageMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowLanguageMenu(false)}
                  />
                  <div 
                    className="absolute right-0 top-full mt-2 w-72 bg-popover rounded-lg border border-border py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ transformOrigin: 'top right' }}
                  >
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-semibold text-popover-foreground">Choose your language</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Select your preferred language</p>
                    </div>
                    
                    <div className="py-1 max-h-80 overflow-y-auto">
                      {[
                        { code: 'en', name: 'English' },
                        { code: 'es', name: 'Español' },
                        { code: 'fr', name: 'Français' },
                        { code: 'de', name: 'Deutsch' },
                        { code: 'pt', name: 'Português' },
                        { code: 'it', name: 'Italiano' },
                        { code: 'ja', name: '日本語' },
                        { code: 'zh', name: '中文' },
                        { code: 'ko', name: '한국어' },
                        { code: 'ar', name: 'العربية' },
                        { code: 'hi', name: 'हिन्दी' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.code);
                            setShowLanguageMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent transition-all text-left"
                        >
                          <div className="size-4 rounded-full border-2 border-input flex items-center justify-center flex-shrink-0">
                            {selectedLanguage === lang.code && (
                              <div className="size-2 rounded-full bg-primary" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-popover-foreground">{lang.name}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{lang.code.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border" />

                    {/* Country/Region Section */}
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-popover-foreground">Change country/region</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Shopping preferences and currency</p>
                    </div>

                    <div className="py-1 max-h-60 overflow-y-auto">
                      {['us', 'in', 'gb', 'ca', 'au', 'de', 'fr', 'es', 'it', 'br', 'mx', 'jp', 'cn', 'kr', 'sg', 'ae'].map((code) => (
                        <button
                          key={code}
                          onClick={() => {
                            setSelectedCountry(code);
                            setShowLanguageMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent transition-all text-left"
                        >
                          <span className="text-xl">{countryFlags[code]}</span>
                          <div className="flex-1">
                            <p className="text-sm text-popover-foreground">{countryNames[code]}</p>
                          </div>
                          {selectedCountry === code && (
                            <Check className="size-4 text-primary flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Demo User Switcher - For Phase 1 Testing */}
            <UserSwitcher />

            {/* App Drawer */}
            <div className="relative">
              <button
                onClick={() => setShowAppDrawer(!showAppDrawer)}
                className="p-2 hover:bg-accent rounded-lg transition-all active:scale-95"
                title="LeapSpace Apps"
              >
                <svg className="size-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="5" r="2" />
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="19" cy="5" r="2" />
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                  <circle cx="5" cy="19" r="2" />
                  <circle cx="12" cy="19" r="2" />
                  <circle cx="19" cy="19" r="2" />
                </svg>
              </button>
              
              {/* App Drawer Menu */}
              {showAppDrawer && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowAppDrawer(false)}
                  />
                  <div 
                    className="absolute right-0 top-full mt-2 w-80 bg-popover rounded-2xl border border-border p-5 z-20 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ transformOrigin: 'top right' }}
                  >
                    {/* Header with Edit Button */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium text-popover-foreground">Your favorites</p>
                      <button 
                        className="size-8 rounded-lg bg-primary/10 hover:bg-primary/15 flex items-center justify-center transition-all active:scale-95"
                        title="Edit favorites"
                      >
                        <Pencil className="size-3.5 text-primary" />
                      </button>
                    </div>

                    {/* App Grid - 3 columns like Google */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Placeholder Apps - Gray circular icons */}
                      {[
                        'Communities',
                        'Courses', 
                        'Events',
                        'Analytics',
                        'Calendar',
                        'Messages',
                        'Settings',
                        'Files',
                        'Tasks'
                      ].map((appName, idx) => (
                        <button 
                          key={idx}
                          className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-accent transition-all active:scale-95"
                        >
                          <div className="size-12 rounded-full bg-muted" />
                          <span className="text-xs text-foreground">{appName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Notifications */}
            <button 
              onClick={openNotifications}
              className={`p-2 rounded-lg transition-all active:scale-95 relative ${
                rightPanelOpen && rightPanelMode === 'notifications' ? 'bg-accent' : 'hover:bg-accent'
              }`}
              title="Notifications"
            >
              <Bell className={`size-5 ${rightPanelOpen && rightPanelMode === 'notifications' ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Avatar / Copilot Toggle */}
            <button 
              onClick={openCopilot}
              className="size-9 flex items-center justify-center hover:opacity-80 transition-all active:scale-95 rounded-lg"
              title="Toggle Leapy Copilot"
              style={{
                filter: rightPanelOpen && rightPanelMode === 'copilot' ? 'none' : 'grayscale(100%)',
                opacity: rightPanelOpen && rightPanelMode === 'copilot' ? 1 : 0.6,
                backgroundColor: rightPanelOpen && rightPanelMode === 'copilot' ? 'var(--ai-accent)' : 'transparent'
              }}
            >
              <LeapyLogo />
            </button>

            {/* User Menu */}
            {currentUser && onSignOut ? (
              <UserMenu
                user={currentUser}
                isGuest={isGuest}
                onProfileClick={() => onProfileClick?.()}
                onSettingsClick={() => onSettingsClick?.('general')}
                onInvitationsClick={() => onInvitationsClick?.()}
                onBillingClick={() => onSettingsClick?.('billing')}
                onHelpClick={() => {/* Open help */}}
                onSignOut={onSignOut}
              />
            ) : (
              <button 
                onClick={() => {
                  console.log('🔴 SIGN-IN BUTTON CLICKED in AppLayout');
                  console.log('🔴 onSignIn function:', onSignIn);
                  console.log('🔴 Calling onSignIn...');
                  onSignIn?.();
                  console.log('🔴 onSignIn called!');
                }}
                className="px-4 h-9 bg-primary text-primary-foreground rounded-md font-medium text-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                Sign-in
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div
          className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col flex-shrink-0 h-full ${
            sidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          {/* Main Navigation */}
          <div className="flex-1 p-3 space-y-1">
            {/* Create New Button */}
            {sidebarOpen && (
              <button 
                onClick={onNewClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mb-4"
              >
                <Plus className="size-4" />
                <span className="text-sm font-medium">New</span>
              </button>
            )}

            {!sidebarOpen && (
              <button 
                onClick={onNewClick}
                className="w-full flex items-center justify-center p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mb-4"
              >
                <Plus className="size-4" />
              </button>
            )}

            {navigationItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => {
                    if (item.children) {
                      // Items with children: navigate to parent AND toggle sub-menu
                      toggleSection(item.id);
                      if (onNavClick) {
                        onNavClick(item.id as any);
                      }
                    } else {
                      // Simple items: just navigate
                      if (onNavClick) {
                        onNavClick(item.id as any);
                      }
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    item.active
                      ? 'bg-sidebar-accent text-primary'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  } ${!sidebarOpen ? 'justify-center' : ''}`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <item.icon className={`size-[18px] ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
                      {item.children && (
                        <ChevronRight className={`size-3.5 text-muted-foreground transition-transform duration-200 ${expandedSections.has(item.id) ? 'rotate-90' : ''}`} />
                      )}
                    </>
                  )}
                </button>

                {/* Sub-items for expandable sections */}
                {item.children && sidebarOpen && expandedSections.has(item.id) && (
                  <div className="ml-4 mt-0.5 space-y-0.5 border-l border-sidebar-border pl-3">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => {
                          if (onNavClick) {
                            onNavClick(child.id as any);
                          }
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-all ${
                          child.active
                            ? 'bg-sidebar-accent text-primary'
                            : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground'
                        }`}
                      >
                        <span className="text-sm font-medium">{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-sidebar-border p-3 space-y-1">
            {/* Guest Credits Display (if guest) */}
            {isGuest && guestCredits !== undefined && sidebarOpen && (
              <div className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Credits</span>
                  <span className="text-xs font-semibold text-sidebar-foreground">{guestCredits}/1000</span>
                </div>
                {/* Slider */}
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(guestCredits / 1000) * 100}%` }}
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {onGuestSignUp && (
                    <button
                      onClick={onGuestSignUp}
                      className="flex-1 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-xs font-medium hover:bg-primary/15 transition-colors"
                    >
                      Sign up for more
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (onNavigate) onNavigate('credits');
                    }}
                    className={`${onGuestSignUp ? '' : 'w-full'} flex-1 px-3 py-1.5 border border-border text-foreground rounded-md text-xs font-medium hover:bg-muted transition-colors`}
                  >
                    Buy Credits
                  </button>
                </div>
              </div>
            )}
            
            {/* LeapSpace Switcher Button */}
            <button
              onClick={() => setShowLeapSpaceSwitcher(true)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sidebar-foreground hover:bg-sidebar-accent ${!sidebarOpen ? 'justify-center' : ''}`}
              title={!sidebarOpen ? 'Switch LeapSpace' : ''}
            >
              <div className="size-[18px] rounded-full bg-foreground flex items-center justify-center text-card text-[8px] font-semibold flex-shrink-0">
                {currentLeapSpace.name.charAt(0)}
              </div>
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left text-sm font-medium truncate">{currentLeapSpace.name}</span>
                  <ChevronDown className="size-4 text-muted-foreground flex-shrink-0" />
                </>
              )}
            </button>
            
            <button
              onClick={() => onNavClick?.('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                currentPage === 'settings'
                  ? 'bg-sidebar-accent text-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              } ${!sidebarOpen ? 'justify-center' : ''}`}
              title={!sidebarOpen ? 'Settings' : ''}
            >
              <Settings className={`size-[18px] ${currentPage === 'settings' ? 'text-primary' : 'text-muted-foreground'}`} />
              {sidebarOpen && <span className="flex-1 text-left text-sm font-medium">Manage LeapSpace</span>}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto transition-all duration-300">
          {children}
        </div>

        {/* Universal Copilot Panel - Pushes from right */}
        <div className={`transition-all duration-300 flex-shrink-0 h-full overflow-hidden`} style={{ width: rightPanelOpen ? copilotPanelWidth : '0' }}>
          {rightPanelMode === 'copilot' && (
            <CopilotPanel 
              isOpen={rightPanelOpen}
              onClose={closeRightPanel}
              userRole="admin"
              context={copilotContext}
              currentFocus={currentFocus}
              onApplySuggestion={applySuggestion}
              onPanelSizeChange={handlePanelSizeChange}
            />
          )}
          {rightPanelMode === 'notifications' && (
            <NotificationsPanel 
              isOpen={rightPanelOpen}
              onClose={closeRightPanel}
            />
          )}
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* LeapSpace Switcher Modal */}
      <LeapSpaceSwitcher
        isOpen={showLeapSpaceSwitcher}
        onClose={() => setShowLeapSpaceSwitcher(false)}
        currentLeapSpace={currentLeapSpace}
        leapSpaces={allLeapSpaces}
        onSwitch={handleLeapSpaceSwitch}
        onAddNew={handleAddNewLeapSpace}
        onSignOut={onSignOut || (() => {})}
        userEmail={currentUser?.email || 'guest@trueleap.io'}
      />
    </div>
  );
}

export function AppLayout({ 
  children, 
  currentPage = 'communities', 
  showBanner = true, 
  onNewClick,
  onNavClick,
  copilotOpenByDefault = false,
  copilotContext = 'general',
  currentUser,
  onSignOut,
  onProfileClick,
  onSettingsClick,
  onSignIn,
  isGuest,
  guestCredits,
  onGuestSignUp,
  onNavigate
}: AppLayoutProps) {
  return (
    <CopilotProvider>
      <AppLayoutInner
        children={children}
        currentPage={currentPage}
        showBanner={showBanner}
        onNewClick={onNewClick}
        onNavClick={onNavClick}
        copilotOpenByDefault={copilotOpenByDefault}
        copilotContext={copilotContext}
        currentUser={currentUser}
        onSignOut={onSignOut}
        onProfileClick={onProfileClick}
        onSettingsClick={onSettingsClick}
        onSignIn={onSignIn}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={onGuestSignUp}
        onNavigate={onNavigate}
      />
    </CopilotProvider>
  );
}

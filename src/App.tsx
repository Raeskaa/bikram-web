import { UnifiedEventPage } from './components/UnifiedEventPage';
import { useState, useEffect } from 'react';
import { AuthProvider, useAuth as useAuthContext, isEmptyStateUser, TEST_USERS } from './contexts/AuthContext';
import { SignIn } from './components/auth/SignIn';
import { Register } from './components/auth/Register';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ResetPassword } from './components/auth/ResetPassword';
import { OTPVerification } from './components/auth/OTPVerification';
import { MagicLinkSent } from './components/auth/MagicLinkSent';
import { ProfileCompletionCard } from './components/auth/ProfileCompletionCard';
import { AccountMergeScreen } from './components/auth/AccountMergeScreen';
import { AccountMergeVerification } from './components/auth/AccountMergeVerification';
import { ExpiredMagicLink } from './components/auth/ExpiredMagicLink';
import { SocialConnectingScreen } from './components/auth/SocialConnectingScreen';
import { GuestBanner } from './components/GuestBanner';
import { UpgradeModal } from './components/UpgradeModal';
import { GuestCreditsLowModal } from './components/modals/GuestCreditsLowModal';
import { GuestCreditsDepletedModal } from './components/modals/GuestCreditsDepletedModal';
import { AccountLockedModal } from './components/modals/AccountLockedModal';
import { NetworkErrorModal } from './components/modals/NetworkErrorModal';
import { ForgotMethodModal } from './components/modals/ForgotMethodModal';
import { OAuthPopupBlockedModal } from './components/modals/OAuthPopupBlockedModal';
import { SupportModal } from './components/modals/SupportModal';
import { AllLoginMethods } from './components/AllLoginMethods';
import { OnboardingFlow } from './components/OnboardingFlow';
import { AccountMergeModal } from './components/AccountMergeModal';
import { MergeDetectionBanner } from './components/MergeDetectionBanner';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatFlow } from './components/ChatFlow';
import { AppLayout } from './components/AppLayout';
import { HomeOverview } from './components/HomeOverview';
import { CommunitiesListView } from './components/CommunitiesListView';
import { CoursesListView } from './components/CoursesListView';
import { EventsListView } from './components/EventsListView';
import { EventTemplatesPage } from './components/EventTemplatesPage';
import { CalendarView } from './components/CalendarView';
import { MarketplaceView } from './components/MarketplaceView';
import { CommunityBuilderView } from './components/CommunityBuilderView';
import { CourseBuilderViewV3 } from './components/CourseBuilderViewV3';
import { EventBuilderViewV2 } from './components/EventBuilderViewV2';
import { CommunityGenerationPreview } from './components/CommunityGenerationPreview';
import { CourseGenerationPreview } from './components/CourseGenerationPreview';
import { EventGenerationPreview } from './components/EventGenerationPreview';
import { IntegrationsLibraryEnhanced } from './components/IntegrationsLibraryEnhanced';
import { GlobalSettingsPage } from './components/GlobalSettingsPage';
import { EventMeetingRoom } from './components/EventMeetingRoom';
import { MinimizedMeetWindow } from './components/MinimizedMeetWindow';
import { PublicEventLanding } from './components/PublicEventLanding';
import { EventsCRM } from './components/EventsCRM';
import { SocialPackGenerator } from './components/SocialPackGenerator';
import { NewsletterAutomation } from './components/NewsletterAutomation';
import { MyDrive } from './components/MyDrive';
import { CoursePlayer } from './components/CoursePlayer';
import { PermissionsDashboard } from './components/PermissionsDashboard';
import { Phase1Demo } from './components/Phase1Demo';
import { InvitationsPage, InvitationScenario } from './components/InvitationsPage';
import { ProfileSettingsPage } from './components/ProfileSettingsPage';
import { Conversation, CourseData, CommunityData, Message, AppVersion } from './types';

interface EventData {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  endTime?: string;
  location?: string;
  capacity?: number;
  type?: 'virtual' | 'in-person' | 'hybrid';
  category?: string;
  tickets?: any[];
  schedule?: any[];
  attendees?: any[];
  status?: 'draft' | 'published' | 'past' | 'cancelled';
  lifecycleStage?: 'skeleton' | 'building' | 'ready' | 'published' | 'live' | 'ended' | 'cancelled';
  completionChecklist?: {
    hasTitle: boolean;
    hasDescription: boolean;
    hasDateTime: boolean;
    hasCoverImage: boolean;
    hasAgenda: boolean;
    hasSpeakers: boolean;
    hasTickets: boolean;
    hasRegistrationForm: boolean;
    hasLocation: boolean;
  };
  speakers?: any[];
  isPaid?: boolean;
  price?: number;
}

/** Build a completionChecklist from partial event data */
function buildCompletionChecklist(data: Partial<EventData>) {
  return {
    hasTitle: !!data.title,
    hasDescription: !!data.description,
    hasDateTime: !!(data.date && data.time),
    hasCoverImage: false,
    hasAgenda: !!(data.schedule && data.schedule.length > 0),
    hasSpeakers: !!(data.speakers && data.speakers.length > 0),
    hasTickets: !!(data.tickets && data.tickets.length > 0),
    hasRegistrationForm: false,
    hasLocation: !!data.location,
  };
}

/** Derive lifecycle stage from checklist completeness */
function deriveLifecycleStage(checklist: ReturnType<typeof buildCompletionChecklist>): 'skeleton' | 'building' | 'ready' {
  const items = Object.values(checklist);
  const done = items.filter(Boolean).length;
  if (done <= 3) return 'skeleton';
  if (done < items.length) return 'building';
  return 'ready';
}

type Stage = 
  | 'signin'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'all-login-methods'
  | 'account-merge'
  | 'onboarding'
  | 'home'
  | 'welcome'
  | 'chat'
  | 'communities-list'
  | 'community-preview'
  | 'community-builder'
  | 'courses-list'
  | 'course-preview'
  | 'course-builder'
  | 'events-list'
  | 'events-calendar'
  | 'event-preview'
  | 'event-builder'
  | 'unified-event' // PHASE 2: Unified event page
  | 'event-landing'
  | 'events-crm'
  | 'marketplace'
  | 'event-meeting'
  | 'event-meeting-guest'
  | 'event-automations'
  | 'integrations'
  | 'settings'
  | 'profile-settings'
  | 'invitations'
  | 'social-pack'
  | 'newsletter'
  | 'event-templates'
  | 'otp-verification'
  | 'magic-link-sent'
  | 'profile-completion'
  | 'my-drive'
  | 'course-player'
  | 'permissions-dashboard'
  | 'phase1-demo';

function AppContent() {
  const getInvitationScenarioFromPath = (): InvitationScenario | null => {
    if (typeof window === 'undefined') return null;

    switch (window.location.pathname) {
      case '/invitations':
        return 'hub';
      case '/invitations/new':
      case '/invitations/first-time':
      case '/first-time':
        return 'first-time';
      case '/invitations/existing-user':
      case '/existing-user':
        return 'existing-user';
      case '/invitations/success':
      case '/success':
        return 'success';
      case '/invitations/expired':
      case '/expired':
        return 'expired';
      case '/invitations/revoked':
      case '/revoked':
        return 'revoked';
      case '/invitations/wrong-account':
      case '/wrong-account':
        return 'wrong-account';
      case '/invitations/already-member':
      case '/already-member':
        return 'already-member';
      default:
        return null;
    }
  };

  // Scrollbar visibility on scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      // Add class to show scrollbar
      document.documentElement.classList.add('scrolling');
      
      // Clear existing timeout
      clearTimeout(scrollTimeout);
      
      // Remove class after scrolling stops (1 second)
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('scrolling');
      }, 1000);
    };
    
    // Listen to scroll events on window and all scrollable elements
    window.addEventListener('scroll', handleScroll, true); // true = capture phase to catch all scrolls
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Sync with AuthContext for empty-state user detection in child views
  const { login: authContextLogin } = useAuthContext();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    avatar?: string;
    isNewUser?: boolean;
  } | null>(null);

  // Guest mode state
  const [isGuest, setIsGuest] = useState(true); // Start as guest by default
  const [guestCredits, setGuestCredits] = useState(1000);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeTrigger, setUpgradeTrigger] = useState<'publish' | 'private' | 'download' | 'share' | 'credits' | 'paid'>('credits');
  const [showGuestCreditsLowModal, setShowGuestCreditsLowModal] = useState(false);
  const [showGuestCreditsDepletedModal, setShowGuestCreditsDepletedModal] = useState(false);
  
  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Social connecting state
  const [showSocialConnecting, setShowSocialConnecting] = useState(false);
  const [connectingProvider, setConnectingProvider] = useState<string>('');

  // Error/helper modal state
  const [showAccountLockedModal, setShowAccountLockedModal] = useState(false);
  const [accountLockRetryMinutes, setAccountLockRetryMinutes] = useState(15);
  const [showNetworkErrorModal, setShowNetworkErrorModal] = useState(false);
  const [networkErrorAction, setNetworkErrorAction] = useState('complete this action');
  const [networkErrorRetryFn, setNetworkErrorRetryFn] = useState<() => void>(() => () => {});
  const [showForgotMethodModal, setShowForgotMethodModal] = useState(false);
  const [showOAuthPopupBlockedModal, setShowOAuthPopupBlockedModal] = useState(false);
  const [blockedOAuthProvider, setBlockedOAuthProvider] = useState('');
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportModalContext, setSupportModalContext] = useState<{ email?: string; issue?: string }>({});
  
  // Account merge verification state
  const [showMergeVerification, setShowMergeVerification] = useState(false);
  const [mergeOriginalAccount, setMergeOriginalAccount] = useState<{
    provider: string;
    identifier: string;
    type: 'email' | 'phone';
  } | null>(null);
  const [mergeNewProvider, setMergeNewProvider] = useState('');

  // Pending auth state (for OTP/magic link flow)
  const [pendingAuth, setPendingAuth] = useState<{
    identifier: string;
    type: 'email' | 'phone';
    countryCode?: string;
    name?: string;
  } | null>(null);

  // Reset password state (for password reset flow)
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>('');
  const [resetPasswordToken, setResetPasswordToken] = useState<string>('');

  // Account merge state
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [showMergeBanner, setShowMergeBanner] = useState(false);
  const [duplicateAccount, setDuplicateAccount] = useState<{
    provider: string;
    email: string;
    createdDate: string;
    coursesCount: number;
    communitiesCount: number;
    eventsCount: number;
    achievementsCount: number;
  } | null>(null);
  const [newAccount, setNewAccount] = useState<{
    provider: string;
    email: string;
    createdDate: string;
    coursesCount: number;
    communitiesCount: number;
    eventsCount: number;
    achievementsCount: number;
  } | null>(null);
  
  // Check localStorage for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('leapspace_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsGuest(false); // Not guest if logged in
    }
    
    // Add seed data for testing merge detection (only if not already present)
    const existingAccounts = localStorage.getItem('leapspace_all_accounts');
    if (!existingAccounts) {
      const seedAccounts = [
        {
          email: 'sarah.chen@gmail.com',
          provider: 'Google',
          createdDate: 'Dec 15, 2024',
          coursesCount: 5,
          communitiesCount: 3,
          eventsCount: 2,
          achievementsCount: 12
        },
        {
          email: 'john.doe@outlook.com',
          provider: 'Microsoft',
          createdDate: 'Nov 10, 2024',
          coursesCount: 8,
          communitiesCount: 5,
          eventsCount: 4,
          achievementsCount: 18
        },
        {
          email: 'demo@example.com',
          provider: 'Email',
          createdDate: 'Jan 5, 2025',
          coursesCount: 2,
          communitiesCount: 1,
          eventsCount: 1,
          achievementsCount: 5
        },
        {
          email: '+1 (555) 123-4567',
          phone: '+15551234567',
          provider: 'Phone',
          createdDate: 'Dec 28, 2024',
          coursesCount: 1,
          communitiesCount: 1,
          eventsCount: 0,
          achievementsCount: 3
        },
        {
          email: 'alex.rivera@facebook.com',
          provider: 'Facebook',
          createdDate: 'Oct 20, 2024',
          coursesCount: 6,
          communitiesCount: 4,
          eventsCount: 3,
          achievementsCount: 14
        }
      ];
      localStorage.setItem('leapspace_all_accounts', JSON.stringify(seedAccounts));
      
      // Also add demo instructions to console for team testing
      console.log('🎯 DEMO ACCOUNTS FOR TESTING DUPLICATE DETECTION:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Try signing up with these accounts to see the merge flow:');
      console.log('1. sarah.chen@gmail.com (Google account with 5 courses)');
      console.log('2. john.doe@outlook.com (Microsoft account with 8 courses)');
      console.log('3. demo@example.com (Email account with 2 courses)');
      console.log('4. +1 (555) 123-4567 (Phone account with 1 course)');
      console.log('5. alex.rivera@facebook.com (Facebook account with 6 courses)');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✨ OR use social login with Google, Microsoft, or Facebook');
      console.log('✨ The system will detect duplicates and show merge options!');
    }
  }, []);

  const [stage, setStage] = useState<Stage>(() => {
    if (getInvitationScenarioFromPath()) {
      return 'invitations';
    }

    return 'events-list';
  }); // Start at events list to test Phase 1
  const [invitationScenario, setInvitationScenario] = useState<InvitationScenario>(() => getInvitationScenarioFromPath() || 'hub');
  const [appVersion, setAppVersion] = useState<AppVersion>('v1');
  const [conversation, setConversation] = useState<Conversation>({ messages: [] });
  const [courseData, setCourseData] = useState<Partial<CourseData>>({});
  const [communityData, setCommunityData] = useState<Partial<CommunityData>>({});
  const [eventData, setEventData] = useState<Partial<EventData>>({});
  const [standaloneEvent, setStandaloneEvent] = useState<any>({
    id: 'e1',
    title: 'Advanced AI Engineering for Creators',
    description: 'Learn how to leverage LLMs and diffusion models to automate your creative workflow. This session covers the latest patterns for AI-assisted content creation.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000',
    hostName: 'Sarah Chen',
    hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    hostBio: 'Principal AI Researcher at TrueLeap. Expert in human-AI collaboration and creator economy tools.',
    startDate: 'Tuesday, Feb 10',
    time: '2:00 PM',
    timezone: 'EST',
    duration: 60,
    eventType: 'virtual',
    category: ['AI', 'Creation', 'Automation'],
    registrationCount: 1240,
    capacity: 2000,
    tags: ['Workshop', 'Live Coding'],
    tickets: [
      { id: '1', name: 'General Admission', price: 49, quantity: 500, description: 'Access to the live workshop' },
      { id: '2', name: 'VIP Access', price: 149, quantity: 50, description: 'Live workshop + Private Q&A + Recording' }
    ]
  });
  const [contentType, setContentType] = useState<'course' | 'community' | 'event'>('course');
  const [userMode, setUserMode] = useState<'creator' | 'learner'>('creator');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [settingsTab, setSettingsTab] = useState<'general' | 'integrations' | 'notifications' | 'billing' | 'profile' | 'security'>('general');
  const [showSocialPackModal, setShowSocialPackModal] = useState(false);

  // Meeting state for minimized/full meeting view
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isMeetingMinimized, setIsMeetingMinimized] = useState(false);
  const [meetingData, setMeetingData] = useState<{
    eventTitle: string;
    eventCode: string;
    micEnabled: boolean;
    videoEnabled: boolean;
  } | null>(null);
  const [stageBeforeMeeting, setStageBeforeMeeting] = useState<Stage>('home');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isInvitationsPath = getInvitationScenarioFromPath() !== null;
    const scenarioPathMap: Record<InvitationScenario, string> = {
      hub: '/invitations',
      'first-time': '/first-time',
      'existing-user': '/existing-user',
      success: '/success',
      expired: '/expired',
      revoked: '/revoked',
      'wrong-account': '/wrong-account',
      'already-member': '/already-member',
    };

    if (stage === 'invitations' && !isInvitationsPath) {
      window.history.pushState({}, '', scenarioPathMap[invitationScenario]);
    }

    if (stage !== 'invitations' && isInvitationsPath) {
      window.history.pushState({}, '', '/');
    }
  }, [stage, invitationScenario]);

  // FOR TESTING: Uncomment to start in a meeting
  // useState(() => {
  //   handleJoinMeeting('React 18 Deep Dive Workshop', 'REACT2024');
  // });

  const handleStart = (prompt: string, mode?: 'creator' | 'learner', type?: 'course' | 'community' | 'event') => {
    // Create initial user message from the welcome screen prompt
    const initialMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };
    
    const selectedMode = mode || userMode;
    const selectedType = type || 'course';
    
    setConversation({ 
      messages: [initialMessage],
      mode: selectedMode
    });
    setUserMode(selectedMode);
    setContentType(selectedType);
    
    // Learners go to marketplace, creators go to chat
    if (selectedMode === 'learner') {
      setStage('marketplace');
    } else {
      setStage('chat');
    }
  };

  const handleCourseComplete = (data: Partial<CourseData>) => {
    setCourseData(data);
    setStage('course-preview');
  };

  const handleCommunityComplete = (data: Partial<CommunityData>) => {
    setCommunityData(data);
    setStage('community-preview'); // Show preview first instead of going directly to builder
  };

  const handleEventComplete = (data: Partial<EventData>) => {
    const checklist = buildCompletionChecklist(data);
    const enriched: Partial<EventData> = {
      ...data,
      status: 'draft',
      lifecycleStage: deriveLifecycleStage(checklist),
      completionChecklist: checklist,
    };
    setEventData(enriched);
    setStage('event-preview');
  };

  const handleBack = () => {
    if (stage === 'course-builder' || stage === 'community-builder') {
      setStage('chat');
    } else {
      setStage('welcome');
    }
  };

  const handleModeChange = (mode: 'creator' | 'learner') => {
    setUserMode(mode);
    setConversation(prev => ({ ...prev, mode }));
    
    // Switch between marketplace and chat based on mode
    if (mode === 'learner' && stage === 'chat') {
      setStage('marketplace');
    } else if (mode === 'creator' && stage === 'marketplace') {
      setStage('chat');
    }
  };

  const handleNewClick = () => {
    setStage('welcome');
    setConversation({ messages: [] });
    setCourseData({});
    setCommunityData({});
    setSelectedItemId(null);
  };

  const handleNavigation = (page: 'home' | 'communities' | 'courses' | 'events' | 'events-explore' | 'events-calendar' | 'settings' | 'my-drive' | 'permissions' | 'event-landing') => {
    switch (page) {
      case 'home':
        setStage('home');
        break;
      case 'communities':
        setStage('communities-list');
        break;
      case 'courses':
        setStage('courses-list');
        break;
      case 'events':
      case 'events-explore':
        setStage('events-list');
        break;
      case 'events-calendar':
        setStage('events-calendar');
        break;
      case 'settings':
        setSettingsTab('general'); // Reset to general when clicking settings from sidebar
        setStage('settings');
        break;
      case 'my-drive':
        setStage('my-drive');
        break;
      case 'permissions':
        setStage('permissions-dashboard');
        break;
      case 'event-landing':
        setStage('event-landing');
        break;
    }
  };

  const handleInvitationsNavigation = () => {
    setInvitationScenario('hub');
    setStage('invitations');
  };

  const handleInvitationScenarioNavigation = (scenario: InvitationScenario) => {
    setInvitationScenario(scenario);
    setStage('invitations');
  };

  const handleOpenGlobalSettings = (tab: 'general' | 'integrations' | 'notifications' | 'billing' | 'profile' | 'security' = 'general') => {
    setSettingsTab(tab);
    setStage('profile-settings');
  };

  const handleOpenProfileSettings = () => {
    handleOpenGlobalSettings('profile');
  };

  // Meeting handlers
  const handleJoinMeeting = (eventTitle: string, eventCode: string) => {
    setStageBeforeMeeting(stage);
    setMeetingData({
      eventTitle,
      eventCode,
      micEnabled: true,
      videoEnabled: true
    });
    setIsInMeeting(true);
    setIsMeetingMinimized(false);
    setStage('event-meeting');
  };

  const handleMinimizeMeeting = () => {
    setIsMeetingMinimized(true);
    setStage(stageBeforeMeeting); // Return to previous view
  };

  const handleMaximizeMeeting = () => {
    setIsMeetingMinimized(false);
    setStage('event-meeting');
  };

  const handleLeaveMeeting = () => {
    setIsInMeeting(false);
    setIsMeetingMinimized(false);
    setMeetingData(null);
    // Stay on current page
  };

  const handleEndEvent = () => {
    setIsInMeeting(false);
    setIsMeetingMinimized(false);
    setMeetingData(null);
    
    // Update event status to past
    setStandaloneEvent(prev => ({
      ...prev,
      status: 'past' as const
    }));

    // Set the selected item ID for the unified page
    if (standaloneEvent && standaloneEvent.id) {
        setSelectedItemId(standaloneEvent.id);
    }
    
    // Redirect to the Unified Event Page (Dashboard/Post-Event View)
    // This matches the "Past Events" list behavior
    if (stage === 'event-meeting' || stage === 'event-meeting-guest') {
      setStage('unified-event');
    }
  };

  const handleToggleMeetingMic = () => {
    if (meetingData) {
      setMeetingData({
        ...meetingData,
        micEnabled: !meetingData.micEnabled
      });
    }
  };

  const handleToggleMeetingVideo = () => {
    if (meetingData) {
      setMeetingData({
        ...meetingData,
        videoEnabled: !meetingData.videoEnabled
      });
    }
  };

  // Guest mode handlers
  const handleContinueAsGuest = () => {
    setIsGuest(true);
    setIsAuthenticated(false);
    setStage('chat'); // Redirect to AI prompt page
  };

  const handleTriggerUpgrade = (trigger: 'publish' | 'private' | 'download' | 'share' | 'credits' | 'paid') => {
    if (isGuest) {
      setUpgradeTrigger(trigger);
      setShowUpgradeModal(true);
    }
  };

  const handleUseCredit = () => {
    if (isGuest && guestCredits > 0) {
      setGuestCredits(prev => prev - 1);
      if (guestCredits - 1 === 0) {
        handleTriggerUpgrade('credits');
      }
    }
  };

  const handleOnboardingComplete = (data: { interests: string[], goals: string[], profile?: { name: string, role: string, company: string } }) => {
    localStorage.setItem('leapspace_onboarded', 'true');
    localStorage.setItem('user_interests', JSON.stringify(data.interests));
    localStorage.setItem('user_goals', JSON.stringify(data.goals));
    if (data.profile) {
      localStorage.setItem('user_profile', JSON.stringify(data.profile));
    }
    setShowOnboarding(false);
    setStage('home');
  };

  // Auth handlers
  const handleSignInContinue = (identifier: string, type: 'email' | 'phone', countryCode?: string) => {
    // Store pending auth info
    setPendingAuth({ identifier, type, countryCode });
    
    // Navigate to appropriate verification screen
    if (type === 'phone') {
      setStage('otp-verification');
    } else {
      setStage('magic-link-sent');
    }
  };

  const handlePasswordLogin = (identifier: string, password: string, type: 'email' | 'phone') => {
    console.log('Password login attempted:', identifier, type);
    
    // In real app, verify password with backend
    // For demo, simulate successful authentication
    setTimeout(() => {
      const testUser = TEST_USERS[identifier];
      const newUser = {
        id: Date.now().toString(),
        name: testUser?.name || 'Demo User',
        email: identifier,
        credits: 1000,
        tier: 'free' as const
      };
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      setIsGuest(false);
      localStorage.setItem('leapspace_user', JSON.stringify(newUser));
      
      // Sync AuthContext so views can detect the empty-state user
      if (testUser) {
        authContextLogin(identifier);
      }
      
      // Empty-state user skips onboarding to go straight to empty dashboard
      if (identifier === 'empty@email.com') {
        setStage('home');
      } else {
        const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeenOnboarding) {
          setShowOnboarding(true);
        } else {
          setStage('home');
        }
      }
    }, 1000);
  };

  const handleOTPVerify = (otp: string) => {
    console.log('✅ handleOTPVerify called');
    // Mock OTP verification success
    const user = {
      name: pendingAuth?.name || '', 
      email: pendingAuth?.type === 'email' ? pendingAuth.identifier : `user+${pendingAuth?.identifier}@phone.com`,
      phone: pendingAuth?.type === 'phone' ? pendingAuth.identifier : undefined,
      avatar: undefined
    };
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    setIsGuest(false);
    localStorage.setItem('leapspace_user', JSON.stringify(user));
    
    // If name is missing, go to profile completion
    if (!pendingAuth?.name) {
      console.log('📝 Name missing in OTP verify, going to profile-completion');
      setStage('profile-completion');
    } else {
      setPendingAuth(null);
      setStage('home');
    }
  };

  const handleMagicLinkVerify = () => {
    console.log('✅ handleMagicLinkVerify called');
    // In real app, this would be called from magic link click
    // For demo, we'll simulate auto sign-in after a delay
    const user = {
      name: pendingAuth?.name || '',
      email: pendingAuth?.identifier || '',
      avatar: undefined
    };
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    setIsGuest(false);
    localStorage.setItem('leapspace_user', JSON.stringify(user));
    
    // If name is missing, go to profile completion
    if (!pendingAuth?.name) {
      console.log('📝 Name missing in Magic Link verify, going to profile-completion');
      setStage('profile-completion');
    } else {
      setPendingAuth(null);
      setStage('home');
    }
  };

  const handleRegisterContinue = (data: { name: string; identifier: string; type: 'email' | 'phone'; countryCode?: string }) => {
    console.log('🔵 handleRegisterContinue called with:', data);
    
    // Check for duplicate account (mock detection)
    const existingAccounts = JSON.parse(localStorage.getItem('leapspace_all_accounts') || '[]');
    console.log('🔵 Existing accounts in localStorage:', existingAccounts);
    
    const duplicateFound = existingAccounts.find((acc: any) => acc.email === data.identifier || acc.phone === data.identifier);
    console.log('🔵 Duplicate found:', duplicateFound);

    if (duplicateFound) {
      console.log('🟢 DUPLICATE DETECTED! Setting up merge screen...');
      
      // Show merge detection screen
      setDuplicateAccount({
        provider: duplicateFound.provider || (data.type === 'email' ? 'Email' : 'Phone'),
        email: duplicateFound.email || data.identifier,
        createdDate: duplicateFound.createdDate || 'Dec 2024',
        coursesCount: duplicateFound.coursesCount || 3,
        communitiesCount: duplicateFound.communitiesCount || 2,
        eventsCount: duplicateFound.eventsCount || 1,
        achievementsCount: duplicateFound.achievementsCount || 5,
      });
      
      setNewAccount({
        provider: data.type === 'email' ? 'Email' : 'Phone',
        email: data.type === 'email' ? data.identifier : `user@phone.com`,
        createdDate: 'Today',
        coursesCount: 0,
        communitiesCount: 0,
        eventsCount: 0,
        achievementsCount: 0,
      });
      
      console.log('🟢 Setting stage to account-merge');
      setStage('account-merge');
      return;
    }

    console.log('🔵 No duplicate found, proceeding with normal registration');
    
    // Store registration data and proceed to verification
    setPendingAuth({ 
      identifier: data.identifier, 
      type: data.type, 
      countryCode: data.countryCode,
      name: data.name 
    });
    
    // Navigate to appropriate verification screen
    if (data.type === 'phone') {
      console.log('🔵 Going to OTP verification');
      setStage('otp-verification');
    } else {
      console.log('🔵 Going to magic link sent');
      setStage('magic-link-sent');
    }
  };

  const handleSocialAuth = (provider: string) => {
    // Show connecting screen first
    setConnectingProvider(provider);
    setShowSocialConnecting(true);
  };

  const handleSocialConnectingComplete = () => {
    // Hide connecting screen
    setShowSocialConnecting(false);
    
    const provider = connectingProvider;
    
    // Mock email for social auth
    const email = `user@${provider.toLowerCase()}.com`;
    
    // Check for duplicate account (mock detection)
    const existingAccounts = JSON.parse(localStorage.getItem('leapspace_all_accounts') || '[]');
    const duplicateFound = existingAccounts.find((acc: any) => acc.email === email || acc.provider === provider);

    if (duplicateFound && duplicateFound.provider !== provider) {
      // Show merge detection screen
      setDuplicateAccount({
        provider: duplicateFound.provider,
        email: duplicateFound.email,
        createdDate: duplicateFound.createdDate || 'Dec 2024',
        coursesCount: duplicateFound.coursesCount || 3,
        communitiesCount: duplicateFound.communitiesCount || 2,
        eventsCount: duplicateFound.eventsCount || 1,
        achievementsCount: duplicateFound.achievementsCount || 5,
      });
      
      setNewAccount({
        provider: provider,
        email: email,
        createdDate: 'Today',
        coursesCount: 0,
        communitiesCount: 0,
        eventsCount: 0,
        achievementsCount: 0,
      });
      
      setStage('account-merge');
      return;
    }

    // Mock social auth
    const user = {
      name: `${provider} User`,
      email: email,
      avatar: undefined,
      isNewUser: !duplicateFound
    };
    
    setCurrentUser(user);
    setIsAuthenticated(true);
    setIsGuest(false);
    localStorage.setItem('leapspace_user', JSON.stringify(user));
    
    // Add to all accounts for future duplicate detection
    if (!duplicateFound) {
      existingAccounts.push({ 
        email: email, 
        provider: provider, 
        createdDate: 'Today', 
        coursesCount: 0, 
        communitiesCount: 0, 
        eventsCount: 0, 
        achievementsCount: 0 
      });
      localStorage.setItem('leapspace_all_accounts', JSON.stringify(existingAccounts));
    }
    
    // Check if onboarding already completed or returning user
    const onboarded = localStorage.getItem('leapspace_onboarded');
    if (!onboarded && !duplicateFound) {
      setShowOnboarding(true);
      setStage('onboarding');
    } else {
      setStage('home');
    }
  };

  const handleMergeAccounts = (keepPrimary: boolean) => {
    // Mock merge logic
    if (duplicateAccount && newAccount) {
      const merged = {
        name: keepPrimary && duplicateAccount ? duplicateAccount.email.split('@')[0] : newAccount.email.split('@')[0],
        email: keepPrimary && duplicateAccount ? duplicateAccount.email : newAccount.email,
        avatar: undefined,
        isNewUser: false,
        // Combine data
        coursesCount: (duplicateAccount.coursesCount || 0) + (newAccount.coursesCount || 0),
        communitiesCount: (duplicateAccount.communitiesCount || 0) + (newAccount.communitiesCount || 0),
        eventsCount: (duplicateAccount.eventsCount || 0) + (newAccount.eventsCount || 0),
        achievementsCount: (duplicateAccount.achievementsCount || 0) + (newAccount.achievementsCount || 0),
      };
      
      setCurrentUser(merged);
      setIsAuthenticated(true);
      setIsGuest(false);
      localStorage.setItem('leapspace_user', JSON.stringify(merged));
      setShowMergeModal(false);
      setShowMergeBanner(true); // Show success banner
      setStage('home');
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsGuest(false); // Exit guest mode too
    localStorage.removeItem('leapspace_user');
    setStage('signin');
  };

  const handleForgotPasswordLinkSent = (email: string) => {
    // In real app, this would trigger email
    // Store email and mock token for demo
    setResetPasswordEmail(email);
    setResetPasswordToken('mock-reset-token-' + Date.now());
    
    // For demo, automatically navigate to reset password page
    // In production, user would click link in email
    setTimeout(() => {
      setStage('reset-password');
    }, 2000);
  };

  const handlePasswordReset = () => {
    // Password successfully reset
    // Navigate to signin
    setResetPasswordEmail('');
    setResetPasswordToken('');
    setStage('signin');
  };

  // Auth screens for non-authenticated users OR when explicitly navigating to auth screens
  const authStages: Stage[] = ['signin', 'register', 'forgot-password', 'reset-password', 'all-login-methods', 'otp-verification', 'magic-link-sent', 'account-merge', 'profile-completion'];
  const isAuthStage = authStages.includes(stage);
  
  // Check if we're on the integrations page (for new tab navigation)
  if (typeof window !== 'undefined' && window.location.pathname === '/integrations') {
    return <IntegrationsLibraryEnhanced />;
  }

  // Social Connecting Screen (shows during OAuth flow) - CHECK THIS FIRST!
  if (showSocialConnecting && connectingProvider) {
    return (
      <SocialConnectingScreen
        provider={connectingProvider}
        onComplete={handleSocialConnectingComplete}
      />
    );
  }

  if (stage === 'invitations') {
    return (
      <InvitationsPage
        scenario={invitationScenario}
        currentUser={currentUser}
        isGuest={isGuest}
        onLogoClick={() => setStage(isAuthenticated ? 'home' : 'signin')}
        onOpenWorkspace={() => setStage('home')}
        onCreateAccount={() => setStage('register')}
        onSignIn={() => setStage('signin')}
        onNavigateToScenario={handleInvitationScenarioNavigation}
      />
    );
  }
  
  if (stage === 'profile-completion') {
    console.log('📝 Rendering Profile Completion screen. currentUser:', currentUser);
    return (
      <ProfileCompletionCard
        onComplete={(name) => {
          console.log('✅ Profile completion successful for:', name);
          if (currentUser) {
            const updatedUser = { ...currentUser, name };
            setCurrentUser(updatedUser);
            localStorage.setItem('leapspace_user', JSON.stringify(updatedUser));
          }
          setPendingAuth(null);
          setStage('home');
        }}
        onLogoClick={() => setStage('welcome')}
      />
    );
  }

  if (!isAuthenticated && (isAuthStage || !isGuest)) {
    console.log('🔴 IN AUTH BLOCK - stage:', stage, 'isAuthStage:', isAuthStage, 'isGuest:', isGuest);
    
    // OTP Verification Screen
    if (stage === 'otp-verification' && pendingAuth) {
      console.log('🔴 Rendering OTP Verification');
      return (
        <OTPVerification
          phone={pendingAuth.identifier}
          countryCode={pendingAuth.countryCode || '+1'}
          onVerify={handleOTPVerify}
          onBack={() => {
            setPendingAuth(null);
            setStage(pendingAuth.name ? 'register' : 'signin');
          }}
          onResendCode={() => {
            // Mock resend
            console.log('Resending OTP to', pendingAuth.countryCode, pendingAuth.identifier);
          }}
        />
      );
    }

    // Magic Link Sent Screen
    if (stage === 'magic-link-sent' && pendingAuth) {
      return (
        <MagicLinkSent
          email={pendingAuth.identifier}
          onBack={() => {
            setPendingAuth(null);
            setStage(pendingAuth.name ? 'register' : 'signin');
          }}
          onResendLink={() => {
            // Mock resend
            console.log('Resending magic link to', pendingAuth.identifier);
          }}
          onVerify={handleMagicLinkVerify}
        />
      );
    }

    if (stage === 'register') {
      return (
        <>
          <Register
            onContinue={handleRegisterContinue}
            onNavigateToSignIn={() => setStage('signin')}
            onSocialAuth={handleSocialAuth}
            onContinueAsGuest={handleContinueAsGuest}
            onShowAllMethods={() => setStage('all-login-methods')}
            onLogoClick={() => setStage('welcome')}
          />
          
          {/* Account Merge Modal */}
          {showMergeModal && duplicateAccount && newAccount && (
            <AccountMergeModal
              isOpen={showMergeModal}
              onClose={() => {
                setShowMergeModal(false);
                setStage('home');
              }}
              onMerge={handleMergeAccounts}
              detectedAccount={duplicateAccount}
              currentAccount={newAccount}
            />
          )}
        </>
      );
    }

    if (stage === 'signin') {
      return (
        <>
          <SignIn
            onContinue={handleSignInContinue}
            onAuthComplete={(user) => {
              setCurrentUser(user);
              setIsAuthenticated(true);
              setIsGuest(false);
              localStorage.setItem('leapspace_user', JSON.stringify(user));
              
              // Sync AuthContext for empty-state user detection
              if (user.email && TEST_USERS[user.email]) {
                authContextLogin(user.email);
              }
              
              // If name is missing, go to profile completion
              if (!user.name) {
                setStage('profile-completion');
              } else {
                setStage('home');
              }
            }}
            onNavigateToRegister={() => setStage('register')}
            onSocialAuth={handleSocialAuth}
            onContinueAsGuest={handleContinueAsGuest}
            onShowAllMethods={() => setStage('all-login-methods')}
            onLogoClick={() => setStage('home')}
            onPasswordLogin={handlePasswordLogin}
            onForgotPassword={() => setStage('forgot-password')}
          />
          
          {/* Account Merge Modal */}
          {showMergeModal && duplicateAccount && newAccount && (
            <AccountMergeModal
              isOpen={showMergeModal}
              onClose={() => {
                setShowMergeModal(false);
                setStage('home');
              }}
              onMerge={handleMergeAccounts}
              detectedAccount={duplicateAccount}
              currentAccount={newAccount}
            />
          )}
        </>
      );
    }

    if (stage === 'all-login-methods') {
      return (
        <AllLoginMethods
          onBack={() => setStage('signin')}
          onSelectMethod={handleSocialAuth}
          userRegion="IN"
          onLogoClick={() => setStage('home')}
        />
      );
    }

    if (stage === 'forgot-password') {
      return (
        <ForgotPassword
          onBackToSignIn={() => setStage('signin')}
          onResetLinkSent={handleForgotPasswordLinkSent}
        />
      );
    }

    // Account Merge Screen - when duplicate detected
    if (stage === 'account-merge' && duplicateAccount && newAccount) {
      return (
        <AccountMergeScreen
          detectedAccount={duplicateAccount}
          currentAccount={newAccount}
          onMerge={handleMergeAccounts}
          onKeepSeparate={() => {
            // User chooses to keep accounts separate
            // Continue with the new account registration
            setDuplicateAccount(null);
            setNewAccount(null);
            
            // If it's an email registration, go to magic link sent
            // If it's phone, go to OTP verification
            if (pendingAuth?.type === 'phone') {
              setStage('otp-verification');
            } else {
              setStage('magic-link-sent');
            }
          }}
        />
      );
    }

    // Reset Password Screen
    if (stage === 'reset-password' && resetPasswordEmail && resetPasswordToken) {
      return (
        <ResetPassword
          email={resetPasswordEmail}
          token={resetPasswordToken}
          onPasswordReset={handlePasswordReset}
          onBackToSignIn={() => setStage('signin')}
        />
      );
    }

    // Default to signin
    return (
      <SignIn
        onContinue={handleSignInContinue}
        onNavigateToRegister={() => setStage('register')}
        onSocialAuth={handleSocialAuth}
        onContinueAsGuest={handleContinueAsGuest}
        onShowAllMethods={() => setStage('all-login-methods')}
      />
    );
  }

  // Full Meeting Room View
  if (stage === 'event-meeting' && isInMeeting && meetingData && !isMeetingMinimized) {
    return (
      <EventMeetingRoom
        eventTitle={meetingData.eventTitle}
        eventCode={meetingData.eventCode}
        onLeaveEvent={handleLeaveMeeting}
        onMinimize={handleMinimizeMeeting}
        micEnabled={meetingData.micEnabled}
        videoEnabled={meetingData.videoEnabled}
        onMicToggle={handleToggleMeetingMic}
        onVideoToggle={handleToggleMeetingVideo}
        userRole={userMode === 'creator' ? 'host' : 'participant'}
        onEndEvent={handleEndEvent}
      />
    );
  }

  // Render function to wrap content with minimized meeting overlay
  const renderWithMeetingOverlay = (content: React.ReactNode) => {
    return (
      <>
        {content}
        {isMeetingMinimized && meetingData && (
          <MinimizedMeetWindow
            eventTitle={meetingData.eventTitle}
            participantCount={6}
            micEnabled={meetingData.micEnabled}
            videoEnabled={meetingData.videoEnabled}
            onToggleMic={handleToggleMeetingMic}
            onToggleVideo={handleToggleMeetingVideo}
            onMaximize={handleMaximizeMeeting}
            onLeave={handleLeaveMeeting}
          />
        )}
      </>
    );
  };

  // Permissions Dashboard View
  if (stage === 'permissions-dashboard') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="home" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onInvitationsClick={handleInvitationsNavigation}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <PermissionsDashboard />
      </AppLayout>
    );
  }

  // Course Player View (Learner Experience)
  if (stage === 'course-player') {
    return (
      <CoursePlayer 
        courseId={selectedItemId || 'default'} 
        onBack={() => setStage('courses-list')} 
        onJoinLiveEvent={() => handleJoinMeeting('Advanced Patterns Live Workshop', 'REACT-LIVE')}
      />
    );
  }

  // My Drive View
  if (stage === 'my-drive') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="home" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onInvitationsClick={handleInvitationsNavigation}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <MyDrive />
      </AppLayout>
    );
  }

  // Event Landing Page (Public)
  if (stage === 'event-landing') {
    return (
      <PublicEventLanding 
        event={{
          ...(selectedEvent || standaloneEvent),
          ...eventData,
          schedule: eventData.schedule
        }} 
        onBack={() => {
          if (selectedItemId) {
            setStage('event-builder');
          } else {
            setStage('events-list');
          }
        }}
        onEnterLiveEvent={() => setStage('event-meeting-guest')}
        onJoinLeapSpace={() => setStage('signin')}
      />
    );
  }

  // Event Meeting Room (Guest Experience)
  if (stage === 'event-meeting-guest') {
    return (
      <EventMeetingRoom 
        eventTitle={standaloneEvent.title} 
        eventCode="GUEST-MODE" 
        onLeaveEvent={() => setStage('event-landing')}
        onMinimize={() => {
          setIsMeetingMinimized(true);
          setStage('event-landing');
        }}
      />
    );
  }

  // Home Overview
  if (stage === 'home') {
    return renderWithMeetingOverlay(
      <>
        <AppLayout 
          currentPage="home" 
          showBanner={true} 
          onNewClick={handleNewClick} 
          onNavClick={handleNavigation}
          currentUser={currentUser}
          onSignOut={handleSignOut}
          onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
          onSignIn={() => {
            console.log('🟠 onSignIn handler called - setting stage to signin');
            console.log('🟠 Current stage before:', stage);
            console.log('🟠 Current isGuest:', isGuest);
            console.log('🟠 Current isAuthenticated:', isAuthenticated);
            setStage('signin');
            console.log('🟠 setStage(signin) called!');
          }}
          isGuest={isGuest}
          guestCredits={guestCredits}
          onGuestSignUp={() => setStage('register')}
        >
          <HomeOverview 
            onCreateClick={handleNewClick}
            onJoinTestMeeting={() => handleJoinMeeting('React 18 Deep Dive Workshop', 'REACT2024')}
            onOpenSocialPack={() => setStage('social-pack')}
            onOpenNewsletter={() => setStage('newsletter')}
            onOpenPhase1Demo={() => setStage('phase1-demo')}
            onContinueBuildingDraft={(id) => {
              setSelectedItemId(id);
              setStage('unified-event');
            }}
          />
        </AppLayout>
        
        {/* Upgrade Modal */}
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          onSignUp={() => {
            setShowUpgradeModal(false);
            setStage('register');
          }}
          onSignIn={() => {
            setShowUpgradeModal(false);
            setStage('signin');
          }}
          trigger={upgradeTrigger}
        />
      </>
    );
  }

  // Welcome Screen (Prompt Page)
  if (stage === 'welcome') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="home" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onInvitationsClick={handleInvitationsNavigation}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <WelcomeScreen 
          onStart={handleStart} 
          userMode={userMode}
          onModeChange={handleModeChange}
          onOpenEventsMarketplace={() => setStage('events-list')}
          onOpenEventCreator={() => handleStart('Create a new event', 'creator', 'event')}
          onOpenCRM={() => setStage('events-crm')}
        />
      </AppLayout>
    );
  }

  // Communities List View
  if (stage === 'communities-list') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="communities" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onInvitationsClick={handleInvitationsNavigation}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <CommunitiesListView
          onCommunityClick={(id) => {
            setSelectedItemId(id);
            setStage('community-builder');
          }}
          onCreateClick={() => handleStart('Create a new community', 'creator', 'community')}
        />
      </AppLayout>
    );
  }

  // Courses List View
  if (stage === 'courses-list') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="courses" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onInvitationsClick={handleInvitationsNavigation}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <CoursesListView
          onCourseClick={(id) => {
            setSelectedItemId(id);
            setStage('course-builder');
          }}
          onCreateClick={() => handleStart('Create a new course', 'creator', 'course')}
        />
      </AppLayout>
    );
  }

  // Events List View (Explore)
  if (stage === 'events-list') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="events" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onInvitationsClick={handleInvitationsNavigation}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <EventsListView
          onEventClick={(id) => {
            setSelectedItemId(id);
            setStage('unified-event'); // PHASE 2: Use unified event page
          }}
          onCreateClick={() => handleStart('Create a new event', 'creator', 'event')}
          onCreateManualClick={(data) => {
            const checklist = buildCompletionChecklist(data);
            const enriched: Partial<EventData> = {
              ...data,
              status: 'draft',
              lifecycleStage: deriveLifecycleStage(checklist),
              completionChecklist: checklist,
              schedule: [],
              attendees: [],
              speakers: [],
              tickets: [],
            };
            setEventData(enriched);
            setStage('event-builder');
          }}
          onViewPublicPage={(id) => {
            setSelectedItemId(id);
            setStage('unified-event'); // PHASE 2: Same unified page
          }}
          onJoinLiveEvent={handleJoinMeeting}
          onBrowseTemplates={() => setStage('event-templates')}
        />
      </AppLayout>
    );
  }

  // Event Templates Library Page
  if (stage === 'event-templates') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="events-list" 
        onNavClick={handleNavigation}
        copilotOpenByDefault={false}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onInvitationsClick={handleInvitationsNavigation}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <EventTemplatesPage
          onBack={() => setStage('events-list')}
          onSelectTemplate={(template) => {
            const checklist = buildCompletionChecklist({
              title: template.name,
              type: template.format,
              description: template.description,
              capacity: template.capacity,
            });
            const enriched: Partial<EventData> = {
              title: template.name,
              type: template.format,
              description: template.description,
              capacity: template.capacity,
              status: 'draft',
              lifecycleStage: deriveLifecycleStage(checklist),
              completionChecklist: checklist,
              schedule: [],
              attendees: [],
              speakers: [],
              tickets: [],
            };
            if (template.pricing === 'paid' && template.suggestedPrice) {
              (enriched as any).isPaid = true;
              (enriched as any).price = template.suggestedPrice;
            }
            setEventData(enriched);
            setStage('event-builder');
          }}
          onCreateBlank={() => setStage('events-list')}
          onCreateWithAI={() => handleStart('Create a new event', 'creator', 'event')}
        />
      </AppLayout>
    );
  }

  // Events Calendar View
  if (stage === 'events-calendar') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="events-calendar" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onInvitationsClick={handleInvitationsNavigation}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <CalendarView
          onCreateClick={() => handleStart('Create a new event', 'creator', 'event')}
          onNavigateToEvent={(eventId) => {
            setSelectedItemId(eventId);
            setStage('unified-event');
          }}
        />
      </AppLayout>
    );
  }

  // Events CRM (Global view)
  if (stage === 'events-crm') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="events" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onInvitationsClick={handleInvitationsNavigation}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <EventsCRM />
      </AppLayout>
    );
  }

  // Marketplace (Learner view)
  if (stage === 'marketplace') {
    return renderWithMeetingOverlay(
      <MarketplaceView
        conversation={conversation}
        onUpdateConversation={setConversation}
        userMode={userMode}
        onModeChange={handleModeChange}
        onBack={handleBack}
      />
    );
  }

  // ChatFlow (3-step AI conversation)
  if (stage === 'chat') {
    return renderWithMeetingOverlay(
      <ChatFlow
        conversation={conversation}
        onUpdateConversation={setConversation}
        onCourseComplete={handleCourseComplete}
        onCommunityComplete={handleCommunityComplete}
        onEventComplete={handleEventComplete}
        contentType={contentType}
        appVersion={appVersion}
        onVersionChange={setAppVersion}
        userMode={userMode}
        onModeChange={handleModeChange}
      />
    );
  }

  // Community Preview (Generation loading screen)
  if (stage === 'community-preview') {
    return renderWithMeetingOverlay(
      <CommunityGenerationPreview
        communityData={communityData}
        onComplete={() => setStage('community-builder')}
      />
    );
  }

  // Community Builder
  if (stage === 'community-builder') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="communities" 
        showBanner={true} 
        onNewClick={handleNewClick}
        onNavClick={handleNavigation}
        copilotOpenByDefault={true}
        copilotContext="community"
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <CommunityBuilderView
          conversation={conversation}
          onUpdateMessages={(messages) => setConversation({ messages })}
          communityData={communityData}
          onBack={handleBack}
          appVersion={appVersion}
          onVersionChange={setAppVersion}
          userMode={userMode}
          onModeChange={handleModeChange}
          onNavigateToSettings={() => {
            setSettingsTab('integrations');
            setStage('settings');
          }}
          onCreateCourse={() => handleStart('Create a course for my community members', 'creator', 'course')}
          onCreateEvent={() => handleStart('Create an event for my community', 'creator', 'event')}
        />
      </AppLayout>
    );
  }

  // Course Preview (Generation loading screen)
  if (stage === 'course-preview') {
    return renderWithMeetingOverlay(
      <CourseGenerationPreview
        courseData={courseData}
        onComplete={() => setStage('course-builder')}
      />
    );
  }

  // Event Preview (Generation loading screen)
  if (stage === 'event-preview') {
    return renderWithMeetingOverlay(
      <EventGenerationPreview
        eventData={eventData}
        onBack={() => setStage('chat')}
        onComplete={() => {
          // For now, just log - we'll build EventBuilder next
          console.log('Event ready to build:', eventData);
          setStage('event-builder');
        }}
      />
    );
  }

  // PHASE 2: Unified Event Page (Role-Based Rendering)
  if (stage === 'unified-event' && selectedItemId) {
    return renderWithMeetingOverlay(
      <UnifiedEventPage
        eventId={selectedItemId}
        onBack={() => setStage('events-list')}
        onJoinEvent={handleJoinMeeting}
        onCreateCommunity={() => handleStart('Create a community for my event attendees', 'creator', 'community')}
        onOpenCalendar={() => setStage('events-calendar')}
      />
    );
  }

  // Event Builder
  if (stage === 'event-builder') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="events" 
        showBanner={true} 
        onNewClick={handleNewClick}
        onNavClick={handleNavigation}
        copilotContext="event"
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <EventBuilderViewV2
          conversation={conversation}
          onUpdateMessages={(messages) => setConversation({ messages })}
          eventData={eventData}
          onBack={handleBack}
          appVersion={appVersion}
          onVersionChange={setAppVersion}
          userMode={userMode}
          onModeChange={handleModeChange}
          onJoinEvent={handleJoinMeeting}
          onUpdateEventData={(data) => setEventData(prev => ({...prev, ...data}))}
          onCreateCommunity={() => handleStart('Create a community for my event attendees', 'creator', 'community')}
          onViewPublicPage={() => setStage('event-landing')}
        />
      </AppLayout>
    );
  }

  // Integrations Library
  if (stage === 'integrations') {
    return renderWithMeetingOverlay(
      <IntegrationsLibraryEnhanced onBack={() => setStage('community-builder')} />
    );
  }

  // Settings Page
  if (stage === 'settings') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="settings" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <GlobalSettingsPage
          initialTab={settingsTab}
          currentUser={currentUser}
          currentLeapSpace={{
            id: '1',
            name: 'My Personal Space',
            type: 'personal',
            communitiesCount: 5,
            coursesCount: 12,
            eventsCount: 8,
          }}
        />
      </AppLayout>
    );
  }

  if (stage === 'profile-settings') {
    return renderWithMeetingOverlay(
      <ProfileSettingsPage
        currentUser={currentUser}
        initialSection={settingsTab === 'billing' ? 'billing' : settingsTab === 'integrations' ? 'api-tokens' : settingsTab === 'security' ? 'authentication' : 'settings'}
        onBack={() => setStage('home')}
      />
    );
  }

  // Social Pack Generator
  if (stage === 'social-pack') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="social-pack" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <SocialPackGenerator />
      </AppLayout>
    );
  }

  // Newsletter Automation
  if (stage === 'newsletter') {
    return renderWithMeetingOverlay(
      <AppLayout 
        currentPage="newsletter" 
        showBanner={true} 
        onNewClick={handleNewClick} 
        onNavClick={handleNavigation}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onSignIn={() => setStage('signin')}
        isGuest={isGuest}
        guestCredits={guestCredits}
        onGuestSignUp={() => setStage('register')}
      >
        <NewsletterAutomation />
      </AppLayout>
    );
  }

  // Phase 1 Demo - Event Platform Prototypes
  if (stage === 'phase1-demo') {
    return renderWithMeetingOverlay(
      <Phase1Demo onBack={() => setStage('home')} />
    );
  }

  // Course Builder (default fallback)
  return renderWithMeetingOverlay(
    <AppLayout 
      currentPage="courses" 
      showBanner={true} 
      onNewClick={handleNewClick}
      onNavClick={handleNavigation}
      copilotContext="course"
      currentUser={currentUser}
      onSignOut={handleSignOut}
      onProfileClick={handleOpenProfileSettings}
        onSettingsClick={handleOpenGlobalSettings}
      onInvitationsClick={handleInvitationsNavigation}
      onSignIn={() => setStage('signin')}
      isGuest={isGuest}
      guestCredits={guestCredits}
      onGuestSignUp={() => setStage('register')}
    >
      <CourseBuilderViewV3
        conversation={conversation}
        onUpdateMessages={(messages) => setConversation({ messages })}
        courseData={courseData}
        onBack={handleBack}
        appVersion={appVersion}
        onVersionChange={setAppVersion}
        userMode={userMode}
        onModeChange={handleModeChange}
        onCreateCommunity={() => handleStart('Create a community for my course students', 'creator', 'community')}
      />
    </AppLayout>
  );
}

// Wrap with AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

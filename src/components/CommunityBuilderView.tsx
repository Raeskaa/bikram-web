import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Users as UsersIcon, Hash, Image as ImageIcon, FileText, Trophy, Award, Star, MessageSquare, Pin, ChevronDown, Bell, Settings as SettingsIcon, Search, Plus, Palette, GraduationCap, Smile, MoreVertical, TrendingUp, Check, X, Calendar, UserPlus, Eye, MessageCircle, ThumbsUp, Clock, ChevronRight, Filter, Home, BookOpen, BarChart3, Shield, Flag, Bookmark, Upload, Link, Video, Paperclip, AtSign, ChevronLeft, Edit, Trash2, Lock, Unlock, UserMinus, AlertCircle, Zap, TrendingDown, Activity, Mail, Lightbulb, Target, Wand2, Copy, ExternalLink, Bot, Brain, Rocket, Users2, Gauge, PlayCircle, CheckCircle, RefreshCw, Command, MousePointer, Mic, Volume2, Play, Pause, BarChart, GitBranch, Workflow, Cpu, Radio, Radar, Network, UserCheck, Heart, ThumbsDown, Flame, Coffee, CalendarDays, ListChecks, Boxes, Layers, Grid3x3, BookMarked, CircleDot, Ban, UserX, MoveRight, Info, Phone, MapPin } from 'lucide-react';
import { CommunityData, Conversation, Message, AppVersion } from '../types';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import LeapyLogo from '../imports/Button';
import { AnalyticsView, SettingsView, EventsView } from './CommunityDashboardViews';
import { CalendarTab, AutomationTab, InsightsTab } from './AIHubTabs';
import { CommunityEventsView } from './CommunityEventsView';
import { IntegrationsLibraryEnhanced } from './IntegrationsLibraryEnhanced';
import { InviteMembersModal, MemberDetailPanel } from './MemberManagementModals';
import { EnhancedMembersPanel } from './EnhancedMembersPanel';
import { AddCourseToCommunityModal, AddEventToCommunityModal } from './LinkContentModals';
import { CommunityShell } from './CommunityShell';
import { CommunityOverviewSection } from './CommunityOverviewSection';

interface CommunityBuilderViewProps {
  conversation: Conversation;
  onUpdateMessages: (messages: Message[]) => void;
  communityData: Partial<CommunityData>;
  onBack: () => void;
  appVersion?: AppVersion;
  onVersionChange?: (version: AppVersion) => void;
  userMode?: 'creator' | 'learner';
  onModeChange?: (mode: 'creator' | 'learner') => void;
  onNavigateToSettings?: () => void;
  onCreateCourse?: () => void;
  onCreateEvent?: () => void;
}

const versionDescriptions: Record<AppVersion, string> = {
  v1: 'Intent Detection',
  v2: 'Dual-Pane',
  v3: 'Smart Toggle',
  v4: 'Context Menu',
  v5: 'Tab-Based',
  v6: 'Command Palette',
  v7: 'Persona Selection',
  v8: 'Action Cards',
};

type AICopilotMode = 'builder' | 'helper' | 'analyst';
type AIPersonality = 'professional' | 'casual' | 'enthusiastic' | 'minimal';

const copilotModes = [
  { id: 'builder' as const, label: 'Builder', icon: Rocket, description: 'Create and edit community structure' },
  { id: 'helper' as const, label: 'Helper', icon: MessageCircle, description: 'Ask questions and get guidance' },
  { id: 'analyst' as const, label: 'Analyst', icon: BarChart3, description: 'View insights and analytics' },
];

const aiPersonalities = [
  { id: 'professional' as const, label: 'Professional', description: 'Formal and concise' },
  { id: 'casual' as const, label: 'Casual', description: 'Friendly and relaxed' },
  { id: 'enthusiastic' as const, label: 'Enthusiastic', description: 'Energetic and motivating' },
  { id: 'minimal' as const, label: 'Minimal', description: 'Brief and to-the-point' },
];

const aiPlaybooks = [
  { id: 'onboarding', name: 'New Member Onboarding', icon: UserPlus, tasks: 5, automation: true },
  { id: 'engagement', name: 'Weekly Engagement Boost', icon: Zap, tasks: 7, automation: true },
  { id: 'reactivation', name: 'Inactive Member Re-engagement', icon: RefreshCw, tasks: 4, automation: false },
  { id: 'event', name: 'Event Promotion', icon: Calendar, tasks: 6, automation: true },
  { id: 'content', name: '30-Day Content Strategy', icon: FileText, tasks: 30, automation: true },
];

// Helper function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Sample members data
const sampleMembers = [
  { id: '1', name: 'Sarah Chen', status: 'online' as const, role: 'Admin', level: 5, points: 1250, title: 'Community Manager', joinDate: 'Jan 2024', bio: 'Passionate about building communities and helping people connect.', expertise: ['Community Building', 'Design', 'UX'], sentiment: 'positive', churnRisk: 5, contributorScore: 95, email: 'sarah.chen@example.com', lastActive: '5 min ago', postsCount: 156, commentsCount: 423, likesReceived: 892, joinedDate: 'Jan 15, 2024', tags: ['Power User', 'Content Creator'] },
  { id: '2', name: 'Marcus Webb', status: 'online' as const, role: 'Moderator', level: 4, points: 890, title: 'Tech Lead', joinDate: 'Jan 2024', bio: 'Full-stack developer with 10 years of experience.', expertise: ['React', 'Node.js', 'DevOps'], sentiment: 'positive', churnRisk: 12, contributorScore: 88, email: 'marcus.webb@example.com', lastActive: '10 min ago', postsCount: 89, commentsCount: 267, likesReceived: 534, joinedDate: 'Jan 22, 2024', tags: ['Technical Expert'] },
  { id: '3', name: 'Elena Rodriguez', status: 'online' as const, role: 'Member', level: 3, points: 645, title: 'Product Designer', joinDate: 'Feb 2024', bio: 'Creating beautiful and functional user experiences.', expertise: ['UI Design', 'Figma', 'Prototyping'], sentiment: 'positive', churnRisk: 8, contributorScore: 82, email: 'elena.r@example.com', lastActive: '1 hour ago', postsCount: 67, commentsCount: 189, likesReceived: 456, joinedDate: 'Feb 3, 2024', tags: ['Designer', 'Active'] },
  { id: '4', name: 'James Park', status: 'idle' as const, role: 'Member', level: 3, points: 580, title: 'Developer', joinDate: 'Feb 2024', bio: 'Building cool stuff with code.', expertise: ['JavaScript', 'Python', 'AI/ML'], sentiment: 'neutral', churnRisk: 78, contributorScore: 45, email: 'james.park@example.com', lastActive: '3 days ago', postsCount: 23, commentsCount: 45, likesReceived: 112, joinedDate: 'Feb 10, 2024', tags: ['At Risk', 'Developer'] },
  { id: '5', name: 'Aisha Kumar', status: 'online' as const, role: 'Member', level: 2, points: 420, title: 'Marketing Specialist', joinDate: 'Mar 2024', bio: 'Growth marketer focused on community-led growth.', expertise: ['Marketing', 'SEO', 'Content'], sentiment: 'positive', churnRisk: 15, contributorScore: 78, email: 'aisha.k@example.com', lastActive: '30 min ago', postsCount: 45, commentsCount: 134, likesReceived: 289, joinedDate: 'Mar 5, 2024', tags: ['Marketing', 'Active'] },
  { id: '6', name: 'Tom Anderson', status: 'offline' as const, role: 'Member', level: 2, points: 310, title: 'Content Creator', joinDate: 'Mar 2024', bio: 'Creating engaging content for online communities.', expertise: ['Writing', 'Video', 'Social Media'], sentiment: 'neutral', churnRisk: 45, contributorScore: 62, email: 'tom.a@example.com', lastActive: '2 days ago', postsCount: 34, commentsCount: 78, likesReceived: 167, joinedDate: 'Mar 12, 2024', tags: ['Content Creator'] },
  { id: '7', name: 'Lisa Wong', status: 'online' as const, role: 'Member', level: 1, points: 180, title: 'Designer', joinDate: 'Apr 2024', bio: 'Junior designer learning every day.', expertise: ['Design', 'Illustration'], sentiment: 'positive', churnRisk: 22, contributorScore: 68, email: 'lisa.w@example.com', lastActive: '2 hours ago', postsCount: 19, commentsCount: 56, likesReceived: 123, joinedDate: 'Apr 8, 2024', tags: ['New Member', 'Designer'] },
  { id: '8', name: 'David Kim', status: 'offline' as const, role: 'Member', level: 1, points: 95, title: 'Student', joinDate: 'Apr 2024', bio: 'Computer science student passionate about tech.', expertise: ['Coding', 'Learning'], sentiment: 'positive', churnRisk: 35, contributorScore: 42, email: 'david.k@example.com', lastActive: '5 days ago', postsCount: 8, commentsCount: 23, likesReceived: 45, joinedDate: 'Apr 20, 2024', tags: ['Student', 'Beginner'] },
];

// Sample posts
const samplePosts = [
  {
    id: 'p1',
    author: sampleMembers[0],
    content: 'Just finished the new landing page design! Would love to get your feedback on the color palette and layout. I\'ve attached some screenshots below.',
    timestamp: '2 hours ago',
    channel: 'design-feedback',
    reactions: [{ emoji: '\u{1F44D}', count: 12, reacted: false }, { emoji: '\u{1F3A8}', count: 5, reacted: true }, { emoji: '\u{1F525}', count: 3, reacted: false }],
    replies: [
      { author: sampleMembers[2], preview: 'This looks amazing! The color scheme is very modern...' },
      { author: sampleMembers[4], preview: 'Love the minimal approach. Have you considered...' },
    ],
    hasImage: true,
    isPinned: false,
    aiScore: 87,
    sentiment: 'positive'
  },
  {
    id: 'p2',
    author: sampleMembers[1],
    content: 'Quick reminder: Our monthly community call is tomorrow at 3 PM EST. We\'ll be discussing Q1 goals and upcoming features. Looking forward to seeing everyone there!',
    timestamp: '5 hours ago',
    channel: 'announcements',
    reactions: [{ emoji: '\u{1F44D}', count: 24, reacted: true }, { emoji: '\u{1F4C5}', count: 15, reacted: false }],
    replies: [
      { author: sampleMembers[3], preview: 'Will there be a recording available?' },
    ],
    hasImage: false,
    isPinned: true,
    aiScore: 92,
    sentiment: 'positive'
  },
  {
    id: 'p3',
    author: sampleMembers[2],
    content: 'Has anyone tried the new analytics dashboard? The insights are incredibly detailed! I\'m particularly impressed with the user journey tracking feature.',
    timestamp: '1 day ago',
    channel: 'general',
    reactions: [{ emoji: '\u{1F525}', count: 7, reacted: false }, { emoji: '\u2728', count: 3, reacted: false }, { emoji: '\u{1F440}', count: 5, reacted: false }],
    replies: [
      { author: sampleMembers[0], preview: 'Yes! The conversion funnel view is super helpful...' },
      { author: sampleMembers[5], preview: 'I found a bug in the export feature though...' },
    ],
    hasImage: false,
    isPinned: false,
    aiScore: 78,
    sentiment: 'positive',
    authorId: '3'
  },
];

export function CommunityBuilderView({ 
  communityData, 
  onBack,
  appVersion = 'v1',
  onVersionChange,
  userMode = 'creator',
  onModeChange,
  onNavigateToSettings,
  onCreateCourse,
  onCreateEvent
}: CommunityBuilderViewProps) {
  const [chatInput, setChatInput] = useState('');
  const [selectedSpace, setSelectedSpace] = useState('home');
  const [showVersionMenu, setShowVersionMenu] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'moderator' | 'member'>('admin');
  const [mainView, setMainView] = useState<'overview' | 'channels' | 'events' | 'members' | 'analytics' | 'settings' | 'messages' | 'ai-hub' | 'integrations' | 'courses'>('overview');
  const [channelTab, setChannelTab] = useState<'chat' | 'resources' | 'events' | 'members'>('chat');
  const [showWelcomeChecklist, setShowWelcomeChecklist] = useState(true);
  const [checklistProgress, setChecklistProgress] = useState(40);
  const [completedTasks, setCompletedTasks] = useState(['create', 'channels']);
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [showComposer, setShowComposer] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof sampleMembers[0] | null>(null);
  const [showMemberProfile, setShowMemberProfile] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(true);
  const [selectedDM, setSelectedDM] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [aiMode, setAiMode] = useState<AICopilotMode>('builder');
  const [aiPersonality, setAiPersonality] = useState<AIPersonality>('enthusiastic');
  const [aiAutoPilot, setAiAutoPilot] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [aiHubTab, setAiHubTab] = useState<'overview' | 'playbooks' | 'calendar' | 'automation' | 'insights'>('overview');
  const [healthScore, setHealthScore] = useState(78);
  const [sentimentScore, setSentimentScore] = useState(85);
  const [composerText, setComposerText] = useState('');
  const [voiceMode, setVoiceMode] = useState(false);
  const [aiLearningProgress, setAiLearningProgress] = useState(34);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [aiImpactStats, setAiImpactStats] = useState({
    timeSaved: 8.5,
    actionsCompleted: 23,
    postsCreated: 5,
    membersInvited: 12,
    predictionsAccurate: 94,
  });

  // New AI Panel States
  const [showThinkingProcess, setShowThinkingProcess] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [communityDescription, setCommunityDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('Beginners to intermediate designers from East India');
  const [communitySpecifics, setCommunitySpecifics] = useState([
    'Membership Allowed',
    'Apply knowledge through practical projects',
    'Build real-world applications with confidence',
    'Master advanced techniques and best practices'
  ]);
  const [newSpecific, setNewSpecific] = useState('');
  const [aiThinking, setAiThinking] = useState(false);

  const [dmConversations, setDmConversations] = useState([
    { id: 'dm1', member: sampleMembers[2], lastMessage: 'Thanks for the feedback!', unread: 2, timestamp: '10m ago' },
    { id: 'dm2', member: sampleMembers[4], lastMessage: 'When is the next event?', unread: 0, timestamp: '2h ago' },
  ]);

  // Member Management Modal States
  const [showInviteMembersModal, setShowInviteMembersModal] = useState(false);
  const [showMemberDetailPanel, setShowMemberDetailPanel] = useState(false);
  
  // Link Content Modal States
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  
  // Different AI messages based on role
  const getInitialAIMessage = () => {
    if (userRole === 'admin') {
      return {
        role: 'assistant' as const,
        content: `Hey there! I'm Leapy, your AI copilot for "${communityData.title || 'Design Professionals Hub'}".\n\nI'm learning your style and preferences. Currently in **Builder Mode** with **Enthusiastic** personality.\n\n**Quick Win Alert:**\nYour community health score is 78/100. I've identified 3 actions that could boost it to 85+ this week:\n1. Post welcome message (predicted +4 points)\n2. Schedule first event (predicted +3 points)\n3. Invite 5 target members (predicted +2 points)\n\nWant me to handle these on autopilot?`,
        timestamp: new Date(),
        type: 'recommendation' as const,
        actions: [
          { label: 'Enable Autopilot', onClick: () => {}, variant: 'primary' as const },
          { label: 'Review Actions', onClick: () => {}, variant: 'secondary' as const }
        ]
      };
    } else if (userRole === 'moderator') {
      return {
        role: 'assistant' as const,
        content: `Hi! I'm Leapy, your moderation assistant.\n\nI'm here to help you keep the community healthy and safe.\n\n**Moderation Queue:**\n- 2 flagged posts to review\n- 1 member needs warning (spam behavior)\n- 0 active conflicts\n\n**Suggestions:**\n- Pin the welcome post in #general\n- Create weekly highlights thread\n\nHow can I help you today?`,
        timestamp: new Date(),
        type: 'recommendation' as const,
        suggestions: ['Review flagged posts', 'Pin welcome post', 'Create highlights thread']
      };
    } else {
      return {
        role: 'assistant' as const,
        content: `Welcome to ${communityData.title || 'Design Professionals Hub'}!\n\nHere are some tips to get started:\n\n- Introduce yourself in #introductions\n- Check out upcoming events\n- Explore channels that interest you\n- Connect with other members\n\nWhat would you like to explore first?`,
        timestamp: new Date(),
        type: 'recommendation' as const,
        suggestions: ['See upcoming events', 'Browse channels', 'Find members to connect']
      };
    }
  };

  const [chatMessages, setChatMessages] = useState<Array<{ 
    role: 'user' | 'assistant'; 
    content: string; 
    timestamp: Date;
    suggestions?: string[];
    type?: 'insight' | 'recommendation' | 'celebration' | 'warning';
    actions?: Array<{label: string, onClick: () => void, preview?: any, variant?: 'primary' | 'secondary'}>;
  }>>([getInitialAIMessage()]);

  const [isGenerating, setIsGenerating] = useState(false);

  // Update AI message when role changes
  useEffect(() => {
    setChatMessages([getInitialAIMessage()]);
  }, [userRole]);

  const community = {
    title: communityData.title || 'Design Professionals Hub',
    description: communityData.description || 'A vibrant community for designers to connect, learn, and grow together.',
    memberCount: 247,
    onlineCount: 42,
    channels: [
      { id: 'announcements', name: 'Announcements', icon: Bell, members: 247, unread: 2, description: 'Important updates', isPinned: true },
      { id: 'general', name: 'General', icon: Hash, members: 247, unread: 5, description: 'General discussions', isPinned: false },
      { id: 'introductions', name: 'Introductions', icon: UsersIcon, members: 186, unread: 0, description: 'Introduce yourself', isPinned: false },
      { id: 'design-feedback', name: 'Design Feedback', icon: Palette, members: 124, unread: 3, description: 'Get design critiques', isPinned: false },
      { id: 'resources', name: 'Resources', icon: FileText, members: 198, unread: 0, description: 'Shared resources', isPinned: false },
      { id: 'random', name: 'Random', icon: Smile, members: 156, unread: 1, description: 'Off-topic fun', isPinned: false },
    ],
  };

  const handleSend = () => {
    if (!chatInput.trim() || isGenerating) return;
    const userMessage = { role: 'user' as const, content: chatInput.trim(), timestamp: new Date() };
    setChatMessages([...chatMessages, userMessage]);
    const userInput = chatInput.trim().toLowerCase();
    setChatInput('');
    setIsGenerating(true);
    setTimeout(() => {
      let aiResponse = "I can help you with that! Let me know what specific changes you'd like to make.";
      let suggestions: string[] = [];
      let messageType: 'insight' | 'recommendation' | 'celebration' | 'warning' | undefined;
      let actions: Array<{label: string, onClick: () => void, preview?: any, variant?: 'primary' | 'secondary'}> = [];
      if (userRole === 'admin') {
        if (userInput.includes('autopilot')) {
          aiResponse = `Autopilot Mode Activated!\n\nI'll handle daily operations. You'll get weekly summaries every Monday.`;
          setAiAutoPilot(true);
          messageType = 'celebration';
        } else if (userInput.includes('playbook')) {
          aiResponse = `AI Playbooks Ready\n\n5 automation sequences available. Which should I activate?`;
          suggestions = ['Activate Onboarding', 'Start Engagement Boost', 'All playbooks'];
        }
      } else if (userRole === 'moderator') {
        if (userInput.includes('flag') || userInput.includes('report')) {
          aiResponse = `Flagged Content Queue\n\n2 posts need review:\n1. Spam link in #general (auto-flagged)\n2. Off-topic discussion in #design-feedback\n\nRecommend: Delete #1, Move #2 to #random`;
          suggestions = ['Review now', 'Auto-delete spam', 'Move to #random'];
          messageType = 'warning';
        }
      } else {
        if (userInput.includes('event')) {
          aiResponse = `Upcoming Events\n\n3 events this week:\n- Tomorrow: Community Call (3 PM EST)\n- Thu: Design Workshop\n- Sat: NYC Meetup\n\nWant to RSVP?`;
          suggestions = ['RSVP to all', 'Just Community Call', 'See event details'];
        }
      }
      const aiMessage = {
        role: 'assistant' as const,
        content: aiResponse,
        timestamp: new Date(),
        suggestions: suggestions.length > 0 ? suggestions : undefined,
        type: messageType,
        actions: actions.length > 0 ? actions : undefined,
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleSuggestionClick = (suggestion: string) => { setChatInput(suggestion); };

  const handleRegenerateField = (field: string) => {
    setIsRegenerating(field);
    setAiThinking(true);
    setTimeout(() => {
      if (field === 'description') setCommunityDescription('A vibrant hub for design professionals to collaborate, share insights, and grow together. Connect with fellow designers, access exclusive resources, and participate in workshops that push creative boundaries.');
      else if (field === 'audience') setTargetAudience('Professional designers, UX/UI specialists, and creative enthusiasts from around the world');
      else if (field === 'all-specifics') setCommunitySpecifics(['Open membership with application process', 'Weekly design challenges and competitions', 'Monthly guest speaker sessions', 'Portfolio review and feedback', 'Industry networking opportunities']);
      setIsRegenerating(null);
      setAiThinking(false);
    }, 2000);
  };

  const handleRegenerateAll = () => {
    setIsRegenerating('all');
    setAiThinking(true);
    setTimeout(() => {
      setCommunityDescription('An innovative space where designers unite to share knowledge, collaborate on projects, and elevate their craft together.');
      setTargetAudience('Intermediate to advanced designers passionate about modern design practices');
      setCommunitySpecifics(['Curated membership community', 'Bi-weekly design sprints and hackathons', 'Access to premium design tools and resources', 'Mentorship from industry leaders', 'Exclusive job board and opportunities']);
      setIsRegenerating(null);
      setAiThinking(false);
    }, 3000);
  };

  const handleAddSpecific = () => { if (newSpecific.trim()) { setCommunitySpecifics([...communitySpecifics, newSpecific.trim()]); setNewSpecific(''); } };
  const handleRemoveSpecific = (index: number) => { setCommunitySpecifics(communitySpecifics.filter((_, i) => i !== index)); };

  const handleSaveAndContinue = () => {
    setAiThinking(true);
    setTimeout(() => {
      const aiMessage = { role: 'assistant' as const, content: 'Great! Your community structure looks amazing. Let me help you set up channels and permissions next.', timestamp: new Date(), type: 'celebration' as const };
      setChatMessages([...chatMessages, aiMessage]);
      setAiThinking(false);
    }, 1000);
  };

  const getAIMessage = () => {
    const messages = {
      builder: { enthusiastic: "Perfect! I've generated a community description and specifics for \"Design Professionals Hub\". Feel free to edit anything below!", professional: "I've analyzed your requirements and generated an optimized community structure. You may review and modify the fields below.", casual: "Hey! I put together a community structure for you. Take a look and tweak anything you'd like!", minimal: "Community structure ready. Edit fields as needed." },
      helper: { enthusiastic: "Hey there! I'm here to help you with anything community-related. Ask me about best practices, member engagement, or any questions you have!", professional: "I'm available to assist with community management questions, provide guidance on best practices, and help optimize your community strategy.", casual: "Hi! Need help with something? I'm here to make community management easier for you. Just ask!", minimal: "Ask me anything about managing your community." },
      analyst: { enthusiastic: "Your community is looking healthy! Let me break down the key metrics and insights that matter most right now!", professional: "Based on current data analysis, I've identified several key performance indicators and actionable insights for your community.", casual: "Looking good! Here's what the data is telling us about your community", minimal: "Analysis complete. Key metrics below." }
    };
    if (userRole === 'moderator') return aiMode === 'helper' ? "I've identified 2 posts that need review. I can help you handle moderation tasks efficiently." : "Moderation queue: 2 items. Check flagged content below.";
    if (userRole === 'member') return aiMode === 'helper' ? "Welcome! I'm here to help you get the most out of this community. What would you like to know?" : "Welcome! Here are some tips to get started.";
    return messages[aiMode]?.[aiPersonality] || messages.builder.enthusiastic;
  };

  const toggleSection = (section: string) => {
    if (collapsedSections.includes(section)) setCollapsedSections(collapsedSections.filter(s => s !== section));
    else setCollapsedSections([...collapsedSections, section]);
  };

  const tasks = [
    { id: 'create', label: 'Create your community', completed: true },
    { id: 'channels', label: 'Add channels', completed: true },
    { id: 'invite', label: 'Invite 5 members', completed: false },
    { id: 'post', label: 'Create your first post', completed: false },
    { id: 'event', label: 'Schedule an event', completed: false },
  ];

  const onlineMembers = sampleMembers.filter(m => m.status === 'online');

  const handleMemberClick = (member: typeof sampleMembers[0]) => {
    setSelectedMember(member);
    setShowMemberProfile(true);
  };

  const currentMode = copilotModes.find(m => m.id === aiMode)!;

  // Permission helpers
  const canAccessAIHub = userRole === 'admin';
  const canAccessAnalytics = userRole === 'admin' || userRole === 'moderator';
  const canAccessSettings = userRole === 'admin';
  const canControlAutopilot = userRole === 'admin';
  const canCreateChannels = userRole === 'admin';
  const canInviteMembers = userRole === 'admin';
  const canModerateContent = userRole === 'admin' || userRole === 'moderator';
  const canDeleteAnyPost = userRole === 'admin' || userRole === 'moderator';
  const canPinPosts = userRole === 'admin' || userRole === 'moderator';
  const canBanMembers = userRole === 'admin';
  const canChangeRoles = userRole === 'admin';
  const canViewAIInsights = userRole === 'admin';
  const canActivatePlaybooks = userRole === 'admin';

  /* ─── Header Actions for CommunityShell ─── */
  const headerActions = (
    <>
      {canAccessAIHub && (
        <Popover open={showModeSelector} onOpenChange={setShowModeSelector}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-lg border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors">
              <currentMode.icon className="size-4 text-primary" />
              <span className="text-primary text-xs">AI: {currentMode.label}</span>
              <ChevronDown className="size-3 text-primary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-3" align="end">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-semibold">AI MODE</p>
              {copilotModes.map((mode) => (
                <button key={mode.id} onClick={() => { setAiMode(mode.id); setShowModeSelector(false); }}
                  className={`w-full flex items-start gap-3 p-2 rounded-lg transition-colors ${aiMode === mode.id ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}>
                  <mode.icon className="size-4 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{mode.label}</p>
                    <p className="text-xs text-muted-foreground">{mode.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Role Switcher - Demo */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
        <button onClick={() => setUserRole('admin')} className={`px-2.5 py-1 rounded-md text-xs transition-all flex items-center gap-1 ${userRole === 'admin' ? 'bg-card text-foreground' : 'text-muted-foreground'}`}>
          <Star className="size-3" /> Admin
        </button>
        <button onClick={() => setUserRole('moderator')} className={`px-2.5 py-1 rounded-md text-xs transition-all flex items-center gap-1 ${userRole === 'moderator' ? 'bg-card text-foreground' : 'text-muted-foreground'}`}>
          <Shield className="size-3" /> Mod
        </button>
        <button onClick={() => setUserRole('member')} className={`px-2.5 py-1 rounded-md text-xs transition-all ${userRole === 'member' ? 'bg-card text-foreground' : 'text-muted-foreground'}`}>
          Member
        </button>
      </div>

      {userRole === 'admin' && (
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none">Publish</Button>
      )}
    </>
  );

  const shellSubtitle = `${community.onlineCount} online \u00B7 ${community.memberCount} members${canAccessAnalytics ? ` \u00B7 ${healthScore}% health` : ''}`;

  return (
    <CommunityShell
      role={userRole}
      title={community.title}
      subtitle={shellSubtitle}
      activeTab={mainView}
      onTabChange={(tab) => setMainView(tab as any)}
      onBack={onBack}
      headerActions={headerActions}
      badge={aiAutoPilot && canControlAutopilot ? (
        <Badge variant="secondary" className="text-[10px] border-none bg-green-100 text-green-700 rounded-md">Autopilot ON</Badge>
      ) : undefined}
      counts={{
        channels: community.channels.length,
        members: community.memberCount,
        courses: 5,
        events: 3,
        messages: dmConversations.filter(d => d.unread > 0).length || undefined,
      }}
    >
      <ScrollArea className="flex-1">
        <div className={['ai-hub', 'settings', 'integrations'].includes(mainView) ? "h-full" : "p-6 pb-24 max-w-5xl mx-auto"}>

          {/* ── Overview Tab ── */}
          {mainView === 'overview' && (
            <CommunityOverviewSection
              communityName={community.title}
              communityDescription={community.description}
              memberCount={community.memberCount}
              channelCount={community.channels.length}
              courseCount={5}
              eventCount={3}
              onlineCount={community.onlineCount}
              engagementScore={healthScore}
              growthRate={14}
              weeklyActiveMembers={168}
              recentPosts={samplePosts}
              topMembers={sampleMembers}
              onNavigate={(tab) => setMainView(tab as any)}
              onInviteMembers={() => setShowInviteMembersModal(true)}
              onCreateChannel={() => {}}
              onCreateCourse={onCreateCourse}
              onCreateEvent={onCreateEvent}
            />
          )}

          {/* ── AI Hub View - Admin Only ── */}
          {mainView === 'ai-hub' && canAccessAIHub && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-foreground">AI Command Center</h2>
                    <p className="text-sm text-muted-foreground mt-1">Your AI copilot dashboard</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-b border-border -mb-4">
                  {[
                    { id: 'overview', label: 'Overview', icon: Grid3x3 },
                    { id: 'playbooks', label: 'Playbooks', icon: Workflow },
                    { id: 'calendar', label: 'Calendar', icon: CalendarDays },
                    { id: 'automation', label: 'Automation', icon: Zap },
                    { id: 'insights', label: 'Insights', icon: Lightbulb },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button key={tab.id} onClick={() => setAiHubTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${aiHubTab === tab.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                        <Icon className="size-4" />
                        <span className="text-sm">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <ScrollArea className="flex-1 p-6 pb-24">
                {aiHubTab === 'overview' && (
                  <div className="space-y-6 max-w-6xl">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 bg-primary rounded-lg p-6 text-primary-foreground">
                        <p className="text-primary-foreground/70 text-sm mb-2">Community Health Score</p>
                        <div className="flex items-baseline gap-3 mb-4">
                          <span className="text-5xl font-bold">{healthScore}</span>
                          <span className="text-2xl text-primary-foreground/70">/100</span>
                          <Badge className="bg-green-500 text-white border-0"><TrendingUp className="size-3 mr-1" />+8</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary-foreground/30">
                          <div><p className="text-primary-foreground/70 text-xs mb-1">Engagement</p><p className="text-xl font-bold">82%</p></div>
                          <div><p className="text-primary-foreground/70 text-xs mb-1">Growth</p><p className="text-xl font-bold">+14.9%</p></div>
                          <div><p className="text-primary-foreground/70 text-xs mb-1">Retention</p><p className="text-xl font-bold">78%</p></div>
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Heart className="size-5 text-green-700" />
                          <p className="text-sm font-medium text-green-900">Sentiment</p>
                        </div>
                        <div className="text-4xl font-bold text-green-900 mb-2">{sentimentScore}%</div>
                        <p className="text-sm text-green-700">Positive mood</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="size-5 text-blue-700" />
                        <h3 className="font-medium text-blue-900">AI Recommendations</h3>
                        <Badge className="ml-auto bg-blue-600 text-white">3 urgent</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 bg-card rounded-lg border border-blue-200">
                          <div className="flex items-start justify-between mb-2"><AlertCircle className="size-5 text-orange-600" /><Badge variant="destructive" className="text-xs">High</Badge></div>
                          <p className="text-sm font-medium text-foreground mb-1">Churn Risk</p>
                          <p className="text-xs text-muted-foreground mb-3">James Park: 78% risk</p>
                          <Button size="sm" variant="outline" className="w-full text-xs"><Wand2 className="size-3 mr-1" />AI Intervention</Button>
                        </div>
                        <div className="p-4 bg-card rounded-lg border border-blue-200">
                          <div className="flex items-start justify-between mb-2"><TrendingDown className="size-5 text-orange-600" /><Badge className="text-xs bg-orange-100 text-orange-700">Medium</Badge></div>
                          <p className="text-sm font-medium text-foreground mb-1">Engagement Drop</p>
                          <p className="text-xs text-muted-foreground mb-3">Down 15% this week</p>
                          <Button size="sm" variant="outline" className="w-full text-xs"><Wand2 className="size-3 mr-1" />Create Post</Button>
                        </div>
                        <div className="p-4 bg-card rounded-lg border border-blue-200">
                          <div className="flex items-start justify-between mb-2"><UserCheck className="size-5 text-green-600" /><Badge className="text-xs bg-green-100 text-green-700">Opportunity</Badge></div>
                          <p className="text-sm font-medium text-foreground mb-1">Member Matching</p>
                          <p className="text-xs text-muted-foreground mb-3">5 connections found</p>
                          <Button size="sm" variant="outline" className="w-full text-xs"><Wand2 className="size-3 mr-1" />Make Intros</Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-6">
                      <h3 className="font-medium text-foreground mb-4">Recent AI Actions</h3>
                      <div className="space-y-3">
                        {[
                          { action: 'Posted daily conversation starter', time: '2 hours ago', status: 'success', engagement: '+12 replies' },
                          { action: 'Sent welcome DM to 3 new members', time: '5 hours ago', status: 'success', engagement: '2 responded' },
                          { action: 'Created member spotlight: Sarah Chen', time: '1 day ago', status: 'success', engagement: '24 reactions' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent">
                            <CheckCircle className="size-4 text-green-600" />
                            <div className="flex-1"><p className="text-sm font-medium text-foreground">{item.action}</p><p className="text-xs text-muted-foreground">{item.time}</p></div>
                            <Badge variant="outline" className="text-xs">{item.engagement}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {aiHubTab === 'playbooks' && (
                  <div className="space-y-4 max-w-4xl">
                    {aiPlaybooks.map((playbook) => {
                      const Icon = playbook.icon;
                      return (
                        <div key={playbook.id} className="bg-card border border-border rounded-lg p-6 hover:border-border/80 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="p-3 bg-primary/10 rounded-lg"><Icon className="size-6 text-primary" /></div>
                              <div>
                                <h3 className="font-medium text-foreground mb-1">{playbook.name}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{playbook.tasks} automated tasks</p>
                                {playbook.automation && (<Badge className="bg-green-100 text-green-700 border-0"><Zap className="size-3 mr-1" />Auto-enabled</Badge>)}
                              </div>
                            </div>
                            <Button className="bg-primary hover:bg-primary/90"><PlayCircle className="size-4 mr-2" />Activate</Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {aiHubTab === 'calendar' && <CalendarTab />}
                {aiHubTab === 'automation' && <AutomationTab />}
                {aiHubTab === 'insights' && <InsightsTab />}
              </ScrollArea>
            </div>
          )}

          {/* ── Channels View ── */}
          {mainView === 'channels' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div><h2 className="text-foreground">Channels</h2><p className="text-sm text-muted-foreground mt-1">Manage and browse community channels</p></div>
                {userRole === 'admin' && (<Button className="bg-primary hover:bg-primary/90"><Plus className="size-4 mr-2" />Create Channel</Button>)}
              </div>
              <div className="space-y-2">
                {community.channels.map((ch) => {
                  const Icon = ch.icon;
                  return (
                    <div key={ch.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/20 transition-colors cursor-pointer">
                      <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><Icon className="size-5 text-primary" /></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2"><p className="text-sm text-foreground font-medium">#{ch.name}</p>{ch.isPinned && <Pin className="size-3 text-muted-foreground" />}</div>
                        <p className="text-xs text-muted-foreground mt-0.5">{ch.description} &middot; {ch.members} members</p>
                      </div>
                      {ch.unread > 0 && (<Badge className="bg-primary text-primary-foreground text-xs">{ch.unread}</Badge>)}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Courses View ── */}
          {mainView === 'courses' && (
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-foreground">Courses</h2>
                    <p className="text-sm text-muted-foreground mt-1">Create and manage your course library</p>
                  </div>
                  {userRole === 'admin' && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" onClick={() => setShowAddCourseModal(true)}><Plus className="size-4 mr-2" />Add Course</Button>
                      <Button className="bg-primary hover:bg-primary/90" onClick={onCreateCourse}><Sparkles className="size-4 mr-2" />Create with AI</Button>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6">
                <div className="max-w-6xl space-y-6">
                  {(userRole === 'admin' || userRole === 'moderator') && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Total Courses</span><GraduationCap className="size-4 text-primary" /></div>
                        <p className="text-2xl text-foreground">5</p><p className="text-xs text-muted-foreground mt-1">2 published, 3 draft</p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Active Students</span><UsersIcon className="size-4 text-blue-600" /></div>
                        <p className="text-2xl text-foreground">127</p><p className="text-xs text-green-600 mt-1">+12% this week</p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Completion Rate</span><CheckCircle className="size-4 text-green-600" /></div>
                        <p className="text-2xl text-foreground">68%</p><p className="text-xs text-muted-foreground mt-1">Average across all courses</p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2"><span className="text-sm text-muted-foreground">Total Revenue</span><TrendingUp className="size-4 text-emerald-600" /></div>
                        <p className="text-2xl text-foreground">$12.4k</p><p className="text-xs text-muted-foreground mt-1">This month</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input type="text" placeholder="Search courses..." className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" />
                    </div>
                    <Button variant="outline" size="sm"><Filter className="size-4 mr-2" />Filter</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { id: 1, title: 'Complete Web Development Bootcamp', students: 45, lessons: 24, duration: '12h 30m', price: 'Paid', status: 'published', progress: 100, category: 'Development' },
                      { id: 2, title: 'Digital Marketing Fundamentals', students: 32, lessons: 18, duration: '8h 15m', price: 'Free', status: 'published', progress: 100, category: 'Marketing' },
                      { id: 3, title: 'UI/UX Design Masterclass', students: 28, lessons: 20, duration: '10h 45m', price: 'Paid', status: 'draft', progress: 75, category: 'Design' },
                      { id: 4, title: 'Python for Data Science', students: 0, lessons: 15, duration: '9h 20m', price: 'Paid', status: 'draft', progress: 40, category: 'Development' },
                      { id: 5, title: 'Content Creation Strategy', students: 0, lessons: 12, duration: '6h 00m', price: 'Free', status: 'draft', progress: 20, category: 'Marketing' },
                    ].map((course) => (
                      <div key={course.id} className="bg-card border border-border rounded-lg overflow-hidden hover:border-border/80 transition-colors group">
                        <div className="relative h-40 overflow-hidden bg-muted flex items-center justify-center">
                          <div className="absolute inset-0 opacity-10"><div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)' }} /></div>
                          <GraduationCap className="size-12 text-muted-foreground" />
                          <div className="absolute top-2 right-2"><Badge variant={course.status === 'published' ? 'default' : 'secondary'} className="text-xs">{course.status === 'published' ? 'Published' : 'Draft'}</Badge></div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-3 flex-1">
                              <h3 className="text-sm text-foreground line-clamp-2 flex-1">{course.title}</h3>
                              {userRole === 'admin' && course.status === 'draft' && (
                                <div className="relative size-12 flex-shrink-0">
                                  <svg className="size-12 -rotate-90" viewBox="0 0 48 48">
                                    <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                                    <circle cx="24" cy="24" r="20" fill="none" stroke="#9333ea" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 20}`} strokeDashoffset={`${2 * Math.PI * 20 * (1 - course.progress / 100)}`} strokeLinecap="round" />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-xs text-foreground">{course.progress}%</span></div>
                                </div>
                              )}
                            </div>
                            {userRole === 'admin' && (
                              <Popover>
                                <PopoverTrigger asChild><button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="size-4" /></button></PopoverTrigger>
                                <PopoverContent className="w-48 p-1" align="end">
                                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md"><Edit className="size-4" />Edit Course</button>
                                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md"><Copy className="size-4" />Duplicate</button>
                                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md"><BarChart3 className="size-4" />View Analytics</button>
                                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md"><Wand2 className="size-4 text-primary" />AI Improve</button>
                                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"><Trash2 className="size-4" />Delete</button>
                                </PopoverContent>
                              </Popover>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-3"><Badge variant="secondary" className="text-xs">{course.category}</Badge><Badge variant="outline" className="text-xs">{course.price}</Badge></div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1"><BookOpen className="size-3" /><span>{course.lessons} lessons</span></div>
                            <div className="flex items-center gap-1"><Clock className="size-3" /><span>{course.duration}</span></div>
                          </div>
                          {course.status === 'published' && (<div className="flex items-center gap-1 text-xs text-muted-foreground pt-3 border-t border-border"><UsersIcon className="size-3" /><span>{course.students} students enrolled</span></div>)}
                          {course.status === 'draft' && userRole === 'admin' && (<Button size="sm" className="w-full bg-primary hover:bg-primary/90 mt-2">Continue Building</Button>)}
                        </div>
                      </div>
                    ))}
                  </div>
                  {userRole === 'admin' && (
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="size-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0"><Lightbulb className="size-5 text-white" /></div>
                        <div className="flex-1">
                          <h3 className="text-sm text-foreground mb-1">AI Course Suggestions</h3>
                          <p className="text-sm text-muted-foreground mb-3">Based on your community's interests and engagement, here are recommended courses to create:</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2"><div className="size-1.5 rounded-full bg-primary" /><span className="text-sm text-foreground">Advanced JavaScript Patterns</span><span className="text-xs text-muted-foreground">(High demand)</span></div>
                            <div className="flex items-center gap-2"><div className="size-1.5 rounded-full bg-primary" /><span className="text-sm text-foreground">Social Media Growth Hacks</span><span className="text-xs text-muted-foreground">(Trending topic)</span></div>
                          </div>
                          <Button size="sm" className="mt-3 bg-primary hover:bg-primary/90"><Wand2 className="size-3 mr-2" />Generate Course Outline</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Messages View ── */}
          {mainView === 'messages' && (
            <div className="flex-1 flex overflow-hidden">
              <div className="w-80 border-r border-border flex flex-col">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-3"><h2 className="text-foreground">Messages</h2><Button size="sm"><Plus className="size-4 mr-2" />New</Button></div>
                  <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" /><input type="text" placeholder="Search messages..." className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" /></div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-2">
                    {dmConversations.map((conv) => (
                      <button key={conv.id} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                        <div className="relative"><img src={conv.member.avatar} alt={conv.member.name} className="size-12 rounded-full" /><div className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-white" /></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1"><span className="text-sm text-foreground truncate">{conv.member.name}</span><span className="text-xs text-muted-foreground">{conv.timestamp}</span></div>
                          <div className="flex items-center justify-between"><p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>{conv.unread > 0 && (<Badge className="ml-2 bg-primary">{conv.unread}</Badge>)}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={dmConversations[0].member.avatar} alt={dmConversations[0].member.name} className="size-10 rounded-full" />
                      <div><h3 className="text-foreground">{dmConversations[0].member.name}</h3><p className="text-sm text-muted-foreground">Active now</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm"><Phone className="size-4" /></Button>
                      <Button variant="outline" size="sm"><Video className="size-4" /></Button>
                      <Button variant="outline" size="sm"><MoreVertical className="size-4" /></Button>
                    </div>
                  </div>
                </div>
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4 max-w-3xl">
                    <div className="flex gap-3"><img src={dmConversations[0].member.avatar} alt="" className="size-8 rounded-full" /><div><div className="bg-muted rounded-lg px-4 py-2 inline-block max-w-md"><p className="text-sm text-foreground">Hey! I loved your recent post about design systems. Do you have any resources you'd recommend?</p></div><p className="text-xs text-muted-foreground mt-1">10:30 AM</p></div></div>
                    <div className="flex gap-3 justify-end"><div className="text-right"><div className="bg-primary rounded-lg px-4 py-2 inline-block max-w-md"><p className="text-sm text-white">Thanks! I'd recommend checking out the Material Design guidelines and Refactoring UI book.</p></div><p className="text-xs text-muted-foreground mt-1">10:32 AM</p></div><img src={sampleMembers[0].avatar} alt="" className="size-8 rounded-full" /></div>
                    {userRole === 'admin' && (
                      <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                        <div className="flex items-start gap-2"><Lightbulb className="size-4 text-primary mt-0.5" /><div className="flex-1"><p className="text-xs text-primary font-medium mb-1">AI Suggestion</p><p className="text-xs text-primary/80">Looks like {dmConversations[0].member.name} is interested in design resources. Consider inviting them to the #design-resources channel.</p></div></div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm"><Paperclip className="size-4" /></Button>
                    <Button variant="outline" size="sm"><ImageIcon className="size-4" /></Button>
                    <input type="text" placeholder="Type a message..." className="flex-1 px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    {userRole === 'admin' && (<Button variant="outline" size="sm"><Wand2 className="size-4 text-primary" /></Button>)}
                    <Button size="sm" className="bg-primary hover:bg-primary/90"><Send className="size-4" /></Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Members View ── */}
          {mainView === 'members' && (
            <EnhancedMembersPanel
              members={sampleMembers}
              userRole={userRole}
              onViewProfile={(member) => { setSelectedMember(member); setShowMemberDetailPanel(true); }}
              onInvite={() => setShowInviteMembersModal(true)}
            />
          )}

          {/* ── Analytics View ── */}
          {mainView === 'analytics' && canAccessAnalytics && (
            <AnalyticsView userRole={userRole} samplePosts={samplePosts} />
          )}

          {/* ── Settings View ── */}
          {mainView === 'settings' && canAccessSettings && (
            <SettingsView userRole={userRole} communityData={communityData} onNavigateToIntegrations={() => onNavigateToSettings?.()} />
          )}

          {/* ── Events View ── */}
          {mainView === 'events' && (
            <CommunityEventsView
              userRole={userRole}
              communityId={'community1'}
              communityName={community.title}
              userId="current-user"
              onAddExistingEvent={() => setShowAddEventModal(true)}
              onCreateEvent={onCreateEvent}
            />
          )}

          {/* ── Integrations Library View ── */}
          {mainView === 'integrations' && (
            <IntegrationsLibraryEnhanced onBack={() => setMainView('settings')} />
          )}

        </div>
      </ScrollArea>

      {/* Floating AI Button - Admin Only */}
      {canAccessAIHub && (
        <button
          onClick={() => setMainView('ai-hub')}
          className="fixed bottom-6 right-6 size-14 bg-primary rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group z-50"
        >
          <Sparkles className="size-6 text-white" />
          <div className="absolute -top-1 -right-1 size-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-xs text-white font-bold">3</span>
          </div>
        </button>
      )}

      {/* Member Profile Modal - Role-based actions */}
      {showMemberProfile && selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowMemberProfile(false)}>
          <div className="bg-card rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="relative">
                    <img src={selectedMember.avatar} alt={selectedMember.name} className="size-16 rounded-full" />
                    <div className={`absolute bottom-0 right-0 size-4 rounded-full border-2 border-white ${selectedMember.status === 'online' ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                  </div>
                  <div>
                    <h3 className="text-foreground flex items-center gap-2">
                      {selectedMember.name}
                      {selectedMember.role === 'Admin' && <Star className="size-4 text-yellow-500" />}
                      {selectedMember.role === 'Moderator' && <Shield className="size-4 text-blue-500" />}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedMember.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">Joined {selectedMember.joinDate}</p>
                  </div>
                </div>
                <button onClick={() => setShowMemberProfile(false)} className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
              </div>
              <div className="space-y-4">
                <div><p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Bio</p><p className="text-sm text-foreground">{selectedMember.bio}</p></div>
                <div><p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Expertise</p><div className="flex flex-wrap gap-1.5">{selectedMember.expertise.map((skill, idx) => (<Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>))}</div></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Level</p><p className="text-lg text-foreground">{selectedMember.level}</p></div>
                  <div className="text-center p-3 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Points</p><p className="text-lg text-foreground">{selectedMember.points}</p></div>
                  <div className="text-center p-3 bg-muted rounded-lg"><p className="text-xs text-muted-foreground">Posts</p><p className="text-lg text-foreground">{Math.floor(Math.random() * 50) + 10}</p></div>
                </div>
                {canViewAIInsights && (
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Brain className="size-4 text-primary mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-2">AI Insights</p>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex justify-between"><span>Contributor Score:</span><span className="font-medium text-foreground">{selectedMember.contributorScore}/100</span></div>
                          <div className="flex justify-between"><span>Churn Risk:</span><span className="font-medium text-foreground">{selectedMember.churnRisk}%</span></div>
                          <div className="flex justify-between"><span>Sentiment:</span><span className="font-medium capitalize text-foreground">{selectedMember.sentiment}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90"><MessageSquare className="size-4 mr-2" />Message</Button>
                  {userRole === 'admin' && (
                    <Popover>
                      <PopoverTrigger asChild><Button variant="outline"><MoreVertical className="size-4" /></Button></PopoverTrigger>
                      <PopoverContent className="w-48 p-1" align="end">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"><Star className="size-4" />Change Role</button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"><Brain className="size-4" />View AI Report</button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"><Ban className="size-4" />Ban Member</button>
                      </PopoverContent>
                    </Popover>
                  )}
                  {userRole === 'moderator' && (
                    <Popover>
                      <PopoverTrigger asChild><Button variant="outline"><MoreVertical className="size-4" /></Button></PopoverTrigger>
                      <PopoverContent className="w-48 p-1" align="end">
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"><AlertCircle className="size-4" />Warn Member</button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-md"><UserMinus className="size-4" />Temp Mute (24h)</button>
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md"><Flag className="size-4" />Report to Admin</button>
                      </PopoverContent>
                    </Popover>
                  )}
                  {userRole === 'member' && (<Button variant="outline"><Eye className="size-4 mr-2" />View Profile</Button>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Management Modals */}
      <InviteMembersModal
        isOpen={showInviteMembersModal}
        onClose={() => setShowInviteMembersModal(false)}
        communityName={community.title}
      />

      <MemberDetailPanel
        isOpen={showMemberDetailPanel}
        onClose={() => setShowMemberDetailPanel(false)}
        member={selectedMember}
        userRole={userRole}
        onChangeRole={(memberId, newRole) => { console.log('Change role:', memberId, newRole); }}
        onRemoveMember={(memberId) => { console.log('Remove member:', memberId); }}
        onSendMessage={(memberId) => { console.log('Send message:', memberId); }}
      />

      {/* Link Content Modals */}
      <AddCourseToCommunityModal
        isOpen={showAddCourseModal}
        onClose={() => setShowAddCourseModal(false)}
        communityName={community.title}
        onSelectCourse={(courseId) => { console.log('Course added:', courseId); }}
        onCreateNew={() => { console.log('Create new course'); }}
      />

      <AddEventToCommunityModal
        isOpen={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        communityName={community.title}
        onSelectEvent={(eventId) => { console.log('Event added:', eventId); }}
        onCreateNew={() => { console.log('Create new event'); }}
      />
    </CommunityShell>
  );
}

import { toast } from 'sonner@2.0.3';
import { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Lightbulb, BarChart3, Rocket, Brain, RefreshCw, Command, Check, FileText, MessageSquare, Trash2, HelpCircle, MessageCircle, Zap, BookOpen, ArrowLeft, Briefcase, GraduationCap, Calendar, Users, Megaphone, Target, TrendingUp, Award, Headphones, Maximize2, Mic, Paperclip, Image, Ticket, UserPlus, Play, Radio, Clock, Mail, Share2, Copy, BarChart2, Activity, ThumbsDown, AlertCircle } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import LeapyLogo from '../imports/Button';
import svgPaths from '../imports/svg-g9dvnlv4i1';
import { AICreditsIndicator } from './AICreditsIndicator';
import { useCopilot, type EventCopilotContext } from '../contexts/CopilotContext';
import { EventScheduleFlow } from './EventScheduleFlow';

interface CopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'admin' | 'moderator' | 'member';
  context?: 'course' | 'community' | 'general' | 'event';
  currentFocus?: {
    type: 'field' | 'section' | 'page';
    name: string;
    value?: string;
  };
  onApplySuggestion?: (suggestion: any) => void;
  onPanelSizeChange?: (width: string) => void;
}

type AIModeType = 'builder' | 'helper' | 'analyst';

interface Suggestion {
  id: string;
  title: string;
  preview: string;
  impact?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const modes = [
  { id: 'builder' as AIModeType, label: 'Build', icon: Rocket },
  { id: 'helper' as AIModeType, label: 'Help', icon: Lightbulb },
  { id: 'analyst' as AIModeType, label: 'Analyze', icon: BarChart3 },
];

type PanelSize = 'default' | 'medium' | 'large' | 'extra-large';

const panelWidths: Record<PanelSize, string> = {
  'default': '420px',
  'medium': '560px',
  'large': '720px',
  'extra-large': '920px',
};

// Shared styles
const panelShell = "bg-card border-l border-border flex flex-col h-full overflow-hidden";
const headerBar = "px-6 py-5 border-b border-border";
const iconBtn = "size-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors";
const sectionLabel = "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3";
const menuItem = "w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left";
const modelCard = "group p-4 rounded-xl border border-border hover:border-[var(--ai-border)] hover:bg-[var(--ai-accent)] transition-all bg-card text-left";

export function CopilotPanel({ 
  isOpen, 
  onClose, 
  userRole = 'admin', 
  context = 'general',
  currentFocus,
  onApplySuggestion,
  onPanelSizeChange
}: CopilotPanelProps) {
  const [aiMode, setAiMode] = useState<AIModeType>('builder');
  const [chatInput, setChatInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<string | null>(null);
  const [showMenuView, setShowMenuView] = useState(false);
  const [showBuilderModelsView, setShowBuilderModelsView] = useState(false);
  const [panelSize, setPanelSize] = useState<PanelSize>('default');
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSizeDropdown(false);
      }
    };

    if (showSizeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSizeDropdown]);

  // Simplified, contextual suggestions
  const getContextualSuggestions = (): Suggestion[] => {
    if (aiMode !== 'builder') return [];
    
    if (context === 'community') {
      if (currentFocus?.name === 'Community Name') {
        return [
          {
            id: '1',
            title: 'AI Innovators Hub',
            preview: 'Professional community for tech leaders and AI enthusiasts',
            impact: '32% higher engagement'
          },
          {
            id: '2',
            title: 'Creative Studio Collective',
            preview: 'Where designers, artists, and creators collaborate',
            impact: '28% better retention'
          }
        ];
      } else if (currentFocus?.name === 'Description') {
        return [
          {
            id: '3',
            title: 'Engaging Introduction',
            preview: 'Join a vibrant community of innovators shaping the future. Share knowledge, collaborate on projects, and grow together with peers who inspire you.',
            impact: '45% conversion boost'
          }
        ];
      }
    }
    
    return [];
  };

  const suggestions = getContextualSuggestions();

  // ── Event-specific: stage-aware suggestions ──
  const { eventContext } = useCopilot();

  interface EventSuggestion {
    id: string;
    icon: any;
    text: string;
    action: string;
    onAction: () => void;
  }

  const getEventSuggestions = (): EventSuggestion[] => {
    if (context !== 'event' || !eventContext) return [];
    const ec = eventContext;
    const stage = ec.lifecycleStage;

    if (stage === 'skeleton') {
      const items: EventSuggestion[] = [];
      if (!ec.hasAgenda) items.push({ id: 'sk-1', icon: Calendar, text: `Your event has no agenda yet. Most successful workshops have 3-5 sessions. Want me to generate a draft?`, action: 'Generate Agenda', onAction: () => toast.success('Generating agenda...', { description: 'A 4-session workshop agenda has been drafted.' }) });
      if (!ec.hasSpeakers) items.push({ id: 'sk-2', icon: UserPlus, text: `Add at least one speaker to boost registrations by ~40%.`, action: 'Add Speaker', onAction: () => toast.success('Opening speakers tab...') });
      if (!ec.hasCoverImage) items.push({ id: 'sk-3', icon: Image, text: `Upload a cover image — events with covers get 3x more clicks.`, action: 'Upload Image', onAction: () => toast.success('Opening image uploader...') });
      return items;
    }

    if (stage === 'building') {
      const items: EventSuggestion[] = [];
      items.push({ id: 'bl-1', icon: Calendar, text: `Your ${ec.sessionCount} sessions total ${ec.totalDuration} min. A typical workshop is 2-3 hours. Want me to add more?`, action: 'Generate More Sessions', onAction: () => toast.success('Adding 2 more sessions...', { description: 'Panel Discussion and Networking Break added.' }) });
      if (ec.isPaid) items.push({ id: 'bl-2', icon: Ticket, text: `Your ticket is $${ec.price}. Similar workshops average $45-65. Consider adding a VIP tier.`, action: 'Add VIP Tier', onAction: () => toast.success('VIP tier added!', { description: '$99 VIP with priority seating and recording access.' }) });
      if (!ec.hasRegistrationForm) items.push({ id: 'bl-3', icon: FileText, text: `No registration form configured — using defaults. Want a custom form?`, action: 'Build Form', onAction: () => toast.success('Opening form builder...') });
      return items;
    }

    if (stage === 'ready') {
      return [
        { id: 'rd-1', icon: Megaphone, text: `Everything looks good! Want me to draft a launch announcement?`, action: 'Draft Announcement', onAction: () => toast.success('Drafting announcement...', { description: 'A launch post for social media has been generated.' }) },
        { id: 'rd-2', icon: Share2, text: `Generate a social media pack to promote your event?`, action: 'Generate Social Pack', onAction: () => toast.success('Generating social pack...', { description: '3 designs for Instagram, Twitter, and LinkedIn.' }) },
        { id: 'rd-3', icon: Play, text: `Preview your public page one more time before publishing.`, action: 'Preview', onAction: () => toast.success('Opening preview...') },
      ];
    }

    if (stage === 'published') {
      return [
        { id: 'pb-1', icon: TrendingUp, text: `${ec.registrationCount} registrations so far — ${ec.registrationCount > 10 ? 'above average!' : 'time to promote.'} Share on social to keep momentum.`, action: 'Generate Social Post', onAction: () => toast.success('Social post drafted!', { description: 'Optimized for Twitter and LinkedIn.' }) },
        { id: 'pb-2', icon: Mail, text: `Send a reminder to registered attendees? Events with reminders see 25% higher attendance.`, action: 'Send Reminder', onAction: () => toast.success('Reminder sent!', { description: `${ec.registrationCount} attendees notified.` }) },
        ...(ec.waitlistCount > 0 ? [{ id: 'pb-3', icon: Users, text: `${ec.waitlistCount} people on the waitlist. Consider increasing capacity.`, action: 'Increase Capacity', onAction: () => toast.success('Capacity increased by 20!') }] : []),
      ];
    }

    if (stage === 'live') {
      return [
        { id: 'lv-1', icon: Activity, text: `Engagement is high! Good time for a poll.`, action: 'Launch Poll', onAction: () => toast.success('Poll launched!', { description: 'Attendees can now vote.' }) },
        { id: 'lv-2', icon: MessageSquare, text: `${ec.unansweredQuestions || 0} unanswered questions in Q&A. Want me to draft responses?`, action: 'Draft Answers', onAction: () => toast.success('Drafting answers...', { description: '5 responses generated.' }) },
        { id: 'lv-3', icon: Radio, text: `Attendance peaked at ${ec.liveViewers || 0} viewers. ${ec.liveViewers && ec.liveViewers > 50 ? 'Great turnout!' : 'Consider sending a reminder.'}`, action: 'View Stats', onAction: () => toast('Live stats updated') },
      ];
    }

    if (stage === 'ended') {
      return [
        { id: 'en-1', icon: Mail, text: `Want me to draft a follow-up email for ${ec.attendeeCount || 0} attendees?`, action: 'Draft Follow-Up', onAction: () => toast.success('Follow-up email drafted!', { description: 'Includes recording link and feedback survey.' }) },
        { id: 'en-2', icon: FileText, text: `Generate a feedback survey? Events with surveys get 60% better repeat attendance.`, action: 'Create Survey', onAction: () => toast.success('Survey created!', { description: '5-question post-event survey.' }) },
        { id: 'en-3', icon: Award, text: `Your engagement score was 78/100 — here's how to improve next time.`, action: 'View Tips', onAction: () => toast('Opening improvement tips...') },
      ];
    }

    if (stage === 'cancelled') {
      return [
        { id: 'cn-1', icon: Copy, text: `Want to reschedule instead? I can clone this event with a new date.`, action: 'Clone & Reschedule', onAction: () => toast.success('Event cloned!', { description: 'A draft copy has been created.' }) },
        { id: 'cn-2', icon: Mail, text: `Draft a cancellation notice for ${ec.registrationCount} attendees?`, action: 'Draft Notice', onAction: () => toast.success('Cancellation notice drafted!') },
      ];
    }

    return [];
  };

  const eventSuggestions = getEventSuggestions();

  // Event-specific smart responses
  const getEventSmartResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes('agenda') || lower.includes('schedule')) {
      return "A strong agenda has 3-5 sessions with varied formats: a keynote (15-20 min), a deep dive (30-45 min), a hands-on exercise (20-30 min), and Q&A (15 min). Want me to generate one based on your event topic?";
    }
    if (lower.includes('price') || lower.includes('ticket') || lower.includes('pricing')) {
      return "For a 90-minute virtual workshop, $29-49 is the sweet spot for broad audiences. Consider a free tier (limited features) + paid tier ($39-69) to maximize both reach and revenue. Early bird pricing at 20% off can drive urgency.";
    }
    if (lower.includes('promote') || lower.includes('marketing') || lower.includes('share')) {
      return "Start with your existing audience: email list, social followers, and community members. Post 3 times before the event: announcement, reminder at 1 week, and final push 24 hours before. Include social proof (attendee count, testimonials from past events).";
    }
    if (lower.includes('registr') || lower.includes('form')) {
      return "Keep registration forms short — name and email are essential, everything else should be optional. For screened events, add 1-2 qualifying questions. For paid events, collect payment info at the final step to reduce drop-off.";
    }
    if (lower.includes('cancel')) {
      return "When cancelling, always communicate transparently: send an email with the reason, process refunds immediately, and offer alternatives (rescheduled date or similar events). This preserves trust for future events.";
    }
    if (lower.includes('engage') || lower.includes('interaction')) {
      return "Use polls, Q&A, and breakout rooms to keep attendees active. The first 10 minutes set the tone — start with a question or icebreaker. Aim for an interaction every 15 minutes to maintain attention.";
    }
    if (lower.includes('follow') || lower.includes('after')) {
      return "Send a follow-up within 24 hours: thank attendees, share the recording and slides, include a feedback survey (3-5 questions max), and tease your next event. This is the #1 driver of repeat attendance.";
    }
    return "I can help with that! I'm familiar with event planning, pricing, promotion, registration, and post-event engagement. What specific aspect would you like guidance on?";
  };

  const handleSend = () => {
    if (!chatInput.trim() || isGenerating) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setIsGenerating(true);
    setChatInput('');
    
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: context === 'event' ? getEventSmartResponse(chatInput) : getSmartResponse(chatInput),
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 1200);
  };

  const getSmartResponse = (input: string): string => {
    const lower = input.toLowerCase();
    if (lower.includes('channel')) {
      return "Start with #announcements, #general, and #help. These three channels cover most community needs. Add more as your community grows.";
    } else if (lower.includes('engage')) {
      return "Focus on consistency. Post 3-5 times weekly and respond within 2 hours. Recognition goes a long way—celebrate member wins publicly.";
    }
    return "I can help with that. What specific aspect would you like guidance on?";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleApplySuggestion = (suggestion: Suggestion) => {
    if (onApplySuggestion) {
      onApplySuggestion(suggestion);
    }
    const message: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Applied: ${suggestion.title}`,
      timestamp: new Date()
    };
    setChatHistory(prev => [...prev, message]);
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    setShowMenuView(false);
  };

  const handleSelectModel = (modelPrompt: string) => {
    setChatInput(modelPrompt);
    setShowBuilderModelsView(false);
    setShowMenuView(false);
  };

  if (!isOpen) return null;

  // Builder Models View (shows all AI models by category)
  if (showBuilderModelsView) {
    const communityModels = [
      { name: 'Community Specialist', desc: 'Expert in community building, member engagement, and creating vibrant online spaces.', prompt: 'Help me build and grow my community' },
      { name: 'Growth Expert', desc: 'Focused on community growth strategies, member acquisition, and scaling your community.', prompt: 'Help me grow my community faster' },
      { name: 'Moderation Pro', desc: 'Guidelines, policies, and tools for healthy community management and conflict resolution.', prompt: 'Help me moderate my community effectively' },
      { name: 'Content Strategist', desc: 'Content planning, scheduling, and strategies to keep your community engaged.', prompt: 'Help me plan content for my community' },
    ];
    const eventModels = [
      { name: 'Event Planner', desc: 'Plan and organize events, workshops, and meetups that engage your community.', prompt: 'Help me plan a community event' },
      { name: 'Workshop Facilitator', desc: 'Design interactive workshops with exercises, breakout sessions, and learning outcomes.', prompt: 'Help me design a workshop' },
      { name: 'Event Marketer', desc: 'Promotional strategies to maximize attendance and build excitement for your events.', prompt: 'Help me promote my event' },
      { name: 'Networking Architect', desc: 'Design networking sessions that create meaningful connections between attendees.', prompt: 'Help me create networking activities' },
    ];
    const courseModels = [
      { name: 'Course Architect', desc: 'Structure courses with modules, lessons, and assessments for effective learning.', prompt: 'Help me structure my course' },
      { name: 'Learning Designer', desc: 'Apply learning science principles to create engaging and effective educational content.', prompt: 'Help me design better learning experiences' },
      { name: 'Assessment Expert', desc: 'Create quizzes, assignments, and rubrics that measure learning effectively.', prompt: 'Help me create assessments' },
    ];

    const renderModelCards = (models: typeof communityModels) =>
      models.map((model) => (
        <button
          key={model.name}
          onClick={() => handleSelectModel(model.prompt)}
          className={modelCard}
        >
          <h3 className="font-medium text-foreground mb-1.5">{model.name}</h3>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{model.desc}</p>
          <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
            Use this <span>&rarr;</span>
          </p>
        </button>
      ));

    return (
      <div className={panelShell} style={{ width: panelWidths[panelSize] }}>
        <div className={headerBar}>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowBuilderModelsView(false)} className={iconBtn} title="Back">
              <ArrowLeft className="size-4 text-muted-foreground" />
            </button>
            <div>
              <p className="text-sm font-medium text-foreground">Builder Models</p>
              <p className="text-xs text-muted-foreground">Choose a specialized AI model</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-6">
            <div>
              <p className={sectionLabel}>Community Models</p>
              <div className="space-y-3">{renderModelCards(communityModels)}</div>
            </div>
            <div>
              <p className={sectionLabel}>Event Models</p>
              <div className="space-y-3">{renderModelCards(eventModels)}</div>
            </div>
            <div>
              <p className={sectionLabel}>Course Models</p>
              <div className="space-y-3">{renderModelCards(courseModels)}</div>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  }

  // Menu View (replaces main content when hamburger is clicked)
  if (showMenuView) {
    return (
      <div className={panelShell} style={{ width: panelWidths[panelSize] }}>
        {/* Menu Header with Back Button */}
        <div className={headerBar}>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowMenuView(false)} className={iconBtn} title="Back">
              <ArrowLeft className="size-4 text-muted-foreground" />
            </button>
            <div>
              <p className="text-sm font-medium text-foreground">Menu</p>
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-6">
            
            {/* More Suggestions Section */}
            <div>
              <p className={sectionLabel}>More Suggestions</p>
              <div className="space-y-1">
                <button 
                  onClick={() => { setChatInput('What can Leapy do for course creation?'); setShowMenuView(false); }}
                  className={menuItem}
                >
                  <Sparkles className="size-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">What can Leapy do in LeapSpace</span>
                </button>
                <button onClick={() => setShowMenuView(false)} className={menuItem}>
                  <MessageSquare className="size-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">View all suggestions</span>
                </button>
              </div>
            </div>

            {/* Gems Section */}
            <div>
              <p className={sectionLabel}>Leapy Gems</p>
              <div className="space-y-1">
                {[
                  { icon: GraduationCap, label: 'Course builder', prompt: 'Help me create a course outline' },
                  { icon: Briefcase, label: 'Community specialist', prompt: 'Help me setup a community' },
                  { icon: Calendar, label: 'Event planner', prompt: 'Help me plan an event' },
                ].map((gem) => (
                  <button
                    key={gem.label}
                    onClick={() => { setChatInput(gem.prompt); setShowMenuView(false); }}
                    className={menuItem}
                  >
                    <div className="size-8 rounded-lg bg-[var(--ai-accent)] flex items-center justify-center">
                      <gem.icon className="size-4 text-[var(--ai-primary)]" />
                    </div>
                    <span className="text-sm text-foreground">{gem.label}</span>
                  </button>
                ))}
                <button onClick={() => setShowBuilderModelsView(true)} className={menuItem}>
                  <Zap className="size-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">View all builder models</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border"></div>

            {/* Actions Section */}
            <div className="space-y-1">
              <button onClick={handleClearHistory} className={menuItem}>
                <Trash2 className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Clear history</span>
              </button>
              <button onClick={() => setShowMenuView(false)} className={menuItem}>
                <MessageCircle className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Send feedback</span>
              </button>
              <button onClick={() => setShowMenuView(false)} className={menuItem}>
                <HelpCircle className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Report</span>
              </button>
            </div>

          </div>
        </ScrollArea>
      </div>
    );
  }

  // Main Copilot View
  return (
    <div className={`${panelShell} relative`} style={{ width: panelWidths[panelSize] }}>
      {/* Minimal Header */}
      <div className={headerBar}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu */}
            <button 
              onClick={() => setShowMenuView(true)}
              className={iconBtn}
              title="More options"
            >
              <div className="flex flex-col gap-1">
                <div className="w-4 h-0.5 bg-muted-foreground rounded-full"></div>
                <div className="w-4 h-0.5 bg-muted-foreground rounded-full"></div>
                <div className="w-4 h-0.5 bg-muted-foreground rounded-full"></div>
              </div>
            </button>
            <p className="text-sm font-medium text-foreground">Leapy</p>
          </div>
          <div className="flex items-center gap-1">
            {/* Size Toggle Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                className={iconBtn}
                title="Change panel size"
              >
                <Maximize2 className="size-4 text-muted-foreground" />
              </button>
              {showSizeDropdown && (
                <div className="absolute top-10 right-0 bg-popover border border-border rounded-lg z-50 min-w-[160px]">
                  <div className="py-1">
                    {(Object.keys(panelWidths) as PanelSize[]).map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setPanelSize(size);
                          setShowSizeDropdown(false);
                          if (onPanelSizeChange) {
                            onPanelSizeChange(panelWidths[size]);
                          }
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-accent transition-colors text-sm ${
                          size === panelSize ? 'text-primary bg-primary/10' : 'text-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{size.charAt(0).toUpperCase() + size.slice(1).replace('-', ' ')}</span>
                          {size === panelSize && <Check className="size-3" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Close Button */}
            <button onClick={onClose} className={iconBtn}>
              <X className="size-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Switcher Style Mode Selector */}
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = aiMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setAiMode(mode.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all ${
                  isActive 
                    ? 'bg-card text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="size-4" />
                <span className="text-xs font-medium">{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Context Indicator - Subtle */}
      {currentFocus && aiMode === 'builder' && (
        <div className="px-6 py-3 bg-[var(--ai-muted)] border-b border-[var(--ai-border)]">
          <p className="text-xs text-[var(--ai-primary)]">Editing: <span className="font-medium">{currentFocus.name}</span></p>
        </div>
      )}

      {/* Main Content - Lots of breathing room */}
      <ScrollArea className="flex-1 px-6 py-6" ref={scrollRef}>
        <div className="space-y-8">
          
          {/* BUILDER MODE - Clean Suggestions */}
          {aiMode === 'builder' && (
            <div className="space-y-6">
              {/* Event Schedule Flow - Priority check for schedule page */}
              {context === 'event' && eventContext && eventContext.currentView === 'schedule' ? (
                <EventScheduleFlow
                  eventTitle={eventContext.eventTitle}
                  eventDuration={eventContext.totalDuration || 90}
                  onAddScheduleItems={(items) => {
                    console.log('Schedule items to add:', items);
                    toast.success(`Added ${items.length} schedule items to your event`);
                    // Trigger a custom event that EventBuilderViewV2 can listen to
                    window.dispatchEvent(new CustomEvent('leapy-add-schedule', { detail: items }));
                  }}
                  onAssignSpeakers={(assignments) => {
                    console.log('Speaker assignments:', assignments);
                    toast.success('Speakers assigned successfully');
                    window.dispatchEvent(new CustomEvent('leapy-assign-speakers', { detail: assignments }));
                  }}
                  onAddDescriptions={(descriptions) => {
                    console.log('Descriptions:', descriptions);
                    toast.success('Descriptions added successfully');
                    window.dispatchEvent(new CustomEvent('leapy-add-descriptions', { detail: descriptions }));
                  }}
                />
              ) : context === 'event' && eventSuggestions.length > 0 ? (
                <div>
                  {eventContext && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`size-2 rounded-full ${
                        eventContext.lifecycleStage === 'live' ? 'bg-red-500 animate-pulse' :
                        eventContext.lifecycleStage === 'published' ? 'bg-green-500' :
                        eventContext.lifecycleStage === 'cancelled' ? 'bg-muted-foreground' :
                        'bg-primary'
                      }`} />
                      <p className="text-xs text-muted-foreground capitalize">
                        {eventContext.lifecycleStage} — {eventContext.completionDone}/{eventContext.completionTotal} complete
                      </p>
                    </div>
                  )}
                  <p className={sectionLabel}>Suggestions</p>
                  <div className="space-y-3">
                    {eventSuggestions.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div key={s.id} className="p-4 rounded-xl border border-border hover:border-primary/30 bg-card transition-all">
                          <div className="flex items-start gap-3">
                            <div className="size-8 rounded-lg bg-[var(--ai-accent)] flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="size-4 text-[var(--ai-primary)]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground leading-relaxed mb-3">{s.text}</p>
                              <button
                                onClick={s.onAction}
                                className="px-3 py-1.5 bg-[var(--ai-primary)] hover:bg-[var(--ai-hover)] text-[var(--ai-primary-foreground)] text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1.5"
                              >
                                {s.action}
                              </button>
                            </div>
                            <button
                              onClick={() => toast('Suggestion dismissed')}
                              className="size-6 rounded flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted transition-colors flex-shrink-0"
                              title="Dismiss"
                            >
                              <ThumbsDown className="size-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : context === 'event' && eventContext ? (
                <div className="text-center py-12">
                  <div className="size-12 mx-auto mb-4 rounded-full bg-[var(--ai-accent)] flex items-center justify-center">
                    <Rocket className="size-6 text-[var(--ai-primary)]" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">All caught up!</p>
                  <p className="text-xs text-muted-foreground">No suggestions right now. Use the chat below to ask me anything about your event.</p>
                </div>
              ) : suggestions.length > 0 ? (
                <>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
                      Suggestions
                    </p>
                    <div className="space-y-3">
                      {suggestions.map((suggestion) => (
                        <div 
                          key={suggestion.id}
                          onMouseEnter={() => setHoveredSuggestion(suggestion.id)}
                          onMouseLeave={() => setHoveredSuggestion(null)}
                          className="group relative"
                        >
                          <div className="p-4 rounded-xl border border-border hover:border-primary/30 bg-card transition-all cursor-pointer">
                            <p className="font-medium text-foreground mb-2">{suggestion.title}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{suggestion.preview}</p>
                            
                            {suggestion.impact && (
                              <p className="text-xs text-green-600 font-medium">{suggestion.impact}</p>
                            )}

                            {hoveredSuggestion === suggestion.id && (
                              <button
                                onClick={() => handleApplySuggestion(suggestion)}
                                className="absolute top-4 right-4 px-3 py-1.5 bg-[var(--ai-primary)] hover:bg-[var(--ai-hover)] text-[var(--ai-primary-foreground)] text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
                              >
                                <Check className="size-3" />
                                Apply
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="size-12 mx-auto mb-4 rounded-full bg-[var(--ai-accent)] flex items-center justify-center">
                    <Sparkles className="size-6 text-[var(--ai-primary)]" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Ready to help you build</p>
                  <p className="text-xs text-muted-foreground">Focus on a field to see suggestions</p>
                </div>
              )}
            </div>
          )}

          {/* HELPER MODE - Clean Chat */}
          {aiMode === 'helper' && (
            <div className="space-y-6">
              {chatHistory.length === 0 ? (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="size-12 mx-auto mb-4 rounded-full bg-[var(--ai-accent)] flex items-center justify-center">
                      <Lightbulb className="size-6 text-[var(--ai-primary)]" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">How can I help?</p>
                    <p className="text-xs text-muted-foreground">
                      {context === 'event' ? 'Ask me about event planning, promotion, pricing, or engagement' : 'Ask me anything'}
                    </p>
                  </div>

                  {/* Quick Topics - Context-aware */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Quick Help
                    </p>
                    {(context === 'event' ? [
                      'How should I structure my agenda?',
                      'What pricing strategy works best?',
                      'How do I promote my event?',
                      'Best ways to engage attendees?',
                      'How to write a follow-up email?',
                    ] : [
                      'How to increase engagement?',
                      'Best practices for growth',
                      'Setting up guidelines'
                    ]).map((topic, idx) => (
                      <button
                        key={idx}
                        onClick={() => setChatInput(topic)}
                        className="w-full text-left px-4 py-3 rounded-lg border border-border hover:border-[var(--ai-border)] hover:bg-[var(--ai-accent)] transition-all text-sm text-foreground"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {chatHistory.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.role === 'assistant' && (
                        <div className="size-8 flex-shrink-0 mt-1">
                          <LeapyLogo />
                        </div>
                      )}
                      <div className={`max-w-[85%] ${message.role === 'user' ? 'text-right' : ''}`}>
                        <div className={`inline-block px-4 py-3 rounded-2xl ${
                          message.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-foreground'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        {/* AI Credits Indicator for assistant messages */}
                        {message.role === 'assistant' && (
                          <div className="mt-2 flex items-center gap-2">
                            <AICreditsIndicator credits={Math.floor(Math.random() * 15) + 5} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isGenerating && (
                    <div className="flex gap-3">
                      <div className="size-8 flex-shrink-0 mt-1">
                        <LeapyLogo />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ANALYST MODE - Clean Metrics */}
          {aiMode === 'analyst' && userRole === 'admin' && (
            <div className="space-y-6">
              {context === 'event' && eventContext ? (
                <>
                  {/* Event Readiness / Performance Score */}
                  <div>
                    <p className={sectionLabel}>Event {eventContext.lifecycleStage === 'ended' ? 'Performance' : 'Readiness'}</p>
                    <div className="p-6 rounded-xl border border-border bg-card">
                      <div className="flex items-end gap-2 mb-4">
                        <p className="text-5xl font-bold text-primary">
                          {eventContext.lifecycleStage === 'ended' ? '78' :
                           Math.round((eventContext.completionDone / eventContext.completionTotal) * 100)}
                        </p>
                        <p className="text-lg text-muted-foreground mb-2">/ 100</p>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mb-3">
                        <div
                          className="h-2 rounded-full bg-[var(--ai-primary)] transition-all"
                          style={{ width: `${eventContext.lifecycleStage === 'ended' ? 78 : Math.round((eventContext.completionDone / eventContext.completionTotal) * 100)}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {eventContext.lifecycleStage === 'ended'
                          ? 'Good event overall. Engagement above average.'
                          : `${eventContext.completionDone}/${eventContext.completionTotal} setup items complete.`}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div>
                    <p className={sectionLabel}>Key Metrics</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Registrations</p>
                          <p className="text-2xl font-bold text-primary">{eventContext.registrationCount}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">/ {eventContext.capacity} capacity</p>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Fill Rate</p>
                          <p className={`text-2xl font-bold ${eventContext.registrationCount / eventContext.capacity > 0.7 ? 'text-green-600' : 'text-primary'}`}>
                            {Math.round((eventContext.registrationCount / eventContext.capacity) * 100)}%
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {eventContext.capacity - eventContext.registrationCount} spots left
                        </p>
                      </div>
                      {eventContext.waitlistCount > 0 && (
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Waitlist</p>
                            <p className="text-2xl font-bold text-primary">{eventContext.waitlistCount}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">people waiting</p>
                        </div>
                      )}
                      {eventContext.isPaid && (
                        <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                            <p className="text-2xl font-bold text-green-600">
                              ${((eventContext.price || 0) * eventContext.registrationCount).toLocaleString()}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">${eventContext.price} x {eventContext.registrationCount}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Insight */}
                  <div className="p-4 rounded-xl bg-[var(--ai-muted)] border border-[var(--ai-border)]">
                    <p className="text-sm text-foreground leading-relaxed">
                      {eventContext.lifecycleStage === 'skeleton' || eventContext.lifecycleStage === 'building'
                        ? 'Complete all setup items to unlock publishing. Events published 2+ weeks ahead get 40% more registrations.'
                        : eventContext.lifecycleStage === 'published'
                        ? `Registration velocity is ${eventContext.registrationCount > 20 ? 'strong' : 'moderate'}. ${eventContext.registrationCount > 20 ? 'Keep the momentum with social sharing.' : 'Consider sending invitations or sharing on social media.'}`
                        : eventContext.lifecycleStage === 'live'
                        ? `${eventContext.liveViewers || 0} viewers right now. Peak engagement typically happens in the first 30 minutes.`
                        : eventContext.lifecycleStage === 'ended'
                        ? 'Send a follow-up email within 24 hours to maximize repeat attendance. Events with surveys see 60% better retention.'
                        : 'No insights available for this stage.'}
                    </p>
                  </div>
                </>
              ) : (
                <>
              {/* Health Score */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
                  Community Health
                </p>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-end gap-2 mb-4">
                    <p className="text-5xl font-bold text-primary">73</p>
                    <p className="text-lg text-muted-foreground mb-2">/ 100</p>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-3">
                    <div 
                      className="h-2 rounded-full bg-[var(--ai-primary)] transition-all" 
                      style={{ width: '73%' }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Good health overall. Room for improvement.</p>
                </div>
              </div>

              {/* Key Metrics - Simplified */}
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
                  Key Metrics
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Growth', value: '+23%', subtext: 'This month', color: 'text-green-600' },
                    { label: 'Engagement', value: '67%', subtext: 'Active rate', color: 'text-chart-1' },
                    { label: 'Members', value: '247', subtext: '+12 this week', color: 'text-primary' }
                  ].map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                        <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{metric.subtext}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Single Insight */}
              <div className="p-4 rounded-xl bg-[var(--ai-muted)] border border-[var(--ai-border)]">
                <p className="text-sm text-foreground leading-relaxed">
                  Peak activity is weekdays 2-4 PM. Schedule your posts during this window for maximum engagement.
                </p>
              </div>
                </>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Advanced Input Area */}
      <div className="border-t border-border bg-card">
        {/* Contextual Suggestion Tabs */}
        {aiMode === 'builder' && context === 'course' && (
          <div className="bg-muted border-b border-border px-4 py-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {/* Sparkle Icon */}
              <div className="flex-shrink-0">
                <svg className="size-3" fill="none" viewBox="0 0 12 12">
                  <g clipPath="url(#clip0_413_1242)">
                    <path d={svgPaths.pfd5d500} stroke="currentColor" className="text-primary" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_413_1242">
                      <rect fill="white" height="12" width="12" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              {/* Suggestion Buttons */}
              {[
                'Generate module outline',
                'Create quiz',
                'Improve description',
                'Add learning outcomes'
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setChatInput(suggestion)}
                  className="flex-shrink-0 px-2.5 py-1.5 bg-card rounded-lg border border-border hover:border-[var(--ai-border)] hover:bg-[var(--ai-accent)] transition-all"
                >
                  <span className="text-xs text-foreground whitespace-nowrap">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Event-specific quick action chips */}
        {aiMode === 'builder' && context === 'event' && (
          <div className="bg-muted border-b border-border px-4 py-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              <div className="flex-shrink-0">
                <Rocket className="size-3 text-primary" />
              </div>
              {(eventContext?.lifecycleStage === 'skeleton' || eventContext?.lifecycleStage === 'building' ? [
                'Generate agenda',
                'Suggest pricing',
                'Write description',
                'Add speakers',
              ] : eventContext?.lifecycleStage === 'published' ? [
                'Draft social post',
                'Send reminder',
                'Write invite email',
                'Boost registrations',
              ] : eventContext?.lifecycleStage === 'ended' ? [
                'Draft follow-up',
                'Create survey',
                'Analyze attendance',
                'Plan next event',
              ] : [
                'Help with my event',
                'Improve engagement',
                'Marketing ideas',
              ]).map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => setChatInput(suggestion)}
                  className="flex-shrink-0 px-2.5 py-1.5 bg-card rounded-lg border border-border hover:border-[var(--ai-border)] hover:bg-[var(--ai-accent)] transition-all"
                >
                  <span className="text-xs text-foreground whitespace-nowrap">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Input Container */}
        <div className="px-4 pt-4 pb-4">
          {/* Prompt Input Box */}
          <div className="relative group mb-3">
            <div className={`relative bg-card rounded-xl transition-all ${chatInput.length > 0 ? 'border-2 border-primary/50' : 'border border-border'} overflow-hidden`}>
              {/* Textarea Input Area */}
              <div className="p-3">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe what you want to create... (Press / for commands)"
                  className="w-full resize-none text-sm text-foreground placeholder-muted-foreground focus:outline-none bg-transparent"
                  rows={3}
                  style={{ lineHeight: '20px', letterSpacing: '-0.1504px', minHeight: '60px' }}
                />
              </div>

              {/* Toolbox - Action Buttons Row */}
              <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-muted/50">
                {/* Left Side - Action Buttons */}
                <div className="flex items-center gap-1">
                  {/* Voice Button */}
                  <button 
                    className="size-7 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
                    title="Voice input"
                  >
                    <svg className="size-3.5" fill="none" viewBox="0 0 14 14">
                      <g>
                        <path d="M7 11.0833V12.8333" stroke="currentColor" className="text-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        <path d={svgPaths.p2a46bd80} stroke="currentColor" className="text-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                        <path d={svgPaths.p2db7f480} stroke="currentColor" className="text-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                      </g>
                    </svg>
                  </button>

                  {/* Attach Button */}
                  <button 
                    className="size-7 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
                    title="Attach files"
                  >
                    <svg className="size-3.5" fill="none" viewBox="0 0 14 14">
                      <g>
                        <path d={svgPaths.p1004e200} stroke="currentColor" className="text-foreground" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                      </g>
                    </svg>
                  </button>

                  {/* Template Button */}
                  <button 
                    onClick={() => setShowBuilderModelsView(true)}
                    className="size-7 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
                    title="Use template"
                  >
                    <div className="size-3.5 flex items-center justify-center text-foreground font-medium text-[10px]">
                      |||
                    </div>
                  </button>
                </div>

                {/* Right Side - Send Button */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleSend}
                    disabled={!chatInput.trim() || isGenerating}
                    className="size-8 rounded-lg flex items-center justify-center text-[var(--ai-primary-foreground)] disabled:opacity-50 disabled:cursor-not-allowed transition-all bg-[var(--ai-primary)] hover:bg-[var(--ai-hover)]"
                  >
                    {isGenerating ? (
                      <RefreshCw className="size-4 animate-spin" />
                    ) : (
                      <svg className="size-4" fill="none" viewBox="0 0 16 16">
                        <g clipPath="url(#clip0_413_1238)">
                          <path d={svgPaths.p151c1700} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                          <path d={svgPaths.p1110efc0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                        </g>
                        <defs>
                          <clipPath id="clip0_413_1238">
                            <rect fill="white" height="16" width="16" />
                          </clipPath>
                        </defs>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row - REMOVED (moved into toolbox) */}
        </div>
      </div>
    </div>
  );
}
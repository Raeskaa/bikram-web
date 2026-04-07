import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import TrueLeapLogo from '../imports/Frame315115';
import { 
  Calendar, Clock, Users, Video, Share2, Check, Globe, Play,
  MessageCircle, ChevronRight, ArrowLeft, Download, ChevronDown,
  Award, Bell, Settings, Heart, Star, Eye, Bookmark, Link2, Mail, QrCode,
  Send, Copy, CalendarPlus, HelpCircle, Shield, Briefcase, X, Building2, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserMenu } from './UserMenu';
import { LeapSpaceSwitcher } from './LeapSpaceSwitcher';
import { PublicEventLandingV1Tabbed } from './PublicEventLandingV1Tabbed';
import { PublicEventLandingV2Tabbed } from './PublicEventLandingV2Tabbed';
import { PublicEventLandingV3Tabbed } from './PublicEventLandingV3Tabbed';
import { PublicEventLandingV4Tabbed } from './PublicEventLandingV4Tabbed';
import { PublicEventLandingV5Tabbed } from './PublicEventLandingV5Tabbed';
import { EventStatusBanner } from './EventStatusBanner';
import { useAuth } from '../contexts/AuthContext';
import {
  getUserRegistrationStatus,
  getEventLifecycleStage,
  isEventCancelled,
  isEventSoldOut,
  mockEvents,
  type Event,
} from '../data/mockEventData';
import { useEventCTA, EventCTAModals } from './events/EventCTAModals';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface StandaloneEvent {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  hostName: string;
  hostAvatar: string;
  hostBio: string;
  startDate: string;
  time: string;
  timezone: string;
  duration: number;
  eventType: 'virtual' | 'in-person' | 'hybrid';
  category: string[];
  registrationCount: number;
  capacity: number;
  communityName?: string;
  communityLogo?: string;
  tags: string[];
  schedule?: any[]; // Added schedule support
}

interface PublicEventLandingProps {
  event: StandaloneEvent;
  onBack: () => void;
  onEnterLiveEvent: () => void;
  onJoinLeapSpace: () => void;
  onOpenCalendar?: (date?: string) => void;
}

export function PublicEventLanding({ event, onBack, onEnterLiveEvent, onJoinLeapSpace, onOpenCalendar }: PublicEventLandingProps) {
  const { currentUser } = useAuth();
  const { activeEvent: ctaEvent, isOpen: ctaOpen, openCTA, setIsOpen: setCtaOpen } = useEventCTA();

  // Resolve the FULL event object from mockEventData for CTA flows
  // The StandaloneEvent prop is stripped of flow-critical fields (accessType, isPaid, tickets, etc.)
  // We need the full Event for determineCTAFlow to work correctly
  const fullEvent: Event | undefined = mockEvents.find(e => e.id === event.id);

  // Helper to open CTA with the full event data (not the stripped StandaloneEvent)
  const handleOpenCTA = () => {
    if (fullEvent) {
      openCTA(fullEvent);
    }
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeChatTab, setActiveChatTab] = useState('messages');
  const [activeTab, setActiveTab] = useState('overview');
  // const [uiVersion, setUiVersion] = useState<'v1' | 'v2' | 'v3' | 'v4' | 'v5'>('v3');
  const [recommendationType, setRecommendationType] = useState<'events' | 'courses' | 'communities'>('events');
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Tier 2: Modal states
  const [askOrganizerOpen, setAskOrganizerOpen] = useState(false);
  const [attendeeListOpen, setAttendeeListOpen] = useState(false);
  const [refundPolicyOpen, setRefundPolicyOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  // Tier 3: Modal states
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [discussionOpen, setDiscussionOpen] = useState(false);
  
  // Learner tab navigation (v4+)
  const [activeLearnerTab, setActiveLearnerTab] = useState<'overview' | 'agenda' | 'learn' | 'community' | 'resources' | 'reviews' | 'chat'>('overview');

  const handleShare = (platform: string) => {
    const url = `https://leapy.ai/event/${event.id}`;
    const text = `Check out this event: ${event.title}`;
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(event.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
        break;
    }
  };

  const handleAddToCalendar = () => {
    // Generate .ics file
    const startDate = new Date(event.startDate + ' ' + event.time);
    const endDate = new Date(startDate.getTime() + event.duration * 60000);
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.eventType === 'virtual' ? 'Online' : 'TBD'}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
    link.click();
  };

  // Mock data
  const agenda = event.schedule ? event.schedule.map((item: any) => ({
    time: item.time,
    title: item.title,
    desc: item.description,
    duration: `${item.duration} min`
  })) : [
    { time: "00:00", title: "Kickoff & The AI Landscape", desc: "Setting the stage for AI in the creator economy.", duration: "15 min" },
    { time: "00:15", title: "Building RAG Pipelines", desc: "Connecting data to AI models without code.", duration: "30 min" },
    { time: "00:45", title: "Live Demo", desc: "Watch a live Leapy AI integration.", duration: "30 min" },
    { time: "01:15", title: "Q&A", desc: "Direct access to our engineering team.", duration: "15 min" }
  ];

  const learningOutcomes = [
    "Build AI automation workflows",
    "Connect AI with APIs and databases",
    "Deploy and scale AI workflows",
    "Create autonomous AI systems"
  ];

  const eventIncludes = [
    { icon: Video, label: "90-min live session" },
    { icon: Download, label: "Downloadable resources" },
    { icon: Award, label: "Certificate" }
  ];

  const faqs = [
    { q: "Is this event recorded?", a: "Yes, all registered attendees receive 90-day access to the session recording." },
    { q: "Do I need prior AI knowledge?", a: "No, we start with fundamentals before advanced topics." },
    { q: "Can I ask questions?", a: "Absolutely. We have a dedicated Q&A block." }
  ];

  const attendees = [
    { name: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop" },
    { name: "Mike", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&fit=crop" },
    { name: "Emma", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&h=200&fit=crop" },
    { name: "John", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&fit=crop" }
  ];

  const isPaidEvent = fullEvent?.isPaid ?? true;

  // Social Proof Data
  const hostStats = {
    eventsHosted: 12,
    totalAttendees: 450,
    rating: 4.8,
    liveViewers: 23,
    recentRegistrations: 89
  };

  const spotsRemaining = event.capacity - event.registrationCount;
  const capacityPercentage = (event.registrationCount / event.capacity) * 100;

  const savedCount = 324; // Mock data

  // What's Included (Enhanced)
  const whatsIncluded = [
    { icon: Video, label: "90-min live session", value: "Interactive workshop" },
    { icon: Download, label: "Resources & templates", value: "Downloadable materials" },
    { icon: Award, label: "Certificate of completion", value: "Share on LinkedIn" },
    { icon: Play, label: "90-day recording access", value: "Rewatch anytime" }
  ];

  // Tier 2: Extended Attendee List
  const extendedAttendees = [
    { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop", role: "Product Designer", company: "Figma" },
    { name: "Mike Johnson", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&fit=crop", role: "Software Engineer", company: "Google" },
    { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&h=200&fit=crop", role: "UX Researcher", company: "Microsoft" },
    { name: "John Davis", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&fit=crop", role: "Founder", company: "StartupCo" },
    { name: "Priya Patel", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop", role: "AI Engineer", company: "OpenAI" },
    { name: "Alex Martinez", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop", role: "Developer", company: "Stripe" },
    { name: "Lisa Anderson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop", role: "Data Scientist", company: "Netflix" },
    { name: "David Kim", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop", role: "Product Manager", company: "Airbnb" },
    { name: "Sofia Rodriguez", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&fit=crop", role: "Designer", company: "Adobe" },
    { name: "Ryan Lee", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop", role: "Developer", company: "GitHub" },
    { name: "Maya Thompson", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop", role: "Marketing", company: "HubSpot" },
    { name: "James Brown", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop", role: "Engineer", company: "Tesla" }
  ];

  const attendeeStats = {
    designers: extendedAttendees.filter(a => a.role.includes('Design')).length,
    developers: extendedAttendees.filter(a => a.role.includes('Developer') || a.role.includes('Engineer')).length,
    founders: extendedAttendees.filter(a => a.role.includes('Founder') || a.role.includes('Manager')).length
  };

  // Tier 2: Similar Events by Host
  const hostEvents = [
    { 
      id: 'h1', 
      title: 'Building Production-Ready AI Apps', 
      date: 'Mar 25, 2026', 
      attendees: 156, 
      price: 999,
      status: 'upcoming' as const
    },
    { 
      id: 'h2', 
      title: 'AI Automation Workshop (Past)', 
      date: 'Jan 15, 2026', 
      attendees: 234, 
      price: 799,
      status: 'past' as const,
      rating: 4.9
    },
    { 
      id: 'h3', 
      title: 'Advanced RAG Techniques', 
      date: 'Apr 10, 2026', 
      attendees: 89, 
      price: 1499,
      status: 'upcoming' as const
    }
  ];

  // Tier 2: Refund Policy & Trust Badges
  const refundPolicy = {
    refundWindow: "100% refund up to 24 hours before the event",
    satisfaction: "Satisfaction guaranteed or your money back",
    security: "Secure payment processing with industry-standard encryption",
    accessibility: "Closed captions and screen reader support available",
    language: "Available in English with live Q&A translation"
  };

  const hostResponseTime = "Usually replies in 2 hours";

  // Tier 3: Reviews & Ratings
  const reviews = [
    {
      id: 'r1',
      userName: 'Sarah Mitchell',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop',
      rating: 5,
      date: 'Jan 20, 2026',
      text: 'Absolutely transformative workshop! The hands-on exercises were practical and immediately applicable to my work. Worth every penny.',
      helpful: 24,
      hostResponse: 'Thank you Sarah! So glad you found it valuable. Keep building amazing things!'
    },
    {
      id: 'r2',
      userName: 'Michael Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
      rating: 5,
      date: 'Jan 18, 2026',
      text: 'Best AI workshop I\'ve attended. The instructor really knows their stuff and makes complex concepts easy to understand.',
      helpful: 18,
      hostResponse: null
    },
    {
      id: 'r3',
      userName: 'Emily Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop',
      rating: 4,
      date: 'Jan 15, 2026',
      text: 'Great content and good pace. Would have loved more time for Q&A but overall excellent experience.',
      helpful: 12,
      hostResponse: 'Thanks Emily! We\'ve added 15 extra minutes for Q&A in upcoming sessions based on your feedback.'
    }
  ];
  const averageRating = 4.8;
  const totalReviews = 127;

  // Tier 3: Discussion Thread Preview
  const discussions = [
    {
      id: 'd1',
      userName: 'Alex Kumar',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop',
      time: '2 hours ago',
      message: 'Looking forward to this! Has anyone worked with GPT-4 API before? Would love to connect.',
      replies: 5
    },
    {
      id: 'd2',
      userName: 'Lisa Thompson',
      userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&fit=crop',
      time: '5 hours ago',
      message: 'Quick question - will we need any specific software installed beforehand?',
      replies: 2
    },
    {
      id: 'd3',
      userName: 'David Park',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop',
      time: '1 day ago',
      message: 'This is exactly what I needed to level up my AI skills! See you all there',
      replies: 8
    }
  ];

  // Tier 3: Resource Preview
  const resources = {
    prework: [
      { title: 'Introduction to LLMs', type: 'article', duration: '10 min read', checked: false },
      { title: 'Python basics refresher', type: 'video', duration: '15 min', checked: false },
      { title: 'API authentication guide', type: 'pdf', duration: '5 min read', checked: false }
    ],
    materials: [
      { title: 'Workshop slides (PDF)', type: 'pdf', size: '2.4 MB', visibility: 'public', downloads: 45 },
      { title: 'Code templates & examples', type: 'zip', size: '8.1 MB', visibility: 'registered', downloads: 32 },
      { title: 'Resource list & references', type: 'pdf', size: '1.2 MB', visibility: 'public', downloads: 18 },
      { title: 'Workshop Recording', type: 'video', size: '', url: 'https://leapcast.ai/recordings/abc', visibility: 'post-event', downloads: 0 }
    ]
  };

  const preWorkLinks = [
    { title: 'Introduction to LLMs', url: '#' },
    { title: 'Python basics refresher', url: '#' },
    { title: 'API authentication guide', url: '#' }
  ];

  const chatMessages = [
    { id: '1', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', message: 'Really excited for this workshop!', time: '2m ago' },
    { id: '2', name: 'Alex Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', message: 'Any prerequisites we should know about?', time: '5m ago' },
    { id: '3', name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', message: 'Looking forward to the live demo section', time: '8m ago' }
  ];

  // Tier 3: Comparison Data
  const comparisonEvents = [
    {
      id: 'c1',
      title: 'This Event',
      price: 799,
      duration: '90 min',
      liveSession: true,
      recording: true,
      qna: true,
      certificate: true,
      community: true,
      rating: 4.8,
      attendees: event.registrationCount,
      isCurrentEvent: true
    },
    {
      id: 'c2',
      title: 'AI Basics Workshop',
      price: 499,
      duration: '60 min',
      liveSession: true,
      recording: true,
      qna: false,
      certificate: false,
      community: false,
      rating: 4.2,
      attendees: 89
    },
    {
      id: 'c3',
      title: 'Advanced AI Bootcamp',
      price: 2499,
      duration: '4 hours',
      liveSession: true,
      recording: true,
      qna: true,
      certificate: true,
      community: true,
      rating: 4.9,
      attendees: 234
    }
  ];

  // Tier 3: Personalization Data
  const personalizationData = {
    basedOnInterests: ['AI & Machine Learning', 'Python Programming', 'Product Development'],
    learningPath: 'AI Development Track',
    recommendedFor: 'Based on your profile',
    matchScore: 92
  };

  // LeapSpace Info
  const leapSpaceInfo = {
    name: "AI Creators LeapSpace",
    description: "Join a thriving community of 1,200+ creators and learners exploring AI together",
    memberCount: 1234
  };

  // Mock Recommendations
  const recommendations = {
    events: [
      { id: '1', type: 'event' as const, title: 'Advanced Python for Data Science', attendees: 245, price: 999, updated: '2 days ago' },
      { id: '2', type: 'event' as const, title: 'Machine Learning Fundamentals Workshop', attendees: 189, price: 0, updated: '1 week ago' },
      { id: '3', type: 'event' as const, title: 'Building Production ML Systems', attendees: 312, price: 1499, updated: '3 days ago' }
    ],
    courses: [
      { id: '4', type: 'course' as const, title: 'Complete AI Development Bootcamp', students: 1240, price: 2999, rating: 4.8, duration: '12 weeks' },
      { id: '5', type: 'course' as const, title: 'Python for Beginners', students: 3421, price: 0, rating: 4.9, duration: '6 weeks' },
      { id: '6', type: 'course' as const, title: 'Deep Learning Specialization', students: 892, price: 3999, rating: 4.7, duration: '16 weeks' }
    ],
    communities: [
      { id: '7', type: 'community' as const, title: 'AI Builders Community', members: 5420, price: 0, description: 'Connect with AI enthusiasts worldwide' },
      { id: '8', type: 'community' as const, title: 'Python Developers Hub', members: 8932, price: 499, description: 'Monthly meetups and code reviews' },
      { id: '9', type: 'community' as const, title: 'Data Science Collective', members: 3210, price: 0, description: 'Share projects and learn together' }
    ]
  };

  const currentRecommendations = recommendations[recommendationType];

  // Phase 5/6: Compute hidden tabs based on registration status + anonymous state
  // Per MOCK_EVENTS_MASTER_PLAN.md:
  //   Anonymous (Event M): only overview visible
  //   Rejected (Event G): only overview + reviews visible
  //   Pending application (Event F): overview + agenda + reviews visible
  //   Waitlisted (Event H): overview + agenda + reviews visible
  //   Registered/confirmed: all tabs visible
  const computeHiddenTabs = (): string[] => {
    const isAnonymous = !currentUser;
    if (isAnonymous) {
      return ['learn', 'community', 'resources', 'chat'];
    }
    const regStatus = getUserRegistrationStatus(event.id, currentUser.email);
    if (regStatus === 'rejected') {
      return ['agenda', 'learn', 'community', 'resources', 'chat'];
    }
    if (regStatus === 'applied' || regStatus === 'waitlist') {
      return ['learn', 'community', 'resources', 'chat'];
    }
    return [];
  };
  const hiddenTabs = computeHiddenTabs();

  // Tier 2: Ask Organizer Modal
  const AskOrganizerModal = () => (
    <Dialog open={askOrganizerOpen} onOpenChange={setAskOrganizerOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ask the organizer</DialogTitle>
          <DialogDescription>
            Have questions about this event? Send a message to {event.hostName}. {hostResponseTime}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Input
              placeholder="Your name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
          </div>
          <div>
            <Textarea
              placeholder="What would you like to know?"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAskOrganizerOpen(false)}>Cancel</Button>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => {
              // In real app: send message
              setAskOrganizerOpen(false);
              setQuestionText('');
              setSenderName('');
              setSenderEmail('');
            }}
          >
            Send message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Tier 2: Attendee List Modal
  const AttendeeListModal = () => (
    <Dialog open={attendeeListOpen} onOpenChange={setAttendeeListOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Who's attending - {event.registrationCount} people</DialogTitle>
          <DialogDescription>
            {attendeeStats.designers} designers - {attendeeStats.developers} developers - {attendeeStats.founders} product leaders
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="grid gap-3">
            {extendedAttendees.map((attendee, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                <Avatar className="size-12">
                  <AvatarImage src={attendee.avatar} />
                  <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{attendee.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Briefcase className="size-3" />
                    {attendee.role}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Building2 className="size-3" />
                    {attendee.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={onJoinLeapSpace}
            className="bg-primary hover:bg-primary/90 w-full"
          >
            Network before the event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Tier 2: Refund Policy Modal
  const RefundPolicyModal = () => (
    <Dialog open={refundPolicyOpen} onOpenChange={setRefundPolicyOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Refund policy & guarantees</DialogTitle>
          <DialogDescription>
            Your satisfaction and security are our priorities
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <Check className="size-5 text-green-700" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Flexible cancellation</p>
              <p className="text-xs text-muted-foreground">{refundPolicy.refundWindow}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Shield className="size-5 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Satisfaction guarantee</p>
              <p className="text-xs text-muted-foreground">{refundPolicy.satisfaction}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Secure payments</p>
              <p className="text-xs text-muted-foreground">{refundPolicy.security}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
              <Globe className="size-5 text-orange-700" />
            </div>
            <div>
              <p className="font-semibold text-sm mb-1">Accessibility</p>
              <p className="text-xs text-muted-foreground">{refundPolicy.accessibility}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setRefundPolicyOpen(false)} className="w-full">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Tier 3: Comparison Modal
  const ComparisonModal = () => (
    <Dialog open={comparisonOpen} onOpenChange={setComparisonOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Compare events</DialogTitle>
          <DialogDescription>
            See how this event stacks up against alternatives
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card border-b">
              <tr>
                <th className="text-left p-2 font-semibold">Feature</th>
                {comparisonEvents.map((evt) => (
                  <th key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    <p className="font-semibold text-xs mb-1">{evt.title}</p>
                    {evt.isCurrentEvent && <Badge className="bg-primary text-white text-xs">This event</Badge>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-medium">Price</td>
                {comparisonEvents.map((evt) => (
                  <td key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    {evt.price}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Duration</td>
                {comparisonEvents.map((evt) => (
                  <td key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    {evt.duration}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Rating</td>
                {comparisonEvents.map((evt) => (
                  <td key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      {evt.rating}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Live session</td>
                {comparisonEvents.map((evt) => (
                  <td key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    {evt.liveSession ? <Check className="size-4 text-green-600 mx-auto" /> : <X className="size-4 text-muted-foreground mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Recording access</td>
                {comparisonEvents.map((evt) => (
                  <td key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    {evt.recording ? <Check className="size-4 text-green-600 mx-auto" /> : <X className="size-4 text-muted-foreground mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Live Q&A</td>
                {comparisonEvents.map((evt) => (
                  <td key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    {evt.qna ? <Check className="size-4 text-green-600 mx-auto" /> : <X className="size-4 text-muted-foreground mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Certificate</td>
                {comparisonEvents.map((evt) => (
                  <td key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    {evt.certificate ? <Check className="size-4 text-green-600 mx-auto" /> : <X className="size-4 text-muted-foreground mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Community access</td>
                {comparisonEvents.map((evt) => (
                  <td key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    {evt.community ? <Check className="size-4 text-green-600 mx-auto" /> : <X className="size-4 text-muted-foreground mx-auto" />}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Attendees</td>
                {comparisonEvents.map((evt) => (
                  <td key={evt.id} className={`p-2 text-center ${evt.isCurrentEvent ? 'bg-primary/10' : ''}`}>
                    {evt.attendees}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setComparisonOpen(false)}>Close</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={onEnterLiveEvent}>
            Register for this event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Tier 3: Resources Modal
  const ResourcesModal = () => (
    <Dialog open={resourcesOpen} onOpenChange={setResourcesOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Event materials & resources</DialogTitle>
          <DialogDescription>
            Download everything you need to prepare
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h4 className="font-semibold text-sm mb-3">Pre-work (Optional)</h4>
            <div className="space-y-2">
              {resources.prework.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                  <Download className="size-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.type} - {item.duration}</p>
                  </div>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Workshop materials</h4>
            <div className="space-y-2">
              {resources.materials.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                  <Download className="size-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.type} - {item.size}</p>
                  </div>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setResourcesOpen(false)}>Close</Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="size-4 mr-2" />
            Download all
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // Tier 3: Discussion Modal
  const DiscussionModal = () => (
    <Dialog open={discussionOpen} onOpenChange={setDiscussionOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Event discussions</DialogTitle>
          <DialogDescription>
            Connect with other attendees before the event
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {discussions.map((disc) => (
            <Card key={disc.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={disc.userAvatar} />
                    <AvatarFallback>{disc.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{disc.userName}</p>
                      <span className="text-xs text-muted-foreground">{disc.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{disc.message}</p>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <MessageCircle className="size-3 mr-1" />
                        Reply ({disc.replies})
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="border-t pt-4">
          <Textarea placeholder="Share your thoughts or ask a question..." rows={3} />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setDiscussionOpen(false)}>Cancel</Button>
            <Button className="bg-primary hover:bg-primary/90">Post message</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Tier 1: Share Menu Component
  const ShareMenu = ({ variant = 'default' }: { variant?: 'default' | 'minimal' | 'playful' }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size={variant === 'minimal' ? 'icon' : 'default'}
          className={
            variant === 'playful' 
              ? 'rounded-xl border-2 font-semibold' 
              : variant === 'minimal' 
              ? 'size-10 rounded-xl' 
              : 'h-9'
          }
        >
          <Share2 className="size-4" />
          {variant === 'default' && <span className="ml-2">Share</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleShare('linkedin')}>
          <Send className="size-4" />
          <span>Share on LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('twitter')}>
          <Send className="size-4" />
          <span>Share on Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
          <Send className="size-4" />
          <span>Share on WhatsApp</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleShare('email')}>
          <Mail className="size-4" />
          <span>Email to friend</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('copy')}>
          <Copy className="size-4" />
          <span>{copiedLink ? 'Link copied!' : 'Copy link'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Tier 1: Save Button Component
  const SaveButton = ({ variant = 'default' }: { variant?: 'default' | 'minimal' | 'playful' }) => (
    <Button
      variant="outline"
      size={variant === 'minimal' ? 'icon' : 'default'}
      onClick={() => setIsSaved(!isSaved)}
      className={
        variant === 'playful'
          ? 'rounded-xl border-2 font-semibold'
          : variant === 'minimal'
          ? 'size-10 rounded-xl'
          : 'h-9'
      }
    >
      {isSaved ? (
        <Bookmark className="size-4 fill-current" />
      ) : (
        <Bookmark className="size-4" />
      )}
      {variant === 'default' && <span className="ml-2">{isSaved ? 'Saved' : 'Save'}</span>}
    </Button>
  );

  // Tier 1: Add to Calendar Button
  const AddToCalendarButton = ({ variant = 'default' }: { variant?: 'default' | 'minimal' | 'playful' }) => (
    <Button
      variant="outline"
      size={variant === 'minimal' ? 'sm' : 'default'}
      onClick={handleAddToCalendar}
      className={
        variant === 'playful'
          ? 'rounded-xl border-2 font-semibold'
          : variant === 'minimal'
          ? 'h-8 text-xs'
          : 'h-9'
      }
    >
      <CalendarPlus className="size-4" />
      <span className={variant === 'minimal' ? 'ml-1' : 'ml-2'}>Add to calendar</span>
    </Button>
  );

  // Tier 2: Ask Organizer Button
  const AskOrganizerButton = ({ variant = 'default' }: { variant?: 'default' | 'minimal' | 'playful' }) => (
    <Button
      variant="outline"
      size={variant === 'minimal' ? 'sm' : 'default'}
      onClick={() => setAskOrganizerOpen(true)}
      className={
        variant === 'playful'
          ? 'rounded-xl border-2 font-semibold'
          : variant === 'minimal'
          ? 'h-8 text-xs'
          : 'h-9'
      }
    >
      <HelpCircle className="size-4" />
      <span className={variant === 'minimal' ? 'ml-1' : 'ml-2'}>Ask organizer</span>
    </Button>
  );

  // Tier 2: Trust Badges Component
  const TrustBadges = () => (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <button 
        onClick={() => setRefundPolicyOpen(true)}
        className="flex items-center gap-1 hover:text-primary transition-colors"
      >
        <Shield className="size-3" />
        <span>Refund policy</span>
      </button>
      <span>-</span>
      <span className="flex items-center gap-1">
        <Check className="size-3 text-green-600" />
        <span>Secure payment</span>
      </span>
    </div>
  );

  return (
    <div className="h-full bg-background overflow-hidden flex flex-col">
      
      {/* Tier 2: Modals */}
      <AskOrganizerModal />
      <AttendeeListModal />
      <RefundPolicyModal />

      {/* Tier 3: Modals */}
      <ComparisonModal />
      <ResourcesModal />
      <DiscussionModal />

      {/* Event-Specific Header */}
      <header className="h-14 border-b border-border bg-background px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg text-muted-foreground">
            <ArrowLeft className="size-5" />
          </button>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2">
            <h1 className="text-foreground font-semibold text-lg leading-tight truncate max-w-xl">{event.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ShareMenu />
          <SaveButton />
          <AddToCalendarButton />
          {onOpenCalendar && (
            <Button
              variant="outline"
              size="default"
              onClick={() => onOpenCalendar(event.startDate)}
              className="h-9"
            >
              <Eye className="size-4" />
              <span className="ml-2">View in Calendar</span>
            </Button>
          )}
          {(() => {
            const regStatus = currentUser ? getUserRegistrationStatus(event.id, currentUser.email) : null;
            // Use the full event from mockEventData for accurate lifecycle/status detection
            const fe = fullEvent;
            const eventLifecycle = fe ? getEventLifecycleStage(fe) : getEventLifecycleStage(event as any);
            const cancelled = fe ? isEventCancelled(fe) : isEventCancelled(event as any);
            const soldOut = fe ? isEventSoldOut(fe) : isEventSoldOut(event as any);
            const isLive = eventLifecycle === 'live';
            const isEnded = eventLifecycle === 'ended' || (fe?.status === 'past') || (event as any).status === 'past';

            if (cancelled) {
              return (
                <Button variant="outline" className="rounded-lg h-9 px-4 text-sm font-semibold border-border text-muted-foreground" disabled>
                  <X className="size-3.5 mr-2" /> Cancelled
                </Button>
              );
            }
            if (isEnded) {
              return (
                <Button variant="outline" className="rounded-lg h-9 px-4 text-sm font-semibold border-border text-muted-foreground" disabled>
                  Event Ended
                </Button>
              );
            }
            if (isLive && regStatus === 'registered') {
              return (
                <Button onClick={onEnterLiveEvent} className="bg-red-600 hover:bg-red-700 text-white rounded-lg h-9 px-4 text-sm font-semibold animate-pulse">
                  <Play className="size-3.5 mr-2" /> Join Live
                </Button>
              );
            }
            if (regStatus === 'registered') {
              return (
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-lg h-9 px-4 text-sm font-semibold border-primary/20 text-primary cursor-default">
                    <Check className="size-3.5 mr-2" /> Registered
                  </Button>
                  <Button variant="outline" onClick={handleAddToCalendar} className="rounded-lg h-9 px-3 text-sm font-medium border-border text-muted-foreground hover:text-foreground">
                    <CalendarPlus className="size-3.5 mr-1.5" /> Calendar
                  </Button>
                </div>
              );
            }
            if (regStatus === 'applied') {
              return (
                <Button variant="outline" className="rounded-lg h-9 px-4 text-sm font-semibold border-border text-muted-foreground" disabled>
                  <Clock className="size-3.5 mr-2" /> Under Review
                </Button>
              );
            }
            if (regStatus === 'waitlist') {
              return (
                <Button variant="outline" className="rounded-lg h-9 px-4 text-sm font-semibold border-border text-muted-foreground" disabled>
                  <Users className="size-3.5 mr-2" /> Waitlisted
                </Button>
              );
            }
            if (regStatus === 'rejected') {
              return (
                <Button variant="outline" className="rounded-lg h-9 px-4 text-sm font-semibold border-border text-muted-foreground" disabled>
                  Not Accepted
                </Button>
              );
            }
            if (soldOut && fe?.waitlistEnabled) {
              return (
                <Button onClick={handleOpenCTA} className="bg-primary hover:bg-primary/90 rounded-lg h-9 px-4 text-sm font-semibold">
                  <Clock className="size-3.5 mr-2" /> Join Waitlist
                </Button>
              );
            }
            if (soldOut) {
              return (
                <Button variant="outline" className="rounded-lg h-9 px-4 text-sm font-semibold border-border text-muted-foreground" disabled>
                  Sold Out
                </Button>
              );
            }
            // Determine CTA label from full event data
            const accessType = fe?.accessType;
            const isPaid = fe?.isPaid;
            const hasMultiTier = fe?.tickets && fe.tickets.length > 1;

            if (accessType === 'screened') {
              return (
                <Button onClick={handleOpenCTA} className="bg-primary hover:bg-primary/90 rounded-lg h-9 px-4 text-sm font-semibold">
                  <Shield className="size-3.5 mr-2" /> Apply to Join
                </Button>
              );
            }
            if (accessType === 'waitlist') {
              return (
                <Button onClick={handleOpenCTA} className="bg-primary hover:bg-primary/90 rounded-lg h-9 px-4 text-sm font-semibold">
                  <Clock className="size-3.5 mr-2" /> Join Waitlist
                </Button>
              );
            }
            if (isPaid) {
              return (
                <Button onClick={handleOpenCTA} className="bg-primary hover:bg-primary/90 rounded-lg h-9 px-4 text-sm font-semibold">
                  <DollarSign className="size-3.5 mr-2" /> {hasMultiTier ? 'Get Tickets' : 'Buy Ticket'}
                </Button>
              );
            }
            return (
              <Button onClick={handleOpenCTA} className="bg-primary hover:bg-primary/90 rounded-lg h-9 px-4 text-sm font-semibold">
                Register
              </Button>
            );
          })()}
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel */}
        <div className="flex-1 overflow-y-auto bg-muted">
          
          {/* Phase 5: Registration status banner (MOCK_EVENTS_MASTER_PLAN.md §Events F-M) */}
          <div className="px-6 pt-4">
            <EventStatusBanner
              eventId={event.id}
              userEmail={currentUser?.email || null}
              onSignIn={() => {}}
              onJoinLive={onEnterLiveEvent}
            />
          </div>

          {/* V3: COMMUNITY - Forced to V3 */}
            <PublicEventLandingV3Tabbed
              event={event}
              onEnterLiveEvent={onEnterLiveEvent}
              onJoinLeapSpace={onJoinLeapSpace}
              ShareMenu={ShareMenu}
              AddToCalendarButton={AddToCalendarButton}
              TrustBadges={TrustBadges}
              isSaved={isSaved}
              setIsSaved={setIsSaved}
              setAskOrganizerOpen={setAskOrganizerOpen}
              setAttendeeListOpen={setAttendeeListOpen}
              spotsRemaining={spotsRemaining}
              isPaidEvent={isPaidEvent}
              hostStats={hostStats}
              attendees={attendees}
              attendeeStats={attendeeStats}
              leapSpaceInfo={leapSpaceInfo}
              agenda={agenda}
              whatsIncluded={whatsIncluded}
              learningOutcomes={learningOutcomes}
              resources={resources}
              preWorkLinks={preWorkLinks}
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={totalReviews}
              faqs={faqs}
              chatMessages={chatMessages}
              hiddenTabs={hiddenTabs}
            />
        </div>
      </div>

      {/* CTA Modals */}
      <EventCTAModals
        event={ctaEvent}
        open={ctaOpen}
        onOpenChange={setCtaOpen}
        onSuccess={() => {}}
        onJoinLive={() => onEnterLiveEvent()}
      />
    </div>
  );
}
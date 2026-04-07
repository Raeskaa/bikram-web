import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import {
  Calendar, Clock, Users, Video, Download,
  Award, Star, Eye, Bookmark, Link2,
  Send, HelpCircle, MessageCircle, DollarSign, Heart, Check, Ticket,
  MapPin, Globe, ChevronDown, ChevronUp, Play, FileText, ExternalLink,
  Mic, Coffee, Zap, Shield, Tag, Lock, Sparkles, Flag
} from 'lucide-react';
import { EventShell } from './EventShell';
import { EventCheckoutModal } from './EventCheckoutModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FlagReviewDialog, type FlagReport } from './events/FlagReviewDialog';
import { toast } from 'sonner@2.0.3';

interface PublicEventLandingV3TabbedProps {
  event: any;
  onEnterLiveEvent: () => void;
  onJoinLeapSpace: () => void;
  ShareMenu: any;
  AddToCalendarButton: any;
  TrustBadges: any;
  isSaved: boolean;
  setIsSaved: (saved: boolean) => void;
  setAskOrganizerOpen: (open: boolean) => void;
  setAttendeeListOpen: (open: boolean) => void;
  spotsRemaining: number;
  isPaidEvent: boolean;
  hostStats: any;
  attendees: any[];
  attendeeStats: any;
  leapSpaceInfo: any;
  agenda: any[];
  whatsIncluded: any[];
  learningOutcomes: string[];
  resources: any;
  preWorkLinks: any[];
  reviews: any[];
  averageRating: number;
  totalReviews: number;
  faqs: any[];
  chatMessages: any[];
  // Phase 5/6: Tab restrictions based on registration status
  hiddenTabs?: string[];
}

// ── Comprehensive prototype mock data ────────────────────────────────────

const COVER_IMAGE = 'https://images.unsplash.com/photo-1762968286778-60e65336d5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29uZmVyZW5jZSUyMHN0YWdlJTIwc3BlYWtlcnxlbnwxfHx8fDE3NzEyNDY0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080';

// Multiple ticket tiers matching admin's ticket configuration
const TICKET_TIERS = [
  { id: 'free', name: 'Free Community Pass', price: 0, quantity: 200, remaining: 43, description: 'Access to keynote and networking sessions', perks: ['Keynote access', 'Networking lounge', 'Event recording (7 days)'] },
  { id: 'general', name: 'General Admission', price: 49, quantity: 100, remaining: 28, description: 'Full access to all sessions and workshops', perks: ['All sessions', 'Workshop access', 'Recording (30 days)', 'Downloadable resources'] },
  { id: 'vip', name: 'VIP Access', price: 149, quantity: 30, remaining: 8, description: 'Priority seating + exclusive Q&A with speakers', perks: ['Everything in General', 'Priority seating', '1-on-1 speaker Q&A', 'Certificate of completion', 'Lifetime recording access'] },
];

// Rich schedule with session types, speakers, multi-track — mirrors admin's schedule builder
const RICH_SCHEDULE = [
  { id: 's1', time: '09:00 AM', title: 'Registration & Welcome Coffee', description: 'Check in, grab your badge, and connect with fellow attendees.', duration: 30, type: 'break' as const, speakers: [], track: null },
  { id: 's2', time: '09:30 AM', title: 'Opening Keynote: The Future of AI in Product Development', description: 'Explore how AI is reshaping how we build, test, and ship products at scale.', duration: 45, type: 'keynote' as const, speakers: [{ name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop', role: 'VP of Product, Figma' }], track: null },
  { id: 's3', time: '10:15 AM', title: 'Panel: Building Production-Ready RAG Pipelines', description: 'Industry leaders share real-world lessons from deploying retrieval-augmented generation systems.', duration: 60, type: 'session' as const, speakers: [
    { name: 'Marcus Webb', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&fit=crop', role: 'ML Engineer, Google' },
    { name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop', role: 'AI Research Lead, OpenAI' },
  ], track: 'Main Stage' },
  { id: 's4', time: '11:15 AM', title: 'Networking Break', description: 'Themed networking tables — find your tribe!', duration: 30, type: 'break' as const, speakers: [], track: null },
  { id: 's5', time: '11:45 AM', title: 'Workshop: Hands-on with LangChain & Vector DBs', description: 'Build a working RAG pipeline from scratch in this guided, hands-on session.', duration: 90, type: 'workshop' as const, speakers: [{ name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop', role: 'Senior Engineer, Pinecone' }], track: 'Workshop Room A' },
  { id: 's6', time: '11:45 AM', title: 'Workshop: AI-Powered Design Systems', description: 'Learn to create design systems that leverage AI for component generation and theming.', duration: 90, type: 'workshop' as const, speakers: [{ name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&h=200&fit=crop', role: 'Design Technologist, Adobe' }], track: 'Workshop Room B' },
  { id: 's7', time: '01:15 PM', title: 'Live Demo: Shipping AI Features in Production', description: 'Watch a live deployment of an AI feature from local dev to production in under 20 minutes.', duration: 30, type: 'session' as const, speakers: [{ name: 'Alex Martinez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop', role: 'CTO, StartupCo' }], track: 'Main Stage' },
  { id: 's8', time: '01:45 PM', title: 'Fireside Chat & Open Q&A', description: 'Direct access to all speakers. Bring your toughest questions.', duration: 30, type: 'session' as const, speakers: [], track: 'Main Stage' },
  { id: 's9', time: '02:15 PM', title: 'Closing & Certificate Distribution', description: 'Wrap up, key takeaways, and certificate download links.', duration: 15, type: 'session' as const, speakers: [], track: null },
];

// All speakers (derived from schedule, like admin would configure)
const ALL_SPEAKERS = [
  { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop', role: 'VP of Product', company: 'Figma', bio: 'Leading product strategy at Figma with 12+ years in design tools and developer platforms.', socials: { twitter: '@sarachen', linkedin: 'sarahchen' } },
  { name: 'Marcus Webb', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&fit=crop', role: 'ML Engineer', company: 'Google', bio: 'Building large-scale ML systems at Google. Speaker at NeurIPS and ICML.', socials: { twitter: '@marcuswebb', linkedin: 'marcuswebb' } },
  { name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop', role: 'AI Research Lead', company: 'OpenAI', bio: 'Researching safety and alignment in large language models.', socials: { twitter: '@priyapatel', linkedin: 'priyapatel' } },
  { name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop', role: 'Senior Engineer', company: 'Pinecone', bio: 'Expert in vector databases and semantic search infrastructure.', socials: { twitter: '@davidkim', linkedin: 'davidkim' } },
  { name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&h=200&fit=crop', role: 'Design Technologist', company: 'Adobe', bio: 'Bridging design and code. Creator of AI-assisted Figma plugins.', socials: { twitter: '@emmawilson', linkedin: 'emmawilson' } },
  { name: 'Alex Martinez', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop', role: 'CTO', company: 'StartupCo', bio: 'Building AI-native products from 0 to 1. Y Combinator W24 batch.', socials: { twitter: '@alexmartinez', linkedin: 'alexmartinez' } },
];

// Richer attendees with roles and companies (matches admin's attendee data)
const RICH_ATTENDEES = [
  { name: 'Sarah Mitchell', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop', role: 'Product Designer', company: 'Figma' },
  { name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&fit=crop', role: 'Software Engineer', company: 'Google' },
  { name: 'Emma Rodriguez', avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&h=200&fit=crop', role: 'UX Researcher', company: 'Microsoft' },
  { name: 'John Davis', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&fit=crop', role: 'Founder & CEO', company: 'StartupCo' },
  { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop', role: 'AI Engineer', company: 'OpenAI' },
  { name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop', role: 'Full Stack Developer', company: 'Stripe' },
  { name: 'Lisa Anderson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop', role: 'Data Scientist', company: 'Netflix' },
  { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop', role: 'Product Manager', company: 'Airbnb' },
  { name: 'Sofia Rodriguez', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&fit=crop', role: 'Design Lead', company: 'Adobe' },
  { name: 'Ryan Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop', role: 'DevOps Engineer', company: 'GitHub' },
  { name: 'Maya Thompson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop', role: 'Growth Marketing', company: 'HubSpot' },
  { name: 'James Brown', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop', role: 'ML Engineer', company: 'Tesla' },
];

// Richer resources matching admin's downloadable materials
const RICH_RESOURCES = {
  prework: [
    { title: 'Introduction to LLMs & Transformers', type: 'article', duration: '10 min read', icon: FileText },
    { title: 'Python Environment Setup Guide', type: 'video', duration: '15 min', icon: Play },
    { title: 'API Authentication & Keys Tutorial', type: 'pdf', duration: '5 min read', icon: FileText },
    { title: 'Vector Databases Overview', type: 'link', duration: '8 min read', icon: ExternalLink },
  ],
  materials: [
    { title: 'Workshop Slides (PDF)', type: 'pdf', size: '2.4 MB', icon: FileText },
    { title: 'Code Templates & Examples', type: 'zip', size: '8.1 MB', icon: Download },
    { title: 'Resource List & References', type: 'pdf', size: '1.2 MB', icon: FileText },
    { title: 'LangChain Starter Kit', type: 'zip', size: '4.7 MB', icon: Download },
    { title: 'Cheat Sheet: Prompt Engineering', type: 'pdf', size: '0.8 MB', icon: FileText },
  ],
  postEvent: [
    { title: 'Session Recording — Full Event', type: 'video', size: '1.2 GB', icon: Video },
    { title: 'Q&A Transcript', type: 'pdf', size: '350 KB', icon: FileText },
  ]
};

// Richer reviews with host responses
const RICH_REVIEWS = [
  {
    id: 'r1',
    userName: 'Sarah Mitchell',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop',
    rating: 5,
    date: 'Jan 20, 2026',
    text: 'Absolutely transformative workshop! The hands-on exercises were practical and immediately applicable to my work. The speaker lineup was incredible.',
    helpful: 24,
    verified: true,
    ticketType: 'VIP Access',
    hostResponse: 'Thank you Sarah! So glad you found it valuable. Keep building amazing things!'
  },
  {
    id: 'r2',
    userName: 'Michael Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
    rating: 5,
    date: 'Jan 18, 2026',
    text: 'Best AI workshop I\'ve attended. The instructor really knows their stuff and makes complex concepts easy to understand. The RAG pipeline demo was mind-blowing.',
    helpful: 18,
    verified: true,
    ticketType: 'General Admission',
    hostResponse: null
  },
  {
    id: 'r3',
    userName: 'Emily Rodriguez',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop',
    rating: 4,
    date: 'Jan 15, 2026',
    text: 'Great content and good pace. Would have loved more time for Q&A but overall excellent experience. The networking was a bonus.',
    helpful: 12,
    verified: true,
    ticketType: 'General Admission',
    hostResponse: 'Thanks Emily! We\'ve added 15 extra minutes for Q&A in upcoming sessions based on your feedback.'
  },
  {
    id: 'r4',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop',
    rating: 5,
    date: 'Jan 12, 2026',
    text: 'The workshop kit and resources alone are worth the ticket price. I\'ve been referencing the code templates daily since attending.',
    helpful: 31,
    verified: true,
    ticketType: 'VIP Access',
    hostResponse: null
  },
];

// Discussion threads for community tab
const DISCUSSION_THREADS = [
  { id: 'd1', userName: 'Alex Kumar', userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop', time: '2 hours ago', message: 'Looking forward to this! Has anyone worked with GPT-4 API before? Would love to connect and share notes beforehand.', replies: 5, likes: 12, pinned: false },
  { id: 'd2', userName: 'Lisa Thompson', userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&fit=crop', time: '5 hours ago', message: 'Quick question — will we need any specific software installed beforehand? I want to make sure my laptop is ready for the workshop.', replies: 3, likes: 8, pinned: true },
  { id: 'd3', userName: 'David Park', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop', time: '1 day ago', message: 'This is exactly what I needed to level up my AI skills! See you all there. Anyone else coming from the Bay Area?', replies: 8, likes: 15, pinned: false },
  { id: 'd4', userName: 'Maya Thompson', userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop', time: '2 days ago', message: 'Just registered for VIP! The 1-on-1 speaker Q&A is the main draw for me. Anyone else doing VIP?', replies: 4, likes: 9, pinned: false },
];

// FAQs with proper expand/collapse
const RICH_FAQS = [
  { q: 'Is this event recorded?', a: 'Yes, all registered attendees receive access to the session recording. Free pass holders get 7-day access, General Admission gets 30 days, and VIP gets lifetime access.' },
  { q: 'Do I need prior AI knowledge?', a: 'No, we start with fundamentals before diving into advanced topics. However, basic Python knowledge is recommended for the workshop sessions.' },
  { q: 'Can I ask questions during the event?', a: 'Absolutely! We have a dedicated Q&A block at the end, and VIP attendees get exclusive 1-on-1 time with speakers.' },
  { q: 'What\'s the refund policy?', a: '100% refund up to 24 hours before the event. After that, you can transfer your ticket to someone else or receive event credit.' },
  { q: 'Will there be networking opportunities?', a: 'Yes! We have two dedicated networking breaks with themed tables, plus a post-event virtual lounge open for 48 hours.' },
  { q: 'Can I upgrade my ticket later?', a: 'Yes, you can upgrade from Free to General or VIP anytime before the event (subject to availability). The price difference will be charged.' },
];

// Chat messages with richer data
const RICH_CHAT_MESSAGES = [
  { id: '1', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', text: 'Really excited for this workshop! Has anyone tried the pre-work materials?', time: '2m ago', likes: 3, isHost: false },
  { id: '2', name: 'Alex Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', text: 'Any prerequisites we should know about? I\'m new to vector databases.', time: '5m ago', likes: 1, isHost: false },
  { id: '3', name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', text: 'Looking forward to the live demo section! That\'s what sold me on registering.', time: '8m ago', likes: 5, isHost: false },
  { id: '4', name: 'David Kim', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', text: '@Alex — no worries! The pre-work guide covers the basics. See you in the workshop!', time: '12m ago', likes: 7, isHost: true },
  { id: '5', name: 'Ryan Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', text: 'Just finished the Python refresher video. Super helpful!', time: '20m ago', likes: 2, isHost: false },
];

// Session type config for badges
const SESSION_TYPE_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  keynote: { label: 'Keynote', color: 'bg-muted text-foreground border-border', icon: Mic },
  workshop: { label: 'Workshop', color: 'bg-muted text-foreground border-border', icon: Zap },
  session: { label: 'Session', color: 'bg-muted text-foreground border-border', icon: Calendar },
  break: { label: 'Break', color: 'bg-green-100 text-green-700 border-green-200', icon: Coffee },
};

// ── Component ────────────────────────────────────────────────────────────

export function PublicEventLandingV3Tabbed({
  event,
  onEnterLiveEvent,
  onJoinLeapSpace,
  ShareMenu,
  AddToCalendarButton,
  TrustBadges,
  isSaved,
  setIsSaved,
  setAskOrganizerOpen,
  setAttendeeListOpen,
  spotsRemaining,
  isPaidEvent,
  hostStats,
  attendees,
  attendeeStats,
  leapSpaceInfo,
  agenda,
  whatsIncluded,
  learningOutcomes,
  resources,
  preWorkLinks,
  reviews,
  averageRating,
  totalReviews,
  faqs,
  chatMessages,
  hiddenTabs,
}: PublicEventLandingV3TabbedProps) {
  const [activeLearnerTab, setActiveLearnerTab] = useState<'overview' | 'agenda' | 'learn' | 'community' | 'resources' | 'reviews' | 'chat' | 'recording'>(event.status === 'past' ? 'recording' : 'overview');
  const [showCheckout, setShowCheckout] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [attendeePage, setAttendeePage] = useState(0);
  
  // Flag dialog state
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [flaggingReviewId, setFlaggingReviewId] = useState<string | null>(null);
  const [flaggingReviewAuthor, setFlaggingReviewAuthor] = useState<string>('');

  // Use rich prototype data
  const schedule = RICH_SCHEDULE;
  const speakers = ALL_SPEAKERS;
  const ticketTiers = TICKET_TIERS;
  const richAttendees = RICH_ATTENDEES;
  const richReviews = RICH_REVIEWS;
  const richResources = RICH_RESOURCES;
  const richFaqs = RICH_FAQS;
  const discussions = DISCUSSION_THREADS;
  const chatMsgs = RICH_CHAT_MESSAGES;

  // Derived data
  const tracks = [...new Set(schedule.filter(s => s.track).map(s => s.track))];
  const filteredSchedule = selectedTrack
    ? schedule.filter(s => s.track === selectedTrack || s.track === null)
    : schedule;
  const ratingDistribution = { 5: 72, 4: 18, 3: 6, 2: 3, 1: 1 };

  // Flag handlers
  const handleOpenFlagDialog = (reviewId: string, reviewAuthor: string) => {
    setFlaggingReviewId(reviewId);
    setFlaggingReviewAuthor(reviewAuthor);
    setFlagDialogOpen(true);
  };

  const handleSubmitFlag = (flag: Omit<FlagReport, 'id' | 'timestamp'>) => {
    // In real app, this would submit to backend
    toast.success('Review flagged', { 
      description: 'The event creator has been notified and will review your report.' 
    });
    console.log('Flag submitted:', { reviewId: flaggingReviewId, ...flag });
  };

  const headerActions = (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="size-9 rounded-lg" 
        onClick={() => setIsSaved(!isSaved)}
      >
        {isSaved ? <Bookmark className="size-4 fill-current" /> : <Bookmark className="size-4" />}
      </Button>
      <ShareMenu variant="minimal" />
      <AddToCalendarButton variant="minimal" />
      {event.status === 'past' ? (
        <Button onClick={() => setActiveLearnerTab('recording')} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-9 px-4 text-sm font-semibold">
          <Video className="size-4 mr-2" />
          Watch Replay
        </Button>
      ) : (
        <Button onClick={() => setShowCheckout(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-9 px-4 text-sm font-semibold">
          <Ticket className="size-4 mr-2" />
          Get Tickets
        </Button>
      )}
    </>
  );

  return (
    <EventShell
      role="learner"
      title={event.title}
      subtitle={`${event.startDate} • ${event.time} ${event.timezone}`}
      activeTab={activeLearnerTab}
      onTabChange={(tab) => setActiveLearnerTab(tab as any)}
      headerActions={headerActions}
      counts={{
        agenda: schedule.length,
        attendees: event.registrationCount,
        reviews: totalReviews,
        discussion: discussions.length
      }}
      hiddenTabs={hiddenTabs}
    >
      <div className="h-full overflow-y-auto bg-background text-sm">

        {/* ═══════════════ RECORDING TAB ═══════════════ */}
        {activeLearnerTab === 'recording' && (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden relative group">
              <ImageWithFallback
                src={event.coverImage || COVER_IMAGE}
                alt="Video thumbnail"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <div className="size-16 bg-primary rounded-full flex items-center justify-center">
                    <Video className="size-8 text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-red-600 text-white border-0">RECORDING</Badge>
                  <span className="text-sm font-medium">{event.duration} min</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>

                <Card className="border-border">
                  <CardHeader className="pb-3 border-b border-border">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageCircle className="size-4" />
                      Chat Replay
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 h-64 overflow-y-auto bg-muted">
                    <div className="p-4 space-y-3">
                      {chatMsgs.map((msg) => (
                        <div key={msg.id} className="flex items-start gap-3 text-sm">
                          <span className="text-xs text-muted-foreground/60 font-mono mt-1">{msg.time}</span>
                          <div>
                            <span className="font-semibold text-foreground mr-2">{msg.name}</span>
                            <span className="text-foreground">{msg.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-base">Event Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {richResources.postEvent.map((resource, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <resource.icon className="size-4 text-muted-foreground/60 flex-shrink-0" />
                          <span className="text-sm truncate">{resource.title}</span>
                        </div>
                      </div>
                    ))}
                    {richResources.materials.map((resource, i) => (
                      <div key={`m-${i}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <resource.icon className="size-4 text-muted-foreground/60 flex-shrink-0" />
                          <span className="text-sm truncate">{resource.title}</span>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Download All
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border bg-muted">
                  <CardContent className="p-4 text-center">
                    <div className="size-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="size-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground mb-1">Your Certificate</h3>
                    <p className="text-xs text-muted-foreground mb-3">You completed this event!</p>
                    <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/10">
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
        {activeLearnerTab === 'overview' && (
          <div className="max-w-4xl mx-auto p-6 space-y-6">

            {/* Hero Image */}
            <div className="w-full aspect-[2.5/1] bg-muted rounded-xl overflow-hidden relative">
              <ImageWithFallback
                src={event.coverImage || COVER_IMAGE}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                    {event.eventType === 'virtual' ? <Video className="size-3 mr-1" /> : <MapPin className="size-3 mr-1" />}
                    {event.eventType === 'virtual' ? 'Virtual' : event.eventType === 'hybrid' ? 'Hybrid' : 'In Person'}
                  </Badge>
                  {event.category?.map((cat: string, i: number) => (
                    <Badge key={i} className="bg-white/20 backdrop-blur-sm text-white border-0">{cat}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Urgency Banner */}
            {spotsRemaining <= 50 && spotsRemaining > 0 && (
              <div className="px-4 py-3 bg-muted border border-border rounded-xl text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">
                    <strong>{spotsRemaining} spots left</strong> • {hostStats.recentRegistrations} joined recently
                  </span>
                  <div className="flex items-center gap-2">
                    <Progress value={Math.round((event.registrationCount / event.capacity) * 100)} className="w-24 h-2" />
                    <span className="text-muted-foreground text-xs font-medium">{Math.round((event.registrationCount / event.capacity) * 100)}% full</span>
                  </div>
                </div>
              </div>
            )}

            {/* Event Meta */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="size-12 border-2 border-border">
                  <AvatarImage src={event.hostAvatar} />
                  <AvatarFallback>{event.hostName?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 text-sm">
                    <span className="font-semibold text-foreground">Hosted by {event.hostName}</span>
                    <span className="text-muted-foreground/60">•</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      {hostStats.rating} ({totalReviews} reviews)
                    </span>
                    <span className="text-muted-foreground/60">•</span>
                    <span className="text-muted-foreground">{hostStats.eventsHosted} events hosted</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              </div>

              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                  <Calendar className="size-3.5 text-primary" />
                  <span>{event.startDate}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                  <Clock className="size-3.5 text-primary" />
                  <span>{event.time} {event.timezone}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                  <Clock className="size-3.5 text-primary" />
                  <span>{event.duration} min</span>
                </div>
                {event.eventType !== 'virtual' && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                    <MapPin className="size-3.5 text-primary" />
                    <span>San Francisco Convention Center</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground">
                  <Globe className="size-3.5 text-primary" />
                  <span>English</span>
                </div>
              </div>
            </div>

            {/* ── Ticket Tiers (Multiple — mirrors Admin) ── */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Choose Your Ticket</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ticketTiers.map((tier) => (
                  <Card
                    key={tier.id}
                    className={`border-border hover:border-primary transition-all cursor-pointer relative overflow-hidden ${tier.id === 'vip' ? 'border-primary ring-1 ring-primary/20' : ''}`}
                    onClick={() => setShowCheckout(true)}
                  >
                    {tier.id === 'vip' && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-semibold px-3 py-1 rounded-bl-lg">
                        POPULAR
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-2xl font-bold text-foreground">
                            {tier.price === 0 ? 'Free' : `$${tier.price}`}
                          </span>
                        </div>
                        <h4 className="font-semibold text-sm text-foreground">{tier.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{tier.description}</p>
                      </div>
                      <div className="space-y-1.5 mb-4">
                        {tier.perks.map((perk, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="size-3 text-green-600 flex-shrink-0" />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {tier.remaining < 20 ? (
                            <span className="text-orange-600 font-medium">Only {tier.remaining} left</span>
                          ) : (
                            `${tier.remaining} available`
                          )}
                        </span>
                        <Button size="sm" className={`h-7 text-xs rounded-lg ${tier.id === 'vip' ? 'bg-primary hover:bg-primary/90' : 'bg-foreground hover:bg-foreground/90'}`}>
                          Select
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <Card className="bg-muted border-border">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3 text-foreground">What you'll get</h3>
                <div className="grid grid-cols-2 gap-2">
                  {whatsIncluded.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon className="size-4 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ── Speakers Section ── */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-foreground">Speakers & Hosts</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {speakers.map((speaker, i) => (
                  <Card key={i} className="border-border hover:border-border transition-colors">
                    <CardContent className="p-4 text-center">
                      <Avatar className="size-16 mx-auto mb-2 border-2 border-border">
                        <AvatarImage src={speaker.avatar} />
                        <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="font-semibold text-sm text-foreground">{speaker.name}</p>
                      <p className="text-xs text-muted-foreground">{speaker.role}</p>
                      <p className="text-xs text-primary font-medium">{speaker.company}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold">Join {event.registrationCount} attendees</p>
                  <button 
                    className="text-xs text-primary font-medium hover:underline"
                    onClick={() => setAttendeeListOpen(true)}
                  >
                    View all
                  </button>
                </div>
                <div className="flex -space-x-2 mb-3">
                  {richAttendees.slice(0, 8).map((p, i) => (
                    <Avatar key={i} className="size-9 border-2 border-white">
                      <AvatarImage src={p.avatar} />
                      <AvatarFallback>{p.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.registrationCount > 8 && (
                    <div className="size-9 rounded-full bg-muted border-2 border-white flex items-center justify-center text-[10px] font-semibold text-primary">
                      +{event.registrationCount - 8}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="bg-muted px-2 py-1 rounded-md">Designers {attendeeStats.designers}</span>
                  <span className="bg-muted px-2 py-1 rounded-md">Developers {attendeeStats.developers}</span>
                  <span className="bg-muted px-2 py-1 rounded-md">Product Leaders {attendeeStats.founders}</span>
                </div>
              </CardContent>
            </Card>

            {/* LeapSpace CTA */}
            <Card className="border-border bg-gradient-to-r from-muted to-background">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base mb-1 text-foreground">{leapSpaceInfo.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{leapSpaceInfo.memberCount.toLocaleString()} members • {leapSpaceInfo.description}</p>
                    <p className="text-xs text-muted-foreground">Join the community to stay connected after the event</p>
                  </div>
                  <Button onClick={onJoinLeapSpace} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                    Join Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            {isPaidEvent && (
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <TrustBadges />
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Shield className="size-3 text-green-600" /> SSL Encrypted</span>
                      <span className="flex items-center gap-1"><Tag className="size-3 text-primary" /> Promo codes accepted</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* ═══════════════ AGENDA TAB ═══════════════ */}
        {activeLearnerTab === 'agenda' && (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-1">Event Agenda</h2>
                <p className="text-sm text-muted-foreground">{schedule.length} sessions • Total duration: {Math.round(schedule.reduce((acc, s) => acc + s.duration, 0) / 60)} hours</p>
              </div>
              <AddToCalendarButton variant="minimal" />
            </div>

            {/* Track Filters */}
            {tracks.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">FILTER BY TRACK:</span>
                <button
                  onClick={() => setSelectedTrack(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!selectedTrack ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                  All Tracks
                </button>
                {tracks.map((track) => (
                  <button
                    key={track}
                    onClick={() => setSelectedTrack(track === selectedTrack ? null : track)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedTrack === track ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            )}

            {/* Schedule Items */}
            <div className="space-y-3">
              {filteredSchedule.map((session) => {
                const typeConfig = SESSION_TYPE_CONFIG[session.type] || SESSION_TYPE_CONFIG.session;
                const TypeIcon = typeConfig.icon;
                return (
                  <div key={session.id} className={`p-4 border rounded-xl transition-all ${session.type === 'break' ? 'bg-green-50/50 border-green-200' : 'bg-card border-border hover:border-border'}`}>
                    <div className="flex items-start gap-4">
                      {/* Time Column */}
                      <div className="w-20 flex-shrink-0 text-center relative">
                        <div className={`text-sm font-bold ${session.type === 'break' ? 'text-green-700' : 'text-primary'}`}>{session.time}</div>
                        <div className="text-[10px] text-muted-foreground font-medium">{session.duration} min</div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className="font-semibold text-sm text-foreground">{session.title}</h3>
                          <Badge className={`text-[10px] h-5 px-1.5 border ${typeConfig.color}`}>
                            <TypeIcon className="size-3 mr-1" />
                            {typeConfig.label}
                          </Badge>
                          {session.track && (
                            <Badge variant="outline" className="text-[10px] h-5 px-1.5 text-muted-foreground">
                              {session.track}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{session.description}</p>

                        {/* Speakers for this session */}
                        {session.speakers.length > 0 && (
                          <div className="flex items-center gap-3 mt-2">
                            {session.speakers.map((speaker, si) => (
                              <div key={si} className="flex items-center gap-2 bg-muted rounded-lg px-2.5 py-1.5">
                                <Avatar className="size-6">
                                  <AvatarImage src={speaker.avatar} />
                                  <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-xs font-medium text-foreground">{speaker.name}</p>
                                  <p className="text-[10px] text-muted-foreground">{speaker.role}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════ LEARN TAB ═══════════════ */}
        {activeLearnerTab === 'learn' && (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">What You'll Learn</h2>
              <p className="text-sm text-muted-foreground">Everything included in this event</p>
            </div>

            {/* What's Included */}
            <Card className="border-border bg-muted">
              <CardHeader>
                <CardTitle className="text-base text-foreground">What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {whatsIncluded.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-card transition-colors">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-accent flex-shrink-0">
                      <item.icon className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Outcomes */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Learning Outcomes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {learningOutcomes.map((outcome: string, i: number) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{outcome}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Who This Is For */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Who This Is For</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { role: 'Developers', desc: 'Looking to add AI capabilities to their apps' },
                    { role: 'Product Managers', desc: 'Wanting to understand AI-powered features' },
                    { role: 'Designers', desc: 'Exploring AI-assisted design workflows' },
                    { role: 'Founders', desc: 'Building AI-native startups' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Users className="size-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{item.role}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  'Basic understanding of Python (variables, functions, loops)',
                  'A laptop with internet access',
                  'GitHub account (free tier is fine)',
                  'OpenAI API key (free credits available)',
                ].map((req, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {req}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certificate */}
            <Card className="border-border bg-gradient-to-br from-muted to-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-xl bg-primary">
                    <Award className="size-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Certificate of Completion</p>
                    <p className="text-sm text-muted-foreground">Get certified after attending this event. Share on LinkedIn.</p>
                  </div>
                  <Badge className="bg-muted text-primary border-border">VIP & General</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ═══════════════ COMMUNITY TAB ═══════════════ */}
        {activeLearnerTab === 'community' && (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Community</h2>
              <p className="text-sm text-muted-foreground">Connect with speakers, attendees, and the host</p>
            </div>

            {/* LeapSpace CTA */}
            <Card className="border-border bg-gradient-to-r from-muted to-background">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base mb-1 text-foreground">{leapSpaceInfo.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{leapSpaceInfo.memberCount.toLocaleString()} members</p>
                    <p className="text-xs text-muted-foreground">{leapSpaceInfo.description}</p>
                  </div>
                  <Button onClick={onJoinLeapSpace} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
                    Join Community
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* ── Speakers Full Info (replaces single Host) ── */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Speakers & Hosts ({speakers.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {speakers.map((speaker, i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border transition-colors hover:border-border ${i === 0 ? 'bg-muted/50 border-border' : 'border-border'}`}>
                    <Avatar className="size-14 border-2 border-border">
                      <AvatarImage src={speaker.avatar} />
                      <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-semibold text-sm text-foreground">{speaker.name}</h4>
                        {i === 0 && <Badge className="bg-primary text-primary-foreground text-[10px] h-5 border-0">HOST</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{speaker.role}, <span className="text-primary font-medium">{speaker.company}</span></p>
                      <p className="text-xs text-muted-foreground mt-1">{speaker.bio}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground/60">
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                          <ExternalLink className="size-3" /> {speaker.socials.twitter}
                        </a>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                          <Link2 className="size-3" /> LinkedIn
                        </a>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg text-xs h-8"
                      onClick={() => setAskOrganizerOpen(true)}
                    >
                      <HelpCircle className="size-3 mr-1" />
                      Ask
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ── Attendees Grid (with roles & companies) ── */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Attendees ({event.registrationCount})</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="rounded-lg"
                    onClick={() => setAttendeeListOpen(true)}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {richAttendees.slice(attendeePage * 6, attendeePage * 6 + 6).map((attendee, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-border hover:bg-muted transition-colors">
                      <Avatar className="size-10">
                        <AvatarImage src={attendee.avatar} />
                        <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{attendee.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{attendee.role}</p>
                        <p className="text-[10px] text-primary font-medium truncate">{attendee.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {richAttendees.length > 6 && (
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      disabled={attendeePage === 0}
                      onClick={() => setAttendeePage(p => p - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      disabled={(attendeePage + 1) * 6 >= richAttendees.length}
                      onClick={() => setAttendeePage(p => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
                <div className="pt-3 mt-3 border-t flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="bg-muted px-2 py-1 rounded-md">{attendeeStats.designers} designers</span>
                  <span className="bg-muted px-2 py-1 rounded-md">{attendeeStats.developers} developers</span>
                  <span className="bg-muted px-2 py-1 rounded-md">{attendeeStats.founders} product leaders</span>
                </div>
              </CardContent>
            </Card>

            {/* ── Discussion Threads Preview ── */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageCircle className="size-4" />
                    Discussions ({discussions.length})
                  </CardTitle>
                  <Button variant="outline" size="sm" className="rounded-lg text-xs h-8">
                    <Send className="size-3 mr-1" /> New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {discussions.map((disc) => (
                  <div key={disc.id} className={`p-3 rounded-lg border transition-colors hover:border-border cursor-pointer ${disc.pinned ? 'bg-muted/50 border-border' : 'border-border'}`}>
                    <div className="flex items-start gap-3">
                      <Avatar className="size-8 mt-0.5">
                        <AvatarImage src={disc.userAvatar} />
                        <AvatarFallback>{disc.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-sm text-foreground">{disc.userName}</p>
                          <span className="text-[10px] text-muted-foreground/60">{disc.time}</span>
                          {disc.pinned && <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-muted text-foreground">Pinned</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{disc.message}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                            <MessageCircle className="size-3" /> {disc.replies} replies
                          </button>
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500">
                            <Heart className="size-3" /> {disc.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* ═══════════════ RESOURCES TAB ═══════════════ */}
        {activeLearnerTab === 'resources' && (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Resources & Materials</h2>
              <p className="text-sm text-muted-foreground">Everything you need before, during, and after the event</p>
            </div>

            {/* Pre-Work */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    Pre-Event Preparation
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">Optional</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {richResources.prework.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-border hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-9 rounded-lg bg-muted">
                        <item.icon className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.type} • {item.duration}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs">
                      {item.type === 'link' ? 'Open' : 'View'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Workshop Materials */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Download className="size-4 text-primary" />
                    Workshop Materials
                  </CardTitle>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-8 text-xs">
                    <Download className="size-3 mr-1" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {richResources.materials.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-border hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-9 rounded-lg bg-muted">
                        <item.icon className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.type.toUpperCase()} • {item.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-lg h-8 text-xs">
                      <Download className="size-3 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Post-Event Materials (locked preview) */}
            <Card className="border-border opacity-75">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2 text-muted-foreground/60">
                    <Lock className="size-4" />
                    Post-Event Materials
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">Available after event</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {richResources.postEvent.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg bg-muted">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-9 rounded-lg bg-muted-foreground/20">
                        <item.icon className="size-4 text-muted-foreground/60" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-muted-foreground/60">{item.title}</p>
                        <p className="text-xs text-muted-foreground/60">{item.type} • {item.size}</p>
                      </div>
                    </div>
                    <Lock className="size-4 text-muted-foreground/30" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommended Reading */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Recommended Reading</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">Curated by the speakers to deepen your understanding</p>
                {preWorkLinks.map((link: any, i: number) => (
                  <a 
                    key={i} 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <Link2 className="size-4 text-muted-foreground/60 group-hover:text-primary" />
                    <span className="text-sm text-foreground group-hover:text-primary">{link.title}</span>
                    <ExternalLink className="size-3 text-muted-foreground/30 group-hover:text-primary ml-auto" />
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* ═══════════════ REVIEWS TAB ═══════════════ */}
        {activeLearnerTab === 'reviews' && (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Reviews & FAQ</h2>
              <p className="text-sm text-muted-foreground">What attendees are saying about past events by this host</p>
            </div>

            {/* Rating Overview */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1 text-foreground">{averageRating}</div>
                    <div className="flex items-center gap-1 justify-center mb-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="size-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{totalReviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map((stars) => {
                      const pct = ratingDistribution[stars as keyof typeof ratingDistribution] || 0;
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-8 text-right">{stars}</span>
                          <Star className="size-3 text-yellow-400 fill-yellow-400" />
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground w-10">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews List with Host Responses */}
            <div className="space-y-4">
              {richReviews.map((review) => (
                <Card key={review.id} className="border-border">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="size-10">
                        <AvatarImage src={review.userAvatar} />
                        <AvatarFallback>{review.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-sm">{review.userName}</p>
                            {review.verified && (
                              <Badge variant="secondary" className="text-[10px] h-4 px-1.5 bg-green-50 text-green-700 border-green-200">
                                <Check className="size-2.5 mr-0.5" /> Verified
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-0.5">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className={`size-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground/60">{review.ticketType}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                            <Heart className="size-3" /> Helpful ({review.helpful})
                          </button>
                          <button 
                            className="text-xs text-muted-foreground hover:text-red-600 flex items-center gap-1"
                            onClick={() => handleOpenFlagDialog(review.id, review.userName)}
                          >
                            <Flag className="size-3" /> Flag
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Host Response */}
                    {review.hostResponse && (
                      <div className="ml-12 mt-3 p-3 bg-muted rounded-lg border border-border">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className="bg-primary text-primary-foreground text-[10px] h-4 px-1.5 border-0">HOST</Badge>
                          <span className="text-xs font-medium text-foreground">{event.hostName}</span>
                        </div>
                        <p className="text-sm text-foreground">{review.hostResponse}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQs with working accordion */}
            <div>
              <h3 className="text-base font-semibold mb-3 mt-8">Frequently Asked Questions</h3>
              <div className="space-y-2">
                {richFaqs.map((faq, i) => (
                  <Card key={i} className="border-border overflow-hidden">
                    <button 
                      className="w-full text-left p-4 flex items-center justify-between hover:bg-muted transition-colors"
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    >
                      <span className="font-medium text-sm text-foreground">{faq.q}</span>
                      {openFaqIndex === i ? (
                        <ChevronUp className="size-4 text-muted-foreground/60 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="size-4 text-muted-foreground/60 flex-shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === i && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3">
                        {faq.a}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════ CHAT TAB ═══════════════ */}
        {activeLearnerTab === 'chat' && (
          <div className="max-w-4xl mx-auto h-full p-6 flex flex-col">
            <Card className="flex-1 border-border flex flex-col overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between bg-card">
                <div>
                  <h3 className="font-semibold text-sm">Event Chat</h3>
                  <p className="text-xs text-muted-foreground">{chatMsgs.length} messages • {richAttendees.length} participants online</p>
                </div>
                <div className="flex -space-x-2">
                  {richAttendees.slice(0, 4).map((a, i) => (
                    <Avatar key={i} className="size-8 border-2 border-white">
                      <AvatarImage src={a.avatar} />
                    </Avatar>
                  ))}
                  <div className="size-8 rounded-full bg-muted border-2 border-white flex items-center justify-center text-[10px] font-semibold text-primary">
                    +{richAttendees.length - 4}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Pinned Message */}
                <div className="bg-muted p-3 rounded-lg border border-border mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground text-[10px] h-5 border-0">HOST</Badge>
                    <span className="text-xs font-semibold text-primary">{event.hostName}</span>
                    <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-yellow-100 text-yellow-700">Pinned</Badge>
                  </div>
                  <p className="text-sm text-foreground">Welcome everyone! Feel free to introduce yourselves here before the event starts. Check out the pre-work materials in the Resources tab. Excited to see you all!</p>
                </div>

                {chatMsgs.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <Avatar className="size-8 mt-1">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>{msg.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{msg.name}</span>
                        {msg.isHost && <Badge className="bg-primary text-primary-foreground text-[10px] h-4 px-1.5 border-0">SPEAKER</Badge>}
                        <span className="text-xs text-muted-foreground/60">{msg.time}</span>
                      </div>
                      <div className="bg-muted rounded-lg rounded-tl-none p-3 mt-1">
                        <p className="text-sm text-foreground">{msg.text}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button className="text-xs text-muted-foreground hover:text-primary">Reply</button>
                        {msg.likes > 0 && (
                          <div className="flex items-center gap-0.5 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full border border-border">
                            <Heart className="size-3 text-red-500 fill-red-500" />
                            {msg.likes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button size="icon" className="bg-primary text-primary-foreground">
                    <Send className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <EventCheckoutModal 
        event={event}
        open={showCheckout}
        onOpenChange={setShowCheckout}
        onSuccess={() => {
          setShowCheckout(false);
          setTimeout(() => {
            onEnterLiveEvent();
          }, 500);
        }}
        tickets={TICKET_TIERS.map(t => ({
          ...t,
          id: t.id,
          name: t.name,
          price: t.price,
          description: t.description,
          remaining: t.remaining
        }))}
      />

      {/* Flag Review Dialog */}
      <FlagReviewDialog
        open={flagDialogOpen}
        onOpenChange={setFlagDialogOpen}
        onSubmit={handleSubmitFlag}
        reviewId={flaggingReviewId || ''}
        reviewAuthor={flaggingReviewAuthor}
      />
    </EventShell>
  );
}

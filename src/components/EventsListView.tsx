import { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Calendar, Search, Filter, Grid3x3, List, Plus, Users, MapPin, 
  Video, Clock, CheckCircle, Link2, Play, 
  Share2, Mail, Edit, BarChart3,
  DollarSign, ShieldCheck,
  Globe, Lock, Eye, BookOpen, Ticket, X,
  ArrowUpDown, Layers, Award, Send, Wand2, Copy,
  ChevronLeft, ChevronRight, Compass, ArrowRight
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useAuth, isEmptyStateUser } from '../contexts/AuthContext';
import { ManualEventCreateModal } from './ManualEventCreateModal';
import { EventCreationStepper, type EventCreationData } from './events/EventCreationStepper';
import { SectionEmptyState } from './SectionEmptyState';
import { toast } from 'sonner@2.0.3';
import { useEventCTA, EventCTAModals } from './events/EventCTAModals';
import { 
  mockEvents, 
  isEventCreator, 
  isEventSpeaker,
  getUserRegistrationStatus,
  getEventLifecycleStage,
  isEventSoldOut,
  getEventCompletionCount,
  getEventWaitlistCount,
  type Event 
} from '../data/mockEventData';
import {
  getExternalLeapSpaces,
  getLeapSpaceEvents,
  isEventInUserLeapSpaces,
  getEventLeapSpaceName,
  type LeapSpace,
} from '../data/mockLeapSpaces';

type Tab = 'all' | 'my-events' | 'registered' | 'drafts' | 'past';
type SortOption = 'date-asc' | 'date-desc' | 'attendees' | 'price-low' | 'price-high' | 'name';

interface ActiveFilters {
  delivery: ('virtual' | 'in-person' | 'hybrid')[];
  visibility: ('public' | 'private' | 'global' | 'shared')[];
  accessType: ('open' | 'waitlist' | 'screened' | 'paid')[];
  payment: ('free' | 'paid')[];
  context: ('standalone' | 'community' | 'course')[];
}

const emptyFilters: ActiveFilters = {
  delivery: [],
  visibility: [],
  accessType: [],
  payment: [],
  context: [],
};

// Shared pill style for taxonomy badges
const taxonomyPill = "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border";

interface ManualEventData {
  title: string;
  type: 'virtual' | 'in-person' | 'hybrid';
  date: string;
  time: string;
  endTime?: string;
  location?: string;
  description?: string;
  capacity?: number;
}

interface EventsListViewProps {
  onEventClick: (eventId: string) => void;
  onCreateClick: () => void;
  onCreateManualClick?: (data: ManualEventData) => void;
  onViewPublicPage?: (eventId: string) => void;
  onJoinLiveEvent?: (eventTitle: string, eventCode: string) => void;
  onBrowseTemplates?: () => void;
}

export function EventsListView({ onEventClick, onCreateClick, onCreateManualClick, onViewPublicPage, onJoinLiveEvent, onBrowseTemplates }: EventsListViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-asc');
  const [filters, setFilters] = useState<ActiveFilters>(emptyFilters);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showStepperModal, setShowStepperModal] = useState(false);
  const [stepperPrefill, setStepperPrefill] = useState<Partial<EventCreationData> | undefined>();
  const [sidebarCalMonth, setSidebarCalMonth] = useState(new Date(2026, 2)); // March 2026
  const [sidebarSelectedDate, setSidebarSelectedDate] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  const { activeEvent, isOpen: ctaOpen, openCTA, closeCTA, setIsOpen: setCtaOpen } = useEventCTA();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setShowFilterPanel(false);
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setShowSortMenu(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
  }, [filters]);

  const toggleFilter = <K extends keyof ActiveFilters>(category: K, value: ActiveFilters[K][number]) => {
    setFilters(prev => {
      const arr = prev[category] as string[];
      const next = arr.includes(value as string)
        ? arr.filter(v => v !== value)
        : [...arr, value as string];
      return { ...prev, [category]: next };
    });
  };

  const clearFilters = () => setFilters(emptyFilters);

  const filterEvents = (events: Event[]): Event[] => {
    let filtered = events;
    switch (activeTab) {
      case 'all':
        filtered = filtered.filter(e => e.status !== 'draft' && e.status !== 'cancelled' && e.isPublic && (e.status === 'upcoming' || e.lifecycleStage === 'live') && isEventInUserLeapSpaces(e, currentUser?.email || ''));
        break;
      case 'my-events':
        filtered = filtered.filter(e => {
          const email = currentUser?.email || '';
          return (isEventCreator(e, email) || isEventSpeaker(e, email)) && e.status !== 'past' && e.status !== 'cancelled';
        });
        break;
      case 'drafts':
        filtered = filtered.filter(e => e.status === 'draft' && isEventCreator(e, currentUser?.email || ''));
        break;
      case 'past':
        filtered = filtered.filter(e => {
          const email = currentUser?.email || '';
          return (e.status === 'past' || e.status === 'cancelled') && (isEventCreator(e, email) || getUserRegistrationStatus(e.id, email) || e.isPublic);
        });
        break;
      case 'registered':
        filtered = filtered.filter(e => {
          const email = currentUser?.email || '';
          const status = getUserRegistrationStatus(e.id, email);
          return (status === 'registered' || status === 'waitlist' || status === 'applied' || status === 'rejected') && !isEventCreator(e, email);
        });
        break;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) ||
        e.creatorName.toLowerCase().includes(q) || (e.communityName && e.communityName.toLowerCase().includes(q)) ||
        (e.courseName && e.courseName.toLowerCase().includes(q))
      );
    }
    if (filters.delivery.length > 0) filtered = filtered.filter(e => filters.delivery.includes(e.location));
    if (filters.visibility.length > 0) filtered = filtered.filter(e => filters.visibility.includes(e.visibility));
    if (filters.accessType.length > 0) filtered = filtered.filter(e => filters.accessType.includes(e.accessType));
    if (filters.payment.length > 0) filtered = filtered.filter(e => {
      if (filters.payment.includes('paid') && e.isPaid) return true;
      if (filters.payment.includes('free') && !e.isPaid) return true;
      return false;
    });
    if (filters.context.length > 0) filtered = filtered.filter(e => {
      if (filters.context.includes('standalone') && e.isStandalone) return true;
      if (filters.context.includes('community') && e.parentCommunityId && !e.parentCourseId) return true;
      if (filters.context.includes('course') && e.parentCourseId) return true;
      return false;
    });
    return filtered;
  };

  const sortEvents = (events: Event[]): Event[] => {
    const sorted = [...events];
    switch (sortBy) {
      case 'date-asc': return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'date-desc': return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'attendees': return sorted.sort((a, b) => b.attendeeCount - a.attendeeCount);
      case 'price-low': return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high': return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'name': return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default: return sorted;
    }
  };

  const isEmpty = isEmptyStateUser(currentUser);
  const sourceEvents = isEmpty ? [] : mockEvents;
  const filteredEvents = sortEvents(filterEvents(sourceEvents));

  const tabCounts = useMemo(() => ({
    all: sourceEvents.filter(e => e.status !== 'draft' && e.status !== 'cancelled' && e.isPublic && (e.status === 'upcoming' || e.lifecycleStage === 'live') && isEventInUserLeapSpaces(e, currentUser?.email || '')).length,
    registered: currentUser ? sourceEvents.filter(e => {
      const s = getUserRegistrationStatus(e.id, currentUser.email);
      return (s === 'registered' || s === 'waitlist' || s === 'applied' || s === 'rejected') && !isEventCreator(e, currentUser.email);
    }).length : 0,
    'my-events': currentUser ? sourceEvents.filter(e => (isEventCreator(e, currentUser.email) || isEventSpeaker(e, currentUser.email)) && e.status !== 'past' && e.status !== 'cancelled').length : 0,
    drafts: currentUser ? sourceEvents.filter(e => e.status === 'draft' && isEventCreator(e, currentUser.email)).length : 0,
    past: sourceEvents.filter(e => e.status === 'past' || e.status === 'cancelled').length,
  }), [currentUser, isEmpty]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all', label: 'Discover', count: tabCounts.all },
    { id: 'registered', label: 'Attending', count: tabCounts.registered },
    { id: 'my-events', label: 'Hosting', count: tabCounts['my-events'] },
    { id: 'drafts', label: 'Drafts', count: tabCounts.drafts },
    { id: 'past', label: 'Past Events', count: tabCounts.past },
  ];

  const handleDuplicate = (event: Event) => {
    setStepperPrefill({
      title: `Copy of ${event.title}`,
      description: event.description,
      type: event.location,
      category: event.category,
      capacity: event.capacity,
      isPaid: event.isPaid,
      price: event.price,
      duplicatedFrom: event.id,
    });
    setShowStepperModal(true);
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'virtual': return <Video className="size-3.5" />;
      case 'in-person': return <MapPin className="size-3.5" />;
      case 'hybrid': return <><Video className="size-3.5" /><MapPin className="size-3.5" /></>;
      default: return null;
    }
  };

  const getLocationBadge = (location: string) => (
    <div className={taxonomyPill}>
      {getLocationIcon(location)}
      <span className="capitalize">{location === 'in-person' ? 'In-Person' : location}</span>
    </div>
  );

  const getStatusBadge = (status: string, lifecycle?: string) => (
    <Badge variant="outline" className="bg-muted text-muted-foreground border-border shadow-none text-xs">
      {lifecycle === 'live' && <span className="size-2 rounded-full bg-red-500 mr-1 inline-block" />}
      {status === 'upcoming' && lifecycle !== 'live' && <Clock className="size-3.5 mr-1" />}
      {status === 'past' && <CheckCircle className="size-3.5 mr-1" />}
      {status === 'draft' && <Edit className="size-3.5 mr-1" />}
      {status === 'cancelled' && <X className="size-3.5 mr-1" />}
      <span className="capitalize">{lifecycle === 'live' ? 'Live' : status}</span>
    </Badge>
  );

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formatDateShort = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'date-asc', label: 'Date (Soonest)' },
    { value: 'date-desc', label: 'Date (Latest)' },
    { value: 'attendees', label: 'Most Popular' },
    { value: 'price-low', label: 'Price (Low → High)' },
    { value: 'price-high', label: 'Price (High → Low)' },
    { value: 'name', label: 'Name (A → Z)' },
  ];

  const getActiveFilterChips = (): { category: keyof ActiveFilters; value: string; label: string }[] => {
    const chips: { category: keyof ActiveFilters; value: string; label: string }[] = [];
    const labelMap: Record<string, string> = {
      virtual: 'Virtual', 'in-person': 'In-Person', hybrid: 'Hybrid',
      public: 'Public', private: 'Private', global: 'Global', shared: 'Shared',
      open: 'Open', waitlist: 'Waitlist', screened: 'Screened', paid: 'Paid Access',
      free: 'Free', standalone: 'Standalone', community: 'Community', course: 'Course-Nested',
    };
    for (const [cat, values] of Object.entries(filters)) {
      for (const v of values) {
        chips.push({ category: cat as keyof ActiveFilters, value: v, label: labelMap[v] || v });
      }
    }
    return chips;
  };

  // ─── RENDER: Filter Panel ────────────────────────────────
  const renderFilterPanel = () => {
    const sections: { key: keyof ActiveFilters; title: string; icon: React.ReactNode; options: { value: string; label: string; icon?: React.ReactNode }[] }[] = [
      { key: 'delivery', title: 'Delivery Format', icon: <Video className="size-3.5" />, options: [
        { value: 'virtual', label: 'Virtual', icon: <Video className="size-3" /> },
        { value: 'in-person', label: 'In-Person', icon: <MapPin className="size-3" /> },
        { value: 'hybrid', label: 'Hybrid', icon: <Layers className="size-3" /> },
      ]},
      { key: 'visibility', title: 'Visibility', icon: <Eye className="size-3.5" />, options: [
        { value: 'public', label: 'Public', icon: <Globe className="size-3" /> },
        { value: 'private', label: 'Private', icon: <Lock className="size-3" /> },
        { value: 'global', label: 'Global', icon: <Globe className="size-3" /> },
        { value: 'shared', label: 'Shared', icon: <Share2 className="size-3" /> },
      ]},
      { key: 'accessType', title: 'Access Type', icon: <ShieldCheck className="size-3.5" />, options: [
        { value: 'open', label: 'Open Registration', icon: <CheckCircle className="size-3" /> },
        { value: 'waitlist', label: 'Waitlist', icon: <Clock className="size-3" /> },
        { value: 'screened', label: 'Apply to Join', icon: <ShieldCheck className="size-3" /> },
        { value: 'paid', label: 'Paid Access', icon: <Ticket className="size-3" /> },
      ]},
      { key: 'payment', title: 'Price', icon: <DollarSign className="size-3.5" />, options: [
        { value: 'free', label: 'Free' },
        { value: 'paid', label: 'Paid' },
      ]},
      { key: 'context', title: 'Nested In', icon: <Layers className="size-3.5" />, options: [
        { value: 'standalone', label: 'Standalone' },
        { value: 'community', label: 'Inside Community', icon: <Link2 className="size-3" /> },
        { value: 'course', label: 'Inside Course', icon: <BookOpen className="size-3" /> },
      ]},
    ];

    return (
      <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-xl z-50 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Filters</span>
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-xs text-primary font-medium hover:underline cursor-pointer">
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>
        <div className="max-h-[400px] overflow-auto py-1">
          {sections.map((section) => (
            <div key={section.key} className="px-4 py-3">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-muted-foreground">{section.icon}</span>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{section.title}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {section.options.map((opt) => {
                  const isActive = (filters[section.key] as string[]).includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleFilter(section.key, opt.value as any)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card text-muted-foreground border-border hover:border-input'
                      }`}
                    >
                      {opt.icon && <span className={isActive ? 'text-primary-foreground' : ''}>{opt.icon}</span>}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ─── RENDER: Grid Card ───────────────────────────────────
  const renderGridCard = (event: Event) => {
    const isCreator = currentUser && isEventCreator(event, currentUser.email);
    const isSpeaker = currentUser && isEventSpeaker(event, currentUser.email) && !isCreator;
    const registrationStatus = currentUser ? getUserRegistrationStatus(event.id, currentUser.email) : null;
    const isAttending = registrationStatus === 'registered' || registrationStatus === 'waitlist';
    const isApplied = registrationStatus === 'applied';
    const isRejected = registrationStatus === 'rejected';
    const isDraft = event.status === 'draft';
    const isPast = event.status === 'past';
    const isCancelled = event.status === 'cancelled';
    const isLive = event.lifecycleStage === 'live';
    const isSoldOut = isEventSoldOut(event);
    const lifecycle = getEventLifecycleStage(event);
    const capacityPct = event.capacity ? Math.round((event.attendeeCount / event.capacity) * 100) : null;
    const isFillingUp = capacityPct !== null && capacityPct >= 75 && !isPast && !isCancelled;
    const hasMultiTier = event.tickets && event.tickets.length > 1;
    const lowestPrice = event.tickets && event.tickets.length > 0 ? Math.min(...event.tickets.map(t => t.price)) : event.price;
    const highestPrice = event.tickets && event.tickets.length > 0 ? Math.max(...event.tickets.map(t => t.price)) : event.price;
    const completionInfo = isDraft ? getEventCompletionCount(event) : null;
    const vipTicket = event.tickets?.find(t => t.name.toLowerCase().includes('vip') || t.name.toLowerCase().includes('mentorship'));
    const vipRemaining = vipTicket?.remaining;

    return (
      <div
        key={event.id}
        onClick={() => onEventClick(event.id)}
        className={[
          'group rounded-xl transition-all cursor-pointer shadow-none overflow-hidden',
          isCancelled ? 'bg-muted border border-border opacity-60'
            : isDraft ? 'bg-muted/80 border-2 border-dashed border-input hover:border-primary/40'
            : isPast ? 'bg-card border border-border hover:border-input opacity-75'
            : isLive ? 'bg-card border-2 border-red-200 hover:border-red-300'
            : 'bg-card border border-border hover:border-primary/30',
        ].join(' ')}
      >
        {/* Image Placeholder */}
        <div className={`w-full aspect-video bg-muted flex items-center justify-center relative ${isCancelled ? 'grayscale' : ''}`}>
          <Calendar className="size-10 text-muted-foreground/40" />
          {isLive && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 rounded-md">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-white" />
              </span>
              <span className="text-xs font-semibold">LIVE</span>
              {event.liveAttendeeCount && <span className="text-xs opacity-80">· {event.liveAttendeeCount} watching</span>}
            </div>
          )}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
            {isCreator && <Badge className="bg-primary text-primary-foreground border-none text-xs font-medium rounded-md px-2 py-0.5 shadow-none">Hosting</Badge>}
            {isSpeaker && <Badge className="bg-foreground text-card border-none text-xs font-medium rounded-md px-2 py-0.5 shadow-none">Speaker</Badge>}
            {isAttending && !isCreator && !isSpeaker && <Badge className="bg-foreground text-card border-none text-xs font-medium rounded-md px-2 py-0.5 shadow-none">{registrationStatus === 'waitlist' ? 'Waitlisted' : 'Attending'}</Badge>}
            {isApplied && !isCreator && <Badge className="bg-foreground/80 text-card border-none text-xs font-medium rounded-md px-2 py-0.5 shadow-none">Applied</Badge>}
            {isRejected && !isCreator && <Badge className="bg-muted-foreground text-card border-none text-xs font-medium rounded-md px-2 py-0.5 shadow-none">Not Accepted</Badge>}
            {isDraft && <Badge className="bg-card text-muted-foreground border border-border text-xs font-medium rounded-md px-2 py-0.5 shadow-none">
              {lifecycle === 'ready' ? 'Ready' : 'Draft'}
            </Badge>}
            {isCancelled && <Badge className="bg-muted text-muted-foreground border border-border text-xs font-medium rounded-md px-2 py-0.5 shadow-none">Cancelled</Badge>}
          </div>
          {!isLive && !isCancelled && (
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {event.isPaid && lowestPrice !== undefined
                ? <Badge className="bg-card text-foreground border border-border text-xs font-semibold rounded-md px-2.5 py-0.5 shadow-none">
                    {hasMultiTier ? `From $${lowestPrice}` : `$${lowestPrice}`}
                  </Badge>
                : <Badge className="bg-card text-muted-foreground border border-border text-xs font-medium rounded-md px-2.5 py-0.5 shadow-none">Free</Badge>}
              {event.earlyBird?.active && (
                <Badge className="bg-card text-muted-foreground border border-border text-[10px] font-medium rounded-md px-2 py-0.5 shadow-none">
                  {event.earlyBird.discountPercent}% off early bird
                </Badge>
              )}
            </div>
          )}
          {isDraft && completionInfo && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-card/90 border border-border rounded-md px-2.5 py-1.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((completionInfo.done / completionInfo.total) * 100)}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">{completionInfo.done}/{completionInfo.total}</span>
              </div>
            </div>
          )}
          {vipRemaining !== undefined && vipRemaining > 0 && vipRemaining <= 10 && !isDraft && !isPast && !isCancelled && (
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-card text-foreground border border-border text-[10px] font-medium rounded-md px-2 py-0.5 shadow-none">
                {vipRemaining} VIP left
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
        <h3 className="text-base text-foreground line-clamp-2 font-semibold leading-snug mb-1.5">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{event.description}</p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="size-3.5 text-muted-foreground flex-shrink-0" />
          <span className={isCancelled ? 'line-through text-muted-foreground' : ''}>{formatDate(event.date)}</span>
          <span className="text-border">&bull;</span>
          <span className={isCancelled ? 'line-through text-muted-foreground' : ''}>{event.time}</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          {getLocationBadge(event.location)}
          {isLive && <div className={taxonomyPill}><span className="size-1.5 bg-red-500 rounded-full animate-pulse" /><span className="text-red-600">Live</span></div>}
          {event.accessType === 'screened' && <div className={taxonomyPill}><ShieldCheck className="size-3.5" /><span>Apply</span></div>}
          {event.accessType === 'waitlist' && <div className={taxonomyPill}><Clock className="size-3.5" /><span>Waitlist</span></div>}
          {event.visibility === 'private' && <div className={taxonomyPill}><Lock className="size-3.5" /><span>Private</span></div>}
          {event.visibility === 'global' && <div className={taxonomyPill}><Globe className="size-3.5" /><span>Global</span></div>}
          {event.hideLocation && (event.location === 'in-person' || event.location === 'hybrid') && <div className={taxonomyPill}><Eye className="size-3.5" /><span>Hidden venue</span></div>}
          {isSoldOut && <div className={taxonomyPill}><span className="text-muted-foreground">Sold Out</span></div>}
          {!isSoldOut && isFillingUp && <div className={taxonomyPill}><span className="text-muted-foreground">Filling up</span></div>}
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0"><Users className="size-3 flex-shrink-0" />{event.attendeeCount}{event.capacity ? `/${event.capacity}` : ''}</span>
              {getEventLeapSpaceName(event) && (
                <>
                  <span className="text-border">&bull;</span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground truncate min-w-0"><Link2 className="size-3 flex-shrink-0" /><span className="truncate">{getEventLeapSpaceName(event)}</span></span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isCancelled ? (
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground line-through">Cancelled</span>
                  {isCreator && <button onClick={(e) => { e.stopPropagation(); handleDuplicate(event); }} className="h-7 px-2 flex items-center gap-1 text-xs text-muted-foreground hover:bg-accent rounded-md cursor-pointer transition-colors" title="Clone as new event"><Copy className="size-3" />Clone</button>}
                </div>
              ) : isCreator && isDraft ? (
                <>
                  <button onClick={(e) => { e.stopPropagation(); onEventClick(event.id); }} className="h-8 px-3 flex items-center gap-1 text-sm text-muted-foreground hover:bg-accent rounded-lg font-medium cursor-pointer transition-colors">
                    <Edit className="size-3.5" />
                    {lifecycle === 'ready' ? 'Review & Publish' : 'Continue Building'}
                  </button>
                  {lifecycle === 'ready' && (
                    <button onClick={(e) => { e.stopPropagation(); }} className="h-8 px-3 flex items-center gap-1 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold cursor-pointer transition-colors"><Send className="size-3.5" />Publish</button>
                  )}
                </>
              ) : isCreator && isLive ? (
                <button onClick={(e) => { e.stopPropagation(); onEventClick(event.id); }} className="h-8 px-3 flex items-center gap-1 text-sm bg-red-600 text-white hover:bg-red-700 rounded-lg font-semibold cursor-pointer transition-colors">
                  <Play className="size-3.5" />Live Dashboard
                </button>
              ) : isCreator ? (
                <>
                  <button onClick={(e) => { e.stopPropagation(); }} className="h-8 px-3 flex items-center gap-1 text-sm text-primary hover:bg-primary/10 rounded-lg font-semibold cursor-pointer transition-colors"><Edit className="size-3.5" />Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDuplicate(event); }} className="h-8 px-2 flex items-center gap-1 text-sm text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors" title="Duplicate event"><Copy className="size-3.5" /></button>
                  <button onClick={(e) => { e.stopPropagation(); }} className="h-8 px-2 flex items-center gap-1 text-sm text-muted-foreground hover:bg-accent rounded-lg cursor-pointer transition-colors"><BarChart3 className="size-3.5" /></button>
                </>
              ) : isSpeaker ? (
                <button onClick={(e) => { e.stopPropagation(); }} className="h-8 px-3 flex items-center gap-1 text-sm text-foreground bg-muted hover:bg-accent rounded-lg font-medium cursor-pointer transition-colors">View Event</button>
              ) : isPast ? (
                <div className="flex items-center gap-2">
                  {event.recordingUrl && <button onClick={(e) => { e.stopPropagation(); }} className="h-8 px-3 flex items-center gap-1 text-sm text-primary hover:bg-primary/10 rounded-lg font-medium cursor-pointer transition-colors"><Play className="size-3.5" />Recording</button>}
                  {event.certificateTemplateId && <button onClick={(e) => { e.stopPropagation(); }} className="h-8 px-3 flex items-center gap-1 text-sm text-muted-foreground hover:bg-accent rounded-lg font-medium cursor-pointer transition-colors"><Award className="size-3.5" />Certificate</button>}
                  {!event.recordingUrl && !event.certificateTemplateId && <span className="text-sm text-muted-foreground">Ended</span>}
                </div>
              ) : isRejected ? (
                <button onClick={(e) => { e.stopPropagation(); }} className="h-8 px-3 flex items-center text-sm text-muted-foreground bg-muted rounded-lg font-medium cursor-default border border-border">Not Accepted</button>
              ) : isApplied ? (
                <button onClick={(e) => { e.stopPropagation(); }} className="h-8 px-3 flex items-center text-sm text-muted-foreground bg-muted rounded-lg font-semibold cursor-default border border-border"><Clock className="size-3.5 mr-1" />Pending Review</button>
              ) : isAttending ? (
                isLive ? (
                  <button onClick={(e) => { e.stopPropagation(); onJoinLiveEvent?.(event.title, 'EVT-' + event.id); }} className="h-8 px-3 flex items-center gap-1 text-sm bg-red-600 text-white hover:bg-red-700 rounded-lg font-semibold cursor-pointer transition-colors">
                    <Play className="size-3.5" />Join Now
                  </button>
                ) : (
                  <button onClick={(e) => { e.stopPropagation(); onViewPublicPage?.(event.id); }} className="h-8 px-3 flex items-center text-sm text-primary bg-primary/10 rounded-lg font-semibold cursor-pointer border border-primary/20"><CheckCircle className="size-3.5 mr-1" />{registrationStatus === 'registered' ? 'View Ticket' : 'On Waitlist'}</button>
                )
              ) : event.status === 'upcoming' || isLive ? (
                <button onClick={(e) => { e.stopPropagation(); if (isSoldOut && !event.waitlistEnabled) return; openCTA(event); }} className={`h-8 px-3 flex items-center gap-1.5 text-sm rounded-lg font-semibold cursor-pointer transition-colors ${isSoldOut && !event.waitlistEnabled ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                  {isSoldOut && event.waitlistEnabled ? <><Clock className="size-3.5" />Join Waitlist</> :
                   isSoldOut ? 'Sold Out' :
                   event.accessType === 'screened' ? <><ShieldCheck className="size-3.5" />Apply to Join</> :
                   event.isPaid ? <><Ticket className="size-3.5" />{hasMultiTier ? 'Get Tickets' : 'Buy Ticket'}</> :
                   event.accessType === 'waitlist' ? <><Clock className="size-3.5" />Join Waitlist</> :
                   isLive ? <><Play className="size-3.5" />Join Live</> :
                   'Register'}
                </button>
              ) : null}
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  };

  // ─── RENDER: List Row ────────────────────────────────────
  const renderListRow = (event: Event) => {
    const isCreator = currentUser && isEventCreator(event, currentUser.email);
    const registrationStatus = currentUser ? getUserRegistrationStatus(event.id, currentUser.email) : null;
    const isAttending = registrationStatus === 'registered' || registrationStatus === 'waitlist';

    return (
      <div
        key={event.id}
        onClick={() => onEventClick(event.id)}
        className="group bg-card border border-border rounded-lg px-5 py-4 hover:border-primary/20 transition-all cursor-pointer shadow-none flex items-center gap-4"
      >
        <div className="w-14 flex-shrink-0 text-center">
          <div className="text-xs text-primary font-semibold uppercase">
            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
          </div>
          <div className="text-xl text-foreground font-semibold leading-tight">
            {new Date(event.date).getDate()}
          </div>
        </div>

        <div className="h-10 w-px bg-border flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm text-foreground font-semibold truncate">{event.title}</h3>
            {isCreator && <Badge className="bg-primary text-primary-foreground border-none text-xs font-medium rounded px-2 py-0 shadow-none flex-shrink-0">Hosting</Badge>}
            {isAttending && !isCreator && <Badge className="bg-foreground text-card border-none text-xs font-medium rounded px-2 py-0 shadow-none flex-shrink-0">{registrationStatus === 'waitlist' ? 'Waitlisted' : 'Attending'}</Badge>}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">{event.time}</span>
            <span className="text-border">&bull;</span>
            {getLocationBadge(event.location)}
            {event.visibility !== 'public' && (
              <div className={taxonomyPill}>
                {event.visibility === 'private' ? <Lock className="size-3" /> : event.visibility === 'global' ? <Globe className="size-3" /> : <Share2 className="size-3" />}
                <span className="capitalize">{event.visibility}</span>
              </div>
            )}
            {event.accessType !== 'open' && (
              <div className={taxonomyPill}>
                {event.accessType === 'screened' ? <ShieldCheck className="size-3" /> : event.accessType === 'waitlist' ? <Clock className="size-3" /> : <Ticket className="size-3" />}
                <span className="capitalize">{event.accessType === 'screened' ? 'Apply' : event.accessType}</span>
              </div>
            )}
            {event.parentCourseId && event.courseName && (
              <div className={taxonomyPill}><BookOpen className="size-3" /><span>{event.courseName}</span></div>
            )}
            {event.linkedToCommunity && event.communityName && !event.parentCourseId && (
              <div className={taxonomyPill}><Link2 className="size-3" /><span>{event.communityName}</span></div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground flex-shrink-0 w-20">
          <Users className="size-4" />
          <span className="font-medium">{event.attendeeCount}{event.capacity ? `/${event.capacity}` : ''}</span>
        </div>

        <div className="w-16 text-right flex-shrink-0">
          {event.isPaid && event.price ? (
            <span className="text-sm font-semibold text-foreground">${event.price}</span>
          ) : (
            <span className="text-sm font-medium text-muted-foreground">Free</span>
          )}
        </div>

        {!isCreator && (
          <div className="w-24 text-right flex-shrink-0 hidden lg:block">
            <span className="text-xs text-muted-foreground truncate">{getEventLeapSpaceName(event) || event.creatorName}</span>
          </div>
        )}

        <div className="flex-shrink-0 w-28 text-right">
          {isCreator ? (
            <button onClick={(e) => { e.stopPropagation(); onEventClick(event.id); }} className="h-8 px-3 inline-flex items-center gap-1 text-sm text-primary hover:bg-primary/10 rounded-lg font-semibold cursor-pointer transition-colors">
              <Edit className="size-3.5" />Edit
            </button>
          ) : isAttending ? (
            <button onClick={(e) => { e.stopPropagation(); onViewPublicPage?.(event.id); }} className="h-8 px-3 inline-flex items-center text-sm text-primary bg-primary/10 rounded-lg font-semibold cursor-pointer">
              <CheckCircle className="size-3.5 mr-1" />
              {registrationStatus === 'registered' ? 'Ticket' : 'Waitlist'}
            </button>
          ) : event.status === 'upcoming' ? (
            <button onClick={(e) => { e.stopPropagation(); openCTA(event); }} className="h-8 px-3 inline-flex items-center gap-1 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold cursor-pointer transition-colors">
              {event.accessType === 'screened' ? 'Apply' : event.isPaid ? `$${event.price}` : event.accessType === 'waitlist' ? 'Waitlist' : 'Register'}
            </button>
          ) : (
            <span className="text-sm text-muted-foreground">Ended</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ─── HEADER ──────────────────────────────────────────── */}
      <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 pt-6 pb-0">
        {/* ── Row 1: Title + Create buttons ── */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="min-w-0">
            <h1 className="text-foreground font-semibold text-2xl">Events</h1>
            <p className="text-sm text-muted-foreground mt-1">Discover, host, and manage your events</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onCreateManualClick && (
              <Button onClick={() => { setStepperPrefill(undefined); setShowStepperModal(true); }} variant="outline" className="rounded-lg shadow-none h-9 border-border text-foreground hover:bg-accent">
                <Plus className="size-4 mr-1.5" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            )}

            <Button onClick={onCreateClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none h-9">
              <Wand2 className="size-4 mr-1.5" />
              <span className="hidden sm:inline">Create with AI</span>
              <span className="sm:hidden">AI</span>
            </Button>
          </div>
        </div>

        {/* ── Row 2: Search + Filter/Sort/View ── */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events, hosts, communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-9 pr-4 w-full bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer">
                <X className="size-3.5 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          <div className="relative" ref={filterRef}>
            <button
              onClick={() => { setShowFilterPanel(!showFilterPanel); setShowSortMenu(false); }}
              className={`h-9 px-3 flex items-center gap-1.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                activeFilterCount > 0 || showFilterPanel
                  ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-card text-muted-foreground border-border hover:bg-accent'
              }`}
            >
              <Filter className="size-3.5" />
              <span className="hidden sm:inline">Filter</span>
              {activeFilterCount > 0 && (
                <span className="size-5 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {showFilterPanel && renderFilterPanel()}
          </div>

          <div className="relative" ref={sortRef}>
            <button
              onClick={() => { setShowSortMenu(!showSortMenu); setShowFilterPanel(false); }}
              className={`h-9 px-3 flex items-center gap-1.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                showSortMenu ? 'bg-primary/10 text-primary border-primary/30' : 'bg-card text-muted-foreground border-border hover:bg-accent'
              }`}
            >
              <ArrowUpDown className="size-3.5" />
              <span className="hidden sm:inline">Sort</span>
            </button>
            {showSortMenu && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-popover border border-border rounded-xl z-50 py-1 overflow-hidden">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSortMenu(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                      sortBy === opt.value ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center p-0.5 bg-muted rounded-lg border border-border/50 h-9">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'grid' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              <Grid3x3 className="size-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'list' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              <List className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-3 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
            </button>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="bg-card border-b border-border px-8 py-2 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground mr-1">Active:</span>
          {getActiveFilterChips().map((chip) => (
            <button
              key={`${chip.category}-${chip.value}`}
              onClick={() => toggleFilter(chip.category, chip.value as any)}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20 hover:bg-primary/15 transition-colors cursor-pointer"
            >
              {chip.label}
              <X className="size-3" />
            </button>
          ))}
          <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground ml-1 cursor-pointer">
            Clear all
          </button>
        </div>
      )}

      {/* ─── CONTENT AREA ────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 overflow-auto px-8 py-6">
          {(searchQuery || activeFilterCount > 0) && (
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
              {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
            </div>
          )}

          {filteredEvents.length === 0 ? (
            isEmpty ? (
              /* ═══ First-time empty state (zero events) ═══ */
              <div className="flex flex-col items-center justify-center py-16 px-6">
                {/* Illustration */}
                <div className="size-24 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-6">
                  <Calendar className="size-10 text-muted-foreground/50" />
                </div>
                <h2 className="text-foreground text-xl mb-2 text-center">Create your first event</h2>
                <p className="text-muted-foreground text-sm text-center max-w-md mb-8">
                  Host virtual, in-person, or hybrid events. Manage registrations, tickets, and schedules all in one place.
                </p>

                {/* Template cards */}
                <div className="w-full max-w-2xl mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Popular templates</p>
                    {onBrowseTemplates && (
                      <button onClick={onBrowseTemplates} className="text-xs text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer">
                        Browse all templates
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'workshop', name: 'Technical Workshop', desc: 'Hands-on training with live coding and Q&A', meta: '2h · 50 seats · Paid', icon: 'code' },
                      { id: 'webinar', name: 'Product Webinar', desc: 'Live product demo with audience interaction', meta: '1h · 500 seats · Free', icon: 'monitor' },
                      { id: 'networking', name: 'Networking Mixer', desc: 'Casual networking with icebreakers', meta: '90m · 100 seats · Free', icon: 'users' },
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setStepperPrefill({ templateId: t.id }); setShowStepperModal(true); }}
                        className="p-4 rounded-xl border border-border bg-card hover:border-primary/25 transition-all cursor-pointer text-left group"
                      >
                        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                          {t.icon === 'code' && <Calendar className="size-4 text-primary" />}
                          {t.icon === 'monitor' && <Video className="size-4 text-primary" />}
                          {t.icon === 'users' && <Users className="size-4 text-primary" />}
                        </div>
                        <p className="text-sm text-foreground font-medium mb-1 group-hover:text-primary transition-colors">{t.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{t.desc}</p>
                        <p className="text-[10px] text-muted-foreground">{t.meta}</p>
                      </button>
                    ))}
                  </div>

                  {/* Browse all CTA */}
                  {onBrowseTemplates && (
                    <button
                      onClick={onBrowseTemplates}
                      className="w-full mt-3 p-3 rounded-lg border border-dashed border-border hover:border-primary/30 text-center transition-colors cursor-pointer group"
                    >
                      <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                        View all 25+ templates
                      </p>
                    </button>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3">
                  <Button onClick={() => { setStepperPrefill(undefined); setShowStepperModal(true); }} variant="outline" className="shadow-none gap-1.5">
                    <Plus className="size-4" />
                    Create Manually
                  </Button>
                  <Button onClick={onCreateClick} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-none gap-1.5">
                    <Wand2 className="size-4" />
                    Create with AI
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-4">Events can be free or paid, one-time or recurring</p>
              </div>
            ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Calendar className="size-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-sm text-foreground mb-2 font-semibold">No events found</h3>
              <p className="text-sm text-muted-foreground mb-6">
                {searchQuery || activeFilterCount > 0 ? 'Try adjusting your search or filters'
                  : activeTab === 'my-events' ? "You aren't hosting any events yet"
                  : activeTab === 'registered' ? "You haven't registered for any events"
                  : activeTab === 'drafts' ? "No draft events"
                  : activeTab === 'past' ? 'No past events to show'
                  : 'Start exploring to find events you like'}
              </p>
              <div className="flex gap-3">
                {(searchQuery || activeFilterCount > 0) && (
                  <Button variant="outline" onClick={() => { setSearchQuery(''); clearFilters(); }} className="text-sm shadow-none">Clear Filters</Button>
                )}
                {activeTab === 'my-events' && (
                  <Button onClick={() => { setStepperPrefill(undefined); setShowStepperModal(true); }} className="bg-primary text-primary-foreground shadow-none text-sm">Create Your First Event</Button>
                )}
              </div>
            </div>
            )
          ) : viewMode === 'grid' ? (
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
              {filteredEvents.map(renderGridCard)}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-4 px-5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <div className="w-14 flex-shrink-0 text-center">Date</div>
                <div className="w-px h-3" />
                <div className="flex-1">Event</div>
                <div className="w-20 flex-shrink-0">Attendees</div>
                <div className="w-16 text-right flex-shrink-0">Price</div>
                <div className="w-24 text-right flex-shrink-0 hidden lg:block">LeapSpace</div>
                <div className="w-24 text-right flex-shrink-0">Action</div>
              </div>
              {filteredEvents.map(renderListRow)}
            </div>
          )}

          {/* ═══ ZONE 2 — Explore Other LeapSpaces ═══ */}
          {activeTab === 'all' && !searchQuery && activeFilterCount === 0 && (() => {
            const externalSpaces = getExternalLeapSpaces(currentUser?.email || '');
            if (externalSpaces.length === 0) return null;
            return (
              <div className="mt-10 border-t border-border pt-8">
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="size-5 text-muted-foreground" />
                  <h2 className="text-foreground text-lg">Explore LeapSpaces</h2>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Discover events from communities you haven't joined yet</p>

                <div className="space-y-8">
                  {externalSpaces.map((ls) => {
                    const lsEvents = getLeapSpaceEvents(ls.id);
                    if (lsEvents.length === 0) return null;
                    return (
                      <div key={ls.id} className="rounded-xl border border-border bg-card overflow-hidden">
                        {/* LeapSpace Header */}
                        <div className="px-5 py-4 border-b border-border flex items-center gap-3">
                          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-primary">{ls.initials}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm text-foreground truncate">{ls.name}</h3>
                              <Badge className="bg-muted text-muted-foreground border border-border text-[10px] px-1.5 py-0 h-4 rounded shadow-none">{ls.category}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{ls.description}</p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="text-right hidden sm:block">
                              <div className="text-xs text-muted-foreground">{ls.memberCount.toLocaleString()} members</div>
                              <div className="text-xs text-muted-foreground">{lsEvents.length} upcoming</div>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-lg shadow-none h-8 border-border text-foreground hover:bg-accent text-xs">
                              Explore
                              <ArrowRight className="size-3 ml-1" />
                            </Button>
                          </div>
                        </div>

                        {/* Horizontal Event Cards */}
                        <div className="p-4">
                          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
                            {lsEvents.map((event) => {
                              const capacityPct = event.capacity ? Math.round((event.attendeeCount / event.capacity) * 100) : null;
                              const isSoldOut = isEventSoldOut(event);
                              const isLive = event.status === 'live';
                              const z2RegStatus = currentUser ? getUserRegistrationStatus(event.id, currentUser.email) : null;
                              const z2IsAttending = z2RegStatus === 'registered' || z2RegStatus === 'waitlist';
                              const z2IsApplied = z2RegStatus === 'applied';
                              const z2IsRejected = z2RegStatus === 'rejected';
                              const z2HasMultiTier = event.tickets && event.tickets.length > 1;
                              const z2LowestPrice = event.tickets && event.tickets.length > 0 ? Math.min(...event.tickets.map(t => t.price)) : event.price;
                              return (
                                <div
                                  key={event.id}
                                  onClick={() => onEventClick(event.id)}
                                  className="min-w-[240px] max-w-[300px] flex-shrink-0 rounded-lg border border-border bg-background hover:border-primary/30 transition-all cursor-pointer group overflow-hidden"
                                >
                                  {/* Image Placeholder */}
                                  <div className="w-full aspect-video bg-muted flex items-center justify-center relative">
                                    <Calendar className="size-8 text-muted-foreground/40" />
                                    {isLive && (
                                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded-md">
                                        <span className="relative flex size-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" /><span className="relative inline-flex rounded-full size-1.5 bg-white" /></span>
                                        <span className="text-[10px] font-semibold">LIVE</span>
                                      </div>
                                    )}
                                    {!isLive && (
                                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                                        {event.isPaid && z2LowestPrice
                                          ? <Badge className="bg-card text-foreground border border-border text-xs font-semibold rounded-md px-2 py-0.5 shadow-none">{z2HasMultiTier ? `From $${z2LowestPrice}` : `$${z2LowestPrice}`}</Badge>
                                          : <Badge className="bg-card text-muted-foreground border border-border text-xs font-medium rounded-md px-2 py-0.5 shadow-none">Free</Badge>}
                                      </div>
                                    )}
                                    <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1">
                                      {z2IsAttending && <Badge className="bg-foreground text-card border-none text-[10px] font-medium rounded-md px-1.5 py-0.5 shadow-none">{z2RegStatus === 'waitlist' ? 'Waitlisted' : 'Attending'}</Badge>}
                                      {z2IsApplied && <Badge className="bg-foreground/80 text-card border-none text-[10px] font-medium rounded-md px-1.5 py-0.5 shadow-none">Applied</Badge>}
                                      {z2IsRejected && <Badge className="bg-muted-foreground text-card border-none text-[10px] font-medium rounded-md px-1.5 py-0.5 shadow-none">Not Accepted</Badge>}
                                    </div>
                                  </div>
                                  {/* Content */}
                                  <div className="p-4">
                                  <h4 className="text-sm text-foreground line-clamp-2 font-semibold leading-snug mb-1">{event.title}</h4>
                                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2.5">{event.description}</p>

                                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <Calendar className="size-3.5 flex-shrink-0" />
                                    <span>{formatDateShort(event.date)}</span>
                                    <span className="text-border">&bull;</span>
                                    <span>{event.time}</span>
                                  </div>

                                  <div className="flex items-center gap-1.5 flex-wrap mb-3">
                                    {getLocationBadge(event.location)}
                                    {isLive && <div className={taxonomyPill}><span className="size-1.5 bg-red-500 rounded-full animate-pulse" /><span className="text-red-600">Live</span></div>}
                                    {event.accessType === 'screened' && <div className={taxonomyPill}><ShieldCheck className="size-3.5" /><span>Apply</span></div>}
                                    {event.accessType === 'waitlist' && <div className={taxonomyPill}><Clock className="size-3.5" /><span>Waitlist</span></div>}
                                    {event.visibility === 'private' && <div className={taxonomyPill}><Lock className="size-3.5" /><span>Private</span></div>}
                                    {event.visibility === 'global' && <div className={taxonomyPill}><Globe className="size-3.5" /><span>Global</span></div>}
                                    {event.hideLocation && (event.location === 'in-person' || event.location === 'hybrid') && <div className={taxonomyPill}><Eye className="size-3.5" /><span>Hidden venue</span></div>}
                                    {isSoldOut && <div className={taxonomyPill}><span className="text-muted-foreground">Sold Out</span></div>}
                                    {!isSoldOut && capacityPct !== null && capacityPct >= 75 && <div className={taxonomyPill}><span className="text-muted-foreground">Filling up</span></div>}
                                  </div>

                                  <div className="pt-2.5 border-t border-border flex items-center justify-between">
                                    <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0"><Users className="size-3.5 flex-shrink-0" />{event.attendeeCount}{event.capacity ? `/${event.capacity}` : ''}</span>
                                      {getEventLeapSpaceName(event) && (
                                        <>
                                          <span className="text-border">&bull;</span>
                                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground truncate min-w-0"><Link2 className="size-3 flex-shrink-0" /><span className="truncate">{getEventLeapSpaceName(event)}</span></span>
                                        </>
                                      )}
                                    </div>
                                    {z2IsRejected ? (
                                      <span className="h-7 px-2.5 text-xs rounded-md font-medium inline-flex items-center bg-muted text-muted-foreground border border-border">Not Accepted</span>
                                    ) : z2IsApplied ? (
                                      <span className="h-7 px-2.5 text-xs rounded-md font-medium inline-flex items-center gap-1 bg-muted text-muted-foreground border border-border"><Clock className="size-3" />Pending</span>
                                    ) : z2IsAttending && isLive ? (
                                      <button onClick={(e) => { e.stopPropagation(); onJoinLiveEvent?.(event.title, 'EVT-' + event.id); }} className="h-7 px-2.5 text-xs rounded-md font-semibold inline-flex items-center gap-1 bg-red-600 text-white hover:bg-red-700 cursor-pointer transition-colors"><Play className="size-3" />Join</button>
                                    ) : z2IsAttending ? (
                                      <button onClick={(e) => { e.stopPropagation(); onViewPublicPage?.(event.id); }} className="h-7 px-2.5 text-xs rounded-md font-semibold inline-flex items-center gap-1 text-primary bg-primary/10 border border-primary/20 cursor-pointer"><CheckCircle className="size-3" />{z2RegStatus === 'registered' ? 'Ticket' : 'Waitlisted'}</button>
                                    ) : (
                                      <button
                                        onClick={(e) => { e.stopPropagation(); if (isSoldOut && !event.waitlistEnabled) return; openCTA(event); }}
                                        className={`h-7 px-2.5 text-xs rounded-md font-semibold transition-colors cursor-pointer ${
                                          isSoldOut && !event.waitlistEnabled
                                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                                        }`}
                                      >
                                        {isSoldOut && event.waitlistEnabled ? 'Waitlist' :
                                         isSoldOut ? 'Sold Out' :
                                         event.accessType === 'screened' ? 'Apply' :
                                         event.isPaid ? (z2HasMultiTier ? `From $${z2LowestPrice}` : `$${z2LowestPrice}`) :
                                         event.accessType === 'waitlist' ? 'Waitlist' :
                                         isLive ? 'Join Live' :
                                         'Register'}
                                      </button>
                                    )}
                                  </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        {/* ─── RIGHT SIDEBAR ─────────────────────────────────── */}
        <div className="w-[380px] border-l border-border bg-card overflow-auto hidden xl:block">
          <div className="p-5 space-y-6">
            {/* Compact Calendar */}
            {(() => {
              const calY = sidebarCalMonth.getFullYear();
              const calM = sidebarCalMonth.getMonth();
              const calMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
              const daysInMo = new Date(calY, calM + 1, 0).getDate();
              const firstDow = new Date(calY, calM, 1).getDay();
              const prevDays = new Date(calY, calM, 0).getDate();
              const totalCells = Math.ceil((firstDow + daysInMo) / 7) * 7;
              // Build event density map
              const eventDates = new Map<string, number>();
              mockEvents.filter(e => e.status === 'upcoming' || e.status === 'published').forEach(e => {
                eventDates.set(e.date, (eventDates.get(e.date) || 0) + 1);
              });
              const fmtKey = (y: number, m: number, d: number) =>
                `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
              const todayKey = '2026-03-18';

              const cells: Array<{ day: number; key: string; cur: boolean }> = [];
              for (let i = firstDow - 1; i >= 0; i--) {
                const d = prevDays - i;
                const m = calM === 0 ? 11 : calM - 1;
                const y = calM === 0 ? calY - 1 : calY;
                cells.push({ day: d, key: fmtKey(y, m, d), cur: false });
              }
              for (let d = 1; d <= daysInMo; d++) cells.push({ day: d, key: fmtKey(calY, calM, d), cur: true });
              for (let d = 1; cells.length < totalCells; d++) {
                const m = calM === 11 ? 0 : calM + 1;
                const y = calM === 11 ? calY + 1 : calY;
                cells.push({ day: d, key: fmtKey(y, m, d), cur: false });
              }

              return (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs text-muted-foreground uppercase tracking-wide">{calMonths[calM]} {calY}</h3>
                    <div className="flex items-center gap-0.5">
                      <button onClick={() => setSidebarCalMonth(new Date(calY, calM - 1))} className="size-5 flex items-center justify-center rounded hover:bg-muted cursor-pointer">
                        <ChevronLeft className="size-3 text-muted-foreground" />
                      </button>
                      <button onClick={() => setSidebarCalMonth(new Date(calY, calM + 1))} className="size-5 flex items-center justify-center rounded hover:bg-muted cursor-pointer">
                        <ChevronRight className="size-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden bg-card">
                    {['S','M','T','W','T','F','S'].map((d, i) => (
                      <div key={i} className="text-center text-[10px] text-muted-foreground py-1.5 bg-muted/50">{d}</div>
                    ))}
                    {cells.map((cell, i) => {
                      const isToday = cell.key === todayKey;
                      const isSel = cell.key === sidebarSelectedDate;
                      const evtCount = eventDates.get(cell.key) || 0;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (sidebarSelectedDate === cell.key) {
                              setSidebarSelectedDate(null);
                              setSearchQuery('');
                            } else {
                              setSidebarSelectedDate(cell.key);
                              // Filter events list to this date
                              const d = new Date(cell.key + 'T00:00:00');
                              setSearchQuery(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                              setActiveTab('all');
                            }
                          }}
                          className={`relative h-8 flex items-center justify-center text-[11px] cursor-pointer transition-colors
                            ${!cell.cur ? 'text-muted-foreground/30' : 'text-foreground'}
                            ${isToday ? 'bg-primary text-primary-foreground' : ''}
                            ${isSel && !isToday ? 'bg-primary/10' : ''}
                            ${!isToday && !isSel ? 'hover:bg-muted' : ''}
                          `}
                        >
                          {cell.day}
                          {evtCount > 0 && !isToday && (
                            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-primary/50" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {sidebarSelectedDate && (
                    <button
                      onClick={() => { setSidebarSelectedDate(null); setSearchQuery(''); }}
                      className="mt-2 text-[11px] text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      Clear date filter
                    </button>
                  )}
                </div>
              );
            })()}

            {/* Upcoming Events */}
            <div>
              <h3 className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Upcoming</h3>
              <div className="space-y-2">
                {mockEvents
                  .filter(e => e.status === 'upcoming' || e.status === 'published')
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 5)
                  .map((evt) => (
                    <div
                      key={`side-${evt.id}`}
                      className="p-3 rounded-lg border border-border bg-card hover:border-primary/20 transition-colors cursor-pointer"
                      onClick={() => onEventClick(evt.id)}
                    >
                      <div className="text-sm font-semibold text-foreground mb-1 line-clamp-1">{evt.title}</div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                        <Calendar className="size-3 flex-shrink-0" />
                        <span>{formatDateShort(evt.date)}</span>
                        <span className="text-border">&bull;</span>
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          {evt.location === 'virtual' ? <Video className="size-3" /> : evt.location === 'in-person' ? <MapPin className="size-3" /> : <Layers className="size-3" />}
                          <span className="capitalize">{evt.location === 'in-person' ? 'In-Person' : evt.location}</span>
                        </div>
                        {evt.isPaid && evt.price ? (
                          <span className="text-xs font-semibold text-foreground">${evt.price}</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Free</span>
                        )}
                      </div>
                    </div>
                  ))}
                {mockEvents.filter(e => e.status === 'upcoming' || e.status === 'published').length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">No upcoming events</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Manual Create Modal (kept for backward compat) */}
      {onCreateManualClick && (
        <ManualEventCreateModal
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          onSubmit={(data) => {
            setShowCreateModal(false);
            onCreateManualClick(data);
          }}
        />
      )}

      {/* CTA Modals (Registration / Checkout / Waitlist / Application) */}
      <EventCTAModals
        event={activeEvent}
        open={ctaOpen}
        onOpenChange={setCtaOpen}
        onSuccess={(evt, flow) => {
          closeCTA();
          // Could refresh data or navigate
        }}
        onJoinLive={(title) => {
          closeCTA();
          onJoinLiveEvent?.(title, 'EVT-LIVE');
        }}
      />

      {/* New 3-Step Creation Stepper */}
      {onCreateManualClick && (
        <EventCreationStepper
          open={showStepperModal}
          onOpenChange={setShowStepperModal}
          prefill={stepperPrefill}
          onSwitchToAI={() => { setShowStepperModal(false); onCreateClick(); }}
          onSubmit={(data) => {
            setShowStepperModal(false);
            onCreateManualClick({
              title: data.title,
              type: data.type,
              date: data.date,
              time: data.time,
              endTime: data.endTime,
              location: data.location,
              description: data.description,
              capacity: data.capacity,
            });
            toast.success('Event created as draft', { description: 'You can now refine everything in the builder.' });
          }}
        />
      )}
    </div>
  );
}

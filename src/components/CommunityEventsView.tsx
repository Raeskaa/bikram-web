import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  Calendar, UsersIcon, Clock, Video, MapPin, Plus, Check, X, 
  MoreVertical, Edit, Trash2, Mail, PlayCircle, Hash, Lightbulb,
  Wand2, ChevronRight, Eye, MessageCircle, Bell, Filter, Search,
  Share2, Download, ExternalLink, Sparkles
} from 'lucide-react';

interface CommunityEvent {
  id: string;
  type: 'community';
  title: string;
  description: string;
  coverImage?: string;
  startDate: string;
  time: string;
  timezone: string;
  duration: number;
  eventType: 'virtual' | 'in-person' | 'hybrid';
  category: 'workshop' | 'webinar' | 'networking' | 'social' | 'qa';
  meetingLink?: string;
  location?: string;
  capacity: number;
  currentAttendees: number;
  waitlistEnabled: boolean;
  autoCreateSubChannel: boolean;
  subChannelId?: string;
  subChannelName?: string;
  rsvpDeadline?: string;
  requireApproval: boolean;
  recordingEnabled: boolean;
  recordingUrl?: string;
  discussionEnabled: boolean;
  status: 'draft' | 'published' | 'live' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
  tags: string[];
  hostName: string;
  hostAvatar: string;
  userRSVPStatus?: 'going' | 'maybe' | 'not-going' | 'waitlist' | null;
}

interface EventsViewProps {
  userRole: 'admin' | 'moderator' | 'member';
  communityId: string;
  communityName: string;
  userId: string;
  onAddExistingEvent?: () => void;
  onCreateEvent?: () => void;
}

export function CommunityEventsView({ userRole, communityId, communityName, userId, onAddExistingEvent, onCreateEvent }: EventsViewProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'my-events'>('upcoming');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEventDetail, setShowEventDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Sample events data
  const sampleEvents: CommunityEvent[] = [
    {
      id: '1',
      type: 'community',
      title: 'Monthly Community Call',
      description: 'Monthly sync to discuss Q1 goals and upcoming features. We\'ll cover roadmap updates, answer questions, and hear your feedback.',
      startDate: 'Jan 15, 2025',
      time: '3:00 PM',
      timezone: 'EST',
      duration: 60,
      eventType: 'virtual',
      category: 'qa',
      meetingLink: 'https://zoom.us/j/example',
      capacity: 100,
      currentAttendees: 42,
      waitlistEnabled: false,
      autoCreateSubChannel: true,
      subChannelId: 'monthly-call-jan',
      subChannelName: 'monthly-community-call',
      recordingEnabled: true,
      discussionEnabled: true,
      status: 'published',
      createdBy: 'user1',
      createdAt: '2025-01-01',
      tags: ['monthly', 'all-hands'],
      hostName: 'Sarah Chen',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      userRSVPStatus: 'going',
      requireApproval: false,
    },
    {
      id: '2',
      type: 'community',
      title: 'Design Workshop: Figma Advanced Techniques',
      description: 'Learn advanced Figma techniques from industry experts. Perfect for designers looking to level up their skills.',
      startDate: 'Jan 18, 2025',
      time: '2:00 PM',
      timezone: 'EST',
      duration: 90,
      eventType: 'virtual',
      category: 'workshop',
      capacity: 50,
      currentAttendees: 28,
      waitlistEnabled: true,
      autoCreateSubChannel: true,
      subChannelName: 'figma-advanced-workshop',
      recordingEnabled: true,
      discussionEnabled: true,
      status: 'published',
      createdBy: 'user2',
      createdAt: '2025-01-02',
      tags: ['design', 'workshop', 'figma'],
      hostName: 'Marcus Webb',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      userRSVPStatus: 'maybe',
      requireApproval: false,
    },
    {
      id: '3',
      type: 'community',
      title: 'Networking Mixer',
      description: 'Meet fellow community members in person! Light refreshments provided.',
      startDate: 'Jan 22, 2025',
      time: '6:00 PM',
      timezone: 'EST',
      duration: 120,
      eventType: 'in-person',
      category: 'networking',
      location: '123 Main St, New York, NY',
      capacity: 30,
      currentAttendees: 15,
      waitlistEnabled: true,
      autoCreateSubChannel: false,
      recordingEnabled: false,
      discussionEnabled: true,
      status: 'published',
      createdBy: 'user1',
      createdAt: '2025-01-03',
      tags: ['networking', 'in-person'],
      hostName: 'Sarah Chen',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      userRSVPStatus: null,
      requireApproval: false,
    },
  ];

  const pastEvents: CommunityEvent[] = [
    {
      id: '4',
      type: 'community',
      title: 'Welcome Webinar',
      description: 'Introduction to the community and platform features.',
      startDate: 'Dec 28, 2024',
      time: '4:00 PM',
      timezone: 'EST',
      duration: 45,
      eventType: 'virtual',
      category: 'webinar',
      capacity: 100,
      currentAttendees: 65,
      waitlistEnabled: false,
      autoCreateSubChannel: true,
      recordingEnabled: true,
      recordingUrl: 'https://example.com/recording',
      discussionEnabled: true,
      status: 'completed',
      createdBy: 'user1',
      createdAt: '2024-12-20',
      tags: ['onboarding', 'welcome'],
      hostName: 'Sarah Chen',
      hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      userRSVPStatus: 'going',
      requireApproval: false,
    },
  ];

  const canCreateEvent = userRole === 'admin' || userRole === 'moderator';
  const canModerate = userRole === 'admin' || userRole === 'moderator';

  const upcomingEvents = sampleEvents.filter(e => e.status === 'published');
  const completedEvents = pastEvents.filter(e => e.status === 'completed');
  const myEvents = sampleEvents.filter(e => e.userRSVPStatus === 'going' || e.userRSVPStatus === 'maybe');

  const displayedEvents = activeTab === 'upcoming' 
    ? upcomingEvents 
    : activeTab === 'past' 
    ? completedEvents 
    : myEvents;

  const handleRSVP = (eventId: string, status: 'going' | 'maybe' | 'not-going') => {
    console.log('RSVP:', eventId, status);
    // In real implementation, this would update the backend
    // and trigger sub-channel creation if this is the first RSVP
  };

  const handleEventClick = (event: CommunityEvent) => {
    setSelectedEvent(event);
    setShowEventDetail(true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-foreground">Community Events</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Events for <span className="text-purple-600">{communityName}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {canCreateEvent && (
              <>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={onAddExistingEvent}
                >
                  <Plus className="size-4 mr-2" />
                  Add Event
                </Button>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={onCreateEvent}
                >
                  <Sparkles className="size-4 mr-2" />
                  Create with AI
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 border-b border-border -mb-4">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'upcoming'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm">Upcoming</span>
            <Badge variant="secondary" className="ml-2 text-xs">{upcomingEvents.length}</Badge>
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'past'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm">Past</span>
          </button>
          <button
            onClick={() => setActiveTab('my-events')}
            className={`px-4 py-2 border-b-2 transition-colors ${
              activeTab === 'my-events'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-sm">My Events</span>
            <Badge variant="secondary" className="ml-2 text-xs">{myEvents.length}</Badge>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="px-6 py-3 border-b border-border bg-muted">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="size-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Events List */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-6xl space-y-4">
          {displayedEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="size-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">No events found</p>
              {canCreateEvent && activeTab === 'upcoming' && (
                <Button 
                  size="sm" 
                  className="mt-4"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="size-4 mr-2" />
                  Create Your First Event
                </Button>
              )}
            </div>
          ) : (
            displayedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                userRole={userRole}
                onRSVP={handleRSVP}
                onClick={() => handleEventClick(event)}
                canModerate={canModerate}
              />
            ))
          )}

          {/* AI Event Suggestions - Admin Only */}
          {userRole === 'admin' && activeTab === 'upcoming' && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="size-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-foreground mb-1">AI Event Suggestions</h3>
                  <p className="text-sm text-muted-foreground mb-3">Based on member interests and engagement patterns:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="size-1.5 rounded-full bg-primary" />
                      <span className="text-foreground">Code Review Session</span>
                      <span className="text-xs text-muted-foreground">(High interest from 23 developers)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="size-1.5 rounded-full bg-primary" />
                      <span className="text-foreground">Portfolio Review Workshop</span>
                      <span className="text-xs text-muted-foreground">(Requested by 15 designers)</span>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-primary hover:bg-primary/90">
                    <Wand2 className="size-3 mr-2" />
                    Generate Event
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Create Event Modal */}
      {showCreateModal && (
        <EventCreationModal
          communityId={communityId}
          communityName={communityName}
          userRole={userRole}
          onClose={() => setShowCreateModal(false)}
          onSave={(event) => {
            console.log('Event created:', event);
            setShowCreateModal(false);
          }}
        />
      )}

      {/* Event Detail Modal */}
      {showEventDetail && selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          userRole={userRole}
          onClose={() => {
            setShowEventDetail(false);
            setSelectedEvent(null);
          }}
          onRSVP={handleRSVP}
        />
      )}
    </div>
  );
}

// Event Card Component
interface EventCardProps {
  event: CommunityEvent;
  userRole: string;
  onRSVP: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;
  onClick: () => void;
  canModerate: boolean;
}

function EventCard({ event, userRole, onRSVP, onClick, canModerate }: EventCardProps) {
  const capacityPercentage = (event.currentAttendees / event.capacity) * 100;
  const isNearCapacity = capacityPercentage >= 80;
  const isFull = event.currentAttendees >= event.capacity;

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all cursor-pointer group">
      <div className="flex items-start gap-4">
        {/* Date Box */}
        <div 
          className="size-16 bg-purple-50 border border-purple-200 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
          onClick={onClick}
        >
          <span className="text-xs text-purple-600 uppercase">{event.startDate.split(' ')[0]}</span>
          <span className="text-xl text-purple-900">{event.startDate.split(' ')[1].replace(',', '')}</span>
        </div>

        {/* Event Details */}
        <div className="flex-1 min-w-0" onClick={onClick}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm text-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </h4>
                {event.status === 'live' && (
                  <Badge className="bg-red-500 text-white border-0 text-xs">
                    <span className="size-1.5 rounded-full bg-white mr-1 animate-pulse" />
                    Live
                  </Badge>
                )}
                {event.subChannelId && (
                  <Badge variant="secondary" className="text-xs">
                    <Hash className="size-3 mr-1" />
                    {event.subChannelName}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>{event.time} {event.timezone}</span>
                </div>
                <div className="flex items-center gap-1">
                  {event.eventType === 'virtual' ? (
                    <>
                      <Video className="size-3" />
                      <span>Virtual</span>
                    </>
                  ) : event.eventType === 'in-person' ? (
                    <>
                      <MapPin className="size-3" />
                      <span>In-Person</span>
                    </>
                  ) : (
                    <>
                      <Video className="size-3" />
                      <span>Hybrid</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <UsersIcon className="size-3" />
                  <span>{event.currentAttendees}/{event.capacity} attending</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

              {/* Capacity Warning */}
              {isNearCapacity && !isFull && (
                <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                  <Bell className="size-3" />
                  <span>Only {event.capacity - event.currentAttendees} spots left</span>
                </div>
              )}
              {isFull && event.waitlistEnabled && (
                <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                  <UsersIcon className="size-3" />
                  <span>Waitlist available</span>
                </div>
              )}
            </div>

            {/* Admin Actions */}
            {canModerate && (
              <Popover>
                <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <button className="text-muted-foreground hover:text-foreground ml-2">
                    <MoreVertical className="size-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-1" align="end">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md">
                    <Edit className="size-4" />
                    Edit Event
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md">
                    <Mail className="size-4" />
                    Send Reminder
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md">
                    <Eye className="size-4" />
                    View Attendees
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                    <Trash2 className="size-4" />
                    Cancel Event
                  </button>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
            {event.userRSVPStatus === 'going' ? (
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Check className="size-3 mr-2" />
                Going
              </Button>
            ) : event.userRSVPStatus === 'maybe' ? (
              <Button size="sm" variant="outline" className="border-purple-300 text-purple-600">
                Maybe
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => onRSVP(event.id, 'going')}
                disabled={isFull && !event.waitlistEnabled}
              >
                <Check className="size-3 mr-2" />
                {isFull ? 'Join Waitlist' : 'RSVP'}
              </Button>
            )}
            <Button size="sm" variant="outline">
              <Calendar className="size-3 mr-2" />
              Add to Calendar
            </Button>
            {event.discussionEnabled && (
              <Button size="sm" variant="outline">
                <MessageCircle className="size-3 mr-2" />
                Discussion
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Event Creation Modal Component
interface EventCreationModalProps {
  communityId: string;
  communityName: string;
  userRole: string;
  onClose: () => void;
  onSave: (event: Partial<CommunityEvent>) => void;
}

function EventCreationModal({ communityId, communityName, userRole, onClose, onSave }: EventCreationModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'virtual' as 'virtual' | 'in-person' | 'hybrid',
    category: 'workshop' as 'workshop' | 'webinar' | 'networking' | 'social' | 'qa',
    date: '',
    time: '',
    duration: 60,
    capacity: 50,
    meetingLink: '',
    location: '',
    autoCreateSubChannel: true,
    waitlistEnabled: false,
    recordingEnabled: true,
    discussionEnabled: true,
  });

  const [aiSuggestions, setAiSuggestions] = useState({
    bestTime: 'Wednesday 2:00 PM EST',
    predictedAttendance: '35-45 members',
    description: 'Join us for an interactive workshop where we\'ll dive deep into advanced techniques...',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const event: Partial<CommunityEvent> = {
      ...formData,
      type: 'community',
      status: 'published',
      currentAttendees: 0,
      createdAt: new Date().toISOString(),
    };
    onSave(event);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-card rounded-lg w-full max-w-2xl flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-foreground">Create Community Event</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Event for <span className="text-purple-600">{communityName}</span>
              </p>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="size-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`h-1 flex-1 rounded-full ${
                  s <= step ? 'bg-primary' : 'bg-border'
                }`} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>Details</span>
            <span className={`text-xs ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>Settings</span>
            <span className={`text-xs ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>Review</span>
          </div>
        </div>

        {/* Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 min-h-0">
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="size-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-purple-900">
                    <p className="font-medium mb-1">Members Only Event</p>
                    <p className="text-purple-700">This event is private and only visible to community members.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-foreground mb-1 block">Event Title</label>
                <Input
                  type="text"
                  placeholder="e.g., Figma Advanced Techniques"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-foreground mb-1 block">Event Type</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.eventType}
                    onChange={(e) => handleInputChange('eventType', e.target.value)}
                  >
                    <option value="virtual">Virtual</option>
                    <option value="in-person">In-Person</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option value="workshop">Workshop</option>
                    <option value="webinar">Webinar</option>
                    <option value="networking">Networking</option>
                    <option value="social">Social</option>
                    <option value="qa">Q&A</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-foreground mb-1 block">Description</label>
                <Textarea
                  placeholder="Describe your event..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
                {userRole === 'admin' && (
                  <Button size="sm" variant="outline" className="mt-2 text-xs">
                    <Wand2 className="size-3 mr-1" />
                    Generate with AI
                  </Button>
                )}
              </div>

              {/* AI Suggestions */}
              {userRole === 'admin' && formData.title && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Sparkles className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-blue-900 font-medium mb-1">AI Suggestions</p>
                      <div className="text-xs text-blue-700 space-y-1">
                        <p>• Best time: {aiSuggestions.bestTime}</p>
                        <p>• Expected attendance: {aiSuggestions.predictedAttendance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-foreground mb-1 block">Date</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">Time</label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-foreground mb-1 block">Duration (min)</label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                  />
                </div>
              </div>

              {formData.eventType === 'virtual' || formData.eventType === 'hybrid' ? (
                <div>
                  <label className="text-sm text-foreground mb-1 block">Meeting Link</label>
                  <Input
                    type="url"
                    placeholder="https://zoom.us/j/..."
                    value={formData.meetingLink}
                    onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                  />
                </div>
              ) : null}

              {formData.eventType === 'in-person' || formData.eventType === 'hybrid' ? (
                <div>
                  <label className="text-sm text-foreground mb-1 block">Location</label>
                  <Input
                    type="text"
                    placeholder="123 Main St, New York, NY"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
              ) : null}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-foreground mb-1 block">Capacity</label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground mt-1">Maximum number of attendees</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.autoCreateSubChannel}
                    onChange={(e) => handleInputChange('autoCreateSubChannel', e.target.checked)}
                    className="size-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="text-sm text-foreground">Auto-create sub-channel</span>
                    <p className="text-xs text-muted-foreground">Create a dedicated channel for event attendees</p>
                  </div>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.waitlistEnabled}
                    onChange={(e) => handleInputChange('waitlistEnabled', e.target.checked)}
                    className="size-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="text-sm text-foreground">Enable waitlist</span>
                    <p className="text-xs text-muted-foreground">Allow members to join waitlist when full</p>
                  </div>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.recordingEnabled}
                    onChange={(e) => handleInputChange('recordingEnabled', e.target.checked)}
                    className="size-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="text-sm text-foreground">Record event</span>
                    <p className="text-xs text-muted-foreground">Recording will be shared with attendees</p>
                  </div>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.discussionEnabled}
                    onChange={(e) => handleInputChange('discussionEnabled', e.target.checked)}
                    className="size-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="text-sm text-foreground">Enable discussion</span>
                    <p className="text-xs text-muted-foreground">Allow Q&A and comments</p>
                  </div>
                </label>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-4">
                <h4 className="text-sm text-purple-900 font-medium mb-2">Promotion</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="size-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-purple-700">Auto-post to #general</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="size-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-purple-700">Send notification to all members</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="size-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-xs text-purple-700">Add to community calendar</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Check className="size-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-sm text-green-900 font-medium">Ready to publish!</h3>
                <p className="text-xs text-green-700 mt-1">Review your event details below</p>
              </div>

              <div className="border border-border rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="text-sm text-foreground font-medium">{formData.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{formData.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Date & Time</p>
                    <p className="text-sm text-foreground">{formData.date} at {formData.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm text-foreground">{formData.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm text-foreground capitalize">{formData.eventType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="text-sm text-foreground">{formData.capacity} attendees</p>
                  </div>
                </div>

                {formData.autoCreateSubChannel && (
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center gap-2 text-xs text-purple-600">
                      <Hash className="size-3" />
                      <span>Sub-channel will be created automatically</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between flex-shrink-0 bg-card">
          <div>
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {step < 3 ? (
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !formData.title}
              >
                Next
                <ChevronRight className="size-4 ml-1" />
              </Button>
            ) : (
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={handleSave}
              >
                <Check className="size-4 mr-2" />
                Publish Event
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Event Detail Modal Component
interface EventDetailModalProps {
  event: CommunityEvent;
  userRole: string;
  onClose: () => void;
  onRSVP: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;
}

function EventDetailModal({ event, userRole, onClose, onRSVP }: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'attendees' | 'discussion'>('details');

  // Sample attendees
  const attendees = [
    { id: '1', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', status: 'going' },
    { id: '2', name: 'Marcus Webb', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', status: 'going' },
    { id: '3', name: 'Elena Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', status: 'going' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-card rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Banner */}
        <div className="relative h-32 bg-gradient-to-r from-purple-600 to-blue-600">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 size-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Header Info */}
        <div className="px-6 -mt-8 pb-4 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="size-16 bg-white border-2 border-white rounded-lg shadow-lg flex flex-col items-center justify-center">
              <span className="text-xs text-purple-600 uppercase">{event.startDate.split(' ')[0]}</span>
              <span className="text-xl text-purple-900 font-bold">{event.startDate.split(' ')[1].replace(',', '')}</span>
            </div>
            
            <div className="flex-1 mt-2">
              <h2 className="text-xl text-foreground mb-1">{event.title}</h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <img src={event.hostAvatar} alt={event.hostName} className="size-5 rounded-full" />
                  <span>Hosted by {event.hostName}</span>
                </div>
                <span>•</span>
                <span>{event.currentAttendees} attending</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Button 
                size="sm"
                className={event.userRSVPStatus === 'going' ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}
                onClick={() => onRSVP(event.id, 'going')}
              >
                <Check className="size-4 mr-2" />
                {event.userRSVPStatus === 'going' ? 'Going' : 'RSVP'}
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="size-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-sm">Details</span>
            </button>
            <button
              onClick={() => setActiveTab('attendees')}
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'attendees'
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="text-sm">Attendees</span>
              <Badge variant="secondary" className="ml-2 text-xs">{event.currentAttendees}</Badge>
            </button>
            {event.discussionEnabled && (
              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-4 py-2 border-b-2 transition-colors ${
                  activeTab === 'discussion'
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-sm">Discussion</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          {activeTab === 'details' && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <h3 className="text-sm text-foreground font-medium mb-2">About this event</h3>
                <p className="text-sm text-foreground leading-relaxed">{event.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="size-4 text-muted-foreground" />
                      <span>{event.startDate} at {event.time} {event.timezone}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Clock className="size-4 text-muted-foreground" />
                      <span>{event.duration} minutes</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Format</p>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      {event.eventType === 'virtual' ? <Video className="size-4 text-muted-foreground" /> : <MapPin className="size-4 text-muted-foreground" />}
                      <span className="capitalize">{event.eventType}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <UsersIcon className="size-4 text-muted-foreground" />
                      <span>{event.currentAttendees}/{event.capacity} registered</span>
                    </div>
                  </div>
                </div>
              </div>

              {event.meetingLink && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-xs text-blue-900 font-medium mb-2">Meeting Link</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs text-blue-700 bg-white px-3 py-2 rounded border border-blue-200 truncate">
                      {event.meetingLink}
                    </code>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="size-3 mr-1" />
                      Open
                    </Button>
                  </div>
                  <p className="text-xs text-blue-700 mt-2">Link will be accessible 1 hour before the event</p>
                </div>
              )}

              {event.subChannelId && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="size-4 text-purple-600" />
                    <p className="text-xs text-purple-900 font-medium">Event Sub-Channel</p>
                  </div>
                  <p className="text-sm text-purple-700 mb-3">
                    Join #{event.subChannelName} to connect with other attendees and access exclusive event materials.
                  </p>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <MessageCircle className="size-3 mr-2" />
                    Go to Channel
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'attendees' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-foreground font-medium mb-3">Going ({attendees.length})</h3>
                <div className="grid grid-cols-2 gap-3">
                  {attendees.map((attendee) => (
                    <div key={attendee.id} className="flex items-center gap-3 p-2 border border-border rounded-lg">
                      <img src={attendee.avatar} alt={attendee.name} className="size-10 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{attendee.name}</p>
                        <p className="text-xs text-muted-foreground">Member</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'discussion' && event.discussionEnabled && (
            <div className="space-y-4">
              <div className="bg-muted border border-border rounded-lg p-4 text-center">
                <MessageCircle className="size-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Discussion will open closer to the event date</p>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
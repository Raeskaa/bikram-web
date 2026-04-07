// Phase 2: Enhanced routing for all lifecycle stages and roles
// Ref: MOCK_EVENTS_MASTER_PLAN.md §1.1 The Rendering Pipeline

import { useAuth } from '../contexts/AuthContext';
import {
  mockEvents,
  isEventCreator,
  isEventSpeaker,
  isEventModerator,
  getEventRole,
  getEventLifecycleStage,
  isEventCancelled,
  type Event,
  type EventLifecycleStage,
} from '../data/mockEventData';
import { EventBuilderViewV2 } from './EventBuilderViewV2';
import { PublicEventLanding } from './PublicEventLanding';
import { PostEventView } from './PostEventView';
import { AppLayout } from './AppLayout';
import { Conversation, Message, AppVersion } from '../types';

interface UnifiedEventPageProps {
  eventId: string;
  onBack: () => void;
  onJoinEvent?: (eventTitle: string, eventCode: string) => void;
  onCreateCommunity?: () => void;
  onOpenCalendar?: (date?: string) => void;
}

export function UnifiedEventPage({ 
  eventId, 
  onBack, 
  onJoinEvent,
  onCreateCommunity,
  onOpenCalendar
}: UnifiedEventPageProps) {
  const { currentUser } = useAuth();
  
  // Find the event
  const event = mockEvents.find(e => e.id === eventId);
  
  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Event not found</h2>
          <p className="text-sm text-muted-foreground mb-4">The event you're looking for doesn't exist.</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const lifecycle = getEventLifecycleStage(event);
  const userEmail = currentUser?.email || '';
  const role = currentUser ? getEventRole(event, userEmail) : 'learner';
  const isAnonymous = !currentUser;

  // Helper: wrap content in AppLayout
  const withLayout = (content: React.ReactNode, isGuestMode = false) => (
    <AppLayout 
      currentPage="events" 
      showBanner={true} 
      onNewClick={() => {}}
      onNavClick={() => {}}
      copilotContext="event"
      currentUser={currentUser}
      onSignOut={() => {}}
      onSignIn={() => {}}
      isGuest={isGuestMode || !currentUser}
    >
      {content}
    </AppLayout>
  );

  // Helper: build standalone event object for PublicEventLanding
  const buildStandaloneEvent = () => ({
    id: event.id,
    title: event.title,
    description: event.description,
    coverImage: '/placeholder-event-cover.jpg',
    hostName: event.creatorName,
    hostAvatar: '/placeholder-avatar.jpg',
    hostBio: 'Event organizer and community leader',
    startDate: event.date,
    time: event.time,
    timezone: 'EST',
    duration: 120,
    eventType: event.location,
    category: ['Technology', 'Workshop'],
    registrationCount: event.attendeeCount,
    capacity: event.capacity || 100,
    communityName: event.communityName,
    communityLogo: event.linkedToCommunity ? '/placeholder-community-logo.jpg' : undefined,
    tags: event.isPublic ? ['Public'] : ['Private'],
  });

  // Helper: build conversation for EventBuilderViewV2
  const buildConversation = () => ({
    id: `event-${eventId}`,
    title: event.title,
    messages: [] as Message[],
    createdAt: event.createdAt,
    updatedAt: event.createdAt,
  });

  // ────────────────────────────────────────────────
  //  ROUTING LOGIC per MOCK_EVENTS_MASTER_PLAN.md §1.1
  // ────────────────────────────────────────────────

  // 1. CREATOR / ADMIN VIEW
  //    Handles: skeleton, building, ready, published, live, ended, cancelled
  if (role === 'creator' || role === 'moderator') {
    return withLayout(
      <EventBuilderViewV2
        conversation={buildConversation()}
        onUpdateMessages={() => {}}
        eventData={event}
        onBack={onBack}
        onJoinEvent={onJoinEvent}
        onCreateCommunity={onCreateCommunity}
        onViewPublicPage={() => {
          console.log('View public page');
        }}
      />
    );
  }

  // 2. SPEAKER VIEW (not creator, but is a speaker — gets restricted admin tabs)
  //    Plan ref: Event L — DevOps Pipeline Workshop
  if (role === 'speaker') {
    return withLayout(
      <EventBuilderViewV2
        conversation={buildConversation()}
        onUpdateMessages={() => {}}
        eventData={event}
        onBack={onBack}
        userMode="creator"  // renders admin shell but EventBuilderViewV2 will detect speaker role
        onJoinEvent={onJoinEvent}
        onCreateCommunity={onCreateCommunity}
        onViewPublicPage={() => {}}
      />
    );
  }

  // 3. CANCELLED EVENT — any non-admin sees cancellation notice
  //    Plan ref: Event K — Growth Hacking Bootcamp
  if (isEventCancelled(event)) {
    return withLayout(
      <PublicEventLanding
        event={buildStandaloneEvent()}
        onBack={onBack}
        onEnterLiveEvent={() => {}}
        onJoinLeapSpace={() => {}}
        onOpenCalendar={onOpenCalendar}
      />,
      isAnonymous
    );
  }

  // 4. PAST EVENT (ended) — learner sees post-event view
  //    Plan ref: Event J (materials pending) + Event 5 (materials available)
  if (event.status === 'past' || lifecycle === 'ended') {
    return withLayout(
      <PostEventView event={event} onBack={onBack} />,
      isAnonymous
    );
  }

  // 5. LIVE EVENT — learner sees "Join Now" state
  //    Plan ref: Event I — React Summit 2026
  //    (PublicEventLanding will detect live state from event data)

  // 6. ANONYMOUS / LOGGED-OUT — sees auth-gated public page
  //    Plan ref: Event M — Community Town Hall

  // 7. DEFAULT LEARNER VIEW — standard public landing
  //    Registration status (none/confirmed/waitlist/applied/rejected) handled inside PublicEventLanding
  return withLayout(
    <PublicEventLanding
      event={buildStandaloneEvent()}
      onBack={onBack}
      onEnterLiveEvent={() => {
        if (onJoinEvent) {
          onJoinEvent(event.title, `EVENT-${event.id.toUpperCase()}`);
        }
      }}
      onJoinLeapSpace={() => {
        console.log('Join LeapSpace community');
      }}
      onOpenCalendar={onOpenCalendar}
    />,
    isAnonymous
  );
}
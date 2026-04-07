// Phase 5: Learner Registration Status Banners
// Ref: MOCK_EVENTS_MASTER_PLAN.md §Events F, G, H, I, J, K, M

import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Clock, CheckCircle, XCircle, AlertCircle, Users,
  Play, Mail, Bell, ArrowRight, LogIn, CalendarPlus, Ticket, Download, Video
} from 'lucide-react';
import {
  mockEvents,
  getUserRegistration,
  getUserRegistrationStatus,
  getUserWaitlistEntry,
  getEventWaitlistCount,
  getEventLifecycleStage,
  isEventCancelled,
  isEventSoldOut,
  type Event,
} from '../data/mockEventData';

interface EventStatusBannerProps {
  eventId: string;
  userEmail: string | null; // null = anonymous
  onSignIn?: () => void;
  onJoinLive?: () => void;
}

export function EventStatusBanner({ eventId, userEmail, onSignIn, onJoinLive }: EventStatusBannerProps) {
  const event = mockEvents.find(e => e.id === eventId);
  if (!event) return null;

  const lifecycle = getEventLifecycleStage(event);
  const isCancelled = isEventCancelled(event);
  const isSoldOut = isEventSoldOut(event);
  const isLive = lifecycle === 'live';
  const isEnded = lifecycle === 'ended' || event.status === 'past';
  const isAnonymous = !userEmail;

  // Anonymous user — auth-gate CTA (Event M)
  if (isAnonymous) {
    return (
      <div className="bg-muted border border-border rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <LogIn className="size-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">Sign up to register</p>
            <p className="text-sm text-muted-foreground mb-3">
              Registration requires a Leapspace account. Takes less than 30 seconds.
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={onSignIn}>
                Sign Up to Register
              </Button>
              <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg" onClick={onSignIn}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const registrationStatus = getUserRegistrationStatus(eventId, userEmail);
  const registration = getUserRegistration(eventId, userEmail);
  const waitlistEntry = getUserWaitlistEntry(eventId, userEmail);
  const waitlistCount = getEventWaitlistCount(eventId);

  // Cancelled event (Event K)
  if (isCancelled) {
    return (
      <div className="bg-muted border border-border rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <XCircle className="size-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">This event has been cancelled</p>
            {event.cancelledAt && (
              <p className="text-xs text-muted-foreground mb-2">
                Cancelled on {new Date(event.cancelledAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
            {event.cancellationReason && (
              <p className="text-sm text-muted-foreground mb-3 bg-card p-3 rounded-lg border border-border">
                "{event.cancellationReason}"
              </p>
            )}
            {registration && registration.paymentAmount && (
              <div className="bg-card p-3 rounded-lg border border-border mb-3">
                <p className="text-xs text-muted-foreground font-medium mb-1">Your refund</p>
                <p className="text-sm text-foreground">
                  Ticket: {event.tickets?.find(t => t.id === registration.ticketTierId)?.name || 'General'} (${registration.paymentAmount.toFixed(2)})
                </p>
                <p className="text-sm text-muted-foreground">
                  Status: <span className="font-medium text-green-700">
                    {registration.paymentStatus === 'refunded' ? 'Refunded' : 'Processing'}
                  </span>
                </p>
              </div>
            )}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg text-xs">
                Browse Similar Events
              </Button>
              <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg text-xs">
                Contact Organizer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Live event — registered user (Event I)
  if (isLive && registrationStatus === 'registered') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <span className="relative flex size-3 mt-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-3 bg-red-500" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">This event is live</p>
            <p className="text-sm text-muted-foreground mb-1">
              {event.title} started {event.liveStartedAt ? 'at ' + event.time : 'recently'}.
              {event.liveAttendeeCount && ` ${event.liveAttendeeCount} people are watching right now.`}
            </p>
            {event.schedule && event.schedule.length > 0 && (
              <p className="text-xs text-muted-foreground mb-3">
                Current session: "{event.schedule[1]?.title || event.schedule[0]?.title}"
              </p>
            )}
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-none" onClick={onJoinLive}>
              <Play className="size-3.5 mr-2" />
              Join Now — Open Leapcast
            </Button>
            <p className="text-xs text-muted-foreground/60 mt-2">Your camera and mic will be off by default.</p>
          </div>
        </div>
      </div>
    );
  }

  // Live event — not registered
  if (isLive && !registrationStatus) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <span className="relative flex size-3 mt-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-3 bg-red-500" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">This event is live now</p>
            <p className="text-sm text-muted-foreground mb-3">
              {event.liveAttendeeCount && `${event.liveAttendeeCount} people are watching. `}
              {event.isPaid ? 'Register to join.' : 'Join for free.'}
            </p>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={onJoinLive}>
              <Play className="size-3.5 mr-2" />
              Join Live
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Application pending (Event F — existing #6)
  if (registrationStatus === 'applied' && registration) {
    return (
      <div className="bg-muted border border-border rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <Clock className="size-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">Application submitted</p>
            <p className="text-sm text-muted-foreground mb-3">
              Your application is under review. Applied on {new Date(registration.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.
            </p>

            {/* Status timeline */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-3.5 text-green-600 flex-shrink-0" />
                <span className="text-xs text-foreground">Application submitted — {new Date(registration.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3.5 rounded-full border-2 border-muted-foreground/40 flex-shrink-0 flex items-center justify-center">
                  <div className="size-1.5 rounded-full bg-muted-foreground/40" />
                </div>
                <span className="text-xs text-foreground font-medium">Under review — Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3.5 rounded-full border-2 border-border flex-shrink-0" />
                <span className="text-xs text-muted-foreground/60">Decision — Typically within 3-5 days</span>
              </div>
            </div>

            {/* What was submitted */}
            {Object.keys(registration.formData).length > 2 && (
              <div className="bg-card p-3 rounded-lg border border-border mb-3">
                <p className="text-xs text-muted-foreground font-medium mb-1.5">What you submitted</p>
                {Object.entries(registration.formData)
                  .filter(([key]) => key !== 'name' && key !== 'email')
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <p key={key} className="text-xs text-muted-foreground">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>: {value}
                    </p>
                  ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-border text-red-600 rounded-lg text-xs">
                Withdraw Application
              </Button>
              <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg text-xs">
                Ask the Organizer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rejected (Event G)
  if (registrationStatus === 'rejected' && registration) {
    return (
      <div className="bg-muted border border-border rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <XCircle className="size-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">Application not accepted</p>
            <p className="text-sm text-muted-foreground mb-2">
              Unfortunately, your application was not accepted for this event.
            </p>

            {registration.rejectionReason && (
              <div className="bg-card p-3 rounded-lg border border-border mb-3">
                <p className="text-xs text-muted-foreground font-medium mb-1">Message from the organizer</p>
                <p className="text-sm text-foreground italic">"{registration.rejectionReason}"</p>
              </div>
            )}

            {/* Status timeline */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-3.5 text-muted-foreground/60 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Applied — {new Date(registration.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-3.5 text-muted-foreground/60 flex-shrink-0" />
                <span className="text-xs text-muted-foreground">Reviewed — {registration.rejectedAt ? new Date(registration.rejectedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Recently'}</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="size-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-foreground font-medium">Not accepted</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg text-xs">
                Browse Similar Events
              </Button>
              <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg text-xs">
                Contact Organizer
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Waitlisted (Event H)
  if (registrationStatus === 'waitlist' && waitlistEntry) {
    return (
      <div className="bg-muted border border-border rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <Users className="size-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">You're on the waitlist</p>
            <p className="text-sm text-muted-foreground mb-3">
              Position #{waitlistEntry.priority} of {waitlistCount} on the waitlist.
              Joined {new Date(waitlistEntry.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.
            </p>

            {/* Visual position indicator */}
            <div className="flex items-center gap-1.5 mb-4">
              {Array.from({ length: Math.min(waitlistCount, 7) }, (_, i) => (
                <div
                  key={i}
                  className={`h-6 w-8 rounded flex items-center justify-center text-[10px] font-medium ${
                    i + 1 === waitlistEntry.priority
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  #{i + 1}
                </div>
              ))}
              {waitlistCount > 7 && <span className="text-xs text-muted-foreground/60 ml-1">...</span>}
            </div>

            <div className="bg-card p-3 rounded-lg border border-border mb-3">
              <p className="text-xs text-muted-foreground font-medium mb-1.5">When a spot opens</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-center gap-1.5"><Mail className="size-3 flex-shrink-0" /> You'll get an email notification</li>
                <li className="flex items-center gap-1.5"><Clock className="size-3 flex-shrink-0" /> You'll have 24 hours to confirm{event.isPaid ? ` and pay ($${event.price})` : ''}</li>
                <li className="flex items-center gap-1.5"><ArrowRight className="size-3 flex-shrink-0" /> If you don't confirm, the spot goes to the next person</li>
              </ul>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <p className="text-xs text-muted-foreground">Notification preference:</p>
              <label className="flex items-center gap-1 text-xs text-foreground">
                <input type="checkbox" defaultChecked className="rounded border-border" /> Email
              </label>
            </div>

            <Button size="sm" variant="outline" className="border-red-200 text-red-600 rounded-lg text-xs">
              Leave Waitlist
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Sold out — not on waitlist yet
  if (isSoldOut && !registrationStatus) {
    return (
      <div className="bg-muted border border-border rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">Sold out</p>
            <p className="text-sm text-muted-foreground mb-2">
              This event has reached capacity ({event.attendeeCount}/{event.capacity}).
              {event.waitlistEnabled ? ` Join the waitlist to get notified if a spot opens up.` : ''}
            </p>
            {event.waitlistEnabled && waitlistCount > 0 && (
              <p className="text-xs text-muted-foreground/60 mb-3">Currently {waitlistCount} people on the waitlist.</p>
            )}
            {event.waitlistEnabled ? (
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none text-xs">
                Join Waitlist{event.isPaid ? ` — $${event.price} charged only if admitted` : ''}
              </Button>
            ) : (
              <p className="text-xs text-muted-foreground/60">No waitlist available for this event.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Confirmed registration (already attending)
  if (registrationStatus === 'registered') {
    // Compute countdown
    const eventDateStr = event.date || event.startDate;
    let countdownText = '';
    if (eventDateStr) {
      const eventDate = new Date(eventDateStr + 'T' + (event.time || '00:00'));
      const now = new Date();
      const diffMs = eventDate.getTime() - now.getTime();
      if (diffMs > 0) {
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (diffDays > 0) {
          countdownText = `Event starts in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
        } else if (diffHours > 0) {
          countdownText = `Event starts in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
        } else {
          countdownText = 'Event starts soon';
        }
      }
    }

    const ticketName = registration?.ticketTierId
      ? event.tickets?.find(t => t.id === registration.ticketTierId)?.name || 'General Admission'
      : 'General Admission';

    return (
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="size-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-primary mb-1">You're registered!</p>
            <p className="text-sm text-muted-foreground mb-1">
              {registration
                ? `Registered on ${new Date(registration.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                : 'Registration confirmed'}
              {' · '}
              <span className="font-medium text-foreground">{ticketName}</span>
              {registration?.paymentAmount ? ` ($${registration.paymentAmount.toFixed(2)})` : ' (Free)'}
            </p>
            {countdownText && (
              <p className="text-xs text-primary font-medium mb-3 flex items-center gap-1.5">
                <Clock className="size-3" />
                {countdownText}
              </p>
            )}

            <div className="flex gap-2 flex-wrap">
              <Button size="sm" variant="outline" className="border-primary/20 text-primary rounded-lg text-xs">
                <CalendarPlus className="size-3 mr-1.5" />
                Add to Calendar
              </Button>
              <Button size="sm" variant="outline" className="border-primary/20 text-primary rounded-lg text-xs">
                <Ticket className="size-3 mr-1.5" />
                View Ticket
              </Button>
              <Button size="sm" variant="outline" className="border-red-200 text-red-600 rounded-lg text-xs">
                Cancel Registration
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Ended event — learner view (Event J learner side)
  if (isEnded) {
    const wasRegistered = registrationStatus === 'registered' || registration;
    return (
      <div className="bg-muted border border-border rounded-xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="size-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">This event has ended</p>
            <p className="text-sm text-muted-foreground mb-3">
              {event.title} took place on {event.date ? new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'a past date'}.
              {wasRegistered ? ' Thank you for attending!' : ''}
            </p>

            {wasRegistered && (
              <div className="flex gap-2 flex-wrap">
                {event.hasRecording !== false && (
                  <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg text-xs">
                    <Video className="size-3 mr-1.5" />
                    Watch Recording
                  </Button>
                )}
                <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg text-xs">
                  <Download className="size-3 mr-1.5" />
                  Download Resources
                </Button>
                <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg text-xs">
                  <Mail className="size-3 mr-1.5" />
                  Leave Feedback
                </Button>
              </div>
            )}

            {!wasRegistered && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg text-xs">
                  Browse Similar Events
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default: no special status (show nothing — standard registration CTA is in the main component)
  return null;
}
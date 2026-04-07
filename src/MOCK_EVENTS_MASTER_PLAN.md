# Mock Events Master Plan: Every View, Every State, Every Flow

> **Goal**: Create 13 purpose-built mock events that, combined with the existing 11, give us a clickable prototype covering every possible event lifecycle stage, user role, access type, and edge case. Each mock event is a "stage" designed to render a specific view state when opened.

> **References**: PRODUCT_CLARITY.md, EVENT_USER_FLOWS.md, data/mockEventData.ts, EventShell.tsx, EventBuilderViewV2.tsx, PublicEventLandingV3Tabbed.tsx, PostEventView.tsx, UnifiedEventPage.tsx

---

## Part 1: Architecture — How It All Connects

### 1.1 The Rendering Pipeline

```
EventsListView (card grid/list)
  └─ click card ─> UnifiedEventPage
       ├─ isCreator? ──────> EventBuilderViewV2 (admin shell)
       │     └─ event.lifecycleStage determines:
       │           skeleton | building | ready | published | live | ended | archived | cancelled
       │
       ├─ isLearner + past? ─> PostEventView (post-event shell)
       │
       ├─ isLearner + live? ─> PublicEventLanding with "Join Now" state
       │
       ├─ isSpeaker? ────────> EventBuilderViewV2 with restricted tabs (conditional)
       │
       ├─ isAnonymous? ──────> PublicEventLanding with auth-gate CTAs
       │
       └─ default learner ──> PublicEventLanding (standard learner view)
             └─ registration status determines CTA + banner:
                   none | confirmed | waitlist | applied | rejected | cancelled-by-user
```

### 1.2 Data Model Changes Needed

The `Event` interface needs these additions to support all 13 views:

```typescript
// Add to Event interface
lifecycleStage?: 'skeleton' | 'building' | 'ready' | 'published' | 'live' | 'ended' | 'archived' | 'cancelled';

// Completion tracking (for skeleton/building stages)
completionChecklist?: {
  hasTitle: boolean;
  hasDescription: boolean;
  hasDateTime: boolean;
  hasCoverImage: boolean;
  hasAgenda: boolean;
  hasTickets: boolean;       // only if paid
  hasSpeakers: boolean;
  hasLocation: boolean;      // only if in-person/hybrid
  hasRegistrationForm: boolean;
};

// Cancellation
cancelledAt?: string;
cancellationReason?: string;
refundPolicy?: 'full' | 'partial' | 'none';

// Live event
liveStartedAt?: string;
liveAttendeeCount?: number;

// Post-event (extend existing)
postEventTodos?: {
  uploadRecording: boolean;
  sendFollowUp: boolean;
  issueCertificates: boolean;
  collectFeedback: boolean;
  publishResources: boolean;
};
feedbackSurveyUrl?: string;
attendanceReport?: {
  registered: number;
  attended: number;
  peakConcurrent: number;
  avgDuration: number; // minutes
  engagementScore: number; // 0-100
};
```

The `Registration` interface needs:

```typescript
// Add 'rejected' and 'cancelled-by-user' to status
status: 'confirmed' | 'waitlist' | 'cancelled' | 'applied' | 'rejected' | 'cancelled-by-user';

// For rejected applications
rejectionReason?: string;
rejectedAt?: string;

// For confirmed attendees of paid events
ticketTierId?: string;
paymentAmount?: number;
paymentStatus?: 'paid' | 'refunded' | 'partial-refund';
```

### 1.3 Key Principle: Same Components, Conditional Rendering

We do NOT build 13 separate detail view components. Instead:

- **EventBuilderViewV2** renders differently based on `event.lifecycleStage` (skeleton shows empty states + checklist, building shows partial content + warnings, etc.)
- **PublicEventLandingV3Tabbed** renders differently based on `getUserRegistrationStatus()` (none, confirmed, waitlist, applied, rejected)
- **PostEventView** renders differently based on whether materials exist yet
- **EventShell** may gain a new role: `'speaker'` (subset of admin tabs)
- **UnifiedEventPage** gains logic for anonymous users, speakers, live events, cancelled events

---

## Part 2: The 13 Mock Events — Detailed Specifications

---

### EVENT A: "Intro to Product Thinking" — SKELETON DRAFT (Creator View)

**Purpose**: Show the very first moment after an event is created. The creator (Mahesh) has only filled in title, description, and date/time. Everything else is empty. This is the "onboarding" experience for event creation.

**Mock Data**:
```
id: 'A1'
title: 'Intro to Product Thinking'
description: 'A workshop exploring product thinking fundamentals.'
date: '2026-03-15'
time: '2:00 PM EST'
status: 'draft'
lifecycleStage: 'skeleton'
creatorEmail: 'mahesh@email.com'
visibility: 'public'
accessType: 'open'
isPaid: false
location: 'virtual'
capacity: undefined         // not set yet
speakers: []                // none added
tickets: []                 // none configured
attendeeCount: 0
waitlistEnabled: false
isStandalone: true
completionChecklist: {
  hasTitle: true,
  hasDescription: true,
  hasDateTime: true,
  hasCoverImage: false,
  hasAgenda: false,
  hasTickets: false,
  hasSpeakers: false,
  hasLocation: false,
  hasRegistrationForm: false,
}
```

**Card in EventsListView** (Mahesh's view):
- Grey placeholder image with "Draft" badge overlay (top-left)
- Title, date, "Virtual" pill
- Capacity bar: hidden (no capacity set)
- CTA: "Continue Building"
- Subtle "3 of 9 setup steps complete" indicator

**Detail View — EventBuilderViewV2 (Skeleton State)**:

The LEFT SIDEBAR (EventShell) shows the same admin tabs as always, but with visual indicators:
- Overview: green dot (has content)
- Schedule: grey dot (empty)
- Attendees: grey dot (0)
- Tickets: grey dot (not configured)
- Discussion: grey dot (empty)
- Analytics: grey dot (no data)
- AI & Automations: unchanged
- Settings: grey dot

**Overview Tab** (the main one the creator lands on):

```
┌─────────────────────────────────────────────────────────────────┐
│  SETUP CHECKLIST                                    3/9 complete│
│  ────────────────────────────────────────────────────────────── │
│  [x] Event title                                                │
│  [x] Description                                                │
│  [x] Date & time                                                │
│  [ ] Cover image ──────────── [Upload Image]                    │
│  [ ] Agenda / schedule ────── [Create Agenda]                   │
│  [ ] Speakers ─────────────── [Add Speakers]                    │
│  [ ] Tickets / pricing ────── [Set Up Tickets]                  │
│  [ ] Registration form ────── [Build Form]                      │
│  [ ] Location details ─────── [Add Location]                    │
│                                                                  │
│  Progress bar: ████░░░░░░░░░░░░░░░ 33%                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────┐           │
│  │  AI SUGGESTIONS                                   │           │
│  │  Based on your event type, here are next steps:   │           │
│  │                                                    │           │
│  │  "Your event has no agenda yet. Most successful   │           │
│  │   workshops have 3-5 sessions. Want me to         │           │
│  │   generate a draft agenda?"         [Generate]     │           │
│  │                                                    │           │
│  │  "Add at least one speaker to boost             │           │
│  │   registrations by ~40%."           [Add Speaker]  │           │
│  │                                                    │           │
│  │  "Set a capacity limit to create urgency.         │           │
│  │   Recommended: 50-100 for workshops."             │           │
│  │                                          [Set Cap] │           │
│  └──────────────────────────────────────────────────┘           │
│                                                                  │
│  ┌─ Event Preview Card ────────────────────────────┐            │
│  │  (Shows how the card will look in the explore    │            │
│  │   page — currently sparse with placeholder image)│            │
│  └─────────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

**Schedule Tab** (empty state):
```
┌──────────────────────────────────────────────────┐
│  No sessions added yet                            │
│                                                    │
│  Your event doesn't have an agenda.               │
│  A well-structured agenda increases                │
│  attendance rates by 35%.                          │
│                                                    │
│  [+ Add Session Manually]  [Generate with AI]      │
└──────────────────────────────────────────────────┘
```

**Attendees Tab** (empty state):
```
┌──────────────────────────────────────────────────┐
│  No registrations yet                             │
│                                                    │
│  Your event is still in draft.                    │
│  Publish it to start accepting registrations.     │
│                                                    │
│  Checklist before publishing:                     │
│  [ ] Set capacity                                 │
│  [ ] Configure registration form                  │
│  [ ] Add event details                            │
│                                                    │
│  [Preview Public Page]  [Publish Event]            │
└──────────────────────────────────────────────────┘
```

**Tickets Tab** (empty — free event, but still needs configuration):
```
┌──────────────────────────────────────────────────┐
│  Pricing not configured                           │
│                                                    │
│  Currently set to: Free Event                     │
│  Want to monetize? Set up paid tickets.           │
│                                                    │
│  [Keep Free]  [Add Paid Tickets]                   │
└──────────────────────────────────────────────────┘
```

**Analytics Tab** (empty state):
```
┌──────────────────────────────────────────────────┐
│  No analytics data yet                            │
│                                                    │
│  Analytics will appear once your event is         │
│  published and people start viewing it.           │
│                                                    │
│  Expected metrics:                                │
│  - Page views & conversion rate                   │
│  - Registration timeline                          │
│  - Source tracking                                │
│  - Demographic breakdown                          │
└──────────────────────────────────────────────────┘
```

**Header Actions**:
- "Publish" button: DISABLED with tooltip "Complete required steps first" (greyed out)
- "Preview" button: active (shows sparse preview)
- "Share" button: hidden (can't share a draft)

---

### EVENT B: "Advanced TypeScript Patterns" — MID-BUILD DRAFT (Creator View)

**Purpose**: Show a partially built event. Creator has filled in about 60% of fields. Some sections have content, others show warnings/gaps. This is the "in-progress" builder experience.

**Mock Data**:
```
id: 'B1'
title: 'Advanced TypeScript Patterns'
description: 'Deep dive into advanced TypeScript patterns including template literal types, conditional types, mapped types, and real-world utility type construction.'
date: '2026-04-10'
time: '3:00 PM EST'
status: 'draft'
lifecycleStage: 'building'
creatorEmail: 'mahesh@email.com'
visibility: 'public'
accessType: 'paid'
isPaid: true
price: 39
currency: 'USD'
tickets: [
  { id: 'tkt-b1', name: 'General', price: 39, currency: 'USD', quantity: 80, description: 'Full workshop access' }
]
location: 'virtual'
locationDetails: ''           // not set yet — WARNING
capacity: 80
speakers: [
  { id: 'sp-b1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' }
]
// Missing speaker bios, missing co-speakers
attendeeCount: 0
waitlistEnabled: false        // hasn't decided yet
isStandalone: true
completionChecklist: {
  hasTitle: true,
  hasDescription: true,
  hasDateTime: true,
  hasCoverImage: false,       // WARNING: no cover image
  hasAgenda: true,            // partial — only 2 sessions
  hasTickets: true,
  hasSpeakers: true,          // but only host, no guest speakers
  hasLocation: false,         // virtual but no meeting link
  hasRegistrationForm: false, // WARNING: no custom form
}
// Partial schedule (only 2 of expected 4+ sessions)
schedule: [
  { id: 's-b1', time: '3:00 PM', title: 'Template Literal Types', duration: 45, type: 'session', speakers: ['Mahesh Kumar'] },
  { id: 's-b2', time: '3:45 PM', title: 'Conditional Types Deep Dive', duration: 45, type: 'session', speakers: ['Mahesh Kumar'] },
]
```

**Card in EventsListView** (Mahesh's view):
- Grey placeholder image (no cover uploaded) with "Draft" badge
- "$39" price badge on image
- Title, date, "Virtual" pill, "80 spots"
- CTA: "Continue Building"
- "6 of 9 setup steps complete" indicator

**Detail View — EventBuilderViewV2 (Building State)**:

**Overview Tab**:
```
┌──────────────────────────────────────────────────────────────────┐
│  SETUP CHECKLIST                                    6/9 complete │
│  ─────────────────────────────────────────────────────────────── │
│  [x] Event title                                                 │
│  [x] Description                                                 │
│  [x] Date & time                                                 │
│  [!] Cover image ──── "Events with covers get 3x more clicks"   │
│  [~] Agenda ─────── "2 sessions added. Consider adding breaks."  │
│  [x] Speakers ────── "Only you as host. Add a guest speaker?"    │
│  [x] Tickets ─────── 1 tier ($39 General)                        │
│  [!] Registration form ── "No custom fields. Using defaults."    │
│  [!] Meeting link ──────── "No virtual meeting link set"         │
│                                                                   │
│  Progress bar: ████████████░░░░░░░ 67%                           │
│                                                                   │
│  ┌─ WARNINGS ──────────────────────────────────────────────┐     │
│  │  3 issues to resolve before publishing:                  │     │
│  │                                                          │     │
│  │  (!) No cover image — Upload one for better discovery    │     │
│  │  (!) No meeting link — Attendees won't know where to go  │     │
│  │  (i) Only 2 agenda sessions — consider adding more       │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                   │
│  ┌─ AI SUGGESTIONS ────────────────────────────────────────┐     │
│  │  "I see you have 2 sessions on TypeScript types. Want    │     │
│  │   me to suggest 2 more sessions to round out the         │     │
│  │   workshop? (Mapped Types, Utility Types)"               │     │
│  │                                          [Yes, Generate]  │     │
│  │                                                          │     │
│  │  "Your ticket is priced at $39. Similar workshops on     │     ���
│  │   the platform average $45-$65. Consider adding a VIP    │     │
│  │   tier with 1-on-1 code review."                         │     │
│  │                                          [Add VIP Tier]   │     │
│  └──────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

**Schedule Tab** (partial content):
- Shows 2 existing sessions in editable cards
- Warning banner: "Your 2 sessions total 90 min. A typical workshop is 2-3 hours. Consider adding breaks and more content."
- [+ Add Session] button and [+ Add Break] button
- [Generate More with AI] button

**Tickets Tab** (has one tier):
- Shows 1 configured ticket (General $39, 80 qty)
- Suggestion card: "Add a second tier? VIP with extra perks typically increases revenue 40%."
- Discount codes section: empty, with [+ Add Discount Code]
- No early bird configured — suggestion: "Set an early bird price ending 7 days before event?"

**Settings Tab**:
- Meeting link: EMPTY with red warning indicator
- Recording: not configured
- Waitlist: toggle OFF (with note "recommended for paid events")
- Capacity warning threshold: not set

**Header Actions**:
- "Publish" button: ENABLED but with orange warning icon — "3 issues remaining"
- "Preview" button: active
- "Share Draft" button: visible (share draft link with co-organizers)

---

### EVENT C: "Cloud Architecture Workshop" — READY TO PUBLISH (Creator View)

**Purpose**: Show a fully built event with all fields complete. The creator sees a "ready to go" state with a publish confirmation flow, final review checklist, and preview capability.

**Mock Data**:
```
id: 'C1'
title: 'Cloud Architecture Workshop'
description: 'Comprehensive hands-on workshop covering cloud architecture patterns, microservices design, and deployment strategies across AWS, GCP, and Azure.'
date: '2026-04-25'
time: '10:00 AM EST'
status: 'draft'
lifecycleStage: 'ready'
creatorEmail: 'mahesh@email.com'
visibility: 'public'
accessType: 'paid'
isPaid: true
price: 59
currency: 'USD'
tickets: [
  { id: 'tkt-c1', name: 'Early Bird', price: 39, currency: 'USD', quantity: 30, description: 'Limited early access pricing' },
  { id: 'tkt-c2', name: 'General', price: 59, currency: 'USD', quantity: 70, description: 'Full workshop access' },
  { id: 'tkt-c3', name: 'VIP + Code Review', price: 129, currency: 'USD', quantity: 15, description: '1-on-1 code review session with Mahesh after the workshop' },
]
location: 'virtual'
locationDetails: 'Leapcast (auto-generated)'
capacity: 115
speakers: [
  { id: 'sp-c1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
  { id: 'sp-c2', name: 'Rachel Green', email: 'rachel@example.com', role: 'Speaker' },
]
attendeeCount: 0
waitlistEnabled: true
isStandalone: true
completionChecklist: {
  hasTitle: true,
  hasDescription: true,
  hasDateTime: true,
  hasCoverImage: true,
  hasAgenda: true,
  hasTickets: true,
  hasSpeakers: true,
  hasLocation: true,
  hasRegistrationForm: true,
}
// Full schedule
schedule: [
  { id: 's-c1', time: '10:00 AM', title: 'Welcome & Cloud Architecture Overview', duration: 30, type: 'keynote', speakers: ['Mahesh Kumar'] },
  { id: 's-c2', time: '10:30 AM', title: 'Microservices Design Patterns', duration: 60, type: 'session', speakers: ['Rachel Green'] },
  { id: 's-c3', time: '11:30 AM', title: 'Networking Break', duration: 15, type: 'break', speakers: [] },
  { id: 's-c4', time: '11:45 AM', title: 'Hands-on: Deploying to AWS', duration: 75, type: 'workshop', speakers: ['Mahesh Kumar'] },
  { id: 's-c5', time: '1:00 PM', title: 'Q&A and Closing', duration: 30, type: 'session', speakers: ['Mahesh Kumar', 'Rachel Green'] },
]
```

**Card in EventsListView** (Mahesh's view):
- Has cover image (not grey placeholder)
- "Draft" badge but with a green "Ready" sub-badge
- "From $39" price badge
- Title, date, "Virtual", "115 spots"
- CTA: "Review & Publish"

**Detail View — EventBuilderViewV2 (Ready State)**:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  ALL SET — YOUR EVENT IS READY TO PUBLISH                        │
│                                                                   │
│  Everything looks good. Review the final checklist below,        │
│  then hit Publish to start accepting registrations.              │
│                                                                   │
│  [Preview Public Page]              [Publish Event]               │
└──────────────────────────────────────────────────────────────────┘
```

**Overview Tab**:
```
┌──────────────────────────────────────────────────────────────────┐
│  FINAL REVIEW CHECKLIST                             9/9 complete │
│  ─────────────────────────────────────────────────────────────── │
│  [x] Event title ─────────── Cloud Architecture Workshop         │
│  [x] Description ─────────── 156 words                           │
│  [x] Date & time ─────────── Apr 25, 2026, 10:00 AM EST        │
│  [x] Cover image ─────────── Uploaded                            │
│  [x] Agenda ──────────────── 5 sessions, 3.5 hours total        │
│  [x] Speakers ────────────── 2 speakers configured               │
│  [x] Tickets ─────────────── 3 tiers ($39 / $59 / $129)         │
│  [x] Registration form ───── 4 custom fields                     │
│  [x] Meeting link ────────── Leapcast (auto)                     │
│                                                                   │
│  Progress bar: █████████████████████ 100%                        │
│                                                                   │
│  ┌─ PUBLISH CONFIRMATION ──────────────────────────────────┐     │
│  │  When you publish:                                       │     │
│  │  - Event becomes visible on the explore page             │     │
│  │  - Public URL becomes shareable                          │     │
│  │  - Early bird tickets go live immediately                │     │
│  │  - Leapcast meeting room is auto-provisioned             │     │
│  │                                                          │     │
│  │  [Publish Now]    [Schedule Publish for Later]            │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                   │
│  ┌─ EVENT PREVIEW CARD ────────────────────────────────────┐     │
│  │  (Full-fidelity preview of how the card will appear      │     │
│  │   in the explore page, with cover image, price, etc.)    │     │
│  └──────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

**All Other Tabs**: Fully populated — same as the existing "mature" EventBuilderViewV2 but with 0 registrations and "pre-publish" analytics.

---

### EVENT D: "Design System Masterclass" — SOLD OUT / AT CAPACITY (Both Views)

**Purpose**: Reuse existing event #2 but enhance it. 156/150 registered. Shows creator's waitlist management panel and learner's "Sold Out" experience.

**Existing event ID**: `'2'` — already exists, needs enhancements

**Enhancements to mock data**:
```
lifecycleStage: 'published'
// Already has: capacity 150, attendeeCount 156, waitlistEnabled: true
```

**Creator View (Emma Wilson — but we show it as if Mahesh were managing a similar one)**:
This event belongs to Emma Wilson, so Mahesh sees it as a learner. For the creator view of a sold-out event, we need a NEW mock event:

```
id: 'D1'
title: 'Full-Stack AI Bootcamp'
description: 'Intensive bootcamp on building AI-powered full-stack applications. Sold out — managing waitlist.'
date: '2026-03-20'
time: '9:00 AM EST'
status: 'upcoming'
lifecycleStage: 'published'
creatorEmail: 'mahesh@email.com'
visibility: 'public'
accessType: 'open'
isPaid: true
price: 79
tickets: [
  { id: 'tkt-d1', name: 'General', price: 79, currency: 'USD', quantity: 60, description: 'Full bootcamp access' },
]
capacity: 60
attendeeCount: 63  // OVER CAPACITY
waitlistEnabled: true
location: 'virtual'
locationDetails: 'Leapcast'
isStandalone: true
speakers: [
  { id: 'sp-d1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
]
```

**Creator Detail View — Sold Out State**:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  EVENT IS AT CAPACITY                  63/60 registered          │
│                                                                   │
│  3 people are on the waitlist. Consider increasing capacity      │
│  or creating a second session.                                   │
│                                                                   │
│  [Increase Capacity]  [Manage Waitlist]  [Clone as New Event]    │
└──────────────────────────────────────────────────────────────────┘
```

**Attendees Tab** — Waitlist Management Sub-Panel:
```
┌──────────────────────────────────────────────────────────────────┐
│  ATTENDEES (60 confirmed)   WAITLIST (3 people)                  │
│  ──────────────────────────────────────────────────────────────  │
│  [Confirmed] [Waitlist] [Cancelled]                              │
│                                                                   │
│  Waitlist View:                                                   │
│  ┌────────────────────────────────────────────────────────┐      │
│  │ #1  Alex Brown      alex.brown@example.com    May 15   │      │
│  │     "Really excited to learn about AI!"                 │      │
│  │     [Promote to Confirmed]  [Send Message]  [Remove]   │      │
│  ├────────────────────────────────────────────────────────┤      │
│  │ #2  Chris Lee       chris.lee@example.com     May 16   │      │
│  │     No message                                          │      │
│  │     [Promote to Confirmed]  [Send Message]  [Remove]   │      │
│  ├────────────────────────────────────────────────────────┤      │
│  │ #3  Kim Park        kim.park@example.com      May 17   │      │
│  │     "Can I get on the next available spot?"             │      │
│  │     [Promote to Confirmed]  [Send Message]  [Remove]   │      │
│  └────────────────────────────────────────────────────────┘      │
│                                                                   │
│  Bulk Actions: [Promote All]  [Email Waitlist]  [Export CSV]     │
└──────────────────────────────────────────────────────────────────┘
```

**Learner View (Sarah sees existing event #2)**:
- Registration CTA area:
```
┌──────────────────────────────────────────────────────────────────┐
│  SOLD OUT                                                        │
│                                                                   │
│  This event has reached capacity (150/150).                      │
│  Join the waitlist to get notified if a spot opens up.           │
│                                                                   │
│  Currently 6 people on the waitlist.                             │
│                                                                   │
│  [Join Waitlist — $29 charged only if admitted]                   │
│                                                                   │
│  (i) You'll be notified within 24 hours if a spot opens.        │
│      Payment is only processed upon admission.                   │
└──────────────────────────────────────────────────────────────────┘
```

---

### EVENT E: "Data Science Bootcamp" — MULTI-TIER PAID EVENT (Learner View)

**Purpose**: Show the ticket selection experience for a learner. 3 ticket tiers with different prices, perks, and availability. Includes early bird pricing and discount code support.

**Mock Data**:
```
id: 'E1'
title: 'Data Science Bootcamp'
description: 'From data wrangling to model deployment — a full-day intensive covering Python, Pandas, Scikit-learn, and real-world ML pipelines.'
date: '2026-05-10'
time: '9:00 AM EST'
status: 'upcoming'
lifecycleStage: 'published'
creatorEmail: 'sophia.jones@example.com'
creatorName: 'Sophia Jones'
visibility: 'global'
accessType: 'paid'
isPaid: true
price: 49  // lowest tier for card display
currency: 'USD'
tickets: [
  { id: 'tkt-e1', name: 'Student', price: 25, currency: 'USD', quantity: 50, remaining: 18, description: 'For students with a valid .edu email', perks: ['All sessions', 'Recording (7 days)', 'Community access'] },
  { id: 'tkt-e2', name: 'General Admission', price: 49, currency: 'USD', quantity: 100, remaining: 42, description: 'Full bootcamp access', perks: ['All sessions', 'Recording (30 days)', 'Resources download', 'Community access'] },
  { id: 'tkt-e3', name: 'VIP + Mentorship', price: 149, currency: 'USD', quantity: 20, remaining: 5, description: '30-min 1-on-1 mentorship session + priority Q&A', perks: ['Everything in General', '1-on-1 mentorship', 'Priority Q&A', 'Lifetime recording', 'Certificate'] },
]
earlyBird: {
  deadline: '2026-04-25',
  discountPercent: 20,
  active: true,     // show "Early bird: 20% off, ends Apr 25"
}
discountCodes: [
  { code: 'LAUNCH20', type: 'percent', value: 20, limit: 50, used: 12 },
]
location: 'virtual'
locationDetails: 'Leapcast'
capacity: 170
attendeeCount: 105
waitlistEnabled: true
isStandalone: true
speakers: [
  { id: 'sp-e1', name: 'Sophia Jones', email: 'sophia.jones@example.com', role: 'Host' },
  { id: 'sp-e2', name: 'Andrew Ng', email: 'andrew@example.com', role: 'Speaker' },
]
```

**Card in EventsListView** (Sarah's view):
- Cover image
- "From $25" price badge (lowest tier)
- "Early bird: 20% off" small label
- "5 VIP spots left" urgency indicator
- CTA: "Get Tickets"

**Learner Detail View — Ticket Selection**:

**Registration Sidebar** (right side of overview tab):
```
┌──────────────────────────────────────────────────────────────────┐
│  SELECT YOUR TICKET                                              │
│                                                                   │
│  Early bird pricing — 20% off all tiers                          │
│  Ends Apr 25, 2026 (38 days left)                                │
│                                                                   │
│  ┌─ Student ───────────────────────────────────────────────┐     │
│  │  $25  $20 (early bird)              18 remaining         │     │
│  │  For students with a valid .edu email                    │     │
│  │  - All sessions                                          │     │
│  │  - Recording (7 days)                                    │     │
│  │  - Community access                                      │     │
│  │                                          [Select]         │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                   │
│  ┌─ General Admission ─────────────────────────────────────┐     │
│  │  $49  $39 (early bird)              42 remaining         │     │  
│  │  Full bootcamp access                                    │     │
│  │  - All sessions                                          │     │
│  │  - Recording (30 days)                                   │     │
│  │  - Resources download                                    │     │
│  │  - Community access                                      │     │
│  │                                          [Select]         │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                   │
│  ┌─ VIP + Mentorship ──────────── ONLY 5 LEFT ─────────────┐     │
│  │  $149  $119 (early bird)                                  │     │
│  │  30-min 1-on-1 mentorship + priority Q&A                 │     │
│  │  - Everything in General                                  │     │
│  │  - 1-on-1 mentorship session                              │     │
│  │  - Priority Q&A                                           │     │
│  │  - Lifetime recording access                              │     │
│  │  - Certificate of completion                              │     │
│  │                                          [Select]         │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                   │
│  Have a discount code?  [Enter code]                             │
│                                                                   │
│  105 of 170 spots filled                                         │
│  ████████████░░░░░░ 62%                                          │
└──────────────────────────────────────────────────────────────────┘
```

**After selecting a ticket** — EventCheckoutModal opens:
```
┌──────────────────────────────────────────────────────────────────┐
│  CHECKOUT                                                        │
│                                                                   │
│  Data Science Bootcamp                                           │
│  May 10, 2026 at 9:00 AM EST                                    │
│                                                                   │
│  Ticket: General Admission                                       │
│  Base price:                                      $49.00         │
│  Early bird discount (20%):                      -$9.80          │
│  ─────────────────────────────────────────────────────           │
│  Total:                                           $39.20         │
│                                                                   │
│  Discount code: [____________] [Apply]                           │
│                                                                   │
│  ─── Registration Form ───                                       │
│  Name:      [Sarah Chen        ]  (prefilled)                    │
│  Email:     [sarah.chen@gmail.com]  (prefilled)                  │
│  Company:   [__________________ ]                                │
│  Experience level: [ Intermediate  v ]                            │
│                                                                   │
│  [x] I agree to the cancellation policy                          │
│  Refund policy: Full refund up to 7 days before event            │
│                                                                   │
│  [Complete Purchase — $39.20]                                     │
└──────────────────────────────────────────────────────────────────┘
```

---

### EVENT F: "SEO & Content Marketing Workshop" — APPLICATION PENDING (Learner View)

**Purpose**: Enhance existing event #6. Sarah has applied (status: `applied`). The detail view shows the pending application state.

**Existing event ID**: `'6'` — already exists with Sarah's `applied` registration

**Learner Detail View — Application Pending State**:

**Top Banner (replaces registration CTA)**:
```
┌──────────────────────────────────────────────────────────────────┐
│  APPLICATION SUBMITTED                                           │
│                                                                   │
│  Your application for this event is under review.                │
│  Applied on: Apr 22, 2024                                        │
│                                                                   │
│  Status Timeline:                                                │
│  (x) Application submitted ─── Apr 22                            │
│  (o) Under review ──────────── Current                           │
│  ( ) Decision ──────────────── Typically within 3-5 days         │
│                                                                   │
│  What you submitted:                                             │
│  - Company: TechCorp                                             │
│  - Experience: 2 years in content marketing                      │
│  - Motivation: "Want to improve our SEO strategy"                │
│                                                                   │
│  [Withdraw Application]                                           │
│                                                                   │
│  Questions? [Ask the Organizer]                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Tabs visible**: Overview, Agenda, Speakers — but NOT Resources, Chat, Community (those are post-approval only, per PRODUCT_CLARITY.md Discussion & Interaction States)

---

### EVENT G: "Leadership Retreat 2026" — APPLICATION REJECTED (Learner View)

**Purpose**: Show what happens when a screened application is denied. Sarah sees a rejection notice with an optional organizer message.

**Mock Data**:
```
id: 'G1'
title: 'Leadership Retreat 2026'
description: 'An exclusive 2-day retreat for senior leaders to explore executive coaching, team dynamics, and strategic decision-making frameworks.'
date: '2026-06-01'
time: '8:00 AM EST'
status: 'upcoming'
lifecycleStage: 'published'
creatorEmail: 'james.parker@example.com'
creatorName: 'James Parker'
visibility: 'private'
accessType: 'screened'
isPaid: true
price: 399
currency: 'USD'
tickets: [
  { id: 'tkt-g1', name: 'Executive Pass', price: 399, currency: 'USD', quantity: 20, description: '2-day retreat + meals + materials' },
]
location: 'in-person'
locationDetails: 'Revealed upon acceptance'
capacity: 20
attendeeCount: 16
hideLocation: true
waitlistEnabled: false
isStandalone: true
speakers: [
  { id: 'sp-g1', name: 'James Parker', email: 'james.parker@example.com', role: 'Host' },
]
```

**Registration for Sarah**:
```
{
  id: 'reg-g1',
  eventId: 'G1',
  userEmail: 'sarah.chen@gmail.com',
  userName: 'Sarah Chen',
  status: 'rejected',
  registeredAt: '2026-04-10',
  rejectedAt: '2026-04-15',
  rejectionReason: 'We prioritized applicants with 10+ years of leadership experience for this cohort. We encourage you to apply for our upcoming Leadership Foundations Workshop which may be a better fit.',
  formData: {
    name: 'Sarah Chen',
    email: 'sarah.chen@gmail.com',
    title: 'Product Designer',
    company: 'TechCorp',
    yearsExperience: '4',
    motivation: 'Looking to develop leadership skills as I transition into management',
  }
}
```

**Learner Detail View — Rejected State**:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  APPLICATION NOT ACCEPTED                                        │
│                                                                   │
│  Unfortunately, your application was not accepted for            │
│  this event.                                                     │
│                                                                   │
│  Message from the organizer:                                     │
│  "We prioritized applicants with 10+ years of leadership        │
│   experience for this cohort. We encourage you to apply for     │
│   our upcoming Leadership Foundations Workshop which may be      │
│   a better fit."                                                 │
│                                                                   │
│  Status Timeline:                                                │
│  (x) Applied ──────────── Apr 10                                 │
│  (x) Reviewed ─────────── Apr 15                                 │
│  (x) Not accepted ─────── Apr 15                                 │
│                                                                   │
│  [Browse Similar Events]  [Contact Organizer]                    │
└──────────────────────────────────────────────────────────────────┘
```

**Limited tabs visible**: Overview only (no Agenda, no Community, no Resources — rejected applicants see minimal info). The event description and speakers are still visible (public info), but detailed schedule and exclusive content are hidden.

---

### EVENT H: "API Design Masterclass" — WAITLISTED (Learner View)

**Purpose**: Show the waitlist experience. Sarah is #3 on the waitlist. Shows position, estimated wait, notification preference.

**Mock Data**:
```
id: 'H1'
title: 'API Design Masterclass'
description: 'Learn REST, GraphQL, and gRPC API design patterns. Hands-on exercises building production-grade APIs with proper versioning, auth, and documentation.'
date: '2026-04-18'
time: '1:00 PM EST'
status: 'upcoming'
lifecycleStage: 'published'
creatorEmail: 'michael.chen@example.com'
creatorName: 'Michael Chen'
visibility: 'public'
accessType: 'open'
isPaid: true
price: 35
currency: 'USD'
tickets: [
  { id: 'tkt-h1', name: 'General', price: 35, currency: 'USD', quantity: 40, description: 'Full masterclass access' },
]
location: 'virtual'
locationDetails: 'Zoom'
capacity: 40
attendeeCount: 40     // FULL
waitlistEnabled: true
isStandalone: true
speakers: [
  { id: 'sp-h1', name: 'Michael Chen', email: 'michael.chen@example.com', role: 'Host' },
]
```

**Waitlist entry for Sarah**:
```
{
  id: 'wait-h1',
  eventId: 'H1',
  userEmail: 'sarah.chen@gmail.com',
  userName: 'Sarah Chen',
  addedAt: '2026-04-05',
  priority: 3,
  message: 'Very interested in the GraphQL section!',
}
```

**Learner Detail View — Waitlist State**:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  YOU'RE ON THE WAITLIST                                          │
│                                                                   │
│  Position: #3 of 7 on the waitlist                               │
│  Joined: Apr 5, 2026                                             │
│                                                                   │
│  ── ── ── ── ── ── ── ── ── ──                                  │
│  [#1] [#2] [YOU #3] [#4] [#5] [#6] [#7]                        │
│  ── ── ── ── ── ── ── ── ── ──                                  │
│                                                                   │
│  When a spot opens:                                              │
│  - You'll get an email notification                              │
│  - You'll have 24 hours to confirm and pay ($35)                 │
│  - If you don't confirm, the spot goes to the next person       │
│                                                                   │
│  Notification preference:                                        │
│  [x] Email   [ ] SMS   [ ] Push notification                    │
│                                                                   │
│  [Leave Waitlist]                                                 │
└──────────────────────────────────────────────────────────────────┘
```

**Tabs visible**: Overview, Agenda, Speakers (public info) — but NOT Resources, Chat (post-registration only)

---

### EVENT I: "React Summit 2026" — LIVE / IN-PROGRESS (Both Views)

**Purpose**: Show what the event page looks like during a live event. Creator sees a live dashboard. Learner sees "Join Now."

**Mock Data**:
```
id: 'I1'
title: 'React Summit 2026'
description: 'The biggest React conference of the year. Live talks, workshops, and networking.'
date: '2026-02-17'           // TODAY's date
time: '10:00 AM EST'
status: 'upcoming'
lifecycleStage: 'live'
liveStartedAt: '2026-02-17T10:00:00'
creatorEmail: 'mahesh@email.com'
creatorName: 'Mahesh Kumar'
visibility: 'global'
accessType: 'open'
isPaid: false
location: 'virtual'
locationDetails: 'Leapcast'
capacity: 500
attendeeCount: 487
liveAttendeeCount: 312        // currently watching
waitlistEnabled: false
isStandalone: false
parentCommunityId: 'comm-1'
communityName: 'React Developers Hub'
speakers: [
  { id: 'sp-i1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
  { id: 'sp-i2', name: 'Dan Abramov', email: 'dan@example.com', role: 'Speaker' },
  { id: 'sp-i3', name: 'Sophie Alpert', email: 'sophie@example.com', role: 'Speaker' },
]
```

**Registration for Sarah** (she registered earlier):
```
{
  id: 'reg-i1',
  eventId: 'I1',
  userEmail: 'sarah.chen@gmail.com',
  userName: 'Sarah Chen',
  status: 'confirmed',
  registeredAt: '2026-02-01',
  formData: { name: 'Sarah Chen', email: 'sarah.chen@gmail.com' }
}
```

**Card in EventsListView**:
- LIVE indicator: pulsing red dot + "LIVE NOW" badge
- "312 watching" live count
- CTA for Sarah (registered): "Join Now"
- CTA for others: "Join Live"

**Creator Detail View — Live Dashboard**:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  (o) LIVE NOW — Started at 10:00 AM EST (2h 15min ago)          │
│                                                                   │
│  312 watching now    487 registered    96% satisfaction           │
│                                                                   │
│  [Open Leapcast Control Room]  [End Event]                       │
└──────────────────────────────────────────────────────────────────┘
```

**Overview Tab shows real-time stats**:
```
┌──────────────────────────────────────────────────────────────────┐
│  LIVE DASHBOARD                                                  │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  312         │  │  487         │  │  24          │             │
│  │  Watching    │  │  Registered  │  │  Chat msgs   │             │
│  │  now         │  │  total       │  │  last 5 min  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                   │
│  Current Session: "Keynote: The Future of React Server Components"│
│  Speaker: Dan Abramov                                             │
│  Time elapsed: 32 min / 45 min                                   │
│  ████████████████████░░░░░ 71%                                   │
│                                                                   │
│  Next Up: "Workshop: Building with RSC" by Sophie Alpert         │
│  Starts in: 13 min                                               │
│                                                                   │
│  ┌─ LIVE ENGAGEMENT ──────────────────────────────────────┐      │
│  │  Attendance over time: [sparkline chart]                │      │
│  │  Peak: 345 at 10:35 AM                                  │      │
│  │  Average watch time: 48 min                              │      │
│  │                                                          │      │
│  │  Active polls: 1 open                                    │      │
│  │  Q&A queue: 8 unanswered questions                       │      │
│  │  Raised hands: 3                                         │      │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                   │
│  Quick Actions:                                                   │
│  [Launch Poll]  [Pin Message]  [Mute All]  [Send Announcement]   │
└──────────────────────────────────────────────────────────────────┘
```

**Learner Detail View (Sarah — registered)**:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  (o) THIS EVENT IS LIVE                                          │
│                                                                   │
│  React Summit 2026 started 2 hours ago.                          │
│  312 people are watching right now.                              │
│                                                                   │
│  Current session: "Keynote: The Future of React Server Components"│
│                                                                   │
│  [Join Now — Open Leapcast]                                       │
│                                                                   │
│  (i) Your camera and mic will be off by default.                 │
└──────────────────────────────────────────────────────────────────┘
```

---

### EVENT J: "ML Workshop" — JUST ENDED (Both Views)

**Purpose**: Event finished 2 hours ago. No recordings uploaded yet. Creator sees post-event todo checklist. Learner sees "ended — materials coming soon."

**Mock Data**:
```
id: 'J1'
title: 'ML Workshop: From Data to Deployment'
description: 'Practical machine learning workshop covering the full pipeline from data collection to model deployment.'
date: '2026-02-17'           // TODAY — ended 2 hours ago
time: '8:00 AM EST'
status: 'past'
lifecycleStage: 'ended'
creatorEmail: 'mahesh@email.com'
creatorName: 'Mahesh Kumar'
visibility: 'public'
accessType: 'open'
isPaid: false
location: 'virtual'
locationDetails: 'Leapcast'
capacity: 80
attendeeCount: 72
isStandalone: true
waitlistEnabled: false
// NO recording yet
recordingUrl: undefined
resources: []
certificateTemplateId: undefined
postEventTodos: {
  uploadRecording: false,
  sendFollowUp: false,
  issueCertificates: false,
  collectFeedback: false,
  publishResources: false,
}
attendanceReport: {
  registered: 72,
  attended: 58,
  peakConcurrent: 54,
  avgDuration: 87, // minutes out of 120
  engagementScore: 78,
}
speakers: [
  { id: 'sp-j1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
]
```

**Registration for Sarah** (attended):
```
{
  id: 'reg-j1',
  eventId: 'J1',
  userEmail: 'sarah.chen@gmail.com',
  userName: 'Sarah Chen',
  status: 'confirmed',
  registeredAt: '2026-02-10',
  formData: { name: 'Sarah Chen', email: 'sarah.chen@gmail.com' }
}
```

**Creator Detail View — Just Ended State**:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  EVENT ENDED — 2 hours ago                                       │
│                                                                   │
│  58 of 72 registered actually attended (81% attendance rate)     │
│                                                                   │
│  POST-EVENT CHECKLIST:                                           │
│  [ ] Upload recording                    [Upload]                │
│  [ ] Send follow-up email to attendees   [Compose]               │
│  [ ] Publish resources & slides          [Upload Resources]      │
│  [ ] Configure certificates              [Set Up]                │
│  [ ] Send feedback survey                [Create Survey]         │
│                                                                   │
│  0 of 5 tasks complete                                           │
└──────────────────────────────────────────────────────────────────┘
```

**Analytics Tab — Post-Event Report**:
```
┌──────────────────────────────────────────────────────────────────┐
│  ATTENDANCE REPORT                                               │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  72       │  │  58       │  │  81%      │  │  78/100   │       │
│  │  Registered│ │  Attended │  │  Show rate│  │  Engagement│      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                   │
│  Peak concurrent viewers: 54                                     │
│  Average watch time: 87 min / 120 min (73%)                     │
│                                                                   │
│  Attendance over time: [area chart]                              │
│  Chat activity: [bar chart]                                      │
│  Drop-off points: [funnel chart]                                 │
└──────────────────────────────────────────────────────────────────┘
```

**Learner Detail View (Sarah — attended)**:

Uses PostEventView component but in a "materials pending" state:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  EVENT ENDED                                                     │
│                                                                   │
│  Thanks for attending! The organizer is preparing                │
│  post-event materials.                                           │
│                                                                   │
│  Coming soon:                                                    │
│  ( ) Recording ──────── Not uploaded yet                         │
│  ( ) Resources & slides ── Not uploaded yet                      │
│  ( ) Certificate ──────── Not configured yet                     │
│                                                                   │
│  We'll notify you when materials are available.                  │
│  [x] Email me when recording is ready                            │
│                                                                   │
│  In the meantime:                                                │
│  [Rate This Event]  [Browse Similar Events]                      │
└──────────────────────────────────────────────────────────────────┘
```

**Tabs**: Overview, Discussion (can leave reviews/feedback), but Recording/Resources/Certificate tabs show "Coming soon" empty states

---

### EVENT K: "Growth Hacking Bootcamp" — CANCELLED (Both Views)

**Purpose**: Show what happens when an event is cancelled. Creator sees cancellation confirmation + refund status. Learners see a cancellation notice.

**Mock Data**:
```
id: 'K1'
title: 'Growth Hacking Bootcamp'
description: 'Intensive bootcamp on growth strategies, viral loops, and data-driven marketing. Learn from experienced growth leads.'
date: '2026-04-05'
time: '10:00 AM EST'
status: 'cancelled'           // new status value
lifecycleStage: 'cancelled'
cancelledAt: '2026-03-20'
cancellationReason: 'Due to a scheduling conflict with our lead speaker, we need to postpone this event. All ticket holders will receive a full refund within 5-7 business days. We plan to reschedule for Q3 2026.'
creatorEmail: 'mahesh@email.com'
creatorName: 'Mahesh Kumar'
visibility: 'public'
accessType: 'paid'
isPaid: true
price: 69
currency: 'USD'
tickets: [
  { id: 'tkt-k1', name: 'General', price: 69, currency: 'USD', quantity: 80, description: 'Full bootcamp access' },
]
location: 'virtual'
locationDetails: 'Leapcast'
capacity: 80
attendeeCount: 45
waitlistEnabled: false
isStandalone: true
refundPolicy: 'full'
speakers: [
  { id: 'sp-k1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
]
```

**Registration for Sarah** (was registered, now cancelled event):
```
{
  id: 'reg-k1',
  eventId: 'K1',
  userEmail: 'sarah.chen@gmail.com',
  userName: 'Sarah Chen',
  status: 'confirmed',
  registeredAt: '2026-03-01',
  ticketTierId: 'tkt-k1',
  paymentAmount: 69,
  paymentStatus: 'refunded',
  formData: { name: 'Sarah Chen', email: 'sarah.chen@gmail.com' }
}
```

**Card in EventsListView**:
- Greyed out card with "Cancelled" badge (grey bg, dark text)
- Strikethrough on date
- No CTA button (just "Cancelled" label)

**Creator Detail View**:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  EVENT CANCELLED — Mar 20, 2026                                  │
│                                                                   │
│  Reason: Due to a scheduling conflict with our lead speaker...   │
│                                                                   │
│  Refund Status:                                                  │
│  45 attendees notified    42 refunds processed    3 pending      │
│                                                                   │
│  Total refunded: $2,898 / $3,105                                 │
│  ████████████████████░░ 93%                                      │
│                                                                   │
│  [View Refund Details]  [Clone as New Event]  [Delete Event]     │
└──────────────────────────────────────────────────────────────────┘
```

**Learner Detail View (Sarah)**:

**Top Banner**:
```
┌──────────────────────────────────────────────────────────────────┐
│  THIS EVENT HAS BEEN CANCELLED                                   │
│                                                                   │
│  The organizer cancelled this event on Mar 20, 2026.            │
│                                                                   │
│  "Due to a scheduling conflict with our lead speaker, we need   │
│   to postpone this event. All ticket holders will receive a     │
│   full refund within 5-7 business days. We plan to reschedule   │
│   for Q3 2026."                                                  │
│                                                                   │
│  Your refund:                                                    │
│  Ticket: General ($69.00)                                        │
│  Status: Refunded on Mar 22, 2026                                │
│  Refunded to: Visa ending 4242                                   │
│                                                                   │
│  [Browse Similar Events]  [Contact Organizer]                    │
└──────────────────────────────────────────────────────────────────┘
```

**Tabs**: Overview only — all other tabs locked/hidden. Event content is preserved but clearly marked as cancelled.

---

### EVENT L: "DevOps Pipeline Workshop" — SPEAKER / CO-HOST VIEW (Mahesh as Speaker)

**Purpose**: Show what a non-creator team member (speaker or co-host) sees. Mahesh is listed as a speaker on someone else's event. He has elevated permissions but can't access billing/settings.

**Mock Data**:
```
id: 'L1'
title: 'DevOps Pipeline Workshop'
description: 'Build CI/CD pipelines from scratch. Covers GitHub Actions, Docker, Kubernetes, and monitoring.'
date: '2026-04-12'
time: '11:00 AM EST'
status: 'upcoming'
lifecycleStage: 'published'
creatorEmail: 'rachel.green@example.com'
creatorName: 'Rachel Green'
visibility: 'public'
accessType: 'open'
isPaid: false
location: 'virtual'
locationDetails: 'Leapcast'
capacity: 100
attendeeCount: 76
waitlistEnabled: true
isStandalone: false
parentCommunityId: 'comm-5'
communityName: 'DevOps Engineers'
speakers: [
  { id: 'sp-l1', name: 'Rachel Green', email: 'rachel.green@example.com', role: 'Host' },
  { id: 'sp-l2', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Speaker' },   // MAHESH IS A SPEAKER
]
moderators: ['mahesh@email.com']  // Also has moderator access
```

**Card in EventsListView** (Mahesh's view):
- "Speaker" role badge instead of "Hosting" (different from creator badge)
- Can still see some admin stats
- CTA: "View Event" (not "Edit Event")

**Detail View — Speaker/Co-host View**:

The EventShell shows a SUBSET of admin tabs:
```
LEFT SIDEBAR TABS (Speaker/Moderator):
  - Overview       (read-only event info + their session details)
  - Schedule       (can edit ONLY their own session)
  - Attendees      (can view, cannot manage)
  - Discussion     (can moderate chat)
  - AI Hub         (limited — suggestions only)
  
  HIDDEN TABS (creator-only):
  - Tickets        (cannot access)
  - Analytics      (cannot access)
  - Settings       (cannot access)
```

**Overview Tab** (Speaker View):
```
┌──────────────────────────────────────────────────────────────────┐
│  YOUR ROLE: Speaker                                              │
│  Event by: Rachel Green                                          │
│                                                                   │
│  ┌─ YOUR SESSION ──────────────────────────────────────────┐     │
│  │  "Building CI/CD with GitHub Actions"                    │     │
│  │  11:45 AM — 12:45 PM (60 min)                           │     │
│  │                                                          │     │
│  │  Your bio (as shown to attendees):                       │     │
│  │  "Mahesh Kumar — Senior DevOps Engineer..."              │     │
│  │  [Edit Bio]  [Edit Session Description]                  │     │
│  │                                                          │     │
│  │  Slides uploaded: presentation.pdf                       │     │
│  │  [Replace Slides]  [Preview]                             │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                   │
│  Event Summary (read-only):                                      │
│  - 76 registered / 100 capacity                                  │
│  - 5 sessions total                                              │
│  - Virtual via Leapcast                                          │
│                                                                   │
│  [Open Leapcast (Speaker Backstage)]                              │
└──────────────────────────────────────────────────────────────────┘
```

---

### EVENT M: "Community Town Hall" — ANONYMOUS / LOGGED-OUT VIEW

**Purpose**: Show what a non-authenticated user sees. Limited info, auth-gated CTAs, "Sign up to register" prompts.

**Mock Data**:
```
id: 'M1'
title: 'Community Town Hall: State of Open Source 2026'
description: 'Monthly town hall discussing the state of open source, upcoming initiatives, and community Q&A. Open to everyone.'
date: '2026-03-01'
time: '12:00 PM EST'
status: 'upcoming'
lifecycleStage: 'published'
creatorEmail: 'emma.wilson@example.com'
creatorName: 'Emma Wilson'
visibility: 'global'
accessType: 'open'
isPaid: false
location: 'virtual'
locationDetails: 'Leapcast'
capacity: 300
attendeeCount: 189
waitlistEnabled: false
isStandalone: true
speakers: [
  { id: 'sp-m1', name: 'Emma Wilson', email: 'emma.wilson@example.com', role: 'Host' },
  { id: 'sp-m2', name: 'Linus Torvalds', email: 'linus@example.com', role: 'Speaker' },
]
```

**Card in EventsListView**: Not visible to anonymous users — the explore page requires login. But the PUBLIC URL is accessible.

**Anonymous Detail View** (accessed via direct URL share):

Per PRODUCT_CLARITY.md: "Announcement-Only (Pre-Sign Up)" — anonymous visitors can only see the Announcements tab (one-way communication).

```
┌──────────────────────────────────────────────────────────────────┐
│  LEAPY AI                                    [Sign In] [Sign Up] │
│  ─────────────────────────────────────────────────────────────── │
│                                                                   │
│  Community Town Hall: State of Open Source 2026                  │
│  Hosted by Emma Wilson                                           │
│  Mar 1, 2026 at 12:00 PM EST | Virtual                          │
│  189 registered | 111 spots remaining                            │
│                                                                   │
│  ABOUT                                                           │
│  Monthly town hall discussing the state of open source...        │
│                                                                   │
│  SPEAKERS                                                        │
│  Emma Wilson — Host                                              │
│  Linus Torvalds — Speaker                                        │
│                                                                   │
│  ANNOUNCEMENTS (public)                                          │
│  "Agenda has been finalized! See you on Mar 1." — Feb 25        │
│  "Save the date for our monthly town hall." — Feb 15             │
│                                                                   │
│  ┌─ REGISTER ──────────────────────────────────────────────┐     │
│  │                                                          │     │
│  │  Sign up for free to register for this event.            │     │
│  │                                                          │     │
│  │  [Sign Up to Register]                                   │     │
│  │  Already have an account? [Sign In]                      │     │
│  │                                                          │     │
│  │  (i) Registration requires a Leapspace account.          │     │
│  │      Takes less than 30 seconds.                         │     │
│  └──────────────────────────────────────────────────────────┘     ���
│                                                                   │
│  HIDDEN SECTIONS (login required):                               │
│  Agenda, Community, Resources, Chat                              │
│  "Sign in to see full event details"                             │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Part 3: Summary of All 24 Mock Events (Existing 11 + New 13)

| ID | Title | Lifecycle | Viewer | Primary Showcase |
|----|-------|-----------|--------|-----------------|
| 1 | React 18 Deep Dive | published | Mahesh (creator) | Mature admin view (existing) |
| 2 | Design System Masterclass | published/full | Sarah (learner) | Sold out / waitlist join experience |
| 3 | PM Summit 2024 | draft | Mahesh (creator) | Existing draft with tickets |
| 4 | AI/ML Networking Mixer | published | Sarah (learner) | Open free in-person event |
| 5 | Startup Pitch Night | past/completed | Sarah (learner) | Post-event with materials |
| 6 | SEO Workshop | published | Sarah (applied) | Application pending state |
| 7 | Frontend Performance | published | Sarah (learner) | Paid course-nested event |
| 8 | UX Research Methods | published | Sarah (confirmed) | Confirmed registered learner |
| 9 | Design x Dev | published | Sarah (waitlisted) | Existing waitlist state |
| 10 | React Hooks Office Hours | published | Mahesh (creator) | Private course-nested event |
| 11 | Executive AI Strategy Dinner | published | Neither | Screened paid hidden-location event |
| **A1** | **Intro to Product Thinking** | **skeleton** | **Mahesh (creator)** | **Empty event builder + onboarding checklist** |
| **B1** | **Advanced TypeScript Patterns** | **building** | **Mahesh (creator)** | **Mid-build warnings + AI suggestions** |
| **C1** | **Cloud Architecture Workshop** | **ready** | **Mahesh (creator)** | **Ready to publish + final review** |
| **D1** | **Full-Stack AI Bootcamp** | **published/full** | **Mahesh (creator)** | **Creator managing sold-out + waitlist** |
| **E1** | **Data Science Bootcamp** | **published** | **Sarah (learner)** | **Multi-tier ticket selection + early bird** |
| **F** | (existing #6 enhanced) | published | Sarah (applied) | Enhanced application pending UI |
| **G1** | **Leadership Retreat 2026** | **published** | **Sarah (rejected)** | **Rejected application experience** |
| **H1** | **API Design Masterclass** | **published/full** | **Sarah (waitlisted)** | **Waitlist position + notifications** |
| **I1** | **React Summit 2026** | **live** | **Both** | **Live event dashboard + join now** |
| **J1** | **ML Workshop** | **ended** | **Both** | **Just ended + post-event todos** |
| **K1** | **Growth Hacking Bootcamp** | **cancelled** | **Both** | **Cancellation notice + refunds** |
| **L1** | **DevOps Pipeline Workshop** | **published** | **Mahesh (speaker)** | **Speaker/co-host restricted view** |
| **M1** | **Community Town Hall** | **published** | **Anonymous** | **Logged-out public page** |

---

## Part 4: Implementation Order

### Phase 1: Data Layer (do first)
1. Extend `Event` interface with new fields (`lifecycleStage`, `completionChecklist`, `cancelledAt`, etc.)
2. Extend `Registration` interface with `rejected`, `cancelled-by-user` statuses
3. Add all 13 new mock events to `mockEvents` array
4. Add new registrations and waitlist entries
5. Add new helper functions (`getEventLifecycleStage`, `isEventSpeaker`, `isEventCancelled`)

### Phase 2: EventShell Enhancements
6. Add `'speaker'` role to EventShell with restricted tab set
7. Add lifecycle-aware tab indicators (green/grey/warning dots)
8. Add top banner slot for status banners (live, cancelled, pending, etc.)

### Phase 3: UnifiedEventPage Router Logic
9. Add routing for: anonymous, speaker, live, cancelled, just-ended lifecycle stages
10. Pass `lifecycleStage` through to child components

### Phase 4: EventBuilderViewV2 — Creator Lifecycle States
11. Skeleton state: setup checklist, empty states, AI suggestions
12. Building state: partial content, warnings, progress bar
13. Ready state: final review checklist, publish confirmation
14. Sold out state: waitlist management panel, capacity nudges
15. Live state: live dashboard with real-time stats
16. Just ended state: post-event todo checklist, attendance report
17. Cancelled state: refund tracker, clone/delete options

### Phase 5: PublicEventLandingV3Tabbed — Learner Registration States
18. Multi-tier ticket selection UI (Event E)
19. Application pending banner (Event F — enhanced)
20. Rejected application state (Event G)
21. Waitlist position + notifications (Event H)
22. Live event "Join Now" state (Event I)
23. Just ended — materials pending state (Event J)
24. Cancelled event learner notice + refund info (Event K)

### Phase 6: Special Views
25. Speaker/co-host view — restricted EventBuilderViewV2 (Event L)
26. Anonymous/logged-out public page (Event M)

### Phase 7: EventsListView Card Enhancements
27. Live indicator (pulsing dot + "LIVE NOW")
28. Cancelled card state (greyed out, strikethrough date)
29. "From $X" pricing for multi-tier events
30. "X VIP spots left" urgency indicator
31. Speaker role badge (distinct from hosting)
32. Just-ended card state
33. Skeleton/building draft progress indicator

---

## Part 5: Component Changes Summary

| Component | What Changes |
|-----------|-------------|
| `mockEventData.ts` | Extended interfaces, 13 new events, new registrations, new helpers |
| `UnifiedEventPage.tsx` | New routing logic for 6+ additional states (speaker, live, cancelled, anonymous, just-ended) |
| `EventShell.tsx` | New role `'speaker'`, lifecycle tab indicators, top banner slot |
| `EventBuilderViewV2.tsx` | 7 conditional rendering states based on `lifecycleStage` (skeleton through cancelled) |
| `PublicEventLandingV3Tabbed.tsx` | 7 registration status banners (pending, rejected, waitlisted, live-join, ended, cancelled, anonymous auth-gate) |
| `PostEventView.tsx` | "Materials pending" variant (no recording/resources yet) |
| `EventsListView.tsx` | Live card, cancelled card, multi-tier price, urgency indicators, speaker badge, draft progress |
| `EventCheckoutModal.tsx` | Multi-tier ticket selection, early bird discount, discount code input |

---

## Part 6: What This Plan Does NOT Cover (Future Work)

- Actual registration form builder (custom fields — currently hardcoded)
- Email/notification templates (reminder, follow-up, refund confirmation)
- Certificate generator UI
- Poll/Q&A builder for live events
- Recurring/series events
- In-person check-in with QR codes
- Revenue dashboard / payout management
- Group tickets / team registration
- Calendar sync (Google, Outlook, Apple)
- Embed code generator

These are all documented in EVENT_USER_FLOWS.md and can be built as follow-up sprints.

---

*Last Updated: Feb 17, 2026*

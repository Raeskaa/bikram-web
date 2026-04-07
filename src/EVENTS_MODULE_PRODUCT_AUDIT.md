# Events Module - Comprehensive Product Audit
> PM perspective. No code. Every stage, every action, every gap.
> Last updated: Feb 25, 2026

---

## Table of Contents
1. [Event Lifecycle Stages](#1-event-lifecycle-stages)
2. [Onboarding & Empty States](#2-onboarding--empty-states)
3. [Event Creation Flows](#3-event-creation-flows)
4. [Builder (Drafting & Building)](#4-builder-drafting--building)
5. [Publishing](#5-publishing)
6. [Marketing & Invitations](#6-marketing--invitations)
7. [Hosting (Live Event)](#7-hosting-live-event)
8. [Post-Event](#8-post-event)
9. [Learner Journey (Full)](#9-learner-journey-full)
10. [Contextual Leapy AI Per Stage](#10-contextual-leapy-ai-per-stage)
11. [Complete Action Matrix: Manual vs Leapy](#11-complete-action-matrix-manual-vs-leapy)
12. [Feature Inventory: Built vs Planned vs Missing](#12-feature-inventory-built-vs-planned-vs-missing)
13. [Gaps & Problems](#13-gaps--problems)

---

## 1. Event Lifecycle Stages

```
[Create] -> [Skeleton] -> [Building] -> [Ready] -> [Published] -> [Live] -> [Ended] -> [Archived]
                                                         |
                                                         +-> [Cancelled]
```

| Stage | Who sees it | What it means |
|-------|------------|---------------|
| **Skeleton** | Creator only | Just created. Title + date + maybe description. Everything else empty. |
| **Building** | Creator only | Partially filled. Some sections done, warnings on missing pieces. |
| **Ready** | Creator only | All required fields complete. Ready to publish. Final review state. |
| **Published** | Everyone | Live on the platform. Accepting registrations. Public page active. |
| **Live** | Everyone | Event is happening right now. Meeting room active. |
| **Ended** | Everyone | Event finished. Post-event tasks begin. Materials pending or available. |
| **Archived** | Creator only | Old event moved to archive. No longer shown in active lists. |
| **Cancelled** | Everyone | Cancelled by creator. Refunds processing. Greyed out in lists. |

---

## 2. Onboarding & Empty States

### 2a. First-time user lands on Events section

| Element | Current State | What Should Happen |
|---------|--------------|-------------------|
| Empty Events List | SectionEmptyState component exists, used for `empty@email.com` | Shows illustration + "Create your first event" CTA + "Or browse events" |
| Guided prompt | None | Leapy should greet: "Want to create an event? I can help you set one up in under 2 minutes." |
| Template suggestions | EventTemplatesLibrary exists as a modal | Should surface 3-4 popular templates directly in the empty state, not hidden behind a button |
| Sample/demo event | None | Consider showing a "Sample Event" card that users can click to explore the builder without committing |

### 2b. Empty states within the Builder (per tab)

| Tab | Empty State Exists? | Quality |
|-----|---------------------|---------|
| Overview | Completion checklist exists in master plan spec | Specced in plan, partially built in V2 |
| Schedule | Specced in plan ("No sessions added yet") | Not built as a distinct empty state |
| Attendees | Specced in plan ("No registrations yet") | Not built as a distinct empty state |
| Tickets | Specced in plan ("Pricing not configured") | Not built as a distinct empty state |
| Discussion | Exists (DiscussionChannelV2) | Has empty state |
| Analytics | Specced in plan | Not built as a distinct empty state |
| AI Hub | Exists (EventAIHub) | Has content |
| Settings | Exists (EventSettings) | Has content (always has fields) |
| Speakers | Exists (SpeakersTeamTable) | Has empty state |
| Registration Form | Exists (RegistrationFormBuilder) | Has default fields |

### 2c. Empty states in EventsListView tabs

| Tab | Empty State | Status |
|-----|------------|--------|
| All Events | "No events yet" | Exists via SectionEmptyState |
| My Events | "You haven't created any events" | Needs verification |
| Registered | "You haven't registered for any events" | Needs verification |
| Drafts | "No drafts" | Needs verification |
| Past | "No past events" | Needs verification |

---

## 3. Event Creation Flows

### 3a. With Leapy (AI-assisted)

```
"Create with AI" button
  -> EventSetupSteps (3-step flow)
     Step 1: Event title (suggestions appear after typing)
     Step 2: Date, time, end time, type (virtual/in-person/hybrid), location
     Step 3: Description (suggestions appear after typing)
  -> ChatFlow (conversational refinement)
  -> EventGenerationPreview (loading + preview)
  -> EventBuilderViewV2 (lands in builder, pre-filled)
```

**Current status:** Fully wired. Suggestion cards redesigned (5 per batch, feedback card on thumbs-down, hidden until typing).

**Problems:**
- EventGenerationPreview shows a fake "generating" animation (4.8s) but says "10-15 seconds" at the bottom
- The preview page shows the event title TWICE (hero banner + info section below)
- "Regenerate Header" button does nothing — `headerVersion` state is unused
- Suggested Schedule has no accept/reject/regenerate mechanism (we just added "Use This" but it has no handler)
- No "Back" button — user can't go back to fix things
- Date shown as raw `2026-03-15` instead of formatted
- Category detected by AI but not displayed anywhere on the preview
- Event type badge (Virtual/In-Person/Hybrid) not shown on preview

### 3b. Without Leapy (Manual)

```
"Create Manually" button (in EventsListView)
  -> ManualEventCreateModal (quick form: title, date, time, type, description)
  -> EventBuilderViewV2 (lands in builder, pre-filled with basics)
```

**Current status:** Wired. ManualEventCreateModal flows through App.tsx to open V2.

**Problems:**
- No template picker in the manual flow — user starts completely from scratch
- No option to "switch to AI" mid-creation if they change their mind
- ManualEventCreateModal doesn't capture capacity, visibility, or paid/free

### 3c. From Templates

```
EventTemplatesLibrary (modal)
  -> Pick a template
  -> Pre-fills builder fields
  -> EventBuilderViewV2
```

**Current status:** Component exists. Has templates for Workshop, Webinar, Conference, etc.

**Problems:**
- Only accessible as a modal — not surfaced during creation flow
- No integration with the AI flow (Leapy could suggest templates)
- Templates don't pre-fill schedule/speakers — only basic fields

---

## 4. Builder (Drafting & Building)

### 4a. Builder Tabs (EventBuilderViewV2 via EventShell)

| Tab | Component | What it does |
|-----|-----------|-------------|
| Overview | EventBuilderOverviewSection | Event details, completion checklist, preview card |
| Schedule | Built into V2 | Session management, drag to reorder, add breaks |
| Attendees | Built into V2 (EventsCRM pattern) | Registration list, waitlist, export |
| Tickets | Built into V2 | Ticket tiers, pricing, discount codes |
| Discussion | DiscussionChannelV2 | Chat/forum for event |
| Analytics | Built into V2 | Charts, metrics, conversion funnel |
| AI Hub | EventAIHub | AI suggestions, generation tools |
| Settings | EventSettings | Branding, visibility, meeting link, reminders |
| Speakers | SpeakersTeamTable | Add/manage speakers and team |
| Registration | RegistrationFormBuilder | Custom form fields |

### 4b. Completion Checklist (specced but how much is built?)

The master plan defines a 9-item checklist:
1. Event title
2. Description
3. Date & time
4. Cover image
5. Agenda/schedule
6. Speakers
7. Tickets/pricing
8. Registration form
9. Location details

**Status:** Data model has `completionChecklist` on Event interface. Helper functions `getEventCompletionPercent` and `getEventCompletionCount` exist in mockEventData.ts. The checklist UI rendering in V2's Overview tab needs verification for completeness.

### 4c. Inline editing

| Field | Inline edit? | Status |
|-------|-------------|--------|
| Title | Yes | Built in V2 (click to edit) |
| Description | Yes | Built in V2 |
| Date/Time | Via popover | Built in V2 |
| Cover image | Upload button | Built in V2 |
| Location | Via settings | Built |
| Capacity | Via field | Built |

---

## 5. Publishing

### 5a. Publish Flow

```
Builder (Ready state) -> "Publish" button
  -> Publish confirmation (what happens when you publish)
  -> Event goes live -> Public URL active -> Registrations open
```

**What exists:**
- Publish button in V2 header
- StatusBanner component (EventStatusBanner)
- Lifecycle stage transitions in mock data

**What's missing:**
- No "Schedule Publish for Later" (specced in master plan, not built)
- No final review checklist modal before publishing
- No publish confirmation dialog explaining consequences
- No "Preview Public Page" flow that shows exactly what learners will see
- No SEO/meta preview (title, description, social card preview)

### 5b. Post-Publish Editing

**What exists:** Full editing in V2 continues after publishing.

**What's missing:**
- No warning when editing a live/published event ("23 people have already registered — changes will notify them")
- No version history / undo for published events
- No "unpublish" flow (take event back to draft)

---

## 6. Marketing & Invitations

### 6a. Available Marketing Tools

| Tool | Component | Status |
|------|-----------|--------|
| Share link | Share button in V2 header | Built (basic copy link) |
| Social media pack | SocialPackGenerator | Built (Instagram, LinkedIn, Twitter, Facebook templates) |
| Email invitations | Not distinct | Specced in AI Hub, no dedicated flow |
| Embed widget | None | Not built |
| QR code | None | Not built |
| Referral/affiliate links | None | Not built |
| Newsletter integration | NewsletterAutomation exists | Exists but for general use, not event-specific |

### 6b. Invitation Flow

```
Creator wants to invite people:
  -> Share link (copy URL)
  -> Social pack (generate images for social media)
  -> Email blast (???)
  -> Direct invite (???)
```

**What's missing:**
- No "Invite by email" — enter email addresses, send invitation emails
- No "Invite from contacts" — pull from existing community members
- No invitation tracking — who was invited, who opened, who registered
- No "Remind registered" — send reminder to people who already registered
- No bulk invite from CSV
- No co-marketing with community (cross-post to community channel)

---

## 7. Hosting (Live Event)

### 7a. Pre-Event (Day of)

| Feature | Status |
|---------|--------|
| Countdown on event page | Not built |
| "Event starts in X minutes" banner | Not built |
| Speaker backstage / green room | Specced (EventWaitingRoom exists) |
| Tech check (mic/camera test) | EventWaitingRoom has this |
| Pre-event announcements to registered | Not built |

### 7b. During Live Event

| Feature | Component | Status |
|---------|-----------|--------|
| Meeting room (Leapcast) | EventMeetingRoom | Built (video, chat, screen share, reactions, polls) |
| Live dashboard (creator) | Specced in master plan | Not built as distinct view |
| Live attendee count | Specced | Data model ready, UI not built |
| Live polls | In EventMeetingRoom | Built |
| Q&A queue | In EventMeetingRoom | Partial |
| Raise hand | In EventMeetingRoom | Built |
| Recording | In EventMeetingRoom | Toggle exists |
| Breakout rooms | None | Not built |
| Live chat moderation | EventMeetingRoom | Basic chat exists |
| Minimized meeting window | MinimizedMeetWindow | Built |
| "Current session" tracker | Specced in master plan | Not built |
| Quick actions (mute all, pin, announce) | Specced | Not built |

### 7c. Event End

| Feature | Status |
|---------|--------|
| "End Event" button | In meeting room |
| Transition to post-event | Specced (lifecycle -> 'ended') |
| Auto-stop recording | Not built |
| Immediate feedback prompt to attendees | Not built |

---

## 8. Post-Event

### 8a. Creator Post-Event

| Task | Component | Status |
|------|-----------|--------|
| Post-event todo checklist | Specced in master plan (5 items) | Data model ready, UI in PostEventView partial |
| Upload recording | Specced | Not a distinct upload flow |
| Send follow-up email | Specced | No email composer |
| Publish resources/slides | Specced | Not a distinct upload flow |
| Issue certificates | Specced | Not built |
| Send feedback survey | Specced | Not built |
| Attendance report | Specced with full data model | PostEventView has basic stats |
| Export attendee data | Specced | Not built |
| Clone event (run it again) | Specced in cancelled/sold-out views | Not built |
| Archive event | Lifecycle stage exists | No UI trigger |

### 8b. Learner Post-Event

| Feature | Component | Status |
|---------|-----------|--------|
| Watch recording | PostEventView | Built (if recording exists) |
| Download resources | PostEventView | Built |
| Leave review/rating | PostEventView | Built (star rating + text) |
| Get certificate | Specced | Not built |
| "Notify me when recording is ready" | Specced in master plan | Not built |
| Browse similar events | Specced | Not built |
| Chat replay | PostEventView | Built (mock messages) |
| Add to calendar (past — for series) | Not applicable | N/A |

---

## 9. Learner Journey (Full)

### 9a. Discovery

| Path | Status |
|------|--------|
| Browse EventsListView | Built |
| Search events | Built (search bar in toolbar) |
| Filter by type/date/price/status | Built |
| View event card | Built |
| EventsMarketplace (explore) | Component exists |
| Recommended events | Not built |
| "Events for you" personalization | Not built |

### 9b. Event Detail Page (Public Landing)

| Element | Status |
|---------|--------|
| Event info (title, date, description) | Built (PublicEventLanding + V5Tabbed) |
| Speaker bios | Built |
| Schedule/agenda | Built |
| Registration CTA | Built |
| Sold out / waitlist state | Specced, partially built |
| Application (screened) state | Specced, partially built |
| Already registered state | Specced, partially built |
| Waitlisted state | Specced with position tracker |
| Rejected state | Specced |
| Cancelled state | Specced |
| Anonymous/logged-out state | Specced, partially built |
| Add to Calendar | AddToCalendar component exists |
| Share event | Built |

### 9c. Registration Flow

| Step | Status |
|------|--------|
| Click "Register" | Built |
| Fill registration form | Built (EventRegistrationForm) |
| Ticket selection (paid) | EventCheckoutModal exists |
| Apply discount code | In checkout modal |
| Payment | Mocked in checkout |
| Confirmation screen | Basic |
| Confirmation email | Not built (would be backend) |
| Add to calendar prompt | AddToCalendar exists |
| "What to expect" post-registration | Not built |

### 9d. Registration States (per learner)

| State | Banner/CTA | Built? |
|-------|-----------|--------|
| Not registered | "Register" / "Get Tickets" | Built |
| Confirmed | "You're registered" + calendar | Partial |
| Waitlisted | Position indicator + leave option | Specced, not built |
| Applied (screened) | "Application under review" | Specced, not built |
| Rejected | "Not accepted" + message | Specced, not built |
| Cancelled by user | "You cancelled" + re-register option | Not built |
| Event cancelled | "Cancelled" + refund info | Specced, not built |

---

## 10. Contextual Leapy AI Per Stage

### How Leapy should show up at each stage:

| Stage | Where Leapy Appears | What Leapy Offers |
|-------|---------------------|-------------------|
| **Empty State** | Inline in EventsListView empty state | "Want to create an event? I can help." + template suggestions |
| **Creation** | EventSetupSteps + ChatFlow | Title suggestions, description writing, smart defaults for date/time/capacity |
| **Skeleton** | Builder Overview tab - AI suggestions card | "Your event has no agenda. Want me to generate one?" / "Add speakers to boost registrations by 40%" |
| **Building** | Builder Overview tab + per-tab hints | "Your 2 sessions total 90min — consider adding breaks" / "Similar events charge $45-65, consider a VIP tier" |
| **Ready** | Builder Overview tab | "Everything looks good! Here's a preview of your public page." / "Want me to draft a launch announcement?" |
| **Published (pre-event)** | AI Hub + inline suggestions | "12 people registered in 24h — that's above average" / "Want me to generate a social media pack?" / "Send a reminder 24h before?" |
| **Published (marketing)** | SocialPackGenerator, email drafts | Generate promo copy, social images, email sequences, reminder schedules |
| **Live** | Meeting room sidebar | Real-time suggestions: "Engagement is dropping — consider launching a poll" / "8 unanswered questions in Q&A" |
| **Post-Event (creator)** | Post-event checklist | "Want me to draft a follow-up email?" / "Generate a certificate template?" / "Create a feedback survey?" |
| **Post-Event (learner)** | Event page | "Based on this event, you might like..." / "Leave a review to help others" |
| **Cancelled** | Cancellation flow | "Draft a cancellation notice for attendees?" / "Want to reschedule instead of cancel?" |

### Leapy Contextual Panel (CopilotPanel) Integration

The CopilotPanel/AIChatPanelV2 exists but its context-awareness per stage needs work:
- Currently: Generic AI chat that can answer questions
- Should be: Stage-aware suggestions that change based on lifecycle + completion state
- Example: When on Schedule tab with 0 sessions, Leapy should proactively say "I can generate a schedule based on your event description. Want me to try?"

---

## 11. Complete Action Matrix: Manual vs Leapy

### Creation & Setup

| Action | Manual (user does it) | With Leapy (AI does it) | Status |
|--------|----------------------|------------------------|--------|
| Write event title | Type in text field | Leapy suggests 5 titles based on topic | Both built |
| Write description | Type in textarea | Leapy writes description from title + context | Both built |
| Set date & time | Pick from date/time pickers | Leapy suggests optimal time based on audience timezone | Manual built, AI suggestion not built |
| Choose event type | Select virtual/in-person/hybrid | Leapy recommends based on content type | Manual built, AI not built |
| Set capacity | Enter number | Leapy recommends based on event type + historical data | Manual built, AI not built |
| Detect category | N/A (auto-detected) | AI auto-detects from title + description | Built |
| Set pricing | Configure ticket tiers manually | Leapy suggests pricing based on similar events | Manual built, AI suggestion specced but not built |
| Create schedule/agenda | Add sessions one by one | Leapy generates full agenda from description | Manual built, AI built in generation preview only |
| Add speakers | Search/invite manually | Leapy suggests speakers from community | Manual built, AI not built |
| Build registration form | Drag and drop fields | Leapy suggests relevant fields based on event type | Manual built, AI not built |
| Upload cover image | File upload | Leapy generates header (specced, Regenerate Header button exists but non-functional) | Manual built, AI not built |
| Set up reminders | Configure in settings | Leapy sets up smart reminder sequence | Manual exists in settings, AI not built |
| Configure branding | Color picker + options | Leapy applies branding from community theme | Manual built, AI not built |

### Marketing & Promotion

| Action | Manual (user does it) | With Leapy (AI does it) | Status |
|--------|----------------------|------------------------|--------|
| Write social media posts | Type copy manually | Leapy generates platform-specific copy | SocialPackGenerator built |
| Create social images | Upload own images | Leapy generates sized images per platform | SocialPackGenerator built |
| Write email invitation | Compose manually | Leapy drafts invitation email | Not built |
| Send reminders | Manual trigger | Leapy auto-sends at optimal times | Not built |
| Suggest promotion timing | N/A | Leapy recommends best times to post | Not built |
| A/B test event title | Manually create variants | Leapy generates A/B variants | Not built |
| Track invitation performance | View analytics | Leapy highlights what's working | Analytics tab exists, AI analysis not built |

### During Event (Hosting)

| Action | Manual (user does it) | With Leapy (AI does it) | Status |
|--------|----------------------|------------------------|--------|
| Start meeting | Click start button | Auto-start at scheduled time | Manual built |
| Manage participants | Mute/unmute/remove manually | Leapy auto-mutes noisy participants | Manual built, AI not built |
| Run polls | Create and launch manually | Leapy suggests polls based on topic | Manual built, AI not built |
| Moderate chat | Read and moderate manually | Leapy flags inappropriate messages | Not built |
| Track engagement | View metrics | Leapy alerts when engagement drops | Not built |
| Answer Q&A | Read and respond manually | Leapy drafts answers, host approves | Not built |
| Take notes/summary | Manual notes | Leapy generates real-time summary | Not built |
| Record event | Toggle recording | Auto-record with AI chapters | Toggle built, AI chapters not built |

### Post-Event

| Action | Manual (user does it) | With Leapy (AI does it) | Status |
|--------|----------------------|------------------------|--------|
| Upload recording | File upload | Auto-upload from Leapcast recording | Not built |
| Send follow-up email | Write and send manually | Leapy drafts personalized follow-up | Not built |
| Create feedback survey | Build form manually | Leapy generates relevant survey questions | Not built |
| Issue certificates | Design and send manually | Leapy generates certificates from template | Not built |
| Publish resources | Upload files manually | Auto-organize shared materials from meeting | Not built |
| Generate attendance report | View analytics | Leapy generates summary with insights | Data model ready, AI analysis not built |
| Suggest next event | Decide on own | Leapy suggests "Run this again?" or "Try this follow-up topic" | Not built |
| Process refunds (cancelled) | Manually initiate | Auto-process based on refund policy | Not built |
| Clone event | Manual duplicate | Leapy clones with suggested date/improvements | Specced, not built |

### Ongoing / Cross-cutting

| Action | Manual (user does it) | With Leapy (AI does it) | Status |
|--------|----------------------|------------------------|--------|
| Manage waitlist | Review and promote manually | Leapy auto-promotes when spots open | Manual specced, AI not built |
| Handle cancellations | Process manually | Leapy handles notification + refund chain | Not built |
| Link event to community | Manual link via modal | Leapy suggests relevant community | LinkContentModals exists, AI not built |
| Duplicate event | Manual clone | Smart clone with new date suggestions | Not built |
| Archive event | Manual action | Auto-archive after X days post-event | Not built |

---

## 12. Feature Inventory: Built vs Planned vs Missing

### Legend
- BUILT = Component exists and is wired into the app
- PARTIAL = Component exists but incomplete or not fully wired
- SPECCED = Designed in master plan docs but not built
- MISSING = Not even specced yet, identified as a gap

### Core Infrastructure

| Feature | Status | Component |
|---------|--------|-----------|
| Event data model (full) | BUILT | mockEventData.ts |
| Lifecycle stages | BUILT | EventLifecycleStage type |
| Role-based routing | BUILT | UnifiedEventPage.tsx |
| Completion checklist (data) | BUILT | EventCompletionChecklist interface |
| Registration model | BUILT | Registration interface |
| Mock events (13 lifecycle states) | PARTIAL | Some mock events exist, not all 13 from plan |

### Creation

| Feature | Status | Notes |
|---------|--------|-------|
| AI-assisted 3-step flow | BUILT | EventSetupSteps.tsx |
| AI chat refinement | BUILT | ChatFlow.tsx |
| Generation preview | BUILT | EventGenerationPreview.tsx (has problems, see section 3a) |
| Manual creation modal | BUILT | ManualEventCreateModal.tsx |
| Template library | BUILT | EventTemplatesLibrary.tsx |
| Template integration into creation flow | MISSING | Templates are a standalone modal, not part of creation flow |

### Builder

| Feature | Status | Notes |
|---------|--------|-------|
| Overview tab | BUILT | EventBuilderOverviewSection.tsx |
| Schedule tab | BUILT | Inline in V2 |
| Attendees tab | BUILT | Inline in V2 |
| Tickets tab | BUILT | Inline in V2 |
| Discussion tab | BUILT | DiscussionChannelV2.tsx |
| Analytics tab | BUILT | Inline in V2 |
| AI Hub tab | BUILT | EventAIHub.tsx |
| Settings tab | BUILT | EventSettings.tsx |
| Speakers tab | BUILT | SpeakersTeamTable.tsx |
| Registration form tab | BUILT | RegistrationFormBuilder.tsx |
| Completion checklist UI | PARTIAL | Helpers exist, full UI needs verification |
| Inline editing | BUILT | Title, description, date/time |
| Preview modal | BUILT | PreviewModal.tsx |
| Publish flow | PARTIAL | Button exists, no confirmation dialog |
| Status banner | BUILT | EventStatusBanner.tsx |

### Public / Learner Pages

| Feature | Status | Notes |
|---------|--------|-------|
| Public event landing | BUILT | PublicEventLanding.tsx + V1-V5 Tabbed variants |
| Registration form | BUILT | EventRegistrationForm.tsx |
| Checkout modal (paid) | BUILT | EventCheckoutModal.tsx |
| Add to calendar | BUILT | AddToCalendar.tsx |
| Waitlist join | PARTIAL | WaitlistManagement.tsx exists |
| Post-event view (learner) | BUILT | PostEventView.tsx |

### Hosting

| Feature | Status | Notes |
|---------|--------|-------|
| Meeting room | BUILT | EventMeetingRoom.tsx |
| Waiting room | BUILT | EventWaitingRoom.tsx |
| Minimized meeting | BUILT | MinimizedMeetWindow.tsx |
| Live polls | BUILT | In EventMeetingRoom |
| Screen sharing | BUILT | In EventMeetingRoom |
| Chat | BUILT | In EventMeetingRoom |
| Live dashboard (creator) | SPECCED | Master plan Event I, not built |
| Breakout rooms | MISSING | Not specced |

### Marketing

| Feature | Status | Notes |
|---------|--------|-------|
| Social media pack generator | BUILT | SocialPackGenerator.tsx |
| Share link | BUILT | In V2 header |
| Email invitation | MISSING | No component |
| QR code | MISSING | Not built |
| Embed widget | MISSING | Not built |

### Post-Event

| Feature | Status | Notes |
|---------|--------|-------|
| Post-event view (creator) | PARTIAL | PostEventView.tsx exists but oriented toward learner |
| Attendance report | PARTIAL | Data model ready, basic stats in PostEventView |
| Recording playback | BUILT | In PostEventView |
| Certificate generation | MISSING | Not built |
| Feedback survey | MISSING | Not built |
| Follow-up email composer | MISSING | Not built |
| Clone/repeat event | SPECCED | In master plan, not built |

---

## 13. Gaps & Problems

### Critical Gaps (blocks core user flow)

1. **No publish confirmation flow** — Creator clicks Publish but there's no review step, no "here's what will happen" dialog, no ability to schedule publish for later.

2. **No proper registration states for learners** — The 6 registration states (none, confirmed, waitlisted, applied, rejected, cancelled-by-user) are fully specced with beautiful wireframes in the master plan but not built in the actual public landing pages.

3. **EventGenerationPreview is broken** — Regenerate Header does nothing, title shows twice, dates display raw, schedule has no accept/reject mechanism, timing text is wrong, no back button.

4. **No invitation/email flow** — Creators can create events but have no way to invite people directly. No "invite by email", no "invite community members", no invitation tracking.

5. **No live event dashboard** — When an event is live, the creator sees... the regular builder? The master plan specced a full live dashboard with real-time stats, current session tracker, quick actions. None of this is built.

6. **Post-event creator experience barely exists** — The todo checklist (upload recording, send follow-up, certificates, feedback survey, publish resources) is fully specced but has no actual UI for any of those tasks. Creator has no way to complete any post-event task.

### Major Gaps (significantly impacts experience)

7. **Leapy is not contextual per stage** — The AI chat/copilot is the same regardless of whether you're in skeleton stage or post-event. It should be proactively offering stage-relevant suggestions.

8. **Builder doesn't visually change per lifecycle stage** — Skeleton should look very different from Building which should look different from Published. Currently it's the same builder view regardless.

9. **No lifecycle stage transitions in UI** — There's no visual flow showing the user "you're here in the lifecycle" and what comes next. The completion checklist partially does this for pre-publish, but nothing for post-publish stages.

10. **Templates not integrated into creation flow** — Templates exist in a modal but aren't offered during the "Create with AI" or "Create Manually" flows. They're a separate entry point that users might never find.

11. **No "Preview as Learner" in builder** — PreviewModal exists but it's unclear if it actually renders the PublicEventLanding view. Creator needs to see exactly what a learner will see.

12. **Calendar view exists but isn't connected** — CalendarView.tsx exists but its integration with events (showing your events on a calendar) needs verification.

### UX Gaps (paper cuts and polish)

13. **PublicEventLanding has 6 versions (V1-V5 + original)** — Which one is actually used? This creates confusion. Need to consolidate to one definitive version.

14. **Duplicate event title in EventGenerationPreview** — Shows once in hero, once in info section below. Redundant.

15. **No date formatting** — Raw dates like "2026-03-15" shown instead of "March 15, 2026" in multiple places.

16. **No event type/category badges on cards and preview** — The type (Virtual/In-Person/Hybrid) and AI-detected category aren't prominently displayed.

17. **Quick Stats (0/0/0) in generation preview** — Always zero at generation time. Adds no value. Replace with something useful.

18. **5 PublicEventLanding variants** — V1Tabbed through V5Tabbed plus the original. Which is canonical? This is tech debt that creates PM confusion.

19. **Sparkles icon still in some files** — OnboardingFlow.tsx, EventTemplatesLibrary.tsx, PublicEventLandingV5Tabbed.tsx still use Sparkles instead of Wand2 for AI features.

### Feature Gaps (opportunities)

20. **No recurring/series events** — Can't create "Weekly standup" or "Monthly town hall" as a series.

21. **No event duplication/cloning** — Specced in master plan for sold-out and cancelled events, not built.

22. **No co-hosting / collaborative editing** — Multiple creators can't edit the same event simultaneously.

23. **No attendee communication** — Can't message all registered attendees, send updates, or announcements outside of the event discussion tab.

24. **No mobile-responsive event creation** — Creation flow likely doesn't work well on mobile.

25. **No accessibility audit** — Event pages need ARIA labels, keyboard navigation, screen reader support verification.

26. **No internationalization** — All text is hardcoded English. No i18n support for global events.

27. **No timezone handling** — Events show times without timezone context. Critical for virtual events with global audiences.

28. **No event analytics pre-publish** — Can't see "how many people have viewed my draft" or interest signals.

---

## Priority Recommendations

### P0 — Must fix before any demo
1. Fix EventGenerationPreview (broken regenerate, duplicate title, raw dates)
2. Build publish confirmation flow
3. Build at least 3 registration state banners (confirmed, waitlisted, cancelled)

### P1 — Core experience gaps
4. Make Leapy contextual per lifecycle stage
5. Build invitation/email flow
6. Build post-event creator checklist with actionable tasks
7. Consolidate PublicEventLanding to one canonical version

### P2 — Enhancement & polish
8. Integrate templates into creation flow
9. Build live event dashboard
10. Add timezone support
11. Date formatting everywhere

### P3 — Future features
12. Recurring events
13. Event cloning
14. Certificate generation
15. Feedback survey builder
16. Breakout rooms

---

*This is a living document. Update as features are built and new gaps are identified.*

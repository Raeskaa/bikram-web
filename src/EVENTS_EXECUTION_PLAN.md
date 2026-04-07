# Events Module - Execution Plan (Today)
> Frontend prototype only. No backend. Every step is a self-contained unit.
> Each step lists exactly what files to touch and what "done" looks like.

---

## Ground Rules
- We're building a **clickable prototype** for the dev team
- Mock data, fake responses, simulated delays — all fine
- Every action should feel real even if nothing persists
- Toast confirmations for every action so the flow feels complete
- No new pages unless absolutely necessary — extend existing components
- Test each step before moving to the next

---

## Phase 1: Fix What's Broken (Foundation)
> ~45 min. Nothing new, just fixing existing broken things.

### Step 1.1 — Fix EventGenerationPreview
**Files:** `EventGenerationPreview.tsx`
**Fixes:**
- [ ] Remove duplicate title (keep hero only, remove info section repeat)
- [ ] Format dates human-readable ("March 15, 2026 at 2:00 PM" not "2026-03-15")
- [ ] Format times human-readable
- [ ] Fix loading text ("Generating your event..." remove the "10-15 seconds" lie, or match animation duration)
- [ ] Make "Regenerate Header" actually cycle through 3-4 mock header variants (color scheme / layout changes)
- [ ] Remove Quick Stats section (0/0/0 — useless at generation time)
- [ ] Add category badge + event type badge (Virtual/In-Person/Hybrid)
- [ ] Add back button (arrow-left) to return to creation flow
- [ ] "Use This" on schedule: clicking it changes button to checkmark + "Schedule Applied" (confirmed state), disables the button
- [ ] Add "Regenerate Schedule" button next to schedule heading
- [ ] Make next-step chips clickable — each one calls `onProceed()` or navigates to the builder on the relevant tab
- [ ] Remove dead "Register for Event" button

**Done when:** Preview page shows clean formatted data, all buttons do something, no dead UI.

### Step 1.2 — Date Formatting Utility
**Files:** Create `utils/formatters.ts` (or add to existing utils)
**What:**
- [ ] `formatEventDate(dateStr)` → "March 15, 2026"
- [ ] `formatEventTime(timeStr)` → "2:00 PM EST"
- [ ] `formatEventDateTime(dateStr, timeStr)` → "March 15, 2026 at 2:00 PM EST"
- [ ] `formatRelativeTime(dateStr)` → "in 3 days" / "2 hours ago"
- [ ] Use this everywhere dates appear raw

**Done when:** No raw date strings visible anywhere in the event flow.

### Step 1.3 — Icon Cleanup
**Files:** `OnboardingFlow.tsx`, `EventTemplatesLibrary.tsx`, `PublicEventLandingV5Tabbed.tsx`, `CourseSetupSteps.tsx`
**What:**
- [ ] Replace all `Sparkles` with `Wand2` for AI features
- [ ] Quick sweep — should be 4-5 files max

**Done when:** Zero `Sparkles` imports in any event-related file (Courses too since noted in background).

---

## Phase 2: Publish Flow (The Big Missing Piece)
> ~30 min. Creator finishes building → publishes.

### Step 2.1 — Publish Confirmation Dialog
**Files:** `EventBuilderViewV2.tsx`
**What:**
- [ ] When clicking "Publish" button, show a Dialog (not just instant publish)
- [ ] Dialog content:
  - Event title, date, type as summary
  - "When you publish:" bullet list (visible on explore page, URL becomes shareable, registrations open, Leapcast room auto-provisioned if virtual)
  - Completion status: "9/9 steps complete" (or warning if incomplete: "3 items still missing — publish anyway?")
  - Two CTAs: [Publish Now] and [Schedule for Later]
  - "Schedule for Later" shows a date/time picker (mockup — just saves to state)
- [ ] On confirm: toast "Event published!", change lifecycle to 'published', update status badge
- [ ] On schedule: toast "Event scheduled for [date]", show "Scheduled" badge

**Done when:** Clicking Publish opens a real confirmation dialog with all the info. Publishing changes the status visually.

### Step 2.2 — Unpublish / Back to Draft
**Files:** `EventBuilderViewV2.tsx`
**What:**
- [ ] For published events, add a "..." menu with "Unpublish (Back to Draft)" option
- [ ] Confirmation: "This will remove the event from public listings. 23 registered attendees will be notified."
- [ ] On confirm: toast, change lifecycle back to 'draft'

**Done when:** Creator can unpublish a live event.

---

## Phase 3: Builder Lifecycle Awareness
> ~1 hour. Make the builder look different at each stage.

### Step 3.1 — Skeleton State (New Event, Almost Empty)
**Files:** `EventBuilderViewV2.tsx`, `EventBuilderOverviewSection.tsx`
**What:**
- [ ] When `lifecycleStage === 'skeleton'` (completionChecklist has < 4 items done):
  - Overview tab shows the Setup Checklist prominently (full width, not sidebar)
  - Each uncompleted item has a CTA button that navigates to the relevant tab
  - AI Suggestions card below checklist: 3 contextual suggestions based on what's missing
  - Small preview card at bottom showing "This is how your event card will look" (sparse placeholder)
- [ ] Other tabs show empty states with helpful copy + CTA
  - Schedule: "No sessions yet. A well-structured agenda increases attendance by 35%." [Add Session] [Generate with AI]
  - Attendees: "No registrations yet. Publish your event to start accepting registrations." [Preview Public Page] [Publish]
  - Tickets: "Currently set to: Free. Want to monetize?" [Keep Free] [Add Paid Tickets]

**Done when:** Opening a skeleton-stage event feels like an onboarding experience, not a blank page.

### Step 3.2 — Building State (Partially Done)
**Files:** `EventBuilderViewV2.tsx`
**What:**
- [ ] When `lifecycleStage === 'building'` (4-7 items done):
  - Overview shows checklist with progress bar (e.g. 67%)
  - Warnings section: "3 issues to resolve before publishing" with specific items
  - AI suggestions are context-aware: references the specific missing items
  - Publish button is enabled but shows orange warning badge "3 issues"

**Done when:** Mid-build events show progress and clear next steps.

### Step 3.3 — Ready State (All Done, Pre-Publish)
**Files:** `EventBuilderViewV2.tsx`
**What:**
- [ ] When `lifecycleStage === 'ready'` (all 9 items done, still draft):
  - Top banner: "All set — your event is ready to publish!"
  - Overview shows final review checklist (all green checks with summary values)
  - Publish confirmation panel inline (not just button) with preview
  - AI suggestion: "Want me to draft a launch announcement?" / "Generate a social media pack?"

**Done when:** Ready state feels like a celebration — everything done, just hit publish.

### Step 3.4 — Published State Banner
**Files:** `EventBuilderViewV2.tsx`
**What:**
- [ ] When `lifecycleStage === 'published'`:
  - Top info bar: "Published on [date] — [X] registered, [Y] spots remaining"
  - Show public URL with copy button
  - Quick actions: [View Public Page] [Share] [Send Invites]
  - Warning if editing: "Changes will be visible immediately to [X] registered attendees"

**Done when:** Published events clearly show they're live with key stats.

### Step 3.5 — Live State Dashboard
**Files:** `EventBuilderViewV2.tsx`
**What:**
- [ ] When `lifecycleStage === 'live'`:
  - Pulsing red "LIVE" indicator in header
  - Top banner with real-time stats (watching now, registered total, chat messages)
  - Current session tracker with progress bar
  - Quick actions: [Open Leapcast Control Room] [Launch Poll] [Pin Message] [End Event]
  - Replace Overview tab content with live dashboard (stat cards, attendance sparkline, engagement metrics)
- [ ] "End Event" button with confirmation → transitions to 'ended'

**Done when:** Live events have a command-center feel with mock real-time data.

### Step 3.6 — Ended State (Post-Event Creator)
**Files:** `EventBuilderViewV2.tsx`
**What:**
- [ ] When `lifecycleStage === 'ended'`:
  - Top banner: "Event ended [time ago] — [X] of [Y] attended ([Z]% show rate)"
  - Post-event todo checklist (5 items from master plan):
    1. Upload recording → opens file upload mockup → toast "Recording uploaded"
    2. Send follow-up email → opens simple email composer (to: all attendees, subject prefilled, body textarea, [Send] button → toast)
    3. Publish resources → opens resource upload area → toast
    4. Configure certificates → opens simple template picker → toast
    5. Send feedback survey → opens survey builder or "Use default survey" → toast
  - Each todo: checkbox + title + action button + status
  - Progress: "2 of 5 tasks complete"
  - Below checklist: Attendance report card (registered, attended, show rate, engagement score)

**Done when:** Creator has a clear post-event workflow with actionable (mocked) tasks.

### Step 3.7 — Cancelled State
**Files:** `EventBuilderViewV2.tsx`
**What:**
- [ ] When `lifecycleStage === 'cancelled'`:
  - Greyed-out styling, muted colors
  - Top banner: "Event cancelled on [date]" with reason
  - Refund status bar (X refunds processed / Y total, progress bar)
  - Actions: [View Refund Details] [Clone as New Event] [Delete Event]
  - All tabs read-only, editing disabled

**Done when:** Cancelled events show clear status with refund tracking and next-step options.

---

## Phase 4: Learner Registration States
> ~1 hour. Make the public event page respond to registration status.

### Step 4.1 — Consolidate Public Landing
**Files:** Review `PublicEventLanding.tsx` and V1-V5 variants
**What:**
- [ ] Determine which version is actually rendered (trace from UnifiedEventPage.tsx)
- [ ] Pick the best one as canonical
- [ ] Ensure it accepts registration status as prop and conditionally renders

**Done when:** One canonical public landing, no confusion about which version is used.

### Step 4.2 — Registration State: Not Registered (Default)
**Files:** Canonical `PublicEventLanding.tsx`
**What:**
- [ ] Default CTA: "Register" (free) or "Get Tickets" (paid)
- [ ] Shows capacity bar if applicable
- [ ] Already works — just verify it's clean

### Step 4.3 — Registration State: Confirmed
**What:**
- [ ] Replace CTA with: "You're Registered!" (green check) card
- [ ] Show registration date, ticket type (if paid)
- [ ] Actions: [Add to Calendar] [View Ticket / Confirmation] [Cancel Registration]
- [ ] If event is upcoming: countdown "Event starts in 3 days"

### Step 4.4 — Registration State: Waitlisted
**What:**
- [ ] Banner: "You're on the Waitlist — Position #3 of 7"
- [ ] Visual position indicator (numbered dots)
- [ ] Info: "When a spot opens, you'll be notified. You'll have 24h to confirm."
- [ ] Notification preferences (email toggle)
- [ ] Action: [Leave Waitlist]

### Step 4.5 — Registration State: Applied (Screened Event)
**What:**
- [ ] Banner: "Application Submitted — Under Review"
- [ ] Status timeline: Applied → Under Review → Decision (with dates)
- [ ] Show what they submitted (form data summary)
- [ ] Action: [Withdraw Application]
- [ ] Note: "Typically reviewed within 3-5 days"

### Step 4.6 — Registration State: Rejected
**What:**
- [ ] Banner: "Application Not Accepted"
- [ ] Organizer's rejection message (if provided)
- [ ] Status timeline with dates
- [ ] Actions: [Browse Similar Events] [Contact Organizer]
- [ ] Limited tabs visible (overview only)

### Step 4.7 — Registration State: Event Cancelled
**What:**
- [ ] Banner: "This Event Has Been Cancelled"
- [ ] Cancellation reason from organizer
- [ ] Refund status (if paid): "Refunded $69 to Visa ending 4242"
- [ ] Actions: [Browse Similar Events] [Contact Organizer]

### Step 4.8 — Anonymous / Logged Out View
**What:**
- [ ] Limited info: title, date, description, speakers (public info only)
- [ ] CTA: "Sign Up to Register" / "Sign In"
- [ ] Schedule, Resources, Chat hidden with "Sign in to see full details"
- [ ] Announcements tab visible (one-way, per product spec)

**Done when:** Each registration state renders a distinct, informative banner with appropriate actions.

---

## Phase 5: Invitations & Marketing
> ~45 min. Give creators a way to tell people about their event.

### Step 5.1 — Invite by Email Modal
**Files:** Create `components/events/InviteModal.tsx`, wire into V2
**What:**
- [ ] Modal triggered from "Invite" button in published event header
- [ ] Email input (comma-separated or one-per-line) + [Add]
- [ ] Shows list of added emails with [Remove] each
- [ ] "Import from community" button (shows mock member list to select from)
- [ ] Message textarea (prefilled with event title + date + link)
- [ ] [Send Invitations] button → toast "12 invitations sent!"
- [ ] Track count: "24 invited, 8 registered (33% conversion)" shown in Analytics tab

**Done when:** Creator can "invite" people and see a mock sent confirmation.

### Step 5.2 — Share Enhancements
**Files:** `EventBuilderViewV2.tsx` (share button area)
**What:**
- [ ] Share dropdown: Copy Link, Email, WhatsApp, Twitter/X, LinkedIn
- [ ] Copy Link: copies mock URL, toast "Link copied!"
- [ ] QR Code: show a generated QR code placeholder in a popover (use a static mock image)
- [ ] Embed code: show a `<iframe>` snippet user can copy

**Done when:** Share has 5+ sharing methods, all with mock functionality.

### Step 5.3 — Reminder System (Mock)
**Files:** `EventSettings.tsx` or new section in V2
**What:**
- [ ] "Automated Reminders" section in Settings:
  - Toggle: "Send reminder 24 hours before" (on by default)
  - Toggle: "Send reminder 1 hour before"
  - Toggle: "Send reminder 15 minutes before"
  - Preview of reminder email (static mockup)
- [ ] For published events with attendees: [Send Custom Reminder Now] → toast

**Done when:** Settings shows reminder configuration; the flow feels like a real feature.

---

## Phase 6: Contextual Leapy AI
> ~1 hour. Make Leapy smart about where you are.

### Step 6.1 — Stage-Aware AI Suggestions Component
**Files:** Create `components/events/LeapyStageSuggestions.tsx`
**What:**
- [ ] Reusable component that takes `lifecycleStage` + `completionChecklist` + `eventData`
- [ ] Returns 3-5 contextual suggestion cards based on current state
- [ ] Each suggestion: icon + text + action button
- [ ] Clicking action either navigates to a tab, opens a modal, or triggers a mock AI generation (toast + simulated result)
- [ ] Uses the same flat card design as EventSetupSteps suggestion cards (5 per batch, thumbs down feedback)

**Suggestions by stage:**

**Skeleton:**
- "Your event has no agenda yet. Most successful workshops have 3-5 sessions. Want me to generate a draft?" [Generate Agenda]
- "Add at least one speaker to boost registrations by ~40%." [Add Speaker]
- "Upload a cover image — events with covers get 3x more clicks." [Upload Image]

**Building:**
- "Your 2 sessions total 90 min. A typical workshop is 2-3 hours. Want me to add more?" [Generate More Sessions]
- "Your ticket is $39. Similar workshops average $45-65. Consider adding a VIP tier." [Add VIP Tier]
- "No registration form configured — using defaults. Want a custom form?" [Build Form]

**Ready:**
- "Everything looks good! Want me to draft a launch announcement?" [Draft Announcement]
- "Generate a social media pack to promote your event?" [Generate Social Pack]
- "Preview your public page one more time before publishing." [Preview]

**Published (pre-event):**
- "12 registrations in 24h — above average! Share on social to keep momentum." [Generate Social Post]
- "Your early bird deadline is in 3 days. Send a reminder?" [Send Reminder]
- "7 people on the waitlist. Consider increasing capacity." [Increase Capacity]

**Live:**
- "Engagement is high! Good time for a poll." [Launch Poll]
- "8 unanswered questions in Q&A. Want me to draft responses?" [Draft Answers]
- "Attendance peaked at 345 — 12 have dropped off in the last 10 min." (info only)

**Ended:**
- "Want me to draft a follow-up email for 58 attendees?" [Draft Follow-Up]
- "Generate a feedback survey? Events with surveys get 60% better repeat attendance." [Create Survey]
- "Your engagement score was 78/100 — here's how to improve next time." [View Tips]

**Cancelled:**
- "Want to reschedule instead? I can clone this event with a new date." [Clone & Reschedule]
- "Draft a cancellation notice for 45 attendees?" [Draft Notice]

**Done when:** Every lifecycle stage shows relevant, helpful AI suggestions. Clicking them does something visible (even if mocked).

### Step 6.2 — Wire Suggestions into EventBuilderViewV2
**Files:** `EventBuilderViewV2.tsx`
**What:**
- [ ] Import and render `LeapyStageSuggestions` in the Overview tab
- [ ] Position below the checklist (skeleton/building) or below the status card (published/live/ended)
- [ ] Ensure it replaces or supplements any existing static suggestion content

**Done when:** Opening any event at any lifecycle stage shows relevant Leapy suggestions in the overview.

---

## Phase 7: Polish & Consolidation
> ~30 min. Final cleanup pass.

### Step 7.1 — EventsListView Card Enhancements
**Files:** `EventsListView.tsx`
**What:**
- [ ] Cards show lifecycle indicators:
  - Draft: "Draft" badge + completion progress ("6/9 steps")
  - Published: attendee count + capacity bar
  - Live: pulsing red dot + "LIVE" + viewer count
  - Ended: "Ended" badge + "Materials pending" or "Recording available"
  - Cancelled: greyed out + "Cancelled" + strikethrough date
- [ ] Creator cards show appropriate CTA: "Continue Building" / "Manage" / "View Dashboard" / "View Report"
- [ ] Learner cards show: "Register" / "Get Tickets" / "Sold Out" / "Join Now" / "Watch Recording"

**Done when:** Event cards in the list view tell you the status at a glance without clicking in.

### Step 7.2 — Timezone Display
**Files:** `utils/formatters.ts`, anywhere time is shown
**What:**
- [ ] All event times show timezone: "2:00 PM EST"
- [ ] Add "(Your timezone)" indicator for clarity
- [ ] Mock timezone conversion: "2:00 PM EST / 11:00 AM PST"

**Done when:** No time is shown without a timezone.

### Step 7.3 — Final Wiring Check
**What:**
- [ ] Walk through the entire flow as Creator (Mahesh): Create → Build → Publish → Share → Host → End → Post-event
- [ ] Walk through the entire flow as Learner (Sarah): Browse → View → Register → Attend → Post-event
- [ ] Walk through edge cases: Sold out, waitlist, rejected, cancelled
- [ ] Verify all toast messages fire
- [ ] Verify all buttons do something (no dead UI)
- [ ] Verify no raw dates, no Sparkles icons, no broken states

**Done when:** Both full flows work end-to-end as a clickable prototype.

---

## Execution Order Summary

| # | Phase | Steps | Est. Time | Cumulative |
|---|-------|-------|-----------|------------|
| 1 | Fix What's Broken | 1.1, 1.2, 1.3 | 45 min | 0:45 |
| 2 | Publish Flow | 2.1, 2.2 | 30 min | 1:15 |
| 3 | Builder Lifecycle | 3.1–3.7 | 60 min | 2:15 |
| 4 | Learner Reg States | 4.1–4.8 | 60 min | 3:15 |
| 5 | Invitations & Marketing | 5.1–5.3 | 45 min | 4:00 |
| 6 | Contextual Leapy | 6.1, 6.2 | 60 min | 5:00 |
| 7 | Polish & Consolidation | 7.1–7.3 | 30 min | 5:30 |

**Total estimated: ~5.5 hours of focused work.**

---

## What We're NOT Doing Today

These are real features but not needed for the prototype:
- Real backend / API integration
- Actual email sending
- Actual payment processing
- Certificate PDF generation
- Real video/meeting infrastructure
- Recurring/series events
- Breakout rooms
- Real-time multiplayer editing
- i18n / localization
- Accessibility audit (important but separate sprint)
- Mobile-specific responsive pass (separate sprint)

---

## How To Use This Plan

1. Start at Step 1.1 and go in order
2. Each step is self-contained — commit after each
3. If a step takes longer than estimated, simplify scope, don't skip
4. If blocked on a step, note the blocker and move to the next
5. Phase 7 is the safety net — catches anything missed
6. Tell me "start step X.X" and I'll write the code

---

*Let's go.*

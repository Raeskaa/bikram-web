# Leapy AI -- Events Module: Complete Feature Inventory

> Generated 2026-02-26. Covers **every** page, view, tab, modal, dialog, button, flow, state, and feature built to date across **admin**, **speaker/co-host**, and **learner** perspectives, across **all lifecycle stages**.

---

## Table of Contents

1. [Event Lifecycle Stages](#1-event-lifecycle-stages)
2. [Event Creation Flows (Admin)](#2-event-creation-flows)
3. [Event Builder V2 -- Admin Shell & Global Chrome](#3-event-builder-v2-admin-shell)
4. [Admin Tab: Overview](#4-admin-tab-overview)
5. [Admin Tab: Schedule](#5-admin-tab-schedule)
6. [Admin Tab: Speakers & Attendees](#6-admin-tab-speakers--attendees)
7. [Admin Tab: Tickets](#7-admin-tab-tickets)
8. [Admin Tab: Resources](#8-admin-tab-resources)
9. [Admin Tab: Co-hosts & Team](#9-admin-tab-co-hosts--team)
10. [Admin Tab: Discussion](#10-admin-tab-discussion)
11. [Admin Tab: Analytics](#11-admin-tab-analytics)
12. [Admin Tab: AI & Automations (AI Hub)](#12-admin-tab-ai--automations)
13. [Admin Tab: Settings](#13-admin-tab-settings)
14. [All Modals & Dialogs (Admin)](#14-all-modals--dialogs)
15. [Status Banners (Lifecycle-Aware)](#15-status-banners)
16. [Header Actions (Lifecycle-Aware)](#16-header-actions)
17. [AI Copilot Integration](#17-ai-copilot-integration)
18. [Speaker / Co-host View](#18-speaker--co-host-view)
19. [Learner Side -- Events List & Marketplace](#19-learner-side-events-list--marketplace)
20. [Learner Side -- Public Event Landing Page](#20-learner-side-public-event-landing)
21. [Learner Side -- Event Waiting Room](#21-learner-side-waiting-room)
22. [Learner Side -- Event Meeting Room](#22-learner-side-meeting-room)
23. [Learner Side -- Post-Event View](#23-learner-side-post-event-view)
24. [Event Templates Library](#24-event-templates-library)
25. [Unified Event Page Router](#25-unified-event-page-router)
26. [Supporting Components Index](#26-supporting-components-index)
27. [State Management & Data Flow](#27-state-management--data-flow)

---

## 1. Event Lifecycle Stages

Computed in `data/mockEventData.ts` via `getEventLifecycleStage()`. The V2 builder also derives a "live checklist"-based lifecycle for new drafts.

| Stage | Meaning | Derived When |
|---|---|---|
| `skeleton` | Brand-new draft, <= 3 checklist items done | `liveCompletionDone <= 3` |
| `building` | Draft in progress, some items incomplete | `3 < done < total` |
| `ready` | All 10 checklist items complete, publish-ready | `done === total` |
| `published` | Event is live on explore page, accepting registrations | `status === 'published'`, not yet started |
| `live` | Event is currently happening (within start/end window) | `checkEventLive()` returns true |
| `ended` | Event has finished, post-event tasks available | Past end date/time |
| `cancelled` | Event was cancelled by organizer | `checkEventCancelled()` |
| `sold-out` | At capacity, may have waitlist | `isEventSoldOut()` |

Additional computed states:
- `isDraft` = `isSkeleton || isBuilding || isReady`
- `isSpeakerView` = user's role is `speaker` (detected via `getEventRole()`)
- `localPublished` = local toggle after user clicks Publish Now
- `localScheduledFor` = date string when schedule-publish is used

---

## 2. Event Creation Flows

There are **three** ways to create an event:

### 2a. AI-Assisted Flow (ChatFlow + EventSetupSteps)

**Entry point:** Events List View -> "Create Event" button -> "AI-Assisted" option  
**Components:** `ChatFlow.tsx` -> `EventSetupSteps.tsx`

**3-Step wizard inside EventSetupSteps:**

| Step | Interactive Type | What User Configures |
|---|---|---|
| Step 1 | `event-title` | Event name with 5 AI suggestions per batch (cycling pools, hidden-until-typing), Wand2 icon, thumbs-down feedback with reason chips + free-text |
| Step 2 | `event-details` | Format (virtual/in-person/hybrid), category, date picker, time selector with `TimeSelector` component, end time, timezone via `TimezoneSelector`, schedule type (single/multi-day/recurring), `RecurrenceEditor` for recurring events, capacity |
| Step 3 | `event-description` | Long description with 5 AI suggestions per batch (same suggestion pattern), same thumbs-down feedback pattern |

**AI Suggestion Card Pattern (Events only):**
- 5 suggestions per batch, shown only after user starts typing
- Each suggestion card has ThumbsUp (accept) and ThumbsDown (reject) icons
- ThumbsDown opens feedback panel with reason chips: "Too generic", "Wrong tone", "Too long", "Not relevant", "Other"
- Plus a free-text input for custom feedback
- Batches cycle through pools (3 pools for titles, 2 for descriptions)
- Wand2 icon on suggestion header

**Orphaned state variables** (visibility, accessType, isPaid, price) still exist in EventSetupSteps with sensible defaults and pass through `onSubmit` -- their UI was removed from Step 2 and those settings are now configured via the Registration Config dialog in V2.

**On submit:** Creates a new Conversation with the event data, opens `EventBuilderViewV2` pre-filled.

### 2b. Manual Creation Modal

**Entry point:** Events List View -> "Create Event" button -> "Manual" option  
**Component:** `ManualEventCreateModal.tsx`

**Single dialog with fields:**
- Event title (text input, required)
- Event type selector: Virtual / In-Person / Hybrid (icon toggle buttons)
- Date (date input, required)
- Start time (time input, required)
- End time (time input, optional)
- Location (text input, conditional -- required for in-person/hybrid, auto-set to "Virtual Event" for virtual)
- Description (textarea, optional)
- Capacity (number input, optional)

**Buttons:** Cancel | Create Event (disabled until required fields filled)

**On submit:** Opens `EventBuilderViewV2` pre-filled with the data.

### 2c. Manual Creation Stepper (Full)

**Entry point:** Events List View -> "Create Event" button -> Stepper icon; also used when duplicating or creating from community context  
**Component:** `events/EventCreationStepper.tsx`

**4-Step dialog stepper:**

| Step | Title | Fields |
|---|---|---|
| 1 | Basics | Template quick-pick (6 templates: Workshop, Webinar, Meetup, Conference, Course Session, Networking), Title, Category dropdown (10 categories), Description, Format (virtual/in-person/hybrid) |
| 2 | Date & Time | Date picker, Start time via `TimeSelector`, End time, Timezone via `TimezoneSelector`, Schedule type (Single session / Multi-day / Recurring), RecurrenceEditor if recurring, Multi-day end date if multi-day |
| 3 | Access & Pricing | Visibility (Public/Private), Access type (Open/Waitlist/Application Required/Paid), Capacity, Price input (if paid) |
| 4 | Review & Create | Summary of all settings, Edit button per section, "Switch to AI" button, Create Event button |

**Features:**
- Back/Next navigation with step indicators
- "Switch to AI" button calls `onSwitchToAI` prop
- Pre-fill support via `prefill` prop (for duplicating events)
- Community context support via `communityContext` prop
- Template auto-fills duration, capacity, format, pricing

---

## 3. Event Builder V2 -- Admin Shell & Global Chrome

**Component:** `EventBuilderViewV2.tsx` (3227 lines)  
**Layout:** `EventShell.tsx` with sidebar tabs, header, sub-header, status banner slot

### Shell Structure

```
+----------------------------------------------+
| Header: Title | Subtitle | Badge | Actions   |
+----------------------------------------------+
| Sub-header (metrics bar, only when published) |
+----------------------------------------------+
| Status Banner (lifecycle-aware)               |
+------+---------------------------------------+
| Side | Content Area (tab-dependent)           |
| bar  |                                        |
|      |                                        |
+------+---------------------------------------+
| Sidebar Bottom: Community links              |
+------+---------------------------------------+
```

### Admin Sidebar Tabs (10 tabs)

| # | Tab ID | Label | Icon | Tab Indicator (Draft) |
|---|---|---|---|---|
| 1 | `overview` | Overview | Calendar | complete/partial (based on title+desc) |
| 2 | `schedule` | Schedule | Clock | complete/empty (based on hasAgenda) |
| 3 | `attendees` | Speakers & Attendees | Users | complete/empty (based on attendee count) |
| 4 | `tickets` | Tickets | Ticket | complete/warning/empty (based on hasTickets, isPaid) |
| 5 | `resources` | Resources | FileText | empty (always, for draft) |
| 6 | `co-hosts` | Co-hosts & Team | UserPlus | empty (always, for draft) |
| 7 | `discussion` | Discussion | MessageSquare | empty |
| 8 | `analytics` | Analytics | BarChart3 | empty |
| 9 | `ai-hub` | AI & Automations | Zap | "Pro" badge (purple) |
| 10 | `settings` | Settings | Settings | complete/warning (based on hasLocation) |

### Sub-Header Metrics Bar (shown only when NOT draft and NOT cancelled)

- Time saved this week (e.g. "8.5h saved")
- Emails sent count
- Health score (0-100)
- Registration rate %
- Predicted attendance %
- "View Details" button

### Sidebar Bottom Section

- "Link to Community" button -> opens `LinkToExistingCommunityModal`
- "Create Community" button -> calls `onCreateCommunity` prop

### Header Badge

- "Autopilot" badge when AI autopilot is on
- "Speaker" badge when in speaker view

---

## 4. Admin Tab: Overview

The overview tab renders **different content cards** based on the lifecycle stage. Every section below is conditionally rendered.

### 4.1 Draft Mode (skeleton / building / ready)

#### Setup Checklist Card
A card showing 10 checklist items with live completion tracking:

| # | Item | State Variable | Action Button | onClick Behavior |
|---|---|---|---|---|
| 1 | Event title | `hasTitle` | "Edit Title" | Opens Settings tab (general) |
| 2 | Description | `hasDescription` | "Add Description" | Sets `editingField('description')`, scrolls to overview section |
| 3 | Date & time | `hasDateTime` | "Set Date" | Opens Settings tab (general) |
| 4 | Cover image | `hasCoverImage` | "Upload Image" | Triggers `triggerCoverUpload`, scrolls to overview |
| 5 | Agenda / schedule | `hasAgenda` | "Create Agenda" | Switches to Schedule tab |
| 6 | Speakers | `hasSpeakers` | "Add Speakers" | Switches to Attendees tab -> Speakers sub-tab |
| 7 | Tickets / pricing | `hasTickets` | "Set Up Tickets" | Switches to Tickets tab |
| 8 | Registration settings | `hasRegistrationConfig` | "Configure" | Opens Registration Config dialog |
| 9 | Registration form | `hasRegistrationForm` | "Build Form" | Switches to Attendees tab -> Form sub-tab |
| 10 | Location / meeting link | `hasLocation` | "Add Location" | Opens Settings tab (general) |

Each item shows: green CheckCircle if done, empty circle if not, strikethrough text if done, action button if not done.

Progress bar + percentage + "X of Y complete" text.

#### AI Suggestions Card (skeleton/building)

Conditional suggestions based on lifecycle:

**Skeleton stage:**
- "Generate Agenda" suggestion (Brain icon) -> calls `handleGenerateAgenda()` which creates 5 demo sessions
- "Add Speaker" suggestion (UserPlus icon) -> navigates to Speakers & Team tab

**Building stage:**
- "Generate More Sessions" (if < 4 sessions) -> appends up to 3 more sessions
- "Add VIP Tier" (if paid event with only 1 ticket) -> navigates to Tickets tab

#### Ready-to-Publish Card (isReady && !localPublished)
- "When you publish:" list with check icons
- "Publish Now" button -> opens Publish dialog
- "Schedule Publish for Later" button -> opens Publish dialog with schedule picker pre-shown

#### Pre-Launch AI Suggestions (isReady && !localPublished)
- "Draft Announcement" suggestion (Mail icon) -> toast
- "Generate Social Pack" suggestion (Share2 icon) -> toast
- "Preview Public Page" suggestion (Eye icon) -> opens PreviewModal

#### Draft Quick Actions Card
6 buttons in a 2-column grid:

| Button | Icon | Action |
|---|---|---|
| Share Draft Preview | Share2 | Copies draft preview URL to clipboard |
| Generate QR Code | QrCode | Opens QR Code dialog |
| Duplicate Event | Copy | Toast confirmation |
| Edit Details | Edit2 | Opens Settings tab (general) |
| Add Co-host | UserPlus | Navigates to Co-hosts & Team tab |
| Add Resources | FileText | Navigates to Resources tab |

### 4.2 Published State (localPublished)

#### Published Status Card
- Green CheckCircle icon with "Event Published" heading
- "Published just now" with registration count and spots remaining
- "Live" badge
- Public URL display with Copy button
- Action buttons: View Public Page | Share | Send Invites

#### Edit Warning Banner
- Amber warning: "This event is published. Any changes you make will be visible immediately..."

#### Registration Stats Grid (3 columns)
- Registered (count / capacity)
- Page Views (with "+X today" indicator)
- Conversion rate (views -> registrations percentage)

#### Published AI Suggestions
- "Share on social" suggestion (TrendingUp icon)
- "Send early bird reminder" suggestion (Bell icon, only if paid event)

### 4.3 Live Dashboard (isLive)

#### Live Stats Grid (3 columns)
- Watching Now (live attendee count)
- Registered (total attendee count)
- Chat Messages (with "last 5 min" subtitle)

#### Current Session Card
- Current session title and speakers
- Progress bar showing elapsed time (e.g. "32 min / 45 min")

#### Live Action Buttons
- Launch Poll -> toast
- Pin Message -> toast
- Send Announcement -> toast
- End Event (red, right-aligned) -> confirm dialog -> toast

### 4.4 Post-Event Checklist (isEnded)

#### Post-Event Header
- "Post-Event Checklist" with progress (X of 5 tasks)
- "Run Again" button (duplicates event)

#### Attendance Report Grid (4 columns)
- Registered count
- Attended count
- Show Rate %
- Engagement score (/100)

#### Post-Event Checklist Card (5 items)
| # | Task | Action Button |
|---|---|---|
| 1 | Upload recording | Upload |
| 2 | Send follow-up email | Compose |
| 3 | Publish resources & slides | Upload Resources |
| 4 | Configure certificates | Set Up |
| 5 | Send feedback survey | Create Survey |

Each item: CheckCircle if done, empty circle if not, action button if not done -> toast on click.

#### Post-Event AI Suggestions
- "Draft follow-up email" (Mail icon) -> toast
- "Generate feedback survey" (Target icon) -> toast
- "View engagement tips" (Activity icon, conditional on engagement score) -> toast

### 4.5 Cancelled Event (isCancelled)

#### Cancellation Details Card
- Cancellation reason text (if provided)

#### Refund Status Card (if paid event)
- Attendees notified count
- Refund progress bar (e.g. "$X / $Y refunded")
- "3 refunds still processing" note

#### Actions Card
- View Refund Details (if paid) -> toast
- Clone as New Event -> toast
- Delete Event (red) -> confirm dialog -> calls `onBack()`

#### Cancelled AI Suggestions
- "Clone & Reschedule" (RefreshCw icon) -> toast
- "Draft Cancellation Notice" (Mail icon, if attendees > 0) -> toast

### 4.6 Speaker View (isSpeakerView)

See [Section 18](#18-speaker--co-host-view).

### 4.7 Standard Overview (always, non-speaker)

Renders `EventBuilderOverviewSection` component with:
- Cover image upload area (click-to-upload, drag-and-drop placeholder)
- Event title display
- Description editor with inline edit mode and AI regenerate (Wand2) button
- Location editor with inline edit and AI regenerate
- Capacity editor
- Event metadata cards (date/time, type, registrations)
- Quick stats (session count, speaker count, ticket count)
- Quick Actions sidebar section (Preview, Publish, Share Preview, QR, Duplicate, Add Co-host)

**Cover Image:**
- Upload area with dashed border
- Click triggers file input
- Shows uploaded image with delete button
- `triggerCoverUpload` prop allows external trigger from checklist
- `onCoverImageChange` callback updates `hasCoverImage` state

---

## 5. Admin Tab: Schedule

### Empty State
- Large dashed-border placeholder with Clock icon
- "No sessions yet" message
- Two buttons: "AI Generate Agenda" | "Add First Session"

### Header Actions
- "AI Generate Agenda" button (only in draft with 0 sessions)
- "Add Session" button (always)

### Session List
Each session is a card with:
- **Time column:** Displays time (bold, primary color) and duration
- **Content column:** Title, description (2-line clamp), type badge (Break/Workshop), room badge with MapPin, speakers list
- **Actions column:** Move up/down arrows, Edit button, Delete button

### Session Editing (inline)
When editing a session, the card expands to show:
- Time input (time picker)
- Title input
- Description textarea
- Duration input (number, minutes)
- Type dropdown: Session / Keynote / Workshop / Break
- Room/Location input
- Speakers input (comma-separated text) + "Pick" popover if event has speakers
  - Pick popover shows all event speakers with checkboxes
- "Done" button (green) to finish editing

### AI-Generated Agenda
`handleGenerateAgenda()` creates 5 sessions:
1. Welcome & Opening Remarks (15 min)
2. Keynote: Setting the Vision (45 min, keynote type)
3. Coffee & Networking Break (30 min, break type)
4. Panel Discussion (60 min, panel type)
5. Interactive Workshop (90 min, workshop type)

`handleGenerateMoreSessions()` appends up to 3 more:
1. Lightning Talks (30 min)
2. Breakout Session: Deep Dive (45 min, workshop)
3. Closing & Wrap-up (15 min)

---

## 6. Admin Tab: Speakers & Attendees

Three sub-tabs with underline navigation:

### 6.1 Attendees Sub-tab

#### Empty State
- Large dashed-border placeholder with Users icon
- "No registrations yet" message
- "Add Manually" button + "Copy Invite Link" button (draft only)

#### Filter Tabs (horizontal, underline style)
- All
- Pending Review (with count badge in orange)
- Approved
- Rejected

#### Attendee Table
Full-width table with columns:
| Column | Content |
|---|---|
| Applicant | Avatar (initial), name, email |
| Status | Badge: Approved (green) / Pending (orange) / Rejected (red) |
| Application | "Review Application" button (for pending) / "Processed" text (for others) |
| Actions | Approve + Reject buttons (for pending) / Dropdown menu (for confirmed) |

#### Application Review (expandable row)
When "Review Application" is clicked, an expanded row appears below:
- Application Details card with:
  - Role / LinkedIn link
  - Reason for Joining (quoted text)
  - Reject button + "Approve & Send Ticket" button

#### Confirmed Attendee Dropdown Menu
- Send Email -> opens Email Automation Modal
- Resend Ticket -> toast placeholder
- Revoke Access -> toast placeholder (red)

#### Header Actions
- Export CSV button (when attendees > 0) -> generates and downloads CSV file
- Add Applicant button -> adds a mock pending applicant

### 6.2 Speakers & Team Sub-tab

**Component:** `events/SpeakersTeamTable.tsx`

Features:
- Speaker table with avatar, name, email, role, status (confirmed/pending/declined)
- Add Speaker dialog with name, email, role (Speaker/Panelist/Moderator/Host), bio, session assignment
- Search/filter speakers
- Per-speaker dropdown: Edit, Send Email, Resend Invite, Remove
- Status badges: Confirmed (green), Pending (amber), Declined (red)
- Bulk invite option

### 6.3 Registration Form Sub-tab

#### Empty State (no form yet)
- "No registration form yet" message
- "Currently using: Default (Name + Email only)"
- Two buttons: "Keep Default" | "Customize Form"

#### Registration Form Builder
**Component:** `events/RegistrationFormBuilder.tsx`

Features:
- Drag-and-drop form field builder
- Pre-built field types: Text, Email, Phone, Textarea, Select, Checkbox, Date, URL, Number
- Field properties: Label, Placeholder, Required toggle, Description, Options (for select)
- Preview mode showing rendered form
- Default fields (Name, Email) are locked/required
- Custom field templates: Company, Job Title, Dietary Requirements, Experience Level, LinkedIn URL, etc.
- Reorder fields via drag handles
- Delete custom fields
- `onUpdate` callback sets `hasRegistrationForm` to true

---

## 7. Admin Tab: Tickets

### Empty State (draft, no tickets)
- "Pricing not configured" message
- "Currently set to: Free Event"
- Two buttons: "Keep Free" | "Add Paid Tickets"

### Ticket Tiers Section

#### Header
- "Ticket Tiers" title with description
- "Add Ticket Type" button

#### Ticket Cards (2-column grid)
Each ticket card shows:
- Ticket icon + Name + Description
- Price badge (green, e.g. "$49")
- Quantity + Status (Active with green CheckCircle)
- "Edit Details" button -> opens Ticket Editing Modal
- Delete button (red, trash icon)

#### Add New Ticket Placeholder Card
- Dashed border card with Plus icon
- "Create New Ticket Tier" text
- Hover effect: purple border and background

### Discount Codes Section (below tickets, separated by border)

#### Header
- "Discount Codes" title
- "New Code" button

#### Discount Codes Table
| Column | Content |
|---|---|
| Code | Badge with monospace code (e.g. EARLYBIRD) |
| Discount | "20% OFF" or "$100 OFF" |
| Usage | Progress bar + "12/50" usage count |
| Actions | Edit (pencil) + Delete (trash) icon buttons |

Pre-populated with 2 demo codes: EARLYBIRD (20% off, 12/50 used) and SPEAKER ($100 off, 3/10 used).

---

## 8. Admin Tab: Resources

**Component:** `events/ResourcesPanel.tsx`

### Header
- "Resources" title with count + total downloads
- "Add Resource" button (purple)

### Search & Filter Bar
- Search input with magnifying glass icon
- Filter buttons: All | Document | Slides | External Link | Video

### Resource List
Each resource row:
- Type icon (File/Link2/Presentation/Video) in grey square
- Resource name
- Metadata line: type label, file size, download count
- Visibility badge: Public (green) / Registered Only (blue) / Post-Event Only (grey)
- 3-dot menu (appears on hover): Open Link (if link), Download (if file), Change Visibility (cycles through options), Delete (red)

### Pre-populated Mock Resources (4)
1. Event Agenda & Overview.pdf (Document, 2.4 MB, public, 45 downloads)
2. Speaker Slide Deck (Slides, 8.1 MB, registered only, 32 downloads)
3. Pre-Event Reading List (External Link, public, 18 downloads)
4. Workshop Recording (Video, post-event only, 0 downloads)

### Empty State
- FileText icon with dashed border
- "No resources yet" message
- "Add First Resource" button

### Add Resource Dialog
- **Mode toggle:** Upload File vs Add Link (2 cards)
- **Upload File mode:**
  - Drag-and-drop upload area (click or drag)
  - File types: PDF, PPTX, DOCX, PNG, MP4 up to 100MB
  - Resource type selector: Document / Slides / Video
  - Auto-detects type from file extension
- **Add Link mode:**
  - URL input field
- **Common fields:**
  - Display Name input
  - Visibility selector (3 options: Public, Registered Only, Post-Event Only)
- **Buttons:** Cancel | Add Resource

---

## 9. Admin Tab: Co-hosts & Team

**Component:** `events/CoHostPanel.tsx`

### Header
- "Co-hosts & Team" title with active/pending counts
- "Invite Team Member" button (purple)

### Owner Row (non-removable)
- Crown icon in purple circle
- "You (Organizer)" label
- "Owner" badge (purple)

### Team Member List
Each member row:
- Avatar circle with initials
- Name + status badge (Pending in amber, Declined in red)
- Email
- Role badge (Co-host / Moderator / Speaker Manager)
- 3-dot dropdown menu: Edit Permissions, Resend Invitation (if pending), Remove (red)

### Pre-populated Mock Members (2)
1. Sarah Chen -- Co-host, Active
2. Marcus Johnson -- Moderator, Pending

### Search (shows when > 3 members)
- Search by name or email

### Empty State
- UserPlus icon with dashed border
- "No team members yet" message
- "Invite First Member" button

### Role Permissions Reference Card
- Co-host: Full access to event settings, attendees, and analytics
- Moderator: Can manage discussion, Q&A, and moderate attendees
- Speaker Manager: Can manage speakers, schedule sessions, and speaker comms

### Invite Team Member Dialog
- Email address input
- Name (optional) input
- Role selector (3 radio-style cards with descriptions):
  - Co-host
  - Moderator
  - Speaker Manager
- **Buttons:** Cancel | Send Invitation
- On submit: adds member with "pending" status, shows toast

---

## 10. Admin Tab: Discussion

**Component:** `DiscussionChannelV2.tsx`

Full-featured discussion channel with:
- Message list with avatars, timestamps, reactions
- New message composer with text input
- Threaded replies
- Pin messages
- Emoji reactions
- File attachments
- Bot messages (Leapy AI)

---

## 11. Admin Tab: Analytics

### Draft Empty State
- BarChart3 icon with dashed border
- "Analytics available after publishing"
- Setup completion badge (e.g. "72% setup complete")

### Published/Live/Post-Event Analytics

#### Header
- "Post-Event Analytics" title
- Date range dropdown ("Last 7 Days")
- "Export Report" button

#### Top Stats Grid (4 columns)
| Stat | Icon | Example |
|---|---|---|
| Total Revenue | DollarSign (green) | $12,450 with "+15% from last event" |
| Check-in Rate | UserCheck (purple) | 85% with "X of Y attended" |
| Engagement | Activity (purple) | 8.5/10 with "High interactivity" |
| Tickets Sold | Ticket (purple) | Count with "X remaining" |

#### Attendance Overview Bar Chart (Recharts)
- 4 bars: Total, Checked In, No Show, Waitlist
- CartesianGrid, XAxis, YAxis, Tooltip
- Purple bars with rounded corners

#### Live Check-ins Feed
- Recent check-ins with avatar, name, time
- "No check-ins yet" empty state

---

## 12. Admin Tab: AI & Automations (AI Hub)

**Component:** `events/EventAIHub.tsx`

Full-page AI hub with tabs:
- Smart Compose (social media post generator for Twitter, LinkedIn, Instagram, Slack)
- Email Automations (pre-event reminders, post-event follow-ups, triggers)
- Analytics & Insights
- Content Generation

Features per tab vary -- includes copy buttons, regenerate, platform-specific previews, automation toggles, scheduled sends.

---

## 13. Admin Tab: Settings

**Component:** `events/EventSettings.tsx`

Full settings page with sidebar navigation tabs:
- **General:** Event title, description, date/time, location, format, capacity
- **Branding:** Logo upload, color customization, custom URL
- **Privacy & Access:** Visibility, registration mode, waitlist settings
- **Integrations:** Zoom, Google Calendar, Slack, Zapier connections
- **Notifications:** Email notification preferences, reminder schedules
- **Danger Zone:** Delete event, transfer ownership

`settingsInitialTab` prop controls which tab opens initially (used by checklist items that navigate to settings).

---

## 14. All Modals & Dialogs

### 14.1 Publish Confirmation Dialog (Multi-Step)
**State:** `showPublishDialog`, `publishStep` ('review' | 'confirm')  
**Resets** `publishStep` to 'review' on close.

**Step 1: Pre-Publish Review**
- Event summary card (title, date, time, format)
- Full 10-item setup checklist with check/empty icons
- Registration Config Summary with 3 badges (visibility, access type, pricing)
- Incomplete items warning (amber, shows count of missing items)
- **Buttons:** Cancel | "Looks Good, Continue" (advances to step 2)

**Step 2: Confirm Publish**
- "When you publish:" list (context-aware):
  - Visibility message adapts to public/private
  - Registration message adapts to open/waitlist/application
  - Meeting room message adapts to virtual/hybrid
  - Pricing message adapts to free/paid with price
- Schedule picker (shown when "Schedule for Later" clicked):
  - Date input + Time input
- **Buttons (no schedule):** "Back to Review" | "Schedule for Later" | "Publish Now"
- **Buttons (with schedule):** "Back" | "Schedule Publish"

### 14.2 Unpublish Confirmation Dialog
**State:** `showUnpublishDialog`

- Red warning card: "When you unpublish:"
  - Event removed from explore page
  - Public URL stops working
  - New registrations paused
  - Attendee notification count (if any registered)
- Preservation note: "Your event data and registrations are preserved."
- **Buttons:** Cancel | "Unpublish Event" (red destructive)

### 14.3 Registration Config Dialog
**State:** `showRegistrationConfigDialog`

- **Visibility:** Public (Eye icon) / Private (Users icon) -- 2-card toggle
- **Access Type:** Open Registration / Waitlist / Application Required -- 3 radio-style cards
- **Pricing:** Free / Paid -- 2-card toggle, with price input field when paid
- **Buttons:** Cancel | "Save Settings" (with Check icon)
- On save: updates `regVisibility`, `regAccessType`, `regIsPaid`, `regPrice`, calls `onUpdateEventData`, shows toast

### 14.4 Ticket Editing Modal
**State:** `isTicketModalOpen`, `currentTicket`

- Ticket Name input
- Price ($) input + Quantity input (side by side)
- Description textarea
- **Buttons:** Cancel | Save Ticket

### 14.5 Discount Code Modal
**State:** `isDiscountModalOpen`, `currentDiscount`

- Code input (auto-uppercase)
- Type dropdown: Percentage (%) / Fixed Amount ($)
- Amount input
- Usage Limit input
- **Buttons:** Cancel | Save Code

### 14.6 Email Automation Modal
**State:** `isEmailModalOpen`, `emailRecipient`, `emailSubject`, `emailBody`

- "Sending to:" header with recipient name and email
- Subject input (pre-filled with event title)
- Message textarea (pre-filled with greeting)
- SMTP note: "Connect your own SMTP in Settings for custom branding"
- **Buttons:** Cancel | "Send Email" (with Send icon)
- On send: toast.promise with loading/success/error states (simulated 1.5s delay)

### 14.7 QR Code Dialog
**State:** `showQRCodeDialog`

- **Component:** `events/QRCodeCanvas.tsx` -- renders a canvas-based QR code
- Event URL display below QR code
- **Buttons:** "Copy Link" | "Download PNG"
- Download: extracts canvas to PNG and triggers download with event-title-qr.png filename

### 14.8 Invite Modal
**Component:** `events/InviteModal.tsx`  
**State:** `showInviteModal`

- Search/select from community members (8 mock members with avatars)
- Manual email entry with chip-style added emails
- Message textarea for custom invite message
- "Send Invitations" button with count
- Toast on success

### 14.9 Preview Modal
**Component:** `PreviewModal.tsx`  
**State:** `showPreview`

- Full public page preview of the event
- Desktop/mobile toggle
- "Open in New Tab" button
- Passes `eventData` and `discountCodes`

### 14.10 Link to Community Modal
**Component:** `LinkContentModals.tsx` -> `LinkToExistingCommunityModal`  
**State:** `showLinkToCommunityModal`

- Search and select from existing communities
- Link event to a community

### 14.11 Co-host Invite Dialog (inside CoHostPanel)
See [Section 9](#9-admin-tab-co-hosts--team).

### 14.12 Add Resource Dialog (inside ResourcesPanel)
See [Section 8](#8-admin-tab-resources).

---

## 15. Status Banners (Lifecycle-Aware)

Rendered above the content area inside EventShell's `statusBanner` slot.

| Lifecycle | Banner | Color | Content |
|---|---|---|---|
| `skeleton` | Getting Started | Grey (muted) | Rocket icon, "X of Y setup steps complete", progress bar |
| `building` | Issues to resolve | Amber | AlertCircle, lists missing items (cover image, meeting link, registration form), completion %, progress bar |
| `ready` | All set | Green | CheckCircle, "your event is ready to publish", "Publish Event" button |
| `live` | LIVE NOW | Red | Pulsing red dot, live attendee count, start time, "Open Control Room" button, "End Event" button |
| `ended` (no recording) | Event ended | Grey | Clock icon, "X of 5 post-event tasks complete", attendance report stats |
| `cancelled` | Cancelled | Grey | XCircle, cancellation date, "Clone as New Event" button, "Delete Event" button |
| `sold-out` | At capacity | Purple | Users icon, registration count/capacity, waitlist count, "Increase Capacity" button, "Manage Waitlist" button |
| Published (not live) | None | -- | No banner shown |

---

## 16. Header Actions (Lifecycle-Aware)

### Admin Header (default)

**Always present:**
1. **AI Mode Switcher** (Popover):
   - Mode selector: Builder / Helper / Analyst (3 cards with icons + descriptions)
   - Current mode displayed as button text
   - AI Personality selector: Professional / Casual / Enthusiastic / Minimal (2x2 grid)
   - Autopilot toggle (on/off)

2. **Preview button** -> opens PreviewModal

3. **Share Dropdown** (ungated -- works in draft AND published):
   - Copy Draft Preview Link (draft only, with random token)
   - Copy Link
   - Email (mailto: link)
   - WhatsApp (wa.me link)
   - Twitter/X (intent/tweet link)
   - LinkedIn (sharing/share-offsite link)
   - ---separator---
   - QR Code -> opens QR dialog
   - Embed Code -> copies iframe snippet

**Draft-only (not published, not scheduled):**
4. **Publish Event button** (purple):
   - Disabled if skeleton
   - Shows AlertCircle if building (with tooltip)
   - Opens Publish dialog if ready
   - Shows toast with completion count if building

**Scheduled:**
5. **"Scheduled" badge** (amber, with Clock icon)

**Published (not live):**
6. **More Actions dropdown** (3-dot):
   - View Public Page
   - Copy Public Link
   - Send Invitations -> opens InviteModal
   - Duplicate Event
   - ---separator---
   - Unpublish (Back to Draft) (red)

**Live:**
7. **"Enter Room" button** (red, pulsing) -> calls `onJoinEvent`

### Cancelled Header
- "Clone as New Event" button only

### Speaker Header
- Preview button
- "Enter Backstage" button (red, only when live) -> calls `onJoinEvent`

---

## 17. AI Copilot Integration

### CopilotPanel (Global)
**Component:** `CopilotPanel.tsx`  
**Context provider:** `contexts/CopilotContext.tsx`

When an event is open in V2, the copilot receives event context via `setEventContext()`:

| Context Field | Source |
|---|---|
| `lifecycleStage` | Current lifecycle |
| `eventTitle` | Event title |
| `eventId` | Event ID |
| `completionDone` / `completionTotal` | Live checklist counts |
| `registrationCount` | Attendee count |
| `capacity` | Event capacity |
| `waitlistCount` | Waitlist length |
| `isPaid` / `price` | Pricing info |
| `hasAgenda`, `hasSpeakers`, `hasCoverImage`, `hasRegistrationForm`, `hasRegistrationConfig`, `hasTickets` | Individual checklist items |
| `sessionCount` / `totalDuration` | Schedule stats |
| `attendeeCount` / `liveViewers` | Audience stats |
| `unansweredQuestions` | Q&A count |

The copilot adapts its suggestions, quick actions, and mode-specific behavior based on this context.

### AI Modes (in V2 header)
- **Builder:** Create and edit event details
- **Helper:** Ask questions and get guidance
- **Analyst:** View insights and analytics

### AI Personalities
- Professional, Casual, Enthusiastic, Minimal

### Autopilot Toggle
- When on, shows "Autopilot" badge in header
- Conceptually enables proactive AI actions

---

## 18. Speaker / Co-host View

Detected when `getEventRole(event, userEmail)` returns `'speaker'`.

### Speaker Sidebar Tabs (5 tabs)
1. Overview (Calendar)
2. Schedule (Clock)
3. Speakers & Attendees (Users) -- read-only
4. Discussion (MessageSquare)
5. AI & Automations (Zap, "Pro" badge)

### Speaker Overview Content

#### Role Card
- "Your Role: Speaker" badge (purple)
- "Event by [creatorName]"

#### Your Session(s) Card
- Lists sessions assigned to current user (via `getSpeakerSessions()`)
- Each session shows: title, time, duration, description
- Per-session buttons: "Edit Session Description" | "Replace Slides"
- "No sessions assigned to you yet" empty state

#### Event Summary Card (read-only)
- 3-column grid: Registered count, Sessions count, Format

### Speaker Header
- Preview button
- "Enter Backstage" button (red, only when live)
- "Speaker" badge

---

## 19. Learner Side -- Events List & Marketplace

### Events List View
**Component:** `EventsListView.tsx`

#### Tabs
- All Events
- My Events (created by current user)
- Registered (user is registered for)
- Drafts (user's draft events)
- Past (ended events)

#### Sorting
Dropdown with options: Date (ascending/descending), Attendees, Price (low/high), Name

#### Filtering (ActiveFilters)
- **Delivery:** Virtual, In-Person, Hybrid
- **Visibility:** Public, Private, Global, Shared
- **Access Type:** Open, Waitlist, Screened, Paid
- **Payment:** Free, Paid
- **Context:** Standalone, Community, Course

#### Event Cards
Each card shows:
- Cover image / gradient placeholder
- Title, host name
- Date/time with Calendar/Clock icons
- Location with MapPin/Video icons
- Type badge (Virtual/In-Person/Hybrid)
- Visibility badge
- Price badge (Free or $X)
- Registration count / capacity
- Status badges: Draft, Published, Live (pulsing), Ended, Cancelled, Sold Out
- Lifecycle indicators
- Action buttons (context-dependent): Open, Edit, Register, Join Live, View Recording

#### Creation Entry Points
- "Create Event" button with dropdown:
  - AI-Assisted (opens ChatFlow)
  - Manual (opens ManualEventCreateModal)
  - Advanced Stepper (opens EventCreationStepper)
  - From Template (navigates to Event Templates Page)

#### Taxonomy Pills
Inline badges per card showing: format, visibility, access type, payment status

### Events Marketplace
**Component:** `EventsMarketplace.tsx`

Public-facing explore page with:
- Featured events carousel
- Trending events section
- Category browsing (Technology, Design, Business, etc.)
- Search with keyword input
- Filter by type, price, date range
- Event cards with cover images, host info, pricing, capacity
- "Register" / "Join Waitlist" CTAs per card

---

## 20. Learner Side -- Public Event Landing Page

**Components:** `PublicEventLanding.tsx`, `PublicEventLandingV1-V5Tabbed.tsx`

Multiple versions exist; V5Tabbed is the latest, uses `EventShell` with `learner` role.

### Learner Sidebar Tabs (7 tabs)
1. Overview (Eye)
2. Agenda (Clock)
3. Learn (Award)
4. Community (Users)
5. Resources (Download)
6. Reviews (Star)
7. Chat (MessageCircle)

### Overview Tab Content
- Event hero section with cover image
- Title, date, time, location, type
- Host info with avatar, name, bio, stats (events hosted, total attendees, avg rating)
- Registration CTA: "Register Free" / "Buy Ticket ($X)" / "Join Waitlist" / "Application Required"
- Spots remaining indicator
- Trust badges (Verified Host, Secure Payment, Refund Policy)
- Event description
- What you'll learn section
- Attendee preview (avatars + "X others attending")
- Add to Calendar button
- Share menu
- Save/Bookmark toggle
- "Ask the Organizer" button -> opens question dialog

### Agenda Tab
- Session timeline with times, titles, descriptions, speaker names
- Session type indicators

### Resources Tab
- Downloadable resources list (PDFs, slides, links)
- Visibility-gated (some resources only after registration or post-event)

### Reviews Tab
- Star ratings (1-5)
- Review text with user name and date
- Average rating display

### Chat Tab
- Pre-event discussion channel
- Similar to DiscussionChannelV2

### Registration Flow
1. Click Register / Buy Ticket
2. If paid: `EventCheckoutModal` opens
   - Ticket selection (if multiple tiers)
   - Discount code input with validation
   - Price breakdown (subtotal, discount, total)
   - Payment form (card number, expiry, CVC)
   - "Complete Purchase" button with loading state
   - Success state with confirmation
3. If screened: `EventRegistrationForm` opens
   - Custom fields from form builder
   - Progress indicator
   - Submit application
4. If open/free: Direct registration with toast confirmation

---

## 21. Learner Side -- Event Waiting Room

**Component:** `EventWaitingRoom.tsx`  
**Wrapper:** `LearnerEventView.tsx`

### Layout
Full-screen split layout:
- Left side: Event info + video preview
- Right side: Tab content (Overview / Discussion)

### Pre-Event Features
- Event details card (title, date, time, location, registered count)
- Referral link with copy button
- Equipment check:
  - Camera toggle (on/off with preview)
  - Microphone toggle (on/off)
  - Audio settings
  - Monitor/screen share option
- "Join Event" button (green, appears when event goes live)

### Waiting State
- Countdown or "Event is live" indicator
- Discussion tab for pre-event chat

---

## 22. Learner Side -- Event Meeting Room

**Component:** `EventMeetingRoom.tsx`

Full-featured video meeting room with:

### Video Grid
- Speaker view / Gallery view / Grid view layouts
- Participant video tiles with names, mute indicators
- Active speaker highlighting
- Screen share view

### Controls Bar (bottom)
- Mic toggle (on/off)
- Camera toggle (on/off)
- Screen share toggle
- Recording indicator
- Reactions (emoji picker)
- Hand raise
- Leave meeting (red phone icon)
- More options dropdown

### Side Panels
- **Participants panel:** List of all participants with roles, mute status
- **Chat panel:** Real-time chat with message input, emoji, file attachments, pinned messages, reactions
- **Q&A panel:** Question submission and upvoting
- **Polls panel:** Active polls with voting

### Features
- Minimized meeting window (`MinimizedMeetWindow.tsx`) -- PiP-style floating window when navigating away
- Breakout rooms support
- Recording indicator
- Live captions placeholder
- Session timer

---

## 23. Learner Side -- Post-Event View

**Component:** `PostEventView.tsx`

Uses `EventShell` with `post-event` role.

### Post-Event Sidebar Tabs (6 tabs)
1. Overview (Eye)
2. Recording (Play)
3. Resources (FileText)
4. Certificate (Award)
5. Discussion (MessageSquare)
6. Reviews (Star)

### Overview Tab
- Event summary with date, duration, attendance stats
- Host info
- Key highlights
- Share button

### Recording Tab
- Video player placeholder with play button
- Recording duration display
- Chat replay alongside video (timestamped messages from the live event)
- Download recording option (if enabled)

### Resources Tab
- Post-event resources (slides, documents, links)
- Download buttons per resource

### Certificate Tab
- Certificate preview card with:
  - Event title, attendee name, date
  - Completion verification
  - Download PDF button
  - Share certificate button
- "Certificate not yet available" state (if admin hasn't configured)

### Discussion Tab
- Post-event discussion channel
- Same DiscussionChannelV2 component

### Reviews Tab
- Submit review form: Star rating (1-5) + text review
- Existing reviews from other attendees
- Average rating display

---

## 24. Event Templates Library

**Component:** `EventTemplatesPage.tsx`

### Header
- "Event Templates" title with back arrow
- "Browse 25+ ready-made templates" subtitle
- Search input

### Sorting
- Popular (default) / Name / Duration / Capacity

### Category Filters (horizontal pills)
All, Technology, Design, Business, Marketing, Education, Health, Creative, Networking

### Template Grid
25+ templates, each card showing:
- Icon (Lucide component, no emojis)
- Template name
- Category badge
- Description
- Duration, capacity, format (virtual/in-person/hybrid), pricing (free/paid with suggested price)
- Feature list (3-4 bullet points)
- Usage count (e.g. "1,240 events created")
- "Popular" badge (on select templates)
- "Use Template" button -> creates event pre-filled with template data

### Template Categories
Technology, Design, Business, Marketing, Education, Health, Creative, Networking

---

## 25. Unified Event Page Router

**Component:** `UnifiedEventPage.tsx`

Routes users to the correct view based on:
- **Event existence:** 404 if not found
- **User role** (via `getEventRole()`):
  - `admin` -> `EventBuilderViewV2`
  - `speaker` -> `EventBuilderViewV2` (with speaker view internally)
  - `learner` -> `PublicEventLanding`
- **Lifecycle stage:**
  - `ended` + learner -> `PostEventView`
  - `cancelled` -> Shows cancellation info
  - `live` + admin -> V2 with live dashboard
  - `live` + learner -> Waiting room / Meeting room

Wraps content in `AppLayout` with appropriate guest/authenticated state.

---

## 26. Supporting Components Index

| Component | File | Purpose |
|---|---|---|
| `EventShell` | `EventShell.tsx` | Sidebar + header layout shell for all event views |
| `EventBuilderOverviewSection` | `EventBuilderOverviewSection.tsx` | Cover image, description, location, capacity editors |
| `DiscussionChannelV2` | `DiscussionChannelV2.tsx` | Threaded discussion with reactions and file attachments |
| `EventAIHub` | `events/EventAIHub.tsx` | AI content generation, email automation, social media |
| `EventSettings` | `events/EventSettings.tsx` | Full settings page with 6 tabs |
| `SpeakersTeamTable` | `events/SpeakersTeamTable.tsx` | Speaker management table with CRUD |
| `RegistrationFormBuilder` | `events/RegistrationFormBuilder.tsx` | Drag-and-drop form builder |
| `CoHostPanel` | `events/CoHostPanel.tsx` | Co-host/team management |
| `ResourcesPanel` | `events/ResourcesPanel.tsx` | Resources management (files, links, slides, videos) |
| `QRCodeCanvas` | `events/QRCodeCanvas.tsx` | Canvas-based QR code generator |
| `InviteModal` | `events/InviteModal.tsx` | Email/community member invite dialog |
| `TimeSelector` | `events/TimeSelector.tsx` | Time picker + duration calculator |
| `TimezoneSelector` | `events/TimeSelector.tsx` | Timezone dropdown |
| `RecurrenceEditor` | `events/RecurrenceEditor.tsx` | Recurring event rule builder |
| `EventCreationStepper` | `events/EventCreationStepper.tsx` | 4-step manual creation dialog |
| `EventStatusBanner` | `EventStatusBanner.tsx` | Standalone status banner component |
| `EventTemplatesLibrary` | `EventTemplatesLibrary.tsx` | Template browser (inline) |
| `EventTemplatesPage` | `EventTemplatesPage.tsx` | Full-page template library (25+ templates) |
| `ManualEventCreateModal` | `ManualEventCreateModal.tsx` | Quick-create modal |
| `EventSetupSteps` | `EventSetupSteps.tsx` | AI-assisted 3-step wizard |
| `ChatFlow` | `ChatFlow.tsx` | AI chat flow driving EventSetupSteps |
| `PreviewModal` | `PreviewModal.tsx` | Public page preview with device toggle |
| `LinkContentModals` | `LinkContentModals.tsx` | Link event to community modal |
| `EventCheckoutModal` | `EventCheckoutModal.tsx` | Paid event checkout flow |
| `EventRegistrationForm` | `EventRegistrationForm.tsx` | Registration form renderer |
| `EventWaitingRoom` | `EventWaitingRoom.tsx` | Pre-event waiting room with AV check |
| `EventMeetingRoom` | `EventMeetingRoom.tsx` | Full video meeting room |
| `MinimizedMeetWindow` | `MinimizedMeetWindow.tsx` | PiP-style floating meeting window |
| `PostEventView` | `PostEventView.tsx` | Post-event hub (recording, resources, certificates) |
| `PublicEventLanding` | `PublicEventLanding.tsx` | Public event page (original) |
| `PublicEventLandingV5Tabbed` | `PublicEventLandingV5Tabbed.tsx` | Public event page (tabbed, latest) |
| `UnifiedEventPage` | `UnifiedEventPage.tsx` | Role-based event page router |
| `LearnerEventView` | `LearnerEventView.tsx` | Learner entry wrapper |
| `EventsListView` | `EventsListView.tsx` | Admin events list with tabs, filters, sorting |
| `EventsMarketplace` | `EventsMarketplace.tsx` | Public event explore/discover page |
| `EventsCRM` | `EventsCRM.tsx` | CRM view for event attendees |
| `CopilotPanel` | `CopilotPanel.tsx` | Global AI copilot with event context awareness |
| `SocialPackGenerator` | `SocialPackGenerator.tsx` | Social media content generator |
| `WaitlistManagement` | `WaitlistManagement.tsx` | Waitlist management UI |
| `DraftEventsWidget` | `DraftEventsWidget.tsx` | Dashboard widget showing draft events |
| `AddToCalendar` | `AddToCalendar.tsx` | Calendar integration (Google, iCal, Outlook) |
| `CalendarView` | `CalendarView.tsx` | Calendar view of events |
| `MyRegisteredEvents` | `MyRegisteredEvents.tsx` | Learner's registered events list |

---

## 27. State Management & Data Flow

### App-level State (App.tsx)
- `currentUser` syncs with `AuthContext` via `authContextLogin`
- `AppLayout` reads from App.tsx prop
- Event conversations stored in `conversations` state
- `eventData` passed as prop to `EventBuilderViewV2`
- `onUpdateEventData` callback propagates changes back to parent

### EventBuilderViewV2 Internal State

| State Variable | Type | Purpose |
|---|---|---|
| `mainView` | string | Currently active sidebar tab |
| `attendeesSubTab` | 'attendees' \| 'speakers' \| 'form' | Sub-tab within Attendees |
| `settingsInitialTab` | string | Which settings tab to open first |
| `scheduleItems` | array | Session/agenda data |
| `attendees` | array | Attendee list |
| `tickets` | array | Ticket tier definitions |
| `discountCodes` | DiscountCode[] | Promo codes |
| `aiMode` | 'builder' \| 'helper' \| 'analyst' | Current AI copilot mode |
| `aiPersonality` | 'professional' \| 'casual' \| 'enthusiastic' \| 'minimal' | AI personality |
| `aiAutoPilot` | boolean | Autopilot toggle |
| `healthScore` | number | Event health metric (0-100) |
| `registrationRate` | number | Registration rate % |
| `attendancePredict` | number | Predicted attendance % |
| `eventDescription` | string | Editable description |
| `eventLocation` | string | Editable location |
| `eventCapacity` | string | Editable capacity |
| `hasCoverImage` | boolean | Cover image uploaded |
| `hasRegistrationForm` | boolean | Form configured |
| `triggerCoverUpload` | boolean | External trigger for upload |
| `editingField` | string \| null | Field currently being edited inline |
| `editingSessionId` | string \| null | Session being edited |
| `attendeeFilter` | 'all' \| 'pending' \| 'approved' \| 'rejected' | Attendee list filter |
| `selectedApplication` | string \| null | Expanded application row |
| `showPreview` | boolean | Preview modal open |
| `showPublishDialog` | boolean | Publish dialog open |
| `publishStep` | 'review' \| 'confirm' | Current publish dialog step |
| `showUnpublishDialog` | boolean | Unpublish dialog open |
| `showInviteModal` | boolean | Invite modal open |
| `showSchedulePicker` | boolean | Schedule-for-later picker visible |
| `scheduledPublishDate` | string | Scheduled publish date |
| `scheduledPublishTime` | string | Scheduled publish time |
| `localPublished` | boolean | Event locally marked as published |
| `localScheduledFor` | string \| null | Display date for scheduled publish |
| `showRegistrationConfigDialog` | boolean | Registration config dialog open |
| `regVisibility` | 'public' \| 'private' | Registration visibility setting |
| `regAccessType` | 'open' \| 'waitlist' \| 'screened' | Registration access setting |
| `regIsPaid` | boolean | Paid event toggle |
| `regPrice` | string | Ticket price input |
| `hasRegistrationConfig` | boolean (derived) | True if any setting differs from defaults |
| `showQRCodeDialog` | boolean | QR code dialog open |
| `showLinkToCommunityModal` | boolean | Link-to-community modal open |
| `isTicketModalOpen` | boolean | Ticket editing modal open |
| `currentTicket` | object \| null | Ticket being edited |
| `isDiscountModalOpen` | boolean | Discount code modal open |
| `currentDiscount` | DiscountCode \| null | Discount being edited |
| `isEmailModalOpen` | boolean | Email modal open |
| `emailRecipient` | object \| null | Email recipient |
| `emailSubject` | string | Email subject line |
| `emailBody` | string | Email body text |
| `showModeSelector` | boolean | AI mode popover open |
| `isRegenerating` | string \| null | Field being AI-regenerated |
| `aiThinking` | boolean | AI processing state |

### Live Checklist (computed)

```typescript
const liveChecklist = {
  hasTitle: !!(eventData.title),
  hasDescription: !!eventDescription,
  hasDateTime: !!(eventData.date && eventData.time),
  hasCoverImage,
  hasAgenda: scheduleItems.length > 0,
  hasSpeakers: !!(eventData.speakers?.length > 0),
  hasTickets: tickets.length > 0,
  hasRegistrationConfig,
  hasRegistrationForm,
  hasLocation: !!eventLocation,
};
```

10 items total. `liveCompletionPercent` = round((done/total) * 100).

### CopilotContext (event context sync)
Via `useCopilot().setEventContext()` -- passes 20+ fields describing current event state to the global Copilot Panel. Cleared on unmount.

### Mock Data
`data/mockEventData.ts` provides:
- `mockEvents` array with 12+ pre-built events across all lifecycle stages
- Helper functions: `getEventLifecycleStage`, `getEventCompletionPercent`, `getEventCompletionCount`, `isEventSoldOut`, `isEventCancelled`, `isEventLive`, `getEventRole`, `getEventWaitlist`, `getSpeakerSessions`, `getUserRegistrationStatus`, `isEventCreator`, `isEventSpeaker`, `isEventModerator`, `getEventWaitlistCount`

---

*End of inventory. This document covers every built feature, flow, modal, button, and state variable in the Leapy AI Events module as of 2026-02-26.*

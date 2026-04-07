# System Overview And Flow Map

## What This Project Is

This project is a mock-first product prototype built in React, Vite, and Tailwind.

It is not intended to depend on real APIs. The goal of the codebase is to prototype product ideas, flows, states, and cross-feature interactions using local state and mock data.

Core characteristics:
- Single-page prototype app
- Heavy use of mock data and simulated states
- Multiple user roles and lifecycle states
- AI-assisted creation flows for main product objects
- Separate creator/admin and learner/public experiences

Primary app files:
- `src/App.tsx`: main stage-based router and app state orchestrator
- `src/components/AppLayout.tsx`: global shell, navigation, search, notifications, copilot

## Main Product Areas

The prototype is organized around these product buckets:
- Communities
- Events
- Courses
- Marketplace
- Auth and Account
- Settings
- Integrations
- My Drive
- Permissions
- AI and Copilot

## Core Product Pattern

The dominant product pattern across the app is:

`entry point -> AI/prompt flow or list view -> preview/generation -> builder/editor -> learner/public view`

This is used most clearly in:
- community creation
- course creation
- event creation

## Global App Structure

### Creator Mode

Used for building and managing content.

Main activities:
- create communities
- create courses
- create events
- manage drafts
- manage settings
- explore integrations
- use AI/copilot tooling

### Learner Mode

Used for browsing and consuming content.

Main activities:
- browse courses
- browse events
- browse communities
- register/join/enroll through mock flows
- consume course and event experiences

### Global Shell

Implemented in `src/components/AppLayout.tsx`.

Global navigation includes:
- `Home`
- `My Drive`
- `Permissions`
- `Drafts`
- `Communities`
- `Events`
- `Courses`

Event sub-navigation includes:
- `Explore`
- `Calendar`

Global utility surfaces include:
- search modal
- notifications panel
- copilot panel
- user menu / sign-in state
- guest credits
- language/country controls
- LeapSpace switcher

## Main App Stages

Implemented stage families in `src/App.tsx` include:

### Auth stages
- `signin`
- `register`
- `forgot-password`
- `reset-password`
- `all-login-methods`
- `otp-verification`
- `magic-link-sent`
- `account-merge`
- `profile-completion`

### Core stages
- `welcome`
- `chat`
- `home`

### Content stages
- `communities-list`
- `community-preview`
- `community-builder`
- `courses-list`
- `course-preview`
- `course-builder`
- `events-list`
- `events-calendar`
- `event-preview`
- `event-builder`
- `unified-event`
- `event-landing`

### Support and learner stages
- `marketplace`
- `event-meeting`
- `my-drive`
- `settings`
- `permissions-dashboard`
- `course-player`

## Communities

### What The Community System Is For

The community system is the long-term engagement layer of the product. It acts as a container for members, courses, events, discussion, analytics, and settings.

It also acts as a destination for cross-object conversion flows such as:
- turning an event into a community
- linking a course to a community
- linking an event to a community

### Community Entry Points

Users can enter the community system from:
- `Welcome -> Create Community`
- `+ New -> Community`
- `Communities list -> Create`
- `Event builder -> Create community`
- `Course builder -> Create community`

### Community Creation Flow

Path:

`entry -> ChatFlow -> community preview -> community builder`

What this flow does:
- captures intent through prompt/chat
- generates a title, description, and positioning
- shows a preview/generation phase
- opens the full builder

### Communities List View

Primary purpose:
- browse existing communities
- filter, sort, and search them
- open an existing community
- create a new community

Implemented sections include:
- tabs: `All Communities`, `My Communities`, `Member Of`, `Moderator`, `Admin`, `Drafts`
- search
- category filter
- sort controls
- grid/list toggle
- pinned/recent/trending/recommended areas
- right sidebar widgets for quick actions, health, schedule, attention items

### Community Builder

Primary purpose:
- admin/moderator workspace for managing a community

Main sections include:
- `Overview`
- `Channels`
- `Members`
- `Courses`
- `Events`
- `Messages`
- `Analytics`
- `AI Hub`
- `Settings`

### Community Overview Flow

Purpose:
- community command center

Implemented content includes:
- member stats
- online now
- posts this week
- engagement score
- community snapshot
- growth/retention indicators
- top contributors
- recent activity
- upcoming events
- quick actions

### Community Channels And Feed Flow

Purpose:
- discussion and channel browsing layer

Implemented patterns include:
- channel list
- pinned/unread indicators
- selected channel content area
- discussion-style feed behavior
- composer/moderation style controls in builder context

### Community Members Flow

Path:

`Community builder -> Members`

Purpose:
- manage membership, moderation, and outreach

Implemented capabilities include:
- member search
- role/status/tag filters
- sorting by activity or risk
- member cards with profile stats and contribution info
- bulk selection and actions
- member detail panel
- invite modal
- remove member flow

Actions modeled include:
- invite by email
- assign role on invite
- open member profile
- send message
- change role
- remove member
- inspect churn risk and contribution score

### Invite Members Flow

Path:

`Community builder -> Members -> Invite`

Modeled behavior includes:
- email entry
- role selection: `member`, `moderator`, `admin`
- optional custom message
- invite link behavior
- preview and success state

### Community Events Flow

Path:

`Community builder -> Events`

Purpose:
- manage events that belong to or are linked to the community

Implemented tabs include:
- `Upcoming`
- `Past`
- `My Events`

Implemented actions include:
- add existing event
- create event with AI
- search/filter events
- open event detail modal
- RSVP/calendar-style actions

The event detail modal includes:
- `Details`
- `Attendees`
- `Discussion`

### Community Courses Flow

Path:

`Community builder -> Courses`

Purpose:
- manage courses that belong to or are linked to the community

Implemented capabilities include:
- course cards
- draft/published states
- search/filter
- add existing course
- create course with AI
- edit/duplicate/delete style actions
- AI improvement suggestions

### Community Messages Flow

Path:

`Community builder -> Messages`

Purpose:
- lightweight DM and direct communication prototype

Implemented capabilities include:
- conversation list
- selected thread view
- composer
- search
- AI-assisted suggestions

### Community Analytics Flow

Path:

`Community builder -> Analytics`

Purpose:
- management analytics for growth and engagement

Implemented analytics themes include:
- member growth
- engagement metrics
- top content
- course completion
- event participation
- AI predictions/insights

### Community Settings Flow

Path:

`Community builder -> Settings`

Purpose:
- control visibility, branding, permissions, automation, and integrations

Implemented settings areas include:
- general info
- branding
- permissions and roles
- AI autopilot
- integrations

### Learner And Member Community Flows

Separate learner/member components exist for:
- `My Communities`
- `Community member view`

Implemented member-view sections include:
- `Feed`
- `Members`
- `Events`
- `Resources`

Member-view behaviors include:
- favorite toggle
- notification toggle
- view/register for event
- resource browsing/downloads
- about/rules/links side content

Important note:
- these learner community views are built, but not fully wired through the main app router

### Community Cross-Object Flows

These are some of the most important prototype flows in the community system:
- event -> create community from attendees
- course -> create student community
- event -> link to existing community
- course -> link to existing community
- community -> add existing event
- community -> add existing course

## Events

### What The Event System Is For

The event system is the deepest and most complete part of the prototype.

It models:
- admin/creator event operations
- public landing pages
- registration and ticketing states
- waiting room
- live meeting room
- post-event views
- role-based and lifecycle-based routing

### Event Entry Points

Users can enter events from:
- `Welcome -> Create Event`
- `+ New -> Event`
- `Events list -> Create Event`
- `Community builder -> Add Event -> Create New`
- direct event open via `UnifiedEventPage`

### Events List View

Path:

`Sidebar -> Events -> Explore`

Purpose:
- event discovery and event management index

Implemented tabs include:
- `Discover`
- `Attending`
- `Hosting`
- `Drafts`
- `Past Events`

Implemented controls include:
- search
- delivery filter
- visibility filter
- payment/access filter
- sorting

Implemented actions include:
- open event
- create event
- create manually
- browse templates

### Event Calendar Flow

Path:

`Sidebar -> Events -> Calendar`

Purpose:
- date-based event discovery and planning

Implemented capabilities include:
- month/week/day views
- created, registered, and waitlisted event display
- recurring event expansion
- create/import affordances
- open an event from the calendar

### Event Creation Flow

Path:

`entry -> ChatFlow -> event preview -> event builder`

Purpose:
- AI-assisted event ideation and setup

Implemented behavior includes:
- event concept capture
- basic details generation
- agenda suggestions
- promotional framing
- generation/loading step
- handoff to builder

### Manual Event Creation Flow

Also modeled as a separate stepper-based flow.

It includes:
- event type
- basic details
- date/time/delivery
- access/pricing
- review/publish

### Unified Event Routing Flow

This is a major architectural concept in the prototype.

Path:

`open event -> UnifiedEventPage`

Routing behavior includes:
- creator/moderator -> admin builder
- speaker -> restricted builder
- cancelled non-admin -> public landing
- past event learner -> post-event view
- active/default learner/public -> public landing

This allows the same event object to render different experiences depending on role and lifecycle.

### Event Builder

Primary purpose:
- creator/admin event workspace

Main sections include:
- `Overview`
- `Schedule`
- `Attendees`
- `Tickets`
- `Resources`
- `Co-hosts`
- `Reviews`
- `Discussion`
- `Analytics`
- `Changelog`
- `AI Hub`
- `Settings`

### Event Overview Flow

Purpose:
- event command center

Implemented content includes:
- health/completion status
- draft vs published vs live states
- quick actions
- publish actions
- public page access
- QR code access
- registration summaries
- event-to-community hook

### Event Schedule Flow

Path:

`Event builder -> Schedule`

Implemented capabilities include:
- session CRUD
- time editing
- agenda structure
- recurrence editing
- draft vs published edit behavior
- edit confirmation for sensitive changes
- change logging

### Event Attendees Flow

Path:

`Event builder -> Attendees`

Implemented capabilities include:
- attendee list
- approval-state filters
- manual attendee add
- bulk import
- registration-derived attendee state from mocks

### Event Tickets And Pricing Flow

Path:

`Event builder -> Tickets`

Implemented capabilities include:
- free vs paid mode
- ticket tiers
- discount codes
- ticket availability logic

### Event Waitlist Flow

Implemented capabilities include:
- waitlist tab
- waitlist config modal
- capacity and waitlist toggles
- queue handling
- approve/remove style actions

### Event Co-Host And Speaker Team Flow

Path:

`Event builder -> Co-hosts`

Implemented capabilities include:
- invite collaborators
- role assignment
- team management
- speaker/team table

### Event Resources Flow

Path:

`Event builder -> Resources`

Implemented capabilities include:
- links/files/resources panels
- prep materials
- access control feel
- post-event materials handling

### Event Reviews Flow

Path:

`Event builder -> Reviews`

Implemented capabilities include:
- review moderation
- flagged review flow
- host/admin responses

### Event Changelog Flow

Path:

`Event builder -> Changelog`

Purpose:
- operational visibility into event edits

Implemented capabilities include:
- who changed what
- notification impact
- change severity context
- edit history

### Event Settings Flow

Path:

`Event builder -> Settings`

Implemented areas include:
- general event settings
- custom roles
- discussions
- recording
- certificates
- notifications
- permissions/integrations flavor

### Event AI Hub Flow

Path:

`Event builder -> AI Hub`

Implemented capabilities include:
- lifecycle-aware suggestions
- communication playbooks
- automation-style ideas
- stage buckets such as announce, engage, remind, follow-up
- health recommendations

### Public Event Landing Flow

Purpose:
- learner/public-facing event experience

Implemented tab families include:
- `Overview`
- `Agenda`
- `Learn`
- `Community`
- `Resources`
- `Reviews`
- `Chat`

Past-event state can also include:
- `Recording`

This surface changes depending on status such as:
- anonymous
- registered
- applied
- rejected
- waitlisted
- sold out
- live
- ended

### Event Registration And CTA Flows

Modeled CTA types include:
- register free
- buy ticket
- screened application
- join waitlist
- join live

Modeled flow phases include:
- form
- ticket selection
- checkout
- processing
- success
- applied
- waitlist confirmation

These are mock flows but useful for conversion and state prototyping.

### Event Waiting Room Flow

Implemented as a pre-live event learner experience.

Capabilities include:
- countdown
- camera/mic preview
- discussion/Q&A
- system checks
- sharing/referral
- join CTA when live

### Live Meeting Flow

Path:

`Join event -> EventMeetingRoom`

Implemented capabilities include:
- multiple layout modes
- chat, polls, people, AI side tabs
- host controls
- participant moderation
- reactions
- poll flows
- minimize meeting
- leave meeting
- end event

### Post-Event Flow

Path:

`Past/ended event -> PostEventView`

Implemented sections include:
- `Overview`
- `Recording`
- `Resources`
- `Certificate`
- `Discussion`
- `Reviews`

Purpose:
- continuation of the learner journey after the live event has ended

### Event Role Variations

Modeled roles include:
- creator
- moderator
- speaker
- learner
- anonymous public

Modeled lifecycle variations include:
- draft
- building
- ready/published
- live
- ended/past
- cancelled
- sold out
- waitlisted

This role/lifecycle matrix is one of the core strengths of the prototype.

## Courses

### What The Course System Is For

The course system models course creation, curriculum design, student management, and learner playback.

Compared with events, the creator-side builder is strong, while learner-side wiring is less complete.

### Course Entry Points

Users can enter the course system from:
- `Welcome -> Create Course`
- `+ New -> Course`
- `Courses list -> Create Course`
- `Community builder -> Create Course`
- prompt-based creation from the welcome experience

### Course Creation Flow

Path:

`entry -> ChatFlow -> course preview -> course builder`

Implemented flow behavior includes:
- title capture
- metadata generation
- audience definition
- learning outcomes
- outline/module generation
- preview step
- handoff to builder

### Course Preview Flow

Purpose:
- give the user an AI-generated snapshot before opening the builder

Implemented content includes:
- generation checklist
- hero/header
- module preview
- quick stats
- continue to builder CTA

### Courses List View

Path:

`Sidebar -> Courses`

Implemented tabs include:
- `All Courses`
- `My Courses`
- `Enrolled`
- `Teaching`
- `Drafts`

Implemented features include:
- search
- grid/list style controls
- progress display on enrolled items
- private/community-linked badges
- right sidebar widgets for learning/performance/activity

Important note:
- course click behavior currently tends to route to the builder more often than to the learner player

### Course Builder

Main sections include:
- `Overview`
- `Curriculum`
- `Students`
- `Pricing`
- `Analytics`
- `AI Hub`
- `Settings`

Header actions include:
- AI mode
- AI personality
- autopilot
- preview button
- publish button

Cross-object actions include:
- link to community
- create community

### Course Overview Flow

Implemented content includes:
- title and description
- target audience
- prerequisites
- learning outcomes
- materials/resources
- pricing/access
- health metrics
- instructor panel
- create community CTA for students

Also includes AI-assisted regenerate/edit patterns.

### Curriculum Flow

Path:

`Course builder -> Curriculum`

Implemented capabilities include:
- module and lesson tree
- expandable modules
- lesson types such as video, article, quiz, assignment, download
- published vs draft lesson states

### Students Flow

Path:

`Course builder -> Students`

Implemented capabilities include:
- student roster
- progress percentages
- last active
- completion risk scoring
- engagement scoring

### Pricing Flow

Path:

`Course builder -> Pricing`

Purpose:
- prototype monetization and access logic for courses

### Analytics Flow

Path:

`Course builder -> Analytics`

Implemented themes include:
- completion rate
- engagement metrics
- course health
- student performance flavor

### Course Settings Flow

Path:

`Course builder -> Settings`

Purpose:
- configure course behavior, access, and linked-community style logic

### Course AI Hub Flow

Path:

`Course builder -> AI Hub`

Implemented concepts include:
- AI mode switching
- autopilot concept
- content and strategy playbooks

### Learner Course Player Flow

Implemented component:
- `CoursePlayer`

Sections include:
- lesson/video area
- curriculum sidebar
- `Overview`
- `Resources`
- `Discussion`
- `My Notes`

Actions include:
- mark complete
- save/helpful/share
- download resources
- add notes
- join related live event

Important note:
- the learner course experience exists, but it is not wired through the app as completely as the event learner flow

### Course Discovery Flow

Path:

`Marketplace -> Courses`

Purpose:
- learner browse and discovery surface for courses

Implemented patterns include:
- search
- featured/trending/for-you style grouping
- enroll CTA

### Course Cross-Object Flows

Important course relationship flows include:
- course -> create community
- course -> link to existing community
- community -> add existing course

## Marketplace

### What The Marketplace Is For

The marketplace is the main learner discovery hub.

It allows browsing across:
- courses
- events
- communities

### Marketplace Sections

Implemented tabs include:
- `Courses`
- `Events`
- `Communities`

Implemented patterns include:
- search
- featured/trending/for-you style filters
- AI recommendation assistant

Content-type CTAs include:
- course -> enroll
- event -> register
- community -> join

## Auth And Account Flows

### What The Auth System Is For

The auth system is a prototype auth layer built around mock/local flows rather than real backend APIs.

It includes:
- sign-in
- registration
- magic link
- OTP
- social login
- account merge concepts
- guest mode

### Sign-In Flow

Implemented paths include:
- identifier input
- email magic-link flow
- phone OTP flow
- social login
- optional password login simulation

### Register Flow

Implemented behavior includes:
- name plus identifier capture
- OTP or magic-link verification
- profile completion if information is incomplete

### Duplicate Account And Merge Flow

Implemented behavior includes:
- duplicate detection via local mock account state
- account comparison
- merge path routing

This is more detailed than many prototype auth systems.

### Recovery And Helper Flows

Built screens/components exist for:
- forgot password
- reset password
- all login methods
- expired magic link
- support-style helper states

Important note:
- some helper and error flows exist as components/imports but are not fully mounted in the current app render path

### Guest Flow

Important guest behavior includes:
- app can run in guest mode
- guest credits are tracked
- upgrade modal triggers exist for limits
- guest can enter prompt-based creation without full sign-up

## Onboarding

### What It Is

The project includes an onboarding flow component that collects:
- interests
- goals
- profile data

### Important Note

The onboarding flow exists and is partially connected in app state, but it is not fully surfaced in the current main render path.

## Home And Dashboard

### What It Is

The home/dashboard acts as the main creator hub.

Implemented patterns include:
- stats cards
- recent and draft widgets
- quick actions
- automation-related sections

## Search

### What It Is

The search system is a global search modal accessible from the shell.

It can be opened through:
- header search
- `Cmd/Ctrl + K`

Implemented search tabs include:
- `all`
- `communities`
- `events`
- `courses`
- `people`

Additional states include:
- recent
- suggestions
- saved
- actions

## Settings

### What It Is

The global settings page is broader than many prototype repos and covers personal, account, and system-style settings.

Implemented areas include:
- general
- integrations
- connected accounts
- notifications
- profile
- security
- privacy and data
- accessibility
- advanced
- billing

## Integrations

### What It Is

The integrations library models external system connections and setup experiences.

Examples include:
- Slack
- Zoom
- Google Meet
- Stripe
- PayPal
- Teams
- Mailchimp

Typical setup patterns include:
- OAuth/connect feel
- destination/channel selection
- automation-style configuration
- metrics/activity panels

## My Drive

### What It Is

`My Drive` acts as a lightweight asset repository for content and resources.

Implemented capabilities include:
- files/folders
- search
- upload
- create folder
- grid/list presentation

## Permissions

### What It Is

The permissions dashboard models team and admin access management.

Implemented capabilities include:
- user table
- invite user
- roles
- status
- search/filter

## AI And Copilot

### What The AI Layer Does

AI is one of the unifying concepts in the entire prototype.

It appears in:
- the welcome-screen prompt experience
- ChatFlow for community/course/event creation
- the global right-side copilot
- the marketplace AI assistant
- builder AI hubs for communities, courses, and events

Common AI concepts across the app include:
- builder/helper/analyst modes
- suggestions
- regenerate actions
- autopilot concept
- context-aware assistance patterns

## Most Important Cross-Section Flows

### AI Creation Pattern

`Welcome -> prompt -> AI chat -> preview -> builder`

This is the main creation pattern for:
- communities
- courses
- events

### Community Linking Pattern

The community system acts as the long-term home for users after shorter or more transactional experiences.

Important flows:
- event -> create community
- course -> create/link community
- community -> add event/course

### Event Lifecycle Routing Pattern

The same event object can transition across:
- admin builder
- public landing
- waiting room
- live meeting
- post-event view

This lifecycle-aware rendering is central to how the event system works.

## Current Maturity Assessment

### Strongest Areas
- events system
- community builder
- global shell and search
- auth/account merge concepting
- cross-object linking flows
- AI-assisted creation patterns

### Built But Partially Wired
- learner community views
- learner course player flow
- onboarding
- some auth recovery/helper states
- some preview and learner transitions outside the event system

## Bottom Line

This codebase is a mock-first product design sandbox for prototyping a multi-surface platform centered on:
- creating and managing events
- creating and managing courses
- building communities around those experiences
- using AI as the primary orchestration and creation layer

The system is not about real backend integration. It is about quickly testing product ideas, states, edge cases, and UX flows across creator, admin, learner, and public experiences.

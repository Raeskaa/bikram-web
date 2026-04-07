# Community Answers

## Purpose

This document proposes concrete answers for the community-system questions captured in:
- `Community discussions.md`
- `Leapspace Community Questions and Plan.docx`

This is not an MVP document.

This is a detailed target-system answer set for building the best community platform inside LeapSpace.

## Product Position

Communities in LeapSpace should not behave like a lightweight chat add-on.

They should behave like a full operating system for ongoing engagement around:
- people
- conversations
- events
- courses
- resources
- monetization
- governance
- AI-powered management

The community is the long-term home.
Events and courses are experiences inside that home.

## Core Answers

### What is a community?

A community is a structured, governed, branded space inside LeapSpace that can contain:
- members
- channels
- posts and discussions
- events
- courses
- resources
- announcements
- automations
- analytics
- AI tools

A community should be both:
- a destination for members
- an operating console for creators/admins

### What types of communities should exist?

Supported community types should be:
- interest-based
- cohort-based
- organization/team-based
- custom

These types should share one underlying system, but they should influence:
- default channel templates
- onboarding flow
- AI suggestions
- layout emphasis
- analytics emphasis

Example:
- cohort communities emphasize progress, intros, office hours, assignments
- organization communities emphasize announcements, docs, teams, permissions
- interest communities emphasize discovery, feed, engagement, events

## Lifecycle Answers

### Final lifecycle

Community lifecycle should be:

`Draft -> Published -> Paused -> Archived -> Deleted`

### What each state means

#### Draft
- visible only to owner/admins and invited builders
- not discoverable
- no member activity
- structure, branding, channels, permissions, monetization, onboarding can be configured

#### Published
- active and usable
- follows its configured access rules
- can be discovered if discoverability is enabled
- notifications, integrations, automations, AI, analytics all operate normally

#### Paused
- temporary operational freeze
- new joins stop
- posting stops
- live automations pause
- integrations pause
- events and sync processes do not backfill missed actions later unless explicitly re-run by admin
- admins can still access management surfaces
- members can see a paused-state landing message

#### Archived
- community becomes read-only
- content remains preserved
- members retain access unless admin chooses stricter archive behavior
- no new posts, joins, automations, or active notifications
- resources remain accessible based on archive policy
- export remains possible

#### Deleted
- irreversible removal after confirmation workflow
- should require explicit owner confirmation and time delay / recovery window

### Archive behavior answer

Archive should be creator-configurable with safe presets:
- `Read-only archive` recommended default
- `Read-only + hidden from discovery`
- `Export and delete`

The best default is:
- preserve content
- keep it read-only
- notify members
- hide from public discovery unless explicitly kept public

## Membership And Access Answers

### Join modes

Communities should support all of these join modes:
- open
- invite-only
- application-based
- paid
- application then pay

These should be configurable at the community level.

### Recommended access model

Access should be split into two layers:

#### Discovery layer
- public
- unlisted
- private

#### Joining layer
- open join
- invite required
- application required
- payment required
- application + payment required

This is better than trying to collapse everything into one status.

### Guest / visitor mode

Guest mode should exist.

Guests can:
- view public landing page
- preview selected public channels if the creator allows it
- view selected posts/resources/events marked as public preview

Guests cannot:
- post
- react
- DM
- download gated resources
- join private channels

Guest visibility should be configurable at:
- community level
- channel level
- resource/post level for select public items

### Capacity / member cap

Communities should support optional member capacity.

Capacity should be:
- optional
- configurable by creator
- system-limited based on LeapSpace plan / credit entitlement if needed

### Waitlist on communities

Yes, communities should support waitlist.

Community waitlist should support:
- manual approval
- auto-approval when seats open
- priority rules
- invite bypass
- application bypass if admin chooses

### Rejoin behavior

If a user leaves voluntarily:
- they can rejoin if the join policy allows it
- their historical posts remain attributed to them
- role restoration should be optional, default off

If a user was removed by admin:
- rejoin requires admin approval unless explicitly allowed

If banned:
- cannot rejoin unless ban is lifted

## Roles And Permissions Answers

### Ownership model

Community ownership model should be:
- one owner
- multiple super admins/admins
- standard staff roles
- custom roles

Owner is unique because owner transfer is sensitive and singular.
Admin power can be shared.

### Default role set

Default roles should be:
- owner
- super admin
- admin
- moderator
- community manager
- content manager
- event host
- course lead
- resource manager
- member
- guest

### Custom roles

Custom roles should be true permission bundles, not just labels.

They should control:
- UI visibility
- creation rights
- moderation rights
- invite rights
- analytics visibility
- monetization controls
- automation controls
- AI authority level

### Permission model

Permissions should be layered:

#### Community-level permissions
- manage branding
- manage channels
- manage members
- manage roles
- manage monetization
- manage analytics
- manage automations
- manage AI settings
- manage events/courses/resources

#### Channel-level permissions
- view
- post
- comment
- react
- pin
- feature
- moderate
- invite into channel
- access files/resources

#### Object-level permissions
Applied to:
- events
- resources
- posts
- analytics modules
- automations

### Auto-assigned roles

Yes, roles should be auto-assignable.

Rules should support:
- membership tier
- payment status
- application outcome
- course completion
- event attendance
- member activity
- custom automation rules

## Moderation And Safety Answers

### Enforcement states

The moderation model should include:
- warning
- mute
- restrict
- suspend
- ban

### Meaning of each state

#### Warning
- formal admin warning
- visible in member moderation history

#### Mute
- member can view but cannot post/reply/react in selected surfaces
- can be channel-level or community-wide

#### Restrict
- limited participation rights
- example: read all, post only in intros/help channels

#### Suspend
- temporary full participation freeze
- can be time-bound

#### Ban
- permanent removal until manually reversed

### Appeals

Yes, appeals should exist.
Appeals should be optional per community.

### Moderation toolkit

Moderators/admins should have:
- delete/hide post
- lock thread
- pin/unpin
- move post to another channel
- warn
- mute
- restrict
- suspend
- ban
- review reports
- review AI-flagged content
- see moderation history
- access audit log

### Audit logs

Audit logs should be mandatory for admin/moderation actions.

Track:
- actor
- target
- action
- timestamp
- reason
- before/after values when applicable
- whether action was AI-suggested or AI-executed

## Channel System Answers

### Structure

Community structure should be:
- one community
- channel groups/categories
- channels inside groups

The original “one level” concept can still hold functionally, but UI should support grouping for scale.

### Supported channel types

Channels should include:
- text discussion
- announcements
- Q&A
- resources/files
- introductions
- event channel
- course discussion channel
- voice/video room
- private staff/mod channel
- DM/group DM
- custom channel types powered by templates

### Default channel set

Every new community should start with a smart default template.

Baseline default:
- `Start Here`
- `Announcements`
- `General`
- `Introductions`
- `Resources`
- `Events`

Then type-based additions:
- cohort: `Assignments`, `Wins`, `Office Hours`
- org/team: `Leadership`, `Docs`, `Teams`
- interest: `Showcase`, `Questions`, `Meetups`

### Channel restrictions

Channels should support restrictions by:
- role
- membership status
- invitation
- tier/payment access
- manual allowlist

### Channel states

Channels should support:
- active
- locked
- archived
- hidden

#### Locked
- visible but not writable

#### Archived
- hidden by default, read-only, restorable

## Posts And Content Answers

### Post ownership model

Every post should have one canonical home channel.
It can then be:
- shared
- cross-posted by reference
- featured elsewhere

It should not exist as a rootless feed object.

### Feed model

Community feed should support:
- all/feed view
- channel-specific view
- trending
- latest
- following/bookmarked

Default sorting should be algorithmic, but configurable by admin.

### Post types

Supported post types should include:
- text
- rich text
- markdown
- image
- video
- file
- link
- poll
- embed
- code snippet
- checklist
- table
- event-linked post
- course-linked post

### Composer model

The best model is:
- rich text / block-style editor by default
- markdown support inside advanced mode

This gives expressive power without making the default experience too technical.

### Threading

Posts should support threading up to 3 levels.

### Post controls

Posts should support:
- pin
- feature
- bookmark
- save draft
- schedule
- share to another channel
- move to another channel
- lock replies
- turn into announcement

### Pinned vs featured vs bookmarked

#### Pinned
- channel-specific prominence
- stays at the top of that channel unless configured otherwise

#### Featured
- community-wide promotion surface
- may appear on overview/home/highlights

#### Bookmarked
- private per-user save state

### Edit behavior

Members can edit their own posts within a configurable time window.
Admins/moderators can edit with audit logging if allowed.

Edit history should exist.
Visibility of edit history should be configurable:
- visible to moderators always
- visible to members optionally

### Deleted content behavior

Deleted content should go to a moderation trash/recovery state for a configurable retention window before permanent deletion.

## Reactions And Engagement Answers

### Reaction model

Both should exist:
- emoji reactions
- upvote/downvote or endorse/disagree signals

Admins should be able to configure which systems are active.

### Gamification

Gamification should be configurable, not forced.

Supported elements:
- points
- streaks
- levels
- badges
- achievements
- leaderboards
- goals

Admins can:
- turn the whole system off
- enable only some parts
- decide whether gamification is visible publicly

## Events Integration Answers

### Event-community relationship

An event should have one primary community.

It may also be surfaced in other communities as a linked/shared event, but governance should belong to one primary community.

### Creating events inside communities

When an event is created inside a community, the system should be able to auto-create:
- event channel
- event tab/card in community
- RSVP visibility in community
- post-event recording/resource destination

### Who can host events?

This should be configurable.

Possible policy values:
- owner/admin only
- moderators and above
- selected roles
- all approved members

### Recordings

Event recordings should be stored inside the community resource system, with access inherited from event/community rules.

## Courses Integration Answers

### Course-community relationship

A community can contain multiple courses.

Courses should integrate through:
- course-specific channels
- cohort/member segmentation
- progress-based automations
- course-related announcements and office hours

### Permissions based on learning state

Course completion should be able to influence:
- badges
- unlocked channels
- role changes
- access to alumni spaces

## Monetization Answers

### Community monetization modes

Communities should support:
- free
- one-time paid join
- recurring subscription
- multi-tier membership
- add-on paid channels/resources/events

### Gated access

Yes, channels and resources should be gateable.

Gating should work by:
- membership tier
- role
- payment status
- bundle purchase

### Trials

Paid communities should support free trial.

### Credits and payments

LeapSpace can use credits as a wallet/accounting layer, but the product should also support clear direct-purchase semantics from the user perspective.

### Refund behavior

Refund policy must define what happens to:
- community access
- associated event access
- tier-based channels/resources
- earned badges/roles

Recommended default:
- refund removes access to paid entitlements unless manually preserved by admin

## Notifications And Communication Answers

### Notification channels

Communities should support:
- in-app
- email
- push
- integrations/webhooks

### User preferences

Members should be able to configure notification preferences at:
- account level
- community level
- channel level
- notification-type level

### Notification types

Types should include:
- mentions
- replies
- direct messages
- new posts in followed channels
- announcements
- event reminders
- role changes
- moderation actions
- payment/access changes

### Broadcasts

Admins should be able to send broadcasts by:
- everyone
- role
- channel membership
- activity segment
- payment tier
- location/language if available

### Digest

Email digest should support:
- daily
- weekly
- custom cadence
- per-community opt-in

## Discovery And Growth Answers

### Discoverability model

Communities should support:
- public discoverable
- public unlisted
- private hidden

### Public landing page

Every community should have a public landing page, unless hidden/private.

Landing page can include:
- hero and branding
- about
- featured posts
- featured channels preview
- events
- courses
- social proof
- pricing/join CTA
- testimonials/reviews
- FAQ

### Growth tools

Communities should support:
- invite links
- email invites
- referral links
- embeddable join widgets
- featured placement in LeapSpace discovery

## Analytics Answers

### Analytics model

Analytics should be real-time or near-real-time and cover:
- members
- active users
- joins/leaves
- retention
- churn
- posts/comments/replies
- reactions and votes
- top contributors
- top channels
- content performance
- event engagement
- course engagement
- monetization/revenue
- conversion funnels
- cohort behavior
- topic trends

### Export

Admins should be able to export:
- CSV summaries
- member data by permissions
- channel/content reports
- revenue analytics where applicable

## AI Answers

### AI role in communities

AI should be embedded across the system, not isolated to one tab.

AI should support:
- community setup
- channel setup suggestions
- moderation suggestions
- auto moderation
- content drafting
- summarization
- catch-me-up for channels/threads
- member insights
- sentiment analysis
- analytics summaries
- engagement suggestions
- support chatbot behavior

### AI control model

Admins should be able to configure AI at a granular level:
- off
- assist only
- suggest + approve
- semi-automatic
- fully automatic for selected workflows

### AI governance

All AI actions should be logged.
Admins should be able to disable specific AI capabilities while keeping others enabled.

## Branding And Customization Answers

### Branding controls

Communities should support:
- colors
- typography
- cover/hero style
- layout emphasis
- card styles
- CTA style
- member home structure

### White-label depth

Support should be:
- strong theming and layout customization by default
- custom CSS only for advanced/enterprise scenarios

### Domains

Communities should support subdomains like:
- `mycommunity.leapspace.ai`

### Community onboarding

Communities should support fully configurable onboarding.

That onboarding can include:
- welcome message
- intro media
- profile completion
- pick interests
- choose channels
- read and accept rules
- make intro post
- choose notification settings
- choose timezone/language

## Resources And Library Answers

### Resource model

Communities should have a shared resource library with:
- folders
- tags
- versioning
- permissions
- previews
- downloads
- expiry/revocation where needed

### Access rules

Resources should be gateable by:
- community membership
- role
- channel
- tier
- event attendance
- course enrollment/completion

### Recording access

Event recordings should inherit the stricter rule between:
- event access policy
- community/resource access policy

## Search Answers

### Search scope

Community search should cover:
- channels
- posts
- comments
- members
- resources
- events
- courses

### Permission-aware search

Search must be permission-aware.
Users should never see restricted content in results they cannot access.

## Compliance And Safety Answers

### Data controls

Communities should support:
- member data export
- member data deletion handling
- retention policies
- audit logs
- moderation logs
- consent/rules acceptance logs

### Privacy-sensitive spaces

The system should be able to support privacy-sensitive communities by configuration, even if not every compliance workflow is built on day one.

## Mobile Answers

### Mobile strategy

Communities should be designed mobile-first in interaction quality, even if delivered through responsive web first.

Mobile-specific behavior should consider:
- channel switching
- composer simplicity
- notifications
- catch-up summaries
- event/course quick access
- moderation quick actions for admins

## Scale Answers

### Small communities
- more conversational
- flatter structure
- lighter moderation

### Medium communities
- grouped channels
- stronger member segmentation
- more formal moderation

### Large communities
- stronger discovery/search
- role delegation
- automation-heavy moderation
- segmented broadcasts
- analytics rollups

### Enterprise-scale communities
- delegated administration
- policy-heavy configuration
- audit/compliance emphasis
- deep integrations
- advanced export/reporting

The product should adapt in UI and operations as scale increases.

## Migration Answers

### Importers

LeapSpace should eventually support import from:
- Circle
- Discord
- Slack

### Most important imported entities

Import priority should be:
- members
- channels
- roles
- resources
- posts/messages
- events

Imported content should be clearly marked as migrated data where relevant.

## Final System Stance

The best community platform inside LeapSpace should combine:
- the structure of Slack/Discord-style spaces
- the richness of modern content communities
- the governance and segmentation of membership platforms
- the event/course integration of an education and engagement ecosystem
- the intelligence layer of AI-native tooling

Communities should not feel like a forum attached to events.
They should feel like the central nervous system of LeapSpace.

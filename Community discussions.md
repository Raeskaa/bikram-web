# Community Discussions

## Purpose

This document consolidates the community-related thinking from:
- `Leapspace Community Questions and Plan.docx`
- the comment threads inside that document
- the current prototype reference in `SYSTEM_OVERVIEW_AND_FLOW_MAP.md`

This is not a description of only what is currently built.

This is a product thinking document for communities, organized into:
- decided
- open questions
- future scope
- missed questions that should still be discussed

## Current Framing

The current prototype already has a community builder, channels, members, linked events/courses, messages, analytics, AI hub, and settings.

However, the team discussion makes it clear that the intended community product is much broader:
- community as a long-term container
- community as a parent for events, courses, resources, and engagement
- community as a governed and monetizable product surface
- community as an AI-assisted operating system, not only a chat/feed layer

## Decided

### Core Identity

- A community is a parent container that can own courses and events inside it.
- A community has channels.
- Channel structure is one level for now: `Parent community -> channels`.
- Different types of communities can exist: interest-based, cohort-based, organization/team-based, and custom.
- For now, those community types can behave the same in the product.
- In later phases, layout, AI behavior, and supported content can become more type-specific.

### Lifecycle

- `Paused` is a valid community lifecycle state.
- When a community is paused, activity stops.
- Integrations and syncing are paused during that period.
- There is no backfill of data/events that happened during the paused window.

### Membership And Access

- Communities can support guest/visitor mode.
- Guest/visitor visibility applies to open communities, not closed ones.
- Communities can have capacity/waitlist behavior.
- Members can belong to multiple communities simultaneously.
- Users inherit a primary community.
- Primary community is the user's personal LeapSpace.

### Roles And Permissions

- There is a single owner model.
- Multiple admins are allowed.
- The system should support standard roles and custom roles.
- Permission assignment can happen at a global permission level or individual event level where relevant.

### Channels And Content Model

- Posts are always tied to a channel.
- Posts may be shared across channels unless privacy rules prevent it.
- If content is pinned, default behavior should be channel-specific.
- Admins should be able to customize how pinned content is surfaced across channels.

### Feed And Engagement

- Feed ranking should default to algorithmic/trending/relevance.
- Admins should be able to change that configuration.
- Members can react to posts/messages.
- Members can also upvote/downvote messages.
- Gamification can exist, but admins must be able to switch it off.

### Permissions Around Privacy

- Tagging or associating content with a private community requires permission.

### Pricing/Scale Direction

- There should be a free allowance.
- Additional usage can cost credits.
- Tiered subscriptions are not the current direction for this specific limit model.

## Open Questions

These questions were explicitly raised or are still not fully resolved by the discussion.

### Core Identity And Lifecycle

- Final lifecycle model:
  - `Draft -> Published -> Archived`
  - `Draft -> Published -> Paused -> Archived`
  - `Draft -> Published -> Paused -> Archived -> Deleted`
- What exactly should `Archived` do:
  - read-only access
  - hidden but recoverable
  - export then delete
  - creator-configurable behavior
- Should `Deleted` be a final lifecycle state or just an irreversible action?

### Membership And Access

- Which access modes should launch in phase 1:
  - open
  - invite-only
  - application-based
  - paid
  - application then pay
- Should member cap be optional per community?
- If there is a cap, what happens when the cap is reached?
- Should communities always support waitlist, or only when capacity is enabled?
- Should join approval be manual only, rule-based, or AI-assisted?
- What is the exact behavior of guest mode:
  - browse landing page only
  - browse selected channels
  - preview resources
  - preview events

### Moderation States For Members

- Which enforcement states should exist:
  - ban only
  - suspend + ban
  - suspend + ban + mute
  - suspend + ban + mute + restrict
- Should suspension always be temporary?
- Should mute be channel-specific or community-wide?
- Should restrict mean read-only access to some surfaces or partial posting rights?

### Roles And Permissions

- Can roles be auto-assigned?
- If yes, should that happen based on:
  - membership tier
  - activity level
  - completion of actions
  - custom automations
- How deep should per-channel permission overrides go?
- What presets should exist by default?
- Are custom roles purely permission bundles, or can they also drive UI visibility and workflow automation?

### Channels And Structure

- Which channel types should launch first?
- Should admins be able to group channels into categories immediately or in a later phase?
- Can channels be paid-restricted in addition to role/invite restrictions?
- How should private/DM channels work:
  - one-to-one only
  - group DM
  - hidden admin/mod channels
- What should the default channel set be for a new community?
- Will template-based community creation define channel structure automatically?
- Should archived channels remain searchable?

### Content And Posts

- Which post composer model should launch first:
  - rich text only
  - markdown only
  - block editor only
  - toggle between them
- How much thread depth is actually needed at launch?
- What is the difference between `pinned`, `featured`, and `bookmarked` in product behavior?
- Should posts be schedulable by all members, only by privileged roles, or by paid communities only?
- Should AI moderation run before publish or after publish?
- Is there a manual approval queue for all content or only flagged/sensitive cases?

### Events Integration

- Can a community member host an event, or only admins/moderators?
- Is this configurable per community?
- Should an event belong to exactly one community in the final product?
- When creating an event inside a community, what should auto-create:
  - event channel
  - event tab
  - announcement thread
  - recording space
- Can external/public events be associated with a private community?

### Courses Integration

- How tightly should courses be embedded in communities in phase 1?
- Are course discussions always channel-based or lesson-based?
- Should course completion change community permissions or badges?

### Monetization

- What monetization modes should launch first:
  - free community
  - one-time paid join
  - recurring subscription
  - paid tiers
- Can channels or individual content be paywalled?
- Will there be a free trial for paid communities?
- How does the credits model work with community purchases?
- What is the platform fee / revenue share model?
- If users buy an event directly and later get refunded, what is the system behavior around community access and credits?

### Notifications And Communication

- Which notification surfaces launch first:
  - in-app
  - email
  - push
  - integrations
- How granular should user notification preferences be?
- Should admins be able to broadcast by role, segment, activity, or membership tier?
- Should digest emails be global, per community, or per channel?

### Discovery And Growth

- What does the public landing page include?
- Should communities appear in platform discovery by default or be opt-in?
- What referral mechanics are needed?
- Should invite widgets/embeds be included in phase 1?

### Analytics And Insights

- Which analytics tier should ship first?
- Should real-time analytics be truly live or near-real-time?
- What can be exported?
- Do we need revenue analytics in the first version of communities?

### AI

- Which AI features are first-class at launch and which are later?
- Should AI be visible as a separate hub, embedded everywhere, or both?
- What level of AI moderation autonomy is acceptable?

### Branding And Customization

- How much visual customization should launch in phase 1?
- Is custom CSS really needed, or should the first version stay token/theme based?
- What onboarding depth should communities support:
  - no onboarding
  - welcome message only
  - multi-step onboarding
  - fully customizable onboarding wizard

### Resources And Library

- Can resources be gated by membership tier?
- Should resource permissions inherit from channel permissions or be managed separately?
- Are resources attached to channels, the overall community, or both?

### Scale And Migration

- How should behavior change at different community sizes?
- What is the import/migration path from Circle, Discord, and Slack?
- Which imported entities matter most first:
  - members
  - channels
  - messages
  - events
  - files

### Mobile

- What is the mobile strategy for communities?
- Responsive web only, or explicit mobile-native interaction patterns?

## Future Scope

These are areas clearly intended, but feel better suited to later phases unless they become central to the MVP.

### Community Type Specialization

- Different layouts and interaction patterns by community type
- AI behavior that changes by community type
- custom templates for vertical/community category

### Advanced Roles And Governance

- highly granular custom role builder
- per-channel overrides everywhere
- policy presets
- rule-based role assignment
- community operating automations

### Advanced Channel System

- voice/video channels
- advanced channel categories
- paid channel access
- DM/group DM ecosystems
- hidden moderator spaces

### Advanced Content System

- full block editor
- rich embeds and advanced content blocks
- deep post scheduling
- cross-channel featured content rules
- advanced moderation queue workflows

### Advanced Member Experience

- streaks
- goals
- achievements
- layered level systems
- configurable onboarding journey
- personalized channel recommendations

### Advanced Events Integration

- auto-generated event spaces inside communities
- recordings automatically placed into community resource areas
- event-specific discussion rooms and follow-up sequences
- permission-driven event host workflows

### Advanced Monetization

- paid tiers with differential access
- free trial systems
- upgrade paths
- recurring billing complexity
- revenue reporting and settlement logic

### Advanced Analytics

- cohort analysis
- funnel metrics
- churn prediction
- sentiment analysis
- topic clustering
- peak activity optimization

### Advanced AI Layer

- omnipresent assistant across all community surfaces
- discussion summarization and catch-up
- sentiment and health reports
- member intelligence
- AI moderation workflows
- AI chatbot trained on community context

### Branding And Platform Expansion

- deeper theming
- font/layout customization
- white-label style controls
- subdomain management
- creator-shared templates marketplace

### Migration And Ecosystem

- importers from Circle, Discord, Slack
- embeds for community content
- API and integration layer for community data

## Missed Questions That Should Be Added

These were not covered enough in the current discussion and should be added before implementation decisions.

### Identity And Data Model

- Can one post belong to multiple channels natively, or only one source channel plus shared references?
- Can a member have different roles in different channels?
- Can a member have different roles across different communities under the same LeapSpace?
- Is a community always owned by one creator account, or can it belong to an organization/workspace entity?

### Joining And Re-Entry

- Can a member leave and later rejoin automatically?
- If a removed user rejoins, do they regain history, badges, and previous roles?
- Can banned users appeal and be reinstated?
- What happens to pending applications if a community is paused or archived?

### Channel Behavior

- Can channels have their own mini-feed sort setting?
- Can channels be temporarily locked without being archived?
- Can channels have posting templates or required formats?
- Can channel visibility differ between guests, applicants, members, and paid members?

### Content Governance

- Who can edit a post after publishing, and for how long?
- Is edit history visible to moderators only or to everyone?
- Can posts be cross-posted automatically into announcement channels?
- Can members save drafts?
- Do deleted posts go to a moderation trash/recovery bin?

### Search And Discovery

- Is community search scoped by permissions?
- Can guests discover only public communities or also see private teasers?
- Can channels be discoverable without revealing their content?
- Should search cover posts, members, resources, events, and courses together?

### Resource Model

- Are resources versioned?
- Can resources expire or be revoked after access ends?
- Can event recordings inherit event access rules or community access rules?

### Notifications

- Do members get notified for edited posts, only new posts, or both?
- What is the default notification behavior for newly joined members?
- Can admins force-override critical announcements?

### Compliance And Safety

- Do we need data retention policies per community?
- Do we need export/delete tools for member data?
- Do moderators need audit trails for every action?
- Are there privacy controls for minors, regional restrictions, or compliance-sensitive communities?

### Internationalization

- Can a community have a primary language?
- Can channels be language-specific?
- Should AI summaries and notifications respect community language preferences?

### Performance And Scale

- What changes in the UI when a channel has millions of messages?
- Do large communities need special moderation queues, role delegation, or analytics rollups?
- Do we need pagination/virtualization assumptions in the product model now?

### Economic And Access Edge Cases

- What happens when a paid member's subscription lapses?
- Do they lose access immediately, downgrade gracefully, or retain limited read-only access?
- What happens to their posts and resources after downgrade?
- Can gifted access or sponsored memberships exist?

### AI Governance

- Can admins disable some AI features but keep others?
- Can AI act automatically, or only recommend actions?
- Are AI actions logged in audit history?
- Can communities opt out of using their content for AI training/context?

## Relationship To Current Prototype

The current prototype already supports:
- community creation via AI flow
- communities list
- builder sections for overview, channels, members, courses, events, messages, analytics, AI hub, settings
- member management basics
- linked events and courses

The current prototype does not yet fully express the intended design in:
- access policy depth
- community waitlist/member-cap logic
- moderation and safety operations
- community monetization
- detailed role governance
- advanced content model
- notification/broadcast systems
- onboarding depth
- archive/pause behavior as a real product workflow

## Bottom Line

Communities should be treated as a core product surface, not just a supporting feature.

The intended direction is:
- a governed space
- a content and engagement system
- a parent container for events/courses/resources
- a monetizable and discoverable product surface
- an AI-assisted operating layer for creators and admins

The prototype is a strong starting point, but the team discussion points toward a much deeper community product that still needs structured product decisions before implementation is finalized.

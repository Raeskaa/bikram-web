# API Understanding

## Purpose

This document captures:
- what the current LeapSpace API shape appears to be
- what backend conventions are already visible
- how future community APIs should be designed to stay consistent with the existing platform style

This document is based on:
- the API docs shared from `https://dev.leapspace.ai/api/docs`
- `Community Answers.md`
- `Community discussions.md`
- the current prototype/system understanding in `SYSTEM_OVERVIEW_AND_FLOW_MAP.md`

This is not implementation work.
This is an API design understanding and recommendation document.

## What Exists Today

From the shared API docs, the current backend is already organized into platform-level modules:
- `leapspaces`
- `integrations`
- `credits`
- `languages`
- `change-log-modules`
- `events`
- `media`

This is important because it shows the backend is already evolving as a real platform API, not only a single-feature event service.

## Core Platform Understanding

### LeapSpace is the top-level container

The presence of:
- `POST /api/leapspaces`
- `GET /api/leapspaces`
- `GET /api/leapspaces/{leapspaceId}`
- `POST /api/leapspaces/members`
- `GET /api/leapspaces/members/search`

strongly suggests that `LeapSpace` is the top-level workspace/container model.

This means future community APIs should likely be designed as platform objects that belong to a LeapSpace, rather than as isolated global objects.

### Events are currently the most mature domain

The event APIs already cover:
- search/discovery
- event CRUD
- waitlist
- applications
- registrations
- invitations
- sessions
- tickets
- categories
- resources
- FAQs
- learning outcomes
- prerequisites
- audience
- changed logs
- speakers
- save/bookmark behavior

This tells us two things:
- the backend team is comfortable with domain-specific subresources
- the events domain is already using modular APIs rather than one giant endpoint

### Shared systems already exist

The backend already has reusable system modules for:
- media uploads
- credits
- integrations
- languages
- change log discovery

This implies community APIs should reuse these shared systems wherever appropriate instead of reinventing them.

## API Style Conventions Already Visible

Based on the current docs, the backend has a recognizable style.

### 1. Resource-oriented REST structure

Patterns already used:
- `POST /api/events`
- `GET /api/events/{eventId}`
- `PUT /api/events/{eventId}`
- `GET /api/events/{eventId}/sessions`
- `POST /api/events/{eventId}/sessions`
- `PATCH /api/events/{eventId}/applications/{applicationId}`

This means future community APIs should follow the same approach:
- top-level resource
- nested subresources
- action endpoints only when needed

### 2. Search/list endpoints are separate from detail endpoints

Events use:
- `GET /api/events/search`

instead of overloading `GET /api/events` with every search/filter case.

This suggests communities should likely use:
- `GET /api/communities/search`

for discovery and filtering, while detail stays on:
- `GET /api/communities/{communityId}`

### 3. Subresources are explicit and domain-specific

Events use dedicated subresources such as:
- `/waitlist`
- `/sessions`
- `/tickets`
- `/registrations`
- `/applications`
- `/resources`
- `/faqs`
- `/learning-outcomes`
- `/audience`
- `/prerequisites`

This is a strong pattern and should continue for communities.

### 4. Actions use POST/PATCH when the action is not a pure resource replacement

Examples:
- `POST /api/events/{eventId}/save`
- `PATCH /api/events/{eventId}/waitlist/{waitlistId}`
- `POST /api/events/invitations/respond`

So future community APIs should not be afraid to use action-style endpoints where they are operationally clearer.

### 5. Permissions and auth are session-based

The docs consistently use:
- `better-auth.session_token`

And error models include:
- `SessionAuthenticationError`
- access denied errors
- owner access denied errors

This means community APIs should assume:
- authenticated, session-based access
- role-based authorization
- LeapSpace-scoped access rules

### 6. Pagination and filtering conventions already exist

Patterns already used:
- `cursor`
- `limit`
- query-driven filters
- enum values in query params

Community list/search endpoints should use the same pattern.

### 7. Naming style is practical, not overly abstract

Current naming leans toward direct business language:
- `applications`
- `registrations`
- `speakers`
- `includes`
- `save`
- `changed-logs`

So future community APIs should also prefer direct product language over overly generic names.

## Event API Learnings Relevant To Communities

The event APIs already reveal several useful design choices for future community APIs.

### Strong filtering in search responses

`GET /api/events/search` already supports:
- tabs
- sub-tabs
- format
- visibility
- access
- price
- nested context
- leapspace scope
- date range
- category
- sort
- cursor and limit
- timezone

This is useful because community discovery/search will need a similarly rich filter model.

### Event response shape is composite, not flat

The event search response includes:
- core event fields
- registration state
- organiser info
- leapspace info
- linked community info
- role info
- counts and flags

This shows that LeapSpace APIs are already comfortable returning API-view models tailored to frontend needs, not only raw table-shaped records.

That is a good sign for communities, because communities will need rich response shapes too.

### Event domain already knows about community nesting

The event search API includes:
- `nested = standalone | community | course`
- `community` in the result

This is strong evidence that the backend already conceptually understands that communities are parent/linked domain objects.

## Community Product Direction From Our Docs

From `Community Answers.md`, the intended community system is a deep domain with:
- community lifecycle
- access/discovery model
- guest mode
- member cap and waitlist
- roles and custom permissions
- channels and channel groups
- rich posts and threads
- moderation and audit logs
- monetization and tier gating
- notifications and broadcasts
- analytics and AI
- events/courses/resources inside the community

This means community APIs should not be designed as a single CRUD surface.

They need to be designed as a full domain API like events, and probably deeper.

## Recommended Community API Design Principles

These recommendations are based on the style already used in LeapSpace APIs.

### 1. Communities should be first-class top-level resources

Recommended root resource:
- `/api/communities`

Not:
- hidden under events
- only hidden under leapspaces
- modeled only as a lightweight settings extension

Why:
- communities are core product objects
- they need their own lifecycle, discovery, membership, governance, and content systems

### 2. Communities should still be scoped to LeapSpace

Even though communities should be top-level resources, they should clearly belong to a LeapSpace.

This can be expressed by:
- storing `leapspaceId` on the resource
- supporting LeapSpace-aware filtering and authorization
- including `leapspace` in response payloads where useful

### 3. Separate discovery/search from resource detail

Recommended pattern:
- `GET /api/communities/search`
- `POST /api/communities`
- `GET /api/communities/{communityId}`
- `PUT /api/communities/{communityId}`

This matches the event search style and keeps list/discovery concerns separate from resource retrieval.

### 4. Use nested subresources for every operational domain

Communities should expose dedicated subresources for:
- members
- join requests / applications
- waitlist
- invitations
- roles
- permissions
- channels
- posts
- reactions
- reports
- moderation actions
- resources
- events
- courses
- analytics
- broadcasts
- rules
- onboarding
- settings
- branding
- automations
- AI settings
- change logs

This is consistent with how events are already modeled.

### 5. Prefer business-facing names

Good future naming examples:
- `members`
- `applications`
- `waitlist`
- `channels`
- `posts`
- `rules`
- `broadcasts`
- `reports`
- `moderation-actions`
- `audit-logs`

Avoid over-abstract names that do not match product language.

### 6. Use action endpoints when state transition is the main thing

Examples that would fit current LeapSpace style:
- join a community
- leave a community
- save/bookmark a community
- restore an archived channel
- approve an application
- ban a member
- mute a member
- publish a community
- pause a community
- archive a community

These should be expressed through targeted `POST` or `PATCH` endpoints where clearer than forcing everything through `PUT`.

### 7. Keep response models frontend-friendly

The event responses already show a frontend-oriented shape.

Community APIs should also return useful composite responses such as:
- role and permission summary for current user
- counts
- access state
- join state
- lifecycle state
- branding summary
- featured content preview
- linked events/courses/resources summary

### 8. Make all community search and retrieval permission-aware

Search and detail APIs must respect:
- guest visibility
- membership status
- channel-level restrictions
- paywalls
- private content rules

This is especially important for channels, posts, and resources.

### 9. Reuse shared platform modules instead of duplicating them

Communities should reuse existing systems where possible:
- `media` for uploads
- `credits` for billing/access implications
- `integrations` for Slack/Zoom/etc
- `languages` where multilingual support applies
- `change-log-modules` / changed-log patterns for audit/history discovery

## Proposed Community API Surface

This section is not code and not final schema.
It is a recommended API shape based on current LeapSpace patterns.

## 1. Community Core

Recommended core endpoints:
- `POST /api/communities`
- `GET /api/communities/search`
- `GET /api/communities/{communityId}`
- `PUT /api/communities/{communityId}`
- `PATCH /api/communities/{communityId}/status`
- `POST /api/communities/{communityId}/duplicate`
- `POST /api/communities/{communityId}/save`

Why:
- matches event style
- supports lifecycle transitions directly
- supports duplication because our answers doc explicitly includes templates/duplication behavior

### Community core response should include

- `id`
- `name`
- `slug`
- `description`
- `communityType`
- `lifecycleStatus`
- `discoveryVisibility`
- `joinMode`
- `guestAccessEnabled`
- `memberCap`
- `waitlistEnabled`
- `leapspace`
- `owner`
- `brandingSummary`
- `currentUserRole`
- `currentUserAccess`
- `counts`
- `isSaved`
- `createdAt`
- `updatedAt`

## 2. Membership

Recommended endpoints:
- `GET /api/communities/{communityId}/members`
- `GET /api/communities/{communityId}/members/search`
- `POST /api/communities/{communityId}/members`
- `GET /api/communities/{communityId}/members/{memberId}`
- `PATCH /api/communities/{communityId}/members/{memberId}`
- `DELETE /api/communities/{communityId}/members/{memberId}`
- `POST /api/communities/{communityId}/join`
- `POST /api/communities/{communityId}/leave`

Why:
- consistent with existing member and event registration behavior
- separates admin member management from self-service join/leave

## 3. Applications And Waitlist

Recommended endpoints:
- `GET /api/communities/{communityId}/applications`
- `POST /api/communities/{communityId}/apply`
- `PATCH /api/communities/{communityId}/applications/{applicationId}`
- `GET /api/communities/{communityId}/waitlist`
- `POST /api/communities/{communityId}/waitlist`
- `PATCH /api/communities/{communityId}/waitlist/{waitlistId}`

Why:
- mirrors event applications/waitlist patterns already in place
- keeps community join operations familiar for backend and frontend teams

## 4. Invitations

Recommended endpoints:
- `POST /api/communities/{communityId}/invitations`
- `GET /api/communities/{communityId}/invitations`
- `PATCH /api/communities/{communityId}/invitations/{invitationId}`
- `DELETE /api/communities/{communityId}/invitations/{invitationId}`
- `POST /api/communities/invitations/respond`
- `GET /api/communities/invitations/token-details`

Why:
- this mirrors the event invitation pattern and gives consistency across domains

## 5. Roles And Permissions

Recommended endpoints:
- `GET /api/communities/{communityId}/roles`
- `POST /api/communities/{communityId}/roles`
- `PUT /api/communities/{communityId}/roles/{roleId}`
- `DELETE /api/communities/{communityId}/roles/{roleId}`
- `GET /api/communities/{communityId}/permissions`
- `PUT /api/communities/{communityId}/permissions`
- `PATCH /api/communities/{communityId}/members/{memberId}/role`
- `GET /api/communities/{communityId}/permission-presets`

Why:
- communities need a much deeper governance system than events
- roles and permissions should be explicit top-level subdomains

## 6. Channels

Recommended endpoints:
- `GET /api/communities/{communityId}/channels`
- `POST /api/communities/{communityId}/channels`
- `GET /api/communities/{communityId}/channels/{channelId}`
- `PUT /api/communities/{communityId}/channels/{channelId}`
- `DELETE /api/communities/{communityId}/channels/{channelId}`
- `POST /api/communities/{communityId}/channels/reorder`
- `PATCH /api/communities/{communityId}/channels/{channelId}/status`
- `PUT /api/communities/{communityId}/channels/{channelId}/permissions`

Optional if channel groups/categories are adopted:
- `GET /api/communities/{communityId}/channel-groups`
- `POST /api/communities/{communityId}/channel-groups`
- `PUT /api/communities/{communityId}/channel-groups/{groupId}`
- `DELETE /api/communities/{communityId}/channel-groups/{groupId}`

## 7. Posts And Feed

Recommended endpoints:
- `GET /api/communities/{communityId}/posts/search`
- `POST /api/communities/{communityId}/posts`
- `GET /api/communities/{communityId}/posts/{postId}`
- `PUT /api/communities/{communityId}/posts/{postId}`
- `DELETE /api/communities/{communityId}/posts/{postId}`
- `POST /api/communities/{communityId}/posts/{postId}/share`
- `POST /api/communities/{communityId}/posts/{postId}/pin`
- `POST /api/communities/{communityId}/posts/{postId}/feature`
- `POST /api/communities/{communityId}/posts/{postId}/bookmark`
- `POST /api/communities/{communityId}/posts/{postId}/lock`

Why:
- feed/search deserves its own search endpoint, similar to event search
- post actions are state transitions and should be explicit

## 8. Reactions And Engagement

Recommended endpoints:
- `POST /api/communities/{communityId}/posts/{postId}/reactions`
- `DELETE /api/communities/{communityId}/posts/{postId}/reactions/{reactionId}`
- `POST /api/communities/{communityId}/posts/{postId}/vote`
- `GET /api/communities/{communityId}/leaderboard`
- `GET /api/communities/{communityId}/badges`

Why:
- engagement is a first-class feature in the product answers

## 9. Moderation

Recommended endpoints:
- `GET /api/communities/{communityId}/reports`
- `POST /api/communities/{communityId}/reports`
- `PATCH /api/communities/{communityId}/reports/{reportId}`
- `POST /api/communities/{communityId}/moderation-actions`
- `GET /api/communities/{communityId}/audit-logs`
- `GET /api/communities/{communityId}/moderation-queue`

Why:
- moderation is too important to bury inside generic member/post endpoints
- audit visibility should be formal

## 10. Resources

Recommended endpoints:
- `GET /api/communities/{communityId}/resources`
- `POST /api/communities/{communityId}/resources`
- `PATCH /api/communities/{communityId}/resources/{resourceId}`
- `DELETE /api/communities/{communityId}/resources/{resourceId}`
- `PATCH /api/communities/{communityId}/resources/{resourceId}/visibility`
- `GET /api/communities/{communityId}/resources/{resourceId}/download`

Why:
- strongly mirrors existing event resource patterns
- maximizes backend consistency

## 11. Events And Courses Inside Communities

Recommended endpoints:
- `GET /api/communities/{communityId}/events`
- `POST /api/communities/{communityId}/events/link`
- `DELETE /api/communities/{communityId}/events/{eventId}`
- `GET /api/communities/{communityId}/courses`
- `POST /api/communities/{communityId}/courses/link`
- `DELETE /api/communities/{communityId}/courses/{courseId}`

Why:
- the event system already exists as its own domain
- communities should reference/link/manage embedded objects without duplicating event/course CRUD unless truly necessary

### Important recommendation

Do not reimplement full event creation under community APIs if the standalone event APIs already exist.
Instead:
- allow community-aware event creation through the event API itself
- allow community linking/management through community subresources

Example idea:
- `POST /api/events` can accept `communityId`
- `GET /api/communities/{communityId}/events` lists linked/owned events

## 12. Broadcasts And Notifications

Recommended endpoints:
- `GET /api/communities/{communityId}/notification-settings`
- `PUT /api/communities/{communityId}/notification-settings`
- `GET /api/communities/{communityId}/my-notification-settings`
- `PUT /api/communities/{communityId}/my-notification-settings`
- `POST /api/communities/{communityId}/broadcasts`
- `GET /api/communities/{communityId}/broadcasts`

Why:
- communities need both admin broadcast controls and per-member preferences

## 13. Branding, Rules, Onboarding, Settings

Recommended endpoints:
- `GET /api/communities/{communityId}/settings`
- `PUT /api/communities/{communityId}/settings`
- `GET /api/communities/{communityId}/branding`
- `PUT /api/communities/{communityId}/branding`
- `GET /api/communities/{communityId}/rules`
- `PUT /api/communities/{communityId}/rules`
- `GET /api/communities/{communityId}/onboarding`
- `PUT /api/communities/{communityId}/onboarding`

Why:
- these areas are configuration surfaces, similar in spirit to event settings and includes

## 14. Analytics And AI

Recommended endpoints:
- `GET /api/communities/{communityId}/analytics`
- `GET /api/communities/{communityId}/analytics/export`
- `GET /api/communities/{communityId}/ai-settings`
- `PUT /api/communities/{communityId}/ai-settings`
- `POST /api/communities/{communityId}/ai-actions`
- `GET /api/communities/{communityId}/ai-summaries`

Why:
- analytics and AI are treated as major product surfaces in our answers doc

## 15. Change Logs

Recommended endpoints:
- `GET /api/communities/{communityId}/changed-logs`

Why:
- events already have `changed-logs`
- `change-log-modules` already supports `community`
- community builder/admin will need audit-style traceability

## Community Search Design Recommendation

Since events already use a rich search endpoint, community search should follow the same pattern.

Recommended:
- `GET /api/communities/search`

Recommended query filters:
- `tab`
  - discover
  - joined
  - owned
  - moderated
  - drafts
  - archived
  - needs_attention
- `communityType`
  - interest
  - cohort
  - organization
  - custom
- `visibility`
  - public
  - unlisted
  - private
- `joinMode`
  - open
  - invite_only
  - application
  - paid
  - application_paid
- `price`
  - free
  - paid
- `status`
  - draft
  - published
  - paused
  - archived
- `leapspace`
  - all / own / joined / specific ids
- `category`
- `sortBy`
  - newest
  - most_active
  - most_members
  - trending
  - name_ascending
  - name_descending
- `cursor`
- `limit`
- `q`

This is aligned with the style already established in `/api/events/search`.

## Response Shape Recommendations

Community responses should return product-ready data, not only raw records.

### Search response item should include

- core fields: id, name, slug, description, cover/logo
- type and lifecycle
- discovery visibility and join mode
- member counts and activity summaries
- waitlist/capacity summary
- current user relation:
  - role
  - membership state
  - saved/joined/applied/waitlisted
- leapspace summary
- owner summary
- optional featured content preview
- optional linked event/course summary

### Detail response should include

- everything needed for landing/member/admin surfaces
- permission-aware sections
- current user access summary
- branding/settings summary
- member/channel/content counts
- lifecycle state
- AI/configuration summaries if admin role allows it

## Error Model Recommendation

Community APIs should continue the current explicit error naming style.

Examples of likely useful error classes:
- `CommunityNotFoundError`
- `CommunityAccessDeniedError`
- `CommunityOwnerAccessDeniedError`
- `CommunityMemberAlreadyExistsError`
- `CommunityApplicationAlreadyExistsError`
- `CommunityWaitlistDisabledError`
- `CommunityMemberCapReachedError`
- `CommunityLifecycleStateError`
- `CommunityRoleConflictError`
- `CommunityModerationActionError`

This would be consistent with current patterns like:
- `AppUserNotFoundError`
- `LeapspaceOwnerAccessDeniedError`
- `LeapspaceMemberAlreadyExistsError`
- `ProviderNotFoundError`

## What Not To Do

These are important recommendations based on current style and future complexity.

### 1. Do not make communities only a settings extension of LeapSpaces

LeapSpace is the workspace.
Community is a major domain object inside it.

### 2. Do not collapse all community functionality into one giant endpoint

The event API already shows the better pattern: split by subresource.

### 3. Do not make search and detail the same endpoint

Discovery and detail retrieval have different needs.

### 4. Do not make permission logic implicit

Communities will have complex governance.
Permissions, roles, and moderation should be explicit subdomains.

### 5. Do not duplicate event/course logic unnecessarily

Communities should integrate with those domains, not fork them.

## Suggested High-Level Community API Modules

If the backend docs eventually gain a `communities` group, the cleanest high-level grouping would be:
- community core
- community membership
- community invitations
- community applications and waitlist
- community roles and permissions
- community channels
- community posts and reactions
- community moderation
- community resources
- community broadcasts and notifications
- community branding, onboarding, rules, settings
- community analytics and AI
- community changed logs

## Final Recommendation

The best way to extend LeapSpace APIs for communities is:
- follow the same resource-oriented style already used for events
- keep search/list separate from detail
- use explicit nested subresources
- keep responses frontend-friendly
- make communities first-class but LeapSpace-scoped
- reuse shared modules like media, integrations, credits, languages, and changed logs
- avoid re-implementing event/course systems under community when linking/integration is enough

## Bottom Line

The current API style is already good enough to support a strong community domain.

If communities are implemented with the same rigor as events, but with deeper governance, content, and membership modeling, LeapSpace can evolve into a platform where:
- LeapSpace is the workspace
- community is the operating system for engagement
- events and courses are major linked experiences inside that operating system

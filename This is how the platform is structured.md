# This is how the platform is structured

## Core Mental Model

Leapspace is a multi-tenant platform.

- A `User` is global.
- A `Leapspace` is the top-level tenant or workspace.
- A user can belong to multiple leapspaces.
- Each leapspace can have its own members, roles, settings, integrations, and resources.
- Resources inside a leapspace can later include `communities`, `courses`, and `events`.
- Right now, the API is most deeply built around `events`.

## Top-Level Structure

The current platform already shows these main layers:

1. `Global identity`
2. `Leapspace tenant boundary`
3. `Leapspace members and leapspace roles`
4. `Event resources inside a leapspace`
5. `Event-specific roles and invitations`
6. `Event participation flows`
7. `Commercial access through tickets and credits`

## Identity Layer

There is one global signed-in user.

- Authentication is session-based.
- The session is carried through the auth cookie.
- The same user can access multiple leapspaces.

This means identity is global, but access is tenant-scoped.

## Tenant Layer: Leapspace

`Leapspace` is the top-level account boundary.

Each leapspace has:

- name
- description
- language
- timezone
- logo
- theme
- owner
- member list
- invitation system
- role definitions
- permission grants
- integrations
- leapspace-scoped settings

This is similar to an org/account/workspace in GitHub, Cloudflare, or Google Workspace.

## Active Tenant Context

Many APIs require `X-Leapspace-Id`.

That means:

- the user is global
- the request is evaluated inside one active leapspace
- permissions are often determined using that active leapspace context

This is an important architectural choice and should remain central as the platform grows.

## Leapspace Membership

A user can be a member of a leapspace.

Current leapspace membership concepts already visible in the API:

- list my leapspaces
- leapspace members
- leapspace invitations
- accept or decline leapspace invitations

This implies:

- membership is not global
- membership belongs to a specific leapspace
- invitations are part of tenant onboarding

## Leapspace Roles and Permissions

Leapspace already has scoped RBAC.

Current API already supports:

- listing leapspace roles with permissions
- creating custom leapspace roles
- updating leapspace roles
- listing my leapspace permissions

This means the platform already has:

- role definitions
- permission bundles
- tenant-scoped grants

This is the correct foundation for future `community` and `course` scopes.

## Current Resource Focus: Events

Events are currently the deepest implemented resource type.

An event belongs to a leapspace and has its own domain model including:

- base event details
- sessions
- tickets
- speakers
- resources
- faqs
- learning outcomes
- target audience
- prerequisites
- discussion settings
- recording settings
- certificate settings
- discount codes
- change logs

So today, the platform is already more than a simple event table. It is an event platform inside a multi-tenant leapspace system.

## Event Access Model

The event model currently combines several different concerns.

### 1. Administrative role

Examples:

- `host`
- `co_host`
- `speaker`
- `moderator`
- `stage_manager`

### 2. Participation state

Examples:

- invited
- applied
- approved
- waitlisted
- registered
- declined

### 3. Access policy

Examples already visible in the API:

- `privacy`: public or private
- `requiresApproval`
- `waitlist`
- `isPaid`

### 4. Commerce and entitlement

Examples:

- tickets
- ticket purchases
- credits
- complimentary tickets

These are related, but they are not the same thing. As the platform grows, they should stay conceptually separate.

## Event Role and Permission Scope

Events already have their own scoped access-control model.

Current API supports:

- list event roles with permissions
- list my event permissions
- invite people into event roles
- update invitation roles
- cancel invitations
- respond to invitations

This means events are already acting like child scopes beneath leapspaces.

## Event Participation Flows

The API clearly distinguishes multiple participant flows:

- register for event
- apply for event
- join waitlist
- buy ticket
- attendee invitation flow
- private invite flow
- role invite flow

This is strong because it shows the platform is already modeling more than just one way to enter an event.

## Commercial Layer

The platform already includes commerce-like access control through:

- credits balance
- credits history
- credit packs
- paid events
- tickets
- discount codes
- complimentary tickets

This suggests payment and entitlement are already becoming a separate system from permissions.

That separation should be preserved.

## Integrations Layer

Leapspace also has tenant-scoped integrations.

Current examples:

- onboarding integrations
- provider-based OAuth
- installation-specific Slack channels

This implies integrations belong to the leapspace, not to the global user alone.

## Media and Assets

The platform includes media workflows for:

- file upload URLs
- upload acknowledgement
- image upload

These are supporting services used by leapspaces and events.

## Profile Layer

There is a current `/api/profile` layer, which appears global from the API.

But the long-term product vision suggests a future distinction:

- global user identity
- leapspace-specific member profile

That will matter because the same user may participate in multiple leapspaces with different roles, settings, and presentation.

## The Intended Future Structure

Based on the product direction, the platform should evolve toward this hierarchy:

- `User`
- `Leapspace`
- `Community`
- `Course`
- `Event`

Likely parent rules:

- `Community` belongs to a `Leapspace`
- `Course` belongs to a `Leapspace` or a `Community`
- `Event` belongs to a `Leapspace`, `Community`, or `Course`

This keeps the structure hierarchical and predictable.

## How Roles Should Be Thought About

The clean model for the platform is:

- roles are assigned at a scope
- permissions are derived from roles
- parent scopes may pass authority downward
- access policy is separate from role assignment
- participation state is separate from admin permissions
- payment entitlement is separate from both

In simple terms:

- `role` answers: what can you manage?
- `access policy` answers: can you enter or discover this resource?
- `participation state` answers: what is your status in this resource?
- `entitlement` answers: have you paid or been granted access?

## Best Current Summary

Leapspace is already structured as:

- a global-user system
- with tenant-scoped leapspaces
- with leapspace-scoped membership and RBAC
- with event resources acting as child scopes
- with event-level roles, invitations, registrations, and purchases
- with integrations, media, and settings attached around the tenant and resource layers

## Best Future Summary

The platform should continue toward this model:

"A multi-tenant platform where global users can belong to multiple leapspaces, each leapspace contains scoped resources such as communities, courses, and events, and access is determined by scoped roles, permissions, access policies, participation state, and commercial entitlement."

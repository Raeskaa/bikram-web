# Mobile Settings Handoff

## Purpose

This document is the master handoff for mobile settings work.

It combines:

1. the current web settings split
2. `This is how the platform is structured.md`
3. the live backend contract from `https://dev.leapspace.ai/api/openapi.json`
4. the immediate missing-screen requirements from backend/API team

This doc is intentionally backend-aware.
It should be used for:

1. mobile UX implementation
2. web/mobile parity planning
3. backend gap identification
4. future expansion into `Courses` and `Communities`

---

## Core Product Split

The product must keep these layers separate:

1. `My Profile`
   - global professional identity
2. `My Account`
   - global technical/account settings
3. `Manage LeapSpace`
   - tenant-scoped settings area
4. `LeapSpace Profile`
   - per-LeapSpace member identity/privacy override layer

Do not collapse these into one generic settings surface.

---

## Core Platform Structure

From `This is how the platform is structured.md`:

1. `User` is global
2. `Leapspace` is the tenant boundary
3. membership, roles, invitations, settings, integrations, and resources are LeapSpace-scoped
4. `Events` are currently the most mature child resource
5. `Communities` and `Courses` are expected future child scopes

The future hierarchy should be treated as:

1. `User`
2. `Leapspace`
3. `Community`
4. `Course`
5. `Event`

This matters for settings because:

1. global profile fields should be reusable everywhere
2. LeapSpace settings should act as the tenant layer
3. role/permission systems built now for LeapSpace should later extend downward to Communities and Courses
4. profile visibility and communication defaults created now should later apply to Events first, then Courses and Communities

---

## Non-Negotiable Product Rules

1. Anonymity is available in all LeapSpaces.
2. Admins do not see hidden identities when a user is anonymous.
3. Direct messaging permissions are global defaults with LeapSpace overrides.
4. `My Profile` is global professional identity.
5. `My Account` is global account administration.
6. `LeapSpace Profile` is a scoped identity/privacy layer.
7. Billing, sessions, authentication, and connected providers must never appear inside `My Profile` or `LeapSpace Profile`.

---

## Current Backend Coverage Summary

### Global user APIs available now

1. `GET /api/profile`
2. `PUT /api/profile`
3. `POST /api/users/fcm-tokens`
4. `POST /api/media/image_upload`

### LeapSpace APIs available now

1. `GET /api/leapspaces`
2. `POST /api/leapspaces`
3. `GET /api/leapspaces/{leapspaceId}`
4. `PUT /api/leapspaces/{leapspaceId}`
5. `GET /api/leapspaces/{leapspaceId}/access-control`
6. `POST /api/leapspaces/{leapspaceId}/access-control`
7. `PUT /api/leapspaces/{leapspaceId}/access-control`
8. `GET /api/leapspaces/{leapspaceId}/grants`
9. `GET /api/leapspaces/{leapspaceId}/members`
10. `GET /api/leapspaces/{leapspaceId}/invitations`
11. `POST /api/leapspaces/{leapspaceId}/invitations`
12. `PUT /api/leapspaces/{leapspaceId}/invitations/{invitationId}`

### Integrations and support APIs available now

1. `POST /api/integrations/onboarding`
2. `POST /api/integrations/oauth/{provider}`
3. `GET /api/integrations/oauth/callback/{provider}`
4. `GET /api/integrations/{installationId}/slack-channels`
5. `GET /api/languages`
6. `POST /api/languages`
7. `POST /api/media/image_upload`

### Important backend truth

The API is strongest today for:

1. LeapSpace tenant basics
2. LeapSpace roles and invitations
3. member listing
4. integrations
5. Events

The API is not yet complete for:

1. global account preferences
2. global auth/security management
3. billing management
4. connected account management
5. LeapSpace member profile overrides
6. LeapSpace notification settings
7. teams
8. policies
9. audit log

---

## Immediate Missing Screens Required By Backend Team

These need first-class design support because the backend already has them or expects them:

1. `Roles`
   - list roles and permissions for a LeapSpace
   - create custom role
   - edit custom role
   - APIs:
     - `GET /api/leapspaces/{leapspaceId}/access-control`
     - `POST /api/leapspaces/{leapspaceId}/access-control`
     - `PUT /api/leapspaces/{leapspaceId}/access-control`

2. `Invite Members`
   - API:
     - `POST /api/leapspaces/{leapspaceId}/invitations`

3. `Members | Invitations`
   - members list API:
     - `GET /api/leapspaces/{leapspaceId}/members`
   - invitations list API:
     - `GET /api/leapspaces/{leapspaceId}/invitations`

These should be treated as real admin screens, not placeholders.

---

## Delivery Order

### Phase 1: Build against what backend supports now

Priority order:

1. Global `Profile Basics`
2. Global `Professional Identity`
3. Global `Visibility`
4. LeapSpace `Overview`
5. LeapSpace `Branding`
6. LeapSpace `Integrations`
7. LeapSpace `Members`
8. LeapSpace `Invitations`
9. LeapSpace `Roles`

### Phase 2: Add product-complete UX with backend gap markers

1. Global `Preferences`
2. Global `Authentication`
3. Global `Billing`
4. Global `Connected Accounts`
5. Global `Active Sessions`
6. LeapSpace `My Profile`
7. LeapSpace `Notifications`
8. LeapSpace `Teams`
9. LeapSpace `Policies`
10. LeapSpace `Audit Log`
11. LeapSpace `Moderation`
12. LeapSpace `My Content`

### Phase 3: Future expansion targets

When `Courses` and `Communities` are added, these settings models should extend in the same order:

1. reuse global identity fields first
2. reuse LeapSpace role/permission patterns next
3. reuse integrations/media/language patterns next
4. add child-scope settings for Communities and Courses after the LeapSpace layer is stable

---

## Page Spec Index

Detailed page specs live in `settings_docs/`.

### Global pages

1. `settings_docs/global-profile-basics.md`
2. `settings_docs/global-professional-identity.md`
3. `settings_docs/global-visibility.md`
4. `settings_docs/account-preferences.md`
5. `settings_docs/account-authentication.md`
6. `settings_docs/account-billing.md`
7. `settings_docs/account-connected-accounts.md`
8. `settings_docs/account-active-sessions.md`

### LeapSpace pages

1. `settings_docs/leapspace-profile.md`
2. `settings_docs/leapspace-notifications.md`
3. `settings_docs/leapspace-overview.md`
4. `settings_docs/leapspace-branding.md`
5. `settings_docs/leapspace-integrations.md`
6. `settings_docs/leapspace-members.md`
7. `settings_docs/leapspace-invitations.md`
8. `settings_docs/leapspace-roles.md`
9. `settings_docs/leapspace-teams.md`
10. `settings_docs/leapspace-policies.md`
11. `settings_docs/leapspace-audit-log.md`
12. `settings_docs/leapspace-moderation.md`
13. `settings_docs/leapspace-my-content.md`

---

## Top-Level Page Mapping Table

| Page | Ownership | Current backend support | Primary current APIs | Events now | Courses/Communities later |
|---|---|---|---|---|---|
| Profile Basics | Global user | Partial | `/api/profile`, `/api/media/image_upload` | Event organizer and speaker identity | Course instructor and community member identity |
| Professional Identity | Global user | Partial / mostly future | `/api/profile` partial only | Event discovery, host credibility, speaker profile | Course author profiles, community expertise graph |
| Visibility | Global user | Future | No dedicated visibility endpoint yet | Event discoverability and profile display defaults | Community directory and course cohort discoverability |
| Preferences | Global user | Future | No dedicated endpoint yet | Event date/time/display behavior | Course/community UX defaults |
| Authentication | Global user | Future | No dedicated auth-management endpoint in OpenAPI | Event admin safety | Cross-product account security |
| Billing | Global user | Future | No billing settings endpoint in OpenAPI | Paid event access context only via tickets/credits | Future tenant or course/community monetization |
| Connected Accounts | Global user | Partial/future | Integrations exist at LeapSpace scope, not user account scope | Provider-assisted event setup indirectly | Future account linking across product areas |
| Active Sessions | Global user | Future | No session-management endpoint in OpenAPI | Admin account safety for event operations | Cross-product account safety |
| LeapSpace Profile | LeapSpace-scoped member layer | Future | No dedicated member-profile override endpoint yet | Event role presentation inside a tenant | Community/course scoped member identity |
| Notifications | LeapSpace-scoped member preferences | Future/partial | `POST /api/users/fcm-tokens` only | Event reminders and announcement channels | Community/course notifications |
| Overview | LeapSpace tenant | Strong | `GET/PUT /api/leapspaces/{leapspaceId}` | Tenant info on event admin surfaces | Base tenant context for communities/courses |
| Branding | LeapSpace tenant | Strong/partial | `GET/PUT /api/leapspaces/{leapspaceId}`, `/api/media/image_upload` | Event branding inheritance | Community and course branding inheritance |
| Integrations | LeapSpace tenant | Strong | `/api/integrations/*`, `/api/languages` | Slack/event ops and event-linked workflows | Community/course automations later |
| Members | LeapSpace tenant | Strong | `GET /api/leapspaces/{leapspaceId}/members` | Event host/admin selection candidate pool | Community/course membership base |
| Invitations | LeapSpace tenant | Strong | `GET/POST/PUT /api/leapspaces/{leapspaceId}/invitations*` | Event staffing and attendee funnel foundation | Community/course onboarding |
| Roles | LeapSpace tenant | Strong | `GET/POST/PUT /api/leapspaces/{leapspaceId}/access-control` | Event admin delegation foundation | Community/course RBAC inheritance |
| Teams | LeapSpace tenant | Future | No team endpoint yet | Event staffing groups later | Community/course access grouping |
| Policies | LeapSpace tenant | Future/partial | `/grants` informs gating only | Event access policy inheritance | Community/course governance |
| Audit Log | LeapSpace tenant | Future/partial | `change-log-modules` only, no LeapSpace audit log endpoint | Event changed logs exist as precedent | Community/course audit history later |
| Moderation | LeapSpace tenant | Future | No LeapSpace moderation endpoints yet | Event moderation exists at event scope | Community moderation later |
| My Content | LeapSpace tenant/member | Future | No direct endpoint yet | Event-linked content and integrations | Course/community creation defaults later |

---

## Rules For Every Page Spec

Each detailed page file should be treated as the source of truth for:

1. what fields belong there
2. which exact backend schemas exist now
3. what must be proposed for future API work
4. whether the page is needed for `Events now`
5. how it should generalize to `Courses` and `Communities later`

If backend support is missing:

1. do not invent fake current endpoints
2. explicitly mark the page as `future API needed`
3. use the proposed contract section in the page file

---

## Final Instruction

For mobile and future web work, build the settings system with this mindset:

1. ship against real backend coverage where available
2. preserve the current web product split exactly
3. use the page specs in `settings_docs/` for field-by-field implementation
4. treat `Events` as the immediate downstream consumer of these settings
5. design the data model so the same settings architecture can extend into `Courses` and `Communities`

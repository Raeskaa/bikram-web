# LeapSpace Settings — Consolidated Spec Sheet

> **Audience:** API team, mobile engineers, web engineers, product reviewers
> **Last updated:** 2026-04-08
> **Source of truth for:** field inventory, API mapping, implementation status, design decisions

---

## Table of Contents

1. [Architecture](#1-architecture)
2. [Non-Negotiable Product Rules](#2-non-negotiable-product-rules)
3. [Current Backend Coverage](#3-current-backend-coverage)
4. [Design System Rules](#4-design-system-rules)
5. [My Profile — Profile Basics](#5-my-profile--profile-basics)
6. [My Profile — Professional Identity](#6-my-profile--professional-identity)
7. [My Profile — Visibility](#7-my-profile--visibility)
8. [My Account — Preferences](#8-my-account--preferences)
9. [My Account — Authentication](#9-my-account--authentication)
10. [My Account — Credits](#10-my-account--credits)
11. [My Account — Billing](#11-my-account--billing)
12. [My Account — Connected Accounts](#12-my-account--connected-accounts)
13. [My Account — Active Sessions](#13-my-account--active-sessions)
14. [Manage LeapSpace — Overview](#14-manage-leapspace--overview)
15. [Manage LeapSpace — Branding](#15-manage-leapspace--branding)
16. [Manage LeapSpace — Integrations](#16-manage-leapspace--integrations)
17. [Manage LeapSpace — Members](#17-manage-leapspace--members)
18. [Manage LeapSpace — Invitations](#18-manage-leapspace--invitations)
19. [Manage LeapSpace — Roles & Permissions](#19-manage-leapspace--roles--permissions)
20. [Manage LeapSpace — Teams](#20-manage-leapspace--teams)
21. [Manage LeapSpace — LeapSpace Profile](#21-manage-leapspace--leapspace-profile)
22. [Manage LeapSpace — Notifications](#22-manage-leapspace--notifications)
23. [Manage LeapSpace — Policies](#23-manage-leapspace--policies)
24. [Manage LeapSpace — Audit Log](#24-manage-leapspace--audit-log)
25. [Manage LeapSpace — Moderation](#25-manage-leapspace--moderation)
26. [Manage LeapSpace — My Content](#26-manage-leapspace--my-content)
27. [Permission Catalog](#27-permission-catalog)
28. [Implementation Status Summary](#28-implementation-status-summary)
29. [API Gap Summary for Backend Team](#29-api-gap-summary-for-backend-team)
30. [Delivery Phases](#30-delivery-phases)

---

## 1. Architecture

The settings system has four strictly separated layers. Do not collapse them.

| Layer | Scope | Ownership | File |
|---|---|---|---|
| **My Profile** | Global identity | User | `ProfileSettingsPage.tsx` |
| **My Account** | Global technical / security | User | `ProfileSettingsPage.tsx` |
| **Manage LeapSpace** | Tenant-scoped admin | LeapSpace admin/mod/creator | `GlobalSettingsPage.tsx` |
| **LeapSpace Profile** | Per-space identity override | Member (self-service) | `GlobalSettingsPage.tsx` |

### Platform Hierarchy (current and future)

```
User (global)
└── LeapSpace (tenant boundary)
    ├── Events        ← mature now
    ├── Communities   ← future
    └── Courses       ← future
```

- Global profile fields are reusable everywhere.
- LeapSpace settings act as the tenant layer.
- Roles/permissions built now extend downward to Communities and Courses later.
- Visibility and communication defaults apply to Events first, then Courses and Communities.

---

## 2. Non-Negotiable Product Rules

1. **Anonymity is available in all LeapSpaces.** Admins do NOT see hidden identities.
2. Direct messaging permissions are global defaults with LeapSpace overrides.
3. My Profile = global professional identity only.
4. My Account = global account administration only.
5. LeapSpace Profile = scoped identity/privacy layer.
6. **Billing, sessions, authentication, and connected providers must NEVER appear inside My Profile or LeapSpace Profile.**
7. Invitations support both email and phone (both fields supported per invitation).

---

## 3. Current Backend Coverage

### Global User APIs — Available Now

| Endpoint | Method | Notes |
|---|---|---|
| `/api/profile` | `GET` | Returns: `id`, `name`, `bio`, `avatarId`, `profilePicUrl`, `email`, `phone`, `role` |
| `/api/profile` | `PUT` | Accepts: `name`, `bio`, `avatarId`, `email`, `phone` |
| `/api/users/fcm-tokens` | `POST` | Accepts: `fcmToken`. Infrastructure only, not settings state. |
| `/api/media/image_upload` | `POST` | Accepts: `fileName`. Returns: `id`, `uploadUrl` |

### LeapSpace APIs — Available Now

| Endpoint | Method | Notes |
|---|---|---|
| `/api/leapspaces` | `GET` | List user's LeapSpaces |
| `/api/leapspaces` | `POST` | Create LeapSpace |
| `/api/leapspaces/{id}` | `GET` | Returns: `id`, `name`, `description`, `languageCode`, `timezone`, `logoId`, `theme`, `isDefault` |
| `/api/leapspaces/{id}` | `PUT` | Accepts: `name`, `description`, `languageCode`, `timezone`, `logoId`, `theme` |
| `/api/leapspaces/{id}/access-control` | `GET` | Returns roles with: `role`, `roleDefinitionId`, `permissions[]` |
| `/api/leapspaces/{id}/access-control` | `POST` | Accepts: `roleName`, `permissions[]` |
| `/api/leapspaces/{id}/access-control` | `PUT` | Accepts: `roleId`, `addedPermissions[]`, `removedPermissions[]` |
| `/api/leapspaces/{id}/grants` | `GET` | Returns effective permissions for current user (for UI gating) |
| `/api/leapspaces/{id}/members` | `GET` | Query: `search`, `cursor`, `limit`. Returns: `id`, `name`, `avatarId`, `email`, `phone`, `role` |
| `/api/leapspaces/{id}/invitations` | `GET` | Returns: `id`, `name`, `avatarId`, `email`, `phone`, `role`, `status` |
| `/api/leapspaces/{id}/invitations` | `POST` | Accepts: `email`, `phone`, `roleDefinitionId`, `inviteeName`. Returns: `invitationId`, `status`, `token` |
| `/api/leapspaces/{id}/invitations/{invId}` | `PUT` | Accepts: `{ action: "cancel" }` |

### Integration APIs — Available Now

| Endpoint | Method | Notes |
|---|---|---|
| `/api/integrations/onboarding` | `POST` | Accepts: `providerKey` |
| `/api/integrations/oauth/{provider}` | `POST` | Accepts: `redirectUrl` |
| `/api/integrations/oauth/callback/{provider}` | `GET` | OAuth completion |
| `/api/integrations/{installationId}/slack-channels` | `GET` | Returns Slack channels |
| `/api/languages` | `GET` | Returns: `id`, `name`, `code`, `native_name`, `leapspace_id` |
| `/api/languages` | `POST` | Create language |

### NOT Yet Available

- Global account preferences, auth/security management, billing, connected accounts, active sessions
- LeapSpace member profile overrides, notification settings, teams, policies, audit log, moderation

---

## 4. Design System Rules

All settings pages follow the events module design system:

| Element | Class | Rule |
|---|---|---|
| Section cards (outer) | `rounded-xl` | Section-level wrappers only |
| Inner elements | `rounded-lg` | Buttons, inputs, selects, info cards, table wrappers, etc. |
| Pills / avatars | `rounded-full` | Circular elements |
| Shadows | **None** | No `shadow-sm`, `shadow-lg`, or `shadow-xl` anywhere |
| Headers | Breadcrumb only | `Settings > {Section}`. No hero banners, no gradient headers. |
| Sidebar | Clean heading + search | Space name or user name + subtitle + search input. No card wrappers. |
| Sidebar nav items | `rounded-lg` | Active: `bg-sidebar-accent` + border. Inactive: transparent border. |
| Banner/header images | `h-28` | Same height on both global profile and LeapSpace profile |

---

## 5. My Profile — Profile Basics

**Route:** `profile-settings` → sidebar: "Profile Basics"
**Implementation:** `ProfileSettingsPage.tsx` — fully built

### Fields Implemented in UI

| Field | Control | Default | API Status | Current Endpoint | Proposed Endpoint |
|---|---|---|---|---|---|
| Full name | Text input | From `currentUser.name` | **Supported** | `GET/PUT /api/profile` → `name` | Keep current |
| Preferred name | Text input | `"Google"` | Not supported | — | Add `preferredName` to `/api/profile` |
| Professional headline | Text input | `"AI systems operator..."` | Not supported | — | Add `headline` to `/api/profile` |
| Primary location | Text input | `"Bengaluru, India"` | Not supported | — | Add `location` to `/api/profile` |
| Short bio | Textarea (400 char max, live counter) | `"I design, operate..."` | **Supported** | `GET/PUT /api/profile` → `bio` | Keep current |
| Personal website | URL input | `"https://trueleap.io/rae"` | Not supported | — | Add `websiteUrl` to `/api/profile` |
| Avatar | Upload (initials fallback) | From user name | **Partial** | `POST /api/media/image_upload` → `avatarId` on `PUT /api/profile` | Keep current |
| Banner / cover image | Upload button (gradient placeholder) | Gradient | Not supported | — | Add `bannerImageId` to `/api/profile` |

### Additional UI Elements

- Banner area: `h-28` gradient with "Change banner" button
- Avatar: `size-20` circle with camera overlay
- Info panel "How this works" with 3 cards explaining My Profile / My Account / LeapSpace Profile split
- Bio character counter turns red at 350+

---

## 6. My Profile — Professional Identity

**Route:** `profile-settings` → sidebar: "Professional Identity"
**Implementation:** `ProfileSettingsPage.tsx` — fully built

### Fields Implemented in UI

| Field | Control | Default | API Status | Proposed Endpoint |
|---|---|---|---|---|
| Current role / title | Text input | `"Community Systems Designer"` | Partial (`role` on `/api/profile` but not updatable as profile field) | Add `professionalTitle` |
| Company / organization | Text input | `"TrueLeap"` | Not supported | Add `company` |
| Industry | Text input | `"Professional learning..."` | Not supported | Add `industry` |
| Primary expertise | Text input | `"Community design..."` | Not supported | Add `expertisePrimary` |
| Skills and strengths | Tag list + add input | 5 preset tags | Not supported | Add `skills[]` array |
| Work experience summary | Textarea | `"3 roles added..."` | Not supported | Add `experienceSummary` → later `experienceEntries[]` |
| Education summary | Textarea | `"2 entries added..."` | Not supported | Add `educationSummary` → later `educationEntries[]` |
| Featured links | Structured list `{label, url}` + inline add form | 3 links (LinkedIn, Portfolio, Case Studies) | Not supported | Add `featuredLinks[]` array of `{label, url}` |

### Interaction Details

- **Skills:** Each renders as a removable badge (click X to remove). Add via text input + button or Enter key.
- **Featured links:** Each row shows Globe icon + label + URL + Trash2 delete. Add via two inputs (label, URL) + Plus button.

---

## 7. My Profile — Visibility

**Route:** `profile-settings` → sidebar: "Visibility"
**Implementation:** `ProfileSettingsPage.tsx` — fully built

### Fields Implemented in UI

| Field | Control | Default | API Status | Proposed Endpoint |
|---|---|---|---|---|
| Profile visibility | Select dropdown | `"members-only"` | Not supported | Add `profileVisibility` to `/api/profile/visibility` |
| Show company on global profile | Switch toggle | `true` | Not supported | Add `showCompany` |
| Show location on global profile | Switch toggle | `false` | Not supported | Add `showLocation` |
| Show social links | Switch toggle | `true` | Not supported | Add `showSocialLinks` |
| Allow member search discovery | Switch toggle | `true` | Not supported | Add `searchDiscoverability` |
| Use profile for recommendations | Switch toggle | `true` | Not supported | Add `recommendationSignals` |

**Select options:** Members only, Connections only, Public profile

**Info panel:** "What stays out of My Profile" — explains billing/security live in My Account, anonymity lives in LeapSpace Profile.

### Recommended API

Either extend `PUT /api/profile` or create `GET/PUT /api/profile/visibility` with fields: `profileVisibility`, `showCompany`, `showLocation`, `showSocialLinks`, `searchDiscoverability`, `recommendationSignals`

---

## 8. My Account — Preferences

**Route:** `profile-settings` → sidebar: "Preferences"
**Implementation:** `ProfileSettingsPage.tsx` — fully built

### Fields Implemented in UI

| Field | Control | Default | Options | API Status | Proposed Endpoint |
|---|---|---|---|---|---|
| Language | Text input | `"English"` | — | Partial (metadata via `GET /api/languages`, no user preference) | Add `languageCode` to `GET/PUT /api/account/preferences` |
| Region | Select | `"india"` | India, US, Singapore, UK | Not supported | Add `region` |
| Timezone | Select | `"gmt-5-30"` | GMT+5:30, UTC, Pacific, Eastern | Partial (LeapSpace has timezone, user pref does not) | Add `timezone` |
| Theme preference | 3-way tabs | `"light"` | Light, System, Dark | Not supported | Add `themePreference` |
| Default start page | Select | `"engagement-feed"` | Engagement feed, Home, Events, Communities | Not supported | Add `defaultStartPage` |

### Recommended API

`GET/PUT /api/account/preferences` — fields: `languageCode`, `region`, `timezone`, `themePreference`, `defaultStartPage`

---

## 9. My Account — Authentication

**Route:** `profile-settings` → sidebar: "Authentication"
**Implementation:** `ProfileSettingsPage.tsx` — fully built, includes TwoFactorSetup modal

### Fields Implemented in UI

| Field | Control | Default | API Status | Proposed Endpoint |
|---|---|---|---|---|
| Account email | Read-only input + "Change" button | From `currentUser.email` | Partial (`/api/profile.email`) | Separate auth endpoint preferred |
| Password state | Display + "Change password" button | `"Updated 41 days ago"` | Not supported | Add `passwordLastChangedAt` to `GET/PUT /api/account/security` |
| Two-factor authentication | Switch toggle + conditional "Set up 2FA" button | `true` | Not supported | Add `twoFactorEnabled` |
| Security alerts | Switch toggle | `true` | Not supported | Add `securityAlertsEnabled` |
| Session challenge policy | Text input | `"Challenge sign-in when..."` | Not supported | Add `sessionChallengePolicy` |

### Passkeys Sub-section

| Element | Control | Mock Data |
|---|---|---|
| Passkey list | Read-only cards with delete button | 2 entries: "MacBook Pro Touch ID" (2026-02-15), "iPhone Face ID" (2026-03-01) |
| Add passkey | Full-width dashed button | Fires browser prompt toast |

### Active Sessions Sub-section (inline)

| Element | Control | Mock Data |
|---|---|---|
| Session list | Cards with "Revoke" action | 3 sessions: Chrome/Mac (current), Safari/iPhone, Firefox/Windows |
| Current session indicator | "This device" badge | No revoke button on current session |

### 2FA Modal

`TwoFactorSetup` component (separate file `settings/TwoFactorSetup.tsx`). Opens when toggling 2FA on or clicking "Set up 2FA". Calls `onComplete` on success.

### Recommended API

`GET/PUT /api/account/security` — fields: `accountEmail`, `passwordLastChangedAt`, `passkeysSummary`, `sessionChallengePolicy`, `twoFactorEnabled`, `securityAlertsEnabled`

---

## 10. My Account — Credits

**Route:** `profile-settings` → sidebar: "Credits"
**Implementation:** `ProfileSettingsPage.tsx` — fully built

### Balance Display

| Element | Source |
|---|---|
| Total balance | `MOCK_CREDIT_DATA.totalCredits` (live state, incremented on purchase) |
| Used this month | `MOCK_CREDIT_DATA.usedThisMonth` |
| Pending holds | `MOCK_CREDIT_DATA.pendingHolds` |
| Lifetime earned | `MOCK_CREDIT_DATA.lifetimeEarned` |

### Buy Credits

4 selectable packages from `CREDIT_PACKAGES` (imported from `CreditSystem.tsx`):

| Package | Credits | Price | Savings |
|---|---|---|---|
| Starter | 500 | $5 | — |
| Standard | 1,500 | $12 | 20% |
| Pro (Best Value) | 5,000 | $35 | 30% |
| Enterprise | 15,000 | $90 | 40% |

Purchase button adds credits to balance state, fires toast.

### Credit History

Table with 8 mock transactions. Columns: Transaction, Date, Amount, Status.

Transaction types: `purchase` (green), `spend` (neutral), `earn` (blue), `hold` (amber).

### Existing Adjacent APIs

- `GET /api/credits/balance`
- `GET /api/credits/history`
- `GET /api/credits/packs`

These support credits specifically. No account billing management.

---

## 11. My Account — Billing

**Route:** `profile-settings` → sidebar: "Billing"
**Implementation:** `ProfileSettingsPage.tsx` — fully built

### Fields Implemented in UI

| Field | Control | Default | API Status | Proposed Endpoint |
|---|---|---|---|---|
| Current plan | Display + "Change plan" button | `"Business plan billed monthly"` | Not supported | `GET/PUT /api/account/billing` |
| Payment method | Display + "Update" button | `"Visa ending in 4242"` | Not supported | Add payment method endpoints |
| Billing email | Text input | From user email | Not supported | Add `billingEmail` |
| Renewal date | Read-only input | `"April 28, 2026"` | Not supported | Add `renewalDate` |
| Invoice delivery | Textarea | `"Monthly summary..."` | Not supported | Add invoice preferences |

### Recommended API

Primary: `GET/PUT /api/account/billing`
Later: `GET /api/account/invoices`, `GET/POST /api/account/payment-methods`

---

## 12. My Account — Connected Accounts

**Route:** `profile-settings` → sidebar: "Connected Accounts"
**Implementation:** `ProfileSettingsPage.tsx` — fully built

### Fields Implemented in UI

| Provider | Control | Default | Description |
|---|---|---|---|
| Google | Switch toggle | `true` | Primary sign-in provider and recovery path |
| LinkedIn | Switch toggle | `true` | Profile import and professional proof signals |
| Microsoft | Switch toggle | `false` | Optional work account connection |
| GitHub | Switch toggle | `false` | Optional developer identity connection |

### Important Distinction

These are NOT the same as LeapSpace integrations. Current integration APIs are tenant-scoped. Connected accounts are user-level auth providers.

### Recommended API

`GET /api/account/connected-providers`
`POST /api/account/connected-providers/{provider}`
`DELETE /api/account/connected-providers/{provider}`

---

## 13. My Account — Active Sessions

**Route:** `profile-settings` → sidebar: "Active Sessions"
**Implementation:** `ProfileSettingsPage.tsx` — fully built

### Fields Implemented in UI

| Element | Control | Mock Data |
|---|---|---|
| Session list | Cards with revoke action | 3 sessions (same as Authentication inline) |
| Session challenge policy | Text input | `"Challenge sign-in when device or region changes"` |
| Review trusted devices | Button | Fires toast |
| Revoke all other sessions | Destructive button | Removes all non-current sessions |

### Recommended API

1. `GET /api/account/sessions`
2. `DELETE /api/account/sessions/{sessionId}`
3. `POST /api/account/sessions/revoke-others`

---

## 14. Manage LeapSpace — Overview

**Route:** `settings` → sidebar: "Overview"
**Implementation:** `GlobalSettingsPage.tsx` — generic editable section (SimpleEditableSection)

### Fields Implemented in UI

| Field | Control | Default | API Status | Current Endpoint |
|---|---|---|---|---|
| Primary setting (name) | Text input | LeapSpace name | **Supported** | `GET/PUT /api/leapspaces/{id}` → `name` |
| Secondary setting (type) | Text input | LeapSpace type | **Supported** | `GET/PUT /api/leapspaces/{id}` → `description` |
| Operational notes | Textarea | Description text | **Supported** | `GET/PUT /api/leapspaces/{id}` |
| Section enabled | Switch toggle | `true` | — | — |

### Backend Fields Available Now

Read: `id`, `name`, `description`, `languageCode`, `timezone`, `logoId`, `theme`, `isDefault`
Write: `name`, `description`, `languageCode`, `timezone`, `logoId`, `theme`

---

## 15. Manage LeapSpace — Branding

**Route:** `settings` → sidebar: "Branding"
**Implementation:** `GlobalSettingsPage.tsx` — generic editable section

### Fields Available Now

| Field | API Status | Current Endpoint |
|---|---|---|
| Logo | **Supported** | `logoId` on LeapSpace + `/api/media/image_upload` |
| Theme | **Partial** | `theme` exists but untyped/opaque |
| Name as brand label | **Supported** | `name` on LeapSpace |
| Hero / cover imagery | Not supported | Add `coverImageId` or extend theme |

---

## 16. Manage LeapSpace — Integrations

**Route:** `settings` → sidebar: "Integrations"
**Implementation:** `GlobalSettingsPage.tsx` — generic editable section

### Backend Already Strong

| Capability | Endpoint | Status |
|---|---|---|
| Start provider onboarding | `POST /api/integrations/onboarding` | **Supported** |
| Start OAuth connect | `POST /api/integrations/oauth/{provider}` | **Supported** |
| OAuth callback | `GET /api/integrations/oauth/callback/{provider}` | **Supported** |
| Slack channel picker | `GET /api/integrations/{installationId}/slack-channels` | **Supported** |
| Installed integrations list | — | Not supported |
| Disconnect integration | — | Not supported |

### Recommended Missing Endpoints

- `GET /api/integrations/installations`
- `DELETE /api/integrations/{installationId}`

---

## 17. Manage LeapSpace — Members

**Route:** `settings` → sidebar: "Members"
**Implementation:** `GlobalSettingsPage.tsx` — **FULLY CUSTOM admin UI**

### UI Elements

- **Stats bar:** 5 role-count cards (Total, Admins, Moderators, Creators, Learners)
- **Search:** Text input filtering by name, email, phone
- **Role filter:** Select dropdown (All roles, Admin, Moderator, Creator, Learner)
- **Table:** Columns: Member (avatar + name), Email, Phone, Role (color badge), Actions
- **Row actions:** Role change (inline select), Remove (opens confirmation modal)
- **Remove modal:** Confirmation dialog with destructive action

### Mock Data

10 members: Sarah Chen, Marcus Webb, Elena Rodriguez, James Park, Aisha Patel, Tom Nakamura, Priya Sharma, Daniel Okafor, Lucia Fernandez, Kai Williams. (3 Admin, 2 Moderator, 2 Creator, 3 Learner)

### API Status

| Action | Endpoint | Status |
|---|---|---|
| List members | `GET /api/leapspaces/{id}/members` (search, cursor, limit) | **Supported** |
| Change role | `PATCH /api/leapspaces/{id}/members/{memberId}` | **Not available** |
| Remove member | `DELETE /api/leapspaces/{id}/members/{memberId}` | **Not available** |

---

## 18. Manage LeapSpace — Invitations

**Route:** `settings` → sidebar: "Invitations"
**Implementation:** `GlobalSettingsPage.tsx` — **FULLY CUSTOM admin UI**

### UI Elements

- **Status filter pills:** All, Pending, Accepted, Cancelled, Expired (with counts)
- **Single invite form:** Name, Role (select), Email, Phone — collapsible
- **Bulk invite form:** Comma-separated emails textarea + role select — collapsible
- **Search:** Text input filtering invitations
- **Table:** Columns: Invitee (avatar + name), Contact (email + phone), Role, Status (color badge), Sent date, Actions
- **Row actions (pending only):** Resend (toast — not yet in API), Cancel (confirmation modal)
- **Cancel modal:** Confirmation dialog with destructive action

### Mock Data

7 invitations: Alex Kim, Beatrice Mwangi, Carlos Ruiz, Diana Novak, Ethan Brooks, Fatima Al-Hassan, George Tanaka. Mixed statuses.

### API Status

| Action | Endpoint | Status |
|---|---|---|
| List invitations | `GET /api/leapspaces/{id}/invitations` | **Supported** |
| Send invitation | `POST /api/leapspaces/{id}/invitations` (email, phone, roleDefinitionId, inviteeName) | **Supported** |
| Cancel invitation | `PUT /api/leapspaces/{id}/invitations/{invId}` `{action: "cancel"}` | **Supported** |
| Resend invitation | — | **Not available** |
| Edit invitation role | — | **Not available** |

---

## 19. Manage LeapSpace — Roles & Permissions

**Route:** `settings` → sidebar: "Roles"
**Implementation:** `GlobalSettingsPage.tsx` — **FULLY CUSTOM admin UI**

### UI Elements

- **Role list:** Expandable accordion cards showing role name, built-in/custom badge, permission count
- **Expanded view:** Permission grid organized by 6 categories (green check + label)
- **Create role form:** Name input + full PermissionCheckboxGrid (23 permissions, 6 categories)
- **Edit role form:** Pre-populated PermissionCheckboxGrid, computes diff (addedPermissions, removedPermissions) on save

### Mock Roles

| Role | ID | Built-in | Permissions |
|---|---|---|---|
| LeapSpace Admin | `rd-admin` | Yes | All 23 |
| Moderator | `rd-moderator` | Yes | 12 |
| Creator | `rd-creator` | Yes | 10 |
| Learner | `rd-learner` | Yes | 5 (view-only) |
| Event Manager | `rd-event-mgr` | No | 11 |

### API Status

| Action | Endpoint | Status |
|---|---|---|
| List roles | `GET /api/leapspaces/{id}/access-control` | **Supported** |
| Create role | `POST /api/leapspaces/{id}/access-control` (roleName, permissions[]) | **Supported** |
| Edit role | `PUT /api/leapspaces/{id}/access-control` (roleId, addedPermissions[], removedPermissions[]) | **Supported** |
| Check user grants | `GET /api/leapspaces/{id}/grants` | **Supported** |
| Rename role | — | **Not available** |
| Delete role | — | **Not available** |

See [Permission Catalog](#27-permission-catalog) for the full 23-permission inventory.

---

## 20. Manage LeapSpace — Teams

**Route:** `settings` → sidebar: "Teams"
**Implementation:** `GlobalSettingsPage.tsx` — **FULLY CUSTOM prototype** (no backend API)

### "API Not Available" Banner

Amber dashed box: "Teams API is not yet available. This section is a prototype." Lists proposed endpoints.

### UI Elements

- **Team list:** Expandable accordion cards with name, member count, bound role, enable/disable toggle, delete button
- **Expanded view:** Description, member chips, bound role badge, effective permissions grid, "Customized" indicator when permissions differ from role
- **Create team form:**
  - Team name (text input)
  - Role binding (select from shared roles state)
  - Description (textarea)
  - **Inline permission customization panel** — appears when role is selected:
    - Shows bound role's permissions in full PermissionCheckboxGrid
    - Individual toggles to customize (marks `permissionsCustomized = true`)
    - "Reset to default" to restore role defaults
    - Category summary pills in collapsed view
  - **"Save as preset" checkbox** — when permissions differ from role defaults:
    - Reveals preset name input
    - On create: saves as new `RoleDefinition` via shared `onAddRole` callback
    - New role appears in Roles section immediately
  - Member search: text input searching `MOCK_MEMBERS`, click to add, chips to remove

### `SpaceTeam` Interface

```typescript
interface SpaceTeam {
  id: string;
  name: string;
  description: string;
  memberIds: string[];
  roleId: string;
  enabled: boolean;
  customPermissions: string[] | null; // null = inherit from role, string[] = customized
}
```

### Mock Data

4 teams: Core Admins (3 members, Admin role), Event Ops (3 members, Event Manager), Community Moderators (2 members, Moderator), Content Creators (2 members, Creator, disabled).

### Recommended API

```
GET    /api/leapspaces/{id}/teams
POST   /api/leapspaces/{id}/teams
PUT    /api/leapspaces/{id}/teams/{teamId}
DELETE /api/leapspaces/{id}/teams/{teamId}
```

---

## 21. Manage LeapSpace — LeapSpace Profile

**Route:** `settings` → sidebar: "My Profile" (inside LeapSpace context)
**Implementation:** `GlobalSettingsPage.tsx` — **FULLY CUSTOM section**

### UI Elements

Two-column layout: live preview card (left) + form fields (right).

### Preview Card (Left)

- Cover gradient (`h-28`)
- Avatar circle (`size-20`) with initials
- Display name (or codename if active)
- Role badge
- Bio text
- Privacy rule callout: "Anonymity is available in all LeapSpaces..."

### Form Fields (Right)

| Field | Control | Default |
|---|---|---|
| Display name in this LeapSpace | Text input | From `currentUser.name` |
| Codename / alternate name | Text input | `""` |
| Role title | Text input | Current role label |
| Profile photo mode | Select | `"global-avatar"` (Use global avatar / Use LeapSpace-specific) |
| Override mode | Select | `"customized"` (Customized / Fully inherit) |
| Override scope | Text input | `"Display name, bio, photo, visibility, and messaging permissions"` |
| Bio in this LeapSpace | Textarea | Pre-filled bio |

### Toggles

| Toggle | Default | Role-dependent |
|---|---|---|
| Anonymous mode | `false` | — |
| Use codename instead of full identity | `false` | — |
| Show role badge | `true` | — |
| Appear in member directory | `true` | — |
| Allow direct messages | `true` | Learner: `false` |
| Appear in search | `true` | — |
| Allow connection requests | `true` | — |
| Allow mentoring requests | `true` | Learner: `false` |
| Allow collaboration requests | `true` | Admin/Creator: `true`, others: `false` |

### Recommended API

```
GET /api/leapspaces/{id}/my-profile
PUT /api/leapspaces/{id}/my-profile
```

Fields: `displayName`, `codename`, `roleTitle`, `bio`, `avatarOverrideId`, `profilePhotoMode`, `overrideMode`, `anonymousMode`, `useCodename`, `showRoleBadge`, `appearInDirectory`, `allowDirectMessages`, `appearInSearch`, `allowConnections`, `allowMentoring`, `allowCollaboration`

---

## 22. Manage LeapSpace — Notifications

**Route:** `settings` → sidebar: "Notifications"
**Implementation:** `GlobalSettingsPage.tsx` — **FULLY CUSTOM section**

### Fields Implemented in UI

| Field | Control | Default | Role-dependent |
|---|---|---|---|
| Mute {LeapSpace name} | Switch toggle | `false` | — |
| Mentions and replies | Switch toggle | `true` | — |
| Direct messages from members | Switch toggle | `true` | Learner: `false` |
| Mobile push notifications | Switch toggle | `true` | — |
| Suppress @everyone and announcements | Switch toggle | `true` | — |
| Suppress role mentions | Switch toggle | `false` | — |
| Mute new event notifications | Switch toggle | `false` | — |
| Inherit global defaults | Switch toggle | `true` | — |
| Digest frequency | Select | `"live"` | Options: Live, Hourly digest, Daily digest |

### Recommended API

```
GET /api/leapspaces/{id}/my-notification-settings
PUT /api/leapspaces/{id}/my-notification-settings
```

---

## 23. Manage LeapSpace — Policies

**Route:** `settings` → sidebar: "Policies"
**Implementation:** `GlobalSettingsPage.tsx` — generic editable section

No dedicated policy endpoint exists today. `GET /grants` only exposes effective permissions, not policies.

### Recommended API

```
GET /api/leapspaces/{id}/policies
PUT /api/leapspaces/{id}/policies
```

---

## 24. Manage LeapSpace — Audit Log

**Route:** `settings` → sidebar: "Audit Log"
**Implementation:** `GlobalSettingsPage.tsx` — generic editable section

No LeapSpace audit-log endpoint exists today. Precedent: `GET /api/change-log-modules` and event changed-log patterns.

### Recommended API

```
GET /api/leapspaces/{id}/changed-logs
```

Should follow the event changed-log model (filter by actor, module, action type).

---

## 25. Manage LeapSpace — Moderation

**Route:** `settings` → sidebar: "Moderation"
**Implementation:** `GlobalSettingsPage.tsx` — generic editable section

No moderation endpoint exists today.

### Recommended API

```
GET /api/leapspaces/{id}/moderation
PUT /api/leapspaces/{id}/moderation
GET /api/leapspaces/{id}/moderation-queue
```

---

## 26. Manage LeapSpace — My Content

**Route:** `settings` → sidebar: "My Content"
**Implementation:** `GlobalSettingsPage.tsx` — generic editable section

No content-defaults endpoint exists today.

### Recommended API

```
GET /api/leapspaces/{id}/content-defaults
PUT /api/leapspaces/{id}/content-defaults
```

---

## 27. Permission Catalog

23 permissions across 6 categories. Used in Roles & Permissions and Teams sections.

### Content (4)

| ID | Label | Description |
|---|---|---|
| `content.view` | View content | See posts, articles, and shared resources |
| `content.create` | Create content | Publish posts, articles, and resources |
| `content.edit` | Edit any content | Modify content created by others |
| `content.delete` | Delete any content | Remove content created by others |

### Members (4)

| ID | Label | Description |
|---|---|---|
| `members.view` | View members | See the member directory |
| `members.invite` | Invite members | Send invitations to new people |
| `members.remove` | Remove members | Revoke membership from the LeapSpace |
| `members.manage-roles` | Change member roles | Promote or demote members |

### Events (4)

| ID | Label | Description |
|---|---|---|
| `events.view` | View events | See event listings and details |
| `events.create` | Create events | Start new events in this LeapSpace |
| `events.manage` | Manage events | Edit or cancel any event |
| `events.manage-attendees` | Manage attendees | Approve, reject, or check in attendees |

### Courses (3)

| ID | Label | Description |
|---|---|---|
| `courses.view` | View courses | See course listings and materials |
| `courses.create` | Create courses | Author new courses |
| `courses.manage` | Manage courses | Edit or archive any course |

### Communities (3)

| ID | Label | Description |
|---|---|---|
| `communities.view` | View communities | See community spaces and channels |
| `communities.create` | Create communities | Start new community spaces |
| `communities.moderate` | Moderate communities | Pin, lock, or delete community threads |

### Settings & Admin (5)

| ID | Label | Description |
|---|---|---|
| `settings.view` | View settings | See LeapSpace configuration |
| `settings.manage` | Manage settings | Change branding, integrations, and config |
| `settings.manage-roles` | Manage roles | Create, edit, or delete role definitions |
| `settings.manage-teams` | Manage teams | Create and configure teams |
| `settings.view-audit` | View audit log | Access operational change history |

### Default Role Permission Assignments

| Permission | Admin | Moderator | Creator | Learner | Event Manager |
|---|---|---|---|---|---|
| `content.view` | Yes | Yes | Yes | Yes | Yes |
| `content.create` | Yes | Yes | Yes | — | Yes |
| `content.edit` | Yes | Yes | — | — | — |
| `content.delete` | Yes | Yes | — | — | — |
| `members.view` | Yes | Yes | Yes | Yes | Yes |
| `members.invite` | Yes | Yes | — | — | Yes |
| `members.remove` | Yes | Yes | — | — | — |
| `members.manage-roles` | Yes | — | — | — | — |
| `events.view` | Yes | Yes | Yes | Yes | Yes |
| `events.create` | Yes | — | Yes | — | Yes |
| `events.manage` | Yes | — | — | — | Yes |
| `events.manage-attendees` | Yes | — | — | — | Yes |
| `courses.view` | Yes | Yes | Yes | Yes | Yes |
| `courses.create` | Yes | — | Yes | — | — |
| `courses.manage` | Yes | — | — | — | — |
| `communities.view` | Yes | Yes | Yes | Yes | Yes |
| `communities.create` | Yes | — | Yes | — | — |
| `communities.moderate` | Yes | Yes | — | — | — |
| `settings.view` | Yes | — | — | — | Yes |
| `settings.manage` | Yes | — | — | — | — |
| `settings.manage-roles` | Yes | — | — | — | — |
| `settings.manage-teams` | Yes | — | — | — | — |
| `settings.view-audit` | Yes | — | — | — | Yes |
| **Total** | **23** | **12** | **10** | **5** | **11** |

---

## 28. Implementation Status Summary

### Fully Custom Admin UIs (complete)

| Section | File | Lines | Key Features |
|---|---|---|---|
| Members | `GlobalSettingsPage.tsx` | ~200 | Searchable table, role change, remove with modal, stats bar |
| Invitations | `GlobalSettingsPage.tsx` | ~250 | Status filters, single + bulk invite forms, cancel with modal |
| Roles & Permissions | `GlobalSettingsPage.tsx` | ~300 | Expandable role cards, create/edit with PermissionCheckboxGrid |
| Teams | `GlobalSettingsPage.tsx` | ~400 | Create with inline permission customization, save-as-preset, member search |
| LeapSpace Profile | `GlobalSettingsPage.tsx` | ~150 | Live preview card, full form with toggles, privacy callout |
| Notifications | `GlobalSettingsPage.tsx` | ~100 | Toggle grid + digest select |
| Profile Basics | `ProfileSettingsPage.tsx` | ~150 | Banner + avatar upload, all fields with API hints |
| Professional Identity | `ProfileSettingsPage.tsx` | ~150 | Skills tags, featured links, structured inputs |
| Visibility | `ProfileSettingsPage.tsx` | ~100 | Toggle grid + info panel |
| Authentication | `ProfileSettingsPage.tsx` | ~200 | 2FA modal, passkeys, sessions, security alerts |
| Credits | `ProfileSettingsPage.tsx` | ~150 | Balance display, package purchase, transaction history |
| Billing | `ProfileSettingsPage.tsx` | ~80 | Plan, payment, invoices |
| Connected Accounts | `ProfileSettingsPage.tsx` | ~50 | 4 provider toggles |
| Active Sessions | `ProfileSettingsPage.tsx` | ~100 | Session list, revoke, trusted devices |
| Preferences | `ProfileSettingsPage.tsx` | ~80 | Language, region, timezone, theme, start page |

### Generic Editable Sections (placeholder forms)

Overview, Branding, Integrations, Policies, Audit Log, Moderation, My Content — all use `SimpleEditableSection` with primary/secondary/notes/enabled fields.

### Sidebar Role Gating (GlobalSettingsPage)

| Role | Visible Groups |
|---|---|
| Admin | Personal, Workspace, Access |
| Moderator | Personal, Moderation |
| Creator | Personal, Creation, Workspace |
| Learner | Personal only |

---

## 29. API Gap Summary for Backend Team

### Priority 1 — Endpoints UI is actively calling / ready to wire

| Endpoint | Method | Purpose | UI Ready |
|---|---|---|---|
| `PATCH /api/leapspaces/{id}/members/{memberId}` | PATCH | Change member role | Yes — inline select in Members table |
| `DELETE /api/leapspaces/{id}/members/{memberId}` | DELETE | Remove member | Yes — confirmation modal built |
| Resend invitation endpoint | — | Resend pending invitation | Yes — button built, shows "not available" toast |
| Edit invitation role endpoint | — | Change role on pending invite | No UI yet |
| Rename role on access-control | — | Rename without perm changes | No UI yet |
| Delete role endpoint | DELETE | Remove custom role | No UI yet |

### Priority 2 — New endpoint families for existing UI

| Endpoint Family | Purpose | UI Built |
|---|---|---|
| `GET/PUT /api/leapspaces/{id}/my-profile` | LeapSpace profile overrides | Yes — full form with 15+ fields |
| `GET/PUT /api/leapspaces/{id}/my-notification-settings` | Per-space notification prefs | Yes — 9 toggles + 1 select |
| `GET/PUT /api/account/security` | Auth, 2FA, passkeys, sessions | Yes — full section |
| `GET/PUT /api/account/preferences` | Language, region, timezone, theme | Yes — full section |
| `GET/DELETE /api/account/sessions` | Session management | Yes — list + revoke |
| `GET/PUT /api/account/billing` | Billing management | Yes — full section |
| `GET/POST/DELETE /api/account/connected-providers` | OAuth provider links | Yes — 4 toggles |

### Priority 3 — Profile field extensions

Add to `GET/PUT /api/profile`:

| Field | Type | Used In |
|---|---|---|
| `preferredName` | string | Profile Basics |
| `headline` | string | Profile Basics |
| `location` | string | Profile Basics |
| `websiteUrl` | string (URL) | Profile Basics |
| `bannerImageId` | string | Profile Basics |
| `professionalTitle` | string | Professional Identity |
| `company` | string | Professional Identity |
| `industry` | string | Professional Identity |
| `expertisePrimary` | string | Professional Identity |
| `skills` | string[] | Professional Identity |
| `experienceSummary` | string | Professional Identity |
| `educationSummary` | string | Professional Identity |
| `featuredLinks` | `{label, url}[]` | Professional Identity |

Add to `GET/PUT /api/profile/visibility` (or extend `/api/profile`):

| Field | Type | Used In |
|---|---|---|
| `profileVisibility` | enum | Visibility |
| `showCompany` | boolean | Visibility |
| `showLocation` | boolean | Visibility |
| `showSocialLinks` | boolean | Visibility |
| `searchDiscoverability` | boolean | Visibility |
| `recommendationSignals` | boolean | Visibility |

### Priority 4 — Future endpoint families

| Endpoint Family | Purpose |
|---|---|
| `GET/POST/PUT/DELETE /api/leapspaces/{id}/teams` | Team management |
| `GET/PUT /api/leapspaces/{id}/policies` | Governance policies |
| `GET /api/leapspaces/{id}/changed-logs` | Audit log |
| `GET/PUT /api/leapspaces/{id}/moderation` | Moderation settings |
| `GET/PUT /api/leapspaces/{id}/content-defaults` | Creator defaults |
| `GET /api/integrations/installations` | List installed integrations |
| `DELETE /api/integrations/{installationId}` | Disconnect integration |

---

## 30. Delivery Phases

### Phase 1 — Build against what backend supports now

1. Global Profile Basics (name, bio, avatar supported)
2. Global Professional Identity (prototype fields, backend missing)
3. Global Visibility (prototype, backend missing)
4. LeapSpace Overview (fully supported)
5. LeapSpace Branding (partially supported)
6. LeapSpace Integrations (mostly supported)
7. LeapSpace Members (list supported, change role / remove missing)
8. LeapSpace Invitations (fully supported except resend)
9. LeapSpace Roles (fully supported except rename/delete)

### Phase 2 — Product-complete UX with backend gap markers

1. Global Preferences
2. Global Authentication
3. Global Billing
4. Global Connected Accounts
5. Global Active Sessions
6. LeapSpace My Profile
7. LeapSpace Notifications
8. LeapSpace Teams
9. LeapSpace Policies
10. LeapSpace Audit Log
11. LeapSpace Moderation
12. LeapSpace My Content

### Phase 3 — Future expansion (Courses & Communities)

1. Reuse global identity fields
2. Reuse LeapSpace role/permission patterns
3. Reuse integrations/media/language patterns
4. Add child-scope settings after LeapSpace layer is stable

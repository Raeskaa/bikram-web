# Mobile Handoff Spec: Replicate Web Settings + Profile System

## Goal

Replicate the current web settings/profile work in the mobile UX repo.

This is not a redesign from scratch.
This is a parity implementation request.

The mobile UX must replicate the current web behavior, structure, labels, field ownership, and interaction model for:

1. Global user settings/profile
2. LeapSpace-scoped settings/profile

The mobile app must preserve the same explicit split used on web:

1. `My Profile`
2. `My Account`
3. `Manage LeapSpace`
4. `LeapSpace Profile`

Do not collapse these into one generic “Settings” surface.
Do not rename them casually.
Do not mix account/security/billing into profile.

---

## Non-Negotiable Product Rules

These rules were explicitly decided and must remain true on mobile:

1. Anonymity is available in all LeapSpaces.
2. Admins do not see hidden identities when a user is anonymous.
3. Direct messaging permissions are global defaults with LeapSpace overrides.
4. `My Profile` is the user’s default professional/public identity.
5. `My Account` is the user’s technical/internal account management area.
6. `LeapSpace Profile` is the scoped profile/visibility/privacy layer inside one specific LeapSpace.
7. Billing, sessions, authentication, connected providers, and account controls must never appear under `My Profile`.
8. LeapSpace-specific profile customization must never be merged into `My Account`.

---

## Exact Product Language To Preserve

Use these labels exactly:

1. `My Profile`
2. `My Account`
3. `Manage LeapSpace`
4. `LeapSpace Profile`
5. `Notifications`
6. `Connected Accounts`
7. `Authentication`
8. `Billing`
9. `Active Sessions`
10. `Profile Basics`
11. `Professional Identity`
12. `Visibility`

Avoid:

1. Calling account settings `Profile`
2. Calling LeapSpace settings `Global Settings`
3. Putting billing/security under profile wording

Important:
On the web user menu, `Global Settings` was already renamed to `My Account`.
Mobile should align with that updated language.

---

## What Exists On Web Right Now

There are 2 main settings surfaces:

1. Global user settings screen
   - implemented in web as `ProfileSettingsPage`
   - this contains both:
     - `My Profile`
     - `My Account`

2. LeapSpace settings screen
   - implemented in web as `GlobalSettingsPage`
   - despite the filename, this is actually the `Manage LeapSpace` / LeapSpace-scoped settings surface

Mobile should replicate the product intent, not the confusing file name.

---

## Navigation / Entry Point Behavior

### Global user settings entry
On web:

1. `Profile` from user menu opens the global settings surface focused on profile
2. `My Account` from user menu opens the same global settings surface
3. `Billing` deep-links/focuses the billing area of the same global settings surface
4. `Connected Accounts` deep-links/focuses the connected accounts area of the same global settings surface

### LeapSpace settings entry
On web:

1. Sidebar item is `Manage LeapSpace`
2. That opens the LeapSpace-scoped settings surface
3. This is separate from the global user settings surface

### Mobile parity requirement
On mobile, there must still be two separate destinations:

1. Global user settings destination
2. LeapSpace settings destination

Do not combine them into one monolithic settings page.

---

# 1. Global User Settings Surface

## Screen Purpose

This screen represents the user-level account center.
It contains two groups:

1. `My Profile`
2. `My Account`

This is the user’s cross-LeapSpace settings surface.

---

## Global Screen Structure

### Header area
The web screen currently has:

1. Back action
2. Lightweight identity card / account center intro on the left rail
3. Main content header on the right:
   - badge-like subtitle:
     - `Global profile` when in profile sections
     - `Internal account controls` when in account sections
   - title:
     - `My Profile` or `My Account`
   - descriptive text
   - lightweight inline metadata string instead of large summary cards

Important:
The latest web version removed the large repeated header metric cards.
Mobile should also avoid heavy static summary cards.
Use a simple subtitle/meta treatment instead.

### Left-side navigation on web
The web version has a searchable left nav with 2 groups:

#### Group 1: `My Profile`
1. `Profile Basics`
2. `Professional Identity`
3. `Visibility`

#### Group 2: `My Account`
1. `Preferences`
2. `Authentication`
3. `Billing`
4. `Connected Accounts`
5. `Active Sessions`

### Mobile adaptation
On mobile, this can be implemented with any mobile-appropriate pattern, for example:

1. grouped list
2. segmented top switch + sublist
3. stacked sections with sticky subnav
4. settings index page + drill-in pages

But the logical grouping and labels must remain the same.

---

## Global Search Behavior

The web screen has a search field:
`Search profile or account`

Behavior:
1. It filters the visible nav items by label text only
2. It does not search form values
3. It does not change fields themselves
4. It just filters the list of available sections in the navigation

Mobile should preserve this behavior if search is included.
If mobile omits nav search due to UX constraints, the section grouping still must remain explicit.

---

## Global Footer Save Bar Behavior

The web screen has a bottom action bar with:

1. save/discard behavior
2. dirty state text:
   - `You have unsaved changes`
   - or `All changes saved`
3. contextual subtitle:
   - profile sections:
     - `Saving here updates your global default profile only.`
   - account sections:
     - `Saving here updates only account-level controls.`

Buttons:
1. `Discard changes`
2. `Save changes`

Current web behavior:
1. Forms are locally editable
2. Save shows toast feedback
3. Discard resets to initial state
4. This is currently prototype/local state behavior, not backend persistence

Mobile should replicate this behavior.

---

# 1A. Global `My Profile`

## Purpose

This is the default professional identity across LeapSpace.

It is:
1. global
2. portable
3. professional/public
4. the inheritance base for LeapSpace profile overrides

This is not:
1. account security
2. billing
3. provider connections
4. sessions
5. authentication

---

## `My Profile` Sections

### Section: `Profile Basics`

#### Fields currently implemented on web
1. `Full name`
   - text input
2. `Preferred name`
   - text input
3. `Professional headline`
   - text input
4. `Primary location`
   - text input
5. `Short bio`
   - textarea
6. `Personal website`
   - text input
7. `Profile assets`
   - actions only:
     - `Change avatar`
     - `Change banner`

#### Supporting copy on web
Section description:
`These are the default identity fields LeapSpaces inherit from unless a scoped profile overrides them.`

#### Important behavioral meaning
1. These values are inherited by LeapSpace profile by default
2. LeapSpace can override selected presentation fields
3. This is the base profile

---

### Section: `Professional Identity`

#### Fields currently implemented on web
1. `Current role / title`
   - text input
2. `Company / organization`
   - text input
3. `Industry`
   - text input
4. `Primary expertise`
   - text input
5. `Skills and strengths`
   - textarea
6. `Work experience summary`
   - textarea
7. `Education summary`
   - textarea
8. `Featured links`
   - textarea

#### Supporting copy on web
Section description:
`Use richer fields here so the profile feels complete in discovery, trust, and matching surfaces.`

---

### Section: `Visibility`

#### Fields currently implemented on web

1. `Profile visibility`
   - select
   - options:
     1. `LeapSpace members only`
     2. `Connections only`
     3. `Public profile`

2. `Show company on global profile`
   - toggle

3. `Show location on global profile`
   - toggle

4. `Show social links`
   - toggle

5. `Allow member search discovery`
   - toggle

6. `Use profile for recommendations`
   - toggle

#### Supporting informational block on web
A side note block exists with the concept:
`What stays out of My Profile`

Its content explains:
1. billing, invoices, payment methods, sessions, passwords, and provider connections remain in `My Account`
2. anonymity rules do not belong in `My Profile`
3. anonymity is handled inside each LeapSpace Profile

Mobile should preserve this concept, though the UI can be a collapsible note, helper card, or inline explainer.

---

## `My Profile` Default Demo Values On Web

These values are present in the current web prototype state:

1. Full name: current user name or `Google User`
2. Preferred name: `Google`
3. Professional headline: `AI systems operator building high-signal communities`
4. Short bio: `I design, operate, and grow community-led learning systems for professionals.`
5. Location: `Bengaluru, India`
6. Website: `https://trueleap.io/rae`
7. Role: `Community Systems Designer`
8. Company: `TrueLeap`
9. Industry: `Professional learning and creator tools`
10. Expertise: `Community design, event systems, growth operations`
11. Skills: `Growth strategy, GTM, event operations, mentoring`
12. Experience: `3 roles added across community, learning, and growth functions.`
13. Education: `2 entries added with design and systems focus.`
14. Featured links: `LinkedIn, portfolio, case studies`
15. Profile visibility: `members-only`
16. Show company: true
17. Show location: false
18. Show social links: true
19. Search discoverability: true
20. Recommendation signals: true

Mobile does not have to use these exact sample values visually, but the field set and behavior must match.

---

# 1B. Global `My Account`

## Purpose

This is the technical/internal account area.

This includes:
1. preferences
2. authentication
3. billing
4. connected auth providers
5. session/device management

This must remain distinct from `My Profile`.

---

## `My Account` Sections

### Section: `Preferences`

#### Fields currently implemented on web
1. `Language`
   - text input
2. `Region`
   - select
   - options:
     1. `India`
     2. `United States`
     3. `Singapore`
     4. `United Kingdom`
3. `Timezone`
   - select
   - options:
     1. `GMT+5:30`
     2. `UTC`
     3. `Pacific Time`
     4. `Eastern Time`
4. `Theme preference`
   - segmented tabs
   - options:
     1. `Light`
     2. `System`
     3. `Dark`
5. `Default start page`
   - select
   - options:
     1. `Engagement feed`
     2. `Home overview`
     3. `Events`
     4. `Communities`

#### Section description
`These affect the account experience, not the public profile.`

---

### Section: `Authentication`

#### Fields currently implemented on web
1. `Account email`
   - text input
2. `Password state`
   - text input
3. `Passkeys`
   - text input
4. `Session challenge policy`
   - text input
5. `Two-factor authentication`
   - toggle
6. `Security alerts`
   - toggle

#### Section description
`This needs to feel operational, not just descriptive.`

---

### Section: `Billing`

#### Fields currently implemented on web
1. `Current plan`
   - text input
2. `Payment method`
   - text input
3. `Billing email`
   - text input
4. `Renewal date`
   - text input
5. `Invoice delivery`
   - textarea

#### Section description
`Billing belongs here so it never gets mixed into the profile experience.`

---

### Section: `Connected Accounts`

#### Fields currently implemented on web
All are toggles.

1. `Google`
2. `LinkedIn`
3. `Microsoft`
4. `GitHub`

Each item has descriptive helper text explaining what that provider is used for.

#### Section description
`Real connection state makes this page feel finished even in prototype form.`

---

### Section: `Active Sessions`

#### Fields currently implemented on web
1. `Current session label`
   - text input
2. `Current session details`
   - text input
3. `Trusted devices summary`
   - text input
4. `Session control`
   - actions:
     1. `Review devices`
     2. `Revoke other sessions`

#### Section description
`Let this area feel actionable instead of like a static list.`

---

## `My Account` Default Demo Values On Web

Current web prototype uses:

1. Language: `English`
2. Region: `india`
3. Timezone: `gmt-5-30`
4. Theme: `light`
5. Start page: `engagement-feed`
6. Email: current user email or `user@google.com`
7. Password state: `Updated 41 days ago`
8. Two-factor: true
9. Passkeys: `1 registered device`
10. Security alerts: true
11. Plan: `Business plan billed monthly`
12. Payment method: `Visa ending in 4242`
13. Billing email: same as account email
14. Renewal date: `April 28, 2026`
15. Invoice delivery: `Monthly summary to finance and account owner`
16. Google connected: true
17. LinkedIn connected: true
18. Microsoft connected: false
19. GitHub connected: false
20. Current session label: `Chrome on Mac`
21. Current session details: `San Francisco, CA • Active now`
22. Trusted devices: `3 devices marked trusted`
23. Session policy: `Challenge sign-in when device or region changes`

---

# 2. LeapSpace Settings Surface (`Manage LeapSpace`)

## Purpose

This screen is scoped to one selected LeapSpace only.

This is not global profile.
This is not global account.

This is where the user edits:

1. LeapSpace Profile
2. LeapSpace notification overrides
3. role-dependent workspace settings

Important:
The web filename is `GlobalSettingsPage.tsx`, but the actual product surface is LeapSpace settings.
Mobile should treat it as `Manage LeapSpace`.

---

## LeapSpace Header / Scope Model

The web screen clearly communicates:

1. this is scoped to the selected LeapSpace
2. the selected LeapSpace can be switched
3. the available navigation changes by role
4. `LeapSpace Profile` inherits from global profile by default
5. selected identity/privacy/messaging fields can be overridden here

The latest web version also removed large summary cards here.
Use a lighter subtitle/meta treatment on mobile too.

Current lightweight web header metadata:
`{role} role • {groups count} groups • {events count} events`

Example:
`Admin role • 10 groups • 15 events`

---

## LeapSpace Switcher

Web includes a switcher/dropdown for selecting the active LeapSpace.

### Demo LeapSpaces in current web prototype
1. `TrueLeap Inc.`
   - type: `work`
   - role: `admin`
   - communities: 10
   - courses: 24
   - events: 15

2. `Creator Studio`
   - type: `custom`
   - role: `creator`
   - communities: 4
   - courses: 7
   - events: 3

3. `Community Circle`
   - type: `community`
   - role: `moderator`
   - communities: 6
   - courses: 2
   - events: 8

4. `AI Learners Hub`
   - type: `school`
   - role: `learner`
   - communities: 3
   - courses: 11
   - events: 5

Mobile should support scoped selection of LeapSpace.
It can be a picker, sheet, top selector, or a prior entry flow.

---

## LeapSpace Search Behavior

The web screen has:
`Search LeapSpace settings`

Behavior:
1. filters the visible section nav items by label
2. does not search field content
3. role-based section availability still applies

---

## LeapSpace Role-Based Navigation

This is important and must be preserved.

### Role: `admin`
Navigation groups and items:

#### Personal
1. `My Profile`
2. `Notifications`

#### Workspace
1. `Overview`
2. `Branding`
3. `Integrations`

#### Access
1. `Members`
2. `Teams`
3. `Roles`
4. `Policies`
5. `Invitations`
6. `Audit Log`

---

### Role: `moderator`

#### Personal
1. `My Profile`
2. `Notifications`

#### Moderation
1. `Moderation`
2. `Members`
3. `Invitations`

---

### Role: `creator`

#### Personal
1. `My Profile`
2. `Notifications`

#### Creation
1. `My Content`
2. `Integrations`

#### Workspace
1. `Overview`

---

### Role: `learner`

#### Personal
1. `My Profile`
2. `Notifications`

---

# 2A. LeapSpace `My Profile` = `LeapSpace Profile`

## Purpose

This is the scoped identity/privacy/profile layer inside one LeapSpace.

This must inherit from global profile by default but allow overrides.

This is where:
1. anonymous mode lives
2. codename usage lives
3. scoped bio/display name lives
4. scoped DM/discovery permissions live

This is not where:
1. billing lives
2. password lives
3. sessions live
4. connected auth providers live

---

## LeapSpace Profile Fields Currently Implemented On Web

### Identity / override fields
1. `Display name in this LeapSpace`
   - text input
2. `Codename / alternate name`
   - text input
3. `Role title`
   - text input
4. `Profile photo mode`
   - select
   - options:
     1. `Use global avatar`
     2. `Use LeapSpace-specific avatar`
5. `Override mode`
   - select
   - options:
     1. `Customized for this LeapSpace`
     2. `Fully inherit global profile`
6. `Override scope`
   - text input
7. `Bio in this LeapSpace`
   - textarea

### Scoped toggles
1. `Anonymous mode in this LeapSpace`
2. `Use codename instead of full identity`
3. `Show role badge on profile`
4. `Appear in member directory`
5. `Allow direct messages from members`
6. `Appear in search inside this LeapSpace`
7. `Allow connection requests`
8. `Allow mentoring requests`
9. `Allow collaboration requests`

---

## LeapSpace Profile UI Concepts Currently Present On Web

### Preview card
Web currently shows a profile preview card on the left side with:
1. banner area
2. avatar initials
3. resolved display name
   - if `useCodename` and codename exists, show codename
   - otherwise show display name
4. role badge
5. current scoped bio

Mobile should preserve this preview concept, but it can be lighter.

### Privacy rule explainer
Web includes a dedicated privacy explanation block stating:

1. anonymity is available in all LeapSpaces
2. if a member turns on anonymous mode here, admins do not get an override view of the hidden identity

This exact product rule must remain explicit on mobile.

---

## LeapSpace Profile Default Demo Values On Web

1. Display name: current user name or `Google User`
2. Codename: empty
3. Role title: based on LeapSpace role
4. Bio: `Helping creators and operators build structured, high-signal spaces.`
5. Profile photo mode: `global-avatar`
6. Override mode: `customized`
7. Override scope: `Display name, bio, photo, visibility, and messaging permissions`
8. Anonymous mode: false
9. Use codename: false
10. Show role badge: true
11. Appear in directory: true
12. Allow direct messages:
    - false only for learner by default
    - true otherwise
13. Allow connections: true
14. Allow mentoring:
    - false only for learner by default
    - true otherwise
15. Allow collaboration:
    - true for admin or creator
    - false otherwise
16. Appear in search: true

---

# 2B. LeapSpace `Notifications`

## Purpose

These are LeapSpace-scoped notification overrides.

These must be separate from the global account notification defaults.

The product rule is:
global defaults exist, LeapSpace can override them.

---

## Fields currently implemented on web

All toggles unless otherwise noted.

1. `Mute {LeapSpace name}`
2. `Mentions and replies`
3. `Direct messages from members`
4. `Mobile push notifications`
5. `Suppress @everyone and announcements`
6. `Suppress role mentions`
7. `Mute new event notifications`
8. `Inherit global defaults when no override exists`
9. `Digest frequency`
   - select
   - options:
     1. `Live notifications`
     2. `Hourly digest`
     3. `Daily digest`

---

## Default demo values on web

1. muteSpace: false
2. mentions: true
3. directMessages:
   - false only for learner by default
   - true otherwise
4. push: true
5. suppressAnnouncements: true
6. suppressRoleMentions: false
7. muteEvents: false
8. inheritGlobalDefaults: true
9. digestFrequency: `live`

---

# 2C. Other LeapSpace Sections Present On Web

These are currently implemented as editable generic sections, not fully specialized management systems yet.
Mobile should still include them if the role allows them.

They all currently include:
1. `Primary setting`
2. `Secondary setting`
3. `Operational notes`
4. `Section enabled` toggle
5. `Discard`
6. `Save section`

## Sections
1. `My Content`
2. `Moderation`
3. `Overview`
4. `Branding`
5. `Integrations`
6. `Members`
7. `Teams`
8. `Roles`
9. `Policies`
10. `Invitations`
11. `Audit Log`

These are role-gated as described earlier.

Important:
These are not deeply specialized on web yet.
They are editable placeholders with real form state.
Mobile should replicate the same scope, not invent unrelated admin logic.

---

## Current default content for these generic LeapSpace sections

### My Content
1. Primary: `Review before publish`
2. Secondary: `Slack, Zapier, Google Calendar`
3. Notes: `Creator defaults for content built inside {LeapSpace}.`

### Moderation
1. Primary: `Community safety baseline`
2. Secondary: `Prioritize reports assigned to me`
3. Notes: `Moderators can manage safety and member-level enforcement, but not workspace identity or billing.`

### Overview
1. Primary: `{LeapSpace name}`
2. Secondary: `{LeapSpace type or Workspace}`
3. Notes: `High-level description, default member promise, and workspace orientation copy.`

### Branding
1. Primary: `{LeapSpace name}`
2. Secondary: `Hero image uploaded`
3. Notes: `Workspace for creators, moderators, operators, and invited partners.`

### Integrations
1. Primary: `Slack connected to #community-ops`
2. Secondary: `2 calendars synced`
3. Notes: `3 automations active in Zapier.`

### Members
1. Primary: `246 active members`
2. Secondary: `18 pending invites`
3. Notes: `People with direct membership or inherited access in this LeapSpace.`

### Teams
1. Primary: `Core Admins`
2. Secondary: `Event Ops`
3. Notes: `Reusable groups that carry policies in bulk and make access composable.`

### Roles
1. Primary: `LeapSpace Admin`
2. Secondary: `Event Manager`
3. Notes: `Named permission bundles attached to members or teams.`

### Policies
1. Primary: `Actor + role + scope`
2. Secondary: `Admin approval required`
3. Notes: `Keep policies legible so the workspace access model feels intentional.`

### Invitations
1. Primary: `18 pending invites`
2. Secondary: `Community Team`
3. Notes: `Default assignee team and invite review process for this workspace.`

### Audit Log
1. Primary: `Policy changes retained 180 days`
2. Secondary: `Member and billing changes tracked`
3. Notes: `Operational log for admins reviewing access and workflow changes.`

---

# 3. Exact Ownership Split To Preserve

This is critical.

## Only in `My Profile`
1. full professional identity
2. professional headline
3. bio
4. profile presentation
5. role/company/industry/expertise
6. featured links
7. public/global discoverability defaults

## Only in `My Account`
1. account email
2. password/security controls
3. 2FA
4. passkeys
5. sessions/devices
6. billing
7. connected auth providers
8. app preferences like language/region/theme/start page

## Only in `LeapSpace Profile`
1. display name override for one LeapSpace
2. codename/pseudonymous identity for one LeapSpace
3. LeapSpace-scoped bio or role title
4. directory visibility inside that LeapSpace
5. DM availability override inside that LeapSpace
6. search visibility inside that LeapSpace
7. anonymous mode inside that LeapSpace
8. collaboration/mentoring/connection permissions inside that LeapSpace

---

# 4. Fields That Must Never Appear In LeapSpace Profile

Do not put any of these inside LeapSpace Profile:

1. account email
2. recovery email
3. login phone number
4. password
5. 2FA settings
6. passkeys
7. active sessions
8. billing plan
9. payment method
10. invoices
11. connected login providers
12. delete account
13. export account data

---

# 5. Fields That Inherit From Global Profile But Can Be Overridden In LeapSpace

These are part of the intended model and should remain true in mobile architecture:

1. preferred name
2. pronouns
3. professional headline
4. short bio
5. profile photo
6. cover image
7. expertise tags
8. interests
9. mentorship availability
10. collaboration interests

Important:
The current web implementation does not yet expose every one of these as editable controls.
But the inheritance model must be preserved in the mobile data design.

---

# 6. Current Web Interaction Model

## Save behavior
Current web is prototype/local-state based.

### Global screen
1. section edits update local form state
2. `Save changes` shows success toast
3. `Discard changes` resets to initial local values

### LeapSpace screen
1. profile edits update local form state
2. notifications edits update local form state
3. generic admin section edits update local form state
4. save/discard behaves locally with success toast

Mobile should match this unless that repo already has persistence wired.

---

## Dirty-state behavior
Global screen has dirty-state awareness:
1. compares current form to initial form
2. shows `You have unsaved changes` if changed
3. otherwise shows `All changes saved`

LeapSpace screen currently does not have the same global sticky footer treatment.
Section-level save/discard exists instead.

---

# 7. Current Web Visual Direction To Preserve On Mobile

This is not about pixel-matching desktop.
It is about preserving UX intent.

## Preserve
1. explicit separation between global and LeapSpace settings
2. denser, more complete settings surfaces
3. editable controls instead of static cards
4. lighter headers with subtitle/meta lines
5. save/discard clarity
6. role-aware LeapSpace navigation
7. clear explanatory copy where privacy/identity rules matter

## Avoid
1. giant static summary cards
2. repeating decorative cards that overpower form content
3. generic “settings soup”
4. hiding the distinction between profile/account/LeapSpace
5. mixing security and billing into profile
6. over-abstracting the copy until the product rules disappear

---

# 8. Suggested Mobile IA

This is guidance, not a strict visual prescription.

## Global user settings mobile IA
Option A:
1. top-level `Account Center`
2. grouped list:
   - `My Profile`
   - `My Account`
3. tapping a group reveals its sub-sections
4. each section is a mobile form screen

Recommended sub-screens:
1. `Profile Basics`
2. `Professional Identity`
3. `Visibility`
4. `Preferences`
5. `Authentication`
6. `Billing`
7. `Connected Accounts`
8. `Active Sessions`

## LeapSpace mobile IA
1. top-level `Manage LeapSpace`
2. top selector for current LeapSpace
3. role-aware grouped sections
4. first-class `LeapSpace Profile`
5. separate `Notifications`
6. other role-based sections as additional drill-in screens

---

# 9. What The Mobile Agent Must Not Miss

1. There are 2 distinct settings destinations, not 1.
2. `My Profile` and `My Account` share the same global user settings surface, but remain visibly separate.
3. `Manage LeapSpace` is a separate scoped settings surface.
4. `LeapSpace Profile` must inherit from global profile by default.
5. Anonymous mode is available in all LeapSpaces.
6. Admins do not see hidden identities when anonymity is on.
7. DM permissions are global defaults with LeapSpace overrides.
8. Current web removed large header metric cards in favor of a simple text metadata line.
9. Web currently has editable fields and save/discard behavior, even where data is prototype-only.
10. Role-based navigation for LeapSpace settings must remain intact.

---

# 10. Implementation Reference Summary

## Web files that define the current behavior
1. `field_list.md`
2. `src/components/ProfileSettingsPage.tsx`
3. `src/components/GlobalSettingsPage.tsx`
4. `src/components/UserMenu.tsx`
5. `src/App.tsx`

## Important mapping
1. `ProfileSettingsPage.tsx` = global `My Profile` + `My Account`
2. `GlobalSettingsPage.tsx` = `Manage LeapSpace` / LeapSpace-scoped settings
3. User menu label is now `My Account`

---

# 11. Final Build Instruction For The Mobile Repo

Build mobile parity for the web settings system exactly as follows:

1. Create a global user settings experience with:
   - `My Profile`
   - `My Account`

2. Create a separate LeapSpace settings experience with:
   - `Manage LeapSpace`
   - role-based scoped navigation
   - `LeapSpace Profile`
   - `Notifications`
   - additional role-based sections

3. Match the current web fields and controls feature-for-feature:
   - same sections
   - same ownership split
   - same labels
   - same toggles/selects/text inputs/textareas/actions
   - same anonymity and DM rules
   - same save/discard behavior
   - same distinction between inherited global identity and scoped LeapSpace overrides

4. Do not simplify away the product model.

If something must differ because of mobile ergonomics, preserve:
1. the product language
2. the field ownership
3. the privacy rules
4. the role logic
5. the section structure

Visual layout can adapt.
Product architecture cannot.

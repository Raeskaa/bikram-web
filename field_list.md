# Field List

Explicit split for:
- Global Profile
- Global Settings
- LeapSpace Profile

This document is intentionally strict about ownership so the same field does not drift across multiple surfaces.

## 1. Global Profile

Purpose:
- Public or professional identity of the user across LeapSpace
- Used for discovery, trust, matching, mentorship, collaboration
- Should feel like a professional profile, not an account settings form

Field rules:
- These are identity and presentation fields
- These belong to the user globally by default
- LeapSpace Profile may override selected presentation fields where explicitly allowed

### Core Identity
- Full name
- Preferred name
- Pronouns
- Professional headline
- Short bio
- Detailed about / summary
- Profile photo
- Cover image / banner

### Professional Information
- Current role / title
- Company / organization
- Department / function
- Industry
- Years of experience
- Work status
  - employed
  - founder
  - freelancer
  - student
  - advisor
  - seeking opportunities

### Expertise and Interests
- Primary expertise areas
- Skills
- Secondary skills
- Interests
- Topics I can help with
- Topics I want help with
- Mentorship availability
- Collaboration interests

### Background
- Work experience entries
  - title
  - organization
  - start date
  - end date
  - current role toggle
  - description
- Education entries
  - institution
  - program / degree
  - start date
  - end date
  - description
- Certifications
- Awards / recognitions

### Content and Proof
- Featured links
- Featured projects
- Portfolio links
- Publications
- Case studies
- Resume / CV link
- Intro video link

### Social and External Links
- LinkedIn URL
- X / Twitter URL
- Personal website
- GitHub URL
- Behance / Dribbble / portfolio links
- YouTube URL
- Other custom links

### Location and Availability
- Location
- Timezone
- Open to remote toggle
- Available for mentorship toggle
- Available for consulting toggle
- Available for speaking toggle
- Available for hiring toggle

### Public Visibility Controls
- Profile visibility
  - public
  - LeapSpace members only
  - private
- Show full name toggle
- Show company toggle
- Show location toggle
- Show social links toggle
- Search discoverability toggle
- Allow profile-based recommendations toggle

## 2. Global Settings

Purpose:
- Technical and administrative account management
- Internal controls tied to the account, identity, login, billing, security, and preferences
- This is not the professional profile

Field rules:
- These are account-management fields
- These should not appear inside Global Profile
- These should not appear inside LeapSpace Profile except where a setting explicitly affects a LeapSpace experience

### Account Basics
- Account email
- Recovery email
- Phone number
- Username or account handle if required by platform
- Account ID
- Member since date
- Account status

### Authentication and Security
- Password
- Password last changed date
- Two-factor authentication enabled
- Two-factor method
  - authenticator app
  - SMS
  - email
- Backup codes status
- Passkey status
- Active sessions
- Trusted devices
- Recent login history
- Security alerts preference

### Connected Accounts
- Connected Google account
- Connected Microsoft account
- Connected Apple account
- Connected LinkedIn account
- Connected GitHub account
- Connected phone login
- Primary login method
- Merge account controls
- Disconnect controls per provider

### Billing and Subscription
- Current plan
- Plan status
- Billing cycle
- Payment method
- Billing contact name
- Billing email
- Billing address
- Tax ID / GST / VAT where needed
- Invoice history
- Upcoming renewal date
- Seat count if applicable
- Usage summary if applicable

### Notifications Preferences
- Email notifications enabled
- Push notifications enabled
- SMS notifications enabled
- Product updates toggle
- Security alert notifications toggle
- Billing notifications toggle
- Digest frequency
  - real-time
  - daily
  - weekly
  - off

### App Preferences
- Language
- Preferred country / region
- Time format
- Date format
- Theme
  - light
  - dark
  - system
- Accessibility preferences
  - reduced motion
  - higher contrast
  - larger text
- Default start page after login

### Privacy and Data Controls
- Data export request
- Download my data
- Delete account
- Deactivate account
- Consent preferences
- Analytics / tracking preferences
- AI personalization opt-in toggle

### Platform Preferences
- Default collaboration preferences
- Content recommendation preferences
- Invite handling preferences
- Default community notification level
- Default event reminder behavior

## 3. LeapSpace Profile

Purpose:
- How the user appears inside one specific LeapSpace
- Lets a user adapt or override parts of the global profile for a specific context
- Supports pseudonymous / community-specific identity where needed

Field rules:
- This is scoped to one LeapSpace only
- It should default to inheriting from Global Profile
- Only selected presentation fields should be overrideable
- Global account/security/billing fields must never live here

### Identity Mode
- Use global profile toggle
- Customize for this LeapSpace toggle
- Anonymous mode toggle
- Pseudonymous mode toggle
- Visibility in this LeapSpace
  - visible
  - limited
  - hidden

### Scoped Identity
- Display name in this LeapSpace
- Alternate name / codename
- Pronouns in this LeapSpace
- Headline in this LeapSpace
- Bio in this LeapSpace
- Profile photo override
- Cover image override

### Scoped Professional Context
- Role title in this LeapSpace
- Team / group in this LeapSpace
- Expertise tags shown in this LeapSpace
- Interests shown in this LeapSpace
- Collaboration intent in this LeapSpace
- Mentorship availability in this LeapSpace

### Scoped Contact and Discovery
- Show in member directory toggle
- Allow direct messages from members toggle
- Allow connection requests toggle
- Allow mentoring requests toggle
- Allow collaboration requests toggle
- Show profile to all members toggle
- Show profile only after approval toggle if product supports it

### Scoped Visibility Controls
- Hide full identity in this LeapSpace toggle
- Show only codename in this LeapSpace toggle
- Show role badge in this LeapSpace toggle
- Show organization in this LeapSpace toggle
- Show links in this LeapSpace toggle
- Appear in search inside this LeapSpace toggle

### Scoped Activity Preferences
- LeapSpace notification level
  - all
  - important only
  - mentions only
  - muted
- Event reminders in this LeapSpace
- Community post notifications in this LeapSpace
- Moderator/admin request notifications in this LeapSpace where applicable

### Scoped Metadata
- Joined this LeapSpace date
- Membership type
- Current role in this LeapSpace
- Badges in this LeapSpace
- Custom tags assigned in this LeapSpace

Note:
- Joined date, role, and assigned badges may be system-controlled rather than user-editable, but they are still part of the LeapSpace profile surface.

## 4. Explicit Ownership Split

### Only in Global Profile
- Full professional identity
- Work history
- Education
- Portfolio and featured work
- Global bio
- Global headline
- Global profile photo and banner
- Global discoverability

### Only in Global Settings
- Email and login credentials
- Password and security controls
- 2FA and passkeys
- Sessions and devices
- Billing and invoices
- Connected auth providers
- Language, region, theme, accessibility
- Data export and deletion

### Only in LeapSpace Profile
- Display name override for one LeapSpace
- Codename / pseudonymous identity in one LeapSpace
- LeapSpace-specific bio/headline/photo override
- Visibility inside that LeapSpace
- Member directory visibility inside that LeapSpace
- Direct message availability inside that LeapSpace

## 5. Fields That Can Inherit But Be Overridden In LeapSpace Profile

- Preferred name
- Pronouns
- Professional headline
- Short bio
- Profile photo
- Cover image
- Expertise tags
- Interests
- Mentorship availability
- Collaboration interests

These should follow this model:
- Inherit from Global Profile by default
- User can explicitly switch a field or the whole LeapSpace profile to custom

## 6. Fields That Must Never Be In LeapSpace Profile

- Account email
- Recovery email
- Phone number used for login
- Password
- 2FA settings
- Passkeys
- Active sessions
- Billing plan
- Payment method
- Invoice history
- Connected login providers
- Delete account
- Export account data

## 7. Recommended Navigation Labels

- My Profile
- My Account
- LeapSpace Profile

Avoid:
- Calling account settings `Profile`
- Mixing LeapSpace profile customization into `My Account`
- Putting billing/security under `My Profile`

## 8. Open Questions

- Which Global Profile fields are overrideable field-by-field versus full-profile override only
- Whether anonymity is available in every LeapSpace or only where enabled by platform policy
- Whether admins can see hidden identities when a user is anonymous to members
- Whether direct messaging permissions are global defaults with LeapSpace overrides, or LeapSpace-only

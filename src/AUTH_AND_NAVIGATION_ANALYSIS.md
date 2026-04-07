# 🔐 AUTH & NAVIGATION SYSTEM ANALYSIS
## Complete Product Manager Assessment for LeapSpace

> **Date**: January 20, 2026  
> **Prepared By**: Product Manager  
> **Purpose**: Full audit of authentication, navigation, major components, and settings flows

---

## 📊 EXECUTIVE SUMMARY

### Current State Overview
**Maturity Score**: 45/100

| Category | Status | Score | Priority |
|----------|--------|-------|----------|
| **Auth Flows** | ❌ Not Built | 0/100 | 🔴 CRITICAL |
| **Major Components** | ✅ Strong | 85/100 | 🟢 Good |
| **Navigation** | ✅ Good | 75/100 | 🟡 Needs Enhancement |
| **Settings** | 🟡 Basic | 60/100 | 🟡 Needs Work |
| **Account Merging** | ❌ Missing | 0/100 | 🔴 CRITICAL |

---

## 🚨 CRITICAL GAPS IDENTIFIED

### 1. **ZERO AUTHENTICATION SYSTEM** (Showstopper)
The entire authentication layer is missing. Users cannot:
- Sign in
- Register
- Reset passwords
- Verify emails
- Login with social providers
- Access guest mode

**Business Impact**: Cannot launch product without auth

---

# PART 1: AUTHENTICATION FLOWS

## 1.1 WHAT'S THERE (Currently)
### ❌ **NOTHING** - Complete Gap

**Files Checked**:
- ✗ No `/components/auth/` directory
- ✗ No SignIn component
- ✗ No Register component
- ✗ No ForgotPassword component
- ✗ No ResetPassword component
- ✗ No AuthLayout component
- ✗ No email verification flow
- ✗ No social login components

**App.tsx Check**:
```typescript
// Current App.tsx stages - NO AUTH STAGES
type Stage = 
  | 'home'
  | 'welcome'
  | 'chat'
  // ... other stages
  // ❌ Missing: 'signin', 'register', 'forgot-password', etc.
```

---

## 1.2 WHAT'S WEAK (N/A - Nothing Exists)

Since nothing exists, we skip to what's needed.

---

## 1.3 WHAT'S MISSING (Everything)

### 🔴 **CRITICAL AUTH FLOWS NEEDED**

#### A. **SignIn Flow**
**Required Screens**:
1. **SignIn.tsx** - Main login screen
   - Email + Password fields
   - "Remember me" checkbox
   - "Forgot password?" link
   - Social login buttons (Google, Facebook, LinkedIn, Apple)
   - "Don't have an account? Sign up" link
   - Error states (invalid credentials, locked account, etc.)

**Design Requirements**:
```
┌─────────────────────────────────────────┐
│           [TrueLeap Logo]               │
│                                         │
│        Welcome back to LeapSpace        │
│                                         │
│  Email    [________________]            │
│  Password [________________] [👁]        │
│                                         │
│  ☐ Remember me    Forgot password?      │
│                                         │
│  [Sign In →]                            │
│                                         │
│  ─────── or continue with ──────        │
│                                         │
│  [G] [f] [in] [@]                       │
│  (Social login buttons)                 │
│                                         │
│  Don't have an account? Sign up         │
└─────────────────────────────────────────┘
```

**States to Handle**:
- ✓ Valid credentials → Navigate to 'home'
- ✗ Invalid credentials → Show error message
- ✗ Unverified email → Show "Please verify your email" banner
- ✗ Account locked → Show contact support message
- 🔄 Loading state during authentication
- 🌐 Social auth in progress

---

#### B. **Register Flow**
**Required Screens**:
1. **Register.tsx** - Account creation
   - Full name
   - Email
   - Password (with strength indicator)
   - Confirm password
   - Terms & Privacy checkboxes
   - "Already have an account? Sign in" link
   - Social registration options

**Design Requirements**:
```
┌─────────────────────────────────────────┐
│           [TrueLeap Logo]               │
│                                         │
│         Create your account             │
│                                         │
│  Full Name  [________________]          │
│  Email      [________________]          │
│  Password   [________________] [👁]      │
│             [████████░░] Strong         │
│  Confirm    [________________] [👁]      │
│                                         │
│  ☑ I agree to Terms of Service          │
│  ☑ I agree to Privacy Policy            │
│                                         │
│  [Create Account →]                     │
│                                         │
│  ─────── or sign up with ──────         │
│                                         │
│  [G] [f] [in] [@]                       │
│                                         │
│  Already have an account? Sign in       │
└─────────────────────────────────────────┘
```

**Validation Rules**:
- Email: Valid format, not already registered
- Password: Min 8 chars, 1 uppercase, 1 number, 1 special char
- Confirm: Must match password
- Name: Required, min 2 chars

**Post-Registration Flow**:
1. Account created ✓
2. Verification email sent 📧
3. Show "Check your email" screen
4. User clicks verification link
5. EmailVerification.tsx screen
6. Redirect to onboarding or home

---

#### C. **ForgotPassword Flow**
**Required Screens**:
1. **ForgotPassword.tsx**
   - Email input
   - "Send reset link" button
   - Back to sign in link

2. **ResetPassword.tsx**
   - New password input
   - Confirm password input
   - Token validation from URL
   - Success/error states

**ForgotPassword Design**:
```
┌─────────────────────────────────────────┐
│      ← Back to Sign In                  │
│                                         │
│           [TrueLeap Logo]               │
│                                         │
│         Reset your password             │
│    We'll send you a reset link          │
│                                         │
│  Email  [________________]              │
│                                         │
│  [Send Reset Link →]                    │
│                                         │
│  Remember your password? Sign in        │
└─────────────────────────────────────────┘
```

**ResetPassword Design**:
```
┌─────────────────────────────────────────┐
│           [TrueLeap Logo]               │
│                                         │
│        Choose a new password            │
│                                         │
│  New Password      [________________]   │
│                    [████████░░] Strong  │
│  Confirm Password  [________________]   │
│                                         │
│  [Reset Password →]                     │
└─────────────────────────────────────────┘
```

**States**:
- Link sent successfully
- Link expired (show "Request new link" button)
- Invalid token
- Password reset successful → Auto-redirect to SignIn

---

#### D. **Email Verification Flow**
**Required Screens**:
1. **EmailVerificationPending.tsx**
   - "Check your email" message
   - Resend verification button
   - Change email option

2. **EmailVerified.tsx**
   - Success confirmation
   - "Continue to LeapSpace" button

**Design**:
```
┌─────────────────────────────────────────┐
│           [TrueLeap Logo]               │
│                                         │
│              📧                         │
│                                         │
│        Verify your email address        │
│                                         │
│  We sent a verification link to:        │
│  user@example.com                       │
│                                         │
│  [Resend Email]  [Change Email]         │
│                                         │
│  Already verified? Sign in              │
└─────────────────────────────────────────┘
```

---

#### E. **Guest Mode**
**Required**:
1. **Guest access option** on WelcomeScreen
2. **Limited feature set** for guests
3. **"Sign up to unlock" prompts**
4. **Convert guest to user flow**

**Guest Limitations**:
- Can browse public content
- Cannot create communities/events/courses
- Cannot join communities
- Cannot register for events
- Cannot save/favorite content
- Banner: "Sign up free to unlock all features"

**Guest Flow**:
```
WelcomeScreen
  → [Continue as Guest] button
  → GuestDashboard (limited view)
  → Try to create content
  → "Sign up to continue" modal
  → Register flow
```

---

#### F. **Social Login Integration**
**Providers to Support**:
- Google (Primary)
- Facebook
- LinkedIn (for professionals)
- Apple (iOS requirement)
- Microsoft (enterprise)

**SocialAuthButton.tsx** Component:
```tsx
interface SocialAuthButtonProps {
  provider: 'google' | 'facebook' | 'linkedin' | 'apple' | 'microsoft';
  mode: 'signin' | 'signup';
  onAuth: (provider, data) => void;
}
```

**Callback Handling**:
- OAuth redirect URL: `/auth/callback/:provider`
- Handle success → Create session
- Handle error → Show error message
- Handle account conflict → Trigger merge flow

---

#### G. **AuthLayout Component**
**Purpose**: Wrapper for all auth screens

**Design Pattern**:
```
┌───────────────────────────────────────────────┐
│  Left Panel (50%)    │  Right Panel (50%)     │
│  ─────────────────   │  ──────────────────    │
│                      │                        │
│  [Auth Form]         │  [Marketing Content]   │
│  - SignIn            │  - Hero image          │
│  - Register          │  - Feature highlights  │
│  - ForgotPassword    │  - Testimonials        │
│                      │  - Stats               │
│                      │                        │
└───────────────────────────────────────────────┘
```

**Features**:
- Split-screen layout
- Animated transitions between forms
- Responsive (mobile stacks vertically)
- Purple gradient branding
- Loading states
- Error boundaries

---

## 1.4 DESIGN RECOMMENDATIONS

### Visual Style (TrueLeap/Firebase Aesthetic)
**Color Palette**:
- Primary: #420D74 (Purple)
- Secondary: #6C1FA8
- Success: #10B981
- Error: #EF4444
- Background: #FFFFFF
- Input border: #E5E7EB
- Focus ring: #9333EA

**Typography**:
- Headings: Inter Bold, 24px
- Body: Inter Regular, 14px
- Labels: Inter Medium, 12px
- Errors: Inter Medium, 12px, #EF4444

**Components**:
- Rounded corners: 8px
- Input height: 40px
- Button height: 40px
- Spacing: 16px between elements
- Shadow: subtle on cards

**Animations**:
- Form transitions: 300ms ease
- Error shake: 200ms
- Success checkmark: 500ms
- Loading spinner: 1s loop

---

# PART 2: MAJOR COMPONENTS ANALYSIS

## 2.1 WHAT'S THERE ✅

### A. **AppLayout Component** (`/components/AppLayout.tsx`)
**Status**: 🟢 Well-built, production-ready

**Structure**:
```
AppLayout
├── Top Banner (dismissible)
├── Header (73px fixed)
│   ├── Logo (left)
│   ├── Sidebar toggle
│   └── Actions (right)
│       ├── Search (Cmd+K)
│       ├── Status dropdown
│       ├── Support menu
│       ├── Apps drawer
│       ├── Notifications
│       └── Leapy AI button
├── Sidebar (280px, collapsible)
│   ├── Navigation items
│   └── Draft items
└── Main Content Area
    ├── Left: Page content
    └── Right: Copilot/Notifications panel (resizable)
```

**✅ Strengths**:
1. **Clean separation of concerns**
2. **Responsive design** (sidebar collapses)
3. **Keyboard shortcuts** (Cmd+K for search)
4. **Consistent spacing** (Google Workspace feel)
5. **Right panel architecture** (Copilot + Notifications)
6. **Status indicators** (Automatic/Away/DND)

**🟡 Weaknesses**:
1. **No user profile menu** in header
   - Missing: Settings, Profile, Sign out
   - Current: Just status dropdown
   - **Recommendation**: Add avatar dropdown next to notifications

2. **Hard-coded "Sign-in" text**
   - Line ~128: Shows "Sign-in" but no click handler
   - Should show user avatar when logged in
   - Should show "Sign In" button when logged out

3. **No breadcrumbs**
   - Users can get lost in nested views
   - **Add**: Breadcrumb below header

4. **Search implementation incomplete**
   - Opens SearchModal but modal has basic structure
   - Needs: Recent searches, suggestions, filters

---

### B. **Header Component** (Part of AppLayout)
**Status**: 🟡 Good foundation, needs user menu

**Current Elements** (Left to Right):
```
[☰ Menu] [TrueLeap Logo] ... [Search] [Status] [?] [⚡Apps] [🔔] [Leapy]
```

**❌ Missing Critical Element**:
```
Should be:
[☰ Menu] [TrueLeap Logo] ... [Search] [Status] [?] [⚡Apps] [🔔] [👤 User Menu]
                                                                    ↓
                                                         ┌──────────────────┐
                                                         │ User Name        │
                                                         │ user@email.com   │
                                                         ├──────────────────┤
                                                         │ 👤 Profile       │
                                                         │ ⚙️  Settings      │
                                                         │ 💳 Billing        │
                                                         │ ❓ Help           │
                                                         ├──────────────────┤
                                                         │ 🚪 Sign Out       │
                                                         └──────────────────┘
```

**Recommendation - Add UserMenu Component**:
```tsx
// /components/UserMenu.tsx
interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: 'creator' | 'learner' | 'admin';
  };
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onSignOut: () => void;
}
```

---

### C. **Sidebar Component** (Part of AppLayout)
**Status**: 🟢 Well-implemented

**Current Structure**:
```
┌──────────────────┐
│ [+ New] Button   │ ← Triggers WelcomeScreen
├──────────────────┤
│ 🏠 Home          │
│ 📄 Drafts        │
│ 👥 Communities   │
│ 📅 Events        │
│ 📚 Courses       │
├──────────────────┤
│ Draft Items...   │
└──────────────────┘
```

**✅ Strengths**:
- Clear visual hierarchy
- Active state indicators
- Collapsible
- Smooth animations

**🟡 Areas for Enhancement**:
1. **No Settings in sidebar**
   - Currently only in header via menu
   - **Add**: Settings at bottom of sidebar

2. **No user section at bottom**
   - Standard pattern: User info at sidebar bottom
   - **Add**:
   ```
   ├──────────────────┤
   │ ⚙️  Settings      │
   │ 💡 Help & Support │
   ├──────────────────┤
   │ [User Avatar]    │
   │ User Name        │
   │ ▼ Menu           │
   └──────────────────┘
   ```

3. **No quick actions**
   - Could add: Create Community, Create Event, Create Course

---

### D. **Right Panel System** (Copilot + Notifications)
**Status**: 🟢 Excellent implementation

**Features**:
- ✅ Resizable width
- ✅ Toggle between Copilot/Notifications
- ✅ Context-aware content
- ✅ Smooth slide animations
- ✅ Close button

**Components**:
1. **CopilotPanel** (`/components/CopilotPanel.tsx`)
2. **NotificationsPanel** (`/components/NotificationsPanel.tsx`)

**No major issues** - This is production-ready

---

## 2.2 WHAT'S WEAK

### A. **User Profile Display**
**Current**: Non-existent in header  
**Expected**: Avatar + Name + Dropdown

**Fix Needed**:
```tsx
// Replace the "Sign-in" text area in AppLayout
<UserMenu
  user={{
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "/avatars/sarah.jpg",
    role: "creator"
  }}
  onProfileClick={() => onNavClick?.('settings')}
  onSettingsClick={() => setSettingsTab('general')}
  onSignOut={handleSignOut}
/>
```

---

### B. **Mobile Responsiveness**
**Issue**: Header gets cramped on mobile

**Current Mobile Behavior**:
- Search bar takes too much space
- Status/Apps/Notifications all visible
- Can cause overflow

**Recommendation**:
```tsx
// Hide on mobile (< 768px):
- Status dropdown
- Apps drawer
- Support menu

// Show on mobile:
- Hamburger menu (opens sidebar)
- Search icon (opens modal)
- Notifications icon
- User avatar
```

---

## 2.3 WHAT'S MISSING

### A. **Breadcrumb Navigation**
**Location**: Below header, above main content

**Design**:
```
Home > Communities > Design Masters > Members
```

**Component Needed**:
```tsx
// /components/Breadcrumb.tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}
```

---

### B. **Global Loading State**
**Issue**: No app-wide loading indicator

**Needed**:
- Top progress bar (like YouTube/GitHub)
- When navigating between pages
- When loading data

**Component**:
```tsx
// /components/GlobalProgressBar.tsx
// Linear progress bar at top of AppLayout
// Shows during route transitions
```

---

### C. **Error Boundaries**
**Issue**: No error handling UI

**Needed**:
```tsx
// /components/ErrorBoundary.tsx
<ErrorBoundary
  fallback={<ErrorPage />}
  onError={logError}
>
  <App />
</ErrorBoundary>
```

---

# PART 3: NAVIGATION ELEMENTS

## 3.1 WHAT'S THERE ✅

### A. **Main Navigation** (in Sidebar)
**Items**:
- 🏠 Home
- 📄 Drafts
- 👥 Communities
- 📅 Events
- 📚 Courses

**Icons**: lucide-react (consistent)  
**Active States**: Purple background  
**Click Handling**: `onNavClick(page)` prop

**✅ Good**:
- Clear labels
- Consistent iconography
- Visual feedback on hover/active
- Logical order

---

### B. **Quick Actions**
1. **[+ New]** button in sidebar → Opens WelcomeScreen
2. **Search** (Cmd+K) → Opens SearchModal
3. **Leapy AI** button → Opens Copilot

**✅ Good**: All primary actions are accessible

---

### C. **Sub-Navigation** (in Builder Views)
**Example**: CommunityBuilderView has left sidebar:
- Overview
- Members
- Events
- Courses
- Content
- Analytics
- Settings

**Pattern**: Consistent across all builders  
**Status**: 🟢 Well-implemented

---

## 3.2 WHAT'S WEAK

### A. **No "Back" Button Pattern**
**Issue**: Some views have back buttons, others don't

**Current**:
- ✅ Course/Community builders have back
- ❌ Settings page has no back
- ❌ List views have no back

**Recommendation**:
- Add consistent back button (top-left of main content)
- Or use breadcrumbs

---

### B. **Drafts Implementation**
**Current**: Hardcoded sample drafts in AppLayout

**Issues**:
- No actual draft management
- No "Save as Draft" functionality
- No draft auto-save
- No draft recovery

**Recommendation**: Build full draft system
- Auto-save every 30s
- Draft history
- Restore draft modal
- "Unsaved changes" warning

---

## 3.3 WHAT'S MISSING

### A. **Global Shortcuts Menu**
**Trigger**: Press `?` key

**Design**:
```
┌─────────────────────────────────┐
│   Keyboard Shortcuts            │
├─────────────────────────────────┤
│   Cmd + K       Search          │
│   Cmd + N       New Item        │
│   G then H      Go to Home      │
│   G then C      Go to Communiti │
│   G then E      Go to Events    │
│   G then K      Go to Courses   │
│   ?             This Menu       │
└─────────────────────────────────┘
```

**Component**: `/components/ShortcutsModal.tsx`

---

### B. **Command Palette** (Advanced Search)
**Current**: Basic SearchModal exists  
**Needed**: Full command palette like VS Code

**Features**:
- Search across all content
- Quick actions (e.g., "Create new community")
- Recent items
- Keyboard navigation
- Fuzzy search

---

### C. **Navigation History**
**Missing**: Browser-like back/forward

**Add**:
- History stack in App.tsx
- Back/forward buttons in header
- Keyboard: Cmd+[ / Cmd+]

---

### D. **Favorites/Bookmarks**
**Missing**: Pin frequently accessed items

**Design**:
```
Sidebar
├── Navigation
│   ├── Home
│   ├── ...
├── Favorites ⭐
│   ├── My Dev Community
│   ├── Q1 Planning Event
│   └── React Masterclass
└── Recent
```

---

# PART 4: SETTINGS FLOW

## 4.1 WHAT'S THERE ✅

### A. **GlobalSettingsPage Component**
**File**: `/components/GlobalSettingsPage.tsx`

**Tabs**:
1. **General** ✅
   - Language selection
   - Time zone
   - Date/time format
   - Theme (light/dark/auto)

2. **Integrations** ✅
   - Links to IntegrationsLibraryEnhanced
   - Well-implemented

3. **Notifications** ✅
   - Email notifications toggle
   - Push notifications toggle
   - Slack integration
   - Digest preferences (Daily/Weekly/Monthly)

4. **Profile** ✅
   - Full name input
   - Email input (read-only, with "Change email" button)
   - Bio textarea
   - Social links (Twitter, LinkedIn, Website)
   - Avatar upload placeholder

5. **Security** ✅
   - Change password form
   - 2FA toggle
   - Active sessions list

6. **Billing** ✅
   - Current plan display (Pro)
   - Payment methods
   - Billing history
   - Invoice downloads

**Structure**:
```
┌─────────────────────────────���────────────┐
│  [Sidebar]        [Content Area]         │
│  ┌──────────┐     ┌────────────────┐     │
│  │ General  │     │ Settings Form  │     │
│  │ Integra  │     │                │     │
│  │ Notifica │     │ [Inputs...]    │     │
│  │ Profile  │     │                │     │
│  │ Security │     │ [Save Changes] │     │
│  │ Billing  │     │                │     │
│  └──────────┘     └────────────────┘     │
└──────────────────────────────────────────┘
```

**✅ Strengths**:
- Clean tab organization
- Consistent input styling
- Good use of sections
- Save buttons present

---

## 4.2 WHAT'S WEAK

### A. **Profile Settings - Limited Fields**
**Current**:
- ✅ Name
- ✅ Email
- ✅ Bio
- ✅ Social links

**Missing**:
- ❌ Avatar upload functionality (has placeholder)
- ❌ Cover photo
- ❌ Job title
- ❌ Company
- ❌ Location
- ❌ Phone number
- ❌ Birthday
- ❌ Gender
- ❌ Preferred pronouns
- ❌ Public profile URL (e.g., leapspace.com/sarah)

**Recommendation**:
```tsx
// Add to ProfileSettings
<div className="space-y-4">
  <AvatarUpload current={user.avatar} onUpload={handleAvatarUpload} />
  <Input label="Job Title" value={profile.jobTitle} />
  <Input label="Company" value={profile.company} />
  <LocationPicker value={profile.location} />
  <Input label="Phone" type="tel" value={profile.phone} />
  <DatePicker label="Birthday" value={profile.birthday} />
  <Select label="Gender" options={genderOptions} />
  <Input label="Pronouns" placeholder="she/her, he/him, they/them" />
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-sm text-gray-900">Public Profile</p>
    <p className="text-xs text-gray-600">leapspace.com/sarah-chen</p>
    <button className="text-sm text-purple-600">Customize</button>
  </div>
</div>
```

---

### B. **Security Settings - No Account Deletion**
**Current**:
- ✅ Change password
- ✅ 2FA
- ✅ Active sessions

**Missing**:
- ❌ Delete account option
- ❌ Export data (GDPR requirement)
- ❌ Privacy controls (who can see what)
- ❌ Blocked users list

**Recommendation**: Add "Danger Zone" section
```tsx
<div className="mt-8 pt-6 border-t border-red-200">
  <h3 className="text-sm font-medium text-red-600 mb-4">Danger Zone</h3>
  
  <div className="space-y-3">
    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
      <div>
        <p className="text-sm text-gray-900">Export Your Data</p>
        <p className="text-xs text-gray-600">Download a copy of your data</p>
      </div>
      <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50">
        Request Export
      </button>
    </div>
    
    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
      <div>
        <p className="text-sm text-gray-900">Delete Account</p>
        <p className="text-xs text-gray-600">Permanently delete your account</p>
      </div>
      <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
        Delete Account
      </button>
    </div>
  </div>
</div>
```

---

### C. **Billing Settings - No Plan Comparison**
**Current**:
- Shows current plan (Pro)
- Shows payment methods
- Shows billing history

**Missing**:
- ❌ Plan comparison table
- ❌ Upgrade/downgrade flows
- ❌ Usage metrics
- ❌ Billing alerts
- ❌ Team billing (if multiple users)

**Recommendation**: Add plan switcher
```tsx
<div className="grid grid-cols-3 gap-4 mb-6">
  <PlanCard
    name="Free"
    price="$0"
    features={['1 Community', '5 Events/month', '100 Members']}
    current={false}
  />
  <PlanCard
    name="Pro"
    price="$29/month"
    features={['Unlimited Communities', 'Unlimited Events', '10,000 Members']}
    current={true}
    badge="Current Plan"
  />
  <PlanCard
    name="Enterprise"
    price="Custom"
    features={['Everything in Pro', 'SSO', 'Dedicated Support']}
    current={false}
  />
</div>
```

---

### D. **No Email Preferences Tab**
**Issue**: Email notification settings are in Notifications tab

**Better UX**: Separate "Email & Communication" tab
- Email frequency
- Newsletter subscriptions
- Product updates
- Marketing emails
- Unsubscribe options

---

## 4.3 WHAT'S MISSING

### A. **Connected Accounts Tab** ⚠️ CRITICAL
**Purpose**: Manage linked social accounts

**What it should show**:
```
Connected Accounts
├── Google
│   ├── sarah.chen@gmail.com
│   ├── Connected Jan 15, 2026
│   └── [Disconnect]
├── Facebook  
│   ├── Sarah Chen
│   ├── Connected Jan 18, 2026
│   └── [Disconnect]
├── LinkedIn
│   └── [Connect LinkedIn]
└── Apple
    └── [Connect Apple]
```

**Features**:
1. **View all connected accounts**
2. **Add new connections**
3. **Set primary account**
4. **Disconnect accounts** (with warning)
5. **Merge duplicate accounts** (see Part 5)

**Component Structure**:
```tsx
// /components/settings/ConnectedAccountsTab.tsx
interface ConnectedAccount {
  provider: 'google' | 'facebook' | 'linkedin' | 'apple';
  email?: string;
  name?: string;
  connectedAt: Date;
  isPrimary: boolean;
}

function ConnectedAccountsTab() {
  return (
    <div className="space-y-4">
      {accounts.map(account => (
        <ConnectedAccountCard
          key={account.provider}
          account={account}
          onDisconnect={handleDisconnect}
          onSetPrimary={handleSetPrimary}
        />
      ))}
      <AddAccountButton />
    </div>
  );
}
```

---

### B. **Privacy & Data Tab**
**Needed Settings**:
- Who can see my profile
- Who can find me by email
- Who can send me messages
- Show activity status
- Search engine indexing
- Data retention preferences

---

### C. **Accessibility Tab**
**Needed Settings**:
- High contrast mode
- Reduce motion
- Font size
- Keyboard navigation preferences
- Screen reader optimizations

---

### D. **Advanced Tab**
**Needed Settings**:
- Developer mode
- API keys
- Webhooks
- Beta features opt-in
- Debug mode

---

# PART 5: ACCOUNT MERGING SYSTEM

## 5.1 WHAT'S THERE
### ❌ **NOTHING** - Complete Gap

**Current State**:
- No duplicate detection
- No account merging UI
- No linked accounts view
- No conflict resolution

---

## 5.2 THE SCENARIO

### User Journey:
1. **Day 1**: User signs up with Facebook → Creates account (facebook-user-123)
2. **Day 7**: User comes back, forgets they used Facebook
3. **Day 7**: User signs in with WhatsApp → Creates NEW account (whatsapp-user-456)

**Problem**: Now there are TWO accounts for same user

**Detection Point**: Both accounts use same email `sarah@gmail.com` or phone `+1234567890`

**Expected Behavior**:
```
System detects duplicate → Offers to merge → User confirms → Accounts merged
```

---

## 5.3 WHAT'S MISSING (Everything)

### A. **Duplicate Detection Service**
**File**: `/services/accountMerging.ts`

```typescript
interface DuplicateAccount {
  accountId: string;
  provider: 'facebook' | 'whatsapp' | 'google' | 'email';
  email?: string;
  phone?: string;
  name: string;
  createdAt: Date;
  data: {
    communities: number;
    events: number;
    courses: number;
  };
}

async function detectDuplicates(
  identifier: { email?: string; phone?: string }
): Promise<DuplicateAccount[]> {
  // Check database for accounts with matching email or phone
  // Return list of potential duplicates
}
```

**When to Check**:
1. During social sign-in
2. After email verification
3. When user adds new email/phone to profile

---

### B. **Account Merge Modal**
**File**: `/components/AccountMergeModal.tsx`

**Trigger**: When duplicate detected during login

**Design**:
```
┌─────────────────────────────────────────────┐
│   🔗 We found an existing account           │
│                                             │
│   It looks like you already have an         │
│   account with this email:                  │
│                                             │
│   ┌───────────────────────────────────┐     │
│   │ 📧 sarah@gmail.com                │     │
│   │                                   │     │
│   │ Existing Account (Facebook)      │     │
│   │ Created: Jan 15, 2026            │     │
│   │ • 3 Communities                  │     │
│   │ • 5 Events                       │     │
│   │ • 2 Courses                      │     │
│   └───────────────────────────────────┘     │
│                                             │
│   Would you like to link your WhatsApp     │
│   account to this existing account?        │
│                                             │
│   [Cancel]  [Link Accounts →]              │
└─────────────────────────────────────────────┘
```

**Actions**:
1. **Link Accounts** → Merge WhatsApp into Facebook account
2. **Cancel** → Create separate account (not recommended)
3. **Show More Info** → Explain what data will be merged

---

### C. **Merge Confirmation Flow**
**Step 1**: Show what will be merged
```
┌─────────────────────────────────────────────┐
│   Confirm Account Merge                     │
│                                             │
│   Primary Account (Keep)                    │
│   ├── Provider: Facebook                    │
│   ├── Email: sarah@gmail.com                │
│   ├── Data: 3 Communities, 5 Events         │
│   └── Created: Jan 15, 2026                 │
│                                             │
│   Secondary Account (Merge from)            │
│   ├── Provider: WhatsApp                    │
│   ├── Phone: +1 234-567-8900                │
│   ├── Data: 0 Communities, 0 Events         │
│   └── Created: Jan 22, 2026                 │
│                                             │
│   After merging:                            │
│   ✓ You can sign in with Facebook OR        │
│     WhatsApp                                │
│   ✓ All data will be in one account         │
│   ✓ Secondary account will be deleted       │
│                                             │
│   [Cancel]  [Confirm Merge →]               │
└─────────────────────────────────────────────┘
```

**Step 2**: Show progress
```
┌─────────────────────────────────────────────┐
│   Merging Accounts...                       │
│                                             │
│   ✓ Linking WhatsApp to primary account     │
│   ✓ Transferring data...                    │
│   ⏳ Cleaning up secondary account...        │
│                                             │
│   [Progress Bar: 75%]                       │
└─────────────────────────────────────────────┘
```

**Step 3**: Success
```
┌─────────────────────────────────────────────┐
│   ✓ Accounts Successfully Merged!           │
│                                             │
│   You can now sign in with:                 │
│   • Facebook                                │
│   • WhatsApp                                │
│                                             │
│   [Continue to LeapSpace →]                 │
└─────────────────────────────────────────────┘
```

---

### D. **Settings → Linked Accounts View**
**File**: `/components/settings/LinkedAccountsTab.tsx`

**Purpose**: Manage merged accounts

**Design**:
```
┌─────────────────────────────────────────────┐
│   Linked Accounts                           │
│                                             │
│   Primary Sign-In Method                    │
│   ┌───────────────────────────────────┐     │
│   │ [f] Facebook                      │     │
│   │ sarah.chen.facebook               │     │
│   │ Linked: Jan 15, 2026              │     │
│   │ [Set as Primary] [Disconnect]     │     │
│   └───────────────────────────────────┘     │
│                                             │
│   Other Sign-In Methods                     │
│   ┌───────────────────────────────────┐     │
│   │ [W] WhatsApp                      │     │
│   │ +1 234-567-8900                   │     │
│   │ Linked: Jan 22, 2026              │     │
│   │ [Disconnect]                      │     │
│   └───────────────────────────────────┘     │
│                                             │
│   ┌───────────────────────────────────┐     │
│   │ [G] Google                        │     │
│   │ sarah@gmail.com                   │     │
│   │ Linked: Jan 18, 2026              │     │
│   │ [Disconnect]                      │     │
│   └───────────────────────────────────┘     │
│                                             │
│   [+ Add Another Account]                   │
└─────────────────────────────────────────────┘
```

**Features**:
- View all linked accounts
- Set primary login method
- Disconnect accounts (with warning if only one left)
- Add new accounts

---

### E. **Merge Algorithm**
**File**: `/services/accountMerging.ts`

```typescript
interface MergeStrategy {
  primaryAccountId: string;
  secondaryAccountId: string;
  conflictResolution: {
    name: 'keep-primary' | 'keep-secondary' | 'manual';
    email: 'keep-primary' | 'keep-secondary' | 'keep-both';
    profile: 'merge' | 'keep-primary';
    communities: 'merge';
    events: 'merge';
    courses: 'merge';
  };
}

async function mergeAccounts(strategy: MergeStrategy) {
  // 1. Copy all data from secondary to primary
  await copyUserData(strategy.secondaryAccountId, strategy.primaryAccountId);
  
  // 2. Update all references
  await updateCommunityOwners(strategy);
  await updateEventOwners(strategy);
  await updateCourseOwners(strategy);
  
  // 3. Link auth providers
  await linkAuthProvider(strategy.primaryAccountId, secondaryProvider);
  
  // 4. Delete secondary account
  await deleteAccount(strategy.secondaryAccountId);
  
  // 5. Send confirmation email
  await sendMergeConfirmationEmail(strategy.primaryAccountId);
}
```

---

### F. **Conflict Resolution**
**Problem**: What if both accounts have different data?

**Example Conflicts**:
1. **Name**: Primary = "Sarah Chen", Secondary = "Sarah C."
2. **Email**: Primary = "sarah@gmail.com", Secondary = "sarah@work.com"
3. **Bio**: Both have different bios
4. **Profile Photo**: Different photos

**Solution**: Manual conflict resolution screen
```
┌─────────────────────────────────────────────┐
│   Resolve Conflicts                         │
│                                             │
│   Some information differs between          │
│   accounts. Choose which to keep:           │
│                                             │
│   Name                                      │
│   ○ Sarah Chen (Facebook)                   │
│   ● Sarah C. (WhatsApp)                     │
│                                             │
│   Email                                     │
│   ● sarah@gmail.com (Keep both)             │
│                                             │
│   Profile Photo                             │
│   [Photo A]  ●                              │
│   [Photo B]  ○                              │
│                                             │
│   Bio                                       │
│   ○ Use Facebook bio                        │
│   ○ Use WhatsApp bio                        │
│   ● Merge both bios                         │
│                                             │
│   [Back]  [Continue →]                      │
└─────────────────────────────────────────────┘
```

---

## 5.4 DETECTION TRIGGERS

### When to Show Merge Prompt:

**Scenario 1**: User signs in with new provider
```
User clicks "Sign in with WhatsApp"
  → WhatsApp auth succeeds
  → System checks: Does email/phone exist?
  → Found existing account with same email
  → Show AccountMergeModal
  → User confirms merge
  → Accounts merged
  → Redirect to home
```

**Scenario 2**: User adds email to profile
```
User in Settings → Profile
  → Changes email to sarah@gmail.com
  → System checks: Is this email used elsewhere?
  → Found existing account
  → Show "This email is already in use" warning
  → Offer to merge accounts
```

**Scenario 3**: User registers with used email
```
User on Register screen
  → Enters email sarah@gmail.com
  → Clicks "Create Account"
  → System checks: Does email exist?
  → Email exists (linked to Facebook account)
  → Show: "An account with this email exists. Sign in instead?"
  → User clicks "Sign In"
  → Redirect to SignIn screen
```

---

## 5.5 SAFETY MEASURES

### A. **Prevent Accidental Merges**
1. **Require email/SMS confirmation**
   - Send code to both accounts
   - User must confirm both

2. **Show data preview**
   - Let user see what will be merged
   - Highlight conflicts

3. **Allow undo (24 hours)**
   - Keep secondary account data for 24h
   - "Undo merge" button in settings

---

### B. **Prevent Account Takeover**
**Attack Vector**: Hacker creates WhatsApp account with stolen phone number, tries to merge with victim's account

**Protection**:
1. **Email verification on both accounts**
2. **SMS code to phone number**
3. **Security question**
4. **Recent password confirmation**
5. **Login history check** (flag if suspicious)

---

# PART 6: COMPLETE BUILD PLAN

## 6.1 PRIORITY MATRIX

| Feature | Impact | Effort | Priority | Timeline |
|---------|--------|--------|----------|----------|
| **SignIn Flow** | 🔴 Critical | Medium | P0 | Week 1 |
| **Register Flow** | 🔴 Critical | Medium | P0 | Week 1 |
| **ForgotPassword** | 🔴 Critical | Small | P0 | Week 1 |
| **Email Verification** | 🔴 Critical | Medium | P0 | Week 1-2 |
| **Social Login (Google)** | 🟠 High | Large | P1 | Week 2 |
| **Social Login (Facebook, etc)** | 🟠 High | Medium | P1 | Week 2 |
| **User Menu in Header** | 🔴 Critical | Small | P0 | Week 1 |
| **Connected Accounts Tab** | 🟠 High | Medium | P1 | Week 3 |
| **Account Merge Detection** | 🟠 High | Large | P1 | Week 3 |
| **Account Merge Modal** | 🟠 High | Medium | P1 | Week 3 |
| **Settings Enhancements** | 🟡 Medium | Medium | P2 | Week 4 |
| **Guest Mode** | 🟡 Medium | Small | P2 | Week 2 |
| **Breadcrumbs** | 🟡 Medium | Small | P2 | Week 2 |
| **Shortcuts Menu** | 🟢 Low | Small | P3 | Week 4 |
| **Command Palette** | 🟢 Low | Large | P3 | Later |

---

## 6.2 WEEK-BY-WEEK PLAN

### 🗓️ WEEK 1: Core Auth (P0 - CRITICAL)
**Goal**: Users can sign in, register, and reset passwords

**Day 1-2**: Auth Foundation
- [ ] Create `/components/auth/` folder structure
- [ ] Build AuthLayout.tsx (split-screen design)
- [ ] Build SignIn.tsx
  - Email/password inputs
  - Validation
  - Error states
  - Loading states
  - "Remember me" checkbox
  - Links to Register/ForgotPassword
- [ ] Build Register.tsx
  - All input fields
  - Password strength indicator
  - Terms checkbox
  - Validation
  - Success → Email verification pending
- [ ] Build ForgotPassword.tsx
  - Email input
  - Send reset link flow
  - Success message

**Day 3**: Password Reset & User Menu
- [ ] Build ResetPassword.tsx
  - Token validation
  - New password form
  - Success → Redirect to SignIn
- [ ] Build UserMenu.tsx component
  - Avatar display
  - Dropdown menu
  - Profile/Settings/Sign Out links
- [ ] Integrate UserMenu into AppLayout header

**Day 4-5**: Email Verification
- [ ] Build EmailVerificationPending.tsx
- [ ] Build EmailVerified.tsx
- [ ] Build ResendVerification functionality
- [ ] Build ChangeEmail flow (in pending state)
- [ ] Update App.tsx routing for all auth stages

**Deliverables**:
✅ Complete auth flow (email/password only)  
✅ User can sign in, register, reset password, verify email  
✅ User menu in header  

---

### 🗓️ WEEK 2: Social Auth + Guest Mode (P1)
**Goal**: Users can sign in with Google/Facebook, browse as guest

**Day 1-2**: Social Login
- [ ] Set up OAuth integrations (Google, Facebook, LinkedIn)
- [ ] Build SocialAuthButton.tsx component
- [ ] Build OAuth callback handler
- [ ] Add social buttons to SignIn.tsx and Register.tsx
- [ ] Test complete social login flow
- [ ] Handle edge cases (email not provided by provider, etc.)

**Day 3**: Guest Mode
- [ ] Add "Continue as Guest" to WelcomeScreen
- [ ] Build GuestBanner.tsx (persistent top banner)
- [ ] Add "Sign up to unlock" modals
- [ ] Implement feature restrictions for guests
- [ ] Build ConvertGuestModal.tsx (guest → registered user)

**Day 4**: Navigation Enhancements
- [ ] Build Breadcrumb.tsx component
- [ ] Integrate breadcrumbs in main views
- [ ] Add breadcrumb logic to App.tsx
- [ ] Test breadcrumb navigation

**Day 5**: Polish & Testing
- [ ] Fix responsive issues on mobile
- [ ] Test all auth flows end-to-end
- [ ] Fix bugs
- [ ] Update design tokens consistency

**Deliverables**:
✅ Social login working  
✅ Guest mode functional  
✅ Breadcrumbs added  

---

### 🗓️ WEEK 3: Account Merging (P1)
**Goal**: Duplicate accounts can be detected and merged

**Day 1**: Detection Service
- [ ] Build `/services/accountMerging.ts`
- [ ] Implement detectDuplicates() function
- [ ] Add duplicate check on social login
- [ ] Add duplicate check on email change
- [ ] Write tests for detection logic

**Day 2**: Merge Modal
- [ ] Build AccountMergeModal.tsx
- [ ] Build account comparison view
- [ ] Build merge confirmation step
- [ ] Build merge progress indicator
- [ ] Build merge success screen

**Day 3**: Conflict Resolution
- [ ] Build ConflictResolutionModal.tsx
- [ ] Handle name conflicts
- [ ] Handle email conflicts
- [ ] Handle profile photo conflicts
- [ ] Handle bio conflicts

**Day 4**: Settings Integration
- [ ] Build LinkedAccountsTab.tsx
- [ ] Add to GlobalSettingsPage
- [ ] Show all linked accounts
- [ ] Add "Set as Primary" functionality
- [ ] Add "Disconnect" functionality
- [ ] Add "Link New Account" flow

**Day 5**: Testing & Safety
- [ ] Implement merge confirmation emails
- [ ] Add 24-hour undo functionality
- [ ] Test merge scenarios
- [ ] Test conflict resolution
- [ ] Add logging/audit trail

**Deliverables**:
✅ Account merging system functional  
✅ Linked accounts visible in settings  
✅ Duplicate detection working  

---

### 🗓️ WEEK 4: Settings & Polish (P2)
**Goal**: Settings are complete and polished

**Day 1**: Settings Enhancements
- [ ] Add Privacy & Data tab
- [ ] Add Accessibility tab
- [ ] Add Advanced tab
- [ ] Enhance Profile tab (add missing fields)
- [ ] Add avatar upload functionality

**Day 2**: Security Enhancements
- [ ] Add "Danger Zone" to Security tab
- [ ] Build DeleteAccountModal.tsx
- [ ] Build ExportDataModal.tsx
- [ ] Add blocked users list
- [ ] Enhance 2FA setup flow

**Day 3**: Billing Enhancements
- [ ] Build plan comparison cards
- [ ] Add upgrade/downgrade flows
- [ ] Add usage metrics display
- [ ] Build CancelSubscriptionModal.tsx

**Day 4**: Keyboard Shortcuts
- [ ] Build ShortcutsModal.tsx
- [ ] Implement global shortcuts (G+H, G+C, etc.)
- [ ] Add "Press ? for shortcuts" hint
- [ ] Document all shortcuts

**Day 5**: Final Polish
- [ ] Fix all remaining bugs
- [ ] Test on mobile/tablet
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Final design review

**Deliverables**:
✅ Complete settings system  
✅ All tabs functional  
✅ Keyboard shortcuts working  

---

## 6.3 FILE STRUCTURE (What to Build)

```
/components/
├── auth/
│   ├── AuthLayout.tsx ⭐ NEW
│   ├── SignIn.tsx ⭐ NEW
│   ├── Register.tsx ⭐ NEW
│   ├── ForgotPassword.tsx ⭐ NEW
│   ├── ResetPassword.tsx ⭐ NEW
│   ├── EmailVerificationPending.tsx ⭐ NEW
│   ├── EmailVerified.tsx ⭐ NEW
│   ├── SocialAuthButton.tsx ⭐ NEW
│   ├── GuestBanner.tsx ⭐ NEW
│   └── ConvertGuestModal.tsx ⭐ NEW
├── settings/
│   ├── LinkedAccountsTab.tsx ⭐ NEW
│   ├── PrivacyDataTab.tsx ⭐ NEW
│   ├── AccessibilityTab.tsx ⭐ NEW
│   ├── AdvancedTab.tsx ⭐ NEW
│   ├── DeleteAccountModal.tsx ⭐ NEW
│   └── ExportDataModal.tsx ⭐ NEW
├── account-merging/
│   ├── AccountMergeModal.tsx ⭐ NEW
│   ├── MergeConfirmation.tsx ⭐ NEW
│   ├── MergeProgress.tsx ⭐ NEW
│   ├── MergeSuccess.tsx ⭐ NEW
│   └── ConflictResolution.tsx ⭐ NEW
├── navigation/
│   ├── Breadcrumb.tsx ⭐ NEW
│   ├── UserMenu.tsx ⭐ NEW
│   ├── ShortcutsModal.tsx ⭐ NEW
│   └── GlobalProgressBar.tsx ⭐ NEW
└── [existing components...]

/services/
├── accountMerging.ts ⭐ NEW
├── auth.ts ⭐ NEW
└── oauth.ts ⭐ NEW

/hooks/
├── useAuth.ts ⭐ NEW
└── useAccountMerging.ts ⭐ NEW

/contexts/
├── AuthContext.tsx ⭐ NEW
└── [existing contexts...]
```

---

## 6.4 DESIGN SPECS (Pixel-Perfect Prototypes)

### Color Palette (TrueLeap Purple)
```css
/* Primary */
--primary: #420D74;
--primary-hover: #6C1FA8;
--primary-light: #9333EA;

/* Status */
--success: #10B981;
--error: #EF4444;
--warning: #F59E0B;
--info: #3B82F6;

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-600: #4B5563;
--gray-900: #111827;

/* Auth screens */
--auth-bg: #FFFFFF;
--auth-input-border: #E5E7EB;
--auth-input-focus: #9333EA;
```

### Typography
```css
/* Headings */
.auth-title {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.auth-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #6B7280;
}

/* Inputs */
.auth-label {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
}

.auth-input {
  font-size: 14px;
  font-weight: 400;
  color: #111827;
  height: 40px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 0 12px;
}

/* Buttons */
.auth-button-primary {
  height: 40px;
  background: #420D74;
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  transition: background 200ms;
}

.auth-button-primary:hover {
  background: #6C1FA8;
}
```

### Component Dimensions
```css
/* Auth screens */
.auth-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}

.auth-form-container {
  max-width: 400px;
  margin: auto;
  padding: 48px 24px;
}

.auth-input-group {
  margin-bottom: 16px;
}

.auth-social-buttons {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

/* User menu dropdown */
.user-menu-dropdown {
  width: 240px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
}

.user-menu-item {
  padding: 12px 16px;
  font-size: 14px;
  transition: background 150ms;
}

.user-menu-item:hover {
  background: #F9FAFB;
}
```

### Spacing System
```
4px  - Extra small (xs)
8px  - Small (sm)
12px - Medium (md)
16px - Large (lg)
24px - Extra large (xl)
32px - 2xl
48px - 3xl
```

---

## 6.5 MUST-HAVES vs GOOD-TO-HAVES vs NOT-NEEDED

### ✅ MUST-HAVES (P0 - Can't launch without)
1. ✅ SignIn (email/password)
2. ✅ Register (email/password)
3. ✅ ForgotPassword
4. ✅ ResetPassword
5. ✅ Email verification
6. ✅ User menu in header
7. ✅ Sign out functionality
8. ✅ Session management
9. ✅ Password change (in settings)
10. ✅ Profile basics (name, email, avatar)

### 🟡 GOOD-TO-HAVES (P1-P2 - Improves UX significantly)
1. 🟡 Social login (Google, Facebook)
2. 🟡 Guest mode
3. 🟡 Account merging
4. 🟡 Linked accounts view
5. 🟡 2FA
6. 🟡 Active sessions management
7. 🟡 Breadcrumbs
8. 🟡 Keyboard shortcuts
9. 🟡 Delete account
10. 🟡 Export data

### 🔵 NICE-TO-HAVES (P3 - Can add later)
1. 🔵 Social login (LinkedIn, Apple, Microsoft)
2. 🔵 Magic link login
3. 🔵 Passkey/WebAuthn
4. 🔵 Command palette
5. 🔵 Navigation history (back/forward)
6. 🔵 Favorites/bookmarks
7. 🔵 Advanced accessibility tab
8. 🔵 Developer mode/API keys
9. 🔵 Custom profile URL
10. 🔵 Privacy controls (who can see what)

### ❌ NOT NEEDED (Out of scope for prototype)
1. ❌ SSO/SAML (enterprise feature)
2. ❌ LDAP integration
3. ❌ Passwordless SMS
4. ❌ Biometric authentication
5. ❌ Account recovery questions
6. ❌ Multi-language support (for now)
7. ❌ Dark mode (can add later)
8. ❌ Custom themes
9. ❌ Advanced RBAC
10. ❌ Audit logs UI

---

# PART 7: PIXEL-PERFECT PROTOTYPE GUIDELINES

## 7.1 DESIGN PRINCIPLES

### A. **Firebase/Google Workspace Inspiration**
- Clean, minimal forms
- Generous white space
- Clear visual hierarchy
- Subtle shadows
- Smooth animations
- High contrast text
- Accessible colors

### B. **Purple Gradient Branding**
- Use #420D74 as primary
- Gradients for hero sections
- Purple accents on interactive elements
- Never pure purple backgrounds (too harsh)
- Use tints for hover states

### C. **Consistency**
- All inputs: 40px height
- All buttons: 40px height
- All cards: 8px border radius
- All spacing: 8px grid system
- All shadows: subtle, gray
- All transitions: 200-300ms

---

## 7.2 COMPONENT EXAMPLES

### A. **Auth Input Field**
```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-900">
    Email Address
  </label>
  <input
    type="email"
    className="w-full h-10 px-3 border border-gray-300 rounded-lg 
               text-sm text-gray-900 
               focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent
               transition-all duration-200"
    placeholder="you@example.com"
  />
  {error && (
    <p className="text-xs text-red-600 flex items-center gap-1">
      <AlertCircle className="size-3" />
      {error}
    </p>
  )}
</div>
```

### B. **Social Auth Button**
```tsx
<button className="flex-1 h-10 px-4 border border-gray-300 rounded-lg
                   flex items-center justify-center gap-2
                   hover:bg-gray-50 hover:border-gray-400
                   transition-all duration-200
                   active:scale-95">
  <GoogleIcon className="size-5" />
  <span className="text-sm text-gray-900">Google</span>
</button>
```

### C. **User Menu Dropdown**
```tsx
<div className="absolute right-0 top-full mt-2 w-60 
                bg-white border border-gray-200 rounded-lg shadow-lg
                py-2 z-50">
  {/* Header */}
  <div className="px-4 py-3 border-b border-gray-200">
    <p className="text-sm font-medium text-gray-900">Sarah Chen</p>
    <p className="text-xs text-gray-600">sarah@example.com</p>
  </div>
  
  {/* Menu Items */}
  <div className="py-2">
    <button className="w-full px-4 py-2 text-left text-sm text-gray-900
                       hover:bg-gray-50 transition-colors
                       flex items-center gap-3">
      <User className="size-4" />
      <span>Profile</span>
    </button>
    {/* ... more items ... */}
  </div>
  
  {/* Footer */}
  <div className="pt-2 border-t border-gray-200">
    <button className="w-full px-4 py-2 text-left text-sm text-red-600
                       hover:bg-red-50 transition-colors
                       flex items-center gap-3">
      <LogOut className="size-4" />
      <span>Sign Out</span>
    </button>
  </div>
</div>
```

---

## 7.3 ANIMATION SPECS

### A. **Form Transitions**
```css
/* Fade in/out */
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease;
}

/* Slide up */
.slide-up-enter {
  transform: translateY(20px);
  opacity: 0;
}
.slide-up-enter-active {
  transform: translateY(0);
  opacity: 1;
  transition: all 300ms ease;
}
```

### B. **Error Shake**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.input-error {
  animation: shake 200ms ease;
}
```

### C. **Success Checkmark**
```css
@keyframes checkmark {
  0% {
    transform: scale(0) rotate(45deg);
  }
  50% {
    transform: scale(1.2) rotate(45deg);
  }
  100% {
    transform: scale(1) rotate(45deg);
  }
}

.checkmark {
  animation: checkmark 500ms ease;
}
```

---

## 7.4 RESPONSIVE BREAKPOINTS

```css
/* Mobile */
@media (max-width: 640px) {
  .auth-layout {
    grid-template-columns: 1fr; /* Stack vertically */
  }
  
  .auth-right-panel {
    display: none; /* Hide marketing content */
  }
  
  .header-actions {
    /* Show only: hamburger, search icon, notifications, user */
  }
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  .auth-layout {
    grid-template-columns: 1fr; /* Still stacked */
  }
  
  .sidebar {
    width: 240px; /* Narrower sidebar */
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .auth-layout {
    grid-template-columns: 1fr 1fr; /* Split screen */
  }
  
  .sidebar {
    width: 280px;
  }
}
```

---

# PART 8: ENGINEERING HANDOFF CHECKLIST

## 8.1 WHAT ENGINEERS NEED FROM THESE PROTOTYPES

### A. **Visual Specs** ✅
- [x] Exact pixel dimensions
- [x] Color codes (hex values)
- [x] Font sizes and weights
- [x] Spacing measurements
- [x] Border radius values
- [x] Shadow specs
- [x] Animation timings

### B. **Interaction Specs** ✅
- [x] Click/tap areas
- [x] Hover states
- [x] Focus states
- [x] Loading states
- [x] Error states
- [x] Success states
- [x] Empty states

### C. **User Flows** ✅
- [x] Screen-by-screen flows
- [x] Decision trees
- [x] Edge cases
- [x] Error handling
- [x] Validation rules
- [x] Redirect logic

### D. **Technical Requirements**
- [ ] API endpoints needed
- [ ] Database schema changes
- [ ] Third-party integrations (OAuth providers)
- [ ] Email templates
- [ ] Security requirements
- [ ] Performance targets

---

## 8.2 PROTOTYPE DELIVERABLES

For each component, we'll build:

1. **Component File** (.tsx)
   - Fully functional
   - Dummy data
   - All states (loading, error, success)
   - Responsive design

2. **Storybook Entry** (if using Storybook)
   - All variants
   - Interactive controls
   - Documentation

3. **Screenshot/Recording**
   - Desktop view
   - Mobile view
   - Interaction demo

4. **Documentation**
   - Props interface
   - Usage example
   - Edge cases

---

# PART 9: SUMMARY & NEXT STEPS

## 9.1 CRITICAL FINDINGS

### 🚨 **BLOCKING ISSUES** (Cannot launch without)
1. ❌ No authentication system whatsoever
2. ❌ No user menu in header
3. ❌ No account management
4. ❌ No account merging for duplicate accounts

### 🟡 **HIGH-PRIORITY GAPS** (Significantly impacts UX)
1. Missing social login
2. No guest mode
3. Incomplete settings (missing tabs)
4. No breadcrumbs
5. Limited profile fields

### 🟢 **STRENGTHS TO PRESERVE**
1. ✅ AppLayout architecture is excellent
2. ✅ Right panel system (Copilot/Notifications) is well-designed
3. ✅ Navigation structure is logical
4. ✅ Settings page foundation is solid
5. ✅ Design system (purple gradients) is consistent

---

## 9.2 RECOMMENDED IMPLEMENTATION ORDER

### Phase 1: Auth Foundation (Week 1) 🔴 CRITICAL
1. SignIn.tsx
2. Register.tsx
3. ForgotPassword.tsx
4. ResetPassword.tsx
5. Email verification
6. UserMenu.tsx in header

### Phase 2: Social Auth + Guest (Week 2) 🟠 HIGH
1. Google OAuth
2. Facebook OAuth
3. Guest mode
4. Breadcrumbs

### Phase 3: Account Merging (Week 3) 🟠 HIGH
1. Duplicate detection
2. Merge modal
3. Conflict resolution
4. Linked accounts tab

### Phase 4: Settings & Polish (Week 4) 🟡 MEDIUM
1. Settings enhancements
2. Additional tabs
3. Keyboard shortcuts
4. Final polish

---

## 9.3 NEXT STEPS - LET'S DISCUSS

### Questions for You:

1. **Priority Confirmation**
   - Do you agree with P0 (Week 1) items?
   - Any additional must-haves I missed?
   - Any items we should descope?

2. **Social Providers**
   - Which social logins are most important?
   - Google first? Then Facebook?
   - Any others critical for your users?

3. **Guest Mode**
   - Do you want full guest browsing?
   - Or just a "Sign up" splash screen?

4. **Account Merging**
   - Is this a Day 1 need?
   - Or can it come in Phase 2 (Week 3)?

5. **Settings Scope**
   - Which tabs are Day 1?
   - Which can wait?

### Proposal for Today:

**Option A: Start Building Immediately**
→ I build Week 1 components today
→ You review tomorrow
→ Iterate until pixel-perfect

**Option B: Finalize Plan First**
→ Discuss priorities
→ Adjust plan
→ Then build

**Option C: Build 1-2 Key Screens as Proof**
→ I build SignIn.tsx + UserMenu.tsx today
→ You review the approach
→ Then we proceed with rest

---

## 🎯 YOUR CALL

Which option do you prefer? Or any changes to the plan above?

Once we align, I'll start building pixel-perfect prototypes following the TrueLeap/Firebase aesthetic with your purple gradient (#420D74) design system.

All components will be:
- ✅ Fully functional (with dummy data)
- ✅ Responsive (mobile/tablet/desktop)
- ✅ Accessible (keyboard nav, ARIA labels)
- ✅ Consistent with existing design system
- ✅ Production-ready for engineering handoff

**Ready to build when you are!** 🚀

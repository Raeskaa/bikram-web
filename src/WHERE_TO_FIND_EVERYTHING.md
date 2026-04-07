# 🗺️ WHERE TO FIND EVERYTHING
## Complete File Location Guide for TrueLeap AI Platform

> **Last Updated**: January 13, 2026  
> **Complete File Map of All Implemented Features & Flows**

---

## 📁 FILE STRUCTURE OVERVIEW

```
/
├── App.tsx ⭐ MAIN ROUTER
├── /components (All UI Components)
├── /contexts (React Context Providers)
├── /docs (Product Requirements Documents)
├── /guidelines (Design Guidelines)
├── /imports (Figma Imports)
├── /styles (CSS & Design Tokens)
└── /types.ts (TypeScript Definitions)
```

---

## 🎯 ENTRY POINT & NAVIGATION

### **App.tsx** - Main Application Router
**Location**: `/App.tsx`  
**What it controls**: Entire app navigation and routing

**Key State Variables**:
```typescript
- currentView: string  // Controls which page is shown
- currentFlow: string  // Tracks AI chat flows
- selectedItem: object // Currently selected community/event/course
```

**Main Views Available**:
```typescript
currentView === 'welcome' → WelcomeScreen
currentView === 'home' → HomeOverview
currentView === 'communities-list' → CommunitiesListView
currentView === 'events-list' → EventsListView
currentView === 'courses-list' → CoursesListView
currentView === 'community-builder' → CommunityBuilderView
currentView === 'event-builder' → EventBuilderViewV2
currentView === 'course-builder' → CourseBuilderViewV3
currentView === 'learner-dashboard' → LearnerDashboard
currentView === 'social-pack' → SocialPackGenerator ⭐ NEW
currentView === 'newsletter-automation' → NewsletterAutomation ⭐ NEW
// ... and more
```

**Navigation Functions**:
- `handleNavigation(view)` - Navigate to different views
- `handleOpenCommunity(community)` - Open community builder
- `handleOpenEvent(event)` - Open event builder
- `handleOpenCourse(course)` - Open course builder

---

## 🏠 CORE PAGE COMPONENTS

### 1️⃣ **Welcome Screen** (Entry Point)
**File**: `/components/WelcomeScreen.tsx`

**What it shows**:
- Creator/Learner mode toggle
- AI search bar
- Quick action cards
- Version switcher (V1-V8)

**Triggers**:
- `onCreateCommunity` → Community AI chat
- `onCreateEvent` → Event AI chat
- `onCreateCourse` → Course AI chat
- `onNavigate('learner-dashboard')` → Learner mode

---

### 2️⃣ **Home Overview** (Dashboard)
**File**: `/components/HomeOverview.tsx`

**What it shows**:
- Creator mode: Stats cards, recent items, quick actions
- **NEW**: Automation buttons section
  - [Generate Social Pack] → Opens SocialPackGenerator
  - [Auto Newsletter] → Opens NewsletterAutomation
- Activity feed
- Copilot suggestions

**Key Features Added (Latest)**:
```tsx
// Lines ~150-250: Automation Buttons Section
<div className="automation-buttons-section">
  <Button onClick={() => onNavigate('social-pack')}>
    Generate Social Media Pack
  </Button>
  <Button onClick={() => onNavigate('newsletter-automation')}>
    Auto Newsletter Dashboard
  </Button>
</div>
```

---

## 🎨 COMMUNITIES SYSTEM

### **Communities List View**
**File**: `/components/CommunitiesListView.tsx`

**What it shows**:
- Grid of all communities
- [Create Community] button → Triggers AI chat
- Search and filters
- Community stats

---

### **Community Builder View**
**File**: `/components/CommunityBuilderView.tsx`

**What it shows**:
- **Left Sidebar Navigation**:
  - Overview
  - Members (opens `/components/EnhancedMembersPanel.tsx`)
  - Events
  - Courses
  - Content
  - Analytics
  - Settings
- **Main Content**: Editable community details
- **Right Sidebar**: AI Copilot (uses `/components/AIChatPanelV2.tsx`)

**Key Modals**:
- Link/Create Event: `/components/LinkContentModals.tsx`
- Link/Create Course: `/components/LinkContentModals.tsx`
- Member Management: `/components/MemberManagementModals.tsx`

---

### **Community Member View** (Learner Perspective)
**File**: `/components/CommunityMemberView.tsx`

**What it shows**:
- Community header & description
- Tabs: Feed, Events, Courses, Members, Resources
- Join/Leave functionality
- Community content browsing

---

### **My Communities View**
**File**: `/components/MyCommunitiesView.tsx`

**What it shows**:
- Grid of communities the learner has joined
- Click → Opens CommunityMemberView

---

### **Community Setup Steps** (AI Chat Flow)
**File**: `/components/CommunitySetupSteps.tsx`

**3-Step Flow**:
1. Name & Purpose
2. Vision & Members
3. Launch Strategy

**Preview**: `/components/CommunityGenerationPreview.tsx`

---

## 🎟️ EVENTS SYSTEM

### **Events List View**
**File**: `/components/EventsListView.tsx`

**What it shows**:
- Grid of all events
- [Create Event] button → Triggers AI chat
- Search and filters
- Event cards with details

---

### **Event Builder View V2** (Creator Perspective)
**File**: `/components/EventBuilderViewV2.tsx`

**What it shows**:
- **Left Sidebar Navigation**:
  - Overview ⭐ (Has "The Hook" card)
  - Schedule
  - Attendees
  - Registration
  - Promotion
  - Analytics
  - Settings
  - ──────────
  - Link to Community ⭐
  - Create Community ⭐
- **Main Content**: Event details editing
- **Right Sidebar**: AI Copilot

**"The Hook" Card** (Line ~200-350):
```tsx
<Card className="the-hook-card">
  <CardHeader>
    <CardTitle>🎣 Turn Event into Community</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Convert {attendeeCount} attendees into long-term members</p>
    <Button onClick={onCreateCommunity}>Create Community</Button>
  </CardContent>
</Card>
```

---

### **Event Setup Steps** (AI Chat Flow)
**File**: `/components/EventSetupSteps.tsx`

**3-Step Flow**:
1. Event Basics
2. Agenda & Format
3. Promotion Strategy

**Preview**: `/components/EventGenerationPreview.tsx`

---

### **Standalone Event Creator** (Type B Events)
**File**: `/components/StandaloneEventCreator.tsx`

**5-Step Wizard**:
1. Event Details
2. Schedule & Format
3. Community Funnel (The Hook)
4. Pricing
5. AI Promotion Engine

---

### **Events Marketplace** (Public Discovery)
**File**: `/components/EventsMarketplace.tsx`

**What it shows**:
- Hero section with search
- Category filters
- Featured events
- Trending events
- All events list
- Click event → Opens PublicEventLanding

---

### **Public Event Landing Page**
**File**: `/components/PublicEventLanding.tsx`

**What it shows**:
- Full event details
- Speaker/host info
- Agenda
- [Register Now] button → Opens registration modal
- Success: "You're now a member of [Community]"

---

### **Events CRM Dashboard**
**File**: `/components/EventsCRM.tsx`

**What it shows**:
- Lead stats (Total, Registered, Attended, No-Show)
- Search & filter
- Table/Card view toggle
- Lead list with:
  - Contact info
  - Event registered for
  - Status badges
  - Engagement scores (0-100 color bars)
  - Source tracking
  - Bulk actions

---

### **Event Meeting Room** (Live Events)
**File**: `/components/EventMeetingRoom.tsx`

**What it shows**:
- Video grid
- Participant thumbnails
- Chat/Q&A sidebar
- Controls (mute, video, hand raise)
- Minimize option

---

### **Event Waiting Room**
**File**: `/components/EventWaitingRoom.tsx`

**What it shows**:
- Pre-event lobby
- Countdown timer
- Event details
- [Join Meeting] button

---

### **My Registered Events**
**File**: `/components/MyRegisteredEvents.tsx`

**What it shows**:
- Upcoming events with countdown
- Past events archive
- [Join Meeting] buttons
- Calendar integration

---

## 📚 COURSES SYSTEM

### **Courses List View**
**File**: `/components/CoursesListView.tsx`

**What it shows**:
- Grid of all courses
- [Create Course] button → Triggers AI chat
- Search and filters
- Course cards with details

---

### **Course Builder View V3** (Creator Perspective)
**File**: `/components/CourseBuilderViewV3.tsx`

**What it shows**:
- **Left Sidebar Navigation**:
  - Overview ⭐ (Has "The Hook" card)
  - Curriculum (3 modules, 12 lessons)
  - Students
  - Analytics
  - Pricing
  - Settings
  - ──────────
  - Link to Community ⭐
  - Create Community ⭐
- **Main Content**: Course details editing
- **Right Sidebar**: AI Copilot

**Curriculum Tab**:
- 3 expandable modules
- 12 total lessons
- Drag & drop reordering
- Lesson types: Video, Article, Quiz, Assignment

---

### **Course Setup Steps** (AI Chat Flow)
**File**: `/components/CourseSetupSteps.tsx`

**3-Step Flow**:
1. Course Vision
2. Curriculum Structure
3. Pricing & Launch

**Preview**: `/components/CourseGenerationPreview.tsx`

---

### **Course Player** (Learner Perspective)
**File**: `/components/CoursePlayer.tsx`

**What it shows**:
- **Left Sidebar**: Curriculum tree, progress indicators
- **Main Content**: Video player with full controls
- **Tabs Below Video**: Overview, Resources, Notes, Discussion
- **Bottom Navigation**: Previous/Next lesson, Mark Complete
- **Right Sidebar**: Progress summary, badges, community link

---

### **My Enrolled Courses**
**File**: `/components/MyEnrolledCourses.tsx`

**What it shows**:
- Course grid with progress
- Filters: All, In Progress, Completed
- Continue watching cards
- Click course → Opens CoursePlayer

---

## 🎓 LEARNER DASHBOARD

### **Main Learner Dashboard**
**File**: `/components/LearnerDashboard.tsx`

**What it shows**:
- **Top Stats Bar**: Courses in progress, Upcoming events, Communities, Certificates, Learning streak
- **Continue Watching**: Course cards with progress
- **Quick Access Cards**: My Courses, My Events, My Communities
- **Upcoming Events Widget**: Next 3 events with countdown
- **Recommended for You**: AI-suggested content

**Navigation**:
- Click course → Opens CoursePlayer
- Click event → Opens EventMeetingRoom (if live) or MyRegisteredEvents
- Click community → Opens CommunityMemberView

---

## 🤖 AI SYSTEMS

### **AI Chat Panel V2** (Copilot Sidebar)
**File**: `/components/AIChatPanelV2.tsx`

**What it shows**:
- Context-aware suggestions
- Quick actions
- Growth tips
- Analytics insights
- Used in: Community, Event, Course builders

---

### **AI Hub Tabs** (Multi-Mode AI)
**File**: `/components/AIHubTabs.tsx`

**Modes**:
- Builder: Content generation
- Strategist: Growth advice
- Analyst: Data insights
- Scheduled Content: Upcoming automations

---

### **Copilot Context Provider**
**File**: `/contexts/CopilotContext.tsx`

**What it provides**:
- Global AI state management
- Suggestion history
- Context awareness across pages

---

## 🚀 AUTOMATION FEATURES (NEW)

### 1️⃣ **Instant Social Pack Generator** ⭐
**File**: `/components/SocialPackGenerator.tsx`

**What it shows**:
- **Header**: Title, description, back button
- **Content Input Section**:
  - Source content selector (Event/Course/Community/Custom)
  - AI-powered caption generation
  - Tone selector (Professional/Casual/Excited)
- **Platform Selection**:
  - Instagram Post (1080x1080)
  - Instagram Story (1080x1920)
  - LinkedIn Post (1200x627)
  - Twitter/X Post (1200x675)
  - Facebook Post (1200x630)
- **Preview Section**:
  - Live previews for each platform
  - Platform-specific formatting
  - Character count indicators
  - Hashtag suggestions
- **Hashtag Manager**:
  - AI-suggested hashtags
  - Add/remove hashtags
  - Category organization
- **Export Options**:
  - Download all as ZIP
  - Copy captions
  - Schedule posts (future feature)

**How to Access**:
```typescript
// From App.tsx
currentView === 'social-pack'

// From HomeOverview.tsx
<Button onClick={() => onNavigate('social-pack')}>
  Generate Social Media Pack
</Button>
```

**Navigation Flow**:
```
Home Overview
  → [Generate Social Pack] button
  → SocialPackGenerator opens
  → Select source content
  → Generate with AI
  → Preview & customize
  → Export assets
  → [Back to Home] returns to HomeOverview
```

---

### 2️⃣ **Auto Newsletter Dashboard** ⭐
**File**: `/components/NewsletterAutomation.tsx`

**What it shows**:
- **Header**: Title, stats overview
- **Stats Cards**:
  - Total Subscribers
  - Open Rate
  - Click Rate
  - Newsletters Sent
- **Main Tabs**:
  - **Overview**: Quick stats, recent campaigns
  - **Templates**: Pre-built newsletter templates
    - Weekly Digest
    - Event Announcement
    - Course Launch
    - Community Highlights
    - Custom template
  - **Schedule**: Calendar view, upcoming sends
  - **Automation**: Trigger-based campaigns
  - **Analytics**: Performance metrics
- **Template Editor**:
  - Subject line input
  - Content blocks (header, featured content, events, courses, CTA)
  - Preview panel
  - Send test email
- **Automation Rules**:
  - **Behavioral Triggers**:
    - New member joins community
    - Event registration
    - Course enrollment
    - Milestone achievement
  - **Time-Based Triggers**:
    - Weekly digest (every Monday 9am)
    - Event reminder (1 day before)
    - Post-event follow-up (1 day after)
  - Rule configuration: Trigger → Wait → Action
- **Analytics Dashboard**:
  - Open rate trends
  - Click rate trends
  - Subscriber growth
  - Top performing content

**How to Access**:
```typescript
// From App.tsx
currentView === 'newsletter-automation'

// From HomeOverview.tsx
<Button onClick={() => onNavigate('newsletter-automation')}>
  Auto Newsletter Dashboard
</Button>
```

**Navigation Flow**:
```
Home Overview
  → [Auto Newsletter] button
  → NewsletterAutomation opens
  → Choose template
  → Customize content
  → Set automation rules
  → Schedule or send
  → View analytics
  → [Back to Home] returns to HomeOverview
```

---

## 🎨 DESIGN SYSTEM

### **Global Styles**
**File**: `/styles/globals.css`

**What's defined**:
- TweakCN design tokens
- Purple gradient theme (#420D74)
- Typography scale
- Spacing system
- Color variables

**Key Tokens**:
```css
--primary: #420D74 (purple)
--secondary: #6C1FA8
--accent: #9333EA
--muted-foreground: #71717A
--background: #FFFFFF
--foreground: #09090B
```

---

### **shadcn/ui Components**
**Location**: `/components/ui/`

**Available Components**:
- `button.tsx` - Button component
- `card.tsx` - Card layouts
- `dialog.tsx` - Modals
- `input.tsx` - Form inputs
- `select.tsx` - Dropdowns
- `tabs.tsx` - Tab navigation
- `badge.tsx` - Status badges
- `avatar.tsx` - User avatars
- `skeleton.tsx` - Loading states
- `progress.tsx` - Progress bars
- ... and 30+ more

**All use TweakCN tokens** (bg-primary, text-muted-foreground, etc.)

---

## 📖 DOCUMENTATION FILES

### **Complete User Flow Map**
**File**: `/COMPLETE_USER_FLOW_MAP.md`

**What it contains**:
- Visual flow diagrams
- Navigation patterns
- Creator mode flows
- Learner mode flows
- Cross-linking flows

---

### **Automation Features Status**
**File**: `/AUTOMATION_FEATURES_STATUS.md`

**What it contains**:
- 12-item automation roadmap
- Implementation status (✅ Built, 🟡 Partial, ❌ Not Built)
- Feature analysis
- Priority matrix
- Engineering handoff checklist

**Status Updated**: Now includes **2 NEW fully built automation features**:
- ✅ **Instant Social Pack** (Feature #2) - Was ❌ Not Built, Now ✅ FULLY FUNCTIONAL
- ✅ **Auto Newsletter** (Feature #3) - Was 🟡 Partial, Now ✅ FULLY FUNCTIONAL UI

---

### **How to Access Guide**
**File**: `/HOW_TO_ACCESS.md`

**What it contains**:
- Entry points
- Navigation guide
- Demo flows
- Visual highlights
- Troubleshooting

---

### **Design System Documentation**
**File**: `/TWEAKCN_DESIGN_SYSTEM.md`

**What it contains**:
- Token mappings
- Component usage
- Migration guide from hardcoded colors
- Best practices

---

### **Phase Completion Summaries**
**Files**:
- `/PHASE_1_COMPLETE.md` - Communities, Events, Courses systems
- `/PHASE_2_COMPLETE.md` - Learner mode, member views
- `/PHASE_3_COMPLETE.md` - Cross-linking, The Hook integration

---

## 🔍 QUICK REFERENCE: FIND A FEATURE

### **Want to find...**

**Communities features?**
- List: `/components/CommunitiesListView.tsx`
- Builder: `/components/CommunityBuilderView.tsx`
- Chat: `/components/CommunitySetupSteps.tsx`
- Members: `/components/EnhancedMembersPanel.tsx`
- Learner view: `/components/CommunityMemberView.tsx`

**Events features?**
- List: `/components/EventsListView.tsx`
- Builder: `/components/EventBuilderViewV2.tsx`
- Chat: `/components/EventSetupSteps.tsx`
- Marketplace: `/components/EventsMarketplace.tsx`
- Landing: `/components/PublicEventLanding.tsx`
- Meeting: `/components/EventMeetingRoom.tsx`
- CRM: `/components/EventsCRM.tsx`

**Courses features?**
- List: `/components/CoursesListView.tsx`
- Builder: `/components/CourseBuilderViewV3.tsx`
- Chat: `/components/CourseSetupSteps.tsx`
- Player: `/components/CoursePlayer.tsx`
- Learner view: `/components/MyEnrolledCourses.tsx`

**Learner dashboard?**
- Main: `/components/LearnerDashboard.tsx`
- My Courses: `/components/MyEnrolledCourses.tsx`
- My Events: `/components/MyRegisteredEvents.tsx`
- My Communities: `/components/MyCommunitiesView.tsx`

**AI features?**
- Copilot: `/components/AIChatPanelV2.tsx`
- AI Hub: `/components/AIHubTabs.tsx`
- Context: `/contexts/CopilotContext.tsx`

**Automation features?** ⭐
- Social Pack: `/components/SocialPackGenerator.tsx`
- Newsletter: `/components/NewsletterAutomation.tsx`

**Modals?**
- Link Content: `/components/LinkContentModals.tsx`
- Member Management: `/components/MemberManagementModals.tsx`
- Preview: `/components/PreviewModal.tsx`
- Search: `/components/SearchModal.tsx`

**Settings?**
- Global: `/components/GlobalSettingsPage.tsx`
- Panel: `/components/SettingsPanel.tsx`

**Integrations?**
- Library: `/components/IntegrationsLibraryEnhanced.tsx`
- Detail: `/components/IntegrationDetailPanel.tsx`

---

## 🧭 NAVIGATION MAP

### **From Welcome Screen**
```
WelcomeScreen.tsx
  ├─ [Create a community] → CommunitySetupSteps.tsx
  ├─ [Create an event] → EventSetupSteps.tsx
  ├─ [Create a course] → CourseSetupSteps.tsx
  ├─ [Switch to Learner] → LearnerDashboard.tsx
  └─ [Browse] → HomeOverview.tsx
```

### **From Home Overview**
```
HomeOverview.tsx
  ├─ [Communities] → CommunitiesListView.tsx
  ├─ [Events] → EventsListView.tsx
  ├─ [Courses] → CoursesListView.tsx
  ├─ [Generate Social Pack] → SocialPackGenerator.tsx ⭐
  ├─ [Auto Newsletter] → NewsletterAutomation.tsx ⭐
  └─ [Settings] → GlobalSettingsPage.tsx
```

### **From Community Builder**
```
CommunityBuilderView.tsx
  ├─ [Add Event] → LinkContentModals.tsx → EventSetupSteps.tsx
  ├─ [Add Course] → LinkContentModals.tsx → CourseSetupSteps.tsx
  ├─ [Members] → EnhancedMembersPanel.tsx
  └─ [Settings] → SettingsPanel.tsx
```

### **From Event Builder**
```
EventBuilderViewV2.tsx
  ├─ [Create Community] → CommunitySetupSteps.tsx
  ├─ [Link to Community] → LinkContentModals.tsx
  ├─ [Attendees] → Event attendee list
  └─ [Analytics] → Event analytics dashboard
```

### **From Course Builder**
```
CourseBuilderViewV3.tsx
  ├─ [Create Community] → CommunitySetupSteps.tsx
  ├─ [Link to Community] → LinkContentModals.tsx
  ├─ [Curriculum] → Course curriculum editor
  └─ [Students] → Student list
```

### **From Learner Dashboard**
```
LearnerDashboard.tsx
  ├─ [My Courses] → MyEnrolledCourses.tsx → CoursePlayer.tsx
  ├─ [My Events] → MyRegisteredEvents.tsx → EventMeetingRoom.tsx
  └─ [My Communities] → MyCommunitiesView.tsx → CommunityMemberView.tsx
```

---

## 🎯 KEY INTEGRATION POINTS

### **"The Hook" Feature** (Event/Course → Community)

**In Event Builder** (`EventBuilderViewV2.tsx`):
```tsx
// Overview tab shows "The Hook" card
<Card className="hook-card">
  <Button onClick={() => onCreateCommunity()}>
    Create Community
  </Button>
</Card>

// Sidebar navigation
<SidebarItem onClick={() => setShowLinkModal(true)}>
  Link to Community
</SidebarItem>
<SidebarItem onClick={() => onCreateCommunity()}>
  Create Community
</SidebarItem>
```

**In Course Builder** (`CourseBuilderViewV3.tsx`):
```tsx
// Same pattern as Event Builder
<Card className="hook-card">
  <Button onClick={() => onCreateCommunity()}>
    Create Community
  </Button>
</Card>
```

---

### **AI Chat Flows** (3-Step Generation)

**Pattern used in**:
- Community: `CommunitySetupSteps.tsx`
- Event: `EventSetupSteps.tsx`
- Course: `CourseSetupSteps.tsx`

**Flow**:
```
Step 1 → Step 2 → Step 3 → Preview (GenerationPreview.tsx) → Builder
```

**Triggered by**:
```typescript
// In App.tsx
currentFlow === 'community-setup' → CommunitySetupSteps
currentFlow === 'event-setup' → EventSetupSteps
currentFlow === 'course-setup' → CourseSetupSteps
```

---

## 📊 DATA FLOW

### **Type Definitions**
**File**: `/types.ts`

**Key Types**:
```typescript
- Community
- Event
- Course
- Member
- Attendee
- Student
- Message
- ChatMessage
- AIInsight
```

---

### **State Management**

**In App.tsx**:
```typescript
- communities: Community[]
- events: Event[]
- courses: Course[]
- currentUser: User
- currentView: string
- currentFlow: string
- selectedCommunity: Community | null
- selectedEvent: Event | null
- selectedCourse: Course | null
```

**Context Providers**:
- `CopilotContext.tsx` - AI state

---

## 🔗 CROSS-LINKING

### **Community ↔ Event**
```
CommunityBuilderView.tsx
  → [Add Event] button
  → LinkContentModals.tsx opens
  → Options: Link Existing / Create New
  → If Create New → EventSetupSteps.tsx
  → Event auto-linked to community
```

### **Community ↔ Course**
```
CommunityBuilderView.tsx
  → [Add Course] button
  → LinkContentModals.tsx opens
  → Options: Link Existing / Create New
  → If Create New → CourseSetupSteps.tsx
  → Course auto-linked to community
```

### **Event → Community**
```
EventBuilderViewV2.tsx
  → [Create Community] button (The Hook)
  → CommunitySetupSteps.tsx
  → Community created with event pre-linked
```

### **Course → Community**
```
CourseBuilderViewV3.tsx
  → [Create Community] button (The Hook)
  → CommunitySetupSteps.tsx
  → Community created with course pre-linked
```

---

## 🚀 RECENT ADDITIONS (Latest Session)

### **1. Instant Social Pack Generator**
**File**: `/components/SocialPackGenerator.tsx`  
**Added**: January 13, 2026  
**Status**: ✅ Fully Functional

**Features**:
- Multi-platform asset generation
- AI caption writing
- Hashtag management
- Platform-specific previews
- Export functionality

**Access**:
- From `HomeOverview.tsx` via new automation button
- Integrated into `App.tsx` navigation (`currentView === 'social-pack'`)

---

### **2. Auto Newsletter Dashboard**
**File**: `/components/NewsletterAutomation.tsx`  
**Added**: January 13, 2026  
**Status**: ✅ Fully Functional UI

**Features**:
- Newsletter templates
- Scheduling calendar
- Behavioral triggers
- Analytics dashboard
- Automation rules

**Access**:
- From `HomeOverview.tsx` via new automation button
- Integrated into `App.tsx` navigation (`currentView === 'newsletter-automation'`)

---

### **3. Home Overview Update**
**File**: `/components/HomeOverview.tsx`  
**Updated**: January 13, 2026

**New Section Added**:
```tsx
// Automation Features Section
<div className="automation-section">
  <h2>Automation Tools</h2>
  <div className="automation-buttons">
    <Button onClick={() => onNavigate('social-pack')}>
      🎨 Generate Social Pack
    </Button>
    <Button onClick={() => onNavigate('newsletter-automation')}>
      📧 Auto Newsletter
    </Button>
  </div>
</div>
```

---

## 📝 SUMMARY

### **Total Files in Project**: ~100+

### **Main Categories**:
- **Core Pages**: 15+ components
- **AI Systems**: 5+ components
- **Automation**: 2 NEW components ⭐
- **shadcn/ui**: 35+ components
- **Documentation**: 30+ markdown files
- **Contexts**: 1 provider
- **Types**: 1 main file
- **Styles**: 3 CSS files

### **Feature Completeness**:
- ✅ Phase 1: Communities, Events, Courses - **100% Complete**
- ✅ Phase 2: Learner Mode, Member Views - **100% Complete**
- ✅ Phase 3: Cross-Linking, The Hook - **100% Complete**
- ✅ **NEW**: Automation Features - **2/12 Fully Built** ⭐

---

## 🎯 QUICK START GUIDE

### **To explore the app**:

1. **Start at Welcome Screen** (`WelcomeScreen.tsx`)
   - Try Creator mode vs Learner mode
   - Use quick action cards

2. **Create Something**:
   - Community → `CommunitySetupSteps.tsx`
   - Event → `EventSetupSteps.tsx`
   - Course → `CourseSetupSteps.tsx`

3. **Check Automation** ⭐:
   - Home → [Generate Social Pack] → `SocialPackGenerator.tsx`
   - Home → [Auto Newsletter] → `NewsletterAutomation.tsx`

4. **Explore Learner Mode**:
   - Switch to Learner → `LearnerDashboard.tsx`
   - Browse courses → `MyEnrolledCourses.tsx`
   - Join events → `MyRegisteredEvents.tsx`

5. **See The Hook**:
   - Open any event → `EventBuilderViewV2.tsx`
   - Look for "Turn Event into Community" card
   - Click [Create Community]

---

**Need help finding something specific?**  
Use the [🔍 Quick Reference](#-quick-reference-find-a-feature) section above!

---

**Last Updated**: January 13, 2026  
**Maintainer**: AI Assistant  
**Project**: TrueLeap AI - Course Creation Platform

# 🏗️ Deep System Architecture - Technical & Product Specification

## 🎯 System Overview

This is a **multi-tenant, role-based, AI-powered platform** for creating and managing interconnected educational content (Communities, Courses, Events) with a contextual AI assistant (Leapy) that guides users through every action.

**Core Innovation:** Content types are not siloed—they're deeply interconnected. A standalone event can spawn a community, which can contain courses, which can host more events, creating a flywheel growth engine.

---

## 📐 LAYER 1: GLOBAL SYSTEM ARCHITECTURE

### 1.1 Application Shell (Global Chrome)

```
┌─────────────────────────────────────────────────────────────┐
│  PURPLE BANNER (33px) - Dismissible announcement            │
├─────────────────────────────────────────────────────────────┤
│  TOP BAR (73px)                                             │
│  ├─ Left: [☰] [Logo]                                        │
│  └─ Right: [Search w/⌘K] [Stats] [Bell] [Leapy] [Sign-in]  │
├────────────┬────────────────────────────────────────────────┤
│ SIDEBAR    │  MAIN CONTENT AREA                             │
│ (264px)    │  (dynamic based on stage)                      │
│            │                                                 │
│ [+ New]    │  Router shows one of:                          │
│ Home       │  - WelcomeScreen                               │
│ Drafts     │  - ChatFlow (3-step)                           │
│ Communities│  - *ListView (grid + sidebar)                  │
│ Events     │  - *Preview (generation animation)             │
│ Courses    │  - *BuilderView (editor interface)             │
│            │  - HomeOverview (dashboard)                    │
│ [Settings] │  - Settings                                    │
│            │  - Meeting Room                                │
├────────────┴────────────────────────────────────────────────┤
│  LEAPY PANEL (overlay/slide-in, 400px, context-aware)      │
└─────────────────────────────────────────────────────────────┘
│  MINIMIZED MEETING (floating bottom-right, 320x180)         │
└─────────────────────────────────────────────────────────────┘
```

#### Global State (App.tsx)
```typescript
// Current implementation - LOCAL state (will need migration)
const [stage, setStage] = useState<Stage>()           // Routing
const [userMode, setUserMode] = useState<'creator' | 'learner'>()
const [conversation, setConversation] = useState<Conversation>()
const [courseData, setCourseData] = useState<Partial<CourseData>>()
const [communityData, setCommunityData] = useState<Partial<CommunityData>>()
const [eventData, setEventData] = useState<Partial<EventData>>()
const [selectedItemId, setSelectedItemId] = useState<string | null>()

// Meeting state (for floating meeting window)
const [isInMeeting, setIsInMeeting] = useState(false)
const [isMeetingMinimized, setIsMeetingMinimized] = useState(false)
```

**PROBLEM:** Props drilling everywhere. Need global state solution.

**SOLUTION NEEDED:**
```typescript
// Create /contexts/AppContext.tsx
interface AppState {
  // Auth
  user: User | null
  isAuthenticated: boolean
  
  // Navigation
  currentStage: Stage
  navigationHistory: Stage[]
  
  // User mode
  mode: 'creator' | 'learner'
  
  // Selected content
  selectedCommunity: Community | null
  selectedCourse: Course | null
  selectedEvent: Event | null
  
  // Creation flow (temporary state during AI chat)
  creationInProgress: {
    type: 'community' | 'course' | 'event'
    conversation: Message[]
    generatedData: Partial<Community | Course | Event>
  } | null
  
  // Meeting state
  activeMeeting: {
    eventId: string
    isMinimized: boolean
    audioEnabled: boolean
    videoEnabled: boolean
  } | null
  
  // Leapy context
  leapyContext: {
    currentPage: string
    currentSection: string
    focusedElement: string | null
    recentActions: Action[]
  }
}
```

---

### 1.2 Routing System

**Current:** Stage-based routing in App.tsx
```typescript
type Stage = 
  | 'home'              // Dashboard
  | 'welcome'           // Prompt page (NEW button)
  | 'chat'              // 3-step AI flow
  
  | 'communities-list'  // Grid view
  | 'community-preview' // AI generation animation
  | 'community-builder' // Full editor
  
  | 'courses-list'
  | 'course-preview'
  | 'course-builder'
  
  | 'events-list'
  | 'event-preview'
  | 'event-builder'
  
  | 'event-meeting'     // Live meeting room
  | 'marketplace'       // Public discovery (learner)
  | 'settings'
```

**PROBLEM:** Doesn't support:
- Deep linking (e.g., `/community/123/members`)
- Browser back button
- URL parameters (e.g., `/events?filter=upcoming`)
- Sharing links to specific content

**SOLUTION NEEDED:** React Router
```typescript
// Proposed routing structure
<Routes>
  <Route path="/" element={<HomeOverview />} />
  <Route path="/new" element={<WelcomeScreen />} />
  <Route path="/chat/:type" element={<ChatFlow />} />
  
  {/* Communities */}
  <Route path="/communities" element={<CommunitiesListView />} />
  <Route path="/communities/new/preview" element={<CommunityGenerationPreview />} />
  <Route path="/communities/:id" element={<CommunityBuilder />}>
    <Route index element={<CommunityOverview />} />
    <Route path="about" element={<CommunityAbout />} />
    <Route path="courses" element={<CommunityCourses />} />
    <Route path="events" element={<CommunityEvents />} />
    <Route path="members" element={<CommunityMembers />} />
    <Route path="discussion" element={<CommunityDiscussion />} />
    <Route path="analytics" element={<CommunityAnalytics />} />
    <Route path="settings" element={<CommunitySettings />} />
  </Route>
  
  {/* Courses */}
  <Route path="/courses" element={<CoursesListView />} />
  <Route path="/courses/:id" element={<CourseBuilder />}>
    <Route index element={<CourseOverview />} />
    <Route path="curriculum" element={<CourseCurriculum />} />
    <Route path="students" element={<CourseStudents />} />
    <Route path="analytics" element={<CourseAnalytics />} />
    <Route path="settings" element={<CourseSettings />} />
  </Route>
  
  {/* Events */}
  <Route path="/events" element={<EventsListView />} />
  <Route path="/events/:id" element={<EventBuilder />}>
    <Route index element={<EventOverview />} />
    <Route path="details" element={<EventDetails />} />
    <Route path="attendees" element={<EventAttendees />} />
    <Route path="analytics" element={<EventAnalytics />} />
    <Route path="settings" element={<EventSettings />} />
  </Route>
  
  {/* Live features */}
  <Route path="/events/:id/live" element={<EventMeetingRoom />} />
  <Route path="/courses/:id/lesson/:lessonId" element={<LessonPlayer />} />
  
  {/* Settings */}
  <Route path="/settings" element={<GlobalSettings />}>
    <Route path="general" element={<GeneralSettings />} />
    <Route path="integrations" element={<IntegrationsSettings />} />
    <Route path="notifications" element={<NotificationSettings />} />
    <Route path="billing" element={<BillingSettings />} />
    <Route path="profile" element={<ProfileSettings />} />
    <Route path="security" element={<SecuritySettings />} />
  </Route>
</Routes>
```

---

### 1.3 Authentication & User Context

**CURRENT:** Not implemented (just "Sign-in" button)

**NEEDED:**
```typescript
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'creator' | 'learner' | 'both'
  
  // Permissions
  subscription: {
    tier: 'free' | 'pro' | 'enterprise'
    features: string[]
    limits: {
      maxCommunities: number
      maxCourses: number
      maxEvents: number
      maxMembers: number
    }
  }
  
  // Preferences
  preferences: {
    defaultMode: 'creator' | 'learner'
    theme: 'light' | 'dark'
    notifications: NotificationPreferences
    leapyEnabled: boolean
  }
  
  // Activity tracking (for Leapy context)
  lastActive: Date
  recentlyViewed: ContentRef[]
  favorites: ContentRef[]
}

interface ContentRef {
  type: 'community' | 'course' | 'event'
  id: string
  timestamp: Date
}
```

**Flow:**
1. User clicks "Sign-in"
2. Auth modal (email/password or OAuth)
3. Token stored in localStorage
4. User context loaded into AppContext
5. Permissions checked on every action
6. Leapy gets user context

---

## 📐 LAYER 2: DATA MODELS & RELATIONSHIPS

### 2.1 Core Entities

#### **COMMUNITY**
```typescript
interface Community {
  // Identity
  id: string
  slug: string  // for URLs: /c/react-devs-hub
  
  // Basic info
  title: string
  description: string
  type: 'club' | 'academy' | 'membership'
  category: string[]
  tags: string[]
  
  // Media
  coverImage?: string
  logo?: string
  
  // Access control
  visibility: 'public' | 'private' | 'hidden'
  joinType: 'open' | 'approval-required' | 'invite-only'
  
  // Content
  about: RichText          // HTML/Markdown
  spaces: CommunitySpace[] // Discussion channels
  
  // Relationships ⚠️ CRITICAL
  linkedCourses: string[]  // Course IDs
  linkedEvents: string[]   // Event IDs
  
  // Members
  memberCount: number
  members: CommunityMember[]
  
  // Settings
  features: {
    discussions: boolean
    events: boolean
    courses: boolean
    gamification: boolean
    leaderboard: boolean
  }
  
  gamification?: {
    leaderboard: boolean
    badges: boolean
    points: boolean
  }
  
  // Monetization
  pricing: {
    type: 'free' | 'paid' | 'tiered'
    amount?: number
    currency?: string
    tiers?: MembershipTier[]
  }
  
  // Metadata
  createdBy: string  // User ID
  createdAt: Date
  updatedAt: Date
  status: 'draft' | 'published' | 'archived'
  
  // Analytics cache
  analytics: {
    activeMembers30d: number
    postsLast7d: number
    engagementRate: number
  }
}

interface CommunityMember {
  userId: string
  role: 'admin' | 'moderator' | 'member'
  joinedAt: Date
  lastActiveAt: Date
  tier?: string  // If tiered membership
  permissions: string[]
}

interface CommunitySpace {
  id: string
  name: string
  description?: string
  icon: string
  type: 'announcement' | 'discussion' | 'media' | 'resources' | 'directory'
  permissions: {
    canPost: 'admin' | 'moderator' | 'all'
    canComment: 'admin' | 'moderator' | 'all'
  }
  readOnly?: boolean
  seededContent?: Post[]
}
```

---

#### **COURSE**
```typescript
interface Course {
  // Identity
  id: string
  slug: string
  
  // Basic info
  title: string
  description: string
  category: string[]
  tags: string[]
  level: 'beginner' | 'intermediate' | 'advanced'
  
  // Media
  coverImage?: string
  thumbnail?: string
  trailerVideo?: string
  
  // Access control
  visibility: 'public' | 'private' | 'unlisted'
  enrollmentType: 'open' | 'approval' | 'invite-only'
  
  // Content
  curriculum: CourseModule[]
  totalLessons: number
  totalDuration: number  // minutes
  
  // Relationships ⚠️ CRITICAL
  communityId?: string  // NULL if standalone
  linkedEvents: string[]  // Related events (webinars, Q&A sessions)
  
  // Students
  enrollmentCount: number
  students: CourseStudent[]
  
  // Pricing
  pricing: {
    type: 'free' | 'paid' | 'subscription'
    amount?: number
    currency?: string
    hasTrial?: boolean
    trialDays?: number
  }
  
  // Settings
  features: {
    discussions: boolean
    assignments: boolean
    certificates: boolean
    downloadable: boolean
    dripContent: boolean
  }
  
  certificate?: {
    enabled: boolean
    template: string
    criteria: {
      minCompletionRate: number
      minQuizScore?: number
    }
  }
  
  // Metadata
  createdBy: string
  instructors: string[]  // User IDs
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  status: 'draft' | 'published' | 'archived'
  
  // Analytics cache
  analytics: {
    completionRate: number
    avgRating: number
    avgTimeToComplete: number
  }
}

interface CourseModule {
  id: string
  title: string
  description?: string
  order: number
  lessons: Lesson[]
  quiz?: Quiz
  unlockAfter?: Date  // For drip content
}

interface Lesson {
  id: string
  title: string
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'live-session'
  order: number
  
  // Content
  content?: RichText      // For text lessons
  videoUrl?: string       // For video lessons
  videoDuration?: number
  resources?: Resource[]
  
  // Settings
  isFree: boolean  // Preview lessons
  isRequired: boolean
  
  // Metadata
  estimatedTime: number  // minutes
  createdAt: Date
  updatedAt: Date
}

interface CourseStudent {
  userId: string
  enrolledAt: Date
  lastAccessedAt: Date
  progress: {
    completedLessons: string[]
    completionRate: number
    quizScores: { lessonId: string, score: number }[]
    certificateIssued: boolean
    certificateIssuedAt?: Date
  }
  status: 'active' | 'completed' | 'dropped'
}
```

---

#### **EVENT**
```typescript
interface Event {
  // Identity
  id: string
  slug: string
  
  // Basic info
  title: string
  description: string
  category: string[]
  tags: string[]
  
  // Media
  coverImage?: string
  
  // Scheduling
  startDate: Date
  endDate: Date
  timezone: string
  duration: number  // minutes
  
  // Location
  locationType: 'virtual' | 'in-person' | 'hybrid'
  virtualDetails?: {
    platform: 'zoom' | 'meet' | 'teams' | 'custom'
    link?: string
    meetingId?: string
    password?: string
  }
  physicalDetails?: {
    venue: string
    address: string
    city: string
    country: string
    mapLink?: string
  }
  
  // Relationships ⚠️ CRITICAL
  communityId?: string  // NULL if standalone
  relatedCourses: string[]  // Can promote courses at event
  
  // Attendees
  capacity?: number
  registrationCount: number
  attendees: EventAttendee[]
  waitlist: EventAttendee[]
  
  // Registration
  registration: {
    enabled: boolean
    deadline?: Date
    requiresApproval: boolean
    customQuestions?: RegistrationQuestion[]
  }
  
  // Pricing
  ticketTypes: EventTicket[]
  
  // Agenda
  agenda: AgendaItem[]
  
  // Speakers/Hosts
  hosts: string[]  // User IDs
  speakers: Speaker[]
  
  // Settings
  features: {
    chat: boolean
    qna: boolean
    polling: boolean
    recording: boolean
    breakoutRooms: boolean
  }
  
  recording?: {
    url: string
    duration: number
    uploadedAt: Date
    visibility: 'public' | 'attendees-only' | 'private'
  }
  
  // The Hook 🎣
  shouldSuggestCommunity?: boolean  // Trigger when registration > threshold
  
  // Metadata
  createdBy: string
  createdAt: Date
  updatedAt: Date
  status: 'draft' | 'upcoming' | 'live' | 'ended' | 'cancelled'
  
  // Analytics cache
  analytics: {
    registrationFunnel: {
      pageViews: number
      startedRegistration: number
      completed: number
    }
    attendanceRate: number
    engagementScore: number
  }
}

interface EventAttendee {
  userId: string
  registeredAt: Date
  status: 'registered' | 'checked-in' | 'attended' | 'no-show'
  ticketType: string
  registrationData?: Record<string, any>  // Custom form responses
  checkedInAt?: Date
}

interface EventTicket {
  id: string
  name: string
  price: number
  currency: string
  capacity?: number
  sold: number
  salesStart?: Date
  salesEnd?: Date
}

interface AgendaItem {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  type: 'session' | 'break' | 'qa' | 'networking'
  speaker?: string
}
```

---

### 2.2 Relationship Matrix ⚠️ CRITICAL

This is the **CORE** of the interconnected system:

```typescript
// Database relationships (if using SQL)
communities
├─ id (PK)
├─ ...other fields

courses
├─ id (PK)
├─ communityId (FK -> communities.id) [nullable]
├─ ...other fields

events
├─ id (PK)
├─ communityId (FK -> communities.id) [nullable]
├─ ...other fields

// Join tables for many-to-many
community_courses
├─ communityId (FK)
├─ courseId (FK)
├─ addedAt
├─ addedBy
├─ accessLevel ('public' | 'members-only')

community_events
├─ communityId (FK)
├─ eventId (FK)
├─ addedAt
├─ addedBy
├─ accessLevel ('public' | 'members-only')

event_courses  // "Learn more" at events
├─ eventId (FK)
├─ courseId (FK)
├─ displayOrder
```

#### **Cascade Behaviors:**

**When Community is DELETED:**
- [ ] Courses: Update `communityId` to NULL (make standalone) OR delete if community-exclusive
- [ ] Events: Update `communityId` to NULL (make standalone) OR delete if community-exclusive
- [ ] Members: Remove all memberships
- [ ] Posts/Discussions: Delete all OR archive
- [ ] Analytics: Archive data

**When Course is DELETED:**
- [ ] Students: Send notification, refund if paid
- [ ] Community: Remove from `linkedCourses` array
- [ ] Events: Remove from related events
- [ ] Lessons: Delete all
- [ ] Progress: Archive student data (compliance)

**When Event is DELETED:**
- [ ] Attendees: Send cancellation email, refund
- [ ] Community: Remove from `linkedEvents`
- [ ] Courses: Remove promotion links
- [ ] Recording: Keep or delete (user choice)

**When User is DELETED:**
- [ ] Communities owned: Transfer ownership OR delete
- [ ] Courses authored: Transfer OR delete
- [ ] Events hosted: Transfer OR cancel
- [ ] Memberships: Remove
- [ ] Posts: Anonymize OR delete

---

### 2.3 Linking/Unlinking Flows

#### **Add Course to Community**

**UI Location:** Community Builder → Courses tab → [+ Add Course] button

**Flow:**
```
User clicks [+ Add Course]
  ↓
Modal shows two tabs:
  ┌─ Existing Courses ────────────────┐
  │ [ ] React Masterclass             │
  │ [ ] TypeScript Deep Dive          │
  │ [ ] UI/UX Fundamentals            │
  │                                   │
  │ Access: [Members Only ▼]          │
  │         [Save]                    │
  └───────────────────────────────────┘
  
  ┌─ Create New Course ───────────────┐
  │ Launches ChatFlow with context:   │
  │ "Creating course for [Community]" │
  │ Auto-links on creation            │
  └───────────────────────────────────┘

User selects existing course
  ↓
POST /api/communities/{id}/courses
  Body: {
    courseId: "course123",
    accessLevel: "members-only"
  }
  ↓
Backend:
  1. Verify user has permission (admin/moderator)
  2. Verify course ownership (or is public)
  3. Create link in `community_courses` table
  4. Update course.communityId = community.id
  5. Trigger webhook: 'course.linked'
  ↓
Frontend:
  1. Refetch community.linkedCourses
  2. Show success toast
  3. Leapy celebrates: "Great! Course added. Want to announce it?"
```

#### **Remove Course from Community**

**Flow:**
```
User clicks [Remove] on course card
  ↓
Confirmation modal:
  "Remove 'React Masterclass' from this community?"
  
  [ ] Make course standalone (keep accessible)
  [ ] Delete course entirely (can't be undone)
  
  [Cancel] [Remove]
  ↓
DELETE /api/communities/{id}/courses/{courseId}
  Params: { action: 'standalone' | 'delete' }
  ↓
Backend:
  If standalone:
    1. Set course.communityId = NULL
    2. Delete from community_courses
    3. Keep course data intact
  
  If delete:
    1. Check if course is linked to other communities (prevent)
    2. Notify all students
    3. Process refunds
    4. Soft delete course (archive)
  ↓
Frontend:
  1. Remove from UI
  2. Show success message
  3. If delete: prompt to create announcement
```

#### **Create Event for Community** (Direct flow)

**UI Location:** Community Builder → Events tab → [+ Create Event] button

**Flow:**
```
User clicks [+ Create Event]
  ↓
Option modal:
  ┌────────────────────────────────────┐
  │ [📅 Quick Event]                   │
  │    Simple form, no AI              │
  │                                    │
  │ [🤖 AI-Assisted Event]             │
  │    ChatFlow with community context │
  └────────────────────────────────────┘

If AI-Assisted:
  ↓
Launch ChatFlow with pre-filled context:
  System message: "User wants to create event for [Community Name]"
  Auto-populate:
    - Target audience from community
    - Category from community tags
    - Suggested times based on member timezones
  ↓
Generate event with communityId pre-set
  ↓
After creation:
  - Auto-announce in community (optional)
  - Invite all members (optional)
  - Add to community calendar
```

---

## 📐 LAYER 3: PERMISSION & ROLE SYSTEM

### 3.1 Role Hierarchy

```
PLATFORM LEVEL (Global)
├─ Super Admin (TrueLeap team)
├─ Enterprise Admin (for org accounts)
└─ User
    ├─ Creator (default)
    └─ Learner (opt-in)

COMMUNITY LEVEL
├─ Owner (creator)
├─ Admin (full control)
├─ Moderator (content + members)
└─ Member (consumer)

COURSE LEVEL
├─ Instructor (creator)
├─ Teaching Assistant (grading)
└─ Student (enrolled)

EVENT LEVEL
├─ Host (creator)
├─ Co-host (can manage)
├─ Speaker (presenting)
└─ Attendee (registered)
```

### 3.2 Permission Matrix

**COMMUNITIES:**
```typescript
const COMMUNITY_PERMISSIONS = {
  'community.view': ['owner', 'admin', 'moderator', 'member'],
  'community.edit': ['owner', 'admin'],
  'community.delete': ['owner'],
  
  'community.members.invite': ['owner', 'admin', 'moderator'],
  'community.members.remove': ['owner', 'admin'],
  'community.members.promote': ['owner'],
  
  'community.posts.create': ['owner', 'admin', 'moderator', 'member'],
  'community.posts.delete': ['owner', 'admin', 'moderator'], // own posts
  'community.posts.delete.any': ['owner', 'admin', 'moderator'],
  
  'community.courses.add': ['owner', 'admin'],
  'community.courses.remove': ['owner', 'admin'],
  
  'community.events.create': ['owner', 'admin', 'moderator'],
  'community.events.delete': ['owner', 'admin'],
  
  'community.settings.edit': ['owner', 'admin'],
  'community.analytics.view': ['owner', 'admin', 'moderator'],
}

// Usage
function hasPermission(
  user: User,
  community: Community,
  permission: keyof typeof COMMUNITY_PERMISSIONS
): boolean {
  const member = community.members.find(m => m.userId === user.id)
  if (!member) return false
  
  const allowedRoles = COMMUNITY_PERMISSIONS[permission]
  return allowedRoles.includes(member.role)
}
```

### 3.3 Visibility Rules

**Content Visibility Matrix:**
```
                │ Public │ Private │ Hidden │
────────────────┼────────┼─────────┼────────┤
Logged Out      │   ✓    │    ✗    │   ✗    │
Logged In       │   ✓    │   ✗*   │   ✗    │
Member          │   ✓    │    ✓    │   ✓    │
────────────────┴────────┴─────────┴────────┘
* Unless invited
```

**Course/Event in Community:**
```
                │ Free-access │ Members-only │ Paid │
────────────────┼─────────────┼──────────────┼──────┤
Public visitor  │      ✓      │      ✗       │  ✗   │
Community member│      ✓      │      ✓       │  ✗*  │
Paid user       │      ✓      │      ✓       │  ✓   │
────────────────┴─────────────┴──────────────┴──────┘
* Unless tier includes access
```

---

## 📐 LAYER 4: LEAPY AI CONTEXT SYSTEM

### 4.1 Context Architecture

**Leapy needs to know:**
1. **Where** the user is (page + section)
2. **What** they're looking at (content type + ID)
3. **Who** they are (role + permissions)
4. **What** they've done recently (action history)
5. **What** they're trying to do (inferred intent)

**Implementation:**
```typescript
// /contexts/LeapyContext.tsx
interface LeapyContext {
  // Navigation context
  page: {
    route: string  // '/communities/abc123/members'
    type: 'list' | 'builder' | 'viewer'
    contentType: 'community' | 'course' | 'event' | null
    contentId: string | null
    section: string | null  // 'members' | 'courses' | 'analytics'
  }
  
  // User context
  user: {
    id: string
    role: 'creator' | 'learner'
    permissions: string[]
  }
  
  // Content context
  content: {
    entity: Community | Course | Event | null
    status: 'draft' | 'published' | 'archived'
    userRole: string | null  // Role in this specific content
    stats: Record<string, any>  // Quick stats for suggestions
  }
  
  // Action context (last 10 actions)
  recentActions: Action[]
  
  // Focus context (what input/section is user in)
  focus: {
    element: string | null
    field: string | null
    isEmpty: boolean
  }
  
  // Intent detection
  inferredIntent: Intent | null
}

interface Action {
  type: string  // 'created_course', 'invited_member', etc.
  timestamp: Date
  metadata: Record<string, any>
}

interface Intent {
  type: 'create' | 'edit' | 'delete' | 'search' | 'analyze' | 'promote'
  confidence: number
  target: string | null
}
```

### 4.2 Context Tracking

**How context updates:**
```typescript
// In AppLayout.tsx or route wrapper
useEffect(() => {
  updateLeapyContext({
    page: {
      route: window.location.pathname,
      type: 'builder',
      contentType: 'community',
      contentId: params.id,
      section: currentSection
    }
  })
}, [location, currentSection])

// When user focuses input
<input
  onFocus={() => updateLeapyFocus({ 
    element: 'title-input',
    field: 'community.title',
    isEmpty: !value
  })}
/>

// When user takes action
function handleInviteMember() {
  // ... invite logic
  trackAction({
    type: 'member.invited',
    metadata: { communityId, count: 1 }
  })
}
```

### 4.3 Contextual Suggestions

**Suggestion Engine:**
```typescript
// /lib/leapy/suggestions.ts
function generateSuggestions(context: LeapyContext): Suggestion[] {
  const suggestions: Suggestion[] = []
  
  // Page-specific suggestions
  if (context.page.type === 'builder' && context.page.section === 'members') {
    if (context.content.stats.memberCount === 0) {
      suggestions.push({
        type: 'action',
        priority: 'high',
        title: 'Invite your first members',
        description: 'Get started by inviting people to join',
        action: { type: 'open-invite-modal' },
        icon: 'user-plus'
      })
    }
    
    if (context.content.stats.memberCount > 50 && !context.content.entity.linkedEvents?.length) {
      suggestions.push({
        type: 'growth',
        priority: 'medium',
        title: 'Host your first event',
        description: 'Communities with events see 3x more engagement',
        action: { type: 'create-event', prefill: { communityId: context.content.entity.id } },
        icon: 'calendar-plus'
      })
    }
  }
  
  if (context.page.route.includes('/events') && context.content.stats.attendeeCount > 100 && !context.content.entity.communityId) {
    // THE HOOK 🎣
    suggestions.push({
      type: 'conversion',
      priority: 'critical',
      title: 'Turn your event into a community',
      description: 'You have 100+ attendees! Keep them engaged year-round with a community.',
      action: { type: 'create-community-from-event', prefill: { eventId: context.content.entity.id } },
      icon: 'sparkles',
      cta: 'Create Community'
    })
  }
  
  // Empty state suggestions
  if (context.focus.isEmpty && context.focus.field === 'course.description') {
    suggestions.push({
      type: 'ai-generate',
      priority: 'high',
      title: 'Generate course description',
      description: 'Let AI write a compelling description based on your course outline',
      action: { type: 'ai-generate', field: 'description' },
      icon: 'wand'
    })
  }
  
  // Learning suggestions (based on actions)
  const recentInvites = context.recentActions.filter(a => a.type === 'member.invited')
  if (recentInvites.length > 5) {
    suggestions.push({
      type: 'tip',
      priority: 'low',
      title: 'Send a welcome message',
      description: 'New members are 5x more likely to engage if welcomed within 24 hours',
      action: { type: 'create-announcement' },
      icon: 'message-circle'
    })
  }
  
  return suggestions.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })
}
```

### 4.4 Leapy UI States

**In Leapy Panel:**
```
┌─ Leapy AI ─────────────────────┐
│                                │
│ 📍 You're in:                  │
│ Community → React Devs → Members│
│                                │
│ ✨ Suggestions                 │
│ ┌────────────────────────────┐ │
│ │ 🎯 Invite your first members│ │
│ │ Get started by inviting... │ │
│ │ [Invite Members]           │ │
│ └────────────────────────────┘ │
│                                │
│ ┌────────────────────────────┐ │
│ │ 📧 Send welcome email      │ │
│ │ New members appreciate...  │ │
│ │ [Draft Email]              │ │
│ └────────────────────────────┘ │
│                                │
│ 💬 Ask Leapy...                │
│ [Type your question]           │
│                                │
│ 📚 Helpful Resources           │
│ • How to grow your community   │
│ • Member engagement tips       │
│ • Setting up channels          │
└────────────────────────────────┘
```

**Leapy Interventions (Proactive):**
```typescript
// Trigger when user is stuck
if (context.focus.element && !context.recentActions.length > 0 && timeSinceLastAction > 30000) {
  showLeapyNudge({
    message: "Need help with this?",
    suggestions: generateSuggestions(context)
  })
}
```

---

## 📐 LAYER 5: THE HOOK - CONVERSION MECHANICS

### 5.1 Trigger Conditions

**Event → Community:**
```typescript
function shouldSuggestCommunity(event: Event): boolean {
  // Conditions
  const hasNoComm unity = !event.communityId
  const hasEnoughAttendees = event.registrationCount >= 50
  const isUpcoming = event.status === 'upcoming' || event.status === 'live'
  const hasHighEngagement = event.analytics.engagementScore > 0.7
  
  return hasnoCommunity && (hasEnoughAttendees || hasHighEngagement)
}

// Check on:
- Event registration (every 10 new registrations)
- Event end (post-event survey)
- Event builder page load
```

**Course → Community:**
```typescript
function shouldSuggestCommunity(course: Course): boolean {
  const hasNoCommunity = !course.communityId
  const hasEnoughStudents = course.enrollmentCount >= 100
  const hasHighCompletion = course.analytics.completionRate > 0.6
  const hasDiscussionsEnabled = course.features.discussions
  
  return hasNoCommunity && hasEnoughStudents && hasHighCompletion
}
```

**Community → Events:**
```typescript
function shouldSuggestEvent(community: Community): boolean {
  const hasNoEvents = community.linkedEvents.length === 0
  const hasActiveMembers = community.analytics.activeMembers30d > 20
  const hasBeenActive = daysSinceCreation(community) > 14
  
  return hasNoEvents && hasActiveMembers && hasBeenActive
}
```

**Community → Courses:**
```typescript
function shouldSuggestCourse(community: Community): boolean {
  const hasNoCourses = community.linkedCourses.length === 0
  const hasManyQuestions = community.analytics.postsLast7d > 30
  const hasCategory = ['education', 'skills', 'learning'].some(c => 
    community.category.includes(c)
  )
  
  return hasNoCourses && hasManyQuestions
}
```

### 5.2 Conversion Flow

**Example: Event → Community**

**Trigger Point:** Event reaches 100 registrations

```
1. System detects threshold crossed
   ↓
2. Leapy shows notification (in-app + email)
   ┌────────────────────────────────────┐
   │ 🎉 Your event is growing!          │
   │                                    │
   │ 100 people have registered for     │
   │ "React 18 Workshop"                │
   │                                    │
   │ Want to keep them engaged after    │
   │ the event? Create a community!     │
   │                                    │
   │ [Maybe Later] [Create Community]   │
   └────────────────────────────────────┘
   ↓
3. If user clicks [Create Community]:
   ↓
4. Launch ChatFlow with pre-filled context:
   System message: "Creating community from event: React 18 Workshop"
   
   Pre-filled data:
   - Title: "React 18 Learners" (smart suggestion)
   - Description: Auto-generated from event description
   - Members: All event attendees (pending their consent)
   - First event: Link back to original event
   
   ↓
5. After community created:
   - Link event.communityId = new community
   - Send email to attendees: "Join the community!"
   - Create first post in community with event recording
   - Leapy suggests: "Create follow-up event" or "Turn this into a course"
```

---

## 📐 LAYER 6: STATE MANAGEMENT ARCHITECTURE

### 6.1 Current Problems

**Issues:**
1. Props drilling (7+ levels deep)
2. Duplicate state (same data in multiple components)
3. No persistence (refresh loses everything)
4. No real-time updates
5. Hard to debug

### 6.2 Proposed Architecture

**Global State (Zustand or Context API):**

```typescript
// /stores/appStore.ts
interface AppStore {
  // Auth
  user: User | null
  setUser: (user: User | null) => void
  
  // Navigation
  stage: Stage
  setStage: (stage: Stage) => void
  navigationHistory: Stage[]
  
  // Mode
  mode: 'creator' | 'learner'
  toggleMode: () => void
  
  // Selected content (for detail views)
  selectedCommunity: Community | null
  selectedCourse: Course | null
  selectedEvent: Event | null
  selectCommunity: (id: string) => Promise<void>
  selectCourse: (id: string) => Promise<void>
  selectEvent: (id: string) => Promise<void>
  
  // Creation flow (temporary)
  creationInProgress: CreationFlow | null
  startCreation: (type: ContentType) => void
  updateCreationData: (data: Partial<any>) => void
  completeCreation: () => Promise<void>
  cancelCreation: () => void
  
  // Leapy
  leapyOpen: boolean
  toggleLeapy: () => void
  leapyContext: LeapyContext
  updateLeapyContext: (context: Partial<LeapyContext>) => void
  
  // Notifications
  notifications: Notification[]
  addNotification: (n: Notification) => void
}

// Usage
import { useAppStore } from '@/stores/appStore'

function CommunityCard({ community }) {
  const selectCommunity = useAppStore(state => state.selectCommunity)
  
  return (
    <button onClick={() => selectCommunity(community.id)}>
      {community.title}
    </button>
  )
}
```

**Content Stores (separate for performance):**

```typescript
// /stores/communitiesStore.ts
interface CommunitiesStore {
  communities: Community[]
  isLoading: boolean
  error: string | null
  
  fetchCommunities: (filters?: Filters) => Promise<void>
  fetchCommunity: (id: string) => Promise<Community>
  createCommunity: (data: Partial<Community>) => Promise<Community>
  updateCommunity: (id: string, data: Partial<Community>) => Promise<void>
  deleteCommunity: (id: string) => Promise<void>
  
  // Members
  addMember: (communityId: string, userId: string, role: Role) => Promise<void>
  removeMember: (communityId: string, userId: string) => Promise<void>
  
  // Linking
  linkCourse: (communityId: string, courseId: string) => Promise<void>
  unlinkCourse: (communityId: string, courseId: string) => Promise<void>
  linkEvent: (communityId: string, eventId: string) => Promise<void>
  unlinkEvent: (communityId: string, eventId: string) => Promise<void>
}

// Similar for coursesStore, eventsStore
```

### 6.3 Data Fetching Strategy

**Server State (React Query):**

```typescript
// /hooks/useCommunity.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useCommunity(id: string) {
  return useQuery({
    queryKey: ['community', id],
    queryFn: () => api.getCommunity(id),
    staleTime: 5 * 60 * 1000,  // 5 minutes
    cacheTime: 10 * 60 * 1000  // 10 minutes
  })
}

export function useUpdateCommunity() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Community> }) => 
      api.updateCommunity(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['community', id])
      queryClient.invalidateQueries(['communities'])
    }
  })
}

// Usage
function CommunityBuilder({ id }) {
  const { data: community, isLoading } = useCommunity(id)
  const updateCommunity = useUpdateCommunity()
  
  if (isLoading) return <Loading />
  
  return (
    <div>
      <input
        value={community.title}
        onChange={(e) => updateCommunity.mutate({ 
          id, 
          data: { title: e.target.value } 
        })}
      />
    </div>
  )
}
```

---

## 📐 LAYER 7: API DESIGN

### 7.1 RESTful Endpoints

**COMMUNITIES:**
```
GET    /api/communities                  List (with filters)
POST   /api/communities                  Create
GET    /api/communities/:id              Get one
PATCH  /api/communities/:id              Update
DELETE /api/communities/:id              Delete

GET    /api/communities/:id/members      List members
POST   /api/communities/:id/members      Add member
DELETE /api/communities/:id/members/:userId  Remove member
PATCH  /api/communities/:id/members/:userId  Update role

GET    /api/communities/:id/courses      List linked courses
POST   /api/communities/:id/courses      Link course
DELETE /api/communities/:id/courses/:courseId  Unlink course

GET    /api/communities/:id/events       List linked events
POST   /api/communities/:id/events       Link event
DELETE /api/communities/:id/events/:eventId  Unlink event

GET    /api/communities/:id/posts        List posts
POST   /api/communities/:id/posts        Create post
DELETE /api/communities/:id/posts/:postId  Delete post

GET    /api/communities/:id/analytics    Get analytics
```

**COURSES:**
```
GET    /api/courses
POST   /api/courses
GET    /api/courses/:id
PATCH  /api/courses/:id
DELETE /api/courses/:id

GET    /api/courses/:id/students
POST   /api/courses/:id/students         Enroll student
DELETE /api/courses/:id/students/:userId Unenroll

GET    /api/courses/:id/curriculum
POST   /api/courses/:id/modules          Add module
PATCH  /api/courses/:id/modules/:moduleId Update module
DELETE /api/courses/:id/modules/:moduleId Delete module

POST   /api/courses/:id/modules/:moduleId/lessons  Add lesson
PATCH  /api/courses/:id/lessons/:lessonId  Update lesson
DELETE /api/courses/:id/lessons/:lessonId  Delete lesson

GET    /api/courses/:id/progress/:userId  Get student progress
POST   /api/courses/:id/complete/:lessonId Mark lesson complete

GET    /api/courses/:id/analytics
```

**EVENTS:**
```
GET    /api/events
POST   /api/events
GET    /api/events/:id
PATCH  /api/events/:id
DELETE /api/events/:id

GET    /api/events/:id/attendees
POST   /api/events/:id/register          Register user
DELETE /api/events/:id/attendees/:userId Unregister

POST   /api/events/:id/checkin/:userId   Check-in attendee

GET    /api/events/:id/analytics
```

### 7.2 Real-time Subscriptions (WebSockets)

```typescript
// For live features
socket.on('community:${id}:new-post', (post) => {
  // Update UI with new post
})

socket.on('event:${id}:new-registration', (attendee) => {
  // Update attendee count
  // Check if should trigger "The Hook"
})

socket.on('course:${id}:student-progress', (progress) => {
  // Update progress bar
})
```

---

## 📐 LAYER 8: IMPLEMENTATION PRIORITIES

### **Phase 1: Foundation (Week 1-2)**
1. ✅ Fix hover effects (done)
2. ⏳ Implement React Router with proper URLs
3. ⏳ Create global state (Zustand or Context)
4. ⏳ Set up React Query for data fetching
5. ⏳ Build LeapyContext system
6. ⏳ Implement role-based view toggle

### **Phase 2: Core Management (Week 3-4)**
7. ⏳ Member management UI (communities)
8. ⏳ Student management UI (courses)
9. ⏳ Attendee management UI (events)
10. ⏳ Rich text editor (TipTap)
11. ⏳ File upload system (images, videos)

### **Phase 3: Interconnections (Week 5-6)**
12. ⏳ Link/unlink course to community flow
13. ⏳ Link/unlink event to community flow
14. ⏳ Create course/event FROM community
15. ⏳ Implement "The Hook" trigger system
16. ⏳ Community suggestion modals

### **Phase 4: Content Creation (Week 7-8)**
17. ⏳ Course curriculum builder (drag-drop)
18. ⏳ Lesson editor (video, text, quiz)
19. ⏳ Event agenda builder
20. ⏳ Discussion/posts system
21. ⏳ Analytics dashboards (basic)

### **Phase 5: Learner Experience (Week 9-10)**
22. ⏳ Course player (video + progress)
23. ⏳ Event waiting room + live view
24. ⏳ Community member view (non-admin)
25. ⏳ Mobile responsive design

### **Phase 6: Monetization (Week 11-12)**
26. ⏳ Stripe integration
27. ⏳ Pricing settings UI
28. ⏳ Payment flows
29. ⏳ Revenue analytics

---

## 🎯 IMMEDIATE NEXT STEPS

**What to build FIRST:**

1. **LeapyContext Provider** - So Leapy knows everything
2. **Role Toggle** - Creator vs Learner separation
3. **Member Management** - Can't have communities without managing members
4. **React Router** - Proper URLs for deep linking
5. **Linking Flow** - Add course/event to community

**Or should we:**
- Document the current component architecture first?
- Create wireframes for missing UIs?
- Define API contracts for backend team?

**What's your priority?** 🎯

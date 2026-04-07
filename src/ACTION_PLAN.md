# 🎯 Action Plan - What to Build Next

## 📊 Current Completion Status

```
PLATFORM STRUCTURE: ████████████████████░░ 85%
├── Global Chrome:  ██████████████░░░░░░░░ 60%
├── Communities:    ████████████████░░░░░░ 70%
├── Events:         ████████████████░░░░░░ 70%  
├── Courses:        ███████████████░░░░░░░ 65%
└── Leapy AI:       ██████░░░░░░░░░░░░░░░░ 30%

DEEP FUNCTIONALITY: ██████░░░░░░░░░░░░░░░░ 30%
└── Most sections are placeholders, not functional
```

---

## 🚀 Phase 1: Critical Foundation (Week 1)

### Priority 1A: Fix Global Elements

#### 1. **Leapy AI Context Awareness** ⚡ CRITICAL
**Problem:** Leapy doesn't know what page user is on
**Files to modify:**
- `/components/AIChatPanel.tsx` or `/components/AIChatPanelV2.tsx`
- `/components/AppLayout.tsx`

**What to build:**
```typescript
// Pass context to Leapy
<LeapyAI 
  currentPage={currentPage}
  currentSection={currentSection}
  userRole={userRole}
  contentId={contentId}
  contentType={contentType}
/>

// Leapy suggests based on context:
if (currentPage === 'community-builder' && currentSection === 'events') {
  suggestions = [
    "Create your first event to engage members",
    "Import existing event",
    "Generate event ideas based on community topic"
  ]
}
```

**Actions:**
- [ ] Create `LeapyContext` with current page state
- [ ] Update Leapy component to read context
- [ ] Create suggestion library per page/section
- [ ] Add quick action buttons in Leapy panel

---

#### 2. **Role-Based View Toggle** ⚡ CRITICAL
**Problem:** Creator and Learner see the same thing
**Files to modify:**
- `/App.tsx`
- `/components/AppLayout.tsx`
- All list view components

**What to build:**
```typescript
// Top right toggle (next to Leapy icon)
<RoleToggle 
  current={userMode}
  onChange={setUserMode}
/>

// Filter content based on role
if (userMode === 'creator') {
  communities = communities.filter(c => c.role === 'admin' || c.role === 'moderator')
} else {
  communities = communities.filter(c => c.role === 'member')
}

// Different CTAs
{userMode === 'creator' ? (
  <Button>Create Community</Button>
) : (
  <Button>Browse Communities</Button>
)}
```

**Actions:**
- [ ] Add role toggle in AppLayout header
- [ ] Update all list views with role filtering
- [ ] Create different empty states per role
- [ ] Update Leapy suggestions per role

---

### Priority 1B: Management Functionality

#### 3. **Member Management UI** ⚡ CRITICAL
**Location:** Inside Community Builder → Members section
**File:** `/components/CommunityBuilderView.tsx`

**What to build:**
```
┌─────────────────────────────────────────┐
│ Members (127)            [+ Invite]     │
├─────────────────────────────────────────┤
│ 🔍 Search members...   [Role ▼] [•••]  │
├─────────────────────────────────────────┤
│ ┌───────────────────────────────────┐   │
│ │ 👤 Sarah Johnson    │  Admin   │▼│   │
│ │    Joined 2 weeks ago              │   │
│ │    Last active: 2 hours ago        │   │
│ └───────────────────────────────────┘   │
│ ┌───────────────────────────────────┐   │
│ │ 👤 Mike Chen        │ Moderator │▼│   │
│ │    Joined 1 month ago              │   │
│ │    Last active: 1 day ago          │   │
│ └───────────────────────────────────┘   │
│ ┌───────────────────────────────────┐   │
│ │ 👤 Emma Davis       │  Member   │▼│   │
│ │    Joined 3 days ago               │   │
│ │    Last active: 5 minutes ago      │   │
│ └───────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Features:**
- [ ] Member list with avatars
- [ ] Role badges (Admin/Moderator/Member)
- [ ] Last active timestamp
- [ ] Dropdown per member:
  - Change role
  - Send message
  - Remove from community
- [ ] Bulk actions (select multiple)
- [ ] Invite modal with email/link
- [ ] Pending approvals section (if required)

---

#### 4. **Student Management UI** ⚡ CRITICAL
**Location:** Inside Course Builder → Students section
**File:** `/components/CourseBuilderViewV3.tsx`

**What to build:**
```
┌─────────────────────────────────────────┐
│ Students (342)           [+ Enroll]     │
├─────────────────────────────────────────┤
│ 🔍 Search...   [Progress ▼] [Status ▼] │
├─────────────────────────────────────────┤
│ ┌───────────────────────────────────┐   │
│ │ 👤 Alex Kim      │ 89% │ Active │▼│   │
│ │    Enrolled: Jan 15, 2024          │   │
│ │    █████████████░░░░ 23/26 lessons │   │
│ └───────────────────────────────────┘   │
│ ┌───────────────────────────────────┐   │
│ │ 👤 Lisa Tran     │ 34% │ Active │▼│   │
│ │    Enrolled: Feb 3, 2024           │   │
│ │    ██████░░░░░░░░░░ 9/26 lessons   │   │
│ └───────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Features:**
- [ ] Student list with progress bars
- [ ] Filter by completion status
- [ ] Individual student detail view
- [ ] Send message to student
- [ ] Award certificate button
- [ ] Export student data
- [ ] Engagement metrics per student

---

#### 5. **Attendee Management UI** ⚡ CRITICAL
**Location:** Inside Event Builder → Attendees section
**File:** `/components/EventBuilderViewV2.tsx`

**What to build:**
```
┌─────────────────────────────────────────┐
│ Attendees (87/100)      [+ Add Guest]   │
├─────────────────────────────────────────┤
│ Registered (87) │ Checked-In (0) │ ... │
├─────────────────────────────────────────┤
│ 🔍 Search...              [Export CSV]  │
├─────────────────────────────────────────┤
│ ┌───────────────────────────────────┐   │
│ │ ✅ Sarah Johnson  │ Registered │▼│   │
│ │    Registered: Mar 1             │   │
│ │    Email: sarah@example.com      │   │
│ └───────────────────────────────────┘   │
│ ┌───────────────────────────────────┐   │
│ │ ⏸️  Mike Wilson    │ Waitlist   │▼│   │
│ │    Waitlisted: Mar 15            │   │
│ │    Email: mike@example.com       │   │
│ └───────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Features:**
- [ ] Attendee list with status
- [ ] Check-in toggle
- [ ] Waitlist management
- [ ] Send email to attendees (all/selected)
- [ ] Export attendee list
- [ ] QR code for self check-in
- [ ] Attendance tracking

---

## 🔗 Phase 2: Interconnections (Week 2)

### Priority 2: Content Linking Flow

#### 6. **Link Course to Community**
**Location:** Course Builder → Community Link section

**Flow:**
```
┌─────────────────────────────────────┐
│ Community Connection                │
├─────────────────────────────────────┤
│ This course is linked to:           │
│ ┌─────────────────────────────────┐ │
�� │ 🏘️  React Developers Hub        │ │
│ │     1,247 members               │ │
│ │     [View Community] [Unlink]   │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Or link to different community:     │
│ [Select Community ▼]                │
│ [Create New Community]              │
└─────────────────────────────────────┘
```

**Actions:**
- [ ] Dropdown to select existing community
- [ ] Button to create new community from course
- [ ] Show linked community info
- [ ] Unlink option
- [ ] Settings: who can access (all members/paid only)

---

#### 7. **Link Event to Community**
**Location:** Event Builder → Community Link section

**Flow:**
```
┌─────────────────────────────────────┐
│ Community Connection                │
├─────────────────────────────────────┤
│ ⚠️  This event is standalone        │
│                                     │
│ [Link to Existing Community]        │
│ [Create Community from Event]       │
│                                     │
│ 💡 Tip: Events in communities get   │
│    3x more registrations!           │
└─────────────────────────────────────┘
```

**The Hook Implementation:**
- [ ] After event reaches 50 registrations → Leapy suggests community
- [ ] After event ends → prompt to create community
- [ ] One-click community creation with auto-settings
- [ ] Auto-invite attendees to community

---

#### 8. **Browse Community Content**
**Location:** Community Builder → Courses/Events sections

**Courses Tab:**
```
┌─────────────────────────────────────┐
│ Courses in this Community    [+ Add]│
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 📚 Master React & TypeScript    │ │
│ │    342 students • 45 lessons    │ │
│ │    [View] [Edit] [Remove]       │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 📚 UI/UX Design Fundamentals    │ │
│ │    567 students • 32 lessons    │ │
│ │    [View] [Edit] [Remove]       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Add Existing Course]               │
│ [Create New Course]                 │
└─────────────────────────────────────┘
```

**Actions:**
- [ ] List all courses in community
- [ ] Add existing course dropdown
- [ ] Create new course button (opens ChatFlow)
- [ ] Remove course from community
- [ ] Settings: public/members-only per course

---

## 🎨 Phase 3: Rich Content (Week 3)

### Priority 3: Content Creation & Editing

#### 9. **Rich Text Editor**
**Needed in:**
- Community About section
- Event Details
- Course Lesson content
- Discussion posts

**Component to build:**
```typescript
<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Write something..."
  features={[
    'bold', 'italic', 'underline',
    'heading', 'list', 'link',
    'image', 'video', 'code'
  ]}
/>
```

**Library options:**
- TipTap (recommended)
- Lexical
- Slate

**Actions:**
- [ ] Choose and install library
- [ ] Create RichTextEditor component
- [ ] Add image upload handling
- [ ] Add video embed
- [ ] Style to match design system

---

#### 10. **Course Curriculum Builder**
**Location:** Course Builder → Curriculum section

**UI:**
```
┌─────────────────────────────────────┐
│ Course Curriculum        [+ Module] │
├─────────────────────────────────────┤
│ ▼ Module 1: Introduction            │
│   ├─ 📄 What is React?     [Edit]   │
│   ├─ 🎥 Setup Environment  [Edit]   │
│   └─ ✅ Quiz: Basics       [Edit]   │
│                                     │
│ ▼ Module 2: Components              │
│   ├─ 📄 Functional Components       │
│   ├─ 🎥 Class Components            │
│   ├─ 📄 Props & State               │
│   └─ 💻 Assignment: Build Component │
│                                     │
│ [+ Add Module]                      │
└─────────────────────────────────────┘
```

**Features:**
- [ ] Drag-and-drop reordering
- [ ] Collapsible modules
- [ ] Add lesson types (video/text/quiz/assignment)
- [ ] Lesson duration estimate
- [ ] Preview lesson
- [ ] Drip scheduling

---

#### 11. **Event Agenda Builder**
**Location:** Event Builder → Schedule section

**UI:**
```
┌─────────────────────────────────────┐
│ Event Agenda            [+ Add Item]│
├─────────────────────────────────────┤
│ 2:00 PM - 2:15 PM                   │
│ 🎤 Welcome & Introductions          │
│ Speaker: Sarah Johnson              │
│ [Edit] [Delete]                     │
│                                     │
│ 2:15 PM - 3:00 PM                   │
│ 💻 React 18 New Features            │
│ Speaker: Mike Chen                  │
│ [Edit] [Delete]                     │
│                                     │
│ 3:00 PM - 3:15 PM                   │
│ ☕ Break                             │
│ [Edit] [Delete]                     │
└─────────────────────────────────────┘
```

**Features:**
- [ ] Time slot picker
- [ ] Session title & description
- [ ] Speaker assignment
- [ ] Session type (talk/workshop/break/Q&A)
- [ ] Drag-and-drop reordering
- [ ] Export as PDF/iCal

---

## 📊 Phase 4: Analytics (Week 4)

### Priority 4: Basic Metrics

#### 12. **Community Analytics**
**Location:** Community Builder → Analytics section

**Metrics to show:**
```
┌─────────────────────────────────────┐
│ Community Health                    │
├─────────────────────────────────────┤
│ ┌───────────┬───────────┬─────────┐ │
│ │ 1,247     │ 156 new   │ 78%     │ │
│ │ Members   │ this week │ Active  │ │
│ └───────────┴───────────┴─────────┘ │
│                                     │
│ Member Growth (Last 30 days)        │
│ ┌─────────────────────────────────┐ │
│ │        ╱╲                        │ │
│ │      ╱    ╲    ╱╲                │ │
│ │    ╱        ╲╱    ╲              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Top Contributors                    │
│ 1. Sarah J. - 45 posts              │
│ 2. Mike C.  - 38 posts              │
│ 3. Emma D.  - 32 posts              │
└─────────────────────────────────────┘
```

**Actions:**
- [ ] Member count over time chart
- [ ] Activity metrics (posts/day)
- [ ] Engagement rate
- [ ] Top contributors list
- [ ] Cohort retention

---

#### 13. **Course Analytics**
**Metrics to show:**
- Enrollment funnel
- Completion rate
- Average time per lesson
- Drop-off points
- Student satisfaction
- Revenue (if paid)

---

#### 14. **Event Analytics**
**Metrics to show:**
- Registration funnel
- Attendance rate
- Engagement (if virtual)
- Feedback scores
- Revenue
- Geographic distribution

---

## 🔍 Phase 5: Search & Discovery (Week 5)

### Priority 5: Navigation & Findability

#### 15. **Global Search**
**Location:** Top navigation bar

**Features:**
- [ ] Search across all content types
- [ ] Recent searches
- [ ] Suggested results
- [ ] Keyboard shortcut (Cmd+K)
- [ ] Filter by type (communities/courses/events)

---

#### 16. **Smart Filters**
**For each list view:**

**Communities:**
- Category (tech/design/business)
- Size (small/medium/large)
- Activity level
- Price (free/paid)

**Courses:**
- Level (beginner/intermediate/advanced)
- Duration
- Price
- Completion rate

**Events:**
- Date range
- Location type (virtual/in-person/hybrid)
- Category
- Price

---

## 💳 Phase 6: Monetization (Weeks 6-8)

### Priority 6: Payment Integration

#### 17. **Pricing Settings**
**For Communities:**
- Free
- One-time fee
- Subscription (monthly/yearly)
- Tiered memberships

**For Courses:**
- Free
- One-time purchase
- Subscription access
- Bundle pricing

**For Events:**
- Free
- Paid ticket
- Multiple ticket types
- Early bird pricing

---

#### 18. **Stripe Integration**
- [ ] Connect Stripe account
- [ ] Payment forms
- [ ] Receipt emails
- [ ] Refund handling
- [ ] Revenue dashboard

---

## 📱 Phase 7: Mobile Optimization (Weeks 9-10)

### Priority 7: Responsive Design

#### 19. **Mobile Layouts**
- [ ] Stack 2/3 + 1/3 layout vertically on mobile
- [ ] Collapsible sidebar navigation
- [ ] Touch-optimized buttons
- [ ] Mobile-friendly forms
- [ ] Swipe gestures

---

## 🎓 Phase 8: Learner Experience (Weeks 11-12)

### Priority 8: Student/Attendee Views

#### 20. **Course Player**
**For enrolled students:**
- [ ] Video player with controls
- [ ] Lesson sidebar
- [ ] Progress tracking
- [ ] Note-taking
- [ ] Bookmarking
- [ ] Download resources
- [ ] Q&A per lesson

---

#### 21. **Event Waiting Room**
**Before event starts:**
- [ ] Countdown timer
- [ ] Event details
- [ ] Join button (appears when ready)
- [ ] Chat with other attendees
- [ ] Test audio/video

---

## 📝 Documentation Tasks

### Must Create:

1. **Component Library Doc**
```markdown
# Button Component
## Usage
<Button variant="primary" size="md">Click me</Button>

## Props
- variant: 'primary' | 'secondary' | 'ghost'
- size: 'sm' | 'md' | 'lg'
- disabled: boolean

## States
- Default
- Hover
- Active
- Disabled
```

2. **Design Tokens**
```css
/* colors.css */
--color-primary: #420D74;
--color-primary-hover: #350a5f;
--color-success: #10B981;
/* ... */
```

3. **Page Structure Map**
```
Communities List
├── Header (title + CTA)
├── Tabs
├── Search Bar
├── Main Content (2/3)
│   └── Community Cards Grid
└── Sidebar (1/3)
    ├── Needs Attention
    ├── Today's Schedule
    ├── Quick Actions
    └── Health Overview
```

---

## 🎯 Immediate Next Steps (Today)

### Choose One Path:

**Option A: Finish Hover Fix**
- [ ] Remove purple hover from Communities titles
- [ ] Remove purple hover from Courses titles
- [ ] Test all three dashboards

**Option B: Start Phase 1**
- [ ] Implement Leapy context awareness
- [ ] Add role toggle to AppLayout
- [ ] Show different content per role

**Option C: Document First**
- [ ] Create component inventory
- [ ] Map current state vs needed state
- [ ] Define exact scope for engineering

**Which path do you want to take?**

---

## 📞 Questions for You:

1. **Timeline:** How much time do we have? Are we aiming for MVP or full product?
2. **Team:** Is there a backend team? Or is this frontend only with mock data?
3. **Priority:** What's most important - depth in one area or breadth across all?
4. **User Testing:** When do real users see this? That should drive priorities.
5. **Launch Goal:** What does "done" look like for initial launch?

---

**Ready to dive deep into any section. What's your priority?** 🚀

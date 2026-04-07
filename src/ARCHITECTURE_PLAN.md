# 🏗️ Leapy AI - Complete Architecture Plan

## 📋 Overview
Building a unified course/community/event creation platform with consistent AI-powered flows and navigation.

---

## 🎯 Core Principles

### ✅ What's Perfect (DON'T TOUCH):
- **Community Creation Flow**: Welcome → ChatFlow → CommunityGenerationPreview → CommunityBuilderView
- **3-Step AI Chat**: The conversational approach for gathering requirements
- **Visual Language**: Purple gradients (#420D74), clean cards, status badges
- **Copilot Integration**: Context-aware AI assistant

### 🔄 What Needs Consistency:
- **Courses**: Should follow the same 3-step AI chat pattern
- **Events**: Should follow the same 3-step AI chat pattern

### ❌ What to Remove:
- `CopilotShowcase.tsx` - Not needed anymore
- `StandaloneEventCreator.tsx` - Replace with ChatFlow approach
- Separate EventsMarketplace - Integrate into EventsListView
- Any redundant marketplace code

---

## 🗺️ Navigation Structure

```
┌─────────────────────────────────────────────────────────┐
│ AppLayout (Universal Sidebar + Header)                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  🏠 Home                                                 │
│     → HomeOverview (Build Later)                        │
│     → Dashboard showing all content at a glance         │
│                                                          │
│  ➕ New                                                  │
│     → WelcomeScreen (Prompt Page)                       │
│     → Main entry point for creating anything            │
│                                                          │
│  👥 Communities                                          │
│     → CommunitiesListView                               │
│     → Tabs: All | My Communities | Member Of |          │
│               Moderator | Admin | Drafts                │
│                                                          │
│  📚 Courses                                              │
│     → CoursesListView                                   │
│     → Tabs: All | My Courses | Enrolled | Teaching |    │
│               Drafts                                     │
│                                                          │
│  📅 Events                                               │
│     → EventsListView                                    │
│     → Tabs: All Events | My Events | Registered |       │
│               Attending | Drafts                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Unified Creation Flow

### Pattern (Same for All Types):

```
1️⃣ WELCOME SCREEN
   ├── User types: "Create a course about React"
   ├── OR clicks: "Create my course" button
   └── System detects intent → routes to ChatFlow

2️⃣ CHATFLOW (3-Step AI Conversation)
   ├── Step 1: Understand intent & context
   │   "Tell me about your React course..."
   ├── Step 2: Gather specific details
   │   "Who is your target audience? What's the format?"
   └── Step 3: Confirm & generate structure
       "Great! I'll create your course with 5 modules..."

3️⃣ GENERATION PREVIEW (Loading → Preview)
   ├── Shows animated generation process
   ├── Displays what's being created
   ├── Gives option to edit or proceed
   └── "Continue to Builder" button

4️⃣ BUILDER VIEW (Management Dashboard)
   ├── Full editor for the created item
   ├── Copilot available on all pages
   ├── Settings, members, content, etc.
   └── Analytics and insights
```

---

## 📦 Components to Build

### 🆕 New Components (Priority Order):

#### 1. List Views
**File**: `/components/CommunitiesListView.tsx`
```
- Header with title "Communities" + Create button
- Tab navigation: All | My Communities | Member Of | Moderator | Admin | Drafts
- Search & filter bar
- Grid of community cards:
  - Grey placeholder image
  - Title, description preview
  - Member count, activity status
  - Role badge (Admin/Moderator/Member)
  - Draft status if applicable
- Empty states for each tab
- Click card → Navigate to CommunityBuilderView
```

**File**: `/components/CoursesListView.tsx`
```
- Header with title "Courses" + Create button
- Tab navigation: All | My Courses | Enrolled | Teaching | Drafts
- Search & filter bar
- Grid of course cards:
  - Grey placeholder image
  - Title, description preview
  - Student count, lesson count
  - Progress bar (if enrolled)
  - Status badge (Published/Draft)
- Empty states
- Click card → Navigate to CourseBuilderView
```

**File**: `/components/EventsListView.tsx`
```
- Header with title "Events" + Create button
- Tab navigation: All Events | My Events | Registered | Attending | Drafts
- Search & filter bar (date, category, virtual/in-person)
- Grid of event cards:
  - Grey placeholder image
  - Title, date/time
  - Location (virtual/in-person)
  - Attendee count
  - Status badge (Upcoming/Past/Draft)
  - Registration status
- Empty states
- Click card → Navigate to EventBuilderView
```

#### 2. Generation Preview Screens

**File**: `/components/CourseGenerationPreview.tsx`
```
- Similar visual style to CommunityGenerationPreview
- Loading animation with AI-generating message
- Preview of course structure:
  - Title, description
  - Module list
  - Lesson count
  - Estimated completion time
- "Continue to Course Builder" button
```

**File**: `/components/EventGenerationPreview.tsx`
```
- Similar visual style to CommunityGenerationPreview
- Loading animation
- Preview of event details:
  - Title, description
  - Date, time, location
  - Expected attendees
  - Community connection (if applicable)
- "Continue to Event Builder" button
```

#### 3. Builder View

**File**: `/components/EventBuilderView.tsx`
```
- Similar structure to CommunityBuilderView
- Sidebar with sections:
  - Overview
  - Details
  - Schedule
  - Attendees
  - Community (The Hook!)
  - Promotion (AI Engine)
  - Settings
- Main content area
- Copilot integration
- Save/Publish actions
```

#### 4. Home Overview (Placeholder for now)

**File**: `/components/HomeOverview.tsx`
```
- Welcome message
- Quick stats cards:
  - Total communities
  - Total courses
  - Total events
  - Total members/students
- Recent activity feed
- Quick actions
- Coming soon message
```

---

## 🔄 Updated App.tsx Flow

### Stages:
```typescript
type Stage = 
  | 'home'                    // HomeOverview
  | 'welcome'                 // WelcomeScreen (prompt page)
  | 'chat'                    // ChatFlow (3-step AI)
  
  // Communities
  | 'communities-list'        // CommunitiesListView
  | 'community-preview'       // CommunityGenerationPreview
  | 'community-builder'       // CommunityBuilderView
  
  // Courses
  | 'courses-list'            // CoursesListView
  | 'course-preview'          // CourseGenerationPreview
  | 'course-builder'          // BuilderView (CourseBuilderView)
  
  // Events
  | 'events-list'             // EventsListView
  | 'event-preview'           // EventGenerationPreview
  | 'event-builder'           // EventBuilderView
```

### Routing Logic:
```
Navigation Click:
- "Home" → stage: 'home'
- "+ New" → stage: 'welcome'
- "Communities" → stage: 'communities-list'
- "Courses" → stage: 'courses-list'
- "Events" → stage: 'events-list'

From Welcome Screen:
- Submit prompt with detected type → stage: 'chat'

From ChatFlow:
- Course completed → stage: 'course-preview'
- Community completed → stage: 'community-preview'
- Event completed → stage: 'event-preview'

From Preview:
- Continue button → stage: '[type]-builder'

From List View:
- Click card → stage: '[type]-builder' (with ID)
- Create button → stage: 'welcome' or 'chat'
```

---

## 🎨 Visual Language Reference

### Colors:
```
Primary Purple: #420D74
Hover Purple: #5a1293
Purple Light: #f3e8ff (backgrounds)
Purple Border: #e9d5ff

Status Colors:
- Draft: #6B7280 (grey)
- Published: #10B981 (green)
- Active: #3B82F6 (blue)
- Archived: #EF4444 (red)
```

### Card Design:
```
- Border radius: 12px
- Border: 1px solid gray-200
- Hover: shadow-lg, scale-105
- Padding: 24px
- Background: white
- Image placeholder: bg-gray-200
```

### Typography:
```
- Headings: font-bold, text-gray-900
- Body: text-gray-600
- Labels: text-sm, text-gray-500
- Buttons: font-medium
```

### Status Badges:
```
- Pill shape: rounded-full
- Small: px-2 py-1, text-xs
- Color-coded by status
- Icon + text
```

---

## 📝 Implementation Order

### Phase 1: Navigation & Structure (Day 1)
1. ✅ Update App.tsx with all stages
2. ✅ Update AppLayout navigation handlers
3. ✅ Create HomeOverview placeholder
4. ✅ Test navigation flow

### Phase 2: List Views (Day 1-2)
1. ✅ Create CommunitiesListView
2. ✅ Create CoursesListView
3. ✅ Create EventsListView
4. ✅ Add mock data for each
5. ✅ Test card clicks → builder views

### Phase 3: Preview Screens (Day 2)
1. ✅ Create CourseGenerationPreview
2. ✅ Create EventGenerationPreview
3. ✅ Update ChatFlow to route to correct preview
4. ✅ Test full creation flow

### Phase 4: Event Builder (Day 2-3)
1. ✅ Create EventBuilderView
2. ✅ Add all sections (details, schedule, attendees, etc.)
3. ✅ Integrate copilot
4. ✅ Add The Hook (community auto-join)
5. ✅ Add AI Promotion Engine

### Phase 5: Cleanup (Day 3)
1. ✅ Remove CopilotShowcase.tsx
2. ✅ Remove StandaloneEventCreator.tsx
3. ✅ Remove redundant marketplace code
4. ✅ Update imports across app
5. ✅ Test all flows end-to-end

### Phase 6: Polish (Day 3)
1. ✅ Add empty states
2. ✅ Add loading states
3. ✅ Add error handling
4. ✅ Ensure consistent spacing/styling
5. ✅ Final QA

---

## 🗂️ File Structure

```
/components
├── AppLayout.tsx ✅ (update navigation)
├── WelcomeScreen.tsx ✅ (keep as-is)
├── ChatFlow.tsx ✅ (update for events)

├── HomeOverview.tsx ❌ (NEW - placeholder)

├── CommunitiesListView.tsx ❌ (NEW)
├── CommunityGenerationPreview.tsx ✅ (keep)
├── CommunityBuilderView.tsx ✅ (keep)

├── CoursesListView.tsx ❌ (NEW)
├── CourseGenerationPreview.tsx ❌ (NEW)
├── BuilderView.tsx ✅ (refine as CourseBuilderView)

├── EventsListView.tsx ❌ (NEW)
├── EventGenerationPreview.tsx ❌ (NEW)
├── EventBuilderView.tsx ❌ (NEW)

├── CopilotShowcase.tsx ❌ (DELETE)
├── StandaloneEventCreator.tsx ❌ (DELETE)
├── EventsMarketplace.tsx ❌ (DELETE or refactor into EventsListView)
├── PublicEventLanding.tsx ⚠️ (keep for registration flow)
├── EventsCRM.tsx ⚠️ (keep, integrate into EventBuilderView)

└── /ui ✅ (keep all)
```

---

## 🎯 Key Features Per View

### List Views (All 3):
- [ ] Tab navigation
- [ ] Search bar
- [ ] Filter dropdown
- [ ] Sort options
- [ ] Grid/list toggle
- [ ] Empty states
- [ ] Create button
- [ ] Card hover effects
- [ ] Status badges
- [ ] Role indicators

### Builder Views:
- [ ] Sidebar navigation
- [ ] Main content area
- [ ] Copilot panel toggle
- [ ] Save/Publish buttons
- [ ] Settings modal
- [ ] Analytics tab
- [ ] Member/Attendee management
- [ ] Preview mode

### Preview Screens:
- [ ] Loading animation
- [ ] AI generating message
- [ ] Content preview
- [ ] Edit button
- [ ] Continue button
- [ ] Back to chat option

---

## 🚀 Success Criteria

✅ **Navigation**: Clicking each nav item takes you to the correct view
✅ **Creation Flow**: All 3 types follow the same ChatFlow → Preview → Builder pattern
✅ **List Views**: Show mock data, tabs work, cards are clickable
✅ **Builders**: Can access and edit created items
✅ **Visual Consistency**: All views follow the same design language
✅ **No Images**: All use grey placeholders
✅ **No Redundancy**: Old code cleaned up

---

## 💭 Open Questions

1. **HomeOverview**: What metrics/widgets should we show? (Build later)
2. **List View Data**: Where does real data come from? (Mock for now)
3. **Builder IDs**: How do we handle routing with IDs? (State management)
4. **Permissions**: How do we determine user roles? (Mock for now)
5. **EventsCRM**: Integrate into EventBuilderView or keep separate?

---

## 📌 Notes

- Keep community flow EXACTLY as-is
- Match visual language precisely
- Grey placeholders for all images
- Copilot available everywhere
- Focus on consistency over features
- Build incrementally, test often

---

**Ready to start implementation!** 🎉

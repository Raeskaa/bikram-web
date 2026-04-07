# 🧩 Component Architecture & Design System

## 📦 Component Inventory

### GLOBAL COMPONENTS (Used across entire app)

#### `/components/AppLayout.tsx`
**Purpose:** Global chrome wrapper
**Props:**
```typescript
{
  children: ReactNode
  currentPage: 'home' | 'drafts' | 'communities' | 'events' | 'courses' | 'settings'
  showBanner: boolean
  onNewClick: () => void
  onNavClick: (page) => void
  copilotOpenByDefault: boolean
  copilotContext: 'course' | 'community' | 'general' | 'event'
}
```
**Renders:**
- Purple banner (dismissible)
- Top bar (logo, search, notifications, Leapy toggle, sign-in)
- Left sidebar (navigation)
- Main content area (children)
- Leapy panel (CopilotPanel)

**State:**
- sidebarOpen (local)
- copilotOpen (local)

**Issues:**
- ❌ Search is non-functional
- ❌ Notifications are non-functional
- ❌ Stats widget (33/45) is hardcoded
- ❌ User avatar not implemented
- ❌ Settings link exists but not in sidebar

---

#### `/components/CopilotPanel.tsx`
**Purpose:** Leapy AI assistant sidebar
**Context:** Uses `CopilotContext` from `/contexts/CopilotContext.tsx`
**Current Features:**
- Tab navigation (Leapy AI, Quick Actions, Resources)
- Contextual suggestions based on `copilotContext` prop
- Input field for questions

**Missing:**
- ❌ Not actually context-aware (suggestions are static)
- ❌ Can't execute actions
- ❌ No chat history
- ❌ No AI responses (just placeholder)
- ❌ Doesn't read current page state

**Needs:**
- ✅ LeapyContext integration
- ✅ Action execution system
- ✅ Suggestion generation engine
- ✅ Real AI integration (API call)

---

### LIST VIEW COMPONENTS

Pattern: `2/3 content + 1/3 actionable sidebar`

#### `/components/CommunitiesListView.tsx`
**Sections:**
- Header (title, description, create button)
- Search and filters
- Tabs (All | My Communities | Member Of | Moderator | Admin | Drafts)
- Main content area (2-column grid of community cards)
- Right sidebar (actionable items)

**Card Data:**
```typescript
{
  id: string
  title: string
  description: string
  memberCount: number
  type: 'public' | 'private'
  role?: 'admin' | 'moderator' | 'member'
  status: 'active' | 'draft'
}
```

**Issues:**
- ❌ Tabs don't actually filter (all show same data)
- ❌ Search is non-functional
- ❌ Filter dropdown does nothing
- ❌ Grid/list toggle doesn't work
- ❌ Mock data is hardcoded
- ❌ Click handlers work but don't pass real data

**Props:**
```typescript
{
  onCommunityClick: (id: string) => void
  onCreateClick: () => void
}
```

---

#### `/components/CoursesListView.tsx`
**Same structure as CommunitiesListView**

**Tabs:** All | My Courses | Enrolled | Teaching | Drafts

**Card Data:**
```typescript
{
  id: string
  title: string
  description: string
  studentCount: number
  lessonCount: number
  progress?: number  // if enrolled
  status: 'published' | 'draft'
  role?: 'instructor' | 'student'
}
```

**Issues:** (Same as CommunitiesListView)

---

#### `/components/EventsListView.tsx`
**Same structure**

**Tabs:** All Events | My Events | Registered | Attending | Drafts

**Card Data:**
```typescript
{
  id: string
  title: string
  description: string
  date: string
  time: string
  attendeeCount: number
  capacity?: number
  location: 'virtual' | 'in-person' | 'hybrid'
  role?: 'host' | 'moderator' | 'attendee'
  status: 'upcoming' | 'past' | 'draft'
}
```

---

### BUILDER COMPONENTS (Detail Views)

Pattern: `Left sidebar navigation + Main content area + Optional Copilot`

#### `/components/CommunityBuilderView.tsx`
**Structure:**
```
┌─ Sidebar ─┬─ Main Content ──────────────┐
│ Overview  │                             │
│ About     │  Section content based on   │
│ Courses   │  activeSection state        │
│ Events    │                             │
│ Members   │                             │
│ Discussion│                             │
│ Analytics │                             │
│ Settings  │                             │
└───────────┴─────────────────────────────┘
```

**State:**
```typescript
const [activeSection, setActiveSection] = useState('overview')
const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
```

**Sections Implemented:**
- ✅ Overview (stats cards, placeholder)
- ✅ About (form fields for title, description)
- ✅ Courses (placeholder text)
- ✅ Events (placeholder text)
- ✅ Members (placeholder text)
- ✅ Discussion (DiscussionChannelV2 component)
- ✅ Analytics (placeholder)
- ✅ Settings (form fields)

**Issues:**
- ❌ Overview is just empty cards
- ❌ About section doesn't save
- ❌ Courses section: can't add/remove courses
- ❌ Events section: can't add/remove events
- ❌ Members section: can't manage members
- ❌ Discussion: posts don't persist
- ❌ Analytics: no real data
- ❌ Settings: changes don't save

---

#### `/components/CourseBuilderViewV3.tsx`
**Structure:** Similar sidebar + content

**Sections:**
- ✅ Overview
- ✅ Curriculum (placeholder)
- ✅ Students (placeholder)
- ✅ Settings

**Issues:**
- ❌ Curriculum: can't add modules/lessons
- ❌ Students: can't see student list
- ❌ No lesson editor
- ❌ No quiz builder
- ❌ No assignment creator

---

#### `/components/EventBuilderViewV2.tsx`
**Structure:** Similar sidebar + content

**Sections:**
- ✅ Overview
- ✅ Details
- ✅ Schedule (placeholder)
- ✅ Attendees (placeholder)
- ✅ Community (placeholder)
- ✅ Promotion (placeholder)
- ✅ Settings

**Issues:**
- ❌ Schedule: can't build agenda
- ❌ Attendees: can't see list or manage
- ❌ Community: can't link/unlink
- ❌ Promotion: empty

---

### PREVIEW COMPONENTS (Generation Screens)

Pattern: `Animated loading → Data preview → Continue button`

#### `/components/CommunityGenerationPreview.tsx`
**Features:**
- ✅ Loading animation (simulated AI generation)
- ✅ Preview of generated community data
- ✅ Continue button

**Props:**
```typescript
{
  communityData: Partial<CommunityData>
  onComplete: () => void
}
```

**Works well, just needs:**
- Better animation
- Real loading states from API

---

#### `/components/CourseGenerationPreview.tsx`
**Same pattern**

**Props:**
```typescript
{
  courseData: Partial<CourseData>
  onComplete: () => void
}
```

---

#### `/components/EventGenerationPreview.tsx`
**Same pattern**

**Props:**
```typescript
{
  eventData: Partial<EventData>
  onComplete: () => void
}
```

---

### CHAT/AI COMPONENTS

#### `/components/WelcomeScreen.tsx`
**Purpose:** Entry point for creation
**Features:**
- ✅ Mode toggle (Creator/Learner)
- ✅ Version selector (v1-v8)
- ✅ Prompt input
- ✅ Example prompts
- ✅ Start button

**Props:**
```typescript
{
  onStart: (prompt: string, mode, type) => void
  onVersionChange: (version: AppVersion) => void
  currentVersion: AppVersion
  userMode: 'creator' | 'learner'
  onModeChange: (mode) => void
  onOpenEventsMarketplace: () => void
  onOpenEventCreator: () => void
  onOpenCRM: () => void
}
```

---

#### `/components/ChatFlow.tsx`
**Purpose:** 3-step AI conversation
**Features:**
- ✅ Message rendering (user + assistant)
- ✅ Thinking steps visualization
- ✅ Input field
- ✅ Mode toggle
- ✅ Generates data from conversation

**Props:**
```typescript
{
  conversation: Conversation
  onUpdateConversation: (conv: Conversation) => void
  onCourseComplete: (data: Partial<CourseData>) => void
  onCommunityComplete: (data: Partial<CommunityData>) => void
  onEventComplete: (data: Partial<EventData>) => void
  contentType: 'course' | 'community' | 'event'
  appVersion: AppVersion
  onVersionChange: (v: AppVersion) => void
  userMode: 'creator' | 'learner'
  onModeChange: (mode) => void
}
```

**Issues:**
- ❌ AI responses are simulated (not real API)
- ❌ Limited to predefined flow
- ❌ Can't handle complex prompts
- ❌ No error handling

---

### UI PRIMITIVE COMPONENTS (shadcn/ui)

Located in `/components/ui/`

**Available:**
- ✅ Button
- ✅ Badge
- ✅ Card
- ✅ Dialog
- ✅ Dropdown Menu
- ✅ Input
- ✅ Textarea
- ✅ Select
- ✅ Tabs
- ✅ Switch
- ✅ Checkbox
- ✅ Progress
- ✅ Avatar
- ✅ Alert
- ✅ Accordion
- ✅ Popover
- ✅ Toast (Sonner)
- ✅ Tooltip
- ✅ Calendar
- ✅ Command (search)
- ✅ Sheet (slide-over)
- ✅ Skeleton (loading)

**Missing/Needed:**
- ❌ Rich Text Editor
- ❌ File Uploader (drag-drop)
- ❌ Date Range Picker
- ❌ Time Picker
- ❌ Color Picker
- ❌ Tags Input
- ❌ Multi-Select
- ❌ Data Table (complex)
- ❌ Chart components (beyond basic)

---

## 🎨 Design System

### Colors

**Brand:**
```css
--primary: #420D74         /* Main purple */
--primary-hover: #350a5f   /* Darker purple */
--primary-light: #f3e8ff   /* Light purple bg */
--primary-border: #e9d5ff  /* Light purple border */
```

**Status:**
```css
--success: #10B981    /* Green */
--warning: #F59E0B    /* Yellow */
--error: #EF4444      /* Red */
--info: #3B82F6       /* Blue */
```

**Neutral:**
```css
--gray-50: #F9FAFB
--gray-100: #F3F4F6
--gray-200: #E5E7EB
--gray-300: #D1D5DB
--gray-400: #9CA3AF
--gray-500: #6B7280
--gray-600: #4B5563
--gray-700: #374151
--gray-800: #1F2937
--gray-900: #111827
```

### Typography

**Headings:**
- H1: 36px, bold, gray-900
- H2: 24px, bold, gray-900
- H3: 20px, semibold, gray-900
- H4: 16px, semibold, gray-900

**Body:**
- Base: 14px, gray-600
- Small: 12px, gray-500
- Large: 16px, gray-700

**Code:**
- Font: Monaco, monospace
- Size: 14px
- Background: gray-100

### Spacing

**Scale:** 4px base unit
```
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
```

### Border Radius

```
sm: 4px   (buttons, badges)
md: 8px   (inputs, small cards)
lg: 12px  (cards, modals)
xl: 16px  (large cards)
2xl: 24px (hero sections)
full: 9999px (pills, avatars)
```

### Shadows

```
sm: 0 1px 2px rgba(0,0,0,0.05)
md: 0 4px 6px rgba(0,0,0,0.1)
lg: 0 10px 15px rgba(0,0,0,0.1)
xl: 0 20px 25px rgba(0,0,0,0.1)
```

### Animation

**Transitions:**
```css
--transition-fast: 150ms
--transition-base: 200ms
--transition-slow: 300ms
```

**Easing:**
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
```

---

## 📋 Component Patterns

### List View Pattern

**File Structure:**
```typescript
export function XListView({ onItemClick, onCreateClick }) {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
  const filteredItems = filterItems(mockData, activeTab, searchQuery)
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1>Title</h1>
            <p className="text-gray-600">Description</p>
          </div>
          <Button onClick={onCreateClick}>Create</Button>
        </div>
        
        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          <input type="text" placeholder="Search..." />
          <button>Filter</button>
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white border-b px-8">
        <Tabs value={activeTab} onChange={setActiveTab}>
          {tabs.map(tab => <Tab key={tab.id} {...tab} />)}
        </Tabs>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Main (2/3) */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {filteredItems.length === 0 ? (
            <EmptyState />
          ) : (
            <Grid>
              {filteredItems.map(item => (
                <Card key={item.id} onClick={() => onItemClick(item.id)}>
                  {/* Card content */}
                </Card>
              ))}
            </Grid>
          )}
        </div>
        
        {/* Sidebar (1/3) */}
        <div className="w-[420px] border-l bg-white overflow-auto">
          <ActionableSidebar />
        </div>
      </div>
    </div>
  )
}
```

### Builder View Pattern

```typescript
export function XBuilderView({ xData, onBack }) {
  const [activeSection, setActiveSection] = useState('overview')
  
  const sections = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'settings', label: 'Settings', icon: Settings },
    // ...
  ]
  
  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <button onClick={onBack}>← Back</button>
          <h2>{xData.title}</h2>
        </div>
        <nav className="p-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={activeSection === section.id ? 'active' : ''}
            >
              <section.icon />
              {section.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {activeSection === 'overview' && <OverviewSection />}
        {activeSection === 'settings' && <SettingsSection />}
        {/* ... */}
      </div>
    </div>
  )
}
```

### Preview Pattern

```typescript
export function XGenerationPreview({ xData, onComplete }) {
  const [isGenerating, setIsGenerating] = useState(true)
  
  useEffect(() => {
    // Simulate generation
    setTimeout(() => setIsGenerating(false), 3000)
  }, [])
  
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <LoadingSpinner />
        <h2>Generating your {type}...</h2>
        <ThinkingSteps steps={steps} />
      </div>
    )
  }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <PreviewCard data={xData} />
      <Button onClick={onComplete}>Continue to Builder</Button>
    </div>
  )
}
```

---

## 🔧 Component Dependencies Map

```
App.tsx
├─ AppLayout
│  ├─ TrueLeapLogo (import)
│  ├─ LeapyLogo (import)
│  └─ CopilotPanel
│     └─ CopilotContext
│
├─ WelcomeScreen
│
├─ ChatFlow
│  └─ ChatMessage
│
├─ CommunitiesListView
│  ├─ Badge (ui)
│  └─ Button (ui)
│
├─ CommunityGenerationPreview
│
├─ CommunityBuilderView
│  ├─ DiscussionChannelV2
│  ├─ CommunitySetupSteps
│  └─ Various UI components
│
├─ CoursesListView
├─ CourseGenerationPreview
├─ CourseBuilderViewV3
│
├─ EventsListView
├─ EventGenerationPreview
├─ EventBuilderViewV2
│
├─ HomeOverview
├─ MarketplaceView
├─ GlobalSettingsPage
│
├─ EventMeetingRoom
└─ MinimizedMeetWindow
```

---

## 🚨 Critical Missing Components

### 1. **MemberManagementPanel**
**Needed in:** CommunityBuilderView → Members section
**Features:**
- Member list (filterable, searchable)
- Invite modal
- Role management
- Bulk actions

### 2. **StudentManagementPanel**
**Needed in:** CourseBuilderView → Students section
**Features:**
- Student list with progress
- Individual student detail
- Messaging
- Certificate issuance

### 3. **AttendeeManagementPanel**
**Needed in:** EventBuilderView → Attendees section
**Features:**
- Attendee list
- Check-in system
- Waitlist management
- Email broadcast

### 4. **RichTextEditor**
**Needed in:** All builders (About, Details, Lesson content)
**Features:**
- Bold, italic, underline
- Headers, lists
- Links, images, videos
- Code blocks
- @mentions

### 5. **CourseCurriculumBuilder**
**Needed in:** CourseBuilderView → Curriculum section
**Features:**
- Drag-drop modules
- Drag-drop lessons
- Add lesson (video/text/quiz)
- Lesson editor modal

### 6. **EventAgendaBuilder**
**Needed in:** EventBuilderView → Schedule section
**Features:**
- Time slot picker
- Session list
- Speaker assignment
- Reordering

### 7. **LinkContentModal**
**Needed in:** Community/Course/Event builders
**Features:**
- Search existing content
- Select multiple
- Access level settings
- Preview

### 8. **AnalyticsDashboard**
**Needed in:** All builders → Analytics sections
**Features:**
- Charts (growth, engagement)
- Tables (top contributors, etc.)
- Export buttons
- Date range selector

### 9. **NotificationCenter**
**Needed in:** AppLayout (Bell icon)
**Features:**
- Notification list
- Mark as read
- Filter by type
- Action buttons

### 10. **GlobalSearch**
**Needed in:** AppLayout (Search bar)
**Features:**
- Cmd+K trigger
- Search all content types
- Recent searches
- Quick actions

---

## 📝 Component Creation Checklist

When creating a new component:

```markdown
## ComponentName

### Purpose
What does this component do?

### Location
Where does it appear in the app?

### Props
```typescript
interface Props {
  // ...
}
```

### State
What local state does it manage?

### API Calls
What data does it fetch/mutate?

### Children
What sub-components does it render?

### Events
What events does it emit?

### Accessibility
- [ ] Keyboard navigation
- [ ] ARIA labels
- [ ] Focus management

### Responsive
- [ ] Mobile layout
- [ ] Tablet layout
- [ ] Desktop layout

### Tests
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests

### Documentation
- [ ] Storybook story
- [ ] README
- [ ] JSDoc comments
```

---

## 🎯 Next Steps for Component Architecture

1. **Audit existing components** - Which ones need refactoring?
2. **Extract shared patterns** - Create base components (BaseListView, BaseBuilder)
3. **Build missing components** - Start with highest priority
4. **Document all components** - Storybook + README
5. **Create component library guide** - For engineering team

**Which component should we build first?**

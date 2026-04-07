# 🧭 NAVIGATION MAP
## TrueLeap AI - Simple Navigation Hierarchy

---

## 🌐 GLOBAL NAVIGATION STRUCTURE

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] Home | Communities | Courses | Events | Marketplace │
│                                     [+ New] [Search] [Profile]│
└─────────────────────────────────────────────────────────────┘
```

### **Global Navigation Breakdown:**

```
HOME
├─ Creator Mode
│  ├─ Dashboard (stats overview)
│  ├─ Quick actions (create new)
│  └─ Recent items
│
└─ Learner Mode
   ├─ Dashboard (learning progress)
   ├─ Continue watching
   └─ Upcoming events

COMMUNITIES
├─ Communities List (all created)
│  └─ [+ Create Community]
└─ Click Community → Community Builder

COURSES
├─ Courses List (all created)
│  └─ [+ Create Course]
└─ Click Course → Course Builder

EVENTS
├─ Events List (all created)
│  └─ [+ Create Event]
└─ Click Event → Event Builder

MARKETPLACE
└─ Browse all public content

[+ NEW] Dropdown
├─ Create Community
├─ Create Course
└─ Create Event

[PROFILE] Dropdown
├─ My Profile
├─ Settings
├─ Integrations
└─ Sign Out
```

---

## 🏗️ LOCAL NAVIGATION (Builder Views)

### **1. COMMUNITY BUILDER**

```
COMMUNITY BUILDER
│
├─ MAIN TABS (Left Sidebar)
│  ├─ Overview
│  ├─ Members
│  ├─ Events ────────────┐
│  ├─ Courses ───────────┤ (Sub-views within builder)
│  ├─ Content            │
│  ├─ Analytics          │
│  └─ Settings           │
│                        │
├─ CONTENT AREA          │
│  └─ Shows selected tab │
│                        │
└─ RIGHT COPILOT         │
   └─ Leapy AI           │
                         │
┌────────────────────────┘
│
├─ EVENTS TAB (Local)
│  ├─ View community events list
│  ├─ [Add Event] button
│  │  ├─ Link Existing Event
│  │  └─ Create New Event → AI Chat
│  └─ Event cards with actions
│
└─ COURSES TAB (Local)
   ├─ View community courses list
   ├─ [Add Course] button
   │  ├─ Link Existing Course
   │  └─ Create New Course → AI Chat
   └─ Course cards with actions
```

### **2. EVENT BUILDER**

```
EVENT BUILDER
│
├─ MAIN TABS (Left Sidebar)
│  ├─ Overview ─────────────┐ (Has "The Hook" card)
│  ├─ Schedule              │
│  ├─ Attendees             │
│  ├─ Registration          │
│  ├─ Promotion             │
│  ├─ Analytics             │
│  ├─ Settings              │
│  ├─ ──────────────────    │
│  ├─ Link to Community ────┤ (Community actions)
│  └─ Create Community ─────┘
│
├─ CONTENT AREA
│  └─ Shows selected tab
│
└─ RIGHT COPILOT
   └─ Leapy AI
```

### **3. COURSE BUILDER**

```
COURSE BUILDER
│
├─ MAIN TABS (Left Sidebar)
│  ├─ Overview ─────────────┐ (Has "The Hook" card)
│  ├─ Curriculum            │
│  ├─ Students              │
│  ├─ Pricing               │
│  ├─ Analytics             │
│  ├─ Settings              │
│  ├─ ──────────────────    │
│  ├─ Link to Community ────┤ (Community actions)
│  └─ Create Community ─────┘
│
├─ CONTENT AREA
│  └─ Shows selected tab
│     │
│     └─ CURRICULUM TAB (Local)
│        ├─ Module 1 (expandable)
│        │  ├─ Lesson 1.1
│        │  ├─ Lesson 1.2
│        │  └─ Lesson 1.3
│        ├─ Module 2 (expandable)
│        └─ Module 3 (expandable)
│
└─ RIGHT COPILOT
   └─ Leapy AI
```

---

## 🎓 LEARNER MODE NAVIGATION

### **Learner Global Navigation:**

```
HOME (Learner Dashboard)
│
MY COURSES
├─ Enrolled courses list
└─ Click course → COURSE PLAYER
   │
   ├─ Left Sidebar
   │  ├─ Module 1 (expandable)
   │  │  ├─ Lesson 1.1
   │  │  ├─ Lesson 1.2
   │  │  └─ Lesson 1.3
   │  ├─ Module 2 (expandable)
   │  └─ Module 3 (expandable)
   │
   ├─ Main Content
   │  ├─ Video Player
   │  └─ Tabs: Overview | Resources | Notes | Discussion
   │
   └─ Right Sidebar
      ├─ Progress
      ├─ Achievements
      └─ Community link

MY EVENTS
├─ Registered events list
└─ Click [Join Meeting] → EVENT MEETING ROOM
   │
   ├─ Video Grid
   ├─ Right Tabs: Chat | Participants | Q&A | Resources
   ├─ Bottom Controls
   └─ [Minimize] → Floating window (can navigate elsewhere)

MY COMMUNITIES
├─ Joined communities list
└─ Click community → COMMUNITY MEMBER VIEW
   │
   ├─ Top Tabs
   │  ├─ Feed
   │  ├─ Events (community events)
   │  ├─ Courses (community courses)
   │  ├─ Members
   │  └─ Resources
   │
   └─ Right Sidebar
      ├─ Active members
      └─ Quick stats

MARKETPLACE
└─ Browse all public content (read-only)
```

---

## 🔄 NAVIGATION PATTERNS

### **Pattern 1: Breadcrumb Style**

```
Home > Communities > "React Developers" > Events Tab
Home > Courses > "Web Dev Bootcamp" > Curriculum Tab
Home > Events > "AI Workshop" > Attendees Tab
```

### **Pattern 2: Back Button**

```
All Builders have:
[← Back] button → Returns to List View
```

### **Pattern 3: Quick Switcher**

```
[+ New] Dropdown (available everywhere):
├─ Create Community
├─ Create Course
└─ Create Event
```

### **Pattern 4: Mode Toggle**

```
[Creator ⇄ Learner] Toggle (top right):
├─ Switches entire navigation context
├─ Creator sees: Builder tools
└─ Learner sees: Consumption tools
```

---

## 📱 MOBILE NAVIGATION

```
MOBILE (Collapsed)
│
├─ ☰ Hamburger Menu
│  ├─ Home
│  ├─ Communities
│  ├─ Courses
│  ├─ Events
│  ├─ Marketplace
│  └─ Settings
│
├─ Bottom Tab Bar (when in builder)
│  ├─ Overview
│  ├─ Details
│  ├─ Analytics
│  └─ More...
│
└─ Floating [+] Button
   └─ Quick create actions
```

---

## 🎯 NAVIGATION NESTING SUMMARY

```
LEVEL 1: Global Shell
└─ Header + Main Content Area

LEVEL 2: Mode Context
├─ Creator Mode (Builders)
└─ Learner Mode (Consumption)

LEVEL 3: Section Navigation
├─ Communities / Courses / Events Lists
└─ Marketplace

LEVEL 4: Builder Navigation
├─ Left Sidebar Tabs
├─ Main Content Area
└─ Right Copilot Panel

LEVEL 5: Sub-Section Navigation
├─ Community: Events Tab, Courses Tab
├─ Course: Curriculum modules/lessons
└─ Event: Registration settings, etc.

LEVEL 6: Modals & Overlays
├─ Link to Community Modal
├─ Add Event/Course Modals
└─ AI Chat Flow (3-step)
```

---

## 🗺️ COMPLETE NESTING HIERARCHY

```
APP ROOT
│
├─ WELCOME SCREEN (entry)
│  └─ [Start] → Home or AI Chat
│
├─ HOME (authenticated)
│  ├─ Creator Dashboard
│  └─ Learner Dashboard
│
├─ COMMUNITIES
│  ├─ List View
│  │  └─ [Create] → AI Chat (3-step) → Preview → Builder
│  │
│  └─ BUILDER VIEW
│     ├─ Overview Tab
│     ├─ Members Tab
│     ├─ Events Tab
│     │  └─ [Add Event] → Modal (Link/Create)
│     ├─ Courses Tab
│     │  └─ [Add Course] → Modal (Link/Create)
│     ├─ Content Tab
│     ├─ Analytics Tab
│     └─ Settings Tab
│
├─ COURSES
│  ├─ List View
│  │  └─ [Create] → AI Chat (3-step) → Preview → Builder
│  │
│  └─ BUILDER VIEW
│     ├─ Overview Tab (with The Hook)
│     ├─ Curriculum Tab
│     │  ├─ Module 1
│     │  │  ├─ Lesson 1.1
│     │  │  ├─ Lesson 1.2
│     │  │  └─ Lesson 1.3
│     │  ├─ Module 2 (expandable)
│     │  └─ Module 3 (expandable)
│     ├─ Students Tab
│     ├─ Pricing Tab
│     ├─ Analytics Tab
│     ├─ Settings Tab
│     ├─ ──────────────
│     ├─ Link to Community → Modal
│     └─ Create Community → AI Chat
│
├─ EVENTS
│  ├─ List View
│  │  └─ [Create] → AI Chat (3-step) → Preview → Builder
│  │
│  └─ BUILDER VIEW
│     ├─ Overview Tab (with The Hook)
│     ├─ Schedule Tab
│     ├─ Attendees Tab
│     ├─ Registration Tab
│     ├─ Promotion Tab
│     ├─ Analytics Tab
│     ├─ Settings Tab
│     ├─ ──────────────
│     ├─ Link to Community → Modal
│     └─ Create Community → AI Chat
│
├─ LEARNER MODE (switch)
│  ├─ My Courses
│  │  └─ COURSE PLAYER
│  │     ├─ Left: Module/Lesson Tree
│  │     ├─ Center: Video + Tabs
│  │     └─ Right: Progress Panel
│  │
│  ├─ My Events
│  │  └─ MEETING ROOM
│  │     ├─ Full screen
│  │     └─ Minimized (floating)
│  │
│  └─ My Communities
│     └─ MEMBER VIEW
│        ├─ Feed Tab
│        ├─ Events Tab
│        ├─ Courses Tab
│        └─ Members Tab
│
├─ MARKETPLACE
│  └─ Browse view (read-only)
│
└─ SETTINGS
   ├─ General Tab
   ├─ Integrations Tab
   ├─ Notifications Tab
   ├─ Billing Tab
   ├─ Profile Tab
   └─ Security Tab
```

---

## ✅ KEY NAVIGATION RULES

1. **Always Available:**
   - Global header (Home, Communities, Courses, Events)
   - [+ New] button
   - Mode toggle (Creator ⇄ Learner)
   - Search
   - Profile menu

2. **Context-Specific:**
   - Builder left sidebar (only in builder views)
   - Copilot panel (only in builder views)
   - Back button (only when in detail/builder views)

3. **State-Dependent:**
   - "The Hook" (only when certain conditions met)
   - Community linking buttons (only in Event/Course builders)
   - Meeting controls (only in active meeting)

4. **Progressive Disclosure:**
   - Collapsed by default on mobile
   - Expandable modules in curriculum
   - Collapsible copilot panel
   - Minimized meeting window

---

*Simple Navigation Map - Last Updated: December 23, 2024*

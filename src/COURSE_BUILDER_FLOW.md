# 🎓 Course Builder - Complete User Flow

## 📍 HOW TO ACCESS

**Navigation Path:**
```
App → Courses (sidebar) → Click "Create Course with AI" → Complete 3-step chat → Course Builder opens
```

OR

```
App → Courses (sidebar) → Click existing course card → Course Builder opens
```

---

## 🎯 WHAT YOU'LL SEE

### **Course Builder Layout**

```
┌─────────────────────────────────────────────────────────────────┐
│ [← Back] Course Title                    [Preview] [Publish]    │
├──────────────┬──────────────────────────────────────────────────┤
│ 📋 Overview  │                                                  │
│              │  OVERVIEW TAB                                     │
│ 📚 Curriculum│  - Course description                            │
│  [3]         │  - Learning outcomes                             │
│              │  - Target audience                               │
│ 👥 Students  │  - Stats (students, completion, etc.)           │
│  [127]       │                                                  │
│              │                                                  │
│ 💰 Pricing   │                                                  │
│              │                                                  │
│ 📊 Analytics │                                                  │
│              │                                                  │
│ ⚙️  Settings  │                                                  │
│              │                                                  │
│ 🤖 AI Hub    │                                                  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

---

## 📚 CURRICULUM TAB - WHAT'S BEING BUILT NOW

### **Current State (Basic)**
- Shows list of modules
- Module title, description, status
- "Add Module" button (no functionality yet)
- Edit/Delete buttons (no functionality yet)

### **NEW ENHANCED VERSION (Building Now)**

#### **Module List View**
```
╔═══════════════════════════════════════════════════════════════╗
║ Course Curriculum                       [+ Add Module]         ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║ ┌─────────────────────────────────────────────────────────┐  ║
║ │ [1] Module: Introduction & Getting Started        [v]   │  ║
║ │     3 lessons · 45 min · Published · ⭐ 4.8            │  ║
║ │     [Expand to see lessons]                             │  ║
║ └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║ ┌─────────────────────────────────────────────────────────┐  ║
║ │ [2] Module: Core Concepts                          [v]   │  ║
║ │     5 lessons · 1.5 hours · Published · ⭐ 4.6         │  ║
║ │     [Click to expand]                                   │  ║
║ └─────────────────────────────────────────────────────────┘  ║
║                                                                ║
║ ┌─────────────────────────────────────────────────────────┐  ║
║ │ [3] Module: Advanced Techniques                    [v]   │  ║
║ │     4 lessons · 1 hour · Draft                          │  ║
║ │     [Click to expand]                                   │  ║
║ └─────────────────────────────────────────────────────────┘  ║
╚═══════════════════════════════════════════════════════════════╝
```

#### **Expanded Module View (When Clicked)**
```
╔═══════════════════════════════════════════════════════════════╗
║ [1] Module: Introduction & Getting Started            [^]     ║
║     3 lessons · 45 min · Published · ⭐ 4.8                   ║
║     [Edit Module] [Delete Module]                             ║
║ ┌───────────────────────────────────────────────────────────┐ ║
║ │  LESSONS:                                                 │ ║
║ │  ┌─────────────────────────────────────────────────────┐ │ ║
║ │  │ 1.1 Welcome to the Course                          │ │ ║
║ │  │     📹 Video · 15 min · Published                  │ │ ║
║ │  │     [Edit] [Delete] [Preview]                      │ │ ║
║ │  └─────────────────────────────────────────────────────┘ │ ║
║ │                                                           │ ║
║ │  ┌─────────────────────────────────────────────────────┐ │ ║
║ │  │ 1.2 Setting Up Your Environment                    │ │ ║
║ │  │     📝 Article · 20 min · Published                │ │ ║
║ │  │     [Edit] [Delete] [Preview]                      │ │ ║
║ │  └─────────────────────────────────────────────────────┘ │ ║
║ │                                                           │ ║
║ │  ┌─────────────────────────────────────────────────────┐ │ ║
║ │  │ 1.3 First Project Walkthrough                      │ │ ║
║ │  │     ✅ Assignment · 10 min · Published             │ │ ║
║ │  │     [Edit] [Delete] [Preview]                      │ │ ║
║ │  └─────────────────────────────────────────────────────┘ │ ║
║ │                                                           │ ║
║ │  [+ Add Lesson]                                           │ ║
║ └───────────────────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════════════════╝
```

#### **Lesson Editor (When Clicking "Edit" on a Lesson)**
Opens in a modal or side panel:
```
╔═══════════════════════════════════════════════════════════════╗
║ Edit Lesson: Welcome to the Course                    [X]     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                                ║
║ Lesson Title:                                                 ║
║ ┌───────────────────────────────────────────────────────────┐ ║
║ │ Welcome to the Course                                     │ ║
║ └───────────────────────────────────────────────────────────┘ ║
║                                                                ║
║ Content Type:                                                 ║
║ [Video] [Article] [Quiz] [Assignment] [Download]             ║
║                                                                ║
║ Description:                                                  ║
║ ┌───────────────────────────────────────────────────────────┐ ║
║ │ In this lesson, you'll learn about...                    │ ║
║ │                                                           │ ║
║ └───────────────────────────────────────────────────────────┘ ║
║                                                                ║
║ Duration: [15] minutes                                        ║
║                                                                ║
║ ─── VIDEO CONTENT ───────────────────────────────────────────║
║ Video URL:                                                    ║
║ ┌───────────────────────────────────────────────────────────┐ ║
║ │ https://youtube.com/watch?v=...                           │ ║
║ └───────────────────────────────────────────────────────────┘ ║
║ [Upload Video] [Record Video]                                 ║
║                                                                ║
║ Transcript (optional):                                        ║
║ ┌───────────────────────────────────────────────────────────┐ ║
║ │ Hello and welcome...                                      │ ║
║ └───────────────────────────────────────────────────────────┘ ║
║                                                                ║
║ Additional Resources:                                         ║
║ [+ Add Resource]                                              ║
║                                                                ║
║ ─────────────────────────────────────────────────────────────║
║                           [Cancel] [Save Changes] [Publish]   ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🎬 USER INTERACTIONS

### **1. Add New Module**
**Action:** Click "[+ Add Module]" button
**What Happens:**
1. Modal opens
2. Fields: Module title, description
3. Click "Create Module"
4. New module appears at bottom of list (Draft status)
5. Success message: "Module created!"

### **2. Edit Module**
**Action:** Click "Edit Module" button in expanded module
**What Happens:**
1. Inline editing or modal opens
2. Can change: title, description
3. Click "Save"
4. Module updates
5. Success message: "Module updated!"

### **3. Delete Module**
**Action:** Click "Delete Module" button
**What Happens:**
1. Confirmation dialog: "Are you sure? This will delete all lessons in this module."
2. Click "Delete" → Module removed
3. Success message: "Module deleted"

### **4. Expand/Collapse Module**
**Action:** Click anywhere on module card
**What Happens:**
1. Module expands to show lessons
2. Click again to collapse

### **5. Add Lesson to Module**
**Action:** In expanded module, click "[+ Add Lesson]"
**What Happens:**
1. Lesson editor modal opens
2. Fill in: title, type, description, content
3. Click "Create Lesson"
4. Lesson appears in module
5. Success message: "Lesson created!"

### **6. Edit Lesson**
**Action:** Click "Edit" button on lesson
**What Happens:**
1. Lesson editor modal opens (pre-filled)
2. Edit any fields
3. Click "Save Changes"
4. Lesson updates
5. Success message: "Lesson updated!"

### **7. Delete Lesson**
**Action:** Click "Delete" button on lesson
**What Happens:**
1. Confirmation: "Are you sure?"
2. Click "Delete" → Lesson removed
3. Success message: "Lesson deleted"

### **8. Preview Lesson**
**Action:** Click "Preview" button on lesson
**What Happens:**
1. Opens lesson in learner view (modal or new tab)
2. Shows how students will see it
3. Can close to return to editing

### **9. Reorder Modules/Lessons**
**Action:** Drag and drop (future enhancement)
**What Happens:**
1. Drag module/lesson to new position
2. Auto-saves new order
3. Success indicator

### **10. Publish Module/Lesson**
**Action:** Change status from Draft to Published
**What Happens:**
1. Validation check (has content, required fields filled)
2. If valid: Status changes to "Published" (green badge)
3. If invalid: Error message explaining what's missing

---

## 🎨 LESSON CONTENT TYPES

### 1. **Video Lesson**
- Video URL or upload
- Duration (auto-detected or manual)
- Transcript (optional)
- Downloadable resources
- Completion tracked by % watched

### 2. **Article/Text Lesson**
- Rich text editor
- Images, code blocks, formatting
- Estimated reading time
- Downloadable PDF option
- Completion tracked by time spent

### 3. **Quiz**
- Multiple choice questions
- True/False questions
- Passing score threshold
- Randomize questions option
- Show correct answers option
- Completion tracked by score

### 4. **Assignment**
- Instructions
- Submission requirements
- Due date (optional)
- File upload or text submission
- Rubric/grading criteria
- Completion tracked by submission

### 5. **Download/Resource**
- File upload (PDF, ZIP, etc.)
- Description
- Preview image
- File size and type
- Completion tracked by download

---

## 📊 PUBLISHING FLOW

### **Module Publishing**
```
Draft → Ready to Publish → Published
  ↓         ↓                  ↓
  🟡        🟢                 ✅
```

**Requirements to Publish Module:**
- [x] Module has a title
- [x] Module has at least 1 lesson
- [x] All lessons in module are published

**What Happens When Published:**
- Badge turns green
- Visible to students
- Appears in course outline
- Can't be deleted (must unpublish first)

### **Lesson Publishing**
**Requirements:**
- [x] Lesson has a title
- [x] Lesson has content (video URL, article text, etc.)
- [x] Duration is set
- [x] Content type is selected

**What Happens When Published:**
- Lesson becomes visible in published module
- Students can access it
- Completion tracking starts

---

## 🔧 TECHNICAL SPECS (For Engineering)

### **State Management**
```typescript
const [modules, setModules] = useState([...]); // List of modules
const [expandedModules, setExpandedModules] = useState<string[]>([]); // Which modules are expanded
const [editingLesson, setEditingLesson] = useState<Lesson | null>(null); // Lesson being edited
const [showLessonEditor, setShowLessonEditor] = useState(false); // Show/hide editor
const [showModuleEditor, setShowModuleEditor] = useState(false); // Show/hide module editor
```

### **Data Structure**
```typescript
interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  duration: string; // Calculated from lessons
  status: 'draft' | 'published';
  completionRate?: number; // Only if published
  avgRating?: number; // Only if published
  order: number;
}

interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'quiz' | 'assignment' | 'download';
  duration: number; // in minutes
  status: 'draft' | 'published';
  content: LessonContent;
  order: number;
}

interface LessonContent {
  // For video
  videoUrl?: string;
  transcript?: string;
  
  // For article
  articleContent?: string; // Rich text HTML
  
  // For quiz
  questions?: Question[];
  passingScore?: number;
  
  // For assignment
  instructions?: string;
  submissionType?: 'file' | 'text';
  dueDate?: string;
  
  // For download
  fileUrl?: string;
  fileSize?: number;
  fileType?: string;
  
  // Common
  resources?: Resource[];
}
```

### **Components to Create**
1. **`/components/ModuleEditor.tsx`** - Modal for creating/editing modules
2. **`/components/LessonEditor.tsx`** - Modal for creating/editing lessons
3. **`/components/LessonContentEditor.tsx`** - Content editor based on lesson type
4. **Enhanced `/components/CourseBuilderViewV3.tsx`** - Expandable modules

---

## ✅ DEFINITION OF DONE

**Course Builder Curriculum Tab is COMPLETE when:**
- [ ] User can add new module
- [ ] User can edit module (title, description)
- [ ] User can delete module (with confirmation)
- [ ] User can expand/collapse modules
- [ ] User can see lessons in expanded module
- [ ] User can add lesson to module
- [ ] User can edit lesson (title, description, content)
- [ ] User can delete lesson (with confirmation)
- [ ] User can change lesson type (video, article, quiz, etc.)
- [ ] User can publish/unpublish modules and lessons
- [ ] User can see status badges (draft/published)
- [ ] User can see stats (lesson count, duration, rating)
- [ ] All modals have proper loading and success states
- [ ] All delete actions have confirmation dialogs
- [ ] Visual design is consistent with rest of app
- [ ] Mobile responsive (modules stack properly)

---

## 🚀 BUILDING ORDER

1. **First:** Expand/collapse module functionality
2. **Second:** Add sample lessons to modules (dummy data)
3. **Third:** Create LessonEditor modal component
4. **Fourth:** Add lesson functionality (opens modal)
5. **Fifth:** Edit lesson functionality (opens modal with data)
6. **Sixth:** Delete lesson with confirmation
7. **Seventh:** Create ModuleEditor modal component
8. **Eighth:** Add module functionality
9. **Ninth:** Edit/delete module functionality
10. **Tenth:** Publishing flow (status changes)

---

**READY TO BUILD!** Starting with expand/collapse functionality...

# Search System - Product Requirements Document (PRD)

## Overview
A professional, Slack/Linear-inspired universal search system for finding communities, courses, events, and people. The search features tabbed navigation, smart filters, saved searches, and advanced search syntax.

---

## Platform Differences

### Web Implementation
- **Display**: Modal overlay centered on screen
- **Trigger**: Cmd+K / Ctrl+K keyboard shortcut + clickable search bar
- **Backdrop**: Semi-transparent black with backdrop blur (`bg-black/20 backdrop-blur-sm`)
- **Positioning**: Fixed overlay with `pt-[10vh]` from top
- **Close**: ESC key, backdrop click, or X button

### Mobile Implementation  
- **Display**: Separate full-screen page
- **Trigger**: Tap search icon/button in navigation
- **Transition**: Slide-in from bottom or push navigation
- **Close**: Back button, swipe gesture, or X button
- **No backdrop**: Full page takes over entire screen

---

## Visual Design System

### Brand Colors
- **Primary Purple**: `#420D74` - Used for active states, buttons, highlights
- **Purple Hover**: `#420D74/90` or `#531596` - Hover states
- **Purple Light**: `#420D74/10` to `#420D74/30` - Borders, backgrounds

### Layout Structure
```
┌─────────────────────────────────────────────┐
│ [Title Bar] (if has query)                   │ ← Gray bg
├─────────────────────────────────────────────┤
│ [Search Input - 56px tall]                   │ ← White bg
├─────────────────────────────────────────────┤
│ [Tabs: All | Communities | Events...]       │ ← Shows when query exists
├─────────────────────────────────────────────┤
│ [Filters Row + Sort + Save Search]          │ ← Gray bg, shows when query exists
├─────────────────────────────────────────────┤
│                                              │
│ [Content Area - Scrollable]                 │
│ - Empty State (4 tabs) OR                   │
│ - Search Results (categorized)              │
│                                              │
├─────────────────────────────────────────────┤
│ [Footer - Keyboard shortcuts]               │ ← Gray bg
└─────────────────────────────────────────────┘
```

### Spacing & Sizing
- **Search input height**: `h-14` (56px)
- **Search icon**: `size-5` (20px), positioned `left-6 top-1/2 -translate-y-1/2`
- **Input padding**: `pl-14 pr-6` (56px left, 24px right)
- **Content max height**: `max-h-[55vh]` with `overflow-y-auto`
- **Section padding**: `px-6 py-3` for bars, `px-6 py-4` for content
- **Card spacing**: `space-y-2` between result cards
- **Section spacing**: `space-y-6` between categories

### Typography
- **Placeholder**: `text-gray-400` - "Search communities, courses, events..."
- **Input text**: `text-gray-900` - User typed query
- **Section headers**: `text-sm font-medium text-gray-900`
- **Result titles**: `font-medium text-gray-900`
- **Result descriptions**: `text-sm text-gray-600`
- **Meta info**: `text-xs text-gray-500`
- **Badges**: `text-xs` in various colors
- **Keyboard shortcuts**: `font-mono text-xs`

### Border & Shadow
- **Modal border**: `border border-gray-200`
- **Modal shadow**: `shadow-2xl`
- **Section dividers**: `border-b border-gray-200`
- **Card borders**: `border border-gray-200` → `hover:border-[#420D74]/50`
- **Dropdown shadows**: `shadow-xl`

---

## Component Architecture

### Main Container
```
Web: Fixed modal, max-w-4xl, rounded-xl
Mobile: Full screen page, no rounded corners
```

### 1. Title Bar (Conditional - Shows when query exists)
```tsx
{hasQuery && (
  <div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
    <p>Search results for "<searchQuery>"</p>
    <button>Clear <X /></button>
  </div>
)}
```
- **Background**: `bg-gray-50`
- **Border**: Bottom border only
- **Layout**: Flex justify-between
- **Text**: Shows current search query in quotes
- **Clear button**: Purple text with X icon, clears query

### 2. Search Input
```tsx
<div className="relative border-b border-gray-200">
  <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
  <input
    type="text"
    placeholder="Search communities, courses, events..."
    className="w-full h-14 pl-14 pr-6"
  />
</div>
```
- **Height**: `h-14` (56px)
- **Icon**: Search icon, gray-400, positioned absolutely
- **Auto-focus**: On modal/page open
- **No border**: Transparent background
- **Bottom border**: Gray divider

### 3. Result Tabs (Conditional - Shows when query exists)
```tsx
Tabs: All (45) | Communities (12) | Events (8) | Courses (23) | People (2)
```
- **Active state**: `border-b-2 border-[#420D74] text-[#420D74]`
- **Inactive state**: `border-transparent text-gray-600 hover:text-gray-900`
- **Count badges**: `text-xs text-gray-500` in parentheses
- **Padding**: `py-3`
- **Layout**: Flex with `gap-6`

### 4. Empty State Tabs (Shows when NO query)
```tsx
Tabs: Recent Searches | Leapy Suggests | Saved Searches | Quick Actions
```
- Same styling as result tabs
- 4 tabs instead of 5
- No count badges

---

## Empty State Content (No Query)

### Tab 1: Recent Searches
```tsx
[🔍 UX Design Course                    [X]]
[🔍 Product Management                  [X]]
[🔍 Weekly Standup                      [X]]
[🔍 Marketing Community                 [X]]
```
- **Icon**: Search icon `size-4 text-gray-400`
- **Hover**: Icon turns purple, row gets gray background
- **X button**: Appears on hover, removes from history
- **Click**: Sets query to that search term

### Tab 2: Leapy Suggests
```tsx
[✨ Design Sprint Workshop          event     ]
[✨ Advanced Prototyping            course    ]
[✨ Marketing Pros                  community ]
```
- **Icon**: Sparkles icon `size-4 text-[#420D74]`
- **Badge**: Type shown on right (event/course/community)
- **AI-powered**: Contextual suggestions based on user activity

### Tab 3: Saved Searches
```tsx
[💾 My draft courses                    [🗑️]]
[💾 Upcoming events this week           [🗑️]]
```
- **Icon**: Save icon `size-4 text-gray-400` → purple on hover
- **Trash button**: Appears on hover, deletes saved search
- **Click**: Executes saved search query

### Tab 4: Quick Actions
```tsx
[+ Create a new community          ⌘N]
[+ Create a new course             ⌘C]
[+ Create a new event              ⌘E]
```
- **Icon**: Plus icon `size-4 text-gray-500`
- **Keyboard shortcut**: Shown on right (web only)
- **Mobile**: No shortcuts, just action text

---

## Filters System (Shows when query exists)

### Filter Bar Layout
```tsx
<div className="border-b border-gray-200 px-6 py-3 bg-gray-50">
  <div className="flex items-center justify-between mb-3">
    <!-- Quick filters + Advanced filters -->
  </div>
  <div className="flex items-center justify-between">
    <!-- Advanced search helper + Sort + Save -->
  </div>
</div>
```

### Quick Filters (Row 1)
```tsx
[👤 Created by me] [🌍 Public] [✓ Active] [📚 Has courses]
```
- **Inactive**: White bg, gray border, gray text
- **Active**: `bg-[#420D74] text-white` with X icon
- **Toggle**: Click to activate/deactivate
- **Pills**: Rounded-full, `px-3 py-1.5 text-xs`

### Advanced Filters (Row 1)
1. **Date Filter** (Dropdown)
   ```
   [🕐 All time ▼]
   Options:
   - All time
   - Last 7 days  
   - This month
   - This year
   ```
   - Icon: Clock
   - Active state: Purple background when not "All time"
   - Dropdown: White bg, shadow-xl, checkmarks for selected

2. **Creator Filter** (Dropdown)
   ```
   [👤 Any creator ▼]
   Options:
   - Any creator
   ---
   - Sarah Chen
   - Alex Kumar
   - Emma Wilson
   ```
   - Icon: User
   - Active state: Purple when specific creator selected
   - Shows list of creators with divider

3. **Status Filter** (Dropdown)
   ```
   [⚡ Any status ▼]
   Options:
   - Any status
   ---
   - Draft
   - Published
   - Archived
   ```
   - Icon: Filter
   - Active state: Purple when specific status selected

### Clear All Filters
```tsx
[Clear all filters] ← Purple text link
```
- Shows when any filter is active
- Resets all filters to default

---

## Advanced Search & Sort (Row 2)

### Advanced Search Helper
```tsx
Try: type:course level:beginner
```
- **Style**: `text-xs text-gray-500`
- **Code formatting**: `px-1.5 py-0.5 bg-gray-100 rounded text-[#420D74] font-mono`
- **Educates users**: Shows search syntax examples

### Sort Dropdown
```tsx
Sort: [Most relevant ▼]

Options:
- Most relevant ✓
- Recently created
- Recently updated
- Most active
- Alphabetical
```
- **Position**: Right side of filter bar
- **Default**: Most relevant
- **Checkmark**: Shows active sort option
- **Dropdown**: Right-aligned

### Save Search Button
```tsx
[💾 Save search]
```
- **Condition**: Only shows when query exists
- **Icon**: Save icon `size-3.5`
- **Style**: `text-xs text-gray-700 hover:text-[#420D74]`
- **Action**: Opens save dialog (add to saved searches list)

---

## Search Results Display

### Results Structure
```tsx
<div className="py-6 px-6 space-y-6">
  {/* Section: Communities */}
  {(activeTab === 'all' || activeTab === 'communities') && (
    <div>
      <h3>Communities</h3>
      {communityResults.map(...)}
    </div>
  )}
  
  {/* Section: Courses */}
  {/* Section: Events */}
  {/* Section: People */}
</div>
```

### Result Card Structure (Universal)
```tsx
<div className="border border-gray-200 rounded-lg p-4 
     hover:border-[#420D74]/50 hover:bg-gray-50 
     transition-all group cursor-pointer">
  <div className="flex items-start justify-between">
    <!-- Left: Content -->
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <Icon /> <!-- Type icon -->
        <h4>Title (with highlights)</h4>
        <Badge>Badge 1</Badge>
        <Badge>Badge 2</Badge>
      </div>
      <p>Description (with highlights)</p>
      <div className="flex items-center gap-4">
        <Meta>Meta 1</Meta>
        <Meta>Meta 2</Meta>
      </div>
    </div>
    
    <!-- Right: CTA Button -->
    <button className="opacity-0 group-hover:opacity-100">
      Action
    </button>
  </div>
</div>
```

### Community Result Card
```tsx
{
  name: "Design Masters",
  description: "A community for design professionals...",
  members: 245,
  courses: 12,
  badges: ['Public', 'Active']
}
```
- **Icon**: Hash (#) icon `size-4 text-gray-500`
- **Badges**: Gray background `bg-gray-100 text-gray-600`
- **Meta**: Members count + Courses count
- **CTA**: "Join" button (purple)

### Course Result Card
```tsx
{
  name: "UX Design Fundamentals",
  description: "Master the fundamentals...",
  enrolled: 89,
  rating: 4.8,
  modules: 6,
  badges: ['Beginner', '6 modules']
}
```
- **Icon**: BookOpen icon `size-4 text-gray-500`
- **Badges**: Gray background
- **Meta**: Enrolled count + Star rating (yellow filled star)
- **CTA**: "Enroll" button (purple)

### Event Result Card
```tsx
{
  name: "Design Sprint Workshop",
  description: "Tomorrow at 2:00 PM • Design Masters community",
  attending: 24,
  location: "Virtual",
  badges: ['Upcoming']
}
```
- **Icon**: Calendar icon `size-4 text-gray-500`
- **Badges**: Green background `bg-green-100 text-green-700`
- **Meta**: Attending count + Location (MapPin icon)
- **CTA**: "RSVP" button (purple)

### People Result Card (If implemented)
```tsx
{
  name: "Sarah Chen",
  title: "Product Designer",
  company: "Figma",
  badges: ['Instructor', 'Pro']
}
```
- **Icon**: User icon
- **Meta**: Title + Company
- **CTA**: "Connect" or "View Profile"

---

## Text Highlighting

### Implementation
```tsx
const highlightText = (text: string, query: string) => {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() ? 
      <mark className="bg-yellow-200 text-gray-900">{part}</mark> : part
  );
};
```
- **Highlight color**: `bg-yellow-200` (yellow background)
- **Text color**: `text-gray-900` (ensures readability)
- **Case insensitive**: Matches regardless of case
- **Applied to**: Titles and descriptions in all results

---

## Footer (Keyboard Shortcuts)

### Web Version
```tsx
[↑] [↓] to navigate    [↵] to select    [esc] to close
```
- **Keys**: White background, border, font-mono
- **Padding**: `px-1.5 py-0.5`
- **Spacing**: `gap-4` between groups
- **Background**: `bg-gray-50`
- **Text**: `text-xs text-gray-600`

### Mobile Version
```tsx
[Swipe down to close]  or  [No footer needed]
```
- Mobile can omit keyboard shortcuts
- Use standard mobile back button
- Optional: Show gesture hint

---

## Animations & Transitions

### Modal/Page Entry (Web)
```tsx
className="animate-in slide-in-from-top-4 fade-in duration-300"
```
- Slides from top by 16px while fading in
- 300ms duration

### Modal/Page Entry (Mobile)
```tsx
className="animate-in slide-in-from-bottom fade-in duration-300"
```
- Slides from bottom (mobile pattern)
- 300ms duration

### Backdrop (Web Only)
```tsx
className="animate-in fade-in duration-200"
```
- Fades in over 200ms
- `bg-black/20 backdrop-blur-sm`

### Hover States
- **Cards**: `transition-all` with border + bg change
- **Buttons**: `transition-colors` (200ms default)
- **Icons**: `transition-colors` (200ms default)
- **CTA buttons**: `opacity-0 group-hover:opacity-100` with transition

### Dropdown Menus
```tsx
className="animate-in zoom-in-95 fade-in duration-200"
```
- Scales from 95% to 100% while fading in
- 200ms duration

---

## Data Structures

### Search State
```typescript
const [searchQuery, setSearchQuery] = useState('')
const [activeTab, setActiveTab] = useState<'all' | 'communities' | 'events' | 'courses' | 'people'>('all')
const [emptyStateTab, setEmptyStateTab] = useState<'recent' | 'suggestions' | 'saved' | 'actions'>('recent')
const [sortBy, setSortBy] = useState('relevant')
const [activeFilters, setActiveFilters] = useState<string[]>([])
const [dateFilter, setDateFilter] = useState('all-time')
const [creatorFilter, setCreatorFilter] = useState('')
const [statusFilter, setStatusFilter] = useState('')
const [savedSearches, setSavedSearches] = useState<string[]>(['My draft courses', 'Upcoming events this week'])
const [showSortMenu, setShowSortMenu] = useState(false)
const [showDateMenu, setShowDateMenu] = useState(false)
const [showCreatorMenu, setShowCreatorMenu] = useState(false)
const [showStatusMenu, setShowStatusMenu] = useState(false)
const [showSaveSearch, setShowSaveSearch] = useState(false)
```

### Result Data Structures
```typescript
// Community
interface CommunityResult {
  id: number
  name: string
  description: string
  members: number
  courses: number
  badges: string[]
}

// Course
interface CourseResult {
  id: number
  name: string
  description: string
  enrolled: number
  rating: number
  modules: number
  badges: string[]
}

// Event
interface EventResult {
  id: number
  name: string
  description: string
  attending: number
  location: string
  badges: string[]
}

// Result Counts
interface ResultCounts {
  all: number
  communities: number
  events: number
  courses: number
  people: number
}
```

### Mock Data Examples
```typescript
const recentSearches = [
  'UX Design Course',
  'Product Management',
  'Weekly Standup',
  'Marketing Community'
]

const leapySuggestions = [
  { title: 'Design Sprint Workshop', type: 'event' },
  { title: 'Advanced Prototyping', type: 'course' },
  { title: 'Marketing Pros', type: 'community' }
]

const availableFilters = [
  { id: 'created-by-me', label: '👤 Created by me', icon: '👤' },
  { id: 'public', label: '🌍 Public', icon: '🌍' },
  { id: 'active', label: '✓ Active', icon: '✓' },
  { id: 'has-courses', label: '📚 Has courses', icon: '📚' }
]

const resultCounts = {
  all: 45,
  communities: 12,
  events: 8,
  courses: 23,
  people: 2
}
```

---

## Interaction Patterns

### Opening Search
**Web:**
- Press Cmd+K or Ctrl+K
- Click search bar in header
- Shows backdrop with modal

**Mobile:**
- Tap search icon/button
- Navigates to search page
- No backdrop (full page)

### Closing Search
**Web:**
- Press ESC
- Click backdrop
- Click X button
- Auto-closes on result selection (optional)

**Mobile:**
- Tap back button
- Swipe down (if implemented)
- Tap X button
- Navigates back on result selection

### Typing Query
1. User types in search input
2. Title bar appears showing "Search results for '{query}'"
3. Empty state tabs hide
4. Result tabs appear with counts
5. Filter bar appears
6. Results display dynamically

### Clearing Query
1. Click "Clear" in title bar OR
2. Manually delete all text
3. Title bar disappears
4. Result tabs disappear
5. Filter bar disappears
6. Empty state tabs reappear
7. Returns to default state

### Using Filters
1. Click filter pill to toggle
2. Active: Purple background, shows X
3. Inactive: White background, gray border
4. Results update immediately
5. "Clear all filters" link appears when any filter active

### Dropdowns (Date/Creator/Status)
1. Click dropdown trigger
2. Menu appears below with zoom-in animation
3. Click option to select
4. Checkmark appears next to selection
5. Menu auto-closes
6. Trigger shows selected value
7. Trigger turns purple when not default value

### Saving Searches
1. Type query + apply filters
2. Click "Save search" button
3. (Optional) Dialog to name the search
4. Saves to "Saved Searches" tab
5. Can be deleted later via trash icon

### Selecting Results
1. Hover over result card
2. Card border turns purple
3. Background becomes gray-50
4. CTA button fades in (opacity 0 → 100)
5. Click anywhere on card OR click CTA
6. Navigates to detail page
7. Search modal/page closes (or stays open if cmd+click)

---

## Mobile-Specific Considerations

### Full-Page Layout
```tsx
<div className="min-h-screen bg-white flex flex-col">
  {/* Header with back button */}
  <div className="sticky top-0 z-10 bg-white border-b">
    <button>← Back</button>
    {titleBar}
    {searchInput}
  </div>
  
  {/* Tabs */}
  {tabs}
  
  {/* Filters (scrollable horizontally on mobile) */}
  <div className="overflow-x-auto">
    {filters}
  </div>
  
  {/* Content (scrollable) */}
  <div className="flex-1 overflow-y-auto">
    {content}
  </div>
  
  {/* No footer needed on mobile */}
</div>
```

### Touch Interactions
- **Swipe left/right**: Navigate between tabs (optional)
- **Pull to refresh**: Clear search (optional)
- **Swipe down**: Close search page (optional)
- **Tap outside**: Not applicable (full screen)
- **Long press**: Show context menu for results (optional)

### Filter Bar on Mobile
```tsx
<div className="overflow-x-auto no-scrollbar">
  <div className="flex gap-2 px-4 py-3 min-w-min">
    {filters.map(...)}
  </div>
</div>
```
- Horizontal scroll instead of wrapping
- Hide scrollbar for cleaner look
- Padding on sides for better touch targets

### Virtual Keyboard Handling
- Input stays visible when keyboard opens
- Results scroll behind keyboard
- Auto-scroll to keep input visible
- Consider "sticky" header with search bar

---

## Advanced Search Syntax

### Supported Operators
```
type:course          - Filter by type
level:beginner       - Filter by level
status:published     - Filter by status
creator:@sarah       - Filter by creator
has:certification    - Filter by features
date:this-week       - Filter by date
rating:>4.5          - Filter by rating
```

### Examples
```
type:course level:beginner          → Beginner courses only
creator:@sarah status:published     → Published content by Sarah
has:certification rating:>4.5       → Certified courses rated above 4.5
```

### Implementation
- Parse query for operators
- Apply filters programmatically
- Show active operators as filter pills
- Autocomplete suggestions for operators

---

## Accessibility

### Keyboard Navigation
- **Tab**: Move focus through interactive elements
- **Shift+Tab**: Move focus backward
- **↑/↓**: Navigate results list (future enhancement)
- **Enter**: Select focused result
- **Esc**: Close search
- **Cmd/Ctrl+K**: Open search

### Screen Reader Support
- Proper ARIA labels on all interactive elements
- `role="search"` on search container
- `aria-label="Search for communities, courses, and events"`
- Announce result counts: "45 results found"
- Announce filter changes: "Filter applied: Created by me"

### Focus Management
- Auto-focus search input on open
- Visible focus indicators (purple ring)
- Trap focus within modal (web)
- Return focus to trigger on close

### Color Contrast
- All text meets WCAA AA standards
- Purple #420D74 on white: 8.59:1 (AAA)
- Gray-600 on white: 5.74:1 (AA)
- Gray-500 on white: 4.62:1 (AA)

---

## Performance Considerations

### Debounced Search
```typescript
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // Perform search after 300ms of no typing
    performSearch(searchQuery)
  }, 300)
  
  return () => clearTimeout(timeoutId)
}, [searchQuery])
```

### Virtualized Lists
- For large result sets (>50 items)
- Only render visible items + buffer
- Use `react-window` or similar

### Lazy Loading
- Load results as user scrolls
- Show skeleton loaders
- "Load more" button at bottom

### Caching
- Cache recent search results
- Cache saved searches locally
- Cache filter combinations

---

## Error States

### No Results
```tsx
<div className="py-12 text-center">
  <Search className="size-12 text-gray-300 mx-auto mb-4" />
  <h3>No results found for "{searchQuery}"</h3>
  <p>Try adjusting your filters or search terms</p>
  <button>Clear filters</button>
</div>
```

### Network Error
```tsx
<div className="py-12 text-center">
  <AlertCircle className="size-12 text-red-300 mx-auto mb-4" />
  <h3>Something went wrong</h3>
  <p>We couldn't load your search results</p>
  <button>Try again</button>
</div>
```

### Loading State
```tsx
<div className="py-6 px-6 space-y-4">
  {[1, 2, 3].map(i => (
    <div key={i} className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  ))}
</div>
```

---

## Success Metrics

### Usage Metrics
- Search modal/page open rate
- Average searches per session
- Filter usage rate
- Saved searches created
- Quick actions clicked

### Quality Metrics
- Click-through rate on results
- Time to first result click
- Search refinement rate (modified query)
- Zero-result searches (should be low)

### Performance Metrics
- Search latency (< 200ms ideal)
- Time to interactive (< 1s)
- Modal/page open animation (300ms)

---

## Future Enhancements

### Phase 2
- [ ] Real-time search as you type
- [ ] Search history persistence
- [ ] Search suggestions/autocomplete
- [ ] Recently viewed items
- [ ] Trending searches

### Phase 3
- [ ] Advanced boolean operators (AND, OR, NOT)
- [ ] Fuzzy matching / typo tolerance
- [ ] Search within specific communities
- [ ] Saved search notifications
- [ ] Search analytics dashboard

### Phase 4
- [ ] Voice search
- [ ] Multi-language search
- [ ] Natural language queries
- [ ] AI-powered search refinement
- [ ] Search result previews (hover cards)

---

## Implementation Checklist

### Foundation
- [ ] Set up component structure (modal/page)
- [ ] Implement search input with auto-focus
- [ ] Add close handlers (ESC, backdrop, X button)
- [ ] Style with exact brand colors (#420D74)

### Empty State
- [ ] Implement 4 empty state tabs
- [ ] Add recent searches (mock data)
- [ ] Add Leapy suggestions (mock data)
- [ ] Add saved searches (mock data)
- [ ] Add quick actions (mock data)

### Search Results
- [ ] Implement 5 result tabs with counts
- [ ] Add title bar with clear button
- [ ] Create result cards for each type
- [ ] Implement text highlighting
- [ ] Add hover states with CTA buttons

### Filters
- [ ] Implement quick filter pills
- [ ] Add date filter dropdown
- [ ] Add creator filter dropdown
- [ ] Add status filter dropdown
- [ ] Add clear all filters button
- [ ] Implement filter state management

### Sort & Save
- [ ] Add sort dropdown
- [ ] Implement save search button
- [ ] Add save search dialog (optional)
- [ ] Persist saved searches

### Polish
- [ ] Add all animations (slide-in, fade-in, zoom-in)
- [ ] Add keyboard shortcuts (web only)
- [ ] Add footer with keyboard hints
- [ ] Test accessibility
- [ ] Add loading states
- [ ] Add error states
- [ ] Add empty results state

### Mobile-Specific
- [ ] Convert modal to full page
- [ ] Add back button header
- [ ] Make filters horizontally scrollable
- [ ] Test on various screen sizes
- [ ] Implement touch interactions
- [ ] Handle virtual keyboard

---

## Code Organization

### File Structure
```
/components
  /SearchModal.tsx       (Web - Modal version)
  /SearchPage.tsx        (Mobile - Full page version)
  /SearchInput.tsx       (Shared component)
  /SearchFilters.tsx     (Shared component)
  /SearchResults.tsx     (Shared component)
  /SearchEmptyState.tsx  (Shared component)
  /ResultCard.tsx        (Shared component)
```

### Shared Logic Hook
```typescript
/hooks
  /useSearch.ts          (Shared search logic)
  
export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  // ... all search state and logic
  
  return {
    searchQuery,
    setSearchQuery,
    // ... all state and handlers
  }
}
```

---

## Design Tokens Reference

```css
/* Colors */
--purple-primary: #420D74;
--purple-hover: #531596;
--purple-light: rgba(66, 13, 116, 0.1);

/* Spacing */
--search-height: 56px;
--content-max-height: 55vh;
--filter-pill-padding: 0.375rem 0.75rem;

/* Border Radius */
--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Transitions */
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;
```

---

## Testing Scenarios

### User Flows
1. **Basic Search**
   - Open search → Type query → See results → Click result
   
2. **Filtered Search**
   - Open search → Type query → Apply filters → See filtered results
   
3. **Saved Search**
   - Open search → Type query → Save search → Close → Reopen → Use saved search
   
4. **Recent Search**
   - Open search → Type query → Close → Reopen → Click recent search
   
5. **Quick Actions**
   - Open search → Click Quick Actions tab → Click action → Creates new item

### Edge Cases
- Very long search queries (200+ characters)
- Special characters in search (@#$%^&*)
- Empty search results
- Network timeout
- Rapid filter toggling
- Keyboard navigation only
- Screen reader usage

---

## Summary for Mobile Implementation

**Key Points:**
1. Convert modal → full-screen page
2. Remove backdrop, add back button
3. Make filters horizontally scrollable
4. Remove keyboard shortcuts from footer
5. Use slide-in-from-bottom animation
6. Handle virtual keyboard properly
7. Keep ALL other functionality identical:
   - Same tabs, filters, sort, save
   - Same result cards with exact styling
   - Same empty states
   - Same purple color (#420D74)
   - Same spacing and typography
   - Same hover → active states (tap on mobile)

**The ONLY difference is the container:**
- Web: Modal overlay with backdrop
- Mobile: Full-screen page with navigation

Everything else is pixel-perfect identical! 🎯

# Component Quick Reference Guide
## For Immediate Developer Handoff

---

## 🎨 **DESIGN SYSTEM AT A GLANCE**

### **Brand Colors**
```css
Primary Purple:   #420D74    /* Buttons, links, highlights */
Purple Hover:     #531596    /* Hover states */
Purple Light:     #420D74/10 /* Backgrounds, borders */

Gray Scale:
  - Gray 900:     #111827    /* Primary text */
  - Gray 700:     #374151    /* Secondary text */
  - Gray 600:     #4B5563    /* Tertiary text */
  - Gray 500:     #6B7280    /* Placeholder text */
  - Gray 400:     #9CA3AF    /* Disabled text */
  - Gray 300:     #D1D5DB    /* Borders */
  - Gray 200:     #E5E7EB    /* Dividers */
  - Gray 100:     #F3F4F6    /* Backgrounds */
  - Gray 50:      #F9FAFB    /* Light backgrounds */

Semantic Colors:
  - Success:      #10B981    /* Green */
  - Warning:      #F59E0B    /* Orange */
  - Error:        #EF4444    /* Red */
  - Info:         #3B82F6    /* Blue */
```

### **Typography Scale**
```css
h1: 48px / 600 / 1.2
h2: 36px / 600 / 1.3  
h3: 24px / 600 / 1.4
h4: 20px / 600 / 1.5
h5: 18px / 500 / 1.5
h6: 16px / 500 / 1.5

Body Large:  18px / 400 / 1.6
Body:        16px / 400 / 1.5
Body Small:  14px / 400 / 1.5
Caption:     12px / 400 / 1.4
```

### **Spacing Scale**
```css
0:   0px
1:   4px
2:   8px
3:   12px
4:   16px
5:   20px
6:   24px
8:   32px
10:  40px
12:  48px
16:  64px
20:  80px
24:  96px
```

### **Border Radius**
```css
sm:   4px   /* Small elements */
md:   6px   /* Inputs, badges */
lg:   8px   /* Cards, buttons */
xl:   12px  /* Modals, large cards */
2xl:  16px  /* Hero sections */
full: 9999px /* Pills, avatars */
```

### **Shadows**
```css
sm:   0 1px 2px rgba(0,0,0,0.05)      /* Subtle elevation */
md:   0 4px 6px rgba(0,0,0,0.1)       /* Cards */
lg:   0 10px 15px rgba(0,0,0,0.1)     /* Dropdowns */
xl:   0 20px 25px rgba(0,0,0,0.1)     /* Modals */
2xl:  0 25px 50px rgba(0,0,0,0.25)    /* Maximum elevation */
```

---

## 🧩 **SHADCN/UI COMPONENTS USED**

### **Buttons**
```tsx
import { Button } from '@/components/ui/button'

// Variants
<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>

// States
<Button disabled>Disabled</Button>
<Button className="opacity-50">Loading</Button>

// Custom Purple
<Button className="bg-[#420D74] hover:bg-[#531596]">Brand Purple</Button>
```

**Usage:**
- Primary actions: `variant="default"` with purple background
- Secondary actions: `variant="outline"` or `variant="ghost"`
- Destructive actions: `variant="destructive"`
- Icon-only: `size="icon"`

---

### **Inputs**
```tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

<div>
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="you@example.com"
    className="max-w-sm"
  />
</div>

// With icon
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
  <Input placeholder="Search..." className="pl-10" />
</div>

// States
<Input disabled placeholder="Disabled" />
<Input className="border-red-500" placeholder="Error state" />
```

**Usage:**
- Always pair with `<Label>` for accessibility
- Use placeholder text sparingly
- Add icons with absolute positioning
- Max width: `max-w-sm` (384px) for form inputs

---

### **Textarea**
```tsx
import { Textarea } from '@/components/ui/textarea'

<Textarea 
  placeholder="Tell us about your course..."
  rows={4}
  className="resize-none"
/>

// Auto-growing
const [value, setValue] = useState('')
const textareaRef = useRef<HTMLTextAreaElement>(null)

useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }
}, [value])
```

**Usage:**
- Use `resize-none` to prevent manual resizing
- Min rows: 3, Max rows: 10
- Auto-grow for chat interfaces

---

### **Badge**
```tsx
import { Badge } from '@/components/ui/badge'

// Variants
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>

// Custom colors
<Badge className="bg-green-100 text-green-700">Active</Badge>
<Badge className="bg-blue-100 text-blue-700">Draft</Badge>
<Badge className="bg-purple-100 text-[#420D74]">Featured</Badge>
<Badge className="bg-gray-100 text-gray-600">Archived</Badge>
```

**Usage:**
- Status indicators: Green (active), Blue (draft), Gray (archived)
- Featured content: Purple
- Categories: Secondary variant
- Counts: Small badge with number

---

### **Card**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description or subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Hover effect
<Card className="hover:border-[#420D74]/50 hover:shadow-md transition-all cursor-pointer">
  ...
</Card>
```

**Usage:**
- Course cards, event cards, community cards
- Add hover effect for clickable cards
- Use CardDescription for metadata
- CardFooter for actions

---

### **Dialog (Modal)**
```tsx
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Modal</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
      <DialogDescription>Modal description</DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      {/* Modal content */}
    </div>
  </DialogContent>
</Dialog>

// Sizes
<DialogContent className="sm:max-w-sm">Small</DialogContent>   // 384px
<DialogContent className="sm:max-w-md">Medium</DialogContent>  // 448px
<DialogContent className="sm:max-w-lg">Large</DialogContent>   // 512px
<DialogContent className="sm:max-w-2xl">XL</DialogContent>     // 672px
<DialogContent className="sm:max-w-4xl">2XL</DialogContent>    // 896px
```

**Usage:**
- Forms, confirmations, previews
- Always include DialogHeader with title
- Use DialogDescription for accessibility
- Close button included by default

---

### **Tabs**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="analytics">Analytics content</TabsContent>
  <TabsContent value="settings">Settings content</TabsContent>
</Tabs>

// With purple active state
<TabsList>
  <TabsTrigger 
    value="tab1" 
    className="data-[state=active]:bg-[#420D74] data-[state=active]:text-white"
  >
    Tab 1
  </TabsTrigger>
</TabsList>
```

**Usage:**
- Navigation within a page section
- Purple active state for brand consistency
- Lazy load tab content if heavy
- Use icons + text for clarity

---

### **Popover**
```tsx
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-2">
      <h4 className="font-medium">Popover Title</h4>
      <p className="text-sm text-gray-600">Popover content</p>
    </div>
  </PopoverContent>
</Popover>

// Positioning
<PopoverContent align="start">Left aligned</PopoverContent>
<PopoverContent align="center">Center (default)</PopoverContent>
<PopoverContent align="end">Right aligned</PopoverContent>
<PopoverContent side="top">Above trigger</PopoverContent>
<PopoverContent side="bottom">Below trigger (default)</PopoverContent>
```

**Usage:**
- Additional info, help text, filters
- Keep content concise (< 200 words)
- Use for non-critical information
- Dismiss on outside click

---

### **Dropdown Menu**
```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreVertical className="size-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuItem>
      <Edit className="size-4 mr-2" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Copy className="size-4 mr-2" />
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-red-600">
      <Trash className="size-4 mr-2" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Usage:**
- Context menus, overflow menus
- Use icons for clarity
- Separate destructive actions with separator
- Red text for delete/destructive actions

---

### **Tooltip**
```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <HelpCircle className="size-4" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Helpful tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Wrap entire app with provider for multiple tooltips
<TooltipProvider delayDuration={300}>
  <App />
</TooltipProvider>
```

**Usage:**
- Icon buttons, truncated text, help info
- Keep text short (< 50 characters)
- Delay: 300ms
- Use for supplementary information only

---

### **ScrollArea**
```tsx
import { ScrollArea } from '@/components/ui/scroll-area'

<ScrollArea className="h-[600px] w-full rounded-md border p-4">
  {/* Scrollable content */}
</ScrollArea>

// Horizontal scroll
<ScrollArea orientation="horizontal" className="w-full">
  <div className="flex gap-4 p-4">
    {/* Horizontal items */}
  </div>
</ScrollArea>
```

**Usage:**
- Custom scrollbars for design consistency
- Chat messages, long lists
- Always set explicit height
- Use native scroll on mobile

---

### **Progress**
```tsx
import { Progress } from '@/components/ui/progress'

<Progress value={33} className="w-full" />

// Colors
<Progress value={75} className="[&>div]:bg-green-500" />  // Success
<Progress value={50} className="[&>div]:bg-[#420D74]" />  // Purple
<Progress value={25} className="[&>div]:bg-red-500" />    // Error

// With label
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Course Progress</span>
    <span className="text-gray-500">75%</span>
  </div>
  <Progress value={75} />
</div>
```

**Usage:**
- Course completion, upload progress
- Purple for brand consistency
- Green for success states
- Always show percentage label

---

### **Switch**
```tsx
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>

// Controlled
const [enabled, setEnabled] = useState(false)
<Switch checked={enabled} onCheckedChange={setEnabled} />

// Purple variant
<Switch className="data-[state=checked]:bg-[#420D74]" />
```

**Usage:**
- Settings toggles
- Enable/disable features
- Always pair with label
- Purple for checked state

---

### **Checkbox**
```tsx
import { Checkbox } from '@/components/ui/checkbox'

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Controlled
const [checked, setChecked] = useState(false)
<Checkbox checked={checked} onCheckedChange={setChecked} />

// Purple variant
<Checkbox className="border-[#420D74] data-[state=checked]:bg-[#420D74]" />
```

**Usage:**
- Multi-select lists
- Form agreements
- Always pair with label
- Purple for checked state

---

### **Select**
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>

// Controlled
const [value, setValue] = useState('')
<Select value={value} onValueChange={setValue}>
  ...
</Select>
```

**Usage:**
- Dropdown selections
- Filters, form fields
- Use when > 5 options (otherwise use Radio Group)
- Set explicit width

---

### **Separator**
```tsx
import { Separator } from '@/components/ui/separator'

<div>
  <p>Section 1</p>
  <Separator className="my-4" />
  <p>Section 2</p>
</div>

// Vertical
<div className="flex h-20 items-center">
  <div>Item 1</div>
  <Separator orientation="vertical" className="mx-4" />
  <div>Item 2</div>
</div>
```

**Usage:**
- Section dividers
- Menu item separators
- List item dividers
- Use sparingly (consider whitespace first)

---

### **Skeleton**
```tsx
import { Skeleton } from '@/components/ui/skeleton'

// Loading card
<Card>
  <CardHeader>
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-32 w-full" />
  </CardContent>
</Card>

// Loading list
{[1, 2, 3].map(i => (
  <div key={i} className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
))}
```

**Usage:**
- Loading states
- Match skeleton to actual content shape
- Animate with pulse
- Show for > 300ms load times

---

### **Avatar**
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="https://..." alt="User name" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Sizes
<Avatar className="h-8 w-8">Small</Avatar>
<Avatar className="h-10 w-10">Default</Avatar>
<Avatar className="h-12 w-12">Large</Avatar>
<Avatar className="h-16 w-16">XL</Avatar>

// With status indicator
<div className="relative">
  <Avatar>
    <AvatarImage src="..." />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
</div>
```

**Usage:**
- User profiles
- Comment threads
- Member lists
- Always provide fallback (initials)

---

### **Alert**
```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>

// Variants
<Alert variant="default">Info</Alert>
<Alert variant="destructive">Error</Alert>

// Custom colors
<Alert className="border-green-200 bg-green-50 text-green-900">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

<Alert className="border-[#420D74]/20 bg-purple-50 text-[#420D74]">
  <Sparkles className="h-4 w-4" />
  <AlertTitle>AI Suggestion</AlertTitle>
  <AlertDescription>Try adding more detail to get better results.</AlertDescription>
</Alert>
```

**Usage:**
- Success, error, warning, info messages
- Page-level notifications
- Form validation summaries
- Green for success, Red for errors, Purple for AI suggestions

---

## 🎭 **COMMON PATTERNS**

### **Form Pattern**
```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="title">Course Title</Label>
    <Input id="title" placeholder="e.g. Advanced React Patterns" />
  </div>
  
  <div className="space-y-2">
    <Label htmlFor="description">Description</Label>
    <Textarea id="description" rows={4} />
  </div>
  
  <div className="flex items-center space-x-2">
    <Checkbox id="published" />
    <Label htmlFor="published">Publish immediately</Label>
  </div>
  
  <div className="flex gap-3">
    <Button type="submit" className="bg-[#420D74] hover:bg-[#531596]">
      Create Course
    </Button>
    <Button type="button" variant="outline" onClick={onCancel}>
      Cancel
    </Button>
  </div>
</form>
```

### **Card with Hover CTA Pattern**
```tsx
<Card className="group hover:border-[#420D74]/50 hover:shadow-md transition-all cursor-pointer">
  <CardHeader>
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          Title
          <Badge>New</Badge>
        </CardTitle>
        <CardDescription>Description text</CardDescription>
      </div>
      <Button 
        size="sm" 
        className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#420D74]"
      >
        View
      </Button>
    </div>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <span className="flex items-center gap-1">
        <Users className="size-4" />
        245 members
      </span>
      <span className="flex items-center gap-1">
        <BookOpen className="size-4" />
        12 courses
      </span>
    </div>
  </CardContent>
</Card>
```

### **Search Input Pattern**
```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
  <Input 
    placeholder="Search communities, courses, events..."
    className="pl-10 pr-4 h-10 bg-gray-50 border-gray-200 focus:bg-white"
  />
  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-gray-500 bg-white border border-gray-300 rounded">
    ⌘K
  </kbd>
</div>
```

### **Empty State Pattern**
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="p-4 bg-gray-100 rounded-full mb-4">
    <Icon className="size-8 text-gray-400" />
  </div>
  <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
  <p className="text-sm text-gray-500 mb-6 max-w-sm">
    Get started by creating your first item
  </p>
  <Button className="bg-[#420D74] hover:bg-[#531596]">
    <Plus className="size-4 mr-2" />
    Create Item
  </Button>
</div>
```

### **Loading State Pattern**
```tsx
// Loading cards
<div className="grid grid-cols-3 gap-6">
  {[1, 2, 3].map(i => (
    <Card key={i}>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  ))}
</div>
```

---

## 🎨 **DESIGN GUIDELINES**

### **Button Usage**
- **Primary (Purple)**: Main action per section (max 1)
- **Secondary (Outline)**: Alternative actions
- **Ghost**: Tertiary actions, icon buttons
- **Destructive (Red)**: Delete, remove, cancel (irreversible actions)

### **Spacing**
- **Container padding**: `px-6` (24px) or `px-8` (32px)
- **Section spacing**: `space-y-8` (32px) or `space-y-12` (48px)
- **Card padding**: `p-6` (24px)
- **Form field spacing**: `space-y-2` (8px) between label and input

### **Typography**
- **Don't use** font-size, font-weight, line-height Tailwind classes
- **Let CSS globals** handle typography (defined in `globals.css`)
- **Exception**: When you need to override (e.g., `text-sm` for captions)

### **Colors**
- **Always use purple** (#420D74) for brand elements
- **Use semantic colors** for status (green success, red error, blue info)
- **Use gray scale** for text hierarchy (900 → 500)
- **Test contrast** - aim for WCAG AA (4.5:1 for text)

### **Animations**
- **Buttons**: `transition-colors` (200ms)
- **Cards**: `transition-all` (200ms)
- **Modals**: `animate-in slide-in-from-top-4 fade-in duration-300`
- **Popovers**: `animate-in zoom-in-95 fade-in duration-200`
- **Hover effects**: Subtle, never jarring

---

## ✅ **ACCESSIBILITY CHECKLIST**

- [ ] All interactive elements have focus visible state
- [ ] All images have alt text
- [ ] All form inputs have associated labels
- [ ] Color is not the only indicator (use icons too)
- [ ] All modals trap focus
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] ARIA labels on icon buttons
- [ ] Semantic HTML (button, nav, main, etc.)
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Screen reader tested

---

## 📱 **RESPONSIVE BREAKPOINTS**

```css
sm:  640px   /* Mobile landscape, small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Small laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

**Mobile-First Pattern:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 column mobile, 2 tablet, 3 desktop */}
</div>
```

---

## 🚀 **GETTING STARTED**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Import Components**
```tsx
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
```

### **3. Use in Your App**
```tsx
export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
    </Card>
  )
}
```

### **4. Customize with Tailwind**
```tsx
<Button className="bg-[#420D74] hover:bg-[#531596]">
  Custom Purple Button
</Button>
```

---

## 🆘 **TROUBLESHOOTING**

**Problem**: Component not styling correctly
- **Solution**: Check if you imported from `@/components/ui/`
- **Solution**: Verify Tailwind classes are not conflicting
- **Solution**: Check `globals.css` is imported in root

**Problem**: Purple color not showing
- **Solution**: Use hex value `#420D74` not CSS variable
- **Solution**: Use `bg-[#420D74]` syntax for custom colors

**Problem**: Animation not working
- **Solution**: Check `animate-in` utilities are available
- **Solution**: Verify motion settings in Tailwind config

**Problem**: TypeScript errors
- **Solution**: Check component props match interface
- **Solution**: Verify all required props are passed

---

## 📞 **NEED HELP?**

1. **Check this guide** - Most common patterns covered
2. **Check shadcn docs** - https://ui.shadcn.com
3. **Check component source** - `/components/ui/[component].tsx`
4. **Ask team lead** - For design decisions

---

**Last Updated**: December 2024
**Version**: 1.0
**Maintained by**: Design Team

# WelcomeScreen Design Documentation
## Landing/Prompt Page - Complete shadcn/TweakCN Component Guide

---

## 📍 **Page Overview**

**Component**: `WelcomeScreen.tsx`  
**Purpose**: Landing page / Main prompt interface for creating courses, communities, and events  
**Design System**: shadcn/ui + TweakCN design tokens  
**Key Feature**: AI-powered content creation with Google Drive integration

---

## 🎨 **TweakCN Tokens Used** (✅ CORRECT)

### **Primary Colors**
```tsx
bg-primary         // #420D74 - Purple brand color
text-primary       // #420D74 - Purple text
border-primary     // #420D74 - Purple borders

// ❌ WRONG (found in code - needs fixing):
bg-[#420D74]       // Should be: bg-primary
text-[#420D74]     // Should be: text-primary
hover:bg-[#531596] // Should be: hover:bg-primary/90
```

### **Secondary Colors**
```tsx
bg-secondary        // #e9e6dc - Warm beige
text-muted-foreground // #83827d - Secondary text
bg-muted           // #f5f3f0 - Subtle backgrounds
bg-accent          // #f1eee5 - Highlighted sections
```

### **Semantic Colors** (Hardcoded - OK for non-brand colors)
```tsx
// Integration badges
bg-[#4A154B]  // Slack purple
bg-[#25D366]  // WhatsApp green
bg-[#5865F2]  // Discord blue
bg-[#2D8CFF]  // Zoom blue

// Status colors
bg-green-100 text-green-700   // Success
bg-blue-100 text-blue-700     // Info
bg-red-100 text-red-700       // Error
```

---

## 🧩 **shadcn/ui Components Used**

### **1. Button** (`ui/button.tsx`)
```tsx
import { Button } from './ui/button'

// Used for future implementations
// Current code uses custom buttons (should migrate)
```

**Current Implementation (Custom)**:
```tsx
// ❌ Manual button - Should use shadcn Button
<button className="bg-[#420D74] hover:bg-[#531596] text-white...">
  
// ✅ Should be:
<Button variant="default">Sign in</Button>
```

### **2. Badge** (`ui/badge.tsx`)
```tsx
import { Badge } from './ui/badge'

// Version badge
<Badge className="bg-gradient-to-r from-primary/10 to-blue-100/50">
  <span className="text-primary">Leapy V2.1 available now</span>
</Badge>
```

### **3. Popover** (`ui/popover.tsx`)
```tsx
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

// Used in attachment menu (custom implementation currently)
// Should migrate to shadcn Popover for consistency
```

---

## 📐 **Layout Structure**

```
WelcomeScreen
├── Hero Section
│   ├── Version Badge (with gradient border)
│   ├── Heading (48px, bold, tight tracking)
│   ├── Subheading (18px, purple stats highlight)
│   └── Content Type Filters (Course/Community/Event pills)
├── Prompt Input Box
│   ├── Gradient Glow Effect (focus state)
│   ├── Attachment Chips (if files added)
│   ├── Auto-expanding Textarea
│   ├── Bottom Action Bar
│   │   ├── Attachment Button (+ icon with menu)
│   │   ├── Templates Button (||| icon)
│   │   ├── Integration Badges (Slack, WhatsApp, Discord, Zoom)
│   │   ├── Voice Input Button
│   │   ├── "Surprise Me" Button (purple, with Sparkles icon)
│   │   └── Submit Button (purple arrow)
│   └── Attachment Menu Popover
│       ├── Upload file (⌘U)
│       ├── Google Drive (⌘D)
│       ├── Paste link (⌘L)
│       ├── Insert image (⌘I)
│       └── Embed video (⌘V)
├── Google Drive Picker Modal
│   ├── Modal Header (with icon + close)
│   ├── File List (clickable cards)
│   └── Footer (Cancel button)
└── Quick Actions Section
    ├── Course Quick Actions (6 pills)
    ├── Community Quick Actions (5 pills)
    └── Event Quick Actions (dynamic)
```

---

## 🎯 **Component Breakdown**

### **1. Version Badge**
**Location**: Top of hero section  
**Purpose**: Announce new feature/version

```tsx
<div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-100/50 rounded-full border border-primary/20">
  <img src={imgGroup} alt="" className="size-4" />
  <span className="text-sm text-primary font-medium">Leapy V2.1 available now</span>
</div>
```

**shadcn Conversion**:
```tsx
<Badge variant="outline" className="border-primary/20 bg-gradient-to-r from-primary/10 to-blue-100/50">
  <img src={imgGroup} alt="" className="size-4 mr-2" />
  <span className="text-primary">Leapy V2.1 available now</span>
</Badge>
```

**Design Tokens**:
- ✅ `text-primary` - Purple text
- ✅ `border-primary/20` - 20% opacity purple border
- ✅ `from-primary/10` - Gradient start (10% purple)

---

### **2. Hero Heading**
```tsx
<h1 className="text-[48px] font-bold text-gray-900 mb-4 tracking-tight leading-tight">
  Create communities, manage your
  <br />
  courses, events and a lot more
</h1>
```

**TweakCN Fix**:
```tsx
<h1 className="text-[48px] font-bold text-foreground mb-4 tracking-tight leading-tight">
  Create communities, manage your
  <br />
  courses, events and a lot more
</h1>
```

**Typography**:
- Font size: 48px (custom, not in scale)
- Font weight: Bold (600)
- Color: `text-foreground` (was `text-gray-900`)
- Tracking: Tight
- Line height: Tight

---

### **3. Subheading with Stat**
```tsx
<p className="text-lg text-gray-600">
  Join <span className="font-semibold text-primary">10,000+</span> educators building engaging learning communities 🚀
</p>
```

**TweakCN Fix**:
```tsx
<p className="text-lg text-muted-foreground">
  Join <span className="font-semibold text-primary">10,000+</span> educators building engaging learning communities 🚀
</p>
```

**Design Tokens**:
- ✅ `text-muted-foreground` - Secondary text (was `text-gray-600`)
- ✅ `text-primary` - Purple highlight for stat

---

### **4. Content Type Filter Pills**
**Purpose**: Toggle between Course/Community/Event modes  
**State**: Single selection with clear (X) button when active

```tsx
<button
  onClick={() => setSelectedContentType('course')}
  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
    selectedContentType === 'course'
      ? 'bg-primary text-white shadow-md shadow-primary/20'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-150 hover:text-gray-900'
  }`}
>
  <BookOpen className="size-4" />
  Create Course
  {selectedContentType === 'course' && <X className="size-3.5 ml-1" />}
</button>
```

**TweakCN Conversion**:
```tsx
// ✅ Active state
bg-primary text-primary-foreground shadow-md shadow-primary/20

// ✅ Inactive state  
bg-secondary text-secondary-foreground hover:bg-secondary/80
```

**Component Variant** (shadcn Badge):
```tsx
<Badge 
  variant={selectedContentType === 'course' ? 'default' : 'secondary'}
  className={cn(
    "cursor-pointer px-4 py-2 text-sm gap-2",
    selectedContentType === 'course' && "shadow-md shadow-primary/20"
  )}
  onClick={() => setSelectedContentType('course')}
>
  <BookOpen className="size-4" />
  Create Course
  {selectedContentType === 'course' && <X className="size-3.5 ml-1" />}
</Badge>
```

---

### **5. Prompt Input Box**
**The centerpiece** of the page - large textarea with gradient glow effect

#### **Container with Gradient Glow**
```tsx
<div className="relative group">
  {/* Gradient glow blur */}
  <div className={`absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur-lg transition-opacity ${
    isFocused ? 'opacity-30' : 'opacity-10 group-hover:opacity-20'
  }`} />
  
  {/* White box */}
  <div className={`relative bg-white rounded-2xl shadow-xl transition-all ${
    isFocused ? 'border border-primary/25 shadow-lg' : 'border border-gray-200/80'
  } p-3`}>
    {/* Content */}
  </div>
</div>
```

**TweakCN Tokens**:
- ✅ `from-primary` - Gradient start (purple)
- ✅ `border-primary/25` - Focus state border
- ✅ `border` - Default border (gray-200 equivalent)

**States**:
1. **Default**: Subtle glow (opacity-10), gray border
2. **Hover**: Moderate glow (opacity-20)
3. **Focus**: Strong glow (opacity-30), purple border

---

#### **Attachment Chips**
**Shown when files are attached**

```tsx
<div className="flex flex-wrap gap-2 px-4 pt-3 pb-2">
  {attachments.map((attachment) => (
    <div
      key={attachment.id}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-sm transition-colors group"
    >
      <File className="size-3.5 text-gray-500" />
      <span className="text-gray-700 max-w-[200px] truncate">{attachment.name}</span>
      <span className="text-xs text-gray-400">{attachment.size}</span>
      <button onClick={() => removeAttachment(attachment.id)}>
        <X className="size-3 text-gray-500" />
      </button>
    </div>
  ))}
</div>
```

**TweakCN Conversion**:
```tsx
// ✅ Chip background
bg-muted hover:bg-accent // Instead of bg-gray-50 hover:bg-gray-100

// ✅ Chip border
border // Default border

// ✅ Chip text
text-foreground // Instead of text-gray-700

// ✅ Metadata text
text-muted-foreground // Instead of text-gray-400
```

**shadcn Equivalent**:
```tsx
<Badge variant="secondary" className="gap-2 group">
  <File className="size-3.5" />
  <span className="max-w-[200px] truncate">{attachment.name}</span>
  <span className="text-xs text-muted-foreground">{attachment.size}</span>
  <button className="opacity-0 group-hover:opacity-100">
    <X className="size-3" />
  </button>
</Badge>
```

---

#### **Auto-expanding Textarea**
```tsx
<textarea
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  placeholder={placeholderText}
  rows={3}
  className="w-full px-4 py-6 text-gray-900 placeholder-gray-400 focus:outline-none text-base resize-none"
  ref={textareaRef}
  style={{ minHeight: '72px', maxHeight: '200px', overflow: 'auto' }}
/>
```

**TweakCN Conversion**:
```tsx
className="w-full px-4 py-6 text-foreground placeholder:text-muted-foreground focus:outline-none text-base resize-none"
```

**Auto-expand Logic**:
```tsx
useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto'
    const scrollHeight = textareaRef.current.scrollHeight
    const minHeight = 72  // 3 rows minimum
    const maxHeight = 200 // Maximum before scrolling
    textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`
  }
}, [prompt])
```

---

#### **Bottom Action Bar**

```
[+] [|||] [S W D Z] _________ [🎤] [✨ Surprise me] [→]
```

**Component Structure**:
```tsx
<div className="flex items-center justify-between gap-2 px-4 py-2 border-t border-gray-100 mt-2">
  {/* Left: Tools */}
  <div className="flex items-center gap-2">
    <button>+ Add attachment</button>
    <button>||| Templates</button>
    <IntegrationBadges />
  </div>
  
  {/* Right: Actions */}
  <div className="flex items-center gap-2">
    <button>🎤 Voice</button>
    <button>✨ Surprise me</button>
    <button>→ Submit</button>
  </div>
</div>
```

---

##### **Attachment Button** (+ icon)
```tsx
<button
  type="button"
  className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors"
  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
>
  <Plus className="size-5 text-gray-600" />
</button>
```

**TweakCN Conversion**:
```tsx
<button className="p-2 hover:bg-accent rounded-full border transition-colors">
  <Plus className="size-5 text-muted-foreground" />
</button>
```

**shadcn Equivalent**:
```tsx
<Button variant="outline" size="icon" className="rounded-full">
  <Plus className="size-5" />
</Button>
```

---

##### **Templates Button** (||| icon)
```tsx
<button
  type="button"
  className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors"
>
  <div className="size-5 flex items-center justify-center text-gray-600 font-medium text-xs">
    |||
  </div>
</button>
```

**TweakCN Conversion**:
```tsx
<button className="p-2 hover:bg-accent rounded-full border transition-colors">
  <div className="size-5 flex items-center justify-center text-muted-foreground font-medium text-xs">
    |||
  </div>
</button>
```

---

##### **Integration Badges** (Slack, WhatsApp, Discord, Zoom)
**Purpose**: Show available integrations

```tsx
<div className="flex items-center -space-x-2 ml-2" title="Available integrations...">
  {/* Slack */}
  <div className="size-6 rounded-full bg-[#4A154B] border-2 border-white flex items-center justify-center">
    <span className="text-white text-[10px] font-semibold">S</span>
  </div>
  
  {/* WhatsApp */}
  <div className="size-6 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center">
    <span className="text-white text-[10px] font-semibold">W</span>
  </div>
  
  {/* Discord */}
  <div className="size-6 rounded-full bg-[#5865F2] border-2 border-white flex items-center justify-center">
    <span className="text-white text-[10px] font-semibold">D</span>
  </div>
  
  {/* Zoom */}
  <div className="size-6 rounded-full bg-[#2D8CFF] border-2 border-white flex items-center justify-center">
    <span className="text-white text-[10px] font-semibold">Z</span>
  </div>
</div>
```

**Design Notes**:
- Hardcoded brand colors (OK - not part of TweakCN system)
- Overlapping badges (`-space-x-2`) for compact display
- White border to separate overlapping circles
- Tiny text (10px) for initials

**shadcn Equivalent** (using Avatar):
```tsx
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

<div className="flex -space-x-2">
  <Avatar className="size-6 bg-[#4A154B] border-2 border-white">
    <AvatarFallback className="text-white text-[10px]">S</AvatarFallback>
  </Avatar>
  {/* Repeat for W, D, Z */}
</div>
```

---

##### **Voice Input Button**
```tsx
<button
  type="button"
  className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors"
>
  <svg className="size-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
</button>
```

**TweakCN + shadcn**:
```tsx
<Button variant="outline" size="icon" className="rounded-full">
  <Mic className="size-5" />
</Button>
```

---

##### **"Surprise Me" Button**
**Most prominent secondary action** - purple pill with Sparkles icon

```tsx
<button
  type="button"
  onClick={() => {
    const randomPrompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)]
    setPrompt(randomPrompt)
  }}
  className="flex items-center gap-2 px-3 py-2 bg-[#420D74] hover:bg-[#531596] text-white rounded-full text-xs font-medium transition-all shadow-sm hover:shadow-md"
>
  <Sparkles className="size-3.5" />
  Surprise me
</button>
```

**TweakCN Conversion**:
```tsx
<button className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-xs font-medium transition-all shadow-sm hover:shadow-md">
  <Sparkles className="size-3.5" />
  Surprise me
</button>
```

**shadcn Equivalent**:
```tsx
<Button variant="default" size="sm" className="rounded-full gap-2">
  <Sparkles className="size-3.5" />
  Surprise me
</Button>
```

---

##### **Submit Button** (Arrow icon)
**Main CTA** - purple circle with arrow, disabled when empty

```tsx
<button
  type="submit"
  disabled={!prompt.trim() || isLoading}
  className={`p-2 bg-[#420D74] hover:bg-[#531596] disabled:bg-gray-300 disabled:hover:bg-gray-300 rounded-full transition-all ${
    isLoading ? 'animate-pulse' : ''
  }`}
>
  <svg className={`size-5 ${prompt.trim() && !isLoading ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</button>
```

**TweakCN Conversion**:
```tsx
<button
  type="submit"
  disabled={!prompt.trim() || isLoading}
  className={cn(
    "p-2 bg-primary hover:bg-primary/90 rounded-full transition-all",
    "disabled:bg-muted disabled:hover:bg-muted",
    isLoading && "animate-pulse"
  )}
>
  <ArrowRight className={cn(
    "size-5",
    prompt.trim() && !isLoading ? "text-primary-foreground" : "text-muted-foreground"
  )} />
</button>
```

**shadcn Equivalent**:
```tsx
<Button 
  type="submit" 
  size="icon" 
  className="rounded-full"
  disabled={!prompt.trim() || isLoading}
>
  <ArrowRight className="size-5" />
</Button>
```

---

### **6. Attachment Menu Popover**
**Triggered by**: Plus (+) button  
**Position**: Below the button  
**Backdrop**: Dismissible overlay

```tsx
{showAttachmentMenu && (
  <>
    <div className="fixed inset-0 z-40" onClick={() => setShowAttachmentMenu(false)} />
    
    <div className="absolute z-50 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
      <div className="py-2">
        {/* Upload file */}
        <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <Paperclip className="size-4 text-gray-500 group-hover:text-[#420D74] transition-colors" />
            <span className="text-sm text-gray-700">Upload file</span>
          </div>
          <span className="text-xs text-gray-400 font-mono">⌘U</span>
        </button>
        
        <div className="my-1 mx-4 border-t border-gray-100" />
        
        {/* Google Drive */}
        <button className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <Folder className="size-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm text-gray-700">Google Drive</span>
          </div>
          <span className="text-xs text-gray-400 font-mono">⌘D</span>
        </button>
        
        {/* ... more items */}
      </div>
    </div>
  </>
)}
```

**TweakCN Conversion**:
```tsx
{/* Menu item */}
<button className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center justify-between group">
  <div className="flex items-center gap-3">
    <Paperclip className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
    <span className="text-sm text-foreground">Upload file</span>
  </div>
  <span className="text-xs text-muted-foreground font-mono">⌘U</span>
</button>
```

**shadcn Equivalent** (use Popover component):
```tsx
<Popover open={showAttachmentMenu} onOpenChange={setShowAttachmentMenu}>
  <PopoverTrigger asChild>
    <Button variant="outline" size="icon" className="rounded-full">
      <Plus className="size-5" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-64 p-2">
    <Command>
      <CommandGroup>
        <CommandItem onSelect={() => handleFileUpload()}>
          <Paperclip className="size-4 mr-3" />
          <span>Upload file</span>
          <span className="ml-auto text-xs text-muted-foreground font-mono">⌘U</span>
        </CommandItem>
        {/* More items */}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>
```

**Menu Items**:
1. **Upload file** - Paperclip icon, gray → purple on hover
2. **Google Drive** - Folder icon, blue (brand color)
3. **Paste link** - Link2 icon, gray → purple on hover
4. **Insert image** - Image icon, gray → purple on hover
5. **Embed video** - Video icon, gray → purple on hover

**Keyboard Shortcuts** (shown on right):
- ⌘U - Upload file
- ⌘D - Google Drive
- ⌘L - Paste link
- ⌘I - Insert image
- ⌘V - Embed video

---

### **7. Google Drive Picker Modal**
**Full-screen modal** for selecting files from Google Drive

```tsx
{showDrivePicker && (
  <>
    {/* Backdrop */}
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
      onClick={() => setShowDrivePicker(false)}
    />
    
    {/* Modal */}
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Folder className="size-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Select from Google Drive</h2>
              <p className="text-sm text-gray-500">Choose files to attach</p>
            </div>
          </div>
          <button onClick={() => setShowDrivePicker(false)}>
            <X className="size-5 text-gray-500" />
          </button>
        </div>
        
        {/* File List */}
        <div className="p-6 max-h-[400px] overflow-y-auto">
          {mockFiles.map((file) => (
            <button 
              className="w-full p-4 hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-[#420D74]/30 transition-all flex items-center gap-4 group"
            >
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                <file.icon className="size-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{file.type} • {file.size}</p>
              </div>
              <ChevronDown className="size-4 text-gray-400 -rotate-90" />
            </button>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button onClick={() => setShowDrivePicker(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  </>
)}
```

**TweakCN Conversion**:
```tsx
{/* Modal header text */}
<h2 className="text-lg font-semibold text-foreground">Select from Google Drive</h2>
<p className="text-sm text-muted-foreground">Choose files to attach</p>

{/* File card */}
<button className="w-full p-4 hover:bg-accent rounded-lg border hover:border-primary/30 transition-all flex items-center gap-4 group">
  <div className="p-2 bg-muted rounded-lg group-hover:bg-blue-50 transition-colors">
    <File className="size-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
  </div>
  <div className="flex-1 text-left">
    <p className="text-sm font-medium text-foreground">{file.name}</p>
    <p className="text-xs text-muted-foreground">{file.type} • {file.size}</p>
  </div>
</button>
```

**shadcn Equivalent** (use Dialog component):
```tsx
<Dialog open={showDrivePicker} onOpenChange={setShowDrivePicker}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Folder className="size-5 text-blue-600" />
        </div>
        Select from Google Drive
      </DialogTitle>
      <DialogDescription>
        Choose files to attach
      </DialogDescription>
    </DialogHeader>
    
    <ScrollArea className="max-h-[400px]">
      {/* File list */}
    </ScrollArea>
    
    <DialogFooter>
      <Button variant="outline" onClick={() => setShowDrivePicker(false)}>
        Cancel
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### **8. Quick Action Pills**
**Context-aware buttons** that change based on selected content type

#### **Course Quick Actions** (6 buttons)
```tsx
{selectedContentType === 'course' && (
  <>
    <button className="group bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200/80 hover:border-[#420D74]/30 rounded-full px-5 py-2.5 text-sm text-gray-700 hover:text-[#420D74] transition-all shadow-sm hover:shadow-md flex items-center gap-2">
      <BookOpen className="size-3.5 text-gray-500 group-hover:text-[#420D74] transition-colors" />
      Full course with modules
    </button>
    
    <button>Cohort-based program</button>
    <button>Quick mini course</button>
    <button>Self-paced course</button>
    <button>With certification</button>
    <button>Membership program</button>
  </>
)}
```

**TweakCN Conversion**:
```tsx
<button className="group bg-card/80 backdrop-blur-sm hover:bg-card border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2">
  <BookOpen className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
  Full course with modules
</button>
```

**shadcn Equivalent**:
```tsx
<Badge 
  variant="outline" 
  className="cursor-pointer backdrop-blur-sm hover:border-primary/30 px-5 py-2.5 gap-2 shadow-sm hover:shadow-md transition-all group"
>
  <BookOpen className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
  Full course with modules
</Badge>
```

#### **Community Quick Actions** (5 buttons)
- Slack community
- Private forum
- Mastermind group
- Paid membership
- Alumni network

#### **Event Quick Actions** (dynamic)
- Virtual workshop
- In-person conference
- Hybrid summit
- Webinar series
- Networking event

---

## 🎭 **Interactive States**

### **1. Prompt Box States**
```tsx
// Default
border border-gray-200/80
glow: opacity-10

// Hover
glow: opacity-20

// Focus
border border-primary/25
shadow-lg
glow: opacity-30
```

### **2. Button States**
```tsx
// Primary button (purple)
bg-primary
hover:bg-primary/90
active:scale-[0.98]
disabled:bg-muted

// Secondary button (outline)
bg-card
border
hover:bg-accent hover:border-primary/30
```

### **3. Pill Button States**
```tsx
// Inactive
bg-secondary text-secondary-foreground

// Active/Selected
bg-primary text-primary-foreground shadow-md shadow-primary/20

// Hover (inactive)
hover:bg-secondary/80 hover:text-primary
```

---

## 🎨 **Animations**

### **1. Typing Placeholder Effect**
```tsx
useEffect(() => {
  let charIndex = 0
  let isDeleting = false
  
  const type = () => {
    const currentPlaceholder = placeholders[placeholderIndex]
    
    if (!isDeleting && charIndex <= currentPlaceholder.length) {
      setPlaceholderText(currentPlaceholder.substring(0, charIndex))
      charIndex++
      setTimeout(type, 50)
    } else if (!isDeleting && charIndex > currentPlaceholder.length) {
      setTimeout(() => {
        isDeleting = true
        type()
      }, 2000)
    } else if (isDeleting && charIndex > 0) {
      charIndex--
      setPlaceholderText(currentPlaceholder.substring(0, charIndex))
      setTimeout(type, 30)
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
      setTimeout(type, 500)
    }
  }
  
  setTimeout(type, 100)
}, [placeholderIndex])
```

**Timing**:
- Typing speed: 50ms per character
- Delete speed: 30ms per character
- Pause at end: 2000ms
- Pause at start: 500ms

### **2. Popover Animations**
```tsx
className="animate-in zoom-in-95 fade-in duration-200"
```
- Scales from 95% to 100%
- Fades in simultaneously
- Duration: 200ms

### **3. Modal Animations**
```tsx
// Backdrop
className="animate-in fade-in duration-200"

// Modal content
className="animate-in zoom-in-95 fade-in duration-200"
```

### **4. Button Micro-interactions**
```tsx
// Press effect
active:scale-[0.98]

// Pulse (loading)
isLoading && "animate-pulse"

// Hover shadow
shadow-sm hover:shadow-md
```

---

## 📏 **Spacing & Sizing**

### **Container Widths**
```tsx
max-w-5xl    // Hero section (1024px)
max-w-2xl    // Google Drive modal (672px)
max-w-[200px] // Attachment chip truncation
w-64         // Attachment menu popover (256px)
```

### **Heights**
```tsx
min-h-screen     // Full page
minHeight: 72px  // Textarea minimum (3 rows)
maxHeight: 200px // Textarea maximum
max-h-[400px]    // Drive picker scrollable area
```

### **Padding & Margins**
```tsx
px-6 py-16      // Hero section padding
px-4 py-6       // Textarea padding
px-4 py-3       // Menu item padding
px-5 py-2.5     // Pill button padding
gap-2           // Chip spacing
gap-3           // General spacing
```

### **Border Radius**
```tsx
rounded-full    // Pills, buttons (9999px)
rounded-2xl     // Prompt box, modals (16px)
rounded-xl      // Popover (12px)
rounded-lg      // Cards, chips (8px)
```

---

## ♿ **Accessibility**

### **Keyboard Shortcuts**
```tsx
⌘K or Ctrl+K    // Open search
⌘U              // Upload file
⌘D              // Google Drive
⌘L              // Paste link
⌘I              // Insert image
⌘V              // Embed video
Enter           // Submit (without Shift)
Shift+Enter     // New line in textarea
```

### **ARIA Labels**
```tsx
title="Add attachment"
title="Voice input"
title="Available integrations: Slack, WhatsApp, Discord, Zoom"
alt=""  // Decorative images
```

### **Focus Management**
```tsx
// Auto-focus textarea on mount
useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.focus()
  }
}, [])

// Focus visible states
focus:outline-none // Custom focus styling
focus:border-primary/25 // Purple border
```

### **Screen Reader Support**
- Proper heading hierarchy (h1 → p)
- Semantic HTML (button, form, textarea)
- Icon buttons have titles
- Disabled states properly handled

---

## 🐛 **Common Issues & Fixes**

### **Issue 1: Hardcoded Purple**
**Problem**: Using `bg-[#420D74]` instead of `bg-primary`

**Files to fix**:
- Line 183: Badge background
- Line 214: Active pill button
- Line 238: Active pill button  
- Line 262: Active pill button
- Line 391: "Surprise me" button
- Line 401: Submit button
- Line 445: Menu hover color
- Line 627: Selected quick action
- Line 647: Selected quick action
- Line 667: Selected quick action
- Line 687: Selected quick action
- Line 707: Selected quick action
- Line 727: Selected quick action

**Global find/replace**:
```bash
# Find
bg-\[#420D74\]

# Replace with
bg-primary

# Find
hover:bg-\[#531596\]

# Replace with
hover:bg-primary/90

# Find
text-\[#420D74\]

# Replace with
text-primary

# Find
border-\[#420D74\]

# Replace with
border-primary
```

### **Issue 2: Gray Scale Inconsistency**
**Problem**: Using `text-gray-600` instead of `text-muted-foreground`

**Replacements**:
```tsx
text-gray-900 → text-foreground
text-gray-700 → text-foreground
text-gray-600 → text-muted-foreground
text-gray-500 → text-muted-foreground
text-gray-400 → text-muted-foreground

bg-gray-50 → bg-muted or bg-accent
bg-gray-100 → bg-secondary

border-gray-200 → border
border-gray-100 → border (or border/50 for lighter)
```

### **Issue 3: Not Using shadcn Components**
**Problem**: Custom buttons instead of shadcn Button component

**Migration plan**:
1. Convert all `<button>` to `<Button>`
2. Use proper variants (default, outline, ghost)
3. Use proper sizes (default, sm, lg, icon)
4. Maintain custom styling with `className` prop

**Example**:
```tsx
// Before
<button className="px-4 py-2 bg-[#420D74] text-white rounded-lg">

// After
<Button variant="default" className="rounded-lg">
```

---

## 📊 **Component Inventory**

### **shadcn Components to Use**
- [ ] **Button** - All interactive buttons
- [ ] **Badge** - Version badge, pills, chips
- [ ] **Popover** - Attachment menu
- [ ] **Dialog** - Google Drive picker
- [ ] **Avatar** - Integration badges
- [ ] **Textarea** - Already using custom (OK)
- [ ] **ScrollArea** - Drive picker file list
- [ ] **Command** - Attachment menu items
- [ ] **Separator** - Dividers in menu

### **Custom Components (Keep)**
- ✅ **Auto-typing placeholder** - Unique UX feature
- ✅ **Gradient glow effect** - Custom visual design
- ✅ **Auto-expanding textarea** - Specific behavior
- ✅ **Attachment chips** - Custom layout

---

## 🚀 **Migration Priority**

### **Phase 1: Fix Design Tokens** (High Priority)
1. Replace all `bg-[#420D74]` → `bg-primary`
2. Replace all `text-gray-XXX` → semantic tokens
3. Replace all `border-gray-XXX` → `border`

### **Phase 2: Add shadcn Components** (Medium Priority)
1. Convert buttons to `<Button>`
2. Add `<Badge>` for pills
3. Add `<Dialog>` for Drive picker
4. Add `<Popover>` for attachment menu

### **Phase 3: Enhance Accessibility** (Low Priority)
1. Add proper ARIA labels
2. Test keyboard navigation
3. Test screen reader
4. Add focus visible indicators

---

## ✅ **Developer Checklist**

Before implementing a new page based on this:
- [ ] Use TweakCN tokens (`bg-primary` not `bg-[#420D74]`)
- [ ] Use shadcn components when possible
- [ ] Maintain auto-typing effect for placeholder
- [ ] Keep gradient glow on focus
- [ ] Implement keyboard shortcuts
- [ ] Test attachment upload flow
- [ ] Test Google Drive integration
- [ ] Verify accessibility
- [ ] Test on mobile (responsive)
- [ ] Dark mode support (auto with tokens)

---

## 📖 **Related Documentation**

- `/TWEAKCN_DESIGN_SYSTEM.md` - Master design system guide
- `/DESIGN_SYSTEM_DOCUMENTATION_PLAN.md` - Overall documentation plan
- `/SEARCH_PRD.md` - Search component spec (similar modal pattern)

---

**Last Updated**: December 2024  
**Component**: WelcomeScreen.tsx  
**Status**: ⚠️ Needs token migration  
**Priority**: High (landing page)

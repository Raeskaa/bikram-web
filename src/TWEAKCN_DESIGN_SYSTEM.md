# TweakCN Design System Documentation
## Complete Design Token System & Usage Guide

---

## 🎯 **THE PROBLEM WE'RE SOLVING**

**Current State (WRONG):**
```tsx
// ❌ Hardcoded colors bypass the design system
<button className="bg-[#420D74] text-white hover:bg-[#350a5f]">
<div className="text-gray-600 border-gray-200">
<Badge className="bg-purple-50 text-[#420D74]">
```

**Correct State (RIGHT):**
```tsx
// ✅ Using semantic design tokens
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
<div className="text-muted-foreground border">
<Badge variant="default">
```

---

## 🎨 **YOUR TWEAKCN DESIGN TOKENS**

### **Complete Token Map (from globals.css)**

```css
/* LIGHT MODE (Default) */
:root {
  /* === SURFACES === */
  --background: #f9f9f5;          /* Main app background (warm cream) */
  --card: #f9f9f5;                /* Card backgrounds */
  --popover: #ffffff;             /* Popover/dropdown backgrounds */
  --sidebar: #f5f4ef;             /* Sidebar background */
  
  /* === TEXT COLORS === */
  --foreground: #3d3929;          /* Primary text (dark brown) */
  --card-foreground: #141413;     /* Card text (darker) */
  --popover-foreground: #28261b;  /* Popover text */
  --muted-foreground: #83827d;    /* Secondary/muted text */
  --sidebar-foreground: #3d3d3a;  /* Sidebar text */
  
  /* === BRAND COLORS === */
  --primary: #420d74;             /* ⭐ YOUR PURPLE - Main brand color */
  --primary-foreground: #ffffff;  /* Text on purple (white) */
  --sidebar-primary: #c96442;     /* Sidebar accent (orange) */
  
  /* === INTERACTIVE STATES === */
  --secondary: #e9e6dc;           /* Secondary buttons/elements */
  --secondary-foreground: #535146;/* Text on secondary */
  --muted: #f5f3f0;               /* Muted backgrounds */
  --accent: #f1eee5;              /* Accent backgrounds */
  --accent-foreground: #28261b;   /* Text on accent */
  
  /* === SEMANTIC COLORS === */
  --destructive: #141413;         /* Delete/danger actions */
  --destructive-foreground: #ffffff; /* Text on destructive */
  
  /* === BORDERS & INPUTS === */
  --border: #ebeae5;              /* Default borders */
  --input: #e5e3d7;               /* Input borders */
  --ring: #420d74;                /* Focus ring (purple) */
  
  /* === CHARTS === */
  --chart-1: #a67ec9;             /* Purple light */
  --chart-2: #8e5eba;             /* Purple medium */
  --chart-3: #ede9de;             /* Cream */
  --chart-4: #e0ddd1;             /* Beige */
  --chart-5: #be98e1;             /* Purple lighter */
  
  /* === SIDEBAR SPECIFICS === */
  --sidebar-accent: #e9e6dc;
  --sidebar-accent-foreground: #343434;
  --sidebar-border: #ebebeb;
  --sidebar-ring: #b5b5b5;
  
  /* === RADIUS & SHADOWS === */
  --radius: 0.475rem;             /* 7.6px - base border radius */
  --shadow-sm: 0px 0px 3px 0px hsl(0 0% 0% / 0.10), 0px 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0px 0px 3px 0px hsl(0 0% 0% / 0.10), 0px 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0px 0px 3px 0px hsl(0 0% 0% / 0.10), 0px 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0px 0px 3px 0px hsl(0 0% 0% / 0.10), 0px 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0px 0px 3px 0px hsl(0 0% 0% / 0.25);
  
  /* === SPACING === */
  --spacing: 0.28rem;             /* 4.48px - base spacing unit */
}
```

---

## 🔄 **TOKEN TO TAILWIND MAPPING**

### **Background Colors**
```tsx
className="bg-background"    // #f9f9f5 - Main background
className="bg-card"          // #f9f9f5 - Card background
className="bg-popover"       // #ffffff - Popover background
className="bg-primary"       // #420d74 - ⭐ PURPLE (your brand)
className="bg-secondary"     // #e9e6dc - Secondary backgrounds
className="bg-muted"         // #f5f3f0 - Muted backgrounds
className="bg-accent"        // #f1eee5 - Accent backgrounds
className="bg-destructive"   // #141413 - Destructive actions
className="bg-sidebar"       // #f5f4ef - Sidebar background
```

### **Text Colors**
```tsx
className="text-foreground"          // #3d3929 - Primary text
className="text-muted-foreground"    // #83827d - Secondary text
className="text-primary"             // #420d74 - Purple text
className="text-primary-foreground"  // #ffffff - Text on purple
className="text-secondary-foreground" // #535146 - Text on secondary
className="text-accent-foreground"   // #28261b - Text on accent
className="text-destructive"         // #141413 - Destructive text
className="text-card-foreground"     // #141413 - Card text
```

### **Borders**
```tsx
className="border"                // #ebeae5 - Default border
className="border-input"          // #e5e3d7 - Input border
className="border-primary"        // #420d74 - Purple border
className="border-destructive"    // #141413 - Destructive border
```

### **Opacity Variants** (IMPORTANT!)
```tsx
className="bg-primary/90"         // 90% opacity purple
className="bg-primary/80"         // 80% opacity
className="bg-primary/50"         // 50% opacity
className="bg-primary/10"         // 10% opacity (subtle bg)
className="text-primary/80"       // 80% opacity purple text
className="border-primary/50"     // 50% opacity purple border
```

### **Radius Variants**
```tsx
className="rounded-sm"            // calc(var(--radius) - 4px) = 3.6px
className="rounded-md"            // calc(var(--radius) - 2px) = 5.6px
className="rounded-lg"            // var(--radius) = 7.6px (BASE)
className="rounded-xl"            // calc(var(--radius) + 4px) = 11.6px
```

### **Shadows**
```tsx
className="shadow-sm"             // Subtle shadow
className="shadow-md"             // Medium shadow
className="shadow-lg"             // Large shadow
className="shadow-xl"             // Extra large shadow
className="shadow-2xl"            // Maximum shadow
```

---

## ✅ **CORRECT USAGE PATTERNS**

### **1. Buttons (Using shadcn Button component)**

```tsx
import { Button } from '@/components/ui/button'

// ✅ PRIMARY BUTTON - Purple brand color
<Button variant="default">
  Create Course
</Button>
// Renders as: bg-primary text-primary-foreground hover:bg-primary/90

// ✅ SECONDARY BUTTON - Subtle background
<Button variant="secondary">
  Cancel
</Button>
// Renders as: bg-secondary text-secondary-foreground hover:bg-secondary/80

// ✅ OUTLINE BUTTON - Bordered
<Button variant="outline">
  Learn More
</Button>
// Renders as: border bg-background hover:bg-accent

// ✅ GHOST BUTTON - Minimal
<Button variant="ghost">
  Settings
</Button>
// Renders as: hover:bg-accent hover:text-accent-foreground

// ✅ DESTRUCTIVE BUTTON - Delete/remove
<Button variant="destructive">
  Delete
</Button>
// Renders as: bg-destructive text-white

// ❌ WRONG - Don't hardcode colors
<Button className="bg-[#420D74] hover:bg-[#350a5f]">
  Bad Button
</Button>
```

### **2. Badges**

```tsx
import { Badge } from '@/components/ui/badge'

// ✅ PRIMARY BADGE - Purple
<Badge variant="default">Featured</Badge>
// Renders as: bg-primary text-primary-foreground

// ✅ SECONDARY BADGE - Neutral
<Badge variant="secondary">Draft</Badge>
// Renders as: bg-secondary text-secondary-foreground

// ✅ OUTLINE BADGE - Bordered
<Badge variant="outline">Public</Badge>
// Renders as: border border-primary

// ✅ CUSTOM SEMANTIC COLORS (when needed)
<Badge className="bg-green-100 text-green-700">Active</Badge>
<Badge className="bg-blue-100 text-blue-700">New</Badge>
<Badge className="bg-red-100 text-red-700">Urgent</Badge>

// ❌ WRONG - Don't use hardcoded purple
<Badge className="bg-[#420D74] text-white">Bad Badge</Badge>
```

### **3. Cards**

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

// ✅ CORRECT - Uses design tokens
<Card>
  <CardHeader>
    <CardTitle>Course Title</CardTitle>
    <CardDescription>Course description</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Additional info</p>
  </CardContent>
  <CardFooter>
    <Button variant="default">Enroll</Button>
  </CardFooter>
</Card>

// ✅ HOVER STATE - Purple accent
<Card className="hover:border-primary/50 transition-colors cursor-pointer">
  ...
</Card>

// ❌ WRONG - Hardcoded colors
<Card className="hover:border-[#420D74]/50">
  ...
</Card>
```

### **4. Text Hierarchy**

```tsx
// ✅ CORRECT - Semantic text colors
<h1 className="text-foreground">Main Heading</h1>
<p className="text-foreground">Body text</p>
<p className="text-muted-foreground">Secondary text</p>
<span className="text-primary">Purple accent text</span>
<small className="text-muted-foreground">Caption text</small>

// ❌ WRONG - Hardcoded grays
<p className="text-gray-900">Bad text</p>
<p className="text-gray-600">Bad secondary</p>
<span className="text-[#420D74]">Bad purple</span>
```

### **5. Backgrounds**

```tsx
// ✅ CORRECT - Semantic backgrounds
<div className="bg-background">Main container</div>
<div className="bg-card">Card container</div>
<div className="bg-muted">Subtle background</div>
<div className="bg-accent">Highlighted section</div>
<div className="bg-primary">Purple hero section</div>

// �� WRONG - Hardcoded backgrounds
<div className="bg-[#f9f9f5]">Bad background</div>
<div className="bg-gray-50">Bad subtle bg</div>
```

### **6. Borders**

```tsx
// ✅ CORRECT - Semantic borders
<div className="border">Default border</div>
<div className="border-b">Bottom border</div>
<div className="border-primary">Purple border</div>
<div className="border-input">Input border</div>

// ❌ WRONG - Hardcoded borders
<div className="border-gray-200">Bad border</div>
<div className="border-[#ebeae5]">Bad hardcoded</div>
```

### **7. Focus States**

```tsx
// ✅ CORRECT - Purple focus ring
<input className="focus:ring-ring focus:border-ring" />
<button className="focus-visible:ring-ring focus-visible:ring-2" />

// ❌ WRONG - Hardcoded focus
<input className="focus:ring-[#420D74]" />
```

### **8. Hover States**

```tsx
// ✅ CORRECT - Semantic hover states
<button className="hover:bg-accent hover:text-accent-foreground">
<a className="hover:text-primary">
<div className="hover:border-primary/50">

// ❌ WRONG - Hardcoded hovers
<button className="hover:bg-gray-100">
<a className="hover:text-[#420D74]">
```

---

## 📋 **COMPONENT MIGRATION GUIDE**

### **Step 1: Identify Hardcoded Colors**

Search your codebase for:
```bash
# Purple variants
#420D74, #420d74, #350a5f, #5a1294, #331059

# Gray scale
gray-50, gray-100, gray-200, gray-300, gray-400, gray-500, gray-600, gray-700, gray-800, gray-900

# Any hex colors in className
bg-[#, text-[#, border-[#
```

### **Step 2: Replace with Design Tokens**

**Before:**
```tsx
<button className="bg-[#420D74] text-white hover:bg-[#350a5f] border border-gray-200">
  Click Me
</button>
```

**After:**
```tsx
<Button variant="default">
  Click Me
</Button>
```

**OR if custom styling needed:**
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90 border">
  Click Me
</button>
```

### **Step 3: Common Replacements**

| ❌ Old (Hardcoded) | ✅ New (Token) | Usage |
|-------------------|---------------|-------|
| `bg-[#420D74]` | `bg-primary` | Purple backgrounds |
| `text-[#420D74]` | `text-primary` | Purple text |
| `border-[#420D74]` | `border-primary` | Purple borders |
| `hover:bg-[#350a5f]` | `hover:bg-primary/90` | Purple hover |
| `bg-gray-50` | `bg-muted` or `bg-accent` | Light backgrounds |
| `bg-gray-100` | `bg-secondary` | Secondary backgrounds |
| `text-gray-900` | `text-foreground` | Primary text |
| `text-gray-600` | `text-muted-foreground` | Secondary text |
| `text-gray-500` | `text-muted-foreground` | Tertiary text |
| `border-gray-200` | `border` | Default borders |
| `border-gray-300` | `border-input` | Input borders |
| `bg-white` | `bg-card` or `bg-popover` | Card/modal backgrounds |
| `text-white` | `text-primary-foreground` | Text on purple |
| `shadow-md` | `shadow-md` | ✅ Already correct! |
| `rounded-lg` | `rounded-lg` | ✅ Already correct! |

---

## 🎨 **WHEN TO USE EACH TOKEN**

### **Primary (`--primary: #420d74`)**
**Use for:**
- Main CTAs (Create, Save, Submit buttons)
- Active states (selected tabs, active nav items)
- Links and interactive elements
- Focus indicators
- Brand-colored badges
- Important highlights

**Examples:**
```tsx
<Button variant="default">Create Course</Button>
<a className="text-primary hover:text-primary/80">Learn more</a>
<TabsTrigger className="data-[state=active]:text-primary">Active Tab</TabsTrigger>
<Badge variant="default">Featured</Badge>
```

### **Secondary (`--secondary: #e9e6dc`)**
**Use for:**
- Alternative actions (Cancel, Back buttons)
- Secondary badges
- Disabled states backgrounds
- Neutral highlights

**Examples:**
```tsx
<Button variant="secondary">Cancel</Button>
<Badge variant="secondary">Draft</Badge>
<div className="bg-secondary">Neutral container</div>
```

### **Muted (`--muted: #f5f3f0`)**
**Use for:**
- Code blocks backgrounds
- Input backgrounds
- Disabled elements
- Subtle containers

**Examples:**
```tsx
<code className="bg-muted px-2 py-1 rounded">code snippet</code>
<div className="bg-muted p-4">Subtle section</div>
```

### **Accent (`--accent: #f1eee5`)**
**Use for:**
- Hover states on neutral elements
- Highlighted rows in tables
- Selected items (non-primary)
- Breadcrumb backgrounds

**Examples:**
```tsx
<div className="hover:bg-accent">Hoverable row</div>
<nav className="bg-accent">Breadcrumbs</nav>
```

### **Muted Foreground (`--muted-foreground: #83827d`)**
**Use for:**
- Secondary text (descriptions, captions)
- Placeholder text
- Disabled text
- Helper text
- Metadata (dates, counts)

**Examples:**
```tsx
<p className="text-muted-foreground">Published 2 days ago</p>
<input placeholder="..." className="placeholder:text-muted-foreground" />
<span className="text-muted-foreground">Optional</span>
```

### **Destructive (`--destructive: #141413`)**
**Use for:**
- Delete buttons
- Error states
- Warning indicators
- Irreversible actions

**Examples:**
```tsx
<Button variant="destructive">Delete Account</Button>
<Badge className="bg-destructive text-white">Error</Badge>
<p className="text-destructive">Invalid input</p>
```

---

## 🔍 **DARK MODE SUPPORT**

Your TweakCN system includes dark mode tokens:

```css
.dark {
  --background: #262624;
  --foreground: #c3c0b6;
  --primary: #7034a8;        /* Purple adjusts for dark mode */
  --card: #262624;
  --border: #3e3e38;
  /* ... all tokens auto-adjust */
}
```

**This means:** When you use `bg-primary`, it will automatically be:
- `#420d74` in light mode
- `#7034a8` in dark mode

**No extra code needed!** ✨

```tsx
// ✅ This works in both light and dark mode
<Button variant="default">Works Everywhere</Button>

// ❌ This breaks in dark mode
<button className="bg-[#420D74]">Breaks in Dark Mode</button>
```

---

## 📊 **COMPONENT-BY-COMPONENT TOKEN USAGE**

### **shadcn/ui Button**
```tsx
// Already uses tokens correctly:
default: "bg-primary text-primary-foreground hover:bg-primary/90"
secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
outline: "border bg-background hover:bg-accent hover:text-accent-foreground"
ghost: "hover:bg-accent hover:text-accent-foreground"
destructive: "bg-destructive text-white hover:bg-destructive/90"
```

### **shadcn/ui Badge**
```tsx
// Already uses tokens correctly:
default: "bg-primary text-primary-foreground"
secondary: "bg-secondary text-secondary-foreground"
outline: "border border-primary"
destructive: "bg-destructive text-white"
```

### **shadcn/ui Input**
```tsx
// Already uses tokens correctly:
border-input       // Border color
bg-background      // Background
text-foreground    // Text color
focus:ring-ring    // Focus ring (purple)
```

### **shadcn/ui Card**
```tsx
// Already uses tokens correctly:
bg-card                  // Card background
text-card-foreground     // Card text
border                   // Card border
```

### **shadcn/ui Tabs**
```tsx
// Add this for purple active state:
<TabsTrigger className="data-[state=active]:text-primary">
  Tab Name
</TabsTrigger>
```

---

## ⚠️ **COMMON MISTAKES TO AVOID**

### **Mistake 1: Hardcoding Purple**
```tsx
// ❌ WRONG
<button className="bg-[#420D74]">

// ✅ RIGHT
<Button variant="default">
// OR
<button className="bg-primary">
```

### **Mistake 2: Using Generic Grays**
```tsx
// ❌ WRONG
<p className="text-gray-600">Secondary text</p>
<div className="border-gray-200">

// ✅ RIGHT
<p className="text-muted-foreground">Secondary text</p>
<div className="border">
```

### **Mistake 3: Not Using Opacity Variants**
```tsx
// ❌ WRONG
<div className="bg-[#420D74]/10">  // Hardcoded

// ✅ RIGHT
<div className="bg-primary/10">    // Uses token
```

### **Mistake 4: Inconsistent Hover States**
```tsx
// ❌ WRONG
<button className="bg-primary hover:bg-[#350a5f]">

// ✅ RIGHT
<button className="bg-primary hover:bg-primary/90">
```

### **Mistake 5: Forgetting Dark Mode**
```tsx
// ❌ WRONG - Breaks in dark mode
<div className="bg-white text-black">

// ✅ RIGHT - Works in both modes
<div className="bg-card text-card-foreground">
```

---

## 🚀 **IMPLEMENTATION PLAN**

### **Phase 1: Audit (Week 1)**
1. Search for all hardcoded colors:
   ```bash
   grep -r "#420D74" --include="*.tsx"
   grep -r "gray-[0-9]" --include="*.tsx"
   grep -r "bg-\[#" --include="*.tsx"
   ```

2. Create spreadsheet:
   | File | Line | Current Code | Replacement |
   |------|------|--------------|-------------|
   | AppLayout.tsx | 101 | `bg-[#420D74]` | `bg-primary` |
   | ChatMessage.tsx | 90 | `text-gray-600` | `text-muted-foreground` |

### **Phase 2: Replace Core Components (Week 2)**
1. Replace all button colors → use `Button` component
2. Replace all badge colors → use `Badge` component
3. Replace all card colors → use `Card` component
4. Replace all input colors → use design tokens

### **Phase 3: Replace Page Components (Week 3)**
1. Update AppLayout.tsx
2. Update all Builder components
3. Update all List View components
4. Update all Dashboard components

### **Phase 4: Testing (Week 4)**
1. Test light mode
2. Test dark mode
3. Test all interactive states
4. Test accessibility (contrast ratios)

---

## 📖 **DEVELOPER GUIDELINES**

### **Rule 1: Always Use Semantic Tokens**
```tsx
// ✅ DO
className="bg-primary"
className="text-muted-foreground"
className="border"

// ❌ DON'T
className="bg-[#420D74]"
className="text-gray-600"
className="border-gray-200"
```

### **Rule 2: Use shadcn Components When Possible**
```tsx
// ✅ DO
<Button variant="default">Click Me</Button>
<Badge variant="secondary">Draft</Badge>

// ❌ DON'T (unless absolutely necessary)
<button className="bg-primary px-4 py-2 rounded-lg">Click Me</button>
```

### **Rule 3: Only Hardcode for Semantic Colors**
```tsx
// ✅ ACCEPTABLE - Semantic colors not in design system
<Badge className="bg-green-100 text-green-700">Success</Badge>
<Badge className="bg-red-100 text-red-700">Error</Badge>
<Badge className="bg-blue-100 text-blue-700">Info</Badge>

// ❌ NOT ACCEPTABLE - Brand color exists in design system
<div className="bg-[#420D74]">Purple section</div>
```

### **Rule 4: Test in Dark Mode**
```tsx
// ✅ DO - Works in both modes
<div className="bg-background text-foreground">

// ❌ DON'T - Breaks in dark mode
<div className="bg-white text-black">
```

---

## 🎯 **QUICK REFERENCE**

**Need purple?** → `bg-primary` / `text-primary` / `border-primary`
**Need subtle background?** → `bg-muted` or `bg-accent`
**Need secondary text?** → `text-muted-foreground`
**Need border?** → `border` (no color modifier)
**Need hover?** → `hover:bg-primary/90` or `hover:bg-accent`
**Need focus?** → `focus:ring-ring`
**Need button?** → `<Button variant="default">`
**Need badge?** → `<Badge variant="default">`

---

## ✅ **VALIDATION CHECKLIST**

Before committing code, check:
- [ ] No hardcoded `#420D74` or purple hex values
- [ ] No `text-gray-XXX` classes (use `text-muted-foreground`)
- [ ] No `bg-gray-XXX` classes (use `bg-muted`, `bg-accent`, etc.)
- [ ] No `border-gray-XXX` classes (use `border`)
- [ ] Using `Button` component for buttons
- [ ] Using `Badge` component for badges
- [ ] Tested in both light and dark mode
- [ ] Focus states use `ring-ring`
- [ ] Hover states use token-based colors

---

**This is your source of truth for the TweakCN design system!** 🎨✨

All developers should bookmark this and follow it religiously. Any deviation should be discussed with the design team first.

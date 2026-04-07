# How to Access Phase 1 Event Platform Prototypes

## 🎯 Quick Access

To test all the Phase 1 components I built, **open your browser console** and type:

```javascript
// In your browser console:
window.location.hash = '#phase1-demo'
```

Then refresh the page, or manually change the stage in React DevTools.

---

## 📍 Alternative Access Methods

### Method 1: Update Initial Stage (Recommended for Testing)
In `/App.tsx` line ~241, temporarily change:
```typescript
const [stage, setStage] = useState<Stage>('phase1-demo'); // Changed from 'signin'
```

### Method 2: Add Button to Home Page
You can add a button to `HomeOverview.tsx` that sets stage to 'phase1-demo'

### Method 3: Browser Console Command
```javascript
// Run this in console while app is running:
const event = new CustomEvent('navigate', { detail: { stage: 'phase1-demo' } });
window.dispatchEvent(event);
```

---

## 🎨 What You'll See

A dedicated **Phase 1 Demo Page** with:

### Overview Screen
- 5 component cards (Registration Builder, Registration Form, Calendar, Waitlist, Templates)
- User flow badges (Admin Flow / Learner Flow)
- Click any card to view that component

### Individual Component Demos
Each component is fully interactive with:
- **Registration Form Builder**: Build custom forms with drag-and-drop, preview mode
- **Event Registration Form**: 4 scenarios (Free, Paid, Waitlist, Limited Spots)
- **Add to Calendar**: Dropdown with all calendar options + email invite
- **Waitlist Management**: Full admin panel with stats, tabs, bulk actions
- **Event Templates Library**: 8 templates, search, preview modals

---

## 🧪 Testing Each Component

### 1. Registration Form Builder (Admin Tool)
**What to test:**
- Add new fields (9 types available)
- Reorder fields with up/down arrows
- Edit field labels, placeholders, descriptions
- Toggle required/optional
- Add dropdown options
- Preview mode
- Save form

**Expected behavior:**
- Name & Email fields cannot be deleted (default)
- Preview shows exact form as learner will see
- Fields maintain settings when edited

---

### 2. Event Registration Form (Learner Experience)
**Scenarios available:**
- **Free Event**: Simple registration, no payment
- **Paid Event**: $99, multi-step with payment screen
- **Waitlist**: Full event, join waitlist flow
- **Limited Spots**: Only 3 spots left warning

**What to test:**
- Form validation (email, phone)
- Required field enforcement
- Terms & conditions checkbox
- Payment flow (for paid)
- Multi-step progress
- Success confirmation
- Add to calendar button

**Edge cases covered:**
- Invalid email format
- Missing required fields
- Terms not accepted
- Spots running out warnings

---

### 3. Add to Calendar
**What to test:**
- **Dropdown variant**: Click dropdown, see all calendar options
- **Button variant**: Single action download
- **Email Invite**: Send calendar invite via email

**Supported calendars:**
- Google Calendar (opens web)
- Apple Calendar (.ics download)
- Outlook (opens web)
- Office 365 (opens web)
- Yahoo Calendar (opens web)
- Copy .ics content (clipboard)
- Download .ics file

**What to verify:**
- .ics file downloads correctly
- Calendar links open in new tabs
- Email invite sends (mock)
- Copy to clipboard works
- Success confirmation shows

---

### 4. Waitlist Management (Admin Panel)
**What to test:**

**Stats Dashboard:**
- Capacity utilization (48/50)
- Waiting count
- Notified count
- Claimed count

**Tabs:**
- Waiting (5 people in queue)
- Notified (people who got spots)
- History (claimed/expired)

**Actions:**
- Search by name/email
- Select multiple entries
- Bulk notify
- Promote individual to registered
- Remove from waitlist
- Settings (auto-promotion toggle, notification window)

**Edge cases:**
- Empty states for each tab
- Auto-promotion vs manual
- Spots available alert
- Position in queue

---

### 5. Event Templates Library
**What to test:**

**Templates (8 available):**
- Technical Workshop (popular)
- Product Webinar (popular)
- Networking Mixer
- Online Course Session
- Coffee Chat Meetup
- Virtual Conference
- Design Workshop
- Analytics Review

**Features:**
- Search templates
- Filter by category (All, Workshops, Webinars, etc.)
- Click template card to use it
- Preview modal shows:
  - Full feature list
  - Duration, capacity, format
  - Pricing suggestions
  - Registration fields
  - Usage statistics

**What to verify:**
- Popular badge on trending templates
- Search filters correctly
- Category tabs work
- Preview modal displays all info
- "Use Template" button alerts with template name
- "Create Custom" button works

---

## 🎭 Demo Data

All components use realistic dummy data:

### Waitlist Entries:
- Sarah Johnson (Waiting, #1 in queue)
- Michael Chen (Waiting, #2)
- Emily Rodriguez (Notified)
- David Kim (Claimed)
- Lisa Anderson (Expired)

### Form Fields:
- Name (required, default)
- Email (required, default)
- Company (optional)
- Experience Level (dropdown)

### Event Details:
- Title: "React 18 Deep Dive Workshop"
- Date: March 15, 2025
- Time: 2:00 PM EST
- Type: Virtual
- Capacity: Various per scenario

---

## 🐛 Known Behavior (Not Bugs)

1. **Alerts instead of real actions**: All "save" and "submit" actions show alerts with data - this is intentional for prototype
2. **Console logs**: Check browser console for detailed data output
3. **No backend**: Everything is frontend-only with mock data
4. **LocalStorage not used**: Data doesn't persist between reloads (prototype only)

---

## 💡 Tips for Testing

1. **Open Browser Console**: All actions log data there
2. **Test Edge Cases**: Try invalid emails, leave required fields empty
3. **Check Responsive**: Resize window to see mobile layouts
4. **Read Alerts**: They show the actual data that would be sent to backend
5. **Use Preview Modes**: Both form builder and templates have preview functionality

---

## 📸 Screenshots to Look For

### Registration Form Builder:
- Drag handles on left of each field
- Edit/Delete buttons on right
- Preview toggle at top
- Field type selector (9 types)

### Waitlist Management:
- 4 stat cards at top (purple theme)
- 3 tabs (Waiting/Notified/History)
- Search bar with bulk actions
- Settings modal with toggles

### Event Templates:
- 2-column grid layout
- Icon-based cards with purple accents
- Popular badge in purple
- Usage count on cards
- Preview modal with full details

---

## ✅ Verification Checklist

- [ ] Can access Phase 1 Demo page
- [ ] All 5 components load without errors
- [ ] Can navigate between components
- [ ] Form builder allows adding fields
- [ ] Registration form validates correctly
- [ ] Calendar options open/download
- [ ] Waitlist tabs switch properly
- [ ] Templates are searchable and filterable
- [ ] All buttons respond appropriately
- [ ] No console errors
- [ ] Purple #420D74 color visible throughout
- [ ] No gradients anywhere
- [ ] Clean shadcn component styling
- [ ] Responsive on mobile

---

## 🚀 Next Steps

Once you've tested everything, we can:
1. Fix any issues you find
2. Move to Phase 2 (Recording, Certificates, Post-Event)
3. Integrate these into existing event flows
4. Connect to actual backend APIs

---

## 📞 Need Help?

If components aren't showing:
1. Check browser console for errors
2. Verify you're on 'phase1-demo' stage
3. Refresh the page
4. Try Method 1 (change initial stage in App.tsx)

---

Built with: React, TypeScript, shadcn/ui, Tailwind CSS, Lucide Icons
Purple Theme: #420D74 (no gradients, flat design only)

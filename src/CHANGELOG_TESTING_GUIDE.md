# 🧪 Change Log Testing Guide

## How to Test the Post-Publish Edit Warnings & Change Logs Feature

### Step 1: Navigate to Events List
1. From the app, click **"Events"** in the sidebar (or navigate to `events-list` stage)
2. You'll see a list of all events

### Step 2: Open a Published Event
Click on any of these **PUBLISHED** events to test the changelog feature:

#### ✅ Best Events for Testing (Already Published):

1. **"React 18 Deep Dive Workshop"** (Event ID: `1`)
   - Status: Published
   - 87 registered attendees
   - Great for testing: Date/time changes, location updates

2. **"Design System Masterclass"** (Event ID: `2`)
   - Status: Published  
   - 156 registered (SOLD OUT - shows waitlist)
   - Great for testing: Capacity changes, ticket price updates

3. **"Full-Stack AI Bootcamp"** (Event ID: `D1`)
   - Status: Published
   - 63 registered (SOLD OUT)
   - Great for testing: Critical field warnings

4. **"Data Science Bootcamp"** (Event ID: `E1`)
   - Status: Published
   - 105 registered
   - Has multi-tier tickets (test price changes)

### Step 3: Access the Change Log Tab
Once inside any published event:
1. Look at the **left sidebar** tabs
2. Click on **"Change Log"** (between "Analytics" and "AI & Automations")
3. You should see:
   - ✅ **4 mock changes** pre-populated (for demo)
   - Table with timestamps, users, change types
   - Filter/search controls
   - Export CSV button
   - Summary stats at the bottom

### Step 4: Test Edit Warnings (Published Events)

#### A. Edit Description (Low Severity)
1. Click **"Overview"** tab
2. Scroll to the **Description** field
3. Click to edit and change the text
4. Click outside to save
5. ✅ **Expected**: Warning dialog appears
   - Shows old vs new value
   - "MINOR CHANGE" badge
   - Option to notify attendees
   - "Confirm Change" button

#### B. Edit Location (High Severity)
1. In **Overview** tab, find **Location** field
2. Change the location (e.g., "Virtual" → "Downtown Conference Center")
3. ✅ **Expected**: Warning dialog appears
   - "HIGH IMPACT" amber badge
   - Notification toggle checked by default
   - Shows affected attendee count
   - Warning: "All attendees will see this change immediately"

#### C. Edit Capacity (Medium Severity)
1. Change the **Capacity** field
2. ✅ **Expected**: Warning dialog appears
   - Shows impact message
   - If reducing: "May affect waitlisted attendees"
   - If increasing: "Opens more spots for registration"

#### D. Confirm and View Change Log
1. After seeing the warning, click **"Confirm Change & Notify"**
2. ✅ Toast notification appears confirming the change
3. Navigate to **"Change Log"** tab
4. ✅ **Your change should appear at the top** of the table with:
   - Current timestamp
   - Your user name
   - Field changed
   - Old value → New value
   - Notification sent status
   - Affected attendees count

### Step 5: Test Change Log Features

#### Filtering
1. Click **"Change Type"** dropdown
2. Select "Field Edits" → See only field changes
3. Select "Publish Events" → See only publish/unpublish events

#### Search
1. Type in the search box (e.g., "location")
2. Table filters to show only matching changes

#### Export
1. Click **"Export CSV"** button
2. CSV file downloads with all filtered changes
3. Open in Excel/Sheets to verify data

### Step 6: Test Draft Events (No Warnings)
1. Go back to Events List
2. Open a **DRAFT** event (look for events with "Draft" status):
   - **"Intro to Product Thinking"** (Event ID: `A1`) - Skeleton draft
   - **"Advanced TypeScript Patterns"** (Event ID: `B1`) - Mid-build draft
   - **"Cloud Architecture Workshop"** (Event ID: `C1`) - Ready to publish

3. Try editing fields (description, location, capacity)
4. ✅ **Expected**: NO warning dialogs appear (drafts save directly)

5. Click **"Change Log"** tab
6. ✅ **Expected**: Empty state message:
   > "Change Log Available After Publishing"
   > "Once you publish this event, all changes will be tracked here..."

---

## 🎯 Expected Behavior Summary

| Event State | Edit Field | Behavior |
|------------|-----------|----------|
| **Draft** | Any field | ✅ Saves immediately, no warning |
| **Published** | Description | ⚠️ Low severity warning |
| **Published** | Location/Meeting Link | ⚠️ High severity warning + notify option |
| **Published** | Date/Time | 🚨 Critical warning + auto-notify |
| **Published** | Title | ⚠️ Medium warning (confuses attendees) |
| **Published** | Price/Tickets | ⚠️ Medium warning (only affects new regs) |
| **Published** | Capacity | ⚠️ Low-medium warning |

---

## 📊 Change Log Features to Verify

- [x] Table shows all changes with proper formatting
- [x] Timestamps display correctly (relative and absolute)
- [x] User avatars/initials show properly
- [x] Change type badges color-coded correctly
- [x] Old → New value arrows display
- [x] Notification sent icons show
- [x] Affected user count displays
- [x] Filters work (Change Type, User)
- [x] Search works across all fields
- [x] CSV export includes all data
- [x] Summary stats calculate correctly
- [x] Empty state shows for draft events
- [x] Mock data populates on first publish

---

## 🐛 Known Demo Limitations

1. **Mock data only**: Changes are stored in component state (not persisted to backend)
2. **Email notifications**: Simulated (no actual emails sent)
3. **User attribution**: Uses current logged-in user
4. **Session changes**: Only tracked when you edit sessions in the Schedule tab

---

## 🚀 Quick Test Checklist

- [ ] Open published event (e.g., "React 18 Deep Dive Workshop")
- [ ] View Change Log tab → See 4 mock changes
- [ ] Edit description → See warning dialog
- [ ] Confirm change → See in changelog
- [ ] Edit location → See high-impact warning
- [ ] Toggle notification option → Verify in toast
- [ ] Filter by change type → Table updates
- [ ] Search for field name → Table filters
- [ ] Export CSV → Download works
- [ ] Open draft event → No warnings appear
- [ ] View draft changelog → Empty state shows
- [ ] Publish draft → Publish event logged

---

**Need help?** All published events are pre-configured with mock change data. Just open any published event and click "Change Log" in the sidebar!

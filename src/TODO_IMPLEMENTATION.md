# Leapspace Implementation TODO

## ✅ What I Understand Conceptually

### 1. Platform Architecture
- **ONE unified Leapspace platform** for both creators and learners
- Same dashboard structure, navigation, LeapyAI access for everyone
- Role-based rendering: UI adapts based on who's viewing what
- sarah.chen@gmail.com = learner perspective (prototype)
- mahesh@email.com = creator perspective (prototype)

### 2. Event Page Unification
- Currently SPLIT: PublicEventLanding (learner) vs EventBuilderViewV2 (admin)
- Need to MERGE: One event page with conditional rendering
- Keep similar structure for both (tabs/sections/panels)
- Admin sees: Edit, Manage, Analytics, Settings actions
- Learner sees: Register, Join, View, Engage actions

### 3. Admin Event Lifecycle (4 Phases)
1. **Creating**: Template library → Event builder → Preview → Publish
2. **Managing Pre-Event**: Registrations, waitlist, promotion, communication
3. **During Event**: Live controls, moderation, analytics overlay
4. **Post-Event**: Recording, analytics, follow-up, certificates

### 4. Learner Event Lifecycle (4 Phases)
1. **Exploring**: Browse marketplace, filter, search, recommendations
2. **Deciding**: Event landing page → Registration form → Confirmation
3. **Attending**: Join meeting, engage, take notes, network
4. **After**: Recording, materials, certificate, community join

### 5. Critical Touchpoints
- Admin creates → Learner discovers
- Admin sets registration → Learner fills form
- Admin starts meeting → Learner joins
- Admin shares recording → Learner watches
- Admin issues certificate → Learner receives

### 6. Integration Philosophy
- NO separate demo pages
- Everything lives in existing dashboard flows
- Components integrate into existing tabs/panels
- Role-based conditional rendering throughout

---

## 🎯 Implementation TODO

### Phase 1: Foundation & Data Structure

#### 1.1 Update Mock Data
- [ ] Add `creatorEmail` field to all event objects
- [ ] Create mock events owned by `mahesh@email.com`
- [ ] Create mock events owned by other users for Sarah to discover
- [ ] Define registration data structure
- [ ] Define waitlist data structure
- [ ] Add mock registrations for existing events
- [ ] Create user context/state management for current logged-in user

#### 1.2 Authentication Mock
- [ ] Create simple auth context (localStorage-based for prototype)
- [ ] Add login/logout functionality
- [ ] Add user switcher (toggle between sarah/mahesh for demo)
- [ ] Persist logged-in user across page refreshes

---

### Phase 2: Event Page Unification

#### 2.1 Create Unified Event Page Component
- [ ] Create `UnifiedEventPage.tsx` component
- [ ] Accept `event` + `currentUser` props
- [ ] Implement role check: `isCreator = event.creatorEmail === currentUser.email`
- [ ] Design conditional rendering structure

#### 2.2 Learner View (when NOT creator)
- [ ] Use PublicEventLanding structure as base
- [ ] Keep tab navigation: Overview, Agenda, Host, Community, Q&A
- [ ] Show "Register" CTA
- [ ] Show attendee engagement features
- [ ] Show "Join Live Event" when event is live
- [ ] Show community join CTA

#### 2.3 Admin View (when IS creator)
- [ ] Use EventBuilderViewV2 left panel structure
- [ ] Keep sections: Overview, Schedule, Attendees, Analytics, Settings
- [ ] Add "Edit" mode toggle
- [ ] Show management actions (Edit event, View registrations, etc.)
- [ ] Keep AI Hub and Automations access
- [ ] Show admin-only analytics

#### 2.4 Shared Elements (both views)
- [ ] Same top navigation with LeapyAI access
- [ ] Same LeapSpace switcher
- [ ] Same user menu
- [ ] Event cover image and basic info
- [ ] Back button to events list

---

### Phase 3: Registration System

#### 3.1 Registration Form Builder (Admin)
- [ ] Create `RegistrationFormBuilder.tsx` component
- [ ] Integrate into Event Builder → Settings tab
- [ ] Drag-drop form field builder
- [ ] Field types: text, email, phone, dropdown, checkbox, file upload
- [ ] Required/optional toggle
- [ ] Preview mode
- [ ] Save custom form per event

#### 3.2 Event Registration Form (Learner)
- [ ] Create `EventRegistrationModal.tsx` component
- [ ] Opens when learner clicks "Register" button
- [ ] Dynamically render form based on admin's custom form
- [ ] Form validation
- [ ] Submit registration
- [ ] Show success confirmation

#### 3.3 Registration Success Flow
- [ ] Create `RegistrationSuccessModal.tsx`
- [ ] Show confirmation message
- [ ] Display "Add to Calendar" button
- [ ] Generate .ics file for download
- [ ] Show "Join LeapSpace Community" CTA
- [ ] Email confirmation preview

#### 3.4 Registration Management (Admin)
- [ ] Integrate into Event Builder → Attendees tab
- [ ] Show list of registrations with data
- [ ] Filter/search registrations
- [ ] Export to CSV
- [ ] Approve/reject registrations (if approval required)
- [ ] Send message to registrants

---

### Phase 4: Waitlist System

#### 4.1 Waitlist Functionality
- [ ] When event at capacity, show "Join Waitlist" button
- [ ] Create `WaitlistModal.tsx` for learner signup
- [ ] Collect email + optional message

#### 4.2 Waitlist Management (Admin)
- [ ] Create `WaitlistPanel.tsx` component
- [ ] Integrate into Event Builder → Attendees tab (sub-section)
- [ ] Show waitlist queue
- [ ] Send invites when spots open
- [ ] Auto-notify when capacity increases
- [ ] Bulk actions (approve multiple, clear waitlist)

---

### Phase 5: Event Templates Library

#### 5.1 Template Library UI
- [ ] Create `EventTemplatesModal.tsx`
- [ ] Show when clicking "Create New Event" button
- [ ] Display template categories (Workshop, Conference, Meetup, etc.)
- [ ] Template preview cards
- [ ] "Start from Template" button

#### 5.2 Template Integration
- [ ] Pre-populate event builder with template data
- [ ] Templates include: agenda structure, registration fields, default settings
- [ ] Allow customization after selection
- [ ] Save custom templates

---

### Phase 6: Events List with Role Indicators

#### 6.1 Update Events List View
- [ ] Add role badges to event cards
- [ ] For MY events: Show "Admin" badge + "Manage" button
- [ ] For OTHER events: Show "Register" or "Joined" status
- [ ] Show registration count for my events
- [ ] Filter: My Events / All Events / Registered Events

#### 6.2 Quick Actions
- [ ] Admin view: "Edit", "View Analytics", "Manage Registrations"
- [ ] Learner view: "Register", "Learn More", "Save for Later"

---

### Phase 7: Add to Calendar (.ics Generation)

#### 7.1 Calendar Export
- [ ] Create `.ics` file generation function
- [ ] Include event details, time, timezone, location/link
- [ ] Trigger download on button click
- [ ] Support Google Calendar, Outlook, Apple Calendar

#### 7.2 Integration Points
- [ ] After registration success
- [ ] On event landing page (for registered users)
- [ ] In confirmation email preview

---

### Phase 8: Post-Event Features

#### 8.1 Recording Access
- [ ] Show "Recording Available" badge on past events
- [ ] Create `EventRecordingPlayer.tsx`
- [ ] Access control: only registered attendees
- [ ] Transcript view
- [ ] Download options

#### 8.2 Certificates
- [ ] Create `CertificateGenerator.tsx` (admin)
- [ ] Create certificate template
- [ ] Auto-issue to attendees
- [ ] Learner can download PDF
- [ ] Share to LinkedIn option

---

### Phase 9: Testing & Polish

#### 9.1 User Flow Testing
- [ ] Test complete creator flow (mahesh@email.com)
- [ ] Test complete learner flow (sarah.chen@gmail.com)
- [ ] Test edge cases (full event, waitlist, cancellation)

#### 9.2 UI Polish
- [ ] Ensure consistent brand colors (#420D74)
- [ ] Flat design (no gradients/shadows)
- [ ] Rounded corners (rounded-xl for cards, rounded-lg for buttons)
- [ ] Typography consistency
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

---

## 🎬 Suggested Implementation Order

1. **Start Here**: Phase 1 (Foundation & Data)
2. **Then**: Phase 2 (Unified Event Page) - MOST CRITICAL
3. **Next**: Phase 3 (Registration System) - HIGH VALUE
4. **Then**: Phase 6 (Events List with Roles) - VISIBLE IMPACT
5. **Then**: Phase 4 (Waitlist) - COMPLEMENTS REGISTRATION
6. **Then**: Phase 5 (Templates) - NICE TO HAVE
7. **Then**: Phase 7 (Calendar) - QUICK WIN
8. **Finally**: Phase 8 (Post-Event) - FUTURE ITERATION

---

## 🔥 Priority: Start with This

**PHASE 1 + PHASE 2** = Get the unified event page working with role-based rendering.

Once that's solid, everything else slots into the existing structure.

---

## ❓ Questions Before Starting

1. Should I create a dedicated `AuthContext.tsx` for user management, or simple localStorage?
2. For routing, should events be at `/leapspace/events/:eventId`?
3. Should I keep the Phase 1 Demo page or remove it once features are integrated?
4. Any existing components I should reuse (forms, modals, etc.)?

Ready to start? Let me know! 🚀

# Complete Event Platform User Flows

## Visual Language Standards
- **Colors**: Purple #420D74 only (primary brand color)
- **Components**: Clean shadcn UI components
- **Style**: Flat design, no gradients
- **Typography**: No emojis, professional copy
- **Spacing**: Consistent rounded-xl for cards, rounded-lg for buttons

---

## ADMIN USER FLOWS

### FLOW A1: Create Event (First Time)
```
Entry: Dashboard → "Create Event" button
├─ Step 1: Choose event type
│   ├─ Community Event (Type A)
│   └─ Standalone Event (Type B)
├─ Step 2: Basic details
│   ├─ Title
│   ├─ Description
│   ├─ Date/Time/Timezone
│   ├─ Duration
│   └─ Event format (Virtual/In-person/Hybrid)
├─ Step 3: Registration settings
│   ├─ Capacity
│   ├─ Pricing (Free/Paid)
│   ├─ Registration form fields
│   ├─ Waitlist toggle
│   └─ Approval required toggle
├─ Step 4: Event settings
│   ├─ Recording
│   ├─ Chat settings
│   ├─ Q&A settings
│   └─ Certificate toggle
├─ Step 5: Preview & Publish
│   ├─ Review all details
│   ├─ Preview public page
│   ├─ Save as draft
│   └─ Publish
Exit: Event created → Redirect to Event Dashboard
```

### FLOW A2: Edit Existing Event
```
Entry: Events List → Click event → "Edit" button
├─ Pre-event (not started)
│   ├─ Edit all fields
│   ├─ Update capacity
│   ├─ Change date/time
│   └─ Modify registration settings
├─ During event (live)
│   ├─ Cannot edit core details
│   ├─ Can add co-hosts
│   └─ Can update settings
├─ Post-event (ended)
│   ├─ Cannot edit
│   └─ Can only archive/delete
Exit: Changes saved → Back to Event Dashboard
```

### FLOW A3: Manage Registrations
```
Entry: Event Dashboard → "Registrations" tab
├─ View all registrants
│   ├─ Search by name/email
│   ├─ Filter by status
│   └─ Sort by date registered
├─ Actions per registrant
│   ├─ Approve (if approval required)
│   ├─ Decline with reason
│   ├─ Send individual message
│   └─ Add to waitlist
├─ Bulk actions
│   ├─ Select multiple
│   ├─ Send bulk email
│   ├─ Export to CSV
│   └─ Move to different event
├─ Waitlist management
│   ├─ View waitlist queue
│   ├─ Manual promotion
│   └─ Auto-promotion settings
Exit: Registrations managed → Stay on tab
```

### FLOW A4: Send Pre-Event Communications
```
Entry: Event Dashboard → "Communications" tab
├─ Announcements
│   ├─ Create announcement
│   ├─ Target: All/Registered/Waitlist
│   ├─ Schedule for later
│   └─ Send immediately
├─ Q&A Management
│   ├─ View submitted questions
│   ├─ Answer publicly
│   ├─ Answer privately
│   └─ Pin important Q&As
├─ Reminders
│   ├─ Auto-reminders (24hr, 1hr before)
│   ├─ Custom reminder schedule
│   └─ Test reminder email
├─ Resources upload
│   ├─ Upload prep materials
│   ├─ Set access (All/Registered only)
│   └─ Track downloads
Exit: Communication sent → Stay on tab
```

### FLOW A5: Promote Event
```
Entry: Event Dashboard → "Promotion" tab
├─ Social Pack Generator
│   ├─ Generate LinkedIn post
│   ├─ Generate Instagram story
│   ├─ Generate Twitter post
│   ├─ Generate email template
│   └─ Download all assets
├─ Get shareable links
│   ├─ Public event page URL
│   ├─ Registration link
│   ├─ Tracking link with UTM
│   └─ Embed code
├─ Newsletter integration
│   ├─ Select subscriber lists
│   ├─ Customize email
│   ├─ Schedule send time
│   └─ Send test email
├─ Analytics tracking
│   ├─ View impressions
│   ├─ Click-through rate
│   ├─ Conversion rate
│   └─ Source tracking
Exit: Promotion materials ready → Stay on tab
```

### FLOW A6: Start Live Event
```
Entry: Event Dashboard → "Start Event" button (on event day)
├─ Pre-flight checks
│   ├─ Test audio/video
│   ├─ Review settings
│   ├─ Check recording setup
│   └─ Review agenda
├─ Enter waiting room
│   ├─ See waiting attendees
│   ├─ Send waiting room message
│   └─ Admit attendees
├─ Start event officially
│   ├─ Begin recording (if enabled)
│   ├─ Welcome message
│   └─ Start presentation
├─ During event controls
│   ├─ Manage participants
│   ├─ Launch polls
│   ├─ Monitor Q&A
│   ├─ Share screen
│   └─ Spotlight speakers
├─ End event
│   ├─ Stop recording
│   ├─ Thank you message
│   └─ Redirect to post-event page
Exit: Event ended → Post-Event Dashboard
```

### FLOW A7: Manage Live Event
```
Entry: Inside live event meeting room
├─ Participant management
│   ├─ Mute/unmute individuals
│   ├─ Turn off video
│   ├─ Remove participant
│   ├─ Make co-host
│   └─ Spotlight speaker
├─ Content controls
│   ├─ Share screen
│   ├─ Stop screen share
│   ├─ Upload presentation
│   └─ Share resources
├─ Engagement tools
│   ├─ Launch poll
│   ├─ Close poll
│   ├─ View results
│   └─ Share results
├─ Chat moderation
│   ├─ Delete messages
│   ├─ Mute user from chat
│   ├─ Pin messages
│   └─ Send announcements
├─ Q&A management
│   ├─ View questions
│   ├─ Answer live
│   ├─ Mark as answered
│   └─ Dismiss question
├─ Recording controls
│   ├─ Pause recording
│   ├─ Resume recording
│   └─ Stop recording
├─ Emergency controls
│   ├─ Broadcast message
│   ├─ End for all
│   └─ Lock meeting
Exit: Use controls → Stay in meeting
```

### FLOW A8: Post-Event Management
```
Entry: Automatic redirect after event ends
├─ View attendance report
│   ├─ Total registered vs attended
│   ├─ Attendance duration
│   ├─ Engagement scores
│   └─ Export report
├─ Recording management
│   ├─ Upload recording (if external)
│   ├─ Processing status
│   ├─ Add chapters/timestamps
│   ├─ Generate transcript
│   └─ Share with attendees
├─ Send follow-up
│   ├─ Thank you email
│   ├─ Recording link
│   ├─ Survey link
│   └─ Certificate (if enabled)
├─ Certificate generation
│   ├─ Review attendee list
│   ├─ Set completion criteria
│   ├─ Generate certificates
│   └─ Send to attendees
├─ Collect feedback
│   ├─ View survey responses
│   ├─ Read reviews
│   ├─ Respond to feedback
│   └─ Export feedback
├─ Analytics review
│   ├─ Engagement metrics
│   ├─ Poll results
│   ├─ Q&A summary
│   └─ ROI calculation
Exit: Post-event tasks complete → Archive event
```

### FLOW A9: View Analytics
```
Entry: Event Dashboard → "Analytics" tab
├─ Overview metrics
│   ├─ Total views
│   ├─ Registration conversion
│   ├─ Attendance rate
│   └─ Engagement score
├─ Registration analytics
│   ├─ Registration timeline
│   ├─ Source breakdown
│   ├─ Drop-off points
│   └─ Demographics
├─ Engagement analytics
│   ├─ Average watch time
│   ├─ Peak attendance
│   ├─ Chat activity
│   ├─ Poll participation
│   └─ Q&A activity
├─ Revenue analytics (if paid)
│   ├─ Total revenue
│   ├─ Refunds
│   ├─ Net revenue
│   └─ Revenue per attendee
├─ Export reports
│   ├─ PDF report
│   ├─ CSV data
│   └─ Share report link
Exit: Analytics reviewed → Stay on tab
```

### FLOW A10: Manage Co-hosts
```
Entry: Event Dashboard → "Team" tab
├─ Add co-host
│   ├─ Search by email
│   ├─ Set role (Co-host/Moderator/Presenter)
│   ├─ Set permissions
│   └─ Send invitation
├─ Manage existing co-hosts
│   ├─ View all team members
│   ├─ Edit permissions
│   ├─ Remove access
│   └─ Resend invitation
├─ Role definitions
│   ├─ Host (full control)
│   ├─ Co-host (most controls)
│   ├─ Moderator (chat/Q&A only)
│   └─ Presenter (screen share only)
Exit: Team configured → Stay on tab
```

### FLOW A11: Handle Refunds
```
Entry: Event Dashboard → "Registrations" → Select user → "Issue Refund"
├─ View refund policy
│   ├─ See policy terms
│   ├─ Check eligibility
│   └─ View refund window
├─ Initiate refund
│   ├─ Select refund type (Full/Partial)
│   ├─ Enter refund amount
│   ├─ Add reason (internal)
│   └─ Confirm refund
├─ Notify attendee
│   ├─ Auto-send refund email
│   ├─ Include refund details
│   └─ Update registration status
├─ Update records
│   ├─ Mark as refunded
│   ├─ Update capacity
│   └─ Adjust revenue
Exit: Refund processed → Back to registrations
```

### FLOW A12: Clone Event
```
Entry: Events List → Click event → "Clone" button
├─ Clone settings
│   ├─ Select what to copy
│   ├─ Update date/time
│   ├─ Modify title
│   └─ Keep/clear registrations
├─ Review cloned event
│   ├─ Check all details
│   ├─ Make adjustments
│   └─ Save as draft
Exit: Event cloned → Edit new event
```

---

## LEARNER USER FLOWS

### FLOW L1: Discover Events
```
Entry: Marketplace / Events page
├─ Browse all events
│   ├─ View grid/list
│   ├─ Sort by date/popularity
│   └─ Filter by category
├─ Search events
│   ├─ Search by keyword
│   ├─ Search by host
│   └─ Search by topic
├─ Filter events
│   ├─ By date range
│   ├─ By price (Free/Paid)
│   ├─ By format (Virtual/In-person)
│   ├─ By category
│   └─ By language
├─ View recommendations
│   ├─ Based on interests
│   ├─ Based on past events
│   └─ Trending events
├─ Save for later
│   ├─ Bookmark event
│   ├─ Add to wishlist
│   └─ Set reminder
Exit: Event selected → View Event Page
```

### FLOW L2: View Event Details
```
Entry: Click on event card
├─ Read overview
│   ├─ Event description
│   ├─ Date/time/timezone
│   ├─ Format
│   └─ Host information
├─ Navigate tabs
│   ├─ Overview
│   ├─ Agenda
│   ├─ Host/Speakers
│   ├─ Reviews
│   └─ FAQ
├─ Check attendees
│   ├─ Total registered
│   ├─ View attendee preview
│   └─ See who you know
├─ View pricing
│   ├─ Ticket price
│   ├─ What's included
│   ├─ Refund policy
│   └─ Group discounts
├─ Social proof
│   ├─ Read reviews
│   ├─ See ratings
│   ├─ View host credibility
│   └─ Check similar events
├─ Decision aids
│   ├─ Compare similar events
│   ├─ View prep materials
│   └─ Ask organizer
Exit: Decision made → Register or Back
```

### FLOW L3: Register for Event
```
Entry: Event page → "Register" button
├─ Check availability
│   ├─ Spots available → Proceed
│   ├─ Waitlist available → Join waitlist
│   └─ Full → Browse similar
├─ Fill registration form
│   ├─ Name (prefilled if logged in)
│   ├─ Email (prefilled if logged in)
│   ├─ Custom questions
│   └─ Special requirements
├─ Select ticket type (if multiple)
│   ├─ General admission
│   ├─ VIP
│   └─ Group ticket
├─ Payment (if paid event)
│   ├─ Enter payment details
│   ├─ Apply discount code
│   ├─ Review total
│   └─ Complete payment
├─ Confirmation
│   ├─ Registration confirmed
│   ├─ Add to calendar
│   ├─ Download ticket
│   └─ Join community (if standalone event)
├─ Receive confirmation email
│   ├─ Event details
│   ├─ Calendar invite
│   ├─ Join link
│   └─ Prep materials
Exit: Registered → My Events or Browse More
```

### FLOW L4: Prepare for Event
```
Entry: My Events → Click registered event
├─ Review event details
│   ├─ Date/time reminder
│   ├─ Access link
│   ├─ Agenda review
│   └─ Requirements check
├─ Download prep materials
│   ├─ Pre-reading
│   ├─ Setup instructions
│   ├─ Software requirements
│   └─ Worksheets
├─ Check prep checklist
│   ├─ Mark items complete
│   ├─ Track progress
│   └─ Get reminders
├─ Ask questions
│   ├─ Submit question to host
│   ├─ View other Q&As
│   └─ Get answers
├─ Network pre-event
│   ├─ View attendee list
│   ├─ Connect with attendees
│   └─ Join discussion
├─ Set reminders
│   ├─ 1 day before
│   ├─ 1 hour before
│   └─ Custom reminder
Exit: Prepared → Wait for event day
```

### FLOW L5: Join Event (Live)
```
Entry: Event day → Email link or My Events → "Join"
├─ Waiting room (if enabled)
│   ├─ Check audio/video
│   ├─ See waiting message
│   └─ Wait for admission
├─ Enter event
│   ├─ Camera/mic permissions
│   ├─ Choose display name
│   ├─ Set avatar
│   └─ Enter meeting
├─ Event orientation
│   ├─ Welcome message
│   ├─ House rules
│   ├─ Feature tour
│   └─ Close tour
Exit: In event → Participate
```

### FLOW L6: Participate in Event
```
Entry: Inside live event
├─ Watch/Listen
│   ├─ View presenter
│   ├─ See shared screen
│   ├─ Switch views (grid/speaker)
│   └─ Toggle fullscreen
├─ Interact via chat
│   ├─ Send messages
│   ├─ Reply to others
│   ├─ React with emoji
│   └─ View pinned messages
├─ Submit questions (Q&A)
│   ├─ Ask question
│   ├─ Upvote questions
│   ├─ See answered questions
│   └─ Get notifications
├─ Participate in polls
│   ├─ View poll
│   ├─ Submit vote
│   ├─ See results
│   └─ View past polls
├─ Take notes
│   ├─ Open notepad
│   ├─ Take timestamped notes
│   ├─ Save notes
│   └─ Export notes
├─ Download resources
│   ├─ View shared files
│   ├─ Download materials
│   └─ Save for later
├─ Network with attendees
│   ├─ View attendee list
│   ├─ Send private message
│   ├─ Connect on platform
│   └─ Exchange contacts
├─ Manage personal settings
│   ├─ Mute/unmute audio
│   ├─ Turn video on/off
│   ├─ Adjust volume
│   └─ Enable captions
├─ Leave event
│   ├─ Leave temporarily
│   ├─ Rejoin later
│   └─ Leave permanently
Exit: Event participation → Stay until end
```

### FLOW L7: Post-Event Actions
```
Entry: Event ended → Redirect or My Events
├─ Access recording
│   ├─ View recording
│   ├─ Skip to chapters
│   ├─ Download recording
│   └─ Share recording
├─ Review materials
│   ├─ Download slides
│   ├─ Get transcript
│   ├─ Access resources
│   └─ Review notes
├─ Get certificate
│   ├─ Check eligibility
│   ├─ Download certificate
│   ├─ Share on LinkedIn
│   └─ Add to profile
├─ Provide feedback
│   ├─ Rate event
│   ├─ Write review
│   ├─ Answer survey
│   └─ Submit feedback
├─ Continue networking
│   ├─ View attendee list
│   ├─ Connect with people
│   ├─ Join community discussion
│   └─ Find similar events
├─ Explore related content
│   ├─ Related events
│   ├─ Related courses
│   ├─ Host's other content
│   └─ Similar communities
Exit: Post-event complete → Browse or Leave
```

### FLOW L8: Manage Registered Events
```
Entry: Dashboard → "My Events"
├─ View all events
│   ├─ Upcoming events
│   ├─ Past events
│   ├─ Waitlisted events
│   └─ Cancelled events
├─ Per event actions
│   ├─ View details
│   ├─ Add to calendar
│   ├─ Cancel registration
│   ├─ Request refund
│   └─ Share with friend
├─ Calendar view
│   ├─ Monthly calendar
│   ├─ See conflicts
│   └─ Reschedule if needed
├─ Sync with external calendar
│   ├─ Google Calendar
│   ├─ Apple Calendar
│   └─ Outlook
Exit: Events managed → Stay on page
```

### FLOW L9: Request Refund
```
Entry: My Events → Event → "Request Refund"
├─ Check eligibility
│   ├─ View refund policy
│   ├─ Check deadline
│   └─ See refund amount
├─ Submit refund request
│   ├─ Select reason
│   ├─ Add comments (optional)
│   ├─ Confirm request
│   └─ Receive confirmation
├─ Track refund status
│   ├─ Pending review
│   ├─ Approved
│   ├─ Processing
│   └─ Completed
├─ Receive refund
│   ├─ Email notification
│   ├─ Refund to original payment
│   └─ Updated receipt
Exit: Refund processed → Back to My Events
```

### FLOW L10: Join from Waitlist
```
Entry: Automatic notification when spot opens
├─ Receive notification
│   ├─ Email notification
│   ├─ Platform notification
│   └─ SMS (if enabled)
├─ Claim spot
│   ├─ Click "Claim Spot" link
│   ├─ Confirm registration
│   ├─ Complete payment (if paid)
│   └─ Get confirmation
├─ Time limit
│   ├─ 24-hour claim window
│   ├─ Countdown timer
│   └─ Spot released if expired
Exit: Spot claimed → Registered attendee flows
```

### FLOW L11: Save Events for Later
```
Entry: Event page → "Save" button
├─ Add to wishlist
│   ├─ Bookmark event
│   ├─ Add tags
│   └─ Add notes
├─ Set reminder
│   ├─ Registration opens
│   ├─ Early bird deadline
│   └─ Custom date
├─ View saved events
│   ├─ Dashboard → Saved Events
│   ├─ Filter by tag
│   └─ Sort by date
├─ Remove from saved
│   ├─ Unsave event
│   └─ Clear old saves
Exit: Event saved → Continue browsing
```

### FLOW L12: Network with Attendees
```
Entry: Event page or During/After event
├─ View attendee directory
│   ├─ See all attendees
│   ├─ Filter by role/interest
│   └─ Search by name
├─ View profiles
│   ├─ Name & avatar
│   ├─ Bio
│   ├─ Company
│   └─ Social links
├─ Connect
│   ├─ Send connection request
│   ├─ Send direct message
│   ├─ Add to contacts
│   └─ Follow on social
├─ Private messaging
│   ├─ Start conversation
│   ├─ Share resources
│   └─ Exchange contacts
Exit: Connections made → Continue networking
```

---

## FEATURE CATEGORIZATION BY USER FLOW

### ADMIN FEATURES:

**Pre-Event Creation & Setup:**
1. Event Builder (multi-step form)
2. Event Templates Library
3. Registration Form Builder
4. Pricing & Ticketing
5. Co-host Management
6. Event Settings Panel

**Pre-Event Promotion & Management:**
7. Social Pack Generator
8. Newsletter Integration
9. Shareable Links & Embeds
10. Registration Dashboard
11. Waitlist Management
12. Pre-Event Communications Hub
13. Q&A Pre-Event Management
14. Resource Upload System
15. Reminder Scheduler

**During Event:**
16. Live Event Controls
17. Admin Panel (separate view)
18. Participant Management
19. Chat Moderation
20. Q&A Live Management
21. Poll Launcher
22. Recording Controls
23. Screen Share
24. Emergency Broadcast

**Post-Event:**
25. Recording Upload/Management
26. Certificate Generator
27. Post-Event Dashboard
28. Feedback Collection
29. Analytics Reports
30. Follow-up Email System
31. Attendee Export
32. ROI Calculator

**Ongoing:**
33. Events List Dashboard
34. Analytics & Insights
35. Revenue Tracking
36. Refund Management

---

### LEARNER FEATURES:

**Discovery:**
1. Events Marketplace
2. Search & Filters
3. Event Recommendations
4. Save/Wishlist
5. Calendar Preview

**Pre-Event:**
6. Event Detail Page
7. Registration Flow
8. Payment Processing
9. Add to Calendar
10. Prep Materials Download
11. Pre-Event Q&A Submission
12. Attendee Preview/Networking

**During Event:**
13. Event Waiting Room
14. Live Event Viewer
15. Chat Participation
16. Q&A Submission
17. Poll Voting
18. Personal Notepad
19. Resource Downloads
20. Attendee Directory
21. Private Messaging

**Post-Event:**
22. Recording Access
23. Certificate Download
24. Material Archive
25. Review & Rating
26. Survey Completion
27. LinkedIn Certificate Share
28. Post-Event Discussion

**Ongoing:**
29. My Events Dashboard
30. Event Calendar
31. Event Library (Past)
32. Refund Requests
33. Waitlist Status

---

## BUILD PRIORITY (Prototype)

### PHASE 1: Registration & Setup (Day 1)
- Registration Form Builder
- Calendar Integration (.ics)
- Waitlist System
- Event Templates

### PHASE 2: Live Event Essentials (Day 2)
- Admin Control Panel
- Recording Management
- Live Analytics Overlay
- Emergency Controls

### PHASE 3: Post-Event (Day 3)
- Certificate Generator
- Post-Event Dashboard
- Recording Library
- Feedback System

### PHASE 4: Learner Experience (Day 4)
- Saved Events/Wishlist
- Event Library
- Personal Notepad
- Attendee Networking

### PHASE 5: Polish & Edge Cases (Day 5)
- Error states
- Empty states
- Loading states
- Mobile responsiveness
- Accessibility

---

Ready to build? Let's start with PHASE 1.

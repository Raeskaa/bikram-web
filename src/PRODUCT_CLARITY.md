# Leapspace Product Clarity Document

## Core Product Philosophy

**Leapspace is ONE unified platform for BOTH creators and learners.**

### Role System

#### Roles are Context-Specific (per event/course/community)
- **Creator/Admin**: Person who created the content
- **Moderator**: People added by creator to help with admin work
- **Learner**: Everyone else (neither creator nor moderator)

#### Role Duality
- A person can be BOTH creator AND learner simultaneously
- Example: I create Event A (I'm admin) + I register for Event B (I'm learner)
- **The UI must facilitate this role switching contextually**

### Prototype Test Accounts

For prototype/demo purposes, we use two perspectives:

1. **sarah.chen@gmail.com** = Learner perspective
   - Views events created by others
   - Can register, join waitlist, see learner UI
   - When logged in, entire dashboard shows learner-focused UI

2. **mahesh@email.com** = Creator perspective  
   - Creates and manages events
   - Can edit, manage registrations, see admin UI
   - When logged in, entire dashboard shows creator-focused UI

**Note**: In production, SAME user can switch between roles depending on which content they're viewing. For prototyping, we separate these to test both flows clearly.

---

## The Leapspace Structural Map ("Russian Doll" Model)

This nested hierarchy defines the entire product architecture. Every relationship here dictates database schemas, permission inheritance, and navigation patterns.

### Layer 1: The Root (The App - LeapSpace.AI)

- **Millions of Leapspaces**: Every user registration automatically instantiates a new unique **LeapSpace ID**.
- **The "Google Workspace" Logic**: Just as a user has a "Workspace" in Google, they have a "Leapspace" here to house all their professional and community activities.

### Layer 2: The Umbrella (Leapspace)

A Leapspace acts as the primary container. Upon entry, a user can create or join three distinct sibling modules:

1. **Communities**: Discussion-heavy hubs (Forums/Channels).
2. **Courses**: Knowledge-delivery portals (Educational content).
3. **Events**: Time-bound engagement (Virtual/In-person/Hybrid).

### Layer 3: The Nesting Logic (Community Level)

A **Community** isn't just a chat room; it can host its own sub-ecosystems:

- **Community -> Courses**: Exclusive educational programs for that community's members.
- **Community -> Events**: Meetups or workshops dedicated to that specific group.
- **Community -> Channels**: Threaded discussions for ongoing interaction.

### Layer 4: Deep Nesting (Course Level)

Even at the **Course** level, the system remains interactive:

- **Course -> Events**: Live office hours, cohort-based workshops, or graduation ceremonies that are only accessible to enrolled students of that specific course.

### Structural Diagram

```
App (LeapSpace.AI)
  |
  +-- User Registration -> Auto-creates a LeapSpace
  |
  +-- LeapSpace (Umbrella Container)
       |
       +-- Communities (standalone)
       |     +-- Courses (nested inside community)
       |     +-- Events (nested inside community)
       |     +-- Channels (threaded discussions)
       |
       +-- Courses (standalone)
       |     +-- Events (nested inside course)
       |
       +-- Events (standalone)
```

### Inheritance & Permission Logic

- **Role Inheritance**: A user's "Highest Role" in the Leapspace (e.g., Admin) generally provides management access to all nested modules below it (Communities -> Courses -> Events).
- **Independent Modules**: Events and Courses can still exist as "standalone" objects directly under a Leapspace without needing a Community parent, providing flexibility for creators who aren't ready to manage a full forum yet.
- **The Flywheel Effect**: Standalone events/courses are used to pull people into the App, where they are then prompted to join or create a larger Leapspace/Community hub.

---

## Complete Event Taxonomy

Events are the most complex module. Their type and behavior are defined by a combination of **Visibility (Access)**, **Functional type**, **Delivery format**, and **Role-Based Permissions**.

### 1. Visibility & Access Types

These define who can see the event and how they get in.

| Type | Description |
|------|-------------|
| **Public** | Visible and open to everyone within a specific Leapspace. |
| **Private/Restricted** | Only visible to a specific subset of the community (e.g., VIPs or specific departments). |
| **Global** | Events marketed outside the community to attract new members; serves as a "marketing flywheel". |
| **Shared/Joint** | Collaborative events where two different communities come together and list the event on both calendars. |
| **Merged** | Events originally created as standalone "Individual" events that are later moved into a community's history or permanent collection. |
| **Standalone** | Events that exist directly under a Leapspace without a parent Community or Course. |

### 2. Functional & Nested Types

These define the event's purpose and its relationship to other modules.

| Type | Description |
|------|-------------|
| **Nested Course Events** | Events (like live office hours or workshops) held exclusively for students enrolled in a specific Course. |
| **Paid Events** | Events requiring payment in Currency or Credits to unlock registration and meeting links. |
| **Free Events** | Open registration events with no credit or monetary cost. |
| **Waitlist Events** | Events that have reached capacity, moving new registrants into a queue managed by the admin. |
| **Screened Events** | Two-step events where users must "Apply to Join" and the host manually approves or declines participants. |

### 3. Delivery Format Types

These define the "where" and "how" of the event experience.

| Type | Description |
|------|-------------|
| **Virtual (Leapcast)** | Fully online events using the integrated meeting screen (similar to Google Meet). |
| **In-Person** | Physical events requiring a location. Includes a **"Hide Location"** feature where the address is only revealed to approved/paid attendees. |
| **Hybrid** | Simultaneous virtual and in-person components. |

### 4. Discussion & Interaction States

The interaction model changes based on the user's sign-in/enrollment status.

| State | Description |
|-------|-------------|
| **Announcement-Only (Pre-Sign Up)** | Anonymous visitors or non-members can only see the Announcements tab (one-way communication from the host). |
| **Interactive (Post-Sign Up)** | Once signed in or enrolled, users gain access to Messages/Forums, Polls, and AI features. |

### Summary: Event Logic at a Glance

| Category | Types |
|----------|-------|
| **Visibility** | Public, Private, Global, Shared, Merged, Standalone |
| **Integration** | Standalone, Community-Integrated, Course-Nested |
| **Payment** | Paid (Currency/Credits), Free |
| **Capacity** | Open, Waitlist, Screened (Apply to Join) |
| **Delivery** | Virtual (Leapcast), In-Person (Hidden/Public Location), Hybrid |
| **Discussion** | Announcements (Public/Pre-signup), Forum/Chat (Private/Enrolled) |

---

## User Role Matrix within Events

Regardless of their role in the overall Leapspace, a user is assigned a specific role for each event.

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Owner** | The event creator. | Full "Manage Access", In-Place Editing (change flyer, time, description directly on the page without an admin panel). |
| **Host** | Primary presenter/facilitator. Often same as Owner. | Presentation rights, participant management, recording control. |
| **Moderator / Stage Manager** | A "Backstage Role" with higher permissions. | Muting participants, managing polls, chat moderation. May NOT be listed publicly as a speaker. |
| **Speaker** | Listed prominently under the event flyer to drive traffic. | Permissions to share screen/audio, presentation rights. |
| **Backstage / Tech Support** | Users with high permissions who are not listed publicly. | Stage management, technical controls, not visible on event page. |
| **Participant / Learner** | The standard attendee role. | View, chat, poll participation, Q&A access. |

### Role Check Logic (Technical)

```typescript
// Per-event role determination
const isOwner = event.creatorEmail === currentUser.email;
const isModerator = event.moderators?.includes(currentUser.email);
const isSpeaker = event.speakers?.some(s => s.email === currentUser.email);
const isParticipant = !isOwner && !isModerator && !isSpeaker;

// Composite admin check (has management permissions)
const hasManageAccess = isOwner || isModerator;
```

---

## UI Rendering Logic

### Event Page (Unified)
- **PublicEventLanding** + **EventBuilderViewV2** should be THE SAME PAGE
- Conditional rendering based on: `currentUser.email === event.creatorEmail`

#### If I'm the Creator (Admin View):
- Show: "Edit Event", "Manage Registrations", "Waitlist Management"
- Left side panel with admin actions
- Builder view components

#### If I'm NOT the Creator (Learner View):
- Show: Event details, "Register" button, "Join Waitlist"
- Public event landing structure
- Registration form modal/flow

**Structure should be similar, only rendering changes**

---

## Events List View

### Mixed Display (NOT Separated)
- Shows ALL events in ONE list
- My created events -> Show admin badges/indicators + "Edit" actions
- Other people's events -> Show "Register" or "Join" actions
- User sees both their created events AND events they can attend

---

## Component Integration (NOT Standalone Demos)

### WRONG: Building separate demo components
We don't build isolated prototype pages. Everything integrates into existing views.

### CORRECT: Integrate into existing flows

1. **Registration Form Builder**
   - Lives INSIDE Event Builder (probably Settings tab or dedicated tab)
   - Admin customizes form when creating/editing event
   
2. **Waitlist Management**
   - Lives INSIDE Event Builder OR Events CRM
   - Admin manages waitlist for their specific event
   
3. **Add to Calendar**  
   - Shows AFTER successful registration (learner flow)
   - Confirmation screen component
   
4. **Event Templates**
   - Shows when clicking "Create Event" button
   - Pre-create flow, helps kickstart event creation

---

## Data Structure

### Events must include:
```typescript
{
  id: string;
  title: string;
  creatorEmail: string; // or ownerId
  moderators?: string[]; // emails of people who can help admin
  speakers?: { name: string; email: string; role: string; avatar?: string }[];
  
  // Visibility & Access
  visibility: 'public' | 'private' | 'global' | 'shared';
  accessType: 'open' | 'waitlist' | 'screened' | 'paid';
  
  // Nesting context
  parentCommunityId?: string; // if nested inside a community
  parentCourseId?: string;    // if nested inside a course
  isStandalone: boolean;      // true if directly under Leapspace
  
  // Delivery
  eventType: 'virtual' | 'in-person' | 'hybrid';
  hideLocation?: boolean;     // for in-person: reveal address only to approved/paid
  
  // Payment
  isPaid: boolean;
  tickets?: { id: string; name: string; price: number; quantity: number; description: string }[];
  
  // Capacity
  capacity: number;
  registrationCount: number;
  waitlistEnabled: boolean;
  
  // ... other event data
}
```

---

## Key Principles

1. **One Product, Multiple Contexts**: Same UI framework, different permissions/actions based on role
2. **Role is Per-Content**: I'm admin of MY events, learner of YOURS
3. **Contextual UI**: Show/hide features based on who's viewing what
4. **No Separate Dashboards**: Sarah and Mahesh use same Leapspace, just different roles on different content
5. **Prototype Separation**: For demo clarity, we use sarah = pure learner, mahesh = pure creator
6. **Nesting is Optional**: Communities, Courses, and Events can exist standalone OR nested. The architecture supports both.
7. **Flywheel First**: Standalone events/courses pull users in; communities retain them long-term.
8. **Permission Inheritance**: Higher roles in a parent container (Leapspace -> Community -> Course) cascade down to nested modules.

---

## Questions to Always Ask

Before building ANY component:
1. Is this for admin or learner? Or both with conditional rendering?
2. Where does this integrate into existing views?
3. What's the role check logic?
4. Does this work with the unified event page concept?
5. How does left side panel fit in?
6. Is this a standalone module or nested inside a Community/Course?
7. What visibility/access type does this support?
8. Does the interaction model change pre vs. post sign-up?

---

Last Updated: Current session
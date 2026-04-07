// Phase 2: Complete Mock Data — Every View, Every State, Every Flow
// Ref: MOCK_EVENTS_MASTER_PLAN.md (Part 1.2 Data Model + Part 2 Event Specs)

export interface EventResource {
  id: string;
  title: string;
  url: string;
  type: 'pdf' | 'link' | 'video' | 'slide';
}

export interface EventSpeaker {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface EventTicket {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  description: string;
  remaining?: number;
  perks?: string[];
}

// Completion tracking for skeleton/building stages
export interface EventCompletionChecklist {
  hasTitle: boolean;
  hasDescription: boolean;
  hasDateTime: boolean;
  hasCoverImage: boolean;
  hasAgenda: boolean;
  hasTickets: boolean;
  hasSpeakers: boolean;
  hasLocation: boolean;
  hasRegistrationForm: boolean;
}

// Post-event todo tracking
export interface PostEventTodos {
  uploadRecording: boolean;
  sendFollowUp: boolean;
  issueCertificates: boolean;
  collectFeedback: boolean;
  publishResources: boolean;
}

// Post-event attendance report
export interface AttendanceReport {
  registered: number;
  attended: number;
  peakConcurrent: number;
  avgDuration: number; // minutes
  engagementScore: number; // 0-100
}

// Early bird pricing
export interface EarlyBirdPricing {
  deadline: string;
  discountPercent: number;
  active: boolean;
}

// Discount codes
export interface DiscountCode {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  limit: number;
  used: number;
}

// Schedule item (for events that define their agenda in data)
export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  duration: number | string;
  type?: 'keynote' | 'session' | 'workshop' | 'break';
  speaker?: string | null;
  speakers?: string[];
  track?: string | null;
  room?: string;
}

// Event branding configuration
export interface EventBranding {
  primaryColor: string;
  accentColor: string;
  fontFamily: 'inter' | 'dm-sans' | 'poppins' | 'space-grotesk' | 'system';
  buttonStyle: 'rounded' | 'pill' | 'square';
  logoUrl?: string;
  coverImageUrl?: string;
  showPoweredBy: boolean;
  customCss?: string;
}

export type EventLifecycleStage = 'skeleton' | 'building' | 'ready' | 'published' | 'live' | 'ended' | 'archived' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  attendeeCount: number;
  capacity?: number;
  location: 'virtual' | 'in-person' | 'hybrid';
  locationDetails?: string;
  status: 'upcoming' | 'past' | 'draft' | 'cancelled';
  isPublic: boolean;
  createdAt: string;
  
  // Role-based rendering
  creatorEmail: string;
  creatorName: string;
  moderators?: string[];

  // Visibility & Access (from Product Clarity)
  visibility: 'public' | 'private' | 'global' | 'shared';
  accessType: 'open' | 'waitlist' | 'screened' | 'paid';

  // Payment
  isPaid: boolean;
  price?: number;
  currency?: string;
  tickets?: EventTicket[];
  earlyBird?: EarlyBirdPricing;
  discountCodes?: DiscountCode[];

  // Nesting context
  parentCommunityId?: string;
  parentCourseId?: string;
  isStandalone: boolean;
  linkedToCommunity?: boolean;
  communityName?: string;
  courseName?: string;

  // Delivery details
  hideLocation?: boolean;

  // Capacity
  waitlistEnabled: boolean;

  // Speakers
  speakers?: EventSpeaker[];

  // Post-Event Fields
  recordingUrl?: string;
  resources?: EventResource[];
  certificateTemplateId?: string;

  // ── Phase 2 additions (MOCK_EVENTS_MASTER_PLAN.md §1.2) ──

  // Lifecycle stage — drives conditional rendering in EventBuilderViewV2 + PublicEventLanding
  lifecycleStage?: EventLifecycleStage;

  // Completion tracking (skeleton/building drafts)
  completionChecklist?: EventCompletionChecklist;

  // Cancellation
  cancelledAt?: string;
  cancellationReason?: string;
  refundPolicy?: 'full' | 'partial' | 'none';

  // Live event
  liveStartedAt?: string;
  liveAttendeeCount?: number;

  // Post-event management
  postEventTodos?: PostEventTodos;
  feedbackSurveyUrl?: string;
  attendanceReport?: AttendanceReport;

  // Schedule items (optional — some events define schedule in data)
  schedule?: ScheduleItem[];

  // Branding
  branding?: EventBranding;

  // ── Phase 6 additions: Multi-day, Recurring, Timezone ──
  
  // Multi-day events
  isMultiDay?: boolean;
  endDate?: string;               // e.g. "2026-03-18" for multi-day events
  
  // Recurring events (rrule-based)
  isRecurring?: boolean;
  recurrenceRule?: string;        // rrule string e.g. "FREQ=WEEKLY;COUNT=12;BYDAY=WE"
  seriesId?: string;              // links recurring instances in the same series
  occurrences?: string[];         // generated date list for display
  
  // Timezone
  timezone?: string;              // IANA timezone e.g. "America/New_York"
  
  // Category/topic (for creation flow)
  category?: string;              // e.g. "technology", "design", "business"
  
  // Duplication source
  duplicatedFrom?: string;        // original event ID if this was cloned

  // Custom registration form fields (configured by admin in RegistrationFormBuilder)
  customRegistrationFields?: Array<{
    id: string;
    label: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'phone' | 'url';
    required: boolean;
    placeholder?: string;
    options?: string[];
    description?: string;
  }>;
}

export interface Registration {
  id: string;
  eventId: string;
  userEmail: string;
  userName: string;
  status: 'confirmed' | 'waitlist' | 'cancelled' | 'applied' | 'rejected' | 'cancelled-by-user';
  registeredAt: string;
  formData: {
    [key: string]: string;
  };
  // Phase 2 additions
  rejectionReason?: string;
  rejectedAt?: string;
  ticketTierId?: string;
  paymentAmount?: number;
  paymentStatus?: 'paid' | 'refunded' | 'partial-refund';
}

export interface WaitlistEntry {
  id: string;
  eventId: string;
  userEmail: string;
  userName: string;
  addedAt: string;
  priority: number;
  message?: string;
}

// ════════════════════════════════════════════════════════════════
//  MOCK EVENTS — Original 11 + 13 New (MOCK_EVENTS_MASTER_PLAN.md Part 2)
// ════════════════════════════════════════════════════════════════

export const mockEvents: Event[] = [

  // ────────────────────────────────────────────���─────────────────
  //  ORIGINAL EVENTS (1–11) — with lifecycleStage backfilled
  // ──────────────────────────────────────────────────────────────

  // Mahesh's Events (Creator)
  {
    id: '1',
    title: 'React 18 Deep Dive Workshop',
    description: 'Hands-on workshop exploring React 18 features including concurrent rendering, automatic batching, and Suspense.',
    date: '2024-05-15',
    time: '2:00 PM EST',
    attendeeCount: 87,
    capacity: 100,
    location: 'virtual',
    locationDetails: 'Zoom',
    status: 'upcoming',
    lifecycleStage: 'published',
    linkedToCommunity: true,
    communityName: 'React Developers Hub',
    isPublic: true,
    createdAt: '2024-04-01',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'public',
    accessType: 'open',
    isPaid: false,
    isStandalone: false,
    parentCommunityId: 'comm-1',
    waitlistEnabled: true,
    speakers: [
      { id: 'sp-1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
      { id: 'sp-2', name: 'Dan Abramov', email: 'dan@example.com', role: 'Speaker' },
    ],
  },
  {
    id: '3',
    title: 'Product Management Summit 2024',
    description: 'Annual summit bringing together product leaders to discuss trends, challenges, and best practices.',
    date: '2024-06-10',
    time: '9:00 AM EST',
    attendeeCount: 0,
    capacity: 300,
    location: 'hybrid',
    locationDetails: 'San Francisco + Virtual',
    status: 'draft',
    lifecycleStage: 'building',
    linkedToCommunity: false,
    isPublic: false,
    createdAt: '2024-04-20',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'private',
    accessType: 'screened',
    isPaid: true,
    price: 149,
    currency: 'USD',
    tickets: [
      { id: 'tkt-1', name: 'Early Bird', price: 99, currency: 'USD', quantity: 100, description: 'Limited early access' },
      { id: 'tkt-2', name: 'General Admission', price: 149, currency: 'USD', quantity: 200, description: 'Standard ticket' },
    ],
    isStandalone: true,
    waitlistEnabled: true,
    hideLocation: true,
    speakers: [
      { id: 'sp-3', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
    ],
  },
  {
    id: '5',
    title: 'Startup Pitch Night',
    description: 'Watch early-stage startups pitch their ideas to investors and get feedback from the community.',
    date: '2024-04-15',
    time: '7:00 PM EST',
    attendeeCount: 142,
    location: 'virtual',
    locationDetails: 'YouTube Live',
    status: 'past',
    lifecycleStage: 'ended',
    linkedToCommunity: true,
    communityName: 'Startup Founders Network',
    isPublic: true,
    createdAt: '2024-03-20',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'global',
    accessType: 'open',
    isPaid: false,
    isStandalone: false,
    parentCommunityId: 'comm-2',
    waitlistEnabled: false,
    recordingUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    resources: [
      { id: 'r1', title: 'Pitch Deck Template', url: '#', type: 'slide' },
      { id: 'r2', title: 'Investor Contact List', url: '#', type: 'pdf' },
      { id: 'r3', title: 'Event Transcript', url: '#', type: 'pdf' }
    ],
    certificateTemplateId: 'cert-123',
    attendanceReport: {
      registered: 142,
      attended: 118,
      peakConcurrent: 112,
      avgDuration: 95,
      engagementScore: 82,
    },
    postEventTodos: {
      uploadRecording: true,
      sendFollowUp: true,
      issueCertificates: true,
      collectFeedback: true,
      publishResources: true,
    },
  },
  
  // Other People's Events (Sarah can discover/register)
  {
    id: '2',
    title: 'Design System Masterclass',
    description: 'Learn how to build and maintain scalable design systems for modern web applications.',
    date: '2024-05-20',
    time: '4:00 PM EST',
    attendeeCount: 156,
    capacity: 150,
    location: 'virtual',
    locationDetails: 'Google Meet',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2024-03-15',
    creatorEmail: 'emma.wilson@example.com',
    creatorName: 'Emma Wilson',
    visibility: 'public',
    accessType: 'waitlist',
    isPaid: true,
    price: 29,
    currency: 'USD',
    isStandalone: true,
    waitlistEnabled: true,
    speakers: [
      { id: 'sp-4', name: 'Emma Wilson', email: 'emma.wilson@example.com', role: 'Host' },
    ],
  },
  {
    id: '4',
    title: 'AI/ML Networking Mixer',
    description: 'Casual networking event for AI and machine learning professionals. Connect over drinks and demos.',
    date: '2024-05-08',
    time: '6:00 PM EST',
    attendeeCount: 234,
    location: 'in-person',
    locationDetails: 'TechHub, New York',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2024-03-01',
    creatorEmail: 'james.parker@example.com',
    creatorName: 'James Parker',
    visibility: 'public',
    accessType: 'open',
    isPaid: false,
    isStandalone: true,
    waitlistEnabled: false,
    hideLocation: false,
  },
  {
    id: '6',
    title: 'SEO & Content Marketing Workshop',
    description: 'Practical workshop on SEO strategies and content marketing tactics that drive results.',
    date: '2024-05-25',
    time: '1:00 PM EST',
    attendeeCount: 93,
    capacity: 120,
    location: 'virtual',
    locationDetails: 'Zoom',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2024-04-05',
    creatorEmail: 'lisa.martinez@example.com',
    creatorName: 'Lisa Martinez',
    visibility: 'public',
    accessType: 'screened',
    isPaid: false,
    isStandalone: false,
    parentCommunityId: 'comm-3',
    linkedToCommunity: true,
    communityName: 'Digital Marketers Guild',
    waitlistEnabled: false,
    speakers: [
      { id: 'sp-5', name: 'Lisa Martinez', email: 'lisa.martinez@example.com', role: 'Host' },
      { id: 'sp-6', name: 'Neil Patel', email: 'neil@example.com', role: 'Speaker' },
    ],
  },
  {
    id: '7',
    title: 'Frontend Performance Optimization',
    description: 'Learn advanced techniques to optimize web application performance and improve user experience.',
    date: '2024-05-30',
    time: '3:00 PM EST',
    attendeeCount: 64,
    capacity: 80,
    location: 'virtual',
    locationDetails: 'Zoom',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2024-04-10',
    creatorEmail: 'michael.chen@example.com',
    creatorName: 'Michael Chen',
    visibility: 'shared',
    accessType: 'paid',
    isPaid: true,
    price: 49,
    currency: 'USD',
    tickets: [
      { id: 'tkt-3', name: 'Standard', price: 49, currency: 'USD', quantity: 80, description: 'Full access' },
    ],
    isStandalone: false,
    parentCourseId: 'course-1',
    courseName: 'Advanced Web Performance',
    waitlistEnabled: true,
    speakers: [
      { id: 'sp-7', name: 'Michael Chen', email: 'michael.chen@example.com', role: 'Host' },
    ],
  },
  {
    id: '8',
    title: 'UX Research Methods Workshop',
    description: 'Comprehensive workshop on modern UX research methods and how to apply them in real projects.',
    date: '2024-06-05',
    time: '10:00 AM EST',
    attendeeCount: 48,
    capacity: 60,
    location: 'virtual',
    locationDetails: 'Google Meet',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2024-04-12',
    creatorEmail: 'sophia.jones@example.com',
    creatorName: 'Sophia Jones',
    visibility: 'global',
    accessType: 'open',
    isPaid: false,
    isStandalone: true,
    waitlistEnabled: false,
    speakers: [
      { id: 'sp-8', name: 'Sophia Jones', email: 'sophia.jones@example.com', role: 'Host' },
    ],
  },
  {
    id: '9',
    title: 'Design x Dev: Bridging the Gap',
    description: 'A joint event between the Design and Engineering communities exploring collaboration frameworks.',
    date: '2024-06-15',
    time: '11:00 AM EST',
    attendeeCount: 112,
    capacity: 200,
    location: 'hybrid',
    locationDetails: 'WeWork SoHo + Virtual',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2024-04-25',
    creatorEmail: 'emma.wilson@example.com',
    creatorName: 'Emma Wilson',
    visibility: 'shared',
    accessType: 'open',
    isPaid: false,
    isStandalone: false,
    parentCommunityId: 'comm-4',
    linkedToCommunity: true,
    communityName: 'Design Engineers',
    waitlistEnabled: true,
    hideLocation: false,
    speakers: [
      { id: 'sp-9', name: 'Emma Wilson', email: 'emma.wilson@example.com', role: 'Host' },
      { id: 'sp-10', name: 'Michael Chen', email: 'michael.chen@example.com', role: 'Speaker' },
    ],
  },
  {
    id: '10',
    title: 'React Hooks Office Hours',
    description: 'Weekly live Q&A session for students enrolled in the React Mastery course. Bring your questions!',
    date: '2024-05-22',
    time: '5:00 PM EST',
    attendeeCount: 32,
    capacity: 40,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: false,
    createdAt: '2024-04-18',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'private',
    accessType: 'open',
    isPaid: false,
    isStandalone: false,
    parentCourseId: 'course-2',
    courseName: 'React Mastery',
    linkedToCommunity: true,
    communityName: 'React Developers Hub',
    waitlistEnabled: false,
  },
  {
    id: '11',
    title: 'Executive AI Strategy Dinner',
    description: 'An exclusive dinner for C-suite executives exploring AI adoption strategies. Application required.',
    date: '2024-06-20',
    time: '7:30 PM EST',
    attendeeCount: 18,
    capacity: 25,
    location: 'in-person',
    locationDetails: 'Private Venue, Manhattan',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2024-05-01',
    creatorEmail: 'james.parker@example.com',
    creatorName: 'James Parker',
    visibility: 'global',
    accessType: 'screened',
    isPaid: true,
    price: 299,
    currency: 'USD',
    tickets: [
      { id: 'tkt-4', name: 'Executive Seat', price: 299, currency: 'USD', quantity: 25, description: 'Dinner + networking + exclusive report' },
    ],
    isStandalone: true,
    waitlistEnabled: true,
    hideLocation: true,
    speakers: [
      { id: 'sp-11', name: 'James Parker', email: 'james.parker@example.com', role: 'Host' },
      { id: 'sp-12', name: 'Satya Nadella', email: 'satya@example.com', role: 'Speaker' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT A: "Intro to Product Thinking" — SKELETON DRAFT
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event A
  //  Purpose: Empty event builder + onboarding checklist + AI suggestions
  //  Viewer: Mahesh (creator)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'A1',
    title: 'Intro to Product Thinking',
    description: 'A workshop exploring product thinking fundamentals for aspiring and early-career product managers.',
    date: '2026-03-15',
    time: '2:00 PM EST',
    attendeeCount: 0,
    location: 'virtual',
    status: 'draft',
    lifecycleStage: 'skeleton',
    isPublic: true,
    createdAt: '2026-02-16',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'public',
    accessType: 'open',
    isPaid: false,
    isStandalone: true,
    waitlistEnabled: false,
    speakers: [],
    completionChecklist: {
      hasTitle: true,
      hasDescription: true,
      hasDateTime: true,
      hasCoverImage: false,
      hasAgenda: false,
      hasTickets: false,
      hasSpeakers: false,
      hasLocation: false,
      hasRegistrationForm: false,
    },
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT B: "Advanced TypeScript Patterns" — MID-BUILD DRAFT
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event B
  //  Purpose: Mid-build warnings + AI suggestions + partial content
  //  Viewer: Mahesh (creator)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'B1',
    title: 'Advanced TypeScript Patterns',
    description: 'Deep dive into advanced TypeScript patterns including template literal types, conditional types, mapped types, and real-world utility type construction.',
    date: '2026-04-10',
    time: '3:00 PM EST',
    attendeeCount: 0,
    capacity: 80,
    location: 'virtual',
    status: 'draft',
    lifecycleStage: 'building',
    isPublic: true,
    createdAt: '2026-02-10',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'public',
    accessType: 'paid',
    isPaid: true,
    price: 39,
    currency: 'USD',
    tickets: [
      { id: 'tkt-b1', name: 'General', price: 39, currency: 'USD', quantity: 80, description: 'Full workshop access' },
    ],
    isStandalone: true,
    waitlistEnabled: false,
    speakers: [
      { id: 'sp-b1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
    ],
    completionChecklist: {
      hasTitle: true,
      hasDescription: true,
      hasDateTime: true,
      hasCoverImage: false,
      hasAgenda: true,  // partial — only 2 sessions
      hasTickets: true,
      hasSpeakers: true, // only host, no guest speakers
      hasLocation: false, // virtual but no meeting link set
      hasRegistrationForm: false,
    },
    schedule: [
      { id: 's-b1', time: '3:00 PM', title: 'Template Literal Types', duration: 45, type: 'session', speakers: ['Mahesh Kumar'] },
      { id: 's-b2', time: '3:45 PM', title: 'Conditional Types Deep Dive', duration: 45, type: 'session', speakers: ['Mahesh Kumar'] },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT C: "Cloud Architecture Workshop" — READY TO PUBLISH
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event C
  //  Purpose: Final review checklist, publish confirmation, 3-tier tickets
  //  Viewer: Mahesh (creator)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'C1',
    title: 'Cloud Architecture Workshop',
    description: 'Comprehensive hands-on workshop covering cloud architecture patterns, microservices design, and deployment strategies across AWS, GCP, and Azure.',
    date: '2026-04-25',
    time: '10:00 AM EST',
    attendeeCount: 0,
    capacity: 115,
    location: 'virtual',
    locationDetails: 'Leapcast (auto-generated)',
    status: 'draft',
    lifecycleStage: 'ready',
    isPublic: true,
    createdAt: '2026-02-05',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'public',
    accessType: 'paid',
    isPaid: true,
    price: 39,
    currency: 'USD',
    tickets: [
      { id: 'tkt-c1', name: 'Early Bird', price: 39, currency: 'USD', quantity: 30, description: 'Limited early access pricing', perks: ['Full workshop access', 'Recording (30 days)', 'Resources download'] },
      { id: 'tkt-c2', name: 'General', price: 59, currency: 'USD', quantity: 70, description: 'Full workshop access', perks: ['Full workshop access', 'Recording (30 days)', 'Resources download', 'Community access'] },
      { id: 'tkt-c3', name: 'VIP + Code Review', price: 129, currency: 'USD', quantity: 15, description: '1-on-1 code review session with Mahesh after the workshop', perks: ['Everything in General', '1-on-1 code review', 'Priority Q&A', 'Lifetime recording', 'Certificate'] },
    ],
    isStandalone: true,
    waitlistEnabled: true,
    speakers: [
      { id: 'sp-c1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
      { id: 'sp-c2', name: 'Rachel Green', email: 'rachel.green@example.com', role: 'Speaker' },
    ],
    completionChecklist: {
      hasTitle: true,
      hasDescription: true,
      hasDateTime: true,
      hasCoverImage: true,
      hasAgenda: true,
      hasTickets: true,
      hasSpeakers: true,
      hasLocation: true,
      hasRegistrationForm: true,
    },
    schedule: [
      { id: 's-c1', time: '10:00 AM', title: 'Welcome & Cloud Architecture Overview', duration: 30, type: 'keynote', speakers: ['Mahesh Kumar'] },
      { id: 's-c2', time: '10:30 AM', title: 'Microservices Design Patterns', duration: 60, type: 'session', speakers: ['Rachel Green'] },
      { id: 's-c3', time: '11:30 AM', title: 'Networking Break', duration: 15, type: 'break', speakers: [] },
      { id: 's-c4', time: '11:45 AM', title: 'Hands-on: Deploying to AWS', duration: 75, type: 'workshop', speakers: ['Mahesh Kumar'] },
      { id: 's-c5', time: '1:00 PM', title: 'Q&A and Closing', duration: 30, type: 'session', speakers: ['Mahesh Kumar', 'Rachel Green'] },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT D: "Full-Stack AI Bootcamp" — SOLD OUT (Creator manages waitlist)
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event D
  //  Purpose: Creator managing sold-out event + waitlist promotion panel
  //  Viewer: Mahesh (creator)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'D1',
    title: 'Full-Stack AI Bootcamp',
    description: 'Intensive bootcamp on building AI-powered full-stack applications. From prompt engineering to production deployment with LangChain, vector databases, and React.',
    date: '2026-03-20',
    time: '9:00 AM EST',
    attendeeCount: 63,
    capacity: 60,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-01-15',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'public',
    accessType: 'paid',
    isPaid: true,
    price: 79,
    currency: 'USD',
    tickets: [
      { id: 'tkt-d1', name: 'General', price: 79, currency: 'USD', quantity: 60, description: 'Full bootcamp access', remaining: 0 },
    ],
    isStandalone: true,
    waitlistEnabled: true,
    speakers: [
      { id: 'sp-d1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
    ],
  },

  // ───────────────────────────────────���──────────────────────────
  //  NEW EVENT E: "Data Science Bootcamp" — MULTI-TIER PAID (Learner ticket selection)
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event E
  //  Purpose: 3 ticket tiers + early bird + discount codes
  //  Viewer: Sarah (learner)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'E1',
    title: 'Data Science Bootcamp',
    description: 'From data wrangling to model deployment — a full-day intensive covering Python, Pandas, Scikit-learn, and real-world ML pipelines.',
    date: '2026-05-10',
    time: '9:00 AM EST',
    attendeeCount: 105,
    capacity: 170,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-01-20',
    creatorEmail: 'sophia.jones@example.com',
    creatorName: 'Sophia Jones',
    visibility: 'global',
    accessType: 'paid',
    isPaid: true,
    price: 25, // lowest tier for card display
    currency: 'USD',
    tickets: [
      { id: 'tkt-e1', name: 'Student', price: 25, currency: 'USD', quantity: 50, description: 'For students with a valid .edu email', remaining: 18, perks: ['All sessions', 'Recording (7 days)', 'Community access'] },
      { id: 'tkt-e2', name: 'General Admission', price: 49, currency: 'USD', quantity: 100, description: 'Full bootcamp access', remaining: 42, perks: ['All sessions', 'Recording (30 days)', 'Resources download', 'Community access'] },
      { id: 'tkt-e3', name: 'VIP + Mentorship', price: 149, currency: 'USD', quantity: 20, description: '30-min 1-on-1 mentorship session + priority Q&A', remaining: 5, perks: ['Everything in General', '1-on-1 mentorship', 'Priority Q&A', 'Lifetime recording', 'Certificate'] },
    ],
    earlyBird: {
      deadline: '2026-04-25',
      discountPercent: 20,
      active: true,
    },
    discountCodes: [
      { code: 'LAUNCH20', type: 'percent', value: 20, limit: 50, used: 12 },
    ],
    isStandalone: true,
    waitlistEnabled: true,
    speakers: [
      { id: 'sp-e1', name: 'Sophia Jones', email: 'sophia.jones@example.com', role: 'Host' },
      { id: 'sp-e2', name: 'Andrew Ng', email: 'andrew@example.com', role: 'Speaker' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  EVENT F: Uses existing event #6 — no new mock needed
  //  Sarah's 'applied' registration already exists (reg-6)
  //  Enhanced rendering handled in PublicEventLandingV3Tabbed
  // ──────────────────────────────────────────────────────────────

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT G: "Leadership Retreat 2026" — APPLICATION REJECTED
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event G
  //  Purpose: Rejected application experience
  //  Viewer: Sarah (learner) — sees rejection notice + organizer message
  // ──────────────────────────────────────────────────────────────
  {
    id: 'G1',
    title: 'Leadership Retreat 2026',
    description: 'An exclusive 2-day retreat for senior leaders to explore executive coaching, team dynamics, and strategic decision-making frameworks.',
    date: '2026-06-01',
    time: '8:00 AM EST',
    attendeeCount: 16,
    capacity: 20,
    location: 'in-person',
    locationDetails: 'Revealed upon acceptance',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-01-10',
    creatorEmail: 'james.parker@example.com',
    creatorName: 'James Parker',
    visibility: 'private',
    accessType: 'screened',
    isPaid: true,
    price: 399,
    currency: 'USD',
    tickets: [
      { id: 'tkt-g1', name: 'Executive Pass', price: 399, currency: 'USD', quantity: 20, description: '2-day retreat + meals + materials' },
    ],
    isStandalone: true,
    waitlistEnabled: false,
    hideLocation: true,
    speakers: [
      { id: 'sp-g1', name: 'James Parker', email: 'james.parker@example.com', role: 'Host' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT H: "API Design Masterclass" — WAITLISTED
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event H
  //  Purpose: Waitlist position + notification preferences
  //  Viewer: Sarah (learner) — #3 on waitlist
  // ──────────────────────────────────────────────────────────────
  {
    id: 'H1',
    title: 'API Design Masterclass',
    description: 'Learn REST, GraphQL, and gRPC API design patterns. Hands-on exercises building production-grade APIs with proper versioning, auth, and documentation.',
    date: '2026-04-18',
    time: '1:00 PM EST',
    attendeeCount: 40,
    capacity: 40,
    location: 'virtual',
    locationDetails: 'Zoom',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-02-01',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'public',
    accessType: 'open',
    isPaid: true,
    price: 35,
    currency: 'USD',
    tickets: [
      { id: 'tkt-h1', name: 'General', price: 35, currency: 'USD', quantity: 40, description: 'Full masterclass access', remaining: 0 },
    ],
    isStandalone: true,
    waitlistEnabled: true,
    speakers: [
      { id: 'sp-h1', name: 'Michael Chen', email: 'michael.chen@example.com', role: 'Host' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT I: "React Summit 2026" — LIVE / IN-PROGRESS
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event I
  //  Purpose: Live dashboard (creator) + Join Now (learner)
  //  Viewer: Both — Mahesh (creator), Sarah (registered attendee)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'I1',
    title: 'React Summit 2026',
    description: 'The biggest React conference of the year. Live talks, workshops, and networking with the React community.',
    date: '2026-02-17',
    time: '10:00 AM EST',
    attendeeCount: 487,
    capacity: 500,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'upcoming',
    lifecycleStage: 'live',
    liveStartedAt: '2026-02-17T10:00:00',
    liveAttendeeCount: 312,
    isPublic: true,
    createdAt: '2025-12-01',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'global',
    accessType: 'open',
    isPaid: false,
    isStandalone: false,
    parentCommunityId: 'comm-1',
    linkedToCommunity: true,
    communityName: 'React Developers Hub',
    waitlistEnabled: false,
    speakers: [
      { id: 'sp-i1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
      { id: 'sp-i2', name: 'Dan Abramov', email: 'dan@example.com', role: 'Speaker' },
      { id: 'sp-i3', name: 'Sophie Alpert', email: 'sophie@example.com', role: 'Speaker' },
    ],
    schedule: [
      { id: 's-i1', time: '10:00 AM', title: 'Opening Keynote', duration: 30, type: 'keynote', speakers: ['Mahesh Kumar'], room: 'Main Stage' },
      { id: 's-i2', time: '10:30 AM', title: 'The Future of React Server Components', duration: 45, type: 'keynote', speakers: ['Dan Abramov'], room: 'Main Stage' },
      { id: 's-i3', time: '11:15 AM', title: 'Networking Break', duration: 15, type: 'break', speakers: [], room: 'Lobby' },
      { id: 's-i4', time: '11:30 AM', title: 'Workshop: Building with RSC', duration: 90, type: 'workshop', speakers: ['Sophie Alpert'], room: 'Workshop Room A' },
      { id: 's-i5', time: '1:00 PM', title: 'Fireside Chat & Q&A', duration: 30, type: 'session', speakers: ['Dan Abramov', 'Sophie Alpert'], room: 'Main Stage' },
      { id: 's-i6', time: '1:30 PM', title: 'Closing & Certificates', duration: 15, type: 'session', speakers: ['Mahesh Kumar'], room: 'Main Stage' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT J: "ML Workshop" — JUST ENDED (no materials yet)
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event J
  //  Purpose: Post-event todo checklist (creator) + materials pending (learner)
  //  Viewer: Both
  // ──────────────────────────────────────────────────────────────
  {
    id: 'J1',
    title: 'ML Workshop: From Data to Deployment',
    description: 'Practical machine learning workshop covering the full pipeline from data collection to model deployment.',
    date: '2026-02-17',
    time: '8:00 AM EST',
    attendeeCount: 72,
    capacity: 80,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'past',
    lifecycleStage: 'ended',
    isPublic: true,
    createdAt: '2026-01-15',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'public',
    accessType: 'open',
    isPaid: false,
    isStandalone: true,
    waitlistEnabled: false,
    // NO recording/resources yet — that's the point
    postEventTodos: {
      uploadRecording: false,
      sendFollowUp: false,
      issueCertificates: false,
      collectFeedback: false,
      publishResources: false,
    },
    attendanceReport: {
      registered: 72,
      attended: 58,
      peakConcurrent: 54,
      avgDuration: 87,
      engagementScore: 78,
    },
    speakers: [
      { id: 'sp-j1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT K: "Growth Hacking Bootcamp" — CANCELLED
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event K
  //  Purpose: Cancellation notice + refund tracker (creator) + refund info (learner)
  //  Viewer: Both
  // ──────────────────────────────────────────────────────────────
  {
    id: 'K1',
    title: 'Growth Hacking Bootcamp',
    description: 'Intensive bootcamp on growth strategies, viral loops, and data-driven marketing. Learn from experienced growth leads at top startups.',
    date: '2026-04-05',
    time: '10:00 AM EST',
    attendeeCount: 45,
    capacity: 80,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'cancelled',
    lifecycleStage: 'cancelled',
    cancelledAt: '2026-03-20',
    cancellationReason: 'Due to a scheduling conflict with our lead speaker, we need to postpone this event. All ticket holders will receive a full refund within 5-7 business days. We plan to reschedule for Q3 2026.',
    refundPolicy: 'full',
    isPublic: true,
    createdAt: '2026-01-10',
    creatorEmail: 'mahesh@email.com',
    creatorName: 'Mahesh Kumar',
    visibility: 'public',
    accessType: 'paid',
    isPaid: true,
    price: 69,
    currency: 'USD',
    tickets: [
      { id: 'tkt-k1', name: 'General', price: 69, currency: 'USD', quantity: 80, description: 'Full bootcamp access' },
    ],
    isStandalone: true,
    waitlistEnabled: false,
    speakers: [
      { id: 'sp-k1', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Host' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT L: "DevOps Pipeline Workshop" — SPEAKER/CO-HOST VIEW
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event L
  //  Purpose: Mahesh as speaker (not creator) sees restricted admin tabs
  //  Viewer: Mahesh (speaker), Rachel Green (creator)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'L1',
    title: 'DevOps Pipeline Workshop',
    description: 'Build CI/CD pipelines from scratch. Covers GitHub Actions, Docker, Kubernetes, and monitoring with Grafana and Prometheus.',
    date: '2026-04-12',
    time: '11:00 AM EST',
    attendeeCount: 76,
    capacity: 100,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-02-01',
    creatorEmail: 'rachel.green@example.com',
    creatorName: 'Rachel Green',
    visibility: 'public',
    accessType: 'open',
    isPaid: false,
    isStandalone: false,
    parentCommunityId: 'comm-5',
    linkedToCommunity: true,
    communityName: 'DevOps Engineers',
    waitlistEnabled: true,
    moderators: ['mahesh@email.com'],
    speakers: [
      { id: 'sp-l1', name: 'Rachel Green', email: 'rachel.green@example.com', role: 'Host' },
      { id: 'sp-l2', name: 'Mahesh Kumar', email: 'mahesh@email.com', role: 'Speaker' },
    ],
    schedule: [
      { id: 's-l1', time: '11:00 AM', title: 'Welcome & Overview', duration: 15, type: 'keynote', speakers: ['Rachel Green'] },
      { id: 's-l2', time: '11:15 AM', title: 'Building CI/CD with GitHub Actions', duration: 60, type: 'session', speakers: ['Mahesh Kumar'] },
      { id: 's-l3', time: '12:15 PM', title: 'Break', duration: 15, type: 'break', speakers: [] },
      { id: 's-l4', time: '12:30 PM', title: 'Docker & Kubernetes Orchestration', duration: 60, type: 'workshop', speakers: ['Rachel Green'] },
      { id: 's-l5', time: '1:30 PM', title: 'Monitoring with Grafana', duration: 45, type: 'session', speakers: ['Mahesh Kumar'] },
      { id: 's-l6', time: '2:15 PM', title: 'Q&A and Wrap Up', duration: 15, type: 'session', speakers: ['Rachel Green', 'Mahesh Kumar'] },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  NEW EVENT M: "Community Town Hall" — ANONYMOUS / LOGGED-OUT VIEW
  //  Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event M
  //  Purpose: Logged-out public page with auth-gated CTAs
  //  Viewer: Anonymous (no currentUser)
  // ──────────────────────────────────────────────────────────────
  {
    id: 'M1',
    title: 'Community Town Hall: State of Open Source 2026',
    description: 'Monthly town hall discussing the state of open source, upcoming initiatives, and community Q&A. Open to everyone interested in open source.',
    date: '2026-03-01',
    time: '12:00 PM EST',
    attendeeCount: 189,
    capacity: 300,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-01-25',
    creatorEmail: 'emma.wilson@example.com',
    creatorName: 'Emma Wilson',
    visibility: 'global',
    accessType: 'open',
    isPaid: false,
    isStandalone: true,
    waitlistEnabled: false,
    speakers: [
      { id: 'sp-m1', name: 'Emma Wilson', email: 'emma.wilson@example.com', role: 'Host' },
      { id: 'sp-m2', name: 'Linus Torvalds', email: 'linus@example.com', role: 'Speaker' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  //  EXTERNAL LEAPSPACE EVENTS — communities user is NOT a member of
  // ──────────────────────────────────────────────────────────────

  // AI Creators Collective (comm-ext-1)
  {
    id: 'EXT-AI-1',
    title: 'Building Autonomous Agents with LangGraph',
    description: 'Learn how to build production-ready AI agents using LangGraph, tool-calling, and memory systems.',
    date: '2026-03-25',
    time: '3:00 PM EST',
    attendeeCount: 156,
    capacity: 200,
    location: 'virtual',
    locationDetails: 'Zoom',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-02-15',
    creatorEmail: 'aria.chen@example.com',
    creatorName: 'Aria Chen',
    visibility: 'public',
    accessType: 'open',
    isPaid: false,
    isStandalone: false,
    parentCommunityId: 'comm-ext-1',
    linkedToCommunity: true,
    communityName: 'AI Creators Collective',
    waitlistEnabled: true,
    category: 'technology',
    speakers: [
      { id: 'sp-ext-1', name: 'Aria Chen', email: 'aria.chen@example.com', role: 'Host' },
      { id: 'sp-ext-2', name: 'Harrison Chase', email: 'harrison@example.com', role: 'Speaker' },
    ],
  },
  {
    id: 'EXT-AI-2',
    title: 'Multimodal AI: Vision + Language Models',
    description: 'Explore GPT-4V, Gemini, and open-source multimodal models for real-world applications.',
    date: '2026-04-02',
    time: '1:00 PM EST',
    attendeeCount: 89,
    capacity: 150,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-03-01',
    creatorEmail: 'aria.chen@example.com',
    creatorName: 'Aria Chen',
    visibility: 'public',
    accessType: 'open',
    isPaid: true,
    price: 29,
    isStandalone: false,
    parentCommunityId: 'comm-ext-1',
    linkedToCommunity: true,
    communityName: 'AI Creators Collective',
    waitlistEnabled: false,
    category: 'technology',
    speakers: [
      { id: 'sp-ext-3', name: 'Aria Chen', email: 'aria.chen@example.com', role: 'Host' },
    ],
  },
  {
    id: 'EXT-AI-3',
    title: 'RAG Architecture Patterns Workshop',
    description: 'Deep dive into retrieval-augmented generation: chunking strategies, embedding models, and vector DBs.',
    date: '2026-04-10',
    time: '11:00 AM EST',
    attendeeCount: 42,
    capacity: 80,
    location: 'virtual',
    locationDetails: 'Zoom',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-03-05',
    creatorEmail: 'james.park@example.com',
    creatorName: 'James Park',
    visibility: 'public',
    accessType: 'waitlist',
    isPaid: true,
    price: 49,
    isStandalone: false,
    parentCommunityId: 'comm-ext-1',
    linkedToCommunity: true,
    communityName: 'AI Creators Collective',
    waitlistEnabled: true,
    category: 'technology',
    speakers: [
      { id: 'sp-ext-4', name: 'James Park', email: 'james.park@example.com', role: 'Host' },
    ],
  },

  // Product Managers Circle (comm-ext-2)
  {
    id: 'EXT-PM-1',
    title: 'Outcome-Driven Roadmapping',
    description: 'Move beyond feature factories. Learn to build roadmaps around outcomes, metrics, and customer impact.',
    date: '2026-03-28',
    time: '10:00 AM EST',
    attendeeCount: 210,
    capacity: 250,
    location: 'virtual',
    locationDetails: 'Zoom',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-02-20',
    creatorEmail: 'priya.sharma@example.com',
    creatorName: 'Priya Sharma',
    visibility: 'public',
    accessType: 'open',
    isPaid: false,
    isStandalone: false,
    parentCommunityId: 'comm-ext-2',
    linkedToCommunity: true,
    communityName: 'Product Managers Circle',
    waitlistEnabled: true,
    category: 'business',
    speakers: [
      { id: 'sp-ext-5', name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'Host' },
      { id: 'sp-ext-6', name: 'Marty Cagan', email: 'marty@example.com', role: 'Speaker' },
    ],
  },
  {
    id: 'EXT-PM-2',
    title: 'User Research on a Budget',
    description: 'Practical techniques for conducting user research when you have limited time and resources.',
    date: '2026-04-05',
    time: '2:00 PM EST',
    attendeeCount: 64,
    capacity: 100,
    location: 'hybrid',
    locationDetails: 'New York + Virtual',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-03-10',
    creatorEmail: 'priya.sharma@example.com',
    creatorName: 'Priya Sharma',
    visibility: 'public',
    accessType: 'open',
    isPaid: true,
    price: 19,
    isStandalone: false,
    parentCommunityId: 'comm-ext-2',
    linkedToCommunity: true,
    communityName: 'Product Managers Circle',
    waitlistEnabled: false,
    category: 'business',
    speakers: [
      { id: 'sp-ext-7', name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'Host' },
    ],
  },

  // Data Science Guild (comm-ext-3)
  {
    id: 'EXT-DS-1',
    title: 'Feature Engineering Masterclass',
    description: 'Advanced feature engineering techniques for tabular data, time series, and NLP pipelines.',
    date: '2026-04-01',
    time: '11:00 AM EST',
    attendeeCount: 73,
    capacity: 120,
    location: 'virtual',
    locationDetails: 'Zoom',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-03-01',
    creatorEmail: 'omar.khan@example.com',
    creatorName: 'Omar Khan',
    visibility: 'public',
    accessType: 'open',
    isPaid: false,
    isStandalone: false,
    parentCommunityId: 'comm-ext-3',
    linkedToCommunity: true,
    communityName: 'Data Science Guild',
    waitlistEnabled: false,
    category: 'technology',
    speakers: [
      { id: 'sp-ext-8', name: 'Omar Khan', email: 'omar.khan@example.com', role: 'Host' },
    ],
  },
  {
    id: 'EXT-DS-2',
    title: 'MLOps: From Notebook to Production',
    description: 'End-to-end ML deployment with MLflow, Kubeflow, and monitoring in production environments.',
    date: '2026-04-08',
    time: '3:00 PM EST',
    attendeeCount: 98,
    capacity: 150,
    location: 'virtual',
    locationDetails: 'Leapcast',
    status: 'upcoming',
    lifecycleStage: 'published',
    isPublic: true,
    createdAt: '2026-03-05',
    creatorEmail: 'omar.khan@example.com',
    creatorName: 'Omar Khan',
    visibility: 'public',
    accessType: 'screened',
    isPaid: true,
    price: 39,
    isStandalone: false,
    parentCommunityId: 'comm-ext-3',
    linkedToCommunity: true,
    communityName: 'Data Science Guild',
    waitlistEnabled: true,
    category: 'technology',
    speakers: [
      { id: 'sp-ext-9', name: 'Omar Khan', email: 'omar.khan@example.com', role: 'Host' },
      { id: 'sp-ext-10', name: 'Chip Huyen', email: 'chip@example.com', role: 'Speaker' },
    ],
  },
];

// ════════════════════════════════════════════════════════════════
//  MOCK REGISTRATIONS
//  Original + new entries for events G, H, I, J, K
// ════════════════════════════════════════════════════════════════

export const mockRegistrations: Registration[] = [
  // ── Original registrations ──
  {
    id: 'reg-1',
    eventId: '2', // Design System Masterclass
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    status: 'confirmed',
    registeredAt: '2024-03-20',
    formData: {
      name: 'Sarah Chen',
      email: 'sarah.chen@gmail.com',
      company: 'TechCorp',
      role: 'Product Designer',
    },
  },
  {
    id: 'reg-2',
    eventId: '4', // AI/ML Networking Mixer
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    status: 'confirmed',
    registeredAt: '2024-03-10',
    formData: {
      name: 'Sarah Chen',
      email: 'sarah.chen@gmail.com',
      dietaryRestrictions: 'Vegetarian',
    },
  },
  {
    id: 'reg-5',
    eventId: '8', // UX Research Methods Workshop
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    status: 'confirmed',
    registeredAt: '2024-04-20',
    formData: {
      name: 'Sarah Chen',
      email: 'sarah.chen@gmail.com',
      experience: '3 years in UX',
    },
  },
  {
    id: 'reg-3',
    eventId: '1', // React 18 Workshop (Mahesh's event)
    userEmail: 'john.doe@example.com',
    userName: 'John Doe',
    status: 'confirmed',
    registeredAt: '2024-04-05',
    formData: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      experienceLevel: 'Intermediate',
    },
  },
  {
    id: 'reg-4',
    eventId: '1', // React 18 Workshop (Mahesh's event)
    userEmail: 'jane.smith@example.com',
    userName: 'Jane Smith',
    status: 'confirmed',
    registeredAt: '2024-04-06',
    formData: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      experienceLevel: 'Advanced',
    },
  },
  {
    id: 'reg-6',
    eventId: '6', // SEO & Content Marketing Workshop (screened) — APPLICATION PENDING
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    status: 'applied',
    registeredAt: '2024-04-22',
    formData: {
      name: 'Sarah Chen',
      email: 'sarah.chen@gmail.com',
      company: 'TechCorp',
      experience: '2 years in content marketing',
      motivation: 'Want to improve our SEO strategy',
    },
  },

  // ── NEW: Event G — Leadership Retreat — Sarah REJECTED ──
  // Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event G
  {
    id: 'reg-g1',
    eventId: 'G1',
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    status: 'rejected',
    registeredAt: '2026-04-10',
    rejectedAt: '2026-04-15',
    rejectionReason: 'We prioritized applicants with 10+ years of leadership experience for this cohort. We encourage you to apply for our upcoming Leadership Foundations Workshop which may be a better fit.',
    formData: {
      name: 'Sarah Chen',
      email: 'sarah.chen@gmail.com',
      title: 'Product Designer',
      company: 'TechCorp',
      yearsExperience: '4',
      motivation: 'Looking to develop leadership skills as I transition into management',
    },
  },

  // ── NEW: Event I — React Summit 2026 — Sarah CONFIRMED ──
  // Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event I
  {
    id: 'reg-i1',
    eventId: 'I1',
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    status: 'confirmed',
    registeredAt: '2026-02-01',
    formData: {
      name: 'Sarah Chen',
      email: 'sarah.chen@gmail.com',
    },
  },

  // ── NEW: Event J — ML Workshop — Sarah CONFIRMED (attended) ──
  // Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event J
  {
    id: 'reg-j1',
    eventId: 'J1',
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    status: 'confirmed',
    registeredAt: '2026-02-10',
    formData: {
      name: 'Sarah Chen',
      email: 'sarah.chen@gmail.com',
    },
  },

  // ── NEW: Event K — Growth Hacking Bootcamp — Sarah CONFIRMED (now cancelled + refunded) ──
  // Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event K
  {
    id: 'reg-k1',
    eventId: 'K1',
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    status: 'confirmed',
    registeredAt: '2026-03-01',
    ticketTierId: 'tkt-k1',
    paymentAmount: 69,
    paymentStatus: 'refunded',
    formData: {
      name: 'Sarah Chen',
      email: 'sarah.chen@gmail.com',
    },
  },

  // ── NEW: Event D — Full-Stack AI Bootcamp — mock confirmed attendees (Mahesh's sold-out event) ──
  {
    id: 'reg-d1',
    eventId: 'D1',
    userEmail: 'john.doe@example.com',
    userName: 'John Doe',
    status: 'confirmed',
    registeredAt: '2026-01-20',
    ticketTierId: 'tkt-d1',
    paymentAmount: 79,
    paymentStatus: 'paid',
    formData: { name: 'John Doe', email: 'john.doe@example.com' },
  },
  {
    id: 'reg-d2',
    eventId: 'D1',
    userEmail: 'jane.smith@example.com',
    userName: 'Jane Smith',
    status: 'confirmed',
    registeredAt: '2026-01-22',
    ticketTierId: 'tkt-d1',
    paymentAmount: 79,
    paymentStatus: 'paid',
    formData: { name: 'Jane Smith', email: 'jane.smith@example.com' },
  },

  // ── NEW: Event H1 — API Design Masterclass — 40 confirmed registrations (AT CAPACITY) ──
  // Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event H
  // This event is full (40/40), with 7 people on waitlist
  {
    id: 'reg-h1',
    eventId: 'H1',
    userEmail: 'john.doe@example.com',
    userName: 'John Doe',
    status: 'confirmed',
    registeredAt: '2026-03-01',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'John Doe', email: 'john.doe@example.com' },
  },
  {
    id: 'reg-h2',
    eventId: 'H1',
    userEmail: 'jane.smith@example.com',
    userName: 'Jane Smith',
    status: 'confirmed',
    registeredAt: '2026-03-02',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Jane Smith', email: 'jane.smith@example.com' },
  },
  {
    id: 'reg-h3',
    eventId: 'H1',
    userEmail: 'mike.johnson@example.com',
    userName: 'Mike Johnson',
    status: 'confirmed',
    registeredAt: '2026-03-03',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Mike Johnson', email: 'mike.johnson@example.com' },
  },
  {
    id: 'reg-h4',
    eventId: 'H1',
    userEmail: 'lisa.wong@example.com',
    userName: 'Lisa Wong',
    status: 'confirmed',
    registeredAt: '2026-03-03',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Lisa Wong', email: 'lisa.wong@example.com' },
  },
  {
    id: 'reg-h5',
    eventId: 'H1',
    userEmail: 'tom.harris@example.com',
    userName: 'Tom Harris',
    status: 'confirmed',
    registeredAt: '2026-03-04',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Tom Harris', email: 'tom.harris@example.com' },
  },
  {
    id: 'reg-h6',
    eventId: 'H1',
    userEmail: 'amy.chen@example.com',
    userName: 'Amy Chen',
    status: 'confirmed',
    registeredAt: '2026-03-04',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Amy Chen', email: 'amy.chen@example.com' },
  },
  {
    id: 'reg-h7',
    eventId: 'H1',
    userEmail: 'raj.patel@example.com',
    userName: 'Raj Patel',
    status: 'confirmed',
    registeredAt: '2026-03-05',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Raj Patel', email: 'raj.patel@example.com' },
  },
  {
    id: 'reg-h8',
    eventId: 'H1',
    userEmail: 'kelly.brown@example.com',
    userName: 'Kelly Brown',
    status: 'confirmed',
    registeredAt: '2026-03-05',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Kelly Brown', email: 'kelly.brown@example.com' },
  },
  {
    id: 'reg-h9',
    eventId: 'H1',
    userEmail: 'sam.wilson@example.com',
    userName: 'Sam Wilson',
    status: 'confirmed',
    registeredAt: '2026-03-06',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Sam Wilson', email: 'sam.wilson@example.com' },
  },
  {
    id: 'reg-h10',
    eventId: 'H1',
    userEmail: 'nina.garcia@example.com',
    userName: 'Nina Garcia',
    status: 'confirmed',
    registeredAt: '2026-03-06',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Nina Garcia', email: 'nina.garcia@example.com' },
  },
  {
    id: 'reg-h11',
    eventId: 'H1',
    userEmail: 'peter.kim@example.com',
    userName: 'Peter Kim',
    status: 'confirmed',
    registeredAt: '2026-03-07',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Peter Kim', email: 'peter.kim@example.com' },
  },
  {
    id: 'reg-h12',
    eventId: 'H1',
    userEmail: 'olivia.martinez@example.com',
    userName: 'Olivia Martinez',
    status: 'confirmed',
    registeredAt: '2026-03-07',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Olivia Martinez', email: 'olivia.martinez@example.com' },
  },
  {
    id: 'reg-h13',
    eventId: 'H1',
    userEmail: 'brian.lee@example.com',
    userName: 'Brian Lee',
    status: 'confirmed',
    registeredAt: '2026-03-08',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Brian Lee', email: 'brian.lee@example.com' },
  },
  {
    id: 'reg-h14',
    eventId: 'H1',
    userEmail: 'sophia.nguyen@example.com',
    userName: 'Sophia Nguyen',
    status: 'confirmed',
    registeredAt: '2026-03-08',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Sophia Nguyen', email: 'sophia.nguyen@example.com' },
  },
  {
    id: 'reg-h15',
    eventId: 'H1',
    userEmail: 'marcus.taylor@example.com',
    userName: 'Marcus Taylor',
    status: 'confirmed',
    registeredAt: '2026-03-09',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Marcus Taylor', email: 'marcus.taylor@example.com' },
  },
  {
    id: 'reg-h16',
    eventId: 'H1',
    userEmail: 'diana.lopez@example.com',
    userName: 'Diana Lopez',
    status: 'confirmed',
    registeredAt: '2026-03-09',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Diana Lopez', email: 'diana.lopez@example.com' },
  },
  {
    id: 'reg-h17',
    eventId: 'H1',
    userEmail: 'ryan.anderson@example.com',
    userName: 'Ryan Anderson',
    status: 'confirmed',
    registeredAt: '2026-03-10',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Ryan Anderson', email: 'ryan.anderson@example.com' },
  },
  {
    id: 'reg-h18',
    eventId: 'H1',
    userEmail: 'emily.davis@example.com',
    userName: 'Emily Davis',
    status: 'confirmed',
    registeredAt: '2026-03-10',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Emily Davis', email: 'emily.davis@example.com' },
  },
  {
    id: 'reg-h19',
    eventId: 'H1',
    userEmail: 'daniel.white@example.com',
    userName: 'Daniel White',
    status: 'confirmed',
    registeredAt: '2026-03-11',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Daniel White', email: 'daniel.white@example.com' },
  },
  {
    id: 'reg-h20',
    eventId: 'H1',
    userEmail: 'jessica.miller@example.com',
    userName: 'Jessica Miller',
    status: 'confirmed',
    registeredAt: '2026-03-11',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Jessica Miller', email: 'jessica.miller@example.com' },
  },
  {
    id: 'reg-h21',
    eventId: 'H1',
    userEmail: 'kevin.thomas@example.com',
    userName: 'Kevin Thomas',
    status: 'confirmed',
    registeredAt: '2026-03-12',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Kevin Thomas', email: 'kevin.thomas@example.com' },
  },
  {
    id: 'reg-h22',
    eventId: 'H1',
    userEmail: 'lauren.jackson@example.com',
    userName: 'Lauren Jackson',
    status: 'confirmed',
    registeredAt: '2026-03-12',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Lauren Jackson', email: 'lauren.jackson@example.com' },
  },
  {
    id: 'reg-h23',
    eventId: 'H1',
    userEmail: 'jason.moore@example.com',
    userName: 'Jason Moore',
    status: 'confirmed',
    registeredAt: '2026-03-13',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Jason Moore', email: 'jason.moore@example.com' },
  },
  {
    id: 'reg-h24',
    eventId: 'H1',
    userEmail: 'megan.clark@example.com',
    userName: 'Megan Clark',
    status: 'confirmed',
    registeredAt: '2026-03-13',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Megan Clark', email: 'megan.clark@example.com' },
  },
  {
    id: 'reg-h25',
    eventId: 'H1',
    userEmail: 'andrew.rodriguez@example.com',
    userName: 'Andrew Rodriguez',
    status: 'confirmed',
    registeredAt: '2026-03-14',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Andrew Rodriguez', email: 'andrew.rodriguez@example.com' },
  },
  {
    id: 'reg-h26',
    eventId: 'H1',
    userEmail: 'hannah.lewis@example.com',
    userName: 'Hannah Lewis',
    status: 'confirmed',
    registeredAt: '2026-03-14',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Hannah Lewis', email: 'hannah.lewis@example.com' },
  },
  {
    id: 'reg-h27',
    eventId: 'H1',
    userEmail: 'chris.walker@example.com',
    userName: 'Chris Walker',
    status: 'confirmed',
    registeredAt: '2026-03-15',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Chris Walker', email: 'chris.walker@example.com' },
  },
  {
    id: 'reg-h28',
    eventId: 'H1',
    userEmail: 'amanda.hall@example.com',
    userName: 'Amanda Hall',
    status: 'confirmed',
    registeredAt: '2026-03-15',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Amanda Hall', email: 'amanda.hall@example.com' },
  },
  {
    id: 'reg-h29',
    eventId: 'H1',
    userEmail: 'tyler.allen@example.com',
    userName: 'Tyler Allen',
    status: 'confirmed',
    registeredAt: '2026-03-16',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Tyler Allen', email: 'tyler.allen@example.com' },
  },
  {
    id: 'reg-h30',
    eventId: 'H1',
    userEmail: 'natalie.young@example.com',
    userName: 'Natalie Young',
    status: 'confirmed',
    registeredAt: '2026-03-16',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Natalie Young', email: 'natalie.young@example.com' },
  },
  {
    id: 'reg-h31',
    eventId: 'H1',
    userEmail: 'justin.king@example.com',
    userName: 'Justin King',
    status: 'confirmed',
    registeredAt: '2026-03-17',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Justin King', email: 'justin.king@example.com' },
  },
  {
    id: 'reg-h32',
    eventId: 'H1',
    userEmail: 'victoria.wright@example.com',
    userName: 'Victoria Wright',
    status: 'confirmed',
    registeredAt: '2026-03-17',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Victoria Wright', email: 'victoria.wright@example.com' },
  },
  {
    id: 'reg-h33',
    eventId: 'H1',
    userEmail: 'nathan.green@example.com',
    userName: 'Nathan Green',
    status: 'confirmed',
    registeredAt: '2026-03-18',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Nathan Green', email: 'nathan.green@example.com' },
  },
  {
    id: 'reg-h34',
    eventId: 'H1',
    userEmail: 'rachel.baker@example.com',
    userName: 'Rachel Baker',
    status: 'confirmed',
    registeredAt: '2026-03-18',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Rachel Baker', email: 'rachel.baker@example.com' },
  },
  {
    id: 'reg-h35',
    eventId: 'H1',
    userEmail: 'eric.adams@example.com',
    userName: 'Eric Adams',
    status: 'confirmed',
    registeredAt: '2026-03-19',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Eric Adams', email: 'eric.adams@example.com' },
  },
  {
    id: 'reg-h36',
    eventId: 'H1',
    userEmail: 'stephanie.nelson@example.com',
    userName: 'Stephanie Nelson',
    status: 'confirmed',
    registeredAt: '2026-03-19',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Stephanie Nelson', email: 'stephanie.nelson@example.com' },
  },
  {
    id: 'reg-h37',
    eventId: 'H1',
    userEmail: 'brandon.carter@example.com',
    userName: 'Brandon Carter',
    status: 'confirmed',
    registeredAt: '2026-03-20',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Brandon Carter', email: 'brandon.carter@example.com' },
  },
  {
    id: 'reg-h38',
    eventId: 'H1',
    userEmail: 'michelle.mitchell@example.com',
    userName: 'Michelle Mitchell',
    status: 'confirmed',
    registeredAt: '2026-03-20',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Michelle Mitchell', email: 'michelle.mitchell@example.com' },
  },
  {
    id: 'reg-h39',
    eventId: 'H1',
    userEmail: 'jordan.perez@example.com',
    userName: 'Jordan Perez',
    status: 'confirmed',
    registeredAt: '2026-03-21',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Jordan Perez', email: 'jordan.perez@example.com' },
  },
  {
    id: 'reg-h40',
    eventId: 'H1',
    userEmail: 'ashley.roberts@example.com',
    userName: 'Ashley Roberts',
    status: 'confirmed',
    registeredAt: '2026-03-21',
    ticketTierId: 'tkt-h1',
    paymentAmount: 35,
    paymentStatus: 'paid',
    formData: { name: 'Ashley Roberts', email: 'ashley.roberts@example.com' },
  },
];

// ═══════════════════════════���═══════════════════════════════════
//  MOCK WAITLIST
//  Original + new entries for events D, H
// ════════════════════════════════════════════════════════════════

export const mockWaitlist: WaitlistEntry[] = [
  // ── Original waitlist ──
  {
    id: 'wait-1',
    eventId: '2', // Design System Masterclass (at capacity)
    userEmail: 'alex.brown@example.com',
    userName: 'Alex Brown',
    addedAt: '2024-04-15',
    priority: 1,
    message: 'Really excited to learn about design systems!',
  },
  {
    id: 'wait-2',
    eventId: '2',
    userEmail: 'chris.lee@example.com',
    userName: 'Chris Lee',
    addedAt: '2024-04-16',
    priority: 2,
  },
  {
    id: 'wait-3',
    eventId: '9', // Design x Dev — Sarah waitlisted
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    addedAt: '2024-05-01',
    priority: 1,
    message: 'Would love to attend this cross-functional event!',
  },

  // ── NEW: Event D — Full-Stack AI Bootcamp waitlist (Mahesh's sold-out event) ──
  // Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event D
  {
    id: 'wait-d1',
    eventId: 'D1',
    userEmail: 'alex.brown@example.com',
    userName: 'Alex Brown',
    addedAt: '2026-02-15',
    priority: 1,
    message: 'Really excited to learn about AI!',
  },
  {
    id: 'wait-d2',
    eventId: 'D1',
    userEmail: 'chris.lee@example.com',
    userName: 'Chris Lee',
    addedAt: '2026-02-16',
    priority: 2,
  },
  {
    id: 'wait-d3',
    eventId: 'D1',
    userEmail: 'kim.park@example.com',
    userName: 'Kim Park',
    addedAt: '2026-02-17',
    priority: 3,
    message: 'Can I get on the next available spot?',
  },

  // ── NEW: Event H — API Design Masterclass — Sarah waitlisted (#3) ──
  // Plan ref: MOCK_EVENTS_MASTER_PLAN.md §Event H
  {
    id: 'wait-h1',
    eventId: 'H1',
    userEmail: 'alex.brown@example.com',
    userName: 'Alex Brown',
    addedAt: '2026-04-03',
    priority: 1,
  },
  {
    id: 'wait-h2',
    eventId: 'H1',
    userEmail: 'chris.lee@example.com',
    userName: 'Chris Lee',
    addedAt: '2026-04-04',
    priority: 2,
  },
  {
    id: 'wait-h3',
    eventId: 'H1',
    userEmail: 'sarah.chen@gmail.com',
    userName: 'Sarah Chen',
    addedAt: '2026-04-05',
    priority: 3,
    message: 'Very interested in the GraphQL section!',
  },
  {
    id: 'wait-h4',
    eventId: 'H1',
    userEmail: 'david.kim@example.com',
    userName: 'David Kim',
    addedAt: '2026-04-06',
    priority: 4,
  },
  {
    id: 'wait-h5',
    eventId: 'H1',
    userEmail: 'emma.davis@example.com',
    userName: 'Emma Davis',
    addedAt: '2026-04-07',
    priority: 5,
  },
  {
    id: 'wait-h6',
    eventId: 'H1',
    userEmail: 'frank.wilson@example.com',
    userName: 'Frank Wilson',
    addedAt: '2026-04-08',
    priority: 6,
  },
  {
    id: 'wait-h7',
    eventId: 'H1',
    userEmail: 'grace.taylor@example.com',
    userName: 'Grace Taylor',
    addedAt: '2026-04-09',
    priority: 7,
  },
];

// ════════════════════════════════════════════════════════════════
//  HELPER FUNCTIONS
// ════════════════════════════════════════════════════════════════

// ── Role checks ──

export function isEventCreator(event: Event, userEmail: string): boolean {
  return event.creatorEmail === userEmail;
}

export function isEventModerator(event: Event, userEmail: string): boolean {
  return event.moderators?.includes(userEmail) || false;
}

export function isEventSpeaker(event: Event, userEmail: string): boolean {
  return event.speakers?.some(s => s.email === userEmail) || false;
}

export function isEventAdmin(event: Event, userEmail: string): boolean {
  return isEventCreator(event, userEmail) || isEventModerator(event, userEmail);
}

/**
 * Determine the user's role for an event.
 * Priority: creator > moderator > speaker > learner
 * Per PRODUCT_CLARITY.md §User Role Matrix
 */
export function getEventRole(event: Event, userEmail: string): 'creator' | 'moderator' | 'speaker' | 'learner' {
  if (isEventCreator(event, userEmail)) return 'creator';
  if (isEventModerator(event, userEmail)) return 'moderator';
  if (isEventSpeaker(event, userEmail)) return 'speaker';
  return 'learner';
}

// ── Registration status ──

export function getUserRegistration(eventId: string, userEmail: string): Registration | undefined {
  return mockRegistrations.find(
    r => r.eventId === eventId && r.userEmail === userEmail
  );
}

export function getUserRegistrationStatus(eventId: string, userEmail: string): 'registered' | 'waitlist' | 'applied' | 'rejected' | null {
  const registration = mockRegistrations.find(
    r => r.eventId === eventId && r.userEmail === userEmail
  );
  if (registration) {
    if (registration.status === 'confirmed') return 'registered';
    if (registration.status === 'applied') return 'applied';
    if (registration.status === 'rejected') return 'rejected';
    return 'waitlist';
  }
  
  const waitlistEntry = mockWaitlist.find(
    w => w.eventId === eventId && w.userEmail === userEmail
  );
  if (waitlistEntry) return 'waitlist';
  
  return null;
}

export function getEventRegistrations(eventId: string): Registration[] {
  return mockRegistrations.filter(r => r.eventId === eventId);
}

export function getEventWaitlist(eventId: string): WaitlistEntry[] {
  return mockWaitlist.filter(w => w.eventId === eventId).sort((a, b) => a.priority - b.priority);
}

// ── Lifecycle helpers ──

/**
 * Get the effective lifecycle stage for an event.
 * Falls back to deriving it from status if not explicitly set.
 */
export function getEventLifecycleStage(event: Event): EventLifecycleStage {
  if (event.lifecycleStage) return event.lifecycleStage;
  // Fallback derivation from status
  if (event.status === 'cancelled') return 'cancelled';
  if (event.status === 'past') return 'ended';
  if (event.status === 'draft') return 'building';
  return 'published';
}

export function isEventCancelled(event: Event): boolean {
  return event.status === 'cancelled' || event.lifecycleStage === 'cancelled';
}

export function isEventLive(event: Event): boolean {
  return event.lifecycleStage === 'live';
}

export function isEventSoldOut(event: Event): boolean {
  if (!event.capacity) return false;
  return event.attendeeCount >= event.capacity;
}

/**
 * Get completion percentage for draft events.
 * Returns 0-100 based on completionChecklist.
 */
export function getEventCompletionPercent(event: Event): number {
  if (!event.completionChecklist) return 100; // assume complete if no checklist
  const cl = event.completionChecklist;
  const items = [
    cl.hasTitle,
    cl.hasDescription,
    cl.hasDateTime,
    cl.hasCoverImage,
    cl.hasAgenda,
    cl.hasTickets,
    cl.hasSpeakers,
    cl.hasLocation,
    cl.hasRegistrationForm,
  ];
  const done = items.filter(Boolean).length;
  return Math.round((done / items.length) * 100);
}

/**
 * Get the count of completed checklist items.
 */
export function getEventCompletionCount(event: Event): { done: number; total: number } {
  if (!event.completionChecklist) return { done: 9, total: 9 };
  const cl = event.completionChecklist;
  const items = [
    cl.hasTitle,
    cl.hasDescription,
    cl.hasDateTime,
    cl.hasCoverImage,
    cl.hasAgenda,
    cl.hasTickets,
    cl.hasSpeakers,
    cl.hasLocation,
    cl.hasRegistrationForm,
  ];
  return { done: items.filter(Boolean).length, total: items.length };
}

/**
 * Get post-event completion percentage.
 */
export function getPostEventCompletionPercent(event: Event): number {
  if (!event.postEventTodos) return 0;
  const todos = event.postEventTodos;
  const items = [
    todos.uploadRecording,
    todos.sendFollowUp,
    todos.issueCertificates,
    todos.collectFeedback,
    todos.publishResources,
  ];
  const done = items.filter(Boolean).length;
  return Math.round((done / items.length) * 100);
}

/**
 * Get the speaker's session(s) from an event's schedule.
 */
export function getSpeakerSessions(event: Event, speakerName: string): ScheduleItem[] {
  if (!event.schedule) return [];
  return event.schedule.filter(s =>
    s.speaker === speakerName ||
    s.speakers?.includes(speakerName)
  );
}

/**
 * Get user's waitlist entry for an event.
 */
export function getUserWaitlistEntry(eventId: string, userEmail: string): WaitlistEntry | undefined {
  return mockWaitlist.find(
    w => w.eventId === eventId && w.userEmail === userEmail
  );
}

/**
 * Get total waitlist count for an event.
 */
export function getEventWaitlistCount(eventId: string): number {
  return mockWaitlist.filter(w => w.eventId === eventId).length;
}
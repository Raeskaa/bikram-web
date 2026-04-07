import React, { useState } from 'react';
import { Search, ChevronRight, Check, Star, X, Grid3x3, List, ChevronDown, MessageSquare, Video, CreditCard, Mail, BarChart3, Zap, Calendar, Gamepad2, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { IntegrationDetailPanel } from './IntegrationDetailPanel';

// Enhanced integration data with setup options
const integrationsData = [
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    icon: MessageSquare,
    description: 'Team communication & automation',
    longDescription: 'Connect your community to Slack for seamless team communication. Post updates, sync messages, and control your community with slash commands. Perfect for keeping your community engaged across platforms.',
    verified: true,
    popular: true,
    connected: true,
    installs: 12450,
    rating: 4.8,
    features: [
      'Post community updates to Slack channels automatically',
      'Two-way message synchronization between platforms',
      'Slash commands for community management',
      'Member notifications and alerts',
      'File sharing and attachments',
    ],
    useCases: [
      'Keeping members updated with event announcements',
      'Active communities already using Slack',
      'Admin teams managing multiple communities',
    ],
    permissions: [
      'Post messages to channels',
      'Read channel list and members',
      'Upload files and attachments',
      'Read workspace information',
    ],
    setupOptions: [
      {
        id: 'one-way-post',
        icon: '📢',
        title: 'Post Community Updates to Slack',
        description: 'One-way sync: Automatically post announcements, events, and new content from your community to Slack channels.',
        bestFor: 'Keeping Slack members updated',
        permissions: ['Post to channels', 'Upload files'],
        steps: [
          {
            title: 'Authorize Slack',
            description: 'Grant TrueLeap permission to post to your Slack workspace',
            type: 'oauth' as const,
            permissions: ['Post messages to channels', 'Upload files and attachments'],
          },
          {
            title: 'Choose Channel',
            description: 'Select which Slack channel to post updates to',
            type: 'select' as const,
            options: [
              { label: '#general', value: 'general' },
              { label: '#announcements', value: 'announcements' },
              { label: '#community-updates', value: 'community-updates' },
            ],
          },
          {
            title: 'Automation Rules',
            description: 'Choose what gets posted automatically',
            type: 'checkbox' as const,
            options: [
              { label: 'New events published', value: 'events' },
              { label: 'New courses launched', value: 'courses' },
              { label: 'Weekly community digest', value: 'digest' },
              { label: 'Member milestones', value: 'milestones' },
            ],
          },
        ],
      },
      {
        id: 'two-way-sync',
        icon: '🔄',
        title: 'Two-Way Channel Sync',
        description: 'Bidirectional sync: Messages posted in Slack appear in your community and vice versa. Perfect for communities already active on Slack.',
        bestFor: 'Active Slack communities',
        permissions: ['Read messages', 'Post messages', 'Read members'],
        steps: [
          {
            title: 'Authorize Slack',
            description: 'Grant TrueLeap full channel access',
            type: 'oauth' as const,
            permissions: ['Read and post messages', 'Access channel history', 'Read member list'],
          },
          {
            title: 'Map Channels',
            description: 'Connect Slack channels to community spaces',
            type: 'select' as const,
            options: [
              { label: 'Map #general to General channel', value: 'general' },
              { label: 'Map #random to Off-topic', value: 'random' },
              { label: 'Create new mapping', value: 'custom' },
            ],
          },
          {
            title: 'Sync Settings',
            description: 'Configure how messages are synchronized',
            type: 'checkbox' as const,
            options: [
              { label: 'Show Slack avatars in community', value: 'avatars' },
              { label: 'Sync reactions and emojis', value: 'reactions' },
              { label: 'Include threaded replies', value: 'threads' },
              { label: 'Sync file attachments', value: 'files' },
            ],
          },
        ],
      },
      {
        id: 'bot-commands',
        icon: '🤖',
        title: 'Slack Bot Commands',
        description: 'Control your community directly from Slack using slash commands like /community help, /community members, and /community stats.',
        bestFor: 'Power users & admins',
        permissions: ['Read workspace', 'Post responses'],
        steps: [
          {
            title: 'Install Bot',
            description: 'Add TrueLeap bot to your Slack workspace',
            type: 'oauth' as const,
            permissions: ['Post as bot user', 'Read commands', 'Access workspace info'],
          },
          {
            title: 'Choose Commands',
            description: 'Enable the bot commands you want to use',
            type: 'checkbox' as const,
            options: [
              { label: '/community stats - View analytics', value: 'stats' },
              { label: '/community members - Manage members', value: 'members' },
              { label: '/community post - Create posts', value: 'post' },
              { label: '/community events - Manage events', value: 'events' },
            ],
          },
        ],
      },
    ],
    activity: {
      lastSynced: '2 minutes ago',
      metrics: [
        { label: 'Messages Posted', value: '1,247', trend: 'up' as const },
        { label: 'Active Automations', value: '3' },
        { label: 'Channel', value: '#updates' },
        { label: 'Members Reached', value: '892', trend: 'up' as const },
      ],
      automations: [
        { name: 'Post new events', active: true },
        { name: 'Weekly digest', active: true },
        { name: 'Member milestones', active: false },
      ],
    },
  },
  {
    id: 'zoom',
    name: 'Zoom',
    category: 'Video & Conferencing',
    icon: Video,
    description: 'Video meetings for events',
    longDescription: 'Host live events, workshops, and meetings directly from your community. Automatic recording, registration management, and seamless attendee experience.',
    verified: true,
    popular: true,
    connected: true,
    installs: 8920,
    rating: 4.7,
    features: [
      'Embed Zoom meetings in your community',
      'Automatic attendee registration',
      'Cloud recording with automatic uploads',
      'Breakout room management',
      'Waiting room and security controls',
    ],
    useCases: [
      'Live workshops and training sessions',
      'Virtual community meetups',
      'Office hours and Q&A sessions',
    ],
    permissions: [
      'Create and manage meetings',
      'Access meeting recordings',
      'Manage participants',
      'View meeting reports',
    ],
    setupOptions: [
      {
        id: 'embedded-meetings',
        icon: '🎥',
        title: 'Embedded Event Meetings',
        description: 'Automatically create Zoom meetings for your community events and embed them directly in the event page.',
        bestFor: 'Virtual events and workshops',
        permissions: ['Create meetings', 'Manage participants'],
        steps: [
          {
            title: 'Connect Zoom Account',
            description: 'Authorize TrueLeap to create meetings on your behalf',
            type: 'oauth' as const,
            permissions: ['Create meetings', 'Manage meeting settings', 'View participants'],
          },
          {
            title: 'Default Settings',
            description: 'Configure default meeting settings',
            type: 'checkbox' as const,
            options: [
              { label: 'Enable waiting room', value: 'waiting-room' },
              { label: 'Record automatically', value: 'recording' },
              { label: 'Require registration', value: 'registration' },
              { label: 'Enable chat', value: 'chat' },
            ],
          },
        ],
      },
      {
        id: 'recording-library',
        icon: '📚',
        title: 'Auto-Upload Recordings',
        description: 'Automatically upload Zoom meeting recordings to your community as course content or resources.',
        bestFor: 'Building a content library',
        permissions: ['Access recordings', 'Upload files'],
        steps: [
          {
            title: 'Authorize Recording Access',
            description: 'Allow TrueLeap to access your cloud recordings',
            type: 'oauth' as const,
            permissions: ['Access cloud recordings', 'Download recordings'],
          },
          {
            title: 'Upload Destination',
            description: 'Choose where recordings should be saved',
            type: 'select' as const,
            options: [
              { label: 'Create as course content', value: 'courses' },
              { label: 'Add to resources library', value: 'resources' },
              { label: 'Both locations', value: 'both' },
            ],
          },
        ],
      },
    ],
    activity: {
      lastSynced: '5 minutes ago',
      metrics: [
        { label: 'Meetings Hosted', value: '47' },
        { label: 'Total Attendees', value: '1,234', trend: 'up' as const },
        { label: 'Recordings Saved', value: '42' },
        { label: 'Avg. Duration', value: '45m' },
      ],
      automations: [
        { name: 'Create meetings for events', active: true },
        { name: 'Upload recordings', active: true },
      ],
    },
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    category: 'Video & Conferencing',
    icon: Video,
    description: 'Video calls for members',
    longDescription: 'Integrate Google Meet for seamless video calls with your community members. Create instant meetings or schedule them for events.',
    verified: true,
    popular: true,
    connected: false,
    installs: 9340,
    rating: 4.6,
    features: [
      'Create instant or scheduled meetings',
      'Up to 250 participants per call',
      'Live captions and translations',
      'Recording to Google Drive',
      'Screen sharing and collaboration',
    ],
    useCases: [
      'Virtual office hours',
      'Live Q&A sessions',
      'Community video calls',
    ],
    permissions: [
      'Create and manage meetings',
      'Access Google Calendar',
      'Record meetings to Drive',
    ],
    setupOptions: [],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'Payments & Billing',
    icon: CreditCard,
    description: 'Payment processing',
    longDescription: 'Monetize your community with secure payment processing. Sell courses, memberships, and event tickets with automatic access management.',
    verified: true,
    popular: false,
    connected: true,
    installs: 15230,
    rating: 4.9,
    features: [
      'Accept one-time and recurring payments',
      'Automatic member access management',
      'Subscription billing and invoicing',
      'Support for 135+ currencies',
      'Built-in fraud protection',
    ],
    useCases: [
      'Selling paid courses and memberships',
      'Ticketed events and workshops',
      'Subscription-based communities',
    ],
    permissions: [
      'Process payments',
      'Manage subscriptions',
      'Access customer data',
      'Generate invoices',
    ],
    setupOptions: [
      {
        id: 'course-payments',
        icon: '🎓',
        title: 'Course & Content Sales',
        description: 'Sell individual courses or content bundles with one-time payments. Automatic enrollment upon purchase.',
        bestFor: 'Course creators',
        permissions: ['Process payments', 'Create products'],
        steps: [
          {
            title: 'Connect Stripe',
            description: 'Link your Stripe account to start accepting payments',
            type: 'oauth' as const,
            permissions: ['Process payments', 'Create payment links', 'Manage customers'],
          },
          {
            title: 'Payment Settings',
            description: 'Configure your payment options',
            type: 'checkbox' as const,
            options: [
              { label: 'Enable credit/debit cards', value: 'cards' },
              { label: 'Enable Apple Pay / Google Pay', value: 'wallets' },
              { label: 'Enable buy now, pay later', value: 'bnpl' },
              { label: 'Collect billing address', value: 'billing' },
            ],
          },
        ],
      },
      {
        id: 'memberships',
        icon: '⭐',
        title: 'Membership Subscriptions',
        description: 'Create tiered membership plans with recurring billing. Perfect for communities with premium content.',
        bestFor: 'Subscription communities',
        permissions: ['Manage subscriptions', 'Create pricing plans'],
        steps: [
          {
            title: 'Connect Stripe',
            description: 'Link your Stripe account',
            type: 'oauth' as const,
            permissions: ['Create subscriptions', 'Manage billing', 'Process recurring payments'],
          },
          {
            title: 'Subscription Options',
            description: 'Configure subscription settings',
            type: 'checkbox' as const,
            options: [
              { label: 'Allow monthly billing', value: 'monthly' },
              { label: 'Allow annual billing (with discount)', value: 'annual' },
              { label: 'Enable free trials', value: 'trials' },
              { label: 'Automatic failed payment retries', value: 'retries' },
            ],
          },
        ],
      },
      {
        id: 'event-tickets',
        icon: '🎟️',
        title: 'Event Ticketing',
        description: 'Sell tickets for your events with automatic capacity management and attendee tracking.',
        bestFor: 'Paid events',
        permissions: ['Process payments', 'Generate tickets'],
        steps: [
          {
            title: 'Connect Stripe',
            description: 'Link your Stripe account',
            type: 'oauth' as const,
            permissions: ['Process payments', 'Create checkout sessions'],
          },
          {
            title: 'Ticket Settings',
            description: 'Configure ticketing options',
            type: 'checkbox' as const,
            options: [
              { label: 'Generate QR code tickets', value: 'qr-codes' },
              { label: 'Send confirmation emails', value: 'emails' },
              { label: 'Enable refunds', value: 'refunds' },
              { label: 'Early bird pricing', value: 'early-bird' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'Payments & Billing',
    icon: CreditCard,
    description: 'Online payment solution',
    longDescription: 'Accept payments worldwide with PayPal. Simple integration for selling courses, memberships, and event tickets.',
    verified: true,
    popular: false,
    connected: false,
    installs: 11200,
    rating: 4.5,
    features: [
      'Accept PayPal and credit cards',
      'Buyer and seller protection',
      'Multi-currency support',
      'Quick checkout experience',
      'Mobile-optimized payments',
    ],
    useCases: [
      'International payments',
      'Subscription services',
      'One-time purchases',
    ],
    permissions: [
      'Process payments',
      'Access transaction history',
      'Manage subscriptions',
    ],
    setupOptions: [],
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    category: 'Video & Conferencing',
    icon: Video,
    description: 'Team collaboration',
    longDescription: 'Integrate Microsoft Teams for enterprise-grade video conferencing and team collaboration.',
    verified: true,
    popular: false,
    connected: false,
    installs: 6780,
    rating: 4.4,
    features: [
      'HD video meetings',
      'Team chat and channels',
      'File sharing and collaboration',
      'Integration with Office 365',
      'Enterprise security',
    ],
    useCases: [
      'Enterprise communities',
      'Corporate training',
      'Team collaboration',
    ],
    permissions: [
      'Create and manage meetings',
      'Access team channels',
      'Share files',
    ],
    setupOptions: [],
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    category: 'Marketing & Email',
    icon: Mail,
    description: 'Email marketing platform',
    longDescription: 'Grow your community with email marketing. Sync members, send campaigns, and create automated email sequences.',
    verified: true,
    popular: true,
    connected: false,
    installs: 7650,
    rating: 4.6,
    features: [
      'Sync community members to email lists',
      'Automated welcome email sequences',
      'Campaign performance analytics',
      'A/B testing and optimization',
      'Segmentation and targeting',
    ],
    useCases: [
      'Onboarding new community members',
      'Announcing new courses and events',
      'Re-engaging inactive members',
    ],
    permissions: [
      'Manage email lists',
      'Send campaigns',
      'Access subscriber data',
      'View analytics',
    ],
    setupOptions: [
      {
        id: 'member-sync',
        icon: '👥',
        title: 'Member List Sync',
        description: 'Automatically sync your community members to a Mailchimp audience for easy email marketing.',
        bestFor: 'Email newsletters',
        permissions: ['Manage lists', 'Add subscribers'],
        steps: [
          {
            title: 'Connect Mailchimp',
            description: 'Authorize TrueLeap to manage your email lists',
            type: 'oauth' as const,
            permissions: ['Manage audiences', 'Add/remove subscribers', 'View analytics'],
          },
          {
            title: 'Select Audience',
            description: 'Choose which Mailchimp audience to sync to',
            type: 'select' as const,
            options: [
              { label: 'Create new audience', value: 'new' },
              { label: 'TrueLeap Community Members', value: 'existing-1' },
              { label: 'Newsletter Subscribers', value: 'existing-2' },
            ],
          },
          {
            title: 'Sync Rules',
            description: 'Configure synchronization settings',
            type: 'checkbox' as const,
            options: [
              { label: 'Sync new members automatically', value: 'auto-sync' },
              { label: 'Remove unsubscribed members', value: 'remove' },
              { label: 'Sync member tags and segments', value: 'tags' },
            ],
          },
        ],
      },
      {
        id: 'automated-campaigns',
        icon: '✨',
        title: 'Automated Email Sequences',
        description: 'Trigger personalized email sequences based on member actions like joining, completing a course, or attending an event.',
        bestFor: 'Member engagement',
        permissions: ['Create automations', 'Send emails'],
        steps: [
          {
            title: 'Connect Mailchimp',
            description: 'Authorize automation access',
            type: 'oauth' as const,
            permissions: ['Create automations', 'Send campaigns', 'Access templates'],
          },
          {
            title: 'Choose Triggers',
            description: 'Select which actions trigger emails',
            type: 'checkbox' as const,
            options: [
              { label: 'New member joins', value: 'new-member' },
              { label: 'Course completed', value: 'course-complete' },
              { label: 'Event registration', value: 'event-register' },
              { label: 'Inactive for 30 days', value: 'inactive' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    category: 'Marketing & Email',
    icon: Mail,
    description: 'Transactional emails',
    longDescription: 'Send transactional and marketing emails at scale with SendGrid\'s reliable email delivery service.',
    verified: true,
    popular: false,
    connected: false,
    installs: 5430,
    rating: 4.5,
    features: [
      'High-volume email delivery',
      'Transactional email templates',
      'Real-time analytics',
      'Email validation',
      'Dedicated IP addresses',
    ],
    useCases: [
      'Automated notifications',
      'Transactional emails',
      'High-volume campaigns',
    ],
    permissions: [
      'Send emails',
      'Manage templates',
      'Access analytics',
    ],
    setupOptions: [],
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    category: 'Automation & Productivity',
    icon: Calendar,
    description: 'Calendar sync',
    longDescription: 'Automatically add community events to members\' Google Calendars. Two-way sync ensures everyone stays up to date.',
    verified: true,
    popular: false,
    connected: false,
    installs: 5420,
    rating: 4.5,
    features: [
      'Auto-add events to member calendars',
      'Two-way sync with community calendar',
      'Reminder notifications',
      'Time zone conversion',
      'Calendar sharing',
    ],
    useCases: [
      'Keeping members informed about events',
      'Syncing workshop schedules',
      'Office hours and 1-on-1 bookings',
    ],
    permissions: [
      'Create calendar events',
      'Read calendar data',
      'Send event invitations',
      'Manage event reminders',
    ],
    setupOptions: [
      {
        id: 'event-sync',
        icon: '🔔',
        title: 'Event Calendar Sync',
        description: 'Automatically add all community events to members\' Google Calendars when they RSVP.',
        bestFor: 'Event attendance',
        permissions: ['Create events', 'Send invitations'],
        steps: [
          {
            title: 'Connect Google',
            description: 'Authorize calendar access',
            type: 'oauth' as const,
            permissions: ['Create calendar events', 'Send invitations', 'Set reminders'],
          },
          {
            title: 'Calendar Settings',
            description: 'Configure event settings',
            type: 'checkbox' as const,
            options: [
              { label: 'Add reminder 1 hour before', value: 'reminder-1h' },
              { label: 'Add reminder 1 day before', value: 'reminder-1d' },
              { label: 'Include Zoom link in event', value: 'zoom-link' },
              { label: 'Auto-update on changes', value: 'auto-update' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'Communication',
    icon: Gamepad2,
    description: 'Community chat platform',
    longDescription: 'Bridge your community with Discord. Sync roles, post announcements, and manage members across both platforms.',
    verified: true,
    popular: false,
    connected: false,
    installs: 4230,
    rating: 4.4,
    features: [
      'Sync community roles to Discord',
      'Post announcements to Discord channels',
      'Member verification and access',
      'Bot commands for management',
      'Voice channel integration',
    ],
    useCases: [
      'Gaming and tech communities',
      'Real-time voice discussions',
      'Discord-native audiences',
    ],
    permissions: [
      'Manage Discord server',
      'Assign roles',
      'Post messages',
      'Read member list',
    ],
    setupOptions: [],
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Analytics & Insights',
    icon: BarChart3,
    description: 'Web analytics',
    longDescription: 'Track community engagement with detailed analytics. Understand how members interact with your content and events.',
    verified: true,
    popular: false,
    connected: false,
    installs: 6780,
    rating: 4.7,
    features: [
      'Page view and engagement tracking',
      'Custom event tracking',
      'Conversion funnel analysis',
      'User journey mapping',
      'Real-time reporting',
    ],
    useCases: [
      'Understanding member behavior',
      'Optimizing course completion',
      'Tracking event registrations',
    ],
    permissions: [
      'Send analytics data',
      'Create custom events',
      'Access measurement protocol',
    ],
    setupOptions: [],
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    category: 'Payments & Billing',
    icon: CreditCard,
    description: 'Indian payment gateway',
    longDescription: 'Accept payments in India with Razorpay. Support for UPI, cards, net banking, and wallets.',
    verified: true,
    popular: false,
    connected: false,
    installs: 3240,
    rating: 4.6,
    features: [
      'UPI and wallet payments',
      'Cards and net banking',
      'Instant settlements',
      'Payment links',
      'Subscriptions and recurring billing',
    ],
    useCases: [
      'Indian market payments',
      'Local payment methods',
      'Subscription billing',
    ],
    permissions: [
      'Process payments',
      'Create payment links',
      'Manage subscriptions',
    ],
    setupOptions: [],
  },
  {
    id: 'convertkit',
    name: 'ConvertKit',
    category: 'Marketing & Email',
    icon: Mail,
    description: 'Creator email marketing',
    longDescription: 'Email marketing built for creators. Grow your audience with landing pages, forms, and automated sequences.',
    verified: true,
    popular: false,
    connected: false,
    installs: 4120,
    rating: 4.7,
    features: [
      'Visual automation builder',
      'Landing pages and forms',
      'Subscriber tagging',
      'Broadcast emails',
      'Creator-friendly analytics',
    ],
    useCases: [
      'Creator newsletters',
      'Course launch sequences',
      'Audience building',
    ],
    permissions: [
      'Manage subscribers',
      'Send broadcasts',
      'Create automations',
    ],
    setupOptions: [],
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    category: 'Analytics & Insights',
    icon: BarChart3,
    description: 'Product analytics',
    longDescription: 'Advanced product analytics to understand user behavior and improve engagement in your community.',
    verified: true,
    popular: false,
    connected: false,
    installs: 2890,
    rating: 4.5,
    features: [
      'User behavior tracking',
      'Funnel and retention analysis',
      'Cohort analysis',
      'A/B testing insights',
      'Custom dashboards',
    ],
    useCases: [
      'Product optimization',
      'User retention analysis',
      'Conversion tracking',
    ],
    permissions: [
      'Track user events',
      'Access user profiles',
      'Create custom reports',
    ],
    setupOptions: [],
  },
  {
    id: 'amplitude',
    name: 'Amplitude',
    category: 'Analytics & Insights',
    icon: BarChart3,
    description: 'Digital analytics',
    longDescription: 'Comprehensive digital analytics platform for understanding user journeys and optimizing community engagement.',
    verified: true,
    popular: false,
    connected: false,
    installs: 2340,
    rating: 4.6,
    features: [
      'Behavioral analytics',
      'User journey analysis',
      'Predictive analytics',
      'Experiment tracking',
      'Cross-platform tracking',
    ],
    useCases: [
      'Growth analytics',
      'Engagement optimization',
      'User segmentation',
    ],
    permissions: [
      'Track events',
      'Access user data',
      'Create segments',
    ],
    setupOptions: [],
  },
  {
    id: 'mux',
    name: 'Mux',
    category: 'Video & Conferencing',
    icon: Video,
    description: 'Video infrastructure',
    longDescription: 'Professional video streaming and analytics for your courses and events. High-quality, reliable video delivery.',
    verified: true,
    popular: false,
    connected: false,
    installs: 1890,
    rating: 4.8,
    features: [
      'Adaptive streaming',
      'Video analytics',
      'Live streaming',
      'DRM protection',
      'Global CDN delivery',
    ],
    useCases: [
      'Course video hosting',
      'Live event streaming',
      'Video analytics',
    ],
    permissions: [
      'Upload videos',
      'Create livestreams',
      'Access analytics',
    ],
    setupOptions: [],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Automation & Productivity',
    icon: Zap,
    description: 'Workflow automation',
    longDescription: 'Automate workflows between your community and thousands of other apps. Create custom automations without code.',
    verified: true,
    popular: false,
    connected: false,
    installs: 3890,
    rating: 4.6,
    features: [
      'Connect to 5000+ apps',
      'Multi-step workflows',
      'Conditional logic',
      'Schedule automations',
      'Error handling and retries',
    ],
    useCases: [
      'Custom integration workflows',
      'Data syncing across platforms',
      'Automated notifications',
    ],
    permissions: [
      'Trigger webhooks',
      'Send data to connected apps',
      'Receive webhook data',
    ],
    setupOptions: [],
  },
];

const categories = [
  { id: 'all', name: 'All Integrations', icon: Globe, count: integrationsData.length },
  { id: 'Video & Conferencing', name: 'Video & Conferencing', icon: Video, count: integrationsData.filter(i => i.category === 'Video & Conferencing').length },
  { id: 'Marketing & Email', name: 'Marketing & Email', icon: Mail, count: integrationsData.filter(i => i.category === 'Marketing & Email').length },
  { id: 'Payments & Billing', name: 'Payments & Billing', icon: CreditCard, count: integrationsData.filter(i => i.category === 'Payments & Billing').length },
  { id: 'Analytics & Insights', name: 'Analytics & Insights', icon: BarChart3, count: integrationsData.filter(i => i.category === 'Analytics & Insights').length },
  { id: 'Communication', name: 'Communication', icon: MessageSquare, count: integrationsData.filter(i => i.category === 'Communication').length },
  { id: 'Automation & Productivity', name: 'Automation & Productivity', icon: Zap, count: integrationsData.filter(i => i.category === 'Automation & Productivity').length },
];

const statusOptions = [
  { id: 'all', name: 'All', count: integrationsData.length },
  { id: 'connected', name: 'Connected', count: integrationsData.filter(i => i.connected).length },
  { id: 'popular', name: 'Popular', count: integrationsData.filter(i => i.popular).length },
  { id: 'available', name: 'Available', count: integrationsData.filter(i => !i.connected).length },
  { id: 'recommended', name: 'Recommended for you', count: Math.floor(integrationsData.length * 0.3) },
];

interface IntegrationsLibraryEnhancedProps {
  onBack?: () => void;
}

export function IntegrationsLibraryEnhanced({ onBack }: IntegrationsLibraryEnhancedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIntegration, setSelectedIntegration] = useState<typeof integrationsData[0] | null>(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Secondary filter options
  const secondaryFilters = [
    { id: 'all', name: 'All', count: integrationsData.length },
    { id: 'connected', name: 'Connected', count: integrationsData.filter(i => i.connected).length },
    { id: 'available', name: 'Available', count: integrationsData.filter(i => !i.connected).length },
    { id: 'popular', name: 'Popular', count: integrationsData.filter(i => i.popular).length },
    { id: 'recommended', name: 'Recommended for you', count: Math.floor(integrationsData.length * 0.3) },
  ];

  // Filter integrations
  const filteredIntegrations = integrationsData.filter((integration) => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' ||
                         (selectedStatus === 'connected' && integration.connected) ||
                         (selectedStatus === 'popular' && integration.popular) ||
                         (selectedStatus === 'available' && !integration.connected);
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'connected' && integration.connected) ||
                         (selectedFilter === 'available' && !integration.connected) ||
                         (selectedFilter === 'popular' && integration.popular) ||
                         (selectedFilter === 'recommended' && (integration.popular || !integration.connected));
    
    return matchesSearch && matchesCategory && matchesStatus && matchesFilter;
  });

  const handleConnect = (integrationId: string, setupOptionId: string, config: any) => {
    console.log('Connecting:', integrationId, setupOptionId, config);
    // Update integration state
    const integration = integrationsData.find(i => i.id === integrationId);
    if (integration) {
      integration.connected = true;
      // Add mock activity data
      integration.activity = {
        lastSynced: 'Just now',
        metrics: [
          { label: 'Setup Complete', value: '✓' },
          { label: 'Status', value: 'Active' },
        ],
        automations: [{ name: 'Initial setup', active: true }],
      };
    }
    setSelectedIntegration(null);
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          {/* Title Section */}
          <div className="mb-6">
            <h1 className="text-2xl text-gray-900 mb-2">Integration Library</h1>
            <p className="text-sm text-gray-600">Connect your favorite tools and automate your workflow</p>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap min-w-[140px] justify-between"
              >
                <span>{selectedCategory === 'all' ? 'All integrations' : categories.find(c => c.id === selectedCategory)?.name}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-full mt-1 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setShowStatusDropdown(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className={selectedCategory === cat.id ? 'text-purple-600' : 'text-gray-700'}>
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Category Pills Navigation */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
            {secondaryFilters.map((filter) => {
              const isSelected = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-purple-50 text-purple-600 border border-purple-300'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <span>{filter.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {filter.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content - Full Width */}
      <div className="flex" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Content Area */}
        <ScrollArea className="flex-1">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredIntegrations.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onClick={() => setSelectedIntegration(integration)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Detail Panel */}
      {selectedIntegration && (
        <IntegrationDetailPanel
          integration={selectedIntegration}
          onClose={() => setSelectedIntegration(null)}
          onConnect={handleConnect}
          onDisconnect={(id) => {
            const integration = integrationsData.find(i => i.id === id);
            if (integration) {
              integration.connected = false;
              integration.activity = undefined;
            }
          }}
        />
      )}

      {/* Overlay */}
      {selectedIntegration && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setSelectedIntegration(null)}
        />
      )}
    </div>
  );
}

// Integration Card Component
function IntegrationCard({
  integration,
  onClick,
}: {
  integration: typeof integrationsData[0];
  onClick: () => void;
}) {
  const Icon = integration.icon;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group relative"
    >
      {/* Popular Badge */}
      {integration.popular && (
        <div className="absolute top-3 right-3">
          <Badge className="text-xs bg-orange-100 text-orange-600 border-orange-200">
            Popular
          </Badge>
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
        <Icon className="w-6 h-6 text-gray-700" />
      </div>

      {/* Content */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-1">{integration.name}</h4>
        <p className="text-xs text-gray-600 line-clamp-2">{integration.description}</p>
      </div>

      {/* Action Button */}
      {integration.connected ? (
        <button className="w-full px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
          <Check className="w-3 h-3" />
          Connected
        </button>
      ) : (
        <button className="w-full px-4 py-2 bg-white text-purple-600 border border-purple-200 rounded-lg text-xs font-medium hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
          <Check className="w-3 h-3" />
          Check Details
        </button>
      )}
    </div>
  );
}
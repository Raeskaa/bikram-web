import { LinkToExistingCommunityModal } from './LinkContentModals';
import { InviteModal } from './events/InviteModal';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from './ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Settings as SettingsIcon,
  BarChart3,
  MessageSquare,
  Wand2 as Wand2Icon,
  Eye,
  ArrowLeft,
  Plus,
  Download,
  Filter,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Target,
  TrendingDown,
  Activity,
  Mail,
  Bell,
  UserPlus,
  Network,
  Rocket,
  Brain,
  ChevronRight,
  RefreshCw,
  Edit2,
  Check,
  X,
  Cpu,
  ChevronDown,
  Share2,
  Upload,
  Gauge,
  UserCheck,
  Ticket,
  Edit,
  Trash2,
  Video,
  PieChart,
  Percent,
  Send,
  FileText,
  Link2,
  QrCode,
  Code,
  Copy,
  Sparkles
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Conversation, Message, AppVersion } from '../types';
import { EventBuilderOverviewSection } from './EventBuilderOverviewSection';
import { DiscussionChannelV2 } from './DiscussionChannelV2';
import { PreviewModal } from './PreviewModal';
import { EventAIHub } from './events/EventAIHub';
import { EventSettings, CustomRole } from './events/EventSettings';
import { SpeakersTeamTable } from './events/SpeakersTeamTable';
import { RegistrationFormBuilder } from './events/RegistrationFormBuilder';
import { WaitlistTab, WaitlistConfig } from './events/WaitlistTab';
import { AddAttendeeModal, BulkImportModal } from './events/AttendeeModals';
import { WaitlistConfigModal } from './events/WaitlistConfigModal';
import { QRCodeCanvas } from './events/QRCodeCanvas';
import { ResourcesPanel } from './events/ResourcesPanel';
import { ReviewsManagement } from './events/ReviewsManagement';
import { EventChangeLog, type EventChange } from './events/EventChangeLog';
import { EditConfirmationDialog, createEditWarningConfig, type EditWarningConfig } from './events/EditConfirmationDialog';
import { TicketManager, type TicketTier, type EventPricingMode, derivePricingMode, createFreeAdmissionTier } from './events/TicketManager';
import { EventShell } from './EventShell';
import type { TabIndicator } from './EventShell';
import { toast } from 'sonner@2.0.3';
import { useCopilot } from '../contexts/CopilotContext';
import {
  getEventLifecycleStage,
  getEventCompletionPercent,
  getEventCompletionCount,
  getPostEventCompletionPercent,
  isEventSoldOut,
  isEventCancelled as checkEventCancelled,
  isEventLive as checkEventLive,
  getEventRole,
  getEventWaitlist,
  getSpeakerSessions,
  getEventRegistrations,
  type EventLifecycleStage,
} from '../data/mockEventData';
import { useAuth } from '../contexts/AuthContext';

interface EventBuilderViewProps {
  conversation: Conversation;
  onUpdateMessages: (messages: Message[]) => void;
  eventData: any;
  onBack: () => void;
  appVersion?: AppVersion;
  onVersionChange?: (version: AppVersion) => void;
  userMode?: 'creator' | 'learner';
  onModeChange?: (mode: 'creator' | 'learner') => void;
  onJoinEvent?: (eventTitle: string, eventCode: string) => void;
  onCreateCommunity?: () => void;
  onViewPublicPage?: () => void;
  onUpdateEventData?: (data: any) => void;
}

type AICopilotMode = 'builder' | 'helper' | 'analyst';
type AIPersonality = 'professional' | 'casual' | 'enthusiastic' | 'minimal';

const copilotModes = [
  { id: 'builder' as const, label: 'Builder', icon: Rocket, description: 'Create and edit event details' },
  { id: 'helper' as const, label: 'Helper', icon: MessageSquare, description: 'Ask questions and get guidance' },
  { id: 'analyst' as const, label: 'Analyst', icon: BarChart3, description: 'View insights and analytics' },
];

const aiPersonalities = [
  { id: 'professional' as const, label: 'Professional', description: 'Formal and concise' },
  { id: 'casual' as const, label: 'Casual', description: 'Friendly and relaxed' },
  { id: 'enthusiastic' as const, label: 'Enthusiastic', description: 'Energetic and motivating' },
  { id: 'minimal' as const, label: 'Minimal', description: 'Brief and to-the-point' },
];

interface DiscountCode {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  limit: number;
  used: number;
}

export function EventBuilderViewV2({ 
  conversation,
  onUpdateMessages,
  eventData, 
  onBack,
  appVersion = 'v1',
  onVersionChange,
  userMode = 'creator',
  onModeChange,
  onJoinEvent,
  onCreateCommunity,
  onViewPublicPage,
  onUpdateEventData
}: EventBuilderViewProps) {
  const [scheduleItems, setScheduleItems] = useState(eventData.schedule || []);
  const [attendees, setAttendees] = useState(() => {
    // Load attendees from registrations if available
    if (eventData.id) {
      const registrations = getEventRegistrations(eventData.id);
      return registrations
        .filter((r: any) => r.status === 'confirmed')
        .map((r: any) => ({
          id: r.id,
          name: r.userName,
          email: r.userEmail,
          status: 'confirmed',
          registeredAt: r.registeredAt,
          checkedIn: false,
          ticket: r.ticketTierId || 'General Admission',
        }));
    }
    return eventData.attendees || [];
  });
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [attendeeFilter, setAttendeeFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);

  // Sync to parent
  useEffect(() => {
    if (onUpdateEventData) {
      onUpdateEventData({ schedule: scheduleItems });
    }
  }, [scheduleItems]);

  useEffect(() => {
    if (onUpdateEventData) {
      onUpdateEventData({ attendees });
    }
  }, [attendees]);

  // customRegistrationFields sync moved below its useState declaration

  // Schedule Helpers
  const handleAddSession = () => {
    const newSession = {
      id: Date.now().toString(),
      time: '12:00',
      title: 'New Session',
      description: 'Description',
      duration: 30,
      type: 'session',
      speakers: [],
      room: ''
    };
    setScheduleItems([...scheduleItems, newSession]);
    setEditingSessionId(newSession.id);
  };

  const handleUpdateSession = (id: string, field: string, value: any) => {
    const oldSession = scheduleItems.find(item => item.id === id);
    const oldValue = oldSession?.[field as keyof typeof oldSession];
    
    if (oldValue === value) return; // No change

    const applySessionChange = () => {
      setScheduleItems(items => items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    };

    // Published event — show confirmation dialog for schedule changes
    if (localPublished && !isDraft) {
      const role = getCurrentUserRole();
      const config = createEditWarningConfig(`session_${field}`, oldValue, value, registeredCount);
      config.fieldLabel = `Session ${field.charAt(0).toUpperCase() + field.slice(1)}`;
      config.severity = 'medium';
      config.changedBy = {
        name: currentUser?.name || 'You',
        email: currentUser?.email || 'you@example.com',
        role
      };

      setPendingEdit({
        config,
        onConfirm: (sendNotification: boolean) => {
          applySessionChange();
          const change: EventChange = {
            id: `change-${Date.now()}-${Math.random()}`,
            eventId: eventData.id || 'unknown',
            timestamp: new Date(),
            userId: currentUser?.id || 'current-user',
            userName: currentUser?.name || 'You',
            userEmail: currentUser?.email || 'you@example.com',
            userRole: role,
            changeType: 'schedule_update',
            fieldName: `session.${field}`,
            fieldLabel: `Session ${field.charAt(0).toUpperCase() + field.slice(1)}`,
            oldValue,
            newValue: value,
            notificationSent: sendNotification,
            affectedUsers: sendNotification ? registeredCount : 0,
            details: `Updated ${field} in session "${oldSession?.title || 'Untitled'}"`
          };
          setChangeLog(prev => [change, ...prev]);
          toast.success('Session updated & logged', {
            description: sendNotification ? `${registeredCount} attendees notified.` : 'Change is live on your event page.'
          });
        }
      });
      setShowEditConfirmation(true);
    } else {
      // Draft — apply directly, still log
      applySessionChange();
      const change: EventChange = {
        id: `change-${Date.now()}-${Math.random()}`,
        eventId: eventData.id || 'unknown',
        timestamp: new Date(),
        userId: currentUser?.id || 'current-user',
        userName: currentUser?.name || 'You',
        userEmail: currentUser?.email || 'you@example.com',
        userRole: getCurrentUserRole(),
        changeType: 'schedule_update',
        fieldName: `session.${field}`,
        fieldLabel: `Session ${field}`,
        oldValue,
        newValue: value,
        notificationSent: false,
        affectedUsers: 0,
        details: `Updated ${field} in session`
      };
      setChangeLog(prev => [change, ...prev]);
    }
  };

  const handleDeleteSession = (id: string) => {
    const session = scheduleItems.find(item => item.id === id);
    
    if (localPublished && !isDraft) {
      const role = getCurrentUserRole();
      const config = createEditWarningConfig('schedule_delete', session?.title || 'Session', 'Deleted', registeredCount);
      config.fieldLabel = `Delete Session "${session?.title || 'Untitled'}"`;
      config.severity = 'high';
      config.changedBy = {
        name: currentUser?.name || 'You',
        email: currentUser?.email || 'you@example.com',
        role
      };

      setPendingEdit({
        config,
        onConfirm: (sendNotification: boolean) => {
          setScheduleItems(items => items.filter(item => item.id !== id));
          const change: EventChange = {
            id: `change-${Date.now()}-${Math.random()}`,
            eventId: eventData.id || 'unknown',
            timestamp: new Date(),
            userId: currentUser?.id || 'current-user',
            userName: currentUser?.name || 'You',
            userEmail: currentUser?.email || 'you@example.com',
            userRole: role,
            changeType: 'schedule_update',
            fieldName: 'session_delete',
            fieldLabel: `Session "${session?.title || 'Untitled'}" Deleted`,
            oldValue: session?.title,
            newValue: 'Deleted',
            notificationSent: sendNotification,
            affectedUsers: sendNotification ? registeredCount : 0,
            details: `Removed session "${session?.title || 'Untitled'}" from agenda`
          };
          setChangeLog(prev => [change, ...prev]);
          toast.success('Session deleted & logged');
        }
      });
      setShowEditConfirmation(true);
    } else {
      if (confirm('Delete this session?')) {
        setScheduleItems(items => items.filter(item => item.id !== id));
      }
    }
  };

  const handleMoveSession = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === scheduleItems.length - 1) return;
    const newItems = [...scheduleItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setScheduleItems(newItems);
  };

  // AI Suggestion Handlers
  const handleGenerateAgenda = () => {
    const generatedSessions = [
      { id: `gen-${Date.now()}-1`, time: '09:00', title: 'Welcome & Opening Remarks', description: 'Kick off the event with an overview of the agenda and objectives.', duration: 15, type: 'session', speakers: [], room: 'Main Stage' },
      { id: `gen-${Date.now()}-2`, time: '09:15', title: 'Keynote: Setting the Vision', description: 'An inspiring keynote that frames the day\'s themes.', duration: 45, type: 'keynote', speakers: [], room: 'Main Stage' },
      { id: `gen-${Date.now()}-3`, time: '10:00', title: 'Coffee & Networking Break', description: 'Time to connect with fellow attendees.', duration: 30, type: 'break', speakers: [], room: '' },
      { id: `gen-${Date.now()}-4`, time: '10:30', title: 'Panel Discussion', description: 'Industry experts share insights and answer audience questions.', duration: 60, type: 'panel', speakers: [], room: 'Main Stage' },
      { id: `gen-${Date.now()}-5`, time: '11:30', title: 'Interactive Workshop', description: 'Hands-on session where attendees apply what they\'ve learned.', duration: 90, type: 'workshop', speakers: [], room: 'Workshop Room' },
    ];
    setScheduleItems(generatedSessions);
    toast.success('Agenda generated! You can edit each session in the Schedule tab.');
    setMainView('schedule');
  };

  const handleGenerateMoreSessions = () => {
    const additionalSessions = [
      { id: `gen-${Date.now()}-a`, time: '13:00', title: 'Lightning Talks', description: 'Quick 5-minute presentations from community members.', duration: 30, type: 'session', speakers: [], room: 'Main Stage' },
      { id: `gen-${Date.now()}-b`, time: '13:30', title: 'Breakout Session: Deep Dive', description: 'Smaller group discussion on a focused topic.', duration: 45, type: 'workshop', speakers: [], room: 'Breakout Room A' },
      { id: `gen-${Date.now()}-c`, time: '14:15', title: 'Closing & Wrap-up', description: 'Key takeaways and next steps.', duration: 15, type: 'session', speakers: [], room: 'Main Stage' },
    ].slice(0, Math.max(0, 4 - scheduleItems.length));
    setScheduleItems([...scheduleItems, ...additionalSessions]);
    toast.success(`${additionalSessions.length} session${additionalSessions.length !== 1 ? 's' : ''} added to your agenda.`);
  };

  const handleAIAddSpeaker = () => {
    setAttendeesSubTab('speakers');
    setMainView('attendees');
    toast.success('Add your first speaker from the Speakers & Team tab.');
  };

  const handleAddVIPTier = () => {
    setMainView('tickets');
    toast.success('Set up a VIP ticket tier in the Tickets tab.');
  };

  // Attendee Helpers
  const handleAddAttendee = () => {
    setShowAddAttendeeModal(true);
  };

  const handleWaitlistApprove = (entryId: string) => {
    const entry = waitlistEntries.find((w: any) => w.id === entryId);
    if (!entry) return;
    // Move to attendees as confirmed
    const newAttendee = {
      id: Date.now().toString(),
      name: entry.userName,
      email: entry.userEmail,
      status: 'confirmed',
      ticket: 'General Admission',
      checkedIn: false,
      registeredAt: new Date().toISOString().split('T')[0],
    };
    setAttendees([newAttendee, ...attendees]);
    setWaitlistEntries((prev: any[]) => prev.filter((w: any) => w.id !== entryId));
    toast.success(`${entry.userName} approved from waitlist`, { description: 'Confirmation email sent.' });
  };

  const handleBulkWaitlistApprove = () => {
    const confirmedCount = attendees.filter((a: any) => a.status === 'confirmed').length;
    const capacity = parseInt(eventCapacity) || 100;
    const availableSpots = Math.max(0, capacity - confirmedCount);

    if (availableSpots === 0) {
      toast.error('No open spots available', {
        description: 'Increase capacity or remove attendees before bulk approving from the waitlist.'
      });
      return;
    }

    const entriesToApprove = waitlistEntries.slice(0, availableSpots);
    if (entriesToApprove.length === 0) {
      toast.error('No waitlist entries to approve');
      return;
    }

    const approvedAttendees = entriesToApprove.map((entry: any, index: number) => ({
      id: `${Date.now()}-${index}`,
      name: entry.userName,
      email: entry.userEmail,
      status: 'confirmed',
      ticket: 'General Admission',
      checkedIn: false,
      registeredAt: new Date().toISOString().split('T')[0],
    }));

    const approvedIds = new Set(entriesToApprove.map((entry: any) => entry.id));
    setAttendees(prev => [...approvedAttendees, ...prev]);
    setWaitlistEntries(prev => prev.filter((entry: any) => !approvedIds.has(entry.id)));

    toast.success(
      `${entriesToApprove.length} waitlist ${entriesToApprove.length === 1 ? 'entry approved' : 'entries approved'}`,
      {
        description: availableSpots < waitlistEntries.length
          ? `${waitlistEntries.length - entriesToApprove.length} people remain on the waitlist.`
          : 'Confirmation emails sent.'
      }
    );
  };

  const handleWaitlistReject = (entryId: string) => {
    const entry = waitlistEntries.find((w: any) => w.id === entryId);
    if (!entry) return;
    setWaitlistEntries((prev: any[]) => prev.filter((w: any) => w.id !== entryId));
    toast.success(`${entry.userName} removed from waitlist`);
  };

  // Waitlist Configuration Handlers
  const handleConfigureWaitlist = (config: WaitlistConfig) => {
    setWaitlistConfig(config);
    if (config.enabled) {
      toast.success('Waitlist enabled', { 
        description: config.hasLimit 
          ? `Accepting up to ${config.limit} waitlist registrations.`
          : 'Accepting unlimited waitlist registrations.'
      });
    }
  };

  const handleLockEvent = () => {
    setWaitlistConfig({
      enabled: false,
      mode: 'use-existing',
      ticketIds: [],
      hasLimit: false,
      limit: 0,
      isManuallyLocked: true,
    });
    toast.success('Registrations locked', { description: 'No new registrations will be accepted.' });
  };

  const handleToggleWaitlistLock = () => {
    if (!waitlistConfig) return;
    setWaitlistConfig({
      ...waitlistConfig,
      isManuallyLocked: !waitlistConfig.isManuallyLocked,
    });
  };

  const handleOpenWaitlistConfig = () => {
    setShowWaitlistConfigModal(true);
  };

  const handleUpdateAttendeeStatus = (id: string, newStatus: 'confirmed' | 'rejected') => {
    setAttendees(items => items.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    if (selectedApplication === id) setSelectedApplication(null);
  };

  const filteredAttendees = attendees.filter(a => {
    if (attendeeFilter === 'all') return true;
    if (attendeeFilter === 'pending') return a.status === 'pending' || a.status === 'waitlist';
    if (attendeeFilter === 'approved') return a.status === 'confirmed';
    if (attendeeFilter === 'rejected') return a.status === 'rejected';
    return true;
  });

  const handleExportAttendees = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,Email,Status,Ticket,Checked In"].join(",") + "\n"
      + attendees.map(a => `${a.name},${a.email},${a.status},${a.ticket},${a.checkedIn ? 'Yes' : 'No'}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [mainView, setMainView] = useState('overview');
  const [attendeesSubTab, setAttendeesSubTab] = useState<'attendees' | 'waitlist' | 'speakers' | 'form'>('attendees');
  // Add Attendee Modal State
  const [showAddAttendeeModal, setShowAddAttendeeModal] = useState(false);
  // Bulk Import State
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  // Waitlist management state
  const [waitlistEntries, setWaitlistEntries] = useState(() => {
    const wl = eventData.id ? getEventWaitlist(eventData.id) : [];
    return wl.map((w: any, i: number) => ({ ...w, position: i + 1 }));
  });
  const [waitlistConfig, setWaitlistConfig] = useState<WaitlistConfig | null>(null);
  const [showWaitlistConfigModal, setShowWaitlistConfigModal] = useState(false);
  const [showCapacityReachedNotification, setShowCapacityReachedNotification] = useState(false);
  const [hasCheckedCapacity, setHasCheckedCapacity] = useState(false);
  const [settingsInitialTab, setSettingsInitialTab] = useState<string>('general');
  const [customRoles, setCustomRoles] = useState<CustomRole[]>([]);

  const { currentUser } = useAuth();

  const [aiMode, setAiMode] = useState<AICopilotMode>('builder');
  const [aiPersonality, setAiPersonality] = useState<AIPersonality>('enthusiastic');
  const [aiAutoPilot, setAiAutoPilot] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [healthScore, setHealthScore] = useState(eventData.status === 'draft' ? 0 : 85);
  const [registrationRate, setRegistrationRate] = useState(eventData.status === 'draft' ? 0 : 68);
  const [attendancePredict, setAttendancePredict] = useState(eventData.status === 'draft' ? 0 : 92);
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showLinkToCommunityModal, setShowLinkToCommunityModal] = useState(false);
  
  // Ticket Editing State
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
  } | null>(null);

  // Discount Code State
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(eventData.discountCodes || [
    { id: '1', code: 'EARLYBIRD', type: 'percent', value: 20, limit: 50, used: 12 },
    { id: '2', code: 'SPEAKER', type: 'fixed', value: 100, limit: 10, used: 3 }
  ]);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState<DiscountCode | null>(null);

  // Email Automation State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState<{name: string, email: string} | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Registration Config State
  const [showRegistrationConfigDialog, setShowRegistrationConfigDialog] = useState(false);
  const [regVisibility, setRegVisibility] = useState<'public' | 'private'>(eventData.visibility || 'public');
  const [regAccessType, setRegAccessType] = useState<'open' | 'waitlist' | 'screened'>(eventData.accessType || 'open');
  const [regIsPaid, setRegIsPaid] = useState(eventData.isPaid || false);
  const [regPrice, setRegPrice] = useState(eventData.price?.toString() || '');
  const hasRegistrationConfig = regVisibility !== 'public' || regAccessType !== 'open' || regIsPaid;

  // Publish / Unpublish State
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [showUnpublishDialog, setShowUnpublishDialog] = useState(false);
  // Invite Modal State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [publishStep, setPublishStep] = useState<'review' | 'confirm'>('review');
  const [scheduledPublishDate, setScheduledPublishDate] = useState('');
  const [scheduledPublishTime, setScheduledPublishTime] = useState('');
  const [localPublished, setLocalPublished] = useState(
    eventData.status === 'published' || eventData.lifecycleStage === 'published' || eventData.lifecycleStage === 'live' || eventData.lifecycleStage === 'ended' || eventData.status === 'active' || eventData.status === 'live'
  );
  const [localScheduledFor, setLocalScheduledFor] = useState<string | null>(null);

  // Edit Confirmation Dialog State
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  const [pendingEdit, setPendingEdit] = useState<{
    config: EditWarningConfig;
    onConfirm: (sendNotification: boolean) => void;
  } | null>(null);

  // Change Log State
  const [changeLog, setChangeLog] = useState<EventChange[]>([]);

  // Initialize mock change log data when event becomes published (for demo)
  useEffect(() => {
    if (localPublished && changeLog.length === 0) {
      const mockChanges: EventChange[] = [
        {
          id: 'change-demo-1',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          userId: 'user-jost',
          userName: 'Jost Rivera',
          userEmail: 'jost.rivera@leapspace.ai',
          userRole: 'co-host',
          changeType: 'field_edit',
          fieldName: 'ticket_price',
          fieldLabel: 'Ticket Price (VIP)',
          oldValue: '$149',
          newValue: '$129',
          notificationSent: false,
          affectedUsers: 0,
          details: 'Reduced VIP ticket price to increase sales before deadline'
        },
        {
          id: 'change-demo-2',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          userId: 'user-sarah',
          userName: 'Sarah Chen',
          userEmail: 'sarah.chen@example.com',
          userRole: 'moderator',
          changeType: 'field_edit',
          fieldName: 'startTime',
          fieldLabel: 'Start Time',
          oldValue: '14:00',
          newValue: '15:00',
          notificationSent: true,
          affectedUsers: 45,
          details: 'Start time changed from 14:00 to 15:00 — attendees notified'
        },
        {
          id: 'change-demo-3',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          userId: 'user-dan',
          userName: 'Dan Abramov',
          userEmail: 'dan@example.com',
          userRole: 'speaker',
          changeType: 'schedule_update',
          fieldName: 'session.title',
          fieldLabel: 'Session Title',
          oldValue: 'React Patterns',
          newValue: 'Advanced React Patterns & Hooks',
          notificationSent: false,
          affectedUsers: 0,
          details: 'Speaker updated their session title'
        },
        {
          id: 'change-demo-4',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          userId: currentUser?.id || 'current-user',
          userName: currentUser?.name || 'You',
          userEmail: currentUser?.email || 'you@example.com',
          userRole: 'host',
          changeType: 'field_edit',
          fieldName: 'location',
          fieldLabel: 'Location',
          oldValue: 'Virtual Event',
          newValue: 'Downtown Conference Center, Hall A',
          notificationSent: true,
          affectedUsers: 45,
          details: 'Location changed from Virtual to In-Person'
        },
        {
          id: 'change-demo-5',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          userId: 'user-jost',
          userName: 'Jost Rivera',
          userEmail: 'jost.rivera@leapspace.ai',
          userRole: 'co-host',
          changeType: 'field_edit',
          fieldName: 'description',
          fieldLabel: 'Description',
          oldValue: 'Learn about React 18 features...',
          newValue: 'Hands-on workshop exploring React 18 concurrent rendering, Suspense, and Server Components...',
          notificationSent: false,
          affectedUsers: 0,
          details: 'Co-host expanded the event description with more detail'
        },
        {
          id: 'change-demo-6',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          userId: 'user-sarah',
          userName: 'Sarah Chen',
          userEmail: 'sarah.chen@example.com',
          userRole: 'moderator',
          changeType: 'field_edit',
          fieldName: 'capacity',
          fieldLabel: 'Event Capacity',
          oldValue: '100',
          newValue: '150',
          notificationSent: false,
          affectedUsers: 0,
          details: 'Moderator increased capacity to accommodate waitlisted attendees'
        },
        {
          id: 'change-demo-7',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          userId: currentUser?.id || 'current-user',
          userName: currentUser?.name || 'You',
          userEmail: currentUser?.email || 'you@example.com',
          userRole: 'host',
          changeType: 'schedule_update',
          fieldName: 'schedule',
          fieldLabel: 'Schedule',
          details: 'Added 2 new sessions to the agenda',
          notificationSent: false,
          affectedUsers: 0
        },
        {
          id: 'change-demo-8',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
          userId: 'user-dan',
          userName: 'Dan Abramov',
          userEmail: 'dan@example.com',
          userRole: 'speaker',
          changeType: 'schedule_update',
          fieldName: 'session.description',
          fieldLabel: 'Session Description',
          oldValue: 'TBD',
          newValue: 'Deep dive into React Server Components architecture and migration strategies',
          notificationSent: false,
          affectedUsers: 0,
          details: 'Speaker added description for their upcoming session'
        },
        {
          id: 'change-demo-9',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          userId: currentUser?.id || 'current-user',
          userName: currentUser?.name || 'You',
          userEmail: currentUser?.email || 'you@example.com',
          userRole: 'host',
          changeType: 'publish',
          details: 'Event was published and is now live',
          notificationSent: false,
          affectedUsers: 0
        },
        {
          id: 'change-demo-10',
          eventId: eventData.id || 'unknown',
          timestamp: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000),
          userId: 'user-sarah',
          userName: 'Sarah Chen',
          userEmail: 'sarah.chen@example.com',
          userRole: 'moderator',
          changeType: 'attendee_action',
          fieldName: 'attendee_approved',
          fieldLabel: 'Attendee Approved',
          details: 'Approved 12 screened applications from waitlist',
          notificationSent: true,
          affectedUsers: 12
        }
      ];
      setChangeLog(mockChanges);
    }
  }, [localPublished, changeLog.length]);

  const handlePublishNow = () => {
    // Lock pricing mode at publish time
    const resolvedMode = tickets.length === 0 ? 'free' : derivePricingMode(tickets);
    setPricingMode(resolvedMode);
    setPricingModeLocked(true);
    
    // Auto-create free admission tier if publishing as free with no tickets
    if (tickets.length === 0) {
      const freeTier = createFreeAdmissionTier(parseInt(eventCapacity) || 100);
      setTickets([freeTier]);
    }
    
    setLocalPublished(true);
    setLocalScheduledFor(null);
    setShowPublishDialog(false);
    if (onUpdateEventData) {
      onUpdateEventData({ status: 'published', lifecycleStage: 'published', pricingMode: resolvedMode, pricingModeLocked: true });
    }
    
    // Add publish event to change log
    const publishChange: EventChange = {
      id: `change-${Date.now()}`,
      eventId: eventData.id || 'unknown',
      timestamp: new Date(),
      userId: currentUser?.id || 'current-user',
      userName: currentUser?.name || 'You',
      userEmail: currentUser?.email || 'you@example.com',
      userRole: getCurrentUserRole(),
      changeType: 'publish',
      details: 'Event was published and is now live',
      notificationSent: false,
      affectedUsers: 0
    };
    setChangeLog(prev => [publishChange, ...prev]);
    
    toast.success('Event published successfully!', { description: 'Your event is now live and visible on the explore page.' });
  };

  const handleSchedulePublish = () => {
    if (!scheduledPublishDate) {
      toast.error('Please select a date for scheduled publishing.');
      return;
    }
    const displayDate = new Date(scheduledPublishDate + 'T' + (scheduledPublishTime || '09:00')).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
    setLocalScheduledFor(displayDate);
    setShowPublishDialog(false);
    setShowSchedulePicker(false);
    toast.success(`Event scheduled for ${displayDate}`, { description: 'It will be published automatically at the scheduled time.' });
  };

  const handleUnpublish = () => {
    // Log unpublish to changelog
    const unpublishChange: EventChange = {
      id: `change-${Date.now()}`,
      eventId: eventData.id || 'unknown',
      timestamp: new Date(),
      userId: currentUser?.id || 'current-user',
      userName: currentUser?.name || 'You',
      userEmail: currentUser?.email || 'you@example.com',
      userRole: getCurrentUserRole(),
      changeType: 'unpublish',
      details: 'Event was unpublished and moved back to draft',
      notificationSent: false,
      affectedUsers: 0
    };
    setChangeLog(prev => [unpublishChange, ...prev]);

    setLocalPublished(false);
    setLocalScheduledFor(null);
    setShowUnpublishDialog(false);
    if (onUpdateEventData) {
      onUpdateEventData({ status: 'draft', lifecycleStage: 'ready' });
    }
    toast.success('Event unpublished', { description: 'Your event has been moved back to draft.' });
  };

  const handleEditTicket = (ticket: any) => {
    setCurrentTicket({ ...ticket });
    setIsTicketModalOpen(true);
  };

  const handleAddTicket = () => {
    setCurrentTicket({
      id: Date.now().toString(),
      name: '',
      price: 0,
      quantity: 100,
      description: ''
    });
    setIsTicketModalOpen(true);
  };

  const handleSaveTicket = () => {
    if (!currentTicket) return;
    
    const existingIndex = tickets.findIndex(t => t.id === currentTicket.id);
    const isUpdate = existingIndex >= 0;
    const oldTicket = isUpdate ? tickets[existingIndex] : null;

    const applyTicketChange = () => {
      if (isUpdate) {
        const updatedTickets = [...tickets];
        updatedTickets[existingIndex] = currentTicket;
        setTickets(updatedTickets);
      } else {
        setTickets([...tickets, currentTicket]);
      }
      setIsTicketModalOpen(false);
      setCurrentTicket(null);
    };

    // Published event — confirm ticket changes
    if (localPublished && !isDraft) {
      const role = getCurrentUserRole();
      const fieldLabel = isUpdate ? `Ticket "${currentTicket.name}"` : `New Ticket "${currentTicket.name}"`;
      const oldVal = isUpdate ? `$${oldTicket?.price} / ${oldTicket?.quantity} qty` : 'None';
      const newVal = `$${currentTicket.price} / ${currentTicket.quantity} qty`;
      const config = createEditWarningConfig('ticket_price', oldVal, newVal, registeredCount);
      config.fieldLabel = fieldLabel;
      config.changedBy = {
        name: currentUser?.name || 'You',
        email: currentUser?.email || 'you@example.com',
        role
      };

      setPendingEdit({
        config,
        onConfirm: (sendNotification: boolean) => {
          applyTicketChange();
          logFieldChange('ticket', fieldLabel, oldVal, newVal, sendNotification, role);
          toast.success(isUpdate ? 'Ticket updated & logged' : 'Ticket added & logged');
        }
      });
      setShowEditConfirmation(true);
    } else {
      applyTicketChange();
      if (isUpdate) {
        logFieldChange('ticket', `Ticket "${currentTicket.name}"`, `$${oldTicket?.price}`, `$${currentTicket.price}`, false);
      }
    }
  };

  const handleEditDiscount = (discount: DiscountCode) => {
    setCurrentDiscount({ ...discount });
    setIsDiscountModalOpen(true);
  };

  const handleAddDiscount = () => {
    setCurrentDiscount({
      id: Date.now().toString(),
      code: '',
      type: 'percent',
      value: 10,
      limit: 100,
      used: 0
    });
    setIsDiscountModalOpen(true);
  };

  const handleSaveDiscount = () => {
    if (!currentDiscount) return;
    
    // Check if updating existing or adding new
    const existingIndex = discountCodes.findIndex(d => d.id === currentDiscount.id);
    if (existingIndex >= 0) {
      const updatedDiscounts = [...discountCodes];
      updatedDiscounts[existingIndex] = currentDiscount;
      setDiscountCodes(updatedDiscounts);
    } else {
      setDiscountCodes([...discountCodes, currentDiscount]);
    }
    setIsDiscountModalOpen(false);
    setCurrentDiscount(null);
  };

  const handleOpenEmailModal = (recipient: {name: string, email: string} | null) => {
    setEmailRecipient(recipient);
    setEmailSubject(eventData.title ? `Update regarding ${eventData.title}` : 'Event Update');
    setEmailBody(`Hi ${recipient ? recipient.name : 'there'},\n\nWe wanted to let you know that...`);
    setIsEmailModalOpen(true);
  };

  const handleSendEmail = () => {
    // Here we would connect to the actual email service via Supabase Edge Functions
    // For now, we simulate the delay and success
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Sending email via Leapy Mail Service...',
        success: 'Email sent successfully!',
        error: 'Failed to send email',
      }
    );
    setIsEmailModalOpen(false);
  };

  const [eventDescription, setEventDescription] = useState(eventData.description || '');
  const [eventLocation, setEventLocation] = useState(eventData.location || '');
  const [eventCapacity, setEventCapacity] = useState(eventData.capacity ? String(eventData.capacity) : '');
  const [tickets, setTickets] = useState<TicketTier[]>(() => {
    const raw = eventData.tickets || [];
    // Migrate legacy ticket shape to TicketTier
    return raw.map((t: any, i: number) => ({
      id: t.id || Date.now().toString() + i,
      name: t.name || 'General Admission',
      type: (t.type as 'free' | 'paid') || (t.price > 0 ? 'paid' : 'free'),
      price: t.price || 0,
      quantity: t.quantity || 100,
      sold: t.sold || 0,
      description: t.description || '',
      status: t.status || 'active',
      visibility: t.visibility || 'public',
      salesStart: t.salesStart,
      salesEnd: t.salesEnd,
      maxPerOrder: t.maxPerOrder || 10,
      minPerOrder: t.minPerOrder || 1,
      sortOrder: t.sortOrder ?? i,
    }));
  });
  const [pricingMode, setPricingMode] = useState<EventPricingMode>(
    eventData.pricingMode || derivePricingMode(eventData.tickets || [])
  );
  const [pricingModeLocked, setPricingModeLocked] = useState<boolean>(
    eventData.pricingModeLocked || eventData.status === 'published' || eventData.lifecycleStage === 'published' || eventData.lifecycleStage === 'live'
  );
  const [hasCoverImage, setHasCoverImage] = useState(false);
  const [hasRegistrationForm, setHasRegistrationForm] = useState(false);
  const [customRegistrationFields, setCustomRegistrationFields] = useState<any[]>([]);
  useEffect(() => {
    if (onUpdateEventData && customRegistrationFields.length > 0) {
      onUpdateEventData({ customRegistrationFields });
    }
  }, [customRegistrationFields]);
  const [triggerCoverUpload, setTriggerCoverUpload] = useState(false);
  const [showQRCodeDialog, setShowQRCodeDialog] = useState(false);
  const overviewRef = useRef<HTMLDivElement>(null);

  // ── Live completion checklist (computed from actual state, not static) ──
  const liveChecklist = {
    hasTitle: !!(eventData.title),
    hasDescription: !!eventDescription,
    hasDateTime: !!(eventData.date && eventData.time),
    hasCoverImage,
    hasAgenda: scheduleItems.length > 0,
    hasSpeakers: !!(eventData.speakers && eventData.speakers.length > 0),
    hasTickets: tickets.length > 0,
    hasRegistrationConfig,
    hasRegistrationForm,
    hasLocation: !!eventLocation,
  };
  const liveChecklistItems = Object.values(liveChecklist);
  const liveCompletionDone = liveChecklistItems.filter(Boolean).length;
  const liveCompletionTotal = liveChecklistItems.length;
  const liveCompletionPercent = Math.round((liveCompletionDone / liveCompletionTotal) * 100);

  // Derived lifecycle from live checklist
  // Only the 3 core fields (title, description, date/time) are required to publish;
  // the rest are optional enhancements shown as suggestions in the checklist.
  const coreRequirementsMet = liveChecklist.hasTitle && liveChecklist.hasDescription && liveChecklist.hasDateTime;
  const derivedLifecycle = liveCompletionDone <= 2 ? 'skeleton' : coreRequirementsMet ? 'ready' : 'building';

  // ── Phase 2: Lifecycle & role detection (MOCK_EVENTS_MASTER_PLAN.md §Phase 4) ──
  // Use live-computed lifecycle for new drafts, otherwise use stored lifecycle
  const rawLifecycle = getEventLifecycleStage(eventData);
  const isNewDraft = eventData.status === 'draft' || (!eventData.id && rawLifecycle === 'published');
  const lifecycle = isNewDraft ? derivedLifecycle : rawLifecycle;
  const isSkeleton = lifecycle === 'skeleton';
  const isBuilding = lifecycle === 'building';
  const isReady = lifecycle === 'ready';
  const isLive = !isNewDraft && checkEventLive(eventData);
  const isEnded = lifecycle === 'ended';
  const isCancelled = !isNewDraft && checkEventCancelled(eventData);
  const isSoldOut = !isNewDraft && isEventSoldOut(eventData);
  const isDraft = isSkeleton || isBuilding || isReady;
  const userRole = currentUser ? getEventRole(eventData, currentUser.email) : 'learner';
  const isSpeakerView = userRole === 'speaker';
  // Use live counts for drafts, stored counts for existing events
  const completionCount = isNewDraft ? { done: liveCompletionDone, total: liveCompletionTotal } : getEventCompletionCount(eventData);
  const completionPercent = isNewDraft ? liveCompletionPercent : getEventCompletionPercent(eventData);
  const eventWaitlist = eventData.id ? getEventWaitlist(eventData.id) : [];

  // Tab indicators based on lifecycle & completion
  const tabIndicators: Record<string, TabIndicator> = {};
  if (isDraft) {
    const cl = liveChecklist;
    tabIndicators['overview'] = cl.hasTitle && cl.hasDescription ? 'complete' : 'partial';
    tabIndicators['schedule'] = cl.hasAgenda ? 'complete' : 'empty';
    tabIndicators['attendees'] = eventData.attendeeCount > 0 ? 'complete' : 'empty';
    tabIndicators['tickets'] = cl.hasTickets ? 'complete' : (derivePricingMode(tickets) === 'paid' ? 'warning' : 'empty');
    tabIndicators['resources'] = 'empty';
    tabIndicators['discussion'] = 'empty';
    tabIndicators['analytics'] = 'empty';
    tabIndicators['settings'] = cl.hasLocation ? 'complete' : 'warning';
  }

  // Sync tickets + pricing to eventData for persistence across views
  useEffect(() => {
    if (eventData) {
      eventData.tickets = tickets;
      eventData.discountCodes = discountCodes;
      eventData.pricingMode = pricingMode;
      eventData.pricingModeLocked = pricingModeLocked;
      // Keep regIsPaid in sync with ticket pricing
      if (!pricingModeLocked) {
        const derived = derivePricingMode(tickets);
        eventData.isPaid = derived === 'paid';
      }
    }
  }, [tickets, discountCodes, eventData, pricingMode, pricingModeLocked]);

  // Sync event context to CopilotPanel via CopilotContext
  const { setEventContext, setCurrentFocus } = useCopilot();
  useEffect(() => {
    setEventContext({
      lifecycleStage: lifecycle as any,
      eventTitle: eventData.title || 'Untitled Event',
      eventId: eventData.id,
      currentView: mainView,
      completionDone: completionCount.done,
      completionTotal: completionCount.total,
      registrationCount: eventData.attendeeCount || 0,
      capacity: eventData.capacity || 100,
      waitlistCount: eventWaitlist.length,
      isPaid: !!eventData.isPaid,
      price: eventData.price,
      hasAgenda: liveChecklist.hasAgenda,
      hasSpeakers: liveChecklist.hasSpeakers,
      hasCoverImage: liveChecklist.hasCoverImage,
      hasRegistrationForm: liveChecklist.hasRegistrationForm,
      hasRegistrationConfig: liveChecklist.hasRegistrationConfig,
      hasTickets: liveChecklist.hasTickets,
      sessionCount: eventData.schedule?.length || 0,
      totalDuration: eventData.schedule?.reduce((sum: number, s: any) => sum + (s.duration || 0), 0) || 0,
      attendeeCount: eventData.attendeeCount,
      liveViewers: eventData.liveAttendeeCount,
      unansweredQuestions: 8,
    });
    return () => setEventContext(undefined);
  }, [lifecycle, eventData, completionCount, liveChecklist, eventWaitlist, mainView]);

  // Set current focus when on Schedule tab
  useEffect(() => {
    if (mainView === 'schedule') {
      setCurrentFocus({
        type: 'section',
        name: 'Schedule',
        value: `${scheduleItems.length} items`
      });
    } else {
      setCurrentFocus(undefined);
    }
  }, [mainView, scheduleItems.length]);

  // Listen for Leapy events (schedule items, speaker assignments, descriptions)
  useEffect(() => {
    const handleAddSchedule = (event: any) => {
      const items = event.detail;
      if (!items || items.length === 0) return;

      // Convert Leapy schedule format to EventBuilder format
      const newScheduleItems = items.map((item: any) => ({
        id: `gen-${Date.now()}-${Math.random()}`,
        time: item.time,
        title: item.title,
        description: '',
        duration: parseInt(item.duration) || 30,
        type: 'session',
        speakers: [],
        room: 'Main Stage'
      }));

      setScheduleItems(newScheduleItems);
    };

    const handleAssignSpeakers = (event: any) => {
      const assignments = event.detail;
      if (!assignments) return;

      setScheduleItems(prev => 
        prev.map(item => ({
          ...item,
          speakers: assignments[item.title] ? [assignments[item.title]] : item.speakers
        }))
      );
    };

    const handleAddDescriptions = (event: any) => {
      const descriptions = event.detail;
      if (!descriptions) return;

      setScheduleItems(prev =>
        prev.map(item => ({
          ...item,
          description: descriptions[item.title] || item.description
        }))
      );
    };

    window.addEventListener('leapy-add-schedule', handleAddSchedule);
    window.addEventListener('leapy-assign-speakers', handleAssignSpeakers);
    window.addEventListener('leapy-add-descriptions', handleAddDescriptions);

    return () => {
      window.removeEventListener('leapy-add-schedule', handleAddSchedule);
      window.removeEventListener('leapy-assign-speakers', handleAssignSpeakers);
      window.removeEventListener('leapy-add-descriptions', handleAddDescriptions);
    };
  }, []);

  // Check if capacity is reached
  useEffect(() => {
    const confirmedCount = attendees.filter((a: any) => a.status === 'confirmed').length;
    const capacity = parseInt(eventCapacity) || 100;
    const isAtCapacity = confirmedCount >= capacity;

    // Only trigger once when capacity is first reached
    if (isAtCapacity && !hasCheckedCapacity && !waitlistConfig?.enabled && localPublished) {
      setShowCapacityReachedNotification(true);
      setShowWaitlistConfigModal(true);
      setHasCheckedCapacity(true);
    }
  }, [attendees, eventCapacity, hasCheckedCapacity, waitlistConfig, localPublished]);

  const [aiThinking, setAiThinking] = useState(false);

  const [aiImpactStats, setAiImpactStats] = useState({
    timeSaved: 8.5,
    actionsCompleted: 28,
    emailsSent: 156,
    registrations: attendees.length,
    predictionsAccurate: 94,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleRegenerateField = (field: string) => {
    setIsRegenerating(field);
    setAiThinking(true);
    
    setTimeout(() => {
      if (field === 'description') {
        setEventDescription('Experience a transformative gathering where creativity meets innovation. Connect with pioneers, share insights, and build lasting professional relationships.');
      } else if (field === 'location') {
        setEventLocation('Downtown Conference Center, Main Auditorium');
      }
      setIsRegenerating(null);
      setAiThinking(false);
    }, 1500);
  };

  // Determine current user's role for this event
  const getCurrentUserRole = (): 'host' | 'moderator' | 'co-host' | 'speaker' => {
    const email = currentUser?.email || '';
    if (eventData.creatorEmail === email) return 'host';
    if (eventData.moderators?.includes(email)) return 'moderator';
    if (eventData.speakers?.some((s: any) => s.email === email && s.role === 'Co-host')) return 'co-host';
    if (eventData.speakers?.some((s: any) => s.email === email)) return 'speaker';
    return 'host'; // default for demo
  };

  // Helper: Track field change and log it
  const logFieldChange = (fieldName: string, fieldLabel: string, oldValue: any, newValue: any, sendNotification: boolean, overrideRole?: 'host' | 'moderator' | 'co-host' | 'speaker') => {
    const change: EventChange = {
      id: `change-${Date.now()}-${Math.random()}`,
      eventId: eventData.id || 'unknown',
      timestamp: new Date(),
      userId: currentUser?.id || 'current-user',
      userName: currentUser?.name || 'You',
      userEmail: currentUser?.email || 'you@example.com',
      userRole: overrideRole || getCurrentUserRole(),
      changeType: 'field_edit',
      fieldName,
      fieldLabel,
      oldValue,
      newValue,
      notificationSent: sendNotification,
      affectedUsers: sendNotification ? registeredCount : 0,
      details: `${fieldLabel} changed from "${oldValue}" to "${newValue}"`
    };
    setChangeLog(prev => [change, ...prev]);
  };

  // Helper: Wrapper for field changes that require warnings
  const handleFieldChangeWithWarning = (
    fieldName: string, 
    oldValue: any, 
    newValue: any, 
    setter: (value: any) => void
  ) => {
    // If draft, just set directly (but still log)
    if (isDraft || !localPublished) {
      setter(newValue);
      // Log silently for drafts too
      if (oldValue !== newValue) {
        const config = createEditWarningConfig(fieldName, oldValue, newValue, 0);
        logFieldChange(fieldName, config.fieldLabel, oldValue, newValue, false);
      }
      return;
    }

    // Published event - show warning with role info
    const config = createEditWarningConfig(fieldName, oldValue, newValue, registeredCount);
    const role = getCurrentUserRole();
    config.changedBy = {
      name: currentUser?.name || 'You',
      email: currentUser?.email || 'you@example.com',
      role
    };
    
    setPendingEdit({
      config,
      onConfirm: (sendNotification: boolean) => {
        setter(newValue);
        logFieldChange(fieldName, config.fieldLabel, oldValue, newValue, sendNotification, role);
        
        if (sendNotification && config.affectedCount > 0) {
          toast.success('Change saved & attendees notified', {
            description: `${config.affectedCount} attendees received an email about this change.`
          });
        } else {
          toast.success('Change saved & logged', {
            description: 'The change is now live on your event page.'
          });
        }
      }
    });
    setShowEditConfirmation(true);
  };

  // Wrapped setters for event fields (with edit warnings)
  const setEventDescriptionWithWarning = (newValue: string) => {
    handleFieldChangeWithWarning('description', eventDescription, newValue, setEventDescription);
  };

  const setEventLocationWithWarning = (newValue: string) => {
    handleFieldChangeWithWarning('location', eventLocation, newValue, setEventLocation);
  };

  const setEventCapacityWithWarning = (newValue: string) => {
    handleFieldChangeWithWarning('capacity', eventCapacity, newValue, setEventCapacity);
  };

  const registeredCount = attendees.filter(a => a.status === 'confirmed').length;
  const waitlistCount = attendees.filter(a => a.status === 'waitlist').length;
  const checkedInCount = attendees.filter(a => a.checkIn !== null).length;

  const headerActions = isCancelled ? (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" className="rounded-lg border-border text-foreground">Clone as New Event</Button>
    </div>
  ) : isSpeakerView ? (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" className="rounded-lg border-border" onClick={() => setShowPreview(true)}>
        <Eye className="size-3.5 mr-2" />
        Preview
      </Button>
      {isLive && (
        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-none"
          onClick={() => onJoinEvent?.(eventData.title || 'Event', `EVENT-${eventData.id}`)}>
          <Video className="size-3.5 mr-2" />
          Enter Backstage
        </Button>
      )}
    </div>
  ) : (
    <>
      {/* AI Mode Switcher - COMMENTED OUT */}
      {/* <Popover open={showModeSelector} onOpenChange={setShowModeSelector}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 rounded-lg border-[var(--ai-border)] bg-[var(--ai-accent)] hover:bg-[var(--ai-muted)] transition-colors">
            {copilotModes.find(m => m.id === aiMode)?.icon && (
              (() => {
                const Icon = copilotModes.find(m => m.id === aiMode)!.icon;
                return <Icon className="size-3.5 text-[var(--ai-primary)]" />;
              })()
            )}
            <span className="text-[var(--ai-primary)] font-medium">{copilotModes.find(m => m.id === aiMode)?.label}</span>
            <ChevronDown className="size-3 text-[var(--ai-primary)]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3 shadow-none border-border">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-sm">AI Copilot Mode</p>
              <Badge variant="secondary" className="text-xs rounded-lg">
                <Wand2Icon className="size-3 mr-1" />
                Smart
              </Badge>
            </div>
            {copilotModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setAiMode(mode.id);
                    setShowModeSelector(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                    aiMode === mode.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-input'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`size-4 mt-0.5 ${aiMode === mode.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">{mode.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 font-medium">{mode.description}</p>
                    </div>
                    {aiMode === mode.id && <Check className="size-4 text-primary" />}
                  </div>
                </button>
              );
            })}
            
            <div className="pt-2 mt-2 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground font-semibold">AI PERSONALITY</p>
                <button
                  onClick={() => setAiAutoPilot(!aiAutoPilot)}
                  className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase transition-colors ${
                    aiAutoPilot ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {aiAutoPilot ? 'Autopilot On' : 'Autopilot Off'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {aiPersonalities.map((personality) => (
                  <button
                    key={personality.id}
                    onClick={() => setAiPersonality(personality.id)}
                    className={`p-2 rounded border text-xs ${
                      aiPersonality === personality.id
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-input text-muted-foreground'
                    }`}
                  >
                    {personality.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover> */}

      <Button size="sm" variant="outline" className="rounded-lg border-border" onClick={() => setShowPreview(true)}>
        <Eye className="size-3.5 mr-2" />
        Preview
      </Button>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="rounded-lg border-border">
              <Share2 className="size-3.5 mr-2" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{isDraft ? 'Share Draft' : 'Share Event'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isDraft && (
              <DropdownMenuItem onClick={() => {
                const previewUrl = `https://leapspace.ai/events/${eventData.id || 'preview'}/draft-preview?token=${Math.random().toString(36).substr(2, 8)}`;
                navigator.clipboard.writeText(previewUrl);
                toast.success('Draft preview link copied!', { description: 'Anyone with this link can preview your draft.' });
              }}>
                <Eye className="size-3.5 mr-2" />
                Copy Draft Preview Link
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => {
              navigator.clipboard.writeText(`https://leapspace.ai/events/${eventData.id || 'preview'}`);
              toast.success('Link copied!');
            }}>
              <Link2 className="size-3.5 mr-2" />
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              window.location.href = `mailto:?subject=${encodeURIComponent(eventData.title || 'Check out this event')}&body=${encodeURIComponent(`Check out this event: https://leapspace.ai/events/${eventData.id || 'preview'}`)}`;
            }}>
              <Mail className="size-3.5 mr-2" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this event: ${eventData.title} https://leapspace.ai/events/${eventData.id || 'preview'}`)}`, '_blank');
            }}>
              <Send className="size-3.5 mr-2" />
              WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out "${eventData.title}"`)}&url=${encodeURIComponent(`https://leapspace.ai/events/${eventData.id || 'preview'}`)}`, '_blank');
            }}>
              <Send className="size-3.5 mr-2" />
              Twitter / X
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://leapspace.ai/events/${eventData.id || 'preview'}`)}`, '_blank');
            }}>
              <Send className="size-3.5 mr-2" />
              LinkedIn
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowQRCodeDialog(true)}>
              <QrCode className="size-3.5 mr-2" />
              QR Code
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              const embedCode = `<iframe src="https://leapspace.ai/embed/events/${eventData.id || 'preview'}" width="100%" height="600" frameborder="0"></iframe>`;
              navigator.clipboard.writeText(embedCode);
              toast.success('Embed code copied!', { description: 'Paste the HTML snippet into your website.' });
            }}>
              <Code className="size-3.5 mr-2" />
              Embed Code
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      {isDraft && !localPublished && !localScheduledFor && (
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
          disabled={isSkeleton}
          title={isSkeleton ? 'Complete required setup steps first' : isBuilding ? 'Add a title, description, and date/time to publish' : 'Publish your event'}
          onClick={() => {
            if (isReady) {
              setShowPublishDialog(true);
            } else if (isBuilding) {
              toast('Complete required fields before publishing.', { description: 'You need a title, description, and date/time.' });
              setMainView('overview');
            }
          }}
        >
          <Upload className="size-3.5 mr-2" />
          {isReady ? 'Publish Event' : 'Publish'}
          {isBuilding && <AlertCircle className="size-3 ml-1 text-amber-300" />}
        </Button>
      )}
      {localScheduledFor && (
        <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 rounded-lg shadow-none text-xs">
          <Clock className="size-3 mr-1.5" />
          Scheduled
        </Badge>
      )}
      {(localPublished || (!isDraft && !isLive && !isEnded && !isCancelled)) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="rounded-lg border-border">
              <MoreVertical className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Event Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onViewPublicPage}>
              <Eye className="size-3.5 mr-2" />
              View Public Page
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              navigator.clipboard.writeText(`https://leapspace.ai/events/${eventData.id || 'preview'}`);
              toast.success('Link copied to clipboard!');
            }}>
              <Share2 className="size-3.5 mr-2" />
              Copy Public Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowInviteModal(true)}>
              <Mail className="size-3.5 mr-2" />
              Send Invitations
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              toast.success('Event duplicated', { description: 'A copy has been created as a draft. Go to Events to find it.' });
            }}>
              <Copy className="size-3.5 mr-2" />
              Duplicate Event
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setShowUnpublishDialog(true)} className="text-red-600 focus:text-red-600">
              <XCircle className="size-3.5 mr-2" />
              Unpublish (Back to Draft)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {isLive && (
        <Button 
          size="sm" 
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-none animate-pulse"
          onClick={() => onJoinEvent?.(eventData.title || 'Untitled Event', `EVENT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`)}
        >
          <Video className="size-3.5 mr-2" />
          Enter Room
        </Button>
      )}
    </>
  );

  const sidebarBottom = (
    <div className="pt-4 mt-4 border-t border-border">
      <p className="text-[10px] text-muted-foreground px-3 mb-2 font-semibold uppercase tracking-normal">COMMUNITY</p>
      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-accent transition-colors font-medium" onClick={() => setShowLinkToCommunityModal(true)}>
        <Network className="size-4" />
        Link to Community
      </button>
      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-accent transition-colors font-medium" onClick={() => onCreateCommunity?.()}>
        <Plus className="size-4" />
        Create Community
      </button>
    </div>
  );

  const subHeader = (
    <div className="flex items-center gap-4 text-xs bg-muted border-t border-border px-6 py-2.5 shadow-none">
      <div className="flex items-center gap-2">
        <Clock className="size-3.5 text-primary" />
        <span className="text-muted-foreground font-medium">
          <span className="font-semibold text-primary">{aiImpactStats.timeSaved}h</span> saved this week
        </span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-2">
        <Mail className="size-3.5 text-primary" />
        <span className="text-muted-foreground font-medium">
          <span className="font-semibold text-foreground">{aiImpactStats.emailsSent}</span> emails sent
        </span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-2">
        <Gauge className="size-3.5 text-primary" />
        <span className="text-muted-foreground font-medium">Health: <span className="font-semibold text-primary">{healthScore}/100</span></span>
      </div>
      <div className="flex items-center gap-2">
        <UserCheck className="size-3.5 text-green-600" />
        <span className="text-muted-foreground font-medium">Registration: <span className="font-semibold text-foreground">{registrationRate}%</span></span>
      </div>
      <div className="flex items-center gap-2">
        <Target className="size-3.5 text-primary" />
        <span className="text-muted-foreground font-medium">Predicted Attendance: <span className="font-semibold text-primary">{attendancePredict}%</span></span>
      </div>
      <div className="ml-auto">
        <Button size="sm" variant="ghost" className="text-xs text-primary hover:bg-primary/10 rounded-lg font-semibold h-6">
          <BarChart3 className="size-3 mr-1" />
          View Details
        </Button>
      </div>
    </div>
  );

  // ── Phase 2: Status banner for lifecycle states (MOCK_EVENTS_MASTER_PLAN.md §Phase 4) ──
  const statusBanner = (() => {
    if (isSkeleton) {
      return (
        <div className="bg-muted border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-muted-foreground/20 flex items-center justify-center">
                <Rocket className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Getting Started</p>
                <p className="text-xs text-muted-foreground">{completionCount.done} of {completionCount.total} setup steps complete</p>
              </div>
            </div>
            <Progress value={completionPercent} className="w-32 h-2" />
          </div>
        </div>
      );
    }
    if (isBuilding) {
      const warnings: string[] = [];
      if (!liveChecklist.hasCoverImage) warnings.push('No cover image');
      if (!liveChecklist.hasLocation) warnings.push('No meeting link');
      if (!liveChecklist.hasRegistrationForm) warnings.push('No registration form');
      return (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="size-4 text-amber-600" />
              <p className="text-sm text-amber-800">
                <span className="font-semibold">{warnings.length} issue{warnings.length !== 1 ? 's' : ''} to resolve: </span>
                {warnings.join(' · ')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-600 font-medium">{completionPercent}% complete</span>
              <Progress value={completionPercent} className="w-24 h-2" />
            </div>
          </div>
        </div>
      );
    }
    if (isReady) {
      return (
        <div className="bg-muted border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="size-4 text-muted-foreground" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">All set — your event is ready to publish.</span>
                {' '}Review the checklist below, then hit Publish.
              </p>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none h-8 text-xs" onClick={() => setShowPublishDialog(true)}>
              Publish Event
            </Button>
          </div>
        </div>
      );
    }
    if (isLive) {
      return (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2.5 bg-red-500" />
              </span>
              <p className="text-sm text-red-800 font-semibold">
                LIVE NOW — {eventData.liveAttendeeCount || 0} watching
              </p>
              <span className="text-xs text-red-600">
                Started at {eventData.time}
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-none h-8 text-xs"
                onClick={() => onJoinEvent?.(eventData.title || 'Event', `EVENT-${eventData.id}`)}>
                Open Control Room
              </Button>
              <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-100 rounded-lg h-8 text-xs">
                End Event
              </Button>
            </div>
          </div>
        </div>
      );
    }
    if (isEnded && !eventData.recordingUrl) {
      const todosDone = eventData.postEventTodos
        ? Object.values(eventData.postEventTodos).filter(Boolean).length
        : 0;
      return (
        <div className="bg-muted border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-muted-foreground" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Event ended.</span>
                {' '}{todosDone} of 5 post-event tasks complete.
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {eventData.attendanceReport
                ? `${eventData.attendanceReport.attended} of ${eventData.attendanceReport.registered} attended (${Math.round((eventData.attendanceReport.attended / Math.max(1, eventData.attendanceReport.registered)) * 100)}%)`
                : 'Processing attendance report...'}
            </span>
          </div>
        </div>
      );
    }
    if (isCancelled) {
      return (
        <div className="bg-muted border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <XCircle className="size-4 text-muted-foreground" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Event cancelled</span>
                {eventData.cancelledAt ? ` on ${new Date(eventData.cancelledAt).toLocaleDateString()}` : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg h-8 text-xs">
                Clone as New Event
              </Button>
              <Button size="sm" variant="outline" className="border-red-200 text-red-600 rounded-lg h-8 text-xs">
                Delete Event
              </Button>
            </div>
          </div>
        </div>
      );
    }
    if (isSoldOut) {
      return (
        <div className="bg-primary/5 border-b border-primary/20 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="size-4 text-primary" />
              <p className="text-sm text-primary">
                <span className="font-semibold">At capacity</span> — {eventData.attendeeCount}/{eventData.capacity} registered.
                {eventWaitlist.length > 0 ? ` ${eventWaitlist.length} on waitlist.` : ''}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-primary/20 text-primary rounded-lg h-8 text-xs"
                onClick={() => {
                  setMainView('settings');
                  setSettingsInitialTab('general');
                }}>
                Increase Capacity
              </Button>
              {eventWaitlist.length > 0 && (
                <Button size="sm" variant="outline" className="border-primary/20 text-primary rounded-lg h-8 text-xs"
                  onClick={() => {
                    setMainView('attendees');
                    setAttendeesSubTab('waitlist');
                  }}>
                  Manage Waitlist
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  })();

  // Speaker view subtitle
  const shellSubtitle = isSpeakerView
    ? `Speaker · Event by ${eventData.creatorName}`
    : localPublished
    ? `Published · ${registeredCount} registered · ${(eventData.capacity || 100) - registeredCount} spots remaining`
    : localScheduledFor
    ? `Scheduled for ${localScheduledFor}`
    : isDraft
    ? `${completionCount.done}/${completionCount.total} steps complete`
    : isLive
    ? `${eventData.liveAttendeeCount || 0} watching live`
    : isCancelled
    ? 'Cancelled'
    : `${registeredCount} registered · ${healthScore}% health`;

  return (
    <EventShell
      role={isSpeakerView ? 'speaker' : 'admin'}
      title={eventData.title || 'Untitled Event'}
      subtitle={shellSubtitle}
      activeTab={mainView}
      onTabChange={setMainView}
      onBack={onBack}
      headerActions={headerActions}
      subHeader={!isDraft && !isCancelled ? subHeader : undefined}
      sidebarBottom={sidebarBottom}
      statusBanner={statusBanner}
      tabIndicators={isDraft ? tabIndicators : undefined}
      badge={aiAutoPilot ? (
        <Badge variant="secondary" className="text-xs rounded-lg shadow-none">
          <Cpu className="size-3 mr-1" />
          Autopilot
        </Badge>
      ) : isSpeakerView ? (
        <Badge variant="secondary" className="text-xs rounded-lg shadow-none bg-primary/10 text-primary border-primary/20">
          Speaker
        </Badge>
      ) : null}
      counts={{
        schedule: scheduleItems.length,
        attendees: attendees.length,
        discussion: 12
      }}
    >
      <ScrollArea className="flex-1">
        <div className={['ai-hub', 'settings', 'changelog'].includes(mainView) ? "h-full" : "p-6 pb-24 max-w-5xl mx-auto"}>
          {mainView === 'ai-hub' ? (
            <EventAIHub eventTitle={eventData.title || 'Untitled Event'} />
          ) : mainView === 'settings' ? (
            <EventSettings key={settingsInitialTab} eventTitle={eventData.title || 'Untitled Event'} onUpdate={onUpdateEventData} initialTab={settingsInitialTab} onRolesChange={setCustomRoles} customRoles={customRoles} />
          ) : mainView === 'changelog' ? (
            <div className="p-6 max-w-7xl mx-auto">
              <EventChangeLog 
                eventId={eventData.id || 'unknown'}
                changes={changeLog}
                isDraft={isDraft && !localPublished}
              />
            </div>
          ) : (
            <>
              {mainView === 'overview' && (
                <>
                  {/* ── Skeleton/Building/Ready: Setup Checklist (MOCK_EVENTS_MASTER_PLAN.md §Event A/B/C) ── */}
                  {isDraft && (
                    <div className="mb-6 space-y-4">
                      <div className="bg-card border border-border rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">
                              {isReady ? 'Final Review Checklist' : 'Setup Checklist'}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{completionCount.done} of {completionCount.total} complete</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">{completionPercent}%</span>
                            <Progress value={completionPercent} className="w-24 h-2" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          {[
                            { key: 'hasTitle', label: 'Event title', done: liveChecklist.hasTitle, required: true, action: 'Edit Title', onClick: () => { setSettingsInitialTab('general'); setMainView('settings'); } },
                            { key: 'hasDescription', label: 'Description', done: liveChecklist.hasDescription, required: true, action: 'Add Description', onClick: () => { setEditingField('description'); setTimeout(() => overviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100); } },
                            { key: 'hasDateTime', label: 'Date & time', done: liveChecklist.hasDateTime, required: true, action: 'Set Date', onClick: () => { setSettingsInitialTab('general'); setMainView('settings'); } },
                            { key: 'hasCoverImage', label: 'Cover image', done: liveChecklist.hasCoverImage, required: false, action: 'Upload Image', onClick: () => { setTriggerCoverUpload(true); setTimeout(() => overviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100); } },
                            { key: 'hasAgenda', label: 'Agenda / schedule', done: liveChecklist.hasAgenda, required: false, action: 'Create Agenda', onClick: () => setMainView('schedule') },
                            { key: 'hasSpeakers', label: 'Speakers', done: liveChecklist.hasSpeakers, required: false, action: 'Add Speakers', onClick: () => { setAttendeesSubTab('speakers'); setMainView('attendees'); } },
                            { key: 'hasTickets', label: 'Tickets / pricing', done: liveChecklist.hasTickets, required: false, action: 'Set Up Tickets', onClick: () => setMainView('tickets') },
                            { key: 'hasRegistrationConfig', label: 'Registration settings', done: hasRegistrationConfig, required: false, action: 'Configure', onClick: () => setShowRegistrationConfigDialog(true) },
                            { key: 'hasRegistrationForm', label: 'Registration form', done: liveChecklist.hasRegistrationForm, required: false, action: 'Build Form', onClick: () => { setAttendeesSubTab('form'); setMainView('attendees'); } },
                            { key: 'hasLocation', label: 'Location / meeting link', done: liveChecklist.hasLocation, required: false, action: 'Add Location', onClick: () => { setSettingsInitialTab('general'); setMainView('settings'); } },
                          ].map(item => (
                            <div key={item.key} className="flex items-center gap-3 py-1.5">
                              {item.done ? (
                                <CheckCircle className="size-4 text-primary flex-shrink-0" />
                              ) : (
                                <div className={`size-4 rounded-full border-2 flex-shrink-0 ${item.required ? 'border-primary/50' : 'border-muted-foreground/30'}`} />
                              )}
                              <span className={`text-sm flex-1 ${item.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                {item.label}
                                {item.required && !item.done && <span className="text-[10px] text-primary ml-1.5">Required</span>}
                              </span>
                              {!item.done && item.action && (
                                <Button size="sm" variant="outline" className="h-7 text-xs border-border text-primary hover:bg-primary/10" onClick={item.onClick}>
                                  {item.action}
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Suggestions for skeleton/building */}
                      {(isSkeleton || isBuilding) && (
                        <div className="bg-card border border-primary/10 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Wand2Icon className="size-4 text-primary" />
                            <h3 className="text-sm font-semibold text-foreground">AI Suggestions</h3>
                          </div>
                          <div className="space-y-3">
                            {isSkeleton && (
                              <>
                                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                  <Brain className="size-4 text-primary mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <p className="text-sm text-foreground/80">Your event has no agenda yet. Most successful workshops have 3-5 sessions. Want me to generate a draft agenda?</p>
                                    <Button size="sm" className="mt-2 h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground shadow-none" onClick={handleGenerateAgenda}>
                                      Generate Agenda
                                    </Button>
                                  </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                  <UserPlus className="size-4 text-primary mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <p className="text-sm text-foreground/80">Add at least one speaker to boost registrations by ~40%.</p>
                                    <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary" onClick={handleAIAddSpeaker}>
                                      Add Speaker
                                    </Button>
                                  </div>
                                </div>
                              </>
                            )}
                            {isBuilding && (
                              <>
                                {eventData.schedule && eventData.schedule.length < 4 && (
                                  <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                    <Brain className="size-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <p className="text-sm text-foreground/80">
                                        You have {eventData.schedule.length} sessions. A typical workshop is 2-3 hours. Want me to suggest {4 - eventData.schedule.length} more sessions?
                                      </p>
                                      <Button size="sm" className="mt-2 h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground shadow-none" onClick={handleGenerateMoreSessions}>
                                        Generate More Sessions
                                      </Button>
                                    </div>
                                  </div>
                                )}
                                {eventData.isPaid && eventData.tickets && eventData.tickets.length === 1 && (
                                  <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                                    <Ticket className="size-4 text-primary mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <p className="text-sm text-foreground/80">
                                        Your ticket is priced at ${eventData.tickets[0].price}. Consider adding a VIP tier with extra perks — it typically increases revenue by 40%.
                                      </p>
                                      <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary" onClick={handleAddVIPTier}>
                                        Add VIP Tier
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Ready to publish confirmation */}
                      {isReady && !localPublished && (
                        <div className="bg-card border border-primary/20 rounded-xl p-5">
                          <h3 className="text-sm text-foreground mb-2">When you publish:</h3>
                          <ul className="space-y-1.5 text-sm text-muted-foreground mb-4">
                            <li className="flex items-center gap-2"><Check className="size-3.5 text-primary" /> Event becomes visible on the explore page</li>
                            <li className="flex items-center gap-2"><Check className="size-3.5 text-primary" /> Public URL becomes shareable</li>
                            {derivePricingMode(tickets) === 'paid' && <li className="flex items-center gap-2"><Check className="size-3.5 text-primary" /> Ticket sales go live — {tickets.length} tier{tickets.length !== 1 ? 's' : ''}</li>}
                            <li className="flex items-center gap-2"><Check className="size-3.5 text-primary" /> Pricing locked to {derivePricingMode(tickets) === 'paid' ? 'Paid' : 'Free'} mode</li>
                            <li className="flex items-center gap-2"><Check className="size-3.5 text-primary" /> Leapcast meeting room is auto-provisioned</li>
                          </ul>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={() => setShowPublishDialog(true)}>
                              Publish Now
                            </Button>
                            <Button size="sm" variant="outline" className="border-border text-foreground rounded-lg" onClick={() => { setShowPublishDialog(true); setShowSchedulePicker(true); }}>
                              Schedule Publish for Later
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Ready state AI suggestions */}
                      {isReady && !localPublished && (
                        <div className="bg-card border border-primary/10 rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <Wand2Icon className="size-4 text-primary" />
                            <h3 className="text-sm font-semibold text-foreground">Pre-Launch Suggestions</h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                              <Mail className="size-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm text-foreground/80">Want me to draft a launch announcement for your audience?</p>
                                <Button size="sm" className="mt-2 h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground shadow-none" onClick={() => toast.success('Launch announcement drafted!', { description: 'Check the Discussion tab to review and send.' })}>
                                  Draft Announcement
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                              <Share2 className="size-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm text-foreground/80">Generate a social media pack to promote your event across platforms?</p>
                                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary" onClick={() => toast.success('Social media pack generated!', { description: 'Twitter, LinkedIn, and Instagram posts ready.' })}>
                                  Generate Social Pack
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                              <Eye className="size-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm text-foreground/80">Preview your public page one more time before publishing.</p>
                                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary" onClick={() => setShowPreview(true)}>
                                  Preview Public Page
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ── Draft Quick Actions ── */}
                      <div className="bg-card border border-border rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="justify-start rounded-lg border-border text-foreground h-9"
                            onClick={() => {
                              const previewUrl = `https://leapspace.ai/events/${eventData.id || 'preview'}/draft-preview?token=${Math.random().toString(36).substr(2, 8)}`;
                              navigator.clipboard.writeText(previewUrl);
                              toast.success('Preview link copied!', { description: 'Share this link with collaborators to preview your draft.' });
                            }}
                          >
                            <Share2 className="size-3.5 mr-2 text-muted-foreground" />
                            Share Draft Preview
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="justify-start rounded-lg border-border text-foreground h-9"
                            onClick={() => setShowQRCodeDialog(true)}
                          >
                            <QrCode className="size-3.5 mr-2 text-muted-foreground" />
                            Generate QR Code
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="justify-start rounded-lg border-border text-foreground h-9"
                            onClick={() => {
                              toast.success('Event duplicated!', { description: 'A copy has been created as a new draft. Find it in your Events list.' });
                            }}
                          >
                            <Copy className="size-3.5 mr-2 text-muted-foreground" />
                            Duplicate Event
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="justify-start rounded-lg border-border text-foreground h-9"
                            onClick={() => { setSettingsInitialTab('general'); setMainView('settings'); }}
                          >
                            <Edit2 className="size-3.5 mr-2 text-muted-foreground" />
                            Edit Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="justify-start rounded-lg border-border text-foreground h-9"
                            onClick={() => setMainView('resources')}
                          >
                            <FileText className="size-3.5 mr-2 text-muted-foreground" />
                            Add Resources
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Published State Overview (Step 3.4) ── */}
                  {localPublished && (
                    <div className="mb-6 space-y-4">
                      {/* Published status info */}
                      <div className="bg-card border border-green-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="size-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <CheckCircle className="size-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="text-sm font-semibold text-foreground">Event Published</h3>
                              <p className="text-xs text-muted-foreground">Published just now — {registeredCount} registered, {(eventData.capacity || 100) - registeredCount} spots remaining</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 rounded shadow-none text-xs">
                            Live
                          </Badge>
                        </div>

                        {/* Public URL */}
                        <div className="flex items-center gap-2 bg-muted rounded-lg p-3 mb-4">
                          <span className="text-xs text-muted-foreground flex-shrink-0">Public URL:</span>
                          <code className="text-xs text-foreground flex-1 truncate">https://leapspace.ai/events/{eventData.id || 'preview'}</code>
                          <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => {
                            navigator.clipboard.writeText(`https://leapspace.ai/events/${eventData.id || 'preview'}`);
                            toast.success('Link copied to clipboard!');
                          }}>
                            Copy
                          </Button>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="rounded-lg border-border" onClick={onViewPublicPage}>
                            <Eye className="size-3.5 mr-2" />
                            View Public Page
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-lg border-border" onClick={() => {
                            navigator.clipboard.writeText(`https://leapspace.ai/events/${eventData.id || 'preview'}`);
                            toast.success('Link copied!');
                          }}>
                            <Share2 className="size-3.5 mr-2" />
                            Share
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-lg border-border" onClick={() => setShowInviteModal(true)}>
                            <Send className="size-3.5 mr-2" />
                            Send Invites
                          </Button>
                        </div>
                      </div>

                      {/* Edit warning */}
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs text-amber-800 flex items-center gap-2">
                          <AlertCircle className="size-3.5 flex-shrink-0" />
                          This event is published. Any changes you make will be visible immediately to {registeredCount > 0 ? `${registeredCount} registered attendees` : 'visitors'}.
                        </p>
                      </div>

                      {/* Registration stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-card border border-border rounded-xl p-4">
                          <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Registered</p>
                          <p className="text-2xl font-bold text-foreground">{registeredCount}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">of {eventData.capacity || 100} capacity</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-4">
                          <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Page Views</p>
                          <p className="text-2xl font-bold text-foreground">247</p>
                          <p className="text-xs text-green-600 mt-0.5">+38 today</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-4">
                          <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Conversion</p>
                          <p className="text-2xl font-bold text-foreground">{registeredCount > 0 ? Math.round((registeredCount / 247) * 100) : 0}%</p>
                          <p className="text-xs text-muted-foreground mt-0.5">views → registrations</p>
                        </div>
                      </div>

                      {/* Published AI suggestions */}
                      <div className="bg-card border border-primary/10 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Wand2Icon className="size-4 text-primary" />
                          <h3 className="text-sm font-semibold text-foreground">Suggestions</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                            <TrendingUp className="size-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm text-foreground/80">{registeredCount} registrations so far — share on social to keep momentum going.</p>
                              <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary" onClick={() => toast.success('Social post generated!', { description: 'Copy it from the Social Pack section.' })}>
                                Generate Social Post
                              </Button>
                            </div>
                          </div>
                          {eventData.isPaid && (
                            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                              <Bell className="size-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm text-foreground/80">Consider sending a reminder about your early bird pricing before it expires.</p>
                                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary" onClick={() => toast.success('Reminder email drafted!', { description: 'Review it in the email composer.' })}>
                                  Send Reminder
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Live Dashboard (MOCK_EVENTS_MASTER_PLAN.md §Event I) ── */}
                  {isLive && (
                    <div className="mb-6 space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Live Dashboard</h2>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-card border border-border rounded-xl p-5">
                          <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Watching Now</p>
                          <p className="text-2xl font-bold text-foreground">{eventData.liveAttendeeCount || 0}</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-5">
                          <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Registered</p>
                          <p className="text-2xl font-bold text-foreground">{eventData.attendeeCount}</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-5">
                          <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Chat Messages</p>
                          <p className="text-2xl font-bold text-foreground">24</p>
                          <p className="text-xs text-muted-foreground mt-0.5">last 5 min</p>
                        </div>
                      </div>
                      {eventData.schedule && eventData.schedule.length > 0 && (
                        <div className="bg-card border border-border rounded-xl p-5">
                          <p className="text-xs text-muted-foreground font-semibold uppercase mb-2">Current Session</p>
                          <p className="text-sm font-semibold text-foreground">{eventData.schedule[1]?.title || eventData.schedule[0]?.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{eventData.schedule[1]?.speakers?.join(', ') || 'Main Stage'}</p>
                          <div className="mt-3">
                            <Progress value={71} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">32 min / 45 min elapsed</p>
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant="outline" className="border-border text-foreground" onClick={() => toast.success('Poll launched!', { description: 'Attendees will see it in their meeting view.' })}>Launch Poll</Button>
                        <Button size="sm" variant="outline" className="border-border text-foreground" onClick={() => toast.success('Message pinned!', { description: 'All attendees can see the pinned message.' })}>Pin Message</Button>
                        <Button size="sm" variant="outline" className="border-border text-foreground" onClick={() => toast.success('Announcement sent!', { description: 'All attendees have been notified.' })}>Send Announcement</Button>
                        <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 ml-auto" onClick={() => {
                          if (confirm('Are you sure you want to end this event? This will close the meeting room and transition to post-event mode.')) {
                            toast.success('Event ended', { description: 'The meeting room has been closed. Post-event tasks are now available.' });
                          }
                        }}>
                          <XCircle className="size-3.5 mr-2" />
                          End Event
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* ── Post-Event Todos (MOCK_EVENTS_MASTER_PLAN.md §Event J) ── */}
                  {isEnded && eventData.postEventTodos && (
                    <div className="mb-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">Post-Event Checklist</h2>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="rounded-lg border-border gap-1.5 h-7 text-xs" onClick={() => toast.success('Event duplicated', { description: 'A new draft has been created. Go to Events to find it.' })}>
                            <Copy className="size-3" />
                            Run Again
                          </Button>
                          <span className="text-xs font-medium text-muted-foreground">
                            {Object.values(eventData.postEventTodos).filter(Boolean).length} of {Object.values(eventData.postEventTodos).length} tasks complete
                          </span>
                          <Progress value={Math.round((Object.values(eventData.postEventTodos).filter(Boolean).length / Object.values(eventData.postEventTodos).length) * 100)} className="w-24 h-2" />
                        </div>
                      </div>
                      {eventData.attendanceReport && (
                        <div className="grid grid-cols-4 gap-4">
                          <div className="bg-card border border-border rounded-xl p-4">
                            <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Registered</p>
                            <p className="text-2xl font-bold text-foreground">{eventData.attendanceReport.registered}</p>
                          </div>
                          <div className="bg-card border border-border rounded-xl p-4">
                            <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Attended</p>
                            <p className="text-2xl font-bold text-foreground">{eventData.attendanceReport.attended}</p>
                          </div>
                          <div className="bg-card border border-border rounded-xl p-4">
                            <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Show Rate</p>
                            <p className="text-2xl font-bold text-foreground">
                              {Math.round((eventData.attendanceReport.attended / Math.max(1, eventData.attendanceReport.registered)) * 100)}%
                            </p>
                          </div>
                          <div className="bg-card border border-border rounded-xl p-4">
                            <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">Engagement</p>
                            <p className="text-2xl font-bold text-foreground">{eventData.attendanceReport.engagementScore}/100</p>
                          </div>
                        </div>
                      )}
                      <div className="bg-card border border-border rounded-xl p-5 space-y-3">
                        {[
                          { key: 'uploadRecording', label: 'Upload recording', done: eventData.postEventTodos.uploadRecording, action: 'Upload', toast: 'Recording uploaded successfully!', desc: 'Attendees will be notified when processing is complete.' },
                          { key: 'sendFollowUp', label: 'Send follow-up email to attendees', done: eventData.postEventTodos.sendFollowUp, action: 'Compose', toast: 'Follow-up email sent!', desc: `Sent to ${eventData.attendanceReport?.attended || 0} attendees.` },
                          { key: 'publishResources', label: 'Publish resources & slides', done: eventData.postEventTodos.publishResources, action: 'Upload Resources', toast: 'Resources published!', desc: 'Attendees can now download from the event page.' },
                          { key: 'issueCertificates', label: 'Configure certificates', done: eventData.postEventTodos.issueCertificates, action: 'Set Up', toast: 'Certificates configured!', desc: 'Attendees who completed the event will receive certificates.' },
                          { key: 'collectFeedback', label: 'Send feedback survey', done: eventData.postEventTodos.collectFeedback, action: 'Create Survey', toast: 'Feedback survey sent!', desc: 'Attendees will receive the survey via email.' },
                        ].map(item => (
                          <div key={item.key} className="flex items-center gap-3 py-1.5">
                            {item.done ? (
                              <CheckCircle className="size-4 text-green-600 flex-shrink-0" />
                            ) : (
                              <div className="size-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                            )}
                            <span className={`text-sm flex-1 ${item.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                              {item.label}
                            </span>
                            {!item.done && (
                              <Button size="sm" variant="outline" className="h-7 text-xs border-border text-primary hover:bg-primary/10" onClick={() => toast.success(item.toast, { description: item.desc })}>
                                {item.action}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Post-event AI suggestions */}
                      <div className="bg-card border border-primary/10 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Wand2Icon className="size-4 text-primary" />
                          <h3 className="text-sm font-semibold text-foreground">Suggestions</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                            <Mail className="size-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm text-foreground/80">Want me to draft a follow-up email for {eventData.attendanceReport?.attended || 0} attendees?</p>
                              <Button size="sm" className="mt-2 h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground shadow-none" onClick={() => toast.success('Follow-up email drafted!', { description: 'Review it in the email composer before sending.' })}>
                                Draft Follow-Up
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                            <Target className="size-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm text-foreground/80">Generate a feedback survey? Events with surveys get 60% better repeat attendance.</p>
                              <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary" onClick={() => toast.success('Feedback survey created!', { description: 'Ready to send to attendees.' })}>
                                Create Survey
                              </Button>
                            </div>
                          </div>
                          {eventData.attendanceReport && (
                            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                              <Activity className="size-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm text-foreground/80">
                                  Your engagement score was {eventData.attendanceReport.engagementScore}/100
                                  {eventData.attendanceReport.engagementScore >= 75 ? ' — great work!' : ' — here\'s how to improve next time.'} 
                                </p>
                                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary" onClick={() => toast.success('Tips loaded!', { description: 'Check the AI Hub for detailed improvement suggestions.' })}>
                                  View Tips
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Cancelled Event Info (MOCK_EVENTS_MASTER_PLAN.md §Event K) ── */}
                  {isCancelled && (
                    <div className="mb-6 space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Cancellation Details</h2>
                      {eventData.cancellationReason && (
                        <div className="bg-card border border-border rounded-xl p-5">
                          <p className="text-xs text-muted-foreground font-semibold uppercase mb-2">Reason</p>
                          <p className="text-sm text-foreground/80">{eventData.cancellationReason}</p>
                        </div>
                      )}
                      {eventData.isPaid && (
                        <div className="bg-card border border-border rounded-xl p-5">
                          <p className="text-xs text-muted-foreground font-semibold uppercase mb-2">Refund Status</p>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-foreground/80">{eventData.attendeeCount} attendees notified</span>
                            <span className="text-sm font-semibold text-foreground">
                              ${(eventData.attendeeCount * (eventData.price || 0) * 0.93).toFixed(0)} / ${(eventData.attendeeCount * (eventData.price || 0)).toFixed(0)} refunded
                            </span>
                          </div>
                          <Progress value={93} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">3 refunds still processing</p>
                        </div>
                      )}

                      {/* Cancelled state actions */}
                      <div className="bg-card border border-border rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Actions</h3>
                        <div className="flex gap-2">
                          {eventData.isPaid && (
                            <Button size="sm" variant="outline" className="rounded-lg border-border" onClick={() => toast.success('Refund details loaded', { description: 'All refund transactions are shown below.' })}>
                              <DollarSign className="size-3.5 mr-2" />
                              View Refund Details
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="rounded-lg border-border" onClick={() => toast.success('Event cloned!', { description: 'A new draft has been created with the same details. Update the date and publish when ready.' })}>
                            <RefreshCw className="size-3.5 mr-2" />
                            Clone as New Event
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-lg border-red-200 text-red-600 hover:bg-red-50" onClick={() => {
                            if (confirm('Are you sure you want to permanently delete this event? This cannot be undone.')) {
                              toast.success('Event deleted');
                              onBack();
                            }
                          }}>
                            <Trash2 className="size-3.5 mr-2" />
                            Delete Event
                          </Button>
                        </div>
                      </div>

                      {/* Cancelled state AI suggestions */}
                      <div className="bg-card border border-primary/10 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Wand2Icon className="size-4 text-primary" />
                          <h3 className="text-sm font-semibold text-foreground">Suggestions</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                            <RefreshCw className="size-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-sm text-foreground/80">Want to reschedule instead? I can clone this event with a new date.</p>
                              <Button size="sm" className="mt-2 h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground shadow-none" onClick={() => toast.success('Event cloned!', { description: 'Update the date and publish when ready.' })}>
                                Clone & Reschedule
                              </Button>
                            </div>
                          </div>
                          {(eventData.attendeeCount || 0) > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                              <Mail className="size-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm text-foreground/80">Draft a cancellation notice for {eventData.attendeeCount} registered attendees?</p>
                                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs border-primary/20 text-primary" onClick={() => toast.success('Cancellation notice drafted!', { description: 'Review before sending.' })}>
                                  Draft Notice
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Speaker View: Session Info (MOCK_EVENTS_MASTER_PLAN.md §Event L) ── */}
                  {isSpeakerView && currentUser && (
                    <div className="mb-6 space-y-4">
                      <div className="bg-card border border-primary/10 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">Your Role: Speaker</Badge>
                          <span className="text-xs text-muted-foreground">Event by {eventData.creatorName}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">Your Session(s)</h3>
                        {getSpeakerSessions(eventData, currentUser.name).length > 0 ? (
                          getSpeakerSessions(eventData, currentUser.name).map(session => (
                            <div key={session.id} className="bg-muted border border-border rounded-lg p-4 mb-2">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-sm font-semibold text-foreground">{session.title}</p>
                                <span className="text-xs text-muted-foreground">{session.time} ({session.duration} min)</span>
                              </div>
                              {session.description && (
                                <p className="text-xs text-muted-foreground mb-3">{session.description}</p>
                              )}
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-7 text-xs border-border">Edit Session Description</Button>
                                <Button size="sm" variant="outline" className="h-7 text-xs border-border">Replace Slides</Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No sessions assigned to you yet.</p>
                        )}
                      </div>
                      <div className="bg-card border border-border rounded-xl p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-2">Event Summary (read-only)</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="text-xs text-muted-foreground block">Registered</span>
                            <span className="font-medium">{eventData.attendeeCount} / {eventData.capacity || 'unlimited'}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Sessions</span>
                            <span className="font-medium">{eventData.schedule?.length || 0}</span>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block">Format</span>
                            <span className="font-medium capitalize">{eventData.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Standard overview (always visible, lifecycle-aware) ── */}
                  {!isSpeakerView && (
                    <div ref={overviewRef}>
                    <EventBuilderOverviewSection
                      eventTitle={eventData.title || 'Untitled Event'}
                      eventDescription={eventDescription}
                      setEventDescription={setEventDescriptionWithWarning}
                      eventLocation={eventLocation}
                      setEventLocation={setEventLocationWithWarning}
                      eventCapacity={eventCapacity}
                      setEventCapacity={setEventCapacityWithWarning}
                      handleRegenerateField={handleRegenerateField}
                      isRegenerating={isRegenerating}
                      editingField={editingField}
                      setEditingField={setEditingField}
                      registeredCount={registeredCount}
                      waitlistCount={waitlistCount}
                      checkedInCount={checkedInCount}
                      healthScore={healthScore}
                      registrationRate={registrationRate}
                      attendancePredict={attendancePredict}
                      onCreateCommunity={onCreateCommunity}
                      isDraft={isDraft}
                      lifecycle={lifecycle}
                      eventDate={eventData.date}
                      eventTime={eventData.time}
                      eventType={eventData.type}
                      onCoverImageChange={setHasCoverImage}
                      triggerCoverUpload={triggerCoverUpload}
                      onTriggerCoverUploadDone={() => setTriggerCoverUpload(false)}
                      sessionCount={scheduleItems.length}
                      speakerCount={eventData.speakers?.length || 0}
                      ticketCount={tickets.length}
                      onPreview={() => setShowPreview(true)}
                      onPublish={() => setShowPublishDialog(true)}
                      onSharePreview={() => {
                        const previewUrl = `https://leapspace.ai/events/${eventData.id || 'preview'}/draft-preview?token=${Math.random().toString(36).substr(2, 8)}`;
                        navigator.clipboard.writeText(previewUrl);
                        toast.success('Preview link copied!', { description: 'Share this link with collaborators to preview your draft.' });
                      }}
                      onGenerateQR={() => setShowQRCodeDialog(true)}
                      onDuplicate={() => toast.success('Event duplicated!', { description: 'A copy has been created as a new draft.' })}
                    />
                    </div>
                  )}
                </>
              )}

              {mainView === 'schedule' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-foreground font-semibold text-lg">Event Schedule</h2>
                      <p className="text-sm text-muted-foreground">Build your event agenda. Times update automatically.</p>
                    </div>
                    <div className="flex gap-2">
                      {isDraft && scheduleItems.length === 0 && (
                        <Button size="sm" variant="outline" className="rounded-lg border-border text-primary hover:bg-primary/10" onClick={handleGenerateAgenda}>
                          <Wand2Icon className="size-3.5 mr-2" />
                          AI Generate Agenda
                        </Button>
                      )}
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={handleAddSession}>
                        <Plus className="size-3.5 mr-2" />
                        Add Session
                      </Button>
                    </div>
                  </div>

                  {scheduleItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="size-20 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-6">
                        <Clock className="size-9 text-muted-foreground/40" />
                      </div>
                      <h3 className="text-foreground mb-2">No sessions yet</h3>
                      <p className="text-sm text-muted-foreground max-w-sm mb-6">
                        Build your event agenda by adding sessions, breaks, and keynotes. Or let AI generate a draft agenda for you.
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" className="border-border text-primary hover:bg-primary/10" onClick={handleGenerateAgenda}>
                          <Wand2Icon className="size-4 mr-2" />
                          AI Generate Agenda
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-none" onClick={handleAddSession}>
                          <Plus className="size-4 mr-2" />
                          Add First Session
                        </Button>
                      </div>
                    </div>
                  ) : (
                  <div className="space-y-3">
                    {scheduleItems.map((session, idx) => {
                      const isEditing = editingSessionId === session.id;
                      return (
                        <div key={session.id} className={`bg-card border rounded-xl p-5 transition-all shadow-none ${isEditing ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-border hover:border-primary/20'}`}>
                          <div className="flex items-start gap-4">
                            {/* Time Column */}
                            <div className="w-24 flex-shrink-0 pt-1">
                              {isEditing ? (
                                <Input
                                  type="time"
                                  value={session.time}
                                  onChange={(e) => handleUpdateSession(session.id, 'time', e.target.value)}
                                  className="h-8 text-sm"
                                />
                              ) : (
                                <div className="text-center">
                                  <div className="text-lg font-bold text-primary">{session.time}</div>
                                  <div className="text-xs text-muted-foreground font-medium">{session.duration} min</div>
                                </div>
                              )}
                            </div>

                            {/* Content Column */}
                            <div className="flex-1 min-w-0 space-y-3">
                              {isEditing ? (
                                <>
                                  <Input
                                    value={session.title}
                                    onChange={(e) => handleUpdateSession(session.id, 'title', e.target.value)}
                                    placeholder="Session Title"
                                    className="font-semibold"
                                  />
                                  <Textarea
                                    value={session.description}
                                    onChange={(e) => handleUpdateSession(session.id, 'description', e.target.value)}
                                    placeholder="Description"
                                    className="text-sm min-h-[60px]"
                                  />
                                  <div className="flex gap-4">
                                    <div className="w-1/3">
                                      <Label className="text-xs mb-1.5 block">Duration (min)</Label>
                                      <Input
                                        type="number"
                                        value={session.duration}
                                        onChange={(e) => handleUpdateSession(session.id, 'duration', parseInt(e.target.value) || 0)}
                                        className="h-8"
                                      />
                                    </div>
                                    <div className="w-1/3">
                                      <Label className="text-xs mb-1.5 block">Type</Label>
                                      <select
                                        value={session.type}
                                        onChange={(e) => handleUpdateSession(session.id, 'type', e.target.value)}
                                        className="w-full h-8 rounded-md border border-input bg-background px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                      >
                                        <option value="session">Session</option>
                                        <option value="keynote">Keynote</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="break">Break</option>
                                      </select>
                                    </div>
                                    <div className="w-1/3">
                                      <Label className="text-xs mb-1.5 block">Room / Location</Label>
                                      <Input
                                        value={session.room || ''}
                                        onChange={(e) => handleUpdateSession(session.id, 'room', e.target.value)}
                                        placeholder="e.g. Room A"
                                        className="h-8"
                                      />
                                    </div>
                                  </div>
                                  {/* Speakers */}
                                  <div>
                                    <Label className="text-xs mb-1.5 block">Speakers</Label>
                                    <div className="flex gap-2">
                                      <Input
                                        value={(session.speakers || []).join(', ')}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          const speakerList = val ? val.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
                                          handleUpdateSession(session.id, 'speakers', speakerList);
                                        }}
                                        placeholder="Comma-separated, e.g. Sarah Chen, Marcus Webb"
                                        className="h-8 flex-1"
                                      />
                                      {eventData.speakers && eventData.speakers.length > 0 && (
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <Button variant="outline" size="sm" className="h-8 px-2 border-border text-xs">
                                              <UserPlus className="size-3 mr-1" />
                                              Pick
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-56 p-2" align="end">
                                            <div className="text-xs text-muted-foreground mb-2 px-1">Event Speakers</div>
                                            <div className="space-y-1 max-h-40 overflow-y-auto">
                                              {eventData.speakers.map((spk: any) => {
                                                const currentSpeakers = session.speakers || [];
                                                const isSelected = currentSpeakers.includes(spk.name);
                                                return (
                                                  <button
                                                    key={spk.id}
                                                    className={`w-full text-left px-2 py-1.5 rounded text-sm flex items-center gap-2 transition-colors ${isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-accent text-foreground'}`}
                                                    onClick={() => {
                                                      const updated = isSelected
                                                        ? currentSpeakers.filter((n: string) => n !== spk.name)
                                                        : [...currentSpeakers, spk.name];
                                                      handleUpdateSession(session.id, 'speakers', updated);
                                                    }}
                                                  >
                                                    {isSelected ? <Check className="size-3 text-primary" /> : <Plus className="size-3 text-muted-foreground" />}
                                                    <span>{spk.name}</span>
                                                    <span className="text-[10px] text-muted-foreground ml-auto">{spk.role}</span>
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          </PopoverContent>
                                        </Popover>
                                      )}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <h3 className="font-semibold text-foreground">{session.title}</h3>
                                      {session.type === 'break' && <Badge variant="secondary" className="text-[10px] h-5 px-1.5">Break</Badge>}
                                      {session.type === 'workshop' && <Badge className="text-[10px] h-5 px-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">Workshop</Badge>}
                                      {session.room && (
                                        <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-border text-muted-foreground">
                                          <MapPin className="size-2.5 mr-0.5" />{session.room}
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{session.description}</p>
                                  </div>
                                  
                                  {session.speakers && session.speakers.length > 0 && (
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Users className="size-3" />
                                      <span>{session.speakers.join(', ')}</span>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>

                            {/* Actions Column */}
                            <div className="flex flex-col gap-1">
                              {isEditing ? (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 text-xs w-full" onClick={() => setEditingSessionId(null)}>
                                  Done
                                </Button>
                              ) : (
                                <>
                                  <div className="flex gap-1 mb-1">
                                    <Button 
                                      size="icon" 
                                      variant="ghost" 
                                      className="h-7 w-7 rounded-md hover:bg-accent"
                                      disabled={idx === 0}
                                      onClick={() => handleMoveSession(idx, 'up')}
                                    >
                                      <ChevronDown className="size-3.5 rotate-180" />
                                    </Button>
                                    <Button 
                                      size="icon" 
                                      variant="ghost" 
                                      className="h-7 w-7 rounded-md hover:bg-accent"
                                      disabled={idx === scheduleItems.length - 1}
                                      onClick={() => handleMoveSession(idx, 'down')}
                                    >
                                      <ChevronDown className="size-3.5" />
                                    </Button>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => setEditingSessionId(session.id)}>
                                      <Edit className="size-3.5" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-red-600 hover:bg-red-50" onClick={() => handleDeleteSession(session.id)}>
                                      <Trash2 className="size-3.5" />
                                    </Button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                  </div>
                  )}
                </div>
              )}

              {mainView === 'attendees' && (
                <div className="space-y-6">
                  {/* Sub-tab navigation */}
                  <div className="flex border-b border-border">
                    {[
                      { id: 'attendees', label: 'Attendees' },
                      { id: 'waitlist', label: `Waitlist${waitlistEntries.length > 0 ? ` (${waitlistEntries.length})` : ''}` },
                      { id: 'speakers', label: 'Speakers & Team' },
                      { id: 'form', label: 'Registration Form' },
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setAttendeesSubTab(tab.id as 'attendees' | 'waitlist' | 'speakers' | 'form')}
                        className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                          attendeesSubTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Speakers & Team sub-tab */}
                  {attendeesSubTab === 'speakers' && (
                    <SpeakersTeamTable customRoles={customRoles} />
                  )}

                  {/* Waitlist sub-tab */}
                   {attendeesSubTab === 'waitlist' && (
                     <WaitlistTab
                       waitlistEntries={waitlistEntries}
                       onApprove={handleWaitlistApprove}
                       onBulkApprove={handleBulkWaitlistApprove}
                       onReject={handleWaitlistReject}
                       confirmedCount={attendees.filter((a: any) => a.status === 'confirmed').length}
                       capacity={eventCapacity || '100'}
                       waitlistConfig={waitlistConfig}
                       onToggleWaitlistLock={handleToggleWaitlistLock}
                       onConfigureWaitlist={handleOpenWaitlistConfig}
                     />
                   )}

                   {/* Registration Form sub-tab */}
                  {attendeesSubTab === 'form' && (
                    isDraft && !hasRegistrationForm ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="size-16 bg-muted rounded-xl flex items-center justify-center mb-5">
                          <FileText className="size-8 text-muted-foreground/40" />
                        </div>
                        <h3 className="text-foreground mb-2">No registration form yet</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mb-2">
                          Currently using: <span className="font-semibold text-foreground">Default (Name + Email only)</span>
                        </p>
                        <p className="text-sm text-muted-foreground max-w-sm mb-6">
                          Add custom fields to collect additional info from attendees — company, dietary needs, experience level, and more.
                        </p>
                        <div className="flex gap-3">
                          <Button variant="outline" className="rounded-lg border-border" onClick={() => { toast.success('Using default form with Name and Email.'); setHasRegistrationForm(true); }}>
                            Keep Default
                          </Button>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={() => { setHasRegistrationForm(true); }}>
                            <Plus className="size-3.5 mr-2" />
                            Customize Form
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <RegistrationFormBuilder onUpdate={(fields) => { setHasRegistrationForm(true); if (fields) setCustomRegistrationFields(fields); }} />
                    )
                  )}

                  {/* Attendees sub-tab */}
                  {attendeesSubTab === 'attendees' && (
                  <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-foreground font-semibold text-lg">Attendee Management</h2>
                      <p className="text-sm text-muted-foreground">
                        {attendees.filter((a: any) => a.status === 'confirmed').length} / {eventCapacity || '100'} confirmed &middot; {attendees.filter((a: any) => a.status === 'pending' || a.status === 'waitlist').length} pending{waitlistEntries.length > 0 ? ` \u00B7 ${waitlistEntries.length} waitlisted` : ''}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {attendees.length > 0 && (
                        <Button size="sm" variant="outline" className="rounded-lg border-border" onClick={handleExportAttendees}>
                          <Download className="size-3.5 mr-2" />
                          Export CSV
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="rounded-lg border-border" onClick={() => setShowBulkImportModal(true)}>
                        <Upload className="size-3.5 mr-2" />
                        Bulk Import
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={handleAddAttendee}>
                        <UserPlus className="size-3.5 mr-2" />
                        Add Attendee
                      </Button>
                    </div>
                  </div>

                  {attendees.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="size-20 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-6">
                        <Users className="size-9 text-muted-foreground/40" />
                      </div>
                      <h3 className="text-foreground mb-2">No registrations yet</h3>
                      <p className="text-sm text-muted-foreground max-w-sm mb-6">
                        Once you publish your event, registrations will appear here. You can also manually add attendees.
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" className="border-border" onClick={handleAddAttendee}>
                          <UserPlus className="size-4 mr-2" />
                          Add Manually
                        </Button>
                        {isDraft && (
                          <Button variant="outline" className="border-border text-muted-foreground">
                            <Share2 className="size-4 mr-2" />
                            Copy Invite Link
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                  <>

                  {/* Filter Tabs */}
                  <div className="flex border-b border-border">
                    <button
                      onClick={() => setAttendeeFilter('all')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        attendeeFilter === 'all' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setAttendeeFilter('pending')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        attendeeFilter === 'pending' ? 'border-orange-500 text-orange-600' : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Pending Review
                      {attendees.filter(a => a.status === 'pending').length > 0 && (
                        <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-1.5 py-0.5 rounded-full">
                          {attendees.filter(a => a.status === 'pending').length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setAttendeeFilter('approved')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        attendeeFilter === 'approved' ? 'border-green-500 text-green-600' : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => setAttendeeFilter('rejected')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        attendeeFilter === 'rejected' ? 'border-red-500 text-red-600' : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Rejected
                    </button>
                  </div>

                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted border-b border-border">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Applicant</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                          <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Application</th>
                          <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredAttendees.map((attendee) => {
                          const rows = [
                            <tr key={attendee.id} className={`transition-colors ${selectedApplication === attendee.id ? 'bg-primary/5' : 'hover:bg-accent'}`}>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/10">
                                    {attendee.name[0]}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-foreground">{attendee.name}</p>
                                    <p className="text-xs text-muted-foreground">{attendee.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <Badge 
                                  variant="secondary" 
                                  className={`rounded-md font-medium text-[10px] px-2 py-0.5 border ${
                                    attendee.status === 'confirmed' 
                                      ? 'bg-green-50 text-green-700 border-green-100' 
                                      : attendee.status === 'pending' || attendee.status === 'waitlist'
                                      ? 'bg-orange-50 text-orange-700 border-orange-100'
                                      : 'bg-red-50 text-red-600 border-red-100'
                                  }`}
                                >
                                  {attendee.status === 'confirmed' ? 'Approved' : attendee.status === 'waitlist' ? 'Pending' : attendee.status === 'pending' ? 'Pending' : 'Rejected'}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                {(attendee.status === 'pending' || attendee.status === 'waitlist') ? (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="h-7 text-xs border-primary/20 text-primary hover:bg-primary/10"
                                    onClick={() => setSelectedApplication(selectedApplication === attendee.id ? null : attendee.id)}
                                  >
                                    {selectedApplication === attendee.id ? 'Hide Application' : 'Review Application'}
                                  </Button>
                                ) : (
                                  <span className="text-xs text-muted-foreground">Processed</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                {(attendee.status === 'pending' || attendee.status === 'waitlist') ? (
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      size="sm" 
                                      className="h-7 px-2 bg-green-600 hover:bg-green-700 text-white text-xs"
                                      onClick={() => handleUpdateAttendeeStatus(attendee.id, 'confirmed')}
                                    >
                                      <Check className="size-3 mr-1" />
                                      Approve
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="h-7 px-2 text-red-600 border-red-200 hover:bg-red-50 text-xs"
                                      onClick={() => handleUpdateAttendeeStatus(attendee.id, 'rejected')}
                                    >
                                      <X className="size-3 mr-1" />
                                      Reject
                                    </Button>
                                  </div>
                                ) : (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                        <MoreVertical className="size-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={() => handleOpenEmailModal(attendee)}>
                                        <Mail className="size-4 mr-2" />
                                        Send Email
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Ticket className="size-4 mr-2" />
                                        Resend Ticket
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-600">
                                        <XCircle className="size-4 mr-2" />
                                        Revoke Access
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </td>
                            </tr>
                          ];

                          if (selectedApplication === attendee.id) {
                            rows.push(
                              <tr key={`${attendee.id}-details`} className="bg-primary/5">
                                <td colSpan={4} className="px-6 py-4 pt-0">
                                  <div className="bg-card border border-primary/10 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-foreground mb-2">Application Details</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-xs text-muted-foreground font-medium mb-1">Role / LinkedIn</p>
                                        <p className="text-sm text-foreground">
                                          {attendee.application?.role || 'Developer'} • 
                                          <a href="#" className="text-primary hover:underline ml-1">{attendee.application?.linkedin || 'View Profile'}</a>
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground font-medium mb-1">Reason for Joining</p>
                                        <p className="text-sm text-foreground italic">
                                          "{attendee.application?.reason || 'I am very interested in learning more about this topic to apply it in my current role.'}"
                                        </p>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-2 pt-3 border-t border-border">
                                       <Button 
                                        size="sm" 
                                        variant="outline"
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                        onClick={() => handleUpdateAttendeeStatus(attendee.id, 'rejected')}
                                      >
                                        Reject
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => handleUpdateAttendeeStatus(attendee.id, 'confirmed')}
                                      >
                                        Approve & Send Ticket
                                      </Button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            );
                          }
                          return rows;
                        })}
                      </tbody>
                    </table>
                    
                    {filteredAttendees.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="size-10 text-muted-foreground/40 mx-auto mb-3" />
                        <p className="text-muted-foreground font-medium">No attendees found in this filter</p>
                      </div>
                    )}
                  </div>
                  </>
                  )}
                  </>
                  )}
                </div>
              )}

              {mainView === 'tickets' && (
                <TicketManager
                  tickets={tickets}
                  onTicketsChange={setTickets}
                  discountCodes={discountCodes}
                  onDiscountCodesChange={setDiscountCodes}
                  isDraft={isDraft}
                  isPublished={localPublished && !isDraft}
                  pricingMode={pricingMode}
                  pricingModeLocked={pricingModeLocked}
                  eventCapacity={parseInt(eventCapacity) || 100}
                  registeredCount={registeredCount}
                  onLogChange={logFieldChange}
                  onRequestConfirmation={(pending) => {
                    setPendingEdit(pending);
                    setShowEditConfirmation(true);
                  }}
                  getCurrentUserRole={getCurrentUserRole}
                  currentUser={currentUser}
                  createEditWarningConfig={createEditWarningConfig}
                />
              )}
              {/* LEGACY TICKETS SECTION REPLACED BY TicketManager - START REMOVAL */}
              {false && (
                <div className="space-y-8">
                  {isDraft && tickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="size-16 bg-muted rounded-xl flex items-center justify-center mb-5">
                        <Ticket className="size-8 text-muted-foreground/40" />
                      </div>
                      <h3 className="text-foreground mb-2">Pricing not configured</h3>
                      <p className="text-sm text-muted-foreground max-w-sm mb-2">
                        Currently set to: <span className="font-semibold text-foreground">Free Event</span>
                      </p>
                      <p className="text-sm text-muted-foreground max-w-sm mb-6">
                        Want to monetize? Set up paid ticket tiers with different access levels and pricing.
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" className="rounded-lg border-border" onClick={() => { toast.success('Event will remain free.'); }}>
                          Keep Free
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={handleAddTicket}>
                          <Plus className="size-3.5 mr-2" />
                          Add Paid Tickets
                        </Button>
                      </div>
                    </div>
                  ) : (
                  <>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                          <h2 className="text-foreground font-semibold text-lg">Ticket Tiers</h2>
                          <p className="text-sm text-muted-foreground">Manage ticket types and pricing for your event</p>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={handleAddTicket}>
                        <Plus className="size-3.5 mr-2" />
                        Add Ticket Type
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {tickets.map((ticket, idx) => (
                        <div key={ticket.id} className="bg-card p-6 rounded-xl border border-border hover:border-primary/20 transition-colors relative group">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                               <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                 <Ticket className="size-5" />
                               </div>
                               <div>
                                 <h3 className="font-semibold text-foreground">{ticket.name || 'New Ticket'}</h3>
                                 <p className="text-xs text-muted-foreground">{ticket.description || 'No description'}</p>
                               </div>
                            </div>
                            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 text-sm font-semibold px-2.5 py-0.5">
                              ${ticket.price}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4 bg-muted p-3 rounded-lg border border-border">
                             <div>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Quantity</p>
                                <p className="font-semibold text-foreground">{ticket.quantity} seats</p>
                             </div>
                             <div>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-1">Status</p>
                                <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
                                  <CheckCircle className="size-3.5" />
                                  Active
                                </div>
                             </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1 text-xs h-8 border-border hover:bg-accent text-foreground font-medium" onClick={() => handleEditTicket(ticket)}>
                              <Edit className="size-3.5 mr-1.5" />
                              Edit Details
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs h-8 w-8 px-0 text-red-600 hover:bg-red-50 border-border hover:border-red-200 transition-colors" onClick={() => {
                              const deletedTicket = ticket;
                              if (localPublished && !isDraft) {
                                const role = getCurrentUserRole();
                                const config = createEditWarningConfig('ticket_delete', deletedTicket.name, 'Deleted', registeredCount);
                                config.fieldLabel = `Delete Ticket "${deletedTicket.name}"`;
                                config.severity = 'high';
                                config.changedBy = { name: currentUser?.name || 'You', email: currentUser?.email || 'you@example.com', role };
                                setPendingEdit({
                                  config,
                                  onConfirm: (sendNotification) => {
                                    setTickets(tickets.filter(t => t.id !== deletedTicket.id));
                                    logFieldChange('ticket_delete', `Ticket "${deletedTicket.name}"`, `$${deletedTicket.price}`, 'Deleted', sendNotification, role);
                                    toast.success('Ticket deleted & logged');
                                  }
                                });
                                setShowEditConfirmation(true);
                              } else {
                                setTickets(tickets.filter(t => t.id !== deletedTicket.id));
                              }
                            }}>
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add New Ticket Placeholder Card */}
                      <button 
                          onClick={handleAddTicket}
                          className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all group min-h-[200px]"
                      >
                          <div className="size-12 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                              <Plus className="size-6 text-muted-foreground/40 group-hover:text-primary" />
                          </div>
                          <span className="font-medium text-sm">Create New Ticket Tier</span>
                      </button>
                    </div>
                  </div>

                  {/* Discount Codes Section */}
                  <div className="space-y-6 pt-6 border-t border-border">

                     <div className="flex items-center justify-between">
                      <div>
                          <h2 className="text-foreground font-semibold text-lg">Discount Codes</h2>
                          <p className="text-sm text-muted-foreground">Create promo codes for marketing campaigns</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-border" onClick={handleAddDiscount}>
                        <Plus className="size-3.5 mr-2" />
                        New Code
                      </Button>
                    </div>
                    
                    <div className="bg-card border border-border rounded-xl overflow-hidden">
                       <table className="w-full">
                          <thead className="bg-muted border-b border-border">
                             <tr>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Code</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Discount</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Usage</th>
                                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                             {discountCodes.map((discount) => (
                                <tr key={discount.id} className="hover:bg-accent">
                                   <td className="px-6 py-4">
                                      <div className="flex items-center gap-2">
                                         <Badge variant="outline" className="bg-primary/10 text-primary border-primary/10 font-mono">
                                            {discount.code}
                                         </Badge>
                                      </div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <span className="text-sm font-medium text-foreground">
                                         {discount.type === 'percent' ? `${discount.value}% OFF` : `$${discount.value} OFF`}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4">
                                      <div className="flex items-center gap-2">
                                         <Progress value={(discount.used / discount.limit) * 100} className="w-24 h-2" />
                                         <span className="text-xs text-muted-foreground">{discount.used}/{discount.limit}</span>
                                      </div>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                      <div className="flex justify-end gap-2">
                                         <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleEditDiscount(discount)}>
                                            <Edit2 className="size-4" />
                                         </Button>
                                         <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-red-600" onClick={() => setDiscountCodes(discountCodes.filter(d => d.id !== discount.id))}>
                                            <Trash2 className="size-4" />
                                         </Button>
                                      </div>
                                   </td>
                                </tr>
                             ))}
                             {discountCodes.length === 0 && (
                                <tr>
                                   <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground text-sm">
                                      No discount codes created yet.
                                   </td>
                                </tr>
                             )}
                          </tbody>
                       </table>
                    </div>
                  </div>
                  </>
                  )}
                </div>
              )}

              {mainView === 'discussion' && (
                <DiscussionChannelV2 />
              )}

              {mainView === 'resources' && (
                <ResourcesPanel isDraft={isDraft} />
              )}

              {mainView === 'reviews' && (
                <ReviewsManagement eventTitle={eventData.title || 'Untitled Event'} />
              )}
              
              {mainView === 'analytics' && (
                <div className="space-y-6">
                  {isDraft ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="size-20 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-6">
                        <BarChart3 className="size-9 text-muted-foreground/40" />
                      </div>
                      <h3 className="text-foreground mb-2">Analytics available after publishing</h3>
                      <p className="text-sm text-muted-foreground max-w-sm mb-6">
                        Once your event is published and people start registering, you'll see real-time analytics on attendance, engagement, and revenue.
                      </p>
                      <Badge variant="secondary" className="bg-muted text-muted-foreground border-border">
                        <Activity className="size-3 mr-1.5" />
                        {completionPercent}% setup complete
                      </Badge>
                    </div>
                  ) : (
                  <>
                   <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-foreground font-semibold text-lg">Post-Event Analytics</h2>
                        <p className="text-sm text-muted-foreground">Insights on attendance, engagement, and revenue</p>
                      </div>
                      <div className="flex gap-2">
                         <Button size="sm" variant="outline" className="h-9">
                            Last 7 Days
                            <ChevronDown className="size-3.5 ml-2" />
                         </Button>
                         <Button size="sm" variant="outline" className="h-9">
                            <Download className="size-3.5 mr-2" />
                            Export Report
                         </Button>
                      </div>
                   </div>
                   
                   {/* Top Stats */}
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-card p-5 rounded-xl border border-border">
                         <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase">Total Revenue</h3>
                            <DollarSign className="size-4 text-primary" />
                         </div>
                         <p className="text-2xl font-bold text-foreground">$12,450</p>
                         <p className="text-xs text-primary mt-1 flex items-center">
                            <TrendingUp className="size-3 mr-1" />
                            +15% from last event
                         </p>
                      </div>
                      <div className="bg-card p-5 rounded-xl border border-border">
                         <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase">Check-in Rate</h3>
                            <UserCheck className="size-4 text-primary" />
                         </div>
                         <p className="text-2xl font-bold text-foreground">
                            {Math.round((checkedInCount / Math.max(1, registeredCount)) * 100)}%
                         </p>
                         <p className="text-xs text-muted-foreground mt-1">
                            {checkedInCount} of {registeredCount} attended
                         </p>
                      </div>
                      <div className="bg-card p-5 rounded-xl border border-border">
                         <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase">Engagement</h3>
                            <Activity className="size-4 text-primary" />
                         </div>
                         <p className="text-2xl font-bold text-foreground">8.5/10</p>
                         <p className="text-xs text-primary mt-1 flex items-center">
                            High interactivity
                         </p>
                      </div>
                      <div className="bg-card p-5 rounded-xl border border-border">
                         <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-semibold text-muted-foreground uppercase">Tickets Sold</h3>
                            <Ticket className="size-4 text-primary" />
                         </div>
                         <p className="text-2xl font-bold text-foreground">{registeredCount}</p>
                         <p className="text-xs text-muted-foreground mt-1">
                            {tickets.reduce((acc, t) => acc + t.quantity, 0) - registeredCount} remaining
                         </p>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-card p-6 rounded-xl border border-border col-span-2">
                         <h3 className="text-sm font-semibold text-foreground mb-6">Attendance Overview</h3>
                         <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                               <BarChart data={[
                                  { name: 'Total', value: registeredCount, id: 'bar-total' },
                                  { name: 'Checked In', value: checkedInCount, id: 'bar-checkedin' },
                                  { name: 'No Show', value: Math.max(0, registeredCount - checkedInCount), id: 'bar-noshow' },
                                  { name: 'Waitlist', value: waitlistCount, id: 'bar-waitlist' },
                               ]}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="fill-muted-foreground" dy={10} />
                                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} className="fill-muted-foreground" domain={[0, (dataMax: number) => Math.max(dataMax, 10)]} allowDecimals={false} />
                                  <RechartsTooltip cursor={{ fill: 'hsl(var(--muted))' }} contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: 'none' }} />
                                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={50} />
                               </BarChart>
                            </ResponsiveContainer>
                         </div>
                      </div>
                      
                      <div className="bg-card p-6 rounded-xl border border-border">
                         <h3 className="text-sm font-semibold text-foreground mb-4">Live Check-ins</h3>
                         <div className="space-y-4">
                            {attendees.filter(a => a.checkIn).slice(0, 5).map(attendee => (
                               <div key={attendee.id} className="flex items-start gap-3">
                                  <div className="size-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                                     {attendee.name[0]}
                                  </div>
                                  <div>
                                     <p className="text-sm font-medium text-foreground">{attendee.name}</p>
                                     <p className="text-xs text-muted-foreground">Checked in at {attendee.checkIn?.split(' ')[1]}</p>
                                  </div>
                               </div>
                            ))}
                            {attendees.filter(a => a.checkIn).length === 0 && (
                               <p className="text-sm text-muted-foreground text-center py-4">No check-ins yet</p>
                            )}
                         </div>
                      </div>
                   </div>
                  </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
      
      {showPreview && (
        <PreviewModal 
            open={showPreview} 
            onOpenChange={setShowPreview}
            eventData={eventData}
            discountCodes={discountCodes}
        />
      )}
      
      <LinkToExistingCommunityModal 
        open={showLinkToCommunityModal} 
        onOpenChange={setShowLinkToCommunityModal}
      />

      {/* Old Ticket Editing Modal — replaced by TicketManager */}
      {false && <Dialog open={isTicketModalOpen} onOpenChange={setIsTicketModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Ticket Tier</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Ticket Name</Label>
              <Input
                id="name"
                value={currentTicket?.name || ''}
                onChange={(e) => setCurrentTicket(prev => prev ? { ...prev, name: e.target.value } : null)}
                placeholder="e.g. Early Bird"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={currentTicket?.price || 0}
                  onChange={(e) => setCurrentTicket(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={currentTicket?.quantity || 0}
                  onChange={(e) => setCurrentTicket(prev => prev ? { ...prev, quantity: parseInt(e.target.value) || 0 } : null)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentTicket?.description || ''}
                onChange={(e) => setCurrentTicket(prev => prev ? { ...prev, description: e.target.value } : null)}
                placeholder="Briefly describe what's included..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTicketModalOpen(false)}>Cancel</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveTicket}>Save Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>}
      
      {/* Discount Code Modal */}
      <Dialog open={isDiscountModalOpen} onOpenChange={setIsDiscountModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Discount Code</DialogTitle>
            <DialogDescription>Create a code for your attendees.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Code (Uppercase)</Label>
              <Input
                id="code"
                value={currentDiscount?.code || ''}
                onChange={(e) => setCurrentDiscount(prev => prev ? { ...prev, code: e.target.value.toUpperCase() } : null)}
                placeholder="e.g. SAVE20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <select 
                    id="type"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors"
                    value={currentDiscount?.type || 'percent'}
                    onChange={(e) => setCurrentDiscount(prev => prev ? { ...prev, type: e.target.value as 'percent' | 'fixed' } : null)}
                >
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Amount</Label>
                <Input
                  id="value"
                  type="number"
                  value={currentDiscount?.value || 0}
                  onChange={(e) => setCurrentDiscount(prev => prev ? { ...prev, value: parseFloat(e.target.value) || 0 } : null)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="limit">Usage Limit</Label>
              <Input
                id="limit"
                type="number"
                value={currentDiscount?.limit || 0}
                onChange={(e) => setCurrentDiscount(prev => prev ? { ...prev, limit: parseInt(e.target.value) || 0 } : null)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDiscountModalOpen(false)}>Cancel</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveDiscount}>Save Code</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Email Automation Modal */}
      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Email</DialogTitle>
            <DialogDescription>Sending to: <span className="font-semibold text-foreground">{emailRecipient?.name}</span> ({emailRecipient?.email})</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
               <Label>Subject</Label>
               <Input 
                 value={emailSubject}
                 onChange={(e) => setEmailSubject(e.target.value)}
                 placeholder="Email subject..."
               />
            </div>
            <div className="space-y-2">
               <Label>Message</Label>
               <Textarea 
                 className="min-h-[150px]"
                 value={emailBody}
                 onChange={(e) => setEmailBody(e.target.value)}
                 placeholder="Type your message here..."
               />
               <p className="text-xs text-muted-foreground">
                  Note: This will use your default Leapy email sender. Connect your own SMTP in Settings for custom branding.
               </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>Cancel</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSendEmail}>
               <Send className="size-3.5 mr-2" />
               Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Modal */}
      <InviteModal
        open={showInviteModal}
        onOpenChange={setShowInviteModal}
        eventTitle={eventData.title || 'Untitled Event'}
        eventDate={eventData.date}
        eventTime={eventData.time}
        eventId={eventData.id}
      />

      {/* Add Attendee Modal */}
      <AddAttendeeModal
        open={showAddAttendeeModal}
        onOpenChange={setShowAddAttendeeModal}
        tickets={tickets}
        isPaidEvent={regIsPaid || tickets.some(t => t.type === 'paid')}
        onConfirm={(data) => {
          const newAttendee = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            status: data.status,
            ticket: data.ticket,
            checkedIn: false,
            registeredAt: new Date().toISOString().split('T')[0],
            isComped: data.isComped,
            application: data.status === 'pending' ? {
              reason: 'Manually added by admin',
              linkedin: '',
              role: ''
            } : undefined
          };
          setAttendees([newAttendee, ...attendees]);
          setShowAddAttendeeModal(false);
          if (data.sendInvite) {
            toast.success(`${data.name} added & invitation sent`, { description: `Ticket: ${data.ticket}` });
          } else {
            toast.success(`${data.name} added successfully`, { description: `Ticket: ${data.ticket}` });
          }
        }}
      />

      {/* Bulk Import Modal */}
      <BulkImportModal
        open={showBulkImportModal}
        onOpenChange={setShowBulkImportModal}
        tickets={tickets}
        onConfirm={(entries, ticketName) => {
          const newAttendees = entries.map((entry, i) => ({
            id: (Date.now() + i).toString(),
            name: entry.name,
            email: entry.email,
            status: 'confirmed' as const,
            ticket: ticketName,
            checkedIn: false,
            registeredAt: new Date().toISOString().split('T')[0],
          }));
          setAttendees([...newAttendees, ...attendees]);
          toast.success(`${newAttendees.length} attendees imported successfully`);
        }}
      />

      {/* Publish Confirmation Dialog (Multi-step: Review → Confirm) */}
      <Dialog open={showPublishDialog} onOpenChange={(open) => { setShowPublishDialog(open); if (!open) { setShowSchedulePicker(false); setPublishStep('review'); } }}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>{publishStep === 'review' ? 'Pre-Publish Review' : 'Confirm Publish'}</DialogTitle>
            <DialogDescription>
              {publishStep === 'review' ? 'Review your event setup before going live.' : 'Your event is ready. Choose when to publish.'}
            </DialogDescription>
          </DialogHeader>

          {publishStep === 'review' ? (
            <>
              <div className="space-y-4 py-2">
                {/* Event Summary Card */}
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <h4 className="text-foreground text-sm">{eventData.title || 'Untitled Event'}</h4>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3" />
                      {eventData.date ? new Date(eventData.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No date set'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3" />
                      {eventData.time || 'No time set'}
                    </span>
                    {eventData.type && (
                      <span className="flex items-center gap-1.5">
                        {eventData.type === 'virtual' ? <Video className="size-3" /> : <MapPin className="size-3" />}
                        {eventData.type === 'virtual' ? 'Virtual' : eventData.type === 'hybrid' ? 'Hybrid' : 'In-Person'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Setup Checklist Review */}
                <div className="space-y-1.5">
                  <h4 className="text-sm text-foreground mb-2">Setup Checklist</h4>
                  {[
                    { label: 'Event title', done: liveChecklist.hasTitle },
                    { label: 'Description', done: liveChecklist.hasDescription },
                    { label: 'Date & time', done: liveChecklist.hasDateTime },
                    { label: 'Cover image', done: liveChecklist.hasCoverImage },
                    { label: 'Agenda / schedule', done: liveChecklist.hasAgenda },
                    { label: 'Speakers', done: liveChecklist.hasSpeakers },
                    { label: tickets.length > 0 ? `Tickets — ${derivePricingMode(tickets) === 'paid' ? 'Paid' : 'Free'} (${tickets.length} tier${tickets.length !== 1 ? 's' : ''})` : 'Tickets / pricing', done: liveChecklist.hasTickets },
                    { label: 'Registration settings', done: hasRegistrationConfig },
                    { label: 'Registration form', done: liveChecklist.hasRegistrationForm },
                    { label: 'Location / meeting link', done: liveChecklist.hasLocation },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      {item.done ? (
                        <CheckCircle className="size-3.5 text-primary flex-shrink-0" />
                      ) : (
                        <div className="size-3.5 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${item.done ? 'text-muted-foreground' : 'text-foreground'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Registration & Pricing Summary */}
                <div className="bg-muted rounded-lg p-3 space-y-1.5">
                  <h4 className="text-xs text-muted-foreground uppercase tracking-normal">Registration & Pricing</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded shadow-none text-xs">
                      {regVisibility === 'public' ? 'Public' : 'Private (invite only)'}
                    </Badge>
                    <Badge variant="secondary" className="rounded shadow-none text-xs">
                      {regAccessType === 'open' ? 'Open Registration' : regAccessType === 'waitlist' ? 'Waitlist' : 'Application Required'}
                    </Badge>
                    <Badge variant="secondary" className="rounded shadow-none text-xs bg-primary/10 text-primary border-primary/20">
                      {tickets.length === 0 ? 'Free Event' : derivePricingMode(tickets) === 'paid' ? `Paid — ${tickets.length} tier${tickets.length !== 1 ? 's' : ''}` : 'Free Event'}
                    </Badge>
                  </div>
                </div>

                {/* Pricing lock notice */}
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground flex items-start gap-2">
                    <AlertCircle className="size-3.5 flex-shrink-0 mt-0.5" />
                    <span>
                      {tickets.length === 0 || derivePricingMode(tickets) === 'free'
                        ? 'This event will publish as Free. After publishing, you will not be able to add paid tickets.'
                        : 'This event will publish as Paid. After publishing, you can change prices (including to $0) but the event stays in paid mode.'}
                    </span>
                  </p>
                </div>

                {/* Incomplete items warning */}
                {liveCompletionDone < liveCompletionTotal && (
                  <div className="bg-muted rounded-lg p-3 border border-border">
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <AlertCircle className="size-3.5 flex-shrink-0" />
                      {liveCompletionTotal - liveCompletionDone} item{liveCompletionTotal - liveCompletionDone !== 1 ? 's' : ''} still incomplete. You can continue, but your event page may look incomplete.
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPublishDialog(false)} className="rounded-lg">Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={() => setPublishStep('confirm')}>
                  Looks Good, Continue
                  <ChevronRight className="size-3.5 ml-2" />
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="space-y-4 py-2">
                {/* What happens when you publish */}
                <div>
                  <h4 className="text-sm text-foreground mb-2">When you publish:</h4>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><Check className="size-3.5 text-primary flex-shrink-0" /> Event becomes visible {regVisibility === 'public' ? 'on the explore page' : 'via direct link only'}</li>
                    <li className="flex items-center gap-2"><Check className="size-3.5 text-primary flex-shrink-0" /> Public URL becomes shareable</li>
                    <li className="flex items-center gap-2"><Check className="size-3.5 text-primary flex-shrink-0" /> {regAccessType === 'open' ? 'Registrations open immediately' : regAccessType === 'waitlist' ? 'Waitlist registrations open' : 'Applications open for review'}</li>
                    {(eventData.type === 'virtual' || eventData.type === 'hybrid') && (
                      <li className="flex items-center gap-2"><Check className="size-3.5 text-primary flex-shrink-0" /> Leapcast meeting room is auto-provisioned</li>
                    )}
                    {derivePricingMode(tickets) === 'paid' && (
                      <li className="flex items-center gap-2"><Check className="size-3.5 text-primary flex-shrink-0" /> Ticket sales go live — {tickets.length} tier{tickets.length !== 1 ? 's' : ''}</li>
                    )}
                    <li className="flex items-center gap-2"><Check className="size-3.5 text-primary flex-shrink-0" /> Pricing mode locked to {tickets.length === 0 || derivePricingMode(tickets) === 'free' ? 'Free' : 'Paid'}</li>
                  </ul>
                </div>

                {/* Schedule for later section */}
                {showSchedulePicker && (
                  <div className="border border-border rounded-lg p-4 space-y-3">
                    <h4 className="text-sm text-foreground">Schedule publish for:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Date</Label>
                        <Input
                          type="date"
                          value={scheduledPublishDate}
                          onChange={(e) => setScheduledPublishDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Time</Label>
                        <Input
                          type="time"
                          value={scheduledPublishTime}
                          onChange={(e) => setScheduledPublishTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                {showSchedulePicker ? (
                  <>
                    <Button variant="outline" onClick={() => setShowSchedulePicker(false)} className="rounded-lg">Back</Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={handleSchedulePublish}>
                      <Clock className="size-3.5 mr-2" />
                      Schedule Publish
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setPublishStep('review')} className="rounded-lg">
                      <ArrowLeft className="size-3.5 mr-2" />
                      Back to Review
                    </Button>
                    <Button variant="outline" onClick={() => setShowSchedulePicker(true)} className="rounded-lg">
                      <Clock className="size-3.5 mr-2" />
                      Schedule for Later
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={handlePublishNow}>
                      <Upload className="size-3.5 mr-2" />
                      Publish Now
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Registration Config Dialog */}
      <Dialog open={showRegistrationConfigDialog} onOpenChange={setShowRegistrationConfigDialog}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Registration Settings</DialogTitle>
            <DialogDescription>Configure who can see and register for your event.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-2">
            {/* Visibility */}
            <div className="space-y-3">
              <Label className="text-sm">Event Visibility</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRegVisibility('public')}
                  className={`p-3 rounded-lg border text-left transition-colors ${regVisibility === 'public' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="size-4 text-primary" />
                    <span className="text-sm text-foreground">Public</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Visible on explore page and search</p>
                </button>
                <button
                  onClick={() => setRegVisibility('private')}
                  className={`p-3 rounded-lg border text-left transition-colors ${regVisibility === 'private' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="size-4 text-primary" />
                    <span className="text-sm text-foreground">Private</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Only accessible via direct link</p>
                </button>
              </div>
            </div>

            {/* Access Type */}
            <div className="space-y-3">
              <Label className="text-sm">Registration Access</Label>
              <div className="space-y-2">
                {[
                  { value: 'open' as const, label: 'Open Registration', desc: 'Anyone can register instantly' },
                  { value: 'waitlist' as const, label: 'Waitlist', desc: 'Registrants join a waitlist; you approve them' },
                  { value: 'screened' as const, label: 'Application Required', desc: 'Registrants must fill out an application form' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setRegAccessType(opt.value)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${regAccessType === opt.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                  >
                    <span className="text-sm text-foreground">{opt.label}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <Label className="text-sm">Pricing</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setRegIsPaid(false); setRegPrice(''); }}
                  className={`p-3 rounded-lg border text-left transition-colors ${!regIsPaid ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                >
                  <span className="text-sm text-foreground">Free</span>
                  <p className="text-xs text-muted-foreground mt-0.5">No charge to attend</p>
                </button>
                <button
                  onClick={() => setRegIsPaid(true)}
                  className={`p-3 rounded-lg border text-left transition-colors ${regIsPaid ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                >
                  <span className="text-sm text-foreground">Paid</span>
                  <p className="text-xs text-muted-foreground mt-0.5">Charge a ticket price</p>
                </button>
              </div>
              {regIsPaid && (
                <div className="flex items-center gap-2 pt-1">
                  <DollarSign className="size-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={regPrice}
                    onChange={(e) => setRegPrice(e.target.value)}
                    className="w-32 rounded-lg"
                  />
                  <span className="text-sm text-muted-foreground">per ticket</span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRegistrationConfigDialog(false)} className="rounded-lg">Cancel</Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={() => {
                setShowRegistrationConfigDialog(false);
                if (onUpdateEventData) {
                  onUpdateEventData({
                    visibility: regVisibility,
                    accessType: regAccessType,
                    isPaid: regIsPaid,
                    price: regPrice ? parseFloat(regPrice) : undefined,
                  });
                }
                toast.success('Registration settings saved!', {
                  description: `${regVisibility === 'public' ? 'Public' : 'Private'} event, ${regAccessType === 'open' ? 'open registration' : regAccessType === 'waitlist' ? 'waitlist' : 'application required'}${regIsPaid ? `, $${regPrice} per ticket` : ', free'}`
                });
              }}
            >
              <Check className="size-3.5 mr-2" />
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={showQRCodeDialog} onOpenChange={setShowQRCodeDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Event QR Code</DialogTitle>
            <DialogDescription>Scan to view the event page. Share this at your venue or on printed materials.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="bg-white p-4 rounded-xl border border-border">
              <QRCodeCanvas value={`https://leapspace.ai/events/${eventData.id || 'preview'}`} size={200} eventTitle={eventData.title || 'Untitled Event'} />
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center max-w-[240px]">
              leapspace.ai/events/{eventData.id || 'preview'}
            </p>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" className="rounded-lg" onClick={() => {
              navigator.clipboard.writeText(`https://leapspace.ai/events/${eventData.id || 'preview'}`);
              toast.success('Link copied!');
            }}>
              <Copy className="size-3.5 mr-2" />
              Copy Link
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none" onClick={() => {
              const canvas = document.querySelector('#qr-code-canvas') as HTMLCanvasElement;
              if (canvas) {
                const link = document.createElement('a');
                link.download = `${(eventData.title || 'event').replace(/\s+/g, '-').toLowerCase()}-qr.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                toast.success('QR code downloaded!');
              } else {
                toast.error('QR code not ready yet');
              }
            }}>
              <Download className="size-3.5 mr-2" />
              Download PNG
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unpublish Confirmation Dialog */}
      <Dialog open={showUnpublishDialog} onOpenChange={setShowUnpublishDialog}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Unpublish Event</DialogTitle>
            <DialogDescription>This will remove the event from public listings.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 mb-2">When you unpublish:</p>
              <ul className="space-y-1.5 text-sm text-red-700">
                <li className="flex items-center gap-2"><XCircle className="size-3.5 flex-shrink-0" /> Event is removed from the explore page</li>
                <li className="flex items-center gap-2"><XCircle className="size-3.5 flex-shrink-0" /> Public URL stops working</li>
                <li className="flex items-center gap-2"><XCircle className="size-3.5 flex-shrink-0" /> New registrations are paused</li>
                {(eventData.registeredCount || attendees.length) > 0 && (
                  <li className="flex items-center gap-2"><AlertCircle className="size-3.5 flex-shrink-0" /> {eventData.registeredCount || attendees.length} registered attendees will be notified</li>
                )}
              </ul>
            </div>
            <p className="text-xs text-muted-foreground">
              Your event data and registrations are preserved. You can re-publish at any time.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUnpublishDialog(false)} className="rounded-lg">Cancel</Button>
            <Button variant="destructive" onClick={handleUnpublish} className="rounded-lg shadow-none">
              <XCircle className="size-3.5 mr-2" />
              Unpublish Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Confirmation Dialog (for published events) */}
      <EditConfirmationDialog
        open={showEditConfirmation}
        onOpenChange={setShowEditConfirmation}
        config={pendingEdit?.config || null}
        onConfirm={(sendNotification) => {
          if (pendingEdit) {
            pendingEdit.onConfirm(sendNotification);
            setPendingEdit(null);
          }
        }}
        onCancel={() => {
          setPendingEdit(null);
          setShowEditConfirmation(false);
        }}
      />

      {/* Waitlist Configuration Modal */}
      <WaitlistConfigModal
        open={showWaitlistConfigModal}
        onClose={() => setShowWaitlistConfigModal(false)}
        onConfigureWaitlist={handleConfigureWaitlist}
        onLockEvent={handleLockEvent}
        currentCapacity={parseInt(eventCapacity) || 100}
        confirmedCount={attendees.filter((a: any) => a.status === 'confirmed').length}
        availableTickets={tickets.map(t => ({
          id: t.id,
          name: t.name,
          type: t.type,
          price: t.price,
          quantity: t.quantity,
          sold: t.sold,
        }))}
        eventIsPaid={pricingMode === 'paid'}
      />
    </EventShell>
  );
}

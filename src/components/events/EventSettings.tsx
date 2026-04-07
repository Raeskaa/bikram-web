import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { 
  Settings, 
  Palette, 
  Shield, 
  Zap, 
  Globe, 
  Upload, 
  Image as ImageIcon,
  Check,
  ChevronRight,
  Video,
  CreditCard,
  Link as LinkIcon,
  Type,
  Eye,
  X,
  MapPin,
  Bell,
  Mail,
  Clock,
  Send,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { cn } from '../ui/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import { NotificationRulesConfig } from './NotificationRulesConfig';

export interface CustomRole {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePreset: string;
  permissions: Record<string, boolean>;
  color: string;
  isCustom: true;
}

const PERMISSION_GROUPS = [
  {
    group: 'Event Details',
    permissions: [
      { id: 'view-event', label: 'View event details', desc: 'See event title, description, date, location' },
      { id: 'edit-event', label: 'Edit event details', desc: 'Change title, description, date, format, location' },
      { id: 'manage-cover', label: 'Upload / change cover image', desc: 'Modify branding assets for the event' },
    ],
  },
  {
    group: 'Schedule & Content',
    permissions: [
      { id: 'view-schedule', label: 'View full schedule', desc: 'See all sessions and speakers' },
      { id: 'edit-schedule', label: 'Edit schedule', desc: 'Add, remove, or reorder sessions' },
      { id: 'edit-own-session', label: 'Edit own sessions only', desc: 'Modify only sessions they are assigned to' },
    ],
  },
  {
    group: 'People',
    permissions: [
      { id: 'view-attendees', label: 'View attendee list', desc: 'See registered attendees and their status' },
      { id: 'manage-attendees', label: 'Approve / reject attendees', desc: 'Process registration applications' },
      { id: 'invite-team', label: 'Invite speakers & team', desc: 'Send invitations to new team members' },
      { id: 'manage-roles', label: 'Change team member roles', desc: 'Promote or demote team members' },
    ],
  },
  {
    group: 'Tickets & Revenue',
    permissions: [
      { id: 'view-tickets', label: 'View ticket tiers', desc: 'See pricing and availability' },
      { id: 'manage-tickets', label: 'Create / edit tickets', desc: 'Modify ticket types, pricing, and limits' },
      { id: 'manage-discounts', label: 'Manage discount codes', desc: 'Create and edit promo codes' },
      { id: 'view-revenue', label: 'View revenue data', desc: 'See sales figures and financial reports' },
    ],
  },
  {
    group: 'Communication',
    permissions: [
      { id: 'send-announcements', label: 'Send announcements', desc: 'Broadcast messages to all attendees' },
      { id: 'moderate-discussion', label: 'Moderate discussion', desc: 'Pin, delete, or lock discussion threads' },
      { id: 'post-discussion', label: 'Post in discussion', desc: 'Create new messages in event discussion' },
    ],
  },
  {
    group: 'Analytics & Tools',
    permissions: [
      { id: 'view-analytics', label: 'View analytics', desc: 'Access registration, engagement, and attendance data' },
      { id: 'use-ai', label: 'Use AI tools', desc: 'Access AI copilot, content generation, and automations' },
      { id: 'export-data', label: 'Export data', desc: 'Download attendee lists, reports as CSV' },
    ],
  },
  {
    group: 'Settings',
    permissions: [
      { id: 'manage-settings', label: 'Change event settings', desc: 'Privacy, branding, integrations, and other config' },
      { id: 'cancel-event', label: 'Cancel / archive event', desc: 'Permanently cancel or archive the event' },
      { id: 'manage-reg-form', label: 'Edit registration form', desc: 'Add or remove fields from the registration form' },
    ],
  },
];

const DEFAULT_PERMISSION_MATRIX: Record<string, Record<string, boolean>> = {
  'co-host': {
    'view-event': true, 'edit-event': true, 'manage-cover': true,
    'view-schedule': true, 'edit-schedule': true, 'edit-own-session': true,
    'view-attendees': true, 'manage-attendees': true, 'invite-team': true, 'manage-roles': false,
    'view-tickets': true, 'manage-tickets': true, 'manage-discounts': true, 'view-revenue': true,
    'send-announcements': true, 'moderate-discussion': true, 'post-discussion': true,
    'view-analytics': true, 'use-ai': true, 'export-data': true,
    'manage-settings': true, 'cancel-event': false, 'manage-reg-form': true,
  },
  speaker: {
    'view-event': true, 'edit-event': false, 'manage-cover': false,
    'view-schedule': true, 'edit-schedule': false, 'edit-own-session': true,
    'view-attendees': true, 'manage-attendees': false, 'invite-team': false, 'manage-roles': false,
    'view-tickets': true, 'manage-tickets': false, 'manage-discounts': false, 'view-revenue': false,
    'send-announcements': false, 'moderate-discussion': false, 'post-discussion': true,
    'view-analytics': false, 'use-ai': true, 'export-data': false,
    'manage-settings': false, 'cancel-event': false, 'manage-reg-form': false,
  },
  moderator: {
    'view-event': true, 'edit-event': false, 'manage-cover': false,
    'view-schedule': true, 'edit-schedule': false, 'edit-own-session': false,
    'view-attendees': true, 'manage-attendees': true, 'invite-team': false, 'manage-roles': false,
    'view-tickets': true, 'manage-tickets': false, 'manage-discounts': false, 'view-revenue': false,
    'send-announcements': true, 'moderate-discussion': true, 'post-discussion': true,
    'view-analytics': true, 'use-ai': false, 'export-data': false,
    'manage-settings': false, 'cancel-event': false, 'manage-reg-form': false,
  },
  'tech-support': {
    'view-event': true, 'edit-event': false, 'manage-cover': false,
    'view-schedule': true, 'edit-schedule': false, 'edit-own-session': false,
    'view-attendees': true, 'manage-attendees': false, 'invite-team': false, 'manage-roles': false,
    'view-tickets': false, 'manage-tickets': false, 'manage-discounts': false, 'view-revenue': false,
    'send-announcements': false, 'moderate-discussion': false, 'post-discussion': true,
    'view-analytics': false, 'use-ai': false, 'export-data': false,
    'manage-settings': true, 'cancel-event': false, 'manage-reg-form': false,
  },
  attendee: {
    'view-event': true, 'edit-event': false, 'manage-cover': false,
    'view-schedule': true, 'edit-schedule': false, 'edit-own-session': false,
    'view-attendees': false, 'manage-attendees': false, 'invite-team': false, 'manage-roles': false,
    'view-tickets': true, 'manage-tickets': false, 'manage-discounts': false, 'view-revenue': false,
    'send-announcements': false, 'moderate-discussion': false, 'post-discussion': true,
    'view-analytics': false, 'use-ai': false, 'export-data': false,
    'manage-settings': false, 'cancel-event': false, 'manage-reg-form': false,
  },
};

interface EventSettingsProps {
  eventTitle: string;
  onUpdate?: (data: any) => void;
  onRolesChange?: (customRoles: CustomRole[]) => void;
  customRoles?: CustomRole[];
  initialTab?: string;
}

export function EventSettings({ eventTitle, onUpdate, onRolesChange, customRoles: externalCustomRoles, initialTab }: EventSettingsProps) {
  const [activeTab, setActiveTab] = useState(initialTab || 'general');
  const [isSaving, setIsSaving] = useState(false);
  
  // --- Form State ---
  const [formData, setFormData] = useState({
     // General
     title: eventTitle,
     description: 'A community for design professionals to learn, share, and grow together.',
     privacy: 'public',
     category: 'design',
     location: '',
     meetingLink: '',
     eventFormat: 'virtual' as 'virtual' | 'in-person' | 'hybrid',
     
     // Branding
     primaryColor: '#141413',
     accentColor: '#3B82F6',
     fontFamily: 'inter' as 'inter' | 'dm-sans' | 'poppins' | 'space-grotesk' | 'system',
     buttonStyle: 'rounded' as 'rounded' | 'pill' | 'square',
     showPoweredBy: true,
     logoUrl: '',
     coverImageUrl: '',
     
     // Permissions
     allowPosts: true,
     allowInvites: false,
     requireApproval: true,
     allowEvents: false,
     allowCourses: false,

     // Integrations
     connectedApps: ['zoom', 'stripe'],

     // Notifications / Reminders
     reminder24h: true,
     reminder1h: true,
     reminder15m: false,
     reminderCustom: false,
  });

  const handleSave = () => {
     setIsSaving(true);
     setTimeout(() => {
        setIsSaving(false);
        toast.success('Settings saved successfully');
        if (onUpdate) onUpdate(formData);
     }, 800);
  };

  const tabs = [
     { id: 'general', label: 'General', icon: Settings },
     { id: 'branding', label: 'Branding', icon: Palette },
     { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
     { id: 'permissions', label: 'Permissions & Roles', icon: Shield },
     { id: 'ai', label: 'AI Autopilot', icon: Zap },
     { id: 'integrations', label: 'Integrations', icon: Globe },
  ];

  return (
    <div className="flex flex-col h-full bg-background text-foreground font-sans">
       {/* Header */}
       <div className="px-8 pt-8 pb-0 bg-background">
          <h2 className="text-xl font-semibold text-foreground">Settings</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-6">Manage your event configuration</p>
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-4 border-b border-border pb-2">
             {tabs.map(tab => (
                <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-full",
                      activeTab === tab.id 
                         ? "bg-primary text-white" 
                         : "text-muted-foreground hover:text-foreground hover:bg-accent"
                   )}
                >
                   <tab.icon className={cn("size-4", activeTab === tab.id ? "text-white" : "text-muted-foreground")} />
                   {tab.label}
                </button>
             ))}
          </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 overflow-hidden bg-muted/30">
          <ScrollArea className="h-full">
             <div className="max-w-4xl mx-auto p-8 pb-32 space-y-8">
                
                {/* GENERAL TAB */}
                {activeTab === 'general' && (
                   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      
                      {/* General Info Card */}
                      <div className="bg-card rounded-xl border border-border p-6">
                         <h3 className="text-sm font-medium text-foreground mb-6">General Information</h3>
                         
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <Label htmlFor="title" className="text-sm text-muted-foreground font-normal">Event Name</Label>
                               <Input 
                                  id="title" 
                                  value={formData.title} 
                                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                                  className="border-border focus-visible:ring-ring bg-card h-10"
                               />
                            </div>
                            
                            <div className="space-y-2">
                               <Label htmlFor="desc" className="text-sm text-muted-foreground font-normal">Description</Label>
                               <div className="bg-muted/50 rounded-lg p-1">
                                    <Textarea 
                                        id="desc"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="border-0 bg-transparent focus-visible:ring-0 resize-none min-h-[80px] text-sm"
                                    />
                               </div>
                            </div>

                            <div className="space-y-2">
                               <Label className="text-sm text-muted-foreground font-normal">Privacy</Label>
                               <Select defaultValue={formData.privacy} onValueChange={(v) => setFormData({...formData, privacy: v})}>
                                  <SelectTrigger className="border-border h-10">
                                     <SelectValue placeholder="Select privacy" />
                                  </SelectTrigger>
                                  <SelectContent>
                                     <SelectItem value="public">Public - Anyone can join</SelectItem>
                                     <SelectItem value="private">Private - Invite only</SelectItem>
                                  </SelectContent>
                               </Select>
                            </div>

                            <div className="space-y-2">
                               <Label className="text-sm text-muted-foreground font-normal">Category</Label>
                               <Select defaultValue={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                                  <SelectTrigger className="border-border h-10">
                                     <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                     <SelectItem value="design">Design</SelectItem>
                                     <SelectItem value="tech">Technology</SelectItem>
                                     <SelectItem value="business">Business</SelectItem>
                                  </SelectContent>
                               </Select>
                            </div>

                         </div>
                      </div>

                      {/* Location & Venue Card */}
                      <div className="bg-card rounded-xl border border-border p-6">
                         <h3 className="text-sm font-medium text-foreground mb-6">Location & Venue</h3>
                         <div className="space-y-6">
                            {/* Format Pills */}
                            <div className="space-y-2">
                               <Label className="text-sm text-muted-foreground font-normal">Event Format</Label>
                               <div className="flex gap-2">
                                  {([
                                    { id: 'virtual', label: 'Virtual', icon: Video },
                                    { id: 'in-person', label: 'In-Person', icon: MapPin },
                                    { id: 'hybrid', label: 'Hybrid', icon: Globe },
                                  ] as const).map(fmt => (
                                    <button
                                      key={fmt.id}
                                      onClick={() => setFormData({...formData, eventFormat: fmt.id})}
                                      className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors",
                                        formData.eventFormat === fmt.id
                                          ? "border-primary bg-primary/5 text-primary"
                                          : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                                      )}
                                    >
                                      <fmt.icon className="size-3.5" />
                                      {fmt.label}
                                    </button>
                                  ))}
                               </div>
                            </div>

                            {/* Conditional: Physical Location */}
                            {(formData.eventFormat === 'in-person' || formData.eventFormat === 'hybrid') && (
                              <div className="space-y-2">
                                 <Label className="text-sm text-muted-foreground font-normal">Venue / Address</Label>
                                 <div className="relative">
                                   <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                   <Input
                                     value={formData.location}
                                     onChange={(e) => setFormData({...formData, location: e.target.value})}
                                     placeholder="e.g. 123 Main St, San Francisco, CA"
                                     className="border-border focus-visible:ring-ring bg-card h-10 pl-10"
                                   />
                                 </div>
                              </div>
                            )}

                            {/* Conditional: Meeting Link */}
                            {(formData.eventFormat === 'virtual' || formData.eventFormat === 'hybrid') && (
                              <div className="space-y-2">
                                 <Label className="text-sm text-muted-foreground font-normal">Meeting Link</Label>
                                 <div className="relative">
                                   <Video className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                   <Input
                                     value={formData.meetingLink}
                                     onChange={(e) => setFormData({...formData, meetingLink: e.target.value})}
                                     placeholder="https://meet.leapspace.ai/..."
                                     className="border-border focus-visible:ring-ring bg-card h-10 pl-10"
                                   />
                                 </div>
                                 <p className="text-[10px] text-muted-foreground">A Leapcast meeting room is auto-provisioned when you publish. You can override it here.</p>
                              </div>
                            )}
                         </div>
                      </div>

                      {/* Monetization Card */}
                      <div className="bg-card rounded-xl border border-border p-6 opacity-60">
                         <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-foreground">Monetization</h3>
                            <Badge variant="outline" className="text-xs font-normal">Coming Soon</Badge>
                         </div>
                         <div className="space-y-2">
                             <Label className="text-sm text-muted-foreground font-normal">Ticket Price</Label>
                             <Input disabled placeholder="0.00" className="bg-muted border-border" />
                         </div>
                      </div>

                      <div className="flex justify-end pt-4">
                         <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-white min-w-[100px]">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                         </Button>
                      </div>
                   </div>
                )}


                {/* BRANDING TAB */}
                {activeTab === 'branding' && (
                   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                      {/* ── Assets: Logo & Cover Image ── */}
                      <div className="bg-card rounded-xl border border-border p-6">
                         <h3 className="text-sm font-medium text-foreground mb-6">Assets</h3>
                         <div className="space-y-6">
                            {/* Logo */}
                            <div className="space-y-3">
                               <Label className="text-sm text-muted-foreground font-normal">Event Logo</Label>
                               <div className="flex items-center gap-4">
                                  {formData.logoUrl ? (
                                    <div className="size-20 rounded-lg border border-border overflow-hidden relative group">
                                       <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                       <button
                                         onClick={() => setFormData({...formData, logoUrl: ''})}
                                         className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                       >
                                         <X className="size-5 text-white" />
                                       </button>
                                    </div>
                                  ) : (
                                    <div className="size-20 bg-muted rounded-lg flex items-center justify-center border border-dashed border-border text-muted-foreground">
                                         <ImageIcon className="size-8 opacity-50" />
                                      </div>
                                  )}
                                  <div className="space-y-2">
                                     <Button
                                       variant="outline"
                                       className="text-foreground border-border h-9"
                                       onClick={() => {
                                         toast.success('Logo uploaded successfully');
                                         setFormData({...formData, logoUrl: 'https://ui-avatars.com/api/?name=L+A&background=420D74&color=fff&size=128'});
                                       }}
                                     >
                                       <Upload className="size-3.5 mr-2" /> Upload Logo
                                     </Button>
                                     <p className="text-[10px] text-muted-foreground">PNG, SVG, or JPG. Max 2MB.</p>
                                  </div>
                               </div>
                            </div>

                            <Separator className="bg-border" />

                            {/* Cover / Header Image */}
                            <div className="space-y-3">
                               <Label className="text-sm text-muted-foreground font-normal">Cover / Header Image</Label>
                                 {formData.coverImageUrl ? (
                                    <div className="h-40 rounded-xl border border-border overflow-hidden relative group">
                                       <img src={formData.coverImageUrl} alt="Cover" className="w-full h-full object-cover" />
                                       <button
                                         onClick={() => setFormData({...formData, coverImageUrl: ''})}
                                         className="absolute top-2 right-2 size-7 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                       >
                                         <X className="size-4 text-white" />
                                       </button>
                                    </div>
                                 ) : (
                                    <div className="h-40 bg-muted rounded-xl flex flex-col items-center justify-center border border-dashed border-border text-muted-foreground w-full gap-2">
                                       <ImageIcon className="size-8 opacity-40" />
                                       <span className="text-xs text-muted-foreground">1200 x 400 recommended</span>
                                    </div>
                                 )}
                               <Button
                                 variant="outline"
                                 className="text-foreground border-border h-9"
                                 onClick={() => {
                                   toast.success('Header image uploaded successfully');
                                   setFormData({...formData, coverImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50e2fd60?w=1200&h=400&fit=crop'});
                                 }}
                               >
                                 <Upload className="size-3.5 mr-2" /> Upload Header
                               </Button>
                            </div>
                         </div>
                      </div>

                      {/* ── Colors ── */}
                      <div className="bg-card rounded-xl border border-border p-6">
                         <h3 className="text-sm font-medium text-foreground mb-6">Colors</h3>
                         <div className="space-y-6">
                            {/* Primary Color */}
                            <div className="space-y-3">
                               <Label className="text-sm text-muted-foreground font-normal">Primary Color</Label>
                               <div className="flex items-center gap-3">
                                  <input
                                    type="color"
                                    value={formData.primaryColor}
                                    onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                                    className="size-10 rounded-lg border border-border cursor-pointer p-0.5 bg-card"
                                  />
                                  <Input 
                                     value={formData.primaryColor} 
                                     onChange={(e) => setFormData({...formData, primaryColor: e.target.value})}
                                     className="max-w-[140px] font-mono uppercase border-border h-10"
                                  />
                               </div>
                               {/* Preset swatches */}
                               <div className="flex gap-2">
                                  {['#141413', '#1E40AF', '#065F46', '#9F1239', '#92400E', '#1F2937', '#374151'].map(c => (
                                    <button
                                      key={c}
                                      onClick={() => setFormData({...formData, primaryColor: c})}
                                      className={cn(
                                        "size-7 rounded-md border-2 transition-all",
                                        formData.primaryColor.toLowerCase() === c.toLowerCase()
                                          ? "border-foreground scale-110"
                                          : "border-transparent hover:border-border"
                                      )}
                                      style={{ backgroundColor: c }}
                                    />
                                  ))}
                               </div>
                            </div>
                            
                            {/* Accent Color */}
                            <div className="space-y-3">
                               <Label className="text-sm text-muted-foreground font-normal">Accent Color</Label>
                               <div className="flex items-center gap-3">
                                  <input
                                    type="color"
                                    value={formData.accentColor}
                                    onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                                    className="size-10 rounded-lg border border-border cursor-pointer p-0.5 bg-card"
                                  />
                                  <Input 
                                     value={formData.accentColor} 
                                     onChange={(e) => setFormData({...formData, accentColor: e.target.value})}
                                     className="max-w-[140px] font-mono uppercase border-border h-10"
                                  />
                               </div>
                               <div className="flex gap-2">
                                  {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6B7280'].map(c => (
                                    <button
                                      key={c}
                                      onClick={() => setFormData({...formData, accentColor: c})}
                                      className={cn(
                                        "size-7 rounded-md border-2 transition-all",
                                        formData.accentColor.toLowerCase() === c.toLowerCase()
                                          ? "border-foreground scale-110"
                                          : "border-transparent hover:border-border"
                                      )}
                                      style={{ backgroundColor: c }}
                                    />
                                  ))}
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* ── Typography & Button Style ── */}
                      <div className="bg-card rounded-xl border border-border p-6">
                         <h3 className="text-sm font-medium text-foreground mb-6">Typography & Buttons</h3>
                         <div className="space-y-6">
                            {/* Font Family */}
                            <div className="space-y-3">
                               <Label className="text-sm text-muted-foreground font-normal flex items-center gap-1.5">
                                  <Type className="size-3.5 text-muted-foreground" />
                                  Font Family
                               </Label>
                               <div className="grid grid-cols-5 gap-2">
                                  {([
                                    { id: 'inter', label: 'Inter', sample: 'Aa' },
                                    { id: 'dm-sans', label: 'DM Sans', sample: 'Aa' },
                                    { id: 'poppins', label: 'Poppins', sample: 'Aa' },
                                    { id: 'space-grotesk', label: 'Space Grotesk', sample: 'Aa' },
                                    { id: 'system', label: 'System', sample: 'Aa' },
                                  ] as const).map(font => (
                                    <button
                                      key={font.id}
                                      onClick={() => setFormData({...formData, fontFamily: font.id})}
                                      className={cn(
                                        "flex flex-col items-center gap-1 p-3 rounded-lg border transition-all text-center",
                                        formData.fontFamily === font.id
                                          ? "border-primary bg-primary/10 text-primary"
                                          : "border-border hover:border-border text-muted-foreground"
                                      )}
                                    >
                                      <span className="text-lg" style={{
                                        fontFamily: font.id === 'inter' ? 'Inter, sans-serif'
                                          : font.id === 'dm-sans' ? '"DM Sans", sans-serif'
                                          : font.id === 'poppins' ? 'Poppins, sans-serif'
                                          : font.id === 'space-grotesk' ? '"Space Grotesk", sans-serif'
                                          : 'system-ui, sans-serif'
                                      }}>{font.sample}</span>
                                      <span className="text-[10px]">{font.label}</span>
                                    </button>
                                  ))}
                               </div>
                            </div>

                            <Separator className="bg-border" />

                            {/* Button Style */}
                            <div className="space-y-3">
                               <Label className="text-sm text-muted-foreground font-normal">Button Style</Label>
                               <div className="flex gap-3">
                                  {([
                                    { id: 'rounded', label: 'Rounded', radius: '0.5rem' },
                                    { id: 'pill', label: 'Pill', radius: '9999px' },
                                    { id: 'square', label: 'Square', radius: '0.25rem' },
                                  ] as const).map(style => (
                                    <button
                                      key={style.id}
                                      onClick={() => setFormData({...formData, buttonStyle: style.id})}
                                      className={cn(
                                        "flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
                                        formData.buttonStyle === style.id
                                          ? "border-primary bg-primary/10"
                                          : "border-border hover:border-border"
                                      )}
                                    >
                                      <div
                                        className="h-8 w-24 flex items-center justify-center text-xs text-white"
                                        style={{
                                          backgroundColor: formData.primaryColor,
                                          borderRadius: style.radius,
                                        }}
                                      >
                                        Register
                                      </div>
                                      <span className={cn(
                                        "text-[10px]",
                                        formData.buttonStyle === style.id ? "text-primary" : "text-muted-foreground"
                                      )}>{style.label}</span>
                                    </button>
                                  ))}
                               </div>
                            </div>

                            <Separator className="bg-border" />

                            {/* Powered By Toggle */}
                            <div className="flex items-center justify-between">
                               <div>
                                  <Label className="text-sm text-muted-foreground font-normal">Show "Powered by LeapSpace"</Label>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">Display branding badge on your public event page</p>
                               </div>
                               <button
                                 onClick={() => setFormData({...formData, showPoweredBy: !formData.showPoweredBy})}
                                 className={cn(
                                   "size-8 rounded-lg flex items-center justify-center transition-all",
                                   formData.showPoweredBy
                                     ? "bg-primary text-white hover:bg-primary/90"
                                     : "bg-muted text-muted-foreground hover:bg-accent"
                                 )}
                               >
                                 {formData.showPoweredBy ? <Check className="size-5" /> : <X className="size-4" />}
                               </button>
                            </div>
                         </div>
                      </div>

                      {/* ── Live Preview ── */}
                      <div className="bg-card rounded-xl border border-border p-6">
                         <div className="flex items-center justify-between mb-5">
                            <h3 className="text-sm font-medium text-foreground">Live Preview</h3>
                            <Badge variant="outline" className="text-[10px] border-border text-muted-foreground gap-1">
                               <Eye className="size-3" /> Preview
                            </Badge>
                         </div>

                         {/* Mini event card preview */}
                         <div className="border border-border rounded-xl overflow-hidden">
                            {/* Cover */}
                            <div className="h-28 relative" style={{ backgroundColor: formData.primaryColor }}>
                               {formData.coverImageUrl && (
                                 <img src={formData.coverImageUrl} alt="" className="w-full h-full object-cover" />
                               )}
                               {formData.logoUrl && (
                                 <div className="absolute bottom-0 left-4 translate-y-1/2 size-14 rounded-lg border-2 border-white overflow-hidden bg-white">
                                    <img src={formData.logoUrl} alt="" className="w-full h-full object-cover" />
                                 </div>
                               )}
                            </div>

                            <div className={cn("p-5", formData.logoUrl ? "pt-10" : "pt-5")}>
                               <h4 className="text-foreground mb-1" style={{
                                 fontFamily: formData.fontFamily === 'inter' ? 'Inter, sans-serif'
                                   : formData.fontFamily === 'dm-sans' ? '"DM Sans", sans-serif'
                                   : formData.fontFamily === 'poppins' ? 'Poppins, sans-serif'
                                   : formData.fontFamily === 'space-grotesk' ? '"Space Grotesk", sans-serif'
                                   : 'system-ui, sans-serif'
                               }}>{formData.title || 'Untitled Event'}</h4>
                               <p className="text-xs text-muted-foreground mb-4">Feb 17, 2026 at 2:00 PM EST</p>

                               <div className="flex gap-2">
                                  <div
                                    className="h-9 px-5 flex items-center justify-center text-sm text-white"
                                    style={{
                                      backgroundColor: formData.primaryColor,
                                      borderRadius: formData.buttonStyle === 'pill' ? '9999px' : formData.buttonStyle === 'square' ? '0.25rem' : '0.5rem',
                                    }}
                                  >
                                    Register Now
                                  </div>
                                  <div
                                    className="h-9 px-5 flex items-center justify-center text-sm border"
                                    style={{
                                      color: formData.accentColor,
                                      borderColor: formData.accentColor,
                                      borderRadius: formData.buttonStyle === 'pill' ? '9999px' : formData.buttonStyle === 'square' ? '0.25rem' : '0.5rem',
                                    }}
                                  >
                                    Learn More
                                  </div>
                               </div>

                               {formData.showPoweredBy && (
                                 <div className="mt-4 pt-3 border-t border-border text-[10px] text-muted-foreground">
                                    Powered by LeapSpace.AI
                                 </div>
                               )}
                            </div>
                         </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                         <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-white min-w-[100px]">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                         </Button>
                      </div>
                   </div>
                )}


                {/* NOTIFICATIONS & ALERTS TAB */}
                {activeTab === 'notifications' && (
                   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                     {/* Automated Reminders */}
                     <div className="bg-card rounded-xl border border-border p-6">
                       <div className="flex items-center gap-2 mb-1">
                         <Clock className="size-4 text-primary" />
                         <h3 className="text-sm font-medium text-foreground">Automated Reminders</h3>
                       </div>
                       <p className="text-xs text-muted-foreground mb-6">Automatically remind registered attendees before the event starts.</p>

                       <div className="space-y-4">
                         {[
                           { key: 'reminder24h' as const, label: '24 hours before', desc: 'Sent the day before the event' },
                           { key: 'reminder1h' as const, label: '1 hour before', desc: 'Last-minute reminder with join link' },
                           { key: 'reminder15m' as const, label: '15 minutes before', desc: 'Final nudge right before start' },
                         ].map(item => (
                           <div key={item.key} className="flex items-center justify-between py-2">
                             <div className="flex items-center gap-3">
                               <Bell className="size-4 text-muted-foreground" />
                               <div>
                                 <p className="text-sm text-foreground">{item.label}</p>
                                 <p className="text-xs text-muted-foreground">{item.desc}</p>
                               </div>
                             </div>
                             <button
                               onClick={() => setFormData({ ...formData, [item.key]: !formData[item.key] })}
                               className={cn(
                                 "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                 formData[item.key] ? "bg-primary" : "bg-muted border border-border"
                               )}
                             >
                               <span className={cn(
                                 "inline-block size-4 transform rounded-full bg-white transition-transform",
                                 formData[item.key] ? "translate-x-6" : "translate-x-1"
                               )} />
                             </button>
                           </div>
                         ))}
                       </div>
                     </div>

                     {/* Reminder Email Preview */}
                     <div className="bg-card rounded-xl border border-border p-6">
                       <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                           <Mail className="size-4 text-primary" />
                           <h3 className="text-sm font-medium text-foreground">Reminder Email Preview</h3>
                         </div>
                         <Badge variant="secondary" className="text-xs shadow-none">Auto-generated</Badge>
                       </div>

                       <div className="bg-muted rounded-lg border border-border p-5 space-y-3">
                         <div className="space-y-1.5">
                           <p className="text-xs text-muted-foreground">Subject:</p>
                           <p className="text-sm text-foreground font-medium">Reminder: "{eventTitle}" starts in 1 hour</p>
                         </div>
                         <Separator />
                         <div className="space-y-2 text-sm text-foreground/80">
                           <p>Hi [Attendee Name],</p>
                           <p>Just a quick reminder that <span className="font-medium text-foreground">"{eventTitle}"</span> starts in 1 hour.</p>
                           <div className="bg-card rounded-lg border border-border p-3 space-y-1">
                             <p className="text-xs text-muted-foreground">Event Details</p>
                             <p className="text-sm">Date: [Event Date]</p>
                             <p className="text-sm">Time: [Event Time]</p>
                             <p className="text-sm">Format: Virtual (Leapcast)</p>
                           </div>
                           <p>Click the button below to join when it's time:</p>
                           <div className="bg-primary text-white text-center py-2 px-4 rounded-lg text-sm font-medium">
                             Join Event
                           </div>
                           <p className="text-xs text-muted-foreground mt-3">See you there!</p>
                         </div>
                       </div>
                     </div>

                     {/* Change Notification Rules */}
                      <Separator className="bg-border" />
                      <NotificationRulesConfig onSave={handleSave} isSaving={isSaving} />
                      <Separator className="bg-border" />

                      {/* Send Custom Reminder */}
                     <div className="bg-card rounded-xl border border-border p-6">
                       <div className="flex items-center gap-2 mb-1">
                         <Send className="size-4 text-primary" />
                         <h3 className="text-sm font-medium text-foreground">Send Custom Reminder</h3>
                       </div>
                       <p className="text-xs text-muted-foreground mb-4">Send a one-time custom reminder to all registered attendees right now.</p>

                       <Textarea
                         placeholder="Type your custom reminder message..."
                         className="mb-3"
                         rows={3}
                       />
                       <Button
                         className="bg-primary hover:bg-primary/90 text-white"
                         onClick={() => toast.success('Custom reminder sent!', { description: 'All registered attendees have been notified.' })}
                       >
                         <Send className="size-3.5 mr-2" />
                         Send Reminder Now
                       </Button>
                     </div>

                     <div className="flex justify-end pt-4">
                        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-white min-w-[100px]">
                           {isSaving ? 'Saving...' : 'Save Changes'}
                        </Button>
                     </div>
                   </div>
                )}

                {/* PERMISSIONS TAB */}
                {activeTab === 'permissions' && (
                   <PermissionsMatrix
                     roles={['co-host', 'speaker', 'moderator', 'tech-support', 'attendee']}
                     roleLabels={{
                       'co-host': 'Co-host',
                       speaker: 'Speaker',
                       moderator: 'Moderator',
                       'tech-support': 'Tech Support',
                       attendee: 'Attendee',
                     }}
                     groups={PERMISSION_GROUPS}
                     defaultMatrix={DEFAULT_PERMISSION_MATRIX}
                     onSave={handleSave}
                     isSaving={isSaving}
                     onRolesChange={onRolesChange}
                     externalCustomRoles={externalCustomRoles}
                   />
                )}

                {/* AI & INTEGRATIONS TABS */}
                {(activeTab === 'ai' || activeTab === 'integrations') && (
                   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      
                      {/* Integration Banner */}
                      <div className="bg-primary rounded-xl p-8 text-white relative overflow-hidden">
                          <div className="relative z-10 flex items-center justify-between">
                              <div className="space-y-4 max-w-lg">
                                  <div className="size-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                      <Globe className="size-6 text-white" />
                                  </div>
                                  <div>
                                      <h3 className="text-xl font-bold mb-1">Integration Library</h3>
                                      <p className="text-white/70 text-sm leading-relaxed">
                                          Connect your favorite tools and automate your workflow. Browse 50+ integrations across multiple categories.
                                      </p>
                                  </div>
                                  <Button className="bg-white text-primary hover:bg-white/90 border-0">
                                      Browse All Integrations <ChevronRight className="size-4 ml-2" />
                                  </Button>
                              </div>
                              <div className="text-center">
                                  <span className="block text-4xl font-bold">50+</span>
                                  <span className="text-white/60 text-sm uppercase tracking-wider font-medium">Available</span>
                              </div>
                          </div>
                          
                          {/* Decorative Circles */}
                          <div className="absolute -top-20 -right-20 size-64 bg-white/10 rounded-full blur-3xl" />
                          <div className="absolute bottom-0 right-20 size-32 bg-white/10 rounded-full blur-2xl" />
                      </div>

                      {/* Connected Count */}
                      <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
                          <div>
                              <h4 className="text-sm font-medium text-muted-foreground">Connected Integrations</h4>
                              <p className="text-2xl font-bold text-foreground mt-1">2 <span className="text-sm font-normal text-muted-foreground">/ 50+</span></p>
                          </div>
                          <div className="flex gap-2">
                              <div className="size-8 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground">
                                  <LinkIcon className="size-4" />
                              </div>
                              <div className="h-8 px-3 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                                  +48
                              </div>
                          </div>
                      </div>

                      {/* Connected List */}
                      <div className="bg-card rounded-xl border border-border overflow-hidden">
                          <div className="p-4 border-b border-border flex justify-between items-center">
                              <h3 className="text-sm font-medium text-foreground">Connected</h3>
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">2 Active</Badge>
                          </div>
                          <div className="divide-y divide-border">
                              <div className="p-4 flex items-center justify-between hover:bg-muted transition-colors">
                                  <div className="flex items-center gap-4">
                                      <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                          <Video className="size-5" />
                                      </div>
                                      <div>
                                          <h4 className="text-sm font-bold text-foreground">Zoom</h4>
                                          <p className="text-xs text-muted-foreground">Video conferencing for events</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-normal gap-1 pl-1 pr-2">
                                          <Check className="size-3" /> Connected
                                      </Badge>
                                      <Button variant="outline" size="sm" className="h-8 text-xs">Configure</Button>
                                  </div>
                              </div>
                              
                              <div className="p-4 flex items-center justify-between hover:bg-muted transition-colors">
                                  <div className="flex items-center gap-4">
                                      <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                          <CreditCard className="size-5" />
                                      </div>
                                      <div>
                                          <h4 className="text-sm font-bold text-foreground">Stripe</h4>
                                          <p className="text-xs text-muted-foreground">Payment processing</p>
                                      </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-normal gap-1 pl-1 pr-2">
                                          <Check className="size-3" /> Connected
                                      </Badge>
                                      <Button variant="outline" size="sm" className="h-8 text-xs">Configure</Button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                         <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-white min-w-[100px]">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                         </Button>
                      </div>
                   </div>
                )}

             </div>
          </ScrollArea>
       </div>
    </div>
  );
}

// Local component for Permissions Matrix
const CUSTOM_ROLE_COLORS = [
  'bg-indigo-50 text-indigo-700 border-indigo-200',
  'bg-rose-50 text-rose-700 border-rose-200',
  'bg-cyan-50 text-cyan-700 border-cyan-200',
  'bg-orange-50 text-orange-700 border-orange-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  'bg-sky-50 text-sky-700 border-sky-200',
  'bg-lime-50 text-lime-700 border-lime-200',
];

function PermissionsMatrix({
  roles: builtInRoles,
  roleLabels: builtInRoleLabels,
  groups,
  defaultMatrix,
  onSave,
  isSaving,
  onRolesChange,
  externalCustomRoles,
}: {
  roles: string[];
  roleLabels: Record<string, string>;
  groups: {
    group: string;
    permissions: {
      id: string;
      label: string;
      desc: string;
    }[];
  }[];
  defaultMatrix: Record<string, Record<string, boolean>>;
  onSave: () => void;
  isSaving: boolean;
  onRolesChange?: (customRoles: CustomRole[]) => void;
  externalCustomRoles?: CustomRole[];
}) {
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [customRoles, setCustomRoles] = useState<CustomRole[]>(externalCustomRoles || []);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingRole, setEditingRole] = useState<CustomRole | null>(null);

  // Create role form state
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRolePreset, setNewRolePreset] = useState('attendee');
  const [newRolePermissions, setNewRolePermissions] = useState<Record<string, boolean>>({});

  // Combine built-in + custom
  const allRoles = [...builtInRoles, ...customRoles.map(r => r.slug)];
  const allRoleLabels: Record<string, string> = { ...builtInRoleLabels };
  const fullMatrix: Record<string, Record<string, boolean>> = { ...matrix };
  customRoles.forEach(r => {
    allRoleLabels[r.slug] = r.name;
    fullMatrix[r.slug] = r.permissions;
  });

  const handleToggle = (role: string, permission: string) => {
    const custom = customRoles.find(r => r.slug === role);
    if (custom) {
      const updated = customRoles.map(r =>
        r.slug === role
          ? { ...r, permissions: { ...r.permissions, [permission]: !r.permissions[permission] } }
          : r
      );
      setCustomRoles(updated);
      onRolesChange?.(updated);
    } else {
      setMatrix({
        ...matrix,
        [role]: {
          ...matrix[role],
          [permission]: !matrix[role][permission],
        },
      });
    }
  };

  const ROLE_COLORS: Record<string, string> = {
    'co-host': 'bg-accent text-foreground border-border',
    speaker: 'bg-primary/10 text-primary border-primary/20',
    moderator: 'bg-muted text-foreground border-border',
    'tech-support': 'bg-muted text-muted-foreground border-border',
    attendee: 'bg-muted text-muted-foreground border-border',
  };
  customRoles.forEach(r => {
    ROLE_COLORS[r.slug] = r.color;
  });

  const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const openCreateModal = (basePreset?: string) => {
    setNewRoleName('');
    setNewRoleDesc('');
    setNewRolePreset(basePreset || 'attendee');
    setNewRolePermissions({ ...(defaultMatrix[basePreset || 'attendee'] || defaultMatrix.attendee) });
    setEditingRole(null);
    setShowCreateModal(true);
  };

  const openEditModal = (role: CustomRole) => {
    setNewRoleName(role.name);
    setNewRoleDesc(role.description);
    setNewRolePreset(role.basePreset);
    setNewRolePermissions({ ...role.permissions });
    setEditingRole(role);
    setShowCreateModal(true);
  };

  const handlePresetChange = (preset: string) => {
    setNewRolePreset(preset);
    setNewRolePermissions({ ...(defaultMatrix[preset] || defaultMatrix.attendee) });
  };

  const handleSaveRole = () => {
    if (!newRoleName.trim()) return;
    const slug = editingRole ? editingRole.slug : slugify(newRoleName);
    if (!editingRole && (builtInRoles.includes(slug) || customRoles.some(r => r.slug === slug))) {
      toast.error('A role with this name already exists');
      return;
    }
    const colorIdx = editingRole
      ? CUSTOM_ROLE_COLORS.indexOf(editingRole.color)
      : customRoles.length % CUSTOM_ROLE_COLORS.length;

    const role: CustomRole = {
      id: editingRole?.id || `custom-${Date.now()}`,
      name: newRoleName.trim(),
      slug,
      description: newRoleDesc.trim(),
      basePreset: newRolePreset,
      permissions: newRolePermissions,
      color: CUSTOM_ROLE_COLORS[colorIdx >= 0 ? colorIdx : customRoles.length % CUSTOM_ROLE_COLORS.length],
      isCustom: true,
    };

    let updated: CustomRole[];
    if (editingRole) {
      updated = customRoles.map(r => r.id === editingRole.id ? role : r);
      toast.success(`Role "${role.name}" updated`);
    } else {
      updated = [...customRoles, role];
      toast.success(`Role "${role.name}" created`);
    }
    setCustomRoles(updated);
    onRolesChange?.(updated);
    setShowCreateModal(false);
  };

  const handleDeleteRole = (roleId: string) => {
    const updated = customRoles.filter(r => r.id !== roleId);
    setCustomRoles(updated);
    onRolesChange?.(updated);
    toast('Custom role removed');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Info banner */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-start gap-3">
          <Shield className="size-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-foreground">Role-Based Access Control</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Configure what each role can see and do in your event. The Creator/Admin always has full access and cannot be restricted. Changes apply immediately to all team members with that role.
                </p>
              </div>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none ml-4 flex-shrink-0"
                onClick={() => openCreateModal()}
              >
                <Zap className="size-3.5 mr-1.5" />
                Create Custom Role
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Roles Summary */}
      {customRoles.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Custom Roles ({customRoles.length})</h4>
          <div className="space-y-2">
            {customRoles.map(role => (
              <div key={role.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className={cn('rounded-md font-medium text-[10px] px-2 py-0.5 border', role.color)}>
                    {role.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{role.description || `Based on ${builtInRoleLabels[role.basePreset] || role.basePreset}`}</span>
                  <span className="text-[10px] text-muted-foreground/60">
                    {Object.values(role.permissions).filter(Boolean).length} permissions
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground" onClick={() => openEditModal(role)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteRole(role.id)}>
                    <X className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Matrix table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[220px]">Permission</th>
                {allRoles.map(role => (
                  <th key={role} className="text-center px-3 py-3 min-w-[90px]">
                    <Badge variant="secondary" className={cn('rounded-md font-medium text-[10px] px-2 py-0.5 border', ROLE_COLORS[role] || 'bg-muted text-foreground border-border')}>
                      {allRoleLabels[role]}
                    </Badge>
                  </th>
                ))}
              </tr>
            </thead>
            {groups.map((group, gi) => (
              <tbody key={`group-${gi}`}>
                  <tr className="bg-muted/40">
                    <td colSpan={allRoles.length + 1} className="px-5 py-2">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{group.group}</span>
                    </td>
                  </tr>
                  {group.permissions.map((perm) => (
                    <tr key={perm.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                      <td className="px-5 py-3">
                        <div>
                          <p className="text-sm text-foreground">{perm.label}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{perm.desc}</p>
                        </div>
                      </td>
                      {allRoles.map(role => (
                        <td key={role} className="text-center px-3 py-3">
                          <button
                            onClick={() => handleToggle(role, perm.id)}
                            className={cn(
                              'size-7 rounded-md mx-auto flex items-center justify-center transition-all border',
                              fullMatrix[role]?.[perm.id]
                                ? 'bg-primary text-white border-primary hover:bg-primary/90'
                                : 'bg-card text-muted-foreground/30 border-border hover:border-primary/30 hover:bg-primary/5'
                            )}
                          >
                            {fullMatrix[role]?.[perm.id] ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 text-white min-w-[100px]">
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Create / Edit Custom Role Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-[560px] bg-card border-border max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground">{editingRole ? 'Edit Custom Role' : 'Create Custom Role'}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editingRole
                ? 'Update this role\'s name, description, and permissions.'
                : 'Start from a preset and customize permissions to fit your needs.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Role Name */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground">Role Name *</Label>
              <Input
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="e.g. Stage Manager, Volunteer Lead, Panelist"
                className="border-border h-9"
                disabled={!!editingRole}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground">Description</Label>
              <Input
                value={newRoleDesc}
                onChange={(e) => setNewRoleDesc(e.target.value)}
                placeholder="Brief description of this role's responsibilities"
                className="border-border h-9"
              />
            </div>

            {/* Base Preset */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground">Start from Preset</Label>
              <p className="text-[11px] text-muted-foreground">Choose a built-in role as a starting point, then customize below.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {builtInRoles.map(role => (
                  <button
                    key={role}
                    onClick={() => handlePresetChange(role)}
                    className={cn(
                      'px-3 py-1.5 text-xs rounded-full border transition-colors',
                      newRolePreset === role
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card text-muted-foreground border-border hover:border-primary/30'
                    )}
                  >
                    {builtInRoleLabels[role]}
                  </button>
                ))}
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-1.5">
              <Label className="text-sm text-foreground">Permissions</Label>
              <div className="border border-border rounded-lg overflow-hidden max-h-[300px] overflow-y-auto">
                {groups.map((group, gi) => (
                  <div key={gi}>
                    <div className="bg-muted/50 px-4 py-2 border-b border-border">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{group.group}</span>
                    </div>
                    {group.permissions.map(perm => (
                      <label
                        key={perm.id}
                        className="flex items-center justify-between px-4 py-2.5 border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer"
                      >
                        <div className="flex-1 mr-3">
                          <p className="text-sm text-foreground">{perm.label}</p>
                          <p className="text-[10px] text-muted-foreground">{perm.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setNewRolePermissions(prev => ({ ...prev, [perm.id]: !prev[perm.id] }))}
                          className={cn(
                            'size-6 rounded-md flex items-center justify-center transition-all border flex-shrink-0',
                            newRolePermissions[perm.id]
                              ? 'bg-primary text-white border-primary'
                              : 'bg-card text-muted-foreground/30 border-border'
                          )}
                        >
                          {newRolePermissions[perm.id] ? <Check className="size-3" /> : <X className="size-3" />}
                        </button>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                {Object.values(newRolePermissions).filter(Boolean).length} of {Object.keys(newRolePermissions).length} permissions enabled
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" className="border-border text-foreground" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveRole}
              disabled={!newRoleName.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
            >
              {editingRole ? 'Update Role' : 'Create Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
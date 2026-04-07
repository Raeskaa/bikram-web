import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import {
  Calendar,
  Users as UsersIcon,
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  Upload,
  Info,
  Wand2,
  Check,
  Edit,
  RotateCcw,
  Plus,
  X,
  Award,
  Rocket,
  Copy,
  ExternalLink,
  DollarSign,
  CircleDot,
  Activity,
  TrendingUp,
  BarChart3,
  Star,
  Ticket,
  Target,
  UserCheck,
  Video,
  FileText,
  Wifi,
  Coffee,
  Mail,
  Share2,
  QrCode,
  ImageIcon,
  Trash2,
} from 'lucide-react';

interface EventBuilderOverviewSectionProps {
  eventTitle: string;
  eventDescription: string;
  setEventDescription: (value: string) => void;
  eventLocation: string;
  setEventLocation: (value: string) => void;
  eventCapacity: string;
  setEventCapacity: (value: string) => void;
  handleRegenerateField: (field: string) => void;
  isRegenerating: string | null;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
  registeredCount: number;
  waitlistCount: number;
  checkedInCount: number;
  healthScore: number;
  registrationRate: number;
  attendancePredict: number;
  onCreateCommunity?: () => void;
  isDraft?: boolean;
  lifecycle?: string;
  eventDate?: string;
  eventTime?: string;
  eventType?: 'virtual' | 'in-person' | 'hybrid';
  onCoverImageChange?: (hasCover: boolean) => void;
  triggerCoverUpload?: boolean;
  onTriggerCoverUploadDone?: () => void;
  sessionCount?: number;
  speakerCount?: number;
  ticketCount?: number;
  isPaid?: boolean;
  ticketPrice?: number;
  onPreview?: () => void;
  onPublish?: () => void;
  onSharePreview?: () => void;
  onGenerateQR?: () => void;
  onDuplicate?: () => void;
}

export function EventBuilderOverviewSection({
  eventTitle,
  eventDescription,
  setEventDescription,
  eventLocation,
  setEventLocation,
  eventCapacity,
  setEventCapacity,
  handleRegenerateField,
  isRegenerating,
  editingField,
  setEditingField,
  registeredCount,
  waitlistCount,
  checkedInCount,
  healthScore,
  registrationRate,
  attendancePredict,
  onCreateCommunity,
  isDraft = false,
  lifecycle = 'published',
  eventDate,
  eventTime,
  eventType,
  onCoverImageChange,
  triggerCoverUpload,
  onTriggerCoverUploadDone,
  sessionCount = 0,
  speakerCount = 0,
  ticketCount = 0,
  isPaid = false,
  ticketPrice,
  onPreview,
  onPublish,
  onSharePreview,
  onGenerateQR,
  onDuplicate,
}: EventBuilderOverviewSectionProps) {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSkeleton = lifecycle === 'skeleton';
  const isBuilding = lifecycle === 'building';
  const isReady = lifecycle === 'ready';

  // Trigger cover upload from parent (checklist button)
  useEffect(() => {
    if (triggerCoverUpload && fileInputRef.current) {
      fileInputRef.current.click();
      onTriggerCoverUploadDone?.();
    }
  }, [triggerCoverUpload, onTriggerCoverUploadDone]);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (PNG, JPG, or WebP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setCoverImage(e.target?.result as string);
      onCoverImageChange?.(true);
      toast.success('Cover image uploaded.');
    };
    reader.readAsDataURL(file);
  }, [onCoverImageChange]);

  const handleRemoveCover = () => {
    setCoverImage(null);
    onCoverImageChange?.(false);
    toast.success('Cover image removed.');
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  // Format date/time for display
  const formatDateTime = () => {
    if (!eventDate && !eventTime) return null;
    const parts: string[] = [];
    if (eventDate) {
      try {
        const d = new Date(eventDate + 'T00:00:00');
        parts.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
      } catch {
        parts.push(eventDate);
      }
    }
    if (eventTime) {
      try {
        const [h, m] = eventTime.split(':');
        const hour = parseInt(h);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        parts.push(`${displayHour}:${m} ${ampm}`);
      } catch {
        parts.push(eventTime);
      }
    }
    return parts.join(' \u00B7 ');
  };

  const formattedDateTime = formatDateTime();

  // Lifecycle badge
  const renderBadges = () => {
    if (isDraft) {
      if (isSkeleton) {
        return (
          <Badge className="bg-muted text-muted-foreground border-border rounded-lg shadow-none">
            <Calendar className="size-3 mr-1" />
            Draft
          </Badge>
        );
      }
      if (isBuilding) {
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-100 rounded-lg shadow-none">
            <Calendar className="size-3 mr-1" />
            Building
          </Badge>
        );
      }
      if (isReady) {
        return (
          <>
            <Badge className="bg-green-50 text-green-700 border-green-100 rounded-lg shadow-none">
              <CheckCircle className="size-3 mr-1" />
              Ready to Publish
            </Badge>
          </>
        );
      }
    }
    return (
      <>
        <Badge className="bg-primary/10 text-primary border-primary/20 rounded-lg shadow-none">
          <Calendar className="size-3 mr-1" />
          Live Event
        </Badge>
        <Badge className="bg-green-50 text-green-700 border-green-100 rounded-lg shadow-none">
          <CheckCircle className="size-3 mr-1" />
          Published
        </Badge>
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Cover Image Upload */}
      <div className="bg-card rounded-xl overflow-hidden border border-border shadow-none">
        <div
          className={`relative h-48 transition-colors ${coverImage ? '' : 'bg-muted'} ${isDragging ? 'ring-2 ring-primary ring-inset' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {coverImage ? (
            <img src={coverImage} alt="Event cover" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-muted" />
          )}
          {/* Overlay for text readability */}
          {coverImage && <div className="absolute inset-0 bg-black/30" />}
          <div className="relative h-full p-8 flex flex-col justify-end">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  {renderBadges()}
                  {eventType && (
                    <Badge variant="secondary" className="rounded-lg shadow-none capitalize">
                      {eventType === 'virtual' && <Video className="size-3 mr-1" />}
                      {eventType === 'in-person' && <MapPin className="size-3 mr-1" />}
                      {eventType === 'hybrid' && <Wifi className="size-3 mr-1" />}
                      {eventType}
                    </Badge>
                  )}
                </div>
                <h1 className={`text-2xl mb-2 font-semibold tracking-tight ${coverImage ? 'text-white' : 'text-foreground'}`}>{eventTitle}</h1>
                {eventDescription ? (
                  <p className={`text-sm max-w-2xl font-medium ${coverImage ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {eventDescription}
                  </p>
                ) : (
                  <p className={`text-sm max-w-2xl font-medium italic ${coverImage ? 'text-white/50' : 'text-muted-foreground/60'}`}>
                    No description yet -- add one in the Event Information section below
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {coverImage && (
                  <Button variant="outline" size="sm" className="bg-card/80 backdrop-blur rounded-lg border-border text-foreground" onClick={handleRemoveCover}>
                    <Trash2 className="size-3.5 mr-2" />
                    Remove
                  </Button>
                )}
                <Button variant="outline" size="sm" className={`rounded-lg border-border ${coverImage ? 'bg-card/80 backdrop-blur text-foreground' : 'bg-card'}`} onClick={() => fileInputRef.current?.click()}>
                  <Upload className="size-3.5 mr-2" />
                  {coverImage ? 'Change Cover' : 'Upload Cover'}
                </Button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
              </div>
            </div>
          </div>
          {/* Drop zone overlay */}
          {isDragging && (
            <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-xl flex items-center justify-center z-10">
              <div className="text-center">
                <ImageIcon className="size-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-primary font-medium">Drop image here</p>
              </div>
            </div>
          )}
          {/* Empty state nudge */}
          {!coverImage && !isDragging && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60">
              <div className="text-center">
                <ImageIcon className="size-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Drag & drop or click "Upload Cover"</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Recommended: 1200 x 400px, PNG or JPG, max 5 MB</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Quick Stats Bar */}
        <div className="bg-muted border-t border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <UsersIcon className="size-4 text-primary" />
                <span className="text-foreground">
                  <span className="font-semibold">{registeredCount}</span>
                  <span className="text-muted-foreground text-sm ml-1 font-medium">registered</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                {formattedDateTime ? (
                  <span className="text-foreground text-sm font-medium">{formattedDateTime}</span>
                ) : (
                  <span className="text-muted-foreground/60 text-sm font-medium italic">Date not set</span>
                )}
              </div>
              {isDraft ? (
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <span className="text-foreground text-sm font-medium">
                      <span className="font-semibold">{sessionCount}</span>
                      <span className="text-muted-foreground ml-1">{sessionCount === 1 ? 'session' : 'sessions'}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="size-4 text-muted-foreground" />
                    <span className="text-foreground text-sm font-medium">
                      <span className="font-semibold">{speakerCount}</span>
                      <span className="text-muted-foreground ml-1">{speakerCount === 1 ? 'speaker' : 'speakers'}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ticket className="size-4 text-muted-foreground" />
                    <span className="text-foreground text-sm font-medium">
                      {ticketCount > 0 ? (
                        <><span className="font-semibold">{ticketCount}</span><span className="text-muted-foreground ml-1">{ticketCount === 1 ? 'tier' : 'tiers'}</span></>
                      ) : (
                        <span className="text-muted-foreground">Free</span>
                      )}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-muted-foreground" />
                    {eventLocation ? (
                      <span className="text-foreground text-sm font-medium">{eventLocation}</span>
                    ) : (
                      <span className="text-muted-foreground/60 text-sm font-medium italic">Location not set</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="size-4 text-green-600" />
                    <span className="text-foreground">
                      <span className="font-semibold">{registrationRate}%</span>
                      <span className="text-muted-foreground text-sm ml-1 font-medium">capacity</span>
                    </span>
                  </div>
                </>
              )}
            </div>
            {!isDraft && (
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none font-semibold">
                <Eye className="size-3.5 mr-2" />
                Preview Event
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* THE HOOK - Only show for building/ready/published (not skeleton) */}
      {!isSkeleton && (
      <div className="bg-primary rounded-xl p-6 shadow-none">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Rocket className="size-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">The Hook</h3>
              <p className="text-white/60 text-sm font-medium">What makes this event irresistible?</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 rounded-lg font-semibold">
            <Wand2 className="size-3.5 mr-2" />
            AI Enhance
          </Button>
        </div>
        
        {eventDescription ? (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white leading-relaxed font-medium">
              {eventDescription}
            </p>
          </div>
        ) : (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-white/40 leading-relaxed font-medium italic">
              Add a description to your event and AI will help craft a compelling hook...
            </p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Award className="size-4 text-white/60" />
              <span className="text-[10px] text-white/60 font-semibold uppercase tracking-normal">Value Prop</span>
            </div>
            <p className="text-white text-sm font-semibold">Expert Speakers</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Star className="size-4 text-white/60" />
              <span className="text-[10px] text-white/60 font-semibold uppercase tracking-normal">Social Proof</span>
            </div>
            <p className="text-white text-sm font-semibold">{registeredCount > 0 ? `${registeredCount}+ Attendees` : 'Be the First'}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="size-4 text-white/60" />
              <span className="text-[10px] text-white/60 font-semibold uppercase tracking-normal">Urgency</span>
            </div>
            <p className="text-white text-sm font-semibold">{eventCapacity ? `${eventCapacity} Seats` : 'Unlimited'}</p>
          </div>
        </div>
      </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="col-span-2 space-y-6">
          {/* Core Information */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground flex items-center gap-2 font-semibold">
                <Info className="size-5 text-primary" />
                Event Information
              </h3>
              <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/5 rounded-lg font-semibold">
                <Wand2 className="size-3.5 mr-2" />
                AI Enhance
              </Button>
            </div>

            <div className="space-y-5">
              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-foreground">Description</label>
                  <div className="flex gap-2">
                    {editingField === 'description' ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingField(null)}
                        className="h-7 px-2 text-xs rounded-lg font-semibold"
                      >
                        <Check className="size-3 mr-1" />
                        Done
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingField('description')}
                          className="h-7 px-2 text-xs text-muted-foreground rounded-lg font-semibold"
                        >
                          <Edit className="size-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRegenerateField('description')}
                          disabled={isRegenerating === 'description'}
                          className="h-7 px-2 text-xs text-primary rounded-lg font-semibold"
                        >
                          <RotateCcw className={`size-3 mr-1 ${isRegenerating === 'description' ? 'animate-spin' : ''}`} />
                          Regenerate
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                {editingField === 'description' ? (
                  <Textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    rows={4}
                    className="resize-none rounded-lg"
                    placeholder="Describe your event -- what will attendees learn or experience?"
                  />
                ) : eventDescription ? (
                  <p className="text-muted-foreground leading-relaxed font-medium">{eventDescription}</p>
                ) : (
                  <button
                    onClick={() => setEditingField('description')}
                    className="w-full text-left p-4 border-2 border-dashed border-border rounded-lg text-muted-foreground/60 hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    <p className="text-sm italic">Click to add a description for your event...</p>
                  </button>
                )}
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-normal mb-2 block">Date & Time</label>
                  {formattedDateTime ? (
                    <span className="text-foreground font-medium text-sm">{formattedDateTime}</span>
                  ) : (
                    <span className="text-muted-foreground/60 font-medium text-sm italic">Not set</span>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-normal mb-2 block">Event Type</label>
                  <span className="text-foreground font-medium text-sm capitalize">{eventType || 'Not set'}</span>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-normal mb-2 block">Category</label>
                  <span className="text-foreground font-medium text-sm">Auto-detected by AI</span>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-normal mb-2 block">Capacity</label>
                  <span className="text-foreground font-medium text-sm">{eventCapacity ? `${eventCapacity} attendees` : 'Unlimited'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Capacity */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-none">
            <h3 className="text-foreground flex items-center gap-2 mb-5 font-semibold">
              <MapPin className="size-5 text-primary" />
              Venue & Capacity
            </h3>

            <div className="space-y-5">
              {/* Location */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-foreground">Location</label>
                  <div className="flex gap-2">
                    {editingField === 'location' ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingField(null)}
                        className="h-7 px-2 text-xs rounded-lg font-semibold"
                      >
                        <Check className="size-3 mr-1" />
                        Done
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingField('location')}
                          className="h-7 px-2 text-xs text-muted-foreground rounded-lg font-semibold"
                        >
                          <Edit className="size-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRegenerateField('location')}
                          disabled={isRegenerating === 'location'}
                          className="h-7 px-2 text-xs text-primary rounded-lg font-semibold"
                        >
                          <RotateCcw className={`size-3 mr-1 ${isRegenerating === 'location' ? 'animate-spin' : ''}`} />
                          Suggest
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                {editingField === 'location' ? (
                  <Input
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="rounded-lg"
                    placeholder={eventType === 'virtual' ? 'Meeting link or platform' : 'Venue address'}
                  />
                ) : eventLocation ? (
                  <p className="text-muted-foreground font-medium">{eventLocation}</p>
                ) : (
                  <button
                    onClick={() => setEditingField('location')}
                    className="w-full text-left p-3 border-2 border-dashed border-border rounded-lg text-muted-foreground/60 hover:border-primary/30 hover:text-primary transition-colors"
                  >
                    <p className="text-sm italic">
                      {eventType === 'virtual' ? 'Click to add meeting link...' : 'Click to add venue location...'}
                    </p>
                  </button>
                )}
              </div>

              {/* Capacity */}
              <div className="pt-4 border-t border-border">
                <label className="text-sm font-semibold text-foreground mb-3 block">Capacity</label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={eventCapacity}
                    onChange={(e) => setEventCapacity(e.target.value)}
                    className="w-32 rounded-lg"
                    placeholder="100"
                  />
                  <span className="text-sm text-muted-foreground font-medium">attendees</span>
                </div>
                {registeredCount > 0 && eventCapacity && (
                  <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <p className="text-sm text-primary font-medium">
                      <span className="font-semibold">{registeredCount}</span> registered · <span className="font-semibold">{parseInt(eventCapacity as string) - registeredCount}</span> spots remaining
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* What's Included - only for building+ events */}
          {!isSkeleton && (
          <div className="bg-card border border-border rounded-xl p-6 shadow-none">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground flex items-center gap-2 font-semibold">
                <CheckCircle className="size-5 text-primary" />
                What's Included
              </h3>
              <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/5 rounded-lg font-semibold">
                <Plus className="size-3.5 mr-2" />
                Add Item
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                sessionCount > 0 ? `${sessionCount} session${sessionCount !== 1 ? 's' : ''} scheduled` : "All-day access to sessions",
                speakerCount > 0 ? `${speakerCount} speaker${speakerCount !== 1 ? 's' : ''} confirmed` : "Networking opportunities",
                "Certificate of attendance",
                ticketCount > 0 ? `${ticketCount} ticket tier${ticketCount !== 1 ? 's' : ''} available` : "Access to recordings"
              ].map((item, i) => (
                <div key={i} className="flex gap-2 items-start p-3 rounded-xl border border-border hover:border-primary/10 transition-colors">
                  <Check className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="flex-1 text-sm text-muted-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-none">
            <h3 className="text-foreground text-sm font-semibold mb-4 uppercase tracking-normal">Quick Actions</h3>
            <div className="space-y-2">
              {isDraft ? (
                <>
                  <Button className="w-full justify-start bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none font-semibold" disabled={isSkeleton} onClick={onPublish}>
                    <Rocket className="size-4 mr-2" />
                    {isReady ? 'Publish Event' : isBuilding ? 'Publish (add title, description & date)' : 'Publish (complete setup first)'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground" onClick={onPreview}>
                    <Eye className="size-4 mr-2 text-muted-foreground" />
                    Preview Page
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground" onClick={onSharePreview}>
                    <Share2 className="size-4 mr-2 text-muted-foreground" />
                    Share Draft Preview
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground" onClick={onGenerateQR}>
                    <QrCode className="size-4 mr-2 text-muted-foreground" />
                    QR Code
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground" onClick={onDuplicate}>
                    <Copy className="size-4 mr-2 text-muted-foreground" />
                    Duplicate Event
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground">
                    <Eye className="size-4 mr-2 text-muted-foreground" />
                    Preview Page
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground">
                    <Share2 className="size-4 mr-2 text-muted-foreground" />
                    Share Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start rounded-lg border-border font-semibold text-muted-foreground">
                    <QrCode className="size-4 mr-2 text-muted-foreground" />
                    QR Code
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Registration & Tickets - only for published+ */}
          {!isDraft && (
          <div className="bg-card border border-border rounded-xl p-5 shadow-none">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground text-sm font-semibold">Registration</h3>
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs rounded-lg font-semibold">
                <Edit className="size-3 mr-1" />
                Edit
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-muted-foreground font-semibold uppercase tracking-normal block mb-1">Ticket Price</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4 text-green-600" />
                  <span className="text-foreground font-semibold text-sm">$99 General Admission</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground font-semibold uppercase tracking-normal block mb-1">Status</label>
                <Badge className="bg-green-50 text-green-700 border-green-100 rounded-lg shadow-none font-semibold">
                  <CircleDot className="size-3 mr-1" />
                  Open
                </Badge>
              </div>
            </div>
          </div>
          )}

          {/* Event Health */}
          {!isDraft ? (
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 shadow-none">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="size-5 text-primary" />
              <h3 className="text-foreground text-sm font-semibold">Event Health</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-semibold">OVERALL SCORE</span>
                  <span className="text-sm font-bold text-primary">{healthScore}/100</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${healthScore}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-primary/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Registration Rate</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">{registrationRate}%</span>
                    <TrendingUp className="size-3 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">Predicted Attendance</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">{attendancePredict}%</span>
                    <TrendingUp className="size-3 text-green-600" />
                  </div>
                </div>
              </div>

              <Button size="sm" variant="outline" className="w-full mt-3 border-primary/20 bg-card hover:bg-primary/5 rounded-lg text-primary font-semibold">
                <BarChart3 className="size-3.5 mr-2" />
                View Full Report
              </Button>
            </div>
          </div>
          ) : (
          <div className="bg-muted border border-border rounded-xl p-5 shadow-none">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="size-5 text-muted-foreground" />
              <h3 className="text-foreground text-sm font-semibold">Event Health</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Health score and analytics will be available once your event is published and registrations start coming in.
            </p>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

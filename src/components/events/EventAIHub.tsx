import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { 
  Zap, 
  BarChart2, 
  Copy, 
  RefreshCw,
  Check,
  Mail,
  MessageSquare,
  Slack,
  ArrowRight,
  Plus,
  Linkedin,
  Twitter,
  Instagram,
  Send,
  Link as LinkIcon,
  Edit3,
  Wifi,
  WifiOff,
  Image as ImageIcon,
  MoreVertical,
  Trash2,
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  Loader2,
  FileText,
  Filter,
  Search,
  LayoutGrid,
  List as ListIcon,
  Megaphone,
  Bell,
  CheckCircle2,
  X,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { cn } from '../ui/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '../ui/dropdown-menu';

// --- Types ---

type ChannelType = 'linkedin' | 'twitter' | 'slack' | 'email' | 'instagram';
type LifecycleStage = 'announce' | 'engage' | 'remind' | 'follow-up';
type IntegrationStatus = 'connected' | 'disconnected';

interface ContentPiece {
  id: string;
  type: ChannelType;
  stage: LifecycleStage;
  title: string;
  content: string;
  image?: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduledDate?: string;
  isRegenerating?: boolean;
}

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
  lastRun?: string;
}

// --- Icons Helper ---

const ChannelIcon = ({ type, className }: { type: ChannelType, className?: string }) => {
    switch (type) {
        case 'linkedin': return <Linkedin className={className} />;
        case 'twitter': return <Twitter className={className} />;
        case 'slack': return <Slack className={className} />;
        case 'email': return <Mail className={className} />;
        case 'instagram': return <Instagram className={className} />;
        default: return <Zap className={className} />;
    }
};

const ChannelColor = (type: ChannelType) => {
    switch (type) {
        case 'linkedin': return 'bg-[#0077b5] border-[#0077b5] text-white';
        case 'twitter': return 'bg-black border-black text-white';
        case 'slack': return 'bg-[#4A154B] border-[#4A154B] text-white';
        case 'email': return 'bg-orange-500 border-orange-500 text-white';
        case 'instagram': return 'bg-gradient-to-br from-purple-500 to-orange-500 border-none text-white';
        default: return 'bg-muted-foreground text-white';
    }
};

export function EventAIHub({ eventTitle }: { eventTitle: string }) {
  const [activeTab, setActiveTab] = useState<'composer' | 'workflows' | 'analysis'>('composer');
  
  // --- Composer State ---
  const [contentPieces, setContentPieces] = useState<ContentPiece[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | 'all'>('all');
  const [selectedStage, setSelectedStage] = useState<LifecycleStage | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // --- Workflows State ---
  const [workflows, setWorkflows] = useState<Workflow[]>([
    { id: '1', name: 'Welcome Sequence', trigger: 'New Registration', action: 'Send Email', active: true, lastRun: '2m ago' },
    { id: '2', name: 'Event Reminder', trigger: '1 Hour Before', action: 'Send SMS', active: true, lastRun: 'Pending' },
    { id: '3', name: 'Post-Event Feedback', trigger: 'Event Ends', action: 'Send Survey', active: false },
    { id: '4', name: 'VIP Alert', trigger: 'VIP Check-in', action: 'Notify Slack', active: true, lastRun: '1h ago' }
  ]);
  const [isBuildingWorkflow, setIsBuildingWorkflow] = useState(false);
  const [newWorkflowStep, setNewWorkflowStep] = useState(1);
  const [newWorkflowData, setNewWorkflowData] = useState({ trigger: '', action: '' });


  // --- Initialization ---
  useEffect(() => {
    // Generate a rich set of initial content
    const initialContent: ContentPiece[] = [
      // Announcement Phase
      {
        id: '1',
        type: 'linkedin',
        stage: 'announce',
        title: 'Major Announcement',
        status: 'draft',
        content: `🚀 Big News! We are officially launching ${eventTitle}. \n\nThis isn't just another event. It's a gathering of the minds you won't want to miss.\n\nEARLY BIRD tickets are now live! 👇`,
        image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwdGVjaCUyMGV2ZW50JTIwcHJvbW8lMjBncmFwaGljfGVufDF8fHx8MTc3MTI0Mjk5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '2',
        type: 'twitter',
        stage: 'announce',
        title: 'Hype Thread',
        status: 'draft',
        content: `1/5 The secret is out. ${eventTitle} is coming. 🌊\n\nHere is everything you need to know about the biggest industry meetup of the year.`
      },
      {
        id: '3',
        type: 'email',
        stage: 'announce',
        title: 'Invite Your Network',
        status: 'scheduled',
        scheduledDate: 'Tomorrow, 9:00 AM',
        content: `Subject: You're invited to ${eventTitle}\n\nHi [Name],\n\nWe've saved a seat for you at ${eventTitle}. This is your chance to connect with...`
      },
      
      // Engagement Phase
      {
        id: '4',
        type: 'linkedin',
        stage: 'engage',
        title: 'Speaker Reveal',
        status: 'draft',
        content: `🎤 We are honored to welcome our Keynote Speaker for ${eventTitle}!\n\nGet ready to be inspired by their journey in tech innovation. #SpeakerReveal`,
        image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2VyJTIwb24lMjBzdGFnZXxlbnwxfHx8fDE3NzEyNDMwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      {
        id: '5',
        type: 'instagram',
        stage: 'engage',
        title: 'Behind the Scenes',
        status: 'draft',
        content: `👀 Sneak peek at the venue for ${eventTitle}. Who's excited?`,
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHZlbnVlfGVufDF8fHx8MTc3MTI0MzA1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      },
      
      // Reminder Phase
      {
        id: '6',
        type: 'slack',
        stage: 'remind',
        title: 'Internal Reminder',
        status: 'published',
        content: `@channel 🚨 ${eventTitle} is in 3 days! Please ensure all client invites are sent out by EOD.`
      },
      
      // Follow-up Phase
      {
        id: '7',
        type: 'email',
        stage: 'follow-up',
        title: 'Thank You Note',
        status: 'draft',
        content: `Subject: What a day! Thanks for joining ${eventTitle}\n\nHi [Name],\n\nWe hope you enjoyed the sessions. Here are the slide decks from today...`
      }
    ];
    setContentPieces(initialContent);
  }, [eventTitle]);


  // --- Actions ---

  const handleRegenerate = (id: string) => {
    setContentPieces(prev => prev.map(p => p.id === id ? { ...p, isRegenerating: true } : p));
    setTimeout(() => {
        setContentPieces(prev => prev.map(p => p.id === id ? { ...p, isRegenerating: false, content: p.content + ' (v2)' } : p));
        toast.success("Content refreshed");
    }, 1200);
  };

  const handleCreateNew = (type: ChannelType) => {
      const newId = Date.now().toString();
      const newPiece: ContentPiece = {
          id: newId,
          type,
          stage: selectedStage === 'all' ? 'announce' : selectedStage,
          title: 'New Draft',
          status: 'draft',
          content: `New ${type} draft for ${eventTitle}...`
      };
      setContentPieces([newPiece, ...contentPieces]);
      toast.success("New draft created");
  };

  // --- Filter Logic ---
  
  const filteredContent = contentPieces.filter(piece => {
      const matchChannel = selectedChannel === 'all' || piece.type === selectedChannel;
      const matchStage = selectedStage === 'all' || piece.stage === selectedStage;
      const matchSearch = piece.title.toLowerCase().includes(searchQuery.toLowerCase()) || piece.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchChannel && matchStage && matchSearch;
  });

  const getCount = (type: ChannelType) => contentPieces.filter(p => p.type === type).length;


  // --- Render Helpers ---

  const renderContentCard = (piece: ContentPiece) => (
    <div key={piece.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all flex flex-col group h-full">
        {/* Header */}
        <div className="p-4 border-b border-border/50 flex items-start justify-between bg-muted/10">
            <div className="flex items-center gap-3">
                <div className={`size-8 rounded-lg flex items-center justify-center border ${ChannelColor(piece.type)}`}>
                    <ChannelIcon type={piece.type} className="size-4" />
                </div>
                <div>
                    <h3 className="font-semibold text-foreground text-sm truncate max-w-[150px]">{piece.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px] h-4 px-1 font-normal bg-muted text-muted-foreground border-border capitalize">
                            {piece.stage}
                        </Badge>
                        {piece.status === 'published' && <span className="text-[10px] text-green-600 flex items-center gap-0.5"><CheckCircle2 className="size-3" /> Posted</span>}
                        {piece.status === 'scheduled' && <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Clock className="size-3" /> {piece.scheduledDate}</span>}
                    </div>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground">
                        <MoreVertical className="size-3.5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleRegenerate(piece.id)}>Regenerate</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        {/* Image Preview (Small) */}
        {piece.image && (
            <div className="relative h-32 bg-muted border-b border-border/50 group-hover:opacity-90 transition-opacity">
                <img src={piece.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
        )}

        {/* Content */}
        <div className="p-4 flex-1 relative min-h-[140px]">
             <Textarea 
                value={piece.content}
                onChange={(e) => {
                    const newVal = e.target.value;
                    setContentPieces(prev => prev.map(p => p.id === piece.id ? { ...p, content: newVal } : p));
                }}
                className={cn(
                    "h-full min-h-[100px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0 text-muted-foreground text-sm leading-relaxed font-normal",
                    piece.isRegenerating && "opacity-50 blur-[1px]"
                )}
            />
             {piece.isRegenerating && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-card/90 px-3 py-1.5 rounded-full border border-border flex items-center gap-2 text-xs font-medium text-primary">
                        <Loader2 className="size-3 animate-spin" />
                        Thinking...
                    </div>
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-border/50 bg-muted/30 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-muted-foreground">{piece.content.length} chars</span>
            <div className="flex gap-2">
                 <Button size="sm" variant="ghost" className="h-7 text-xs px-2 text-muted-foreground" onClick={() => handleRegenerate(piece.id)}>
                    <RefreshCw className="size-3 mr-1.5" /> Retry
                 </Button>
                 <Button size="sm" className="h-7 text-xs px-3 bg-primary hover:bg-primary/90">
                    {piece.status === 'scheduled' ? 'Reschedule' : 'Post Now'}
                 </Button>
            </div>
        </div>
    </div>
  );


  // --- Main Render ---

  return (
    <div className="flex flex-col h-full bg-background text-foreground font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-border bg-background sticky top-0 z-20">
        <div>
            <h2 className="text-xl font-bold text-primary">AI & Automations</h2>
            <p className="text-xs text-muted-foreground mt-1">Smart tools to promote, manage, and analyze your event.</p>
        </div>
        
        <div className="flex bg-muted/50 p-1 rounded-lg">
            {(['composer', 'workflows', 'analysis'] as const).map((tab) => (
                <button
                    key={tab}
                    onClick={() => {
                        setActiveTab(tab);
                        setIsBuildingWorkflow(false);
                    }}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        activeTab === tab 
                        ? 'bg-card text-primary' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-muted/30 relative flex flex-col">
          
        {/* COMPOSER TAB - TOP FILTER BAR + CONTENT */}
        {activeTab === 'composer' && (
            <div className="flex flex-col h-full">
                {/* Top Filter Bar - Sticky */}
                <div className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10 px-8 py-3 flex items-center justify-between gap-4">
                    
                    {/* Left Group: Search & Filters */}
                    <div className="flex items-center gap-3 flex-1">
                         {/* Search */}
                        <div className="relative group w-64">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input 
                                placeholder="Search content..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 pl-9 text-sm bg-muted border-border focus:bg-card focus:border-primary transition-all rounded-lg"
                            />
                        </div>

                        <Separator orientation="vertical" className="h-5 bg-border" />

                        {/* Channel Filter (Dropdown) */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-9 px-3 text-sm border-border bg-card text-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 font-medium min-w-[140px] justify-between">
                                    <span className="flex items-center gap-2">
                                        {selectedChannel === 'all' ? <LayoutGrid className="size-4" /> : <ChannelIcon type={selectedChannel} className="size-4" />}
                                        <span className="capitalize">{selectedChannel === 'all' ? 'All Channels' : selectedChannel}</span>
                                    </span>
                                    <ChevronDown className="size-3.5 opacity-50 ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56">
                                <DropdownMenuLabel>Filter by Channel</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={selectedChannel} onValueChange={(v) => setSelectedChannel(v as any)}>
                                    <DropdownMenuRadioItem value="all" className="flex items-center justify-between">
                                        <span className="flex items-center gap-2"><LayoutGrid className="size-4 opacity-70" /> All Channels</span>
                                        <span className="text-xs text-muted-foreground">{contentPieces.length}</span>
                                    </DropdownMenuRadioItem>
                                    {(['linkedin', 'twitter', 'email', 'slack', 'instagram'] as const).map(ch => (
                                        <DropdownMenuRadioItem key={ch} value={ch} className="flex items-center justify-between capitalize">
                                            <span className="flex items-center gap-2"><ChannelIcon type={ch} className="size-4 opacity-70" /> {ch}</span>
                                            {getCount(ch) > 0 && <span className="text-xs text-muted-foreground">{getCount(ch)}</span>}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Stage Filter (Dropdown) */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-9 px-3 text-sm border-border bg-card text-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/20 font-medium min-w-[130px] justify-between">
                                    <span className="flex items-center gap-2">
                                        <Filter className="size-3.5" />
                                        <span className="capitalize">{selectedStage === 'all' ? 'All Stages' : selectedStage.replace('-', ' ')}</span>
                                    </span>
                                    <ChevronDown className="size-3.5 opacity-50 ml-2" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48">
                                <DropdownMenuLabel>Filter by Stage</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={selectedStage} onValueChange={(v) => setSelectedStage(v as any)}>
                                    <DropdownMenuRadioItem value="all">All Stages</DropdownMenuRadioItem>
                                    {(['announce', 'engage', 'remind', 'follow-up'] as const).map(st => (
                                        <DropdownMenuRadioItem key={st} value={st} className="capitalize">
                                            {st.replace('-', ' ')}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Right Group: View & CTA */}
                    <div className="flex items-center gap-3">
                         {/* View Toggle */}
                        <div className="flex items-center border border-border rounded-lg p-0.5 bg-card h-9">
                            <button onClick={() => setViewMode('grid')} className={cn("px-2.5 h-full rounded-md transition-all flex items-center justify-center", viewMode === 'grid' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}>
                                <LayoutGrid className="size-4" />
                            </button>
                            <div className="w-px h-4 bg-border mx-0.5" />
                            <button onClick={() => setViewMode('list')} className={cn("px-2.5 h-full rounded-md transition-all flex items-center justify-center", viewMode === 'list' ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground")}>
                                <ListIcon className="size-4" />
                            </button>
                        </div>

                        {/* Draft Button */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-primary hover:bg-primary/90 text-white h-9 px-4 text-sm font-medium transition-all hover:scale-[1.02]">
                                    <Plus className="size-4 mr-2" /> Draft Content
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>Generate New Draft</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleCreateNew('linkedin')}>
                                    <Linkedin className="size-4 mr-2 text-[#0077b5]" /> LinkedIn Post
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCreateNew('twitter')}>
                                    <Twitter className="size-4 mr-2 text-black" /> Tweet / Thread
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCreateNew('email')}>
                                    <Mail className="size-4 mr-2 text-orange-500" /> Email Blast
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCreateNew('slack')}>
                                    <Slack className="size-4 mr-2 text-[#4A154B]" /> Slack Message
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Content Grid */}
                <ScrollArea className="flex-1 p-8">
                    {filteredContent.length > 0 ? (
                        <div className={cn("grid gap-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500", viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 max-w-3xl mx-auto")}>
                            {filteredContent.map(renderContentCard)}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground pb-20 pt-20">
                            <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4 border border-border">
                                <Search className="size-8 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-foreground font-medium mb-1">No content found</h3>
                            <p className="text-sm text-muted-foreground mb-4 max-w-xs text-center">We couldn't find any content matching your current filters.</p>
                            <Button variant="outline" onClick={() => { setSelectedChannel('all'); setSelectedStage('all'); setSearchQuery(''); }}>
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </ScrollArea>
            </div>
        )}

        {/* OTHER TABS (Workflows & Analysis) - Preserving Implementation */}
        
        {activeTab === 'workflows' && (
            <ScrollArea className="h-full">
            <div className="max-w-6xl mx-auto p-10 pb-32">
                {!isBuildingWorkflow ? (
                     <>
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">Automation Workflows</h3>
                                <p className="text-sm text-muted-foreground mt-1">Manage automated actions triggered by event activities.</p>
                            </div>
                            <Button 
                                className="bg-primary hover:bg-primary/90 text-white"
                                onClick={() => setIsBuildingWorkflow(true)}
                            >
                                <Plus className="size-4 mr-2" />
                                New Workflow
                            </Button>
                        </div>

                        <div className="bg-card rounded-xl border border-border overflow-hidden">
                            <div className="grid grid-cols-1 divide-y divide-border">
                                {workflows.map((workflow) => (
                                <div key={workflow.id} className="p-5 flex items-center justify-between hover:bg-muted transition-colors group">
                                    <div className="flex items-center gap-6">
                                        <div className={`size-10 rounded-lg flex items-center justify-center border ${workflow.active ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-muted border-border text-muted-foreground'}`}>
                                            <Zap className="size-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h4 className="font-semibold text-foreground text-sm">{workflow.name}</h4>
                                                {workflow.active ? (
                                                    <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full font-medium border border-green-100">Active</span>
                                                ) : (
                                                    <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-medium border border-border">Paused</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span className="font-medium text-foreground">{workflow.trigger}</span>
                                                <ArrowRight className="size-3 text-muted-foreground" />
                                                <span className="font-medium text-foreground">{workflow.action}</span>
                                                <span className="text-border mx-1">•</span>
                                                <span>Last run: {workflow.lastRun || 'Never'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Switch 
                                            checked={workflow.active}
                                            onCheckedChange={(checked) => setWorkflows(workflows.map(w => w.id === workflow.id ? { ...w, active: checked } : w))}
                                            className="data-[state=checked]:bg-primary"
                                        />
                                        <div className="h-4 w-px bg-border" />
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                            <Edit3 className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                     </>
                 ) : (
                    <div className="max-w-2xl mx-auto animate-in zoom-in-50 duration-300">
                         {/* Workflow Builder Code */}
                         <div className="mb-6 flex items-center gap-2">
                             <Button variant="ghost" size="icon" onClick={() => setIsBuildingWorkflow(false)} className="h-8 w-8 rounded-full">
                                 <ArrowLeft className="size-4" />
                             </Button>
                             <h3 className="text-lg font-bold text-foreground">Create New Workflow</h3>
                         </div>
                         
                         <div className="bg-card rounded-xl border border-border p-8">
                             {newWorkflowStep === 1 && (
                                 <div className="space-y-6">
                                     <div>
                                         <label className="text-sm font-medium text-foreground mb-4 block">1. When this happens...</label>
                                         <div className="grid grid-cols-2 gap-3">
                                             {['New Registration', 'Event Starts', 'Event Ends', 'Ticket Sold Out', 'VIP Check-in'].map((trigger) => (
                                                 <button
                                                     key={trigger}
                                                     onClick={() => setNewWorkflowData({...newWorkflowData, trigger})}
                                                     className={`p-4 rounded-lg border text-left transition-all ${newWorkflowData.trigger === trigger ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'border-border hover:border-primary/20 hover:bg-muted'}`}
                                                 >
                                                     <span className={`text-sm font-medium ${newWorkflowData.trigger === trigger ? 'text-primary' : 'text-foreground'}`}>{trigger}</span>
                                                 </button>
                                             ))}
                                         </div>
                                     </div>
                                     <div className="flex justify-end pt-4">
                                         <Button 
                                            disabled={!newWorkflowData.trigger}
                                            onClick={() => setNewWorkflowStep(2)}
                                            className="bg-primary hover:bg-primary/90"
                                        >
                                             Next Step <ChevronRight className="size-4 ml-2" />
                                         </Button>
                                     </div>
                                 </div>
                             )}

                             {newWorkflowStep === 2 && (
                                 <div className="space-y-6">
                                     <div>
                                         <label className="text-sm font-medium text-foreground mb-4 block">2. Do this automatically...</label>
                                         <div className="grid grid-cols-2 gap-3">
                                             {['Send Email', 'Send SMS', 'Notify Slack', 'Add to Spreadsheet', 'Issue Certificate'].map((action) => (
                                                 <button
                                                     key={action}
                                                     onClick={() => setNewWorkflowData({...newWorkflowData, action})}
                                                     className={`p-4 rounded-lg border text-left transition-all ${newWorkflowData.action === action ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'border-border hover:border-primary/20 hover:bg-muted'}`}
                                                 >
                                                     <span className={`text-sm font-medium ${newWorkflowData.action === action ? 'text-primary' : 'text-foreground'}`}>{action}</span>
                                                 </button>
                                             ))}
                                         </div>
                                     </div>
                                     <div className="flex justify-between pt-4">
                                         <Button variant="ghost" onClick={() => setNewWorkflowStep(1)}>Back</Button>
                                         <Button 
                                            disabled={!newWorkflowData.action}
                                            onClick={() => {
                                                /* Create Logic from previous step */
                                                const newWorkflow: Workflow = {
                                                    id: Date.now().toString(),
                                                    name: 'New Automation',
                                                    trigger: newWorkflowData.trigger,
                                                    action: newWorkflowData.action,
                                                    active: true,
                                                    lastRun: 'Never'
                                                };
                                                setWorkflows([...workflows, newWorkflow]);
                                                setIsBuildingWorkflow(false);
                                                setNewWorkflowStep(1);
                                                setNewWorkflowData({ trigger: '', action: '' });
                                                toast.success("Workflow created successfully");
                                            }}
                                            className="bg-primary hover:bg-primary/90"
                                        >
                                             Create Workflow <Check className="size-4 ml-2" />
                                         </Button>
                                     </div>
                                 </div>
                             )}
                         </div>
                    </div>
                 )}
            </div>
            </ScrollArea>
        )}

        {activeTab === 'analysis' && (
            <ScrollArea className="h-full">
            <div className="max-w-6xl mx-auto p-10 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Insight Card 1 */}
                    <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/20 transition-all">
                       <div className="flex items-center justify-between mb-4">
                           <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Registration Pace</p>
                           <BarChart2 className="size-4 text-muted-foreground" />
                       </div>
                       <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-3xl font-bold text-foreground">68%</span>
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+4% today</span>
                       </div>
                       <div className="space-y-3 pt-2 border-t border-border/50">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                You are on track to sell out <span className="font-semibold text-foreground">3 days</span> before the event.
                            </p>
                       </div>
                    </div>

                     {/* Insight Card 2 */}
                     <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/20 transition-all">
                       <div className="flex items-center justify-between mb-4">
                           <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sentiment Pulse</p>
                           <MessageSquare className="size-4 text-muted-foreground" />
                       </div>
                       <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-3xl font-bold text-foreground">Positive</span>
                       </div>
                       <div className="space-y-2 pt-2 border-t border-border/50">
                           <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <Check className="size-4 text-green-500 shrink-0 mt-0.5" />
                                <span>Excitement about keynote speaker</span>
                           </div>
                           <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="size-4 rounded-full border border-orange-200 bg-orange-50 text-orange-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">!</span>
                                <span>Questions about parking validation</span>
                           </div>
                       </div>
                    </div>

                    {/* Insight Card 3 */}
                    <div className="bg-card p-6 rounded-xl border border-border hover:border-primary/20 transition-all flex flex-col h-full">
                       <div className="flex items-center justify-between mb-4">
                           <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Suggested Action</p>
                           <Zap className="size-4 text-primary" />
                       </div>
                       <div className="flex-1">
                            <h4 className="font-bold text-foreground mb-2">Send "Last Chance" Email?</h4>
                            <p className="text-sm text-muted-foreground mb-4">Registration has slowed down (-15%) in the last 24 hours.</p>
                       </div>
                       <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10 hover:text-primary bg-primary/5">
                            Draft Email
                       </Button>
                    </div>
                </div>
            </div>
            </ScrollArea>
        )}

      </div>
    </div>
  );
}
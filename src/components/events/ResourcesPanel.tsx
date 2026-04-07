import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  FileText,
  Link2,
  Upload,
  MoreVertical,
  Trash2,
  Download,
  Eye,
  EyeOff,
  Plus,
  Search,
  File,
  Image,
  Video as VideoIcon,
  Presentation,
  GripVertical,
  ExternalLink,
  MessageSquare,
  Award,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  Edit2,
  Pin,
  Lock,
  Sparkles,
  Users,
  BookOpen,
  Target,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type ResourceType = 'file' | 'link' | 'slide' | 'video';
type ResourceCategory = 'prework' | 'materials' | 'post-event' | 'general';

interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  category: ResourceCategory;
  url?: string;
  fileSize?: string;
  uploadedAt: string;
  visibility: 'public' | 'registered' | 'post-event';
  sessionId?: string;
  downloads: number;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  visible: boolean;
}

interface DiscussionSettings {
  enabled: boolean;
  preEventEnabled: boolean;
  postEventEnabled: boolean;
  moderationEnabled: boolean;
  allowAnonymous: boolean;
}

interface RecordingSettings {
  enabled: boolean;
  autoRecord: boolean;
  videoUrl?: string;
  chatReplayEnabled: boolean;
  releaseDate?: string;
}

interface CertificateSettings {
  enabled: boolean;
  template: 'basic' | 'premium' | 'custom';
  requiredAttendance: number;
  eligibleTiers: string[];
  customMessage?: string;
}

interface LearningOutcome {
  id: string;
  text: string;
  order: number;
}

interface TargetAudience {
  id: string;
  role: string;
  description: string;
  order: number;
}

interface Prerequisite {
  id: string;
  text: string;
  order: number;
}

const TYPE_ICONS: Record<ResourceType, React.ElementType> = {
  file: File,
  link: Link2,
  slide: Presentation,
  video: VideoIcon,
};

const TYPE_LABELS: Record<ResourceType, string> = {
  file: 'Document',
  link: 'External Link',
  slide: 'Slides',
  video: 'Video',
};

const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  prework: 'Pre-Work',
  materials: 'Workshop Materials',
  'post-event': 'Post-Event',
  general: 'General',
};

const VISIBILITY_LABELS: Record<Resource['visibility'], string> = {
  public: 'Public',
  registered: 'Registered Only',
  'post-event': 'Post-Event Only',
};

interface ResourcesPanelProps {
  isDraft?: boolean;
}

export function ResourcesPanel({ isDraft }: ResourcesPanelProps) {
  const [activeTab, setActiveTab] = useState<'resources' | 'faqs' | 'learning' | 'discussions' | 'recording' | 'certificates'>('resources');

  // Resources State
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      name: 'Event Agenda & Overview.pdf',
      type: 'file',
      category: 'prework',
      fileSize: '2.4 MB',
      uploadedAt: '2026-02-20',
      visibility: 'public',
      downloads: 45,
    },
    {
      id: '2',
      name: 'Speaker Slide Deck',
      type: 'slide',
      category: 'materials',
      fileSize: '8.1 MB',
      uploadedAt: '2026-02-22',
      visibility: 'registered',
      downloads: 32,
    },
    {
      id: '3',
      name: 'Workshop Recording',
      type: 'video',
      category: 'post-event',
      url: 'https://leapcast.ai/recordings/abc',
      uploadedAt: '2026-02-24',
      visibility: 'post-event',
      downloads: 0,
    },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addMode, setAddMode] = useState<'file' | 'link'>('file');
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<ResourceType>('file');
  const [newCategory, setNewCategory] = useState<ResourceCategory>('materials');
  const [newVisibility, setNewVisibility] = useState<Resource['visibility']>('public');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<ResourceCategory | 'all'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FAQs State
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'What should I bring to the event?',
      answer: 'Please bring your laptop, charger, and a notebook. We\'ll provide snacks and beverages.',
      order: 1,
      visible: true,
    },
    {
      id: '2',
      question: 'Will there be a recording available?',
      answer: 'Yes! All attendees will receive access to the recording within 24 hours after the event.',
      order: 2,
      visible: true,
    },
  ]);
  const [showAddFaqDialog, setShowAddFaqDialog] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Learning Content State
  const [learningOutcomes, setLearningOutcomes] = useState<LearningOutcome[]>([
    { id: '1', text: 'Build and deploy your first AI-powered application', order: 1 },
    { id: '2', text: 'Understand prompt engineering and best practices', order: 2 },
    { id: '3', text: 'Integrate OpenAI APIs into your existing workflows', order: 3 },
  ]);
  const [targetAudience, setTargetAudience] = useState<TargetAudience[]>([
    { id: '1', role: 'Developers', description: 'Looking to add AI capabilities to their apps', order: 1 },
    { id: '2', role: 'Product Managers', description: 'Wanting to understand AI-powered features', order: 2 },
    { id: '3', role: 'Designers', description: 'Exploring AI-assisted design workflows', order: 3 },
    { id: '4', role: 'Founders', description: 'Building AI-native startups', order: 4 },
  ]);
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([
    { id: '1', text: 'Basic understanding of Python (variables, functions, loops)', order: 1 },
    { id: '2', text: 'A laptop with internet access', order: 2 },
    { id: '3', text: 'GitHub account (free tier is fine)', order: 3 },
  ]);

  const [showAddOutcomeDialog, setShowAddOutcomeDialog] = useState(false);
  const [showAddAudienceDialog, setShowAddAudienceDialog] = useState(false);
  const [showAddPrereqDialog, setShowAddPrereqDialog] = useState(false);
  const [newOutcomeText, setNewOutcomeText] = useState('');
  const [newAudienceRole, setNewAudienceRole] = useState('');
  const [newAudienceDesc, setNewAudienceDesc] = useState('');
  const [newPrereqText, setNewPrereqText] = useState('');

  // Discussion Settings State
  const [discussionSettings, setDiscussionSettings] = useState<DiscussionSettings>({
    enabled: true,
    preEventEnabled: true,
    postEventEnabled: true,
    moderationEnabled: false,
    allowAnonymous: false,
  });

  // Recording Settings State
  const [recordingSettings, setRecordingSettings] = useState<RecordingSettings>({
    enabled: false,
    autoRecord: false,
    videoUrl: '',
    chatReplayEnabled: false,
    releaseDate: '',
  });

  // Certificate Settings State
  const [certificateSettings, setCertificateSettings] = useState<CertificateSettings>({
    enabled: false,
    template: 'basic',
    requiredAttendance: 80,
    eligibleTiers: ['general', 'vip'],
    customMessage: '',
  });

  // Resource Functions
  const filteredResources = resources.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || r.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddResource = () => {
    if (!newName.trim()) return;
    const resource: Resource = {
      id: Date.now().toString(),
      name: newName,
      type: newType,
      category: newCategory,
      url: newUrl || undefined,
      fileSize: addMode === 'file' ? `${(Math.random() * 10 + 0.5).toFixed(1)} MB` : undefined,
      uploadedAt: new Date().toISOString().split('T')[0],
      visibility: newVisibility,
      downloads: 0,
    };
    setResources((prev) => [...prev, resource]);
    setShowAddDialog(false);
    resetResourceForm();
    toast.success('Resource added!', { description: `"${resource.name}" is now available.` });
  };

  const resetResourceForm = () => {
    setNewName('');
    setNewUrl('');
    setNewType('file');
    setNewCategory('materials');
    setNewVisibility('public');
    setAddMode('file');
  };

  const handleDeleteResource = (id: string) => {
    const resource = resources.find((r) => r.id === id);
    setResources((prev) => prev.filter((r) => r.id !== id));
    toast.success(`"${resource?.name}" removed.`);
  };

  const handleToggleVisibility = (id: string) => {
    setResources((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const cycle: Resource['visibility'][] = ['public', 'registered', 'post-event'];
        const idx = cycle.indexOf(r.visibility);
        return { ...r, visibility: cycle[(idx + 1) % cycle.length] };
      })
    );
    toast.success('Visibility updated.');
  };

  // FAQ Functions
  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    const faq: FAQ = {
      id: Date.now().toString(),
      question: newQuestion,
      answer: newAnswer,
      order: faqs.length + 1,
      visible: true,
    };
    setFaqs((prev) => [...prev, faq]);
    setShowAddFaqDialog(false);
    resetFaqForm();
    toast.success('FAQ added!');
  };

  const handleUpdateFaq = () => {
    if (!editingFaq || !newQuestion.trim() || !newAnswer.trim()) return;
    setFaqs((prev) =>
      prev.map((f) =>
        f.id === editingFaq.id ? { ...f, question: newQuestion, answer: newAnswer } : f
      )
    );
    setEditingFaq(null);
    resetFaqForm();
    toast.success('FAQ updated!');
  };

  const resetFaqForm = () => {
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    toast.success('FAQ deleted.');
  };

  const handleToggleFaqVisibility = (id: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, visible: !f.visible } : f))
    );
  };

  const totalDownloads = resources.reduce((sum, r) => sum + r.downloads, 0);

  const tabs = [
    { id: 'resources' as const, label: 'Resources', icon: FileText, count: resources.length },
    { id: 'faqs' as const, label: 'FAQs', icon: HelpCircle, count: faqs.length },
    { id: 'learning' as const, label: 'Learning Content', icon: BookOpen },
    { id: 'discussions' as const, label: 'Discussions', icon: MessageSquare },
    { id: 'recording' as const, label: 'Recording', icon: VideoIcon },
    { id: 'certificates' as const, label: 'Certificates', icon: Award },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-foreground">Content & Materials</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage resources, FAQs, discussions, recordings, and certificates
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-border pb-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="size-4" />
              {tab.label}
              {tab.count !== undefined && (
                <Badge variant="secondary" className="rounded-full text-xs h-5 px-1.5">
                  {tab.count}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* RESOURCES TAB */}
      {activeTab === 'resources' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {resources.length} resource{resources.length !== 1 ? 's' : ''} · {totalDownloads} total downloads
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="size-3.5 mr-2" />
              Add Resource
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 rounded-lg"
              />
            </div>
            <div className="flex gap-1">
              {(['all', 'prework', 'materials', 'post-event'] as const).map((cat) => (
                <Button
                  key={cat}
                  variant={filterCategory === cat ? 'secondary' : 'ghost'}
                  size="sm"
                  className="rounded-lg text-xs"
                  onClick={() => setFilterCategory(cat)}
                >
                  {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
                </Button>
              ))}
            </div>
          </div>

          {/* Resource Groups by Category */}
          {(['prework', 'materials', 'post-event'] as ResourceCategory[]).map((category) => {
            const categoryResources = filteredResources.filter((r) => r.category === category);
            if (categoryResources.length === 0) return null;

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-foreground">{CATEGORY_LABELS[category]}</h4>
                  <Badge variant="secondary" className="rounded-full text-xs h-5 px-2">
                    {categoryResources.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {categoryResources.map((resource) => {
                    const Icon = TYPE_ICONS[resource.type];
                    return (
                      <div
                        key={resource.id}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg group hover:border-border/80"
                      >
                        <div className="size-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon className="size-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-foreground truncate">{resource.name}</p>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span>{TYPE_LABELS[resource.type]}</span>
                            {resource.fileSize && <span>{resource.fileSize}</span>}
                            <span>{resource.downloads} downloads</span>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={`rounded shadow-none text-xs ${
                            resource.visibility === 'public'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : resource.visibility === 'registered'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {VISIBILITY_LABELS[resource.visibility]}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="size-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-lg">
                            {resource.url && (
                              <DropdownMenuItem onClick={() => toast('Opening link...')}>
                                <ExternalLink className="size-3.5 mr-2" />
                                Open Link
                              </DropdownMenuItem>
                            )}
                            {resource.type !== 'link' && (
                              <DropdownMenuItem onClick={() => toast('Download started.')}>
                                <Download className="size-3.5 mr-2" />
                                Download
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleToggleVisibility(resource.id)}>
                              {resource.visibility === 'public' ? (
                                <EyeOff className="size-3.5 mr-2" />
                              ) : (
                                <Eye className="size-3.5 mr-2" />
                              )}
                              Change Visibility
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteResource(resource.id)}
                            >
                              <Trash2 className="size-3.5 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredResources.length === 0 && (
            <div className="text-center py-10 border border-dashed border-border rounded-lg">
              <FileText className="size-8 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No resources yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Upload slides, documents, or add links for your attendees.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 rounded-lg"
                onClick={() => setShowAddDialog(true)}
              >
                <Plus className="size-3.5 mr-2" />
                Add First Resource
              </Button>
            </div>
          )}
        </div>
      )}

      {/* FAQs TAB */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {faqs.length} question{faqs.length !== 1 ? 's' : ''}
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={() => setShowAddFaqDialog(true)}
            >
              <Plus className="size-3.5 mr-2" />
              Add FAQ
            </Button>
          </div>

          <div className="space-y-2">
            {faqs.map((faq) => (
              <Card key={faq.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground mb-1">{faq.question}</p>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={faq.visible}
                        onCheckedChange={() => handleToggleFaqVisibility(faq.id)}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="size-8 p-0">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-lg">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingFaq(faq);
                              setNewQuestion(faq.question);
                              setNewAnswer(faq.answer);
                            }}
                          >
                            <Edit2 className="size-3.5 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteFaq(faq.id)}
                          >
                            <Trash2 className="size-3.5 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {faqs.length === 0 && (
              <div className="text-center py-10 border border-dashed border-border rounded-lg">
                <HelpCircle className="size-8 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No FAQs yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Add frequently asked questions to help your attendees.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 rounded-lg"
                  onClick={() => setShowAddFaqDialog(true)}
                >
                  <Plus className="size-3.5 mr-2" />
                  Add First FAQ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEARNING CONTENT TAB */}
      {activeTab === 'learning' && (
        <div className="space-y-6">
          {/* Learning Outcomes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Learning Outcomes</p>
                <p className="text-xs text-muted-foreground">What attendees will learn</p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
                onClick={() => setShowAddOutcomeDialog(true)}
              >
                <Plus className="size-3.5 mr-2" />
                Add Outcome
              </Button>
            </div>
            <div className="space-y-2">
              {learningOutcomes.map((outcome) => (
                <Card key={outcome.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground mb-1">{outcome.text}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="size-8 p-0">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-lg">
                          <DropdownMenuItem
                            onClick={() => {
                              setNewOutcomeText(outcome.text);
                              setShowAddOutcomeDialog(true);
                            }}
                          >
                            <Edit2 className="size-3.5 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setLearningOutcomes((prev) =>
                                prev.filter((o) => o.id !== outcome.id)
                              );
                              toast.success('Outcome deleted.');
                            }}
                          >
                            <Trash2 className="size-3.5 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Target Audience</p>
                <p className="text-xs text-muted-foreground">Who should attend</p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
                onClick={() => setShowAddAudienceDialog(true)}
              >
                <Plus className="size-3.5 mr-2" />
                Add Audience
              </Button>
            </div>
            <div className="space-y-2">
              {targetAudience.map((audience) => (
                <Card key={audience.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Users className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground mb-1">{audience.role}</p>
                        <p className="text-sm text-muted-foreground">{audience.description}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="size-8 p-0">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-lg">
                          <DropdownMenuItem
                            onClick={() => {
                              setNewAudienceRole(audience.role);
                              setNewAudienceDesc(audience.description);
                              setShowAddAudienceDialog(true);
                            }}
                          >
                            <Edit2 className="size-3.5 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setTargetAudience((prev) =>
                                prev.filter((a) => a.id !== audience.id)
                              );
                              toast.success('Audience deleted.');
                            }}
                          >
                            <Trash2 className="size-3.5 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Prerequisites</p>
                <p className="text-xs text-muted-foreground">What attendees should know</p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
                onClick={() => setShowAddPrereqDialog(true)}
              >
                <Plus className="size-3.5 mr-2" />
                Add Prerequisite
              </Button>
            </div>
            <div className="space-y-2">
              {prerequisites.map((prereq) => (
                <Card key={prereq.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Target className="size-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground mb-1">{prereq.text}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="size-8 p-0">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-lg">
                          <DropdownMenuItem
                            onClick={() => {
                              setNewPrereqText(prereq.text);
                              setShowAddPrereqDialog(true);
                            }}
                          >
                            <Edit2 className="size-3.5 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setPrerequisites((prev) =>
                                prev.filter((p) => p.id !== prereq.id)
                              );
                              toast.success('Prerequisite deleted.');
                            }}
                          >
                            <Trash2 className="size-3.5 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DISCUSSIONS TAB */}
      {activeTab === 'discussions' && (
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Discussion & Chat Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Enable Discussions</p>
                  <p className="text-xs text-muted-foreground">Allow attendees to post and chat</p>
                </div>
                <Switch
                  checked={discussionSettings.enabled}
                  onCheckedChange={(checked) =>
                    setDiscussionSettings((prev) => ({ ...prev, enabled: checked }))
                  }
                />
              </div>

              {discussionSettings.enabled && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Pre-Event Discussions</p>
                      <p className="text-xs text-muted-foreground">Open discussions before event starts</p>
                    </div>
                    <Switch
                      checked={discussionSettings.preEventEnabled}
                      onCheckedChange={(checked) =>
                        setDiscussionSettings((prev) => ({ ...prev, preEventEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Post-Event Discussions</p>
                      <p className="text-xs text-muted-foreground">Keep discussions open after event</p>
                    </div>
                    <Switch
                      checked={discussionSettings.postEventEnabled}
                      onCheckedChange={(checked) =>
                        setDiscussionSettings((prev) => ({ ...prev, postEventEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Require Moderation</p>
                      <p className="text-xs text-muted-foreground">Approve posts before publishing</p>
                    </div>
                    <Switch
                      checked={discussionSettings.moderationEnabled}
                      onCheckedChange={(checked) =>
                        setDiscussionSettings((prev) => ({ ...prev, moderationEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Allow Anonymous Posts</p>
                      <p className="text-xs text-muted-foreground">Let attendees post without name</p>
                    </div>
                    <Switch
                      checked={discussionSettings.allowAnonymous}
                      onCheckedChange={(checked) =>
                        setDiscussionSettings((prev) => ({ ...prev, allowAnonymous: checked }))
                      }
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* RECORDING TAB */}
      {activeTab === 'recording' && (
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Recording Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Enable Recording Tab</p>
                  <p className="text-xs text-muted-foreground">Show recording section to attendees</p>
                </div>
                <Switch
                  checked={recordingSettings.enabled}
                  onCheckedChange={(checked) =>
                    setRecordingSettings((prev) => ({ ...prev, enabled: checked }))
                  }
                />
              </div>

              {recordingSettings.enabled && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm">Video URL</Label>
                    <Input
                      placeholder="https://vimeo.com/..."
                      value={recordingSettings.videoUrl}
                      onChange={(e) =>
                        setRecordingSettings((prev) => ({ ...prev, videoUrl: e.target.value }))
                      }
                      className="rounded-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Paste your Vimeo, YouTube, or Wistia URL
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Auto-Record</p>
                      <p className="text-xs text-muted-foreground">Automatically record event sessions</p>
                    </div>
                    <Switch
                      checked={recordingSettings.autoRecord}
                      onCheckedChange={(checked) =>
                        setRecordingSettings((prev) => ({ ...prev, autoRecord: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Chat Replay</p>
                      <p className="text-xs text-muted-foreground">Include chat messages with recording</p>
                    </div>
                    <Switch
                      checked={recordingSettings.chatReplayEnabled}
                      onCheckedChange={(checked) =>
                        setRecordingSettings((prev) => ({ ...prev, chatReplayEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Release Date (Optional)</Label>
                    <Input
                      type="date"
                      value={recordingSettings.releaseDate}
                      onChange={(e) =>
                        setRecordingSettings((prev) => ({ ...prev, releaseDate: e.target.value }))
                      }
                      className="rounded-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave blank to release immediately after event
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* CERTIFICATES TAB */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Certificate Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Issue Certificates</p>
                  <p className="text-xs text-muted-foreground">Award certificates to attendees</p>
                </div>
                <Switch
                  checked={certificateSettings.enabled}
                  onCheckedChange={(checked) =>
                    setCertificateSettings((prev) => ({ ...prev, enabled: checked }))
                  }
                />
              </div>

              {certificateSettings.enabled && (
                <>
                  <div className="space-y-2">
                    <Label className="text-sm">Certificate Template</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['basic', 'premium', 'custom'] as const).map((template) => (
                        <button
                          key={template}
                          onClick={() =>
                            setCertificateSettings((prev) => ({ ...prev, template }))
                          }
                          className={`p-3 rounded-lg border text-left transition-colors ${
                            certificateSettings.template === template
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <p className="text-sm font-medium capitalize">{template}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Required Attendance (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={certificateSettings.requiredAttendance}
                      onChange={(e) =>
                        setCertificateSettings((prev) => ({
                          ...prev,
                          requiredAttendance: parseInt(e.target.value) || 0,
                        }))
                      }
                      className="rounded-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum attendance percentage to earn certificate
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Eligible Ticket Tiers</Label>
                    <div className="space-y-2">
                      {['general', 'vip', 'early-bird'].map((tier) => (
                        <label
                          key={tier}
                          className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={certificateSettings.eligibleTiers.includes(tier)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCertificateSettings((prev) => ({
                                  ...prev,
                                  eligibleTiers: [...prev.eligibleTiers, tier],
                                }));
                              } else {
                                setCertificateSettings((prev) => ({
                                  ...prev,
                                  eligibleTiers: prev.eligibleTiers.filter((t) => t !== tier),
                                }));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm capitalize">{tier.replace('-', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Custom Message (Optional)</Label>
                    <Textarea
                      placeholder="Add a personal message on the certificate..."
                      value={certificateSettings.customMessage}
                      onChange={(e) =>
                        setCertificateSettings((prev) => ({
                          ...prev,
                          customMessage: e.target.value,
                        }))
                      }
                      className="rounded-lg min-h-[80px]"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Resource Dialog */}
      <Dialog
        open={showAddDialog}
        onOpenChange={(open) => {
          setShowAddDialog(open);
          if (!open) resetResourceForm();
        }}
      >
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Add Resource</DialogTitle>
            <DialogDescription>Upload a file or add an external link.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Mode Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setAddMode('file');
                  setNewType('file');
                }}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  addMode === 'file'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Upload className="size-4 text-primary" />
                  <span className="text-sm text-foreground">Upload File</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, slides, images, videos
                </p>
              </button>
              <button
                onClick={() => {
                  setAddMode('link');
                  setNewType('link');
                }}
                className={`p-3 rounded-lg border text-left transition-colors ${
                  addMode === 'link'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Link2 className="size-4 text-primary" />
                  <span className="text-sm text-foreground">Add Link</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Notion, Google Drive, etc.
                </p>
              </button>
            </div>

            {/* File upload area */}
            {addMode === 'file' && (
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/30 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="size-6 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, PPTX, DOCX, PNG, MP4 up to 100MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewName(file.name);
                      if (file.name.endsWith('.pptx') || file.name.endsWith('.key'))
                        setNewType('slide');
                      else if (file.type.startsWith('video/')) setNewType('video');
                      else setNewType('file');
                    }
                  }}
                />
              </div>
            )}

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-sm">Category</Label>
              <div className="grid grid-cols-3 gap-2">
                {(['prework', 'materials', 'post-event'] as const).map((cat) => (
                  <Button
                    key={cat}
                    variant={newCategory === cat ? 'secondary' : 'outline'}
                    size="sm"
                    className="rounded-lg text-xs"
                    onClick={() => setNewCategory(cat)}
                  >
                    {CATEGORY_LABELS[cat]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Resource type (for files) */}
            {addMode === 'file' && (
              <div className="space-y-2">
                <Label className="text-sm">Resource Type</Label>
                <div className="flex gap-2">
                  {(['file', 'slide', 'video'] as const).map((t) => (
                    <Button
                      key={t}
                      variant={newType === t ? 'secondary' : 'outline'}
                      size="sm"
                      className="rounded-lg text-xs"
                      onClick={() => setNewType(t)}
                    >
                      {TYPE_LABELS[t]}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <Label className="text-sm">Display Name</Label>
              <Input
                placeholder="e.g. Workshop Slides Day 1"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="rounded-lg"
              />
            </div>

            {/* URL for links */}
            {addMode === 'link' && (
              <div className="space-y-2">
                <Label className="text-sm">URL</Label>
                <Input
                  placeholder="https://..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            )}

            {/* Visibility */}
            <div className="space-y-2">
              <Label className="text-sm">Visibility</Label>
              <div className="space-y-2">
                {(
                  [
                    { value: 'public' as const, label: 'Public', desc: 'Visible to everyone' },
                    {
                      value: 'registered' as const,
                      label: 'Registered Only',
                      desc: 'Only visible to registered attendees',
                    },
                    {
                      value: 'post-event' as const,
                      label: 'Post-Event Only',
                      desc: 'Available after the event ends',
                    },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setNewVisibility(opt.value)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      newVisibility === opt.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <span className="text-sm text-foreground">{opt.label}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddDialog(false);
                resetResourceForm();
              }}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={handleAddResource}
              disabled={!newName.trim() || (addMode === 'link' && !newUrl.trim())}
            >
              <Plus className="size-3.5 mr-2" />
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit FAQ Dialog */}
      <Dialog
        open={showAddFaqDialog || editingFaq !== null}
        onOpenChange={(open) => {
          if (!open) {
            setShowAddFaqDialog(false);
            setEditingFaq(null);
            resetFaqForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>{editingFaq ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
            <DialogDescription>
              {editingFaq ? 'Update the question and answer.' : 'Add a frequently asked question.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm">Question</Label>
              <Input
                placeholder="e.g. What should I bring?"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Answer</Label>
              <Textarea
                placeholder="Provide a clear answer..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                className="rounded-lg min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddFaqDialog(false);
                setEditingFaq(null);
                resetFaqForm();
              }}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={editingFaq ? handleUpdateFaq : handleAddFaq}
              disabled={!newQuestion.trim() || !newAnswer.trim()}
            >
              {editingFaq ? 'Update' : 'Add'} FAQ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Learning Outcome Dialog */}
      <Dialog
        open={showAddOutcomeDialog}
        onOpenChange={(open) => {
          setShowAddOutcomeDialog(open);
          if (!open) setNewOutcomeText('');
        }}
      >
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Add Learning Outcome</DialogTitle>
            <DialogDescription>
              Add a learning outcome for your attendees.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm">Outcome Text</Label>
              <Textarea
                placeholder="e.g. Build and deploy your first AI-powered application"
                value={newOutcomeText}
                onChange={(e) => setNewOutcomeText(e.target.value)}
                className="rounded-lg min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddOutcomeDialog(false);
                setNewOutcomeText('');
              }}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={() => {
                if (!newOutcomeText.trim()) return;
                const outcome: LearningOutcome = {
                  id: Date.now().toString(),
                  text: newOutcomeText,
                  order: learningOutcomes.length + 1,
                };
                setLearningOutcomes((prev) => [...prev, outcome]);
                setShowAddOutcomeDialog(false);
                setNewOutcomeText('');
                toast.success('Outcome added!');
              }}
              disabled={!newOutcomeText.trim()}
            >
              Add Outcome
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Target Audience Dialog */}
      <Dialog
        open={showAddAudienceDialog}
        onOpenChange={(open) => {
          setShowAddAudienceDialog(open);
          if (!open) {
            setNewAudienceRole('');
            setNewAudienceDesc('');
          }
        }}
      >
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Add Target Audience</DialogTitle>
            <DialogDescription>
              Add a target audience for your attendees.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm">Role</Label>
              <Input
                placeholder="e.g. Developers"
                value={newAudienceRole}
                onChange={(e) => setNewAudienceRole(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Description</Label>
              <Textarea
                placeholder="e.g. Looking to add AI capabilities to their apps"
                value={newAudienceDesc}
                onChange={(e) => setNewAudienceDesc(e.target.value)}
                className="rounded-lg min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddAudienceDialog(false);
                setNewAudienceRole('');
                setNewAudienceDesc('');
              }}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={() => {
                if (!newAudienceRole.trim() || !newAudienceDesc.trim()) return;
                const audience: TargetAudience = {
                  id: Date.now().toString(),
                  role: newAudienceRole,
                  description: newAudienceDesc,
                  order: targetAudience.length + 1,
                };
                setTargetAudience((prev) => [...prev, audience]);
                setShowAddAudienceDialog(false);
                setNewAudienceRole('');
                setNewAudienceDesc('');
                toast.success('Audience added!');
              }}
              disabled={!newAudienceRole.trim() || !newAudienceDesc.trim()}
            >
              Add Audience
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Prerequisite Dialog */}
      <Dialog
        open={showAddPrereqDialog}
        onOpenChange={(open) => {
          setShowAddPrereqDialog(open);
          if (!open) setNewPrereqText('');
        }}
      >
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Add Prerequisite</DialogTitle>
            <DialogDescription>
              Add a prerequisite for your attendees.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm">Prerequisite Text</Label>
              <Textarea
                placeholder="e.g. Basic understanding of Python (variables, functions, loops)"
                value={newPrereqText}
                onChange={(e) => setNewPrereqText(e.target.value)}
                className="rounded-lg min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddPrereqDialog(false);
                setNewPrereqText('');
              }}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={() => {
                if (!newPrereqText.trim()) return;
                const prereq: Prerequisite = {
                  id: Date.now().toString(),
                  text: newPrereqText,
                  order: prerequisites.length + 1,
                };
                setPrerequisites((prev) => [...prev, prereq]);
                setShowAddPrereqDialog(false);
                setNewPrereqText('');
                toast.success('Prerequisite added!');
              }}
              disabled={!newPrereqText.trim()}
            >
              Add Prerequisite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { useState, useRef } from 'react';
import { Sparkles, Send, BookOpen, Users as UsersIcon, FileText, Trophy, Award, Star, MessageSquare, ChevronDown, Bell, Settings as SettingsIcon, Search, Plus, Palette, GraduationCap, MoreVertical, TrendingUp, Check, X, Calendar, UserPlus, Eye, ThumbsUp, Clock, ChevronRight, Filter, BarChart3, Upload, Link, Video, Paperclip, Edit, Trash2, Zap, TrendingDown, Activity, Lightbulb, Target, Wand2, Copy, ExternalLink, Bot, Brain, Rocket, Gauge, PlayCircle, CheckCircle, RefreshCw, Command, Cpu, Network, UserCheck, Heart, Flame, Coffee, CalendarDays, ListChecks, Layers, Grid3x3, BookMarked, CircleDot, ArrowLeft, DollarSign, Download, Play, Info, RotateCcw, AlertCircle, MousePointer, Workflow, Radar, GitBranch, Home } from 'lucide-react';
import { CourseData, Conversation, Message, AppVersion } from '../types';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import LeapyLogo from '../imports/Button';
import { CourseBuilderOverviewSection } from './CourseBuilderOverviewSection';
import { LinkToExistingCommunityModal } from './LinkContentModals';

interface CourseBuilderViewProps {
  conversation: Conversation;
  onUpdateMessages: (messages: Message[]) => void;
  courseData: Partial<CourseData>;
  onBack: () => void;
  appVersion?: AppVersion;
  onVersionChange?: (version: AppVersion) => void;
  userMode?: 'creator' | 'learner';
  onModeChange?: (mode: 'creator' | 'learner') => void;
  onCreateCommunity?: () => void;
}

type AICopilotMode = 'builder' | 'helper' | 'analyst';
type AIPersonality = 'professional' | 'casual' | 'enthusiastic' | 'minimal';

const copilotModes = [
  { id: 'builder' as const, label: 'Builder', icon: Rocket, description: 'Create and edit course structure' },
  { id: 'helper' as const, label: 'Helper', icon: MessageSquare, description: 'Ask questions and get guidance' },
  { id: 'analyst' as const, label: 'Analyst', icon: BarChart3, description: 'View insights and analytics' },
];

const aiPersonalities = [
  { id: 'professional' as const, label: 'Professional', description: 'Formal and concise' },
  { id: 'casual' as const, label: 'Casual', description: 'Friendly and relaxed' },
  { id: 'enthusiastic' as const, label: 'Enthusiastic', description: 'Energetic and motivating' },
  { id: 'minimal' as const, label: 'Minimal', description: 'Brief and to-the-point' },
];

const aiPlaybooks = [
  { id: 'structure', name: 'Course Structure Optimization', icon: Layers, tasks: 8, automation: true },
  { id: 'engagement', name: 'Student Engagement Boost', icon: Zap, tasks: 12, automation: true },
  { id: 'marketing', name: '30-Day Launch Campaign', icon: Rocket, tasks: 30, automation: true },
  { id: 'completion', name: 'Increase Completion Rate', icon: Target, tasks: 6, automation: false },
  { id: 'pricing', name: 'Pricing Strategy', icon: DollarSign, tasks: 4, automation: false },
];

const sampleModules = [
  { id: '1', title: 'Introduction & Getting Started', lessons: [
    { id: '1-1', title: 'Welcome to the Course', type: 'video', duration: 15, status: 'published', description: 'Introduction and course overview' },
    { id: '1-2', title: 'Setting Up Your Environment', type: 'article', duration: 20, status: 'published', description: 'Step-by-step environment setup guide' },
    { id: '1-3', title: 'First Project Walkthrough', type: 'assignment', duration: 10, status: 'published', description: 'Build your first project' },
  ], duration: '45 min', status: 'published', description: 'Learn the basics and set up your environment', completionRate: 92, avgRating: 4.8 },
  { id: '2', title: 'Core Concepts', lessons: [
    { id: '2-1', title: 'Understanding Fundamentals', type: 'video', duration: 25, status: 'published', description: 'Core concepts explained' },
    { id: '2-2', title: 'Practical Examples', type: 'article', duration: 15, status: 'published', description: 'Real-world examples' },
    { id: '2-3', title: 'Interactive Quiz', type: 'quiz', duration: 10, status: 'published', description: 'Test your knowledge' },
    { id: '2-4', title: 'Hands-on Exercise', type: 'assignment', duration: 30, status: 'published', description: 'Practice what you learned' },
    { id: '2-5', title: 'Resource Pack', type: 'download', duration: 5, status: 'published', description: 'Additional resources and templates' },
  ], duration: '1.5 hours', status: 'published', description: 'Deep dive into fundamental concepts', completionRate: 78, avgRating: 4.6 },
  { id: '3', title: 'Advanced Techniques', lessons: [
    { id: '3-1', title: 'Advanced Patterns', type: 'video', duration: 20, status: 'draft', description: 'Advanced design patterns' },
    { id: '3-2', title: 'Best Practices', type: 'article', duration: 15, status: 'draft', description: 'Industry best practices' },
    { id: '3-3', title: 'Case Study Analysis', type: 'video', duration: 20, status: 'draft', description: 'Real-world case studies' },
    { id: '3-4', title: 'Final Project', type: 'assignment', duration: 45, status: 'draft', description: 'Capstone project' },
  ], duration: '1 hour', status: 'draft', description: 'Master advanced strategies and best practices', completionRate: 0, avgRating: 0 },
];

const sampleStudents = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', progress: 85, enrolled: '2024-05-01', lastActive: '2 hours ago', completionRisk: 5, engagementScore: 95 },
  { id: '2', name: 'Marcus Webb', email: 'marcus@example.com', progress: 62, enrolled: '2024-05-02', lastActive: '1 day ago', completionRisk: 15, engagementScore: 82 },
  { id: '3', name: 'Elena Rodriguez', email: 'elena@example.com', progress: 45, enrolled: '2024-05-03', lastActive: '3 days ago', completionRisk: 35, engagementScore: 68 },
  { id: '4', name: 'James Park', email: 'james@example.com', progress: 28, enrolled: '2024-05-04', lastActive: '1 week ago', completionRisk: 78, engagementScore: 42 },
];

// Shared sidebar nav item style
const navItem = (active: boolean) =>
  `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
    active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'
  }`;

export function CourseBuilderViewV3({ 
  courseData, 
  onBack,
  appVersion = 'v1',
  onVersionChange,
  userMode = 'creator',
  onModeChange,
  onCreateCommunity
}: CourseBuilderViewProps) {
  const [chatInput, setChatInput] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showVersionMenu, setShowVersionMenu] = useState(false);
  const [mainView, setMainView] = useState<'overview' | 'curriculum' | 'students' | 'pricing' | 'analytics' | 'settings' | 'ai-hub'>('overview');
  const [aiMode, setAiMode] = useState<AICopilotMode>('builder');
  const [aiPersonality, setAiPersonality] = useState<AIPersonality>('enthusiastic');
  const [aiAutoPilot, setAiAutoPilot] = useState(false);
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [aiHubTab, setAiHubTab] = useState<'overview' | 'playbooks' | 'automation' | 'insights'>('overview');
  const [healthScore, setHealthScore] = useState(82);
  const [completionRate, setCompletionRate] = useState(74);
  const [engagementScore, setEngagementScore] = useState(88);
  const [showThinkingProcess, setShowThinkingProcess] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showLinkToCommunityModal, setShowLinkToCommunityModal] = useState(false);
  
  const [courseDescription, setCourseDescription] = useState(courseData.description || 'Master the fundamentals of web development through hands-on projects and real-world applications.');
  const [targetAudience, setTargetAudience] = useState('Aspiring developers, career switchers, and beginners with basic computer skills');
  const [learningOutcomes, setLearningOutcomes] = useState(courseData.learningOutcomes || [
    'Build modern web applications from scratch',
    'Master HTML, CSS, JavaScript, and React',
    'Deploy projects to production',
    'Understand best practices and design patterns'
  ]);
  const [newOutcome, setNewOutcome] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const [aiImpactStats, setAiImpactStats] = useState({
    timeSaved: 12.5,
    actionsCompleted: 34,
    modulesCreated: 8,
    studentsEnrolled: 127,
    predictionsAccurate: 91,
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatInput('');
    }
  };

  const handleRegenerateField = (field: string) => {
    setIsRegenerating(field);
    setAiThinking(true);
    setTimeout(() => {
      if (field === 'description') setCourseDescription('Learn to build production-ready web applications using modern tools and frameworks. This comprehensive course covers everything from fundamentals to advanced concepts.');
      else if (field === 'targetAudience') setTargetAudience('Developers looking to level up their skills, bootcamp graduates, and self-taught programmers');
      else if (field === 'learningOutcomes') setLearningOutcomes(['Create full-stack applications with confidence', 'Implement responsive and accessible UI components', 'Work with APIs and databases', 'Deploy and maintain production applications']);
      setIsRegenerating(null);
      setAiThinking(false);
    }, 1500);
  };

  const handleAddOutcome = () => {
    if (newOutcome.trim()) {
      setLearningOutcomes([...learningOutcomes, newOutcome.trim()]);
      setNewOutcome('');
    }
  };

  const handleRemoveOutcome = (index: number) => {
    setLearningOutcomes(learningOutcomes.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Header */}
      <div className="border-b border-border bg-card px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="size-4" />Back
            </Button>
            <div className="h-5 w-px bg-border" />
            <BookOpen className="size-5 text-primary" />
            <div>
              <h1 className="text-foreground flex items-center gap-2">
                {courseData.title || 'Untitled Course'}
                {aiAutoPilot && (
                  <Badge variant="secondary" className="text-xs"><Cpu className="size-3 mr-1" />Autopilot</Badge>
                )}
              </h1>
              <p className="text-muted-foreground text-xs">
                {sampleStudents.length} students enrolled - {healthScore}% health
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* AI Mode Switcher */}
            <Popover open={showModeSelector} onOpenChange={setShowModeSelector}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 border-primary/20 bg-primary/5">
                  {copilotModes.find(m => m.id === aiMode)?.icon && (() => {
                    const Icon = copilotModes.find(m => m.id === aiMode)!.icon;
                    return <Icon className="size-3.5 text-primary" />;
                  })()}
                  <span className="text-primary">{copilotModes.find(m => m.id === aiMode)?.label}</span>
                  <ChevronDown className="size-3 text-primary" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">AI Copilot Mode</p>
                    <Badge variant="secondary" className="text-xs"><Sparkles className="size-3 mr-1" />Smart</Badge>
                  </div>
                  {copilotModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => { setAiMode(mode.id); setShowModeSelector(false); }}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          aiMode === mode.id ? 'border-primary bg-primary/10' : 'border-border hover:border-input'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`size-4 mt-0.5 ${aiMode === mode.id ? 'text-primary' : 'text-muted-foreground'}`} />
                          <div className="flex-1">
                            <p className="font-medium text-sm text-foreground">{mode.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{mode.description}</p>
                          </div>
                          {aiMode === mode.id && <Check className="size-4 text-primary" />}
                        </div>
                      </button>
                    );
                  })}
                  
                  <div className="pt-2 mt-2 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-muted-foreground">AI Personality</p>
                      <button
                        onClick={() => setAiAutoPilot(!aiAutoPilot)}
                        className={`text-xs px-2 py-1 rounded ${
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
                              : 'border-border hover:border-input text-foreground'
                          }`}
                        >
                          {personality.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button size="sm" variant="outline">
              <Eye className="size-3.5 mr-2" />Preview
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Upload className="size-3.5 mr-2" />Publish
            </Button>
          </div>
        </div>

        {/* AI Impact Stats Bar */}
        <div className="mt-3 flex items-center gap-4 text-xs bg-primary/5 rounded-lg px-4 py-2.5 border border-primary/10">
          <div className="flex items-center gap-2">
            <Clock className="size-3.5 text-primary" />
            <span className="text-muted-foreground">
              <span className="font-medium text-primary">{aiImpactStats.timeSaved}h</span> saved this week
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Zap className="size-3.5 text-blue-600" />
            <span className="text-muted-foreground">
              <span className="font-medium text-blue-900">{aiImpactStats.actionsCompleted}</span> actions completed
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Gauge className="size-3.5 text-primary" />
            <span className="text-muted-foreground">Health: <span className="font-medium text-primary">{healthScore}/100</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="size-3.5 text-green-600" />
            <span className="text-muted-foreground">Completion: <span className="font-medium text-green-900">{completionRate}%</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="size-3.5 text-pink-600" />
            <span className="text-muted-foreground">Engagement: <span className="font-medium text-pink-900">{engagementScore}%</span></span>
          </div>
          <div className="ml-auto">
            <Button size="sm" variant="ghost" className="text-xs text-primary hover:text-primary/80">
              <BarChart3 className="size-3 mr-1" />View Details
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div className="w-64 border-r border-border bg-card">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-1">
              {[
                { view: 'overview' as const, icon: Home, label: 'Overview' },
                { view: 'curriculum' as const, icon: BookOpen, label: 'Curriculum', badge: sampleModules.length },
                { view: 'students' as const, icon: UsersIcon, label: 'Students', badge: sampleStudents.length },
                { view: 'pricing' as const, icon: DollarSign, label: 'Pricing' },
                { view: 'analytics' as const, icon: BarChart3, label: 'Analytics' },
                { view: 'ai-hub' as const, icon: Sparkles, label: 'AI Hub', proBadge: true },
                { view: 'settings' as const, icon: SettingsIcon, label: 'Settings' },
              ].map((item) => (
                <button key={item.view} onClick={() => setMainView(item.view)} className={navItem(mainView === item.view)}>
                  <item.icon className="size-4" />
                  {item.label}
                  {item.badge !== undefined && <Badge variant="secondary" className="ml-auto text-xs">{item.badge}</Badge>}
                  {item.proBadge && <Badge className="ml-auto text-xs bg-primary">Pro</Badge>}
                </button>
              ))}

              {/* Community Hook Section */}
              <div className="pt-4 mt-4 border-t border-border">
                <p className="text-xs text-muted-foreground px-3 mb-2">COMMUNITY</p>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent" onClick={() => setShowLinkToCommunityModal(true)}>
                  <Network className="size-4" />Link to Community
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-accent" onClick={onCreateCommunity}>
                  <Plus className="size-4" />Create Community
                </button>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Center Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-6 pb-24 max-w-5xl mx-auto">
              {mainView === 'overview' && (
                <CourseBuilderOverviewSection
                  courseTitle={courseData.title || 'Untitled Course'}
                  courseDescription={courseDescription}
                  setCourseDescription={setCourseDescription}
                  targetAudience={targetAudience}
                  setTargetAudience={setTargetAudience}
                  learningOutcomes={learningOutcomes}
                  setLearningOutcomes={setLearningOutcomes}
                  newOutcome={newOutcome}
                  setNewOutcome={setNewOutcome}
                  handleAddOutcome={handleAddOutcome}
                  handleRemoveOutcome={handleRemoveOutcome}
                  handleRegenerateField={handleRegenerateField}
                  isRegenerating={isRegenerating}
                  editingField={editingField}
                  setEditingField={setEditingField}
                  studentsCount={sampleStudents.length}
                  completionRate={completionRate}
                  engagementScore={engagementScore}
                  healthScore={healthScore}
                  onCreateCommunity={onCreateCommunity}
                />
              )}

              {mainView === 'curriculum' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-foreground">Course Curriculum</h2>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Plus className="size-3.5 mr-2" />Add Module
                    </Button>
                  </div>

                  {sampleModules.map((module, idx) => (
                    <div key={module.id} className="bg-card border border-border rounded-lg p-5 hover:border-primary/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="size-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                          <span className="font-medium text-primary">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-foreground mb-1">{module.title}</h3>
                              <p className="text-sm text-muted-foreground">{module.description}</p>
                            </div>
                            <Badge variant={module.status === 'published' ? 'default' : 'secondary'} className={module.status === 'published' ? 'bg-green-500' : ''}>
                              {module.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                            <span className="flex items-center gap-1"><Video className="size-3.5" />{module.lessons.length} lessons</span>
                            <span className="flex items-center gap-1"><Clock className="size-3.5" />{module.duration}</span>
                            {module.status === 'published' && (
                              <>
                                <span className="flex items-center gap-1"><CheckCircle className="size-3.5 text-green-600" />{module.completionRate}% completion</span>
                                <span className="flex items-center gap-1"><Star className="size-3.5 text-yellow-600" />{module.avgRating}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost"><Edit className="size-3.5" /></Button>
                          <Button size="sm" variant="ghost"><Trash2 className="size-3.5 text-red-600" /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {mainView === 'students' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-foreground">Enrolled Students</h2>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline"><Filter className="size-3.5 mr-2" />Filter</Button>
                      <Button size="sm" variant="outline"><Download className="size-3.5 mr-2" />Export</Button>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted border-b border-border">
                        <tr>
                          {['Student', 'Progress', 'Engagement', 'Risk', 'Last Active', 'Actions'].map((h, i) => (
                            <th key={h} className={`${i === 5 ? 'text-right' : 'text-left'} px-4 py-3 text-xs font-medium text-muted-foreground uppercase`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {sampleStudents.map((student) => (
                          <tr key={student.id} className="hover:bg-accent">
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-foreground">{student.name}</p>
                                <p className="text-sm text-muted-foreground">{student.email}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary rounded-full" style={{ width: `${student.progress}%` }} />
                                </div>
                                <span className="text-sm font-medium text-foreground w-10">{student.progress}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="secondary" className={
                                student.engagementScore >= 80 ? 'bg-green-100 text-green-800' :
                                student.engagementScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }>
                                {student.engagementScore}%
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="secondary" className={
                                student.completionRisk < 20 ? 'bg-green-100 text-green-800' :
                                student.completionRisk < 50 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }>
                                {student.completionRisk < 20 ? 'Low' : student.completionRisk < 50 ? 'Medium' : 'High'}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{student.lastActive}</td>
                            <td className="px-4 py-3 text-right">
                              <Button size="sm" variant="ghost"><MoreVertical className="size-4" /></Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {mainView === 'ai-hub' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-foreground">AI Hub</h2>
                    <Badge className="bg-primary"><Sparkles className="size-3 mr-1" />Pro Feature</Badge>
                  </div>

                  {/* Health Score Card */}
                  <div className="bg-primary rounded-lg p-6 text-primary-foreground">
                    <p className="text-primary-foreground/70 text-sm mb-2">Course Health Score</p>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-5xl font-bold">{healthScore}</span>
                      <span className="text-2xl text-primary-foreground/70">/100</span>
                      <Badge className="bg-green-500 text-white border-0"><TrendingUp className="size-3 mr-1" />+12</Badge>
                    </div>
                    <p className="text-sm text-primary-foreground/70">
                      Your course is performing well! AI identified 3 quick wins to reach 90+ this week.
                    </p>
                  </div>

                  {/* AI Playbooks */}
                  <div>
                    <h3 className="font-medium text-foreground mb-3">AI Playbooks</h3>
                    <div className="grid gap-3">
                      {aiPlaybooks.map((playbook) => {
                        const Icon = playbook.icon;
                        return (
                          <div key={playbook.id} className="bg-card border border-border rounded-lg p-4 hover:border-primary/20 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="size-10 bg-primary/10 rounded flex items-center justify-center">
                                  <Icon className="size-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-foreground">{playbook.name}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{playbook.tasks} automated tasks</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {playbook.automation && (
                                  <Badge variant="secondary" className="text-xs"><Zap className="size-3 mr-1" />Auto</Badge>
                                )}
                                <Button size="sm">Activate</Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Link to Community Modal */}
      <LinkToExistingCommunityModal
        isOpen={showLinkToCommunityModal}
        onClose={() => setShowLinkToCommunityModal(false)}
        contentType="course"
        contentTitle={courseData.title || 'Untitled Course'}
        onSelectCommunity={(communityId) => {
          console.log('Course linked to community:', communityId);
          setShowLinkToCommunityModal(false);
        }}
        onCreateNew={onCreateCommunity}
      />
    </div>
  );
}

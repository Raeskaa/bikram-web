import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  Lock,
  FileText,
  Download,
  BookOpen,
  MessageSquare,
  Users,
  Star,
  ThumbsUp,
  Share2,
  Bookmark,
  List,
  Clock,
  Award,
  BarChart3
} from 'lucide-react';
import { DiscussionChannelV2 } from './DiscussionChannelV2';

interface CoursePlayerProps {
  courseId: string;
  onBack: () => void;
  onJoinLiveEvent?: () => void;
}

export function CoursePlayer({ courseId, onBack, onJoinLiveEvent }: CoursePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(245); // seconds
  const [duration] = useState(720); // 12 minutes
  const [showCurriculum, setShowCurriculum] = useState(true);
  const [selectedModule, setSelectedModule] = useState('1');
  const [currentLessonId, setCurrentLessonId] = useState('1-2');
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'discussion' | 'notes'>('overview');

  const courseData = {
    id: courseId,
    title: 'Advanced React Patterns',
    instructor: 'Sarah Chen',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 4.9,
    totalStudents: 12453,
    progress: 65,
    description: 'Master advanced React patterns including render props, higher-order components, compound components, and hooks patterns.',
    certificate: true,
    lastUpdated: 'December 2024'
  };

  const modules = [
    {
      id: '1',
      title: 'Introduction to Advanced Patterns',
      duration: '1h 15m',
      lessons: [
        { id: '1-1', title: 'Welcome to Advanced React', type: 'video', duration: '8:45', completed: true, locked: false },
        { id: '1-2', title: 'Pattern Categories Overview', type: 'video', duration: '12:30', completed: false, locked: false },
        { id: '1-3', title: 'Setting Up Your Environment', type: 'video', duration: '15:20', completed: false, locked: false },
        { id: '1-4', title: 'Quick Quiz', type: 'quiz', duration: '5:00', completed: false, locked: false }
      ]
    },
    {
      id: '2',
      title: 'Render Props Pattern',
      duration: '2h 30m',
      lessons: [
        { id: '2-1', title: 'Understanding Render Props', type: 'video', duration: '18:45', completed: false, locked: false },
        { id: '2-2', title: 'Building a Mouse Tracker', type: 'video', duration: '22:30', completed: false, locked: false },
        { id: '2-3', title: 'Advanced Render Props', type: 'video', duration: '25:15', completed: false, locked: false },
        { id: '2-4', title: 'Code Reading', type: 'reading', duration: '10:00', completed: false, locked: false },
        { id: '2-5', title: 'Practice Exercise', type: 'quiz', duration: '15:00', completed: false, locked: false }
      ]
    },
    {
      id: '3',
      title: 'Higher-Order Components',
      duration: '2h 45m',
      lessons: [
        { id: '3-1', title: 'HOC Fundamentals', type: 'video', duration: '20:00', completed: false, locked: false },
        { id: '3-2', title: 'Creating Reusable HOCs', type: 'video', duration: '28:30', completed: false, locked: false },
        { id: '3-3', title: 'HOC Best Practices', type: 'video', duration: '18:45', completed: false, locked: false },
        { id: '3-4', title: 'HOC vs Hooks', type: 'reading', duration: '12:00', completed: false, locked: false }
      ]
    },
    {
      id: '4',
      title: 'Compound Components',
      duration: '3h 0m',
      lessons: [
        { id: '4-1', title: 'Compound Component Pattern', type: 'video', duration: '22:15', completed: false, locked: true },
        { id: '4-2', title: 'Context API Integration', type: 'video', duration: '26:40', completed: false, locked: true },
        { id: '4-3', title: 'Building a Tab Component', type: 'video', duration: '35:20', completed: false, locked: true }
      ]
    }
  ];

  const currentLesson = modules
    .flatMap(m => m.lessons)
    .find(l => l.id === currentLessonId);

  const resources = [
    { id: '1', title: 'Lesson Slides (PDF)', size: '2.4 MB', type: 'pdf' },
    { id: '2', title: 'Source Code (GitHub)', size: '-', type: 'link' },
    { id: '3', title: 'Additional Resources', size: '1.1 MB', type: 'pdf' },
    { id: '4', title: 'Cheat Sheet', size: '856 KB', type: 'pdf' }
  ];

  const lessonNotes = [
    {
      id: '1',
      timestamp: '2:35',
      note: 'Key point: Render props allow you to share code between components using a prop whose value is a function.',
      created: '2 hours ago'
    },
    {
      id: '2',
      timestamp: '5:12',
      note: 'Remember to memoize render prop functions to avoid unnecessary re-renders.',
      created: '2 hours ago'
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (type === 'video') return <Play className="w-4 h-4 text-muted-foreground/60" />;
    if (type === 'reading') return <FileText className="w-4 h-4 text-muted-foreground/60" />;
    if (type === 'quiz') return <BookOpen className="w-4 h-4 text-muted-foreground/60" />;
    return <Circle className="w-4 h-4 text-muted-foreground/60" />;
  };

  return (
    <div className="h-full flex flex-col bg-slate-900">
      {/* Video Player Section */}
      <div className="relative bg-black">
        {/* Video Player */}
        <div className="relative aspect-video bg-slate-800 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1920&h=1080&fit=crop"
            alt="Video"
            className="w-full h-full object-cover"
          />
          
          {/* Video Overlay UI */}
          <div className="absolute inset-0 bg-black/40">
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Back to Course
                </Button>
                <div className="flex items-center gap-3">
                  <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
                    Lesson {currentLessonId}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Center Play Button */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-primary shadow-none transition-transform"
                >
                  <Play className="w-10 h-10 ml-1" fill="currentColor" />
                </Button>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="group cursor-pointer">
                  <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:bg-white/20 h-10 w-10 p-0"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20 h-10 w-10 p-0"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </Button>

                    <div className="text-white text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 text-sm"
                    >
                      1x
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 h-10 w-10 p-0"
                    >
                      <Settings className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 h-10 w-10 p-0"
                    >
                      <Maximize className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Info Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white mb-1">
                {currentLesson?.title}
              </h2>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <img 
                    src={courseData.instructorAvatar}
                    alt={courseData.instructor}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{courseData.instructor}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentLesson?.duration}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{courseData.totalStudents.toLocaleString()} students</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Helpful
              </Button>
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg shadow-none">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Complete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex bg-background min-h-0">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="flex-1 flex flex-col">
            <div className="border-b px-8">
              <TabsList className="bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="overview"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                >
                  <BookOpen className="size-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="resources"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                >
                  <Download className="size-4 mr-2" />
                  Resources
                </TabsTrigger>
                <TabsTrigger 
                  value="discussion"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                >
                  <MessageSquare className="size-4 mr-2" />
                  Discussion
                </TabsTrigger>
                <TabsTrigger 
                  value="notes"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-4"
                >
                  <FileText className="size-4 mr-2" />
                  My Notes ({lessonNotes.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-8">
                <TabsContent value="overview" className="mt-0">
                  <div className="max-w-3xl space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">About this lesson</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        In this lesson, we'll explore different pattern categories in React development. Understanding these patterns 
                        will help you make better architectural decisions and write more maintainable code.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">What you'll learn</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>The main categories of React patterns and when to use them</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Differences between structural and behavioral patterns</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>How to choose the right pattern for your use case</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Common pitfalls and best practices</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Prerequisites</h3>
                      <p className="text-muted-foreground">
                        Completion of "Welcome to Advanced React" lesson and basic understanding of React hooks.
                      </p>
                    </div>

                    <Card className="bg-purple-50 border-purple-200 p-6 shadow-none">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Complete this course to earn a certificate</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            Finish all lessons and pass the final assessment to receive your completion certificate.
                          </p>
                          <Progress value={courseData.progress} className="h-2" />
                          <p className="text-sm text-muted-foreground mt-2">{courseData.progress}% complete</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="mt-0">
                  <div className="max-w-3xl space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">Downloadable resources</h3>
                      <p className="text-muted-foreground mb-6">
                        Access lesson materials, source code, and additional reading materials.
                      </p>
                    </div>

                    {resources.map((resource) => (
                      <Card key={resource.id} className="p-5 border-border hover:border-primary/30 shadow-none transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                              {resource.type === 'pdf' ? (
                                <FileText className="w-6 h-6 text-white" />
                              ) : (
                                <Download className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">{resource.title}</h4>
                              {resource.size !== '-' && (
                                <p className="text-sm text-muted-foreground">{resource.size}</p>
                              )}
                            </div>
                          </div>
                          <Button variant="outline" className="border-primary/30 text-primary hover:bg-purple-50 rounded-lg">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="discussion" className="mt-0 -m-8">
                  <DiscussionChannelV2 
                    channelName="Lesson Q&A"
                    channelDescription="Ask questions and discuss this lesson"
                  />
                </TabsContent>

                <TabsContent value="notes" className="mt-0">
                  <div className="max-w-3xl space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">My lesson notes</h3>
                      <p className="text-muted-foreground mb-6">
                        Take notes as you watch. Click on any timestamp to jump to that point in the video.
                      </p>
                    </div>

                    <Card className="p-5 border-border shadow-none">
                      <Textarea 
                        placeholder="Add a note at the current timestamp..."
                        className="mb-3"
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current time: {formatTime(currentTime)}</span>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-lg">
                          Add Note
                        </Button>
                      </div>
                    </Card>

                    <div className="space-y-4">
                      {lessonNotes.map((note) => (
                        <Card key={note.id} className="p-5 border-border shadow-none">
                          <div className="flex items-start justify-between mb-3">
                            <Badge 
                              variant="outline" 
                              className="cursor-pointer hover:bg-purple-50 hover:border-primary rounded-md"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {note.timestamp}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{note.created}</span>
                          </div>
                          <p className="text-foreground">{note.note}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Curriculum Sidebar */}
        <div className={`border-l transition-all ${showCurriculum ? 'w-96' : 'w-0'} flex flex-col`}>
          {showCurriculum && (
            <>
              <div className="border-b px-6 py-4 flex items-center justify-between bg-muted">
                <div>
                  <h3 className="font-semibold text-foreground">Course Content</h3>
                  <p className="text-sm text-muted-foreground">
                    {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCurriculum(false)}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  {/* Related Live Event Suggestion */}
                  <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 space-y-3 shadow-none">
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-medium text-primary uppercase tracking-normal">Live Q&A</span>
                    </div>
                    <h4 className="text-xs font-semibold text-foreground leading-tight">Advanced Patterns Live Workshop</h4>
                    <p className="text-[10px] text-muted-foreground font-medium">Join Sarah Chen for a live deep dive into these patterns.</p>
                    <Button 
                      onClick={onJoinLiveEvent}
                      className="w-full bg-primary text-white text-[10px] font-semibold h-8 rounded-lg shadow-none hover:bg-primary/90"
                    >
                      Join Live Event
                    </Button>
                  </div>

                  {modules.map((module) => (
                    <div key={module.id}>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedModule(selectedModule === module.id ? '' : module.id)}
                        className="w-full justify-between p-3 h-auto hover:bg-muted rounded-xl"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                            <List className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-foreground text-sm">{module.title}</div>
                            <div className="text-xs text-muted-foreground">{module.lessons.length} lessons • {module.duration}</div>
                          </div>
                        </div>
                        {selectedModule === module.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground/60 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground/60 flex-shrink-0" />
                        )}
                      </Button>

                      {selectedModule === module.id && (
                        <div className="mt-1 ml-4 space-y-1">
                          {module.lessons.map((lesson) => (
                            <Button
                              key={lesson.id}
                              variant="ghost"
                              onClick={() => !lesson.locked && setCurrentLessonId(lesson.id)}
                              disabled={lesson.locked}
                              className={`w-full justify-start p-3 h-auto text-left hover:bg-purple-50 rounded-lg ${
                                currentLessonId === lesson.id ? 'bg-purple-50 border-l-2 border-primary' : ''
                              } ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <div className="flex items-start gap-3 flex-1">
                                <div className="flex-shrink-0 mt-0.5">
                                  {lesson.locked ? (
                                    <Lock className="w-4 h-4 text-muted-foreground/60" />
                                  ) : (
                                    getLessonIcon(lesson.type, lesson.completed)
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-foreground mb-1">{lesson.title}</div>
                                  <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
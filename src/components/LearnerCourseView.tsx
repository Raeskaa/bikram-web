import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { DiscussionChannel } from './DiscussionChannel';
import {
  BookOpen,
  Play,
  CheckCircle,
  Lock,
  Clock,
  FileText,
  Video,
  Award,
  Share2,
  Download,
  ChevronRight,
  ChevronDown,
  Star,
  Users as UsersIcon,
  MessageSquare,
  BarChart3,
  Target,
  ArrowLeft
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  lessons: {
    id: string;
    title: string;
    type: 'video' | 'reading' | 'quiz';
    duration: string;
    completed: boolean;
  }[];
}

interface LearnerCourseViewProps {
  courseData: {
    title: string;
    instructor: string;
    description: string;
    enrolledCount: number;
    rating: number;
    progress: number;
  };
  onBack: () => void;
}

export function LearnerCourseView({ courseData, onBack }: LearnerCourseViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'discussion' | 'progress'>('content');
  const [expandedModule, setExpandedModule] = useState<string>('1');
  const [currentLesson, setCurrentLesson] = useState<string | null>('1-1');

  const modules: Module[] = [
    {
      id: '1',
      title: 'Introduction to React',
      duration: '45 min',
      completed: true,
      locked: false,
      lessons: [
        { id: '1-1', title: 'What is React?', type: 'video', duration: '12 min', completed: true },
        { id: '1-2', title: 'Setting up your environment', type: 'video', duration: '18 min', completed: true },
        { id: '1-3', title: 'Your first component', type: 'video', duration: '15 min', completed: true }
      ]
    },
    {
      id: '2',
      title: 'React Fundamentals',
      duration: '2h 15min',
      completed: false,
      locked: false,
      lessons: [
        { id: '2-1', title: 'JSX Syntax', type: 'video', duration: '20 min', completed: true },
        { id: '2-2', title: 'Props and State', type: 'video', duration: '35 min', completed: false },
        { id: '2-3', title: 'Event Handling', type: 'video', duration: '25 min', completed: false },
        { id: '2-4', title: 'Conditional Rendering', type: 'reading', duration: '15 min', completed: false },
        { id: '2-5', title: 'Quiz: Fundamentals', type: 'quiz', duration: '10 min', completed: false }
      ]
    },
    {
      id: '3',
      title: 'Advanced Concepts',
      duration: '3h 30min',
      completed: false,
      locked: true,
      lessons: [
        { id: '3-1', title: 'Hooks Deep Dive', type: 'video', duration: '45 min', completed: false },
        { id: '3-2', title: 'Context API', type: 'video', duration: '30 min', completed: false },
        { id: '3-3', title: 'Performance Optimization', type: 'video', duration: '40 min', completed: false }
      ]
    }
  ];

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'reading': return FileText;
      case 'quiz': return Target;
      default: return FileText;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <div className="h-5 w-px bg-gray-300" />
            <div>
              <h1 className="text-xl text-gray-900">{courseData.title}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-600">by {courseData.instructor}</span>
                <div className="flex items-center gap-1">
                  <Star className="size-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-600">{courseData.rating}</span>
                </div>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <UsersIcon className="size-3.5" />
                  {courseData.enrolledCount} students
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <CheckCircle className="size-3 mr-1" />
              Enrolled
            </Badge>
            <Button variant="outline" size="sm">
              <Share2 className="size-3.5 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Your Progress</span>
            <span className="text-sm font-medium text-purple-700">{courseData.progress}% Complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all"
              style={{ width: `${courseData.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-4">
          {[
            { id: 'content', label: 'Course Content', icon: BookOpen },
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'discussion', label: 'Discussion', icon: MessageSquare },
            { id: 'progress', label: 'My Progress', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-700'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'content' && (
          <>
            {/* Video Player / Content Area */}
            <div className="flex-1 flex flex-col">
              {currentLesson ? (
                <>
                  {/* Video Player */}
                  <div className="bg-black aspect-video">
                    <div className="size-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="size-20 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-white mx-auto mb-4 cursor-pointer transition-colors">
                          <Play className="size-10 ml-1" />
                        </div>
                        <p className="text-white">Click to play lesson</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Lesson Info */}
                  <div className="bg-white border-b border-gray-200 p-6">
                    <h2 className="text-xl text-gray-900 mb-2">What is React?</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        12 min
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="size-3.5" />
                        Video Lesson
                      </span>
                    </div>
                  </div>

                  {/* Lesson Description */}
                  <div className="flex-1 overflow-auto p-6 bg-gray-50">
                    <div className="max-w-4xl">
                      <h3 className="font-medium text-gray-900 mb-3">About this lesson</h3>
                      <p className="text-gray-700 leading-relaxed mb-6">
                        In this introductory lesson, you'll learn what React is, why it's popular, and how it can help you build modern web applications. We'll cover the basics of component-based architecture and reactive programming.
                      </p>

                      <h3 className="font-medium text-gray-900 mb-3">What you'll learn</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">Understanding React's component-based architecture</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">The benefits of using React for web development</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">How React compares to other frameworks</span>
                        </li>
                      </ul>

                      <div className="mt-8 flex items-center gap-3">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Mark as Complete
                          <CheckCircle className="size-4 ml-2" />
                        </Button>
                        <Button variant="outline">
                          <Download className="size-4 mr-2" />
                          Download Resources
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <BookOpen className="size-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select a lesson to begin</p>
                  </div>
                </div>
              )}
            </div>

            {/* Course Modules Sidebar */}
            <div className="w-96 bg-white border-l border-gray-200">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Course Content</h3>
                  <div className="space-y-2">
                    {modules.map((module) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedModule(expandedModule === module.id ? '' : module.id)}
                          disabled={module.locked}
                          className={`w-full p-4 text-left flex items-center justify-between ${
                            module.locked ? 'bg-gray-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {module.locked ? (
                              <Lock className="size-4 text-gray-400" />
                            ) : module.completed ? (
                              <CheckCircle className="size-4 text-green-600" />
                            ) : (
                              <div className="size-4 rounded-full border-2 border-gray-300" />
                            )}
                            <div>
                              <p className={`font-medium ${module.locked ? 'text-gray-400' : 'text-gray-900'}`}>
                                {module.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {module.lessons.length} lessons • {module.duration}
                              </p>
                            </div>
                          </div>
                          {!module.locked && (
                            expandedModule === module.id ? (
                              <ChevronDown className="size-4 text-gray-600" />
                            ) : (
                              <ChevronRight className="size-4 text-gray-600" />
                            )
                          )}
                        </button>

                        {expandedModule === module.id && !module.locked && (
                          <div className="border-t border-gray-200">
                            {module.lessons.map((lesson) => {
                              const Icon = getLessonIcon(lesson.type);
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => setCurrentLesson(lesson.id)}
                                  className={`w-full p-3 pl-11 text-left flex items-center justify-between hover:bg-gray-50 ${
                                    currentLesson === lesson.id ? 'bg-purple-50 border-l-2 border-purple-600' : ''
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {lesson.completed ? (
                                      <CheckCircle className="size-3.5 text-green-600" />
                                    ) : (
                                      <Icon className="size-3.5 text-gray-400" />
                                    )}
                                    <span className="text-sm text-gray-900">{lesson.title}</span>
                                  </div>
                                  <span className="text-xs text-gray-500">{lesson.duration}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </>
        )}

        {activeTab === 'overview' && (
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                <h2 className="text-xl text-gray-900 mb-4">About this course</h2>
                <p className="text-gray-700 leading-relaxed">{courseData.description}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-xl text-gray-900 mb-4">What you'll learn</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Build modern React applications from scratch</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Master React hooks and state management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Implement best practices and patterns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Build real-world projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussion' && (
          <div className="flex-1">
            <DiscussionChannel
              channelName={`${courseData.title} - Discussion`}
              channelType="course"
              isLive={false}
              canModerate={false}
            />
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                <h2 className="text-xl text-gray-900 mb-6">Your Progress</h2>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-700">{courseData.progress}%</p>
                    <p className="text-sm text-gray-600 mt-1">Complete</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-700">8</p>
                    <p className="text-sm text-gray-600 mt-1">Lessons Completed</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-700">2.5h</p>
                    <p className="text-sm text-gray-600 mt-1">Time Spent</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-medium text-gray-900 mb-4">Achievements</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                    <div className="size-12 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Award className="size-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">First Lesson</p>
                      <p className="text-xs text-gray-500">Completed your first lesson</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg opacity-50">
                    <div className="size-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <Award className="size-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-400">Course Complete</p>
                      <p className="text-xs text-gray-400">Finish all lessons</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

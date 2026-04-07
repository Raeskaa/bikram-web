import { useState } from 'react';
import { BookOpen, Search, Filter, Grid3x3, List, Plus, Users, Clock, Award, Play, CheckCircle, ChevronRight, Link2, AlertCircle, Target } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useAuth, isEmptyStateUser } from '../contexts/AuthContext';
import { SectionEmptyState } from './SectionEmptyState';

interface Course {
  id: string;
  title: string;
  description: string;
  studentCount: number;
  lessonCount: number;
  duration: string;
  role?: 'instructor' | 'moderator' | 'student';
  status: 'published' | 'draft';
  progress?: number;
  linkedToCommunity?: boolean;
  communityName?: string;
  isPublic: boolean;
  createdAt: string;
  lastUpdated: string;
}

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Master React & TypeScript',
    description: 'Build modern web applications with React 18, TypeScript, and best practices. Perfect for intermediate developers.',
    studentCount: 342,
    lessonCount: 45,
    duration: '12 hours',
    role: 'instructor',
    status: 'published',
    linkedToCommunity: true,
    communityName: 'React Developers Hub',
    isPublic: true,
    createdAt: '2024-01-10',
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design from scratch.',
    studentCount: 567,
    lessonCount: 32,
    duration: '8 hours',
    role: 'student',
    status: 'published',
    progress: 67,
    isPublic: true,
    createdAt: '2024-02-15',
    lastUpdated: '1 week ago'
  },
  {
    id: '3',
    title: 'Advanced Product Management',
    description: 'Strategic product management techniques for experienced PMs looking to level up.',
    studentCount: 0,
    lessonCount: 28,
    duration: '10 hours',
    role: 'instructor',
    status: 'draft',
    linkedToCommunity: false,
    isPublic: false,
    createdAt: '2024-04-01',
    lastUpdated: 'Today'
  },
  {
    id: '4',
    title: 'AI & Machine Learning Bootcamp',
    description: 'Comprehensive course covering ML algorithms, neural networks, and practical applications.',
    studentCount: 1234,
    lessonCount: 68,
    duration: '24 hours',
    role: 'student',
    status: 'published',
    progress: 23,
    isPublic: true,
    createdAt: '2024-01-05',
    lastUpdated: '1 day ago'
  },
  {
    id: '5',
    title: 'Building SaaS Products',
    description: 'From idea to launch - complete guide to building and scaling SaaS products.',
    studentCount: 189,
    lessonCount: 38,
    duration: '15 hours',
    role: 'instructor',
    status: 'published',
    linkedToCommunity: true,
    communityName: 'Startup Founders Network',
    isPublic: false,
    createdAt: '2024-03-01',
    lastUpdated: '3 days ago'
  },
  {
    id: '6',
    title: 'Digital Marketing Mastery',
    description: 'Complete digital marketing course covering SEO, content marketing, and social media strategies.',
    studentCount: 445,
    lessonCount: 52,
    duration: '18 hours',
    status: 'published',
    isPublic: true,
    createdAt: '2024-02-20',
    lastUpdated: '5 days ago'
  },
];

type Tab = 'all' | 'my-courses' | 'enrolled' | 'teaching' | 'drafts';

interface CoursesListViewProps {
  onCourseClick: (courseId: string) => void;
  onCreateClick: () => void;
}

export function CoursesListView({ onCourseClick, onCreateClick }: CoursesListViewProps) {
  const { currentUser } = useAuth();
  const isEmpty = isEmptyStateUser(currentUser);
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const sourceCourses = isEmpty ? [] : mockCourses;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all', label: 'All Courses', count: sourceCourses.filter(c => c.status === 'published' && c.isPublic).length },
    { id: 'my-courses', label: 'My Courses', count: sourceCourses.filter(c => c.role === 'instructor').length },
    { id: 'enrolled', label: 'Enrolled', count: sourceCourses.filter(c => c.role === 'student').length },
    { id: 'teaching', label: 'Teaching', count: sourceCourses.filter(c => c.role === 'instructor' && c.status === 'published').length },
    { id: 'drafts', label: 'Drafts', count: sourceCourses.filter(c => c.status === 'draft').length },
  ];

  const filterCourses = (courses: Course[]): Course[] => {
    let filtered = courses;
    switch (activeTab) {
      case 'all': filtered = filtered.filter(c => c.status === 'published' && c.isPublic); break;
      case 'my-courses': filtered = filtered.filter(c => c.role === 'instructor'); break;
      case 'enrolled': filtered = filtered.filter(c => c.role === 'student'); break;
      case 'teaching': filtered = filtered.filter(c => c.role === 'instructor' && c.status === 'published'); break;
      case 'drafts': filtered = filtered.filter(c => c.status === 'draft'); break;
    }
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredCourses = filterCourses(sourceCourses);

  const getRoleBadge = (role?: string) => {
    if (!role) return null;
    const colors: Record<string, string> = {
      instructor: 'bg-primary/10 text-primary border-primary/20',
      moderator: 'bg-accent text-accent-foreground border-border',
      student: 'bg-chart-1/10 text-chart-1 border-chart-1/20',
    };
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${colors[role] || ''}`}>
        <span className="capitalize">{role}</span>
      </div>
    );
  };

  // Shared sidebar card style
  const sidebarCard = "w-full bg-card hover:bg-accent border border-border rounded-lg p-3 text-left transition-colors";

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-foreground">Courses</h1>
            <p className="text-muted-foreground mt-1">Create, manage, and explore courses</p>
          </div>
          <Button onClick={onCreateClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="size-4 mr-2" />
            Create Course
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="h-10 px-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Filter</span>
          </button>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-card' : 'hover:bg-accent'}`}
            >
              <Grid3x3 className="size-4 text-foreground" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-card' : 'hover:bg-accent'}`}
            >
              <List className="size-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border px-8">
        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* LEFT SIDE - Courses (2/3) */}
        <div className="flex-1 overflow-auto px-8 py-6">
          {filteredCourses.length === 0 ? (
            isEmpty ? (
              <SectionEmptyState
                icon={BookOpen}
                title="No courses yet"
                description="Create structured learning experiences with modules, lessons, quizzes, and certificates. Teach what you know."
                actionLabel="Create Your First Course"
                onAction={onCreateClick}
                hint="AI will help you outline modules and generate lesson content"
              />
            ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <BookOpen className="size-12 text-muted-foreground/40 mb-4" />
              <h3 className="text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : activeTab === 'drafts'
                  ? "You don't have any draft courses"
                  : 'Get started by creating your first course'}
              </p>
              {activeTab !== 'all' && !searchQuery && (
                <Button onClick={onCreateClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="size-4 mr-2" />
                  Create Course
                </Button>
              )}
            </div>
            )
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => onCourseClick(course.id)}
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all text-left"
                >
                  {/* Image Placeholder */}
                  <div className="w-full aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center relative">
                    <BookOpen className="size-8 text-muted-foreground" />
                    {course.progress !== undefined && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-lg overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-foreground line-clamp-1">{course.title}</h3>
                      {course.status === 'draft' && (
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                          Draft
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {course.role && getRoleBadge(course.role)}
                      {course.linkedToCommunity && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground border border-border">
                          <Link2 className="size-3" />
                          <span>{course.communityName}</span>
                        </div>
                      )}
                      {!course.isPublic && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                          Private
                        </Badge>
                      )}
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {course.progress !== undefined && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="size-4" />
                          <span>{course.studentCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Play className="size-4" />
                          <span>{course.lessonCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => onCourseClick(course.id)}
                  className="group bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all text-left"
                >
                  {/* Image Placeholder */}
                  <div className="w-full aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center relative">
                    <BookOpen className="size-8 text-muted-foreground" />
                    {course.progress !== undefined && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-lg overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-foreground line-clamp-1">{course.title}</h3>
                      {course.status === 'draft' && (
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                          Draft
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-2 flex-wrap">
                      {course.role && getRoleBadge(course.role)}
                      {course.linkedToCommunity && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground border border-border">
                          <Link2 className="size-3" />
                          <span>{course.communityName}</span>
                        </div>
                      )}
                      {!course.isPublic && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                          Private
                        </Badge>
                      )}
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {course.progress !== undefined && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="size-4" />
                          <span>{course.studentCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Play className="size-4" />
                          <span>{course.lessonCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR - Actionable Items (1/3) */}
        <div className="w-[420px] border-l border-border bg-card overflow-auto">
          <div className="p-6 space-y-6">
            {isEmpty ? (
              <>
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Getting Started</h3>
                  <div className="space-y-3">
                    {[
                      { icon: BookOpen, title: 'Create a course', detail: 'Outline modules, add lessons, and publish' },
                      { icon: Users, title: 'Invite students', detail: 'Share your course link or invite by email' },
                      { icon: Award, title: 'Set up certificates', detail: 'Award certificates on course completion' },
                    ].map((item) => (
                      <button key={item.title} className={sidebarCard} onClick={onCreateClick}>
                        <div className="flex items-start gap-3">
                          <item.icon className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground mb-0.5">{item.title}</div>
                            <div className="text-xs text-muted-foreground">{item.detail}</div>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Course Performance</h3>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Target className="size-8 text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground">No course data yet</p>
                  </div>
                </div>
              </>
            ) : (
            <>
            {/* Continue Learning */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-foreground">Continue Learning</h3>
              </div>
              <div className="space-y-2">
                {[
                  { title: 'UI/UX Design Fundamentals', detail: '67% complete \u2022 8 lessons left', progress: 67 },
                  { title: 'AI & ML Bootcamp', detail: '23% complete \u2022 52 lessons left', progress: 23 },
                ].map((item) => (
                  <button key={item.title} className={sidebarCard}>
                    <div className="flex items-start gap-3">
                      <Play className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground mb-1">{item.title}</div>
                        <div className="text-xs text-muted-foreground mb-2">{item.detail}</div>
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Teaching Activity */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-foreground">Teaching Activity</h3>
                <span className="text-xs text-muted-foreground ml-auto">Your courses</span>
              </div>
              <div className="space-y-2">
                {[
                  { title: 'Master React & TypeScript', detail: '342 students \u2022 Updated 2 days ago' },
                  { title: 'Building SaaS Products', detail: '189 students \u2022 Updated 3 days ago' },
                ].map((item) => (
                  <button key={item.title} className={sidebarCard}>
                    <div className="flex items-start gap-3">
                      <Users className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground mb-1">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.detail}</div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Required */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-foreground">Action Required</h3>
                <span className="text-xs text-muted-foreground ml-auto">2 items</span>
              </div>
              <div className="space-y-2">
                {[
                  { icon: AlertCircle, title: 'Publish PM course draft', detail: 'Advanced Product Management' },
                  { icon: Target, title: 'Complete UI/UX course', detail: '33% remaining' },
                ].map((item) => (
                  <button key={item.title} className={sidebarCard}>
                    <div className="flex items-start gap-3">
                      <item.icon className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground mb-1">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.detail}</div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Course Performance */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-foreground">Course Performance</h3>
              </div>
              <div className="space-y-2">
                {[
                  { title: 'React & TypeScript', students: '342', completion: '78%' },
                  { title: 'SaaS Products', students: '189', completion: '65%' },
                ].map((item) => (
                  <div key={item.title} className="bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-foreground">{item.title}</div>
                      <div className="size-2 bg-green-500 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground">Students</div>
                        <div className="font-semibold text-foreground">{item.students}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Completion</div>
                        <div className="font-semibold text-foreground">{item.completion}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
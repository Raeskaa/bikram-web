import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Clock,
  BookOpen,
  Star,
  Users,
  CheckCircle2,
  Play,
  MoreVertical,
  Download,
  Share2,
  Bookmark,
  Trophy,
  TrendingUp,
  Calendar,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface MyEnrolledCoursesProps {
  onSelectCourse: (courseId: string) => void;
  onBack: () => void;
}

export function MyEnrolledCourses({ onSelectCourse, onBack }: MyEnrolledCoursesProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterTab, setFilterTab] = useState<'all' | 'in-progress' | 'completed' | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'title' | 'rating'>('recent');

  const courses = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      instructor: 'Sarah Chen',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
      progress: 65,
      totalLessons: 42,
      completedLessons: 27,
      duration: '12h 30m',
      totalDuration: '18h 45m',
      rating: 4.9,
      students: 12453,
      lastAccessed: '2 hours ago',
      enrolledDate: 'Nov 15, 2024',
      category: 'Development',
      level: 'Advanced',
      certificate: true,
      status: 'in-progress' as const
    },
    {
      id: '2',
      title: 'TypeScript Mastery',
      instructor: 'Mike Ross',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
      progress: 32,
      totalLessons: 38,
      completedLessons: 12,
      duration: '8h 15m',
      totalDuration: '25h 30m',
      rating: 4.8,
      students: 8921,
      lastAccessed: '1 day ago',
      enrolledDate: 'Dec 1, 2024',
      category: 'Development',
      level: 'Intermediate',
      certificate: true,
      status: 'in-progress' as const
    },
    {
      id: '3',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
      progress: 100,
      totalLessons: 28,
      completedLessons: 28,
      duration: '15h 20m',
      totalDuration: '15h 20m',
      rating: 4.9,
      students: 15632,
      lastAccessed: '3 hours ago',
      enrolledDate: 'Oct 20, 2024',
      category: 'Design',
      level: 'Beginner',
      certificate: true,
      certificateEarned: true,
      status: 'completed' as const
    },
    {
      id: '4',
      title: 'Node.js Backend Development',
      instructor: 'James Wilson',
      instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
      progress: 100,
      totalLessons: 52,
      completedLessons: 52,
      duration: '22h 45m',
      totalDuration: '22h 45m',
      rating: 4.7,
      students: 9234,
      lastAccessed: '2 weeks ago',
      enrolledDate: 'Sep 10, 2024',
      category: 'Development',
      level: 'Advanced',
      certificate: true,
      certificateEarned: true,
      status: 'completed' as const
    },
    {
      id: '5',
      title: 'GraphQL & Apollo Client',
      instructor: 'Alex Kumar',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=450&fit=crop',
      progress: 18,
      totalLessons: 32,
      completedLessons: 6,
      duration: '3h 30m',
      totalDuration: '19h 15m',
      rating: 4.8,
      students: 6543,
      lastAccessed: '5 days ago',
      enrolledDate: 'Dec 10, 2024',
      category: 'Development',
      level: 'Intermediate',
      certificate: true,
      status: 'in-progress' as const
    },
    {
      id: '6',
      title: 'Figma for Developers',
      instructor: 'Sophie Martinez',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=450&fit=crop',
      progress: 0,
      totalLessons: 24,
      completedLessons: 0,
      duration: '0h 0m',
      totalDuration: '8h 30m',
      rating: 4.9,
      students: 11234,
      lastAccessed: 'Never',
      enrolledDate: 'Dec 18, 2024',
      category: 'Design',
      level: 'Beginner',
      certificate: false,
      status: 'saved' as const
    }
  ];

  const filteredCourses = courses.filter(course => {
    // Filter by tab
    if (filterTab === 'in-progress' && course.status !== 'in-progress') return false;
    if (filterTab === 'completed' && course.status !== 'completed') return false;
    if (filterTab === 'saved' && course.status !== 'saved') return false;

    // Filter by search
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !course.instructor.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const stats = {
    total: courses.length,
    inProgress: courses.filter(c => c.status === 'in-progress').length,
    completed: courses.filter(c => c.status === 'completed').length,
    saved: courses.filter(c => c.status === 'saved').length,
    totalHours: courses.reduce((acc, c) => acc + parseFloat(c.duration), 0),
    certificatesEarned: courses.filter(c => c.certificateEarned).length
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-muted via-background to-purple-50/30">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-700 to-purple-900 bg-clip-text text-transparent">
                My Courses
              </h1>
              <p className="text-muted-foreground mt-1">{stats.total} courses • {stats.certificatesEarned} certificates earned</p>
            </div>
            <Button onClick={onBack} variant="outline">
              Back to Dashboard
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.inProgress}</div>
                  <div className="text-sm text-muted-foreground mt-1">In Progress</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.completed}</div>
                  <div className="text-sm text-muted-foreground mt-1">Completed</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.certificatesEarned}</div>
                  <div className="text-sm text-muted-foreground mt-1">Certificates</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.totalHours.toFixed(0)}h</div>
                  <div className="text-sm text-muted-foreground mt-1">Learning Time</div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
              </div>
            </Card>
          </div>

          {/* Filters & Search */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={filterTab === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTab('all')}
                className={filterTab === 'all' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                All Courses ({stats.total})
              </Button>
              <Button
                variant={filterTab === 'in-progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTab('in-progress')}
                className={filterTab === 'in-progress' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                In Progress ({stats.inProgress})
              </Button>
              <Button
                variant={filterTab === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTab('completed')}
                className={filterTab === 'completed' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                Completed ({stats.completed})
              </Button>
              <Button
                variant={filterTab === 'saved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterTab('saved')}
                className={filterTab === 'saved' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                Saved ({stats.saved})
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Sort: {sortBy === 'recent' ? 'Recent' : sortBy === 'progress' ? 'Progress' : sortBy === 'title' ? 'Title' : 'Rating'}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy('recent')}>
                    Recently Accessed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('progress')}>
                    Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('title')}>
                    Title (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('rating')}>
                    Highest Rated
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-1 border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid/List */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card 
                  key={course.id}
                  className="group cursor-pointer border-border hover:border-primary/30 hover:shadow-xl transition-all overflow-hidden"
                  onClick={() => onSelectCourse(course.id)}
                >
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {course.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-white/90">{course.progress}% Complete</span>
                          <span className="text-xs text-white/90">{course.completedLessons}/{course.totalLessons} lessons</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5 bg-white/30" />
                      </div>
                    )}

                    {course.certificateEarned && (
                      <Badge className="absolute top-3 right-3 bg-amber-500 text-white hover:bg-amber-500">
                        <Trophy className="w-3 h-3 mr-1" />
                        Certificate
                      </Badge>
                    )}

                    {course.status === 'saved' && (
                      <Badge className="absolute top-3 right-3 bg-white/90 text-foreground hover:bg-white">
                        <Bookmark className="w-3 h-3 mr-1" />
                        Saved
                      </Badge>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <img 
                            src={course.instructorAvatar} 
                            alt={course.instructor}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-muted-foreground">{course.instructor}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download Resources
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Course
                          </DropdownMenuItem>
                          {course.certificateEarned && (
                            <DropdownMenuItem>
                              <Trophy className="w-4 h-4 mr-2" />
                              View Certificate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Remove from Library
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.totalDuration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {course.lastAccessed !== 'Never' ? `Accessed ${course.lastAccessed}` : 'Not started'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <Card 
                  key={course.id}
                  className="group cursor-pointer border-border hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden"
                  onClick={() => onSelectCourse(course.id)}
                >
                  <div className="flex items-center gap-6 p-5">
                    <div className="relative w-60 h-36 flex-shrink-0">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      {course.certificateEarned && (
                        <Badge className="absolute top-2 right-2 bg-amber-500 text-white hover:bg-amber-500">
                          <Trophy className="w-3 h-3 mr-1" />
                          Certificate
                        </Badge>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <img 
                              src={course.instructorAvatar} 
                              alt={course.instructor}
                              className="w-7 h-7 rounded-full"
                            />
                            <span className="text-sm text-muted-foreground">{course.instructor}</span>
                            <span className="text-muted-foreground/30">•</span>
                            <Badge variant="outline" className="text-xs">
                              {course.level}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download Resources
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="w-4 h-4 mr-2" />
                              Share Course
                            </DropdownMenuItem>
                            {course.certificateEarned && (
                              <DropdownMenuItem>
                                <Trophy className="w-4 h-4 mr-2" />
                                View Certificate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Remove from Library
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()} students</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.totalLessons} lessons</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{course.totalDuration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>Enrolled {course.enrolledDate}</span>
                        </div>
                      </div>

                      {course.progress > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">
                              {course.completedLessons} of {course.totalLessons} lessons completed
                            </span>
                            <span className="text-sm font-medium text-primary">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}

                      {course.status === 'saved' && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Bookmark className="w-4 h-4" />
                          <span>Saved for later</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
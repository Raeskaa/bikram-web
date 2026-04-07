import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import {
  Play,
  Clock,
  BookOpen,
  Users,
  Calendar,
  Award,
  TrendingUp,
  MessageSquare,
  Star,
  ChevronRight,
  Video,
  Target,
  Zap,
  CheckCircle2,
  BarChart3
} from 'lucide-react';

interface LearnerDashboardProps {
  onNavigate: (view: 'my-courses' | 'my-events' | 'my-communities' | 'course-player' | 'community-view') => void;
  onSelectCourse?: (courseId: string) => void;
  onSelectEvent?: (eventId: string) => void;
  onSelectCommunity?: (communityId: string) => void;
}

export function LearnerDashboard({ onNavigate, onSelectCourse, onSelectEvent, onSelectCommunity }: LearnerDashboardProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'courses' | 'events' | 'communities'>('all');

  // Mock data for learner's current activities
  const stats = {
    coursesInProgress: 3,
    coursesCompleted: 12,
    upcomingEvents: 2,
    communities: 5,
    certificatesEarned: 8,
    totalLearningHours: 127,
    currentStreak: 12,
    totalPoints: 2450
  };

  const continueWatching = [
    {
      id: '1',
      type: 'course',
      title: 'Advanced React Patterns',
      instructor: 'Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
      progress: 65,
      currentLesson: 'Custom Hooks Deep Dive',
      duration: '2h 30m left',
      lastWatched: '2 hours ago'
    },
    {
      id: '2',
      type: 'course',
      title: 'TypeScript Mastery',
      instructor: 'Mike Ross',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
      progress: 32,
      currentLesson: 'Advanced Types',
      duration: '5h 15m left',
      lastWatched: '1 day ago'
    },
    {
      id: '3',
      type: 'course',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
      progress: 89,
      currentLesson: 'Final Project Review',
      duration: '45m left',
      lastWatched: '3 hours ago'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'React 19 Launch Event',
      date: 'Dec 24, 2024',
      time: '2:00 PM PST',
      type: 'virtual' as const,
      host: 'React Team',
      attendees: 1243,
      registered: true,
      startsIn: '2 days'
    },
    {
      id: '2',
      title: 'Web Performance Workshop',
      date: 'Dec 28, 2024',
      time: '10:00 AM PST',
      type: 'hybrid' as const,
      host: 'Google Chrome Team',
      attendees: 856,
      registered: true,
      startsIn: '6 days'
    }
  ];

  const myCommunities = [
    {
      id: '1',
      name: 'React Developers Hub',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      members: 12453,
      unreadMessages: 23,
      lastActivity: 'Active now',
      role: 'member'
    },
    {
      id: '2',
      name: 'Design Systems Weekly',
      avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop',
      members: 8921,
      unreadMessages: 5,
      lastActivity: '12m ago',
      role: 'member'
    },
    {
      id: '3',
      name: 'Indie Makers',
      avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop',
      members: 6234,
      unreadMessages: 0,
      lastActivity: '2h ago',
      role: 'member'
    }
  ];

  const achievements = [
    {
      id: '1',
      title: '12-Day Streak',
      icon: Zap,
      description: 'Learned for 12 consecutive days',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      earned: 'today'
    },
    {
      id: '2',
      title: 'Course Completionist',
      icon: Award,
      description: 'Completed 10+ courses',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      earned: '2 days ago'
    },
    {
      id: '3',
      title: 'Community Champion',
      icon: Users,
      description: 'Helped 50+ community members',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      earned: '1 week ago'
    }
  ];

  const recommendations = [
    {
      id: '1',
      title: 'Advanced State Management',
      instructor: 'Kent C. Dodds',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop',
      rating: 4.9,
      students: 3421,
      duration: '6h 30m',
      price: 'Free',
      reason: 'Based on your progress in Advanced React Patterns'
    },
    {
      id: '2',
      title: 'Node.js Backend Development',
      instructor: 'Maximilian Schwarzmüller',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop',
      rating: 4.8,
      students: 5632,
      duration: '12h 15m',
      price: '$49',
      reason: 'Complete your full-stack journey'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-muted via-background to-purple-50/30">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-700 to-purple-900 bg-clip-text text-transparent">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground mt-1">Continue your learning journey</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold text-foreground">{stats.currentStreak}</span>
                  <span className="text-sm text-muted-foreground">day streak</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Keep it up!</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">{stats.totalPoints}</span>
                  <span className="text-sm text-muted-foreground">points</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Level 12 Learner</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4 border-border hover:border-primary/30 transition-all cursor-pointer hover:shadow-md group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.coursesInProgress}</div>
                  <div className="text-sm text-muted-foreground mt-1">In Progress</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border hover:border-primary/30 transition-all cursor-pointer hover:shadow-md group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.coursesCompleted}</div>
                  <div className="text-sm text-muted-foreground mt-1">Completed</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border hover:border-primary/30 transition-all cursor-pointer hover:shadow-md group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.upcomingEvents}</div>
                  <div className="text-sm text-muted-foreground mt-1">Upcoming Events</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-4 border-border hover:border-primary/30 transition-all cursor-pointer hover:shadow-md group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.certificatesEarned}</div>
                  <div className="text-sm text-muted-foreground mt-1">Certificates</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ScrollArea className="flex-1">
        <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
          {/* Continue Watching */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Continue Learning</h2>
                <p className="text-sm text-muted-foreground mt-1">Pick up where you left off</p>
              </div>
              <Button 
                variant="ghost" 
                className="text-primary hover:text-primary hover:bg-purple-50"
                onClick={() => onNavigate('my-courses')}
              >
                View All Courses
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {continueWatching.map((item) => (
                <Card 
                  key={item.id}
                  className="group cursor-pointer border-border hover:border-primary/30 hover:shadow-xl transition-all overflow-hidden"
                  onClick={() => {
                    if (onSelectCourse) onSelectCourse(item.id);
                    onNavigate('course-player');
                  }}
                >
                  <div className="relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <Progress value={item.progress} className="h-1.5 bg-white/30" />
                    </div>
                    <Badge className="absolute top-3 right-3 bg-white/90 text-foreground hover:bg-white">
                      {item.progress}% Complete
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Current: {item.currentLesson}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.duration}</span>
                      </div>
                      <span>{item.lastWatched}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Events & Communities */}
            <div className="col-span-2 space-y-8">
              {/* Upcoming Events */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
                    <p className="text-sm text-muted-foreground mt-1">Events you've registered for</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:text-primary hover:bg-purple-50"
                    onClick={() => onNavigate('my-events')}
                  >
                    View All Events
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Card 
                      key={event.id}
                      className="p-5 border-border hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => {
                        if (onSelectEvent) onSelectEvent(event.id);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-700 flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {event.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{event.host}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{event.attendees.toLocaleString()} attending</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 mb-2">
                            Registered
                          </Badge>
                          <div className="text-sm font-medium text-primary">
                            Starts in {event.startsIn}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recommendations */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Recommended for You</h2>
                    <p className="text-sm text-muted-foreground mt-1">Based on your learning path</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {recommendations.map((course) => (
                    <Card 
                      key={course.id}
                      className="group cursor-pointer border-border hover:border-primary/30 hover:shadow-xl transition-all overflow-hidden"
                    >
                      <div className="relative">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary">
                          {course.price}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
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
                            <span>{course.duration}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground italic">
                          💡 {course.reason}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Communities & Achievements */}
            <div className="space-y-8">
              {/* My Communities */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">My Communities</h3>
                    <p className="text-xs text-muted-foreground mt-1">{stats.communities} active</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-purple-50"
                    onClick={() => onNavigate('my-communities')}
                  >
                    View All
                  </Button>
                </div>

                <div className="space-y-3">
                  {myCommunities.map((community) => (
                    <Card 
                      key={community.id}
                      className="p-4 border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => {
                        if (onSelectCommunity) onSelectCommunity(community.id);
                        onNavigate('community-view');
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={community.avatar} 
                          alt={community.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                            {community.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Users className="w-3 h-3" />
                            <span>{community.members.toLocaleString()}</span>
                            <span>•</span>
                            <span>{community.lastActivity}</span>
                          </div>
                        </div>
                        {community.unreadMessages > 0 && (
                          <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                            {community.unreadMessages}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Recent Achievements */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Recent Achievements</h3>
                    <p className="text-xs text-muted-foreground mt-1">{stats.certificatesEarned} total</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <Card 
                      key={achievement.id}
                      className={`p-4 border-border ${achievement.bgColor} transition-all`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center`}>
                          <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-foreground">
                            {achievement.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {achievement.description}
                          </p>
                          <div className="text-xs text-muted-foreground mt-2">
                            Earned {achievement.earned}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-primary/30 text-primary hover:bg-purple-50 hover:border-primary"
                >
                  <Award className="w-4 h-4 mr-2" />
                  View All Achievements
                </Button>
              </section>

              {/* Learning Stats */}
              <Card className="p-6 bg-gradient-to-br from-primary to-purple-700 border-0 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">This Week</h3>
                    <p className="text-sm text-purple-200">Your progress</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-200">Learning Time</span>
                    <span className="font-semibold">12h 34m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-200">Lessons Completed</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-200">Points Earned</span>
                    <span className="font-semibold">+450</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="text-sm text-purple-200 mb-2">Weekly Goal</div>
                  <Progress value={78} className="h-2 bg-white/20" />
                  <div className="text-xs text-purple-200 mt-2">78% complete</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
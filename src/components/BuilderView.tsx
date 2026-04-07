import { useState } from 'react';
import { BookOpen, ArrowLeft, Activity, Edit, DollarSign, Users, Settings as SettingsIcon, BarChart3, Play, Clock, Award, Plus, Trash2, Link2, Download, Upload, Copy, ExternalLink, ChevronDown, ChevronRight, CheckCircle, Video, FileText, Image as ImageIcon, Search, Filter } from 'lucide-react';
import { CourseData, Conversation, Message, AppVersion } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';

interface BuilderViewProps {
  conversation: Conversation;
  onUpdateMessages: (messages: Message[]) => void;
  courseData: Partial<CourseData>;
  onBack: () => void;
  appVersion?: AppVersion;
  onVersionChange?: (version: AppVersion) => void;
  userMode?: 'creator' | 'learner';
  onModeChange?: (mode: 'creator' | 'learner') => void;
}

// Sample modules data
const sampleModules = [
  { 
    id: '1', 
    title: 'Introduction & Getting Started', 
    lessons: 3, 
    duration: '45 min',
    status: 'published',
    description: 'Learn the basics and set up your environment'
  },
  { 
    id: '2', 
    title: 'Core Concepts', 
    lessons: 5, 
    duration: '1.5 hours',
    status: 'published',
    description: 'Deep dive into fundamental concepts'
  },
  { 
    id: '3', 
    title: 'Advanced Techniques', 
    lessons: 4, 
    duration: '1 hour',
    status: 'draft',
    description: 'Master advanced strategies and best practices'
  },
];

const sampleStudents = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', progress: 85, enrolled: '2024-05-01', lastActive: '2 hours ago' },
  { id: '2', name: 'Marcus Webb', email: 'marcus@example.com', progress: 62, enrolled: '2024-05-02', lastActive: '1 day ago' },
  { id: '3', name: 'Elena Rodriguez', email: 'elena@example.com', progress: 45, enrolled: '2024-05-03', lastActive: '3 days ago' },
  { id: '4', name: 'James Park', email: 'james@example.com', progress: 28, enrolled: '2024-05-04', lastActive: '1 week ago' },
];

export function BuilderView({ 
  conversation,
  onUpdateMessages,
  courseData, 
  onBack,
  appVersion = 'v1',
  onVersionChange,
  userMode = 'creator',
  onModeChange
}: BuilderViewProps) {
  const [mainView, setMainView] = useState<'overview' | 'curriculum' | 'pricing' | 'students' | 'analytics' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const stats = [
    { label: 'Total Students', value: '247', change: '+12 this week', icon: Users, color: 'purple' },
    { label: 'Completion Rate', value: '68%', change: '+5%', icon: CheckCircle, color: 'green' },
    { label: 'Avg. Progress', value: '54%', change: '+8%', icon: Activity, color: 'blue' },
    { label: 'Revenue', value: '$4,235', change: '+$420', icon: DollarSign, color: 'orange' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      blue: 'bg-blue-100 text-blue-600',
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Course Header Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <BookOpen className="size-12 mx-auto mb-3 opacity-80" />
              <h2 className="text-3xl font-bold drop-shadow-lg">{courseData.title}</h2>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Play className="size-5 text-purple-600" />
              <div>
                <p className="text-xs text-muted-foreground">Modules</p>
                <p className="text-sm font-medium text-foreground">12 modules</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-purple-600" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-medium text-foreground">8.5 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="size-5 text-purple-600" />
              <div>
                <p className="text-xs text-muted-foreground">Students</p>
                <p className="text-sm font-medium text-foreground">247 enrolled</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Award className="size-5 text-purple-600" />
              <div>
                <p className="text-xs text-muted-foreground">Certificate</p>
                <p className="text-sm font-medium text-foreground">Included</p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">{courseData.description}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="size-5" />
              </div>
              <span className="text-xs text-muted-foreground">{stat.change}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
            <p className="text-foreground text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-foreground font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="justify-start" onClick={() => setMainView('curriculum')}>
            <BookOpen className="size-4 mr-2" />
            Edit Curriculum
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => setMainView('students')}>
            <Users className="size-4 mr-2" />
            View Students
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => setMainView('pricing')}>
            <DollarSign className="size-4 mr-2" />
            Manage Pricing
          </Button>
          <Button variant="outline" className="justify-start">
            <ExternalLink className="size-4 mr-2" />
            Preview Course
          </Button>
        </div>
      </div>

      {/* Community Hook Section */}
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Link2 className="size-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-foreground font-medium mb-2">Community Integration</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Link this course to a community or convert it into a full community with events and ongoing engagement.
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                <Link2 className="size-3 mr-2" />
                Link to Community
              </Button>
              <Button size="sm" variant="outline">
                Create New Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurriculum = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Course Modules</h3>
          <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
            <Plus className="size-4 mr-2" />
            Add Module
          </Button>
        </div>
        <div className="space-y-3">
          {sampleModules.map((module, index) => (
            <div key={module.id} className="border border-border rounded-lg overflow-hidden">
              <div className="flex items-start gap-4 p-4 hover:bg-muted transition-colors">
                <div className="size-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-foreground font-medium mb-1">{module.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Play className="size-3" />
                      {module.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {module.duration}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={module.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-muted text-muted-foreground border-border'}
                    >
                      {module.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-muted rounded transition-colors">
                    <Edit className="size-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded transition-colors">
                    <Trash2 className="size-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              
              {/* Lesson items (collapsed by default) */}
              <div className="border-t border-border bg-muted px-4 py-3">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <ChevronRight className="size-4" />
                  <span>Show {module.lessons} lessons</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Content Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Module Content</h3>
        <div className="space-y-4">
          {courseData.modules.map((module) => (
            <div key={module.id} className="border border-border rounded-lg overflow-hidden">
              <div className="flex items-start gap-4 p-4 hover:bg-muted transition-colors">
                <div className="size-10 bg-primary/10 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-medium">{module.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-foreground font-medium mb-1">{module.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Play className="size-3" />
                      {module.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {module.duration}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={module.status === 'published' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-muted text-muted-foreground border-border'}
                    >
                      {module.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-muted rounded transition-colors">
                    <Edit className="size-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded transition-colors">
                    <Trash2 className="size-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              
              {/* Lesson items (collapsed by default) */}
              <div className="border-t border-border bg-muted px-4 py-3">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                  <ChevronRight className="size-4" />
                  <span>Show {module.lessons} lessons</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-foreground font-medium mb-4">Pricing Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Pricing Model</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>One-time Payment</option>
              <option>Subscription (Monthly)</option>
              <option>Subscription (Annual)</option>
              <option>Free</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input
                type="number"
                defaultValue="99"
                className="w-full pl-8 pr-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button className="bg-primary text-white hover:bg-primary/90">
              Save Changes
            </Button>
            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-foreground font-medium mb-4">Discount Codes</h3>
        <p className="text-muted-foreground text-sm mb-4">Create discount codes for your course</p>
        <Button size="sm" variant="outline">
          <Plus className="size-4 mr-2" />
          Add Discount Code
        </Button>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground font-medium">Student Management</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 h-9 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <Button size="sm" variant="outline">
              <Filter className="size-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" variant="outline">
              <Download className="size-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Student</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Email</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Progress</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Enrolled</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-foreground">Last Active</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleStudents.map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-muted">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-foreground">{student.name}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{student.email}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-border rounded-full h-2 max-w-[100px]">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{student.enrolled}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{student.lastActive}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-sm text-primary hover:text-primary/80">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-foreground font-medium mb-4">Course Analytics</h3>
        <div className="h-64 flex items-center justify-center border border-border rounded-lg bg-muted">
          <div className="text-center text-muted-foreground">
            <BarChart3 className="size-12 mx-auto mb-3 text-muted-foreground" />
            <p>Analytics charts will appear here</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-foreground font-medium mb-4">Engagement</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Video Completion</span>
              <span className="text-sm font-medium text-foreground">72%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Quiz Pass Rate</span>
              <span className="text-sm font-medium text-foreground">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg. Session Time</span>
              <span className="text-sm font-medium text-foreground">32 min</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-foreground font-medium mb-4">Revenue</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="text-sm font-medium text-foreground">$4,235</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Month</span>
              <span className="text-sm font-medium text-foreground">$3,815</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Revenue</span>
              <span className="text-sm font-medium text-foreground">$24,450</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-muted">
      {/* Left Sidebar */}
      <div className="w-64 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-3"
          >
            <ArrowLeft className="size-4" />
            <span className="text-sm">Back to Courses</span>
          </button>
          <h2 className="font-medium text-foreground truncate">{courseData.title}</h2>
          <p className="text-xs text-muted-foreground mt-1">Course Builder</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setMainView(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                mainView === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <item.icon className={`size-[18px] ${mainView === item.id ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-border">
          <Button size="sm" variant="outline" className="w-full justify-start mb-2">
            <ExternalLink className="size-4 mr-2" />
            Preview Course
          </Button>
          <Button size="sm" className="w-full justify-start bg-primary text-white hover:bg-primary/90">
            <CheckCircle className="size-4 mr-2" />
            Publish Course
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {mainView === 'overview' && renderOverview()}
        {mainView === 'curriculum' && renderCurriculum()}
        {mainView === 'pricing' && renderPricing()}
        {mainView === 'students' && renderStudents()}
        {mainView === 'analytics' && renderAnalytics()}
        {mainView === 'settings' && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-foreground font-medium mb-4">Course Settings</h3>
            <p className="text-muted-foreground">General course settings will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
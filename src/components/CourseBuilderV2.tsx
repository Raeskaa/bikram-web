import { useState } from 'react';
import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2, Edit2, Clock, Target, CheckCircle2, TrendingUp, DollarSign, Users, BarChart, Lightbulb, Zap, PlayCircle, MoreHorizontal, Star, Sparkles } from 'lucide-react';
import { CourseData } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { EmptyState } from './EmptyState';

interface CourseBuilderV2Props {
  courseData: Partial<CourseData>;
  activeSection: string;
  onPromptClick?: (prompt: string) => void;
}

export function CourseBuilderV2({ courseData, activeSection, onPromptClick }: CourseBuilderV2Props) {
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);

  const toggleModule = (index: number) => {
    if (expandedModules.includes(index)) {
      setExpandedModules(expandedModules.filter(i => i !== index));
    } else {
      setExpandedModules([...expandedModules, index]);
    }
  };

  if (activeSection === 'dashboard') {
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Hero Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: TrendingUp, label: 'Projected Students', value: '2,450', change: '+12%', color: 'blue' },
            { icon: DollarSign, label: 'Est. Revenue', value: '$24.5K', change: 'at $99', color: 'green' },
            { icon: Users, label: 'Completion Rate', value: '68%', change: 'vs 45% avg', color: 'purple' },
            { icon: Star, label: 'Quality Score', value: '8.4/10', change: 'AI Analysis', color: 'orange' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-card rounded-2xl p-6 border border-border transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-50 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`size-5 text-${stat.color}-600`} />
                </div>
                <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
              </div>
              <p className="text-3xl text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Sparkles className="size-4 text-white" />
            </div>
            <div>
              <h3 className="text-foreground">AI-Powered Recommendations</h3>
              <p className="text-sm text-muted-foreground">Based on 12,000+ successful courses</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="size-4 text-blue-600" />
                <span className="text-sm text-foreground">Add Interactive Quizzes</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Boost retention by 34%</p>
              <Button size="sm" className="w-full h-8 bg-blue-600 hover:bg-blue-700 rounded-lg">
                Generate Quizzes
              </Button>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-100">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="size-4 text-orange-600" />
                <span className="text-sm text-foreground">Optimize SEO</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Improve discoverability by 28%</p>
              <Button size="sm" variant="outline" className="w-full h-8 rounded-lg">
                Optimize Now
              </Button>
            </div>
          </div>
        </div>

        {/* Content Overview */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-foreground mb-4">Content Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Modules</span>
                <span className="text-sm text-foreground">{courseData.outline?.length || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Lessons</span>
                <span className="text-sm text-foreground">{courseData.outline?.reduce((acc, m) => acc + m.lessons.length, 0) || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="text-sm text-foreground">4h 32min</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-foreground mb-4">Accessibility</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Readability</span>
                  <span className="text-green-600">92%</span>
                </div>
                <Progress value={92} className="h-1.5" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Alt Text</span>
                  <span className="text-orange-600">67%</span>
                </div>
                <Progress value={67} className="h-1.5" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-foreground mb-4">Engagement</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Interactive Elements</span>
                <span className="text-sm text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Assessments</span>
                <span className="text-sm text-foreground">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Resources</span>
                <span className="text-sm text-foreground">24</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'content') {
    // Show empty state if no modules
    if (!courseData.outline || courseData.outline.length === 0) {
      return (
        <div className="p-8 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl text-foreground mb-1">Course Content</h2>
              <p className="text-sm text-muted-foreground">Manage your modules and lessons</p>
            </div>
          </div>
          <EmptyState
            title="No modules yet"
            description="Get started by creating your first module or let AI help you build a complete course structure"
            type="modules"
            prompts={[
              "Generate 5 modules for a beginner web development course",
              "Create a module outline for an advanced React course",
              "Build a comprehensive Python programming curriculum",
            ]}
            onPromptClick={onPromptClick}
          />
        </div>
      );
    }
    
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-foreground mb-1">Course Content</h2>
            <p className="text-sm text-muted-foreground">Manage your modules and lessons</p>
          </div>
          <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Plus className="size-4 mr-2" />
            Add Module
          </Button>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {courseData.outline?.map((module, idx) => {
            const isExpanded = expandedModules.includes(idx);
            
            return (
              <div key={idx} className="bg-card rounded-2xl border border-border transition-all duration-300 overflow-hidden">
                {/* Module Header */}
                <div className="bg-gradient-to-r from-muted to-card p-5 border-b border-border">
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-grab hover:bg-muted">
                      <GripVertical className="size-4 text-muted-foreground" />
                    </Button>
                    <div className="size-10 rounded-xl border-2 border-border flex items-center justify-center bg-card">
                      <span className="text-sm text-foreground">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1">{module.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{module.lessons.length} lessons</span>
                        <span>•</span>
                        <span>~45 min</span>
                        <span>•</span>
                        <Badge variant="secondary" className="text-xs">Draft</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-muted">
                        <Edit2 className="size-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-muted">
                        <Trash2 className="size-4 text-muted-foreground" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
                        onClick={() => toggleModule(idx)}
                      >
                        {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 ml-16">
                    <Progress value={0} className="h-1.5" />
                  </div>
                </div>

                {/* Lessons */}
                {isExpanded && (
                  <div className="p-5">
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lessonIdx) => (
                        <div 
                          key={lessonIdx} 
                          className="group flex items-center gap-4 p-4 border border-border rounded-xl hover:bg-muted hover:border-border transition-all duration-200"
                        >
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                            <GripVertical className="size-3 text-muted-foreground" />
                          </Button>
                          <div className="size-8 rounded-lg bg-muted flex items-center justify-center">
                            <PlayCircle className="size-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground">{lesson}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="size-3" />
                                <span>5 min</span>
                              </div>
                              <span>•</span>
                              <span>Video + Text</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg">
                              <Edit2 className="size-3 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg">
                              <MoreHorizontal className="size-3 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 rounded-xl border-dashed">
                      <Plus className="size-4 mr-2" />
                      Add Lesson
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-card rounded-2xl p-12 text-center border border-border">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <BarChart className="size-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl text-foreground mb-2 capitalize">{activeSection}</h3>
        <p className="text-muted-foreground">This section is under construction</p>
      </div>
    </div>
  );
}
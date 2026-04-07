import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  BookOpen,
  Users as UsersIcon,
  FileText,
  Target,
  Star,
  Clock,
  Eye,
  CheckCircle,
  Upload,
  Info,
  Wand2,
  Check,
  Edit,
  RotateCcw,
  BookMarked,
  GraduationCap,
  Plus,
  X,
  Paperclip,
  Video,
  Award,
  Rocket,
  Copy,
  ExternalLink,
  DollarSign,
  CircleDot,
  Activity,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface CourseBuilderOverviewSectionProps {
  courseTitle: string;
  courseDescription: string;
  setCourseDescription: (value: string) => void;
  targetAudience: string;
  setTargetAudience: (value: string) => void;
  learningOutcomes: string[];
  setLearningOutcomes: (outcomes: string[]) => void;
  newOutcome: string;
  setNewOutcome: (value: string) => void;
  handleAddOutcome: () => void;
  handleRemoveOutcome: (index: number) => void;
  handleRegenerateField: (field: string) => void;
  isRegenerating: string | null;
  editingField: string | null;
  setEditingField: (field: string | null) => void;
  studentsCount: number;
  completionRate: number;
  engagementScore: number;
  healthScore: number;
  onCreateCommunity?: () => void;
}

export function CourseBuilderOverviewSection({
  courseTitle,
  courseDescription,
  setCourseDescription,
  targetAudience,
  setTargetAudience,
  learningOutcomes,
  setLearningOutcomes,
  newOutcome,
  setNewOutcome,
  handleAddOutcome,
  handleRemoveOutcome,
  handleRegenerateField,
  isRegenerating,
  editingField,
  setEditingField,
  studentsCount,
  completionRate,
  engagementScore,
  healthScore,
  onCreateCommunity
}: CourseBuilderOverviewSectionProps) {
  return (
    <div className="space-y-6">
      {/* Hero Section with Cover Image */}
      <div className="bg-card rounded-xl overflow-hidden border border-border">
        <div className="relative h-48 bg-muted">
          {/* Placeholder for cover image */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/20" />
          <div className="relative h-full p-8 flex flex-col justify-end">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                    <BookOpen className="size-3 mr-1" />
                    Online Course
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="size-3 mr-1" />
                    Published
                  </Badge>
                </div>
                <h1 className="text-foreground text-2xl mb-2">{courseTitle}</h1>
                <p className="text-muted-foreground text-sm max-w-2xl">
                  {courseDescription}
                </p>
              </div>
              <Button variant="outline" size="sm" className="bg-white">
                <Upload className="size-3.5 mr-2" />
                Change Cover
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick Stats Bar */}
        <div className="bg-muted border-t border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <UsersIcon className="size-4 text-purple-600" />
                <span className="text-foreground">
                  <span className="font-medium">{studentsCount}</span>
                  <span className="text-muted-foreground text-sm ml-1">enrolled</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="size-4 text-yellow-500" />
                <span className="text-foreground">
                  <span className="font-medium">4.7</span>
                  <span className="text-muted-foreground text-sm ml-1">(48 reviews)</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <span className="text-foreground text-sm">Last updated: Dec 15, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="size-4 text-green-600" />
                <span className="text-foreground">
                  <span className="font-medium">{completionRate}%</span>
                  <span className="text-muted-foreground text-sm ml-1">completion</span>
                </span>
              </div>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
              <Eye className="size-3.5 mr-2" />
              Preview Course
            </Button>
          </div>
        </div>
      </div>

      {/* THE HOOK - Premium Purple Card */}
      <div className="bg-gradient-to-br from-primary via-purple-700 to-purple-900 rounded-xl p-6 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Rocket className="size-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">The Hook</h3>
              <p className="text-purple-200 text-sm">What makes this course irresistible?</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
            <Wand2 className="size-3.5 mr-2" />
            AI Enhance
          </Button>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <p className="text-white leading-relaxed">
            Transform your career with hands-on projects and real-world experience. Our proven curriculum has helped thousands land their dream developer jobs, with 89% of graduates employed within 3 months. Join a vibrant community of learners and get lifetime access to all course updates.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-2 mb-1">
              <Award className="size-4 text-purple-200" />
              <span className="text-xs text-purple-200">Value Prop</span>
            </div>
            <p className="text-white text-sm font-medium">Career Transformation</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-2 mb-1">
              <Star className="size-4 text-purple-200" />
              <span className="text-xs text-purple-200">Social Proof</span>
            </div>
            <p className="text-white text-sm font-medium">89% Job Placement</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="size-4 text-purple-200" />
              <span className="text-xs text-purple-200">Urgency</span>
            </div>
            <p className="text-white text-sm font-medium">Limited Cohort</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="col-span-2 space-y-6">
          {/* Core Information */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground flex items-center gap-2">
                <Info className="size-5 text-primary" />
                Course Information
              </h3>
              <Button size="sm" variant="ghost" className="text-primary hover:text-primary">
                <Wand2 className="size-3.5 mr-2" />
                AI Enhance
              </Button>
            </div>

            <div className="space-y-5">
              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <div className="flex gap-2">
                    {editingField === 'description' ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingField(null)}
                        className="h-7 px-2 text-xs"
                      >
                        <Check className="size-3 mr-1" />
                        Done
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingField('description')}
                          className="h-7 px-2 text-xs text-muted-foreground"
                        >
                          <Edit className="size-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRegenerateField('description')}
                          disabled={isRegenerating === 'description'}
                          className="h-7 px-2 text-xs text-primary"
                        >
                          <RotateCcw className={`size-3 mr-1 ${isRegenerating === 'description' ? 'animate-spin' : ''}`} />
                          Regenerate
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                {editingField === 'description' ? (
                  <Textarea
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{courseDescription}</p>
                )}
              </div>

              {/* Course Details Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Category</label>
                  <div className="flex items-center gap-2">
                    <BookMarked className="size-4 text-primary" />
                    <span className="text-foreground">Web Development</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Level</label>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="size-4 text-blue-600" />
                    <span className="text-foreground">Intermediate</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Language</label>
                  <span className="text-foreground">English</span>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Duration</label>
                  <span className="text-foreground">8 hours 30 minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Target Audience & Prerequisites */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-foreground flex items-center gap-2 mb-5">
              <UsersIcon className="size-5 text-primary" />
              Target Audience & Prerequisites
            </h3>

            <div className="space-y-5">
              {/* Target Audience */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-foreground">Who is this course for?</label>
                  <div className="flex gap-2">
                    {editingField === 'targetAudience' ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingField(null)}
                        className="h-7 px-2 text-xs"
                      >
                        <Check className="size-3 mr-1" />
                        Done
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingField('targetAudience')}
                          className="h-7 px-2 text-xs text-muted-foreground"
                        >
                          <Edit className="size-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRegenerateField('targetAudience')}
                          disabled={isRegenerating === 'targetAudience'}
                          className="h-7 px-2 text-xs text-primary"
                        >
                          <RotateCcw className={`size-3 mr-1 ${isRegenerating === 'targetAudience' ? 'animate-spin' : ''}`} />
                          Regenerate
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                {editingField === 'targetAudience' ? (
                  <Textarea
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    rows={2}
                    className="resize-none"
                  />
                ) : (
                  <p className="text-muted-foreground">{targetAudience}</p>
                )}
              </div>

              {/* Prerequisites */}
              <div className="pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground mb-3 block">Prerequisites</label>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Basic understanding of HTML and CSS
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    Familiarity with programming concepts
                  </li>
                  <li className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                    A computer with internet access
                  </li>
                </ul>
                <Button size="sm" variant="outline" className="mt-3">
                  <Plus className="size-3 mr-1" />
                  Add Prerequisite
                </Button>
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-foreground flex items-center gap-2">
                <Target className="size-5 text-primary" />
                What Students Will Learn
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleRegenerateField('learningOutcomes')}
                disabled={isRegenerating === 'learningOutcomes'}
                className="text-primary"
              >
                <RotateCcw className={`size-3.5 mr-2 ${isRegenerating === 'learningOutcomes' ? 'animate-spin' : ''}`} />
                Regenerate All
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex gap-2 items-start group p-3 rounded-lg border border-border hover:border-purple-200 hover:bg-purple-50/30 transition-all">
                  <Check className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="flex-1 text-sm text-foreground">{outcome}</span>
                  <button
                    onClick={() => handleRemoveOutcome(idx)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-600"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 pt-3 border-t border-border">
              <Input
                value={newOutcome}
                onChange={(e) => setNewOutcome(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddOutcome();
                }}
                placeholder="Add new learning outcome..."
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={handleAddOutcome}
                disabled={!newOutcome.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="size-3.5 mr-1" />
                Add
              </Button>
            </div>
          </div>

          {/* Course Materials */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-foreground flex items-center gap-2 mb-5">
              <Paperclip className="size-5 text-primary" />
              Course Materials & Resources
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Video className="size-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Video Lectures</p>
                    <p className="text-xs text-muted-foreground">42 HD videos • 8h 30m total</p>
                  </div>
                </div>
                <Badge variant="secondary">Included</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <FileText className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Downloadable Resources</p>
                    <p className="text-xs text-muted-foreground">Code files, cheat sheets, PDFs</p>
                  </div>
                </div>
                <Badge variant="secondary">Included</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Award className="size-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Certificate of Completion</p>
                    <p className="text-xs text-muted-foreground">Share on LinkedIn</p>
                  </div>
                </div>
                <Badge variant="secondary">Included</Badge>
              </div>

              <Button variant="outline" className="w-full mt-2">
                <Plus className="size-3.5 mr-2" />
                Add Material
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-foreground text-sm font-medium mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full justify-start bg-primary hover:bg-primary/90">
                <Rocket className="size-4 mr-2" />
                Publish Course
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="size-4 mr-2" />
                Preview as Student
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Copy className="size-4 mr-2" />
                Duplicate Course
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="size-4 mr-2" />
                View Sales Page
              </Button>
            </div>
          </div>

          {/* Pricing & Access */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground text-sm font-medium">Pricing & Access</h3>
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                <Edit className="size-3 mr-1" />
                Edit
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Pricing Model</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4 text-green-600" />
                  <span className="text-foreground font-medium">$199 One-time</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Enrollment Status</label>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CircleDot className="size-3 mr-1" />
                  Open
                </Badge>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Lifetime Access</label>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Enabled</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Enrollment Cap</label>
                <span className="text-sm text-muted-foreground">Unlimited</span>
              </div>
            </div>
          </div>

          {/* Course Health */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="size-5 text-purple-600" />
              <h3 className="text-foreground text-sm font-medium">Course Health</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Overall Score</span>
                  <span className="text-sm font-medium text-foreground">{healthScore}/100</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all"
                    style={{ width: `${healthScore}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Completion Rate</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-foreground">{completionRate}%</span>
                    <TrendingUp className="size-3 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Engagement</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-foreground">{engagementScore}%</span>
                    <TrendingUp className="size-3 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Student Satisfaction</span>
                  <div className="flex items-center gap-1">
                    <Star className="size-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-foreground">4.7/5</span>
                  </div>
                </div>
              </div>

              <Button size="sm" variant="outline" className="w-full mt-3 border-purple-200 hover:bg-white">
                <BarChart3 className="size-3.5 mr-2" />
                View Full Report
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-foreground text-sm font-medium mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <UsersIcon className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Students</p>
                    <p className="font-medium text-foreground">{studentsCount}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                  +12
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <DollarSign className="size-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Revenue</p>
                    <p className="font-medium text-foreground">$25,273</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                  +$2.4k
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Award className="size-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Certificates</p>
                    <p className="font-medium text-foreground">94</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                  +8
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Star className="size-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Avg. Rating</p>
                    <p className="font-medium text-foreground">4.7/5</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  48 reviews
                </Badge>
              </div>
            </div>
          </div>

          {/* Instructor Info */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-foreground text-sm font-medium mb-4">Instructor</h3>
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium">
                JD
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">John Doe</p>
                <p className="text-xs text-muted-foreground">Web Development Expert</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE HOOK - Community Conversion CTA */}
      <div className="rounded-xl p-6 shadow-xl border-2" style={{ 
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #2563EB 100%)',
        borderColor: '#7C3BAD'
      }}>
        <div className="flex items-start gap-4">
          <div className="size-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
            <TrendingUp className="size-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-white font-semibold">🎓 Great Enrollment! Build a Student Community</h3>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur">
                Recommended
              </Badge>
            </div>
            <p className="text-white/90 text-sm mb-4">
              You have <strong className="text-white">{studentsCount} enrolled students</strong> - that's amazing! Create a dedicated community where your students can:
              connect with each other, ask questions, share progress, and get ongoing support from you and their peers.
            </p>
            <div className="flex gap-3">
              <Button className="bg-white hover:bg-white/90 shadow-lg text-primary" onClick={onCreateCommunity}>
                <Rocket className="size-4 mr-2" />
                Create Community
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
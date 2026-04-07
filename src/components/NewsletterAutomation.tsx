import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Mail,
  Send,
  Calendar,
  Users,
  TrendingUp,
  Settings,
  Eye,
  Plus,
  Edit,
  Trash2,
  Clock,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  FileText,
  Image as ImageIcon,
  Type,
  Layout,
  Zap,
  Target,
  Activity
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface NewsletterTemplate {
  id: string;
  name: string;
  description: string;
  sections: string[];
  lastUsed?: string;
}

interface NewsletterSchedule {
  id: string;
  name: string;
  frequency: string;
  nextSend: string;
  status: 'active' | 'paused' | 'draft';
  openRate: number;
  clickRate: number;
}

interface NewsletterStats {
  totalSent: number;
  avgOpenRate: number;
  avgClickRate: number;
  subscribers: number;
  growth: number;
}

export function NewsletterAutomation() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('weekly');
  const [sendTime, setSendTime] = useState<string>('09:00');
  const [sendDay, setSendDay] = useState<string>('thursday');

  const templates: NewsletterTemplate[] = [
    {
      id: '1',
      name: 'Weekly Digest',
      description: 'Comprehensive weekly update with events, highlights, and community news',
      sections: ['Event Recap', 'Upcoming Events', 'Community Highlights', 'CTA'],
      lastUsed: '2 days ago'
    },
    {
      id: '2',
      name: 'Event Announcement',
      description: 'Focused template for promoting single events',
      sections: ['Hero Banner', 'Event Details', 'Speaker Bio', 'Register CTA'],
      lastUsed: '1 week ago'
    },
    {
      id: '3',
      name: 'Monthly Roundup',
      description: 'Comprehensive monthly summary with analytics and achievements',
      sections: ['Month Summary', 'Top Events', 'Member Spotlight', 'Next Month Preview'],
      lastUsed: '3 weeks ago'
    },
    {
      id: '4',
      name: 'Welcome Series',
      description: 'Automated onboarding sequence for new members',
      sections: ['Welcome Message', 'Getting Started', 'Community Resources', 'First Event CTA'],
      lastUsed: 'Never'
    }
  ];

  const schedules: NewsletterSchedule[] = [
    {
      id: '1',
      name: 'Weekly Community Update',
      frequency: 'Every Thursday at 9:00 AM',
      nextSend: 'Tomorrow, 9:00 AM',
      status: 'active',
      openRate: 42.5,
      clickRate: 8.3
    },
    {
      id: '2',
      name: 'Event Reminders',
      frequency: 'Event-triggered',
      nextSend: 'Jan 18, 10:00 AM',
      status: 'active',
      openRate: 58.2,
      clickRate: 15.7
    },
    {
      id: '3',
      name: 'Monthly Highlights',
      frequency: 'First Monday of month',
      nextSend: 'Feb 3, 9:00 AM',
      status: 'active',
      openRate: 38.9,
      clickRate: 6.4
    },
    {
      id: '4',
      name: 'New Member Welcome',
      frequency: 'Immediately on join',
      nextSend: 'Ongoing',
      status: 'active',
      openRate: 71.3,
      clickRate: 22.1
    }
  ];

  const stats: NewsletterStats = {
    totalSent: 12847,
    avgOpenRate: 42.3,
    avgClickRate: 9.7,
    subscribers: 2456,
    growth: 12.5
  };

  const behavioralTriggers = [
    { event: 'New Member Join', delay: 'Immediate', status: 'active' },
    { event: 'Event Registration', delay: '7 days before', status: 'active' },
    { event: 'Event Registration', delay: '1 day before', status: 'active' },
    { event: 'Event Attendance', delay: '1 day after', status: 'active' },
    { event: 'Inactive 30 days', delay: 'On day 30', status: 'active' },
    { event: 'Member Birthday', delay: 'On birthday', status: 'paused' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">Newsletter Automation</h1>
                <p className="text-sm text-muted-foreground">
                  Intelligent email marketing & calendar orchestration
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Send Test
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Layout className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="automation">
              <Zap className="w-4 h-4 mr-2" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Activity className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Total Sent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    +1,234 this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Avg Open Rate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgOpenRate}%</div>
                  <p className="text-xs text-green-600 mt-1">
                    +2.3% vs industry avg
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Avg Click Rate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgClickRate}%</div>
                  <p className="text-xs text-green-600 mt-1">
                    +1.2% vs last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Subscribers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.subscribers.toLocaleString()}</div>
                  <p className="text-xs text-green-600 mt-1">
                    +{stats.growth}% growth
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Active Schedules */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Schedules</CardTitle>
                    <CardDescription>Automated newsletters currently running</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Schedule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{schedule.name}</h4>
                            <Badge 
                              variant={schedule.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {schedule.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {schedule.frequency}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Next: {schedule.nextSend}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="text-sm font-semibold">{schedule.openRate}%</div>
                            <div className="text-xs text-muted-foreground">Open Rate</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-semibold">{schedule.clickRate}%</div>
                            <div className="text-xs text-muted-foreground">Click Rate</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Quick Setup
                </CardTitle>
                <CardDescription>Let AI configure your newsletter automation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-6 flex-col gap-3">
                    <Mail className="w-8 h-8 text-primary" />
                    <div className="text-center">
                      <div className="font-semibold">Weekly Newsletter</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Auto-curated weekly digest
                      </div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex-col gap-3">
                    <Zap className="w-8 h-8 text-primary" />
                    <div className="text-center">
                      <div className="font-semibold">Event Automation</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Trigger-based event emails
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Newsletter Templates</h2>
                <p className="text-sm text-muted-foreground">Pre-designed templates for different use cases</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="mt-1">{template.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Template Preview */}
                    <div className="aspect-video rounded-lg border bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Template Preview</p>
                      </div>
                    </div>

                    {/* Sections */}
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Sections</Label>
                      <div className="flex flex-wrap gap-2">
                        {template.sections.map((section, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Meta */}
                    {template.lastUsed && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Last used {template.lastUsed}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </Button>
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Configuration</CardTitle>
                <CardDescription>Set up when and how often newsletters are sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <Label>Newsletter Name</Label>
                      <Input placeholder="e.g., Weekly Community Update" className="mt-2" />
                    </div>

                    <div>
                      <Label>Select Template</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Choose a template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Frequency</Label>
                      <Select value={frequency} onValueChange={setFrequency}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <Label>Send Day</Label>
                      <Select value={sendDay} onValueChange={setSendDay}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Send Time</Label>
                      <Input type="time" value={sendTime} onChange={(e) => setSendTime(e.target.value)} className="mt-2" />
                    </div>

                    <div>
                      <Label>Timezone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern (EST)</SelectItem>
                          <SelectItem value="cst">Central (CST)</SelectItem>
                          <SelectItem value="mst">Mountain (MST)</SelectItem>
                          <SelectItem value="pst">Pacific (PST)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* AI Recommendation */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">AI Recommendation</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Based on your community size (2,456 members) and activity (47 posts/week), optimal cadence is:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span><strong>Weekly Newsletter</strong> - Thursdays at 9:00 AM EST</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Expected open rate: <strong>42%</strong> (industry avg: 21%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>Rationale: Thursday = highest engagement for your audience</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="mt-3">
                        Apply Recommendation
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Activate Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Tab */}
          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Behavioral Triggers</CardTitle>
                    <CardDescription>Automated emails based on member actions</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Trigger
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {behavioralTriggers.map((trigger, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${trigger.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <div>
                          <div className="font-medium">{trigger.event}</div>
                          <div className="text-sm text-muted-foreground">Send {trigger.delay}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={trigger.status === 'active' ? 'default' : 'secondary'}>
                          {trigger.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Switch defaultChecked={trigger.status === 'active'} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personalization Settings</CardTitle>
                <CardDescription>Customize how content adapts to each subscriber</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Event Recommendations</div>
                    <div className="text-sm text-muted-foreground">Show events based on past attendance</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Dynamic Greetings</div>
                    <div className="text-sm text-muted-foreground">Personalize greeting based on member status</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Content Filtering</div>
                    <div className="text-sm text-muted-foreground">Show only relevant discussions and topics</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Tone Adaptation</div>
                    <div className="text-sm text-muted-foreground">Adjust formality for new vs returning members</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg border bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Performance Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscriber Growth</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg border bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Growth Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Newsletters</CardTitle>
                <CardDescription>Ranked by open rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'New Member Welcome Series', openRate: 71.3, clickRate: 22.1, sends: 147 },
                    { name: 'Event Reminder - React Workshop', openRate: 58.2, clickRate: 15.7, sends: 234 },
                    { name: 'Weekly Community Digest', openRate: 42.5, clickRate: 8.3, sends: 2456 },
                    { name: 'Monthly Highlights', openRate: 38.9, clickRate: 6.4, sends: 2456 },
                  ].map((newsletter, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{newsletter.name}</div>
                        <div className="text-sm text-muted-foreground">{newsletter.sends.toLocaleString()} sends</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm font-semibold">{newsletter.openRate}%</div>
                          <div className="text-xs text-muted-foreground">Open</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold">{newsletter.clickRate}%</div>
                          <div className="text-xs text-muted-foreground">Click</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

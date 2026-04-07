import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Calendar, Plus, MessageSquare, Mail, Lightbulb, Clock, Zap, Activity,
  Workflow, TrendingUp, Brain, Target, CheckCircle, TrendingDown, Edit
} from 'lucide-react';

export function CalendarTab() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm text-foreground mb-4">AI-Powered Content Calendar</h3>
        
        {/* Week View */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={day} className="text-center">
              <p className="text-xs text-muted-foreground mb-2">{day}</p>
              <div className={`p-3 rounded-lg border ${
                idx === 3 ? 'bg-primary/10 border-primary/20' : 'border-border'
              }`}>
                <p className="text-xs text-foreground mb-2">{idx + 9}</p>
                {idx === 1 && (
                  <div className="space-y-1">
                    <div className="bg-blue-100 text-blue-700 text-xs p-1 rounded">
                      <p className="truncate">Post</p>
                    </div>
                  </div>
                )}
                {idx === 3 && (
                  <div className="space-y-1">
                    <div className="bg-primary/10 text-primary text-xs p-1 rounded">
                      <p className="truncate">Event</p>
                    </div>
                    <div className="bg-green-100 text-green-700 text-xs p-1 rounded">
                      <p className="truncate">Email</p>
                    </div>
                  </div>
                )}
                {idx === 5 && (
                  <div className="space-y-1">
                    <div className="bg-orange-100 text-orange-700 text-xs p-1 rounded">
                      <p className="truncate">Course</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Content */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-foreground">Scheduled Content</h3>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="size-4 mr-2" />
            Schedule
          </Button>
        </div>
        <div className="space-y-3">
          {[
            { type: 'Post', title: 'Weekly discussion: Design trends 2024', date: 'Dec 10, 2PM', status: 'Scheduled' },
            { type: 'Email', title: 'Monthly newsletter', date: 'Dec 12, 9AM', status: 'Draft' },
            { type: 'Event', title: 'Community call reminder', date: 'Dec 15, 12PM', status: 'Scheduled' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 border border-border rounded-lg">
              <div className={`size-10 rounded-lg flex items-center justify-center ${
                item.type === 'Post' ? 'bg-blue-100' : item.type === 'Email' ? 'bg-green-100' : 'bg-primary/10'
              }`}>
                {item.type === 'Post' && <MessageSquare className="size-5 text-blue-700" />}
                {item.type === 'Email' && <Mail className="size-5 text-green-700" />}
                {item.type === 'Event' && <Calendar className="size-5 text-primary" />}
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <Badge variant={item.status === 'Scheduled' ? 'default' : 'secondary'} className="text-xs">
                {item.status}
              </Badge>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="size-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-foreground mb-1">AI Scheduling Insights</h3>
            <p className="text-sm text-muted-foreground mb-3">Best times to post this week based on member activity patterns:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="size-4 text-primary" />
                <span className="text-foreground">Thursday 2-4 PM</span>
                <span className="text-xs text-muted-foreground">(68% active members)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="size-4 text-primary" />
                <span className="text-foreground">Tuesday 10-11 AM</span>
                <span className="text-xs text-muted-foreground">(55% active members)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AutomationTab() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'Welcome New Members', description: 'Send personalized welcome DM within 5 minutes', active: true, triggers: 12 },
          { name: 'Daily Engagement Boost', description: 'Post conversation starter every morning', active: true, triggers: 7 },
          { name: 'Member Re-engagement', description: 'Reach out to inactive members after 14 days', active: true, triggers: 3 },
          { name: 'Event Reminders', description: 'Send reminders 24h and 1h before events', active: false, triggers: 0 },
          { name: 'Content Moderation', description: 'Flag potential spam and inappropriate content', active: true, triggers: 5 },
          { name: 'Member Matching', description: 'Connect members with shared interests weekly', active: false, triggers: 0 }
        ].map((automation, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm text-foreground mb-1">{automation.name}</h3>
                <p className="text-xs text-muted-foreground">{automation.description}</p>
              </div>
              <button className={`size-10 rounded-lg flex items-center justify-center ${
                automation.active ? 'bg-primary' : 'bg-muted'
              }`}>
                {automation.active ? (
                  <Zap className="size-4 text-white" />
                ) : (
                  <Zap className="size-4 text-muted-foreground" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Activity className="size-3" />
                <span>{automation.triggers} triggers this week</span>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Automation Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm text-foreground mb-4">Automation Impact</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Time Saved</p>
            <p className="text-2xl text-foreground">8.5h</p>
            <p className="text-xs text-muted-foreground">This week</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Actions Completed</p>
            <p className="text-2xl text-foreground">27</p>
            <p className="text-xs text-muted-foreground">This week</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
            <p className="text-2xl text-foreground">94%</p>
            <p className="text-xs text-muted-foreground">All time</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Members Reached</p>
            <p className="text-2xl text-foreground">45</p>
            <p className="text-xs text-muted-foreground">This week</p>
          </div>
        </div>
      </div>

      {/* Create Custom Automation */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Workflow className="size-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-foreground mb-1">Custom Automation</h3>
            <p className="text-sm text-muted-foreground mb-3">Create custom workflows tailored to your community needs</p>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="size-3 mr-2" />
              Build Automation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InsightsTab() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="size-4 text-green-600" />
            <h3 className="text-sm text-foreground">Growth Prediction</h3>
          </div>
          <p className="text-2xl text-foreground mb-2">+28 members</p>
          <p className="text-xs text-muted-foreground">Expected by end of month based on current trends</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="size-4 text-primary" />
            <h3 className="text-sm text-foreground">Engagement Forecast</h3>
          </div>
          <p className="text-2xl text-foreground mb-2">72%</p>
          <p className="text-xs text-muted-foreground">Predicted engagement rate for next week</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target className="size-4 text-blue-600" />
            <h3 className="text-sm text-foreground">Health Trend</h3>
          </div>
          <p className="text-2xl text-foreground mb-2">85/100</p>
          <p className="text-xs text-muted-foreground">Projected community health score</p>
        </div>
      </div>

      {/* Member Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm text-foreground mb-4">Member Behavior Insights</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-foreground">Peak Activity Times</span>
              <Badge variant="secondary" className="text-xs">Updated hourly</Badge>
            </div>
            <div className="h-32 flex items-end justify-around gap-1">
              {[20, 35, 45, 60, 75, 85, 90, 95, 88, 78, 65, 52, 45, 58, 72, 85, 82, 70, 58, 42, 35, 28, 22, 18].map((value, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-primary/20 rounded-t hover:bg-primary/30 transition-colors cursor-pointer"
                  style={{ height: `${value}%` }}
                  title={`${idx}:00 - ${value}% active`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>12 AM</span>
              <span>6 AM</span>
              <span>12 PM</span>
              <span>6 PM</span>
              <span>11 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm text-foreground mb-4">Content Performance</h3>
        <div className="space-y-3">
          {[
            { type: 'Image Posts', performance: 85, trend: 'up' },
            { type: 'Text Posts', performance: 68, trend: 'neutral' },
            { type: 'Link Shares', performance: 42, trend: 'down' },
            { type: 'Polls', performance: 92, trend: 'up' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-sm text-foreground w-32">{item.type}</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    item.performance > 70 ? 'bg-green-600' : item.performance > 50 ? 'bg-blue-600' : 'bg-orange-600'
                  }`}
                  style={{ width: `${item.performance}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12">{item.performance}%</span>
              {item.trend === 'up' && <TrendingUp className="size-4 text-green-600" />}
              {item.trend === 'down' && <TrendingDown className="size-4 text-red-600" />}
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="size-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-foreground mb-1">Actionable Insights</h3>
            <div className="space-y-2 mt-3">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="size-4 text-green-600 mt-0.5" />
                <p className="text-foreground">Post more image-based content - 85% engagement rate</p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="size-4 text-green-600 mt-0.5" />
                <p className="text-foreground">Create polls - highest performing content type</p>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="size-4 text-green-600 mt-0.5" />
                <p className="text-foreground">Schedule posts between 2-4 PM for maximum reach</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
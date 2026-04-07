import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ThumbsUp, ThumbsDown, Copy, RotateCcw, Eye, EyeOff, Lightbulb, TrendingUp, AlertTriangle, Info, ChevronRight, CheckCircle2, XCircle, Clock, Zap, FileText, Target, MessageSquare, Settings2, Maximize2, Minimize2, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Conversation, Message, CourseData } from '../types';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AIChatPanelProps {
  conversation: Conversation;
  onUpdateMessages: (messages: Message[]) => void;
  courseData: Partial<CourseData>;
}

interface AISuggestion {
  id: string;
  type: 'improvement' | 'warning' | 'optimization' | 'insight';
  category: string;
  title: string;
  description: string;
  rationale: string;
  impact: {
    metric: string;
    value: string;
    change: number;
  };
  confidence: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  actions: {
    primary: string;
    secondary?: string;
  };
  affectedContent: string[];
}

const mockSuggestions: AISuggestion[] = [
  {
    id: '1',
    type: 'improvement',
    category: 'Content Structure',
    title: 'Add Interactive Exercises to Module 2',
    description: 'Students show 42% higher retention when practice exercises follow theoretical content.',
    rationale: 'Analysis of 12,000+ successful courses shows practice-heavy modules have 3.2x completion rates.',
    impact: {
      metric: 'Completion Rate',
      value: '+18%',
      change: 18,
    },
    confidence: 94,
    priority: 'high',
    actions: {
      primary: 'Generate 5 Exercises',
      secondary: 'Preview Examples',
    },
    affectedContent: ['Module 2: Advanced Concepts', '3 Lessons'],
  },
  {
    id: '2',
    type: 'warning',
    category: 'User Experience',
    title: 'Lesson Duration Imbalance Detected',
    description: 'Lesson 3.2 (38 min) is 3.4x longer than the average lesson duration (11 min).',
    rationale: 'Students drop off at 85% rate for lessons exceeding 20 minutes without breaks.',
    impact: {
      metric: 'Drop-off Risk',
      value: '-23%',
      change: -23,
    },
    confidence: 91,
    priority: 'critical',
    actions: {
      primary: 'Auto-Split Lesson',
      secondary: 'Add Checkpoints',
    },
    affectedContent: ['Module 3, Lesson 2'],
  },
  {
    id: '3',
    type: 'optimization',
    category: 'SEO & Discovery',
    title: 'Enhance Search Visibility',
    description: 'Adding target keywords "advanced techniques" and "practical guide" to metadata.',
    rationale: 'Keyword gap analysis shows 2,400 monthly searches for missing terms in your niche.',
    impact: {
      metric: 'Search Ranking',
      value: '+28%',
      change: 28,
    },
    confidence: 87,
    priority: 'medium',
    actions: {
      primary: 'Apply Keywords',
      secondary: 'View Report',
    },
    affectedContent: ['Course Metadata', 'Module Descriptions'],
  },
  {
    id: '4',
    type: 'insight',
    category: 'Engagement',
    title: 'Peak Learning Pattern Identified',
    description: 'Your target audience shows highest engagement during 7-9 PM EST on weekdays.',
    rationale: 'Behavioral analysis of 45,000 learners in similar courses.',
    impact: {
      metric: 'Engagement',
      value: '+15%',
      change: 15,
    },
    confidence: 82,
    priority: 'low',
    actions: {
      primary: 'Schedule Launch',
      secondary: 'Learn More',
    },
    affectedContent: ['Course Launch Strategy'],
  },
];

const quickPrompts = [
  { category: 'Content', prompts: ['Improve lesson clarity', 'Add real-world examples', 'Simplify complex topics'] },
  { category: 'Assessment', prompts: ['Generate quiz questions', 'Create practice exercises', 'Add case studies'] },
  { category: 'SEO', prompts: ['Optimize metadata', 'Improve discoverability', 'Add keywords'] },
  { category: 'Structure', prompts: ['Reorder modules', 'Split long lessons', 'Add prerequisites'] },
];

export function AIChatPanel({ conversation, onUpdateMessages, courseData }: AIChatPanelProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions] = useState<AISuggestion[]>(mockSuggestions);
  const [activeTab, setActiveTab] = useState('suggestions');
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Content');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [conversation.messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...conversation.messages, userMessage];
    onUpdateMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I've analyzed your request and can help you with that. Here's what I suggest:\n\n**Approach:**\n1. Restructure the content flow for better progression\n2. Add 3-4 practical exercises with solutions\n3. Include real-world case study\n\nThis should improve completion rate by approximately 15-20%. Would you like me to proceed?",
        timestamp: new Date(),
      };

      onUpdateMessages([...updatedMessages, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'improvement':
        return <TrendingUp className="size-4 text-blue-600" />;
      case 'warning':
        return <AlertTriangle className="size-4 text-orange-600" />;
      case 'optimization':
        return <Zap className="size-4 text-purple-600" />;
      case 'insight':
        return <Lightbulb className="size-4 text-green-600" />;
      default:
        return <Info className="size-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatMessageContent = (content: string) => {
    // Simple formatting for bold and lists
    const parts = content.split('\n');
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <p key={idx} className="text-foreground mb-2">{part.replace(/\*\*/g, '')}</p>;
      } else if (part.match(/^\d+\./)) {
        return <li key={idx} className="ml-4 text-foreground">{part}</li>;
      } else if (part.trim()) {
        return <p key={idx} className="text-muted-foreground mb-1">{part}</p>;
      }
      return null;
    });
  };

  return (
    <div className={`flex flex-col h-full bg-card transition-all duration-200 ${isExpanded ? 'w-[600px]' : 'w-96'}`}>
      {/* Header */}
      <div className="border-b border-border p-4 bg-primary/5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Sparkles className="size-4 text-white" />
            </div>
            <div>
              <h3 className="text-foreground">AI Course Assistant</h3>
              <p className="text-xs text-muted-foreground">GPT-4 Turbo • Real-time analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings2 className="size-4" />
            </Button>
          </div>
        </div>

        {/* Context Indicator */}
        <div className="flex items-center gap-2 p-2 bg-card border border-border rounded-lg">
          <div className="p-1 bg-blue-100 rounded">
            <Eye className="size-3 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground">Monitoring: <span className="text-blue-600">Module 2</span></p>
            <p className="text-xs text-muted-foreground">Last analyzed 2 min ago</p>
          </div>
          <div className="size-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start border-b border-border bg-card rounded-none h-11 px-4">
          <TabsTrigger 
            value="suggestions" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none relative"
          >
            Suggestions
            {suggestions.filter(s => s.priority === 'critical' || s.priority === 'high').length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {suggestions.filter(s => s.priority === 'critical' || s.priority === 'high').length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
            Chat
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="flex-1 overflow-hidden m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {/* Priority Filter */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-muted-foreground">Filter:</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">All ({suggestions.length})</Badge>
                  <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">Critical (1)</Badge>
                  <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">High (1)</Badge>
                </div>
              </div>

              {/* Suggestions */}
              {suggestions.map((suggestion) => {
                const isExpanded = expandedSuggestion === suggestion.id;
                
                return (
                  <div 
                    key={suggestion.id} 
                    className="border border-border rounded-lg bg-card transition-all"
                  >
                    {/* Header */}
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-muted border border-border rounded-lg">
                          {getSuggestionIcon(suggestion.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className={`text-xs border ${getPriorityColor(suggestion.priority)}`}>
                              {suggestion.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{suggestion.category}</span>
                          </div>
                          <h4 className="text-foreground mb-1">{suggestion.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.description}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => setExpandedSuggestion(isExpanded ? null : suggestion.id)}
                        >
                          <ChevronRight className={`size-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </Button>
                      </div>

                      {/* Impact Metric */}
                      <div className="flex items-center gap-4 p-3 bg-muted border border-border rounded-lg mb-3">
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Expected Impact</p>
                          <p className="text-foreground">{suggestion.impact.metric}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl ${suggestion.impact.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {suggestion.impact.value}
                          </p>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="space-y-3 mb-3 pb-3 border-b border-border">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Why this matters:</p>
                            <p className="text-sm text-foreground bg-blue-50 border border-blue-100 rounded-lg p-3">
                              {suggestion.rationale}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Affected Content:</p>
                            <div className="flex flex-wrap gap-1">
                              {suggestion.affectedContent.map((content, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {content}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">AI Confidence:</span>
                            <Progress value={suggestion.confidence} className="h-2 flex-1" />
                            <span className="text-xs text-foreground">{suggestion.confidence}%</span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 h-9">
                          <CheckCircle2 className="size-3.5 mr-2" />
                          {suggestion.actions.primary}
                        </Button>
                        {suggestion.actions.secondary && (
                          <Button size="sm" variant="outline" className="h-9">
                            {suggestion.actions.secondary}
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="h-9 w-9 p-0">
                          <XCircle className="size-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden m-0 p-0">
          {/* Quick Prompts */}
          <div className="border-b border-border p-3 bg-muted">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="size-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Quick Actions</span>
            </div>
            <div className="flex gap-1 mb-2">
              {quickPrompts.map((cat) => (
                <Button
                  key={cat.category}
                  size="sm"
                  variant={selectedCategory === cat.category ? 'default' : 'outline'}
                  className="h-6 text-xs"
                  onClick={() => setSelectedCategory(cat.category)}
                >
                  {cat.category}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {quickPrompts.find(c => c.category === selectedCategory)?.prompts.map((prompt, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs hover:bg-primary/10 hover:border-primary/20"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {conversation.messages.slice(-10).map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && (
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg h-fit flex-shrink-0">
                      <Sparkles className="size-3.5 text-white" />
                    </div>
                  )}
                  <div className={`flex-1 max-w-[85%] ${message.role === 'user' ? 'order-first' : ''}`}>
                    <div className={`rounded-lg p-3 ${
                      message.role === 'user' 
                        ? 'bg-primary text-white ml-auto' 
                        : 'bg-card border border-border'
                    }`}>
                      <div className="text-sm leading-relaxed">
                        {message.role === 'user' ? message.content : formatMessageContent(message.content)}
                      </div>
                    </div>
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <ThumbsUp className="size-3 mr-1" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <ThumbsDown className="size-3 mr-1" />
                          Not helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <Copy className="size-3 mr-1" />
                          Copy
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <RotateCcw className="size-3 mr-1" />
                          Regenerate
                        </Button>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="p-2 bg-muted-foreground rounded-lg h-fit flex-shrink-0">
                      <div className="size-3.5 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg h-fit">
                    <Sparkles className="size-3.5 text-white" />
                  </div>
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border p-4 bg-card">
            <div className="flex gap-2 mb-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask AI to improve, analyze, or modify your course..."
                className="resize-none text-sm min-h-[80px]"
                rows={3}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="sm"
                className="self-end bg-primary hover:bg-primary/90 h-10 w-10 p-0"
              >
                <Send className="size-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted border border-border rounded">Enter</kbd>
                <span>to send</span>
                <span className="text-border">•</span>
                <kbd className="px-2 py-1 bg-muted border border-border rounded">Shift + Enter</kbd>
                <span>new line</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="flex-1 overflow-hidden m-0 p-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              <div className="text-sm text-muted-foreground mb-4">Recent AI Actions</div>
              
              {[
                { time: '2 min ago', action: 'Analyzed Module 2 structure', result: 'Found 3 improvement opportunities' },
                { time: '15 min ago', action: 'Generated quiz questions', result: '8 questions created for Module 1' },
                { time: '1 hour ago', action: 'Optimized course metadata', result: 'SEO score improved by 12%' },
                { time: '2 hours ago', action: 'Content quality analysis', result: 'Overall score: 8.4/10' },
              ].map((item, idx) => (
                <div key={idx} className="border border-border rounded-lg p-3 hover:bg-muted cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="size-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm text-foreground mb-1">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.result}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
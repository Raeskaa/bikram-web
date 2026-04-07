import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import {
  Send,
  Smile,
  Paperclip,
  MoreVertical,
  Pin,
  Reply,
  ThumbsUp,
  Heart,
  Trash2,
  Edit,
  Image as ImageIcon,
  User,
  Users,
  MessageSquare,
  BarChart3,
  Sparkles,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp,
  Lightbulb,
  Target,
  FileText,
  AlertCircle,
  Brain,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userRole?: 'host' | 'moderator' | 'participant';
  message: string;
  timestamp: string;
  reactions?: { emoji: string; count: number; users: string[] }[];
  isPinned?: boolean;
}

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number; voters: string[] }[];
  createdBy: string;
  createdAt: string;
  endsAt?: string;
  isActive: boolean;
  totalVotes: number;
}

interface DiscussionChannelV2Props {
  channelName?: string;
  channelType?: 'event' | 'course' | 'community';
  isLive?: boolean;
  canModerate?: boolean;
  userRole?: 'host' | 'moderator' | 'participant';
  eventStatus?: 'upcoming' | 'live' | 'ended';
}

export function DiscussionChannelV2({
  channelName = 'General Discussion',
  channelType = 'event',
  isLive = false,
  canModerate = false,
  userRole = 'participant',
  eventStatus = 'upcoming'
}: DiscussionChannelV2Props) {
  const [activeTab, setActiveTab] = useState<'chat' | 'polls' | 'insights'>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Chen',
      userRole: 'host',
      message: 'Welcome everyone! Looking forward to a great session today.',
      timestamp: '2:30 PM',
      reactions: [{ emoji: '👍', count: 5, users: ['user2', 'user3', 'user4', 'user5', 'user6'] }],
      isPinned: true
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Marcus Webb',
      userRole: 'participant',
      message: 'Excited to be here! This is going to be awesome.',
      timestamp: '2:32 PM',
      reactions: [{ emoji: '❤️', count: 2, users: ['user1', 'user3'] }]
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Elena Rodriguez',
      userRole: 'moderator',
      message: 'Quick reminder: Please mute your mic when not speaking.',
      timestamp: '2:35 PM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Polls state
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      question: 'What topics are you most interested in?',
      options: [
        { id: 'opt1', text: 'AI & Machine Learning', votes: 12, voters: ['user1', 'user2'] },
        { id: 'opt2', text: 'Product Design', votes: 8, voters: ['user3'] },
        { id: 'opt3', text: 'Growth Strategies', votes: 15, voters: ['user4', 'user5'] },
        { id: 'opt4', text: 'Team Leadership', votes: 6, voters: [] }
      ],
      createdBy: 'Sarah Chen',
      createdAt: '2:00 PM',
      isActive: true,
      totalVotes: 41
    }
  ]);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '']);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Chat handlers
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'You',
      userRole: userRole,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
        if (existingReaction) {
          const hasUserReacted = existingReaction.users.includes('currentUser');
          if (hasUserReacted) {
            existingReaction.users = existingReaction.users.filter(u => u !== 'currentUser');
            existingReaction.count--;
            if (existingReaction.count === 0) {
              msg.reactions = msg.reactions?.filter(r => r.emoji !== emoji);
            }
          } else {
            existingReaction.users.push('currentUser');
            existingReaction.count++;
          }
        } else {
          msg.reactions = [...(msg.reactions || []), { emoji, count: 1, users: ['currentUser'] }];
        }
      }
      return msg;
    }));
  };

  // Poll handlers
  const handleVote = (pollId: string, optionId: string) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        // Check if user already voted
        const hasVoted = poll.options.some(opt => opt.voters.includes('currentUser'));
        if (hasVoted) return poll; // Don't allow multiple votes

        poll.options = poll.options.map(opt => {
          if (opt.id === optionId) {
            return {
              ...opt,
              votes: opt.votes + 1,
              voters: [...opt.voters, 'currentUser']
            };
          }
          return opt;
        });
        poll.totalVotes += 1;
      }
      return poll;
    }));
  };

  const handleCreatePoll = () => {
    if (!newPollQuestion.trim() || newPollOptions.filter(o => o.trim()).length < 2) return;

    const newPoll: Poll = {
      id: Date.now().toString(),
      question: newPollQuestion,
      options: newPollOptions
        .filter(o => o.trim())
        .map((text, idx) => ({
          id: `opt${idx}`,
          text,
          votes: 0,
          voters: []
        })),
      createdBy: 'You',
      createdAt: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isActive: true,
      totalVotes: 0
    };

    setPolls([newPoll, ...polls]);
    setNewPollQuestion('');
    setNewPollOptions(['', '']);
    setShowCreatePoll(false);
  };

  useEffect(() => {
    if (scrollRef.current && activeTab === 'chat') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'host':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  // AI Insights based on event status
  const getAIInsights = () => {
    if (eventStatus === 'upcoming') {
      return {
        title: 'Pre-Event Insights',
        items: [
          { icon: Target, label: 'Preparation', value: '85%', description: 'Event readiness score', color: 'text-purple-600' },
          { icon: TrendingUp, label: 'Registration', value: '124', description: 'Registered attendees', color: 'text-green-600' },
          { icon: AlertCircle, label: 'Action Items', value: '3', description: 'Tasks before event', color: 'text-orange-600' }
        ],
        suggestions: [
          'Send reminder emails 24h before the event',
          'Share pre-event materials with attendees',
          'Test all technical equipment and connections'
        ]
      };
    } else if (eventStatus === 'live') {
      return {
        title: 'Live Event Analytics',
        items: [
          { icon: Users, label: 'Attendance', value: '98', description: 'Active participants', color: 'text-purple-600' },
          { icon: MessageSquare, label: 'Engagement', value: '73%', description: 'Interaction rate', color: 'text-green-600' },
          { icon: Clock, label: 'Duration', value: '45m', description: 'Elapsed time', color: 'text-blue-600' }
        ],
        suggestions: [
          'Consider launching a poll to boost engagement',
          'Q&A session recommended in 15 minutes',
          'High engagement - great time for key announcements'
        ]
      };
    } else {
      return {
        title: 'Post-Event Summary',
        items: [
          { icon: CheckCircle, label: 'Completion', value: '100%', description: 'Event completed', color: 'text-green-600' },
          { icon: Users, label: 'Attendance', value: '92%', description: 'Showed up', color: 'text-purple-600' },
          { icon: Heart, label: 'Satisfaction', value: '4.8/5', description: 'Average rating', color: 'text-pink-600' }
        ],
        suggestions: [
          'Send thank you emails to all attendees',
          'Share recording and presentation materials',
          'Collect feedback via follow-up survey',
          'Schedule next event based on high satisfaction'
        ]
      };
    }
  };

  const aiInsights = getAIInsights();

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header with Tab Switcher */}
      <div className="border-b border-border">
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground flex items-center gap-2">
                {channelName}
                {isLive && (
                  <Badge className="bg-red-100 text-red-700 border-red-200">
                    <span className="size-1.5 rounded-full bg-red-600 mr-1 animate-pulse" />
                    Live
                  </Badge>
                )}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {channelType === 'event' ? 'Event' : channelType === 'course' ? 'Course' : 'Community'} Discussion
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center px-4 gap-1">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-colors ${
              activeTab === 'chat'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageSquare className="size-4" />
            <span className="text-sm font-medium">Chat</span>
            <Badge variant="secondary" className="text-xs">
              {messages.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab('polls')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-colors ${
              activeTab === 'polls'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BarChart3 className="size-4" />
            <span className="text-sm font-medium">Polls</span>
            <Badge variant="secondary" className="text-xs">
              {polls.length}
            </Badge>
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`flex items-center gap-2 px-4 py-2.5 border-b-2 transition-colors ${
              activeTab === 'insights'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="size-4" />
            <span className="text-sm font-medium">AI</span>
            {eventStatus === 'live' && (
              <Badge className="text-xs bg-purple-600">
                <Zap className="size-2.5 mr-1" />
                Live
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 px-4 py-3">
              <div ref={scrollRef} className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`group ${msg.isPinned ? 'bg-purple-50 border border-purple-200 rounded-lg p-3' : ''}`}>
                    {msg.isPinned && (
                      <div className="flex items-center gap-1 text-xs text-purple-700 mb-2">
                        <Pin className="size-3" />
                        Pinned Message
                      </div>
                    )}
                    <div className="flex gap-3">
                      <div className="size-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium flex-shrink-0">
                        {msg.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground text-sm">{msg.userName}</span>
                          {msg.userRole && msg.userRole !== 'participant' && (
                            <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(msg.userRole)}`}>
                              {msg.userRole === 'host' ? 'Host' : 'Moderator'}
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-foreground break-words">{msg.message}</p>
                        
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            {msg.reactions.map((reaction, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleReaction(msg.id, reaction.emoji)}
                                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors ${
                                  reaction.users.includes('currentUser')
                                    ? 'bg-purple-100 border border-purple-300'
                                    : 'bg-muted border border-border hover:bg-muted/80'
                                }`}
                              >
                                <span>{reaction.emoji}</span>
                                <span className="text-foreground">{reaction.count}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 flex items-center gap-2">
                          <button
                            onClick={() => handleReaction(msg.id, '👍')}
                            className="p-1 hover:bg-muted rounded text-muted-foreground"
                            title="Like"
                          >
                            <ThumbsUp className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleReaction(msg.id, '❤️')}
                            className="p-1 hover:bg-muted rounded text-muted-foreground"
                            title="Love"
                          >
                            <Heart className="size-3.5" />
                          </button>
                          {canModerate && (
                            <>
                              <button className="p-1 hover:bg-muted rounded text-muted-foreground" title="Pin">
                                <Pin className="size-3.5" />
                              </button>
                              <button className="p-1 hover:bg-muted rounded text-muted-foreground" title="Delete">
                                <Trash2 className="size-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground">
                  <Paperclip className="size-4" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground">
                  <ImageIcon className="size-4" />
                </button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Send a message..."
                  className="flex-1"
                />
                <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground">
                  <Smile className="size-4" />
                </button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Polls Tab */}
        {activeTab === 'polls' && (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {(userRole === 'host' || userRole === 'moderator') && (
                  <div>
                    {!showCreatePoll ? (
                      <Button
                        onClick={() => setShowCreatePoll(true)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        <Plus className="size-4 mr-2" />
                        Create Poll
                      </Button>
                    ) : (
                      <div className="bg-card border-2 border-purple-200 rounded-lg p-4 space-y-3">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-1 block">
                            Poll Question
                          </label>
                          <Input
                            value={newPollQuestion}
                            onChange={(e) => setNewPollQuestion(e.target.value)}
                            placeholder="What would you like to ask?"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground block">
                            Options
                          </label>
                          {newPollOptions.map((option, idx) => (
                            <div key={idx} className="flex gap-2">
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const updated = [...newPollOptions];
                                  updated[idx] = e.target.value;
                                  setNewPollOptions(updated);
                                }}
                                placeholder={`Option ${idx + 1}`}
                              />
                              {idx > 1 && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setNewPollOptions(newPollOptions.filter((_, i) => i !== idx));
                                  }}
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setNewPollOptions([...newPollOptions, ''])}
                            className="w-full"
                          >
                            <Plus className="size-3.5 mr-2" />
                            Add Option
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleCreatePoll}
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                            size="sm"
                          >
                            Create Poll
                          </Button>
                          <Button
                            onClick={() => {
                              setShowCreatePoll(false);
                              setNewPollQuestion('');
                              setNewPollOptions(['', '']);
                            }}
                            variant="outline"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {polls.map((poll) => {
                  const hasVoted = poll.options.some(opt => opt.voters.includes('currentUser'));
                  
                  return (
                    <div key={poll.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{poll.question}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Created by {poll.createdBy} • {poll.createdAt}
                          </p>
                        </div>
                        {poll.isActive && (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            Active
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2 mb-3">
                        {poll.options.map((option) => {
                          const percentage = poll.totalVotes > 0 
                            ? Math.round((option.votes / poll.totalVotes) * 100) 
                            : 0;
                          
                          return (
                            <button
                              key={option.id}
                              onClick={() => !hasVoted && handleVote(poll.id, option.id)}
                              disabled={hasVoted || !poll.isActive}
                              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                                option.voters.includes('currentUser')
                                  ? 'border-purple-500 bg-purple-50'
                                  : hasVoted
                                  ? 'border-border bg-muted cursor-default'
                                  : 'border-border hover:border-purple-300 hover:bg-purple-50'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-foreground">{option.text}</span>
                                <span className="text-sm font-medium text-purple-600">{percentage}%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress value={percentage} className="flex-1 h-2" />
                                <span className="text-xs text-muted-foreground">{option.votes}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{poll.totalVotes} total votes</span>
                        {hasVoted && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="size-3" />
                            You voted
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {polls.length === 0 && !showCreatePoll && (
                  <div className="text-center py-12">
                    <BarChart3 className="size-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">No polls yet</p>
                    {(userRole === 'host' || userRole === 'moderator') && (
                      <p className="text-muted-foreground text-xs mt-1">Create a poll to engage attendees</p>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* AI Tab */}
        {activeTab === 'insights' && (
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {/* AI Header */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-5 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{aiInsights.title}</h3>
                    <p className="text-sm text-purple-100">AI-powered insights & recommendations</p>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {aiInsights.items.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="bg-card border border-border rounded-lg p-3">
                      <Icon className={`size-5 ${item.color} mb-2`} />
                      <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">{item.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.description}</div>
                    </div>
                  );
                })}
              </div>

              {/* AI Suggestions */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="size-4 text-yellow-600" />
                  <h4 className="font-medium text-foreground">AI Suggestions</h4>
                </div>
                <div className="space-y-2">
                  {aiInsights.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted">
                      <div className="size-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-purple-700">{idx + 1}</span>
                      </div>
                      <p className="text-sm text-foreground flex-1">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              {eventStatus === 'live' && (
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="size-4 text-purple-600" />
                    <h4 className="font-medium text-foreground">Quick Actions</h4>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <BarChart3 className="size-4 mr-2" />
                      Create engagement poll
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="size-4 mr-2" />
                      Generate summary notes
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Brain className="size-4 mr-2" />
                      Export action items
                    </Button>
                  </div>
                </div>
              )}

              {/* Post-Event Reports */}
              {eventStatus === 'ended' && (
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="size-4 text-purple-600" />
                    <h4 className="font-medium text-foreground">Reports Available</h4>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">Event Summary Report</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Full analytics & insights</p>
                        </div>
                        <Badge variant="secondary">PDF</Badge>
                      </div>
                    </button>
                    <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">Action Items List</p>
                          <p className="text-xs text-muted-foreground mt-0.5">AI-extracted to-dos</p>
                        </div>
                        <Badge variant="secondary">CSV</Badge>
                      </div>
                    </button>
                    <button className="w-full p-3 text-left rounded-lg border border-border hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">Attendee Feedback</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Ratings & comments</p>
                        </div>
                        <Badge variant="secondary">XLS</Badge>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
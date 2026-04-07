import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  Circle,
  Grid3x3,
  Users as UsersIcon,
  MessageSquare,
  BarChart3,
  Settings,
  PhoneOff,
  MoreVertical,
  Sparkles,
  User,
  Hand,
  Send,
  Minimize2,
  Maximize,
  Rows3,
  LayoutGrid,
  Copy,
  Check,
  ChevronDown,
  StopCircle,
  Smile,
  Paperclip,
  Image as ImageIcon,
  Pin,
  ThumbsUp,
  Heart,
  Trash2,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  Zap,
  Lightbulb,
  Brain,
  Rocket,
  X as XIcon,
  Trophy,
  Shield,
  UserPlus,
  UserMinus,
  Volume2,
  VolumeX,
  Crown,
  Lock
} from 'lucide-react';
import LeapyLogo from '../imports/Button';

interface Participant {
  id: string;
  name: string;
  role: 'host' | 'co-host' | 'presenter' | 'participant';
  audioEnabled: boolean;
  videoEnabled: boolean;
  isPresenting: boolean;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userRole?: 'host' | 'co-host' | 'presenter' | 'participant';
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
  isActive: boolean;
  totalVotes: number;
  type?: 'single' | 'multiple';
  allowMultipleVotes?: boolean;
  showResultsBeforeVoting?: boolean;
  endsAt?: string;
}

interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AISuggestion {
  id: string;
  icon: any;
  title: string;
  description: string;
  action?: () => void;
}

interface EventMeetingRoomProps {
  eventTitle: string;
  eventCode: string;
  onLeaveEvent: () => void;
  onMinimize?: () => void;
  micEnabled?: boolean;
  videoEnabled?: boolean;
  onMicToggle?: (enabled: boolean) => void;
  onVideoToggle?: (enabled: boolean) => void;
  userRole?: 'host' | 'co-host' | 'presenter' | 'participant';
  onEndEvent?: () => void;
}

type ViewMode = 'grid' | 'speaker' | 'sidebar' | 'focus';

export function EventMeetingRoom({
  eventTitle,
  eventCode,
  onLeaveEvent,
  onMinimize,
  micEnabled: externalMicEnabled,
  videoEnabled: externalVideoEnabled,
  onMicToggle,
  onVideoToggle,
  userRole = 'participant',
  onEndEvent
}: EventMeetingRoomProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'polls' | 'people' | 'ai'>('chat');
  
  // DEBUG: Log when component mounts and when tab changes
  useEffect(() => {
    console.log('🔥 EventMeetingRoom MOUNTED - All 4 tabs available: chat, polls, people, ai');
  }, []);

  useEffect(() => {
    console.log('🎯 EventMeetingRoom Active Tab Changed:', activeTab);
  }, [activeTab]);
  
  const [micEnabled, setMicEnabled] = useState(externalMicEnabled !== undefined ? externalMicEnabled : true);
  const [videoEnabled, setVideoEnabled] = useState(externalVideoEnabled !== undefined ? externalVideoEnabled : true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '']);
  const [showHostControls, setShowHostControls] = useState(false);
  const [spotlightUserId, setSpotlightUserId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync internal state with external state
  const handleMicToggle = () => {
    const newValue = !micEnabled;
    setMicEnabled(newValue);
    onMicToggle?.(newValue);
  };

  const handleVideoToggle = () => {
    const newValue = !videoEnabled;
    setVideoEnabled(newValue);
    onVideoToggle?.(newValue);
  };

  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'John Doe', role: userRole, audioEnabled: true, videoEnabled: true, isPresenting: false },
    { id: '2', name: 'Jane Smith', role: 'co-host', audioEnabled: true, videoEnabled: true, isPresenting: false },
    { id: '3', name: 'Bob Johnson', role: 'presenter', audioEnabled: true, videoEnabled: false, isPresenting: screenSharing },
    { id: '4', name: 'Alice Brown', role: 'participant', audioEnabled: false, videoEnabled: true, isPresenting: false },
    { id: '5', name: 'Charlie Davis', role: 'participant', audioEnabled: true, videoEnabled: true, isPresenting: false },
    { id: '6', name: 'Eve Wilson', role: 'participant', audioEnabled: true, videoEnabled: false, isPresenting: false },
  ]);

  // Host Actions
  const handleMuteAll = () => {
    if (confirm('Mute all participants? They will be able to unmute themselves.')) {
      setParticipants(participants.map(p => 
        p.role === 'host' ? p : { ...p, audioEnabled: false }
      ));
      // In a real app, this would emit a socket event
    }
  };

  const handleKickUser = (userId: string, userName: string) => {
    if (confirm(`Are you sure you want to remove ${userName} from the event?`)) {
      setParticipants(participants.filter(p => p.id !== userId));
      // In a real app, this would add to a blocklist and emit a socket event
    }
  };

  const handleSpotlightUser = (userId: string) => {
    if (spotlightUserId === userId) {
      setSpotlightUserId(null);
      setViewMode('grid');
    } else {
      setSpotlightUserId(userId);
      setViewMode('speaker');
    }
  };

  const handleToggleRole = (userId: string, currentRole: string) => {
    const newRole = currentRole === 'participant' ? 'presenter' : 'participant';
    setParticipants(participants.map(p => 
      p.id === userId ? { ...p, role: newRole as any } : p
    ));
  };

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
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
      userRole: 'co-host',
      message: 'Quick reminder: Please mute your mic when not speaking.',
      timestamp: '2:35 PM'
    }
  ]);

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

  const [aiMessages, setAIMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to the event! How can I assist you today?',
      timestamp: new Date()
    }
  ]);

  const [aiSuggestions, setAISuggestions] = useState<AISuggestion[]>([
    {
      id: '1',
      icon: Plus,
      title: 'Create Poll',
      description: 'Boost engagement with a quick poll',
      action: () => setShowCreatePoll(true)
    },
    {
      id: '2',
      icon: Target,
      title: 'Key Topics',
      description: 'Review the main topics discussed'
    },
    {
      id: '3',
      icon: TrendingUp,
      title: 'Engagement Trend',
      description: 'View the engagement over time'
    }
  ]);

  const [aiInput, setAIInput] = useState('');
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const aiScrollRef = useRef<HTMLDivElement>(null);

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'host': return 'Host';
      case 'co-host': return 'Co-Host';
      case 'presenter': return 'Presenter';
      default: return '';
    }
  };

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'host':
        return 'bg-muted text-foreground border-border';
      case 'co-host':
        return 'bg-accent text-foreground border-border';
      case 'presenter':
        return 'bg-muted text-foreground border-border';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'You',
      userRole: 'participant',
      message: chatInput,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatInput('');
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setChatMessages(chatMessages.map(msg => {
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

  const handleVote = (pollId: string, optionId: string) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        const hasVoted = poll.options.some(opt => opt.voters.includes('currentUser'));
        if (hasVoted) return poll;

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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(eventCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  useEffect(() => {
    if (scrollRef.current && activeTab === 'chat') {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, activeTab]);

  const renderParticipantTile = (participant: Participant, size: 'small' | 'medium' | 'large' = 'medium') => {
    const sizeClasses = {
      small: 'h-24',
      medium: 'h-full',
      large: 'h-full'
    };
    
    const avatarSizes = {
      small: 'size-8',
      medium: 'size-16',
      large: 'size-24'
    };

    const isHostOrCohost = userRole === 'host' || userRole === 'co-host';
    const canManageParticipant = isHostOrCohost && participant.id !== '1'; // Cannot manage self/primary host easily in this mock

    return (
      <div
        key={participant.id}
        className={`bg-gray-800 rounded-lg overflow-hidden relative group ${sizeClasses[size]}`}
      >
        {participant.videoEnabled ? (
          <div className="size-full flex items-center justify-center bg-gray-700">
            <div className={`${avatarSizes[size]} rounded-full bg-gray-600 flex items-center justify-center text-white font-medium`}>
              {participant.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        ) : (
          <div className="size-full flex items-center justify-center bg-gray-800">
            <div className="text-center">
              <div className={`${avatarSizes[size]} rounded-full bg-gray-700 flex items-center justify-center text-white font-medium mx-auto`}>
                {participant.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        )}
        
        {/* Participant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-white text-xs font-medium truncate">{participant.name}</span>
              {participant.role !== 'participant' && size !== 'small' && (
                <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(participant.role)} px-1.5 py-0`}>
                  {getRoleLabel(participant.role)}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {!participant.audioEnabled && (
                <div className="p-0.5 bg-red-600 rounded">
                  <MicOff className="size-2.5 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {participant.isPresenting && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-green-600 text-white border-0 text-xs">
              <Monitor className="size-3 mr-1" />
              Presenting
            </Badge>
          </div>
        )}

        {/* Hover Actions / Menu */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 bg-black/60 hover:bg-black/80 rounded-lg text-white outline-none focus:ring-2 focus:ring-white/20">
                <MoreVertical className="size-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Participant Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {isHostOrCohost && (
                <>
                  <DropdownMenuItem onClick={() => handleSpotlightUser(participant.id)}>
                    {spotlightUserId === participant.id ? (
                      <>
                        <Minimize2 className="mr-2 size-4" />
                        <span>Remove Spotlight</span>
                      </>
                    ) : (
                      <>
                        <Maximize className="mr-2 size-4" />
                        <span>Spotlight for Everyone</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={() => handleToggleRole(participant.id, participant.role)}>
                    {participant.role === 'presenter' ? (
                      <>
                        <UserMinus className="mr-2 size-4" />
                        <span>Demote to Participant</span>
                      </>
                    ) : (
                      <>
                        <Crown className="mr-2 size-4 text-orange-500" />
                        <span>Make Presenter</span>
                      </>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuItem 
                    onClick={() => {
                      // Toggle mute logic
                      const newStatus = !participant.audioEnabled;
                      setParticipants(participants.map(p => 
                        p.id === participant.id ? { ...p, audioEnabled: newStatus } : p
                      ));
                    }}
                  >
                    {participant.audioEnabled ? (
                      <>
                        <VolumeX className="mr-2 size-4 text-red-500" />
                        <span>Mute Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="mr-2 size-4" />
                        <span>Ask to Unmute</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    onClick={() => handleKickUser(participant.id, participant.name)}
                  >
                    <Trash2 className="mr-2 size-4" />
                    <span>Kick from Event</span>
                  </DropdownMenuItem>
                </>
              )}
              
              {!isHostOrCohost && (
                <DropdownMenuItem>
                  <Pin className="mr-2 size-4" />
                  <span>Pin Video</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  const renderVideoLayout = () => {
    const presenter = participants.find(p => p.isPresenting);

    if (screenSharing && presenter) {
      return (
        <div className="h-full flex flex-col gap-3">
          <div className="flex-1 bg-gray-900 rounded-lg overflow-hidden relative border-2 border-green-500">
            <div className="size-full flex items-center justify-center">
              <div className="text-center">
                <Monitor className="size-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">{presenter.name}'s screen</p>
              </div>
            </div>
            <div className="absolute top-3 left-3">
              <Badge className="bg-green-600 text-white border-0">
                <Monitor className="size-3 mr-1" />
                Screen Sharing
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2 h-28">
            {participants.slice(0, 6).map((participant) => renderParticipantTile(participant, 'small'))}
          </div>
        </div>
      );
    }

    switch (viewMode) {
      case 'grid':
        return (
          <div className="grid grid-cols-3 gap-3 h-full">
            {participants.map((participant) => renderParticipantTile(participant, 'medium'))}
          </div>
        );

      case 'speaker':
        return (
          <div className="h-full flex flex-col gap-3">
            <div className="flex-1">
              {renderParticipantTile(participants[0], 'large')}
            </div>
            <div className="flex gap-2 h-28">
              {participants.slice(1, 6).map((participant) => renderParticipantTile(participant, 'small'))}
            </div>
          </div>
        );

      case 'sidebar':
        return (
          <div className="h-full flex gap-3">
            <div className="flex-1">
              {renderParticipantTile(participants[0], 'large')}
            </div>
            <div className="w-48 flex flex-col gap-2">
              {participants.slice(1, 5).map((participant) => renderParticipantTile(participant, 'small'))}
            </div>
          </div>
        );

      case 'focus':
        return (
          <div className="h-full">
            {renderParticipantTile(participants[0], 'large')}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-gray-900 font-medium">{eventTitle}</h1>
              <div className="flex items-center gap-3 mt-0.5">
                <p className="text-xs text-gray-600">{participants.length} participants</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Code:</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-700 transition-colors border border-gray-200"
                  >
                    <code className="font-mono">{eventCode}</code>
                    {copiedCode ? (
                      <Check className="size-3 text-green-600" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {isRecording && (
              <Badge className="bg-red-600 text-white border-0 animate-pulse">
                <Circle className="size-2 mr-1.5 fill-white" />
                Recording
              </Badge>
            )}
            
            {/* End Event Button for Hosts */}
            {(userRole === 'host' || userRole === 'co-host') && (
              <Button 
                size="sm" 
                variant="destructive" 
                className="ml-4 h-8 text-xs font-semibold shadow-sm hover:bg-red-700"
                onClick={() => {
                  if (confirm('Are you sure you want to end the event for everyone?')) {
                    onEndEvent?.();
                  }
                }}
              >
                <StopCircle className="size-3.5 mr-1.5" />
                End Event
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onMinimize && (
              <button 
                onClick={onMinimize}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                title="Minimize to Floating Window"
              >
                <Minimize2 className="size-4" />
              </button>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
              <Settings className="size-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
              <MoreVertical className="size-4" />
            </button>
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 ml-2"
              onClick={onLeaveEvent}
            >
              Leave
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video Layout */}
        <div className="flex-1 p-4">
          <div className="h-full">
            {renderVideoLayout()}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white flex flex-col border-l border-gray-200 shadow-lg">
          {/* Header with Tab Switcher */}
          <div className="border-b border-gray-200">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Event Discussion</h3>
              <p className="text-xs text-gray-600 mt-0.5">Live Meeting</p>
            </div>

            {/* Tab Switcher */}
            <div className="flex items-center px-2 gap-0.5 overflow-x-auto">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'chat'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="size-4" />
                <span className="text-xs font-medium">Chat</span>
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  {chatMessages.length}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab('polls')}
                className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'polls'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart3 className="size-4" />
                <span className="text-xs font-medium">Polls</span>
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  {polls.length}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab('people')}
                className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'people'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <UsersIcon className="size-4" />
                <span className="text-xs font-medium">People</span>
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                  {participants.length}
                </Badge>
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`flex items-center gap-1.5 px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'ai'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Sparkles className="size-4" />
                <span className="text-xs font-medium">AI</span>
                <Badge className="text-xs bg-gray-900 text-white">
                  <Zap className="size-2.5 mr-1" />
                  Live
                </Badge>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="flex flex-col h-full bg-gray-50">
                <ScrollArea className="flex-1 px-4 py-3">
                  <div ref={scrollRef} className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`group ${msg.isPinned ? 'bg-muted border border-border rounded-lg p-3' : ''}`}>
                        {msg.isPinned && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                            <Pin className="size-3" />
                            Pinned Message
                          </div>
                        )}
                        <div className="flex gap-3">
                          <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-sm font-medium flex-shrink-0">
                            {msg.userName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900 text-sm">{msg.userName}</span>
                              {msg.userRole && msg.userRole !== 'participant' && (
                                <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(msg.userRole)}`}>
                                  {getRoleLabel(msg.userRole)}
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500">{msg.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700 break-words">{msg.message}</p>
                            
                            {msg.reactions && msg.reactions.length > 0 && (
                              <div className="flex items-center gap-1 mt-2">
                                {msg.reactions.map((reaction, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleReaction(msg.id, reaction.emoji)}
                                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors ${
                                      reaction.users.includes('currentUser')
                                        ? 'bg-accent border border-border'
                                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                                    }`}
                                  >
                                    <span>{reaction.emoji}</span>
                                    <span className="text-gray-700">{reaction.count}</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 flex items-center gap-2">
                              <button
                                onClick={() => handleReaction(msg.id, '👍')}
                                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                                title="Like"
                              >
                                <ThumbsUp className="size-3.5" />
                              </button>
                              <button
                                onClick={() => handleReaction(msg.id, '❤️')}
                                className="p-1 hover:bg-gray-100 rounded text-gray-600"
                                title="Love"
                              >
                                <Heart className="size-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t border-gray-200 p-4 bg-white">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Paperclip className="size-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <ImageIcon className="size-4" />
                    </button>
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Send a message..."
                      className="flex-1 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                    />
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Smile className="size-4" />
                    </button>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                      size="sm"
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Polls Tab */}
            {activeTab === 'polls' && (
              <div className="flex flex-col h-full bg-white">
                <ScrollArea className="flex-1">
                  <div className="p-4 space-y-4">
                    {/* AI Suggestions Panel */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="size-8 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="size-4 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 text-sm">AI Poll Suggestions</h3>
                            <Badge className="bg-gray-200 text-gray-700 border-0 text-xs">
                              <Zap className="size-2.5 mr-1" />
                              Live
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">
                            Suggested polls to boost engagement
                          </p>
                          
                          {/* AI Suggested Polls */}
                          <div className="space-y-2">
                            <button className="w-full text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group">
                              <div className="flex items-start gap-2">
                                <Lightbulb className="size-4 text-gray-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">Quick Pulse Check</p>
                                  <p className="text-xs text-gray-600 mt-0.5">How's everyone feeling about the discussion so far?</p>
                                  <div className="flex items-center gap-1.5 mt-2 text-xs flex-wrap">
                                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-700">Great</span>
                                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-700">Good</span>
                                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-700">Confused</span>
                                  </div>
                                </div>
                                <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 hover:bg-gray-800 text-white h-7 text-xs flex-shrink-0">
                                  Use
                                </Button>
                              </div>
                            </button>
                            
                            <button className="w-full text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group">
                              <div className="flex items-start gap-2">
                                <Target className="size-4 text-gray-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">Next Topic Priority</p>
                                  <p className="text-xs text-gray-600 mt-0.5">What should we discuss next?</p>
                                  <div className="flex items-center gap-1.5 mt-2 text-xs">
                                    <span className="text-gray-600">Based on chat activity</span>
                                  </div>
                                </div>
                                <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 hover:bg-gray-800 text-white h-7 text-xs flex-shrink-0">
                                  Use
                                </Button>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Create Poll Button */}
                    {!showCreatePoll ? (
                      <Button
                        onClick={() => setShowCreatePoll(true)}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                        size="sm"
                      >
                        <Plus className="size-4 mr-2" />
                        Create Custom Poll
                      </Button>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 text-sm">Create New Poll</h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setShowCreatePoll(false);
                              setNewPollQuestion('');
                              setNewPollOptions(['', '']);
                            }}
                            className="h-7 w-7 p-0"
                          >
                            <XIcon className="size-4" />
                          </Button>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                            Poll Question
                          </label>
                          <Textarea
                            value={newPollQuestion}
                            onChange={(e) => setNewPollQuestion(e.target.value)}
                            placeholder="What would you like to ask your attendees?"
                            className="min-h-[60px] resize-none text-sm bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-gray-700 block">
                            Answer Options
                          </label>
                          {newPollOptions.map((option, idx) => (
                            <div key={idx} className="flex gap-2">
                              <div className="flex items-center justify-center size-6 rounded bg-gray-200 text-gray-700 text-xs font-medium flex-shrink-0">
                                {String.fromCharCode(65 + idx)}
                              </div>
                              <Input
                                value={option}
                                onChange={(e) => {
                                  const updated = [...newPollOptions];
                                  updated[idx] = e.target.value;
                                  setNewPollOptions(updated);
                                }}
                                placeholder={`Option ${idx + 1}`}
                                className="text-sm bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                              />
                              {idx > 1 && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setNewPollOptions(newPollOptions.filter((_, i) => i !== idx));
                                  }}
                                  className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          {newPollOptions.length < 6 && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setNewPollOptions([...newPollOptions, ''])}
                              className="w-full text-xs h-8"
                            >
                              <Plus className="size-3.5 mr-1.5" />
                              Add Option
                            </Button>
                          )}
                        </div>
                        
                        <Button
                          onClick={handleCreatePoll}
                          className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                          size="sm"
                        >
                          <Plus className="size-4 mr-2" />
                          Create Poll
                        </Button>
                      </div>
                    )}

                    {/* Active Polls */}
                    {polls.filter(p => p.isActive).length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 mb-2 px-1 uppercase tracking-wide">
                          Active Polls
                        </h4>
                        <div className="space-y-3">
                          {polls.filter(p => p.isActive).map((poll) => {
                            const hasVoted = poll.options.some(opt => opt.voters.includes('currentUser'));
                            const winningOption = poll.options.reduce((max, opt) => opt.votes > max.votes ? opt : max, poll.options[0]);
                            
                            return (
                              <div key={poll.id} className="relative bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-all overflow-hidden shadow-sm">
                                <div className="relative">
                                  <div className="flex items-start gap-3 mb-4">
                                    <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                      <BarChart3 className="size-5 text-gray-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-gray-900 mb-1">{poll.question}</h4>
                                      <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <User className="size-3" />
                                        <span>{poll.createdBy}</span>
                                        <span>•</span>
                                        <Clock className="size-3" />
                                        <span>{poll.createdAt}</span>
                                      </div>
                                    </div>
                                    <Badge className="bg-green-600 text-white border-0 flex-shrink-0">
                                      <Zap className="size-2.5 mr-1" />
                                      Live
                                    </Badge>
                                  </div>

                                  <div className="space-y-2.5 mb-4">
                                    {poll.options.map((option, idx) => {
                                      const percentage = poll.totalVotes > 0 
                                        ? Math.round((option.votes / poll.totalVotes) * 100) 
                                        : 0;
                                      const isWinning = option.id === winningOption.id && poll.totalVotes > 0 && percentage > 0;
                                      const isUserChoice = option.voters.includes('currentUser');
                                      
                                      return (
                                        <button
                                          key={option.id}
                                          onClick={() => !hasVoted && handleVote(poll.id, option.id)}
                                          disabled={hasVoted || !poll.isActive}
                                          className={`group relative w-full p-4 rounded-lg transition-all duration-300 overflow-hidden ${
                                            isUserChoice
                                              ? 'bg-gray-900 text-white border border-gray-900'
                                              : hasVoted
                                              ? 'bg-gray-50 border border-gray-200 cursor-default'
                                              : 'bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                          }`}
                                        >
                                          {hasVoted && !isUserChoice && (
                                            <div 
                                              className="absolute inset-0 bg-gray-100 transition-all duration-700 ease-out"
                                              style={{ width: `${percentage}%` }}
                                            />
                                          )}
                                          
                                          <div className="relative flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                              <div className={`size-7 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                                                isUserChoice 
                                                  ? 'bg-gray-700 text-white' 
                                                  : 'bg-gray-100 text-gray-600'
                                              }`}>
                                                {String.fromCharCode(65 + idx)}
                                              </div>
                                              
                                              <div className="flex-1 min-w-0 text-left">
                                                <p className={`text-sm font-medium mb-0.5 ${isUserChoice ? 'text-white' : 'text-gray-900'}`}>
                                                  {option.text}
                                                </p>
                                                {hasVoted && (
                                                  <div className="flex items-center gap-2">
                                                    <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isUserChoice ? 'bg-gray-700' : 'bg-gray-200'}`}>
                                                      <div 
                                                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                                                          isUserChoice ? 'bg-white' : 'bg-gray-600'
                                                        }`}
                                                        style={{ width: `${percentage}%` }}
                                                      />
                                                    </div>
                                                    <span className={`text-xs font-bold min-w-[3rem] text-right ${isUserChoice ? 'text-white' : 'text-gray-600'}`}>
                                                      {percentage}%
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                              
                                              {isUserChoice && (
                                                <div className="size-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                                  <Check className="size-4 text-gray-900" />
                                                </div>
                                              )}
                                              
                                              {isWinning && hasVoted && !isUserChoice && (
                                                <Trophy className="size-4 text-yellow-600 flex-shrink-0" />
                                              )}
                                            </div>
                                            
                                            {hasVoted && (
                                              <span className={`text-xs font-medium ml-3 flex-shrink-0 ${isUserChoice ? 'text-white/90' : 'text-gray-600'}`}>
                                                {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
                                              </span>
                                            )}
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                    <div className="flex items-center gap-3 text-xs">
                                      <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                                        <UsersIcon className="size-4" />
                                        {poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'}
                                      </span>
                                      {hasVoted && (
                                        <span className="flex items-center gap-1 text-green-600 font-medium">
                                          <CheckCircle className="size-4" />
                                          You voted
                                        </span>
                                      )}
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="h-8 px-3 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                                    >
                                      <MoreVertical className="size-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Closed Polls */}
                    {polls.filter(p => !p.isActive).length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 mb-2 px-1 uppercase tracking-wide">
                          Closed Polls
                        </h4>
                        <div className="space-y-2">
                          {polls.filter(p => !p.isActive).map((poll) => (
                            <div key={poll.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 opacity-75">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-700 truncate">{poll.question}</p>
                                  <p className="text-xs text-gray-500 mt-0.5">{poll.totalVotes} votes</p>
                                </div>
                                <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-600">
                                  Closed
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {polls.length === 0 && !showCreatePoll && (
                      <div className="text-center py-16">
                        <div className="size-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                          <BarChart3 className="size-8 text-gray-500" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">No polls yet</h3>
                        <p className="text-sm text-gray-600 mb-4 max-w-[200px] mx-auto">
                          Create a poll or use an AI suggestion to engage attendees
                        </p>
                        <Button 
                          onClick={() => setShowCreatePoll(true)}
                          variant="outline" 
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <Plus className="size-4 mr-2" />
                          Create First Poll
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* People Tab */}
            {activeTab === 'people' && (
              <div className="flex flex-col h-full bg-gray-50">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-1">
                    {participants.map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors group border border-transparent hover:border-gray-200"
                      >
                        <div className="size-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-sm font-medium flex-shrink-0">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{participant.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {participant.role !== 'participant' && (
                              <Badge variant="secondary" className={`text-xs ${getRoleBadgeColor(participant.role)}`}>
                                {getRoleLabel(participant.role)}
                              </Badge>
                            )}
                            {participant.isPresenting && (
                              <Badge className="bg-green-600 text-white text-xs border-0">
                                <Monitor className="size-2.5 mr-1" />
                                Presenting
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {participant.audioEnabled ? (
                            <div className="p-1.5 rounded-full bg-gray-200 text-gray-700">
                              <Mic className="size-3.5" />
                            </div>
                          ) : (
                            <div className="p-1.5 rounded-full bg-red-100 text-red-600">
                              <MicOff className="size-3.5" />
                            </div>
                          )}
                          {participant.videoEnabled ? (
                            <div className="p-1.5 rounded-full bg-gray-200 text-gray-700">
                              <Video className="size-3.5" />
                            </div>
                          ) : (
                            <div className="p-1.5 rounded-full bg-gray-200 text-gray-400">
                              <VideoOff className="size-3.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* AI Tab */}
            {activeTab === 'ai' && (
              <ScrollArea className="flex-1 p-4 bg-gray-50">
                <div className="space-y-4">
                  {/* AI Header */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="size-9">
                        <LeapyLogo />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Leapy AI</h3>
                        <p className="text-sm text-gray-600">Live Event Analytics</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <UsersIcon className="size-5 text-foreground mb-2" />
                      <div className="text-2xl font-bold text-gray-900 mb-1">98</div>
                      <div className="text-xs font-medium text-gray-700">Attendance</div>
                      <div className="text-xs text-gray-500 mt-0.5">Active participants</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <MessageSquare className="size-5 text-green-600 mb-2" />
                      <div className="text-2xl font-bold text-gray-900 mb-1">73%</div>
                      <div className="text-xs font-medium text-gray-700">Engagement</div>
                      <div className="text-xs text-gray-500 mt-0.5">Interaction rate</div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <Clock className="size-5 text-orange-600 mb-2" />
                      <div className="text-2xl font-bold text-gray-900 mb-1">45m</div>
                      <div className="text-xs font-medium text-gray-700">Duration</div>
                      <div className="text-xs text-gray-500 mt-0.5">Elapsed time</div>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="size-4 text-gray-700" />
                      <h4 className="font-medium text-gray-900">AI Suggestions</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-700">
                        • Consider launching a poll to boost engagement
                      </li>
                      <li className="text-sm text-gray-700">
                        • Q&A session recommended in 15 minutes
                      </li>
                      <li className="text-sm text-gray-700">
                        • High engagement - great time for key announcements
                      </li>
                    </ul>
                  </div>

                  {/* Meeting Summary */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="size-4 text-foreground" />
                      <h4 className="font-medium text-gray-900">Key Topics</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-700">
                        • Feature prioritization discussion
                      </li>
                      <li className="text-sm text-gray-700">
                        • Mobile app development roadmap
                      </li>
                      <li className="text-sm text-gray-700">
                        • Q2 timeline planning
                      </li>
                    </ul>
                  </div>

                  {/* Engagement Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="size-4 text-green-600" />
                      <h4 className="font-medium text-gray-900">Engagement Trend</h4>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: '73%' }} />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Participants are highly engaged</p>
                  </div>
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMicToggle}
              className={`p-4 rounded-full ${
                micEnabled ? 'bg-gray-900 hover:bg-gray-800' : 'bg-red-600 hover:bg-red-700'
              } text-white transition-colors shadow-sm`}
              title={micEnabled ? 'Mute' : 'Unmute'}
            >
              {micEnabled ? <Mic className="size-5" /> : <MicOff className="size-5" />}
            </button>
            
            <button
              onClick={handleVideoToggle}
              className={`p-4 rounded-full ${
                videoEnabled ? 'bg-gray-900 hover:bg-gray-800' : 'bg-red-600 hover:bg-red-700'
              } text-white transition-colors shadow-sm`}
              title={videoEnabled ? 'Stop Video' : 'Start Video'}
            >
              {videoEnabled ? <Video className="size-5" /> : <VideoOff className="size-5" />}
            </button>

            <button
              onClick={() => setScreenSharing(!screenSharing)}
              className={`p-4 rounded-full ${
                screenSharing ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-900 hover:bg-gray-800'
              } text-white transition-colors shadow-sm`}
              title={screenSharing ? 'Stop Sharing' : 'Share Screen'}
            >
              {screenSharing ? <Monitor className="size-5" /> : <MonitorOff className="size-5" />}
            </button>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`p-4 rounded-full ${
                isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-900 hover:bg-gray-800'
              } text-white transition-colors shadow-sm`}
              title={isRecording ? 'Stop Recording' : 'Start Recording'}
            >
              {isRecording ? <StopCircle className="size-5 fill-white" /> : <Circle className="size-5" />}
            </button>

            {/* View Mode Selector */}
            <div className="relative">
              <button
                onClick={() => setShowViewMenu(!showViewMenu)}
                className="p-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors flex items-center gap-2 shadow-sm"
                title="Change View"
              >
                {viewMode === 'grid' && <LayoutGrid className="size-5" />}
                {viewMode === 'speaker' && <User className="size-5" />}
                {viewMode === 'sidebar' && <Rows3 className="size-5" />}
                {viewMode === 'focus' && <Maximize className="size-5" />}
                <ChevronDown className="size-3" />
              </button>

              {showViewMenu && (
                <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-lg shadow-xl p-2 min-w-[200px]">
                  {[
                    { id: 'grid' as const, icon: LayoutGrid, label: 'Grid View', desc: 'All equal size' },
                    { id: 'speaker' as const, icon: User, label: 'Speaker View', desc: 'Focus on speaker' },
                    { id: 'sidebar' as const, icon: Rows3, label: 'Sidebar View', desc: 'Vertical layout' },
                    { id: 'focus' as const, icon: Maximize, label: 'Focus Mode', desc: 'Speaker only' }
                  ].map((view) => {
                    const Icon = view.icon;
                    return (
                      <button
                        key={view.id}
                        onClick={() => {
                          setViewMode(view.id);
                          setShowViewMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          viewMode === view.id ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="size-4" />
                        <div className="text-left flex-1">
                          <p className="text-sm font-medium">{view.label}</p>
                          <p className="text-xs opacity-75">{view.desc}</p>
                        </div>
                        {viewMode === view.id && <Check className="size-4" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button className="p-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors shadow-sm">
              <Hand className="size-5" />
            </button>

            {(userRole === 'host' || userRole === 'co-host') && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="p-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors shadow-sm"
                    title="Host Controls"
                  >
                    <Shield className="size-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-56 mb-2">
                  <DropdownMenuLabel>Host Controls</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleMuteAll} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                    <MicOff className="mr-2 size-4" />
                    <span>Mute All Participants</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                     <MessageSquare className="mr-2 size-4" />
                     <span>Disable Chat</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                     <Lock className="mr-2 size-4" />
                     <span>Lock Meeting</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 size-4" />
                    <span>Advanced Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <button className="p-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors shadow-sm">
              <MoreVertical className="size-5" />
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {onMinimize && (
              <button
                onClick={onMinimize}
                className="p-4 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition-colors shadow-sm"
                title="Minimize"
              >
                <Minimize2 className="size-5" />
              </button>
            )}

            <button
              onClick={onLeaveEvent}
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors font-medium shadow-sm"
              title="Leave Event"
            >
              <PhoneOff className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
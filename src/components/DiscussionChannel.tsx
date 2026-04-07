import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
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
  User
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

interface DiscussionChannelProps {
  channelName?: string;
  channelType?: 'event' | 'course' | 'community';
  isLive?: boolean;
  canModerate?: boolean;
}

export function DiscussionChannel({
  channelName = 'General Discussion',
  channelType = 'event',
  isLive = false,
  canModerate = false
}: DiscussionChannelProps) {
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: 'You',
      userRole: 'participant',
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
          // Toggle reaction
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

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

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
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
              {messages.length} messages • {channelType === 'event' ? 'Event' : channelType === 'course' ? 'Course' : 'Community'} Discussion
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
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
                  
                  {/* Reactions */}
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

                  {/* Quick Actions (shown on hover) */}
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

      {/* Input Area */}
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
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
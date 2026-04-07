import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ThumbsUp, ThumbsDown, X, Lightbulb, TrendingUp, AlertTriangle, Zap, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Conversation, Message, CourseData } from '../types';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface AIChatPanelV2Props {
  conversation: Conversation;
  onUpdateMessages: (messages: Message[]) => void;
  courseData: Partial<CourseData>;
  onClose: () => void;
}

interface Suggestion {
  id: string;
  type: 'improvement' | 'warning' | 'optimization';
  title: string;
  description: string;
  impact: string;
  confidence: number;
}

const suggestions: Suggestion[] = [
  {
    id: '1',
    type: 'improvement',
    title: 'Add Practice Exercises',
    description: 'Module 2 lacks hands-on practice. Adding exercises increases retention by 42%.',
    impact: '+18% completion',
    confidence: 94,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Lesson Too Long',
    description: 'Lesson 3.2 (38 min) is 3.4x longer than average. Consider splitting.',
    impact: '-23% drop-off',
    confidence: 91,
  },
  {
    id: '3',
    type: 'optimization',
    title: 'SEO Keywords Missing',
    description: 'Add "advanced techniques" and "practical guide" to boost visibility.',
    impact: '+28% discovery',
    confidence: 87,
  },
];

export function AIChatPanelV2({ conversation, onUpdateMessages, courseData, onClose }: AIChatPanelV2Props) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
        content: "I've analyzed your request. Here's my suggestion:\n\n**Approach:**\n1. Restructure content flow\n2. Add 3-4 practice exercises\n3. Include real-world case study\n\nThis should improve completion rate by 15-20%. Proceed?",
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
      default:
        return <Lightbulb className="size-4 text-muted-foreground" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'improvement':
        return 'from-blue-50 to-blue-100 border-blue-200';
      case 'warning':
        return 'from-orange-50 to-orange-100 border-orange-200';
      case 'optimization':
        return 'from-purple-50 to-purple-100 border-purple-200';
      default:
        return 'from-muted to-muted border-border';
    }
  };

  const formatMessage = (content: string) => {
    const parts = content.split('\n');
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <p key={idx} className="text-foreground mb-2">{part.replace(/\*\*/g, '')}</p>;
      } else if (part.match(/^\d+\./)) {
        return <li key={idx} className="ml-4 text-foreground text-sm">{part}</li>;
      } else if (part.trim()) {
        return <p key={idx} className="text-muted-foreground text-sm mb-1">{part}</p>;
      }
      return null;
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-border bg-primary/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl">
              <Sparkles className="size-5 text-white" />
            </div>
            <div>
              <h3 className="text-foreground">AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Real-time course optimization</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-lg hover:bg-white/50"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 p-3 bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl">
          <div className="size-2 rounded-full bg-green-500 animate-pulse" />
          <div className="flex-1 text-xs">
            <span className="text-muted-foreground">Analyzing:</span>
            <span className="text-foreground ml-1">Module 2, Lesson 3</span>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="p-5 border-b border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm text-foreground">Smart Suggestions</h4>
          <Badge variant="secondary" className="text-xs">{suggestions.length} active</Badge>
        </div>
        
        <div className="space-y-3">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className={`bg-gradient-to-br ${getSuggestionColor(suggestion.type)} border rounded-xl p-4 hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-card rounded-lg">
                  {getSuggestionIcon(suggestion.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground mb-1">{suggestion.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{suggestion.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-muted-foreground">Confidence:</span>
                <Progress value={suggestion.confidence} className="h-1.5 flex-1" />
                <span className="text-xs text-foreground">{suggestion.confidence}%</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 h-8 bg-primary hover:bg-primary/90 rounded-lg">
                  <CheckCircle2 className="size-3 mr-1.5" />
                  Apply
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                  <XCircle className="size-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <ScrollArea className="flex-1 p-5" ref={scrollRef}>
        <div className="space-y-4">
          {conversation.messages.slice(-8).map((message) => (
            <div 
              key={message.id} 
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl h-fit shadow-lg shadow-blue-500/20">
                  <Sparkles className="size-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                <div className={`rounded-2xl p-4 ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white ml-auto' 
                    : 'bg-card border border-border'
                }`}>
                  <div className="leading-relaxed">
                    {message.role === 'user' ? <p className="text-sm">{message.content}</p> : formatMessage(message.content)}
                  </div>
                </div>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mt-2 ml-1">
                    <Button variant="ghost" size="sm" className="h-6 text-xs px-2 rounded-lg hover:bg-muted">
                      <ThumbsUp className="size-3 mr-1" />
                      Helpful
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 text-xs px-2 rounded-lg hover:bg-muted">
                      <ThumbsDown className="size-3 mr-1" />
                      Not helpful
                    </Button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1.5 ml-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="p-2 bg-muted-foreground rounded-xl h-fit">
                  <div className="size-4 bg-white rounded-full" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl h-fit shadow-lg shadow-blue-500/20">
                <Sparkles className="size-4 text-white" />
              </div>
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex gap-1.5">
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
      <div className="p-5 border-t border-border bg-card">
        <div className="flex gap-3 mb-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AI to improve, analyze, or modify..."
            className="resize-none rounded-xl border-border"
            rows={3}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="sm"
            className="self-end bg-primary hover:bg-primary/90 h-11 w-11 p-0 rounded-xl"
          >
            <Send className="size-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <kbd className="px-2 py-1 bg-muted border border-border rounded">Enter</kbd>
          <span>to send</span>
        </div>
      </div>
    </div>
  );
}
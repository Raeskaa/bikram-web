import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Conversation, Message, CourseData } from '../types';
import { ChatMessage } from './ChatMessage';

interface ChatFlowProps {
  conversation: Conversation;
  onUpdateConversation: (conversation: Conversation) => void;
  onCourseComplete: (courseData: Partial<CourseData>) => void;
}

export function ChatFlow({ conversation, onUpdateConversation, onCourseComplete }: ChatFlowProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState<Partial<CourseData>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const onUpdateMessages = (messages: Message[]) => {
    onUpdateConversation({ messages });
  };

  // Auto-respond to first message from welcome screen
  useEffect(() => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    
    // If there's only one message and it's from the user, ask for course title
    if (conversation.messages.length === 1 && lastMessage?.role === 'user' && !isLoading) {
      setIsLoading(true);
      
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "Great! Let's create an amazing course together. First, what would you like to name your course?",
          timestamp: new Date(),
          interactiveType: 'course-title',
        };

        onUpdateMessages([...conversation.messages, aiMessage]);
        setIsLoading(false);
      }, 1000);
    }
  }, [conversation.messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation.messages]);

  const handleCourseDataSubmit = (data: Partial<CourseData>) => {
    const updatedCourseData = { ...courseData, ...data };
    setCourseData(updatedCourseData);

    // User submitted the title
    if (data.title && !courseData.title) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: data.title,
        timestamp: new Date(),
      };

      const messages = [...conversation.messages, userMessage];
      onUpdateMessages(messages);
      setIsLoading(true);

      // Generate metadata with AI
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Perfect! I've generated a course description and learning outcomes for "${data.title}". Feel free to edit anything below:`,
          timestamp: new Date(),
          interactiveType: 'course-metadata',
          courseData: {
            title: data.title,
            description: `Master the fundamentals and advanced concepts of ${data.title.toLowerCase()}. This comprehensive course will take you from beginner to expert through hands-on projects and real-world examples.`,
            targetAudience: 'Beginners to intermediate learners looking to master this topic',
            learningOutcomes: [
              `Understand core concepts and principles of ${data.title.toLowerCase()}`,
              'Apply knowledge through practical, hands-on projects',
              'Build real-world applications with confidence',
              'Master advanced techniques and best practices',
            ],
          },
        };

        onUpdateMessages([...messages, aiMessage]);
        setIsLoading(false);
      }, 1500);
    }
    // User approved metadata
    else if (data.description && courseData.title) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: 'Looks good! Continue',
        timestamp: new Date(),
      };

      const messages = [...conversation.messages, userMessage];
      onUpdateMessages(messages);
      setIsLoading(true);

      // Generate course outline
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Excellent! I've created a comprehensive course outline for "${courseData.title}". This structure will help students learn progressively:`,
          timestamp: new Date(),
          interactiveType: 'course-outline',
          courseData: {
            ...updatedCourseData,
            outline: [
              {
                title: 'Introduction & Fundamentals',
                lessons: [
                  'Welcome and Course Overview',
                  'Setting Up Your Environment',
                  'Core Concepts and Terminology',
                  'Your First Project',
                ],
              },
              {
                title: 'Intermediate Concepts',
                lessons: [
                  'Advanced Techniques',
                  'Best Practices and Patterns',
                  'Common Pitfalls to Avoid',
                  'Project: Building a Real Application',
                ],
              },
              {
                title: 'Advanced Topics',
                lessons: [
                  'Professional Workflows',
                  'Optimization and Performance',
                  'Deployment Strategies',
                  'Final Capstone Project',
                ],
              },
            ],
          },
        };

        onUpdateMessages([...messages, aiMessage]);
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleGenerateWithAI = (type: string) => {
    setIsLoading(true);
    // Simulate regeneration
    setTimeout(() => {
      setIsLoading(false);
      // Could update the existing message with new data
    }, 1500);
  };

  const handleApproveOutline = () => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: 'Start building the course',
      timestamp: new Date(),
    };

    const messages = [...conversation.messages, userMessage];
    onUpdateMessages(messages);
    
    // Trigger the builder view
    if (onCourseComplete) {
      onCourseComplete(courseData);
    }
  };

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

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm here to help! Could you provide more details about what you'd like to do?",
        timestamp: new Date(),
      };

      onUpdateMessages([...updatedMessages, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background min-h-screen">
      <div className="border-b border-border p-4 bg-background">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mr-2"
            >
              <ArrowLeft className="size-4" />
            </Button>
          )}
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Sparkles className="size-5 text-white" />
          </div>
          <div>
            <h1 className="text-foreground">Course Builder AI</h1>
            <p className="text-muted-foreground text-xs">Create and sell courses with AI assistance</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        {conversation.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                <Sparkles className="size-8 text-white" />
              </div>
              <h2 className="text-foreground mb-2">Start Creating Your Course</h2>
              <p className="text-muted-foreground">
                I'll help you create a professional course that you can sell online. Let's get started!
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {conversation.messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onCourseDataSubmit={handleCourseDataSubmit}
                onGenerateWithAI={handleGenerateWithAI}
                onApproveOutline={handleApproveOutline}
              />
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg h-fit">
                  <Sparkles className="size-4 text-white" />
                </div>
                <div className="flex-1 bg-muted rounded-lg p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-border p-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="resize-none"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="lg"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
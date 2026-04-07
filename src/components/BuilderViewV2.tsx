import { useState } from 'react';
import { ArrowLeft, Sparkles, Eye, Save, LayoutDashboard, FileText, BarChart3, Users, Megaphone, Settings, Undo2, Redo2, Share2, Download, Bell, Search, Command } from 'lucide-react';
import { Button } from './ui/button';
import { CourseBuilderV2 } from './CourseBuilderV2';
import { AIChatPanelV2 } from './AIChatPanelV2';
import { Conversation, Message, CourseData } from '../types';
import { Progress } from './ui/progress';
import { Input } from './ui/input';

interface BuilderViewV2Props {
  conversation: Conversation;
  onUpdateMessages: (messages: Message[]) => void;
  courseData: Partial<CourseData>;
  onBack: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function BuilderViewV2({ conversation, onUpdateMessages, courseData, onBack }: BuilderViewV2Props) {
  const [activeSection, setActiveSection] = useState('content');
  const [lastSaved] = useState(new Date());
  const [buildProgress] = useState(72);
  const [showAI, setShowAI] = useState(true);

  const handlePromptClick = (prompt: string) => {
    // Add user message to chat
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };
    onUpdateMessages([...conversation.messages, newMessage]);
    
    // Scroll AI panel to bottom if needed
    // Auto-response simulation can be added here
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation Bar - Horizontal */}
      <header className="border-b border-border bg-background z-10">
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-9 w-9 p-0 rounded-lg"
            >
              <ArrowLeft className="size-4" />
            </Button>

            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <Sparkles className="size-3.5 text-white" />
              </div>
              <div>
                <h1 className="text-sm text-foreground leading-none">{courseData.title || 'Untitled Course'}</h1>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">Course Studio</p>
              </div>
            </div>

            {/* Horizontal Navigation */}
            <nav className="flex items-center gap-1 ml-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive 
                        ? 'bg-muted text-foreground' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search..."
                className="pl-9 pr-16 h-9 w-64 bg-muted border-border"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs bg-card border border-border rounded flex items-center gap-1">
                <Command className="size-2.5" /> K
              </kbd>
            </div>

            {/* Auto-save */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground">
              <Save className="size-3" />
              <span>Saved</span>
            </div>

            {/* AI Toggle */}
            <Button
              variant={showAI ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowAI(!showAI)}
              className="h-9 rounded-lg"
            >
              <Sparkles className="size-4 mr-2" />
              AI Assistant
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg relative">
              <Bell className="size-4" />
              <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full" />
            </Button>

            {/* Undo/Redo */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg">
                <Undo2 className="size-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg">
                <Redo2 className="size-4" />
              </Button>
            </div>

            {/* Actions */}
            <div className="h-6 w-px bg-border" />
            
            <Button variant="outline" size="sm" className="h-9 rounded-lg">
              <Eye className="size-4 mr-2" />
              Preview
            </Button>

            <Button size="sm" className="h-9 rounded-lg bg-primary hover:bg-primary/90">
              Publish
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-3">
          <div className="flex items-center gap-3">
            <Progress value={buildProgress} className="h-1.5 flex-1" />
            <span className="text-xs text-muted-foreground min-w-[3rem] text-right">{buildProgress}%</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-muted">
          <CourseBuilderV2 
            courseData={courseData}
            activeSection={activeSection}
            onPromptClick={handlePromptClick}
          />
        </div>

        {/* AI Panel - Slide in from right */}
        {showAI && (
          <div className="w-96 border-l border-border bg-card animate-in slide-in-from-right duration-300">
            <AIChatPanelV2
              conversation={conversation}
              onUpdateMessages={onUpdateMessages}
              courseData={courseData}
              onClose={() => setShowAI(false)}
              onPromptClick={handlePromptClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}
import { Sparkles, Search, BookOpen, Users, Calendar, ChevronDown, TrendingUp, Zap, Target, HelpCircle, Plus, DollarSign, Globe, Rocket, X, Paperclip, Link2, Image, Video, File, Folder } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect, useRef } from 'react';
import { AppVersion } from '../types';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { imgGroup } from '../imports/svg-qpgp8';

interface WelcomeScreenProps {
  onStart: (prompt: string, mode?: 'creator' | 'learner', type?: 'course' | 'community' | 'event') => void;
  onVersionChange: (version: AppVersion) => void;
  currentVersion: AppVersion;
  userMode: 'creator' | 'learner';
  onModeChange: (mode: 'creator' | 'learner') => void;
  onOpenEventsMarketplace?: () => void;
  onOpenEventCreator?: () => void;
  onOpenCRM?: () => void;
}

const versionDescriptions: Record<AppVersion, string> = {
  v1: 'Intent Detection',
  v2: 'Dual-Pane',
  v3: 'Smart Toggle',
  v4: 'Context Menu',
  v5: 'Tab-Based',
  v6: 'Command Palette',
  v7: 'Persona Selection',
  v8: 'Action Cards',
};

export function WelcomeScreen({ onStart, onVersionChange, currentVersion, onOpenEventsMarketplace, onOpenEventCreator, onOpenCRM }: WelcomeScreenProps) {
  const [prompt, setPrompt] = useState('');
  const [showVersionMenu, setShowVersionMenu] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [selectedContentType, setSelectedContentType] = useState<'course' | 'community' | 'event' | undefined>(undefined);
  const [selectedQuickAction, setSelectedQuickAction] = useState<string | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [attachments, setAttachments] = useState<Array<{
    id: string;
    name: string;
    type: 'file' | 'link' | 'image' | 'video' | 'drive';
    size?: string;
    url?: string;
  }>>([]);
  const [showDrivePicker, setShowDrivePicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const attachmentButtonRef = useRef<HTMLButtonElement>(null);

  const placeholdersByType = {
    course: [
      'Create a [Course] for [Entrepreneurs] about [Marketing]',
      'Create a [Bootcamp] for [Designers] about [Figma]',
      'Create a [Program] for [Developers] about [React]',
    ],
    community: [
      'Build a [Community] for [Creators] about [Content Strategy]',
      'Build a [Slack Group] for [Founders] about [Fundraising]',
      'Build a [Forum] for [Students] about [Career Growth]',
    ],
    event: [
      'Plan a [Virtual Event] for [Developers] about [React]',
      'Plan a [Workshop] for [Designers] about [UI/UX]',
      'Plan a [Summit] for [Entrepreneurs] about [Growth]',
    ],
  };

  const defaultPlaceholders = [
    'Create a [Course] for [Entrepreneurs] about [Marketing]',
    'Build a [Community] for [Creators] about [Content Strategy]',
    'Plan a [Virtual Event] for [Developers] about [React]',
    'Create a [Bootcamp] for [Designers] about [Figma]',
    'Build a [Slack Group] for [Founders] about [Fundraising]',
    'Plan a [Workshop] for [Product Managers] about [Roadmapping]',
  ];

  const placeholders = selectedContentType ? placeholdersByType[selectedContentType] : defaultPlaceholders;

  // Auto-typing effect
  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentPlaceholder = placeholders[placeholderIndex];

      if (!isDeleting && charIndex <= currentPlaceholder.length) {
        setPlaceholderText(currentPlaceholder.substring(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(type, 50);
      } else if (!isDeleting && charIndex > currentPlaceholder.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setPlaceholderText(currentPlaceholder.substring(0, charIndex));
        timeoutId = setTimeout(type, 30);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        timeoutId = setTimeout(type, 500);
      }
    };

    timeoutId = setTimeout(type, 100);

    return () => clearTimeout(timeoutId);
  }, [placeholderIndex]);

  // Auto-expanding textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const minHeight = 72; // 3 rows minimum
      const maxHeight = 200; // Maximum height before scrolling
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
    }
  }, [prompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      setIsLoading(true);
      // Simulate loading - in real app this would be when actually submitting
      setTimeout(() => {
        setIsLoading(false);
        onStart(prompt, undefined, selectedContentType);
      }, 300);
    }
  };

  const handleFileUpload = (files: FileList | null, type: 'file' | 'image' | 'video' = 'file') => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const newAttachment = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: type,
      size: formatFileSize(file.size),
    };
    
    setAttachments(prev => [...prev, newAttachment]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleDriveSelect = (fileName: string) => {
    const newAttachment = {
      id: Math.random().toString(36).substr(2, 9),
      name: fileName,
      type: 'drive' as const,
      url: 'https://drive.google.com/file/d/sample',
    };
    setAttachments(prev => [...prev, newAttachment]);
    setShowDrivePicker(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Actions Bar - REMOVED */}

      {/* Hero Section */}
      <main className="flex-1 flex items-start justify-center px-6 py-16">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-100/50 rounded-full border border-primary/20">
              <img src={imgGroup} alt="" className="size-4" />
              <span className="text-sm text-primary font-medium">Leapy V2.1 available now</span>
            </div>
            <h1 className="text-[48px] font-bold text-foreground mb-4 tracking-tight leading-tight">
              Create communities, manage your
              <br />
              courses, events and a lot more
            </h1>
            <p className="text-lg text-muted-foreground">
              Join <span className="font-semibold text-primary">10,000+</span> educators building engaging learning communities 🚀
            </p>
          </div>

          <div className="mb-10">
            {/* Tab-like Mode Switchers - Centered above the box */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                type="button"
                onClick={(e) => {
                  if (selectedContentType === 'course') {
                    e.stopPropagation();
                    setSelectedContentType(undefined);
                    setPlaceholderIndex(0);
                  } else {
                    setSelectedContentType('course');
                    setPlaceholderIndex(0);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedContentType === 'course'
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground'
                }`}
              >
                <BookOpen className="size-4" />
                Create Course
                {selectedContentType === 'course' && (
                  <X className="size-3.5 ml-1" />
                )}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  if (selectedContentType === 'community') {
                    e.stopPropagation();
                    setSelectedContentType(undefined);
                    setPlaceholderIndex(0);
                  } else {
                    setSelectedContentType('community');
                    setPlaceholderIndex(0);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedContentType === 'community'
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground'
                }`}
              >
                <Users className="size-4" />
                Create Community
                {selectedContentType === 'community' && (
                  <X className="size-3.5 ml-1" />
                )}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  if (selectedContentType === 'event') {
                    e.stopPropagation();
                    setSelectedContentType(undefined);
                    setPlaceholderIndex(0);
                  } else {
                    setSelectedContentType('event');
                    setPlaceholderIndex(0);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedContentType === 'event'
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground'
                }`}
              >
                <Calendar className="size-4" />
                Create Event
                {selectedContentType === 'event' && (
                  <X className="size-3.5 ml-1" />
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur-lg transition-opacity ${isFocused ? 'opacity-30' : 'opacity-10 group-hover:opacity-20'}`} />
                <div className={`relative bg-white rounded-2xl shadow-xl transition-all ${isFocused ? 'border border-primary/25 shadow-lg' : 'border'} p-3`}>
                  {/* Attachment Chips */}
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 px-4 pt-3 pb-2">
                      {attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 text-sm transition-colors group"
                        >
                          {attachment.type === 'file' && <File className="size-3.5 text-gray-500" />}
                          {attachment.type === 'image' && <Image className="size-3.5 text-gray-500" />}
                          {attachment.type === 'video' && <Video className="size-3.5 text-gray-500" />}
                          {attachment.type === 'drive' && <Folder className="size-3.5 text-blue-500" />}
                          {attachment.type === 'link' && <Link2 className="size-3.5 text-gray-500" />}
                          <span className="text-gray-700 max-w-[200px] truncate">{attachment.name}</span>
                          {attachment.size && (
                            <span className="text-xs text-gray-400">{attachment.size}</span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeAttachment(attachment.id)}
                            className="p-0.5 hover:bg-gray-200 rounded transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X className="size-3 text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={placeholderText}
                        rows={3}
                        className="w-full px-4 py-6 text-gray-900 placeholder-gray-400 focus:outline-none text-base resize-none"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        ref={textareaRef}
                        style={{ minHeight: '72px', maxHeight: '200px', overflow: 'auto' }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-4 py-2 border-t border-gray-100 mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors"
                        title="Add attachment"
                        ref={attachmentButtonRef}
                        onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                      >
                        <Plus className="size-5 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors"
                        title="Templates"
                      >
                        <div className="size-5 flex items-center justify-center text-gray-600 font-medium text-xs">
                          |||
                        </div>
                      </button>
                      {/* Integration Icons */}
                      <div className="flex items-center -space-x-2 ml-2" title="Available integrations: Slack, WhatsApp, Discord, Zoom">
                        <div className="size-6 rounded-full bg-[#4A154B] border-2 border-white flex items-center justify-center">
                          <span className="text-white text-[10px] font-semibold">S</span>
                        </div>
                        <div className="size-6 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center">
                          <span className="text-white text-[10px] font-semibold">W</span>
                        </div>
                        <div className="size-6 rounded-full bg-[#5865F2] border-2 border-white flex items-center justify-center">
                          <span className="text-white text-[10px] font-semibold">D</span>
                        </div>
                        <div className="size-6 rounded-full bg-[#2D8CFF] border-2 border-white flex items-center justify-center">
                          <span className="text-white text-[10px] font-semibold">Z</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors"
                        title="Voice input"
                      >
                        <svg className="size-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                      
                      {/* Surprise Me Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const surprisePrompts = [
                            'Create a gamified learning experience for kids',
                            'Build a premium coaching community',
                            'Design a 30-day fitness challenge',
                            'Create a tech conference with workshops',
                            'Build a creative writing masterclass',
                            'Plan a virtual hackathon event',
                          ];
                          const randomPrompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
                          setPrompt(randomPrompt);
                        }}
                        className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-xs font-medium transition-all shadow-sm hover:shadow-md"
                        title="Surprise me with a random idea"
                      >
                        <Sparkles className="size-3.5" />
                        Surprise me
                      </button>
                      
                      <button
                        type="submit"
                        disabled={!prompt.trim() || isLoading}
                        className={`p-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:hover:bg-muted rounded-full transition-all ${isLoading ? 'animate-pulse' : ''}`}
                        title="Send"
                      >
                        <svg className={`size-5 ${prompt.trim() && !isLoading ? 'text-primary-foreground' : 'text-muted-foreground'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Attachment Menu Popover */}
            {showAttachmentMenu && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowAttachmentMenu(false)}
                />
                
                {/* Popover */}
                <div 
                  className="absolute z-50 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 fade-in duration-200"
                  style={{
                    left: attachmentButtonRef.current?.getBoundingClientRect().left,
                    top: (attachmentButtonRef.current?.getBoundingClientRect().bottom || 0) + 8
                  }}
                >
                  <div className="py-2">
                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.onchange = (e: any) => {
                          handleFileUpload(e.target.files, 'file');
                        };
                        input.click();
                        setShowAttachmentMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Paperclip className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-gray-700">Upload file</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">⌘U</span>
                    </button>
                    
                    <div className="my-1 mx-4 border-t border-gray-100" />
                    
                    <button
                      onClick={() => {
                        setShowDrivePicker(true);
                        setShowAttachmentMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Folder className="size-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
                        <span className="text-sm text-gray-700">Google Drive</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">⌘D</span>
                    </button>
                    
                    <div className="my-1 mx-4 border-t border-gray-100" />
                    
                    <button
                      onClick={() => {
                        const url = window.prompt('Enter URL:');
                        if (url) {
                          const newAttachment = {
                            id: Math.random().toString(36).substr(2, 9),
                            name: url,
                            type: 'link' as const,
                            url: url,
                          };
                          setAttachments(prev => [...prev, newAttachment]);
                        }
                        setShowAttachmentMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Link2 className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-gray-700">Paste link</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">⌘L</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e: any) => {
                          handleFileUpload(e.target.files, 'image');
                        };
                        input.click();
                        setShowAttachmentMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Image className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-gray-700">Insert image</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">⌘I</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'video/*';
                        input.onchange = (e: any) => {
                          handleFileUpload(e.target.files, 'video');
                        };
                        input.click();
                        setShowAttachmentMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <Video className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm text-gray-700">Embed video</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">⌘V</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Google Drive Picker Modal */}
          {showDrivePicker && (
            <>
              <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200"
                onClick={() => setShowDrivePicker(false)}
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-in zoom-in-95 fade-in duration-200">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Folder className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">Select from Google Drive</h2>
                        <p className="text-sm text-gray-500">Choose files to attach</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDrivePicker(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="size-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 max-h-[400px] overflow-y-auto">
                    {/* Mock Drive Files */}
                    <div className="space-y-2">
                      {[
                        { name: 'Course Curriculum.docx', type: 'Document', size: '245 KB', icon: File },
                        { name: 'Lesson Plans.pdf', type: 'PDF', size: '1.2 MB', icon: File },
                        { name: 'Marketing Strategy.pptx', type: 'Presentation', size: '3.4 MB', icon: File },
                        { name: 'Student Database.xlsx', type: 'Spreadsheet', size: '856 KB', icon: File },
                        { name: 'Course Banner.png', type: 'Image', size: '2.1 MB', icon: Image },
                        { name: 'Welcome Video.mp4', type: 'Video', size: '45.3 MB', icon: Video },
                      ].map((file, index) => (
                        <button
                          key={index}
                          onClick={() => handleDriveSelect(file.name)}
                          className="w-full p-4 hover:bg-muted rounded-lg border border-border hover:border-primary/30 transition-all flex items-center gap-4 group"
                        >
                          <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors">
                            <file.icon className="size-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.type} • {file.size}</p>
                          </div>
                          <ChevronDown className="size-4 text-gray-400 -rotate-90" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => setShowDrivePicker(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Quick Actions */}
          <div>
            <p className="text-sm text-gray-600 mb-4 text-center">Quick actions to get started:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {selectedContentType === 'course' && (
                <>
                  <button
                    onClick={(e) => {
                      if (selectedQuickAction === 'full-course') {
                        e.stopPropagation();
                        setSelectedQuickAction(undefined);
                      } else {
                        setSelectedQuickAction('full-course');
                        onStart('Create a complete React & TypeScript course', 'creator', 'course');
                      }
                    }}
                    className={`group relative backdrop-blur-sm border rounded-full px-5 py-2.5 text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 ${
                      selectedQuickAction === 'full-course'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white/80 hover:bg-white text-foreground hover:text-primary border-border hover:border-primary/30'
                    }`}
                  >
                    <BookOpen className={`size-3.5 transition-colors ${selectedQuickAction === 'full-course' ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`} />
                    Full course with modules
                    {selectedQuickAction === 'full-course' && <X className="size-3 ml-1" />}
                  </button>
                  <button
                    onClick={(e) => {
                      if (selectedQuickAction === 'cohort-based') {
                        e.stopPropagation();
                        setSelectedQuickAction(undefined);
                      } else {
                        setSelectedQuickAction('cohort-based');
                        onStart('Design a cohort-based bootcamp', 'creator', 'course');
                      }
                    }}
                    className={`group relative backdrop-blur-sm border rounded-full px-5 py-2.5 text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 ${
                      selectedQuickAction === 'cohort-based'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white/80 hover:bg-white text-foreground hover:text-primary border-border hover:border-primary/30'
                    }`}
                  >
                    <Users className={`size-3.5 transition-colors ${selectedQuickAction === 'cohort-based' ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`} />
                    Cohort-based program
                    {selectedQuickAction === 'cohort-based' && <X className="size-3 ml-1" />}
                  </button>
                  <button
                    onClick={(e) => {
                      if (selectedQuickAction === 'mini-course') {
                        e.stopPropagation();
                        setSelectedQuickAction(undefined);
                      } else {
                        setSelectedQuickAction('mini-course');
                        onStart('Mini course with 5 lessons', 'creator', 'course');
                      }
                    }}
                    className={`group relative backdrop-blur-sm border rounded-full px-5 py-2.5 text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 ${
                      selectedQuickAction === 'mini-course'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white/80 hover:bg-white text-foreground hover:text-primary border-border hover:border-primary/30'
                    }`}
                  >
                    <Zap className={`size-3.5 transition-colors ${selectedQuickAction === 'mini-course' ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`} />
                    Quick mini course
                    {selectedQuickAction === 'mini-course' && <X className="size-3 ml-1" />}
                  </button>
                  <button
                    onClick={(e) => {
                      if (selectedQuickAction === 'self-paced') {
                        e.stopPropagation();
                        setSelectedQuickAction(undefined);
                      } else {
                        setSelectedQuickAction('self-paced');
                        onStart('Self-paced video course', 'creator', 'course');
                      }
                    }}
                    className={`group relative backdrop-blur-sm border rounded-full px-5 py-2.5 text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 ${
                      selectedQuickAction === 'self-paced'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white/80 hover:bg-white text-foreground hover:text-primary border-border hover:border-primary/30'
                    }`}
                  >
                    <Rocket className={`size-3.5 transition-colors ${selectedQuickAction === 'self-paced' ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`} />
                    Self-paced course
                    {selectedQuickAction === 'self-paced' && <X className="size-3 ml-1" />}
                  </button>
                  <button
                    onClick={(e) => {
                      if (selectedQuickAction === 'certification') {
                        e.stopPropagation();
                        setSelectedQuickAction(undefined);
                      } else {
                        setSelectedQuickAction('certification');
                        onStart('Course with certifications', 'creator', 'course');
                      }
                    }}
                    className={`group relative backdrop-blur-sm border rounded-full px-5 py-2.5 text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 ${
                      selectedQuickAction === 'certification'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white/80 hover:bg-white text-foreground hover:text-primary border-border hover:border-primary/30'
                    }`}
                  >
                    <Target className={`size-3.5 transition-colors ${selectedQuickAction === 'certification' ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`} />
                    With certification
                    {selectedQuickAction === 'certification' && <X className="size-3 ml-1" />}
                  </button>
                  <button
                    onClick={(e) => {
                      if (selectedQuickAction === 'membership') {
                        e.stopPropagation();
                        setSelectedQuickAction(undefined);
                      } else {
                        setSelectedQuickAction('membership');
                        onStart('Membership with monthly content', 'creator', 'course');
                      }
                    }}
                    className={`group relative backdrop-blur-sm border rounded-full px-5 py-2.5 text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 ${
                      selectedQuickAction === 'membership'
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white/80 hover:bg-white text-foreground hover:text-primary border-border hover:border-primary/30'
                    }`}
                  >
                    <DollarSign className={`size-3.5 transition-colors ${selectedQuickAction === 'membership' ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`} />
                    Membership program
                    {selectedQuickAction === 'membership' && <X className="size-3 ml-1" />}
                  </button>
                </>
              )}
              
              {selectedContentType === 'community' && (
                <>
                  <button
                    onClick={() => onStart('Build a Slack community for developers', 'creator', 'community')}
                    className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                  >
                    <Users className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    Slack community
                  </button>
                  <button onClick={() => onStart('Private forum for course students', 'creator', 'community')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Globe className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Private forum</button>
                  <button onClick={() => onStart('Weekly mastermind group', 'creator', 'community')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Target className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Mastermind group</button>
                  <button onClick={() => onStart('Membership community with tiers', 'creator', 'community')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><DollarSign className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Paid membership</button>
                  <button onClick={() => onStart('Alumni network for graduates', 'creator', 'community')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Rocket className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Alumni network</button>
                  <button onClick={() => onStart('Peer learning circles', 'creator', 'community')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Users className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Learning circles</button>
                </>
              )}
              
              {selectedContentType === 'event' && (
                <>
                  <button onClick={() => onStart('3-day virtual summit on AI', 'creator', 'event')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Calendar className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Virtual summit</button>
                  <button onClick={() => onStart('Monthly webinar series', 'creator', 'event')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Globe className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Webinar series</button>
                  <button onClick={() => onStart('In-person workshop', 'creator', 'event')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Users className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />In-person workshop</button>
                  <button onClick={() => onStart('Hybrid conference', 'creator', 'event')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Rocket className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Hybrid event</button>
                  <button onClick={() => onStart('Live Q&A session', 'creator', 'event')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><HelpCircle className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Live Q&A</button>
                  <button onClick={() => onStart('Networking meetup', 'creator', 'event')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Target className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Networking event</button>
                </>
              )}
              
              {!selectedContentType && (
                <>
                  <button onClick={() => onStart('Create my course', 'creator', 'course')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><BookOpen className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Create my course</button>
                  <button onClick={() => onStart('Build a community', 'creator', 'community')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Users className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Build a community</button>
                  <button onClick={() => onStart('Plan an event', 'creator', 'event')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Calendar className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Plan an event</button>
                  <button onClick={() => onStart('I already use other tools', 'creator')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Target className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />I already use other tools</button>
                  <button onClick={() => onStart('How are you different?', 'creator')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><HelpCircle className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />How are you different?</button>
                  <button onClick={() => onStart('Help me make more money', 'learner')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><DollarSign className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Help me make more money</button>
                  <button onClick={() => onStart('Analytics & insights', 'learner')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><TrendingUp className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Analytics & insights</button>
                  <button onClick={() => onStart('Content creation', 'learner')} className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border border-border hover:border-primary/30 rounded-full px-5 py-2.5 text-sm text-foreground hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"><Zap className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />Content creation</button>
                </>
              )}
            </div>
          </div>

          {/* CTA Cards */}
          <div className="grid grid-cols-2 gap-6 mt-16">
            <div className="bg-muted rounded-2xl p-8 border border-border h-64">
            </div>

            <div className="bg-muted rounded-2xl p-8 border border-border h-64">
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Help Center</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="text-muted-foreground/60">
              © 2024 LeapSpace.ai. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
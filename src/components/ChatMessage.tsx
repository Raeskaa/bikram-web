import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Check, Edit2, Trash2, Plus, RotateCcw, Wand2, Loader2, ChevronUp, ChevronDown, Copy, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import LeapyLogo from '../imports/Button';
import { CommunitySetupSteps } from './CommunitySetupSteps';
import { EventSetupSteps } from './EventSetupSteps';
import { CourseSetupSteps } from './CourseSetupSteps';
import { Conversation, CourseData, CommunityData, Message, AppVersion } from '../types';

interface ChatMessageProps {
  message: Message;
  isLastAiMessage?: boolean;
  onPrototype?: () => void;
  onCourseDataSubmit?: (data: Partial<CourseData>) => void;
  onCommunityDataSubmit?: (data: Partial<CommunityData>) => void;
  onEventDataSubmit?: (data: any) => void;
  onGenerateWithAI?: (type: string, field?: string) => void;
  onApproveOutline?: () => void;
  onEditMessage?: (messageId: string, newContent: string) => void;
  onRegenerateMessage?: (messageId: string) => void;
  onCopyMessage?: (content: string) => void;
}

export function ChatMessage({ 
  message, 
  isLastAiMessage,
  onPrototype, 
  onCourseDataSubmit,
  onCommunityDataSubmit,
  onEventDataSubmit,
  onGenerateWithAI, 
  onApproveOutline,
  onEditMessage,
  onRegenerateMessage,
  onCopyMessage
}: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [showThinking, setShowThinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'up' | 'down' | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(message.content);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() !== message.content) {
      onEditMessage?.(message.id, editedContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(message.content);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    onCopyMessage?.(message.content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleRegenerate = () => {
    onRegenerateMessage?.(message.id);
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedbackGiven(type);
  };

  return (
    <div 
      className={`flex gap-4 group ${isUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isUser && (
        <div className="size-9 flex-shrink-0">
          <LeapyLogo />
        </div>
      )}
      <div className={`${isUser ? 'max-w-[70%]' : 'flex-1 min-w-0'}`}>
        <div className={`rounded-2xl transition-all duration-200 ${ 
          isUser ? 'bg-primary text-white p-4' : 'bg-card border border-border p-6'
        }`}>
          {/* Thinking Process */}
          {!isUser && message.thinkingSteps && message.thinkingSteps.length > 0 && (
            <div className="mb-4 border-l-2 border-blue-500 pl-4 bg-blue-50/50 rounded-r-lg py-2 pr-4">
              <button
                onClick={() => setShowThinking(!showThinking)}
                className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 transition-colors w-full"
              >
                <Loader2 className="size-3 animate-spin" />
                <span>Thinking process</span>
                {showThinking ? (
                  <ChevronUp className="size-3 ml-auto" />
                ) : (
                  <ChevronDown className="size-3 ml-auto" />
                )}
              </button>
              {showThinking && (
                <div className="mt-3 space-y-2">
                  {message.thinkingSteps.map((step, idx) => (
                    <div key={step.id} className="flex items-start gap-2">
                      <div className={`mt-1 size-1.5 rounded-full flex-shrink-0 ${
                        step.status === 'complete' ? 'bg-green-500' :
                        step.status === 'active' ? 'bg-blue-500 animate-pulse' :
                        'bg-muted-foreground/40'
                      }`} />
                      <p className="text-xs text-muted-foreground flex-1">{step.step}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Status Badge */}
          {!isUser && message.status === 'generating' && (
            <div className="mb-3">
              <Badge variant="secondary" className="text-xs">
                <Loader2 className="size-3 mr-1 animate-spin" />
                Generating...
              </Badge>
            </div>
          )}

          {/* Message Content */}
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[100px] resize-none"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                >
                  <X className="size-3 mr-1" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={!editedContent.trim()}
                >
                  <Check className="size-3 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <p className={`whitespace-pre-wrap leading-relaxed ${isUser ? 'text-white' : 'text-foreground'}`}>{message.content}</p>
          )}
          
          {/* Community Setup Steps (Description, Name, Vibe) */}
          {(message.interactiveType === 'community-description' || 
            message.interactiveType === 'community-name' || 
            message.interactiveType === 'community-vibe') && (
            <CommunitySetupSteps
              interactiveType={message.interactiveType}
              communityData={message.communityData}
              onSubmit={(data) => onCommunityDataSubmit?.(data)}
            />
          )}

          {/* Event Setup Steps (Title, Details, Description) */}
          {(message.interactiveType === 'event-title' || 
            message.interactiveType === 'event-details' || 
            message.interactiveType === 'event-description') && (
            <EventSetupSteps
              interactiveType={message.interactiveType}
              eventData={message.eventData}
              onSubmit={(data) => onEventDataSubmit?.(data)}
            />
          )}

          {/* Course Setup Steps (Title, Metadata, Outline) */}
          {(message.interactiveType === 'course-title' ||
            message.interactiveType === 'course-metadata' ||
            message.interactiveType === 'course-outline') && (
            <CourseSetupSteps
              interactiveType={message.interactiveType}
              courseData={message.courseData}
              onSubmit={(data) => onCourseDataSubmit?.(data)}
              onGenerateWithAI={onGenerateWithAI}
              onApproveOutline={onApproveOutline}
            />
          )}

          {/* Proposed Plan (Original) */}
          {message.proposedPlan && (
            <div className="mt-8 space-y-8">
              {/* Features */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <h3 className="text-muted-foreground uppercase text-xs tracking-wider">Features</h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid gap-3">
                  {message.proposedPlan.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="flex gap-3 p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        <div className="size-5 rounded-full border-2 border-border flex items-center justify-center">
                          <div className="size-2 rounded-full bg-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground mb-1">{feature.title}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Style Guidelines */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <h3 className="text-muted-foreground uppercase text-xs tracking-wider">Style Guidelines</h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid gap-3">
                  {message.proposedPlan.styleGuidelines.map((guideline, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-lg border border-border bg-muted/50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="size-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-foreground">{guideline.category}:</span>
                          <span className="text-muted-foreground"> {guideline.description}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <h3 className="text-muted-foreground uppercase text-xs tracking-wider">Stack</h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="grid gap-3">
                  <div className="p-4 rounded-lg border border-border bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Wand2 className="size-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-muted-foreground">AI:</span>
                        <span className="text-foreground ml-2">{message.proposedPlan.stack.ai}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="size-4 border-2 border-muted-foreground rounded flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-muted-foreground">UI:</span>
                        <span className="text-foreground ml-2">{message.proposedPlan.stack.ui}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex justify-end pt-4 border-t border-border">
                <Button
                  onClick={onPrototype}
                  className="bg-blue-600 hover:bg-blue-700 px-6"
                  size="lg"
                >
                  Prototype this App
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Bar and Timestamp */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center gap-2">
            {!isUser && message.creditsUsed && message.creditsUsed > 0 && (
              <span className="text-xs text-muted-foreground">
                {message.creditsUsed} credits
              </span>
            )}
            {!isUser && message.creditsUsed && message.creditsUsed > 0 && (
              <span className="text-muted-foreground/40 text-xs">·</span>
            )}
            <p className="text-muted-foreground text-xs">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            {message.editHistory && message.editHistory.length > 0 && (
              <Badge variant="outline" className="text-xs h-5">
                Edited
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className={`flex items-center gap-1 transition-opacity duration-200 ${
            isHovered || isLastAiMessage ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
              onClick={handleCopy}
              title="Copy message"
            >
              {copySuccess ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3 mr-1" />
              )}
            </Button>
            
            {isUser && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                onClick={handleEdit}
                title="Edit message"
              >
                <Edit2 className="size-3 mr-1" />
              </Button>
            )}
            
            {!isUser && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground"
                  onClick={handleRegenerate}
                  title="Regenerate response"
                >
                  <RotateCcw className="size-3 mr-1" />
                </Button>
                
                <div className="h-4 w-px bg-border mx-1" />
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-7 px-2 hover:bg-muted rounded transition-colors ${
                    feedbackGiven === 'up' ? 'text-green-600' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => handleFeedback('up')}
                  title="Helpful"
                >
                  <ThumbsUp className="size-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`h-7 px-2 hover:bg-muted rounded transition-colors ${
                    feedbackGiven === 'down' ? 'text-red-600' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => handleFeedback('down')}
                  title="Not helpful"
                >
                  <ThumbsDown className="size-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
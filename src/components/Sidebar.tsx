import { Plus, MessageSquare, Settings, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Conversation } from '../types';
import { ScrollArea } from './ui/scroll-area';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onOpenSettings: () => void;
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onOpenSettings,
}: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Button
          onClick={onNewConversation}
          className="w-full"
          variant="default"
        >
          <Plus className="size-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`group relative rounded-lg p-3 mb-1 cursor-pointer transition-colors ${
                activeConversationId === conversation.id
                  ? 'bg-blue-50 border border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="size-4 mt-0.5 flex-shrink-0 text-gray-500" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-gray-900">
                    {conversation.title}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {conversation.messages.length} messages
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteConversation(conversation.id);
                  }}
                >
                  <Trash2 className="size-3 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={onOpenSettings}
          variant="outline"
          className="w-full"
        >
          <Settings className="size-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}

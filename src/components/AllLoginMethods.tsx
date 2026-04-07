import { useState } from 'react';
import { Search, X, ArrowLeft, Chrome, Facebook, Linkedin, Apple, MessageSquare, Mail, Phone, Globe, Github, Send, Slack } from 'lucide-react';
import { AuthHeader } from './auth/AuthHeader';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from './ui/utils';

interface AllLoginMethodsProps {
  onBack: () => void;
  onSelectMethod: (provider: string) => void;
  userRegion?: string; // 'US', 'CN', 'IN', etc.
  onLogoClick?: () => void;
}

export function AllLoginMethods({ onBack, onSelectMethod, userRegion = 'US', onLogoClick }: AllLoginMethodsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock integration data (100+ integrations)
  const integrations = [
    // Social
    { id: 'google', name: 'Google', category: 'social', icon: Chrome, color: '#4285F4', popular: true },
    { id: 'facebook', name: 'Facebook', category: 'social', icon: Facebook, color: '#1877F2', popular: true },
    { id: 'linkedin', name: 'LinkedIn', category: 'social', icon: Linkedin, color: '#0A66C2', popular: true },
    { id: 'apple', name: 'Apple', category: 'social', icon: Apple, color: '#000000', popular: true },
    { id: 'twitter', name: 'Twitter / X', category: 'social', icon: Send, color: '#000000', popular: true },
    { id: 'instagram', name: 'Instagram', category: 'social', icon: Globe, color: '#E4405F', popular: false },
    { id: 'tiktok', name: 'TikTok', category: 'social', icon: Globe, color: '#000000', popular: false },
    { id: 'snapchat', name: 'Snapchat', category: 'social', icon: Globe, color: '#FFFC00', popular: false },
    { id: 'reddit', name: 'Reddit', category: 'social', icon: Globe, color: '#FF4500', popular: false },
    { id: 'pinterest', name: 'Pinterest', category: 'social', icon: Globe, color: '#E60023', popular: false },
    { id: 'youtube', name: 'YouTube', category: 'social', icon: Globe, color: '#FF0000', popular: false },
    { id: 'twitch', name: 'Twitch', category: 'social', icon: Globe, color: '#9146FF', popular: false },
    
    // Messaging
    { id: 'whatsapp', name: 'WhatsApp', category: 'messaging', icon: MessageSquare, color: '#25D366', popular: userRegion === 'IN' },
    { id: 'telegram', name: 'Telegram', category: 'messaging', icon: Send, color: '#0088cc', popular: false },
    { id: 'wechat', name: 'WeChat', category: 'messaging', icon: MessageSquare, color: '#09B83E', popular: userRegion === 'CN' },
    { id: 'line', name: 'LINE', category: 'messaging', icon: MessageSquare, color: '#00B900', popular: userRegion === 'JP' },
    { id: 'viber', name: 'Viber', category: 'messaging', icon: MessageSquare, color: '#665CAC', popular: false },
    { id: 'signal', name: 'Signal', category: 'messaging', icon: MessageSquare, color: '#3A76F0', popular: false },
    { id: 'messenger', name: 'Messenger', category: 'messaging', icon: MessageSquare, color: '#0084FF', popular: false },
    { id: 'skype', name: 'Skype', category: 'messaging', icon: MessageSquare, color: '#00AFF0', popular: false },
    { id: 'imessage', name: 'iMessage', category: 'messaging', icon: MessageSquare, color: '#34C759', popular: false },
    { id: 'kakaotalk', name: 'KakaoTalk', category: 'messaging', icon: MessageSquare, color: '#FFE812', popular: false },
    
    // Work
    { id: 'slack', name: 'Slack', category: 'work', icon: Slack, color: '#4A154B', popular: true },
    { id: 'microsoft', name: 'Microsoft', category: 'work', icon: Globe, color: '#00A4EF', popular: true },
    { id: 'notion', name: 'Notion', category: 'work', icon: Globe, color: '#000000', popular: true },
    { id: 'discord', name: 'Discord', category: 'work', icon: MessageSquare, color: '#5865F2', popular: true },
    { id: 'zoom', name: 'Zoom', category: 'work', icon: Globe, color: '#2D8CFF', popular: false },
    { id: 'teams', name: 'Microsoft Teams', category: 'work', icon: Globe, color: '#6264A7', popular: false },
    { id: 'asana', name: 'Asana', category: 'work', icon: Globe, color: '#F06A6A', popular: false },
    { id: 'trello', name: 'Trello', category: 'work', icon: Globe, color: '#0052CC', popular: false },
    { id: 'monday', name: 'Monday.com', category: 'work', icon: Globe, color: '#FF3D57', popular: false },
    { id: 'clickup', name: 'ClickUp', category: 'work', icon: Globe, color: '#7B68EE', popular: false },
    { id: 'basecamp', name: 'Basecamp', category: 'work', icon: Globe, color: '#1D2D35', popular: false },
    { id: 'jira', name: 'Jira', category: 'work', icon: Globe, color: '#0052CC', popular: false },
    { id: 'confluence', name: 'Confluence', category: 'work', icon: Globe, color: '#172B4D', popular: false },
    { id: 'dropbox', name: 'Dropbox', category: 'work', icon: Globe, color: '#0061FF', popular: false },
    { id: 'box', name: 'Box', category: 'work', icon: Globe, color: '#0061D5', popular: false },
    { id: 'onedrive', name: 'OneDrive', category: 'work', icon: Globe, color: '#0078D4', popular: false },
    { id: 'googledrive', name: 'Google Drive', category: 'work', icon: Globe, color: '#4285F4', popular: false },
    
    // Developer
    { id: 'github', name: 'GitHub', category: 'developer', icon: Github, color: '#181717', popular: true },
    { id: 'gitlab', name: 'GitLab', category: 'developer', icon: Globe, color: '#FC6D26', popular: false },
    { id: 'bitbucket', name: 'Bitbucket', category: 'developer', icon: Globe, color: '#0052CC', popular: false },
    { id: 'stackoverflow', name: 'Stack Overflow', category: 'developer', icon: Globe, color: '#F58025', popular: false },
    { id: 'npm', name: 'npm', category: 'developer', icon: Globe, color: '#CB3837', popular: false },
    { id: 'docker', name: 'Docker', category: 'developer', icon: Globe, color: '#2496ED', popular: false },
    { id: 'heroku', name: 'Heroku', category: 'developer', icon: Globe, color: '#430098', popular: false },
    { id: 'vercel', name: 'Vercel', category: 'developer', icon: Globe, color: '#000000', popular: false },
    { id: 'netlify', name: 'Netlify', category: 'developer', icon: Globe, color: '#00C7B7', popular: false },
    { id: 'aws', name: 'AWS', category: 'developer', icon: Globe, color: '#FF9900', popular: false },
    { id: 'azure', name: 'Azure', category: 'developer', icon: Globe, color: '#0089D6', popular: false },
    { id: 'digitalocean', name: 'DigitalOcean', category: 'developer', icon: Globe, color: '#0080FF', popular: false },
    { id: 'firebase', name: 'Firebase', category: 'developer', icon: Globe, color: '#FFCA28', popular: false },
    { id: 'supabase', name: 'Supabase', category: 'developer', icon: Globe, color: '#3ECF8E', popular: false },
    { id: 'figma', name: 'Figma', category: 'developer', icon: Globe, color: '#F24E1E', popular: false },
    { id: 'codepen', name: 'CodePen', category: 'developer', icon: Globe, color: '#000000', popular: false },
    
    // Email
    { id: 'gmail', name: 'Gmail', category: 'email', icon: Mail, color: '#EA4335', popular: true },
    { id: 'outlook', name: 'Outlook', category: 'email', icon: Mail, color: '#0078D4', popular: true },
    { id: 'yahoo', name: 'Yahoo Mail', category: 'email', icon: Mail, color: '#6001D2', popular: false },
    { id: 'proton', name: 'ProtonMail', category: 'email', icon: Mail, color: '#6D4AFF', popular: false },
    
    // Phone
    { id: 'phone', name: 'Phone Number', category: 'phone', icon: Phone, color: '#10B981', popular: true },
    
    // More (generate 30+ more placeholder integrations)
    ...Array.from({ length: 30 }, (_, i) => ({
      id: `integration-${i}`,
      name: `Integration ${i + 1}`,
      category: ['social', 'work', 'messaging', 'developer', 'other'][i % 5],
      icon: Globe,
      color: '#6B7280',
      popular: false,
    })),
  ];

  const categories = [
    { id: 'all', name: 'All', count: integrations.length },
    { id: 'social', name: 'Social', count: integrations.filter(i => i.category === 'social').length },
    { id: 'work', name: 'Work', count: integrations.filter(i => i.category === 'work').length },
    { id: 'messaging', name: 'Messaging', count: integrations.filter(i => i.category === 'messaging').length },
    { id: 'developer', name: 'Developer', count: integrations.filter(i => i.category === 'developer').length },
    { id: 'email', name: 'Email', count: integrations.filter(i => i.category === 'email').length },
    { id: 'phone', name: 'Phone', count: integrations.filter(i => i.category === 'phone').length },
  ];

  const filteredIntegrations = integrations
    .filter(integration => {
      const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Sort popular first
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return a.name.localeCompare(b.name);
    });

  const popularIntegrations = integrations.filter(i => i.popular);

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top Navigation Header */}
      <AuthHeader onLogoClick={onLogoClick} />
      
      {/* Header with Search and Categories */}
      <div className="bg-card border-b border-border sticky top-[72px] z-10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-start gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="mt-1 flex-shrink-0"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-foreground mb-1.5">All Login Methods</h1>
              <p className="text-sm text-muted-foreground">
                Sign in with any of your existing accounts • {integrations.length}+ integrations
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search integrations..."
              className="pl-9 pr-9 h-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-all",
                  "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2",
                  selectedCategory === category.id
                    ? "bg-primary text-white border-primary"
                    : "bg-card border-border text-foreground hover:bg-muted hover:border-border"
                )}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8 flex-1">
        {/* Popular for your region */}
        {!searchQuery && selectedCategory === 'all' && popularIntegrations.length > 0 && (
          <div className="mb-10">
            <h2 className="text-foreground font-medium mb-4">
              Popular in your region
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {popularIntegrations.map(integration => (
                <button
                  key={integration.id}
                  onClick={() => onSelectMethod(integration.id)}
                  className={cn(
                    "bg-card border border-border rounded-lg p-4",
                    "hover:border-primary/30 hover:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "transition-all group"
                  )}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div 
                      className="size-11 rounded-lg flex items-center justify-center bg-muted group-hover:bg-accent transition-colors"
                    >
                      <integration.icon 
                        className="size-5.5"
                        style={{ color: integration.color }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground text-center leading-tight">
                      {integration.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* All Integrations */}
        <div>
          <h2 className="text-foreground font-medium mb-4">
            {searchQuery ? `Results for "${searchQuery}"` : 'All integrations'}
            <span className="text-sm text-muted-foreground font-normal ml-2">
              ({filteredIntegrations.length})
            </span>
          </h2>

          {filteredIntegrations.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-lg">
              <div className="inline-flex items-center justify-center size-12 rounded-full bg-muted mb-3">
                <Search className="size-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">No integrations found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredIntegrations.map(integration => (
                <button
                  key={integration.id}
                  onClick={() => onSelectMethod(integration.id)}
                  className={cn(
                    "bg-card border border-border rounded-lg p-4",
                    "hover:border-primary/30 hover:bg-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    "transition-all group"
                  )}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div 
                      className="size-11 rounded-lg flex items-center justify-center bg-muted group-hover:bg-accent transition-colors"
                    >
                      <integration.icon 
                        className="size-5.5"
                        style={{ color: integration.color }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground text-center leading-tight">
                      {integration.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
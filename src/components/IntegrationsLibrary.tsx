import { useState } from 'react';
import { 
  Search, Filter, Grid3x3, List, Video, Mail, CreditCard, BarChart3, 
  MessageSquare, Zap, GraduationCap, Share2, Shield, Code, 
  CheckCircle, Star, ExternalLink, X, ArrowLeft, Calendar, 
  Users, Link as LinkIcon, Globe, Smartphone, Clock, Target,
  TrendingUp, DollarSign, FileText, Headphones, Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Integration {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  icon: any;
  popular?: boolean;
  verified?: boolean;
  connected?: boolean;
  features: string[];
  permissions: string[];
  setupSteps: string[];
}

const integrations: Integration[] = [
  // Video & Conferencing
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Video conferencing for events',
    longDescription: 'Host virtual events, webinars, and meetings directly from your community with Zoom integration.',
    category: 'Video & Conferencing',
    icon: Video,
    popular: true,
    verified: true,
    connected: true,
    features: ['Host meetings', 'Webinars', 'Recording', 'Screen sharing', 'Breakout rooms'],
    permissions: ['Create meetings', 'Access participant data'],
    setupSteps: ['Sign in with Zoom', 'Grant permissions', 'Configure default settings']
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    description: 'Google video meetings',
    longDescription: 'Integrate Google Meet for seamless video calls with your community members.',
    category: 'Video & Conferencing',
    icon: Video,
    verified: true,
    features: ['Video calls', 'Screen sharing', 'Live captions'],
    permissions: ['Create meetings', 'Access calendar'],
    setupSteps: ['Connect Google account', 'Authorize access', 'Set preferences']
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Enterprise communication',
    longDescription: 'Connect with Microsoft Teams for professional collaboration and communication.',
    category: 'Video & Conferencing',
    icon: Users,
    verified: true,
    features: ['Team meetings', 'Chat', 'File sharing'],
    permissions: ['Create meetings', 'Access user data'],
    setupSteps: ['Sign in with Microsoft', 'Configure integration', 'Test connection']
  },
  
  // Marketing & Email
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing automation',
    longDescription: 'Sync your community members with Mailchimp for powerful email campaigns and automation.',
    category: 'Marketing & Email',
    icon: Mail,
    popular: true,
    verified: true,
    features: ['Email campaigns', 'Audience sync', 'Analytics', 'Automation workflows'],
    permissions: ['Manage audiences', 'Send campaigns'],
    setupSteps: ['Connect Mailchimp account', 'Select audience', 'Configure sync settings']
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Transactional email service',
    longDescription: 'Send automated emails and newsletters to your community with SendGrid.',
    category: 'Marketing & Email',
    icon: Mail,
    verified: true,
    features: ['Transactional emails', 'Templates', 'Analytics'],
    permissions: ['Send emails', 'Manage templates'],
    setupSteps: ['Add API key', 'Verify sender', 'Configure templates']
  },
  {
    id: 'convertkit',
    name: 'ConvertKit',
    description: 'Creator email platform',
    longDescription: 'Build your email list and create automated sequences for your community.',
    category: 'Marketing & Email',
    icon: Mail,
    features: ['Email sequences', 'Landing pages', 'Forms'],
    permissions: ['Manage subscribers', 'Create forms'],
    setupSteps: ['Connect account', 'Configure settings', 'Import subscribers']
  },

  // Payments & Billing
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing',
    longDescription: 'Accept payments, manage subscriptions, and monetize your community with Stripe.',
    category: 'Payments & Billing',
    icon: CreditCard,
    popular: true,
    verified: true,
    connected: true,
    features: ['Accept payments', 'Subscriptions', 'Invoicing', 'Refunds'],
    permissions: ['Process payments', 'Access customer data'],
    setupSteps: ['Connect Stripe account', 'Configure payment methods', 'Set up webhooks']
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Online payment solution',
    longDescription: 'Accept PayPal payments from members worldwide.',
    category: 'Payments & Billing',
    icon: DollarSign,
    verified: true,
    features: ['Accept payments', 'Recurring billing', 'Refunds'],
    permissions: ['Process transactions'],
    setupSteps: ['Link PayPal account', 'Configure settings', 'Test payment flow']
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    description: 'Indian payment gateway',
    longDescription: 'Accept payments in India with support for UPI, cards, and wallets.',
    category: 'Payments & Billing',
    icon: CreditCard,
    verified: true,
    features: ['Multiple payment methods', 'Subscriptions', 'Payment links'],
    permissions: ['Process payments'],
    setupSteps: ['Create Razorpay account', 'Get API keys', 'Configure webhook']
  },

  // Analytics & Insights
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track community analytics',
    longDescription: 'Get detailed insights about your community engagement and growth.',
    category: 'Analytics & Insights',
    icon: BarChart3,
    popular: true,
    verified: true,
    features: ['User tracking', 'Event tracking', 'Custom reports', 'Real-time data'],
    permissions: ['Track user behavior', 'Access analytics data'],
    setupSteps: ['Add tracking ID', 'Configure events', 'Verify installation']
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    description: 'Product analytics',
    longDescription: 'Track user behavior and build funnels to understand engagement.',
    category: 'Analytics & Insights',
    icon: TrendingUp,
    verified: true,
    features: ['User analytics', 'Funnels', 'Retention reports'],
    permissions: ['Track events', 'Access user data'],
    setupSteps: ['Get project token', 'Install tracking', 'Configure events']
  },
  {
    id: 'amplitude',
    name: 'Amplitude',
    description: 'Digital analytics',
    longDescription: 'Understand user behavior with powerful analytics and insights.',
    category: 'Analytics & Insights',
    icon: BarChart3,
    features: ['Behavioral analytics', 'Cohort analysis', 'Predictions'],
    permissions: ['Track events'],
    setupSteps: ['Create project', 'Add API key', 'Configure tracking']
  },

  // Communication
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team communication',
    longDescription: 'Cross-post community updates to your Slack workspace and enable two-way sync.',
    category: 'Communication',
    icon: MessageSquare,
    popular: true,
    verified: true,
    features: ['Cross-posting', 'Notifications', 'Channel sync', 'Bot commands'],
    permissions: ['Post messages', 'Read channels'],
    setupSteps: ['Install Slack app', 'Authorize workspace', 'Map channels']
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Gaming & community chat',
    longDescription: 'Bridge your community with Discord for voice, video, and text chat.',
    category: 'Communication',
    icon: MessageSquare,
    popular: true,
    verified: true,
    features: ['Server sync', 'Role mapping', 'Notifications'],
    permissions: ['Manage server', 'Send messages'],
    setupSteps: ['Authorize Discord bot', 'Select server', 'Configure roles']
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Messaging platform',
    longDescription: 'Connect your community with Telegram for instant messaging.',
    category: 'Communication',
    icon: Smartphone,
    features: ['Bot integration', 'Group sync', 'Notifications'],
    permissions: ['Send messages'],
    setupSteps: ['Create bot', 'Get token', 'Configure commands']
  },

  // Automation & Productivity
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect to 5000+ apps',
    longDescription: 'Automate workflows by connecting your community with thousands of apps.',
    category: 'Automation & Productivity',
    icon: Zap,
    popular: true,
    verified: true,
    features: ['Workflow automation', '5000+ app integrations', 'Multi-step zaps'],
    permissions: ['Trigger actions', 'Read data'],
    setupSteps: ['Connect Zapier account', 'Create zaps', 'Test automation']
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Event synchronization',
    longDescription: 'Sync community events with Google Calendar for better scheduling.',
    category: 'Automation & Productivity',
    icon: Calendar,
    verified: true,
    features: ['Event sync', 'Reminders', 'Calendar sharing'],
    permissions: ['Manage calendars', 'Create events'],
    setupSteps: ['Connect Google account', 'Select calendar', 'Configure sync']
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'All-in-one workspace',
    longDescription: 'Sync community data with Notion databases for documentation and planning.',
    category: 'Automation & Productivity',
    icon: FileText,
    features: ['Database sync', 'Page creation', 'Webhooks'],
    permissions: ['Create pages', 'Update databases'],
    setupSteps: ['Authorize Notion', 'Select workspace', 'Map fields']
  },
];

const categories = [
  { id: 'all', name: 'All Integrations', icon: Grid3x3 },
  { id: 'Video & Conferencing', name: 'Video & Conferencing', icon: Video },
  { id: 'Marketing & Email', name: 'Marketing & Email', icon: Mail },
  { id: 'Payments & Billing', name: 'Payments & Billing', icon: CreditCard },
  { id: 'Analytics & Insights', name: 'Analytics & Insights', icon: BarChart3 },
  { id: 'Communication', name: 'Communication', icon: MessageSquare },
  { id: 'Automation & Productivity', name: 'Automation & Productivity', icon: Zap },
];

interface IntegrationsLibraryProps {
  onBack?: () => void;
}

export function IntegrationsLibrary({ onBack }: IntegrationsLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionStep, setConnectionStep] = useState(1);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const connectedCount = integrations.filter(i => i.connected).length;

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowConnectionModal(true);
    setConnectionStep(1);
  };

  const handleOAuthRedirect = () => {
    // Simulate OAuth redirect
    window.open('https://example.com/oauth/authorize', '_blank');
    setConnectionStep(3);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <button 
                  onClick={() => onBack ? onBack() : window.close()}
                  className="hover:text-gray-900 flex items-center gap-1"
                >
                  <ArrowLeft className="size-4" />
                  Back to Settings
                </button>
              </div>
              <h1 className="text-2xl text-gray-900 mb-2">Integration Library</h1>
              <p className="text-sm text-gray-600">
                Connect your favorite tools and automate your workflow
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                  {connectedCount} Connected
                </Badge>
                <Badge className="bg-gray-100 text-gray-700 border-gray-200">
                  {integrations.length} Available
                </Badge>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                <Grid3x3 className="size-4 text-gray-600" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
              >
                <List className="size-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Categories */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm text-gray-900 mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map(category => {
                  const count = category.id === 'all' 
                    ? integrations.length 
                    : integrations.filter(i => i.category === category.id).length;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-purple-50 text-purple-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <category.icon className="size-4" />
                        <span>{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content - Integrations Grid/List */}
          <div className="flex-1">
            {filteredIntegrations.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <Search className="size-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm text-gray-900 mb-1">No integrations found</h3>
                <p className="text-sm text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-3'
              }>
                {filteredIntegrations.map(integration => (
                  <div
                    key={integration.id}
                    className={`bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer ${
                      viewMode === 'list' ? 'flex items-center gap-4' : ''
                    }`}
                    onClick={() => setSelectedIntegration(integration)}
                  >
                    <div className={`flex items-start ${viewMode === 'list' ? 'gap-4 flex-1' : 'justify-between mb-3'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${
                          viewMode === 'list' ? 'size-12' : 'size-10'
                        }`}>
                          <integration.icon className={viewMode === 'list' ? 'size-6' : 'size-5'} />
                        </div>
                        {viewMode === 'list' && (
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm text-gray-900 font-medium">{integration.name}</p>
                              {integration.verified && (
                                <CheckCircle className="size-4 text-blue-600" />
                              )}
                              {integration.connected && (
                                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                                  Connected
                                </Badge>
                              )}
                              {integration.popular && (
                                <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{integration.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{integration.category}</p>
                          </div>
                        )}
                      </div>
                      {viewMode === 'grid' && (
                        <div className="flex items-center gap-1">
                          {integration.verified && (
                            <CheckCircle className="size-4 text-blue-600" />
                          )}
                          {integration.popular && (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {viewMode === 'grid' && (
                      <>
                        <div className="mb-3">
                          <p className="text-sm text-gray-900 font-medium mb-1">{integration.name}</p>
                          <p className="text-xs text-gray-600 mb-2">{integration.description}</p>
                          <p className="text-xs text-gray-500">{integration.category}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {integration.connected ? (
                            <>
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs flex-1 justify-center">
                                <CheckCircle className="size-3 mr-1" />
                                Connected
                              </Badge>
                              <Button variant="outline" size="sm">
                                <Settings className="size-3" />
                              </Button>
                            </>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleConnect(integration);
                              }}
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      </>
                    )}

                    {viewMode === 'list' && (
                      <div className="flex items-center gap-2">
                        {integration.connected ? (
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConnect(integration);
                            }}
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Integration Detail Sidebar */}
      {selectedIntegration && !showConnectionModal && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 shadow-xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <selectedIntegration.icon className="size-6 text-gray-700" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg text-gray-900">{selectedIntegration.name}</h2>
                    {selectedIntegration.verified && (
                      <CheckCircle className="size-4 text-blue-600" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{selectedIntegration.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedIntegration(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm text-gray-900 mb-2">About</h3>
                <p className="text-sm text-gray-600">{selectedIntegration.longDescription}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm text-gray-900 mb-2">Features</h3>
                <div className="space-y-2">
                  {selectedIntegration.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h3 className="text-sm text-gray-900 mb-2">Required Permissions</h3>
                <div className="space-y-2">
                  {selectedIntegration.permissions.map((permission, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <Shield className="size-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-gray-200">
                {selectedIntegration.connected ? (
                  <div className="space-y-2">
                    <Badge className="bg-green-100 text-green-700 border-green-200 w-full justify-center py-2">
                      <CheckCircle className="size-4 mr-2" />
                      Connected
                    </Badge>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleConnect(selectedIntegration)}
                  >
                    Connect {selectedIntegration.name}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connection Modal */}
      {showConnectionModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg text-gray-900">Connect {selectedIntegration.name}</h2>
                <button
                  onClick={() => setShowConnectionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="size-5" />
                </button>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className={`size-8 rounded-full flex items-center justify-center text-sm ${
                      step <= connectionStep 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step < connectionStep ? <CheckCircle className="size-4" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`flex-1 h-0.5 ${
                        step < connectionStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              {connectionStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-900 mb-2">Configuration</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Configure how {selectedIntegration.name} works with your community.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-700 mb-1 block">Display Name</label>
                      <input
                        type="text"
                        defaultValue={selectedIntegration.name}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 mb-1 block">Description</label>
                      <textarea
                        defaultValue={selectedIntegration.description}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setShowConnectionModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={() => setConnectionStep(2)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {connectionStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-900 mb-2">Authorize Access</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      You'll be redirected to {selectedIntegration.name} to authorize the connection.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm text-gray-900 mb-2">Permissions Required:</h4>
                    <div className="space-y-2">
                      {selectedIntegration.permissions.map((permission, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <Shield className="size-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <span>{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setConnectionStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={handleOAuthRedirect}
                    >
                      Authorize
                      <ExternalLink className="size-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {connectionStep === 3 && (
                <div className="space-y-4 text-center py-6">
                  <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="size-8 text-green-600" />
                  </div>
                  <h3 className="text-lg text-gray-900">Successfully Connected!</h3>
                  <p className="text-sm text-gray-600">
                    {selectedIntegration.name} is now connected to your community.
                  </p>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      setShowConnectionModal(false);
                      setSelectedIntegration(null);
                    }}
                  >
                    Done
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
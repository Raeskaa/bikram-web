import React, { useState } from 'react';
import { X, ChevronLeft, Check, ExternalLink, Shield, Users, Star, TrendingUp, Zap, ArrowRight, Activity, Clock, BarChart3, Settings as SettingsIcon, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface SetupOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  bestFor: string;
  permissions: string[];
  steps: ConfigStep[];
}

interface ConfigStep {
  title: string;
  description: string;
  type: 'oauth' | 'select' | 'checkbox' | 'input';
  options?: { label: string; value: string }[];
  permissions?: string[];
}

interface ActivityMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down';
}

interface Integration {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  longDescription: string;
  verified: boolean;
  popular: boolean;
  connected: boolean;
  installs: number;
  rating: number;
  features: string[];
  useCases: string[];
  permissions: string[];
  setupOptions: SetupOption[];
  activity?: {
    lastSynced: string;
    metrics: ActivityMetric[];
    automations: { name: string; active: boolean }[];
  };
}

interface IntegrationDetailPanelProps {
  integration: Integration;
  onClose: () => void;
  onConnect: (integrationId: string, setupOptionId: string, config: any) => void;
  onDisconnect?: (integrationId: string) => void;
}

export function IntegrationDetailPanel({ integration, onClose, onConnect, onDisconnect }: IntegrationDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'setup' | 'configuration' | 'activity' | 'settings' | 'logs'>(
    integration.connected ? 'activity' : 'overview'
  );
  const [selectedSetupOption, setSelectedSetupOption] = useState<SetupOption | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [configData, setConfigData] = useState<any>({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  const tabs = integration.connected 
    ? [
        { id: 'activity' as const, label: 'Activity', icon: Activity },
        { id: 'settings' as const, label: 'Settings', icon: SettingsIcon },
        { id: 'logs' as const, label: 'Logs', icon: Clock },
        { id: 'overview' as const, label: 'About', icon: AlertCircle },
      ]
    : [
        { id: 'overview' as const, label: 'Overview' },
        { id: 'setup' as const, label: 'Setup Options' },
        { id: 'configuration' as const, label: 'Configuration', disabled: !selectedSetupOption },
      ];

  const handleSelectSetup = (option: SetupOption) => {
    setSelectedSetupOption(option);
    setCurrentStep(0);
    setIsAuthorized(false);
    setConfigData({});
    setActiveTab('configuration');
  };

  const handleAuthorize = () => {
    // Simulate OAuth flow
    setIsAuthorized(true);
    setCurrentStep(currentStep + 1);
  };

  const handleNextStep = () => {
    if (selectedSetupOption && currentStep < selectedSetupOption.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCompleteSetup = () => {
    if (selectedSetupOption) {
      onConnect(integration.id, selectedSetupOption.id, configData);
      setActiveTab('activity');
    }
  };

  const handleDisconnect = () => {
    if (onDisconnect) {
      onDisconnect(integration.id);
      onClose();
    }
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[600px] bg-white border-l border-gray-200 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center text-2xl">
            {integration.logo}
          </div>
          <div className="flex-1">
            <h2 className="text-xl text-gray-900 mb-1">{integration.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{integration.description}</p>
            <div className="flex items-center gap-2 flex-wrap">
              {integration.verified && (
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                  <Check className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              {integration.popular && (
                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              <span className="text-xs text-gray-500">
                <Users className="w-3 h-3 inline mr-1" />
                {integration.installs.toLocaleString()} installs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 px-6">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              disabled={tab.disabled}
              className={`pb-3 text-sm transition-colors relative ${
                activeTab === tab.id
                  ? 'text-purple-600'
                  : tab.disabled
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">What it does</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{integration.longDescription}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Key Features</h3>
                <div className="space-y-2">
                  {integration.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Perfect for</h3>
                <div className="space-y-2">
                  {integration.useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Permissions Required</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {integration.permissions.map((permission, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!integration.connected && (
                <Button
                  onClick={() => setActiveTab('setup')}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                >
                  Choose Setup Option
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          )}

          {/* Setup Options Tab */}
          {activeTab === 'setup' && (
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">How do you want to use {integration.name}?</h3>
                <p className="text-xs text-gray-600">Choose the setup that best fits your needs</p>
              </div>

              {integration.setupOptions.map((option) => (
                <div
                  key={option.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer group"
                  onClick={() => handleSelectSetup(option)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl mt-1">{option.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {option.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2 leading-relaxed">{option.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          <Zap className="w-3 h-3 inline mr-1" />
                          Best for: {option.bestFor}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                        >
                          Select This Setup
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Configuration Tab */}
          {activeTab === 'configuration' && selectedSetupOption && (
            <div className="space-y-6">
              {/* Setup Type Banner */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedSetupOption.icon}</span>
                    <div>
                      <p className="text-xs text-purple-600 font-medium mb-1">Setup Type</p>
                      <p className="text-sm text-gray-900">{selectedSetupOption.title}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActiveTab('setup')}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Change
                  </Button>
                </div>
              </div>

              {/* Steps Progress */}
              <div className="flex items-center gap-2">
                {selectedSetupOption.steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div
                      className={`flex-1 h-1 rounded-full transition-colors ${
                        idx <= currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    />
                  </React.Fragment>
                ))}
              </div>

              {/* Current Step */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Step {currentStep + 1} of {selectedSetupOption.steps.length}: {selectedSetupOption.steps[currentStep].title}
                </h3>
                <p className="text-xs text-gray-600 mb-4">{selectedSetupOption.steps[currentStep].description}</p>

                {/* Step Content */}
                {selectedSetupOption.steps[currentStep].type === 'oauth' && (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                      <p className="text-sm text-gray-900 mb-3">Grant TrueLeap permission to:</p>
                      <div className="space-y-2">
                        {selectedSetupOption.steps[currentStep].permissions?.map((perm, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-gray-600">{perm}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {!isAuthorized ? (
                      <Button
                        onClick={handleAuthorize}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                      >
                        Authorize with {integration.name}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Authorization successful!</span>
                      </div>
                    )}
                  </div>
                )}

                {selectedSetupOption.steps[currentStep].type === 'select' && (
                  <div className="space-y-3">
                    <select
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                      onChange={(e) => setConfigData({ ...configData, [selectedSetupOption.steps[currentStep].title]: e.target.value })}
                    >
                      <option value="">Select an option...</option>
                      {selectedSetupOption.steps[currentStep].options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedSetupOption.steps[currentStep].type === 'checkbox' && (
                  <div className="space-y-3">
                    {selectedSetupOption.steps[currentStep].options?.map((opt) => (
                      <label key={opt.value} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1"
                          onChange={(e) => {
                            const current = configData[selectedSetupOption.steps[currentStep].title] || [];
                            setConfigData({
                              ...configData,
                              [selectedSetupOption.steps[currentStep].title]: e.target.checked
                                ? [...current, opt.value]
                                : current.filter((v: string) => v !== opt.value),
                            });
                          }}
                        />
                        <div>
                          <p className="text-sm text-gray-900">{opt.label}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && integration.connected && integration.activity && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Connected & Active</p>
                  <p className="text-xs text-gray-600">Last synced {integration.activity.lastSynced}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-700"
                  onClick={() => console.log('Testing connection...')}
                >
                  Test Connection
                </Button>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Activity Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {integration.activity.metrics.map((metric, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                      <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg text-gray-900">{metric.value}</p>
                        {metric.trend && (
                          <TrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Active Automations</h3>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-700 text-xs"
                  >
                    + Add Automation
                  </Button>
                </div>
                <div className="space-y-2">
                  {integration.activity.automations.map((auto, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${auto.active ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                        <div>
                          <span className="text-sm text-gray-900">{auto.name}</span>
                          <p className="text-xs text-gray-500">{auto.active ? 'Running' : 'Paused'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-gray-600 hover:text-gray-900">
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={auto.active} onChange={() => {}} className="sr-only peer" />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
                    <p className="text-sm text-gray-900 mb-1">View Synced Data</p>
                    <p className="text-xs text-gray-600">See all imported content</p>
                  </button>
                  <button className="px-4 py-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
                    <p className="text-sm text-gray-900 mb-1">Force Sync</p>
                    <p className="text-xs text-gray-600">Refresh data now</p>
                  </button>
                  <button className="px-4 py-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
                    <p className="text-sm text-gray-900 mb-1">Export Logs</p>
                    <p className="text-xs text-gray-600">Download activity data</p>
                  </button>
                  <button className="px-4 py-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
                    <p className="text-sm text-gray-900 mb-1">View Documentation</p>
                    <p className="text-xs text-gray-600">Setup guides & FAQs</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && integration.connected && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Connection Settings</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-900">Account Connected</p>
                        <p className="text-xs text-gray-600">user@example.com</p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700">
                        Change Account
                      </Button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900">Auto-Sync</p>
                        <p className="text-xs text-gray-600">Automatically sync data every hour</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900">Notifications</p>
                        <p className="text-xs text-gray-600">Get notified about sync issues</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Data Management</h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900">Sync Frequency</p>
                        <p className="text-xs text-gray-600">How often to sync data</p>
                      </div>
                      <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option>Every 15 minutes</option>
                        <option selected>Every hour</option>
                        <option>Every 6 hours</option>
                        <option>Daily</option>
                        <option>Manual only</option>
                      </select>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900">Data Retention</p>
                        <p className="text-xs text-gray-600">Keep logs and sync history</p>
                      </div>
                      <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600">
                        <option>7 days</option>
                        <option selected>30 days</option>
                        <option>90 days</option>
                        <option>1 year</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Permissions</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {integration.permissions.map((permission, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{permission}</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700 text-xs">
                      Reauthorize Permissions
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Danger Zone</h3>
                <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-900 mb-1">Disconnect Integration</p>
                      <p className="text-xs text-gray-600">This will stop all syncing and automations. Your data will be preserved.</p>
                    </div>
                    <Button
                      onClick={handleDisconnect}
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-300 hover:bg-red-100 flex-shrink-0"
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && integration.connected && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Activity Logs</h3>
                <div className="flex items-center gap-2">
                  <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-600">
                    <option>Last 24 hours</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>All time</option>
                  </select>
                  <Button size="sm" variant="ghost" className="text-purple-600 hover:text-purple-700 text-xs">
                    Export
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                {/* Sample log entries */}
                {[
                  { time: '2 minutes ago', type: 'success', message: 'Synced 247 messages from #updates channel' },
                  { time: '1 hour ago', type: 'success', message: 'Posted new event announcement' },
                  { time: '3 hours ago', type: 'info', message: 'Weekly digest automation triggered' },
                  { time: '5 hours ago', type: 'warning', message: 'Rate limit reached, retrying in 15 minutes' },
                  { time: '1 day ago', type: 'success', message: 'Connected 892 new members' },
                  { time: '1 day ago', type: 'error', message: 'Failed to sync: Invalid API token' },
                  { time: '2 days ago', type: 'success', message: 'Automation "Post new events" activated' },
                ].map((log, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      log.type === 'success' ? 'bg-green-500' :
                      log.type === 'error' ? 'bg-red-500' :
                      log.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{log.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{log.time}</p>
                    </div>
                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <button className="text-sm text-purple-600 hover:text-purple-700">
                  Load more logs
                </button>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Sticky Bottom Bar - Only show in configuration */}
      {activeTab === 'configuration' && selectedSetupOption && (
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : setActiveTab('setup')}
            >
              {currentStep > 0 ? 'Previous' : 'Cancel'}
            </Button>
            <Button
              onClick={currentStep === selectedSetupOption.steps.length - 1 ? handleCompleteSetup : handleNextStep}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              disabled={!isAuthorized && selectedSetupOption.steps[currentStep].type === 'oauth'}
            >
              {currentStep === selectedSetupOption.steps.length - 1 ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
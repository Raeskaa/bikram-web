import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Search, Wand2, Video, Users, GraduationCap, Briefcase,
  Coffee, Mic, Code, Palette, BarChart3, Heart, Star, Clock,
  Calendar, MapPin, DollarSign, Copy, Edit, Trash2, Plus,
  CheckCircle, Eye, TrendingUp
} from 'lucide-react';

interface EventTemplate {
  id: string;
  name: string;
  category: 'workshop' | 'webinar' | 'networking' | 'meetup' | 'conference' | 'course' | 'custom';
  description: string;
  icon: any;
  duration: number; // minutes
  capacity: number;
  pricing: 'free' | 'paid';
  suggestedPrice?: number;
  format: 'virtual' | 'in-person' | 'hybrid';
  features: string[];
  registrationFields: string[];
  popular?: boolean;
  customizable?: boolean;
  usageCount?: number;
}

interface EventTemplatesLibraryProps {
  onSelectTemplate: (template: EventTemplate) => void;
  onCreateCustom?: () => void;
}

const defaultTemplates: EventTemplate[] = [
  {
    id: 'workshop-tech',
    name: 'Technical Workshop',
    category: 'workshop',
    description: 'Hands-on technical training session with live coding and Q&A',
    icon: Code,
    duration: 120,
    capacity: 50,
    pricing: 'paid',
    suggestedPrice: 49,
    format: 'virtual',
    features: ['Live coding', 'Q&A session', 'Recording', 'Certificate'],
    registrationFields: ['name', 'email', 'experience_level', 'github'],
    popular: true,
    usageCount: 1247,
  },
  {
    id: 'webinar-sales',
    name: 'Product Webinar',
    category: 'webinar',
    description: 'Live product demonstration and presentation with audience interaction',
    icon: Video,
    duration: 60,
    capacity: 500,
    pricing: 'free',
    format: 'virtual',
    features: ['Screen sharing', 'Polls', 'Q&A', 'Recording'],
    registrationFields: ['name', 'email', 'company', 'role'],
    popular: true,
    usageCount: 2891,
  },
  {
    id: 'networking-mixer',
    name: 'Networking Mixer',
    category: 'networking',
    description: 'Casual networking event for professionals to connect',
    icon: Users,
    duration: 90,
    capacity: 100,
    pricing: 'free',
    format: 'in-person',
    features: ['Name tags', 'Icebreakers', 'Contact exchange'],
    registrationFields: ['name', 'email', 'company', 'linkedin'],
    usageCount: 543,
  },
  {
    id: 'course-online',
    name: 'Online Course Session',
    category: 'course',
    description: 'Structured learning session as part of a course curriculum',
    icon: GraduationCap,
    duration: 90,
    capacity: 30,
    pricing: 'paid',
    suggestedPrice: 99,
    format: 'virtual',
    features: ['Assignments', 'Certificate', 'Recording', 'Materials'],
    registrationFields: ['name', 'email', 'education', 'goals'],
    usageCount: 789,
  },
  {
    id: 'meetup-coffee',
    name: 'Coffee Chat Meetup',
    category: 'meetup',
    description: 'Informal gathering for casual conversations and knowledge sharing',
    icon: Coffee,
    duration: 60,
    capacity: 20,
    pricing: 'free',
    format: 'hybrid',
    features: ['Casual conversation', 'Open discussion'],
    registrationFields: ['name', 'email'],
    usageCount: 432,
  },
  {
    id: 'conference-virtual',
    name: 'Virtual Conference',
    category: 'conference',
    description: 'Multi-session conference with speakers, panels, and breakouts',
    icon: Mic,
    duration: 480,
    capacity: 1000,
    pricing: 'paid',
    suggestedPrice: 199,
    format: 'virtual',
    features: ['Multiple sessions', 'Speakers', 'Breakout rooms', 'Networking'],
    registrationFields: ['name', 'email', 'company', 'role', 'interests'],
    usageCount: 156,
  },
  {
    id: 'workshop-design',
    name: 'Design Workshop',
    category: 'workshop',
    description: 'Creative workshop focused on design principles and hands-on practice',
    icon: Palette,
    duration: 150,
    capacity: 25,
    pricing: 'paid',
    suggestedPrice: 79,
    format: 'virtual',
    features: ['Live design session', 'Feedback', 'Portfolio review'],
    registrationFields: ['name', 'email', 'portfolio_url', 'tools_used'],
    usageCount: 678,
  },
  {
    id: 'analytics-session',
    name: 'Analytics Review',
    category: 'workshop',
    description: 'Data analysis and insights sharing session',
    icon: BarChart3,
    duration: 90,
    capacity: 40,
    pricing: 'paid',
    suggestedPrice: 59,
    format: 'virtual',
    features: ['Data visualization', 'Report sharing', 'Q&A'],
    registrationFields: ['name', 'email', 'company', 'analytics_tool'],
    usageCount: 234,
  },
];

export function EventTemplatesLibrary({
  onSelectTemplate,
  onCreateCustom,
}: EventTemplatesLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<EventTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    { id: 'all', label: 'All Templates', count: defaultTemplates.length },
    { id: 'workshop', label: 'Workshops', count: defaultTemplates.filter(t => t.category === 'workshop').length },
    { id: 'webinar', label: 'Webinars', count: defaultTemplates.filter(t => t.category === 'webinar').length },
    { id: 'networking', label: 'Networking', count: defaultTemplates.filter(t => t.category === 'networking').length },
    { id: 'course', label: 'Courses', count: defaultTemplates.filter(t => t.category === 'course').length },
    { id: 'meetup', label: 'Meetups', count: defaultTemplates.filter(t => t.category === 'meetup').length },
  ];

  const filteredTemplates = defaultTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: EventTemplate) => {
    onSelectTemplate(template);
  };

  const handlePreview = (template: EventTemplate) => {
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const renderTemplateCard = (template: EventTemplate) => {
    const Icon = template.icon;
    
    return (
      <Card key={template.id} className="group hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="size-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm truncate">{template.name}</h4>
                {template.popular && (
                  <Badge className="bg-primary text-primary-foreground text-xs">Popular</Badge>
                )}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {template.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {template.duration}min
                </span>
                <span className="flex items-center gap-1">
                  <Users className="size-3" />
                  {template.capacity} max
                </span>
                {template.pricing === 'paid' && template.suggestedPrice && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="size-3" />
                    ${template.suggestedPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {template.features.slice(0, 3).map((feature, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {template.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{template.features.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => handleUseTemplate(template)}
            >
              Use Template
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePreview(template)}
            >
              <Eye className="size-3" />
            </Button>
          </div>

          {template.usageCount && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Used {template.usageCount.toLocaleString()} times
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Event Templates</h3>
            <p className="text-sm text-gray-600">
              Start with a pre-configured template and customize
            </p>
          </div>
          <Button variant="outline" onClick={onCreateCustom}>
            <Plus className="size-4 mr-2" />
            Blank Event
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id} className="flex items-center gap-2">
                {cat.label}
                <Badge variant="outline" className="text-xs">
                  {cat.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Popular Templates Highlight */}
        {selectedCategory === 'all' && searchQuery === '' && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Star className="size-5 text-primary" />
              <h4 className="font-medium">Most Popular</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Templates used by thousands of event creators
            </p>
            <div className="grid grid-cols-2 gap-3">
              {defaultTemplates
                .filter(t => t.popular)
                .slice(0, 2)
                .map(template => {
                  const Icon = template.icon;
                  return (
                    <button
                      key={template.id}
                      onClick={() => handleUseTemplate(template)}
                      className="p-3 bg-card rounded-lg border hover:border-primary transition-colors text-left"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="size-5 text-primary" />
                        <p className="font-medium text-sm">{template.name}</p>
                      </div>
                      <p className="text-xs text-gray-600">
                        {template.usageCount?.toLocaleString()} uses
                      </p>
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        {/* Templates Grid */}
        <ScrollArea className="h-[500px]">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <Search className="size-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No templates found</p>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search or category
              </p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 pb-4">
              {filteredTemplates.map(renderTemplateCard)}
            </div>
          )}
        </ScrollArea>

        {/* Create Custom CTA */}
        <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed">
          <div className="text-center">
            <Wand2 className="size-8 text-gray-400 mx-auto mb-2" />
            <p className="font-medium text-sm mb-1">Need something specific?</p>
            <p className="text-xs text-gray-600 mb-3">
              Create a custom event from scratch
            </p>
            <Button variant="outline" onClick={onCreateCustom}>
              <Plus className="size-4 mr-2" />
              Create Custom Event
            </Button>
          </div>
        </div>
      </div>

      {/* Template Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>
              Review what's included in this template
            </DialogDescription>
          </DialogHeader>

          {previewTemplate && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-4">
                <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <previewTemplate.icon className="size-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{previewTemplate.name}</h3>
                    {previewTemplate.popular && (
                      <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{previewTemplate.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="size-4 text-gray-600" />
                    <p className="text-xs font-medium">Duration</p>
                  </div>
                  <p className="text-sm">{previewTemplate.duration} minutes</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="size-4 text-gray-600" />
                    <p className="text-xs font-medium">Capacity</p>
                  </div>
                  <p className="text-sm">{previewTemplate.capacity} attendees</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="size-4 text-gray-600" />
                    <p className="text-xs font-medium">Format</p>
                  </div>
                  <p className="text-sm capitalize">{previewTemplate.format}</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="size-4 text-gray-600" />
                    <p className="text-xs font-medium">Pricing</p>
                  </div>
                  <p className="text-sm capitalize">
                    {previewTemplate.pricing}
                    {previewTemplate.suggestedPrice && ` ($${previewTemplate.suggestedPrice})`}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Included Features</h4>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.features.map((feature, i) => (
                    <Badge key={i} variant="outline">
                      <CheckCircle className="size-3 mr-1 text-green-600" />
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Registration Fields</h4>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.registrationFields.map((field, i) => (
                    <Badge key={i} variant="outline">
                      {field.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              {previewTemplate.usageCount && (
                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                  <TrendingUp className="size-5 text-primary" />
                  <div className="text-sm">
                    <p className="font-medium">Proven Template</p>
                    <p className="text-xs text-gray-600">
                      Successfully used {previewTemplate.usageCount.toLocaleString()} times
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                if (previewTemplate) {
                  handleUseTemplate(previewTemplate);
                  setShowPreview(false);
                }
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Use This Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
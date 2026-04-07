import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { RegistrationFormBuilder } from './RegistrationFormBuilder';
import { EventRegistrationForm } from './EventRegistrationForm';
import { AddToCalendar, EmailCalendarInvite } from './AddToCalendar';
import { WaitlistManagement } from './WaitlistManagement';
import { EventTemplatesLibrary } from './EventTemplatesLibrary';
import {
  ArrowLeft, CheckCircle, Calendar, Users, FileText, Clock,
  ListChecks, Sparkles
} from 'lucide-react';

interface Phase1DemoProps {
  onBack?: () => void;
}

export function Phase1Demo({ onBack }: Phase1DemoProps) {
  const [activeDemo, setActiveDemo] = useState<string>('overview');
  const [savedFormFields, setSavedFormFields] = useState<any[]>([]);

  // Demo data for components
  const sampleWaitlistEntries = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      joinedAt: '2025-02-10T14:30:00Z',
      position: 1,
      notified: false,
      status: 'waiting' as const,
      source: 'organic',
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      joinedAt: '2025-02-10T15:45:00Z',
      position: 2,
      notified: false,
      status: 'waiting' as const,
      source: 'linkedin',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      joinedAt: '2025-02-09T10:20:00Z',
      position: 3,
      notified: true,
      status: 'notified' as const,
      source: 'email',
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.k@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      joinedAt: '2025-02-08T16:10:00Z',
      position: 4,
      notified: true,
      status: 'claimed' as const,
      source: 'instagram',
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      joinedAt: '2025-02-07T09:30:00Z',
      position: 5,
      notified: true,
      status: 'expired' as const,
      source: 'referral',
    },
  ];

  const defaultFormFields = [
    {
      id: 'name',
      type: 'text' as const,
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
    },
    {
      id: 'email',
      type: 'email' as const,
      label: 'Email Address',
      placeholder: 'your.email@example.com',
      required: true,
    },
    {
      id: 'company',
      type: 'text' as const,
      label: 'Company',
      placeholder: 'Your company name',
      required: false,
    },
    {
      id: 'experience',
      type: 'select' as const,
      label: 'Experience Level',
      placeholder: 'Select your experience',
      required: true,
      options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    },
  ];

  const demos = [
    {
      id: 'form-builder',
      title: 'Registration Form Builder',
      description: 'Admin creates custom registration forms',
      icon: FileText,
      userFlow: 'Admin Flow A1',
      badge: 'Admin Tool',
      color: 'purple',
    },
    {
      id: 'registration-form',
      title: 'Event Registration Form',
      description: 'Learner registers for an event',
      icon: CheckCircle,
      userFlow: 'Learner Flow L3',
      badge: 'Learner Experience',
      color: 'blue',
    },
    {
      id: 'calendar',
      title: 'Add to Calendar',
      description: 'Calendar integration (.ics generation)',
      icon: Calendar,
      userFlow: 'Learner Flow L4',
      badge: 'Integration',
      color: 'green',
    },
    {
      id: 'waitlist',
      title: 'Waitlist Management',
      description: 'Admin manages event waitlist',
      icon: Users,
      userFlow: 'Admin Flow A3',
      badge: 'Admin Tool',
      color: 'orange',
    },
    {
      id: 'templates',
      title: 'Event Templates Library',
      description: 'Quick-start event creation',
      icon: Sparkles,
      userFlow: 'Admin Flow A1',
      badge: 'Admin Tool',
      color: 'purple',
    },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="size-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
          <ListChecks className="size-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Phase 1: Registration & Setup</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Complete prototype components for event registration, calendar integration, 
          waitlist management, and event templates. All built with clean shadcn components, 
          purple branding, and comprehensive edge case handling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demos.map((demo) => {
          const Icon = demo.icon;
          return (
            <Card 
              key={demo.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveDemo(demo.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{demo.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {demo.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {demo.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      User Flow: {demo.userFlow}
                    </p>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-primary hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDemo(demo.id);
                  }}
                >
                  View Demo
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <CheckCircle className="size-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's Included</h3>
              <ul className="space-y-1 text-sm text-foreground">
                <li>• All components use shadcn UI with purple primary branding</li>
                <li>• No gradients, flat design philosophy</li>
                <li>• Comprehensive dummy data for all scenarios</li>
                <li>• Loading, error, empty, and success states</li>
                <li>• Mobile responsive layouts</li>
                <li>• Ready for engineering handoff</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted">
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="size-4 mr-2" />
                  Back
                </Button>
              )}
              <div>
                <h1 className="text-xl font-bold">Phase 1 Demo</h1>
                <p className="text-sm text-muted-foreground">Event Platform Prototypes</p>
              </div>
            </div>
            <Badge className="bg-primary">5 Components</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeDemo === 'overview' ? (
          renderOverview()
        ) : (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setActiveDemo('overview')}
            >
              <ArrowLeft className="size-4 mr-2" />
              Back to Overview
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {demos.find(d => d.id === activeDemo)?.title}
                  </span>
                  <Badge variant="outline">
                    {demos.find(d => d.id === activeDemo)?.userFlow}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-280px)]">
                  {activeDemo === 'form-builder' && (
                    <RegistrationFormBuilder
                      eventId="demo-event-1"
                      onSave={(fields) => {
                        setSavedFormFields(fields);
                        alert('Form saved! Fields: ' + JSON.stringify(fields, null, 2));
                      }}
                      existingFields={savedFormFields.length > 0 ? savedFormFields : undefined}
                    />
                  )}

                  {activeDemo === 'registration-form' && (
                    <div className="space-y-8">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-foreground">
                          <strong>Demo Scenarios:</strong> Try different states by changing the props below
                        </p>
                      </div>

                      <Tabs defaultValue="free">
                        <TabsList className="mb-4">
                          <TabsTrigger value="free">Free Event</TabsTrigger>
                          <TabsTrigger value="paid">Paid Event</TabsTrigger>
                          <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
                          <TabsTrigger value="limited">Limited Spots</TabsTrigger>
                        </TabsList>

                        <TabsContent value="free">
                          <EventRegistrationForm
                            eventTitle="React 18 Deep Dive Workshop"
                            eventDate="March 15, 2025"
                            eventTime="2:00 PM EST"
                            eventType="virtual"
                            price={0}
                            capacity={100}
                            spotsLeft={45}
                            formFields={defaultFormFields}
                            onSubmit={(data) => {
                              console.log('Registration submitted:', data);
                              alert('Registration successful! Check console for data.');
                            }}
                            onCancel={() => alert('Registration cancelled')}
                          />
                        </TabsContent>

                        <TabsContent value="paid">
                          <EventRegistrationForm
                            eventTitle="Advanced TypeScript Masterclass"
                            eventDate="March 20, 2025"
                            eventTime="4:00 PM EST"
                            eventType="virtual"
                            price={99}
                            currency="USD"
                            capacity={50}
                            spotsLeft={12}
                            formFields={defaultFormFields}
                            onSubmit={(data) => {
                              console.log('Paid registration submitted:', data);
                              alert('Payment successful! Check console for data.');
                            }}
                            onCancel={() => alert('Registration cancelled')}
                          />
                        </TabsContent>

                        <TabsContent value="waitlist">
                          <EventRegistrationForm
                            eventTitle="Sold Out Event - Join Waitlist"
                            eventDate="March 25, 2025"
                            eventTime="6:00 PM EST"
                            eventType="in-person"
                            location="TechHub, San Francisco"
                            price={0}
                            capacity={30}
                            spotsLeft={0}
                            isWaitlist={true}
                            formFields={defaultFormFields}
                            onSubmit={(data) => {
                              console.log('Waitlist signup:', data);
                              alert('Added to waitlist! Check console for data.');
                            }}
                            onCancel={() => alert('Waitlist cancelled')}
                          />
                        </TabsContent>

                        <TabsContent value="limited">
                          <EventRegistrationForm
                            eventTitle="Exclusive Design Workshop"
                            eventDate="March 18, 2025"
                            eventTime="3:00 PM EST"
                            eventType="virtual"
                            price={79}
                            capacity={25}
                            spotsLeft={3}
                            formFields={defaultFormFields}
                            onSubmit={(data) => {
                              console.log('Registration submitted:', data);
                              alert('Registration successful! Only 2 spots left.');
                            }}
                            onCancel={() => alert('Registration cancelled')}
                          />
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}

                  {activeDemo === 'calendar' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="font-semibold mb-4">Add to Calendar - Dropdown Variant</h3>
                        <div className="flex justify-center p-8 bg-muted rounded-lg">
                          <AddToCalendar
                            eventTitle="React 18 Deep Dive Workshop"
                            eventDescription="Hands-on workshop exploring React 18 features including concurrent rendering, automatic batching, and Suspense."
                            startDate="2025-03-15T14:00:00"
                            endDate="2025-03-15T16:00:00"
                            location="Virtual"
                            meetingUrl="https://zoom.us/j/123456789"
                            timezone="America/New_York"
                            organizerEmail="events@leapspace.ai"
                            variant="dropdown"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Add to Calendar - Button Variant</h3>
                        <div className="max-w-md mx-auto">
                          <AddToCalendar
                            eventTitle="React 18 Deep Dive Workshop"
                            eventDescription="Hands-on workshop exploring React 18 features"
                            startDate="2025-03-15T14:00:00"
                            endDate="2025-03-15T16:00:00"
                            meetingUrl="https://zoom.us/j/123456789"
                            variant="button"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Email Calendar Invite</h3>
                        <div className="max-w-md mx-auto">
                          <EmailCalendarInvite
                            eventTitle="React 18 Deep Dive Workshop"
                            eventDescription="Hands-on workshop exploring React 18 features"
                            startDate="2025-03-15T14:00:00"
                            endDate="2025-03-15T16:00:00"
                            meetingUrl="https://zoom.us/j/123456789"
                            recipientEmail="john.doe@example.com"
                            recipientName="John Doe"
                            onSend={() => console.log('Calendar invite sent')}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDemo === 'waitlist' && (
                    <WaitlistManagement
                      eventId="demo-event-1"
                      eventTitle="React 18 Deep Dive Workshop"
                      capacity={50}
                      currentAttendees={48}
                      waitlistEntries={sampleWaitlistEntries}
                      autoPromotionEnabled={true}
                      notificationWindow={24}
                      onPromote={(entryId) => {
                        console.log('Promoting entry:', entryId);
                        alert(`Entry ${entryId} promoted from waitlist!`);
                      }}
                      onRemove={(entryId) => {
                        console.log('Removing entry:', entryId);
                        alert(`Entry ${entryId} removed from waitlist!`);
                      }}
                      onBulkNotify={(entryIds) => {
                        console.log('Bulk notify:', entryIds);
                        alert(`Notifying ${entryIds.length} people from waitlist!`);
                      }}
                      onUpdateSettings={(settings) => {
                        console.log('Settings updated:', settings);
                        alert('Waitlist settings saved!');
                      }}
                    />
                  )}

                  {activeDemo === 'templates' && (
                    <EventTemplatesLibrary
                      onSelectTemplate={(template) => {
                        console.log('Template selected:', template);
                        alert(`Using template: ${template.name}\n\nTemplate includes:\n- ${template.features.join('\n- ')}`);
                      }}
                      onCreateCustom={() => {
                        alert('Creating custom event from scratch...');
                      }}
                    />
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import {
  Calendar, Clock, Users, Video, Download,
  Award, Star, Eye, Bookmark, Link2,
  Send, HelpCircle, MessageCircle, DollarSign, Heart, Check
} from 'lucide-react';
import { EventShell } from './EventShell';

interface PublicEventLandingV4TabbedProps {
  event: any;
  onEnterLiveEvent: () => void;
  onJoinLeapSpace: () => void;
  ShareMenu: any;
  AddToCalendarButton: any;
  TrustBadges: any;
  isSaved: boolean;
  setIsSaved: (saved: boolean) => void;
  setAskOrganizerOpen: (open: boolean) => void;
  setAttendeeListOpen: (open: boolean) => void;
  spotsRemaining: number;
  isPaidEvent: boolean;
  hostStats: any;
  attendees: any[];
  attendeeStats: any;
  leapSpaceInfo: any;
  agenda: any[];
  whatsIncluded: any[];
  learningOutcomes: string[];
  resources: any;
  preWorkLinks: any[];
  reviews: any[];
  averageRating: number;
  totalReviews: number;
  faqs: any[];
  chatMessages: any[];
}

export function PublicEventLandingV4Tabbed({
  event,
  onEnterLiveEvent,
  onJoinLeapSpace,
  ShareMenu,
  AddToCalendarButton,
  TrustBadges,
  isSaved,
  setIsSaved,
  setAskOrganizerOpen,
  setAttendeeListOpen,
  spotsRemaining,
  isPaidEvent,
  hostStats,
  attendees,
  attendeeStats,
  leapSpaceInfo,
  agenda,
  whatsIncluded,
  learningOutcomes,
  resources,
  preWorkLinks,
  reviews,
  averageRating,
  totalReviews,
  faqs,
  chatMessages
}: PublicEventLandingV4TabbedProps) {
  const [activeLearnerTab, setActiveLearnerTab] = useState('overview');

  const headerActions = (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        className="size-9 rounded-lg" 
        onClick={() => setIsSaved(!isSaved)}
      >
        {isSaved ? <Bookmark className="size-4 fill-current" /> : <Bookmark className="size-4" />}
      </Button>
      <ShareMenu variant="minimal" />
      <AddToCalendarButton variant="minimal" />
      <Button onClick={onEnterLiveEvent} className="bg-primary hover:bg-primary/90 rounded-lg h-9 px-4 text-sm">
        Register Now
      </Button>
    </>
  );

  return (
    <EventShell
      role="learner"
      title={event.title}
      subtitle={`${event.startDate} • ${event.time} ${event.timezone}`}
      activeTab={activeLearnerTab}
      onTabChange={setActiveLearnerTab}
      headerActions={headerActions}
      counts={{
        agenda: agenda.length,
        attendees: event.registrationCount,
        reviews: totalReviews,
        discussion: 0 // Chat/Discussion count if available
      }}
    >
      <div className="h-full overflow-y-auto bg-muted">
          {/* Overview Tab */}
          {activeLearnerTab === 'overview' && (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              {/* Hero Image */}
              <div className="w-full aspect-[2/1] bg-muted rounded-2xl overflow-hidden relative">
                 {/* Fallback pattern or image if available */}
                 <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/60">
                    <Eye className="size-12 opacity-20" />
                 </div>
              </div>

              {/* Event Description - Title Removed */}
              <Card className="shadow-none border-border">
                <CardContent className="p-6">
                  {/* Removed duplicate h2 title here */}
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  
                  {/* Urgency */}
                  {spotsRemaining <= 20 && spotsRemaining > 0 && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-900">
                      <strong>{spotsRemaining} spots remaining</strong> • {hostStats.recentRegistrations} joined in last 24h
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Key Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isPaidEvent && (
                  <Card className="shadow-none border-border">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <DollarSign className="size-4" />
                        <span className="text-xs font-medium">Price</span>
                      </div>
                      <p className="font-semibold text-lg">₹799</p>
                      <p className="text-xs text-muted-foreground">Worth ₹2,500</p>
                    </CardContent>
                  </Card>
                )}

                <Card className="shadow-none border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Star className="size-4" />
                      <span className="text-xs font-medium">Host Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="size-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-sm">{hostStats.rating}</span>
                      <span className="text-xs text-muted-foreground">({hostStats.eventsHosted} events)</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Host Preview */}
              <Card className="shadow-none border-border">
                <CardContent className="p-6">
                  <p className="text-xs text-muted-foreground mb-3">Hosted by</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage src={event.hostAvatar} />
                      <AvatarFallback>{event.hostName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{event.hostName}</p>
                      <p className="text-sm text-muted-foreground">{event.hostBio}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-lg"
                      onClick={() => setAskOrganizerOpen(true)}
                    >
                      <HelpCircle className="size-3 mr-1" />
                      Ask
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof */}
              <Card className="shadow-none border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold">{event.registrationCount} registered</p>
                    <button 
                      className="text-xs text-primary font-medium hover:underline"
                      onClick={() => setAttendeeListOpen(true)}
                    >
                      View all
                    </button>
                  </div>
                  <div className="flex -space-x-2 mb-2">
                    {attendees?.slice(0, 10).map((p: any, i: number) => (
                      <Avatar key={i} className="size-9 border-2 border-white">
                        <AvatarImage src={p.avatar} />
                        <AvatarFallback>{p.name?.[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{attendeeStats.designers} designers • {attendeeStats.developers} developers</p>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              {isPaidEvent && (
                <Card className="shadow-none border-border">
                  <CardContent className="p-4">
                    <TrustBadges />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Agenda Tab */}
          {activeLearnerTab === 'agenda' && (
            <div className="max-w-4xl mx-auto p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Event Agenda</h2>
                <p className="text-sm text-muted-foreground">Total duration: {event.duration} minutes</p>
              </div>
              <Card className="shadow-none border-border">
                <CardContent className="p-6 space-y-4">
                  {agenda.map((item: any, i: number) => (
                    <div key={i} className="p-4 border border-border rounded-xl hover:border-muted-foreground/30 transition-colors">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center size-8 rounded-lg bg-muted text-primary font-semibold text-xs">
                            {item.time}
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{item.title}</h3>
                            <p className="text-xs text-muted-foreground">{item.duration}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground ml-11">{item.desc}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Learn Tab */}
          {activeLearnerTab === 'learn' && (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">What You'll Learn</h2>
                <p className="text-sm text-muted-foreground">Everything included in this event</p>
              </div>

              {/* What's Included */}
              <Card className="shadow-none border-border">
                <CardHeader>
                  <CardTitle className="text-lg">What's Included</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {whatsIncluded.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="flex items-center justify-center size-8 rounded-lg bg-muted flex-shrink-0">
                        <item.icon className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Learning Outcomes */}
              <Card className="shadow-none border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Learning Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {learningOutcomes.map((outcome: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{outcome}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certificates */}
              <Card className="shadow-none border-border bg-gradient-to-br from-muted to-background">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-primary">
                      <Award className="size-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Certificate of Completion</p>
                      <p className="text-sm text-muted-foreground">Get certified after attending this event</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Community Tab */}
          {activeLearnerTab === 'community' && (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Community</h2>
                <p className="text-sm text-muted-foreground">Connect with attendees and the host</p>
              </div>

              {/* Host Full Info */}
              <Card className="shadow-none border-border">
                <CardHeader>
                  <CardTitle className="text-lg">About the Host</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="size-16">
                      <AvatarImage src={event.hostAvatar} />
                      <AvatarFallback>{event.hostName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{event.hostName}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{event.hostBio}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          {hostStats.rating} rating
                        </span>
                        <span>•</span>
                        <span>{hostStats.eventsHosted} events hosted</span>
                        <span>•</span>
                        <span>{hostStats.totalAttendees.toLocaleString()} total attendees</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => setAskOrganizerOpen(true)}
                    >
                      <HelpCircle className="size-4 mr-2" />
                      Ask Question
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Attendees List */}
              <Card className="shadow-none border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Attendees ({event.registrationCount})</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-lg"
                      onClick={() => setAttendeeListOpen(true)}
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {attendees?.slice(0, 6).map((attendee: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-muted-foreground/30 transition-colors">
                        <Avatar className="size-10">
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback>{attendee.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{attendee.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{attendee.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-muted-foreground">
                      <strong>{attendeeStats.designers}</strong> designers, <strong>{attendeeStats.developers}</strong> developers, and more
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* LeapSpace CTA */}
              <Card className="shadow-none border-border bg-muted">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold mb-1">{leapSpaceInfo.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{leapSpaceInfo.memberCount.toLocaleString()} members</p>
                      <p className="text-xs text-muted-foreground">{leapSpaceInfo.description}</p>
                    </div>
                    <Button onClick={onJoinLeapSpace} className="bg-primary hover:bg-primary/90 rounded-lg">
                      Join Community
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Resources Tab */}
          {activeLearnerTab === 'resources' && (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Resources</h2>
                <p className="text-sm text-muted-foreground">Materials and downloads for this event</p>
              </div>

              <Card className="shadow-none border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Pre-Event Materials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {resources.materials.map((resource: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-muted-foreground/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-10 rounded-lg bg-muted">
                          <Download className="size-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{resource.title}</p>
                          <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-lg">
                        <Download className="size-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-none border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Recommended Reading</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">Get more context before the event</p>
                  {preWorkLinks.map((link: any, i: number) => (
                    <a 
                      key={i} 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <Link2 className="size-4 text-muted-foreground/60 group-hover:text-primary" />
                      <span className="text-sm text-foreground group-hover:text-primary">{link.title}</span>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Reviews Tab */}
          {activeLearnerTab === 'reviews' && (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Reviews & FAQ</h2>
                <p className="text-sm text-muted-foreground">What attendees are saying</p>
              </div>

              {/* Rating Overview */}
              <Card className="shadow-none border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-1">{averageRating}</div>
                      <div className="flex items-center gap-1 justify-center mb-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="size-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">{totalReviews} reviews</p>
                    </div>
                    <div className="flex-1 space-y-1">
                      {[5,4,3,2,1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-8">{stars} star</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400"
                              style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground w-8">{stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews?.map((review: any) => (
                  <Card key={review.id} className="shadow-none border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="size-10">
                          <AvatarImage src={review.userAvatar} />
                          <AvatarFallback>{review.userName?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm">{review.userName}</p>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} className={`size-3 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQs */}
              <div>
                <h3 className="text-lg font-bold mb-3 mt-8">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((faq: any, i: number) => (
                    <Card key={i} className="shadow-none border-border">
                      <button 
                        className="w-full text-left p-4 flex items-center justify-between"
                        onClick={() => {
                          // Note: In real impl this would use local state
                        }}
                      >
                        <span className="font-medium text-sm">{faq.question}</span>
                        <ChevronDown className="size-4 text-muted-foreground/60" />
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Tab */}
          {activeLearnerTab === 'chat' && (
            <div className="max-w-4xl mx-auto h-full p-6 flex flex-col">
              <Card className="flex-1 shadow-none border-border flex flex-col overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between bg-muted">
                  <div>
                    <h3 className="font-bold">Event Chat</h3>
                    <p className="text-xs text-muted-foreground">Discuss with other attendees</p>
                  </div>
                  <div className="flex -space-x-2">
                    {attendees?.slice(0, 3).map((a: any, i: number) => (
                      <Avatar key={i} className="size-8 border-2 border-white">
                        <AvatarImage src={a.avatar} />
                      </Avatar>
                    ))}
                    <div className="size-8 rounded-full bg-muted border-2 border-white flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                      +{(attendees?.length || 0) - 3}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Pinned Message */}
                  <div className="bg-muted p-3 rounded-lg border border-border mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground text-[10px] h-5">HOST</Badge>
                      <span className="text-xs font-semibold text-primary">{event.hostName}</span>
                    </div>
                    <p className="text-sm text-foreground">Welcome everyone! Feel free to introduce yourselves here before the event starts. I'm excited to see you all!</p>
                  </div>

                  {chatMessages?.map((msg: any) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      <Avatar className="size-8 mt-1">
                        <AvatarImage src={msg.userAvatar} />
                        <AvatarFallback>{msg.userName?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{msg.userName}</span>
                          <span className="text-xs text-muted-foreground/60">{msg.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{msg.text}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <button className="text-xs text-muted-foreground/60 hover:text-primary flex items-center gap-1">
                            <Heart className="size-3" /> {msg.likes}
                          </button>
                          <button className="text-xs text-muted-foreground/60 hover:text-primary">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-border bg-card">
                  <div className="flex items-center gap-2">
                    <Input placeholder="Type a message..." className="bg-muted border-border" />
                    <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-lg">
                      <Send className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
      </div>
    </EventShell>
  );
}

// Helper component for FAQs since I used it above
function ChevronDown({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
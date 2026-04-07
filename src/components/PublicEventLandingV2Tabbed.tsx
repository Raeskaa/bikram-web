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

interface PublicEventLandingV2TabbedProps {
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

export function PublicEventLandingV2Tabbed({
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
}: PublicEventLandingV2TabbedProps) {
  const [activeLearnerTab, setActiveLearnerTab] = useState<'overview' | 'agenda' | 'learn' | 'community' | 'resources' | 'reviews' | 'chat'>('overview');

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar - Balanced Style */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-foreground font-semibold">{event.title}</h1>
            <p className="text-xs text-muted-foreground font-medium">
              {event.startDate} • {event.time} {event.timezone}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="size-10 rounded-lg border-border" 
              onClick={() => setIsSaved(!isSaved)}
            >
              {isSaved ? <Bookmark className="size-4 fill-current" /> : <Bookmark className="size-4" />}
            </Button>
            <ShareMenu variant="minimal" />
            <AddToCalendarButton variant="minimal" />
            <Button onClick={onEnterLiveEvent} className="bg-primary hover:bg-primary/90 rounded-lg h-10 px-6">
              Register Now
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area with Left Nav */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation - Balanced */}
        <div className="w-64 border-r border-border bg-card">
          <div className="p-4 space-y-1">
            <button
              onClick={() => setActiveLearnerTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeLearnerTab === 'overview'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Eye className="size-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveLearnerTab('agenda')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeLearnerTab === 'agenda'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Clock className="size-4" />
              Agenda
              <Badge variant="secondary" className="ml-auto text-xs rounded-lg shadow-none">
                {agenda.length}
              </Badge>
            </button>
            <button
              onClick={() => setActiveLearnerTab('learn')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeLearnerTab === 'learn'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Award className="size-4" />
              Learn
            </button>
            <button
              onClick={() => setActiveLearnerTab('community')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeLearnerTab === 'community'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Users className="size-4" />
              Community
              <Badge variant="secondary" className="ml-auto text-xs rounded-lg shadow-none">
                {event.registrationCount}
              </Badge>
            </button>
            <button
              onClick={() => setActiveLearnerTab('resources')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeLearnerTab === 'resources'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Download className="size-4" />
              Resources
            </button>
            <button
              onClick={() => setActiveLearnerTab('reviews')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeLearnerTab === 'reviews'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Star className="size-4" />
              Reviews
              <Badge variant="secondary" className="ml-auto text-xs rounded-lg shadow-none">
                {totalReviews}
              </Badge>
            </button>
            <button
              onClick={() => setActiveLearnerTab('chat')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeLearnerTab === 'chat'
                  ? 'bg-primary text-primary-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <MessageCircle className="size-4" />
              Chat
            </button>
          </div>
        </div>

        {/* Main Content - Tab Content */}
        <div className="flex-1 overflow-y-auto bg-card">
          {/* Overview Tab */}
          {activeLearnerTab === 'overview' && (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              {/* Hero Image */}
              <div className="w-full aspect-[2/1] bg-muted rounded-xl"></div>

              {/* Event Description */}
              <div className="space-y-4">
                <div>
                  <Badge variant="outline" className="text-xs mb-2">{event.category[0]}</Badge>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>

                {/* Urgency */}
                {spotsRemaining <= 20 && spotsRemaining > 0 && (
                  <div className="px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
                    <strong>{spotsRemaining} spots remaining</strong> • {hostStats.recentRegistrations} joined recently
                  </div>
                )}
              </div>

              {/* What's Included */}
              <Card className="shadow-sm border-border">
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold mb-3">What's included</h3>
                  <div className="space-y-2">
                    {whatsIncluded.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <item.icon className="size-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Host & Price Section */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-sm border-border">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-2">Hosted by</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-10">
                        <AvatarImage src={event.hostAvatar} />
                        <AvatarFallback>{event.hostName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{event.hostName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Star className="size-3 fill-yellow-400 text-yellow-400" />
                          {hostStats.rating} • {hostStats.eventsHosted} events
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {isPaidEvent && (
                  <Card className="shadow-sm border-border">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground mb-2">Price</p>
                      <div className="text-2xl font-bold">₹799</div>
                      <p className="text-xs text-muted-foreground">Worth ₹2,500</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Social Proof */}
              <Card className="shadow-sm border-border">
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
                    {attendees.slice(0, 10).map((p: any, i: number) => (
                      <Avatar key={i} className="size-9 border-2 border-white">
                        <AvatarImage src={p.avatar} />
                        <AvatarFallback>{p.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{attendeeStats.designers} designers • {attendeeStats.developers} developers</p>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              {isPaidEvent && (
                <Card className="shadow-sm border-border">
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
              <Card className="shadow-sm border-border">
                <CardContent className="p-6 space-y-4">
                  {agenda.map((item: any, i: number) => (
                    <div key={i} className="p-4 border border-border rounded-lg hover:border-muted-foreground/30 transition-colors">
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
              <Card className="shadow-sm border-border">
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
              <Card className="shadow-sm border-border">
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
              <Card className="shadow-sm border-border bg-gradient-to-br from-muted to-background">
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
              <Card className="shadow-sm border-border">
                <CardHeader>
                  <CardTitle className="text-lg">About the Host</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="size-16">
                      <AvatarImage src={event.hostAvatar} />
                      <AvatarFallback>{event.hostName[0]}</AvatarFallback>
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
              <Card className="shadow-sm border-border">
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
                    {attendees.slice(0, 6).map((attendee: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:border-muted-foreground/30 transition-colors">
                        <Avatar className="size-10">
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback>{attendee.name[0]}</AvatarFallback>
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
              <Card className="shadow-sm border-border bg-muted">
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

              <Card className="shadow-sm border-border">
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

              <Card className="shadow-sm border-border">
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
              <Card className="shadow-sm border-border">
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
                {reviews.map((review: any) => (
                  <Card key={review.id} className="shadow-sm border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="size-10">
                          <AvatarImage src={review.userAvatar} />
                          <AvatarFallback>{review.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm">{review.userName}</p>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`size-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-foreground mb-3">{review.text}</p>
                      {review.hostResponse && (
                        <div className="pl-4 border-l-2 border-border bg-muted p-3 rounded-r-lg">
                          <p className="text-xs font-semibold text-primary mb-1">Host Response</p>
                          <p className="text-sm text-foreground">{review.hostResponse}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                        <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                          <Heart className="size-3" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* FAQ Section */}
              <Card className="shadow-sm border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {faqs.map((faq: any, i: number) => (
                    <div key={i} className="pb-3 border-b last:border-b-0 last:pb-0">
                      <h4 className="font-semibold text-sm mb-1">{faq.q}</h4>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Chat Tab - LeapcastSDK */}
          {activeLearnerTab === 'chat' && (
            <div className="h-full flex flex-col">
              <div className="p-6 border-b bg-card">
                <h2 className="text-2xl font-bold mb-1">Event Chat</h2>
                <p className="text-sm text-muted-foreground">Connect with other attendees</p>
              </div>
              <div className="flex-1 overflow-hidden">
                {/* LeapcastSDK Content */}
                <div className="h-full flex flex-col bg-card">
                  <div className="border-b">
                    <div className="flex gap-1 p-2">
                      <button className="flex-1 px-3 py-2 text-xs font-medium rounded-lg bg-muted">
                        General
                      </button>
                      <button className="flex-1 px-3 py-2 text-xs font-medium rounded-lg hover:bg-muted">
                        Q&A
                      </button>
                      <button className="flex-1 px-3 py-2 text-xs font-medium rounded-lg hover:bg-muted">
                        Networking
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg: any) => (
                      <div key={msg.id} className="flex gap-3">
                        <Avatar className="size-8 flex-shrink-0">
                          <AvatarImage src={msg.avatar} />
                          <AvatarFallback>{msg.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-sm">{msg.name}</span>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <p className="text-sm text-foreground">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Type a message..." 
                        className="flex-1 rounded-lg"
                      />
                      <Button className="bg-primary hover:bg-primary/90 rounded-lg">
                        <Send className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
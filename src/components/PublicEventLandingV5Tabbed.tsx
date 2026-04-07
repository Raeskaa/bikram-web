import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import {
  Calendar, Clock, Users, Video, Download,
  Award, Star, Eye, Bookmark, Link2,
  Send, HelpCircle, MessageCircle, DollarSign, Heart, Check, CheckCircle2,
  File, Presentation, ExternalLink
} from 'lucide-react';
import { EventShell } from './EventShell';

interface PublicEventLandingV5TabbedProps {
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
  savedCount: number;
}

export function PublicEventLandingV5Tabbed({
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
  chatMessages,
  savedCount
}: PublicEventLandingV5TabbedProps) {
  const [activeLearnerTab, setActiveLearnerTab] = useState<'overview' | 'agenda' | 'learn' | 'community' | 'resources' | 'reviews' | 'chat'>('overview');
  const capacityPercentage = (event.registrationCount / event.capacity) * 100;

  const headerActions = (
    <>
      <div className="flex items-center gap-2 mr-2 text-xs hidden md:flex">
        <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full border border-border">
          <Eye className="size-3 text-muted-foreground" />
          <span className="font-bold text-foreground">{hostStats.liveViewers}</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-full border border-border">
          <Bookmark className="size-3 text-muted-foreground" />
          <span className="font-bold text-foreground">{savedCount}</span>
        </div>
      </div>
      <Button 
        variant="outline" 
        size="icon" 
        className="size-10 rounded-full border-border" 
        onClick={() => setIsSaved(!isSaved)}
      >
        {isSaved ? <Bookmark className="size-4 fill-current" /> : <Bookmark className="size-4" />}
      </Button>
      <ShareMenu variant="minimal" />
      <AddToCalendarButton variant="minimal" />
      <Button onClick={onEnterLiveEvent} className="bg-primary hover:bg-primary/90 rounded-full h-10 px-6">
        Register Now ✨
      </Button>
    </>
  );

  return (
    <EventShell
      role="learner"
      title={event.title}
      subtitle={`${event.startDate} • ${event.time} ${event.timezone}`}
      activeTab={activeLearnerTab}
      onTabChange={(tab) => setActiveLearnerTab(tab as any)}
      headerActions={headerActions}
      counts={{
        agenda: agenda.length,
        attendees: event.registrationCount,
        reviews: totalReviews,
        discussion: 0
      }}
    >
      <div className="h-full overflow-y-auto bg-muted">
          {/* Overview Tab */}
          {activeLearnerTab === 'overview' && (
            <div className="max-w-4xl mx-auto p-6 space-y-5">
              {/* Hero Image */}
              <div className="w-full h-[320px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-3xl shadow-lg"></div>

              {/* Urgency - Playful */}
              {spotsRemaining <= 20 && spotsRemaining > 0 && (
                <Card className="border-2 border-orange-300 shadow-lg bg-gradient-to-r from-orange-50 to-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold text-orange-900">🔥 Only {spotsRemaining} spots left!</p>
                        <p className="text-xs text-orange-700">{hostStats.recentRegistrations} people joined in last 24h</p>
                      </div>
                      <div className="px-3 py-1 bg-orange-200 rounded-full">
                        <span className="text-sm font-bold text-orange-900">{Math.round(capacityPercentage)}% full</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Event Description */}
              <Card className="shadow-lg border-2 border-border bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary text-primary-foreground rounded-full px-3">{event.category[0]}</Badge>
                    <Badge variant="secondary" className="rounded-full px-3">{event.eventType}</Badge>
                  </div>
                  <p className="text-foreground mb-4">{event.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 rounded-full">
                      <Users className="size-4 text-orange-700" />
                      <span className="font-semibold text-orange-900">{event.registrationCount} registered</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What's Included - Playful */}
              <Card className="shadow-lg border-2 border-border bg-gradient-to-br from-muted to-background">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="size-5 text-foreground" />
                    <h3 className="font-bold text-lg text-foreground">What's Included</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {whatsIncluded.map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-border">
                        <div className="size-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center flex-shrink-0">
                          <item.icon className="size-4 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Host Preview - Playful */}
              <Card className="shadow-lg border-2 border-border bg-white">
                <CardContent className="p-5">
                  <p className="text-xs text-muted-foreground font-bold mb-3">✨ HOSTED BY</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-14 border-3 border-border shadow-md">
                      <AvatarImage src={event.hostAvatar} />
                      <AvatarFallback className="bg-muted text-foreground font-bold">{event.hostName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold text-lg text-foreground">{event.hostName}</p>
                      <p className="text-sm text-muted-foreground mb-2">{event.hostBio}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-full">
                          <Star className="size-3 fill-yellow-500 text-yellow-500" />
                          <span className="font-bold text-yellow-900">{hostStats.rating}</span>
                        </span>
                        <span className="font-semibold">{hostStats.eventsHosted} events</span>
                        <span className="font-semibold">{hostStats.totalAttendees.toLocaleString()} attendees</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-full border-2 border-border shadow-sm"
                      onClick={() => setAskOrganizerOpen(true)}
                    >
                      <HelpCircle className="size-3 mr-1" />
                      Ask
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Social Proof - Playful */}
              <Card className="shadow-lg border-2 border-border bg-gradient-to-r from-muted to-background">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-foreground">🎉 {event.registrationCount} awesome people registered!</p>
                    <button 
                      className="text-xs text-muted-foreground font-bold hover:underline"
                      onClick={() => setAttendeeListOpen(true)}
                    >
                      View all →
                    </button>
                  </div>
                  <div className="flex -space-x-2 mb-2">
                    {attendees.slice(0, 10).map((p: any, i: number) => (
                      <Avatar key={i} className="size-10 border-3 border-white shadow-sm">
                        <AvatarImage src={p.avatar} />
                        <AvatarFallback>{p.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{attendeeStats.designers} designers • {attendeeStats.developers} developers</p>
                </CardContent>
              </Card>

              {/* LeapSpace CTA - Playful */}
              <Card className="shadow-lg border-2 border-border bg-gradient-to-r from-muted to-background">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xl mb-1 text-foreground">🚀 {leapSpaceInfo.name}</h3>
                      <p className="text-sm text-foreground mb-1">{leapSpaceInfo.memberCount.toLocaleString()} members having fun!</p>
                      <p className="text-xs text-muted-foreground font-semibold">{leapSpaceInfo.description}</p>
                    </div>
                    <Button onClick={onJoinLeapSpace} className="bg-primary hover:bg-primary/90 rounded-full shadow-lg">
                      Join Community ✨
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Host Full Info */}
              <Card className="shadow-lg border-2 border-border bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">About the Host</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="size-16 border-3 border-border shadow-md">
                      <AvatarImage src={event.hostAvatar} />
                      <AvatarFallback className="bg-muted text-foreground font-bold">{event.hostName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">{event.hostName}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{event.hostBio}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-full">
                          <Star className="size-3 fill-yellow-500 text-yellow-500" />
                          <span className="font-bold text-yellow-900">{hostStats.rating}</span>
                        </span>
                        <span className="font-semibold">{hostStats.eventsHosted} events</span>
                        <span className="font-semibold">{hostStats.totalAttendees.toLocaleString()} attendees</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      className="rounded-full border-2 border-border shadow-sm"
                      onClick={() => setAskOrganizerOpen(true)}
                    >
                      <HelpCircle className="size-4 mr-2" />
                      Ask Question
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              {isPaidEvent && (
                <Card className="shadow-lg border-2 border-border bg-white">
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
                <h2 className="text-2xl font-bold mb-2 text-foreground">📅 Event Agenda</h2>
                <p className="text-sm text-muted-foreground">Total duration: {event.duration} minutes</p>
              </div>
              <Card className="shadow-lg border-2 border-border bg-white">
                <CardContent className="p-6 space-y-4">
                  {agenda.map((item: any, i: number) => (
                    <div key={i} className="p-4 border-2 border-border rounded-2xl hover:border-foreground/30 hover:shadow-md transition-all bg-gradient-to-r from-muted to-background">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center size-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 text-white font-bold text-sm shadow-md">
                            {item.time}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                            <p className="text-xs text-muted-foreground font-semibold">{item.duration}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground ml-13">{item.desc}</p>
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
                <h2 className="text-2xl font-bold mb-2 text-foreground">✨ What You'll Learn</h2>
                <p className="text-sm text-muted-foreground">Everything included in this event</p>
              </div>

              {/* What's Included */}
              <Card className="shadow-lg border-2 border-border bg-gradient-to-br from-muted to-background">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-5" />
                    What's Included
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {whatsIncluded.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all bg-white/50 border border-border">
                      <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-800 flex-shrink-0 shadow-md">
                        <item.icon className="size-4 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Learning Outcomes */}
              <Card className="shadow-lg border-2 border-border bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Learning Outcomes</CardTitle>
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
              <Card className="shadow-lg border-2 border-border bg-gradient-to-br from-muted to-background">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-lg">
                      <Award className="size-7 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-foreground">🏆 Certificate of Completion</p>
                      <p className="text-sm text-foreground">Get certified after attending this event</p>
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
                <h2 className="text-2xl font-bold mb-2 text-foreground">👥 Community</h2>
                <p className="text-sm text-muted-foreground">Connect with attendees and the host</p>
              </div>

              {/* LeapSpace CTA - Prominent */}
              <Card className="shadow-lg border-2 border-border bg-gradient-to-r from-muted to-background">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xl mb-1 text-foreground">🚀 {leapSpaceInfo.name}</h3>
                      <p className="text-sm text-foreground mb-1">{leapSpaceInfo.memberCount.toLocaleString()} members</p>
                      <p className="text-xs text-muted-foreground font-semibold">{leapSpaceInfo.description}</p>
                    </div>
                    <Button onClick={onJoinLeapSpace} className="bg-primary hover:bg-primary rounded-full shadow-lg">
                      Join Community ✨
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Attendees List */}
              <Card className="shadow-lg border-2 border-border bg-gradient-to-br from-muted to-background">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-foreground">🎉 Attendees ({event.registrationCount})</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-full border-2 border-border"
                      onClick={() => setAttendeeListOpen(true)}
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {attendees.slice(0, 6).map((attendee: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 border-2 border-border rounded-xl hover:border-foreground/30 hover:shadow-md transition-all bg-white">
                        <Avatar className="size-10 border-2 border-border shadow-sm">
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm truncate text-foreground">{attendee.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{attendee.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t-2 border-border">
                    <p className="text-sm text-foreground font-semibold">
                      <strong className="text-foreground">{attendeeStats.designers}</strong> designers, <strong className="text-foreground">{attendeeStats.developers}</strong> developers, and more!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Resources Tab */}
          {activeLearnerTab === 'resources' && (() => {
            const TYPE_ICONS_MAP: Record<string, any> = { pdf: File, file: File, zip: File, slide: Presentation, pptx: Presentation, video: Video, link: Link2 };
            const TYPE_LABELS_MAP: Record<string, string> = { pdf: 'Document', file: 'Document', zip: 'Archive', slide: 'Slides', pptx: 'Slides', video: 'Video', link: 'External Link' };
            const VISIBILITY_LABELS_MAP: Record<string, string> = { public: 'Public', registered: 'Registered Only', 'post-event': 'Post-Event Only' };
            return (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">Resources</h2>
                <p className="text-sm text-muted-foreground">
                  {(resources.materials?.length || 0) + (preWorkLinks?.length || 0)} resource{(resources.materials?.length || 0) + (preWorkLinks?.length || 0) !== 1 ? 's' : ''} available for this event
                </p>
              </div>

              {/* Materials — matches creator ResourcesPanel fields */}
              <Card className="shadow-lg border-2 border-border bg-white">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Event Materials</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {resources.materials.map((resource: any, i: number) => {
                    const IconComp = TYPE_ICONS_MAP[resource.type] || File;
                    const typeLabel = TYPE_LABELS_MAP[resource.type] || resource.type;
                    const visibility = resource.visibility || 'public';
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors group">
                        <div className="size-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <IconComp className="size-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">{resource.title}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                            <span>{typeLabel}</span>
                            {resource.size && <span>{resource.size}</span>}
                            {resource.downloads !== undefined && <span>{resource.downloads} downloads</span>}
                          </div>
                        </div>
                        {visibility !== 'public' && (
                          <Badge variant="secondary" className={`rounded shadow-none text-xs ${
                            visibility === 'registered' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-muted text-muted-foreground'
                          }`}>
                            {VISIBILITY_LABELS_MAP[visibility] || visibility}
                          </Badge>
                        )}
                        <Button variant="outline" size="sm" className="rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          {resource.url ? (
                            <><ExternalLink className="size-3 mr-1.5" />Open</>
                          ) : (
                            <><Download className="size-3 mr-1.5" />Download</>
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Pre-work / Recommended Links */}
              {preWorkLinks && preWorkLinks.length > 0 && (
                <Card className="shadow-lg border-2 border-border bg-white">
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
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors group"
                      >
                        <div className="size-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Link2 className="size-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-foreground group-hover:text-primary truncate">{link.title}</span>
                          <p className="text-xs text-muted-foreground mt-0.5">External Link</p>
                        </div>
                        <ExternalLink className="size-3.5 text-muted-foreground/50 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
            );
          })()}

          {/* Reviews Tab */}
          {activeLearnerTab === 'reviews' && (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">Reviews & FAQ</h2>
                <p className="text-sm text-muted-foreground">What attendees are saying</p>
              </div>

              {/* Rating Overview */}
              <Card className="shadow-lg border-2 border-border bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-1 text-foreground">{averageRating}</div>
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
                  <Card key={review.id} className="shadow-sm border-2 border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="size-10">
                          <AvatarImage src={review.userAvatar} />
                          <AvatarFallback>{review.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm">{review.userName}</p>
                            <span className="text-xs text-muted-foreground/60">{review.date}</span>
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
                <h3 className="text-lg font-bold mb-3 mt-8 text-foreground">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((faq: any, i: number) => (
                    <Card key={i} className="shadow-sm border-2 border-border">
                      <button 
                        className="w-full text-left p-4 flex items-center justify-between"
                        onClick={() => {
                          // Note: In real impl this would use local state
                        }}
                      >
                        <span className="font-medium text-sm">{faq.question}</span>
                        <span className="text-muted-foreground/60">v</span>
                      </button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat Tab - Playful */}
          {activeLearnerTab === 'chat' && (
            <div className="max-w-4xl mx-auto h-full p-6 flex flex-col">
              <Card className="flex-1 shadow-lg border-2 border-border flex flex-col overflow-hidden bg-white">
                <div className="p-4 border-b border-border flex items-center justify-between bg-muted">
                  <div>
                    <h3 className="font-bold text-foreground">Event Chat</h3>
                    <p className="text-xs text-muted-foreground">Discuss with other attendees</p>
                  </div>
                  <div className="flex -space-x-2">
                    {attendees.slice(0, 3).map((a: any, i: number) => (
                      <Avatar key={i} className="size-8 border-2 border-white">
                        <AvatarImage src={a.avatar} />
                      </Avatar>
                    ))}
                    <div className="size-8 rounded-full bg-white border-2 border-border flex items-center justify-center text-[10px] font-bold text-foreground">
                      +{(attendees.length || 0) - 3}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Pinned Message */}
                  <div className="bg-gradient-to-r from-muted to-background p-3 rounded-lg border border-border mb-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="bg-primary text-primary-foreground text-[10px] h-5">HOST</Badge>
                      <span className="text-xs font-bold text-primary">{event.hostName}</span>
                    </div>
                    <p className="text-sm text-foreground">Welcome everyone! Feel free to introduce yourselves here before the event starts. I'm excited to see you all!</p>
                  </div>

                  {chatMessages.map((msg: any) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      <Avatar className="size-8 mt-1 border border-border">
                        <AvatarImage src={msg.userAvatar} />
                        <AvatarFallback>{msg.userName?.[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{msg.userName}</span>
                          <span className="text-xs text-muted-foreground/60">{msg.time}</span>
                        </div>
                        <div className="bg-muted rounded-2xl rounded-tl-none p-3 mt-1 border border-border">
                          <p className="text-sm text-foreground">{msg.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button className="text-xs text-muted-foreground hover:text-primary font-medium">Reply</button>
                          {msg.likes > 0 && (
                            <div className="flex items-center gap-0.5 text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full border border-border">
                              <Heart className="size-3 text-muted-foreground fill-muted-foreground" />
                              {msg.likes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-border bg-muted">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground/60 hover:text-foreground hover:bg-muted">
                      <DollarSign className="size-5" />
                    </Button>
                    <Input placeholder="Type a message..." className="flex-1 border-border focus-visible:ring-ring" />
                    <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-full">
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

import { useState } from 'react';
import { 
  Play, Download, FileText, Link as LinkIcon, Share2, 
  MessageSquare, Calendar, Clock, Award, CheckCircle, VideoOff, Star, User, Users, ThumbsUp
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Event } from '../data/mockEventData';
import { EventShell } from './EventShell';

interface PostEventViewProps {
  event: Event;
  onBack: () => void;
}

export function PostEventView({ event, onBack }: PostEventViewProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock chat messages for replay context
  const mockChatReplay = [
    { id: 1, user: 'Sarah Chen', message: 'This is exactly what I needed to know about concurrent mode!', time: '14:20' },
    { id: 2, user: 'Mike Ross', message: 'Can you share the link to the documentation mentioned?', time: '14:22' },
    { id: 3, user: 'Leapy AI', message: 'Here is the link: react.dev/concurrent', time: '14:22', isBot: true },
    { id: 4, user: 'Jessica Pearson', message: 'Great explanation of suspense boundaries.', time: '14:35' },
    { id: 5, user: 'David Kim', message: 'Will the slides be available?', time: '14:40' },
    { id: 6, user: 'Emily White', message: 'Thanks for the great workshop!', time: '15:00' },
  ];

  // Mock reviews
  const mockReviews = [
    { id: 1, user: 'Alex Morgan', rating: 5, comment: 'Incredible depth and clarity. The examples were spot on.', date: '2 days ago' },
    { id: 2, user: 'Jamie Lee', rating: 4, comment: 'Great content, but the Q&A session felt a bit rushed.', date: '1 day ago' },
    { id: 3, user: 'Sam Taylor', rating: 5, comment: 'Best explanation of server components I have seen so far.', date: '3 days ago' },
  ];

  const headerActions = (
      <Button variant="outline" size="sm" className="text-primary border-purple-200 hover:bg-purple-50">
        <Share2 className="size-3.5 mr-2" />
        Share
      </Button>
  );

  return (
    <EventShell
        role="post-event"
        title={event.title}
        subtitle={
            <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {new Date(event.date).toLocaleDateString()}
                <span className="mx-1">•</span>
                <Clock className="size-3" />
                Ended
            </span>
        }
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={onBack}
        headerActions={headerActions}
        counts={{
            discussion: mockChatReplay.length,
            reviews: mockReviews.length,
            resources: event.resources?.length || 0
        }}
    >
        <div className="flex-1 overflow-y-auto p-6 bg-muted/50">
            <div className="max-w-4xl mx-auto space-y-6">

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Hero Stats Card */}
                    <div className="bg-card rounded-xl border border-border p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-foreground mb-2">Event Summary</h2>
                                <p className="text-muted-foreground text-sm max-w-2xl">{event.description}</p>
                            </div>
                             <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                                <CheckCircle className="size-3.5 mr-1" />
                                Attended
                            </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                             <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-purple-50 flex items-center justify-center text-primary">
                                    <Users className="size-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Attendees</p>
                                    <p className="text-lg font-semibold text-foreground">{event.attendeeCount}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Clock className="size-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Duration</p>
                                    <p className="text-lg font-semibold text-foreground">1h 45m</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                                    <Star className="size-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium uppercase">Rating</p>
                                    <p className="text-lg font-semibold text-foreground">4.8/5.0</p>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Host Card */}
                    <div className="bg-card rounded-xl border border-border p-6">
                         <h3 className="text-base font-semibold text-foreground mb-4">Hosted By</h3>
                         <div className="flex items-center gap-4">
                            <div className="size-14 rounded-full bg-muted overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${event.creatorName}&background=random`} alt={event.creatorName} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground">{event.creatorName}</h4>
                                <p className="text-sm text-muted-foreground">Expert Instructor & Developer</p>
                            </div>
                            <Button variant="outline" size="sm" className="ml-auto">View Profile</Button>
                         </div>
                    </div>

                    {/* Quick Actions — conditional on materials availability (MOCK_EVENTS_MASTER_PLAN.md §Event J) */}
                    {!event.recordingUrl && (!event.resources || event.resources.length === 0) && !event.certificateTemplateId ? (
                      <div className="bg-card rounded-xl border border-border p-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Materials Coming Soon</h4>
                        <p className="text-sm text-muted-foreground mb-4">The organizer is preparing post-event materials. We'll notify you when they're available.</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 py-1.5">
                            <div className="size-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">Recording — Not uploaded yet</span>
                          </div>
                          <div className="flex items-center gap-3 py-1.5">
                            <div className="size-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">Resources & slides — Not uploaded yet</span>
                          </div>
                          <div className="flex items-center gap-3 py-1.5">
                            <div className="size-4 rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">Certificate — Not configured yet</span>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border flex gap-3">
                          <Button size="sm" variant="outline" className="text-xs">Rate This Event</Button>
                          <Button size="sm" variant="outline" className="text-xs">Browse Similar Events</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button onClick={() => setActiveTab('recording')} className="bg-card p-4 rounded-xl border border-border hover:border-purple-200 hover:shadow-sm transition-all text-left flex items-center gap-4 group">
                             <div className="size-12 rounded-lg bg-purple-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Play className="size-6" />
                             </div>
                             <div>
                                <h4 className="font-semibold text-foreground">{event.recordingUrl ? 'Watch Recording' : 'Recording Coming Soon'}</h4>
                                <p className="text-xs text-muted-foreground">{event.recordingUrl ? 'Replay the full session' : 'Not yet uploaded'}</p>
                             </div>
                        </button>
                        <button onClick={() => setActiveTab('certificate')} className="bg-card p-4 rounded-xl border border-border hover:border-purple-200 hover:shadow-sm transition-all text-left flex items-center gap-4 group">
                             <div className="size-12 rounded-lg bg-green-100 flex items-center justify-center text-green-700 group-hover:scale-110 transition-transform">
                                <Award className="size-6" />
                             </div>
                             <div>
                                <h4 className="font-semibold text-foreground">{event.certificateTemplateId ? 'Get Certificate' : 'Certificate Coming Soon'}</h4>
                                <p className="text-xs text-muted-foreground">{event.certificateTemplateId ? 'Download your credential' : 'Not yet configured'}</p>
                             </div>
                        </button>
                      </div>
                    )}
                </div>
              )}

              {/* RECORDING TAB */}
              {activeTab === 'recording' && (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  {event.recordingUrl ? (
                    <div className="p-1">
                        <div className="aspect-video bg-black rounded-lg overflow-hidden relative group cursor-pointer">
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                                <div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Play className="size-8 text-white fill-white ml-1" />
                                </div>
                            </div>
                            <img 
                                src={`https://source.unsplash.com/random/1280x720/?technology,conference`} 
                                alt="Event Recording Thumbnail" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-white text-xs font-medium backdrop-blur-md">
                                1:42:15
                            </div>
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-foreground mb-2">{event.title}</h2>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] text-center p-8">
                        <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <VideoOff className="size-8 text-muted-foreground/60" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">No Recording Available</h3>
                        <p className="text-muted-foreground mt-2 max-w-sm">
                            The host has not uploaded a recording for this event yet.
                        </p>
                    </div>
                  )}
                </div>
              )}

              {/* RESOURCES TAB */}
              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-lg font-semibold text-foreground">Materials ({event.resources?.length || 0})</h3>
                     <Button variant="outline" size="sm">Download All</Button>
                  </div>
                  
                  {event.resources && event.resources.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {event.resources.map((resource) => (
                        <div key={resource.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-purple-200 hover:shadow-sm transition-all group">
                          <div className="size-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 text-primary">
                            {resource.type === 'pdf' && <FileText className="size-5" />}
                            {resource.type === 'slide' && <Layout className="size-5" />}
                            {resource.type === 'link' && <LinkIcon className="size-5" />}
                            {resource.type === 'video' && <Play className="size-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                              {resource.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5 capitalize">{resource.type} • 2.4 MB</p>
                          </div>
                          <Button size="sm" variant="ghost" className="text-muted-foreground/60 group-hover:text-primary">
                            <Download className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-card rounded-xl border border-border">
                        <p className="text-muted-foreground">No resources were shared for this event.</p>
                    </div>
                  )}
                </div>
              )}

              {/* CERTIFICATE TAB */}
              {activeTab === 'certificate' && (
                <div className="bg-card rounded-xl border border-border p-8 flex flex-col items-center text-center">
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <Award className="size-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Completion Certificate</h3>
                  <p className="text-sm text-muted-foreground max-w-md mb-8">
                    Congratulations on attending <strong>{event.title}</strong>! You can now download your official certificate of completion.
                  </p>
                  
                  {/* Certificate Preview Mock */}
                  <div className="w-full max-w-md aspect-[1.414] bg-white border-4 border-muted shadow-lg rounded-sm mb-8 relative flex flex-col items-center justify-center p-8 text-center select-none overflow-hidden hover:scale-105 transition-transform duration-500">
                     <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
                     <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-50 rounded-full -mr-12 -mb-12 opacity-50" />
                     
                     <Award className="size-10 text-primary mb-4 opacity-10" />
                     <h4 className="text-lg font-serif font-bold text-foreground mb-1">Certificate of Completion</h4>
                     <p className="text-[10px] text-muted-foreground mb-4">This certifies that</p>
                     <p className="text-lg font-script text-primary border-b border-border pb-1 px-6 mb-4">Sarah Chen</p>
                     <p className="text-[10px] text-muted-foreground mb-1">has successfully attended</p>
                     <p className="text-xs font-bold text-foreground mb-6">{event.title}</p>
                     
                     <div className="flex justify-between w-full px-8 mt-auto pt-2">
                        <div className="text-left">
                            <div className="h-px w-16 bg-muted-foreground/30 mb-1" />
                            <p className="text-[8px] text-muted-foreground/60">Date</p>
                        </div>
                        <div className="text-right">
                             <div className="h-px w-16 bg-muted-foreground/30 mb-1" />
                            <p className="text-[8px] text-muted-foreground/60">Signature</p>
                        </div>
                     </div>
                  </div>

                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 w-full max-w-xs">
                    <Download className="size-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              )}

              {/* DISCUSSION TAB */}
              {activeTab === 'discussion' && (
                  <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <h3 className="text-lg font-semibold text-foreground">Chat Replay</h3>
                         <Badge variant="outline">{mockChatReplay.length} messages</Badge>
                      </div>

                      <div className="bg-card rounded-xl border border-border overflow-hidden">
                          <div className="divide-y divide-border">
                             {mockChatReplay.map((msg) => (
                               <div key={msg.id} className="p-4 hover:bg-muted transition-colors">
                                 <div className="flex items-start gap-3">
                                   <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.isBot ? 'bg-purple-100 text-purple-700' : 'bg-muted text-muted-foreground'}`}>
                                       {msg.isBot ? 'AI' : msg.user[0]}
                                   </div>
                                   <div className="flex-1">
                                       <div className="flex items-center gap-2 mb-1">
                                           <span className="font-semibold text-sm text-foreground">{msg.user}</span>
                                           <span className="text-xs text-muted-foreground/60">{msg.time}</span>
                                       </div>
                                       <p className="text-sm text-foreground leading-relaxed">{msg.message}</p>
                                   </div>
                                 </div>
                               </div>
                             ))}
                          </div>
                          <div className="p-4 bg-muted border-t border-border text-center text-xs text-muted-foreground/60 italic">
                              End of chat history
                          </div>
                      </div>
                  </div>
              )}

              {/* REVIEWS TAB */}
              {activeTab === 'reviews' && (
                  <div className="space-y-6">
                       <div className="bg-card rounded-xl border border-border p-6 flex items-center justify-between">
                           <div>
                               <h2 className="text-2xl font-bold text-foreground">4.8</h2>
                               <div className="flex items-center gap-1 text-amber-400 my-1">
                                   <Star className="size-4 fill-current" />
                                   <Star className="size-4 fill-current" />
                                   <Star className="size-4 fill-current" />
                                   <Star className="size-4 fill-current" />
                                   <Star className="size-4 fill-current text-muted-foreground/30" />
                               </div>
                               <p className="text-sm text-muted-foreground">Based on 12 reviews</p>
                           </div>
                           <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                               Write a Review
                           </Button>
                       </div>

                       <div className="space-y-4">
                           {mockReviews.map((review) => (
                               <div key={review.id} className="bg-card p-6 rounded-xl border border-border">
                                   <div className="flex items-start justify-between mb-2">
                                       <div className="flex items-center gap-3">
                                           <div className="size-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs text-muted-foreground">
                                               {review.user[0]}
                                           </div>
                                           <div>
                                               <p className="text-sm font-semibold text-foreground">{review.user}</p>
                                               <p className="text-xs text-muted-foreground">{review.date}</p>
                                           </div>
                                       </div>
                                       <div className="flex items-center gap-0.5 text-amber-400">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`size-3.5 ${i < review.rating ? 'fill-current' : 'text-muted-foreground/20'}`} />
                                            ))}
                                       </div>
                                   </div>
                                   <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
                               </div>
                           ))}
                       </div>
                  </div>
              )}

            </div>
        </div>
    </EventShell>
  );
}

// Helper icons
function Layout({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
    )
}
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Calendar,
  Clock,
  MapPin,
  Users as UsersIcon,
  Share2,
  Copy,
  CheckCircle,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Settings,
  Volume2,
  Monitor,
  ChevronRight,
  Sparkles,
  MessageSquare,
  User
} from 'lucide-react';
import { DiscussionChannelV2 } from './DiscussionChannelV2';

interface EventWaitingRoomProps {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  registeredCount: number;
  isLive: boolean;
  onJoinEvent: () => void;
}

export function EventWaitingRoom({
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  registeredCount,
  isLive,
  onJoinEvent
}: EventWaitingRoomProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'discussion'>('overview');
  const [micEnabled, setMicEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [referralLinkCopied, setReferralLinkCopied] = useState(false);

  const referralLink = `https://trueleap.app/events/${(eventTitle || 'event').toLowerCase().replace(/\s/g, '-')}/join?ref=user123`;

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setReferralLinkCopied(true);
    setTimeout(() => setReferralLinkCopied(false), 2000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl text-gray-900">{eventTitle}</h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Calendar className="size-3.5" />
                {eventDate}
              </span>
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Clock className="size-3.5" />
                {eventTime}
              </span>
              {isLive && (
                <Badge className="bg-red-100 text-red-700 border-red-200">
                  <span className="size-1.5 rounded-full bg-red-600 mr-1 animate-pulse" />
                  Live Now
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <UsersIcon className="size-3" />
              {registeredCount} registered
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Preview & Controls */}
        <div className="flex-1 flex flex-col">
          {/* Tabs */}
          <div className="bg-white border-b border-gray-200 px-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-3 border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`px-4 py-3 border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === 'discussion'
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="size-4" />
                Discussion
                <Badge variant="secondary" className="bg-muted text-foreground text-xs">
                  3 new
                </Badge>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {activeTab === 'overview' ? (
              <div className="p-6 max-w-4xl mx-auto">
                {/* Video Preview */}
                <div className="bg-gray-900 rounded-xl overflow-hidden mb-6 aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {videoEnabled ? (
                      <div className="text-white">Camera Preview</div>
                    ) : (
                      <div className="text-center">
                        <div className="size-20 rounded-full bg-gray-700 flex items-center justify-center text-white text-2xl font-medium mx-auto mb-3">
                          JD
                        </div>
                        <p className="text-gray-400">Camera is off</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => setMicEnabled(!micEnabled)}
                        className={`p-3 rounded-full ${
                          micEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                        } text-white transition-colors`}
                        title={micEnabled ? 'Mute' : 'Unmute'}
                      >
                        {micEnabled ? <Mic className="size-5" /> : <MicOff className="size-5" />}
                      </button>
                      <button
                        onClick={() => setVideoEnabled(!videoEnabled)}
                        className={`p-3 rounded-full ${
                          videoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
                        } text-white transition-colors`}
                        title={videoEnabled ? 'Stop Video' : 'Start Video'}
                      >
                        {videoEnabled ? <Video className="size-5" /> : <VideoOff className="size-5" />}
                      </button>
                      <button
                        className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                        title="Settings"
                      >
                        <Settings className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                {isLive ? (
                  <div className="mb-6">
                    <Button
                      onClick={onJoinEvent}
                      className="w-full bg-primary hover:bg-primary/90 h-12 text-base"
                    >
                      <Video className="size-5 mr-2" />
                      Join Event Now
                      <ChevronRight className="size-5 ml-2" />
                    </Button>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      {registeredCount} participants are already in the event
                    </p>
                  </div>
                ) : (
                  <div className="mb-6 p-4 bg-muted border border-border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="size-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Event starts soon</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          The event will begin at {eventTime}. You'll be able to join once the host starts the event.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Event Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="size-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Date</p>
                        <p className="text-sm text-gray-600">{eventDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="size-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Time</p>
                        <p className="text-sm text-gray-600">{eventTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="size-4 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Location</p>
                        <p className="text-sm text-gray-600">{eventLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invite Friends */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 className="size-5 text-foreground" />
                    <h3 className="font-medium text-gray-900">Invite Friends</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Share this event with your friends and colleagues. Everyone who joins using your link will be connected to you.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={referralLink}
                      readOnly
                      className="flex-1 bg-gray-50"
                    />
                    <Button
                      onClick={handleCopyReferralLink}
                      variant="outline"
                      className="gap-2"
                    >
                      {referralLinkCopied ? (
                        <>
                          <CheckCircle className="size-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="size-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <DiscussionChannelV2
                channelName={`${eventTitle} - Discussion`}
                channelType="event"
                isLive={isLive}
                canModerate={false}
                userRole="participant"
                eventStatus={isLive ? 'live' : 'upcoming'}
              />
            )}
          </div>
        </div>

        {/* Right Sidebar - Quick Info */}
        {activeTab === 'overview' && (
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <div className="space-y-6">
              {/* System Check */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">System Check</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Microphone</span>
                    <CheckCircle className="size-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Camera</span>
                    <CheckCircle className="size-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Network</span>
                    <CheckCircle className="size-4 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Participants Preview */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Registered ({registeredCount})</h3>
                <div className="space-y-2">
                  {['Sarah Chen', 'Marcus Webb', 'Elena Rodriguez'].map((name, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium">
                        {name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-gray-700">{name}</span>
                    </div>
                  ))}
                  {registeredCount > 3 && (
                    <p className="text-sm text-gray-500">+{registeredCount - 3} more</p>
                  )}
                </div>
              </div>

              {/* AI Assistant Tip */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="size-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 mb-1">Tip from Leapy AI</p>
                    <p className="text-xs text-green-700">
                      Test your audio and video before joining to ensure a smooth experience!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
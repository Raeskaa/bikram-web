import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Maximize2,
  X
} from 'lucide-react';

interface MinimizedMeetWindowProps {
  eventTitle: string;
  participantCount: number;
  micEnabled: boolean;
  videoEnabled: boolean;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  onMaximize: () => void;
  onLeave: () => void;
}

export function MinimizedMeetWindow({
  eventTitle,
  participantCount,
  micEnabled,
  videoEnabled,
  onToggleMic,
  onToggleVideo,
  onMaximize,
  onLeave
}: MinimizedMeetWindowProps) {
  const [position, setPosition] = useState({ x: window.innerWidth - 320 - 20, y: window.innerHeight - 180 - 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Keep within viewport bounds
    const maxX = window.innerWidth - 320;
    const maxY = window.innerHeight - 180;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Prevent text selection while dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.userSelect = '';
    }
    return () => {
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  return (
    <div
      ref={windowRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 9999,
        width: '320px',
        height: '180px'
      }}
      className={`bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden border-2 border-gray-700 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Preview Background */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
        <div className="size-16 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium">
          You
        </div>
      </div>

      {/* Header */}
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-2 transition-opacity ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className="bg-red-600 text-white border-0 text-xs">
              <span className="size-2 bg-white rounded-full mr-1 animate-pulse" />
              Live
            </Badge>
            <span className="text-white text-xs font-medium truncate max-w-[120px]">
              {eventTitle}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={onMaximize}
              className="p-1 hover:bg-white/20 rounded text-white transition-colors"
              title="Maximize"
            >
              <Maximize2 className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 transition-opacity ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-xs">{participantCount} participants</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMic();
            }}
            className={`p-2 rounded-full ${
              micEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
            } text-white transition-colors`}
            title={micEnabled ? 'Mute' : 'Unmute'}
          >
            {micEnabled ? <Mic className="size-3.5" /> : <MicOff className="size-3.5" />}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleVideo();
            }}
            className={`p-2 rounded-full ${
              videoEnabled ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
            } text-white transition-colors`}
            title={videoEnabled ? 'Stop Video' : 'Start Video'}
          >
            {videoEnabled ? <Video className="size-3.5" /> : <VideoOff className="size-3.5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onLeave();
            }}
            className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
            title="Leave"
          >
            <PhoneOff className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Always visible mic/video status indicators when controls hidden */}
      {!showControls && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          {!micEnabled && (
            <div className="p-1.5 bg-red-600 rounded-full">
              <MicOff className="size-3 text-white" />
            </div>
          )}
          {!videoEnabled && (
            <div className="p-1.5 bg-red-600 rounded-full">
              <VideoOff className="size-3 text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
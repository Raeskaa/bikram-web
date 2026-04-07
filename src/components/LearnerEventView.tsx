import { useState } from 'react';
import { EventWaitingRoom } from './EventWaitingRoom';

interface LearnerEventViewProps {
  eventData: {
    title: string;
    date: string;
    time: string;
    location: string;
    registeredCount: number;
    code: string;
  };
  onBack: () => void;
  onJoinEvent?: (eventTitle: string, eventCode: string) => void;
}

export function LearnerEventView({ eventData, onBack, onJoinEvent }: LearnerEventViewProps) {
  const [isLive] = useState(true); // In real app, this would be determined by event status

  const handleJoinEvent = () => {
    // Call the App-level handler to enter meeting
    if (onJoinEvent) {
      onJoinEvent(eventData.title, eventData.code);
    }
  };

  return (
    <EventWaitingRoom
      eventTitle={eventData.title}
      eventDate={eventData.date}
      eventTime={eventData.time}
      eventLocation={eventData.location}
      registeredCount={eventData.registeredCount}
      isLive={isLive}
      onJoinEvent={handleJoinEvent}
    />
  );
}

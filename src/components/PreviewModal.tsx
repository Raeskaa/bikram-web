import { X } from 'lucide-react';
import { Button } from './ui/button';
import { LearnerEventView } from './LearnerEventView';
import { LearnerCourseView } from './LearnerCourseView';

interface PreviewModalProps {
  open: boolean;
  type?: 'event' | 'course';
  onClose: () => void;
  eventData?: any;
  courseData?: any;
  onJoinEvent?: (eventTitle: string, eventCode: string) => void;
  [key: string]: any; // Allow any other props
}

export function PreviewModal({ open, type = 'event', onClose, eventData, courseData, onJoinEvent, ...otherProps }: PreviewModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-full h-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="size-5 text-gray-600" />
        </button>

        {/* Preview Content */}
        {type === 'event' && eventData ? (
          <LearnerEventView
            eventData={{
              title: eventData.title,
              date: 'March 25, 2024',
              time: '10:00 AM - 4:00 PM PST',
              location: eventData.location || 'Virtual Event',
              registeredCount: otherProps.registeredCount || 42,
              code: 'ABC-123-XYZ'
            }}
            onBack={onClose}
            onJoinEvent={onJoinEvent}
          />
        ) : courseData ? (
          <LearnerCourseView
            courseData={{
              title: courseData.title,
              instructor: 'John Doe',
              description: courseData.description || 'Learn the fundamentals and advanced concepts.',
              enrolledCount: 1234,
              rating: 4.8,
              progress: 35
            }}
            onBack={onClose}
          />
        ) : null}
      </div>
    </div>
  );
}
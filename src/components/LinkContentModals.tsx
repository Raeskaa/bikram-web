import { useState } from 'react';
import { 
  X, Search, Plus, Sparkles, Users, Calendar, BookOpen, 
  Clock, TrendingUp, Check, ExternalLink, Wand2, ChevronRight,
  Star, Lock, Unlock, ArrowRight, Shield, Crown, Link, Activity, Users as UsersIcon
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

// ==================== ADD COURSE TO COMMUNITY MODAL ====================
interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string;
  onSelectCourse?: (courseId: string) => void;
  onCreateNew?: () => void;
}

const sampleCourses = [
  { 
    id: '1', 
    title: 'React Fundamentals', 
    description: 'Master the basics of React with hands-on projects',
    students: 234,
    lessons: 24,
    duration: '8 weeks',
    status: 'published',
    level: 'Beginner',
    thumbnail: '📚'
  },
  { 
    id: '2', 
    title: 'Advanced TypeScript', 
    description: 'Deep dive into TypeScript patterns and best practices',
    students: 156,
    lessons: 18,
    duration: '6 weeks',
    status: 'published',
    level: 'Advanced',
    thumbnail: '🎯'
  },
  { 
    id: '3', 
    title: 'UI/UX Design Principles', 
    description: 'Create beautiful and functional user interfaces',
    students: 89,
    lessons: 15,
    duration: '5 weeks',
    status: 'draft',
    level: 'Intermediate',
    thumbnail: '🎨'
  },
];

export function AddCourseToCommunityModal({ 
  isOpen, 
  onClose, 
  communityName,
  onSelectCourse,
  onCreateNew
}: AddCourseModalProps) {
  const [activeTab, setActiveTab] = useState<'existing' | 'create'>('existing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [accessLevel, setAccessLevel] = useState<'all' | 'members'>('members');
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredCourses = sampleCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCourse = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => {
        onSelectCourse?.(selectedCourseId!);
        onClose();
        setShowSuccess(false);
        setSelectedCourseId(null);
        setSearchQuery('');
        setActiveTab('existing');
      }, 1500);
    }, 1000);
  };

  const handleCreateNew = () => {
    onCreateNew?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Add Course to Community</h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Link a course to <strong>{communityName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab('existing')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'existing'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Select Existing Course
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'create'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Create New Course
          </button>
        </div>

        {/* Content */}
        {activeTab === 'existing' ? (
          <>
            {/* Search */}
            <div className="px-6 pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Course List */}
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-3">
                {filteredCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => setSelectedCourseId(course.id)}
                    className={`w-full text-left border-2 rounded-lg p-4 transition-all ${
                      selectedCourseId === course.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Thumbnail */}
                      <div className="size-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {course.thumbnail}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900">{course.title}</h3>
                          <Badge 
                            variant={course.status === 'published' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {course.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{course.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="size-3" />
                            {course.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="size-3" />
                            {course.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {course.duration}
                          </span>
                        </div>
                      </div>

                      {/* Checkmark */}
                      {selectedCourseId === course.id && (
                        <div className="size-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                          <Check className="size-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Search className="size-12 mb-4 text-gray-400" />
                  <p className="text-sm">No courses found</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTab('create');
                    }}
                    className="mt-2 text-sm text-purple-600 hover:text-purple-700"
                  >
                    Create a new course instead
                  </button>
                </div>
              )}
            </ScrollArea>

            {/* Access Level Settings */}
            {selectedCourseId && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Who can access this course?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAccessLevel('members')}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      accessLevel === 'members'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className={`size-4 ${accessLevel === 'members' ? 'text-purple-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${accessLevel === 'members' ? 'text-purple-600' : 'text-gray-900'}`}>
                        Members Only
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Only community members can enroll</p>
                  </button>
                  <button
                    onClick={() => setAccessLevel('all')}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      accessLevel === 'all'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Unlock className={`size-4 ${accessLevel === 'all' ? 'text-purple-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${accessLevel === 'all' ? 'text-purple-600' : 'text-gray-900'}`}>
                        Public
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Anyone can discover and enroll</p>
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <Button variant="outline" onClick={onClose} disabled={isAdding}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddCourse}
                disabled={!selectedCourseId || isAdding}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isAdding ? (
                  <>
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Adding...
                  </>
                ) : showSuccess ? (
                  <>
                    <Check className="size-4 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <Plus className="size-4 mr-2" />
                    Add to Community
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          /* Create New Tab */
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="max-w-md text-center">
              <div className="size-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="size-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Create Course with AI</h3>
              <p className="text-sm text-gray-600 mb-6">
                Leapy AI will help you create a new course tailored to your community's needs. 
                The course will be automatically linked to <strong>{communityName}</strong>.
              </p>
              <Button 
                onClick={handleCreateNew}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Wand2 className="size-4 mr-2" />
                Start Creating Course
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                This will open the AI course builder
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== ADD EVENT TO COMMUNITY MODAL ====================
interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string;
  onSelectEvent?: (eventId: string) => void;
  onCreateNew?: () => void;
}

const sampleEvents = [
  { 
    id: '1', 
    title: 'React Workshop 2024', 
    description: 'Hands-on workshop covering React 18 features',
    attendees: 127,
    date: 'Jan 25, 2024',
    time: '2:00 PM PST',
    status: 'upcoming',
    type: 'Workshop',
    thumbnail: '🎪'
  },
  { 
    id: '2', 
    title: 'Design Systems Webinar', 
    description: 'Building scalable design systems for modern apps',
    attendees: 89,
    date: 'Feb 2, 2024',
    time: '10:00 AM PST',
    status: 'upcoming',
    type: 'Webinar',
    thumbnail: '🎨'
  },
  { 
    id: '3', 
    title: 'Community Meetup Q1', 
    description: 'Quarterly networking and knowledge sharing',
    attendees: 45,
    date: 'Jan 15, 2024',
    time: '6:00 PM PST',
    status: 'past',
    type: 'Meetup',
    thumbnail: '🤝'
  },
];

export function AddEventToCommunityModal({ 
  isOpen, 
  onClose, 
  communityName,
  onSelectEvent,
  onCreateNew
}: AddEventModalProps) {
  const [activeTab, setActiveTab] = useState<'existing' | 'create'>('existing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [accessLevel, setAccessLevel] = useState<'all' | 'members'>('members');
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredEvents = sampleEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEvent = () => {
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => {
        onSelectEvent?.(selectedEventId!);
        onClose();
        setShowSuccess(false);
        setSelectedEventId(null);
        setSearchQuery('');
        setActiveTab('existing');
      }, 1500);
    }, 1000);
  };

  const handleCreateNew = () => {
    onCreateNew?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Add Event to Community</h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Link an event to <strong>{communityName}</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button
            onClick={() => setActiveTab('existing')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'existing'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Select Existing Event
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'create'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Create New Event
          </button>
        </div>

        {/* Content */}
        {activeTab === 'existing' ? (
          <>
            {/* Search */}
            <div className="px-6 pt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Event List */}
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-3">
                {filteredEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className={`w-full text-left border-2 rounded-lg p-4 transition-all ${
                      selectedEventId === event.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Thumbnail */}
                      <div className="size-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {event.thumbnail}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                          <Badge 
                            variant={event.status === 'upcoming' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {event.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="size-3" />
                            {event.attendees} attendees
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {event.time}
                          </span>
                        </div>
                      </div>

                      {/* Checkmark */}
                      {selectedEventId === event.id && (
                        <div className="size-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                          <Check className="size-4 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Search className="size-12 mb-4 text-gray-400" />
                  <p className="text-sm">No events found</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTab('create');
                    }}
                    className="mt-2 text-sm text-purple-600 hover:text-purple-700"
                  >
                    Create a new event instead
                  </button>
                </div>
              )}
            </ScrollArea>

            {/* Access Level Settings */}
            {selectedEventId && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Who can register for this event?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAccessLevel('members')}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      accessLevel === 'members'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className={`size-4 ${accessLevel === 'members' ? 'text-purple-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${accessLevel === 'members' ? 'text-purple-600' : 'text-gray-900'}`}>
                        Members Only
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Only community members can register</p>
                  </button>
                  <button
                    onClick={() => setAccessLevel('all')}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      accessLevel === 'all'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Unlock className={`size-4 ${accessLevel === 'all' ? 'text-purple-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${accessLevel === 'all' ? 'text-purple-600' : 'text-gray-900'}`}>
                        Public
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Anyone can discover and register</p>
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <Button variant="outline" onClick={onClose} disabled={isAdding}>
                Cancel
              </Button>
              <Button 
                onClick={handleAddEvent}
                disabled={!selectedEventId || isAdding}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isAdding ? (
                  <>
                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Adding...
                  </>
                ) : showSuccess ? (
                  <>
                    <Check className="size-4 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <Plus className="size-4 mr-2" />
                    Add to Community
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          /* Create New Tab */
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="max-w-md text-center">
              <div className="size-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="size-8 text-purple-600" />
              </div>
              <h3 className="text-gray-900 mb-2">Create Event with AI</h3>
              <p className="text-sm text-gray-600 mb-6">
                Leapy AI will help you create a new event tailored to your community's interests. 
                The event will be automatically linked to <strong>{communityName}</strong>.
              </p>
              <Button 
                onClick={handleCreateNew}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Wand2 className="size-4 mr-2" />
                Start Creating Event
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                This will open the AI event builder
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== CREATE COMMUNITY FROM EVENT ("THE HOOK") ====================
interface CreateCommunityFromEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventDescription: string;
  attendeeCount: number;
  onConfirm?: () => void;
}

export function CreateCommunityFromEventModal({
  isOpen,
  onClose,
  eventTitle,
  eventDescription,
  attendeeCount,
  onConfirm
}: CreateCommunityFromEventModalProps) {
  const [communityName, setCommunityName] = useState(eventTitle + ' Community');
  const [description, setDescription] = useState(`A community for attendees and enthusiasts of ${eventTitle}`);
  const [inviteAttendees, setInviteAttendees] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCreate = () => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      setShowSuccess(true);
      setTimeout(() => {
        onConfirm?.();
        onClose();
        setShowSuccess(false);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="size-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <TrendingUp className="size-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900">Turn Your Event Into a Community</h2>
              <p className="text-sm text-gray-600 mt-1">
                You have <strong>{attendeeCount} registered attendees</strong> - perfect for building a lasting community!
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isCreating}
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="px-6 py-6 max-h-[60vh]">
          <div className="space-y-6">
            {/* Why Create a Community */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-purple-900 mb-2">Why create a community?</h3>
              <ul className="space-y-2 text-sm text-purple-800">
                <li className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 flex-shrink-0" />
                  <span>Keep the conversation going after your event ends</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 flex-shrink-0" />
                  <span>Build relationships between attendees</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 flex-shrink-0" />
                  <span>Share resources, recordings, and follow-up content</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="size-4 mt-0.5 flex-shrink-0" />
                  <span>Plan future events with your engaged audience</span>
                </li>
              </ul>
            </div>

            {/* Community Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Community Name
              </label>
              <input
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Enter community name..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                placeholder="Describe your community..."
              />
            </div>

            {/* Invite Attendees */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inviteAttendees}
                  onChange={(e) => setInviteAttendees(e.target.checked)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      Invite all {attendeeCount} attendees
                    </span>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">
                    Send email invitations to everyone registered for your event. They'll be added as members automatically when they accept.
                  </p>
                </div>
              </label>
            </div>

            {/* What Happens Next */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="size-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-xs font-medium text-purple-600">
                    1
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Community is created</p>
                    <p className="text-xs text-gray-600">With your event automatically linked</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="size-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-xs font-medium text-purple-600">
                    2
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Invitations sent</p>
                    <p className="text-xs text-gray-600">{inviteAttendees ? `All ${attendeeCount} attendees receive invite emails` : 'You can manually invite members later'}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="size-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-xs font-medium text-purple-600">
                    3
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">Start engaging</p>
                    <p className="text-xs text-gray-600">Post updates, share content, and build relationships</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isCreating}
          >
            Maybe Later
          </Button>
          <Button 
            onClick={handleCreate}
            disabled={!communityName.trim() || isCreating}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isCreating ? (
              <>
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Creating Community...
              </>
            ) : showSuccess ? (
              <>
                <Check className="size-4 mr-2" />
                Created!
              </>
            ) : (
              <>
                <ArrowRight className="size-4 mr-2" />
                Create Community
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ==================== LINK EVENT/COURSE TO EXISTING COMMUNITY MODAL ====================
interface LinkToExistingCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'event' | 'course';
  contentTitle: string;
  onSelectCommunity?: (communityId: string) => void;
  onCreateNew?: () => void;
}

const sampleCommunities = [
  {
    id: '1',
    name: 'Tech Innovators Hub',
    description: 'A vibrant community of technology enthusiasts and innovators',
    members: 1247,
    activity: 'Very Active',
    privacy: 'public',
    thumbnail: '🚀'
  },
  {
    id: '2',
    name: 'Design Masters',
    description: 'Learn and share design techniques with professionals',
    members: 892,
    activity: 'Active',
    privacy: 'private',
    thumbnail: '🎨'
  },
  {
    id: '3',
    name: 'Startup Founders Network',
    description: 'Connect with fellow entrepreneurs and build together',
    members: 543,
    activity: 'Moderate',
    privacy: 'public',
    thumbnail: '💡'
  },
  {
    id: '4',
    name: 'Product Management Guild',
    description: 'Best practices and insights for product managers',
    members: 324,
    activity: 'Active',
    privacy: 'private',
    thumbnail: '📊'
  }
];

export function LinkToExistingCommunityModal({
  isOpen,
  onClose,
  contentType,
  contentTitle,
  onSelectCommunity,
  onCreateNew
}: LinkToExistingCommunityModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredCommunities = sampleCommunities.filter(
    community =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLink = () => {
    if (!selectedCommunityId) return;
    
    setIsLinking(true);
    setTimeout(() => {
      setIsLinking(false);
      setShowSuccess(true);
      setTimeout(() => {
        onSelectCommunity?.(selectedCommunityId);
        onClose();
        setShowSuccess(false);
        setSelectedCommunityId(null);
        setSearchQuery('');
      }, 1500);
    }, 1500);
  };

  const selectedCommunity = sampleCommunities.find(c => c.id === selectedCommunityId);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Link to Community</h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Add <strong>{contentTitle}</strong> to an existing community
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLinking}
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pt-4 pb-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search communities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Communities List */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-3">
            {filteredCommunities.map((community) => (
              <button
                key={community.id}
                onClick={() => setSelectedCommunityId(community.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${ 
                  selectedCommunityId === community.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="size-12 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {community.thumbnail}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-medium ${ 
                        selectedCommunityId === community.id ? 'text-purple-900' : 'text-gray-900'
                      }`}>
                        {community.name}
                      </h3>
                      <Badge 
                        variant="secondary"
                        className={community.privacy === 'private' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-green-100 text-green-700 border-green-200'}
                      >
                        {community.privacy === 'private' ? (
                          <><Shield className="size-3 mr-1" /> Private</>
                        ) : (
                          <><Unlock className="size-3 mr-1" /> Public</>
                        )}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{community.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <UsersIcon className="size-3" />
                        {community.members.toLocaleString()} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="size-3" />
                        {community.activity}
                      </span>
                    </div>
                  </div>

                  {/* Checkmark */}
                  {selectedCommunityId === community.id && (
                    <div className="size-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                      <Check className="size-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {filteredCommunities.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Search className="size-12 mb-4 text-gray-400" />
              <p className="text-sm">No communities found</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  onCreateNew?.();
                }}
                className="mt-2 text-sm text-purple-600 hover:text-purple-700"
              >
                Create a new community instead
              </button>
            </div>
          )}
        </ScrollArea>

        {/* Preview & Link Info */}
        {selectedCommunityId && selectedCommunity && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Link className="size-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {contentType === 'event' ? 'Event' : 'Course'} will be added to this community
                </p>
                <p className="text-xs text-gray-600">
                  {selectedCommunity.privacy === 'public' 
                    ? `All ${selectedCommunity.members.toLocaleString()} members will be notified and can access this ${contentType}`
                    : `Community members can discover and access this ${contentType}`
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <Button variant="outline" onClick={onCreateNew}>
            <Plus className="size-4 mr-2" />
            Create New Community
          </Button>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isLinking}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLink}
              disabled={!selectedCommunityId || isLinking}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLinking ? (
                <>
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Linking...
                </>
              ) : showSuccess ? (
                <>
                  <Check className="size-4 mr-2" />
                  Linked!
                </>
              ) : (
                <>
                  <Link className="size-4 mr-2" />
                  Link to Community
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
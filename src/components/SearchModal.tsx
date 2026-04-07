import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, BookOpen, Users, Calendar, ArrowRight, ChevronDown, MapPin, Star, Check, Plus, Sparkles, Hash, Filter, Save, Trash2, User } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'communities' | 'events' | 'courses' | 'people'>('all');
  const [emptyStateTab, setEmptyStateTab] = useState<'recent' | 'suggestions' | 'saved' | 'actions'>('recent');
  const [sortBy, setSortBy] = useState('relevant');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState('all-time');
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [creatorFilter, setCreatorFilter] = useState('');
  const [showCreatorMenu, setShowCreatorMenu] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [savedSearches, setSavedSearches] = useState<string[]>(['My draft courses', 'Upcoming events this week']);
  const [showSaveSearch, setShowSaveSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  // Sample data
  const recentSearches = [
    'UX Design Course',
    'Product Management',
    'Weekly Standup',
    'Marketing Community'
  ];

  const leapySuggestions = [
    { title: 'Design Sprint Workshop', type: 'event' },
    { title: 'Advanced Prototyping', type: 'course' },
    { title: 'Marketing Pros', type: 'community' }
  ];

  const availableFilters = [
    { id: 'created-by-me', label: '👤 Created by me', icon: '👤' },
    { id: 'public', label: '🌍 Public', icon: '🌍' },
    { id: 'active', label: '✓ Active', icon: '✓' },
    { id: 'has-courses', label: '📚 Has courses', icon: '📚' }
  ];

  // Mock results with counts
  const resultCounts = {
    all: 45,
    communities: 12,
    events: 8,
    courses: 23,
    people: 2
  };

  // Mock search results
  const communityResults = [
    {
      id: 1,
      name: 'Design Masters',
      description: 'A community for design professionals to share knowledge, collaborate on projects, and grow together.',
      members: 245,
      courses: 12,
      badges: ['Public', 'Active']
    },
    {
      id: 2,
      name: 'Product Design Hub',
      description: 'Learn and practice product design with real-world projects and expert feedback.',
      members: 189,
      courses: 8,
      badges: ['Public', 'Active']
    }
  ];

  const courseResults = [
    {
      id: 1,
      name: 'UX Design Fundamentals',
      description: 'Master the fundamentals of user experience design with hands-on projects and real-world case studies.',
      enrolled: 89,
      rating: 4.8,
      modules: 6,
      badges: ['Beginner', '6 modules']
    },
    {
      id: 2,
      name: 'Advanced Prototyping',
      description: 'Take your prototyping skills to the next level with advanced Figma techniques and interactive animations.',
      enrolled: 124,
      rating: 4.9,
      modules: 8,
      badges: ['Advanced', '8 modules']
    }
  ];

  const eventResults = [
    {
      id: 1,
      name: 'Design Sprint Workshop',
      description: 'Tomorrow at 2:00 PM • Design Masters community',
      attending: 24,
      location: 'Virtual',
      badges: ['Upcoming']
    },
    {
      id: 2,
      name: 'Product Strategy Session',
      description: 'Friday at 10:00 AM • Product Design Hub',
      attending: 18,
      location: 'Virtual',
      badges: ['Upcoming']
    }
  ];

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-primary/20 text-foreground">{part}</mark> : part
    );
  };

  if (!isOpen) return null;

  const hasQuery = searchQuery.trim().length > 0;
  const hasResults = hasQuery;

  // Shared tab button style helper
  const tabClass = (active: boolean) =>
    `py-3 border-b-2 transition-colors ${
      active
        ? 'border-primary text-primary'
        : 'border-transparent text-muted-foreground hover:text-foreground'
    }`;

  // Shared dropdown menu item style
  const dropdownItemClass = "w-full px-3 py-2 text-left text-xs text-foreground hover:bg-accent flex items-center justify-between";

  // Shared dropdown container style
  const dropdownMenuClass = "absolute top-full left-0 mt-1 bg-popover rounded-lg border border-border py-1 z-20";

  // Filter pill style helper
  const filterPillClass = (active: boolean) =>
    `px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
      active
        ? 'bg-primary text-primary-foreground'
        : 'bg-card text-foreground border border-input hover:border-muted-foreground'
    }`;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 pointer-events-none">
        <div 
          className="w-full max-w-4xl bg-popover rounded-xl border border-border overflow-hidden pointer-events-auto animate-in slide-in-from-top-4 fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title Bar */}
          {hasQuery && (
            <div className="border-b border-border px-6 py-3 bg-muted flex items-center justify-between">
              <p className="text-sm text-foreground">
                Search results for <span className="font-medium text-foreground">"{searchQuery}"</span>
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                Clear <X className="size-3" />
              </button>
            </div>
          )}

          {/* Search Input */}
          <div className="relative border-b border-border">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search communities, courses, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
            />
          </div>

          {/* Tabs with counts */}
          {hasResults && (
            <div className="border-b border-border px-6 bg-popover">
              <div className="flex items-center gap-6">
                {(['all', 'communities', 'events', 'courses', 'people'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={tabClass(activeTab === tab)}
                  >
                    <span className="text-sm font-medium capitalize">{tab}</span>
                    <span className="ml-2 text-xs text-muted-foreground">({resultCounts[tab]})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filters and Sort */}
          {hasResults && (
            <div className="border-b border-border px-6 py-3 bg-muted">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {availableFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id)}
                      className={filterPillClass(activeFilters.includes(filter.id))}
                    >
                      <span>{filter.icon}</span>
                      <span>{filter.label.replace(filter.icon + ' ', '')}</span>
                      {activeFilters.includes(filter.id) && <X className="size-3" />}
                    </button>
                  ))}
                  
                  {/* Date Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDateMenu(!showDateMenu)}
                      className={filterPillClass(dateFilter !== 'all-time')}
                    >
                      <Clock className="size-3.5" />
                      <span>{dateFilter === 'all-time' ? 'All time' : dateFilter === 'last-7-days' ? 'Last 7 days' : dateFilter === 'this-month' ? 'This month' : 'This year'}</span>
                      <ChevronDown className="size-3" />
                    </button>
                    
                    {showDateMenu && (
                      <div className={`${dropdownMenuClass} w-40`}>
                        {[
                          { value: 'all-time', label: 'All time' },
                          { value: 'last-7-days', label: 'Last 7 days' },
                          { value: 'this-month', label: 'This month' },
                          { value: 'this-year', label: 'This year' },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => { setDateFilter(opt.value); setShowDateMenu(false); }}
                            className={dropdownItemClass}
                          >
                            {opt.label}
                            {dateFilter === opt.value && <Check className="size-3.5 text-primary" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Creator Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCreatorMenu(!showCreatorMenu)}
                      className={filterPillClass(creatorFilter !== '')}
                    >
                      <User className="size-3.5" />
                      <span>{creatorFilter || 'Any creator'}</span>
                      <ChevronDown className="size-3" />
                    </button>
                    
                    {showCreatorMenu && (
                      <div className={`${dropdownMenuClass} w-48`}>
                        <button
                          onClick={() => { setCreatorFilter(''); setShowCreatorMenu(false); }}
                          className={dropdownItemClass}
                        >
                          Any creator
                          {creatorFilter === '' && <Check className="size-3.5 text-primary" />}
                        </button>
                        <div className="h-px bg-border my-1" />
                        {['Sarah Chen', 'Alex Kumar', 'Emma Wilson'].map((name) => (
                          <button
                            key={name}
                            onClick={() => { setCreatorFilter(name); setShowCreatorMenu(false); }}
                            className={dropdownItemClass}
                          >
                            {name}
                            {creatorFilter === name && <Check className="size-3.5 text-primary" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setShowStatusMenu(!showStatusMenu)}
                      className={filterPillClass(statusFilter !== '')}
                    >
                      <Filter className="size-3.5" />
                      <span>{statusFilter || 'Any status'}</span>
                      <ChevronDown className="size-3" />
                    </button>
                    
                    {showStatusMenu && (
                      <div className={`${dropdownMenuClass} w-40`}>
                        <button
                          onClick={() => { setStatusFilter(''); setShowStatusMenu(false); }}
                          className={dropdownItemClass}
                        >
                          Any status
                          {statusFilter === '' && <Check className="size-3.5 text-primary" />}
                        </button>
                        <div className="h-px bg-border my-1" />
                        {['Draft', 'Published', 'Archived'].map((status) => (
                          <button
                            key={status}
                            onClick={() => { setStatusFilter(status); setShowStatusMenu(false); }}
                            className={dropdownItemClass}
                          >
                            {status}
                            {statusFilter === status && <Check className="size-3.5 text-primary" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {(activeFilters.length > 0 || dateFilter !== 'all-time' || creatorFilter !== '' || statusFilter !== '') && (
                    <button
                      onClick={() => {
                        clearFilters();
                        setDateFilter('all-time');
                        setCreatorFilter('');
                        setStatusFilter('');
                      }}
                      className="text-xs text-primary hover:text-primary/80 transition-colors ml-2"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>

              {/* Advanced Search Helper & Save Search */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Try: <code className="px-1.5 py-0.5 bg-accent rounded text-primary font-mono">type:course level:beginner</code>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSortMenu(!showSortMenu)}
                      className="flex items-center gap-2 text-sm text-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-muted-foreground">Sort:</span>
                      <span className="font-medium">{sortBy === 'relevant' ? 'Most relevant' : sortBy}</span>
                      <ChevronDown className="size-4 text-muted-foreground" />
                    </button>
                    
                    {showSortMenu && (
                      <div className={`${dropdownMenuClass} right-0 left-auto w-56`}>
                        {['Most relevant', 'Recently created', 'Recently updated', 'Most active', 'Alphabetical'].map((option) => (
                          <button
                            key={option}
                            onClick={() => { setSortBy(option.toLowerCase().replace(' ', '-')); setShowSortMenu(false); }}
                            className="w-full px-3 py-2 text-left text-sm text-foreground hover:bg-accent flex items-center justify-between"
                          >
                            {option}
                            {sortBy === option.toLowerCase().replace(' ', '-') && <Check className="size-4 text-primary" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Save Search Button */}
                  {hasQuery && (
                    <button
                      onClick={() => setShowSaveSearch(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-foreground hover:text-primary transition-colors"
                    >
                      <Save className="size-3.5" />
                      Save search
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="max-h-[55vh] overflow-y-auto">
            {!hasQuery ? (
              // Empty State - No Query
              <div>
                {/* Empty State Tabs */}
                <div className="border-b border-border px-6 bg-popover">
                  <div className="flex items-center gap-6">
                    {([
                      { id: 'recent' as const, label: 'Recent Searches' },
                      { id: 'suggestions' as const, label: 'Leapy Suggests' },
                      { id: 'saved' as const, label: 'Saved Searches' },
                      { id: 'actions' as const, label: 'Quick Actions' },
                    ]).map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setEmptyStateTab(tab.id)}
                        className={tabClass(emptyStateTab === tab.id)}
                      >
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="py-4 px-6">
                  {/* Recent Searches */}
                  {emptyStateTab === 'recent' && (
                    <div className="space-y-1">
                      {recentSearches.map((search, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-accent transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <Search className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm text-foreground">{search}</span>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
                            <X className="size-4 text-muted-foreground hover:text-foreground" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Leapy Suggestions */}
                  {emptyStateTab === 'suggestions' && (
                    <div className="space-y-1">
                      {leapySuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-accent transition-colors group text-left"
                        >
                          <div className="flex items-center gap-3">
                            <Sparkles className="size-4 text-primary" />
                            <span className="text-sm text-foreground">{suggestion.title}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{suggestion.type}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Saved Searches */}
                  {emptyStateTab === 'saved' && (
                    <div className="space-y-1">
                      {savedSearches.map((search, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-accent transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <Save className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="text-sm text-foreground">{search}</span>
                          </div>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
                            <Trash2 className="size-4 text-muted-foreground hover:text-foreground" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Actions */}
                  {emptyStateTab === 'actions' && (
                    <div className="space-y-1">
                      {[
                        { label: 'Create a new community', shortcut: 'N' },
                        { label: 'Create a new course', shortcut: 'C' },
                        { label: 'Create a new event', shortcut: 'E' },
                      ].map((action) => (
                        <button key={action.shortcut} className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-accent transition-colors group text-left">
                          <div className="flex items-center gap-3">
                            <Plus className="size-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{action.label}</span>
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">&#8984;{action.shortcut}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Search Results
              <div className="py-6 px-6 space-y-6">
                {/* Communities */}
                {(activeTab === 'all' || activeTab === 'communities') && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Hash className="size-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium text-foreground">Communities</h3>
                    </div>
                    <div className="space-y-2">
                      {communityResults.map((community) => (
                        <div
                          key={community.id}
                          className="border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-accent transition-all group cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Hash className="size-4 text-muted-foreground" />
                                <h4 className="font-medium text-foreground">
                                  {highlightText(community.name, searchQuery)}
                                </h4>
                                {community.badges.map((badge) => (
                                  <span
                                    key={badge}
                                    className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {highlightText(community.description, searchQuery)}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="size-3.5" />
                                  {community.members} members
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="size-3.5" />
                                  {community.courses} courses
                                </span>
                              </div>
                            </div>
                            <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors opacity-0 group-hover:opacity-100 ml-4">
                              Join
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Courses */}
                {(activeTab === 'all' || activeTab === 'courses') && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="size-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium text-foreground">Courses</h3>
                    </div>
                    <div className="space-y-2">
                      {courseResults.map((course) => (
                        <div
                          key={course.id}
                          className="border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-accent transition-all group cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <BookOpen className="size-4 text-muted-foreground" />
                                <h4 className="font-medium text-foreground">
                                  {highlightText(course.name, searchQuery)}
                                </h4>
                                {course.badges.map((badge) => (
                                  <span
                                    key={badge}
                                    className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {highlightText(course.description, searchQuery)}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="size-3.5" />
                                  {course.enrolled} enrolled
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                                  {course.rating} rating
                                </span>
                              </div>
                            </div>
                            <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors opacity-0 group-hover:opacity-100 ml-4">
                              Enroll
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events */}
                {(activeTab === 'all' || activeTab === 'events') && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="size-4 text-muted-foreground" />
                      <h3 className="text-sm font-medium text-foreground">Events</h3>
                    </div>
                    <div className="space-y-2">
                      {eventResults.map((event) => (
                        <div
                          key={event.id}
                          className="border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-accent transition-all group cursor-pointer"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="size-4 text-muted-foreground" />
                                <h4 className="font-medium text-foreground">
                                  {highlightText(event.name, searchQuery)}
                                </h4>
                                {event.badges.map((badge) => (
                                  <span
                                    key={badge}
                                    className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded"
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {highlightText(event.description, searchQuery)}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="size-3.5" />
                                  {event.attending} attending
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="size-3.5" />
                                  {event.location}
                                </span>
                              </div>
                            </div>
                            <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors opacity-0 group-hover:opacity-100 ml-4">
                              RSVP
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-6 py-3 bg-muted">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-card rounded border border-input">
                    <span className="font-mono">&#8593;</span>
                  </div>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-card rounded border border-input">
                    <span className="font-mono">&#8595;</span>
                  </div>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-card rounded border border-input">
                    <span className="font-mono">&#8629;</span>
                  </div>
                  <span>to select</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-card rounded border border-input">
                    <span className="font-mono">esc</span>
                  </div>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

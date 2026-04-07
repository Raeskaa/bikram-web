import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Star,
  Search,
  MoreVertical,
  MessageSquare,
  Pin,
  Flag,
  ThumbsUp,
  Eye,
  EyeOff,
  Send,
  AlertCircle,
  CheckCircle,
  X,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { FlagReviewDialog, FLAG_REASON_LABELS, type FlagReport } from './FlagReviewDialog';

// ─── Types ──────────────────────────────────────────────────────

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  userEmail: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  hostResponse: string | null;
  pinned: boolean;
  hidden: boolean;
  hiddenReason?: string;
  flags: FlagReport[];
  verified: boolean;
}

type FilterType = 'all' | 'responded' | 'pending' | 'flagged' | 'hidden' | 'pinned';
type SortType = 'newest' | 'oldest' | 'highest' | 'lowest' | 'most-helpful';

// ─── Mock Data ──────────────────────────────────────────────────

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Sarah Mitchell',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop',
    userEmail: 'sarah.m@gmail.com',
    rating: 5,
    date: 'Jan 20, 2026',
    text: 'Absolutely transformative workshop! The hands-on exercises were practical and immediately applicable to my work. Worth every penny.',
    helpful: 24,
    hostResponse: 'Thank you Sarah! So glad you found it valuable. Keep building amazing things!',
    pinned: true,
    hidden: false,
    flags: [],
    verified: true,
  },
  {
    id: 'r2',
    userName: 'Michael Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
    userEmail: 'mchen@outlook.com',
    rating: 5,
    date: 'Jan 18, 2026',
    text: "Best AI workshop I've attended. The instructor really knows their stuff and makes complex concepts easy to understand.",
    helpful: 18,
    hostResponse: null,
    pinned: false,
    hidden: false,
    flags: [],
    verified: true,
  },
  {
    id: 'r3',
    userName: 'Emily Rodriguez',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop',
    userEmail: 'emily.r@company.co',
    rating: 4,
    date: 'Jan 15, 2026',
    text: "Great content and good pace. Would have loved more time for Q&A but overall excellent experience.",
    helpful: 12,
    hostResponse: "Thanks Emily! We've added 15 extra minutes for Q&A in upcoming sessions based on your feedback.",
    pinned: false,
    hidden: false,
    flags: [],
    verified: true,
  },
  {
    id: 'r4',
    userName: 'James Park',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop',
    userEmail: 'jpark@tech.io',
    rating: 5,
    date: 'Jan 12, 2026',
    text: 'Mind-blowing session. The live coding demos were incredibly helpful and the instructor answered every question thoroughly.',
    helpful: 31,
    hostResponse: null,
    pinned: false,
    hidden: false,
    flags: [],
    verified: true,
  },
  {
    id: 'r5',
    userName: 'Lisa Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&fit=crop',
    userEmail: 'lisa.t@email.com',
    rating: 3,
    date: 'Jan 10, 2026',
    text: 'Content was good but felt rushed at times. The pace was too fast for beginners. Would recommend splitting into beginner and advanced tracks.',
    helpful: 8,
    hostResponse: null,
    pinned: false,
    hidden: false,
    flags: [],
    verified: true,
  },
  {
    id: 'r6',
    userName: 'Anonymous User',
    userAvatar: '',
    userEmail: 'anon@spam.com',
    rating: 1,
    date: 'Jan 8, 2026',
    text: 'This is spam content that should be flagged.',
    helpful: 0,
    hostResponse: null,
    pinned: false,
    hidden: false,
    flags: [
      {
        id: 'f1',
        userId: 'u1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        reason: 'spam',
        timestamp: 'Jan 9, 2026',
      },
      {
        id: 'f2',
        userId: 'u2',
        userName: 'Jane Smith',
        userEmail: 'jane@example.com',
        reason: 'offensive',
        timestamp: 'Jan 9, 2026',
      },
    ],
    verified: false,
  },
];

// ─── Component ──────────────────────────────────────────────────

interface ReviewsManagementProps {
  eventTitle?: string;
}

export function ReviewsManagement({ eventTitle }: ReviewsManagementProps) {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortType, setSortType] = useState<SortType>('newest');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [editingReply, setEditingReply] = useState<string | null>(null);
  const [editReplyText, setEditReplyText] = useState('');
  const [expandedFlags, setExpandedFlags] = useState<Set<string>>(new Set());
  
  // Flag dialog state
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [flaggingReviewId, setFlaggingReviewId] = useState<string | null>(null);
  
  // Current user (mock - in real app this would come from auth context)
  const currentUser = { id: 'u-current', name: 'Sarah Chen', email: 'sarah.chen@gmail.com' };

  // ── Computed ──
  const averageRating = reviews.filter(r => !r.hidden).length > 0
    ? reviews.filter(r => !r.hidden).reduce((sum, r) => sum + r.rating, 0) / reviews.filter(r => !r.hidden).length
    : 0;
  const totalVisible = reviews.filter(r => !r.hidden).length;
  const pendingCount = reviews.filter(r => !r.hostResponse && !r.hidden && !r.flags.length).length;
  const flaggedCount = reviews.filter(r => r.flags.length > 0 && !r.hidden).length;
  const respondedCount = reviews.filter(r => r.hostResponse && !r.hidden).length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars && !r.hidden).length,
    percent: totalVisible > 0
      ? Math.round((reviews.filter(r => r.rating === stars && !r.hidden).length / totalVisible) * 100)
      : 0,
  }));

  // ── Filter & Sort ──
  const filteredReviews = reviews
    .filter(r => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!r.userName.toLowerCase().includes(q) && !r.text.toLowerCase().includes(q)) return false;
      }
      switch (filterType) {
        case 'responded': return !!r.hostResponse && !r.hidden;
        case 'pending': return !r.hostResponse && !r.hidden && !r.flags.length;
        case 'flagged': return r.flags.length > 0;
        case 'hidden': return r.hidden;
        case 'pinned': return r.pinned && !r.hidden;
        default: return true;
      }
    })
    .sort((a, b) => {
      // Pinned first always
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      switch (sortType) {
        case 'oldest': return 0;
        case 'highest': return b.rating - a.rating;
        case 'lowest': return a.rating - b.rating;
        case 'most-helpful': return b.helpful - a.helpful;
        default: return 0;
      }
    });

  // ── Actions ──
  const handleReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, hostResponse: replyText.trim() } : r
    ));
    setReplyingTo(null);
    setReplyText('');
    toast.success('Reply posted!', { description: 'Your response is now visible to everyone.' });
  };

  const handleEditReply = (reviewId: string) => {
    if (!editReplyText.trim()) return;
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, hostResponse: editReplyText.trim() } : r
    ));
    setEditingReply(null);
    setEditReplyText('');
    toast.success('Reply updated.');
  };

  const handleDeleteReply = (reviewId: string) => {
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, hostResponse: null } : r
    ));
    toast.success('Reply removed.');
  };

  const handleTogglePin = (reviewId: string) => {
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, pinned: !r.pinned } : r
    ));
    const review = reviews.find(r => r.id === reviewId);
    toast.success(review?.pinned ? 'Unpinned review.' : 'Pinned to top!');
  };

  const handleToggleHide = (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId);
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { 
        ...r, 
        hidden: !r.hidden, 
        hiddenReason: !r.hidden ? 'Hidden due to community flags' : undefined,
        pinned: r.hidden ? r.pinned : false 
      } : r
    ));
    toast.success(review?.hidden ? 'Review restored.' : 'Review hidden from public view.');
  };

  const handleOpenFlagDialog = (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId);
    const userAlreadyFlagged = review?.flags.some(f => f.userId === currentUser.id);
    
    if (userAlreadyFlagged) {
      toast.error('You\'ve already flagged this review');
      return;
    }
    
    setFlaggingReviewId(reviewId);
    setFlagDialogOpen(true);
  };

  const toggleFlagExpansion = (reviewId: string) => {
    setExpandedFlags(prev => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  const FILTER_PILLS: { value: FilterType; label: string; count?: number }[] = [
    { value: 'all', label: 'All', count: reviews.length },
    { value: 'pending', label: 'Needs Reply', count: pendingCount },
    { value: 'responded', label: 'Responded', count: respondedCount },
    { value: 'pinned', label: 'Pinned', count: reviews.filter(r => r.pinned).length },
    { value: 'flagged', label: 'Flagged', count: flaggedCount },
    { value: 'hidden', label: 'Hidden', count: reviews.filter(r => r.hidden).length },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-foreground">Reviews & Feedback</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {totalVisible} review{totalVisible !== 1 ? 's' : ''} &middot; {pendingCount} awaiting response
            {flaggedCount > 0 && <span className="text-red-600"> &middot; {flaggedCount} flagged</span>}
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Average Rating */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map(s => (
              <Star
                key={s}
                className={`size-3.5 ${s <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
              />
            ))}
          </div>
          <p className="text-2xl text-foreground">{averageRating.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground">{totalVisible} reviews</p>
        </div>

        {/* Response Rate */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="size-3.5 text-muted-foreground" />
          </div>
          <p className="text-2xl text-foreground">
            {totalVisible > 0 ? Math.round((respondedCount / totalVisible) * 100) : 0}%
          </p>
          <p className="text-xs text-muted-foreground">Response rate</p>
        </div>

        {/* Needs Reply */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="size-3.5 text-amber-500" />
          </div>
          <p className="text-2xl text-foreground">{pendingCount}</p>
          <p className="text-xs text-muted-foreground">Needs reply</p>
        </div>

        {/* Flagged */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Flag className="size-3.5 text-red-500" />
          </div>
          <p className="text-2xl text-foreground">{flaggedCount}</p>
          <p className="text-xs text-muted-foreground">Flagged</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="border border-border rounded-lg p-4">
        <p className="text-sm text-foreground mb-3">Rating Distribution</p>
        <div className="space-y-2">
          {ratingDistribution.map(({ stars, count, percent }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-xs text-muted-foreground w-4">{stars}</span>
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-12 text-right">{count} ({percent}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9 rounded-lg"
          />
        </div>
        <select
          value={sortType}
          onChange={e => setSortType(e.target.value as SortType)}
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="highest">Highest rated</option>
          <option value="lowest">Lowest rated</option>
          <option value="most-helpful">Most helpful</option>
        </select>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-1.5 flex-wrap">
        {FILTER_PILLS.map(pill => (
          <Button
            key={pill.value}
            variant={filterType === pill.value ? 'secondary' : 'ghost'}
            size="sm"
            className="rounded-lg text-xs"
            onClick={() => setFilterType(pill.value)}
          >
            {pill.label}
            {pill.count !== undefined && pill.count > 0 && (
              <span className="ml-1.5 text-muted-foreground">{pill.count}</span>
            )}
          </Button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {filteredReviews.map(review => {
          const userAlreadyFlagged = review.flags.some(f => f.userId === currentUser.id);
          const isFlagExpanded = expandedFlags.has(review.id);

          return (
            <div
              key={review.id}
              className={`border rounded-lg p-4 transition-colors ${
                review.hidden
                  ? 'border-border/50 bg-muted/30'
                  : review.flags.length > 0
                  ? 'border-red-200 bg-red-50/30'
                  : review.pinned
                  ? 'border-primary/20 bg-primary/[0.02]'
                  : 'border-border'
              }`}
            >
              {/* Hidden Review Placeholder */}
              {review.hidden ? (
                <div className="flex items-start gap-3">
                  <div className="size-9 rounded-full bg-muted flex items-center justify-center">
                    <EyeOff className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="rounded shadow-none text-[10px] h-5">
                        <EyeOff className="size-2.5 mr-1" />
                        Hidden
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      This comment was removed by the event creator due to community flags
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => handleToggleHide(review.id)}
                      >
                        <Eye className="size-3 mr-1.5" />
                        Restore
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular Review Display */
                <div className="flex items-start gap-3">
                  <Avatar className="size-9">
                    <AvatarImage src={review.userAvatar} />
                    <AvatarFallback>{review.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-foreground">{review.userName}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="rounded shadow-none text-[10px] h-5 bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="size-2.5 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {review.pinned && (
                          <Badge variant="secondary" className="rounded shadow-none text-[10px] h-5">
                            <Pin className="size-2.5 mr-1" />
                            Pinned
                          </Badge>
                        )}
                        {review.flags.length > 0 && (
                          <Badge variant="secondary" className="rounded shadow-none text-[10px] h-5 bg-red-50 text-red-600 border-red-200">
                            <Flag className="size-2.5 mr-1" />
                            {review.flags.length} Flag{review.flags.length !== 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="size-7 p-0">
                              <MoreVertical className="size-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-lg">
                            <DropdownMenuItem onClick={() => handleTogglePin(review.id)}>
                              <Pin className="size-3.5 mr-2" />
                              {review.pinned ? 'Unpin' : 'Pin to Top'}
                            </DropdownMenuItem>
                            {/* Only show Hide option on flagged reviews */}
                            {review.flags.length > 0 && (
                              <DropdownMenuItem onClick={() => handleToggleHide(review.id)}>
                                <EyeOff className="size-3.5 mr-2" />
                                Hide from Public
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mt-1 mb-2">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star
                          key={s}
                          className={`size-3.5 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-muted-foreground">{review.text}</p>

                    {/* Helpful count */}
                    {review.helpful > 0 && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <ThumbsUp className="size-3" />
                        <span>{review.helpful} found this helpful</span>
                      </div>
                    )}

                    {/* Public Flag Button */}
                    <div className="mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-muted-foreground hover:text-red-600"
                        onClick={() => handleOpenFlagDialog(review.id)}
                        disabled={userAlreadyFlagged}
                      >
                        <Flag className="size-3 mr-1.5" />
                        {userAlreadyFlagged ? 'You flagged this' : 'Flag as inappropriate'}
                      </Button>
                    </div>

                    {/* Flag Details (Creator View) */}
                    {review.flags.length > 0 && (
                      <div className="mt-3 p-3 bg-red-50/50 border border-red-200 rounded-lg">
                        <button
                          onClick={() => toggleFlagExpansion(review.id)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <div className="flex items-center gap-2">
                            <Flag className="size-3.5 text-red-600" />
                            <span className="text-sm text-red-600 font-medium">
                              {review.flags.length} flag report{review.flags.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <ChevronDown className={`size-3.5 text-red-600 transition-transform ${isFlagExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {isFlagExpanded && (
                          <div className="mt-3 space-y-2">
                            {review.flags.map(flag => (
                              <div key={flag.id} className="p-2 bg-background rounded border border-red-100">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-foreground font-medium">{flag.userName}</span>
                                  <span className="text-[10px] text-muted-foreground">{flag.timestamp}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="text-[10px] h-4 bg-red-50 text-red-700 border-red-200">
                                    {FLAG_REASON_LABELS[flag.reason]}
                                  </Badge>
                                </div>
                                {flag.reasonText && (
                                  <p className="text-xs text-muted-foreground mt-1 italic">"{flag.reasonText}"</p>
                                )}
                              </div>
                            ))}
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full h-7 text-xs border-red-200 text-red-600 hover:bg-red-50 mt-2"
                              onClick={() => handleToggleHide(review.id)}
                            >
                              <EyeOff className="size-3 mr-1.5" />
                              Hide This Review
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Host Response */}
                    {review.hostResponse && editingReply !== review.id && (
                      <div className="mt-3 ml-4 pl-3 border-l-2 border-primary/20">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="secondary" className="rounded shadow-none text-[10px] h-5 bg-primary/5 text-foreground border-primary/10">
                            Host Response
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="size-6 p-0">
                                <MoreVertical className="size-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-lg">
                              <DropdownMenuItem onClick={() => {
                                setEditingReply(review.id);
                                setEditReplyText(review.hostResponse || '');
                              }}>
                                Edit Reply
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteReply(review.id)}
                              >
                                Delete Reply
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.hostResponse}</p>
                      </div>
                    )}

                    {/* Edit Reply Inline */}
                    {editingReply === review.id && (
                      <div className="mt-3 ml-4 pl-3 border-l-2 border-primary/20 space-y-2">
                        <Textarea
                          value={editReplyText}
                          onChange={e => setEditReplyText(e.target.value)}
                          placeholder="Edit your reply..."
                          className="rounded-lg text-sm min-h-[80px]"
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none text-xs"
                            onClick={() => handleEditReply(review.id)}
                            disabled={!editReplyText.trim()}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-lg text-xs"
                            onClick={() => {
                              setEditingReply(null);
                              setEditReplyText('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Reply CTA */}
                    {!review.hostResponse && replyingTo !== review.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-xs rounded-lg"
                        onClick={() => {
                          setReplyingTo(review.id);
                          setReplyText('');
                        }}
                      >
                        <MessageSquare className="size-3 mr-1.5" />
                        Reply
                      </Button>
                    )}

                    {/* Reply Composer */}
                    {replyingTo === review.id && (
                      <div className="mt-3 space-y-2">
                        <Textarea
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          placeholder={`Reply to ${review.userName}...`}
                          className="rounded-lg text-sm min-h-[80px]"
                          autoFocus
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none text-xs"
                            onClick={() => handleReply(review.id)}
                            disabled={!replyText.trim()}
                          >
                            <Send className="size-3 mr-1.5" />
                            Post Reply
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="rounded-lg text-xs"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText('');
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredReviews.length === 0 && (
          <div className="text-center py-10 border border-dashed border-border rounded-lg">
            <Star className="size-8 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {searchQuery || filterType !== 'all'
                ? 'No reviews match your filters.'
                : 'No reviews yet. Reviews will appear here after your event.'}
            </p>
          </div>
        )}
      </div>

      {/* Flag Dialog */}
      <FlagReviewDialog
        open={flagDialogOpen}
        onOpenChange={setFlagDialogOpen}
        reviewId={flaggingReviewId || ''}
        reviewAuthor={reviews.find(r => r.id === flaggingReviewId)?.userName || ''}
        onSubmit={(flag) => {
          if (!flaggingReviewId) return;
          const newFlag: FlagReport = {
            ...flag,
            id: `flag-${Date.now()}`,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          };
          setReviews(prev => prev.map(r =>
            r.id === flaggingReviewId ? { ...r, flags: [...r.flags, newFlag] } : r
          ));
          toast.success('Review flagged', { description: 'You will be notified when the creator reviews your report.' });
        }}
      />
    </div>
  );
}
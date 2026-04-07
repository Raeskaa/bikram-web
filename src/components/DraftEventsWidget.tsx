import { Calendar, Edit, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { mockEvents, getEventCompletionCount, getEventLifecycleStage } from '../data/mockEventData';
import { useAuth } from '../contexts/AuthContext';

interface DraftEventsWidgetProps {
  onContinueBuilding: (eventId: string) => void;
}

export function DraftEventsWidget({ onContinueBuilding }: DraftEventsWidgetProps) {
  const { currentUser } = useAuth();
  const userEmail = currentUser?.email || '';

  const draftEvents = mockEvents.filter(
    e => e.status === 'draft' && e.creatorEmail === userEmail
  );

  if (draftEvents.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Edit className="size-5 text-primary" />
          <h2 className="text-foreground">Drafts in Progress</h2>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 rounded-md shadow-none">
          {draftEvents.length} draft{draftEvents.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-3">
        {draftEvents.map(event => {
          const completion = getEventCompletionCount(event);
          const percent = Math.round((completion.done / completion.total) * 100);
          const lifecycle = getEventLifecycleStage(event);

          return (
            <button
              key={event.id}
              onClick={() => onContinueBuilding(event.id)}
              className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-foreground text-sm font-medium truncate">
                      {event.title}
                    </h3>
                    <Badge
                      className={`text-[10px] px-1.5 py-0 rounded-md shadow-none ${
                        lifecycle === 'ready'
                          ? 'bg-green-50 text-green-700 border-green-100'
                          : lifecycle === 'building'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-muted text-muted-foreground border-border'
                      }`}
                    >
                      {lifecycle === 'ready' ? 'Ready' : lifecycle === 'building' ? 'Building' : 'Draft'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {event.date ? new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
                    </span>
                    <span className="capitalize">{event.location || 'Virtual'}</span>
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </div>

              <div className="flex items-center gap-3">
                <Progress value={percent} className="flex-1 h-1.5" />
                <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">
                  {completion.done}/{completion.total} done
                </span>
              </div>

              {lifecycle === 'ready' && (
                <div className="mt-2 flex items-center gap-1 text-xs text-green-700">
                  <CheckCircle className="size-3" />
                  <span>Ready to publish</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

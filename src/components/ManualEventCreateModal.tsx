import { useState } from 'react';
import { Calendar, Clock, MapPin, Video, Users, Layers } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

type EventType = 'virtual' | 'in-person' | 'hybrid';

interface ManualEventCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    type: EventType;
    date: string;
    time: string;
    endTime?: string;
    location?: string;
    description?: string;
    capacity?: number;
  }) => void;
}

const typeOptions: { value: EventType; label: string; icon: React.ReactNode }[] = [
  { value: 'virtual', label: 'Virtual', icon: <Video className="size-4" /> },
  { value: 'in-person', label: 'In-Person', icon: <MapPin className="size-4" /> },
  { value: 'hybrid', label: 'Hybrid', icon: <Layers className="size-4" /> },
];

export function ManualEventCreateModal({ open, onOpenChange, onSubmit }: ManualEventCreateModalProps) {
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<EventType>('virtual');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');

  const needsLocation = eventType === 'in-person' || eventType === 'hybrid';
  const isValid = title.trim() && date && time && (!needsLocation || location.trim());

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit({
      title: title.trim(),
      type: eventType,
      date,
      time,
      endTime: endTime || undefined,
      location: needsLocation ? location.trim() : 'Virtual Event',
      description: description.trim() || undefined,
      capacity: capacity ? parseInt(capacity, 10) : undefined,
    });
    // Reset form
    setTitle('');
    setEventType('virtual');
    setDate('');
    setTime('');
    setEndTime('');
    setLocation('');
    setDescription('');
    setCapacity('');
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setTitle('');
      setEventType('virtual');
      setDate('');
      setTime('');
      setEndTime('');
      setLocation('');
      setDescription('');
      setCapacity('');
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[520px] gap-0 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-foreground">Create Event</DialogTitle>
          <DialogDescription>
            Fill in the basics. You can refine everything in the builder.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* Event Name */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Event name <span className="text-destructive">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Product Launch Meetup"
              className="shadow-none"
              autoFocus
            />
          </div>

          {/* Event Type */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Format</label>
            <div className="grid grid-cols-3 gap-2">
              {typeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setEventType(opt.value)}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-colors cursor-pointer ${
                    eventType === opt.value
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-input hover:text-foreground'
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">
              Date & time <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-9 shadow-none"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-9 shadow-none"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="pl-9 shadow-none"
                  placeholder="End"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">End time is optional</p>
          </div>

          {/* Location (conditional) */}
          {needsLocation && (
            <div className="space-y-1.5">
              <label className="text-sm text-muted-foreground">
                Location <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Venue name or address"
                  className="pl-9 shadow-none"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this event about? (optional)"
              className="min-h-[80px] resize-none shadow-none"
            />
          </div>

          {/* Capacity */}
          <div className="space-y-1.5">
            <label className="text-sm text-muted-foreground">Capacity</label>
            <div className="relative w-40">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Unlimited"
                min={1}
                className="pl-9 shadow-none"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="shadow-none"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="shadow-none"
          >
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

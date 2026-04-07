import { useState, useRef, useEffect } from 'react';
import { Clock, ChevronDown, Globe } from 'lucide-react';

interface TimeSelectorProps {
  value: string;
  onChange: (time: string) => void;
  label?: string;
  placeholder?: string;
}

// Generate time slots in 15-min increments
const TIME_SLOTS: { value: string; label: string; period: 'morning' | 'afternoon' | 'evening' }[] = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 15) {
    const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    const ampm = h < 12 ? 'AM' : 'PM';
    const label = `${h12}:${m.toString().padStart(2, '0')} ${ampm}`;
    const value = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    const period = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
    TIME_SLOTS.push({ value, label, period });
  }
}

const COMMON_TIMES = ['09:00', '10:00', '12:00', '14:00', '15:00', '18:00'];

// Format 24h time to 12h display
function formatTimeDisplay(time: string): string {
  if (!time) return '';
  const [hStr, mStr] = time.split(':');
  const h = parseInt(hStr, 10);
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const ampm = h < 12 ? 'AM' : 'PM';
  return `${h12}:${mStr} ${ampm}`;
}

export function TimeSelector({ value, onChange, label, placeholder = 'Select time' }: TimeSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Scroll to selected time when opening
  useEffect(() => {
    if (open && value && listRef.current) {
      const idx = TIME_SLOTS.findIndex(s => s.value === value);
      if (idx >= 0) {
        setTimeout(() => {
          listRef.current?.children[idx]?.scrollIntoView({ block: 'center' });
        }, 50);
      }
    }
  }, [open, value]);

  const filtered = search
    ? TIME_SLOTS.filter(s => s.label.toLowerCase().includes(search.toLowerCase()))
    : TIME_SLOTS;

  // Group by period
  const groups = {
    morning: filtered.filter(s => s.period === 'morning'),
    afternoon: filtered.filter(s => s.period === 'afternoon'),
    evening: filtered.filter(s => s.period === 'evening'),
  };

  return (
    <div className="relative" ref={ref}>
      {label && <label className="text-sm text-muted-foreground block mb-1.5">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-10 px-3 flex items-center gap-2 rounded-lg border transition-colors text-left cursor-pointer ${
          open ? 'border-primary bg-card' : 'border-border bg-card hover:border-input'
        }`}
      >
        <Clock className="size-4 text-muted-foreground flex-shrink-0" />
        <span className={`flex-1 text-sm ${value ? 'text-foreground' : 'text-muted-foreground'}`}>
          {value ? formatTimeDisplay(value) : placeholder}
        </span>
        <ChevronDown className={`size-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-border">
            <input
              type="text"
              placeholder="Search time..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 px-3 text-sm bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              autoFocus
            />
          </div>

          {/* Time list */}
          <div ref={listRef} className="max-h-52 overflow-auto py-1">
            {!search && (
              <>
                {groups.morning.length > 0 && (
                  <>
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Morning</div>
                    {groups.morning.map(slot => (
                      <TimeSlotButton key={slot.value} slot={slot} selected={value === slot.value} isCommon={COMMON_TIMES.includes(slot.value)} onClick={() => { onChange(slot.value); setOpen(false); setSearch(''); }} />
                    ))}
                  </>
                )}
                {groups.afternoon.length > 0 && (
                  <>
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Afternoon</div>
                    {groups.afternoon.map(slot => (
                      <TimeSlotButton key={slot.value} slot={slot} selected={value === slot.value} isCommon={COMMON_TIMES.includes(slot.value)} onClick={() => { onChange(slot.value); setOpen(false); setSearch(''); }} />
                    ))}
                  </>
                )}
                {groups.evening.length > 0 && (
                  <>
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Evening</div>
                    {groups.evening.map(slot => (
                      <TimeSlotButton key={slot.value} slot={slot} selected={value === slot.value} isCommon={COMMON_TIMES.includes(slot.value)} onClick={() => { onChange(slot.value); setOpen(false); setSearch(''); }} />
                    ))}
                  </>
                )}
              </>
            )}
            {search && filtered.map(slot => (
              <TimeSlotButton key={slot.value} slot={slot} selected={value === slot.value} isCommon={COMMON_TIMES.includes(slot.value)} onClick={() => { onChange(slot.value); setOpen(false); setSearch(''); }} />
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">No matching times</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TimeSlotButton({ slot, selected, isCommon, onClick }: { slot: { value: string; label: string }; selected: boolean; isCommon: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-2 text-left text-sm transition-colors cursor-pointer flex items-center gap-2 ${
        selected ? 'bg-primary/10 text-primary' : 'text-popover-foreground hover:bg-accent'
      }`}
    >
      <span className="flex-1">{slot.label}</span>
      {isCommon && !selected && <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">Popular</span>}
    </button>
  );
}

// Duration calculator helper
export function calculateDuration(startTime: string, endTime: string): string {
  if (!startTime || !endTime) return '';
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  let diffMin = (eh * 60 + em) - (sh * 60 + sm);
  if (diffMin <= 0) diffMin += 24 * 60; // overnight
  const hours = Math.floor(diffMin / 60);
  const mins = diffMin % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

// Timezone selector
const COMMON_TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)', offset: 'UTC-5' },
  { value: 'America/Chicago', label: 'Central Time (CT)', offset: 'UTC-6' },
  { value: 'America/Denver', label: 'Mountain Time (MT)', offset: 'UTC-7' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: 'UTC-8' },
  { value: 'Europe/London', label: 'London (GMT)', offset: 'UTC+0' },
  { value: 'Europe/Paris', label: 'Paris (CET)', offset: 'UTC+1' },
  { value: 'Europe/Berlin', label: 'Berlin (CET)', offset: 'UTC+1' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)', offset: 'UTC+4' },
  { value: 'Asia/Kolkata', label: 'India (IST)', offset: 'UTC+5:30' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)', offset: 'UTC+8' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: 'UTC+9' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)', offset: 'UTC+10' },
];

interface TimezoneSelectorProps {
  value: string;
  onChange: (tz: string) => void;
}

export function TimezoneSelector({ value, onChange }: TimezoneSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = COMMON_TIMEZONES.find(tz => tz.value === value);
  const displayLabel = current ? current.label : value || 'Select timezone';

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full h-10 px-3 flex items-center gap-2 rounded-lg border transition-colors text-left cursor-pointer ${
          open ? 'border-primary bg-card' : 'border-border bg-card hover:border-input'
        }`}
      >
        <Globe className="size-4 text-muted-foreground flex-shrink-0" />
        <span className="flex-1 text-sm text-foreground truncate">{displayLabel}</span>
        <ChevronDown className={`size-3.5 text-muted-foreground transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg overflow-hidden">
          <div className="max-h-48 overflow-auto py-1">
            {COMMON_TIMEZONES.map(tz => (
              <button
                key={tz.value}
                onClick={() => { onChange(tz.value); setOpen(false); }}
                className={`w-full px-3 py-2.5 text-left text-sm transition-colors cursor-pointer flex items-center justify-between ${
                  value === tz.value ? 'bg-primary/10 text-primary' : 'text-popover-foreground hover:bg-accent'
                }`}
              >
                <span>{tz.label}</span>
                <span className="text-xs text-muted-foreground">{tz.offset}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

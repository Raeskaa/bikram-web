import { useState, useMemo, useRef, useEffect } from 'react';
import {
  Calendar, Globe, Plus, ChevronLeft, ChevronRight, Clock, MapPin,
  Video, Users, Upload, Check, X, ExternalLink, Search, Sparkles,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import {
  mockEvents,
  mockRegistrations,
  type Event,
} from '../data/mockEventData';

// ═══════════════════════════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════════════════════════

type ViewMode = 'month' | 'week' | 'day';

interface CalendarEvent {
  event: Event;
  relation: 'created' | 'registered' | 'applied' | 'waitlist';
  date: string;
  hour: number;   // 0-23 parsed from event.time
  minute: number;  // 0-59
}

interface LeapSpaceCalendar {
  id: string;
  name: string;
  eventCount: number;
  subscriberCount: number;
  subscribed: boolean;
}

// ══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Time grid hours (7 AM – 9 PM)
const GRID_START_HOUR = 7;
const GRID_END_HOUR = 21;
const GRID_HOURS: number[] = [];
for (let h = GRID_START_HOUR; h <= GRID_END_HOUR; h++) GRID_HOURS.push(h);

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatDateKey(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function parseDate(dateStr: string): { year: number; month: number; day: number } {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { year: y, month: m - 1, day: d };
}

function isTodayDate(dateKey: string): boolean {
  // For demo, "today" is March 18, 2026
  return dateKey === '2026-03-18';
}

/** Parse "2:00 PM EST" → { hour: 14, minute: 0 } */
function parseTimeString(time: string): { hour: number; minute: number } {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return { hour: 9, minute: 0 };
  let hour = parseInt(match[1]);
  const minute = parseInt(match[2]);
  const ampm = match[3].toUpperCase();
  if (ampm === 'PM' && hour !== 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return { hour, minute };
}

/** Format hour to display label */
function formatHourLabel(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}

/** Format time short for pills: "2:00p" */
function formatTimeShort(hour: number, minute: number): string {
  const h = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const m = minute > 0 ? `:${String(minute).padStart(2, '0')}` : '';
  const p = hour >= 12 ? 'p' : 'a';
  return `${h}${m}${p}`;
}

/** Expand recurring events into individual occurrences within a date range */
function expandRecurringOccurrences(event: Event, startDate: string, endDate: string): string[] {
  if (!event.isRecurring || !event.recurrenceRule) return [event.date];
  if (event.occurrences && event.occurrences.length > 0) {
    return event.occurrences.filter(d => d >= startDate && d <= endDate);
  }
  const dates: string[] = [];
  const rule = event.recurrenceRule;
  const freqMatch = rule.match(/FREQ=(\w+)/);
  const countMatch = rule.match(/COUNT=(\d+)/);
  const freq = freqMatch?.[1] || 'WEEKLY';
  const count = countMatch ? parseInt(countMatch[1]) : 12;
  const base = new Date(event.date + 'T00:00:00');
  for (let i = 0; i < count; i++) {
    const d = new Date(base);
    if (freq === 'WEEKLY') d.setDate(base.getDate() + i * 7);
    else if (freq === 'DAILY') d.setDate(base.getDate() + i);
    else if (freq === 'MONTHLY') d.setMonth(base.getMonth() + i);
    const key = formatDateKey(d.getFullYear(), d.getMonth(), d.getDate());
    if (key >= startDate && key <= endDate) dates.push(key);
  }
  return dates.length > 0 ? dates : [event.date];
}

// Relation colors — semantic only
const RELATION_STYLES: Record<string, { dot: string; bg: string; border: string; label: string }> = {
  created:    { dot: 'bg-foreground',  bg: 'bg-foreground/5',  border: 'border-foreground/10', label: 'Your Event' },
  registered: { dot: 'bg-green-600',   bg: 'bg-green-600/5',   border: 'border-green-600/10',  label: 'Registered' },
  applied:    { dot: 'bg-amber-500',   bg: 'bg-amber-500/5',   border: 'border-amber-500/10',  label: 'Applied' },
  waitlist:   { dot: 'bg-orange-500',  bg: 'bg-orange-500/5',  border: 'border-orange-500/10', label: 'Waitlisted' },
};

// ═══════════════════════════════════════════════════════════════
//  MOCK LEAPSPACE CALENDARS
// ═══════════════════════════════════════════════════════════════

const POPULAR_CALENDARS: LeapSpaceCalendar[] = [
  { id: 'cal-1', name: 'React Developers Hub',    eventCount: 12, subscriberCount: 1240, subscribed: true },
  { id: 'cal-2', name: 'AI & Machine Learning',   eventCount: 8,  subscriberCount: 890,  subscribed: false },
  { id: 'cal-3', name: 'Design Engineers',         eventCount: 6,  subscriberCount: 650,  subscribed: true },
  { id: 'cal-4', name: 'Startup Founders Network', eventCount: 15, subscriberCount: 2100, subscribed: false },
  { id: 'cal-5', name: 'DevOps Engineers',         eventCount: 9,  subscriberCount: 720,  subscribed: false },
  { id: 'cal-6', name: 'Digital Marketers Guild',  eventCount: 4,  subscriberCount: 380,  subscribed: false },
];

// "Now" line position for demo (March 18 2026, 10:30 AM)
const NOW_HOUR = 10;
const NOW_MINUTE = 30;

// ═══════════════════════════════════════════════════════════════
//  COMPONENT
// ═══════════════════════════════════════════════════════════════

interface CalendarViewProps {
  onCreateClick?: () => void;
  onNavigateToEvent?: (eventId: string) => void;
}

export function CalendarView({ onCreateClick, onNavigateToEvent }: CalendarViewProps) {
  const { currentUser } = useAuth();
  const userEmail = currentUser?.email || 'sarah.chen@gmail.com';

  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 18));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [subscribedCalendars, setSubscribedCalendars] = useState<Set<string>>(
    new Set(POPULAR_CALENDARS.filter(c => c.subscribed).map(c => c.id))
  );
  const [showImportToast, setShowImportToast] = useState(false);

  const timeGridRef = useRef<HTMLDivElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Scroll time grid to ~9 AM on mount / view change
  useEffect(() => {
    if ((viewMode === 'week' || viewMode === 'day') && timeGridRef.current) {
      const scrollTo = (NOW_HOUR - GRID_START_HOUR - 1) * 64; // 64px per hour slot
      timeGridRef.current.scrollTop = Math.max(0, scrollTo);
    }
  }, [viewMode]);

  // ── Compute date range ──
  const viewRange = useMemo(() => {
    if (viewMode === 'month') {
      // Extend range to cover prev/next month padding cells
      const firstDay = getFirstDayOfMonth(year, month);
      const daysInMonth = getDaysInMonth(year, month);
      const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
      const padBefore = firstDay;
      const padAfter = totalCells - firstDay - daysInMonth;
      const startD = new Date(year, month, 1 - padBefore);
      const endD = new Date(year, month, daysInMonth + padAfter);
      return {
        start: formatDateKey(startD.getFullYear(), startD.getMonth(), startD.getDate()),
        end: formatDateKey(endD.getFullYear(), endD.getMonth(), endD.getDate()),
      };
    }
    if (viewMode === 'week') {
      const dow = currentDate.getDay();
      const ws = new Date(currentDate);
      ws.setDate(currentDate.getDate() - dow);
      const we = new Date(ws);
      we.setDate(ws.getDate() + 6);
      return {
        start: formatDateKey(ws.getFullYear(), ws.getMonth(), ws.getDate()),
        end: formatDateKey(we.getFullYear(), we.getMonth(), we.getDate()),
      };
    }
    const key = formatDateKey(year, month, currentDate.getDate());
    return { start: key, end: key };
  }, [year, month, currentDate, viewMode]);

  // ── Build calendar events ──
  const calendarEvents = useMemo(() => {
    const events: CalendarEvent[] = [];
    const createdEvents = mockEvents.filter(e => e.creatorEmail === userEmail && e.status !== 'cancelled');
    createdEvents.forEach(ev => {
      const { hour, minute } = parseTimeString(ev.time);
      const dates = expandRecurringOccurrences(ev, viewRange.start, viewRange.end);
      dates.forEach(d => events.push({ event: ev, relation: 'created', date: d, hour, minute }));
    });
    const userRegs = mockRegistrations.filter(r => r.userEmail === userEmail);
    userRegs.forEach(reg => {
      if (reg.status === 'cancelled' || reg.status === 'cancelled-by-user' || reg.status === 'rejected') return;
      const ev = mockEvents.find(e => e.id === reg.eventId);
      if (!ev || ev.status === 'cancelled') return;
      if (ev.creatorEmail === userEmail) return;
      const relation = reg.status === 'applied' ? 'applied' : reg.status === 'waitlist' ? 'waitlist' : 'registered';
      const { hour, minute } = parseTimeString(ev.time);
      const dates = expandRecurringOccurrences(ev, viewRange.start, viewRange.end);
      dates.forEach(d => events.push({ event: ev, relation, date: d, hour, minute }));
    });
    return events;
  }, [userEmail, viewRange]);

  // Check if user has created any events
  const hasCreatedEvents = useMemo(() => {
    return mockEvents.some(e => e.creatorEmail === userEmail && e.status !== 'cancelled');
  }, [userEmail]);

  // Check if user has any registrations
  const hasRegistrations = useMemo(() => {
    return mockRegistrations.some(r => 
      r.userEmail === userEmail && 
      r.status !== 'cancelled' && 
      r.status !== 'cancelled-by-user' && 
      r.status !== 'rejected'
    );
  }, [userEmail]);

  // Check if completely empty (new user with no activity)
  const isCompletelyEmpty = !hasCreatedEvents && !hasRegistrations && subscribedCalendars.size === 0;

  console.log('📊 Calendar Debug:', {
    hasCreatedEvents,
    hasRegistrations,
    subscribedCalendarsSize: subscribedCalendars.size,
    isCompletelyEmpty,
    viewMode,
    shouldShowNudge: !hasCreatedEvents && viewMode === 'month'
  });

  // ── Group by date ──
  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    calendarEvents.forEach(ce => {
      const existing = map.get(ce.date) || [];
      existing.push(ce);
      map.set(ce.date, existing);
    });
    // Sort each day's events by time
    map.forEach((events) => events.sort((a, b) => a.hour * 60 + a.minute - (b.hour * 60 + b.minute)));
    return map;
  }, [calendarEvents]);

  const selectedDateEvents = selectedDate ? (eventsByDate.get(selectedDate) || []) : [];

  // ── Navigation ──
  const navigatePrev = () => {
    const d = new Date(currentDate);
    if (viewMode === 'month') d.setMonth(d.getMonth() - 1);
    else if (viewMode === 'week') d.setDate(d.getDate() - 7);
    else d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };
  const navigateNext = () => {
    const d = new Date(currentDate);
    if (viewMode === 'month') d.setMonth(d.getMonth() + 1);
    else if (viewMode === 'week') d.setDate(d.getDate() + 7);
    else d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };
  const goToToday = () => {
    setCurrentDate(new Date(2026, 2, 18));
    if (viewMode !== 'month') setSelectedDate('2026-03-18');
  };

  const toggleSubscription = (calId: string) => {
    setSubscribedCalendars(prev => {
      const next = new Set(prev);
      if (next.has(calId)) next.delete(calId); else next.add(calId);
      return next;
    });
  };

  const handleImportIcs = () => {
    setShowImportToast(true);
    setTimeout(() => setShowImportToast(false), 3000);
  };

  // ═══════════════════════════════════════════════════════════════
  //  MINI CALENDAR (for side panel)
  // ═══════════════════════════════════════════════════════════════

  const renderMiniCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const cells: Array<{ day: number; dateKey: string; isCurrentMonth: boolean }> = [];
    const prevMonthDays = getDaysInMonth(year, month === 0 ? 11 : month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const m = month === 0 ? 11 : month - 1;
      const yr = month === 0 ? year - 1 : year;
      cells.push({ day: d, dateKey: formatDateKey(yr, m, d), isCurrentMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, dateKey: formatDateKey(year, month, d), isCurrentMonth: true });
    }
    const remaining = Math.ceil(cells.length / 7) * 7 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const m = month === 11 ? 0 : month + 1;
      const yr = month === 11 ? year + 1 : year;
      cells.push({ day: d, dateKey: formatDateKey(yr, m, d), isCurrentMonth: false });
    }

    return (
      <div className="px-5 pt-4 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-foreground">{MONTHS_SHORT[month]} {year}</span>
          <div className="flex items-center gap-0.5">
            <button onClick={navigatePrev} className="size-5 flex items-center justify-center rounded hover:bg-muted cursor-pointer">
              <ChevronLeft className="size-3 text-muted-foreground" />
            </button>
            <button onClick={navigateNext} className="size-5 flex items-center justify-center rounded hover:bg-muted cursor-pointer">
              <ChevronRight className="size-3 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0">
          {DAYS_SHORT.map((d, i) => (
            <div key={i} className="text-center text-[10px] text-muted-foreground py-1">{d}</div>
          ))}
          {cells.map((cell, i) => {
            const today = isTodayDate(cell.dateKey);
            const isSel = selectedDate === cell.dateKey;
            const hasEvents = eventsByDate.has(cell.dateKey);
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(cell.dateKey);
                  if (viewMode === 'day') {
                    const p = parseDate(cell.dateKey);
                    setCurrentDate(new Date(p.year, p.month, p.day));
                  }
                }}
                className={`size-7 flex items-center justify-center text-[11px] rounded-full cursor-pointer transition-colors relative
                  ${!cell.isCurrentMonth ? 'text-muted-foreground/30' : 'text-foreground'}
                  ${today ? 'bg-primary text-primary-foreground' : ''}
                  ${isSel && !today ? 'bg-primary/10 text-primary' : ''}
                  ${!today && !isSel ? 'hover:bg-muted' : ''}
                `}
              >
                {cell.day}
                {hasEvents && !today && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 size-1 rounded-full bg-primary/40" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  //  MONTH GRID
  // ═══════════════════════════════════════════════════════════════

  const renderMonthGrid = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month === 0 ? 11 : month - 1);
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    const cells: Array<{ day: number; dateKey: string; isCurrentMonth: boolean }> = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const m = month === 0 ? 11 : month - 1;
      const yr = month === 0 ? year - 1 : year;
      cells.push({ day: d, dateKey: formatDateKey(yr, m, d), isCurrentMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, dateKey: formatDateKey(year, month, d), isCurrentMonth: true });
    }
    const remaining = totalCells - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const m = month === 11 ? 0 : month + 1;
      const yr = month === 11 ? year + 1 : year;
      cells.push({ day: d, dateKey: formatDateKey(yr, m, d), isCurrentMonth: false });
    }

    return (
      <div className="border border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border bg-muted/50">
          {DAYS.map(day => (
            <div key={day} className="px-2 py-2.5 text-center text-xs text-muted-foreground">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => {
            const dayEvents = eventsByDate.get(cell.dateKey) || [];
            const isSel = selectedDate === cell.dateKey;
            const today = isTodayDate(cell.dateKey);

            return (
              <button
                key={i}
                onClick={() => setSelectedDate(isSel ? null : cell.dateKey)}
                className={`relative min-h-[96px] p-1.5 border-b border-r border-border text-left transition-colors cursor-pointer
                  ${!cell.isCurrentMonth ? 'bg-muted/30' : 'bg-card hover:bg-muted/40'}
                  ${isSel ? 'bg-primary/5 ring-1 ring-inset ring-primary/20' : ''}
                `}
              >
                <span className={`inline-flex items-center justify-center size-6 text-xs rounded-full
                  ${today ? 'bg-primary text-primary-foreground' : ''}
                  ${!cell.isCurrentMonth ? 'text-muted-foreground/40' : 'text-foreground'}
                `}>
                  {cell.day}
                </span>
                <div className="mt-0.5 space-y-px">
                  {dayEvents.slice(0, 3).map((ce, j) => (
                    <div
                      key={`${ce.event.id}-${j}`}
                      className={`flex items-center gap-1 px-1 py-0.5 rounded text-[10px] truncate ${RELATION_STYLES[ce.relation].bg}`}
                    >
                      <span className={`size-1.5 rounded-full flex-shrink-0 ${RELATION_STYLES[ce.relation].dot}`} />
                      <span className="text-muted-foreground flex-shrink-0">{formatTimeShort(ce.hour, ce.minute)}</span>
                      <span className="truncate text-foreground/70">{ce.event.title}</span>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-muted-foreground pl-1">+{dayEvents.length - 3} more</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  //  WEEK VIEW — Hourly Time Grid (Google Calendar style)
  // ══════════════════════════════════════════════════════════════

  const renderWeekView = () => {
    const dow = currentDate.getDay();
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - dow);

    const days: Array<{ day: number; month: number; year: number; dateKey: string; dow: number }> = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      days.push({
        day: d.getDate(), month: d.getMonth(), year: d.getFullYear(),
        dateKey: formatDateKey(d.getFullYear(), d.getMonth(), d.getDate()), dow: i,
      });
    }

    // "Now" line position
    const todayCol = days.findIndex(d => isTodayDate(d.dateKey));
    const nowOffsetPx = (NOW_HOUR - GRID_START_HOUR) * 64 + (NOW_MINUTE / 60) * 64;

    return (
      <div className="border border-border rounded-xl overflow-hidden flex flex-col">
        {/* Day column headers */}
        <div className="grid border-b border-border bg-muted/30" style={{ gridTemplateColumns: '56px repeat(7, 1fr)' }}>
          <div /> {/* gutter */}
          {days.map((d) => {
            const today = isTodayDate(d.dateKey);
            return (
              <button
                key={d.dateKey}
                onClick={() => setSelectedDate(d.dateKey)}
                className="py-3 text-center border-l border-border cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <span className="text-[11px] text-muted-foreground">{DAYS[d.dow]}</span>
                <span className={`block text-sm mt-0.5 mx-auto ${today ? 'size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center' : 'text-foreground'}`}>
                  {d.day}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scrollable time grid */}
        <div ref={timeGridRef} className="flex-1 overflow-auto max-h-[560px] relative">
          <div className="relative" style={{ minHeight: GRID_HOURS.length * 64 }}>
            {/* Hour rows */}
            {GRID_HOURS.map((hour) => (
              <div
                key={hour}
                className="absolute w-full border-b border-border/50"
                style={{ top: (hour - GRID_START_HOUR) * 64, height: 64 }}
              >
                <div className="grid" style={{ gridTemplateColumns: '56px repeat(7, 1fr)', height: '100%' }}>
                  {/* Hour label */}
                  <div className="pr-2 pt-0 text-right">
                    <span className="text-[10px] text-muted-foreground leading-none -translate-y-1/2 block">{formatHourLabel(hour)}</span>
                  </div>
                  {/* Day columns */}
                  {days.map((d) => (
                    <div key={d.dateKey} className="border-l border-border/50 relative" />
                  ))}
                </div>
              </div>
            ))}

            {/* "Now" red line */}
            {todayCol >= 0 && (
              <div
                className="absolute pointer-events-none z-20"
                style={{
                  top: nowOffsetPx,
                  left: `calc(56px + ${todayCol} * ((100% - 56px) / 7))`,
                  width: `calc((100% - 56px) / 7)`,
                }}
              >
                <div className="flex items-center">
                  <div className="size-2 rounded-full bg-red-500 -ml-1" />
                  <div className="flex-1 h-px bg-red-500" />
                </div>
              </div>
            )}

            {/* Events positioned on the grid */}
            {days.map((d, colIdx) => {
              const dayEvents = eventsByDate.get(d.dateKey) || [];
              return dayEvents.map((ce, j) => {
                const topPx = (ce.hour - GRID_START_HOUR) * 64 + (ce.minute / 60) * 64;
                if (topPx < 0) return null; // before grid start
                const style = RELATION_STYLES[ce.relation];
                return (
                  <div
                    key={`${ce.event.id}-${d.dateKey}-${j}`}
                    className={`absolute z-10 rounded-md px-1.5 py-1 text-[11px] overflow-hidden cursor-pointer border ${style.bg} ${style.border} hover:shadow-sm transition-shadow`}
                    onClick={() => onNavigateToEvent?.(ce.event.id)}
                    title={`${ce.event.title}\n${ce.event.time}`}
                    style={{
                      top: topPx,
                      left: `calc(56px + ${colIdx} * ((100% - 56px) / 7) + 2px)`,
                      width: `calc((100% - 56px) / 7 - 4px)`,
                      minHeight: 48,
                    }}
                  >
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className={`size-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
                      <span className="text-muted-foreground flex-shrink-0">{formatTimeShort(ce.hour, ce.minute)}</span>
                    </div>
                    <p className="text-foreground/80 truncate">{ce.event.title}</p>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  //  DAY VIEW — Hourly Time Grid (single column)
  // ═══════════════════════════════════════════════════════════════

  const renderDayView = () => {
    const dateKey = formatDateKey(year, month, currentDate.getDate());
    const dayEvents = eventsByDate.get(dateKey) || [];
    const today = isTodayDate(dateKey);
    const nowOffsetPx = (NOW_HOUR - GRID_START_HOUR) * 64 + (NOW_MINUTE / 60) * 64;

    return (
      <div className="border border-border rounded-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">
              {DAYS[currentDate.getDay()]}, {MONTHS[month]} {currentDate.getDate()}, {year}
            </p>
            <p className="text-xs text-muted-foreground">{dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}</p>
          </div>
          {today && <Badge className="bg-primary/10 text-primary border-none shadow-none text-[10px]">Today</Badge>}
        </div>

        {/* Scrollable time grid */}
        <div ref={viewMode === 'day' ? timeGridRef : undefined} className="flex-1 overflow-auto max-h-[560px] relative">
          <div className="relative" style={{ minHeight: GRID_HOURS.length * 64 }}>
            {/* Hour rows */}
            {GRID_HOURS.map((hour) => (
              <div
                key={hour}
                className="absolute w-full border-b border-border/50"
                style={{ top: (hour - GRID_START_HOUR) * 64, height: 64 }}
              >
                <div className="flex" style={{ height: '100%' }}>
                  <div className="w-14 pr-2 text-right flex-shrink-0">
                    <span className="text-[10px] text-muted-foreground leading-none -translate-y-1/2 block">{formatHourLabel(hour)}</span>
                  </div>
                  <div className="flex-1 border-l border-border/50" />
                </div>
              </div>
            ))}

            {/* "Now" red line */}
            {today && (
              <div
                className="absolute pointer-events-none z-20 left-14 right-0"
                style={{ top: nowOffsetPx }}
              >
                <div className="flex items-center">
                  <div className="size-2 rounded-full bg-red-500 -ml-1" />
                  <div className="flex-1 h-px bg-red-500" />
                </div>
              </div>
            )}

            {/* Events */}
            {dayEvents.map((ce, j) => {
              const topPx = (ce.hour - GRID_START_HOUR) * 64 + (ce.minute / 60) * 64;
              if (topPx < 0) return null;
              const style = RELATION_STYLES[ce.relation];
              return (
                <div
                  key={`${ce.event.id}-${j}`}
                  className={`absolute z-10 rounded-lg px-3 py-2 overflow-hidden cursor-pointer border ${style.bg} ${style.border} hover:shadow-sm transition-shadow`}
                  onClick={() => onNavigateToEvent?.(ce.event.id)}
                  style={{
                    top: topPx,
                    left: 60,
                    right: 8,
                    minHeight: 56,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full flex-shrink-0 ${style.dot}`} />
                    <span className="text-xs text-muted-foreground">{ce.event.time}</span>
                    <Badge className={`text-[10px] px-1.5 py-0 shadow-none border ${style.bg} ${style.border} text-foreground/60`}>
                      {style.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mt-1">{ce.event.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {ce.event.location === 'virtual' ? <Video className="size-3" /> : <MapPin className="size-3" />}
                      {ce.event.location === 'virtual' ? 'Virtual' : ce.event.locationDetails || 'In-Person'}
                    </span>
                    {ce.event.attendeeCount > 0 && (
                      <span className="flex items-center gap-1"><Users className="size-3" />{ce.event.attendeeCount}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  //  SIDE PANEL
  // ═══════════════════════════════════════════════════════════════

  const renderSidePanel = () => {
    if (!selectedDate && viewMode === 'month') return null;
    const displayDate = selectedDate || formatDateKey(year, month, currentDate.getDate());
    const { year: sy, month: sm, day: sd } = parseDate(displayDate);
    const dateObj = new Date(sy, sm, sd);
    const dayName = DAYS[dateObj.getDay()];
    const evts = eventsByDate.get(displayDate) || [];

    return (
      <div className="w-[320px] flex-shrink-0 border-l border-border bg-card overflow-auto">
        {/* Mini calendar */}
        {renderMiniCalendar()}

        {/* Selected day events */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">{dayName}, {MONTHS_SHORT[sm]} {sd}</p>
            <p className="text-xs text-muted-foreground">{evts.length} event{evts.length !== 1 ? 's' : ''}</p>
          </div>
          {selectedDate && (
            <button onClick={() => setSelectedDate(null)} className="size-6 flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer">
              <X className="size-3.5 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="px-4 pb-4 space-y-2">
          {evts.length === 0 ? (
            <div className="py-8 text-center">
              <Calendar className="size-6 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No events</p>
            </div>
          ) : (
            evts.map((ce, i) => (
              <EventCard key={`${ce.event.id}-${i}`} ce={ce} onNavigate={onNavigateToEvent} />
            ))
          )}
        </div>

        {/* Subscribed calendars in panel */}
        <div className="px-5 pt-3 pb-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Subscribed Calendars</p>
          <div className="space-y-1.5">
            {POPULAR_CALENDARS.filter(c => subscribedCalendars.has(c.id)).map(cal => (
              <div key={cal.id} className="flex items-center gap-2 text-xs">
                <span className="size-2 rounded-full bg-primary" />
                <span className="text-foreground truncate flex-1">{cal.name}</span>
                <button onClick={() => toggleSubscription(cal.id)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="size-3" />
                </button>
              </div>
            ))}
            {subscribedCalendars.size === 0 && (
              <p className="text-[11px] text-muted-foreground">No subscriptions</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════════
  //  MAIN RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-8 pt-6 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-2xl">Calendar</h1>
            <p className="text-sm text-muted-foreground mt-1">Your events and subscribed LeapSpace calendars</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="shadow-none h-8 text-xs" onClick={handleImportIcs}>
              <Upload className="size-3.5 mr-1.5" />
              Import .ics
            </Button>
            {onCreateClick && (
              <Button size="sm" className="shadow-none h-8 text-xs bg-primary hover:bg-primary/90" onClick={onCreateClick}>
                <Plus className="size-3.5 mr-1.5" />
                New Event
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Import toast */}
      {showImportToast && (
        <div className="mx-8 mt-4 px-4 py-3 bg-muted border border-border rounded-lg flex items-center gap-2 text-sm text-foreground">
          <Check className="size-4 text-green-600" />
          <span>Calendar import dialog would open here. This is a mock action.</span>
          <button onClick={() => setShowImportToast(false)} className="ml-auto cursor-pointer">
            <X className="size-3.5 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <div className="px-8 py-3 flex items-center justify-between border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            <button onClick={navigatePrev} className="size-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer">
              <ChevronLeft className="size-4 text-foreground" />
            </button>
            <button onClick={navigateNext} className="size-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors cursor-pointer">
              <ChevronRight className="size-4 text-foreground" />
            </button>
          </div>
          <h2 className="text-foreground text-lg">
            {viewMode === 'day'
              ? `${MONTHS[month]} ${currentDate.getDate()}, ${year}`
              : `${MONTHS[month]} ${year}`
            }
          </h2>
          <button
            onClick={goToToday}
            className="h-7 px-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md border border-border transition-colors cursor-pointer"
          >
            Today
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="hidden lg:flex items-center gap-3">
            {Object.entries(RELATION_STYLES).map(([key, style]) => (
              <div key={key} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className={`size-2 rounded-full ${style.dot}`} />
                {style.label}
              </div>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center bg-muted rounded-lg p-0.5">
            {(['month', 'week', 'day'] as ViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors cursor-pointer capitalize
                  ${viewMode === mode ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}
                `}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* ══════════ MAIN CONTENT ══════════ */}
        <div className="flex-1 overflow-auto p-6">
          {/* Comprehensive Empty State for Completely New Users */}
          {isCompletelyEmpty && viewMode === 'month' ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              {/* Header */}
              <div className="size-20 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-6">
                <Calendar className="size-10 text-muted-foreground/40" />
              </div>
              <h2 className="text-foreground text-lg mb-2">Your calendar is empty</h2>
              <p className="text-sm text-muted-foreground max-w-md mb-10">
                Get started by creating your first event, joining existing events, or connecting your calendar integrations.
              </p>

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-10">
                {/* Create Event Card */}
                {onCreateClick && (
                  <button
                    onClick={onCreateClick}
                    className="p-5 border border-border rounded-xl bg-card hover:bg-muted/50 transition-colors text-left group cursor-pointer"
                  >
                    <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Plus className="size-5 text-foreground" />
                    </div>
                    <h3 className="text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">Create Your First Event</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Host a workshop, webinar, or meetup and invite your community to join.
                    </p>
                  </button>
                )}

                {/* Browse Events Card */}
                <button
                  onClick={() => {
                    // Mock: Navigate to browse events
                    console.log('Navigate to browse events');
                  }}
                  className="p-5 border border-border rounded-xl bg-card hover:bg-muted/50 transition-colors text-left group cursor-pointer"
                >
                  <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Search className="size-5 text-foreground" />
                  </div>
                  <h3 className="text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">Browse & Join Events</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Discover events in your community and register to attend.
                  </p>
                </button>

                {/* Connect Integrations Card */}
                <button
                  onClick={handleImportIcs}
                  className="p-5 border border-border rounded-xl bg-card hover:bg-muted/50 transition-colors text-left group cursor-pointer"
                >
                  <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="size-5 text-foreground" />
                  </div>
                  <h3 className="text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">Connect Calendar</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Import your Google Calendar, Outlook, or other calendar apps to sync events.
                  </p>
                </button>

                {/* Subscribe to Calendars Card */}
                <button
                  onClick={() => {
                    // Scroll to popular calendars section
                    const elem = document.querySelector('[data-calendars-section]');
                    elem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="p-5 border border-border rounded-xl bg-card hover:bg-muted/50 transition-colors text-left group cursor-pointer"
                >
                  <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="size-5 text-foreground" />
                  </div>
                  <h3 className="text-sm text-foreground mb-1.5 group-hover:text-primary transition-colors">Subscribe to Calendars</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Follow popular LeapSpace calendars to stay updated on community events.
                  </p>
                </button>
              </div>

              {/* Popular Calendars Preview */}
              <div className="w-full max-w-3xl" data-calendars-section>
                <h3 className="text-sm text-foreground mb-4 text-left">Popular LeapSpace Calendars</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {POPULAR_CALENDARS.slice(0, 4).map(cal => (
                    <div key={cal.id} className="p-4 border border-border rounded-xl bg-card flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <Globe className="size-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-foreground truncate">{cal.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {cal.eventCount} events · {cal.subscriberCount.toLocaleString()} subscribers
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSubscription(cal.id)}
                        className="h-7 px-3 text-xs rounded-md border border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="size-3" />
                        Subscribe
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* New Creator Nudge - shown when they haven't created any events yet */}
              {!hasCreatedEvents && viewMode === 'month' && (
                <div className="mb-6 p-4 border border-border rounded-xl bg-card flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="size-5 text-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">Ready to host your first event?</p>
                      <p className="text-xs text-muted-foreground">Create workshops, webinars, or meetups for your community</p>
                    </div>
                  </div>
                  {onCreateClick && (
                    <Button size="sm" className="shadow-none h-8 text-xs bg-primary hover:bg-primary/90 flex-shrink-0" onClick={onCreateClick}>
                      <Plus className="size-3.5 mr-1.5" />
                      Create Event
                    </Button>
                  )}
                </div>
              )}

              {console.log('🎯 Rendering month grid, nudge should be above', { hasCreatedEvents, viewMode })}

              {viewMode === 'month' && renderMonthGrid()}
              {viewMode === 'week' && renderWeekView()}
              {viewMode === 'day' && renderDayView()}

              {/* ── Calendars section below grid (month view only) ── */}
              {viewMode === 'month' && (
                <div className="mt-10 space-y-8">
                  {/* Subscribed Calendars */}
                  <div>
                <h2 className="text-sm text-foreground mb-3">Subscribed Calendars</h2>
                {(() => {
                  const subbed = POPULAR_CALENDARS.filter(c => subscribedCalendars.has(c.id));
                  if (subbed.length === 0) return (
                    <div className="py-8 text-center border border-border rounded-xl bg-card">
                      <Globe className="size-7 text-muted-foreground/30 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No subscriptions yet</p>
                      <p className="text-xs text-muted-foreground mt-1">Browse popular calendars below to subscribe</p>
                    </div>
                  );
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {subbed.map(cal => (
                        <div key={cal.id} className="p-4 border border-border rounded-xl bg-card flex items-center justify-between">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Calendar className="size-4 text-foreground" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm text-foreground truncate">{cal.name}</p>
                              <p className="text-xs text-muted-foreground">{cal.eventCount} events</p>
                            </div>
                          </div>
                          <button onClick={() => toggleSubscription(cal.id)} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                            Unsubscribe
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              {/* Popular Calendars */}
              <div>
                <h2 className="text-sm text-foreground mb-3">Popular LeapSpace Calendars</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {POPULAR_CALENDARS.map(cal => {
                    const isSub = subscribedCalendars.has(cal.id);
                    return (
                      <div key={cal.id} className="p-4 border border-border rounded-xl bg-card flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="size-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Globe className="size-4 text-muted-foreground" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-foreground truncate">{cal.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {cal.eventCount} events · {cal.subscriberCount.toLocaleString()} subscribers
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSubscription(cal.id)}
                          className={`h-7 px-3 text-xs rounded-md border transition-colors cursor-pointer flex items-center gap-1
                            ${isSub
                              ? 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                              : 'border-primary bg-primary text-primary-foreground hover:bg-primary/90'
                            }
                          `}
                        >
                          {isSub ? <><Check className="size-3" />Subscribed</> : <><Plus className="size-3" />Subscribe</>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Side panel */}
        {renderSidePanel()}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  EVENT CARD (side panel + day view list)
// ═══════════════════════════════════════════════════════════════

function EventCard({ ce, onNavigate }: { ce: CalendarEvent; onNavigate?: (id: string) => void }) {
  const style = RELATION_STYLES[ce.relation];
  const ev = ce.event;

  return (
    <div
      onClick={() => onNavigate?.(ev.id)}
      className="p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer group"
    >
      <div className="flex items-start gap-3">
        <div className={`size-2 rounded-full mt-1.5 flex-shrink-0 ${style.dot}`} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Clock className="size-3" />
              {ev.time}
            </span>
          </div>
          <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{ev.title}</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              {ev.location === 'virtual' ? <Video className="size-3" /> : <MapPin className="size-3" />}
              {ev.location === 'virtual' ? 'Virtual' : ev.locationDetails || 'In-Person'}
            </span>
            {ev.attendeeCount > 0 && (
              <span className="flex items-center gap-1"><Users className="size-2.5" />{ev.attendeeCount}</span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={`text-[10px] px-1.5 py-0 shadow-none border ${style.bg} ${style.border} text-foreground/60`}>
              {style.label}
            </Badge>
            {ev.communityName && (
              <span className="text-[10px] text-muted-foreground truncate">{ev.communityName}</span>
            )}
          </div>
        </div>
        <ExternalLink className="size-3.5 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors flex-shrink-0 mt-0.5" />
      </div>
    </div>
  );
}
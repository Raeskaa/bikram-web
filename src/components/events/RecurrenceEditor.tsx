import { useState, useMemo } from 'react';
import { Repeat, Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { Input } from '../ui/input';

export type FrequencyType = 'daily' | 'weekly' | 'monthly';
export type EndType = 'count' | 'until';

export interface RecurrenceConfig {
  frequency: FrequencyType;
  interval: number;
  weekdays: number[]; // 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
  endType: EndType;
  count: number;
  until: string; // date string
  excludedDates?: string[]; // manually excluded occurrence dates (YYYY-MM-DD)
}

interface RecurrenceEditorProps {
  config: RecurrenceConfig;
  onChange: (config: RecurrenceConfig) => void;
  startDate?: string; // for generating preview occurrences
}

const WEEKDAY_LABELS = [
  { short: 'M', full: 'Monday', rruleDay: 'MO' },
  { short: 'T', full: 'Tuesday', rruleDay: 'TU' },
  { short: 'W', full: 'Wednesday', rruleDay: 'WE' },
  { short: 'T', full: 'Thursday', rruleDay: 'TH' },
  { short: 'F', full: 'Friday', rruleDay: 'FR' },
  { short: 'S', full: 'Saturday', rruleDay: 'SA' },
  { short: 'S', full: 'Sunday', rruleDay: 'SU' },
];

const FREQUENCY_OPTIONS: { value: FrequencyType; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

/**
 * Build an rrule-compatible string from the config.
 * Format: FREQ=WEEKLY;INTERVAL=1;BYDAY=MO,WE,FR;COUNT=12
 */
export function configToRRule(config: RecurrenceConfig): string {
  const parts: string[] = [`FREQ=${config.frequency.toUpperCase()}`];
  
  if (config.interval > 1) {
    parts.push(`INTERVAL=${config.interval}`);
  }
  
  if (config.frequency === 'weekly' && config.weekdays.length > 0) {
    const days = config.weekdays.map(d => WEEKDAY_LABELS[d].rruleDay).join(',');
    parts.push(`BYDAY=${days}`);
  }
  
  if (config.endType === 'count') {
    parts.push(`COUNT=${config.count}`);
  } else if (config.endType === 'until' && config.until) {
    const dateStr = config.until.replace(/-/g, '') + 'T235959Z';
    parts.push(`UNTIL=${dateStr}`);
  }
  
  return parts.join(';');
}

/**
 * Generate a human-readable description of the recurrence.
 */
function describeRecurrence(config: RecurrenceConfig): string {
  const { frequency, interval, weekdays, endType, count, until } = config;
  
  let base = '';
  if (frequency === 'daily') {
    base = interval === 1 ? 'Every day' : `Every ${interval} days`;
  } else if (frequency === 'weekly') {
    const dayNames = weekdays.map(d => WEEKDAY_LABELS[d].full);
    if (interval === 1) {
      base = dayNames.length > 0 ? `Every ${dayNames.join(', ')}` : 'Every week';
    } else {
      base = dayNames.length > 0 ? `Every ${interval} weeks on ${dayNames.join(', ')}` : `Every ${interval} weeks`;
    }
  } else {
    base = interval === 1 ? 'Every month' : `Every ${interval} months`;
  }
  
  let end = '';
  if (endType === 'count') {
    end = `, ${count} time${count !== 1 ? 's' : ''}`;
  } else if (until) {
    const d = new Date(until + 'T00:00:00');
    end = `, until ${d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  }
  
  return base + end;
}

/**
 * Generate mock occurrence dates from config + start date.
 * Simple implementation without the full rrule library.
 */
function generateOccurrences(config: RecurrenceConfig, startDate: string, maxCount = 50): string[] {
  if (!startDate) return [];
  
  const start = new Date(startDate + 'T00:00:00');
  if (isNaN(start.getTime())) return [];
  
  const dates: string[] = [];
  const limit = config.endType === 'count' ? Math.min(config.count, maxCount) : maxCount;
  const untilDate = config.endType === 'until' && config.until ? new Date(config.until + 'T23:59:59') : null;
  
  let current = new Date(start);
  let iterations = 0;
  const maxIterations = 500; // safety
  
  while (dates.length < limit && iterations < maxIterations) {
    iterations++;
    
    if (untilDate && current > untilDate) break;
    
    if (config.frequency === 'weekly' && config.weekdays.length > 0) {
      // For weekly: check if current day is in weekdays list
      // JS: Sun=0, Mon=1... Our weekdays: 0=Mon, 1=Tue...
      const jsDay = current.getDay();
      const ourDay = jsDay === 0 ? 6 : jsDay - 1; // convert to 0=Mon
      if (config.weekdays.includes(ourDay)) {
        dates.push(current.toISOString().split('T')[0]);
      }
      current.setDate(current.getDate() + 1);
      // Jump weeks if needed based on interval
      if (ourDay === 6) { // end of week (Sunday)
        current.setDate(current.getDate() + (config.interval - 1) * 7);
      }
    } else if (config.frequency === 'daily') {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + config.interval);
    } else if (config.frequency === 'monthly') {
      dates.push(current.toISOString().split('T')[0]);
      current.setMonth(current.getMonth() + config.interval);
    } else {
      // weekly without specific days
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + config.interval * 7);
    }
  }
  
  return dates;
}

export const DEFAULT_RECURRENCE: RecurrenceConfig = {
  frequency: 'weekly',
  interval: 1,
  weekdays: [2], // Wednesday
  endType: 'count',
  count: 12,
  until: '',
};

export function RecurrenceEditor({ config, onChange, startDate }: RecurrenceEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  
  const allOccurrences = useMemo(() => {
    return generateOccurrences(config, startDate || new Date().toISOString().split('T')[0]);
  }, [config, startDate]);

  const excluded = config.excludedDates || [];
  const occurrences = allOccurrences.filter(d => !excluded.includes(d));
  
  const description = describeRecurrence(config);
  const rruleString = configToRRule(config);

  const toggleExcludeDate = (date: string) => {
    const next = excluded.includes(date)
      ? excluded.filter(d => d !== date)
      : [...excluded, date];
    onChange({ ...config, excludedDates: next });
  };

  const toggleWeekday = (day: number) => {
    const next = config.weekdays.includes(day)
      ? config.weekdays.filter(d => d !== day)
      : [...config.weekdays, day].sort();
    onChange({ ...config, weekdays: next });
  };

  return (
    <div className="space-y-4">
      {/* Frequency selector */}
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">Repeats</label>
        <div className="grid grid-cols-3 gap-2">
          {FREQUENCY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ ...config, frequency: opt.value })}
              className={`px-3 py-2.5 rounded-lg border text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                config.frequency === opt.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card text-muted-foreground hover:border-input hover:text-foreground'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interval */}
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">
          Every
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={1}
            max={52}
            value={config.interval}
            onChange={(e) => onChange({ ...config, interval: Math.max(1, parseInt(e.target.value) || 1) })}
            className="w-20 shadow-none"
          />
          <span className="text-sm text-muted-foreground">
            {config.frequency === 'daily' ? 'day(s)' : config.frequency === 'weekly' ? 'week(s)' : 'month(s)'}
          </span>
        </div>
      </div>

      {/* Weekday picker (for weekly only) */}
      {config.frequency === 'weekly' && (
        <div>
          <label className="text-sm text-muted-foreground block mb-1.5">On days</label>
          <div className="flex gap-1.5">
            {WEEKDAY_LABELS.map((day, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleWeekday(idx)}
                title={day.full}
                className={`size-9 rounded-lg border text-sm transition-colors cursor-pointer flex items-center justify-center ${
                  config.weekdays.includes(idx)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-input hover:text-foreground'
                }`}
              >
                {day.short}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* End condition */}
      <div>
        <label className="text-sm text-muted-foreground block mb-1.5">Ends</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => onChange({ ...config, endType: 'count' })}
              className={`size-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                config.endType === 'count' ? 'border-primary' : 'border-input'
              }`}
            >
              {config.endType === 'count' && <div className="size-2 rounded-full bg-primary" />}
            </div>
            <span className="text-sm text-foreground">After</span>
            <Input
              type="number"
              min={1}
              max={100}
              value={config.count}
              onChange={(e) => onChange({ ...config, count: Math.max(1, parseInt(e.target.value) || 1), endType: 'count' })}
              className="w-20 shadow-none"
              onFocus={() => onChange({ ...config, endType: 'count' })}
            />
            <span className="text-sm text-muted-foreground">occurrence(s)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => onChange({ ...config, endType: 'until' })}
              className={`size-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                config.endType === 'until' ? 'border-primary' : 'border-input'
              }`}
            >
              {config.endType === 'until' && <div className="size-2 rounded-full bg-primary" />}
            </div>
            <span className="text-sm text-foreground">Until</span>
            <Input
              type="date"
              value={config.until}
              onChange={(e) => onChange({ ...config, until: e.target.value, endType: 'until' })}
              className="w-44 shadow-none"
              onFocus={() => onChange({ ...config, endType: 'until' })}
            />
          </label>
        </div>
      </div>

      {/* Summary + visual calendar preview */}
      <div className="p-3 rounded-lg bg-muted border border-border">
        <div className="flex items-start gap-2 mb-2">
          <Repeat className="size-4 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-foreground">{description}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {occurrences.length} occurrence(s){excluded.length > 0 ? ` · ${excluded.length} skipped` : ''}
            </p>
          </div>
        </div>

        {/* Visual mini-calendar preview */}
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors cursor-pointer mt-1"
        >
          {showPreview ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          {showPreview ? 'Hide calendar preview' : 'Show calendar preview'}
        </button>

        {showPreview && allOccurrences.length > 0 && (
          <RecurrenceCalendarPreview
            occurrences={allOccurrences}
            excludedDates={excluded}
            onToggleExclude={toggleExcludeDate}
          />
        )}

        {showPreview && allOccurrences.length === 0 && (
          <p className="text-xs text-muted-foreground py-2 mt-2">No occurrences. Check your start date and recurrence settings.</p>
        )}
      </div>

      {/* rrule string (debug / info) */}
      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60">
        <Info className="size-3" />
        <span className="font-mono">{rruleString}</span>
      </div>
    </div>
  );
}

// ─── Visual calendar grid showing recurrence occurrences ───

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function RecurrenceCalendarPreview({ occurrences, excludedDates, onToggleExclude }: { occurrences: string[]; excludedDates: string[]; onToggleExclude: (date: string) => void }) {
  const occSet = useMemo(() => new Set(occurrences), [occurrences]);

  // Determine which months to show (group occurrences by month)
  const monthGroups = useMemo(() => {
    const groups = new Map<string, { year: number; month: number }>();
    occurrences.forEach(d => {
      const [y, m] = d.split('-').map(Number);
      const key = `${y}-${m}`;
      if (!groups.has(key)) groups.set(key, { year: y, month: m - 1 });
    });
    return Array.from(groups.values()).sort((a, b) => a.year * 12 + a.month - (b.year * 12 + b.month));
  }, [occurrences]);

  const [pageIdx, setPageIdx] = useState(0);
  // Show up to 2 months at a time
  const visibleMonths = monthGroups.slice(pageIdx * 2, pageIdx * 2 + 2);
  const totalPages = Math.ceil(monthGroups.length / 2);

  const fmtKey = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  return (
    <div className="mt-3">
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => setPageIdx(Math.max(0, pageIdx - 1))}
            disabled={pageIdx === 0}
            className="size-5 flex items-center justify-center rounded hover:bg-background disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="size-3" />
          </button>
          <span className="text-[10px] text-muted-foreground">{pageIdx + 1} / {totalPages}</span>
          <button
            type="button"
            onClick={() => setPageIdx(Math.min(totalPages - 1, pageIdx + 1))}
            disabled={pageIdx >= totalPages - 1}
            className="size-5 flex items-center justify-center rounded hover:bg-background disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="size-3" />
          </button>
        </div>
      )}

      <div className={`grid gap-3 ${visibleMonths.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {visibleMonths.map(({ year, month }) => {
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const firstDow = new Date(year, month, 1).getDay();

          return (
            <div key={`${year}-${month}`}>
              <p className="text-[11px] text-foreground mb-1">{MONTH_NAMES[month]} {year}</p>
              <div className="grid grid-cols-7 gap-0">
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} className="text-center text-[9px] text-muted-foreground/50 py-0.5">{d}</div>
                ))}
                {/* Padding */}
                {Array.from({ length: firstDow }).map((_, i) => (
                  <div key={`pad-${i}`} className="h-5" />
                ))}
                {/* Days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const d = i + 1;
                  const key = fmtKey(year, month, d);
                  const isOcc = occSet.has(key);
                  const isExcluded = excludedDates.includes(key);
                  return (
                    <button
                      type="button"
                      key={d}
                      className={`h-5 flex items-center justify-center text-[10px] rounded-sm transition-colors
                        ${isOcc && !isExcluded ? 'bg-primary text-primary-foreground cursor-pointer hover:bg-primary/70' : ''}
                        ${isExcluded ? 'bg-destructive/20 text-destructive line-through cursor-pointer hover:bg-destructive/30' : ''}
                        ${!isOcc ? 'text-muted-foreground/40' : ''}
                      `}
                      onClick={() => isOcc && onToggleExclude(key)}
                      title={isOcc ? (isExcluded ? 'Click to restore this date' : 'Click to skip this date') : undefined}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <p className="text-[10px] text-muted-foreground/50 mt-1.5">Click a highlighted date to skip it</p>

      {/* Date list below */}
      <div className="mt-2 max-h-28 overflow-auto space-y-0.5">
        {occurrences.map((date, idx) => {
          const d = new Date(date + 'T00:00:00');
          const isExcl = excludedDates.includes(date);
          return (
            <button
              type="button"
              key={date}
              onClick={() => onToggleExclude(date)}
              className={`flex items-center gap-2 text-[11px] py-0.5 w-full text-left cursor-pointer rounded px-1 hover:bg-background transition-colors
                ${isExcl ? 'text-destructive line-through' : 'text-muted-foreground'}
              `}
            >
              <span className="w-4 text-right text-muted-foreground/50">{idx + 1}.</span>
              <Calendar className="size-2.5" />
              <span>{d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              {isExcl && <span className="text-[9px] text-destructive ml-auto">skipped</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
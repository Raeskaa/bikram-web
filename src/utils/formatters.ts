/**
 * Shared date/time formatters for consistent display across the app.
 * All functions are pure and handle edge cases gracefully.
 */

/** "March 15, 2026" */
export function formatEventDate(dateStr?: string): string {
  if (!dateStr) return 'TBD';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/** "March 15" (no year, no weekday — for compact displays) */
export function formatEventDateShort(dateStr?: string): string {
  if (!dateStr) return 'TBD';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/** "2:00 PM" */
export function formatEventTime(timeStr?: string): string {
  if (!timeStr) return 'TBD';
  try {
    const [h, m] = timeStr.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return timeStr;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
  } catch {
    return timeStr;
  }
}

/** "March 15, 2026 at 2:00 PM" */
export function formatEventDateTime(dateStr?: string, timeStr?: string): string {
  const date = formatEventDate(dateStr);
  const time = formatEventTime(timeStr);
  if (date === 'TBD' && time === 'TBD') return 'TBD';
  if (time === 'TBD') return date;
  if (date === 'TBD') return `at ${time}`;
  return `${date} at ${time}`;
}

/** "2:00 PM - 4:30 PM" */
export function formatTimeRange(startTime?: string, endTime?: string): string {
  const start = formatEventTime(startTime);
  const end = formatEventTime(endTime);
  if (start === 'TBD') return 'TBD';
  if (end === 'TBD') return start;
  return `${start} - ${end}`;
}

/** "in 3 days" / "2 hours ago" / "happening now" */
export function formatRelativeTime(dateStr?: string, timeStr?: string): string {
  if (!dateStr) return '';
  try {
    const dateTimeStr = timeStr ? `${dateStr}T${timeStr}:00` : `${dateStr}T00:00:00`;
    const target = new Date(dateTimeStr);
    if (isNaN(target.getTime())) return '';

    const now = new Date();
    const diffMs = target.getTime() - now.getTime();
    const diffMin = Math.round(diffMs / 60000);
    const diffHrs = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (Math.abs(diffMin) < 5) return 'happening now';
    if (diffMin > 0 && diffMin < 60) return `in ${diffMin} minutes`;
    if (diffMin < 0 && diffMin > -60) return `${Math.abs(diffMin)} minutes ago`;
    if (diffHrs > 0 && diffHrs < 24) return `in ${diffHrs} hours`;
    if (diffHrs < 0 && diffHrs > -24) return `${Math.abs(diffHrs)} hours ago`;
    if (diffDays > 0 && diffDays < 30) return `in ${diffDays} days`;
    if (diffDays < 0 && diffDays > -30) return `${Math.abs(diffDays)} days ago`;
    if (diffDays >= 30) return `in ${Math.round(diffDays / 30)} months`;
    return `${Math.round(Math.abs(diffDays) / 30)} months ago`;
  } catch {
    return '';
  }
}

/** "Sat, Mar 15" — for calendar-style compact display */
export function formatCalendarDate(dateStr?: string): string {
  if (!dateStr) return 'TBD';
  try {
    const date = new Date(dateStr + 'T00:00:00');
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

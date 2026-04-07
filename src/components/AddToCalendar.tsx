import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Calendar, CalendarPlus, Download, CheckCircle, Copy, Mail,
  ChevronDown
} from 'lucide-react';

interface AddToCalendarProps {
  eventTitle: string;
  eventDescription: string;
  startDate: string; // ISO format: 2024-05-15T14:00:00
  endDate: string;   // ISO format: 2024-05-15T16:00:00
  location?: string;
  meetingUrl?: string;
  timezone?: string;
  organizerEmail?: string;
  variant?: 'button' | 'dropdown';
}

export function AddToCalendar({
  eventTitle,
  eventDescription,
  startDate,
  endDate,
  location,
  meetingUrl,
  timezone = 'America/New_York',
  organizerEmail,
  variant = 'button',
}: AddToCalendarProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [copiedICS, setCopiedICS] = useState(false);

  // Format dates for different calendar systems
  const formatDateForICS = (date: string) => {
    return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const formatDateForGoogle = (date: string) => {
    return new Date(date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  // Generate ICS file content
  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LeapSpace//Event Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@leapspace.ai
DTSTAMP:${formatDateForICS(new Date().toISOString())}
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}${meetingUrl ? `\\n\\nJoin: ${meetingUrl}` : ''}
LOCATION:${location || meetingUrl || 'Online'}
STATUS:CONFIRMED
SEQUENCE:0
${organizerEmail ? `ORGANIZER:mailto:${organizerEmail}` : ''}
END:VEVENT
END:VCALENDAR`;

    return icsContent;
  };

  // Download ICS file
  const downloadICS = () => {
    const icsContent = generateICS();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Copy ICS content to clipboard
  const copyICS = async () => {
    const icsContent = generateICS();
    try {
      await navigator.clipboard.writeText(icsContent);
      setCopiedICS(true);
      setTimeout(() => setCopiedICS(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const baseUrl = 'https://calendar.google.com/calendar/render';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventTitle,
      details: `${eventDescription}${meetingUrl ? `\n\nJoin: ${meetingUrl}` : ''}`,
      location: location || meetingUrl || 'Online',
      dates: `${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}`,
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Generate Outlook Calendar URL
  const getOutlookUrl = () => {
    const baseUrl = 'https://outlook.live.com/calendar/0/deeplink/compose';
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: eventTitle,
      body: `${eventDescription}${meetingUrl ? `\n\nJoin: ${meetingUrl}` : ''}`,
      location: location || meetingUrl || 'Online',
      startdt: new Date(startDate).toISOString(),
      enddt: new Date(endDate).toISOString(),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Generate Office 365 Calendar URL
  const getOffice365Url = () => {
    const baseUrl = 'https://outlook.office.com/calendar/0/deeplink/compose';
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: eventTitle,
      body: `${eventDescription}${meetingUrl ? `\n\nJoin: ${meetingUrl}` : ''}`,
      location: location || meetingUrl || 'Online',
      startdt: new Date(startDate).toISOString(),
      enddt: new Date(endDate).toISOString(),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  // Generate Yahoo Calendar URL
  const getYahooUrl = () => {
    const baseUrl = 'https://calendar.yahoo.com/';
    const params = new URLSearchParams({
      v: '60',
      title: eventTitle,
      desc: `${eventDescription}${meetingUrl ? `\n\nJoin: ${meetingUrl}` : ''}`,
      in_loc: location || meetingUrl || 'Online',
      st: formatDateForGoogle(startDate),
      et: formatDateForGoogle(endDate),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  const calendarOptions = [
    {
      name: 'Google Calendar',
      icon: Calendar,
      action: () => window.open(getGoogleCalendarUrl(), '_blank'),
    },
    {
      name: 'Apple Calendar',
      icon: Download,
      action: downloadICS,
      description: 'Download .ics file',
    },
    {
      name: 'Outlook',
      icon: Calendar,
      action: () => window.open(getOutlookUrl(), '_blank'),
    },
    {
      name: 'Office 365',
      icon: Calendar,
      action: () => window.open(getOffice365Url(), '_blank'),
    },
    {
      name: 'Yahoo Calendar',
      icon: Calendar,
      action: () => window.open(getYahooUrl(), '_blank'),
    },
  ];

  if (variant === 'dropdown') {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <CalendarPlus className="size-4 mr-2" />
              Add to Calendar
              <ChevronDown className="size-3 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {calendarOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <DropdownMenuItem
                  key={option.name}
                  onClick={option.action}
                  className="cursor-pointer"
                >
                  <Icon className="size-4 mr-2" />
                  <div className="flex-1">
                    <p className="text-sm">{option.name}</p>
                    {option.description && (
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    )}
                  </div>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={copyICS} className="cursor-pointer">
              {copiedICS ? (
                <>
                  <CheckCircle className="size-4 mr-2 text-green-600" />
                  <span className="text-sm text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-4 mr-2" />
                  <span className="text-sm">Copy .ics content</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadICS} className="cursor-pointer">
              <Download className="size-4 mr-2" />
              <span className="text-sm">Download .ics file</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-sm">
            <div className="text-center py-4">
              <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="size-8 text-green-600" />
              </div>
              <DialogHeader>
                <DialogTitle>Added to Calendar</DialogTitle>
                <DialogDescription>
                  The event has been added to your calendar successfully.
                </DialogDescription>
              </DialogHeader>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={downloadICS}
      className="w-full"
    >
      <CalendarPlus className="size-4 mr-2" />
      Add to Calendar
    </Button>
  );
}

// Email Calendar Invite Component
interface EmailCalendarInviteProps {
  eventTitle: string;
  eventDescription: string;
  startDate: string;
  endDate: string;
  location?: string;
  meetingUrl?: string;
  recipientEmail: string;
  recipientName: string;
  onSend?: () => void;
}

export function EmailCalendarInvite({
  eventTitle,
  eventDescription,
  startDate,
  endDate,
  location,
  meetingUrl,
  recipientEmail,
  recipientName,
  onSend,
}: EmailCalendarInviteProps) {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendInvite = async () => {
    setIsSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, this would:
    // 1. Generate ICS file
    // 2. Send email with ICS attachment via backend
    // 3. Include meeting link and details
    
    setSent(true);
    setIsSending(false);
    onSend?.();
    
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg border">
        <div className="flex items-start gap-3">
          <div className="size-10 rounded bg-primary flex items-center justify-center flex-shrink-0">
            <Mail className="size-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm mb-1">Email Calendar Invite</p>
            <p className="text-xs text-muted-foreground mb-3">
              Send {recipientName} ({recipientEmail}) a calendar invitation with meeting details
            </p>
            <Button
              onClick={handleSendInvite}
              disabled={isSending || sent}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              {sent ? (
                <>
                  <CheckCircle className="size-4 mr-2" />
                  Invite Sent
                </>
              ) : isSending ? (
                'Sending...'
              ) : (
                <>
                  <Mail className="size-4 mr-2" />
                  Send Invite
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {sent && (
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="size-4 text-green-600" />
          <p className="text-xs text-green-700">
            Calendar invitation sent successfully to {recipientEmail}
          </p>
        </div>
      )}
    </div>
  );
}
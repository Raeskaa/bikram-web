import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  AlertTriangle,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Mail,
  Users,
  CheckCircle,
  Edit2,
  Shield,
  Crown,
  Mic
} from 'lucide-react';

export interface EditWarningConfig {
  fieldName: string;
  fieldLabel: string;
  oldValue: any;
  newValue: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
  willNotify: boolean;
  affectedCount: number;
  warningMessage?: string;
  autoEmailDetails?: string;
  changedBy?: {
    name: string;
    email: string;
    role: 'host' | 'moderator' | 'co-host' | 'speaker';
  };
}

interface EditConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: EditWarningConfig | null;
  onConfirm: (sendNotification: boolean) => void;
  onCancel: () => void;
}

export function EditConfirmationDialog({
  open,
  onOpenChange,
  config,
  onConfirm,
  onCancel
}: EditConfirmationDialogProps) {
  const [sendNotification, setSendNotification] = React.useState(true);

  if (!config) return null;

  // Get icon for field type
  const getFieldIcon = () => {
    const field = config.fieldName.toLowerCase();
    if (field.includes('date') || field.includes('time')) return <Clock className="size-5 text-amber-600" />;
    if (field.includes('location') || field.includes('venue')) return <MapPin className="size-5 text-blue-600" />;
    if (field.includes('price') || field.includes('ticket')) return <DollarSign className="size-5 text-green-600" />;
    if (field.includes('title') || field.includes('name')) return <FileText className="size-5 text-purple-600" />;
    if (field.includes('capacity')) return <Users className="size-5 text-indigo-600" />;
    return <Edit2 className="size-5 text-muted-foreground" />;
  };

  // Get severity styling
  const getSeverityConfig = () => {
    switch (config.severity) {
      case 'critical':
        return {
          color: 'border-red-200 bg-red-50',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-700 border-red-200',
          label: 'CRITICAL CHANGE'
        };
      case 'high':
        return {
          color: 'border-amber-200 bg-amber-50',
          icon: 'text-amber-600',
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          label: 'HIGH IMPACT'
        };
      case 'medium':
        return {
          color: 'border-blue-200 bg-blue-50',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          label: 'MODERATE CHANGE'
        };
      default:
        return {
          color: 'border-border bg-muted/30',
          icon: 'text-muted-foreground',
          badge: 'bg-muted text-foreground border-border',
          label: 'MINOR CHANGE'
        };
    }
  };

  const severityConfig = getSeverityConfig();

  // Format value for display
  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === '') return 'Not set';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object' && value.toLocaleString) {
      return value.toLocaleString();
    }
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  // Get specific warning messages
  const getWarningMessages = (): string[] => {
    const messages: string[] = [];
    
    if (config.fieldName.includes('date') || config.fieldName.includes('time')) {
      messages.push('⚠️ All registered attendees will see this change immediately');
      if (config.willNotify && sendNotification) {
        messages.push('📧 Automatic email notification will be sent to all attendees');
      }
      messages.push('📅 Attendees should update their calendars');
    } else if (config.fieldName.includes('location') || config.fieldName.includes('venue')) {
      messages.push('⚠️ Location change is visible to all attendees immediately');
      if (config.willNotify && sendNotification) {
        messages.push('📧 Attendees will be notified of the new location');
      }
      messages.push('🗺️ Make sure the new location details are correct');
    } else if (config.fieldName.includes('price') || config.fieldName.includes('ticket')) {
      messages.push('💰 Price changes only affect NEW registrations');
      messages.push('✓ Existing attendees keep their original price');
      messages.push('⚠️ This change is publicly visible on your event page');
    } else if (config.fieldName.includes('title') || config.fieldName.includes('name')) {
      messages.push('⚠️ Title change may confuse attendees who already registered');
      messages.push('📧 Consider notifying attendees about this rebrand');
      messages.push('🔍 Search rankings may be affected');
    } else if (config.fieldName.includes('capacity')) {
      if (Number(config.newValue) < Number(config.oldValue)) {
        messages.push('⚠️ Reducing capacity may affect waitlisted attendees');
      } else {
        messages.push('✓ Increasing capacity opens more spots for registration');
      }
    }

    if (config.warningMessage) {
      messages.push(config.warningMessage);
    }

    return messages;
  };

  const warningMessages = getWarningMessages();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${severityConfig.color} border`}>
              <AlertTriangle className={`size-6 ${severityConfig.icon}`} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg">Confirm Change to Published Event</DialogTitle>
              <DialogDescription className="mt-1.5">
                This event is published. Changes will be visible immediately to all attendees.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Changed By (role info) */}
          {config.changedBy && (
            <div className="flex items-center gap-3 p-3 bg-muted/50 border border-border rounded-lg">
              <div className={`rounded-full size-8 flex items-center justify-center flex-shrink-0 ${
                config.changedBy.role === 'host' ? 'bg-primary/15 text-primary' :
                config.changedBy.role === 'moderator' ? 'bg-blue-100 text-blue-700' :
                config.changedBy.role === 'co-host' ? 'bg-indigo-100 text-indigo-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                <span className="text-xs font-medium">
                  {config.changedBy.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{config.changedBy.name}</span>
                  <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 gap-1 ${
                    config.changedBy.role === 'host' ? 'bg-primary/15 text-primary border-primary/20' :
                    config.changedBy.role === 'moderator' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                    config.changedBy.role === 'co-host' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' :
                    'bg-amber-100 text-amber-700 border-amber-200'
                  }`}>
                    {config.changedBy.role === 'host' && <Crown className="size-2.5" />}
                    {config.changedBy.role === 'moderator' && <Shield className="size-2.5" />}
                    {config.changedBy.role === 'co-host' && <Users className="size-2.5" />}
                    {config.changedBy.role === 'speaker' && <Mic className="size-2.5" />}
                    {config.changedBy.role.charAt(0).toUpperCase() + config.changedBy.role.slice(1)}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{config.changedBy.email}</span>
              </div>
            </div>
          )}

          {/* Severity Badge */}
          <Badge className={`${severityConfig.badge} border font-medium`}>
            {severityConfig.label}
          </Badge>

          {/* Change Summary */}
          <div className={`border rounded-lg p-4 ${severityConfig.color}`}>
            <div className="flex items-center gap-3 mb-3">
              {getFieldIcon()}
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">{config.fieldLabel}</div>
                <div className="text-xs text-muted-foreground">Field being modified</div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-muted-foreground font-medium min-w-[60px]">From:</span>
                <span className="text-foreground line-through opacity-75">{formatValue(config.oldValue)}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-muted-foreground font-medium min-w-[60px]">To:</span>
                <span className="text-foreground font-semibold">{formatValue(config.newValue)}</span>
              </div>
            </div>
          </div>

          {/* Warning Messages */}
          <div className="space-y-2">
            {warningMessages.map((msg, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5">•</span>
                <span>{msg}</span>
              </div>
            ))}
          </div>

          {/* Affected Users */}
          {config.affectedCount > 0 && (
            <div className="bg-muted/50 border border-border rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  <span className="font-semibold">{config.affectedCount}</span> registered attendee{config.affectedCount !== 1 ? 's' : ''} will be affected
                </span>
              </div>
            </div>
          )}

          {/* Notification Toggle (if applicable) */}
          {config.willNotify && config.affectedCount > 0 && (
            <div className="border border-primary/20 bg-primary/5 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="size-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      Send email notification to attendees
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {config.autoEmailDetails || `Notify all ${config.affectedCount} registered attendees about this change via email.`}
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onCancel();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm(sendNotification);
              onOpenChange(false);
            }}
            className="bg-primary hover:bg-primary/90"
          >
            <CheckCircle className="size-4 mr-2" />
            Confirm Change{sendNotification && config.willNotify ? ' & Notify' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to create warning config for common fields
export function createEditWarningConfig(
  fieldName: string,
  oldValue: any,
  newValue: any,
  attendeeCount: number = 0
): EditWarningConfig {
  const field = fieldName.toLowerCase();
  
  // Determine severity based on field type
  let severity: EditWarningConfig['severity'] = 'low';
  let willNotify = false;
  let fieldLabel = fieldName;
  let warningMessage: string | undefined;
  
  if (field.includes('date') || field.includes('startdate') || field.includes('enddate')) {
    severity = 'critical';
    willNotify = true;
    fieldLabel = 'Event Date';
    warningMessage = 'Date changes are HIGH IMPACT. Attendees have likely blocked their calendars.';
  } else if (field.includes('time') || field.includes('starttime') || field.includes('endtime')) {
    severity = 'critical';
    willNotify = true;
    fieldLabel = field.includes('start') ? 'Start Time' : field.includes('end') ? 'End Time' : 'Time';
    warningMessage = 'Time changes require attendees to update their schedules.';
  } else if (field.includes('location') || field.includes('venue') || field.includes('meetinglink')) {
    severity = 'high';
    willNotify = true;
    fieldLabel = field.includes('meeting') ? 'Meeting Link' : 'Location';
  } else if (field.includes('title') || field.includes('name')) {
    severity = 'medium';
    willNotify = false;
    fieldLabel = 'Event Title';
  } else if (field.includes('price') || field.includes('ticket')) {
    severity = 'medium';
    willNotify = false;
    fieldLabel = 'Ticket Price';
  } else if (field.includes('capacity')) {
    severity = 'low';
    willNotify = false;
    fieldLabel = 'Event Capacity';
  } else if (field.includes('description')) {
    severity = 'low';
    willNotify = false;
    fieldLabel = 'Description';
  }

  return {
    fieldName,
    fieldLabel,
    oldValue,
    newValue,
    severity,
    willNotify,
    affectedCount: willNotify ? attendeeCount : 0,
    warningMessage
  };
}
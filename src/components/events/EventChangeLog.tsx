import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Clock,
  User,
  Download,
  Search,
  Mail,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  DollarSign,
  FileText,
  Users,
  Edit2,
  Settings,
  RefreshCw,
  Shield,
  Crown,
  Mic
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export interface EventChange {
  id: string;
  eventId: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userEmail: string;
  userRole?: 'host' | 'moderator' | 'co-host' | 'speaker' | 'system';
  changeType: 'field_edit' | 'publish' | 'unpublish' | 'cancel' | 'attendee_action' | 'schedule_update';
  fieldName?: string;
  fieldLabel?: string;
  oldValue?: any;
  newValue?: any;
  notificationSent: boolean;
  affectedUsers: number;
  details?: string;
}

interface EventChangeLogProps {
  eventId: string;
  changes: EventChange[];
  isDraft?: boolean;
}

export function EventChangeLog({ eventId, changes, isDraft }: EventChangeLogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');

  // Get unique users from changes
  const uniqueUsers = Array.from(
    new Set(changes.map(c => c.userName))
  );

  // Role badge helper
  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'host':
        return <Badge variant="default" className="text-[10px] px-1.5 py-0 gap-1 bg-primary/15 text-primary border-primary/20 hover:bg-primary/15"><Crown className="size-2.5" />Host</Badge>;
      case 'moderator':
        return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 gap-1 bg-muted text-foreground border-border hover:bg-muted"><Shield className="size-2.5" />Mod</Badge>;
      case 'co-host':
        return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 gap-1 bg-accent text-foreground border-border hover:bg-accent"><Users className="size-2.5" />Co-host</Badge>;
      case 'speaker':
        return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 gap-1 bg-muted text-foreground border-border hover:bg-muted"><Mic className="size-2.5" />Speaker</Badge>;
      case 'system':
        return <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-1"><Settings className="size-2.5" />System</Badge>;
      default:
        return null;
    }
  };

  // Filter changes
  const filteredChanges = changes.filter(change => {
    const matchesSearch = 
      change.fieldLabel?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.details?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || change.changeType === filterType;
    const matchesUser = filterUser === 'all' || change.userName === filterUser;

    return matchesSearch && matchesType && matchesUser;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Timestamp', 'User', 'Change Type', 'Field', 'Old Value', 'New Value', 'Notification Sent', 'Affected Users'];
    const rows = filteredChanges.map(c => [
      new Date(c.timestamp).toLocaleString(),
      c.userName,
      c.changeType,
      c.fieldLabel || c.fieldName || '-',
      c.oldValue || '-',
      c.newValue || '-',
      c.notificationSent ? 'Yes' : 'No',
      c.affectedUsers
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `event-${eventId}-changelog-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success('Change log exported', { description: 'CSV file downloaded successfully' });
  };

  // Get icon for change type
  const getChangeIcon = (change: EventChange) => {
    if (change.changeType === 'publish') return <CheckCircle className="size-4 text-green-600" />;
    if (change.changeType === 'unpublish') return <RefreshCw className="size-4 text-amber-600" />;
    if (change.changeType === 'cancel') return <Settings className="size-4 text-red-600" />;
    if (change.changeType === 'attendee_action') return <Users className="size-4 text-foreground" />;
    if (change.changeType === 'schedule_update') return <Calendar className="size-4 text-foreground" />;
    
    // Field-specific icons
    if (change.fieldName?.includes('date') || change.fieldName?.includes('time')) {
      return <Calendar className="size-4 text-muted-foreground" />;
    }
    if (change.fieldName?.includes('location') || change.fieldName?.includes('venue')) {
      return <MapPin className="size-4 text-muted-foreground" />;
    }
    if (change.fieldName?.includes('price') || change.fieldName?.includes('ticket')) {
      return <DollarSign className="size-4 text-muted-foreground" />;
    }
    
    return <Edit2 className="size-4 text-muted-foreground" />;
  };

  // Get badge variant for change type
  const getChangeTypeBadge = (type: string) => {
    const labels: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
      'field_edit': { label: 'Edit', variant: 'outline' },
      'publish': { label: 'Published', variant: 'default' },
      'unpublish': { label: 'Unpublished', variant: 'secondary' },
      'cancel': { label: 'Cancelled', variant: 'destructive' },
      'attendee_action': { label: 'Attendee', variant: 'secondary' },
      'schedule_update': { label: 'Schedule', variant: 'outline' }
    };
    
    const config = labels[type] || { label: type, variant: 'outline' as const };
    return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>;
  };

  // Format value for display
  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === '') return '-';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  // Get operation type based on change type
  const getOperationType = (changeType: string): string => {
    switch (changeType) {
      case 'publish':
      case 'attendee_action':
        return 'Added';
      case 'field_edit':
      case 'schedule_update':
        return 'Updated';
      case 'cancel':
      case 'unpublish':
        return 'Deleted';
      default:
        return 'Updated';
    }
  };

  if (isDraft) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-muted/50 rounded-full p-4 mb-4">
          <Clock className="size-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Change Log Available After Publishing
        </h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Once you publish this event, all changes will be tracked here. You'll be able to see who made changes, when, and whether attendees were notified.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Change History</h2>
          <p className="text-sm text-muted-foreground">
            Track all changes made to this event
            {filteredChanges.length !== changes.length && ` (${filteredChanges.length} of ${changes.length})`}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleExportCSV}
          disabled={filteredChanges.length === 0}
          className="gap-2"
        >
          <Download className="size-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search changes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Change Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="field_edit">Field Edits</SelectItem>
            <SelectItem value="publish">Publish Events</SelectItem>
            <SelectItem value="unpublish">Unpublish</SelectItem>
            <SelectItem value="schedule_update">Schedule</SelectItem>
            <SelectItem value="attendee_action">Attendee Actions</SelectItem>
            <SelectItem value="cancel">Cancellations</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterUser} onValueChange={setFilterUser}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            {uniqueUsers.map(user => (
              <SelectItem key={user} value={user}>{user}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {filteredChanges.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed rounded-lg">
          <FileText className="size-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">
            {searchTerm || filterType !== 'all' || filterUser !== 'all'
              ? 'No changes match your filters'
              : 'No changes recorded yet'}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[140px]">Timestamp</TableHead>
                <TableHead className="w-[180px]">User</TableHead>
                <TableHead className="w-[120px]">Type</TableHead>
                <TableHead>Change</TableHead>
                <TableHead className="w-[100px] text-center">Notification</TableHead>
                <TableHead className="w-[100px] text-right">Operations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChanges.map((change) => (
                <TableRow key={change.id}>
                  {/* Timestamp */}
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    <div className="flex flex-col gap-0.5">
                      <span>{new Date(change.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span className="text-[11px]">{new Date(change.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </TableCell>

                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full size-7 flex items-center justify-center flex-shrink-0 ${
                        change.userRole === 'host' ? 'bg-primary/15 text-primary' :
                        change.userRole === 'moderator' ? 'bg-muted text-foreground' :
                        change.userRole === 'co-host' ? 'bg-accent text-foreground' :
                        change.userRole === 'speaker' ? 'bg-muted text-foreground' :
                        'bg-muted'
                      }`}>
                        <span className="text-xs font-medium">
                          {change.userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-foreground truncate">
                            {change.userName}
                          </span>
                          {getRoleBadge(change.userRole)}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {change.userEmail}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Type */}
                  <TableCell>
                    {getChangeTypeBadge(change.changeType)}
                  </TableCell>

                  {/* Change Details */}
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 flex-shrink-0">
                        {getChangeIcon(change)}
                      </div>
                      <div className="min-w-0 flex-1">
                        {change.fieldLabel && (
                          <div className="text-sm font-medium text-foreground mb-1">
                            {change.fieldLabel}
                          </div>
                        )}
                        {change.oldValue !== undefined && change.newValue !== undefined && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="truncate max-w-[150px]" title={formatValue(change.oldValue)}>
                              {formatValue(change.oldValue)}
                            </span>
                            <ArrowRight className="size-3 flex-shrink-0" />
                            <span className="truncate max-w-[150px] font-medium text-foreground" title={formatValue(change.newValue)}>
                              {formatValue(change.newValue)}
                            </span>
                          </div>
                        )}
                        {change.details && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {change.details}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Notification Sent */}
                  <TableCell className="text-center">
                    {change.notificationSent ? (
                      <div className="inline-flex items-center gap-1.5 text-xs text-green-600">
                        <Mail className="size-3.5" />
                        <span>Sent</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>

                  {/* Operation Type */}
                  <TableCell className="text-right">
                    <span className="text-sm font-medium text-foreground">
                      {getOperationType(change.changeType)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Summary Stats */}
      {filteredChanges.length > 0 && (
        <div className="grid grid-cols-4 gap-4 pt-2">
          <div className="bg-card border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Total Changes</div>
            <div className="text-xl font-semibold text-foreground">{changes.length}</div>
          </div>
          <div className="bg-card border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Notifications Sent</div>
            <div className="text-xl font-semibold text-foreground">
              {changes.filter(c => c.notificationSent).length}
            </div>
          </div>
          <div className="bg-card border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Users Notified</div>
            <div className="text-xl font-semibold text-foreground">
              {changes.reduce((sum, c) => sum + (c.notificationSent ? c.affectedUsers : 0), 0)}
            </div>
          </div>
          <div className="bg-card border rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Contributors</div>
            <div className="text-xl font-semibold text-foreground">{uniqueUsers.length}</div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Users, Search, CheckCircle, XCircle, Clock, Mail, AlertCircle,
  UserPlus, ArrowRight, Filter, Download, Settings as SettingsIcon,
  Send, Loader2
} from 'lucide-react';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  position: number;
  notified: boolean;
  status: 'waiting' | 'notified' | 'expired' | 'claimed';
  source?: string;
}

interface WaitlistManagementProps {
  eventId: string;
  eventTitle: string;
  capacity: number;
  currentAttendees: number;
  waitlistEntries: WaitlistEntry[];
  autoPromotionEnabled?: boolean;
  notificationWindow?: number; // hours
  onPromote?: (entryId: string) => void;
  onRemove?: (entryId: string) => void;
  onBulkNotify?: (entryIds: string[]) => void;
  onUpdateSettings?: (settings: any) => void;
}

export function WaitlistManagement({
  eventId,
  eventTitle,
  capacity,
  currentAttendees,
  waitlistEntries,
  autoPromotionEnabled = true,
  notificationWindow = 24,
  onPromote,
  onRemove,
  onBulkNotify,
  onUpdateSettings,
}: WaitlistManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showPromoteDialog, setShowPromoteDialog] = useState(false);
  const [promotingEntry, setPromotingEntry] = useState<WaitlistEntry | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Settings
  const [settings, setSettings] = useState({
    autoPromotion: autoPromotionEnabled,
    notificationWindow,
    sendReminders: true,
    allowManualPromotion: true,
  });

  const spotsAvailable = capacity - currentAttendees;
  
  const filteredEntries = waitlistEntries.filter(entry => 
    entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const waitingEntries = filteredEntries.filter(e => e.status === 'waiting');
  const notifiedEntries = filteredEntries.filter(e => e.status === 'notified');
  const expiredEntries = filteredEntries.filter(e => e.status === 'expired');
  const claimedEntries = filteredEntries.filter(e => e.status === 'claimed');

  const toggleSelectEntry = (id: string) => {
    setSelectedEntries(prev => 
      prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]
    );
  };

  const handlePromote = async (entry: WaitlistEntry) => {
    setPromotingEntry(entry);
    setShowPromoteDialog(true);
  };

  const confirmPromotion = async () => {
    if (!promotingEntry) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onPromote?.(promotingEntry.id);
    setIsProcessing(false);
    setShowPromoteDialog(false);
    setPromotingEntry(null);
  };

  const handleBulkNotify = async () => {
    if (selectedEntries.length === 0) return;
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onBulkNotify?.(selectedEntries);
    setSelectedEntries([]);
    setIsProcessing(false);
  };

  const handleRemove = async (id: string) => {
    onRemove?.(id);
  };

  const handleSaveSettings = () => {
    onUpdateSettings?.(settings);
    setShowSettings(false);
  };

  const renderWaitlistEntry = (entry: WaitlistEntry) => (
    <Card key={entry.id} className="mb-2">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={selectedEntries.includes(entry.id)}
            onChange={() => toggleSelectEntry(entry.id)}
            className="size-4"
          />
          
          <Avatar className="size-10">
            <AvatarImage src={entry.avatar} />
            <AvatarFallback>{entry.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-sm truncate">{entry.name}</p>
              <Badge variant="outline" className="text-xs">
                #{entry.position}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">{entry.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Joined {new Date(entry.joinedAt).toLocaleDateString()} at{' '}
              {new Date(entry.joinedAt).toLocaleTimeString()}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {entry.status === 'waiting' && spotsAvailable > 0 && (
              <Button
                size="sm"
                onClick={() => handlePromote(entry)}
                className="bg-primary hover:bg-primary/90"
              >
                <UserPlus className="size-3 mr-1" />
                Promote
              </Button>
            )}
            {entry.status === 'notified' && (
              <Badge className="bg-blue-600">
                <Clock className="size-3 mr-1" />
                Notified
              </Badge>
            )}
            {entry.status === 'expired' && (
              <Badge variant="outline" className="text-muted-foreground">
                Expired
              </Badge>
            )}
            {entry.status === 'claimed' && (
              <Badge className="bg-green-600">
                <CheckCircle className="size-3 mr-1" />
                Claimed
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRemove(entry.id)}
              className="text-red-600 hover:text-red-700"
            >
              <XCircle className="size-3 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Waitlist Management</h3>
            <p className="text-sm text-muted-foreground">{eventTitle}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSettings(true)}
          >
            <SettingsIcon className="size-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="size-8 rounded bg-purple-100 flex items-center justify-center">
                  <Users className="size-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Capacity</p>
              </div>
              <p className="text-2xl font-bold">{currentAttendees}/{capacity}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {spotsAvailable} spots available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="size-8 rounded bg-orange-100 flex items-center justify-center">
                  <Clock className="size-4 text-orange-600" />
                </div>
                <p className="text-xs text-muted-foreground">Waiting</p>
              </div>
              <p className="text-2xl font-bold">{waitingEntries.length}</p>
              <p className="text-xs text-muted-foreground mt-1">
                In queue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="size-8 rounded bg-blue-100 flex items-center justify-center">
                  <Mail className="size-4 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground">Notified</p>
              </div>
              <p className="text-2xl font-bold">{notifiedEntries.length}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting response
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="size-8 rounded bg-green-100 flex items-center justify-center">
                  <CheckCircle className="size-4 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground">Claimed</p>
              </div>
              <p className="text-2xl font-bold">{claimedEntries.length}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Promoted successfully
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        {spotsAvailable > 0 && waitingEntries.length > 0 && (
          <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
            <AlertCircle className="size-5 text-green-600" />
            <div className="flex-1">
              <p className="font-medium text-sm text-green-900">
                {spotsAvailable} spot{spotsAvailable !== 1 ? 's' : ''} available
              </p>
              <p className="text-xs text-green-700">
                {settings.autoPromotion 
                  ? 'Auto-promotion is enabled. Next in queue will be notified automatically.'
                  : 'Auto-promotion is disabled. Manually promote from waitlist.'}
              </p>
            </div>
            {!settings.autoPromotion && (
              <Button
                size="sm"
                onClick={() => handlePromote(waitingEntries[0])}
                className="bg-green-600 hover:bg-green-700"
              >
                Promote Next
              </Button>
            )}
          </div>
        )}

        {/* Search and Bulk Actions */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          {selectedEntries.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkNotify}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : (
                  <Send className="size-4 mr-2" />
                )}
                Notify Selected ({selectedEntries.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEntries([])}
              >
                Clear
              </Button>
            </>
          )}
          <Button variant="outline" size="sm">
            <Download className="size-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="waiting">
          <TabsList className="w-full">
            <TabsTrigger value="waiting" className="flex-1">
              Waiting ({waitingEntries.length})
            </TabsTrigger>
            <TabsTrigger value="notified" className="flex-1">
              Notified ({notifiedEntries.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1">
              History ({claimedEntries.length + expiredEntries.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="waiting">
            <ScrollArea className="h-[400px]">
              {waitingEntries.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="size-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No one waiting</p>
                  <p className="text-sm text-muted-foreground">
                    Waitlist entries will appear here
                  </p>
                </div>
              ) : (
                waitingEntries.map(renderWaitlistEntry)
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="notified">
            <ScrollArea className="h-[400px]">
              {notifiedEntries.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="size-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No pending notifications</p>
                </div>
              ) : (
                notifiedEntries.map(renderWaitlistEntry)
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="history">
            <ScrollArea className="h-[400px]">
              {[...claimedEntries, ...expiredEntries].length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="size-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No history yet</p>
                </div>
              ) : (
                [...claimedEntries, ...expiredEntries].map(renderWaitlistEntry)
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      {/* Promote Confirmation Dialog */}
      <Dialog open={showPromoteDialog} onOpenChange={setShowPromoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote from Waitlist</DialogTitle>
            <DialogDescription>
              This will notify the attendee that a spot is available
            </DialogDescription>
          </DialogHeader>
          
          {promotingEntry && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src={promotingEntry.avatar} />
                  <AvatarFallback>
                    {promotingEntry.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{promotingEntry.name}</p>
                  <p className="text-sm text-muted-foreground">{promotingEntry.email}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    Position #{promotingEntry.position}
                  </Badge>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-foreground">
                  They will receive an email with a link to claim their spot within{' '}
                  {settings.notificationWindow} hours.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPromoteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmPromotion}
              disabled={isProcessing}
              className="bg-primary hover:bg-primary/90"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Notifying...
                </>
              ) : (
                <>
                  <Send className="size-4 mr-2" />
                  Send Notification
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Waitlist Settings</DialogTitle>
            <DialogDescription>
              Configure how your waitlist operates
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Promotion</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically notify next person when spot opens
                </p>
              </div>
              <Switch
                checked={settings.autoPromotion}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoPromotion: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notification Window</Label>
                <p className="text-xs text-muted-foreground">
                  Hours to claim spot before expiring
                </p>
              </div>
              <Input
                type="number"
                value={settings.notificationWindow}
                onChange={(e) =>
                  setSettings({ ...settings, notificationWindow: parseInt(e.target.value) })
                }
                className="w-20"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Send Reminders</Label>
                <p className="text-xs text-muted-foreground">
                  Remind notified people before expiry
                </p>
              </div>
              <Switch
                checked={settings.sendReminders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, sendReminders: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Manual Promotion</Label>
                <p className="text-xs text-muted-foreground">
                  Allow promoting anyone from queue
                </p>
              </div>
              <Switch
                checked={settings.allowManualPromotion}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowManualPromotion: checked })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="bg-primary hover:bg-primary/90"
            >
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
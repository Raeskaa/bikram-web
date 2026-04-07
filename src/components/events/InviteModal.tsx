import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { X, Mail, Users, Check, Search } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface InviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventTitle: string;
  eventDate?: string;
  eventTime?: string;
  eventId?: string;
}

const MOCK_COMMUNITY_MEMBERS = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop', role: 'Designer' },
  { id: '2', name: 'Mike Johnson', email: 'mike.j@example.com', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&h=200&fit=crop', role: 'Developer' },
  { id: '3', name: 'Emma Wilson', email: 'emma.w@example.com', avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=200&h=200&fit=crop', role: 'Researcher' },
  { id: '4', name: 'John Davis', email: 'john.d@example.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&fit=crop', role: 'Founder' },
  { id: '5', name: 'Priya Patel', email: 'priya.p@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop', role: 'Engineer' },
  { id: '6', name: 'Alex Martinez', email: 'alex.m@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop', role: 'Product Manager' },
  { id: '7', name: 'Lisa Anderson', email: 'lisa.a@example.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop', role: 'Data Scientist' },
  { id: '8', name: 'David Kim', email: 'david.k@example.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop', role: 'Designer' },
];

export function InviteModal({ open, onOpenChange, eventTitle, eventDate, eventTime, eventId }: InviteModalProps) {
  const [emailInput, setEmailInput] = useState('');
  const [addedEmails, setAddedEmails] = useState<string[]>([]);
  const [showCommunityImport, setShowCommunityImport] = useState(false);
  const [communitySearch, setCommunitySearch] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState(
    `You're invited to "${eventTitle}"${eventDate ? ` on ${eventDate}` : ''}${eventTime ? ` at ${eventTime}` : ''}.\n\nJoin us at https://leapspace.ai/events/${eventId || 'preview'}\n\nLooking forward to seeing you there!`
  );

  const handleAddEmails = () => {
    if (!emailInput.trim()) return;
    const newEmails = emailInput
      .split(/[,\n]+/)
      .map(e => e.trim())
      .filter(e => e.includes('@') && !addedEmails.includes(e));
    setAddedEmails(prev => [...prev, ...newEmails]);
    setEmailInput('');
  };

  const handleRemoveEmail = (email: string) => {
    setAddedEmails(prev => prev.filter(e => e !== email));
  };

  const handleToggleMember = (memberId: string) => {
    setSelectedMembers(prev => {
      const next = new Set(prev);
      if (next.has(memberId)) {
        next.delete(memberId);
      } else {
        next.add(memberId);
      }
      return next;
    });
  };

  const handleImportSelected = () => {
    const memberEmails = MOCK_COMMUNITY_MEMBERS
      .filter(m => selectedMembers.has(m.id))
      .map(m => m.email)
      .filter(e => !addedEmails.includes(e));
    setAddedEmails(prev => [...prev, ...memberEmails]);
    setSelectedMembers(new Set());
    setShowCommunityImport(false);
    if (memberEmails.length > 0) {
      toast.success(`${memberEmails.length} members imported`);
    }
  };

  const handleSendInvitations = () => {
    const count = addedEmails.length;
    if (count === 0) {
      toast.error('Add at least one email address');
      return;
    }
    toast.success(`${count} invitation${count !== 1 ? 's' : ''} sent!`, {
      description: 'Recipients will receive an email with event details and a registration link.'
    });
    setAddedEmails([]);
    setEmailInput('');
    onOpenChange(false);
  };

  const filteredMembers = MOCK_COMMUNITY_MEMBERS.filter(m =>
    communitySearch === '' ||
    m.name.toLowerCase().includes(communitySearch.toLowerCase()) ||
    m.email.toLowerCase().includes(communitySearch.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Invite People</DialogTitle>
          <DialogDescription>
            Send email invitations for "{eventTitle}"
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-2">
          {!showCommunityImport ? (
            <>
              {/* Email input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Email addresses</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter emails (comma-separated)"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddEmails(); } }}
                    className="flex-1"
                  />
                  <Button size="sm" variant="outline" className="border-border" onClick={handleAddEmails}>
                    Add
                  </Button>
                </div>
              </div>

              {/* Import from community */}
              <Button
                size="sm"
                variant="outline"
                className="w-full border-dashed border-border text-muted-foreground"
                onClick={() => setShowCommunityImport(true)}
              >
                <Users className="size-3.5 mr-2" />
                Import from community
              </Button>

              {/* Added emails list */}
              {addedEmails.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground">
                      Recipients ({addedEmails.length})
                    </label>
                    <button
                      className="text-xs text-red-500 hover:text-red-600"
                      onClick={() => setAddedEmails([])}
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-1 bg-muted rounded-lg p-2">
                    {addedEmails.map(email => (
                      <div key={email} className="flex items-center justify-between py-1 px-2 bg-card rounded border border-border">
                        <div className="flex items-center gap-2">
                          <Mail className="size-3 text-muted-foreground" />
                          <span className="text-xs text-foreground">{email}</span>
                        </div>
                        <button onClick={() => handleRemoveEmail(email)} className="text-muted-foreground hover:text-red-500">
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Message (included in email)</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="text-sm"
                />
              </div>

              {/* Stats preview */}
              <div className="bg-muted rounded-lg p-3 border border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{addedEmails.length}</span> will be invited
                  {addedEmails.length > 0 && ' · Invitation includes event details and a registration link'}
                </p>
              </div>
            </>
          ) : (
            /* Community import view */
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setShowCommunityImport(false)}>
                  Back
                </Button>
                <span className="text-sm font-medium text-foreground">Import from community</span>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={communitySearch}
                  onChange={(e) => setCommunitySearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="max-h-56 overflow-y-auto space-y-1">
                {filteredMembers.map(member => {
                  const isSelected = selectedMembers.has(member.id);
                  const alreadyAdded = addedEmails.includes(member.email);
                  return (
                    <button
                      key={member.id}
                      onClick={() => !alreadyAdded && handleToggleMember(member.id)}
                      disabled={alreadyAdded}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors text-left ${
                        alreadyAdded
                          ? 'opacity-50 cursor-not-allowed bg-muted'
                          : isSelected
                          ? 'bg-primary/5 border border-primary/20'
                          : 'hover:bg-muted border border-transparent'
                      }`}
                    >
                      <Avatar className="size-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{member.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{member.role}</span>
                      {alreadyAdded ? (
                        <Badge variant="secondary" className="text-[10px] shadow-none">Added</Badge>
                      ) : isSelected ? (
                        <Check className="size-4 text-primary flex-shrink-0" />
                      ) : (
                        <div className="size-4 rounded border border-border flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedMembers.size > 0 && (
                <Button
                  size="sm"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
                  onClick={handleImportSelected}
                >
                  Import {selectedMembers.size} member{selectedMembers.size !== 1 ? 's' : ''}
                </Button>
              )}
            </div>
          )}
        </div>

        {!showCommunityImport && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
              onClick={handleSendInvitations}
              disabled={addedEmails.length === 0}
            >
              <Mail className="size-3.5 mr-2" />
              Send {addedEmails.length > 0 ? `${addedEmails.length} ` : ''}Invitation{addedEmails.length !== 1 ? 's' : ''}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

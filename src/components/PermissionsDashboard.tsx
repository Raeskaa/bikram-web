import { useState } from 'react';
import { ShieldCheck, User, Shield, Lock, Search, MoreVertical, CheckCircle2, AlertCircle, UserPlus, Plus, BookmarkPlus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { useAuth, isEmptyStateUser } from '../contexts/AuthContext';
import { SectionEmptyState } from './SectionEmptyState';
import { toast } from 'sonner@2.0.3';

export function PermissionsDashboard() {
  const { currentUser } = useAuth();
  const isEmpty = isEmptyStateUser(currentUser);

  const [users, setUsers] = useState(() => isEmpty
    ? [{ id: '0', name: currentUser?.name || 'You', email: currentUser?.email || '', role: 'Owner', status: 'Active' }]
    : [
        { id: '1', name: 'Sarah Chen', email: 'sarah@trueleap.ai', role: 'Owner', status: 'Active' },
        { id: '2', name: 'Marcus Webb', email: 'marcus@trueleap.ai', role: 'Admin', status: 'Active' },
        { id: '3', name: 'Elena Rodriguez', email: 'elena@gmail.com', role: 'Moderator', status: 'Active' },
        { id: '4', name: 'James Park', email: 'james@gmail.com', role: 'Learner', status: 'Pending' },
      ]
  );

  // Create Role state
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  // Save as Template dialog state
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [pendingTemplateRoleName, setPendingTemplateRoleName] = useState('');

  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      toast.error('Role name is required');
      return;
    }
    const roleName = newRoleName.trim();
    toast.success('Role created', { description: `"${roleName}" is now available for assignment.` });
    setNewRoleName('');
    setNewRoleDescription('');
    setShowCreateRole(false);

    // Prompt to save as template
    setPendingTemplateRoleName(roleName);
    setShowTemplateDialog(true);
  };

  const handleSaveAsTemplate = () => {
    toast.success('Role saved as template', {
      description: `"${pendingTemplateRoleName}" is now available as a preset across all events and communities in this LeapSpace.`,
    });
    setShowTemplateDialog(false);
    setPendingTemplateRoleName('');
  };

  const handleSkipTemplate = () => {
    setShowTemplateDialog(false);
    setPendingTemplateRoleName('');
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="border-b border-border px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-foreground">Permissions</h1>
            <p className="text-sm text-muted-foreground">Manage team roles and system-wide access controls.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10 rounded-lg px-4 text-xs font-semibold gap-2 shadow-none" onClick={() => setShowCreateRole(true)}>
              <Plus className="size-4" /> Create Role
            </Button>
            <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 text-xs font-semibold gap-2 shadow-none">
              <UserPlus className="size-4" /> Invite User
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input className="pl-10 h-10 bg-muted border-border rounded-xl text-sm" placeholder="Search users or roles..." />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted border-b border-border sticky top-0 z-10">
            <tr>
              <th className="px-8 py-4 text-[10px] font-medium text-muted-foreground uppercase tracking-normal">User</th>
              <th className="px-8 py-4 text-[10px] font-medium text-muted-foreground uppercase tracking-normal">Role</th>
              <th className="px-8 py-4 text-[10px] font-medium text-muted-foreground uppercase tracking-normal">Status</th>
              <th className="px-8 py-4 text-[10px] font-medium text-muted-foreground uppercase tracking-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-semibold text-xs">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <Badge variant="outline" className={`rounded-lg text-[10px] font-semibold uppercase tracking-normal border-none ${user.role === 'Owner' ? 'bg-primary text-primary-foreground shadow-none' : 'text-muted-foreground bg-muted'}`}>
                    {user.role}
                  </Badge>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-1.5">
                    <div className={`size-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'}`} />
                    <span className="text-xs font-semibold text-muted-foreground">{user.status}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2 hover:bg-card rounded-lg text-muted-foreground/30 hover:text-muted-foreground transition-all opacity-0 group-hover:opacity-100">
                    <MoreVertical className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state hint below the single-row table */}
        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <div className="size-16 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-5">
              <UserPlus className="size-7 text-muted-foreground/50" />
            </div>
            <h3 className="text-foreground mb-2">Just you for now</h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Invite team members, assign roles, and control access to your communities, courses, and events.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <UserPlus className="size-4" />
              Invite Your First Team Member
            </Button>
          </div>
        )}
      </div>

      {/* Create Role Dialog */}
      <Dialog open={showCreateRole} onOpenChange={setShowCreateRole}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create custom role</DialogTitle>
            <DialogDescription>
              Define a new role for your LeapSpace. You can assign permissions and use this role when inviting members.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Role name</Label>
              <Input
                value={newRoleName}
                onChange={e => setNewRoleName(e.target.value)}
                placeholder="e.g. Community Lead, Event Manager..."
                className="h-11 rounded-xl border-border"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Description (optional)</Label>
              <Input
                value={newRoleDescription}
                onChange={e => setNewRoleDescription(e.target.value)}
                placeholder="What this role is responsible for..."
                className="h-11 rounded-xl border-border"
              />
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-xl" onClick={() => setShowCreateRole(false)}>Cancel</Button>
            <Button className="rounded-xl" onClick={handleCreateRole} disabled={!newRoleName.trim()}>
              <Plus className="mr-2 size-4" />
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save as Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookmarkPlus className="size-5" />
              </div>
              <div>
                <DialogTitle>Save as template?</DialogTitle>
              </div>
            </div>
            <DialogDescription className="text-sm leading-relaxed">
              Save <strong>"{pendingTemplateRoleName}"</strong> as a reusable preset. This template will be available across all events, communities, and nested content inside this LeapSpace.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground leading-relaxed">
            <div className="font-medium text-foreground mb-2">What this means:</div>
            <ul className="list-disc list-inside space-y-1.5">
              <li>This role will appear as a preset when assigning roles in events and communities</li>
              <li>Team leads can pick this template instead of configuring permissions from scratch</li>
              <li>Changes to the template will not retroactively affect existing assignments</li>
            </ul>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-xl" onClick={handleSkipTemplate}>
              Skip
            </Button>
            <Button className="rounded-xl" onClick={handleSaveAsTemplate}>
              <BookmarkPlus className="mr-2 size-4" />
              Save as template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

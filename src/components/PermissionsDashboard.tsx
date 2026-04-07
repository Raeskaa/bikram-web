import { useState } from 'react';
import { ShieldCheck, User, Shield, Lock, Search, MoreVertical, CheckCircle2, AlertCircle, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useAuth, isEmptyStateUser } from '../contexts/AuthContext';
import { SectionEmptyState } from './SectionEmptyState';

export function PermissionsDashboard() {
  const { currentUser } = useAuth();
  const isEmpty = isEmptyStateUser(currentUser);

  const users = isEmpty
    ? [{ id: '0', name: currentUser?.name || 'You', email: currentUser?.email || '', role: 'Owner', status: 'Active' }]
    : [
        { id: '1', name: 'Sarah Chen', email: 'sarah@trueleap.ai', role: 'Owner', status: 'Active' },
        { id: '2', name: 'Marcus Webb', email: 'marcus@trueleap.ai', role: 'Admin', status: 'Active' },
        { id: '3', name: 'Elena Rodriguez', email: 'elena@gmail.com', role: 'Moderator', status: 'Active' },
        { id: '4', name: 'James Park', email: 'james@gmail.com', role: 'Learner', status: 'Pending' },
      ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="border-b border-border px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-foreground">Permissions</h1>
            <p className="text-sm text-muted-foreground">Manage team roles and system-wide access controls.</p>
          </div>
          <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 text-xs font-semibold gap-2 shadow-none">
            <UserPlus className="size-4" /> Invite User
          </Button>
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
    </div>
  );
}

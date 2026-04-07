import { useState } from 'react';
import { 
  X, UserPlus, Mail, Shield, Star, Crown, Users, Send, AlertCircle, 
  CheckCircle2, Copy, MessageCircle, Eye, Trash2, Calendar, Activity,
  TrendingUp, MessageSquare, Heart, Clock, Award, Ban
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

// ==================== INVITE MEMBERS MODAL ====================
interface InviteMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  communityName: string;
}

export function InviteMembersModal({ isOpen, onClose, communityName }: InviteMembersModalProps) {
  const [emails, setEmails] = useState('');
  const [selectedRole, setSelectedRole] = useState<'member' | 'moderator' | 'admin'>('member');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    setIsSending(true);
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setEmails('');
        setPersonalMessage('');
        setSelectedRole('member');
      }, 2000);
    }, 1500);
  };

  const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
  const inviteLink = `https://leaper.app/join/${communityName.toLowerCase().replace(/\s+/g, '-')}`;

  const roles = [
    { 
      id: 'member' as const, 
      label: 'Member', 
      description: 'Can view and participate in discussions',
      icon: Users,
      color: 'text-gray-700'
    },
    { 
      id: 'moderator' as const, 
      label: 'Moderator', 
      description: 'Can manage content and members',
      icon: Shield,
      color: 'text-blue-700'
    },
    { 
      id: 'admin' as const, 
      label: 'Admin', 
      description: 'Full access to all community settings',
      icon: Crown,
      color: 'text-purple-700'
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-gray-900">Invite Members</h2>
            <p className="text-sm text-gray-600 mt-0.5">Add new members to {communityName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Addresses
              </label>
              <textarea
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="Enter email addresses separated by commas&#10;e.g., john@example.com, jane@example.com, alex@example.com"
                className="w-full h-24 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
              {emailList.length > 0 && (
                <p className="text-xs text-gray-600 mt-2">
                  {emailList.length} {emailList.length === 1 ? 'person' : 'people'} will be invited
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Select Role
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`size-5 ${isSelected ? 'text-primary' : role.color}`} />
                        <span className={`font-medium ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                          {role.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{role.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personal Message */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                placeholder="Add a personal note to your invitation..."
                className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              />
            </div>

            {/* Invite Link */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-900">Share Invite Link</label>
                <button className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                  <Copy className="size-3" />
                  Copy Link
                </button>
              </div>
              <div className="bg-white border border-gray-200 rounded px-3 py-2">
                <code className="text-xs text-gray-600">{inviteLink}</code>
              </div>
            </div>

            {/* Preview */}
            {emailList.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-blue-900 mb-1">Email Preview</h4>
                    <p className="text-sm text-blue-800 mb-2">
                      You've been invited to join <strong>{communityName}</strong> as a {selectedRole}
                    </p>
                    {personalMessage && (
                      <div className="bg-white/50 rounded px-3 py-2 text-sm text-blue-800 italic">
                        "{personalMessage}"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} disabled={isSending}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend}
            disabled={emailList.length === 0 || isSending}
            className="bg-primary hover:bg-primary/90"
          >
            {isSending ? (
              <>
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : showSuccess ? (
              <>
                <CheckCircle2 className="size-4 mr-2" />
                Sent!
              </>
            ) : (
              <>
                <Send className="size-4 mr-2" />
                Send {emailList.length > 0 ? `${emailList.length} ` : ''}Invitation{emailList.length !== 1 ? 's' : ''}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ==================== MEMBER DETAIL PANEL ====================
interface Member {
  id: string;
  name: string;
  email: string;
  title: string;
  role: string;
  joinedDate: string;
  lastActive: string;
  status: 'online' | 'idle' | 'offline';
  expertise: string[];
  level: number;
  points: number;
  postsCount: number;
  commentsCount: number;
  likesReceived: number;
  churnRisk?: number;
  tags?: string[];
}

interface MemberDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  userRole: 'admin' | 'moderator' | 'member';
  onChangeRole?: (memberId: string, newRole: string) => void;
  onRemoveMember?: (memberId: string) => void;
  onSendMessage?: (memberId: string) => void;
}

export function MemberDetailPanel({ 
  isOpen, 
  onClose, 
  member, 
  userRole,
  onChangeRole,
  onRemoveMember,
  onSendMessage 
}: MemberDetailPanelProps) {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  if (!isOpen || !member) return null;

  const canManage = userRole === 'admin' || userRole === 'moderator';

  const activityData = [
    { date: 'Today', action: 'Posted in General Discussion', time: '2 hours ago' },
    { date: 'Today', action: 'Commented on "React Best Practices"', time: '4 hours ago' },
    { date: 'Yesterday', action: 'Liked 3 posts', time: 'Yesterday at 3:45 PM' },
    { date: 'Dec 16', action: 'Joined event "Workshop"', time: 'Dec 16 at 2:00 PM' },
    { date: 'Dec 15', action: 'Completed course "Intro to React"', time: 'Dec 15 at 5:30 PM' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Member Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Member Header */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="size-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium text-xl">
                {member.name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div className={`absolute bottom-0 right-0 size-4 rounded-full border-2 border-white ${
                member.status === 'online' ? 'bg-green-500' : member.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-400'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-gray-900">{member.name}</h3>
                {member.role === 'Admin' && (
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                    <Crown className="size-3 mr-1" />
                    Admin
                  </Badge>
                )}
                {member.role === 'Moderator' && (
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    <Shield className="size-3 mr-1" />
                    Moderator
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{member.title}</p>
              <p className="text-xs text-gray-500">{member.email}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 px-6 py-6">
          <div className="space-y-6">
            {/* Quick Stats */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Activity Stats</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <MessageSquare className="size-5 text-gray-600 mx-auto mb-1" />
                  <p className="text-lg font-semibold text-gray-900">{member.postsCount}</p>
                  <p className="text-xs text-gray-600">Posts</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <MessageCircle className="size-5 text-gray-600 mx-auto mb-1" />
                  <p className="text-lg font-semibold text-gray-900">{member.commentsCount}</p>
                  <p className="text-xs text-gray-600">Comments</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <Heart className="size-5 text-gray-600 mx-auto mb-1" />
                  <p className="text-lg font-semibold text-gray-900">{member.likesReceived}</p>
                  <p className="text-xs text-gray-600">Likes</p>
                </div>
              </div>
            </div>

            {/* Member Info */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Joined</span>
                  <span className="text-gray-900">{member.joinedDate}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Last Active</span>
                  <span className="text-gray-900">{member.lastActive}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Level</span>
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-purple-600" />
                    <span className="text-gray-900">Level {member.level}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Points</span>
                  <span className="text-gray-900 font-medium">{member.points}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {member.tags && member.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {member.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Expertise */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Churn Risk - Admin Only */}
            {userRole === 'admin' && member.churnRisk !== undefined && member.churnRisk > 30 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-orange-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-orange-900 mb-1">Churn Risk Alert</h4>
                    <p className="text-sm text-orange-800 mb-2">
                      This member has a {member.churnRisk}% risk of leaving the community
                    </p>
                    <Button size="sm" variant="outline" className="text-xs border-orange-300 text-orange-700 hover:bg-orange-100">
                      <MessageCircle className="size-3 mr-1" />
                      Send Check-in Message
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h4>
              <div className="space-y-3">
                {activityData.map((activity, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="size-2 rounded-full bg-primary" />
                      {idx !== activityData.length - 1 && (
                        <div className="w-px h-full bg-gray-200 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-200 space-y-2">
          <Button 
            className="w-full bg-primary hover:bg-primary/90"
            onClick={() => onSendMessage?.(member.id)}
          >
            <MessageCircle className="size-4 mr-2" />
            Send Message
          </Button>
          
          {canManage && (
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              >
                <Shield className="size-4 mr-2" />
                Change Role
              </Button>
              <Button 
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => setShowRemoveConfirm(true)}
              >
                <Trash2 className="size-4 mr-2" />
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <RemoveMemberConfirmModal
          isOpen={showRemoveConfirm}
          onClose={() => setShowRemoveConfirm(false)}
          memberName={member.name}
          onConfirm={() => {
            onRemoveMember?.(member.id);
            setShowRemoveConfirm(false);
            onClose();
          }}
        />
      )}
    </>
  );
}

// ==================== REMOVE MEMBER CONFIRMATION ====================
interface RemoveMemberConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  onConfirm: () => void;
}

function RemoveMemberConfirmModal({ isOpen, onClose, memberName, onConfirm }: RemoveMemberConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="size-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="size-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-gray-900">Remove Member?</h3>
              <p className="text-sm text-gray-600 mt-1">
                This action cannot be undone
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              You're about to remove <strong>{memberName}</strong> from this community. 
              They will lose access immediately and won't be able to view or participate 
              in any content.
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={onConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="size-4 mr-2" />
              Remove Member
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

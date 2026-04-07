import { X, AlertCircle, CheckCircle2, Users, Mail, Calendar, BookOpen, Trophy } from 'lucide-react';
import { useState } from 'react';

interface AccountMergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMerge: (keepPrimary: boolean) => void;
  detectedAccount: {
    provider: string;
    email: string;
    createdDate: string;
    coursesCount: number;
    communitiesCount: number;
    eventsCount: number;
    achievementsCount: number;
  };
  currentAccount: {
    provider: string;
    email: string;
    createdDate: string;
    coursesCount: number;
    communitiesCount: number;
    eventsCount: number;
    achievementsCount: number;
  };
}

export function AccountMergeModal({
  isOpen,
  onClose,
  onMerge,
  detectedAccount,
  currentAccount,
}: AccountMergeModalProps) {
  const [selectedPrimary, setSelectedPrimary] = useState<'current' | 'detected'>('current');

  if (!isOpen) return null;

  const handleMerge = () => {
    onMerge(selectedPrimary === 'current');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-card rounded-2xl max-w-4xl w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-yellow-50 border-b border-yellow-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="size-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="size-6 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Duplicate Account Detected</h2>
                  <p className="text-sm text-foreground mt-1">
                    We found an existing account with the same email. Would you like to merge them?
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Warning Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Choose your primary account</p>
                  <p className="text-blue-700">
                    Select which account's data you want to keep as primary. All data from both accounts will be merged,
                    but the primary account's email and settings will be retained.
                  </p>
                </div>
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Current Account */}
              <button
                onClick={() => setSelectedPrimary('current')}
                className={`p-5 border-2 rounded-xl text-left transition-all ${
                  selectedPrimary === 'current'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">Current Account</h3>
                      {selectedPrimary === 'current' && (
                        <CheckCircle2 className="size-4 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{currentAccount.provider}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-muted-foreground" />
                    <p className="text-xs text-foreground">{currentAccount.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Joined {currentAccount.createdDate}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Courses</span>
                    <span className="text-xs font-medium text-foreground">{currentAccount.coursesCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Communities</span>
                    <span className="text-xs font-medium text-foreground">{currentAccount.communitiesCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Events</span>
                    <span className="text-xs font-medium text-foreground">{currentAccount.eventsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Achievements</span>
                    <span className="text-xs font-medium text-foreground">{currentAccount.achievementsCount}</span>
                  </div>
                </div>
              </button>

              {/* Detected Account */}
              <button
                onClick={() => setSelectedPrimary('detected')}
                className={`p-5 border-2 rounded-xl text-left transition-all ${
                  selectedPrimary === 'detected'
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">Existing Account</h3>
                      {selectedPrimary === 'detected' && (
                        <CheckCircle2 className="size-4 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{detectedAccount.provider}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-muted-foreground" />
                    <p className="text-xs text-foreground">{detectedAccount.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Joined {detectedAccount.createdDate}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Courses</span>
                    <span className="text-xs font-medium text-foreground">{detectedAccount.coursesCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Communities</span>
                    <span className="text-xs font-medium text-foreground">{detectedAccount.communitiesCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Events</span>
                    <span className="text-xs font-medium text-foreground">{detectedAccount.eventsCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Achievements</span>
                    <span className="text-xs font-medium text-foreground">{detectedAccount.achievementsCount}</span>
                  </div>
                </div>
              </button>
            </div>

            {/* What Happens */}
            <div className="bg-muted border border-border rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-foreground mb-3">What happens when you merge?</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground">
                    <strong>All content is preserved:</strong> Courses, communities, events, and achievements from both accounts will be combined
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground">
                    <strong>Primary email is used:</strong> Your selected primary account's email will be the main login
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground">
                    <strong>Both login methods work:</strong> You can still sign in with either provider after merging
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground">
                    <strong>30-day undo period:</strong> You can undo this merge within 30 days from Settings
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleMerge}
                className="flex-1 h-11 bg-primary text-white rounded-lg font-medium text-sm
                  hover:bg-primary/90 active:bg-primary/80
                  transition-all duration-200"
              >
                Merge accounts
              </button>
              <button
                onClick={onClose}
                className="flex-1 h-11 bg-card border border-border text-foreground rounded-lg font-medium text-sm
                  hover:bg-muted hover:border-border
                  transition-all duration-200"
              >
                Keep separate
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              This action can be undone within 30 days from Settings → Security → Merged Accounts
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
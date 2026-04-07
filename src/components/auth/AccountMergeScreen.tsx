import { AuthLayout } from './AuthLayout';
import { Mail, Calendar, CheckCircle2, Users } from 'lucide-react';
import { useState } from 'react';

interface AccountMergeScreenProps {
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
  onMerge: (keepPrimary: boolean) => void;
  onKeepSeparate: () => void;
}

export function AccountMergeScreen({
  detectedAccount,
  currentAccount,
  onMerge,
  onKeepSeparate,
}: AccountMergeScreenProps) {
  const [selectedPrimary, setSelectedPrimary] = useState<'detected' | 'current'>('detected');

  const handleMerge = () => {
    onMerge(selectedPrimary === 'current');
  };

  const totalItems = (acc: typeof detectedAccount) => 
    acc.coursesCount + acc.communitiesCount + acc.eventsCount;

  return (
    <AuthLayout
      title="Account Already Exists"
      subtitle="We found an existing account with this email. Would you like to connect them?"
      showGuestOption={false}
    >
      {/* Info Notice */}
      <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Users className="size-5 text-gray-700 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-medium mb-1">Choose which account to keep as primary</p>
            <p className="text-gray-600">
              All your content will be merged. You'll be able to sign in with both methods.
            </p>
          </div>
        </div>
      </div>

      {/* Two Account Cards */}
      <div className="space-y-3 mb-6">
        {/* Existing Account */}
        <button
          onClick={() => setSelectedPrimary('detected')}
          className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
            selectedPrimary === 'detected'
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">Existing Account</span>
                {selectedPrimary === 'detected' && (
                  <CheckCircle2 className="size-4 text-purple-600" />
                )}
              </div>
              <p className="text-xs text-gray-600">{detectedAccount.provider}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-gray-400" />
              <p className="text-sm text-gray-900">{detectedAccount.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-gray-400" />
              <p className="text-sm text-gray-600">Member since {detectedAccount.createdDate}</p>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-900">
                {totalItems(detectedAccount)} item{totalItems(detectedAccount) !== 1 ? 's' : ''} created
              </p>
            </div>
          </div>
        </button>

        {/* New Account */}
        <button
          onClick={() => setSelectedPrimary('current')}
          className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
            selectedPrimary === 'current'
              ? 'border-purple-600 bg-purple-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">New Account</span>
                {selectedPrimary === 'current' && (
                  <CheckCircle2 className="size-4 text-purple-600" />
                )}
              </div>
              <p className="text-xs text-gray-600">{currentAccount.provider}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-gray-400" />
              <p className="text-sm text-gray-900">{currentAccount.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-gray-400" />
              <p className="text-sm text-gray-600">Created {currentAccount.createdDate}</p>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-900">
                {totalItems(currentAccount)} item{totalItems(currentAccount) !== 1 ? 's' : ''} created
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleMerge}
          className="w-full h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
            hover:bg-purple-700 active:bg-purple-800 transition-all duration-200"
        >
          Merge accounts
        </button>
        
        <button
          onClick={onKeepSeparate}
          className="w-full h-11 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium text-sm
            hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
        >
          Keep separate
        </button>
      </div>

      {/* Footer Note */}
      <p className="text-xs text-gray-500 text-center mt-4">
        You can undo this merge within 30 days from Settings
      </p>
    </AuthLayout>
  );
}

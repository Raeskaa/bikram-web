import { X, Users, ChevronRight } from 'lucide-react';

interface MergeDetectionBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
  onViewDetails: () => void;
  duplicateEmail: string;
}

export function MergeDetectionBanner({
  isVisible,
  onDismiss,
  onViewDetails,
  duplicateEmail,
}: MergeDetectionBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-yellow-50 border-b border-yellow-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="size-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="size-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-900">
                Duplicate account detected
              </p>
              <p className="text-xs text-yellow-700">
                We found an existing account with <strong>{duplicateEmail}</strong>. Merge them to access all your content in one place.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onViewDetails}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium
                hover:bg-yellow-700 transition-colors flex items-center gap-1"
            >
              Review & Merge
              <ChevronRight className="size-4" />
            </button>
            <button
              onClick={onDismiss}
              className="p-2 text-yellow-600 hover:text-yellow-800 transition-colors"
              title="Dismiss"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

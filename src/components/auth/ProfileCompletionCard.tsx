import { useState } from 'react';
import { User, ArrowRight, Loader2 } from 'lucide-react';
import { AuthLayout } from './AuthLayout';

interface ProfileCompletionCardProps {
  onComplete: (name: string) => void;
  isLoading?: boolean;
  onLogoClick?: () => void;
}

export function ProfileCompletionCard({ onComplete, isLoading, onLogoClick }: ProfileCompletionCardProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    onComplete(name.trim());
  };

  return (
    <AuthLayout
      title="Complete your profile"
      subtitle="Just one last step to get you started"
      onLogoClick={onLogoClick}
      showGuestOption={false}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-900 text-center">
            What's your full name?
          </label>
          <div className="space-y-1">
            <input
              id="name"
              autoFocus
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. Sarah Chen"
              className={`w-full h-14 px-4 bg-white border rounded-lg text-base text-gray-900 
                focus:outline-none focus:ring-2 focus:ring-[#420D74] focus:border-transparent
                transition-all duration-200
                ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
              `}
              disabled={isLoading}
            />
            {error && <p className="text-xs text-red-600 font-medium text-center">{error}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="w-full h-12 bg-[#420D74] text-white rounded-lg font-medium text-base hover:bg-[#2e0952] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            'Finish Setup'
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

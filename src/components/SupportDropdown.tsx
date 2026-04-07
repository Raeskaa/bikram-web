import { useState } from 'react';
import { ChevronDown, BookOpen, Users, HelpCircle, MessageSquare } from 'lucide-react';

export function SupportDropdown() {
  const [showSupportMenu, setShowSupportMenu] = useState(false);

  const supportOptions = [
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'community', label: 'Community support', icon: Users },
    { id: 'help', label: 'Get help', icon: HelpCircle },
    { id: 'feedback', label: 'Share feedback', icon: MessageSquare },
  ];

  const handleOptionClick = (optionId: string) => {
    console.log('Support option clicked:', optionId);
    setShowSupportMenu(false);
    // In real app, handle navigation/actions here
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowSupportMenu(!showSupportMenu)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-100 rounded-md transition-all active:scale-95 border border-gray-200"
        title="Support"
      >
        <span className="text-sm font-medium text-gray-900">Support</span>
        <ChevronDown className="size-3.5 text-gray-600" />
      </button>
      
      {/* Support Menu */}
      {showSupportMenu && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowSupportMenu(false)}
          />
          <div 
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20 animate-in fade-in slide-in-from-top-2 duration-200"
            style={{ transformOrigin: 'top right' }}
          >
            {supportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-all text-left"
                >
                  <Icon className="size-4 text-gray-600 flex-shrink-0" />
                  <span className="text-sm text-gray-900">{option.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

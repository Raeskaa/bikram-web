import { Plus, LogOut, X } from 'lucide-react';

interface LeapSpace {
  id: string;
  name: string;
  type: 'personal' | 'work' | 'school' | 'custom';
  coursesCount: number;
  communitiesCount: number;
  eventsCount: number;
}

interface LeapSpaceSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentLeapSpace: LeapSpace;
  leapSpaces: LeapSpace[];
  onSwitch: (leapSpaceId: string) => void;
  onAddNew: () => void;
  onSignOut: () => void;
  userEmail: string;
}

export function LeapSpaceSwitcher({
  isOpen,
  onClose,
  currentLeapSpace,
  leapSpaces,
  onSwitch,
  onAddNew,
  onSignOut,
  userEmail
}: LeapSpaceSwitcherProps) {
  if (!isOpen) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-20 bottom-20 z-50 w-[340px] bg-popover rounded-2xl border border-border overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors z-10 p-1 hover:bg-accent rounded-lg"
        >
          <X className="size-4" />
        </button>

        {/* Current LeapSpace - Hero Section */}
        <div className="relative">
          {/* Header Image - Grey for now */}
          <div className="h-24 bg-muted relative overflow-hidden" />
          
          {/* Current User Info */}
          <div className="px-6 pb-5 pt-0 text-center">
            {/* Large Avatar */}
            <div className="relative inline-block -mt-12 mb-3">
              <div className="size-24 rounded-full bg-foreground/60 flex items-center justify-center text-card font-semibold text-2xl border-4 border-popover">
                {getInitials(currentLeapSpace.name)}
              </div>
            </div>
            
            {/* Name */}
            <h2 className="text-foreground text-lg font-semibold mb-1">
              {currentLeapSpace.name}
            </h2>
            
            {/* Email */}
            {userEmail && (
              <p className="text-muted-foreground text-sm mb-4">{userEmail}</p>
            )}
            
            {/* Manage Button */}
            <button className="w-full py-2.5 px-4 bg-card border border-input text-foreground rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              Manage your LeapSpace
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Other LeapSpaces List */}
        <div className="py-2 max-h-64 overflow-y-auto">
          {leapSpaces
            .filter(space => space.id !== currentLeapSpace.id)
            .map(space => (
              <button
                key={space.id}
                onClick={() => {
                  onSwitch(space.id);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
              >
                <div className="size-10 rounded-full bg-foreground/60 flex items-center justify-center text-card font-medium text-sm flex-shrink-0">
                  {getInitials(space.name)}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-popover-foreground truncate">
                    {space.name}
                  </p>
                </div>
              </button>
            ))}
        </div>

        {/* Actions */}
        <div className="border-t border-border py-2">
          <button
            onClick={() => {
              onAddNew();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
          >
            <div className="size-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Plus className="size-5 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium text-popover-foreground">Add LeapSpace</span>
          </button>

          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
          >
            <LogOut className="size-5 text-muted-foreground ml-2.5" />
            <span className="text-sm font-medium text-popover-foreground">Sign out of all LeapSpaces</span>
          </button>
        </div>
      </div>
    </>
  );
}

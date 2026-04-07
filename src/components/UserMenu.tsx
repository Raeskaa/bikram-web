import { useState, useRef, useEffect } from 'react';
import { User, Settings, CreditCard, HelpCircle, LogOut, ChevronDown, Moon, Link2, BookOpen, MessageSquare, Inbox } from 'lucide-react';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onInvitationsClick: () => void;
  onBillingClick: () => void;
  onHelpClick: () => void;
  onSignOut: () => void;
  isGuest?: boolean;
}

export function UserMenu({ 
  user, 
  onProfileClick, 
  onSettingsClick, 
  onInvitationsClick,
  onBillingClick,
  onHelpClick,
  onSignOut,
  isGuest
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleMenuItemClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const menuItemClass = "w-full px-4 py-2.5 text-left text-sm text-popover-foreground hover:bg-accent transition-colors flex items-center gap-3";

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors"
      >
        {/* Guest Label (subtle) */}
        {isGuest && (
          <div className="hidden md:flex flex-col items-start mr-1">
            <span className="text-[10px] text-muted-foreground leading-none">Hello, Guest</span>
            <span className="text-xs font-medium text-foreground leading-none mt-0.5">Sign in</span>
          </div>
        )}
        
        {/* Avatar */}
        {user.avatar ? (
          <img 
            src="https://images.unsplash.com/photo-1520690174339-f1db1ce939a0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={user.name}
            className="size-8 rounded-full object-cover"
          />
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1520690174339-f1db1ce939a0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={user.name}
            className="size-8 rounded-full object-cover"
          />
        )}
        
        {/* Name (hidden on mobile, only if not guest) */}
        {!isGuest && (
          <span className="hidden md:block text-sm font-medium text-foreground">
            {user.name.split(' ')[0]}
          </span>
        )}

        {/* Chevron */}
        <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg z-50 py-2">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-popover-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => handleMenuItemClick(onProfileClick)}
              className={menuItemClass}
            >
              <User className="size-4 text-muted-foreground" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => handleMenuItemClick(onSettingsClick)}
              className={menuItemClass}
            >
              <Settings className="size-4 text-muted-foreground" />
                <span>My Account</span>
            </button>

            <button
              onClick={() => handleMenuItemClick(onSettingsClick)}
              className={menuItemClass}
            >
              <Link2 className="size-4 text-muted-foreground" />
              <span>Connected Accounts</span>
            </button>

            <button
              onClick={() => handleMenuItemClick(onInvitationsClick)}
              className={menuItemClass}
            >
              <Inbox className="size-4 text-muted-foreground" />
              <span>Invitations</span>
            </button>

            <button
              onClick={() => handleMenuItemClick(onBillingClick)}
              className={menuItemClass}
            >
              <CreditCard className="size-4 text-muted-foreground" />
              <span>Billing</span>
            </button>
          </div>

          {/* New Features Section */}
          <div className="py-2 border-t border-border">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); }}
              className={menuItemClass}
            >
              <Moon className="size-4 text-muted-foreground" />
              <span>Dark Mode</span>
              {/* Toggle Switch - Disabled */}
              <div className="ml-auto relative inline-flex items-center">
                <input
                  type="checkbox"
                  disabled
                  className="sr-only"
                />
                <div className="w-9 h-5 bg-muted rounded-full cursor-not-allowed opacity-50">
                  <div className="w-4 h-4 bg-card rounded-full transform translate-x-0.5 translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          </div>

          {/* Help Section */}
          <div className="py-2 border-t border-border">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleMenuItemClick(onHelpClick); }}
              className={menuItemClass}
            >
              <HelpCircle className="size-4 text-muted-foreground" />
              <span>Help</span>
            </a>
            
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleMenuItemClick(onHelpClick); }}
              className={menuItemClass}
            >
              <BookOpen className="size-4 text-muted-foreground" />
              <span>Training</span>
            </a>
            
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleMenuItemClick(onHelpClick); }}
              className={menuItemClass}
            >
              <MessageSquare className="size-4 text-muted-foreground" />
              <span>Send feedback to LeapSpace</span>
            </a>
          </div>

          {/* Sign Out */}
          <div className="pt-2 border-t border-border">
            <button
              onClick={() => handleMenuItemClick(onSignOut)}
              className="w-full px-4 py-2.5 text-left text-sm text-destructive
                hover:bg-destructive/10 transition-colors
                flex items-center gap-3"
            >
              <LogOut className="size-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

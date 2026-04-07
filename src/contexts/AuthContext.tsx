import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  email: string;
  name: string;
  avatar: string;
  role?: 'creator' | 'learner'; // For demo purposes only
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Test users for prototype
export const TEST_USERS: Record<string, User> = {
  'mahesh@email.com': {
    email: 'mahesh@email.com',
    name: 'Mahesh Kumar',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mahesh',
    role: 'creator',
  },
  'sarah.chen@gmail.com': {
    email: 'sarah.chen@gmail.com',
    name: 'Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'learner',
  },
  'empty@email.com': {
    email: 'empty@email.com',
    name: 'New User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Empty',
    role: 'creator',
  },
};

// Helper to check if user is the empty/onboarding state user
export function isEmptyStateUser(user: User | null): boolean {
  return user?.email === 'empty@email.com';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initialize from localStorage on mount, or default to Sarah for testing
  useEffect(() => {
    const storedUser = localStorage.getItem('leapspace_current_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('leapspace_current_user');
        // Default to Sarah for Phase 1 testing
        setCurrentUser(TEST_USERS['sarah.chen@gmail.com']);
        localStorage.setItem('leapspace_current_user', JSON.stringify(TEST_USERS['sarah.chen@gmail.com']));
      }
    } else {
      // No stored user - default to Sarah (learner) for Phase 1 testing
      setCurrentUser(TEST_USERS['sarah.chen@gmail.com']);
      localStorage.setItem('leapspace_current_user', JSON.stringify(TEST_USERS['sarah.chen@gmail.com']));
    }
  }, []);

  const login = (email: string) => {
    const user = TEST_USERS[email];
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('leapspace_current_user', JSON.stringify(user));
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('leapspace_current_user');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
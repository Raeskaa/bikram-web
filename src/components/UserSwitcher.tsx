import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import { ChevronDown, User, CheckCircle } from 'lucide-react';
import { useAuth, TEST_USERS } from '../contexts/AuthContext';

export function UserSwitcher() {
  const { currentUser, login, logout } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex gap-2">
        <Button
          onClick={() => login('sarah.chen@gmail.com')}
          size="sm"
          variant="outline"
          className="rounded-lg"
        >
          Login as Sarah (Learner)
        </Button>
        <Button
          onClick={() => login('mahesh@email.com')}
          size="sm"
          variant="outline"
          className="rounded-lg"
        >
          Login as Mahesh (Creator)
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-lg gap-2">
          <div className="size-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
            {currentUser.name.charAt(0)}
          </div>
          <span className="text-sm">{currentUser.name}</span>
          <Badge
            variant="secondary"
            className={`text-xs ${
              currentUser.role === 'creator' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {currentUser.role}
          </Badge>
          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground">{currentUser.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Switch Demo Account
        </DropdownMenuLabel>
        {Object.values(TEST_USERS).map((user) => (
          <DropdownMenuItem
            key={user.email}
            onClick={() => login(user.email)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
                {user.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.role}</span>
              </div>
            </div>
            {currentUser.email === user.email && (
              <CheckCircle className="size-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive">
          <User className="size-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { User, Bell, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAdminAuth } from '../../context/AdminAuthContext';

export function Navbar() {
  const { dispatch } = useAdminAuth();
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2 lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex flex-shrink-0 items-center">
              <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-neon-purple">
                <span className="text-lg font-display font-bold text-white">A</span>
              </div>
              <span className="hidden text-xl font-display font-bold text-white sm:block">
                GAMEZONE ADMIN
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-text-secondary transition-colors hover:text-text">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-error ring-2 ring-background" />
            </button>

            <div className="mx-2 h-8 w-px bg-border" />

            <div className="flex items-center space-x-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-text">
                  Jane Admin
                </p>
                <p className="text-xs text-text-secondary">Administrator</p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background">
                <User className="h-5 w-5 text-text-secondary" />
              </div>

              <Button variant="outline" size="sm" onClick={handleLogout} className="ml-2">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

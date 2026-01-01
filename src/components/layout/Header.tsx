import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, Search, LogOut, User, Moon, Sun } from 'lucide-react';
import { Avatar } from '@/components/common/BadgeAvatarLoading';
import { ZodiacBadge } from '@/components/zodiac/ZodiacComponents';
import { formatZodiacDisplay } from '@/utils/zodiacHelpers';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search members, teams, departments..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-sagittarius-500 focus:ring-2 focus:ring-sagittarius-200 transition-colors"
            />
          </div>
        </div>

        {/* Right: Actions & User */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Avatar
                src={user?.avatarUrl}
                alt={user?.fullName || 'User'}
                fallback={user?.fullName}
                size="md"
              />
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-900">{user?.fullName}</p>
                <p className="text-xs text-gray-500">{user?.position}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-20 animate-scale-in">
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar
                        src={user?.avatarUrl}
                        alt={user?.fullName || 'User'}
                        fallback={user?.fullName}
                        size="lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{user?.fullName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    {user?.zodiacSign && (
                      <div className="flex items-center gap-2">
                        <ZodiacBadge sign={user.zodiacSign} size="sm" />
                        <span className="text-xs text-gray-500">
                          {formatZodiacDisplay(user.zodiacSign)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Profile Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-left text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
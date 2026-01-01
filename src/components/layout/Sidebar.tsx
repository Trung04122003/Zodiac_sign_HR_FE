import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  LayoutDashboard,
  Users,
  Building2,
  UsersRound,
  Sparkles,
  BarChart3,
  FileText,
  Settings,
  Calendar,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Members', path: '/members', icon: <Users className="w-5 h-5" /> },
  { label: 'Departments', path: '/departments', icon: <Building2 className="w-5 h-5" /> },
  { label: 'Teams', path: '/teams', icon: <UsersRound className="w-5 h-5" /> },
  {
    label: 'Zodiac Profiles',
    path: '/zodiac/profiles',
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    label: 'Compatibility',
    path: '/zodiac/compatibility',
    icon: <span className="text-lg">💕</span>,
  },
  { label: 'Analytics', path: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { label: 'Reports', path: '/reports', icon: <FileText className="w-5 h-5" /> },
  { label: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-sagittarius rounded-xl flex items-center justify-center text-white text-2xl shadow-zodiac">
            ♐
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900">Zodiac HR</h1>
            <p className="text-xs text-gray-500">JCI Danang</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-sagittarius-50 text-sagittarius-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-sagittarius rounded-lg p-4 text-white text-center">
          <Calendar className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm font-semibold mb-1">Birthday Tracker</p>
          <p className="text-xs text-sagittarius-100">3 birthdays this month</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
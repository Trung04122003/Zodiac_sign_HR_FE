import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/common/CardAndModal';
import { ZodiacBadge, ElementBadge } from '@/components/zodiac/ZodiacComponents';
import { getZodiacElement } from '@/utils/zodiacHelpers';
import { Users, Building2, UsersRound, TrendingUp, Calendar, Sparkles } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  // Mock data (will be replaced with real API calls later)
  const stats = [
    { label: 'Total Members', value: '45', icon: <Users className="w-6 h-6" />, color: 'blue' },
    { label: 'Active Teams', value: '8', icon: <UsersRound className="w-6 h-6" />, color: 'green' },
    { label: 'Departments', value: '6', icon: <Building2 className="w-6 h-6" />, color: 'purple' },
    { label: 'Avg Compatibility', value: '78%', icon: <TrendingUp className="w-6 h-6" />, color: 'orange' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-sagittarius text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Welcome back, {user?.fullName}!</h1>
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-sagittarius-100 text-lg mb-4">
              🎯 Aim High, Lead with Optimism! Ready to manage your team today?
            </p>
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-sagittarius-100">Your Zodiac Sign</p>
                <div className="flex items-center gap-2 mt-1">
                  {user?.zodiacSign && (
                    <>
                      <ZodiacBadge sign={user.zodiacSign} size="md" />
                      <ElementBadge element={getZodiacElement(user.zodiacSign)} size="sm" />
                    </>
                  )}
                </div>
              </div>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-sagittarius-100">Position</p>
                <p className="text-white font-semibold mt-1">{user?.position}</p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-8xl backdrop-blur-sm animate-float">
              ♐
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} hover className="group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-${stat.color}-500 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Birthdays */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sagittarius-500" />
              Upcoming Birthdays
            </h2>
            <span className="text-sm text-gray-500">Next 30 days</span>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-gradient-sagittarius rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">Dec 15, 2024 • 3 days</p>
                </div>
                <span className="text-2xl">🎂</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Daily Zodiac Insight */}
        <Card className="bg-gradient-to-br from-sagittarius-50 to-blue-50">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-sagittarius-500" />
            <h2 className="text-xl font-semibold text-gray-900">Daily Zodiac Insight</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-sm font-medium text-sagittarius-700 mb-2">
                ♐ Sagittarius - Today's Wisdom
              </p>
              <p className="text-gray-700 italic">
                "Your optimism is contagious today! Use it to inspire your team and tackle 
                challenging projects. Great day for collaboration and new ideas."
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🔥 Fire Element Energy</span>
              <span>•</span>
              <span>💪 High Motivation</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Organization Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-sagittarius-600">12</p>
            <p className="text-sm text-gray-600">Zodiac Signs</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-fire">15</p>
            <p className="text-sm text-gray-600">Fire Signs</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-earth">12</p>
            <p className="text-sm text-gray-600">Earth Signs</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-air">10</p>
            <p className="text-sm text-gray-600">Air Signs</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;
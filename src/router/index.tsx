import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

// Layouts
import MainLayout from '@/components/layout/MainLayout';
import AuthLayout from '@/components/layout/AuthLayout';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';

// Dashboard
import DashboardPage from '@/pages/dashboard/DashboardPage';

// Members
import MembersListPage from '@/pages/members/MembersListPage';
import MemberDetailPage from '@/pages/members/MemberDetailPage';
import AddMemberPage from '@/pages/members/AddMemberPage';
import EditMemberPage from '@/pages/members/EditMemberPage';

// Departments
import DepartmentsListPage from '@/pages/departments/DepartmentsListPage';
import DepartmentDetailPage from '@/pages/departments/DepartmentDetailPage';

// Teams
import TeamsListPage from '@/pages/teams/TeamsListPage';
import TeamDetailPage from '@/pages/teams/TeamDetailPage';
import TeamBuilderPage from '@/pages/teams/TeamBuilderPage';

// Zodiac
import ZodiacProfilesPage from '@/pages/zodiac/ZodiacProfilesPage';
import CompatibilityCalculatorPage from '@/pages/zodiac/CompatibilityCalculatorPage';

// Analytics & Reports
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import ReportsPage from '@/pages/analytics/ReportsPage';

// Settings
import SettingsPage from '@/pages/settings/SettingsPage';

// 404
import NotFoundPage from '@/pages/NotFoundPage';

// Protected Route Component
interface ProtectedRouteProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route (redirect to dashboard if authenticated)
// eslint-disable-next-line react-refresh/only-export-components
const PublicRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem('auth_token');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  // Root redirect
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },

  // Auth Routes
  {
    path: '/login',
    element: (
      <PublicRoute>
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      </PublicRoute>
    ),
  },

  // Protected Routes
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      // Dashboard
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },

      // Members
      {
        path: 'members',
        children: [
          { index: true, element: <MembersListPage /> },
          { path: 'add', element: <AddMemberPage /> },
          { path: ':id', element: <MemberDetailPage /> },
          { path: ':id/edit', element: <EditMemberPage /> },
        ],
      },

      // Departments
      {
        path: 'departments',
        children: [
          { index: true, element: <DepartmentsListPage /> },
          { path: ':id', element: <DepartmentDetailPage /> },
        ],
      },

      // Teams
      {
        path: 'teams',
        children: [
          { index: true, element: <TeamsListPage /> },
          { path: 'builder', element: <TeamBuilderPage /> },
          { path: ':id', element: <TeamDetailPage /> },
        ],
      },

      // Zodiac
      {
        path: 'zodiac',
        children: [
          { path: 'profiles', element: <ZodiacProfilesPage /> },
          { path: 'compatibility', element: <CompatibilityCalculatorPage /> },
        ],
      },

      // Analytics
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },

      // Reports
      {
        path: 'reports',
        element: <ReportsPage />,
      },

      // Settings
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },

  // 404 Page
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
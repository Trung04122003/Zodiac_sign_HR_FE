import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-8">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>© 2024 JCI Danang Junior Club. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with <span className="text-red-500">♥</span> by VP Membership & Training 
              <span className="text-sagittarius-500">♐</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
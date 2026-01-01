import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white border-r min-h-screen">
          <div className="p-4">
            <h2 className="text-xl font-bold text-sagittarius-600">Sidebar</h2>
          </div>
        </aside>
        <main className="flex-1">
          <header className="bg-white border-b p-4">
            <h1 className="text-xl font-semibold">Header</h1>
          </header>
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
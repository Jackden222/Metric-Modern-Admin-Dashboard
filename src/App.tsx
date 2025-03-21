import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './components/ui/SideBar';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Chat from './pages/Chat';
import Calendar from './pages/Calendar';
import Task from './pages/Task';
import FileManagement from './pages/FileManagement';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden fixed z-20 top-4 left-4 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-0 flex z-40 lg:hidden ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } transition-opacity ease-linear duration-300`}
        >
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-gray-600 bg-opacity-75 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            } transition-opacity ease-linear duration-300`}
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar component for mobile */}
          <div
            className={`relative flex-1 flex flex-col max-w-xs w-full transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } transition ease-in-out duration-300`}
          >
            <SideBar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex">
          <SideBar />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 flex flex-col">
          <main className="flex-1 relative focus:outline-none">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/task" element={<Task />} />
                <Route path="/files" element={<FileManagement />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

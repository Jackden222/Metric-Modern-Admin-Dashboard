import { Link, useLocation } from 'react-router-dom';
import {
  DashboardIcon,
  InboxIcon,
  ChatIcon,
  CalendarIcon,
  TaskIcon,
  FileIcon,
  BlogIcon,
  LockIcon,
  PagesIcon,
  MapIcon,
  UserIcon
} from './icons/CustomIcons';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  count?: number;
}

interface SideBarProps {
  onClose?: () => void;
}

const mainNavItems: NavItem[] = [
  { icon: DashboardIcon, label: 'Dashboard', path: '/dashboard' },
  { icon: InboxIcon, label: 'Inbox', path: '/inbox', count: 14 },
  { icon: ChatIcon, label: 'Chat', path: '/chat' },
  { icon: CalendarIcon, label: 'Calendar', path: '/calendar' },
  { icon: TaskIcon, label: 'Task', path: '/task' },
];

const appNavItems: NavItem[] = [
  { icon: FileIcon, label: 'File Management', path: '/files' },
  { icon: BlogIcon, label: 'Blog', path: '/blog' },
];

const extraNavItems: NavItem[] = [
  { icon: LockIcon, label: 'Authentication', path: '/auth' },
  { icon: PagesIcon, label: 'Pages', path: '/pages' },
  { icon: MapIcon, label: 'Maps', path: '/maps' },
];

const SideBar = ({ onClose }: SideBarProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || (path === '/dashboard' && location.pathname === '/');
  };

  const handleNavClick = () => {
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-semibold">Metric</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-8">
            {/* Main Navigation */}
            <div>
              <p className="text-xs text-gray-400 mb-4 uppercase">Main</p>
              <ul className="space-y-2">
                {mainNavItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-pink-50 text-pink-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={handleNavClick}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-pink-600' : ''}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.count && (
                        <span className={`text-xs ${isActive(item.path) ? 'text-pink-600' : 'text-gray-400'}`}>
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* App Navigation */}
            <div>
              <p className="text-xs text-gray-400 mb-4 uppercase">App</p>
              <ul className="space-y-2">
                {appNavItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-pink-50 text-pink-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={handleNavClick}
                    >
                      <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-pink-600' : ''}`} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Extra Navigation */}
            <div>
              <p className="text-xs text-gray-400 mb-4 uppercase">Extra</p>
              <ul className="space-y-2">
                {extraNavItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'bg-pink-50 text-pink-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={handleNavClick}
                    >
                      <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'text-pink-600' : ''}`} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <UserIcon className="w-6 h-6 text-gray-600" />
          </div>
          <div className="min-w-0">
            <p className="font-medium truncate">Shakib Ali</p>
            <p className="text-sm text-gray-500 truncate">Web Developer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
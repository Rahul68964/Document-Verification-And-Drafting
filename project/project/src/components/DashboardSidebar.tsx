import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FileText, FileEdit, Bell, ShieldCheck, MoreVertical } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const DashboardSidebar: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'My Documents', path: '/documents' },
    { icon: FileEdit, label: 'Drafting & Templates', path: '/drafting' },
    { icon: ShieldCheck, label: 'Verification Center', path: '/verification' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ];

  return (
    <div 
      className={`h-screen fixed left-0 transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-64'
      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-700`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 p-1 rounded-full transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 shadow-lg hover:scale-110"
      >
        <MoreVertical className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} />
      </button>

      <div className={`p-4 space-y-6 ${isCollapsed ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
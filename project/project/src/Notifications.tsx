import React from 'react';
import { Bell, FileText, CheckCircle, AlertCircle, Clock, Calendar } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { format, subHours, subDays } from 'date-fns';

const Notifications: React.FC = () => {
  const { isDarkMode } = useTheme();

  const notifications = [
    // Document Drafting Notifications
    {
      id: 1,
      type: 'drafting',
      title: 'New Will & Testament Template Available',
      message: 'A new comprehensive Will & Testament template has been added to the drafting section.',
      icon: FileText,
      color: 'text-amber-500',
      timestamp: subHours(new Date(), 2),
      isNew: true
    },
    {
      id: 2,
      type: 'drafting',
      title: 'Updated NDA Form',
      message: 'The Non-Disclosure Agreement template has been updated with new legal clauses.',
      icon: FileText,
      color: 'text-red-500',
      timestamp: subHours(new Date(), 5),
      isNew: true
    },
    {
      id: 3,
      type: 'drafting',
      title: 'Affidavit Template Enhancement',
      message: 'Additional customization options added to the Affidavit template.',
      icon: FileText,
      color: 'text-purple-500',
      timestamp: subDays(new Date(), 1),
      isNew: false
    },
    // Document Verification Notifications
    {
      id: 4,
      type: 'verification',
      title: 'Verification System Update',
      message: 'Document verification system has been enhanced with improved accuracy.',
      icon: CheckCircle,
      color: 'text-green-500',
      timestamp: subHours(new Date(), 1),
      isNew: true
    },
    {
      id: 5,
      type: 'verification',
      title: 'New Document Type Support',
      message: 'Added support for verifying international passport documents.',
      icon: AlertCircle,
      color: 'text-blue-500',
      timestamp: subDays(new Date(), 2),
      isNew: false
    },
    {
      id: 6,
      type: 'verification',
      title: 'Maintenance Notice',
      message: 'Scheduled maintenance for document verification system on next Sunday.',
      icon: Clock,
      color: 'text-orange-500',
      timestamp: subDays(new Date(), 3),
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Bell className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>

        <div className={`rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Filters */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
              <button className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                All
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Drafting
              </button>
              <button className="px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Verification
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  notification.isNew ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className={`${notification.color} p-2 rounded-full bg-opacity-10`}>
                    <notification.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {notification.title}
                        {notification.isNew && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900 rounded-full">
                            New
                          </span>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(notification.timestamp, 'MMM d, h:mm a')}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      {notification.message}
                    </p>
                    <div className="mt-3 flex items-center">
                      <span className={`text-sm ${
                        notification.type === 'drafting'
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30'
                          : 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                      } px-3 py-1 rounded-full`}>
                        {notification.type === 'drafting' ? 'Drafting' : 'Verification'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
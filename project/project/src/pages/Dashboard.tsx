import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Folder, CheckCircle, ListTodo, Upload, FileEdit, Bell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import DashboardSidebar from '../components/DashboardSidebar';

const Dashboard: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const cards = [
    { icon: Folder, title: 'Recent Documents', count: 12 },
    { icon: CheckCircle, title: 'Verification Alerts', count: 3 },
    { icon: ListTodo, title: 'Task List', count: 5 },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <DashboardSidebar />
      
      <div className="transition-all duration-300 p-8" style={{ marginLeft: '16rem' }}>
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/verification')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Document
            </button>
            <button 
              onClick={() => navigate('/drafting')}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              <FileEdit className="w-5 h-5 mr-2" />
              New Draft
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="p-6 rounded-xl transition-all duration-300 transform hover:scale-105 animate-slide-in bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:shadow-xl dark:hover:bg-gray-700"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <card.icon className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold">{card.count}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 rounded-xl animate-fade-in bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="p-4 rounded-lg transition-all duration-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileEdit className="w-5 h-5 text-blue-500" />
                    <span>Document {index + 1} was modified</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
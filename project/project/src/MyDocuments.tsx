import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, Calendar, Download, Eye, Search, Filter } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { format, subDays } from 'date-fns';

const MyDocuments: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'drafted' | 'verified'>('drafted');

  const documents = {
    drafted: [
      {
        id: 1,
        title: 'Last Will & Testament',
        type: 'Will & Testament',
        status: 'Completed',
        createdAt: subDays(new Date(), 1),
        icon: FileText,
        color: 'text-amber-500',
        size: '245 KB'
      },
      {
        id: 2,
        title: 'Company NDA Agreement',
        type: 'NDA Form',
        status: 'In Progress',
        createdAt: subDays(new Date(), 2),
        icon: FileText,
        color: 'text-red-500',
        size: '180 KB'
      },
      {
        id: 3,
        title: 'Property Affidavit',
        type: 'Affidavit',
        status: 'Completed',
        createdAt: subDays(new Date(), 3),
        icon: FileText,
        color: 'text-purple-500',
        size: '156 KB'
      }
    ],
    verified: [
      {
        id: 1,
        title: 'Aadhaar Card',
        type: 'Identity Document',
        status: 'Verified',
        verifiedAt: subDays(new Date(), 1),
        confidence: '98%',
        icon: CheckCircle,
        color: 'text-green-500',
        size: '1.2 MB'
      },
      {
        id: 2,
        title: 'Driving License',
        type: 'Identity Document',
        status: 'Verified',
        verifiedAt: subDays(new Date(), 2),
        confidence: '95%',
        icon: CheckCircle,
        color: 'text-green-500',
        size: '890 KB'
      },
      {
        id: 3,
        title: 'PAN Card',
        type: 'Identity Document',
        status: 'Pending Review',
        verifiedAt: subDays(new Date(), 3),
        confidence: '85%',
        icon: Clock,
        color: 'text-orange-500',
        size: '750 KB'
      }
    ]
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold">My Documents</h1>
          </div>
          
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className={`pl-10 pr-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            <button className="flex items-center px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className={`rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('drafted')}
                className={`py-4 relative ${
                  activeTab === 'drafted'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Drafted Documents
                {activeTab === 'drafted' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('verified')}
                className={`py-4 relative ${
                  activeTab === 'verified'
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Verified Documents
                {activeTab === 'verified' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                )}
              </button>
            </div>
          </div>

          {/* Document List */}
          <div className="p-6">
            <div className="grid gap-4">
              {documents[activeTab].map((doc) => (
                <div
                  key={doc.id}
                  className={`p-4 rounded-lg border ${
                    isDarkMode
                      ? 'border-gray-700 hover:bg-gray-700'
                      : 'border-gray-200 hover:bg-gray-50'
                  } transition-colors duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`${doc.color} p-2 rounded-full bg-opacity-10`}>
                        <doc.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{doc.title}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {doc.type}
                          </span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            doc.status === 'Completed' || doc.status === 'Verified'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : doc.status === 'In Progress' || doc.status === 'Pending Review'
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}>
                            {doc.status}
                          </span>
                          {activeTab === 'verified' && 'confidence' in doc && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Confidence: {doc.confidence}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(
                          activeTab === 'drafted' ? doc.createdAt : (doc as any).verifiedAt,
                          'MMM d, yyyy'
                        )}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {doc.size}
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                          <Eye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
                          <Download className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDocuments;
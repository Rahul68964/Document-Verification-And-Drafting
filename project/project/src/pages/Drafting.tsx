import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Scroll, FileCheck, BookOpen, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Drafting: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const documentTypes = [
    {
      title: 'Bond Paper',
      description: 'Create legally binding bond agreements and contracts',
      icon: FileText,
      path: '/drafting/bond-paper',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Green Paper',
      description: 'Draft environmental and sustainability documents',
      icon: Scroll,
      path: '/drafting/green-paper',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Affidavit',
      description: 'Generate sworn statements and legal declarations',
      icon: FileCheck,
      path: '/drafting/affidavit',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Will & Testament',
      description: 'Create comprehensive will and testament documents',
      icon: BookOpen,
      path: '/drafting/will-testament',
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'NDA Form',
      description: 'Draft non-disclosure agreements and confidentiality forms',
      icon: Shield,
      path: '/drafting/nda-form',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Document Drafting</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select a document type to begin drafting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documentTypes.map((doc) => (
            <button
              key={doc.title}
              onClick={() => navigate(doc.path)}
              className={`group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-2xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${doc.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <doc.icon className={`w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`} />
                
                <h3 className="text-xl font-bold mb-2">{doc.title}</h3>
                
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {doc.description}
                </p>
                
                <div className="mt-6 flex items-center text-sm font-medium text-blue-500">
                  Start Drafting
                  <svg
                    className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drafting;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CreditCard, Vote, FileSearch, FileCheck2 } from 'lucide-react';
import { useTheme } from "./context/ThemeContext";

const Verification: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const verificationTypes = [
    {
      title: 'Eligibility Age',
      description: 'Verify if the person meets the age criteria',
      icon: Calendar,
      path: '/verify-age',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Verify Aadhar',
      description: 'Confirm if the address is valid',
      icon: MapPin,
      path: '/verify-aadhar',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Verify PAN Card',
      description: 'Check if the document is a PAN card',
      icon: CreditCard,
      path: '/verify-pan',
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Verify Voter ID',
      description: 'Ensure if the document is a Voter ID',
      icon: Vote,
      path: '/verify-voting',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Identify Document Type With Detailed Description',
      description: 'Determine the kind of document provided',
      icon: FileSearch,
      path: '/verification/random',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Verify E-Signature',
      description: 'Check if the document is already e-signed',
      icon: FileCheck2,
      path: '/verify-esign',
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Document Verification</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Select a verification type to proceed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {verificationTypes.map((verify) => (
            <button
              key={verify.title}
              onClick={() => navigate(verify.path)}
              className={`group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-2xl`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${verify.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <h3 className="text-xl font-bold mb-2">{verify.title}</h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {verify.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-blue-500">
                Start Verification
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Verification;
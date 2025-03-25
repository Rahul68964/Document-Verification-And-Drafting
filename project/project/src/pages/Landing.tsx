import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, Zap, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Landing: React.FC = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: FileText,
      title: 'Smart Document Creation',
      description: 'Create professional legal documents with AI-powered assistance and templates.'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Bank-level security with automatic compliance checks and updates.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate complex legal documents in minutes, not hours.'
    },
    {
      icon: CheckCircle,
      title: 'Automated Verification',
      description: 'AI-powered verification ensures accuracy and compliance.'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-20">
            <div className="text-center animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                Legal Document Drafting
                <br />
                Powered by AI
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-500 dark:text-gray-300">
                Create, manage, and verify legal documents with artificial intelligence
              </p>
              <div className="flex justify-center space-x-6">
                <Link
                  to="/login"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Legal AI?</h2>
            <p className="text-xl text-gray-500 dark:text-gray-300">Advanced features to streamline your legal document workflow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 rounded-xl transform hover:scale-105 transition-all duration-300 animate-slide-in ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:shadow-xl'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`rounded-2xl p-12 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Legal Workflow?</h2>
            <p className="text-xl mb-8 text-gray-500 dark:text-gray-300">
              Join thousands of legal professionals using Legal AI
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
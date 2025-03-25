import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Shield, Award, Users, Globe } from 'lucide-react';

const About: React.FC = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    { icon: Users, value: '10,000+', label: 'Legal Professionals' },
    { icon: Shield, value: '99.9%', label: 'Security Rating' },
    { icon: Award, value: '50+', label: 'Industry Awards' },
    { icon: Globe, value: '20+', label: 'Countries Served' }
  ];

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Legal AI</h1>
          <p className="text-xl text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
            Transforming legal document management through artificial intelligence and automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="animate-slide-in">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              At Legal AI, we're committed to revolutionizing the legal industry by providing cutting-edge AI-powered solutions that streamline document creation, management, and verification processes.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our platform combines advanced machine learning algorithms with decades of legal expertise to deliver accurate, efficient, and compliant document handling solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`p-6 rounded-xl animate-slide-in ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-blue-500 mb-4" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Continuously pushing boundaries in legal tech'
              },
              {
                title: 'Security',
                description: 'Uncompromising protection of sensitive legal data'
              },
              {
                title: 'Excellence',
                description: 'Delivering superior solutions for legal professionals'
              }
            ].map((value, index) => (
              <div
                key={value.title}
                className={`p-6 rounded-xl animate-slide-in ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
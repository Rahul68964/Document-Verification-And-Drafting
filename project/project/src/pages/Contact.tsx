import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen pt-16 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
            Get in touch with our team for any questions about our services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="animate-slide-in">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="text-gray-500 dark:text-gray-300">support@legalai.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p className="text-gray-500 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">Location</h3>
                  <p className="text-gray-500 dark:text-gray-300">123 Legal Street, Tech City, TC 12345</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-in">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 focus:bg-gray-700'
                    : 'bg-gray-50 focus:bg-white'
                } border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 focus:bg-gray-700'
                    : 'bg-gray-50 focus:bg-white'
                } border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 focus:bg-gray-700'
                    : 'bg-gray-50 focus:bg-white'
                } border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 focus:bg-gray-700'
                    : 'bg-gray-50 focus:bg-white'
                } border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
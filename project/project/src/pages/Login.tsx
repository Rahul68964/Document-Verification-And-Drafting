import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Store token in localStorage
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'
    }`}>
      <div className={`w-full max-w-md p-8 rounded-2xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white shadow-xl'
      }`}>
        <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-700 focus:bg-gray-600' : 'bg-gray-50 focus:bg-white'
                } border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter username"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-700 focus:bg-gray-600' : 'bg-gray-50 focus:bg-white'
                } border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
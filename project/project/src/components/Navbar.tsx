import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, FileEdit } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isDashboard = location.pathname === '/dashboard';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAuthPage) return null;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isDashboard || isDarkMode
          ? 'bg-gray-900 text-white shadow-lg'
          : 'bg-transparent text-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <FileEdit className="w-8 h-8" />
              <span className="text-xl font-bold">Legal AI</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isDashboard && (
              <>
                <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
                <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!isDashboard && (
                <>
                  <Link
                    to="/about"
                    className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
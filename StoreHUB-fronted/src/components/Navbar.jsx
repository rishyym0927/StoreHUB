import React, { useState, useEffect } from "react";
import { Home, Flame, Book, Users, UserCircle2, Menu, X, Sun, Moon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check if the path matches the current route
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !darkMode);
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Close menu when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    user && (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-black/10'} border-b shadow-sm`}>
        <div className="container mx-auto navbar-container">
          <div className="flex justify-between items-center p-4">
            {/* Logo Area */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              <Link to="/" className="flex items-center space-x-2">
                <div className={`w-8 h-8 bg-gradient-to-br ${darkMode ? 'from-indigo-600 to-purple-700' : 'from-indigo-500 to-purple-600'} rounded-lg flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                  StoreHUB
                </h1>
              </Link>
              <button
                className={`lg:hidden block ${darkMode ? 'text-white/70' : 'text-black/70'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/">
                <NavItem 
                  icon={<Home size={20} />} 
                  label="Explore" 
                  isActive={isActive('/')} 
                  darkMode={darkMode} 
                />
              </Link>
              <Link to="/trending">
                <NavItem 
                  icon={<Flame size={20} />} 
                  label="Trending" 
                  isActive={isActive('/trending')} 
                  darkMode={darkMode} 
                />
              </Link>
              <Link to="/sandbox">
                <NavItem 
                  icon={<Book size={20} />} 
                  label="Sandbox" 
                  isActive={isActive('/sandbox')} 
                  darkMode={darkMode} 
                />
              </Link>
              <Link to="/discussion">
                <NavItem 
                  icon={<Users size={20} />} 
                  label="Discussion" 
                  isActive={isActive('/discussion')} 
                  darkMode={darkMode} 
                />
              </Link>
            </div>

            {/* Right side - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode} 
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <Link to="/create">
                <button className={`px-4 py-2 rounded-lg flex items-center space-x-1 font-medium transition-colors ${
                  darkMode 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}>
                  <span>Create</span>
                </button>
              </Link>
              
              <Link to="/profile">
                <div className={`flex items-center space-x-2 ${darkMode ? 'text-white' : 'text-black'} hover:opacity-80 transition-opacity`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <UserCircle2 className={darkMode ? 'text-white/80' : 'text-black/70'} size={28} />
                  </div>
                  <span className="font-medium">
                    {user.user?.username || "John"}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`lg:hidden ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-black/10'} border-t`}>
              <div className="p-4 flex items-center justify-between">
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Menu</span>
                <button 
                  onClick={toggleDarkMode} 
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-100 text-gray-700'} transition-colors`}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              
              <Link
                to="/"
                className={`p-4 flex items-center ${darkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'} ${isActive('/') ? (darkMode ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <NavItem icon={<Home size={20} />} label="Explore" isActive={isActive('/')} darkMode={darkMode} />
              </Link>
              
              <Link
                to="/trending"
                className={`p-4 flex items-center ${darkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'} ${isActive('/trending') ? (darkMode ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <NavItem icon={<Flame size={20} />} label="Trending" isActive={isActive('/trending')} darkMode={darkMode} />
              </Link>
              
              <Link
                to="/sandbox"
                className={`p-4 flex items-center ${darkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'} ${isActive('/sandbox') ? (darkMode ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <NavItem icon={<Book size={20} />} label="Sandbox" isActive={isActive('/sandbox')} darkMode={darkMode} />
              </Link>
              
              <Link
                to="/discussion"
                className={`p-4 flex items-center ${darkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'} ${isActive('/discussion') ? (darkMode ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <NavItem icon={<Users size={20} />} label="Discussion" isActive={isActive('/discussion')} darkMode={darkMode} />
              </Link>
              
              <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                <Link
                  to="/create"
                  className={`p-4 flex items-center ${darkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`mr-2 px-3 py-1 rounded ${darkMode ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'}`}>
                    Create
                  </div>
                </Link>
                
                <Link
                  to="/profile"
                  className={`p-4 flex items-center space-x-2 ${darkMode ? 'text-white hover:bg-gray-800' : 'text-black hover:bg-gray-100'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <UserCircle2 className={darkMode ? 'text-white/80' : 'text-black/70'} size={24} />
                  </div>
                  <span>{user.user?.username || "John"}</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    )
  );
};

const NavItem = ({ icon, label, isActive, darkMode }) => (
  <div className={`flex items-center space-x-2 ${
    isActive 
      ? (darkMode ? 'text-purple-400 font-medium' : 'text-indigo-600 font-medium') 
      : (darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black')
    } transition-colors cursor-pointer relative`}
  >
    <span className="relative">
      {icon}
      {isActive && (
        <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${
          darkMode ? 'bg-purple-400' : 'bg-indigo-600'
        }`}></span>
      )}
    </span>
    <span className="relative">
      {label}
      {isActive && (
        <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${
          darkMode ? 'bg-purple-400' : 'bg-indigo-600'
        }`}></span>
      )}
    </span>
  </div>
);

export default Navbar;
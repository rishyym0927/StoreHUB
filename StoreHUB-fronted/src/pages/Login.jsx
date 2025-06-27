import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

   
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Enter a valid email address';
      isValid = false;
    }

  
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid Credentials, Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Glass card container */}
        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
              <User className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 mb-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-4 pl-12 bg-gray-800/50 border ${
                  formErrors.email ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 input-focus text-white placeholder-gray-400 transition-all duration-300`}
                required
              />
              <User
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  formErrors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-400'
                }`}
                size={20}
              />
              {formErrors.email && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {formErrors.email}
                </p>
              )}
            </div>

            <div className="relative group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-4 pl-12 bg-gray-800/50 border ${
                  formErrors.password ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-gray-800/70 input-focus text-white placeholder-gray-400 transition-all duration-300`}
                required
              />
              <Lock
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  formErrors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-blue-400'
                }`}
                size={20}
              />
              {formErrors.password && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot"
                className="text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
                >
                  Create Account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

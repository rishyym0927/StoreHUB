import React, { useState } from 'react'; 
import { Lock, User, Mail, KeyRound, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Required field validations
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.username.trim()) errors.username = 'Username is required';
    else if (formData.username.length < 3) errors.username = 'Username must be at least 3 characters long';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) errors.email = 'Enter a valid email address';

    // Password validations
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters long';

    if (!formData.confirmPassword) errors.confirmPassword = 'Confirm your password';
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setErrorMessage('');
    setIsLoading(true);

    const requestBody = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await apiClient.post('/signup', requestBody);

      if (response.status === 200) {
        console.log('User created successfully');
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error || 'An error occurred. Please try again.');
      } else {
        setErrorMessage('Network error. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Glass card container */}
        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mb-4">
              <UserPlus className="text-white" size={24} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join Us Today</h1>
            <p className="text-gray-400">Create your account to get started</p>
          </div>

          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 mb-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                {errorMessage}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div className="relative group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full p-4 pl-12 bg-gray-800/50 border ${
                  formErrors.firstName ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/70 input-focus text-white placeholder-gray-400 transition-all duration-300`}
              />
              <UserPlus
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  formErrors.firstName ? 'text-red-400' : 'text-gray-400 group-focus-within:text-purple-400'
                }`}
                size={20}
              />
              {formErrors.firstName && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {formErrors.firstName}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="relative group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full p-4 pl-12 bg-gray-800/50 border ${
                  formErrors.lastName ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/70 input-focus text-white placeholder-gray-400 transition-all duration-300`}
              />
              <User
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  formErrors.lastName ? 'text-red-400' : 'text-gray-400 group-focus-within:text-purple-400'
                }`}
                size={20}
              />
              {formErrors.lastName && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {formErrors.lastName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-4 pl-12 bg-gray-800/50 border ${
                  formErrors.email ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/70 input-focus text-white placeholder-gray-400 transition-all duration-300`}
              />
              <Mail
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  formErrors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-purple-400'
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

            {/* Username */}
            <div className="relative group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full p-4 pl-12 bg-gray-800/50 border ${
                  formErrors.username ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/70 input-focus text-white placeholder-gray-400 transition-all duration-300`}
              />
              <User
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  formErrors.username ? 'text-red-400' : 'text-gray-400 group-focus-within:text-purple-400'
                }`}
                size={20}
              />
              {formErrors.username && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {formErrors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-4 pl-12 bg-gray-800/50 border ${
                  formErrors.password ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/70 input-focus text-white placeholder-gray-400 transition-all duration-300`}
              />
              <Lock
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  formErrors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-purple-400'
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

            {/* Confirm Password */}
            <div className="relative group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full p-4 pl-12 bg-gray-800/50 border ${
                  formErrors.confirmPassword ? 'border-red-500/50' : 'border-gray-700/50'
                } rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-gray-800/70 input-focus text-white placeholder-gray-400 transition-all duration-300`}
              />
              <KeyRound
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                  formErrors.confirmPassword ? 'text-red-400' : 'text-gray-400 group-focus-within:text-purple-400'
                }`}
                size={20}
              />
              {formErrors.confirmPassword && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white p-4 rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

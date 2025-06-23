import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Mail, Phone, CheckCircle } from 'lucide-react';

const AuthApp = () => {
  const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'register'

  const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => setIsLoading(false), 1500);
    };

    return (
      <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Left Side */}
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center px-8 md:px-16 lg:px-20 bg-white">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome back</h1>
              <p className="text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Username *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500 bg-white">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ยังไม่มีบัญชีผู้ใช้ใช่หรือไม่?{' '}
                <button 
                  onClick={() => setCurrentPage('register')}
                  className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200 underline"
                >
                  ลงทะเบียน
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-green-400 via-green-500 to-green-600 items-center justify-center p-12">
          <div className="text-center text-white">
            <div className="w-32 h-32 mx-auto mb-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <img
                src="/api/placeholder/80/80"
                alt="Logo"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome to Test</h2>
            <p className="text-xl text-green-100 mb-8 max-w-md">
              Join thousands of users who trust our platform for their daily needs
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RegistrationPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate registration process
      setTimeout(() => {
        setIsLoading(false);
        // After successful registration, redirect to login
        setCurrentPage('login');
      }, 2000);
    };

    const isPasswordMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';
    const isFormValid = formData.firstName && formData.lastName && formData.email && 
                       formData.username && formData.password && formData.confirmPassword && 
                       isPasswordMatch && formData.agreeToTerms;

    return (
      <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Left Side */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center px-8 md:px-16 lg:px-20 bg-white">
          <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Create your account</h1>
              <p className="text-gray-600">
                Join us today and start your journey with Test
              </p>
            </div>

            {/* Registration Form */}
            <div className="space-y-6">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Username *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Password Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create password"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 ${
                        formData.confirmPassword && !isPasswordMatch 
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    {isPasswordMatch && formData.confirmPassword && (
                      <div className="absolute inset-y-0 right-10 flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  {formData.confirmPassword && !isPasswordMatch && (
                    <p className="text-sm text-red-600">Passwords do not match</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500 bg-white">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                มีบัญชีผู้ใช้แล้วใช่หรือไม่?{' '}
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200 underline"
                >
                  เข้าสู่ระบบ
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 items-center justify-center p-12">
          <div className="text-center text-white">
            <div className="w-32 h-32 mx-auto mb-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <img
                src="/api/placeholder/80/80"
                alt="Logo"
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-md">
              Become part of our growing community and unlock amazing features
            </p>
            <div className="space-y-4 text-left max-w-sm mx-auto">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-200 mr-3" />
                <span className="text-blue-100">Access to premium features</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-200 mr-3" />
                <span className="text-blue-100">24/7 customer support</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-200 mr-3" />
                <span className="text-blue-100">Regular updates and improvements</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentPage === 'login' ? <LoginPage /> : <RegistrationPage />}
    </div>
  );
};

export default AuthApp;
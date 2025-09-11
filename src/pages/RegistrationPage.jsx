import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, Mail, Phone } from "lucide-react";
import nn4 from "../assets/kt.png";

const RegistrationPage = ({ onBack }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  // ── Phone: optional แต่ถ้ากรอก ต้องเป็น "ตัวเลข 10 หลัก" ──
  const digitsOnly = (s) => s.replace(/\D/g, "");
  const phoneDigits = digitsOnly(formData.phone);
  const phoneOk = !formData.phone.trim() || phoneDigits.length === 10;

  const emailOk = emailRegex.test(formData.email.trim());
  const usernameOk = formData.username.trim().length >= 3;
  const passwordOk = formData.password.length >= 6;

  const isFormValid = usernameOk && emailOk && phoneOk && passwordOk;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);

    // const payload = { ...formData, phone: phoneDigits || null };

    setTimeout(() => {
      setIsLoading(false);
      onBack?.();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center px-8 md:px-16 lg:px-20 bg-white">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Create your account</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Username *</label>
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors duration-200 ${
                    formData.username && !usernameOk
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  }`}
                />
              </div>
              {formData.username && !usernameOk && (
                <p className="text-sm text-red-600">Username ต้องมีอย่างน้อย 3 ตัวอักษร</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address *</label>
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors duration-200 ${
                    formData.email && !emailOk
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  }`}
                />
              </div>
              {formData.email && !emailOk && (
                <p className="text-sm text-red-600">กรุณากรอกอีเมลให้ถูกต้อง เช่น name@example.com</p>
              )}
            </div>

            {/* Phone (Optional, 10 digits if provided) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  inputMode="numeric"
                  autoComplete="tel"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors duration-200 ${
                    formData.phone && !phoneOk
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  }`}
                />
              </div>
              {formData.phone && !phoneOk && (
                <p className="text-sm text-red-600">กรอกเบอร์โทรให้เป็นตัวเลข 10 หลัก (เช่น 0812345678)</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 transition-colors duration-200 ${
                    formData.password && !passwordOk
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-green-500 focus:border-green-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" /> : <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />}
                </button>
              </div>
              {formData.password && !passwordOk && (
                <p className="text-sm text-red-600">รหัสผ่านอย่างน้อย 6 ตัวอักษร</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider + Back */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 bg-white">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              มีบัญชีผู้ใช้แล้วใช่หรือไม่?{" "}
              <button onClick={onBack} className="font-medium text-green-600 hover:text-green-700 transition-colors duration-200 underline">
                เข้าสู่ระบบ
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="hidden lg:flex lg:w-2/5 relative items-center justify-center p-12">
        <img src={nn4} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 " />
        {/* <div className="relative z-10 text-center text-white">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <img src={nn4} alt="Logo" className="w-20 h-20 rounded-full object-cover" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Dearing Wedding Studio </h2>
        </div> */}
      </div>
    </div>
  );
};

export default RegistrationPage;

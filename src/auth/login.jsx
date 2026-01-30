import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Activity, Heart, Stethoscope, Pill, Syringe, TestTube, Shield, Phone, MapPin } from 'lucide-react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    setIsLoading(true);

    setTimeout(() => {
      console.log('Logging in with:', { email, password });
      setIsLoading(false);
      onLogin();
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-[linear-gradient(135deg,var(--color-brand-light)_0%,var(--color-brand-mint)_100%)] items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto min-h-[600px]">
        {/* Left Side - Healthcare Visual with Floating Elements */}
        <div className="hidden lg:flex lg:w-[55%] relative bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] items-center justify-center overflow-hidden p-2">
          {/* Decorative Circles Background */}
          <div className="absolute inset-0">
            <div className="absolute top-[15%] left-[10%] w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-[20%] right-[15%] w-96 h-96 bg-[var(--color-brand-secondary)]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-[50%] left-[50%] w-64 h-64 bg-[var(--color-brand-light)]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Floating Medical Icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Pill 1 */}
            <div className="absolute top-[15%] left-[8%] animate-float-1">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl rotate-45 shadow-lg flex items-center justify-center transform -rotate-45 border border-white/20">
                <Pill className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Heart */}
            <div className="absolute top-[25%] right-[12%] animate-float-2">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-white/20">
                <Heart className="w-10 h-10 text-white fill-white animate-pulse" />
              </div>
            </div>

            {/* Stethoscope */}
            <div className="absolute bottom-[30%] left-[15%] animate-float-3">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center border border-white/20">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Syringe */}
            <div className="absolute top-[60%] right-[8%] animate-float-1" style={{ animationDelay: '0.5s' }}>
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-white/20">
                <Syringe className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Test Tube */}
            <div className="absolute bottom-[15%] right-[25%] animate-float-2" style={{ animationDelay: '1s' }}>
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl rotate-12 shadow-lg flex items-center justify-center border border-white/20">
                <TestTube className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Activity Monitor */}
            <div className="absolute top-[45%] left-[5%] animate-float-3" style={{ animationDelay: '1.5s' }}>
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-white/20">
                <Activity className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center">
            {/* Logo and Brand */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl mb-6 border border-white/30 shadow-2xl">
                <Activity className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-5xl font-black text-white mb-3 tracking-tight drop-shadow-lg">
                HealthCRM
              </h1>
              <p className="text-xl text-white/90 font-medium">
                Complete Healthcare Management System
              </p>
            </div>

            {/* Doctor/Nurse Image Placeholder */}
            <div className="relative mb-8">
              <div className="w-80 h-80 mx-auto bg-white/10 backdrop-blur-xl rounded-full border-8 border-white/30 shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Medical Professional Illustration */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-md rounded-full mb-4 flex items-center justify-center border-4 border-white/40 shadow-inner">
                      <Stethoscope className="w-16 h-16 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="text-white text-lg font-bold mb-2">Healthcare Professionals</div>
                    <div className="text-white/80 text-sm">Trusted by 500+ Doctors</div>
                  </div>
                </div>
              </div>

              {/* Decorative rings around image */}
              <div className="absolute inset-0 w-80 h-80 mx-auto">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-ping-slow"></div>
                <div className="absolute inset-0 border-4 border-white/10 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {/* Features */}
            <div className="flex items-center justify-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Secure & Compliant</span>
              </div>
              <div className="w-px h-6 bg-white/30"></div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span className="font-semibold">Patient Care First</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 text-white/70 text-xs">
              © 2024 HealthCRM Labs. All rights reserved.
            </div>
          </div>
        </div>

        {/* Right Side - Login Form with Glassmorphism */}
        <div className="flex w-full lg:w-[45%] items-center justify-center p-2 relative bg-white/70 backdrop-blur-2xl">
          {/* Background Decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-brand-primary)]/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-brand-secondary)]/10 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="w-full max-w-md relative z-10 px-6">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-2xl mb-4 shadow-xl">
                <Activity className="w-9 h-9 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] bg-clip-text text-transparent">
                HealthCRM
              </h1>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-500">Please enter your details to sign in.</p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-shake">
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <span className="text-sm font-semibold">{error}</span>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="demo@email.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-primary)]/20 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-primary)]/20 outline-none transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[var(--color-brand-primary)] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[var(--color-brand-primary)] border-gray-300 rounded focus:ring-[var(--color-brand-primary)] cursor-pointer"
                  />
                  <span className="text-gray-600 font-medium group-hover:text-[var(--color-brand-primary)] transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-[var(--color-brand-primary)] hover:text-[var(--color-brand-secondary)] font-semibold transition-colors">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Signing In...</span>
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Footer Link */}
              <div className="text-center pt-2">
                <span className="text-gray-500 text-sm">Don't have an account? </span>
                <a href="#" className="text-[var(--color-brand-primary)] hover:text-[var(--color-brand-secondary)] font-semibold text-sm transition-colors">
                  Contact Admin
                </a>
              </div>
            </form>

            {/* Social Icons & Contact Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              {/* Social Icons */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[var(--color-brand-primary)] hover:text-white transition-all shadow-sm hover:shadow-md text-gray-500 border border-gray-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[var(--color-brand-secondary)] hover:text-white transition-all shadow-sm hover:shadow-md text-gray-500 border border-gray-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[var(--color-brand-primary)] hover:text-white transition-all shadow-sm hover:shadow-md text-gray-500 border border-gray-100">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>

              {/* Contact Info */}
              <div className="flex items-center justify-center gap-6 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+91-9999-XXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">info@healthcrm.in</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Animations */}
        <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-5deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(10px); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
      </div>
    </div>
  );
}

export default Login;
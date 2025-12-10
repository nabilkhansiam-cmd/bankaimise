import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = () => {
    // In a real app, validation and API calls would go here
    onLogin();
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-start pt-12 bg-white animate-fade-in">
      <h1 className="text-5xl font-bold text-cyan-400 mb-8 tracking-tight">Please Login</h1>
      
      <div className="w-full max-w-md bg-white p-6">
        {/* Google Button */}
        <button 
          onClick={handleLoginSubmit}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-cyan-300 rounded-md bg-cyan-50/50 text-cyan-600 font-medium hover:bg-cyan-100 transition-colors mb-8 group"
        >
           <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full p-0.5">
             <img src="https://www.google.com/favicon.ico" alt="G" className="w-full h-full opacity-70 group-hover:opacity-100" />
           </div>
           Continue with Google
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-[42%] border-t-2 border-cyan-400"></div>
            <div className="w-[16%]"></div>
            <div className="w-[42%] border-t-2 border-cyan-400"></div>
          </div>
          <span className="relative z-10 px-2 text-cyan-500 font-medium uppercase text-sm">OR</span>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-cyan-500 font-medium ml-1">Email</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email address"
              className="w-full px-4 py-3 bg-cyan-50/30 border border-cyan-200 rounded-md text-gray-700 placeholder-cyan-300/70 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-cyan-500 font-medium ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-cyan-50/30 border border-cyan-200 rounded-md text-gray-700 placeholder-cyan-300/70 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all pr-12"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-cyan-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <button className="text-sm text-cyan-500 hover:underline">Forgot password?</button>
            </div>
          </div>

          <div className="pt-2">
             <button className="text-cyan-500 text-sm hover:underline">New here? Sign up!</button>
          </div>

          <button 
            onClick={handleLoginSubmit}
            className="w-full py-3 mt-4 bg-cyan-50 border border-cyan-300 text-cyan-500 font-bold rounded-md hover:bg-cyan-100 hover:border-cyan-400 transition-all shadow-sm"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
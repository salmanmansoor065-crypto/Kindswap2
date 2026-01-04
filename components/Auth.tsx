
import React, { useState } from 'react';
import Logo from './Logo';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-50 bg-stone-50 flex flex-col overflow-y-auto">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-emerald-500 rounded-b-[60px] -z-10 shadow-lg" />
      
      <div className="flex-1 flex flex-col px-8 py-12 items-center">
        <div className="bg-white p-4 rounded-[32px] shadow-xl mb-10 mt-4">
          <Logo size="lg" />
        </div>

        <div className="w-full max-w-sm bg-white rounded-[40px] shadow-2xl p-8 border border-stone-100 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-stone-800 mb-2">
              {isLogin ? 'Welcome!' : 'Join KindSwap'}
            </h2>
            <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">
              {isLogin ? 'Sign in to your account' : 'Start sharing in Lahore'}
            </p>
          </div>

          <div className="space-y-5 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">Email Address</label>
              <input 
                type="email" 
                placeholder="e.g. hassan.butt@gmail.com"
                className="w-full bg-stone-50 border-stone-100 border-2 rounded-2xl p-4 text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-stone-300"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-stone-400 uppercase ml-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-stone-50 border-stone-100 border-2 rounded-2xl p-4 text-sm text-stone-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-stone-300"
              />
            </div>
          </div>

          <button 
            onClick={onLogin}
            className="w-full bg-stone-900 text-white font-bold py-5 rounded-[24px] shadow-lg hover:bg-stone-800 transition-all active:scale-95 mb-6"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-stone-100" />
            <span className="text-[10px] font-bold text-stone-300 uppercase">Secure Login</span>
            <div className="flex-1 h-[1px] bg-stone-100" />
          </div>

          <button 
            onClick={onLogin}
            className="w-full bg-white border-2 border-stone-100 text-stone-600 font-bold py-4 rounded-[24px] flex items-center justify-center gap-3 hover:bg-stone-50 transition-all active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </div>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm font-bold text-stone-500 hover:text-emerald-600 transition-colors"
        >
          {isLogin ? "New to KindSwap? Sign Up" : "Already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Auth;

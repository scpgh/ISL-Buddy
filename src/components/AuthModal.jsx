import React, { useState } from 'react';
import { X, Mail, Lock, User, LogIn, Sparkles, AlertCircle } from 'lucide-react';
import { firebaseAuthService } from '../utils/firebase';
import { soundEngine } from '../utils/audio';

export default function AuthModal({ onClose, onSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    setLoading(true);
    soundEngine.playCorrectSound();

    try {
      let user;
      if (isSignUp) {
        if (!name.trim()) {
          setErrorMessage('Please enter your full name.');
          setLoading(false);
          return;
        }
        user = await firebaseAuthService.signUpWithEmail(name.trim(), email.trim(), password.trim());
      } else {
        user = await firebaseAuthService.loginWithEmail(email.trim(), password.trim());
      }
      setLoading(false);
      onSuccess(user);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setLoading(true);
    soundEngine.playVictoryMelody();
    try {
      const user = await firebaseAuthService.signInWithGoogle();
      setLoading(false);
      onSuccess(user);
    } catch (err) {
      setLoading(false);
      setErrorMessage('Google Sign-In failed. Please try email sign in.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 min-h-screen overflow-y-auto">
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] p-6 sm:p-8 max-w-md w-full shadow-2xl animate-pop-in my-auto relative">

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#58cc02]/20 border-2 border-[#58cc02] flex items-center justify-center mx-auto mb-3 shadow-md">
            <img src="/logo.png" alt="SmartSign ISL" className="w-10 h-10 object-contain" />
          </div>

          <h2 className="font-black text-2xl sm:text-3xl text-[#4b4b4b] dark:text-white tracking-tight">
            {isSignUp ? 'Join SmartSign ISL' : 'Welcome Back'}
          </h2>
          <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d] mt-1">
            {isSignUp ? 'Sign up to track your isolated ISL progress & ranks' : 'Sign in to access your ISL learning account'}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 bg-[#ff4b4b]/15 border border-[#ff4b4b]/40 text-[#ff4b4b] p-3 rounded-2xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Google Authentication Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white dark:bg-[#131f24] hover:bg-[#f7f7f7] border-2 border-[#e5e5e5] dark:border-[#37464f] text-[#4b4b4b] dark:text-white py-3.5 px-4 rounded-[18px] font-black text-sm flex items-center justify-center gap-3 shadow-sm mb-4 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 border-t border-[#e5e5e5] dark:border-[#37464f]"></div>
          <span className="text-[11px] font-black text-[#afafaf] uppercase">Or Email</span>
          <div className="flex-1 border-t border-[#e5e5e5] dark:border-[#37464f]"></div>
        </div>

        {/* Email & Password Auth Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3 mb-4">
          {isSignUp && (
            <div className="relative">
              <User className="w-5 h-5 text-[#afafaf] absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[16px] py-3 pl-11 pr-4 font-bold text-sm text-[#4b4b4b] dark:text-white focus:border-[#58cc02] outline-none"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="w-5 h-5 text-[#afafaf] absolute left-3.5 top-3.5" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[16px] py-3 pl-11 pr-4 font-bold text-sm text-[#4b4b4b] dark:text-white focus:border-[#58cc02] outline-none"
              required
            />
          </div>

          <div className="relative">
            <Lock className="w-5 h-5 text-[#afafaf] absolute left-3.5 top-3.5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[16px] py-3 pl-11 pr-4 font-bold text-sm text-[#4b4b4b] dark:text-white focus:border-[#58cc02] outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full duo-btn duo-btn-green py-3.5 rounded-[18px] font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer uppercase tracking-wider"
          >
            <LogIn className="w-4 h-4" />
            {loading ? 'Authenticating...' : isSignUp ? 'Create Account & Enter' : 'Sign In & Enter'}
          </button>
        </form>

        <div className="text-center text-xs font-bold pt-2 border-t border-[#e5e5e5] dark:border-[#37464f]">
          <button
            type="button"
            onClick={() => {
              setErrorMessage('');
              setIsSignUp(!isSignUp);
            }}
            className="text-[#1cb0f6] hover:underline cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>

      </div>
    </div>
  );
}

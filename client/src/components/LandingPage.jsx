import React, { useState } from 'react';
import { Sparkles, Map, Bot, ShieldAlert, Trophy, ArrowRight, CheckCircle2, Flame, Mail, Heart, Sun, Moon } from 'lucide-react';

export default function LandingPage({ onOpenAuth, onOpenContact }) {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen flex flex-col font-sans antialiased selection:bg-[#58cc02]/30 transition-colors duration-300 ${
      isDark ? 'bg-[#131f24] text-white' : 'bg-[#f7f7f7] text-[#4b4b4b]'
    }`}>
      
      {/* Top Floating Mobile-Optimized Navigation Bar */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b-2 px-3 sm:px-8 py-3 transition-colors ${
        isDark ? 'bg-[#18252b]/95 border-[#37464f]' : 'bg-white/95 border-[#e5e5e5]'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2 shrink-0">
            <img 
              src="/logo.png" 
              alt="ISL Buddy" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md"
            />
            <span className="font-black text-lg sm:text-2xl tracking-tight text-[#58cc02] leading-none">
              ISL Buddy
            </span>
          </div>

          {/* Clean Mobile-Optimized Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center ${
                isDark 
                  ? 'bg-[#18252b] border-[#37464f] text-[#ffc800] hover:bg-[#202f36]' 
                  : 'bg-white border-[#e5e5e5] text-[#ff9600] hover:bg-[#f7f7f7]'
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-[#4b4b4b]" />}
            </button>

            {/* Desktop Contact Link */}
            <button
              onClick={onOpenContact}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer uppercase tracking-wider ${
                isDark
                  ? 'text-[#1cb0f6] hover:bg-[#1cb0f6]/10 border-[#1cb0f6]/30'
                  : 'text-[#1cb0f6] hover:bg-[#1cb0f6]/10 border-[#1cb0f6]/40'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>

            {/* Sign In Button (Hidden on Mobile view) */}
            <button
              onClick={onOpenAuth}
              className={`hidden sm:inline-block px-4 py-2 rounded-2xl text-xs font-black border-2 transition-all cursor-pointer uppercase tracking-wider ${
                isDark
                  ? 'text-[#afafaf] hover:text-white border-[#37464f] hover:border-[#58cc02]'
                  : 'text-[#4b4b4b] hover:text-black border-[#e5e5e5] hover:border-[#58cc02]'
              }`}
            >
              Sign In
            </button>

            {/* Get Started Button */}
            <button
              onClick={onOpenAuth}
              className="duo-btn duo-btn-green py-2 px-3.5 sm:px-5 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Get Started</span> <ArrowRight className="w-3.5 h-3.5" />
            </button>

          </div>

        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 flex flex-col items-center text-center space-y-10">

        {/* Big Bold Headline */}
        <div className="max-w-4xl space-y-4 pt-2">
          <h1 className={`font-black text-3xl sm:text-6xl lg:text-7xl tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-[#4b4b4b]'
          }`}>
            Master Indian Sign Language <br />
            <span className="text-[#58cc02]">Free, Fun & Gamified</span>
          </h1>
          <p className={`text-sm sm:text-xl font-bold max-w-2xl mx-auto leading-relaxed pt-1 ${
            isDark ? 'text-[#afafaf]' : 'text-[#777777]'
          }`}>
            Learn interactive ISLRTC video modules, chat with your AI Tutor, track LeetCode-style daily streaks, and compete on the national leaderboard!
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-md justify-center">
          <button
            onClick={onOpenAuth}
            className="w-full sm:w-auto duo-btn duo-btn-green py-3.5 sm:py-4 px-6 sm:px-8 rounded-[22px] sm:rounded-[24px] font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl cursor-pointer"
          >
            <span>GET STARTED FOR FREE</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>

          <button
            onClick={onOpenAuth}
            className={`w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8 rounded-[22px] sm:rounded-[24px] border-2 font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
              isDark 
                ? 'bg-[#18252b] hover:bg-[#202f36] border-[#37464f] text-white' 
                : 'bg-white hover:bg-[#f7f7f7] border-[#e5e5e5] text-[#4b4b4b]'
            }`}
          >
            <span>I ALREADY HAVE AN ACCOUNT</span>
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-4xl pt-4 sm:pt-8">
          
          <div className={`border-2 rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 text-center shadow-sm ${
            isDark ? 'bg-[#18252b] border-[#37464f]' : 'bg-white border-[#e5e5e5]'
          }`}>
            <div className="text-2xl sm:text-3xl font-black text-[#58cc02] mb-0.5">ISL</div>
            <div className={`text-[11px] sm:text-xs font-black uppercase tracking-wider ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
              ISLRTC Lessons
            </div>
          </div>

          <div className={`border-2 rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 text-center shadow-sm ${
            isDark ? 'bg-[#18252b] border-[#37464f]' : 'bg-white border-[#e5e5e5]'
          }`}>
            <div className="text-2xl sm:text-3xl font-black text-[#ff9600] flex items-center justify-center gap-1">
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 fill-[#ff9600]" /> 100%
            </div>
            <div className={`text-[11px] sm:text-xs font-black uppercase tracking-wider ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
              Streak Gamified
            </div>
          </div>

          <div className={`border-2 rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 text-center shadow-sm ${
            isDark ? 'bg-[#18252b] border-[#37464f]' : 'bg-white border-[#e5e5e5]'
          }`}>
            <div className="text-2xl sm:text-3xl font-black text-[#1cb0f6] mb-0.5">AI</div>
            <div className={`text-[11px] sm:text-xs font-black uppercase tracking-wider ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
              AI Assistant
            </div>
          </div>

          <div className={`border-2 rounded-[22px] sm:rounded-[24px] p-4 sm:p-5 text-center shadow-sm ${
            isDark ? 'bg-[#18252b] border-[#37464f]' : 'bg-white border-[#e5e5e5]'
          }`}>
            <div className="text-2xl sm:text-3xl font-black text-[#ffc800] mb-0.5">#1</div>
            <div className={`text-[11px] sm:text-xs font-black uppercase tracking-wider ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
              National Ranks
            </div>
          </div>

        </div>

        {/* Features Grid */}
        <div className="w-full pt-10 sm:pt-16 space-y-6 sm:space-y-8">
          <div className="text-center space-y-2">
            <h2 className={`font-black text-xl sm:text-4xl tracking-tight ${isDark ? 'text-white' : 'text-[#4b4b4b]'}`}>
              Everything You Need to Become Fluent in ISL
            </h2>
            <p className={`text-xs sm:text-sm font-bold ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
              Designed according to Government of India ISLRTC Self-Learning Syllabus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            
            <div className={`border-2 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 space-y-3 shadow-md hover:border-[#58cc02] transition-colors ${
              isDark ? 'bg-[#18252b] border-[#37464f]' : 'bg-white border-[#e5e5e5]'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-[#58cc02]/20 border border-[#58cc02]/40 flex items-center justify-center text-[#58cc02]">
                <Map className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className={`font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-[#4b4b4b]'}`}>Interactive Learning Path</h3>
              <p className={`text-xs font-bold leading-relaxed ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
                Step-by-step HD video lessons, linguistic theory cards, 3D chest space drills, and instructor tips.
              </p>
            </div>

            <div className={`border-2 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 space-y-3 shadow-md hover:border-[#1cb0f6] transition-colors ${
              isDark ? 'bg-[#18252b] border-[#37464f]' : 'bg-white border-[#e5e5e5]'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-[#1cb0f6]/20 border border-[#1cb0f6]/40 flex items-center justify-center text-[#1cb0f6]">
                <Bot className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className={`font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-[#4b4b4b]'}`}>ISL Buddy AI Assistant</h3>
              <p className={`text-xs font-bold leading-relaxed ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
                Ask any question about signs, fingerspelling, SOV grammar rules, or deaf culture and receive instant answers.
              </p>
            </div>

            <div className={`border-2 rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 space-y-3 shadow-md hover:border-[#ff4b4b] transition-colors ${
              isDark ? 'bg-[#18252b] border-[#37464f]' : 'bg-white border-[#e5e5e5]'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-[#ff4b4b]/20 border border-[#ff4b4b]/40 flex items-center justify-center text-[#ff4b4b]">
                <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className={`font-black text-lg sm:text-xl ${isDark ? 'text-white' : 'text-[#4b4b4b]'}`}>SOS Emergency Display</h3>
              <p className={`text-xs font-bold leading-relaxed ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
                High-visibility emergency cards for Medical, Police, and Deaf assistance with loud audio chimes.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Hero Callout Banner */}
        <div className="w-full bg-[#58cc02] text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-12 shadow-2xl flex flex-col items-center text-center space-y-5">
          <h2 className="font-black text-2xl sm:text-5xl tracking-tight leading-tight">
            Start Your Sign Language Journey Today!
          </h2>
          <p className="text-xs sm:text-base font-black opacity-90 max-w-xl">
            Join thousands of learners making communication accessible across India.
          </p>

          <button
            onClick={onOpenAuth}
            className="py-3.5 sm:py-4 px-6 sm:px-8 rounded-[20px] sm:rounded-[22px] bg-white text-black font-black text-xs sm:text-base uppercase tracking-wider shadow-2xl hover:bg-white/90 cursor-pointer transition-transform active:scale-95"
          >
            CREATE YOUR FREE ACCOUNT NOW ➔
          </button>
        </div>

      </main>

      {/* Ultra-Modern Multi-Column Footer */}
      <footer className={`border-t-2 pt-10 pb-8 px-4 sm:px-8 mt-10 transition-colors ${
        isDark ? 'bg-[#18252b] border-[#37464f]' : 'bg-white border-[#e5e5e5]'
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left mb-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="ISL Buddy" className="w-8 h-8 object-contain" />
              <span className="font-black text-xl text-[#58cc02]">ISL Buddy</span>
            </div>
            <p className={`text-xs font-bold max-w-sm leading-relaxed ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
              India's leading gamified Indian Sign Language (ISL) self-learning platform, empowering accessible communication aligned with UN SDG 4 & 10.
            </p>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-[10px] font-black text-[#58cc02] bg-[#58cc02]/15 border border-[#58cc02]/30 px-2.5 py-1 rounded-full uppercase">
                UN SDG 4: Quality Education
              </span>
              <span className="text-[10px] font-black text-[#1cb0f6] bg-[#1cb0f6]/15 border border-[#1cb0f6]/30 px-2.5 py-1 rounded-full uppercase">
                UN SDG 10: Reduced Inequalities
              </span>
            </div>
          </div>

          {/* Col 2: Quick Features */}
          <div className="space-y-2">
            <h4 className={`font-black text-sm uppercase tracking-wider mb-2 ${isDark ? 'text-white' : 'text-[#4b4b4b]'}`}>Platform Features</h4>
            <ul className={`space-y-1.5 text-xs font-bold ${isDark ? 'text-[#afafaf]' : 'text-[#777777]'}`}>
              <li><button onClick={onOpenAuth} className="hover:text-[#58cc02] cursor-pointer">• ISLRTC HD Lessons</button></li>
              <li><button onClick={onOpenAuth} className="hover:text-[#58cc02] cursor-pointer">• ISL Buddy AI Assistant</button></li>
              <li><button onClick={onOpenAuth} className="hover:text-[#58cc02] cursor-pointer">• National XP Leaderboard</button></li>
              <li><button onClick={onOpenAuth} className="hover:text-[#58cc02] cursor-pointer">• SOS Emergency Display</button></li>
            </ul>
          </div>

          {/* Col 3: Official Support & Contact Link */}
          <div className="space-y-3">
            <h4 className={`font-black text-sm uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#4b4b4b]'}`}>Official Support</h4>
            <div className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark ? 'bg-[#131f24] border-[#37464f]' : 'bg-[#f7f7f7] border-[#e5e5e5]'
            }`}>
              <span className="text-[10px] font-black text-[#afafaf] uppercase tracking-wider block">SUPPORT EMAIL</span>
              <a 
                href="mailto:klynkmmr@gmail.com" 
                className="text-xs font-black text-[#1cb0f6] hover:underline block break-all"
              >
                klynkmmr@gmail.com
              </a>
            </div>

            <button
              onClick={onOpenContact}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1cb0f6] hover:bg-[#159bd6] text-[#ffffff] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Support Form</span>
            </button>
          </div>

        </div>

        <div className={`max-w-7xl mx-auto pt-6 border-t flex flex-col sm:flex-row items-center justify-between text-xs font-bold gap-2 ${
          isDark ? 'border-[#37464f] text-[#52656d]' : 'border-[#e5e5e5] text-[#afafaf]'
        }`}>
          <span>ISL Buddy v3.0 • All Rights Reserved</span>
          <span className="flex items-center gap-1">Made with <Heart className="w-3.5 h-3.5 text-[#ff4b4b] fill-[#ff4b4b]" /> for India</span>
        </div>
      </footer>

    </div>
  );
}

import React from 'react';
import { Map, Bot, User, Flame } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab, userProgress }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#18252b]/90 backdrop-blur-md border-b-2 border-[#e5e5e5] dark:border-[#37464f] px-3 sm:px-6 py-2.5 transition-colors md:hidden">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('roadmap')} 
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <img 
            src="/logo.png" 
            alt="SmartSign ISL" 
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-black text-lg sm:text-xl tracking-tight text-[#58cc02] leading-snug py-0.5">
              SmartSign ISL
            </span>
            <span className="text-[10px] font-black text-[#ffc800] uppercase tracking-wider">
              ISL Master Course
            </span>
          </div>
        </div>

        {/* Right Stats Bar */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Streak Counter */}
          <div className="flex items-center gap-1 font-black text-[#ff9600] text-xs sm:text-sm bg-[#ff9600]/10 border border-[#ff9600]/30 px-3 py-1 rounded-xl">
            <Flame className="w-4 h-4 fill-[#ff9600]" />
            <span>{userProgress.streakDays}</span>
          </div>

        </div>

      </div>
    </header>
  );
}

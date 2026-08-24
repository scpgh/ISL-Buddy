import React from 'react';
import { Map, Bot, User, Trophy, ShieldAlert, Sparkles, Flame, Film } from 'lucide-react';

export default function LeftSidebar({ activeTab, setActiveTab, userProgress }) {
  const isHindi = userProgress?.appLanguage === 'hindi';
  const streakCount = userProgress?.streakDays || 1;

  const navItems = [
    { id: 'roadmap', label: isHindi ? 'सीखें' : 'LEARN', icon: Map },
    { id: 'actions', label: isHindi ? 'एक्शन लाइब्रेरी' : 'ACTION SIGNS', icon: Film },
    { id: 'leaderboard', label: isHindi ? 'लीडरबोर्ड' : 'LEADERBOARDS', icon: Trophy },
    { id: 'ai-tutor', label: isHindi ? 'AI शिक्षक' : 'AI TUTOR', icon: Bot },
    { id: 'profile', label: isHindi ? 'प्रोफ़ाइल' : 'PROFILE', icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-60 lg:w-64 xl:w-72 h-screen sticky top-0 border-r-2 border-[#e5e5e5] dark:border-[#37464f] p-5 bg-white dark:bg-[#18252b] justify-between shrink-0 z-40 transition-colors">
      
      {/* Top Logo & Brand with LeetCode Fire Streak Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-8">
          
          <div 
            onClick={() => setActiveTab('roadmap')}
            className="flex items-center gap-2.5 cursor-pointer group min-w-0"
          >
            <img 
              src="/logo.png" 
              alt="SmartSign ISL" 
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform drop-shadow-md shrink-0"
            />
            <span className="font-black text-xl tracking-tight text-[#58cc02] leading-none truncate">
              SmartSign ISL
            </span>
          </div>

          {/* LeetCode Fire Badge (Flame symbol with fire number) */}
          <div 
            className="relative flex items-center justify-center bg-[#ff9600]/15 border-2 border-[#ff9600]/40 hover:border-[#ff9600] px-2.5 py-1 rounded-2xl text-[#ff9600] font-black text-xs shadow-xs transition-transform hover:scale-105 shrink-0 cursor-pointer"
            title={`${streakCount}-Day Active Learning Streak!`}
            onClick={() => setActiveTab('profile')}
          >
            <div className="relative flex items-center gap-1">
              <Flame className="w-5 h-5 fill-[#ff9600] text-[#ff9600] animate-pulse" />
              <span className="font-black text-sm text-[#ff9600] leading-none">
                {streakCount}
              </span>
            </div>
          </div>

        </div>

        {/* Duolingo Vertical Nav Buttons */}
        <nav className="space-y-2.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full py-3.5 px-4 rounded-[20px] font-black text-sm uppercase tracking-wider flex items-center gap-3.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#58cc02] text-white shadow-md border-b-4 border-[#46a302]'
                    : 'text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white hover:bg-[#e5e5e5]/50 dark:hover:bg-[#131f24] border-2 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom SOS Emergency Button */}
      <div className="pt-4 border-t-2 border-[#e5e5e5] dark:border-[#37464f] space-y-3">
        <button
          onClick={() => setActiveTab('sos')}
          className={`w-full py-3.5 px-4 rounded-[20px] font-black text-xs uppercase tracking-wider flex items-center justify-between border-2 transition-all cursor-pointer ${
            activeTab === 'sos'
              ? 'bg-[#ff4b4b] text-white border-[#d43737] shadow-md'
              : 'bg-[#ff4b4b]/15 text-[#ff4b4b] border-[#ff4b4b]/40 hover:bg-[#ff4b4b]/25'
          }`}
        >
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> {isHindi ? 'SOS आपातकालीन' : 'SOS EMERGENCY'}
          </span>
          <span className="text-[9px] bg-[#ff4b4b] text-white px-1.5 py-0.5 rounded-md font-black">
            SOS
          </span>
        </button>

        <div className="text-[10px] font-black text-[#afafaf] dark:text-[#52656d] text-center uppercase tracking-wider">
          SmartSign ISL • UN SDG 4 & 10
        </div>
      </div>

    </aside>
  );
}

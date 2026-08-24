import React from 'react';
import { Map, BookOpen, MessageSquareText, Camera, Trophy, Sun, Moon, ShieldCheck } from 'lucide-react';

export default function DesktopSidebar({ activeTab, setActiveTab, userProgress, currentTheme, onToggleTheme, onLogout }) {
  const navItems = [
    { id: 'learn', label: 'Learn Path', icon: Map },
    { id: 'dictionary', label: 'ISL Dictionary', icon: BookOpen },
    { id: 'assistant', label: 'Assistant', icon: MessageSquareText },
    { id: 'camera', label: 'AI Practice', icon: Camera },
    { id: 'profile', label: 'Profile & Impact', icon: Trophy },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-64 xl:w-72 shrink-0 h-[calc(100vh-2rem)] sticky top-4 bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[24px] p-5 shadow-sm transition-colors">
      
      <div>
        <div className="flex items-center space-x-3 mb-6 p-1">
          <img 
            src="/logo.png" 
            alt="Mudra Learn Logo" 
            className="w-11 h-11 object-contain drop-shadow-md shrink-0"
          />
          <div>
            <h1 className="font-black text-xl text-[#4b4b4b] dark:text-white tracking-tight flex items-center gap-1.5 leading-snug py-0.5">
              Mudra <span className="text-xs px-2 py-0.5 rounded-full bg-[#58cc02]/15 text-[#58cc02] font-black border border-[#58cc02]/30 uppercase">Learn</span>
            </h1>
            <p className="text-[10px] text-[#afafaf] dark:text-[#52656d] font-bold mt-1">Indian Sign Language</p>
          </div>
        </div>

        <div className="mb-6 bg-[#f7f7f7] dark:bg-[#131f24] p-3 rounded-[16px] border-2 border-[#e5e5e5] dark:border-[#37464f] flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#58cc02]/20 border border-[#58cc02]/40 flex items-center justify-center text-base shrink-0">
              🤟
            </div>
            <div className="truncate">
              <p className="font-black text-xs text-[#4b4b4b] dark:text-white truncate">{userProgress.user?.name || userProgress.title}</p>
              <p className="text-[10px] text-[#ffc800] font-black">Level {userProgress.level}</p>
            </div>
          </div>
          <span className="text-xs font-black text-[#58cc02] bg-[#58cc02]/10 px-2 py-0.5 rounded-xl border border-[#58cc02]/30 shrink-0">
            {userProgress.xp} XP
          </span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 p-3.5 rounded-[16px] font-black text-sm transition-all duration-150 uppercase tracking-wide border-2 text-left whitespace-nowrap ${
                  isActive
                    ? 'bg-[#58cc02]/15 border-[#58cc02] text-[#58cc02] shadow-xs'
                    : 'bg-transparent border-transparent text-[#afafaf] dark:text-[#52656d] hover:bg-[#f7f7f7] dark:hover:bg-[#131f24] hover:text-[#4b4b4b] dark:hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 pt-4 border-t-2 border-[#e5e5e5] dark:border-[#37464f]">
        <button
          onClick={onToggleTheme}
          className="w-full p-3 rounded-[16px] border-2 border-[#e5e5e5] dark:border-[#37464f] bg-[#f7f7f7] dark:bg-[#131f24] font-black text-xs flex items-center justify-between text-[#4b4b4b] dark:text-white hover:border-[#58cc02] transition-colors"
        >
          <span className="flex items-center gap-2">
            {currentTheme === 'dark' ? <Moon className="w-4 h-4 text-[#ffc800]" /> : <Sun className="w-4 h-4 text-[#58cc02]" />}
            <span>Theme: {currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </span>
          <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#58cc02]/20 text-[#58cc02]">Toggle</span>
        </button>

        <div className="p-3 rounded-[16px] bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] text-[11px] text-[#4b4b4b] dark:text-white flex items-center justify-between">
          <span className="font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#58cc02]" /> UN SDG 4 & 10
          </span>
          <span className="text-[10px] bg-[#58cc02]/20 px-2 py-0.5 rounded font-black text-[#58cc02]">Free App</span>
        </div>

        <p className="text-[10px] text-[#afafaf] dark:text-[#52656d] font-bold text-center">
          Mudra Learn Platform
        </p>
      </div>

    </aside>
  );
}

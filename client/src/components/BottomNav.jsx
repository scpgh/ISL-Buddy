import React from 'react';
import { Map, Trophy, Bot, ShieldAlert, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, userProgress }) {
  const isHindi = userProgress?.appLanguage === 'hindi';

  const tabs = [
    { id: 'roadmap', label: isHindi ? 'सीखें' : 'Learn', icon: Map },
    { id: 'leaderboard', label: isHindi ? 'रैंक' : 'Ranks', icon: Trophy },
    { id: 'ai-tutor', label: isHindi ? 'AI शिक्षक' : 'AI Tutor', icon: Bot },
    { id: 'sos', label: 'SOS', icon: ShieldAlert, alert: true },
    { id: 'profile', label: isHindi ? 'प्रोफ़ाइल' : 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto rounded-[24px] bg-white/95 dark:bg-[#18252b]/95 backdrop-blur-md border-2 border-[#e5e5e5] dark:border-[#37464f] p-1.5 shadow-2xl md:hidden">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1.5 rounded-[18px] transition-all duration-200 ${
                isActive
                  ? tab.alert ? 'bg-[#ff4b4b] text-white shadow-sm border-b-4 border-[#d43737]' : 'bg-[#58cc02] text-white shadow-sm border-b-4 border-[#46a302]'
                  : tab.alert ? 'text-[#ff4b4b] font-black' : 'text-[#afafaf] dark:text-[#52656d] hover:text-[#4b4b4b] dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
              <span className={`text-[10px] font-black mt-0.5 ${isActive ? 'text-white' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

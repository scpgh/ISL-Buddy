import React from 'react';
import { Globe, Check, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export default function LanguageSelectorModal({ onSelectLanguage }) {
  const handleSelect = (lang) => {
    soundEngine.playVictoryMelody();
    onSelectLanguage(lang);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#f7f7f7] dark:bg-[#131f24] text-[#4b4b4b] dark:text-white flex items-center justify-center p-4 min-h-screen overflow-y-auto">
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] p-6 sm:p-8 max-w-md w-full shadow-2xl animate-pop-in text-center my-auto">
        
        <div className="w-16 h-16 rounded-full bg-[#58cc02]/20 border-2 border-[#58cc02] flex items-center justify-center mx-auto mb-4 text-2xl shadow-md">
          <Globe className="w-8 h-8 text-[#58cc02]" />
        </div>

        <h2 className="font-black text-2xl sm:text-3xl text-[#4b4b4b] dark:text-white mb-1">
          Select Learning Language
        </h2>
        <p className="font-black text-base text-[#ffc800] mb-6">
          सीखने की भाषा चुनें
        </p>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => handleSelect('english')}
            className="w-full duo-btn duo-btn-green p-4 rounded-[20px] font-black text-base flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🇬🇧</span>
              <div className="text-left">
                <p className="leading-none text-base">English</p>
                <p className="text-[11px] opacity-80 mt-0.5 font-bold">App Interface & Explanations in English</p>
              </div>
            </div>
            <Check className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => handleSelect('hindi')}
            className="w-full duo-btn duo-btn-yellow p-4 rounded-[20px] font-black text-base flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🇮🇳</span>
              <div className="text-left">
                <p className="leading-none text-base text-[#4b4b4b]">हिंदी (Hindi)</p>
                <p className="text-[11px] text-[#4b4b4b]/80 mt-0.5 font-bold">ऐप इंटरफ़ेस और व्याख्या हिंदी में</p>
              </div>
            </div>
            <Check className="w-6 h-6 text-[#4b4b4b]" />
          </button>
        </div>

        <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d]">
          You can change your language anytime from your Profile!
        </p>

      </div>
    </div>
  );
}

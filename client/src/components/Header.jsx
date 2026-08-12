import React, { useState } from 'react';
import { Flame, Heart, Zap, RefreshCw } from 'lucide-react';
import { refillHearts } from '../utils/storage';
import { soundEngine } from '../utils/audio';

export default function Header({ userProgress, onUpdateProgress }) {
  const [showHeartModal, setShowHeartModal] = useState(false);

  const handleRefill = () => {
    soundEngine.playVictoryMelody();
    const updated = refillHearts();
    onUpdateProgress(updated);
    setShowHeartModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#131f24]/95 backdrop-blur-md border-b-2 border-[#e5e5e5] dark:border-[#37464f] px-3.5 py-2.5 shadow-sm transition-colors">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          
          <div className="flex items-center space-x-2 shrink-0">
            <img 
              src="/logo.png" 
              alt="Mudra Learn Logo" 
              className="w-9 h-9 object-contain drop-shadow-sm shrink-0"
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-1.5 leading-none">
                <span className="font-black text-base text-[#4b4b4b] dark:text-white tracking-tight">
                  Mudra
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#58cc02]/15 text-[#58cc02] font-black border border-[#58cc02]/30 uppercase">
                  Learn
                </span>
              </div>
              <p className="text-[9px] text-[#afafaf] dark:text-[#52656d] font-bold mt-0.5 leading-none">
                Indian Sign Language
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <div 
              title="Daily Streak Days"
              className="flex items-center space-x-1 bg-[#ffc800]/10 border-2 border-[#ffc800]/40 px-2 py-0.5 rounded-2xl text-[#ffc800] font-black text-xs shadow-xs"
            >
              <Flame className="w-3.5 h-3.5 fill-[#ffc800] animate-bounce-short" />
              <span>{userProgress.streakDays}</span>
            </div>

            <div 
              title="Total Experience Points"
              className="flex items-center space-x-1 bg-[#58cc02]/10 border-2 border-[#58cc02]/40 px-2 py-0.5 rounded-2xl text-[#58cc02] font-black text-xs shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 fill-[#58cc02]" />
              <span>{userProgress.xp}</span>
            </div>

            <button 
              onClick={() => setShowHeartModal(true)}
              title="Hearts / Lives"
              className="flex items-center space-x-1 bg-[#ff4b4b]/10 border-2 border-[#ff4b4b]/40 px-2 py-0.5 rounded-2xl text-[#ff4b4b] font-black text-xs hover:bg-[#ff4b4b]/20 transition-colors shadow-xs"
            >
              <Heart className={`w-3.5 h-3.5 text-[#ff4b4b] fill-[#ff4b4b] ${userProgress.hearts === 0 ? 'animate-pulse' : ''}`} />
              <span>{userProgress.hearts}</span>
            </button>
          </div>

        </div>
      </header>

      {showHeartModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] p-6 max-w-xs w-full text-center shadow-2xl animate-pop-in">
            <div className="w-16 h-16 rounded-full bg-[#ff4b4b]/15 border-2 border-[#ff4b4b]/40 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-[#ff4b4b] fill-[#ff4b4b]" />
            </div>
            
            <h3 className="font-black text-xl text-[#4b4b4b] dark:text-white mb-2">Hearts System</h3>
            <p className="text-[#4b4b4b] dark:text-[#52656d] text-xs font-bold mb-6 leading-relaxed">
              Hearts protect your streak when practicing! You currently have <strong className="text-[#ff4b4b]">{userProgress.hearts} / {userProgress.maxHearts}</strong> hearts remaining.
            </p>

            <button
              onClick={handleRefill}
              className="w-full duo-btn duo-btn-green py-3.5 rounded-2xl text-sm font-black mb-3 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> REFILL HEARTS FREE
            </button>

            <button
              onClick={() => setShowHeartModal(false)}
              className="text-xs text-[#afafaf] hover:text-[#4b4b4b] dark:hover:text-white font-bold py-1 uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

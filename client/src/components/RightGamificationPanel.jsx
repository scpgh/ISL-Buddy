import React from 'react';
import { Target, Trophy, ArrowRight, Zap } from 'lucide-react';
import MascotWidget from './MascotWidget';
import { getGlobalLeaderboard } from '../utils/storage';

export default function RightGamificationPanel({ userProgress, onSelectTab }) {
  const isHindi = userProgress?.appLanguage === 'hindi';
  const realLearners = getGlobalLeaderboard();

  return (
    <aside className="hidden lg:flex flex-col space-y-4 w-80 xl:w-96 shrink-0 h-[calc(100vh-2rem)] sticky top-4 overflow-y-auto pr-1">
      
      {/* AI Tutor Quick Access Widget */}
      <MascotWidget userProgress={userProgress} onSelectTab={onSelectTab} />

      {/* Daily Quests Card */}
      <div className="rounded-[24px] bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-xs text-[#4b4b4b] dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
            <Target className="w-4 h-4 text-[#ffc800]" /> {isHindi ? 'दैनिक चुनौतियाँ' : 'DAILY QUESTS'}
          </h3>
          <span className="text-[10px] font-black text-[#ffc800] bg-[#ffc800]/15 px-2.5 py-0.5 rounded-full border border-[#ffc800]/40">
            {isHindi ? 'प्रतिदिन रीसेट' : 'Resets Daily'}
          </span>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 rounded-[16px] bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f]">
            <div className="flex justify-between text-xs font-black mb-1.5">
              <span className="text-[#4b4b4b] dark:text-white">
                {isHindi ? `आज ${userProgress.dailyGoalXp} XP अर्जित करें` : `Earn ${userProgress.dailyGoalXp} XP Today`}
              </span>
              <span className="text-[#58cc02]">{userProgress.todayXpEarned} / {userProgress.dailyGoalXp}</span>
            </div>
            <div className="w-full bg-[#e5e5e5] dark:bg-[#37464f] rounded-full h-2.5 p-0.5">
              <div 
                className="bg-[#58cc02] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (userProgress.todayXpEarned / userProgress.dailyGoalXp) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="p-3 rounded-[16px] bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f]">
            <div className="flex justify-between text-xs font-black mb-1.5">
              <span className="text-[#4b4b4b] dark:text-white">
                {isHindi ? '3-दिवसीय स्ट्रीक बनाए रखें' : 'Maintain 3-Day Streak'}
              </span>
              <span className="text-[#ff9600]">{userProgress.streakDays} / 3 🔥</span>
            </div>
            <div className="w-full bg-[#e5e5e5] dark:bg-[#37464f] rounded-full h-2.5 p-0.5">
              <div 
                className="bg-[#ff9600] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (userProgress.streakDays / 3) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Registered Learners Leaderboard Widget */}
      <div className="rounded-[24px] bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-xs text-[#4b4b4b] dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-[#ffc800]" /> {isHindi ? 'राष्ट्रीय लीडरबोर्ड' : 'NATIONAL LEADERBOARD'}
          </h3>
          <button 
            onClick={() => onSelectTab('leaderboard')}
            className="text-[10px] font-black text-[#1cb0f6] hover:underline flex items-center gap-0.5 cursor-pointer uppercase"
          >
            {isHindi ? 'सभी देखें' : 'VIEW ALL'} <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {realLearners.length > 0 ? (
          <div className="space-y-2">
            {realLearners.slice(0, 5).map((user, idx) => {
              const isMe = user.uid === userProgress?.user?.uid || user.isUser;
              return (
                <div
                  key={user.uid || idx}
                  className={`p-2.5 rounded-[16px] border-2 flex items-center justify-between transition-all ${
                    isMe
                      ? 'bg-[#58cc02]/15 border-[#58cc02]'
                      : 'bg-[#f7f7f7] dark:bg-[#131f24] border-[#e5e5e5] dark:border-[#37464f]'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="w-4 text-center font-black text-xs text-[#afafaf] shrink-0">
                      #{idx + 1}
                    </span>
                    <span className="text-base shrink-0">{user.avatar || '🤟'}</span>
                    <div className="truncate">
                      <p className="text-xs font-black text-[#4b4b4b] dark:text-white truncate">
                        {isMe ? (userProgress.username || user.name) : user.name}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 flex items-center gap-1 text-xs font-black text-[#ffc800]">
                    <Zap className="w-3.5 h-3.5 fill-[#ffc800]" />
                    <span>{isMe ? userProgress.xp : user.xp} XP</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4 text-xs font-bold text-[#afafaf]">
            {isHindi ? 'पाठ पूरा करें और लीडरबोर्ड पर पहला स्थान पाएं!' : 'Complete a lesson to claim #1 rank on the leaderboard!'}
          </div>
        )}
      </div>

    </aside>
  );
}

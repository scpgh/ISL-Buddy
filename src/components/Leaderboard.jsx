import React from 'react';
import { Trophy, Zap, Shield, HelpCircle, Award, Flame } from 'lucide-react';
import { getGlobalLeaderboard } from '../utils/storage';

export default function Leaderboard({ userProgress, onStartLesson }) {
  const isHindi = userProgress?.appLanguage === 'hindi';

  // Get real logged in learners directory and dynamically rank
  const allLearners = getGlobalLeaderboard();
  const myUid = userProgress?.user?.uid;

  const leaderboardData = allLearners.map((u) => {
    const isMe = u.uid === myUid;
    return isMe
      ? { ...u, name: userProgress?.username || u.name, xp: userProgress?.xp || 0, isUser: true }
      : u;
  }).sort((a, b) => b.xp - a.xp);

  return (
    <div className="pb-24 pt-2 max-w-4xl mx-auto w-full px-2 sm:px-4 animate-pop-in space-y-6">
      
      {/* Hero Header Banner */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Center Shield Mascot Banner */}
        <div className="flex-1 text-center flex flex-col items-center">
          <div className="flex items-center justify-center -space-x-3 mb-3">
            <div className="w-14 h-16 rounded-2xl bg-[#ff9600]/20 border-2 border-[#ff9600] flex items-center justify-center text-xl rotate-[-12deg] shadow-md">
              🥉
            </div>
            <div className="w-16 h-20 rounded-2xl bg-[#ffc800] border-4 border-[#e5b200] flex items-center justify-center text-3xl z-10 shadow-xl scale-110">
              🏆
            </div>
            <div className="w-14 h-16 rounded-2xl bg-[#1cb0f6]/20 border-2 border-[#1cb0f6] flex items-center justify-center text-xl rotate-[12deg] shadow-md">
              🥈
            </div>
          </div>

          <h1 className="font-black text-2xl sm:text-3xl text-[#4b4b4b] dark:text-white tracking-tight">
            {isHindi ? 'लीडरबोर्ड' : 'Leaderboard'}
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#afafaf] dark:text-[#52656d] max-w-md mt-1">
            {isHindi ? 'पाठ पूरा करें, XP अर्जित करें, और पंजीकृत शिक्षार्थियों के साथ प्रतिस्पर्धा करें!' : 'Complete video lessons, earn XP, and climb the national ranks!'}
          </p>
        </div>

        {/* What are Leaderboards Info Card */}
        <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[24px] p-5 shadow-sm max-w-xs w-full shrink-0">
          <span className="text-[10px] font-black uppercase text-[#afafaf] tracking-wider block mb-1">
            {isHindi ? 'लीडरबोर्ड क्या है?' : 'WHAT ARE LEADERBOARDS?'}
          </span>
          <h3 className="font-black text-base text-[#4b4b4b] dark:text-white leading-tight mb-1">
            {isHindi ? 'पाठ सीखें। XP कमाएं। प्रतिस्पर्धा करें।' : 'Do lessons. Earn XP. Compete.'}
          </h3>
          <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d] leading-relaxed">
            {isHindi ? 'वीडियो पाठों के माध्यम से XP अर्जित करें और पंजीकृत शिक्षार्थियों के साथ प्रतिस्पर्धा करें!' : 'Earn XP through interactive ISL video lessons, then compete with logged-in learners in the national leaderboard!'}
          </p>
        </div>

      </div>

      {/* Live Ranking Table */}
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#e5e5e5] dark:border-[#37464f]">
          <h2 className="font-black text-lg text-[#4b4b4b] dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#ffc800]" /> {isHindi ? 'राष्ट्रीय रैंकिंग' : 'National Rankings'}
          </h2>
          <span className="text-xs font-black text-[#58cc02] bg-[#58cc02]/15 px-3 py-1 rounded-full border border-[#58cc02]/30 uppercase">
            {isHindi ? 'शिक्षार्थी लाइव' : 'Learners Live'}
          </span>
        </div>

        <div className="space-y-2.5">
          {leaderboardData.map((user, idx) => {
            const isMe = user.uid === myUid || user.isUser;

            return (
              <div
                key={user.uid || user.name}
                className={`p-3 sm:p-4 rounded-[20px] border-2 flex items-center justify-between transition-all ${
                  isMe
                    ? 'bg-[#58cc02]/15 border-[#58cc02] shadow-sm'
                    : 'bg-[#f7f7f7] dark:bg-[#131f24] border-[#e5e5e5] dark:border-[#37464f]'
                }`}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                  <span className={`w-7 text-center font-black text-sm sm:text-base shrink-0 ${
                    idx === 0 ? 'text-[#ffc800]' : idx === 1 ? 'text-[#afafaf]' : idx === 2 ? 'text-[#e5b200]' : 'text-[#afafaf]'
                  }`}>
                    #{idx + 1}
                  </span>

                  <div className="w-10 h-10 rounded-full bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] flex items-center justify-center text-xl shrink-0 shadow-xs">
                    {user.avatar || "🤟"}
                  </div>

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-black text-[#4b4b4b] dark:text-white truncate">
                        {user.name}
                      </p>
                      {isMe && (
                        <span className="text-[9px] font-black text-white bg-[#58cc02] px-2 py-0.2 rounded-full uppercase">
                          {isHindi ? 'आप' : 'YOU'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#afafaf] dark:text-[#52656d] font-bold truncate">
                      {user.location || "India"} • {isHindi ? 'ISL शिक्षार्थी' : 'ISL Learner'}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 flex items-center gap-1 font-black text-sm sm:text-base text-[#ffc800]">
                  <Zap className="w-4 h-4 fill-[#ffc800]" />
                  <span>{user.xp} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

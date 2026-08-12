import React, { useState } from 'react';
import { User, Sparkles, Flame, Award, BookOpen, Globe, Lock, Trash2, LogOut, CheckCircle2, ShieldAlert, Mail, History, Check, Edit2, Save, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { ISL_PHRASES } from '../data/islData';
import { saveProgressForUser, updateGlobalLeaderboard } from '../utils/storage';

export default function Profile({ userProgress, onUpdateProgress, onSelectLanguage, onSignOut, onOpenAuth, onOpenContact }) {
  const isHindi = userProgress?.appLanguage === 'hindi';
  const user = userProgress?.user;
  const completedIds = userProgress?.completedPhrases || [];

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userProgress?.username || user?.displayName || 'Learner');
  const [nameSuccess, setNameSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState(false);

  // Filter completed phrases history
  const completedLessonsHistory = ISL_PHRASES.filter((p) => completedIds.includes(p.id));

  const handleSaveName = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    soundEngine.playCorrectSound();
    const updated = {
      ...userProgress,
      username: nameInput.trim()
    };

    if (onUpdateProgress) {
      onUpdateProgress(updated);
    }
    if (user && user.uid) {
      saveProgressForUser(user.uid, updated);
      updateGlobalLeaderboard(updated);
    }

    setIsEditingName(false);
    setNameSuccess(true);
    setTimeout(() => setNameSuccess(false), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) return;
    soundEngine.playVictoryMelody();
    setPwdSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPwdSuccess(false), 4000);
  };

  return (
    <div className="pb-24 pt-2 px-2 sm:px-4 max-w-3xl mx-auto w-full animate-pop-in space-y-6">
      
      {/* User Header Profile Card */}
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] p-5 sm:p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          
          <div className="w-20 h-20 rounded-full bg-[#58cc02]/20 border-4 border-[#58cc02] flex items-center justify-center text-[#58cc02] overflow-hidden shadow-md shrink-0">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 stroke-[2.5]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            
            {/* Inline Name Display / Edit Mode */}
            {!isEditingName ? (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="font-black text-xl sm:text-2xl text-[#4b4b4b] dark:text-white truncate">
                  {userProgress?.username || user?.displayName || (isHindi ? 'शिक्षार्थी' : 'Learner')}
                </h2>

                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-1.5 rounded-xl bg-[#f7f7f7] dark:bg-[#131f24] hover:bg-[#e5e5e5] text-[#1cb0f6] transition-colors cursor-pointer"
                  title={isHindi ? "नाम बदलें" : "Edit Display Name"}
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <span className="text-[10px] font-black text-[#58cc02] bg-[#58cc02]/15 px-2.5 py-0.5 rounded-full border border-[#58cc02]/30 uppercase shrink-0">
                  Level {userProgress?.level || 1} • {userProgress?.title || 'ISL Learner'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSaveName} className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#1cb0f6] rounded-xl py-1.5 px-3 font-bold text-sm text-[#4b4b4b] dark:text-white outline-none focus:ring-0 max-w-[200px]"
                  placeholder="Enter your name"
                  autoFocus
                  required
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-[#58cc02] text-white hover:bg-[#46a302] transition-all cursor-pointer shadow-xs"
                  title="Save Name"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="p-2 rounded-xl bg-[#f7f7f7] dark:bg-[#131f24] text-[#afafaf] hover:text-[#ff4b4b] transition-all cursor-pointer"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            )}

            {nameSuccess && (
              <p className="text-xs font-black text-[#58cc02] flex items-center justify-center sm:justify-start gap-1 mb-1 animate-pulse">
                <Check className="w-3.5 h-3.5" /> {isHindi ? 'नाम सफलतापूर्वक बदला गया!' : 'Display name updated successfully!'}
              </p>
            )}

            <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d]">
              {user?.email || 'learner@islbuddy.org'}
            </p>
          </div>

          {user && (
            <button
              onClick={onSignOut}
              className="p-2.5 rounded-xl border-2 border-[#ff4b4b]/30 text-[#ff4b4b] hover:bg-[#ff4b4b]/10 font-black text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" /> {isHindi ? 'साइन आउट' : 'Sign Out'}
            </button>
          )}

        </div>
      </div>

      {/* Comprehensive Functional Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[22px] p-4 shadow-sm text-center">
          <Flame className="w-6 h-6 text-[#ff9600] mx-auto mb-1 fill-[#ff9600]" />
          <div className="font-black text-xl text-[#4b4b4b] dark:text-white">{userProgress?.streakDays || 1}</div>
          <div className="text-[10px] font-black text-[#afafaf] uppercase">{isHindi ? 'दिन की स्ट्रीक' : 'Day Streak'}</div>
        </div>

        <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[22px] p-4 shadow-sm text-center">
          <Sparkles className="w-6 h-6 text-[#ffc800] mx-auto mb-1 fill-[#ffc800]" />
          <div className="font-black text-xl text-[#4b4b4b] dark:text-white">{userProgress?.xp || 0}</div>
          <div className="text-[10px] font-black text-[#afafaf] uppercase">{isHindi ? 'कुल XP' : 'Total XP'}</div>
        </div>

        <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[22px] p-4 shadow-sm text-center">
          <BookOpen className="w-6 h-6 text-[#1cb0f6] mx-auto mb-1" />
          <div className="font-black text-xl text-[#4b4b4b] dark:text-white">{completedIds.length}</div>
          <div className="text-[10px] font-black text-[#afafaf] uppercase">{isHindi ? 'पूरे पाठ' : 'Lessons Done'}</div>
        </div>

        <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[22px] p-4 shadow-sm text-center">
          <Award className="w-6 h-6 text-[#ce82ff] mx-auto mb-1" />
          <div className="font-black text-xl text-[#4b4b4b] dark:text-white">{userProgress?.level || 1}</div>
          <div className="text-[10px] font-black text-[#afafaf] uppercase">{isHindi ? 'वर्तमान स्तर' : 'Current Level'}</div>
        </div>

      </div>

      {/* Completed Lessons Learning History timeline */}
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] p-5 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-[#e5e5e5] dark:border-[#37464f]">
          <h3 className="font-black text-base sm:text-lg text-[#4b4b4b] dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-[#58cc02]" /> {isHindi ? 'सीखने का इतिहास (पूर्ण पाठ)' : 'Completed Lessons History'}
          </h3>
          <span className="text-xs font-black text-[#58cc02] bg-[#58cc02]/15 px-3 py-1 rounded-full border border-[#58cc02]/30">
            {completedLessonsHistory.length} {isHindi ? 'पाठ' : 'Modules'}
          </span>
        </div>

        {completedLessonsHistory.length > 0 ? (
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {completedLessonsHistory.map((lesson, idx) => (
              <div
                key={lesson.id || idx}
                className="p-3.5 rounded-[18px] bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#58cc02]/20 border border-[#58cc02] flex items-center justify-center text-[#58cc02] shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div className="truncate">
                    <h4 className="font-black text-xs sm:text-sm text-[#4b4b4b] dark:text-white truncate">
                      {isHindi && lesson.titleHindi ? lesson.titleHindi : lesson.title}
                    </h4>
                    <p className="text-[10px] font-bold text-[#afafaf] uppercase tracking-wider">
                      Module {lesson.moduleId || 1} • ISLRTC Certified
                    </p>
                  </div>
                </div>

                <span className="text-xs font-black text-[#ffc800] bg-[#ffc800]/15 px-2.5 py-1 rounded-xl shrink-0">
                  +15 XP
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs font-bold text-[#afafaf]">
            {isHindi ? 'अभी तक कोई पाठ पूरा नहीं हुआ है। सीखना शुरू करने के लिए "सीखें" पर जाएं!' : 'No completed lessons yet. Start your roadmap to earn XP history!'}
          </div>
        )}
      </div>

      {/* Language Preference Settings */}
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] p-5 sm:p-6 shadow-sm">
        <h3 className="font-black text-base sm:text-lg text-[#4b4b4b] dark:text-white mb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#1cb0f6]" /> {isHindi ? 'भाषा प्राथमिकता (Language Preference)' : 'Language Preference'}
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onSelectLanguage('english')}
            className={`p-4 rounded-[20px] font-black text-sm border-2 flex items-center justify-between cursor-pointer transition-all ${
              !isHindi
                ? 'bg-[#1cb0f6]/15 border-[#1cb0f6] text-[#1cb0f6]'
                : 'bg-[#f7f7f7] dark:bg-[#131f24] border-[#e5e5e5] dark:border-[#37464f] text-[#afafaf]'
            }`}
          >
            <span>🇬🇧 English</span>
            {!isHindi && <CheckCircle2 className="w-5 h-5 text-[#1cb0f6]" />}
          </button>

          <button
            onClick={() => onSelectLanguage('hindi')}
            className={`p-4 rounded-[20px] font-black text-sm border-2 flex items-center justify-between cursor-pointer transition-all ${
              isHindi
                ? 'bg-[#58cc02]/15 border-[#58cc02] text-[#58cc02]'
                : 'bg-[#f7f7f7] dark:bg-[#131f24] border-[#e5e5e5] dark:border-[#37464f] text-[#afafaf]'
            }`}
          >
            <span>🇮🇳 हिन्दी (Hindi)</span>
            {isHindi && <CheckCircle2 className="w-5 h-5 text-[#58cc02]" />}
          </button>
        </div>
      </div>

      {/* Contact Support Button */}
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] p-5 sm:p-6 shadow-sm flex items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-base text-[#4b4b4b] dark:text-white mb-0.5">
            {isHindi ? 'सहायता एवं प्रतिक्रिया' : 'Help & Support'}
          </h3>
          <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d]">
            Official Support: <strong className="text-[#1cb0f6]">klynkmmr@gmail.com</strong>
          </p>
        </div>

        <button
          onClick={onOpenContact}
          className="py-3 px-5 rounded-[18px] bg-[#1cb0f6] hover:bg-[#159bd6] text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
        >
          <Mail className="w-4 h-4" /> {isHindi ? 'संपर्क करें' : 'Contact Us'}
        </button>
      </div>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, CheckCircle, ExternalLink, Sparkles, Trophy, BookOpen, Hand, Lightbulb, Tag } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { saveProgress } from '../utils/storage';

export default function QuizEngine({ phrase, userProgress, onUpdateProgress, onClose }) {
  const [completed, setCompleted] = useState(false);
  const isHindi = userProgress?.appLanguage === 'hindi';

  // Lock body scroll when full-screen lesson workspace is open to prevent double scrollbars!
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const lessonNumber = phrase.levelNumber || 1;
  const rawEmbed = phrase.videoUrlEnglish || `https://www.youtube-nocookie.com/embed?listType=playlist&list=PLHhpObfAQ1ss&index=${lessonNumber - 1}`;
  const embedUrl = rawEmbed.replace('youtube.com', 'youtube-nocookie.com');
  const watchUrl = phrase.sourceUrl || `https://www.youtube.com/watch?list=PLHhpObfAQ1ss&index=${lessonNumber}`;

  const handleComplete = () => {
    soundEngine.playVictoryMelody();
    setCompleted(true);

    const currentCompleted = userProgress.completedPhrases || [];
    const nextCompleted = currentCompleted.includes(phrase.id)
      ? currentCompleted
      : [...currentCompleted, phrase.id];

    const addedXp = 15;
    const newXp = (userProgress.xp || 0) + addedXp;
    const newTodayXp = (userProgress.todayXpEarned || 0) + addedXp;
    const newLevel = Math.floor(newXp / 100) + 1;

    // Calculate streak
    const todayStr = new Date().toISOString().split('T')[0];
    const lastDate = userProgress.lastStreakDate;
    let newStreak = userProgress.streakDays || 1;
    if (lastDate !== todayStr) {
      newStreak = (userProgress.streakDays || 1) + 1;
    }

    const updated = {
      ...userProgress,
      completedPhrases: nextCompleted,
      xp: newXp,
      todayXpEarned: newTodayXp,
      level: newLevel,
      streakDays: newStreak,
      lastStreakDate: todayStr
    };

    saveProgress(updated);
    onUpdateProgress(updated);

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const practiceList = isHindi
    ? (Array.isArray(phrase.practiceInstructionsHindi) ? phrase.practiceInstructionsHindi : [
        "चरण 1: अपने मुख्य हाथ को छाती की ऊंचाई पर 3D सांकेतिक क्षेत्र में रखें।",
        "चरण 2: वीडियो में दिखाए गए हाथों के आकार का सावधानीपूर्वक अभ्यास करें।",
        "चरण 3: वीडियो प्लेबैक के साथ 5 बार इस अभ्यास को दोहराएं।"
      ])
    : (Array.isArray(phrase.practiceInstructions) ? phrase.practiceInstructions : [
        "Position: Maintain dominant signing hand active. Base hand steady at chest height.",
        "Perform the key sign demonstrated in the video cleanly in your 3D signing space.",
        "Repeat the practice drill 5 times along with the video playback."
      ]);

  return (
    <div className="fixed inset-0 z-50 bg-[#131f24] text-white flex flex-col overflow-y-auto animate-pop-in">
      
      {/* Top Header Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#18252b] border-b-2 border-[#37464f] px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-md shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-2 font-black text-xs sm:text-sm text-[#afafaf] hover:text-white transition-colors cursor-pointer uppercase tracking-wider"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          <span>{isHindi ? 'वापस जाएं' : 'Back to Path'}</span>
        </button>

        {/* Progress Bar */}
        <div className="flex-1 max-w-lg mx-auto flex items-center gap-3">
          <span className="text-xs font-black text-[#58cc02] shrink-0">
            {isHindi ? `पाठ ${lessonNumber}` : `Lesson ${lessonNumber}`}
          </span>
          <div className="w-full bg-[#37464f] rounded-full h-3 p-0.5">
            <div
              className="bg-[#58cc02] h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (lessonNumber / 41) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* XP Badge & Close */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#ffc800]/15 border border-[#ffc800]/40 text-[#ffc800] px-3.5 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-4 h-4 fill-[#ffc800]" />
            <span>+15 XP</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#37464f]/50 text-[#afafaf] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </header>

      {/* Main Large Theater Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Area: BIG Theater HD Video Player */}
        <div className="flex-1 flex flex-col gap-4">
          
          <div className="relative w-full aspect-video rounded-[32px] overflow-hidden bg-black border-4 border-[#37464f] shadow-2xl group">
            <iframe
              src={embedUrl}
              title={`ISL Video Lesson ${lessonNumber}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex items-center justify-between bg-[#18252b] border-2 border-[#37464f] rounded-[22px] p-4 text-xs font-bold shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#58cc02] animate-ping"></span>
              <span className="text-white font-black">
                {isHindi ? `ISLRTC आधिकारिक वीडियो ट्यूटोरियल #${lessonNumber}` : `ISLRTC Official Video Tutorial #${lessonNumber}`}
              </span>
            </div>
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1cb0f6] hover:underline flex items-center gap-1.5 font-black uppercase tracking-wider bg-[#1cb0f6]/10 border border-[#1cb0f6]/30 px-3 py-1.5 rounded-xl transition-all"
            >
              {isHindi ? 'यूट्यूब पर देखें' : 'Watch on YouTube'} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Right Area: Structured Lesson Information & Drills */}
        <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 flex flex-col justify-between gap-6">
          
          <div className="space-y-5">
            
            {/* Title Header */}
            <div>
              <span className="text-[10px] font-black text-[#58cc02] bg-[#58cc02]/15 px-3.5 py-1 rounded-full border border-[#58cc02]/30 uppercase tracking-widest inline-block mb-2">
                {isHindi ? (phrase.categoryHindi || phrase.category) : (phrase.category || `LESSON ${lessonNumber}`)}
              </span>
              <h1 className="font-black text-2xl sm:text-3xl text-white leading-tight">
                {isHindi ? (phrase.hindi || `पाठ ${lessonNumber}`) : (phrase.english || `Lesson ${lessonNumber}`)}
              </h1>
            </div>

            {/* Vocabulary Badges */}
            {Array.isArray(phrase.vocabulary) && phrase.vocabulary.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {phrase.vocabulary.map((vocab, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-black text-[#1cb0f6] bg-[#1cb0f6]/10 border border-[#1cb0f6]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" /> {vocab}
                  </span>
                ))}
              </div>
            )}

            {/* Linguistic Theory Card */}
            <div className="bg-[#18252b] border-2 border-[#37464f] rounded-[26px] p-5 shadow-sm space-y-2">
              <h3 className="font-black text-xs sm:text-sm text-[#ffc800] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#ffc800]" /> {isHindi ? 'भाषाई सिद्धांत और व्याकरण' : 'Linguistic Theory & Syntax'}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-[#afafaf] leading-relaxed">
                {isHindi ? (phrase.theoryHindi || phrase.explanation) : (phrase.theory || phrase.explanation)}
              </p>
            </div>

            {/* Step-by-Step Execution Drills */}
            <div className="bg-[#18252b] border-2 border-[#37464f] rounded-[26px] p-5 shadow-sm space-y-2.5">
              <h3 className="font-black text-xs sm:text-sm text-[#58cc02] uppercase tracking-wider flex items-center gap-2">
                <Hand className="w-4 h-4 text-[#58cc02]" /> {isHindi ? 'चरणबद्ध अभ्यास निर्देश' : 'Step-by-Step Execution Drills'}
              </h3>
              <ul className="text-xs sm:text-sm font-bold text-[#afafaf] space-y-2 leading-relaxed">
                {practiceList.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#58cc02]/20 text-[#58cc02] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructor Memory Tip */}
            {(phrase.tips || phrase.tipsHindi) && (
              <div className="bg-[#18252b] border-2 border-[#37464f] rounded-[26px] p-5 shadow-sm space-y-1.5">
                <h3 className="font-black text-xs sm:text-sm text-[#1cb0f6] uppercase tracking-wider flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#1cb0f6]" /> {isHindi ? 'प्रशिक्षक सुझाव' : 'Instructor Memory Tip'}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#afafaf] leading-relaxed">
                  {isHindi ? (phrase.tipsHindi || phrase.tips) : phrase.tips}
                </p>
              </div>
            )}

          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t-2 border-[#37464f]">
            {completed ? (
              <div className="p-4 rounded-[24px] bg-[#58cc02] text-white font-black text-center text-base flex items-center justify-center gap-2 shadow-2xl animate-bounce">
                <Trophy className="w-6 h-6 fill-white" />
                <span>{isHindi ? 'पाठ पूरा हुआ! +15 XP प्राप्त हुए 🎉' : 'LESSON COMPLETED! +15 XP UNLOCKED 🎉'}</span>
              </div>
            ) : (
              <button
                onClick={handleComplete}
                className="duo-btn duo-btn-green py-4 px-6 rounded-[24px] font-black text-base w-full flex items-center justify-center gap-2 shadow-2xl tracking-wide uppercase"
              >
                <CheckCircle className="w-6 h-6" /> {isHindi ? 'पाठ पूरा करें और अगला पाठ खोलें (+15 XP)' : 'COMPLETE & UNLOCK NEXT LESSON (+15 XP)'}
              </button>
            )}
          </div>

        </div>

      </main>

    </div>
  );
}

import React, { useState } from 'react';
import { Check, Lock, Star, ChevronLeft, ChevronRight, Dumbbell, Gift, Trophy } from 'lucide-react';
import { ISL_UNITS, ISL_PHRASES } from '../data/islData';

export default function Roadmap({ userProgress, onStartLesson }) {
  const completedPhrases = userProgress?.completedPhrases || ['lesson-node-1'];
  const isHindi = userProgress?.appLanguage === 'hindi';

  // Group phrases by unit
  const unitsWithPhrases = ISL_UNITS.map((unit) => {
    return {
      ...unit,
      phrases: ISL_PHRASES.filter((p) => p.unitId === unit.id)
    };
  });

  // Determine active lesson
  const firstUncompletedIndex = ISL_PHRASES.findIndex((p) => !completedPhrases.includes(p.id));
  const activePhrase = firstUncompletedIndex === -1 ? ISL_PHRASES[ISL_PHRASES.length - 1] : ISL_PHRASES[firstUncompletedIndex];
  
  const currentActiveUnitIndex = unitsWithPhrases.findIndex((u) => u.id === activePhrase.unitId);
  const activeUnitIdx = currentActiveUnitIndex === -1 ? 0 : currentActiveUnitIndex;

  // Selected Unit State for Section Switching
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(activeUnitIdx);

  const selectedUnit = unitsWithPhrases[selectedUnitIndex] || unitsWithPhrases[0];
  const unitPhrases = selectedUnit.phrases;
  const unitCompletedCount = unitPhrases.filter((p) => completedPhrases.includes(p.id)).length;
  const unitTotalCount = unitPhrases.length;

  // Distinct triangular / zigzag offsets (Center ➔ Right ➔ Center ➔ Left)
  const triangularOffsets = [0, 75, 0, -75];

  return (
    <div className="pb-28 pt-0 max-w-md sm:max-w-lg lg:max-w-xl mx-auto w-full px-3 sm:px-6 animate-pop-in">
      
      {/* Top Aligned Duolingo-Style Section Header Bar */}
      <div className="sticky top-1 z-30 mb-6 bg-[#00cd9c] text-white rounded-[24px] p-4 sm:p-5 shadow-lg border-b-4 border-[#00a87e] flex items-center justify-between gap-2.5">
        <button
          onClick={() => setSelectedUnitIndex((prev) => Math.max(0, prev - 1))}
          disabled={selectedUnitIndex === 0}
          className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
          title="Previous Unit"
        >
          <ChevronLeft className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Full Module Title Container */}
        <div className="text-center flex-1 min-w-0 px-1">
          <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-3 py-0.5 rounded-full inline-block mb-1">
            SECTION 1 • UNIT {selectedUnitIndex + 1} OF {unitsWithPhrases.length}
          </span>
          <h2 className="font-black text-sm sm:text-base md:text-lg leading-snug break-words">
            {isHindi ? selectedUnit.titleHindi : selectedUnit.title}
          </h2>
          <p className="text-xs font-bold opacity-90 mt-0.5">
            {unitCompletedCount}/{unitTotalCount} {isHindi ? 'पाठ पूरे' : 'Lessons Completed'}
          </p>
        </div>

        <button
          onClick={() => setSelectedUnitIndex((prev) => Math.min(unitsWithPhrases.length - 1, prev + 1))}
          disabled={selectedUnitIndex === unitsWithPhrases.length - 1}
          className="p-2 rounded-2xl bg-white/20 hover:bg-white/30 disabled:opacity-30 disabled:hover:bg-white/20 text-white transition-colors shrink-0 cursor-pointer"
          title="Next Unit"
        >
          <ChevronRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>

      {/* Triangular / Zigzag Unit Level Nodes Stack */}
      <div className="flex flex-col items-center gap-10 sm:gap-12 relative my-4">
        
        {unitPhrases.map((phrase, pIdx) => {
          const phraseGlobalIndex = ISL_PHRASES.findIndex((p) => p.id === phrase.id);
          const currentGlobalActiveIndex = firstUncompletedIndex === -1 ? ISL_PHRASES.length - 1 : firstUncompletedIndex;
          
          const isCompleted = completedPhrases.includes(phrase.id);
          const isActive = phraseGlobalIndex === currentGlobalActiveIndex;

          const offsetPx = triangularOffsets[pIdx % triangularOffsets.length];
          const nodeType = pIdx % 4;

          return (
            <div
              key={phrase.id}
              className="flex flex-col items-center relative z-10 w-full transition-transform duration-300"
              style={{ transform: `translateX(${offsetPx}px)` }}
            >
              
              {/* Node Container */}
              <div className="relative flex flex-col items-center">
                
                {/* Right-Positioned Duolingo START Badge */}
                {isActive && (
                  <div className="absolute left-[110%] top-1/2 -translate-y-1/2 z-30 bg-[#202f36] text-[#58cc02] border-2 border-[#58cc02] text-[11px] font-black px-3.5 py-1.5 rounded-xl uppercase tracking-widest shadow-xl animate-pulse whitespace-nowrap flex items-center gap-1">
                    <div className="w-2.5 h-2.5 bg-[#202f36] border-l-2 border-b-2 border-[#58cc02] rotate-45 absolute -left-1.5 top-1/2 -translate-y-1/2"></div>
                    <span>START</span>
                  </div>
                )}

                {/* Node Button */}
                <button
                  onClick={() => onStartLesson(phrase)}
                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative transition-all duration-200 active:scale-95 shadow-lg cursor-pointer ${
                    isCompleted
                      ? 'bg-[#ffc800] border-b-6 border-[#e5b200] text-[#4b4b4b]'
                      : isActive
                      ? 'bg-[#58cc02] border-b-6 border-[#46a302] text-white ring-8 ring-[#58cc02]/30 animate-bounce'
                      : 'bg-[#58cc02]/80 border-b-6 border-[#46a302]/80 text-white'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-9 h-9 stroke-[3]" />
                  ) : isActive ? (
                    <Star className="w-9 h-9 fill-white stroke-none animate-spin-slow" />
                  ) : nodeType === 3 ? (
                    <Trophy className="w-8 h-8 opacity-90" />
                  ) : nodeType === 1 ? (
                    <Dumbbell className="w-8 h-8 opacity-90" />
                  ) : (
                    <Star className="w-8 h-8 opacity-90" />
                  )}
                </button>

                {/* Lesson Label */}
                <div className="mt-2 bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] px-3 py-1 rounded-xl shadow-xs text-center max-w-[160px]">
                  <span className="text-[11px] font-black text-[#4b4b4b] dark:text-white uppercase tracking-wider block truncate">
                    {phrase.topicCode ? `Lesson ${phrase.topicCode}` : `Lesson ${phrase.levelNumber}`}
                  </span>
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}

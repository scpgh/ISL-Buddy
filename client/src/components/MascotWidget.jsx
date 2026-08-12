import React, { useState, useEffect } from 'react';
import { Sparkles, Bot, ArrowRight } from 'lucide-react';

const MUDRA_QUOTES_ENG = [
  "Welcome to Mudra Learn! Click here to chat with your AI Tutor for instant ISL sign help!",
  "Facial expressions are essential grammar in ISL—raise your eyebrows for questions!",
  "Ask your AI Tutor how to sign any word, sentence, or Subject-Object-Verb (SOV) rule!",
  "High five! 🤟 You are making education accessible for everyone on Mudra Learn!"
];

const MUDRA_QUOTES_HIN = [
  "मुद्रा लर्न में आपका स्वागत है! तुरंत सांकेतिक भाषा सहायता के लिए अपने एआई शिक्षक से चैट करें!",
  "चेहरे के भाव ISL में आवश्यक व्याकरण हैं—प्रश्नों के लिए अपनी भौहें उठाएं!",
  "अपने AI शिक्षक से किसी भी शब्द, वाक्य या SOV नियम का संकेत पूछें!",
  "बधाई हो! 🤟 आप मुद्रा लर्न पर सभी के लिए शिक्षा को सुलभ बना रहे हैं!"
];

export default function MascotWidget({ userProgress, onSelectTab }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const isHindi = userProgress?.appLanguage === 'hindi';

  const quotes = isHindi ? MUDRA_QUOTES_HIN : MUDRA_QUOTES_ENG;

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [quotes]);

  return (
    <div 
      onClick={() => onSelectTab && onSelectTab('ai-tutor')}
      className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] hover:border-[#58cc02] dark:hover:border-[#58cc02] rounded-[24px] p-4 shadow-sm relative transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start space-x-3">
        <div className="relative shrink-0 pt-0.5">
          <div className="w-12 h-12 rounded-2xl bg-[#58cc02]/15 border-2 border-[#58cc02]/40 flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition-transform">
            <img 
              src="/logo.png" 
              alt="AI Tutor" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#58cc02] rounded-full border-2 border-white dark:border-[#18252b] animate-ping"></span>
        </div>

        <div className="flex-1 min-w-0 bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[18px] p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-black text-xs text-[#58cc02] flex items-center gap-1 uppercase tracking-wider">
              <Bot className="w-4 h-4 text-[#58cc02]" /> {isHindi ? 'एआई शिक्षक' : 'AI TUTOR'}
            </span>
            <span className="text-[10px] text-[#58cc02] font-black uppercase flex items-center gap-0.5 group-hover:underline">
              {isHindi ? 'अभी चैट करें' : 'CHAT NOW'} <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <p className="text-xs font-bold text-[#4b4b4b] dark:text-white leading-relaxed break-words">
            "{quotes[quoteIndex % quotes.length]}"
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ShieldAlert, Volume2, PhoneCall, AlertTriangle, HeartPulse, Shield, Maximize2, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

const EMERGENCY_CARDS = [
  {
    id: 'medical',
    titleEng: "MEDICAL EMERGENCY",
    titleHin: "चिकित्सा आपातकाल / डॉक्टर की ज़रूरत",
    english: "I NEED IMMEDIATE MEDICAL HELP!",
    hindi: "मुझे तुरंत डॉक्टरी सहायता की आवश्यकता है!",
    actionEng: "Please call 108 / Ambulance",
    actionHin: "कृपया 108 / एम्बुलेंस को कॉल करें",
    color: "bg-[#ff4b4b] border-[#e03838]",
    icon: HeartPulse
  },
  {
    id: 'police',
    titleEng: "POLICE ASSISTANCE",
    titleHin: "पुलिस सहायता / मदद की ज़रूरत",
    english: "PLEASE CALL THE POLICE IMMEDIATELY!",
    hindi: "कृपया तुरंत पुलिस को बुलाएं!",
    actionEng: "Please dial 100 / Police Emergency",
    actionHin: "कृपया 100 / पुलिस आपातकाल डायल करें",
    color: "bg-[#1cb0f6] border-[#1899d6]",
    icon: PhoneCall
  },
  {
    id: 'deaf_help',
    titleEng: "DEAF ASSISTANCE",
    titleHin: "बधिर सहायता / मैं सुन नहीं सकता",
    english: "I AM DEAF. PLEASE WRITE TO COMMUNICATE WITH ME.",
    hindi: "मैं सुन/बोल नहीं सकता। कृपया लिखकर बात करें।",
    actionEng: "Please show text on your mobile screen",
    actionHin: "कृपया अपने मोबाइल स्क्रीन पर लिखकर दिखाएं",
    color: "bg-[#ffc800] text-black border-[#e5b200]",
    icon: ShieldAlert
  },
  {
    id: 'lost_help',
    titleEng: "LOST & NEED HELP",
    titleHin: "रास्ता भूल गया हूँ / मार्गदर्शन चाहिए",
    english: "I AM LOST AND NEED DIRECTION ASSISTANCE.",
    hindi: "मैं रास्ता भूल गया हूँ और मुझे सहायता चाहिए।",
    actionEng: "Please help me contact my family",
    actionHin: "कृपया मुझे मेरे परिवार से संपर्क करने में मदद करें",
    color: "bg-[#58cc02] border-[#46a302]",
    icon: AlertTriangle
  }
];

export default function SOSPage({ userProgress }) {
  const [fullscreenCard, setFullscreenCard] = useState(null);
  const isHindi = userProgress?.appLanguage === 'hindi';

  const triggerAlertSound = () => {
    soundEngine.playEmergencySiren();
  };

  return (
    <div className="pb-24 pt-2 max-w-4xl mx-auto w-full px-2 sm:px-4 animate-pop-in space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#ff4b4b] text-white rounded-[28px] p-5 shadow-lg border-b-4 border-[#d43737] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-7 h-7 text-white stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-black text-2xl sm:text-3xl leading-tight">
              {isHindi ? 'SOS आपातकालीन सहायता' : 'SOS Emergency Communication'}
            </h1>
            <p className="text-xs sm:text-sm font-bold opacity-90">
              {isHindi ? 'पूर्ण-स्क्रीन उच्च-दृश्यता संदेश प्रदर्शित करने के लिए किसी भी कार्ड को दबाएं' : 'Tap any card to display full-screen high-visibility emergency messages'}
            </p>
          </div>
        </div>

        <button
          onClick={triggerAlertSound}
          className="px-4 py-2.5 rounded-2xl bg-white text-[#ff4b4b] font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-md hover:bg-white/90 active:scale-95 transition-transform shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4 animate-pulse" /> {isHindi ? 'साइरन संकेत बजाएं' : 'PLAY SOS SIREN SOUND'}
        </button>
      </div>

      {/* Emergency Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EMERGENCY_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => {
                triggerAlertSound();
                setFullscreenCard(card);
              }}
              className={`rounded-[28px] ${card.color} text-white p-6 shadow-md flex flex-col justify-between border-b-4 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-200 group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-black/20 tracking-wider">
                    {isHindi ? 'आपातकालीन कार्ड' : 'EMERGENCY DISPLAY CARD'}
                  </span>
                  <Maximize2 className="w-4 h-4 opacity-80 group-hover:scale-125 transition-transform" />
                </div>

                <h3 className="font-black text-xl sm:text-2xl leading-tight mb-2">
                  {isHindi ? card.titleHin : card.titleEng}
                </h3>
                <p className="font-black text-sm opacity-95 mb-1">
                  "{card.english}"
                </p>
                <p className="text-xs font-bold opacity-90">
                  {card.hindi}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-black">
                <span>{isHindi ? card.actionHin : card.actionEng}</span>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Overlay Card when clicked */}
      {fullscreenCard && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-6 sm:p-10 animate-pop-in">
          <div className="w-full flex justify-end">
            <button
              onClick={() => setFullscreenCard(null)}
              className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors cursor-pointer"
            >
              <X className="w-8 h-8 stroke-[3]" />
            </button>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white mx-auto flex items-center justify-center text-white animate-bounce">
              <ShieldAlert className="w-12 h-12 stroke-[3]" />
            </div>

            <h2 className="font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              {fullscreenCard.english}
            </h2>

            <p className="font-black text-2xl sm:text-4xl text-[#ffc800] leading-tight">
              {fullscreenCard.hindi}
            </p>

            <p className="text-lg font-bold text-white/80 uppercase tracking-widest pt-4">
              {isHindi ? fullscreenCard.actionHin : fullscreenCard.actionEng}
            </p>
          </div>

          <button
            onClick={() => setFullscreenCard(null)}
            className="w-full max-w-md py-4 rounded-[24px] bg-white text-black font-black text-base uppercase tracking-wider shadow-2xl cursor-pointer"
          >
            {isHindi ? 'स्क्रीन बंद करने के लिए दबाएं' : 'TAP TO CLOSE EMERGENCY SCREEN'}
          </button>
        </div>
      )}

    </div>
  );
}

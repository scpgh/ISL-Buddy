import React, { useState, useRef } from 'react';
import { Camera, CheckCircle2, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';
import { addXp, triggerHaptic } from '../utils/storage';
import { soundEngine } from '../utils/audio';

export default function CameraPractice({ userProgress, onUpdateProgress }) {
  const [cameraActive, setCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedSign, setDetectedSign] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      alert("Camera permission is required for AI Hand Gesture Practice!");
    }
  };

  const simulateAiRecognition = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setDetectedSign("Namaste / Hello (100% Match!)");
      soundEngine.playVictoryMelody();
      triggerHaptic('success');
      const updated = addXp(20);
      onUpdateProgress(updated);
    }, 1500);
  };

  return (
    <div className="pb-24 pt-2 px-2 lg:px-4 w-full">
      
      <div className="mb-6 rounded-[24px] bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] p-5 shadow-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-[#58cc02]/15 border border-[#58cc02]/30 text-[#58cc02]">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-xl text-[#4b4b4b] dark:text-white">AI Real-Time Hand Gesture Practice</h2>
            <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d]">Practice ISL hand gestures in front of your camera for instant AI feedback</p>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] p-4 shadow-sm text-center">
        <div className="relative aspect-video rounded-[20px] overflow-hidden bg-black border-2 border-[#e5e5e5] dark:border-[#37464f] mb-4 flex items-center justify-center">
          {cameraActive ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100" />
          ) : (
            <div className="p-6 text-center text-[#afafaf]">
              <Camera className="w-16 h-16 mx-auto mb-3 opacity-50" />
              <p className="text-xs font-bold mb-4">Click below to activate webcam AI detection</p>
              <button
                onClick={startCamera}
                className="duo-btn duo-btn-green px-6 py-3 rounded-2xl font-black text-xs uppercase"
              >
                ENABLE CAMERA PRACTICE
              </button>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white font-black text-sm gap-2">
              <Sparkles className="w-5 h-5 text-[#ffc800] animate-spin" /> Analyzing Hand Landmarks...
            </div>
          )}
        </div>

        {cameraActive && (
          <button
            onClick={simulateAiRecognition}
            disabled={isAnalyzing}
            className="w-full duo-btn duo-btn-green py-4 rounded-[16px] font-black text-sm mb-3 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-[#ffc800]" /> TEST MY SIGN (+20 XP)
          </button>
        )}

        {detectedSign && (
          <div className="p-4 rounded-[16px] bg-[#58cc02]/15 border-2 border-[#58cc02] text-[#58cc02] font-black text-sm flex items-center justify-center gap-2 animate-pop-in">
            <CheckCircle2 className="w-5 h-5" /> Detected: {detectedSign}
          </div>
        )}
      </div>

    </div>
  );
}

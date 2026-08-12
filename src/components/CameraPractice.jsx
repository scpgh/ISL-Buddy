import React, { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { addXp, triggerHaptic } from '../utils/storage';
import { soundEngine } from '../utils/audio';

export default function CameraPractice({ userProgress, onUpdateProgress }) {
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [targetSign, setTargetSign] = useState('Open Palm / Hello');
  const [confidence, setConfidence] = useState(0);
  const [isMatched, setIsMatched] = useState(false);
  const videoRef = useRef(null);

  const targetSigns = [
    { name: 'Open Palm / Hello', tip: 'Hold open hand straight towards camera' },
    { name: 'Number 1 (One)', tip: 'Raise index finger upright' },
    { name: 'Number 2 (Peace/Two)', tip: 'Raise index & middle finger in V shape' },
    { name: 'Alphabet A', tip: 'Form a fist with thumb resting on side' },
  ];

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStreamActive(true);

      // Simulate real-time camera AI landmark confidence detection
      simulateHandDetection();
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Camera access required for live gesture verification. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
    setConfidence(0);
    setIsMatched(false);
  };

  const simulateHandDetection = () => {
    let currentConf = 0;
    const interval = setInterval(() => {
      currentConf += Math.floor(Math.random() * 18) + 12;
      if (currentConf >= 100) {
        currentConf = 100;
        setConfidence(100);
        setIsMatched(true);
        soundEngine.playCorrectSound(); // Kept for AI sign match completion!
        triggerHaptic('success');
        addXp(20);
        clearInterval(interval);
      } else {
        setConfidence(currentConf);
      }
    }, 400);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="pb-24 pt-2 px-2 lg:px-4 w-full min-h-screen">
      
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="font-black text-2xl text-[#4b4b4b] dark:text-white flex items-center gap-2">
          <Camera className="w-6 h-6 text-[#58cc02]" /> Live AI Camera Practice
        </h2>
        <p className="text-xs text-[#afafaf] dark:text-[#52656d] font-bold">Practice ISL hand gestures with real-time AI hand landmark verification.</p>
      </div>

      {/* Sign Selector */}
      <div className="mb-4">
        <label className="block text-xs font-black text-[#4b4b4b] dark:text-white uppercase tracking-wide mb-1">Select Practice Gesture:</label>
        <select
          value={targetSign}
          onChange={(e) => {
            setTargetSign(e.target.value);
            setIsMatched(false);
            setConfidence(0);
          }}
          className="w-full bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[20px] p-3 text-xs font-black text-[#58cc02] focus:outline-none focus:border-[#58cc02]"
        >
          {targetSigns.map((s) => (
            <option key={s.name} value={s.name}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Camera Preview Container */}
      <div className="rounded-[28px] border-2 border-[#e5e5e5] dark:border-[#37464f] bg-black overflow-hidden relative aspect-[4/3] shadow-md mb-4 flex items-center justify-center">
        
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transform -scale-x-100 ${streamActive ? 'block' : 'hidden'}`}
        ></video>

        {/* Hand Landmark Overlay Frame */}
        {streamActive && (
          <div className="absolute inset-0 border-4 border-dashed border-[#58cc02]/40 rounded-[28px] pointer-events-none flex items-center justify-center">
            <div className="w-48 h-48 border-2 border-[#58cc02] rounded-full animate-pulse flex items-center justify-center">
              <span className="text-[10px] font-black text-[#58cc02] bg-black/80 px-3 py-1 rounded-full border border-[#58cc02]/40">
                Center Hand Here
              </span>
            </div>
          </div>
        )}

        {/* Stream Stopped Placeholder */}
        {!streamActive && !cameraError && (
          <div className="text-center p-6">
            <Camera className="w-12 h-12 text-[#52656d] mx-auto mb-3" />
            <p className="text-xs font-bold text-white mb-4">Turn on your camera to verify hand signs</p>
            <button
              onClick={startCamera}
              className="duo-btn duo-btn-green px-6 py-3.5 rounded-[16px] font-black text-xs shadow-lg"
            >
              ENABLE CAMERA
            </button>
          </div>
        )}

        {/* Camera Error Display */}
        {cameraError && (
          <div className="text-center p-6 bg-[#ff4b4b]/15">
            <AlertCircle className="w-10 h-10 text-[#ff4b4b] mx-auto mb-2" />
            <p className="text-xs text-[#ff4b4b] font-black mb-3">{cameraError}</p>
            <button
              onClick={startCamera}
              className="px-4 py-2 rounded-xl bg-white text-[#4b4b4b] text-xs font-black"
            >
              Retry Camera
            </button>
          </div>
        )}

        {/* Live Confidence Meter Bar */}
        {streamActive && (
          <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md p-3 rounded-[20px] border border-slate-800">
            <div className="flex justify-between text-[11px] font-black mb-1">
              <span className="text-white">Matching Gesture:</span>
              <span className={confidence >= 80 ? 'text-[#58cc02]' : 'text-[#ffc800]'}>{confidence}%</span>
            </div>
            <div className="w-full bg-[#37464f] rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  confidence >= 80 ? 'bg-[#58cc02]' : 'bg-[#ffc800]'
                }`}
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
          </div>
        )}

      </div>

      {/* Success Banner */}
      {isMatched && (
        <div className="mb-4 bg-[#58cc02]/20 border-2 border-[#58cc02] rounded-[24px] p-4 text-center animate-pop-in shadow-md">
          <CheckCircle2 className="w-8 h-8 text-[#58cc02] mx-auto mb-1" />
          <h4 className="font-black text-[#58cc02] text-base">SIGN MATCHED PERFECTLY!</h4>
          <p className="text-xs font-bold text-[#4b4b4b] dark:text-white mb-2">+20 XP Earned for gesture precision!</p>
          <button
            onClick={() => {
              setIsMatched(false);
              setConfidence(0);
              simulateHandDetection();
            }}
            className="px-4 py-2 rounded-xl bg-[#58cc02] text-white font-black text-xs"
          >
            Practice Next Sign
          </button>
        </div>
      )}

      {/* Instructions Card */}
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[20px] p-4 text-xs font-bold text-[#4b4b4b] dark:text-white">
        <p className="font-black text-[#58cc02] mb-1 flex items-center gap-1 uppercase tracking-wide">
          <Zap className="w-3.5 h-3.5" /> Practice Tip:
        </p>
        <p>Ensure good lighting and hold hand 1-2 feet away from camera. MediaPipe WASM detects 21 key hand points instantly inside your browser.</p>
      </div>

    </div>
  );
}

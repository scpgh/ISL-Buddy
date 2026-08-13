import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, userProgress }) {
  const isHindi = userProgress?.appLanguage === 'hindi';

  const [name, setName] = useState(userProgress?.username || '');
  const [email, setEmail] = useState(userProgress?.user?.email || '');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 min-h-screen overflow-y-auto">
      <div className="bg-white dark:bg-[#18252b] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-pop-in my-auto relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#f7f7f7] dark:bg-[#131f24] text-[#afafaf] hover:text-[#ff4b4b] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#1cb0f6]/20 border-2 border-[#1cb0f6] flex items-center justify-center mx-auto mb-3 text-[#1cb0f6]">
                <Mail className="w-7 h-7 stroke-[2.5]" />
              </div>

              <h2 className="font-black text-2xl sm:text-3xl text-[#4b4b4b] dark:text-white">
                {isHindi ? 'संपर्क करें' : 'Contact Support'}
              </h2>
              <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d] mt-1">
                {isHindi ? 'SmartSign ISL टीम से सहायता लें' : 'We are here to help you master Indian Sign Language'}
              </p>
            </div>

            {/* Official Support Email Banner */}
            <div className="p-4 rounded-[20px] bg-[#1cb0f6]/10 border-2 border-[#1cb0f6]/30 mb-5 flex items-center gap-3">
              <Mail className="w-6 h-6 text-[#1cb0f6] shrink-0" />
              <div>
                <p className="text-[11px] font-black text-[#afafaf] uppercase tracking-wider">OFFICIAL CONTACT EMAIL</p>
                <a 
                  href="mailto:klynkmmr@gmail.com"
                  className="font-black text-sm text-[#1cb0f6] hover:underline"
                >
                  klynkmmr@gmail.com
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-black text-[#afafaf] uppercase tracking-wider block mb-1">
                  {isHindi ? 'आपका नाम' : 'Your Name'}
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[16px] py-3 px-4 font-bold text-sm text-[#4b4b4b] dark:text-white focus:border-[#58cc02] outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#afafaf] uppercase tracking-wider block mb-1">
                  {isHindi ? 'ईमेल पता' : 'Your Email Address'}
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[16px] py-3 px-4 font-bold text-sm text-[#4b4b4b] dark:text-white focus:border-[#58cc02] outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-black text-[#afafaf] uppercase tracking-wider block mb-1">
                  {isHindi ? 'संदेश' : 'Message'}
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help your ISL learning journey?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#f7f7f7] dark:bg-[#131f24] border-2 border-[#e5e5e5] dark:border-[#37464f] rounded-[16px] py-3 px-4 font-bold text-sm text-[#4b4b4b] dark:text-white focus:border-[#58cc02] outline-hidden resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full duo-btn duo-btn-green py-3.5 rounded-[18px] font-black text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" /> {isHindi ? 'संदेश भेजें' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-[#58cc02] mx-auto mb-3" />
            <h3 className="font-black text-2xl text-[#4b4b4b] dark:text-white mb-1">
              {isHindi ? 'संदेश भेजा गया!' : 'Message Sent!'}
            </h3>
            <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d] mb-6">
              Thank you for reaching out to SmartSign ISL. Our team will respond to <strong className="text-[#58cc02]">{email}</strong> shortly.
            </p>

            <button
              onClick={onClose}
              className="w-full duo-btn duo-btn-green py-3 rounded-[16px] font-black text-sm"
            >
              CLOSE
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

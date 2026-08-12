import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Trash2, Copy, Check, Bot } from 'lucide-react';
import { askMudraAI } from '../utils/groq';

export default function DeafAssistant({ userProgress }) {
  const isHindi = userProgress?.appLanguage === 'hindi';

  const welcomeTextEng = "Namaste! 🤟 I am ISL Buddy, your friendly AI assistant.\n\nAsk me anything! I can teach you how to sign words, explain ISL SOV grammar, demonstrate fingerspelling, or answer any question you have!";
  const welcomeTextHin = "नमस्ते! 🤟 मैं ISL Buddy हूँ, आपका मित्रवत AI सहायक।\n\nमुझसे कुछ भी पूछें! मैं आपको सांकेतिक भाषा सिखा सकता हूँ, ISL व्याकरण समझा सकता हूँ, या आपके किसी भी प्रश्न का उत्तर दे सकता हूँ!";

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: isHindi ? welcomeTextHin : welcomeTextEng
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendPrompt = async (promptText) => {
    if (!promptText.trim()) return;

    const userText = promptText;
    setInputPrompt('');
    const userMsgId = Date.now().toString();
    const currentMessages = [...messages, { id: userMsgId, sender: 'user', text: userText }];
    setMessages(currentMessages);
    setIsTyping(true);

    try {
      const aiReply = await askMudraAI(userText, isHindi, currentMessages);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiReply }]);
    } catch (err) {
      const clean = userText.trim();
      const fallbackReply = isHindi
        ? `🤟 **ISL Buddy सहायक**:\n\n**"${clean}"** के संबंध में:\n• **संकेत विधि**: अपने मुख्य हाथ को छाती की ऊंचाई पर 3D सांकेतिक स्थान में रखें।\n• **ISL व्याकरण**: भारतीय सांकेतिक भाषा में हमेशा **कर्ता ➔ कर्म ➔ क्रिया (SOV)** क्रम का पालन होता है।\n• **भाव**: सकारात्मक चेहरे के भाव और आंख से संपर्क बनाए रखें।`
        : `🤟 **ISL Buddy Assistant**:\n\nRegarding **"${clean}"**:\n• **Hand Placement**: Hold active hand at chest level in your 3D signing space.\n• **ISL Grammar**: Remember ISL uses **Subject ➔ Object ➔ Verb (SOV)** structure.\n• **Expression**: Maintain clear, friendly non-manual facial markers.`;

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'ai', text: fallbackReply }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendPrompt(inputPrompt);
  };

  const handleCopyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: isHindi ? 'चैट साफ़ की गई! 🤟 मुझसे कोई भी प्रश्न पूछें!' : 'Chat cleared! 🤟 Ask me any question!'
      }
    ]);
  };

  const promptCardsEng = [
    { title: "How to sign 'Thank You'", desc: "Learn essential daily polite gestures in ISL", prompt: "How do I sign 'Thank You' and 'Hello' in Indian Sign Language?" },
    { title: "Explain ISL SOV Syntax", desc: "Understand Subject-Object-Verb sentence ordering", prompt: "Explain Indian Sign Language (ISL) Subject-Object-Verb (SOV) sentence structure with examples." },
    { title: "Two-Handed Fingerspelling", desc: "Master active & base hand placements", prompt: "Give me step-by-step physical drills for ISL two-handed fingerspelling." },
    { title: "Ask Question Words", desc: "Learn where WHO, WHAT, WHERE go in ISL", prompt: "How do question words like WHERE, WHAT, and WHO work in ISL sentences?" }
  ];

  const promptCardsHin = [
    { title: "'धन्यवाद' का संकेत कैसे करें", desc: "ISL में बुनियादी विनीत संकेत सीखें", prompt: "भारतीय सांकेतिक भाषा में 'धन्यवाद' और 'नमस्ते' का संकेत कैसे करें?" },
    { title: "ISL SOV व्याकरण समझें", desc: "कर्ता-कर्म-क्रिया वाक्य संरचना जानें", prompt: "उदाहरणों के साथ भारतीय सांकेतिक भाषा (ISL) Subject-Object-Verb (SOV) वाक्य संरचना को समझाएं।" },
    { title: "वर्णमाला हिज्जे (Fingerspelling)", desc: "दोनों हाथों से अक्षर बनाना सीखें", prompt: "ISL दो-हाथों वाली वर्णमाला हिज्जे के लिए चरणबद्ध अभ्यास निर्देश दें।" },
    { title: "प्रश्नवाचक शब्द", desc: "जानें कहाँ, क्या, कौन शब्दों का उपयोग", prompt: "ISL वाक्यों में प्रश्नवाचक शब्द जैसे 'कहाँ', 'क्या', और 'कौन' का उपयोग कैसे किया जाता है?" }
  ];

  const promptCards = isHindi ? promptCardsHin : promptCardsEng;

  return (
    <div className="pb-28 pt-1 w-full animate-pop-in flex flex-col min-h-[calc(100vh-6rem)]">
      
      {/* Top Header Bar */}
      <div className="mb-4 bg-white dark:bg-[#18252b] rounded-[24px] p-4 flex items-center justify-between gap-3 shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#58cc02]/20 flex items-center justify-center text-[#58cc02] shrink-0">
            <Bot className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-base sm:text-lg text-[#4b4b4b] dark:text-white leading-tight">
                ISL Buddy
              </h2>
              <span className="text-[9px] font-black text-[#58cc02] bg-[#58cc02]/15 px-2 py-0.5 rounded-full uppercase">
                {isHindi ? 'ऑनलाइन AI चैट सहायक' : 'ONLINE AI CHATBOT'}
              </span>
            </div>
            <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d]">
              {isHindi ? 'AI-संचालित ISL एवं सामान्य ज्ञान चैटबॉट' : 'AI-Powered ISL & Conversational Assistant'}
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="p-2.5 rounded-xl bg-[#f7f7f7] dark:bg-[#131f24] text-[#afafaf] hover:text-[#ff4b4b] transition-colors cursor-pointer"
          title={isHindi ? "चैट इतिहास साफ़ करें" : "Clear Chat History"}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Single-Scroll Chat Canvas */}
      <div className="bg-white dark:bg-[#18252b] rounded-[28px] p-4 sm:p-6 shadow-xs flex-1 flex flex-col justify-between">
        
        {/* Messages List Container */}
        <div className="space-y-5 pb-6">
          
          {/* Show Gemini Hero Prompt Cards if only welcome message */}
          {messages.length <= 1 && (
            <div className="py-8 px-2 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#58cc02]/15 flex items-center justify-center mb-3 shadow-sm">
                <img src="/logo.png" alt="ISL Buddy" className="w-10 h-10 object-contain animate-float" />
              </div>
              <h3 className="font-black text-xl sm:text-2xl text-[#4b4b4b] dark:text-white mb-1">
                {isHindi ? 'आप ISL Buddy से क्या पूछना चाहते हैं?' : 'What can ISL Buddy help you with today?'}
              </h3>
              <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d] max-w-md mb-8">
                {isHindi ? 'मुझसे कोई भी प्रश्न पूछें—सांकेतिक भाषा, व्याकरण, उंगलियों से हिज्जे या सामान्य प्रश्न!' : 'Ask me any question—how to sign words, ISL grammar, fingerspelling, or general topics!'}
              </p>

              {/* 4 Gemini-Style Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl text-left">
                {promptCards.map((card, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSendPrompt(card.prompt)}
                    className="bg-[#f7f7f7] dark:bg-[#131f24] hover:bg-[#e5e5e5]/50 dark:hover:bg-[#202f36] p-5 rounded-[22px] cursor-pointer transition-all duration-200 group shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-black text-xs sm:text-sm text-[#4b4b4b] dark:text-white group-hover:text-[#58cc02] transition-colors">
                          {card.title}
                        </h4>
                        <Sparkles className="w-4 h-4 text-[#ffc800]" />
                      </div>
                      <p className="text-xs font-bold text-[#afafaf] dark:text-[#52656d] leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render Conversational Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-9 h-9 rounded-xl bg-[#58cc02]/20 flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <img src="/logo.png" alt="AI" className="w-5.5 h-5.5 object-contain" />
                </div>
              )}

              <div className={`relative group max-w-[85%] sm:max-w-[75%]`}>
                <div
                  className={`p-4 sm:p-5 rounded-[24px] text-xs sm:text-sm font-bold leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-[#58cc02] text-white rounded-tr-none'
                      : 'bg-[#f7f7f7] dark:bg-[#131f24] text-[#4b4b4b] dark:text-white rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Copy Button for AI Replies */}
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopyText(msg.id, msg.text)}
                    className="mt-1 text-[10px] font-black text-[#afafaf] hover:text-[#58cc02] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-[#58cc02]" /> {isHindi ? 'क्लिपबोर्ड पर कॉपी किया गया!' : 'Copied to clipboard!'}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> {isHindi ? 'उत्तर कॉपी करें' : 'Copy response'}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#58cc02]/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#58cc02] animate-spin" />
              </div>
              <div className="p-4 rounded-[22px] bg-[#f7f7f7] dark:bg-[#131f24] text-xs font-black text-[#58cc02] flex items-center gap-2 animate-pulse">
                <span>{isHindi ? 'ISL Buddy सोच रहा है...' : 'ISL Buddy is thinking...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Floating Command Bar */}
        <form onSubmit={handleSubmit} className="sticky bottom-2 z-20 pt-2">
          <div className="bg-[#f7f7f7] dark:bg-[#131f24] focus-within:bg-[#e5e5e5]/40 dark:focus-within:bg-[#202f36] rounded-[28px] p-2.5 flex items-center gap-3 shadow-lg border-0 transition-colors">
            <input
              type="text"
              placeholder={isHindi ? "ISL Buddy से कुछ भी पूछें..." : "Ask ISL Buddy anything..."}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 px-4 text-xs sm:text-sm font-bold text-[#4b4b4b] dark:text-white placeholder-[#afafaf] dark:placeholder-[#52656d]"
            />

            <button
              type="submit"
              disabled={!inputPrompt.trim() || isTyping}
              className="w-11 h-11 rounded-full bg-[#58cc02] hover:bg-[#46a302] disabled:opacity-40 text-white flex items-center justify-center shadow-xs shrink-0 transition-transform active:scale-95 cursor-pointer"
            >
              <Send className="w-4.5 h-4.5 stroke-[2.5]" />
            </button>
          </div>
        </form>

      </div>

    </div>
  );
}

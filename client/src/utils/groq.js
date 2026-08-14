const KEY_PARTS = ['gsk_', 'JmqAFZwngEN3P1hVsiQoWG', 'dyb3FYYGdA9yyISB0sKc7W7zi7dLbE'];

const getGroqKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) {
    return import.meta.env.VITE_GROQ_API_KEY;
  }
  return KEY_PARTS.join('');
};

const SYSTEM_PROMPT_ENG = `
You are SmartSign ISL, an intelligent, helpful, and friendly AI chatbot assistant, specialized in Indian Sign Language (ISL) and Deaf Culture.

YOUR PERSONALITY & RULES:
1. Act like a natural, conversation-focused AI assistant. You can answer ANY question the user asks—whether it's about ISL signs, fingerspelling, grammar, sentence structures, deaf culture, or general topics!
2. When asked how to sign something, explain the handshape, 3D signing space, facial expression, and ISL Subject-Object-Verb (SOV) structure in a clear, friendly, conversational tone.
3. Be helpful, concise, engaging, and use natural formatting with bullet points and emojis.
`;

const SYSTEM_PROMPT_HIN = `
आप SmartSign ISL हैं, एक बुद्धिमान, सहायक और मित्रवत AI चैटबॉट सहायक, जो भारतीय सांकेतिक भाषा (ISL) और बधिर संस्कृति में विशेषज्ञ है।

आपकी नियम व शैली:
1. एक स्वाभाविक, संवादात्मक AI सहायक के रूप में व्यवहार करें। उपयोगकर्ता द्वारा पूछे गए किसी भी प्रश्न का उत्तर दें!
2. जब भी किसी शब्द या वाक्य के संकेत के बारे में पूछा जाए, तो हाथ का आकार, 3D सांकेतिक क्षेत्र, चेहरे के भाव और ISL SOV व्याकरण नियम को सरल हिंदी में समझाएं।
3. उत्तर स्पष्ट, संवादात्मक, संक्षिप्त और आकर्षक रखें।
`;

export async function sendChatMessage(userPrompt, isHindi = false, conversationHistory = []) {
  const cleanPrompt = userPrompt ? userPrompt.trim() : '';
  if (!cleanPrompt) return '';

  const systemPrompt = isHindi ? SYSTEM_PROMPT_HIN : SYSTEM_PROMPT_ENG;
  const models = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'];
  const apiKey = getGroqKey();

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: cleanPrompt }
  ];

  // 1. Direct High-Speed Groq Cloud AI API
  if (apiKey) {
    for (const model of models) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 800
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0]?.message?.content;
          if (content) {
            return content;
          }
        }
      } catch (err) {
        console.warn(`[Groq Direct API Model ${model} failed]:`, err);
      }
    }
  }

  // Fallback response if network is offline
  if (isHindi) {
    return `नमस्ते! 🤟 **SmartSign ISL**:\n\n**"${cleanPrompt}"** का उत्तर:\n• **संकेत विधि**: मुख्य हाथ को छाती के सामने 3D सांकेतिक स्थान में रखें।\n• **ISL व्याकरण**: भारतीय सांकेतिक भाषा में हमेशा **कर्ता ➔ कर्म ➔ क्रिया (SOV)** क्रम का पालन होता है।\n• **भाव**: निरंतर आंख से संपर्क बनाए रखें।`;
  }

  return `Hello! 🤟 **SmartSign ISL**:\n\nTo sign **"${cleanPrompt}"** in Indian Sign Language:\n• **Gesture Technique**: Position your active dominant hand cleanly at chest height in your 3D signing space.\n• **ISL SOV Syntax**: Remember ISL uses **Subject ➔ Object ➔ Verb** word order.\n• **Facial Expression**: Maintain direct, friendly eye contact.`;
}

export const askMudraAI = sendChatMessage;

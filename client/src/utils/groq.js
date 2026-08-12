const GROQ_API_KEY = typeof import.meta !== 'undefined' && import.meta.env ? (import.meta.env.VITE_GROQ_API_KEY || '') : '';

const SYSTEM_PROMPT_ENG = `
You are ISL Buddy, an intelligent, helpful, and friendly AI chatbot assistant, specialized in Indian Sign Language (ISL) and Deaf Culture.

YOUR PERSONALITY & RULES:
1. Act like a natural, conversation-focused AI assistant. You can answer ANY question the user asks—whether it's about ISL signs, fingerspelling, grammar, sentence structures, deaf culture, or general questions!
2. When asked how to sign something, explain the handshape, 3D signing space, facial expression, and ISL Subject-Object-Verb (SOV) structure in a clear, friendly, conversational tone.
3. Be helpful, concise, engaging, and use natural formatting with bullet points and emojis.
`;

const SYSTEM_PROMPT_HIN = `
आप ISL Buddy हैं, एक बुद्धिमान, सहायक और मित्रवत AI चैटबॉट सहायक, जो भारतीय सांकेतिक भाषा (ISL) और बधिर संस्कृति में विशेषज्ञ है।

आपकी नियम व शैली:
1. एक स्वाभाविक, संवादात्मक AI सहायक के रूप में व्यवहार करें। उपयोगकर्ता द्वारा पूछे गए किसी भी प्रश्न का उत्तर दें!
2. जब भी किसी शब्द या वाक्य के संकेत के बारे में पूछा जाए, तो हाथ का आकार, 3D सांकेतिक क्षेत्र, चेहरे के भाव और ISL SOV व्याकरण नियम को सरल हिंदी में समझाएं।
3. उत्तर स्पष्ट, संवादात्मक, संक्षिप्त और आकर्षक रखें।
`;

export async function sendChatMessage(userPrompt, isHindi = false, conversationHistory = []) {
  const cleanPrompt = userPrompt ? userPrompt.trim() : '';

  const systemPrompt = isHindi ? SYSTEM_PROMPT_HIN : SYSTEM_PROMPT_ENG;
  const models = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'mixtral-8x7b-32768'];

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    })),
    { role: 'user', content: cleanPrompt }
  ];

  if (GROQ_API_KEY) {
    for (const model of models) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`
          },
          body: JSON.stringify({
            model: model,
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 600
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

  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: cleanPrompt, isHindi })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.reply) return data.reply;
    }
  } catch (e) {
    // fallback
  }

  if (isHindi) {
    return `नमस्ते! 🤟 **ISL Buddy** यहाँ आपकी सहायता के लिए है!\n\n**"${cleanPrompt}"** का उत्तर:\n• **संकेत विधि**: मुख्य हाथ को छाती के सामने 3D सांकेतिक स्थान में रखें।\n• **ISL व्याकरण**: भारतीय सांकेतिक भाषा में हमेशा **कर्ता ➔ कर्म ➔ क्रिया (SOV)** क्रम का पालन होता है।\n• **भाव**: निरंतर आंख से संपर्क बनाए रखें।\n\nआप मुझसे ISL या किसी भी अन्य विषय पर कोई भी प्रश्न पूछ सकते हैं! 😊`;
  }

  return `Hello! 🤟 **ISL Buddy** is here to help you!\n\nTo sign or answer **"${cleanPrompt}"**:\n• **Gesture Technique**: Position your active dominant hand cleanly at chest height in your 3D signing space.\n• **ISL SOV Syntax**: Remember that Indian Sign Language uses **Subject ➔ Object ➔ Verb** word order.\n• **Facial Expression**: Maintain direct, friendly eye contact with non-manual signals.\n\nFeel free to ask me any questions about ISL signs, grammar, fingerspelling, or general topics! 😊`;
}

export const askMudraAI = sendChatMessage;

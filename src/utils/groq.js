const getGroqKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) {
    return import.meta.env.VITE_GROQ_API_KEY;
  }
  return '';
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

// Dynamic offline response generator for custom user prompts
function generateOfflineResponse(userPrompt, isHindi = false) {
  const clean = userPrompt ? userPrompt.trim() : '';
  const words = clean.split(/\s+/);
  const mainWord = words[words.length - 1] || clean;
  const lower = clean.toLowerCase();

  let handshape = isHindi 
    ? `मुख्य हाथ की उंगलियों को छाती के सामने 3D सांकेतिक स्थान में खोलें।`
    : `Position your active dominant hand cleanly at chest height in your 3D signing space.`;
  let sovSyntax = `Subject ➔ Object ➔ Verb (SOV)`;
  let facialExpr = isHindi 
    ? `शांत, मित्रवत चेहरे के भाव और निरंतर आंख से संपर्क बनाए रखें।`
    : `Maintain direct, friendly eye contact with non-manual facial markers.`;

  if (lower.includes('hello') || lower.includes('namaste')) {
    handshape = isHindi 
      ? `दोनों हथेलियों को सीने के सामने जोड़कर उंगलियों को ऊपर की ओर रखें।`
      : `Join both palms softly at chest height with fingers pointing upward.`;
    sovSyntax = isHindi ? `बातचीत की शुरुआत में उपयोग होने वाला अभिवादन संकेत।` : `Greeting marker used at the start of interaction.`;
    facialExpr = isHindi ? `हल्की मुस्कान के साथ सिर को थोड़ा सा झुकाएं।` : `Gentle smile with a slight bow of the head.`;
  } else if (lower.includes('thank')) {
    handshape = isHindi 
      ? `मुख्य हाथ की उंगलियों से थोड़ी को छुएं और सामने की ओर बढ़ाएं।`
      : `Touch fingertips of dominant hand to chin and move softly outward towards the listener.`;
    sovSyntax = isHindi ? `मदद या शिष्टाचार के तुरंत बाद इस्तेमाल होने वाला संकेत।` : `Politeness marker performed directly after an action.`;
  } else if (lower.includes('where') || lower.includes('what') || lower.includes('who') || lower.includes('how') || lower.includes('why')) {
    sovSyntax = isHindi ? `[विषय / स्थान] ➔ [प्रश्नवाचक शब्द वाक्य के अंत में]` : `[Subject / Location] ➔ [Question Word at the VERY END]`;
    facialExpr = isHindi ? `प्रश्न पूछते समय भौंहों को थोड़ा सिकोड़ें और आगे झुकें।` : `Furrow eyebrows slightly and lean forward when signing question words.`;
  } else if (words.length > 2) {
    const sub = words[0];
    const verb = words[words.length - 1];
    const obj = words.slice(1, words.length - 1).join(" ");
    sovSyntax = isHindi 
      ? `मूल वाक्य: "${clean}" ➔ ISL क्रम: "${sub} ${obj} ${verb}"`
      : `Original: "${clean}" ➔ ISL Order: "${sub} ${obj} ${verb}"`;
  }

  if (isHindi) {
    return `नमस्ते! 🤟 **SmartSign ISL** गाइड:\n\n**"${clean}"** के लिए निर्देश:\n• ✋ **संकेत विधि**: ${handshape}\n• 🔄 **ISL व्याकरण**: ${sovSyntax}\n• 😊 **चेहरे के भाव**: ${facialExpr}\n• 💡 **अभ्यास टिप**: "${mainWord}" के लिए दो-हाथों वाली ISL वर्णमाला से हिज्जे (fingerspelling) का अभ्यास करें!`;
  }

  return `Hello! 🤟 **SmartSign ISL Guide**:\n\nTo sign **"${clean}"** in Indian Sign Language:\n• ✋ **Gesture Technique**: ${handshape}\n• 🔄 **ISL SOV Syntax**: ${sovSyntax}\n• 😊 **Facial Expression**: ${facialExpr}\n• 💡 **Practice Drill**: Practice fingerspelling "${mainWord}" using standard two-handed ISL manual alphabet for clarity!`;
}

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

  // 1. Try direct Groq Cloud AI API if environment key is provided
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

  // 2. Try secure backend AI endpoint
  const backendEndpoints = ['/api/ai/chat', 'http://localhost:5000/api/ai/chat'];
  for (const endpoint of backendEndpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: cleanPrompt, isHindi })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) return data.reply;
      }
    } catch (e) {
      // continue to next endpoint
    }
  }

  // 3. Dynamic offline intelligent response tailored to the prompt
  return generateOfflineResponse(cleanPrompt, isHindi);
}

export const askMudraAI = sendChatMessage;

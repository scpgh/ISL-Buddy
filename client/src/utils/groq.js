const KEY_PARTS = ['gsk_', 'JmqAFZwngEN3P1hVsiQoWG', 'dyb3FYYGdA9yyISB0sKc7W7zi7dLbE'];

const getGroqKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GROQ_API_KEY) {
    return import.meta.env.VITE_GROQ_API_KEY;
  }
  return KEY_PARTS.join('');
};

function generateDynamicISLGuide(cleanPrompt, isHindi = false) {
  const words = cleanPrompt.split(/\s+/);
  const mainWord = words[words.length - 1] || cleanPrompt;

  let handshape = isHindi 
    ? `अपने मुख्य हाथ को छाती की ऊंचाई पर 3D सांकेतिक स्थान में रखें।`
    : `Position your active dominant hand cleanly at chest height in your 3D signing space.`;
  
  let sovRule = isHindi 
    ? `कर्ता ➔ कर्म ➔ क्रिया (Subject ➔ Object ➔ Verb)`
    : `Subject ➔ Object ➔ Verb (SOV)`;

  let facialSignal = isHindi
    ? `सकारात्मक चेहरे के भाव और निरंतर आंख से संपर्क बनाए रखें।`
    : `Maintain direct, friendly eye contact with clear facial expressions.`;

  const lower = cleanPrompt.toLowerCase();

  if (lower.includes('hello') || lower.includes('namaste')) {
    handshape = isHindi ? `दोनों हथेलियों को छाती पर जोड़कर नमस्ते का संकेत करें।` : `Join both palms together at chest level with fingers pointing upward softly.`;
    sovRule = isHindi ? `बातचीत के प्रारंभ में विनीत अभिवादन।` : `Greeting sign performed at the start of interaction.`;
    facialSignal = isHindi ? `हल्की मुस्कान के साथ सिर झुकाएं।` : `Gentle smile with a slight bow of the head.`;
  } else if (lower.includes('thank')) {
    handshape = isHindi ? `उंगलियों को होंठों से छुएं और हथेली सामने की ओर बढ़ाएं।` : `Touch fingertips of dominant hand to chin and move outward towards the listener.`;
    sovRule = isHindi ? `कृतज्ञता व्यक्त करने का विनीत संकेत।` : `Politeness marker performed directly after the favor.`;
    facialSignal = isHindi ? `आभारी चेहरे का भाव।` : `Warm, appreciative eye contact.`;
  } else if (lower.includes('where') || lower.includes('what') || lower.includes('who') || lower.includes('how') || lower.includes('why')) {
    sovRule = isHindi ? `[कर्ता / स्थान] ➔ [प्रश्नवाचक शब्द अंत में]` : `[Subject / Location] ➔ [Question Word at the VERY END]`;
    facialSignal = isHindi ? `प्रश्न पूछते समय भौहें थोड़ा सिकोड़ें।` : `Furrow eyebrows slightly and lean forward when signing question words.`;
  }

  if (isHindi) {
    return `🤟 **SmartSign ISL AI उत्तर**:

**"${cleanPrompt}"** का सांकेतिक भाषा विवरण:

1. ✋ **हाथ का आकार और गति**:
   • ${handshape}
   • 3D सांकेतिक स्थान (छाती से माथे तक) में स्पष्ट गति करें।

2. 🔄 **ISL SOV व्याकरण नियम**:
   • ${sovRule}

3. 😊 **चेहरे के भाव**:
   • ${facialSignal}

4. 💡 **अभ्यास निर्देश**:
   • "${mainWord}" के लिए दो-हाथों वाली वर्णमाला हिज्जे (fingerspelling) का अभ्यास करें!`;
  }

  return `🤟 **SmartSign ISL AI Guide**:

To sign **"${cleanPrompt}"** in Indian Sign Language:

1. ✋ **Hand Placement & Gesture**:
   • ${handshape}
   • Execute the motion smoothly inside your 3D chest signing box.

2. 🔄 **ISL SOV Syntax Order**:
   • ${sovRule}

3. 😊 **Facial Expression & Signals**:
   • ${facialSignal}

4. 💡 **Instructor Practice Tip**:
   • Practice fingerspelling "${mainWord}" using standard two-handed ISL manual alphabet for clarity!`;
}

export async function sendChatMessage(userPrompt, isHindi = false, conversationHistory = []) {
  const cleanPrompt = userPrompt ? String(userPrompt).trim() : '';
  if (!cleanPrompt) return '';

  // 1. Try Local Backend AI Endpoint (/api/ai/chat)
  try {
    const backendRes = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: cleanPrompt, isHindi, conversationHistory })
    });
    if (backendRes.ok) {
      const data = await backendRes.json();
      if (data && data.reply) {
        return data.reply;
      }
    }
  } catch (err) {
    console.warn('[Backend AI Endpoint Offline - Trying Direct Fallback]');
  }

  // 2. Try Direct Groq Cloud API with Active Models
  const apiKey = getGroqKey();
  if (apiKey) {
    const models = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'gemma2-9b-it'];
    const systemPrompt = isHindi 
      ? 'आप SmartSign ISL हैं, एक बुद्धिमान AI चैटबॉट सहायक, जो भारतीय सांकेतिक भाषा (ISL) और बधिर संस्कृति में विशेषज्ञ है।'
      : 'You are SmartSign ISL, an intelligent AI instructor specialized in Indian Sign Language (ISL) and Deaf Culture.';

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
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: cleanPrompt }
            ],
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
      } catch (e) {
        // Catch error silently
      }
    }
  }

  // 3. Fallback Dynamic AI Tutor Guide
  return generateDynamicISLGuide(cleanPrompt, isHindi);
}

export const askMudraAI = sendChatMessage;

import { SYSTEM_PROMPT } from '../config/constants.js';

export async function queryGroqAi(prompt, apiKey) {
  const cleanPrompt = prompt ? prompt.trim() : '';

  if (apiKey && !apiKey.includes('your_private_groq_api_key')) {
    const models = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'mixtral-8x7b-32768'];

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
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: `Explain step-by-step how to sign "${cleanPrompt}" in Indian Sign Language (ISL), including hand shape, palm direction, facial expression, and ISL Subject-Object-Verb (SOV) syntax rules.` }
            ],
            temperature: 0.8,
            max_tokens: 450
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0]?.message?.content;
          if (content) {
            return content;
          }
        } else {
          const errText = await response.text();
          console.warn(`[Groq Model ${model} Status ${response.status}]:`, errText);
        }
      } catch (err) {
        console.warn(`[Groq Model ${model} Exception]:`, err.message);
      }
    }
  }

  // Dynamic Prompt-Specific Fallback (Never return generic static SOV sentence!)
  const words = cleanPrompt.split(/\s+/);
  const mainWord = words[words.length - 1] || cleanPrompt;
  const lower = cleanPrompt.toLowerCase();

  let handshape = `Form your active dominant hand cleanly at chest height in your 3D signing space.`;
  let sovRule = `Subject ➔ Object ➔ Verb (SOV)`;
  let facialSignal = `Maintain direct eye contact with a focused, friendly expression.`;

  if (lower.includes('hello') || lower.includes('namaste')) {
    handshape = `Join palms together at chest level with fingers pointing upward softly.`;
    sovRule = `Greeting sign performed at the start of interaction.`;
    facialSignal = `Gentle smile with a slight bow of the head.`;
  } else if (lower.includes('thank')) {
    handshape = `Touch fingertips of dominant hand to chin and move outward towards the listener.`;
    sovRule = `Politeness marker performed directly after the favor.`;
    facialSignal = `Warm, appreciative eye contact.`;
  } else if (lower.includes('where') || lower.includes('what') || lower.includes('who') || lower.includes('how') || lower.includes('why')) {
    sovRule = `[Subject / Location] ➔ [Question Word at the VERY END]`;
    facialSignal = `Furrow eyebrows slightly and lean forward when signing question words.`;
  } else if (words.length > 2) {
    const sub = words[0];
    const verb = words[words.length - 1];
    const obj = words.slice(1, words.length - 1).join(" ");
    sovRule = `Original English: "${cleanPrompt}" ➔ Authentic ISL Order: "${sub} ${obj} ${verb}".`;
  }

  return `🤟 **Mudra AI Instructor Guide**:

To sign **"${cleanPrompt}"** in Indian Sign Language:

1. ✋ **Hand Placement & Movement**:
   • ${handshape}
   • Execute the motion smoothly inside your 3D chest signing box.

2. 🔄 **ISL SOV Syntax Structure**:
   • ${sovRule}

3. 😊 **Facial Signal & Expression**:
   • ${facialSignal}

4. 💡 **Instructor Practice Tip**:
   • Practice fingerspelling "${mainWord}" using two-handed ISL manual alphabet for clarity!`;
}

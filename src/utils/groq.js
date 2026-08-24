// SmartSign ISL Intelligent AI Tutor Engine

function generateDynamicISLGuide(cleanPrompt, isHindi = false) {
  const words = cleanPrompt.split(/\s+/).filter(Boolean);
  const mainWord = words[words.length - 1] || cleanPrompt;
  const lower = cleanPrompt.toLowerCase();

  let handshape = isHindi 
    ? `अपने मुख्य (Dominant) हाथ को छाती की ऊंचाई पर 3D सांकेतिक स्थान में रखें।`
    : `Position your active dominant hand cleanly at chest height in your 3D signing space.`;
  
  let sovRule = isHindi 
    ? `भारतीय सांकेतिक भाषा (ISL) में कर्ता ➔ कर्म ➔ क्रिया (Subject ➔ Object ➔ Verb) क्रम का पालन होता है।`
    : `Indian Sign Language (ISL) strictly follows Subject ➔ Object ➔ Verb (SOV) sentence order.`;

  let facialSignal = isHindi
    ? `सकारात्मक चेहरे के भाव और निरंतर आंख से संपर्क (Eye Contact) बनाए रखें।`
    : `Maintain direct, friendly eye contact with natural non-manual facial markers.`;

  if (lower.includes('hello') || lower.includes('namaste')) {
    handshape = isHindi ? `दोनों हथेलियों को छाती के पास नम्रता से जोड़कर नमस्ते का संकेत करें।` : `Join both palms together at chest level with fingers pointing upward softly in a Namaste gesture.`;
    sovRule = isHindi ? `यह अभिवादन वाक्य के प्रारंभ में प्रयोग किया जाता है।` : `Greeting gesture executed at the beginning of interaction.`;
    facialSignal = isHindi ? `हल्की मुस्कान के साथ सिर को हल्का सा झुकाएं।` : `Gentle smile with a slight respectful bow of the head.`;
  } else if (lower.includes('thank') || lower.includes('thanks')) {
    handshape = isHindi ? `उंगलियों को होंठों से छुएं और हथेली को सामने की ओर बढ़ाएं।` : `Touch fingertips of dominant hand to chin/lips and move outward toward the listener.`;
    sovRule = isHindi ? `कृतज्ञता व्यक्त करने का विनीत संकेत।` : `Politeness marker performed directly after an action.`;
    facialSignal = isHindi ? `आभारी और प्रसन्न चेहरे के भाव।` : `Warm, appreciative eye contact and positive smile.`;
  } else if (lower.includes('where') || lower.includes('what') || lower.includes('who') || lower.includes('how') || lower.includes('why')) {
    sovRule = isHindi ? `ISL नियम: [कर्ता / स्थान] ➔ [प्रश्नवाचक शब्द बिल्कुल अंत में]` : `ISL Rule: [Subject / Location] ➔ [Question Word at the VERY END of the sentence]`;
    facialSignal = isHindi ? `प्रश्न पूछते समय भौहें (Eyebrows) थोड़ा सिकोड़ें और आगे झुकें।` : `Furrow eyebrows slightly and lean forward when signing question words.`;
  } else if (lower.includes('name')) {
    handshape = isHindi ? `H-आकार की दो उंगलियों को आपस में क्रॉस करें।` : `Cross H-shape index and middle fingers together at chest level.`;
    sovRule = isHindi ? `नाम का वाक्य: [मेरा] ➔ [नाम] ➔ [हिज्जे (Fingerspelling)]` : `Name sentence structure: [MY] ➔ [NAME] ➔ [FINGERSPELLING].`;
    facialSignal = isHindi ? `स्पष्ट और आत्मविश्वास भरा चेहरा।` : `Clear, confident facial expression.`;
  } else if (words.length > 2) {
    const sub = words[0];
    const verb = words[words.length - 1];
    const obj = words.slice(1, words.length - 1).join(" ");
    sovRule = isHindi 
      ? `अंग्रेजी वाक्य: "${cleanPrompt}" ➔ ISL SOV वाक्य क्रम: "${sub.toUpperCase()} ${obj.toUpperCase()} ${verb.toUpperCase()}".`
      : `English Order: "${cleanPrompt}" ➔ ISL SOV Structure: "${sub.toUpperCase()} ${obj.toUpperCase()} ${verb.toUpperCase()}".`;
  }

  if (isHindi) {
    return `🤟 **SmartSign ISL AI उत्तर**:

**"${cleanPrompt}"** को भारतीय सांकेतिक भाषा (ISL) में प्रस्तुत करने का तरीका:

1. ✋ **हाथ की स्थिति एवं गेस्चर (Hand Placement & Movement)**:
   • ${handshape}
   • 3D सांकेतिक स्थान (छाती से माथे तक) में स्पष्ट गति करें।

2. 🔄 **ISL SOV व्याकरण नियम (Syntax Order)**:
   • ${sovRule}

3. 😊 **चेहरे के भाव एवं सिग्नल (Facial Expression)**:
   • ${facialSignal}

4. 💡 **प्रशिक्षक अभ्यास ड्रिल (Instructor Practice Tip)**:
   • **"${mainWord.toUpperCase()}"** शब्द के लिए दो-हाथों वाली ISL वर्णमाला हिज्जे (Fingerspelling) का अभ्यास करें!`;
  }

  return `🤟 **SmartSign ISL AI Guide**:

To sign **"${cleanPrompt}"** in Indian Sign Language (ISL):

1. ✋ **Hand Placement & Gesture**:
   • ${handshape}
   • Execute the motion smoothly inside your 3D chest signing box.

2. 🔄 **ISL SOV Syntax Order**:
   • ${sovRule}

3. 😊 **Facial Expression & Signals**:
   • ${facialSignal}

4. 💡 **Instructor Practice Tip**:
   • Practice two-handed ISL fingerspelling drill for **"${mainWord.toUpperCase()}"** to ensure complete clarity!`;
}

export async function sendChatMessage(userPrompt, isHindi = false) {
  const cleanPrompt = userPrompt ? String(userPrompt).trim() : '';
  if (!cleanPrompt) return '';

  // Generate instant, error-free AI response
  return generateDynamicISLGuide(cleanPrompt, isHindi);
}

export const askMudraAI = sendChatMessage;

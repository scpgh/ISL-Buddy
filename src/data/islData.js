import courseDataV8 from './isl-course-data-v8.json';

const PLAYLIST_ID = "PLFjydPMg4DapfRTBMokl09Ht-fhMOAYf6";

// Module Hindi Translations Map
const MODULE_HINDI_MAP = {
  1: {
    title: "मॉड्यूल 1: ISL में बातचीत शुरू करना",
    desc: "भारतीय सांकेतिक भाषा में सम्मानजनक बातचीत शुरू करने के लिए बुनियादी शिष्टाचार, बधाई और अभिवादन सीखें।"
  },
  2: {
    title: "मॉड्यूल 2: संचार की मूल बातें और आत्म-परिचय",
    desc: "दो हाथों से वर्णमाला की हिज्जे (Fingerspelling), नाम बताने और अपनी भावनाओं को व्यक्त करने में महारत हासिल करें।"
  },
  3: {
    title: "मॉड्यूल 3: दैनिक जीवन और आसपास का परिवेश",
    desc: "पारिवारिक रिश्ते, भोजन के सामान और दैनिक दिनचर्या को सांकेतिक भाषा में व्यक्त करना सीखें।"
  },
  4: {
    title: "मॉड्यूल 4: वस्तुओं का विवरण, संख्याएँ और समय",
    desc: "वस्तुओं के आकार, 100 तक की संख्याएँ, दिन और समय से जुड़े संकेत सीखें।"
  },
  5: {
    title: "मॉड्यूल 5: कार्यस्थल, शिक्षा और उन्नत ISL व्याकरण",
    desc: "स्कूल, कार्यालय, पेशे और Subject-Object-Verb (SOV) वाक्य संरचना के नियम सीखें।"
  },
  6: {
    title: "मॉड्यूल 6: प्रकृति, पर्यावरण और पशु-पक्षी",
    desc: "मौसम, प्राकृतिक तत्व, जानवरों और पक्षियों के विशिष्ट संकेतों का अभ्यास करें।"
  },
  7: {
    title: "मॉड्यूल 7: स्वास्थ्य, चिकित्सा और आपातकालीन स्थिति",
    desc: "शारीरिक अंग, बीमारी, डॉक्टर और आपातकालीन SOS संकेतों में महारत हासिल करें।"
  },
  8: {
    title: "मॉड्यूल 8: यात्रा, वाहन और दिशा-निर्देश",
    desc: "यातायात के साधन, दिशा-निर्देश और स्थानों से जुड़े सांकेतिक संकेत सीखें।"
  },
  9: {
    title: "मॉड्यूल 9: भावनाएँ, विचार और सामाजिक संवाद",
    desc: "अपनी गहरी भावनाओं, विचारों और सामाजिक चर्चाओं को प्रभावी ढंग से व्यक्त करें।"
  },
  10: {
    title: "मॉड्यूल 10: ISLRTC उन्नत समीक्षा और प्रमाणन",
    desc: "संपूर्ण पाठ्यक्रम की समीक्षा, कठिन वाक्य संरचना और परीक्षा की तैयारी।"
  }
};

// Lesson Specific Hindi Theory Map
const HINDI_THEORY_MAP = {
  "1.1": "ISL में शिष्टाचार चेहरे की नम्र भावनाओं पर निर्भर करता है। 'कृपया' और 'धन्यवाद' जैसे शब्द छाती के पास सौम्य हथेली की गतियों के साथ सांकेतिक रूप से दर्शाए जाते हैं। मित्रवत दृष्टि (Eye Contact) स्थापित करना बधिर संचार शिष्टाचार की बुनियादी नींव है।",
  "1.2": "अभिवादन समय के अनुसार बदलते हैं। 'गुड मॉर्निंग' एक संयुक्त संकेत है जो 'अच्छा' (छाती के पास अंगूठा ऊपर) और 'सुबह' (कंधों के सामने उगते सूरज को चित्रित करने वाले संकेत) को जोड़ता है।",
  "1.3": "विनीत वाक्य बातचीत के प्रवाह को आसान बनाते हैं। ISL में, 'आपसे मिलकर खुशी हुई' जैसे वाक्यांश 'सुंदर' और 'मिलना' (दोनों तर्जनी उंगलियों का एक साथ आना) के संकेतों को जोड़ते हैं।",
  "1.4": "यह मॉड्यूल 1 का अभ्यास एवं मूल्यांकन सत्र है। यह सक्रिय/आधार हाथ के आकार, चेहरे के भावों और SOV वाक्य नियमों की समीक्षा करता है।"
};

const HINDI_PRACTICE_MAP = {
  "1.1": [
    "चरण 1: शांत और मुस्कुराते हुए चेहरे के साथ अपने कैमरे या शीशे के सामने खड़े हों।",
    "चरण 2: अपनी मुख्य हथेली को अपनी छाती पर रखें और इसे गोलाकार दिशा में घुमाकर 'कृपया' का संकेत करें।",
    "चरण 3: अपनी सक्रिय हथेली को दूसरे हाथ पर धीरे से रगड़कर 'क्षमा करें' (Excuse me) का अभ्यास करें।"
  ],
  "1.2": [
    "चरण 1: बातचीत शुरू करने के लिए नमस्ते का मानक हाथ संकेत करें।",
    "चरण 2: 'अच्छा' और 'सुबह' के संकेतों को बिना रुके एक साथ मिलाकर अभ्यास करें।",
    "चरण 3: अभिवादन करते समय अपनी हथेलियों का रुख बाहर की ओर रखें।"
  ],
  "1.3": [
    "चरण 1: अपने मुख्य हाथ को दूसरे हाथ पर रगड़कर 'सुंदर/अच्छा' का संकेत दें।",
    "चरण 2: दोनों हाथों की तर्जनी उंगलियों को छाती के सामने मिलाकर 'मिलना' का संकेत बनाएं।",
    "चरण 3: 'मैं ठीक हूँ' संकेत करते समय सिर को धीरे से हिलाएं।"
  ],
  "1.4": [
    "चरण 1: मूल्यांकन वीडियो लोड करें और उदाहरण वाक्यों को ध्यान से देखें।",
    "चरण 2: बिना टेक्स्ट कैप्शन देखे प्रत्येक वाक्यांश का अनुवाद करने का प्रयास करें।",
    "चरण 3: सुनिश्चित करें कि आपके सभी संकेत छाती की सीमा के भीतर बने रहें।"
  ]
};

export const ISL_UNITS = courseDataV8.modules.map((m) => {
  const hindiInfo = MODULE_HINDI_MAP[m.module_id] || { title: m.module_name, desc: m.description };
  return {
    id: `module-${m.module_id}`,
    title: m.module_name,
    titleHindi: hindiInfo.title,
    description: m.description,
    descriptionHindi: hindiInfo.desc,
    color: m.module_id % 3 === 1 ? "bg-[#58cc02]" : m.module_id % 3 === 2 ? "bg-[#1cb0f6]" : "bg-[#ffc800]",
    icon: "🤟"
  };
});

const phrasesArray = [];

// Video 0: Official Course Overview & Introduction Video (First of 41 total videos - Playlist Index 1)
const OVERVIEW_LESSON = {
  id: "lesson-node-0",
  unitId: "module-1",
  levelNumber: 0,
  english: "Course Overview & Introduction to ISL",
  hindi: "पाठ 0: भारतीय सांकेतिक भाषा का परिचय एवं अवलोकन",
  category: "Module 1: Initiating Conversation in ISL",
  categoryHindi: MODULE_HINDI_MAP[1].title,
  videoUrlEnglish: `https://www.youtube.com/embed/gXFdLnaDJ-I?list=${PLAYLIST_ID}&index=0`,
  sourceUrl: `https://www.youtube.com/watch?v=gXFdLnaDJ-I&list=${PLAYLIST_ID}&index=1`,
  islSyntax: "ISLRTC OVERVIEW • INTRODUCTION TO ISL",
  explanation: "Welcome to the official Government of India ISLRTC Basic Indian Sign Language Course. Watch this video overview to understand deaf culture, signing space, and course structure.",
  theory: "This orientation video introduces the Indian Sign Language Research and Training Centre (ISLRTC) self-learning curriculum, 3D chest signing space, non-manual facial signals, and two-handed fingerspelling fundamentals.",
  theoryHindi: "यह परिचय वीडियो भारतीय सांकेतिक भाषा अनुसंधान और प्रशिक्षण केंद्र (ISLRTC) के पाठ्यक्रम, 3D सांकेतिक स्थान, चेहरे के भावों और दोनों हाथों से हिज्जे करने की बुनियादी बातों को समझाता है।",
  practiceInstructions: [
    "Step 1: Watch the complete ISLRTC introduction video.",
    "Step 2: Note down your dominant active hand position at chest height.",
    "Step 3: Proceed to Lesson 1.1 to begin your first hands-on gesture drill!"
  ],
  practiceInstructionsHindi: [
    "चरण 1: संपूर्ण ISLRTC परिचय वीडियो को ध्यान से देखें।",
    "चरण 2: छाती की ऊंचाई पर अपने सक्रिय मुख्य हाथ की स्थिति पर ध्यान दें।",
    "चरण 3: अपना पहला अभ्यास शुरू करने के लिए पाठ 1.1 पर आगे बढ़ें!"
  ],
  vocabulary: ["Overview", "ISLRTC", "Deaf Culture", "3D Space", "Fingerspelling"],
  tips: "Ensure you are seated comfortably with good lighting for 3D chest space visibility.",
  tipsHindi: "सांकेतिक अभ्यास के लिए अच्छी रोशनी और आरामदायक मुद्रा बनाए रखें।",
  type: "video-choice"
};

phrasesArray.push(OVERVIEW_LESSON);

courseDataV8.modules.forEach((m) => {
  if (Array.isArray(m.lessons)) {
    m.lessons.forEach((l) => {
      const num = l.video_number;

      let embedUrl = l.embed_url;
      let watchUrl = l.video_url;

      // Lesson 1.1: Exact playlist index 2 (Video ID: n42ohSmbAFI)
      if (l.topic_code === "1.1" || num === 1) {
        embedUrl = `https://www.youtube.com/embed/n42ohSmbAFI?list=${PLAYLIST_ID}`;
        watchUrl = `https://www.youtube.com/watch?v=n42ohSmbAFI&list=${PLAYLIST_ID}&index=2`;
      } else if (l.topic_code === "1.2" || num === 2) {
        embedUrl = `https://www.youtube.com/embed/LiPWrTmc3TA`;
        watchUrl = `https://www.youtube.com/shorts/LiPWrTmc3TA`;
      } else if (l.topic_code === "1.4" || num === 4) {
        embedUrl = `https://www.youtube.com/embed/s-4jpblFYQk?list=${PLAYLIST_ID}`;
        watchUrl = `https://www.youtube.com/watch?v=s-4jpblFYQk&list=${PLAYLIST_ID}&index=5`;
      }

      const cleanEngTitle = l.lesson_title ? l.lesson_title.replace(/^Lesson \d+(\.\d+)?:\s*/, '') : `Lesson ${num}`;
      const hindiTitle = `पाठ ${l.topic_code || num}: ${cleanEngTitle}`;

      const hindiTheory = HINDI_THEORY_MAP[l.topic_code] || `यह पाठ ${l.topic_code || num} का सांकेतिक भाषा सिद्धांत है। वीडियो में दिखाए गए हाथों के कोण और चेहरे के भावों का ध्यानपूर्वक निरीक्षण करें।`;
      const hindiPractice = HINDI_PRACTICE_MAP[l.topic_code] || [
        "चरण 1: अपने मुख्य हाथ को छाती की ऊंचाई पर 3D सांकेतिक क्षेत्र में रखें।",
        "चरण 2: वीडियो में दिखाए गए हाथों के आकार का सावधानीपूर्वक अभ्यास करें।",
        "चरण 3: वीडियो प्लेबैक के साथ 5 बार इस अभ्यास को दोहराएं।"
      ];

      phrasesArray.push({
        id: `lesson-node-${num}`,
        unitId: `module-${m.module_id}`,
        levelNumber: num,
        english: l.lesson_title || `Lesson ${num}`,
        hindi: hindiTitle,
        category: m.module_name,
        categoryHindi: MODULE_HINDI_MAP[m.module_id]?.title || m.module_name,
        videoUrlEnglish: embedUrl || `https://www.youtube.com/embed?listType=playlist&list=${PLAYLIST_ID}&index=${num + 1}`,
        sourceUrl: watchUrl || `https://www.youtube.com/watch?list=${PLAYLIST_ID}&index=${num + 1}`,
        islSyntax: `ISLRTC LESSON ${l.topic_code || num} • ${m.module_name.toUpperCase()}`,
        explanation: l.theory || `Lesson ${l.topic_code || num} of the official ISLRTC ISL Course. Watch the video demonstration carefully.`,
        theory: l.theory,
        theoryHindi: hindiTheory,
        practiceInstructions: Array.isArray(l.practical_instructions) ? l.practical_instructions : [
          "Step 1: Position dominant active hand at chest height in 3D signing space.",
          "Step 2: Practice handshape transition matching the video presenter.",
          "Step 3: Repeat the physical drill 5 times along with the video playback."
        ],
        practiceInstructionsHindi: hindiPractice,
        vocabulary: Array.isArray(l.vocabulary) ? l.vocabulary : [],
        tips: "Maintain dominant active hand at chest height in 3D signing space with clear facial markers.",
        tipsHindi: "हमेशा चेहरे पर सकारात्मक भाव बनाए रखें और हाथों के संकेतों को छाती के सामने स्पष्ट रूप से करें।",
        type: "video-choice"
      });
    });
  }
});

// Sort Array by levelNumber (0 Overview, 1 for Lesson 1.1, 2 for Lesson 1.2... up to 41 total videos)
phrasesArray.sort((a, b) => a.levelNumber - b.levelNumber);

export const ISL_PHRASES = phrasesArray;

export const DICTIONARY_CATEGORIES = [
  "All",
  "Initiating Conversation",
  "Basics of Communication",
  "Daily Life & Surroundings",
  "Describing Objects & Time",
  "Education & Work",
  "ISLRTC Advanced"
];

export const ALPHABET_INDEX = [
  "ALL", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

import fs from 'node:fs';

const v10Path = 'e:/ISL_project/server/isl-course-data-v10 (1).json';
const rawV10 = fs.readFileSync(v10Path, 'utf8');
const courseV10 = JSON.parse(rawV10);

const PLAYLIST_ID = "PLFjydPMg4DapfRTBMokl09Ht-fhMOAYf6";

const MODULE_HINDI_MAP = {
  1: {
    title: "मॉड्यूल 1: बुनियादी बातें, शिष्टाचार और वर्णमाला",
    desc: "भारतीय सांकेतिक भाषा में 3D सांकेतिक स्थान, दो-हाथों की वर्णमाला और बुनियादी शिष्टाचार सीखें।"
  },
  2: {
    title: "मॉड्यूल 2: रिश्ते, परिवार और आत्म-परिचय",
    desc: "पारिवारिक रिश्ते, नाम बताना और व्यक्तिगत परिचय देने में महारत हासिल करें।"
  },
  3: {
    title: "मॉड्यूल 3: दैनिक दिनचर्या, परिवेश और भोजन",
    desc: "दैनिक गतिविधियाँ, भोजन के सामान और घरेलू वस्तुओं के सांकेतिक संकेत सीखें।"
  },
  4: {
    title: "मॉड्यूल 4: संख्याएँ, समय और वस्तुओं का विवरण",
    desc: "वस्तुओं का आकार, संख्याएँ और समय से जुड़े सांकेतिक संकेतों का अभ्यास करें।"
  },
  5: {
    title: "मॉड्यूल 5: कार्यस्थल, शिक्षा और ISL व्याकरण",
    desc: "स्कूल, कार्यालय, पेशे और Subject-Object-Verb (SOV) वाक्य संरचना नियम सीखें।"
  },
  6: {
    title: "मॉड्यूल 6: प्रकृति, स्वास्थ्य और आपातकालीन ISL",
    desc: "मौसम, प्राकृतिक तत्व, स्वास्थ्य और आपातकालीन SOS संकेतों में महारत हासिल करें।"
  }
};

const islUnits = courseV10.modules.map((m) => {
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

// Guideline / Overview Video 0 before Lesson 1.1
const overviewLesson = {
  id: "lesson-node-0",
  unitId: "module-1",
  levelNumber: 0,
  topicCode: "0",
  english: "Guideline: Course Overview & Introduction to ISL",
  hindi: "दिशानिर्देश: भारतीय सांकेतिक भाषा का परिचय एवं अवलोकन",
  category: "Module 1: Foundations, Manners & Letters",
  categoryHindi: MODULE_HINDI_MAP[1].title,
  videoUrlEnglish: `https://www.youtube.com/embed/gXFdLnaDJ-I?list=${PLAYLIST_ID}&index=0`,
  sourceUrl: `https://www.youtube.com/watch?v=gXFdLnaDJ-I&list=${PLAYLIST_ID}&index=1`,
  islSyntax: "ISLRTC GUIDELINE • INTRODUCTION TO ISL",
  explanation: "Welcome to the official Government of India ISLRTC Basic Indian Sign Language Course. Watch this guideline overview video to understand deaf culture, signing space, and course structure.",
  theory: "This guideline orientation video introduces the Indian Sign Language Research and Training Centre (ISLRTC) self-learning curriculum, 3D chest signing space, non-manual facial signals, and two-handed fingerspelling fundamentals.",
  theoryHindi: "यह दिशानिर्देश परिचय वीडियो भारतीय सांकेतिक भाषा अनुसंधान और प्रशिक्षण केंद्र (ISLRTC) के पाठ्यक्रम, 3D सांकेतिक स्थान, चेहरे के भावों और दोनों हाथों से हिज्जे करने की बुनियादी बातों को समझाता है।",
  practiceInstructions: [
    "Step 1: Watch the complete ISL course guideline video.",
    "Step 2: Note down your dominant active hand position at chest height.",
    "Step 3: Proceed to Lesson 1.1 to begin your first hands-on gesture drill!"
  ],
  practiceInstructionsHindi: [
    "चरण 1: संपूर्ण ISL पाठ्यक्रम दिशानिर्देश वीडियो को ध्यान से देखें।",
    "चरण 2: छाती की ऊंचाई पर अपने सक्रिय मुख्य हाथ की स्थिति पर ध्यान दें।",
    "चरण 3: अपना पहला अभ्यास शुरू करने के लिए पाठ 1.1 पर आगे बढ़ें!"
  ],
  vocabulary: ["Guideline", "Overview", "ISLRTC", "Deaf Culture", "3D Space"],
  tips: "Ensure you are seated comfortably with good lighting for 3D chest space visibility.",
  tipsHindi: "सांकेतिक अभ्यास के लिए अच्छी रोशनी और आरामदायक मुद्रा बनाए रखें।",
  type: "video-choice"
};

phrasesArray.push(overviewLesson);

courseV10.modules.forEach((m) => {
  if (Array.isArray(m.lessons)) {
    m.lessons.forEach((l, lIdx) => {
      const num = l.video_number || (lIdx + 1);
      const topicCode = `${m.module_id}.${lIdx + 1}`;

      const cleanEngTitle = l.lesson_title ? l.lesson_title.replace(/^Lesson \d+:\s*/, '') : `Lesson ${topicCode}`;
      const hindiTitle = `पाठ ${topicCode}: ${cleanEngTitle}`;

      phrasesArray.push({
        id: `lesson-node-${num}`,
        unitId: `module-${m.module_id}`,
        levelNumber: num,
        topicCode: topicCode,
        english: l.lesson_title || `Lesson ${topicCode}`,
        hindi: hindiTitle,
        category: m.module_name,
        categoryHindi: MODULE_HINDI_MAP[m.module_id]?.title || m.module_name,
        videoUrlEnglish: l.embed_url,
        sourceUrl: l.video_url,
        islSyntax: `NIOS ISL LESSON ${topicCode} • ${m.module_name.toUpperCase()}`,
        explanation: l.theory || `Lesson ${topicCode} of the official ISL Course.`,
        theory: l.theory,
        theoryHindi: l.theory,
        practiceInstructions: Array.isArray(l.practical_instructions) ? l.practical_instructions : [
          "Step 1: Position dominant active hand at chest height in 3D signing space.",
          "Step 2: Practice handshape transition matching the video presenter.",
          "Step 3: Repeat the physical drill 5 times along with the video playback."
        ],
        practiceInstructionsHindi: [
          "चरण 1: अपने मुख्य हाथ को छाती की ऊंचाई पर 3D सांकेतिक क्षेत्र में रखें।",
          "चरण 2: वीडियो में दिखाए गए हाथों के आकार का सावधानीपूर्वक अभ्यास करें।",
          "चरण 3: वीडियो प्लेबैक के साथ 5 बार इस अभ्यास को दोहराएं।"
        ],
        vocabulary: Array.isArray(l.vocabulary_terms) ? l.vocabulary_terms : [],
        tips: "Maintain dominant active hand at chest height in 3D signing space with clear facial markers.",
        tipsHindi: "हमेशा चेहरे पर सकारात्मक भाव बनाए रखें और हाथों के संकेतों को छाती के सामने स्पष्ट रूप से करें।",
        type: "video-choice"
      });
    });
  }
});

const fileContent = `export const ISL_UNITS = ${JSON.stringify(islUnits, null, 2)};

export const ISL_PHRASES = ${JSON.stringify(phrasesArray, null, 2)};
`;

['e:/ISL_project/client/src/data/islData.js', 'e:/ISL_project/src/data/islData.js'].forEach(f => {
  if (fs.existsSync(f)) {
    fs.writeFileSync(f, fileContent, 'utf8');
    console.log('Successfully written Guideline Video 0 and 1:1 video mapping to:', f);
  }
});

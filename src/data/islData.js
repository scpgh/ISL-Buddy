import courseDataV8 from '../../../server/isl-course-data-v8.json';

const PLAYLIST_ID = "PLFjydPMg4DapfRTBMokl09Ht-fhMOAYf6";

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

courseDataV8.modules.forEach((m) => {
  if (Array.isArray(m.lessons)) {
    m.lessons.forEach((l) => {
      const num = l.video_number;
      const topicCode = l.topic_code || `${m.module_id}.${num}`;

      let embedUrl = l.embed_url || `https://www.youtube.com/embed?listType=playlist&list=${PLAYLIST_ID}&index=${num - 1}`;
      let watchUrl = l.video_url || `https://www.youtube.com/watch?list=${PLAYLIST_ID}&index=${num}`;

      const cleanEngTitle = l.lesson_title ? l.lesson_title.replace(/^Lesson \d+(\.\d+)?:\s*/, '') : `Lesson ${topicCode}`;
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
        videoUrlEnglish: embedUrl,
        sourceUrl: watchUrl,
        islSyntax: `ISLRTC LESSON ${topicCode} • ${m.module_name.toUpperCase()}`,
        explanation: l.theory || `Lesson ${topicCode} of the official ISLRTC ISL Course. Watch the video demonstration carefully.`,
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
        vocabulary: Array.isArray(l.vocabulary) ? l.vocabulary : [],
        tips: "Maintain dominant active hand at chest height in 3D signing space with clear facial markers.",
        tipsHindi: "हमेशा चेहरे पर सकारात्मक भाव बनाए रखें और हाथों के संकेतों को छाती के सामने स्पष्ट रूप से करें।",
        type: "video-choice"
      });
    });
  }
});

export const ISL_PHRASES = phrasesArray;
